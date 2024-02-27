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
[cachified-redis-json-adapter](https://github.com/tearingItUp786/cachified-redis-json-adapter)

```ts
// Create an instance of a redis client to pass to the adapter
// You will need to define this yourself
import {createClient} from 'redis'
import {redisCacheAdapter} from 'cachified-redis-json-adapter'

const redis = createClient({
  /* ...opts */
})
const cache = redisCacheAdapter(redis)

await cachified({
  cache,
  key: 'user-1',
  getFreshValue() {
    return 'user@example.org'
  },
  /* ...opts */
})
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/tearingitup786"><img src="https://avatars.githubusercontent.com/u/16584942?v=4?s=100" width="100px;" alt="Taranveer (Taran) Bains"/><br /><sub><b>Taranveer (Taran) Bains</b></sub></a><br /><a href="#code-tearingItUp786" title="Code">💻</a> <a href="#test-tearingItUp786" title="Tests">⚠️</a> <a href="#doc-tearingItUp786" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mannyv123"><img src="https://avatars.githubusercontent.com/u/123426666?v=4?s=100" width="100px;" alt="Manjot Virdi"/><br /><sub><b>Manjot Virdi</b></sub></a><br /><a href="#code-mannyv123" title="Code">💻</a> <a href="#test-mannyv123" title="Tests">⚠️</a> <a href="#doc-mannyv123" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
