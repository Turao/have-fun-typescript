import { Account } from "../domain/account";

export interface SendMoney {
  send: (amount: number, to: Account) => void;
}
