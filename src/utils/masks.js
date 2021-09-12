export const numericMask = (len) => Array.from({ length: len }, () => /^\d+$/)
export const alphaMask = (len) => Array.from({ length: len }, () => /^[\w]+$/);