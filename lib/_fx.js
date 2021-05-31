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

const reduce = curry((fn, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = fn(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, fn) => fn(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const range = l => {
  const result = [];
  for (let i = 0; i < l; i++) {
    result.push(i);
  }
  return result;
}

const take = curry((l, iter) => {
  const result = [];
  for (const a of iter) {
    result.push(a);
    if (result.length === l) return result;
  }
  return result;
});

const L = {};

L.range = function* (l) {
  for (let i = 0; i < l; i++) {
    yield i;
  }
}

L.map = curry(function* (fn, iter) {
  for (const a of iter) {
    yield fn(a);
  }
});

L.filter = curry(function* (fn, iter) {
  for (const a of iter) {
    if (fn(a)) {
      yield a;
    }
  }
});
