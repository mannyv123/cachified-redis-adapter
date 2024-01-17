# cachified-redis-adapter

[![All Contributors](https://img.shields.io/github/all-contributors/mannyv123/cachified-redis-adapter?color=ee8449&style=flat-square)](#contributors)

An adapter meant to be used with
[@epic-web/cachified](https://github.com/epicweb-dev/cachified)

## Why

[@epic-web/cachified](https://github.com/epicweb-dev/cachified) originally
contained all adapters as a part of the same package. However, this can cause an
issue when an adapter is updated and it becomes a breaking change release for
the entire `@epic-web/cachified` package. This new npm package helps avoid this
for the `redis` adapter and moves the adapter to its own package.

## Install

```bash
npm install cachified-redis-adapter
```

## Usage

**Meant to be used with `@epicweb-dev/cachified`**

**If working with JSON data, try using the `redis-json` cachified adapter,
linked below:**
[cachified=redis-json-adapter](https://github.com/tearingItUp786/cachified-redis-json-adapter)

```ts
import {redisCacheAdapter} from 'cachified-redis-json-adapter'

// create an instance of a redis client to pass to the adapter
// you will need to define this yourself.
let redisClient = createRedisClient()
const redisCache = redisCacheAdapter(redisClient)

// usage with cachified
return cachified({
  key: `some-cache-key`,
  // use the cache we defined above
  cache: redisCache,
  getFreshValue: async () => {}, // some function to get fresh values
  // other cachified optoins
})
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
