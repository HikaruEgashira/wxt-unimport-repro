# wxt-unimport-repro

Minimal reproduction for [wxt-dev/wxt](https://github.com/wxt-dev/wxt) issue: `imports: false` does not prevent unimport plugin from transforming files.

## Reproduce

```bash
pnpm install
pnpm -C app build
```

**Expected:** Build succeeds (auto-imports are disabled).

**Actual:**
```
Error: [vite]: Rolldown failed to resolve import "wxt/utils/storage"
  from "packages/my-lib/src/greet.ts".
```

## Structure

```
packages/my-lib/       # workspace package exporting source .ts
  src/greet.ts         # has a parameter named `storage`
app/                   # WXT extension with imports: false
  wxt.config.ts
  entrypoints/
    background.ts      # imports from my-lib
```

## Cause

The unimport Vite plugin is added unconditionally in `builtin-modules/unimport.ts`, ignoring the `disabled: true` flag set by `imports: false`. Workspace packages outside `node_modules` bypass unimport's default exclude pattern and get transformed.

## Workaround

```ts
// wxt.config.ts
export default defineConfig({
  imports: {
    disabled: true,
    exclude: [/packages\//],
  },
});
```
