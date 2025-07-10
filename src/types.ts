export const agents = ['npm', 'yarn', 'pnpm', 'bun', 'deno'] as const;
export type Agent = (typeof agents)[number];
