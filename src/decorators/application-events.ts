import { Subject } from "rxjs";

export interface ApplicationEvent {
  event: object;
}

const applicationEvents: Record<string, Subject<ApplicationEvent>> = {};

export function ApplicationEventListener(name: string) {
  return function (
    target: any,
    key: PropertyKey,
    descriptor: PropertyDescriptor
  ) {
    let event$ = applicationEvents[name];

    if (event$ === undefined) {
      console.log(`Registering new Subject[${name}]`);
      event$ = new Subject<ApplicationEvent>();
      applicationEvents[name] = event$;
    }

    console.log(`Subscribing Method[${key.toString()}] to Subject[${name}]`);
    event$.subscribe(descriptor.value);
  };
}

export function ApplicationEventPublisher(name: string) {
  return function (
    target: any,
    key: PropertyKey,
    descriptor: PropertyDescriptor
  ) {
    let event$ = applicationEvents[name];

    if (event$ === undefined) {
      console.log(`Registering new Subject[${name}]`);
      event$ = new Subject<ApplicationEvent>();
      applicationEvents[name] = event$;
    }

    const originalMethod = descriptor.value;
    descriptor.value = (...args: any[]) => {
      const returned: any = originalMethod(...args);
      console.log(`Publishing event to Subject[${name}]`);
      event$.next(returned);
    };
  };
}
