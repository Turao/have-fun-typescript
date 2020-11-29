import { from, interval, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

const create_connection = async (options: string): Promise<string> => {
  return new Promise((resolve) => setTimeout(() => resolve(options), 3000));
};

const create_channel = async (connection: string) => {
  console.log("Creating channel for connection", connection);
  return connection;
};

// configure
const pool = ["ahoy-0", "ahoy-1"];

// set up the connection
const connections = from(pool).pipe(mergeMap(create_connection));

// set up the channel
const channels = from(connections).pipe(mergeMap(create_channel));

// network failure

// retry
const consume_from = (queue: string) => (channel: string) => {
  console.log("Consuming from:", queue, "using channel:", channel);
  return queue;
};

const queue = "queue";
const listeners = from(channels).pipe(map(consume_from(queue)));

// listeners.subscribe(console.log);

const messages = interval(1000);

// messages.subscribe(console.log);
