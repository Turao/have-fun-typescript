export interface Message<P> {
  correlationId: string;
  version: number;
  payload: P;
}
