interface Storage {
  get(key: string): string;
}

/**
 * The parameter name `storage` collides with WXT's built-in auto-import
 * from `wxt/utils/storage`. When `imports: false` is set, the unimport
 * plugin should NOT transform this file — but it does.
 */
export function greet(storage: Storage): string {
  return storage.get("name");
}
