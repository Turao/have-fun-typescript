import { Account } from "../domain/account";

export interface SendHalfMoney {
  sendHalf: (amount: number, to: Account) => void;
}
