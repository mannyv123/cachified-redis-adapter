import type {Cache} from '@epic-web/cachified'
import {totalTtl} from '@epic-web/cachified'

// This is actually imported from @epic-web/cachified
// but it will most likely be moved out of the package
// and into some other adapter/package
export interface RedisLikeCache {
  name?: string
  set(
    key: string,
    value: string,
    options?: {
      EXAT: number
    },
  ): Promise<string | null>
  get(key: string): Promise<string | null>
  del(key: string): Promise<unknown>
}

// Adapter function
export function redisCacheAdapter(redisCache: RedisLikeCache): Cache {
  return {
    name: redisCache.name || 'Redis',
    set(key, value) {
      const ttl = totalTtl(value?.metadata)
      const createdTime = value?.metadata?.createdTime

      return redisCache.set(
        key,
        JSON.stringify(value),
        ttl > 0 && ttl < Infinity && typeof createdTime === 'number'
          ? {
              // convert the exat to seconds by dividing by 1000
              EXAT: Math.ceil((ttl + createdTime) / 1000),
            }
          : undefined,
      )
    },
    async get(key) {
      const value = await redisCache.get(key)
      if (value == null) {
        return null
      }
      return JSON.parse(value)
    },
    delete(key) {
      return redisCache.del(key)
    },
  }
}
