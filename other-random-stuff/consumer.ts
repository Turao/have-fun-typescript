import { Exchange } from "./exchange";

interface ConsumerOptions {
  name: string;
  queue: string;
  routingKey: string;
  exchange: Exchange;
}

function Consumer(options?: ConsumerOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log({ options });
    console.log("in");
    // console.log({ target, propertyKey, descriptor });
    descriptor.value();
    console.log("out");
  };
}

export class MessageHandler {
  @Consumer({
    name: "Listener",
    queue: "queue",
    routingKey: "routing-key",
    exchange: { name: "exchange", type: "direct" },
  })
  test() {
    console.log("test");
  }
}

// new MessageHandler().test();
