import { Message } from "../message";
import { Event } from "../event";

export interface MoneySentPayload {
  amount: number;
}

export type MoneySentMessage = Message<MoneySentPayload>;
export type MoneySentEvent = Event<MoneySentMessage>;
