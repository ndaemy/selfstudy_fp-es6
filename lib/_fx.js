const map = (fn, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(fn(a));
  }
  return res;
}

const filter = (fn, iter) => {
  const res = [];
  for (const a of iter) {
    if (fn(a)) res.push(a);
  }
  return res;
}

const reduce = (fn, iter, acc) => {
  if (acc === undefined) {
    iter = iter[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = fn(acc, a);
  }
  return acc;
}