import { Message } from "./message";

export interface Event<M extends Message<any>> {
  queue: string;
  message: M;
}
