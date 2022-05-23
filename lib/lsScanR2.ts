export function* lsScanR2(length: number, canFollow: (i0: number, i1: number) => boolean) {
  const best = [-1];
  const next: number[] = [];
  while (next.length < length) {
    next.push(-1);
  }
  for (let idx = length - 1; idx >= 0; idx--) {
    let extendLength = best.length - 1;
    while (extendLength > 0 && !canFollow(idx, best[extendLength])) {
      extendLength--;
    }

    next[idx] = best[extendLength];
    const thisLength = extendLength + 1;
    if (best.length === thisLength) {
      best.push(idx);
    } else {
      best[thisLength] = idx;
    }
  }

  for (let index = best[best.length - 1]; index !== -1; index = next[index]) {
    yield index;
  }
}
