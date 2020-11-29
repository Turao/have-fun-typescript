import { Event } from "../events/event";

type GetMessageFromEvent<E> = E extends Event<infer M> ? M : any;

export interface ConsumeEvent<E> {
  onEvent: (message: GetMessageFromEvent<E>) => any;
}
