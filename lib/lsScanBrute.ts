function scan(length: number, canFollow: (i0: number, i1: number) => boolean,
              start: number, base: number) {
  if (start === length) {
    return [];
  }

  const skipSequence: number[] = scan(length, canFollow, start + 1, base);

  if (base === -1 || canFollow(base, start)) {
    const thisSequence: number[] = [start].concat(scan(length, canFollow, start + 1, start));
    if (thisSequence.length >= skipSequence.length) {
      return thisSequence;
    }
  }
  return skipSequence;
}

export function* lsScanBrute(length: number, canFollow: (i0: number, i1: number) => boolean) {
  const out = scan(length, canFollow, 0, -1);
  for (const v of out) {
    yield v;
  }
}
