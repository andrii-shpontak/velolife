export const toKebabCase = (str: string) =>
  str
    .replace(/\s+/g, '-')
    .replace(/_+/g, '-')
    .replace(/[A-Z]/g, (match) => match.toLowerCase())
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-');
