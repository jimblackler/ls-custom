export type LsFinder =
    (length: number, canFollow: (i0: number, i1: number) => boolean) => Generator<number>;

export function lsFind<T>(lsFinder: LsFinder, list: T[], canFollow: (v0: T, v1: T) => boolean) {
  const out: T[] = [];
  for (const index of lsFinder(list.length, (i0, i1) => canFollow(list[i0], list[i1]))) {
    out.push(list[index]);
  }
  return out;
}
