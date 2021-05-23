const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((fn, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(fn(a));
  }
  return res;
});

const filter = curry((fn, iter) => {
  const res = [];
  for (const a of iter) {
    if (fn(a)) res.push(a);
  }
  return res;
});

const reduce = curry((fn, iter, acc) => {
  if (acc === undefined) {
    iter = iter[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = fn(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, fn) => fn(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
