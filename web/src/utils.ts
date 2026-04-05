/** Returns estimated read time in minutes (minimum 1). */
export function getReadTime(content: string): number {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}
