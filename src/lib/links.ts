/** Profile fields start with "TODO" until filled in; only real http(s) URLs become links. */
export const isUrl = (v: string | undefined): v is string =>
  !!v && /^https?:\/\//.test(v);
