# pkg-sandbox

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

[![Build Status][github-build-url]][github-url]
[![codecov][codecov-image]][codecov-url]

> Test your npm package as if it was published.

**No more mocks. No more local imports. This tool makes your test environment behave like your package was already live on the npm registry.**

---

## What it does

- ✅ Test your package installation using real install behavior
- ✅ Allows you to use normal imports in your test cases, just like if the package were published
- ✅ Detects install failures immediately

---

## Install & Use

```bash
npm install --save-dev pkg-sandbox
```

Then you can use it with the command:

```bash
npx sandbox [options]

#basic use
npx sandbox
```

Then use your library in tests exactly like real-world usage:

```ts
import { yourFn } from 'your-lib-name';
```
---

## Example workflow (Vitest)

```ts
// test/my-lib.test.ts
import { resolvePath } from 'your-lib-name';

it('resolves correctly', () => {
  expect(resolvePath('vitest')).toMatch(/node_modules/);
});
```

You can now test everything just like real users would.

---

## Why not use ./dist?

Because they don't reflect real publish behavior.

`pkg-sandbox` gives you a fully realistic environment where your package behaves exactly like it's published.

It does **not** run your test cases — it just sets up a real-world install so that your tests can catch:

- Broken `main` or `exports` paths
- Invalid subpath imports (like `'lib/special.js'`)
- Missing files excluded by `.npmignore` or `files`
- Incorrect or missing type definitions

---

## CLI Options

| Flag             | Description                                            |
|------------------|--------------------------------------------------------|
| `[pkgPath]`      | Path to your package (default: current directory)      |
| `--agent`        | Force specific package manager (`npm`, `pnpm`, `yarn`) |
| `--version`      | Show CLI version                                       |

---

## Support matrix

| Package Manager  | Supported | Notes                                                 |
|------------------|-----------|-------------------------------------------------------|
| `npm`            | ✅ Yes    | Recommended                                           |
| `yarn classic`   | ✅ Yes    | Fully compatible                                      |
| `pnpm`           | ✅ Yes    | Works, but store-based                                |
| `bun*`           | ✅ Yes    | Fully compatible                                      |
| `deno*`          | ❌ No     | Not supported (might be in the future if i have time) |
| `yarn PnP`       | ❌ No     | WiP                                                   |

*: Built-in package manager support

---

## When to use

- Before publishing your package
- In CI/CD to catch install bugs early — this tests the actual install behavior
- To validate `exports`, `types`, and `package.json` correctness as seen by real users
- Catch missing files, broken exports, or invalid types — before your users do.

---

## Changelog

See full release notes in [CHANGELOG.md][changelog-url]

---

## License

MIT [Yuki Akai](https://github.com/yukiakai212/)

---

[npm-downloads-image]: https://badgen.net/npm/dm/pkg-sandbox
[npm-downloads-url]: https://www.npmjs.com/package/pkg-sandbox
[npm-url]: https://www.npmjs.com/package/pkg-sandbox
[npm-version-image]: https://badgen.net/npm/v/pkg-sandbox
[github-build-url]: https://github.com/yukiakai212/pkg-sandbox/actions/workflows/build.yml/badge.svg
[github-url]: https://github.com/yukiakai212/pkg-sandbox/
[codecov-image]: https://codecov.io/gh/yukiakai212/pkg-sandbox/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/yukiakai212/pkg-sandbox
[changelog-url]: https://github.com/yukiakai212/pkg-sandbox/blob/main/CHANGELOG.md
