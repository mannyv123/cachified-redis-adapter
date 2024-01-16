import {redisCacheAdapter} from './'

describe('it works with redis4 like cache', () => {
  const mockRedis4Cache = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
  }
  const cacheWithAdapter = redisCacheAdapter(mockRedis4Cache)

  it('should set a value correctly without TTL', async () => {
    const key = 'testKey'
    const value = {data: 'testValue'}

    mockRedis4Cache.set.mockResolvedValue('OK')

    //QUESTION: why does setting "as any" work here?
    const result = await cacheWithAdapter.set(key, value as any)

    expect(result).toBe('OK')
    expect(mockRedis4Cache.set).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
      undefined,
    )
  })

  it('should set a value with TTL', async () => {
    const ttl = 5000 // 5 seconds
    const currentTime = Date.now()

    const key = 'testKey'
    const value = {
      value: {data: 'testValue'},
      metadata: {createdTime: currentTime, ttl},
    }

    mockRedis4Cache.set.mockResolvedValue('OK')

    const result = await cacheWithAdapter.set(key, value as any)

    expect(result).toBe('OK')
    expect(mockRedis4Cache.set).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
      {
        EXAT: Math.ceil((ttl + currentTime) / 1000),
      },
    )
  })

  it('should handle set operation failure', async () => {
    const key = 'testKey'
    const value = {data: 'testValue'}

    mockRedis4Cache.set.mockRejectedValue(new Error('Failed to set'))

    await expect(cacheWithAdapter.set(key, value as any)).rejects.toThrow(
      'Failed to set',
    )
  })

  it('should retrieve an existing value', async () => {
    const key = 'testKey'
    const storedValue = {data: 'testValue'}

    mockRedis4Cache.get.mockResolvedValue(JSON.stringify(storedValue))

    const result = await cacheWithAdapter.get(key)

    expect(result).toEqual({data: 'testValue'})
  })

  it('should return null for a non-existing key', async () => {
    mockRedis4Cache.get.mockResolvedValue(null)
    const result = await cacheWithAdapter.get('nonExistingKey')
    expect(result).toBeNull()
  })

  it('should handle get operation failure', async () => {
    const key = 'testKey'
    mockRedis4Cache.get.mockRejectedValue(new Error('Failed to get'))
    await expect(cacheWithAdapter.get(key)).rejects.toThrow('Failed to get')
  })

  it('should delete a key', async () => {
    const key = 'testKey'

    await cacheWithAdapter.delete(key)

    expect(mockRedis4Cache.del).toHaveBeenCalledWith(key)
  })

  it('should handle delete operation failure', async () => {
    const key = 'testKey'
    mockRedis4Cache.del.mockRejectedValue(new Error('Failed to delete'))
    await expect(cacheWithAdapter.delete(key)).rejects.toThrow(
      'Failed to delete',
    )
  })
})
