export interface QueueOptions {
  name: string;
}

export function Queue(options: QueueOptions) {
  return function (
    target: any,
    key: PropertyKey,
    descriptor: PropertyDescriptor
  ) {
    console.log(
      `Declaring Queue[${options.name}] for Method[${key.toString()}]`
    );
  };
}
