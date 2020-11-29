import { Message } from "../message";
import { Event } from "../event";

export interface MoneySentPayload {
  amount: string;
  to: string;
}

export type MoneySentMessage = Message<MoneySentPayload>;
export type MoneySentEvent = Event<MoneySentMessage>;
