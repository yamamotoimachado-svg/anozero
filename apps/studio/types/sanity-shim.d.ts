declare module 'sanity' {
  export type Rule = { required: () => unknown }

  export const defineType: (...args: unknown[]) => unknown
  export const defineField: (...args: unknown[]) => unknown
}
