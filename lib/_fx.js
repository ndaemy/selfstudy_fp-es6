const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

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

const find = curry((fn, iter) => go(
  L.filter(fn, iter),
  take(1),
  ([a]) => a,
))

const L = {};

L.range = function* (l) {
  for (let i = 0; i < l; i++) {
    yield i;
  }
}

L.map = curry(function* (fn, iter) {
  for (const a of iter) yield fn(a);
});

L.filter = curry(function* (fn, iter) {
  for (const a of iter) if (fn(a)) yield a;
});

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
}

const isIterable = a => a && a[Symbol.iterator];

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield *a;
    else yield a;
  }
}

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield *f(a);
    else yield a;
  }
}

const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const flatten = pipe(L.flatten, takeAll);

const deepFlat = pipe(L.deepFlat, takeAll);
