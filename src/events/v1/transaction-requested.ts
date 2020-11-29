import { Message } from "../message";
import { Event } from "../event";

export interface TransactionRequestedPayload {
  amount: number;
  to: string;
}

export type TransactionRequestedMessage = Message<TransactionRequestedPayload>;
export type TransactionRequestedEvent = Event<TransactionRequestedMessage>;
