interface ClientOptions {
  name: string;
}

function Client(options: ClientOptions) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    console.log({ options });
    constructor.prototype.name = options.name;
  };
}

@Client({ name: "Listener" })
export class App {
  constructor() {}

  test() {
    // @ts-ignore
    console.log("client", this.name);
  }
}

new App().test();
