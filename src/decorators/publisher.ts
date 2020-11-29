import { v4 as uuid } from "uuid";

export interface PublisherOptions {
  name?: string;
  queue: string;
}

const sleep = (ms: number) =>
  Promise.resolve((resolve: Function) => setTimeout(resolve, ms));

export function Publisher(options: PublisherOptions) {
  return function (
    target: any,
    key: PropertyKey,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async (...args: any[]) => {
      const channel = {
        name: options.name
          ? `${options.name}-${uuid()}`
          : `${key.toString()}-${uuid()}`,
      };
      console.log(`Opening Channel[${channel.name}]`);
      await sleep(2000);
      originalMethod(...args);
      console.log(`Closing Channel[${channel.name}]`);
      await sleep(2000);
    };
    return descriptor;
  };
}
