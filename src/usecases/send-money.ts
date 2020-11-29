import { ConsumeEvent } from "../ports/consume-event";
import { Queue } from "../decorators/queue";
import { FeatureToggle } from "../decorators/feature-toggle";
import {
  ApplicationEventListener,
  ApplicationEventPublisher,
} from "../decorators/application-events";

import * as dotenv from "dotenv";
import { Publisher } from "../decorators/publisher";
import { SendMoney } from "../ports/send-money";
import { Account } from "../domain/account";
import { SendHalfMoney } from "../ports/send-half-money";
import {
  TransactionRequestedEvent,
  TransactionRequestedMessage,
} from "../events/v1/transaction-requested";
dotenv.config();

export class SendMoneyUseCase
  implements SendMoney, SendHalfMoney, ConsumeEvent<TransactionRequestedEvent> {
  @Queue({ name: process.env.v0_TRANSACTION_REQUESTED_QUEUE as string })
  onEvent(message: TransactionRequestedMessage) {
    console.log(
      `Transaction requested: Version[${message.version}] - Money[${message.payload.amount}] -> Account[${message.payload.to}]`
    );

    message.version === 0
      ? this.sendHalf(message.payload.amount, { number: message.payload.to })
      : this.send(message.payload.amount, { number: message.payload.to });
  }

  @FeatureToggle({ enabled: true }) // self explanatory
  @Queue({ name: process.env.v1_MONEY_SENT_QUEUE as string }) // declares queue on startup
  @Publisher({ queue: process.env.v1_MONEY_SENT_QUEUE as string }) // creates publisher channel when method is called
  @ApplicationEventPublisher("money-sent")
  send(amount: number, account: Account) {
    console.log(`Sending Money[${amount} USD] to Account[${account.number}]`);
    return amount;
  }

  @FeatureToggle({ enabled: true }) // self explanatory
  @Queue({ name: process.env.v0_MONEY_SENT_QUEUE as string }) // declares queue on startup
  @Publisher({ queue: process.env.v0_MONEY_SENT_QUEUE as string }) // creates publisher channel when method is called
  sendHalf(amount: number, account: Account) {
    const new_amount = amount * 0.5;
    console.log(
      `Sending Money[${new_amount} USD] to Account[${account.number}]`
    );
  }

  @ApplicationEventListener("money-sent")
  onMoneySent(amount: number) {
    console.log(`Money[${amount}] was sent!`);
  }
}

// new SendMoneyUseCase().send(200, { number: "account-123" });
// new SendMoneyUseCase().sendHalf(200, { number: "account-123" });

const v1: TransactionRequestedMessage = {
  correlationId: "1",
  version: 1,
  payload: {
    amount: 200,
    to: "123",
  },
};

new SendMoneyUseCase().onEvent(v1);

const v0: TransactionRequestedMessage = {
  correlationId: "1",
  version: 0,
  payload: {
    amount: 200,
    to: "123",
  },
};

new SendMoneyUseCase().onEvent(v0);
