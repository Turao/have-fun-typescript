// import { v4 as uuid } from "uuid";

// export interface ConsumerOptions {
//   name: string;
// }

// const sleep = (ms: number) =>
//   Promise.resolve((resolve: Function) => setTimeout(resolve, ms));

// export function Consumer(options: ConsumerOptions) {
//   return function (
//     target: any,
//     key: PropertyKey,
//     descriptor: PropertyDescriptor
//   ) {
//     const originalMethod = descriptor.value;
//     descriptor.value = async (...args: any[]) => {
//       const channel = {
//         name: `${options.name}-${}`,
//       };
//       console.log(`Opening new Channel[${channel.name}]`);
//       await sleep(2000);
//       console.log(`Listening to Queue[${options.name}]`);
//       originalMethod(...args);
//       console.log(`Closing Channel[${channel.name}]`);
//       await sleep(2000);
//     };
//     return descriptor;
//   };
// }
