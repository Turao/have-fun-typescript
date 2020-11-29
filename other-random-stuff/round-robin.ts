function* rr(...args: any[]) {
  const size = args.length;
  let current = 0;
  while (true) {
    yield args[current];
    current = current + 1 < size ? current + 1 : 0;
  }
}

const replicas = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const pool = rr(...replicas);
for (let i = 0; i < 20; i++) {
  console.log("connecting to:", pool.next().value);
}
