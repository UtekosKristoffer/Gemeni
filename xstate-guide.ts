# `@xstate/store`

XState Store is a library for **simple event-based state management**. If you want a state management library that allows you to update a store's state via events, `@xstate/store` is a great option. If you need more complex application logic needs, like state machines/statecharts, effects, communicating actors, and more, consider [using XState instead](https://github.com/statelyai/xstate).

- **Extremely simple**: transitions update state via events, just like Redux, Zustand, Pinia, etc.
- **Extremely small**: less than 1kb minified/gzipped
- **XState compatible**: use it with (or without) XState, or convert to XState machines when you need to handle more complex logic & effects.
- **Extra type-safe**: great typing out of the box, with strong inference and no awkwardness.

> [!NOTE]
> This readme is written for [TypeScript](#typescript) users. If you are a JavaScript user, just remove the types.

## Quick start

```ts
import { createStore } from '@xstate/store';

export const donutStore = createStore({
  context: {
    donuts: 0,
    favoriteFlavor: 'chocolate'
  },
  on: {
    addDonut: (context) => ({
      ...context,
      donuts: context.donuts + 1
    }),
    changeFlavor: (context, event: { flavor: string }) => ({
      ...context,
      favoriteFlavor: event.flavor
    }),
    eatAllDonuts: (context) => ({
      ...context,
      donuts: 0
    })
  }
});

donutStore.subscribe((snapshot) => {
  console.log(snapshot.context);
});

// Equivalent to
// donutStore.send({ type: 'addDonut' });
donutStore.trigger.addDonut();
// => { donuts: 1, favoriteFlavor: 'chocolate' }

// donutStore.send({
//   type: 'changeFlavor',
//   flavor: 'strawberry' // Strongly-typed!
// });
donutStore.trigger.changeFlavor({ flavor: 'strawberry' });
// => { donuts: 1, favoriteFlavor: 'strawberry' }
```

<details>
<summary>Note: Deprecated <code>createStore(context, transitions)</code> API

</summary>

The previous version of `createStore` took two arguments: an initial context and an object of event handlers. This API is still supported but deprecated. Here's an example of the old usage:

```ts
import { createStore } from '@xstate/store';

const donutStore = createStore(
  {
    donuts: 0,
    favoriteFlavor: 'chocolate'
  },
  {
    addDonut: (context) => ({ ...context, donuts: context.donuts + 1 }),
    changeFlavor: (context, event: { flavor: string }) => ({
      ...context,
      favoriteFlavor: event.flavor
    }),
    eatAllDonuts: (context) => ({ ...context, donuts: 0 })
  }
);
```

We recommend using the new API for better type inference and more explicit configuration.

</details>

## Usage with React

Import `useSelector` from `@xstate/store/react`. Select the data you want via `useSelector(…)` and send events using `store.send(eventObject)`:

```tsx
import { donutStore } from './donutStore.ts';
import { useSelector } from '@xstate/store/react';

function DonutCounter() {
  const donutCount = useSelector(donutStore, (state) => state.context.donuts);

  return (
    <div>
      <button onClick={() => donutStore.send({ type: 'addDonut' })}>
        Add donut ({donutCount})
      </button>
    </div>
  );
}
```

## Usage with SolidJS

Import `useSelector` from `@xstate/store/solid`. Select the data you want via `useSelector(…)` and send events using `store.send(eventObject)`:

```tsx
import { donutStore } from './donutStore.ts';
import { useSelector } from '@xstate/store/solid';

function DonutCounter() {
  const donutCount = useSelector(donutStore, (state) => state.context.donuts);

  return (
    <div>
      <button onClick={() => donutStore.send({ type: 'addDonut' })}>
        Add donut ({donutCount()})
      </button>
    </div>
  );
}
```

## Usage with Immer

XState Store makes it really easy to integrate with immutable update libraries like [Immer](https://github.com/immerjs/immer) or [Mutative](https://github.com/unadlib/mutative). Pass the `produce` function into `createStoreWithProducer(producer, …)`, and update `context` in transition functions using the convenient pseudo-mutative API:

```ts
import { createStoreWithProducer } from '@xstate/store';
import { produce } from 'immer'; // or { create } from 'mutative'

const donutStore = createStoreWithProducer(produce, {
  context: {
    donuts: 0,
    favoriteFlavor: 'chocolate'
  },
  on: {
    addDonut: (context) => {
      context.donuts++; // "Mutation" (thanks to the producer)
    },
    changeFlavor: (context, event: { flavor: string }) => {
      context.favoriteFlavor = event.flavor;
    },
    eatAllDonuts: (context) => {
      context.donuts = 0;
    }
  }
});

// Everything else is the same!
```

## TypeScript

XState Store is written in TypeScript and provides full type safety, _without_ you having to specify generic type parameters. The `context` type is inferred from the initial context object, and the event types are inferred from the event object payloads you provide in the transition functions.

```ts
import { createStore } from '@xstate/store';

const donutStore = createStore({
  // Context inferred as:
  // {
  //   donuts: number;
  //   favoriteFlavor: string;
  // }
  context: {
    donuts: 0,
    favoriteFlavor: 'chocolate'
  },
  on: {
    // Event inferred as:
    // {
    //   type: 'changeFlavor';
    //   flavor: string;
    // }
    changeFlavor: (context, event: { flavor: string }) => {
      context.favoriteFlavor = event.flavor;
    }
  }
});

donutStore.getSnapshot().context.favoriteFlavor; // string

donutStore.send({
  type: 'changeFlavor', // Strongly-typed from transition key
  flavor: 'strawberry' // Strongly-typed from { flavor: string }
});
```

If you want to make the `context` type more specific, you can strongly type the `context` outside of `createStore(…)` and pass it in:

```ts
import { createStore } from '@xstate/store';

interface DonutContext {
  donuts: number;
  favoriteFlavor: 'chocolate' | 'strawberry' | 'blueberry';
}

const donutContext: DonutContext = {
  donuts: 0,
  favoriteFlavor: 'chocolate'
};

const donutStore = createStore({
  context: donutContext,
  on: {
    // ... (transitions go here)
  }
});
```

## Effects and Side Effects

You can enqueue effects in state transitions using the `enqueue` argument:

```ts
import { createStore } from '@xstate/store';

const store = createStore({
  context: { count: 0 },
  on: {
    incrementDelayed: (context, event, enqueue) => {
      enqueue.effect(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        store.send({ type: 'increment' });
      });

      return context;
    },
    increment: (context) => ({
      ...context,
      count: context.count + 1
    })
  }
});
```

## Emitting Events

You can emit events from transitions by defining them in the `emits` property and using `enqueue.emit`:

```ts
import { createStore } from '@xstate/store';

const store = createStore({
  context: { count: 0 },
  emits: {
    increased: (payload: { by: number }) => {
      // Optional side effects can go here
    }
  },
  on: {
    inc: (context, event: { by: number }, enqueue) => {
      enqueue.emit.increased({ by: event.by });

      return {
        ...context,
        count: context.count + event.by
      };
    }
  }
});

// Listen for emitted events
store.on('increased', (event) => {
  console.log(`Count increased by ${event.by}`);
});
```

# @xstate/react

This package contains utilities for using [XState](https://github.com/statelyai/xstate) with [React](https://github.com/facebook/react/).

- [Read the full documentation in the XState docs](https://stately.ai/docs/xstate-react).
- [Read our contribution guidelines](https://github.com/statelyai/xstate/blob/main/CONTRIBUTING.md).

## Quick start

1. Install `xstate` and `@xstate/react`:

```bash
npm i xstate @xstate/react
```

2. Import the `useMachine` hook:

```tsx
import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

export const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send({ type: 'TOGGLE' })}>
      {state.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'}
    </button>
  );
};
```
import { Actor, ActorOptions, AnyActorLogic, SnapshotFrom, type ConditionalRequired, type IsNotNever, type RequiredActorOptionsKeys } from 'xstate';
export declare function useActor<TLogic extends AnyActorLogic>(logic: TLogic, ...[options]: ConditionalRequired<[
    options?: ActorOptions<TLogic> & {
        [K in RequiredActorOptionsKeys<TLogic>]: unknown;
    }
], IsNotNever<RequiredActorOptionsKeys<TLogic>>>): [SnapshotFrom<TLogic>, Actor<TLogic>['send'], Actor<TLogic>];


                                     
                                     import { Actor, ActorOptions, AnyActorLogic, Observer, SnapshotFrom, type ConditionalRequired, type IsNotNever, type RequiredActorOptionsKeys } from 'xstate';
export declare function useIdleActorRef<TLogic extends AnyActorLogic>(logic: TLogic, ...[options]: ConditionalRequired<[
    options?: ActorOptions<TLogic> & {
        [K in RequiredActorOptionsKeys<TLogic>]: unknown;
    }
], IsNotNever<RequiredActorOptionsKeys<TLogic>>>): Actor<TLogic>;
export declare function useActorRef<TLogic extends AnyActorLogic>(machine: TLogic, ...[options, observerOrListener]: IsNotNever<RequiredActorOptionsKeys<TLogic>> extends true ? [
    options: ActorOptions<TLogic> & {
        [K in RequiredActorOptionsKeys<TLogic>]: unknown;
    },
    observerOrListener?: Observer<SnapshotFrom<TLogic>> | ((value: SnapshotFrom<TLogic>) => void)
] : [
    options?: ActorOptions<TLogic>,
    observerOrListener?: Observer<SnapshotFrom<TLogic>> | ((value: SnapshotFrom<TLogic>) => void)
]): Actor<TLogic>;

import * as React from 'react';
import { Actor, ActorOptions, AnyActorLogic, SnapshotFrom } from 'xstate';
export declare function createActorContext<TLogic extends AnyActorLogic>(actorLogic: TLogic, actorOptions?: ActorOptions<TLogic>): {
    useSelector: <T>(selector: (snapshot: SnapshotFrom<TLogic>) => T, compare?: (a: T, b: T) => boolean) => T;
    useActorRef: () => Actor<TLogic>;
    Provider: (props: {
        children: React.ReactNode;
        options?: ActorOptions<TLogic>;
        /** @deprecated Use `logic` instead. */
        machine?: never;
        logic?: TLogic;
    }) => React.ReactElement<any, any>;
};


                                     
import { Actor, ActorOptions, AnyStateMachine, StateFrom, type ConditionalRequired, type IsNotNever, type RequiredActorOptionsKeys } from 'xstate';
/** @alias useActor */
export declare function useMachine<TMachine extends AnyStateMachine>(machine: TMachine, ...[options]: ConditionalRequired<[
    options?: ActorOptions<TMachine> & {
        [K in RequiredActorOptionsKeys<TMachine>]: unknown;
    }
], IsNotNever<RequiredActorOptionsKeys<TMachine>>>): [StateFrom<TMachine>, Actor<TMachine>['send'], Actor<TMachine>];


import { AnyActorRef } from 'xstate';
export declare function useSelector<TActor extends Pick<AnyActorRef, 'subscribe' | 'getSnapshot'> | undefined, T>(actor: TActor, selector: (snapshot: TActor extends {
    getSnapshot(): infer TSnapshot;
} ? TSnapshot : undefined) => T, compare?: (a: T, b: T) => boolean): T;

export declare function shallowEqual(objA: any, objB: any): boolean;




import { Atom, AtomOptions, Readable, ReadonlyAtom } from "./types.js";
type AsyncAtomState<Data, Error = unknown> = {
    status: 'pending';
} | {
    status: 'done';
    data: Data;
} | {
    status: 'error';
    error: Error;
};
export declare function createAsyncAtom<T>(getValue: () => Promise<T>, options?: AtomOptions<AsyncAtomState<T>>): ReadonlyAtom<AsyncAtomState<T>>;
export declare function createAtom<T>(getValue: (read: <U>(atom: Readable<U>) => U) => T, options?: AtomOptions<T>): ReadonlyAtom<T>;
export declare function createAtom<T>(initialValue: T, options?: AtomOptions<T>): Atom<T>;
export {};



import { ActorLogic } from 'xstate';
import { EventPayloadMap, StoreContext, StoreSnapshot, EventObject, ExtractEvents, StoreAssigner } from "./types.js";
type StoreLogic<TContext extends StoreContext, TEvent extends EventObject, TInput, TEmitted extends EventObject> = ActorLogic<StoreSnapshot<TContext>, TEvent, TInput, any, TEmitted>;
/**
 * An actor logic creator which creates store [actor
 * logic](https://stately.ai/docs/actors#actor-logic) for use with XState.
 *
 * @param config An object containing the store configuration
 * @param config.context The initial context for the store, either a function
 *   that returns context based on input, or the context itself
 * @param config.on An object defining the transitions for different event types
 * @param config.emits Optional object to define emitted event handlers
 * @returns An actor logic creator function that creates store actor logic
 */
export declare function fromStore<TContext extends StoreContext, TEventPayloadMap extends EventPayloadMap, TInput, TEmitted extends EventPayloadMap>(config: {
    context: ((input: TInput) => TContext) | TContext;
    on: {
        [K in keyof TEventPayloadMap & string]: StoreAssigner<NoInfer<TContext>, {
            type: K;
        } & TEventPayloadMap[K], ExtractEvents<TEmitted>>;
    };
    emits?: {
        [K in keyof TEmitted & string]: (payload: {
            type: K;
        } & TEmitted[K]) => void;
    };
}): StoreLogic<TContext, ExtractEvents<TEventPayloadMap>, TInput, ExtractEvents<TEmitted>>;
export {};


import { EnqueueObject, EventObject, EventPayloadMap, ExtractEvents, Store, StoreAssigner, StoreContext, StoreConfig, StoreSnapshot, StoreLogic, StoreTransition, SpecificStoreConfig } from "./types.js";
export type TransitionsFromEventPayloadMap<TEventPayloadMap extends EventPayloadMap, TContext extends StoreContext, TEmitted extends EventObject> = {
    [K in keyof TEventPayloadMap & string]: StoreAssigner<TContext, {
        type: K;
    } & TEventPayloadMap[K], TEmitted>;
};
/**
 * Creates a **store** that has its own internal state and can be sent events
 * that update its internal state based on transitions.
 *
 * @example
 *
 * ```ts
 * const store = createStore({
 *   context: { count: 0, name: 'Ada' },
 *   on: {
 *     inc: (context, event: { by: number }) => ({
 *       ...context,
 *       count: context.count + event.by
 *     })
 *   }
 * });
 *
 * store.subscribe((snapshot) => {
 *   console.log(snapshot);
 * });
 *
 * store.send({ type: 'inc', by: 5 });
 * // Logs { context: { count: 5, name: 'Ada' }, status: 'active', ... }
 * ```
 *
 * @param config - The store configuration object
 * @param config.context - The initial state of the store
 * @param config.on - An object mapping event types to transition functions
 * @param config.emits - An object mapping emitted event types to handlers
 * @returns A store instance with methods to send events and subscribe to state
 *   changes
 */
export declare function createStore<TContext extends StoreContext, TEventPayloadMap extends EventPayloadMap, TEmittedPayloadMap extends EventPayloadMap>(definition: StoreConfig<TContext, TEventPayloadMap, TEmittedPayloadMap>): Store<TContext, ExtractEvents<TEventPayloadMap>, ExtractEvents<TEmittedPayloadMap>>;
export declare function createStore<TContext extends StoreContext, TEvent extends EventObject, TEmitted extends EventObject>(definition: SpecificStoreConfig<TContext, TEvent, TEmitted> | StoreLogic<StoreSnapshot<TContext>, TEvent, TEmitted>): Store<TContext, TEvent, TEmitted>;
export declare const createStoreConfig: {
    <TContext extends StoreContext, TEventPayloadMap extends EventPayloadMap, TEmitted extends EventPayloadMap>(definition: StoreConfig<TContext, TEventPayloadMap, TEmitted>): StoreConfig<TContext, TEventPayloadMap, TEmitted>;
    <TContext extends StoreContext, TEventPayloadMap extends EventPayloadMap, TEmitted extends EventPayloadMap>(definition: StoreConfig<TContext, TEventPayloadMap, TEmitted>): StoreConfig<TContext, TEventPayloadMap, TEmitted>;
};
/**
 * Creates a `Store` with a provided producer (such as Immer's `producer(…)` A
 * store has its own internal state and can receive events.
 *
 * @example
 *
 * ```ts
 * import { produce } from 'immer';
 *
 * const store = createStoreWithProducer(produce, {
 *   context: { count: 0 },
 *   on: {
 *     inc: (context, event: { by: number }) => {
 *       context.count += event.by;
 *     }
 *   }
 * });
 *
 * store.subscribe((snapshot) => {
 *   console.log(snapshot);
 * });
 *
 * store.send({ type: 'inc', by: 5 });
 * // Logs { context: { count: 5 }, status: 'active', ... }
 * ```
 */
export declare function createStoreWithProducer<TContext extends StoreContext, TEventPayloadMap extends EventPayloadMap, TEmittedPayloadMap extends EventPayloadMap>(producer: NoInfer<(context: TContext, recipe: (context: TContext) => void) => TContext>, config: {
    context: TContext;
    on: {
        [K in keyof TEventPayloadMap & string]: (context: NoInfer<TContext>, event: {
            type: K;
        } & TEventPayloadMap[K], enqueue: EnqueueObject<ExtractEvents<TEmittedPayloadMap>>) => void;
    };
    emits?: {
        [K in keyof TEmittedPayloadMap & string]: (payload: TEmittedPayloadMap[K]) => void;
    };
}): Store<TContext, ExtractEvents<TEventPayloadMap>, ExtractEvents<TEmittedPayloadMap>>;
declare global {
    interface SymbolConstructor {
        readonly observable: symbol;
    }
}
/**
 * Creates a store transition function that handles state updates based on
 * events.
 *
 * @param transitions - An object mapping event types to transition functions
 * @param producer - Optional producer function (e.g., Immer's produce) for
 *   immutable updates
 * @returns A transition function that takes a snapshot and event and returns a
 *   new snapshot with effects
 */
export declare function createStoreTransition<TContext extends StoreContext, TEventPayloadMap extends EventPayloadMap, TEmitted extends EventObject>(transitions: {
    [K in keyof TEventPayloadMap & string]: StoreAssigner<TContext, {
        type: K;
    } & TEventPayloadMap[K], TEmitted>;
}, producer?: (context: TContext, recipe: (context: TContext) => void) => TContext): StoreTransition<TContext, ExtractEvents<TEventPayloadMap>, TEmitted>;


import type { ReactiveNode } from "./alien.js";
export type EventPayloadMap = Record<string, {} | null | undefined>;
export type ExtractEvents<T extends EventPayloadMap> = Values<{
    [K in keyof T & string]: T[K] & {
        type: K;
    };
}>;
export type Recipe<T, TReturn> = (state: T) => TReturn;
type AllKeys<T> = T extends any ? keyof T : never;
type EmitterFunction<TEmittedEvent extends EventObject> = (...args: {
    type: TEmittedEvent['type'];
} extends TEmittedEvent ? AllKeys<TEmittedEvent> extends 'type' ? [] : [DistributiveOmit<TEmittedEvent, 'type'>?] : [DistributiveOmit<TEmittedEvent, 'type'>]) => void;
export type EnqueueObject<TEmittedEvent extends EventObject> = {
    emit: {
        [E in TEmittedEvent as E['type']]: EmitterFunction<E>;
    };
    effect: (fn: () => void) => void;
};
export type StoreEffect<TEmitted extends EventObject> = (() => void) | TEmitted;
export type StoreAssigner<TContext extends StoreContext, TEvent extends EventObject, TEmitted extends EventObject> = (context: TContext, event: TEvent, enq: EnqueueObject<TEmitted>) => TContext | void;
export type StoreProducerAssigner<TContext extends StoreContext, TEvent extends EventObject, TEmitted extends EventObject> = (context: TContext, event: TEvent, enq: EnqueueObject<TEmitted>) => void;
export type Snapshot<TOutput> = {
    status: 'active';
    output: undefined;
    error: undefined;
} | {
    status: 'done';
    output: TOutput;
    error: undefined;
} | {
    status: 'error';
    output: undefined;
    error: unknown;
} | {
    status: 'stopped';
    output: undefined;
    error: undefined;
};
export type StoreSnapshot<TContext> = Snapshot<undefined> & {
    context: TContext;
};
/**
 * An actor-like object that:
 *
 * - Has its own state
 * - Can receive events
 * - Is observable
 */
export interface Store<TContext extends StoreContext, TEvent extends EventObject, TEmitted extends EventObject> extends Subscribable<StoreSnapshot<TContext>>, InteropObservable<StoreSnapshot<TContext>>, BaseAtom<StoreSnapshot<TContext>> {
    send: (event: TEvent) => void;
    getSnapshot: () => StoreSnapshot<TContext>;
    /** @alias getSnapshot */
    get: () => StoreSnapshot<TContext>;
    getInitialSnapshot: () => StoreSnapshot<TContext>;
    /**
     * Subscribes to [inspection events](https://stately.ai/docs/inspection) from
     * the store.
     *
     * Inspectors that call `store.inspect(…)` will immediately receive an
     * "@xstate.actor" inspection event.
     */
    inspect: (observer: Observer<StoreInspectionEvent> | ((inspectionEvent: StoreInspectionEvent) => void)) => Subscription;
    sessionId: string;
    on: <TEmittedType extends TEmitted['type']>(eventType: TEmittedType, emittedEventHandler: (emittedEvent: Compute<TEmitted & {
        type: TEmittedType;
    }>) => void) => Subscription;
    /**
     * A proxy object that allows you to send events to the store without manually
     * constructing event objects.
     *
     * @example
     *
     * ```ts
     * // Equivalent to:
     * // store.send({ type: 'increment', by: 1 });
     * store.trigger.increment({ by: 1 });
     * ```
     */
    trigger: {
        [E in TEvent as E['type'] & string]: IsEmptyObject<DistributiveOmit<E, 'type'>> extends true ? () => void : (eventPayload: DistributiveOmit<E, 'type'>) => void;
    };
    select<TSelected>(selector: Selector<TContext, TSelected>, equalityFn?: (a: TSelected, b: TSelected) => boolean): Selection<TSelected>;
    /**
     * Returns the next state and effects for the given state and event, as a
     * tuple.
     *
     * @example
     *
     * ```ts
     * const [nextState, effects] = store.transition(store.getSnapshot(), {
     *   type: 'increment',
     *   by: 1
     * });
     * ```
     */
    transition: StoreTransition<TContext, TEvent, TEmitted>;
}
export type StoreTransition<TContext extends StoreContext, TEvent extends EventObject, TEmitted extends EventObject> = (state: StoreSnapshot<TContext>, event: TEvent) => [StoreSnapshot<TContext>, StoreEffect<TEmitted>[]];
export type StoreConfig<TContext extends StoreContext, TEventPayloadMap extends EventPayloadMap, TEmitted extends EventPayloadMap> = {
    context: TContext;
    emits?: {
        [K in keyof TEmitted & string]: (payload: TEmitted[K]) => void;
    };
    on: {
        [K in keyof TEventPayloadMap & string]: StoreAssigner<TContext, {
            type: K;
        } & TEventPayloadMap[K], ExtractEvents<TEmitted>>;
    };
};
export type SpecificStoreConfig<TContext extends StoreContext, TEvent extends EventObject, TEmitted extends EventObject> = {
    context: TContext;
    emits?: {
        [E in TEmitted as E['type']]: (payload: E) => void;
    };
    on: {
        [E in TEvent as E['type']]: StoreAssigner<TContext, E, TEmitted>;
    };
};
type IsEmptyObject<T> = T extends Record<string, never> ? true : false;
export type AnyStore = Store<any, any, any>;
type Compute<A> = {
    [K in keyof A]: A[K];
};
export type SnapshotFromStore<TStore extends Store<any, any, any>> = TStore extends Store<infer TContext, any, any> ? StoreSnapshot<TContext> : never;
/**
 * Extract the type of events from a `Store`.
 *
 * @example
 *
 * ```ts
 * const store = createStore(
 *   { count: 0 },
 *   {
 *     inc: (context, event: { by: number }) => ({
 *       count: context.count + event.by
 *     }),
 *     dec: (context, event: { by: number }) => ({
 *       count: context.count - event.by
 *     })
 *   }
 * );
 * type StoreEvent = EventFromStore<typeof store>;
 * //   ^? { type: 'inc', by: number } | { type: 'dec', by: number }
 * ```
 *
 * @example
 *
 * Using utility types derived from `EventFromStore` to create individual
 * type-safe event transition functions for a store:
 *
 * ```ts
 * import {
 *   createStore,
 *   type EventFromStore,
 *   type Store
 * } from '@xstate/store';
 *
 * // Extract the event where `Type` matches the event's `type` from the given
 * // `Store`.
 * type EventByType<
 *   TStore extends Store<any, any>,
 *   Type extends EventFromStore<TStore>['type']
 * > = Extract<EventFromStore<TStore>, { type: Type }>;
 *
 * // Extract a specific store event's "input" type (the event type without the
 * // `type` property).
 * type EventInputByType<
 *   TStore extends Store<any, any>,
 *   Type extends EventFromStore<TStore>['type']
 * > = Omit<EventByType<TStore, Type>, 'type'>;
 *
 * const store = createStore(
 *   { count: 0 },
 *   {
 *     add: (context, event: { addend: number }) => ({
 *       count: context.count + event.addend
 *     }),
 *     multiply: (context, event: { multiplier: number }) => ({
 *       count: context.count * event.multiplier
 *     })
 *   }
 * );
 *
 * const add = (input: EventInputByType<typeof store, 'add'>) =>
 *   store.send({ type: 'add', addend: input.addend });
 *
 * add({ addend: 1 }); // sends { type: 'add', addend: 1 }
 *
 * const multiply = (input: EventInputByType<typeof store, 'multiply'>) =>
 *   store.send({ type: 'multiply', multiplier: input.multiplier });
 *
 * multiply({ multiplier: 2 }); // sends { type: 'multiply', multiplier: 2 }
 * ```
 */
export type EventFromStore<TStore extends Store<any, any, any>> = TStore extends Store<infer _TContext, infer TEvent, infer _TEmitted> ? TEvent : never;
export interface InteropSubscribable<T> {
    subscribe(observer: Observer<T>): Subscription;
}
interface InteropObservable<T> {
    [Symbol.observable]: () => InteropSubscribable<T>;
}
export type Observer<T> = {
    next?: (value: T) => void;
    error?: (err: unknown) => void;
    complete?: () => void;
};
export interface Subscription {
    unsubscribe(): void;
}
export interface Subscribable<T> extends InteropSubscribable<T> {
    subscribe(observer: Observer<T>): Subscription;
    subscribe(next: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
}
export type StoreContext = Record<string, any>;
/** The full definition of an event, with a string `type`. */
export type EventObject = {
    /** The type of event that is sent. */
    type: string;
};
type Values<T> = T[keyof T];
export type StoreInspectionEvent = StoreInspectedSnapshotEvent | StoreInspectedEventEvent | StoreInspectedActorEvent;
interface StoreBaseInspectionEventProperties {
    rootId: string;
    /**
     * The relevant actorRef for the inspection event.
     *
     * - For snapshot events, this is the `actorRef` of the snapshot.
     * - For event events, this is the target `actorRef` (recipient of event).
     * - For actor events, this is the `actorRef` of the registered actor.
     */
    actorRef: ActorRefLike;
}
export interface StoreInspectedSnapshotEvent extends StoreBaseInspectionEventProperties {
    type: '@xstate.snapshot';
    event: AnyEventObject;
    snapshot: Snapshot<unknown>;
}
export interface StoreInspectedActionEvent extends StoreBaseInspectionEventProperties {
    type: '@xstate.action';
    action: {
        type: string;
        params: Record<string, unknown>;
    };
}
export interface StoreInspectedEventEvent extends StoreBaseInspectionEventProperties {
    type: '@xstate.event';
    sourceRef: AnyStore | undefined;
    event: AnyEventObject;
}
interface AnyEventObject {
    type: string;
    [key: string]: any;
}
export interface StoreInspectedActorEvent extends StoreBaseInspectionEventProperties {
    type: '@xstate.actor';
}
export type ActorRefLike = {
    sessionId: string;
    send: (event: any) => void;
    getSnapshot: () => any;
};
export type Selector<TContext, TSelected> = (context: TContext) => TSelected;
export type Selection<TSelected> = Readable<TSelected>;
export interface Readable<T> extends Subscribable<T> {
    get: () => T;
}
export interface BaseAtom<T> extends Subscribable<T>, Readable<T> {
}
export interface InternalBaseAtom<T> extends Subscribable<T>, Readable<T> {
}
export interface Atom<T> extends BaseAtom<T> {
    /** Sets the value of the atom using a function. */
    set(fn: (prevVal: T) => T): void;
    /** Sets the value of the atom. */
    set(value: T): void;
}
export interface AtomOptions<T> {
    compare?: (prev: T, next: T) => boolean;
}
export type AnyAtom = BaseAtom<any>;
export interface InternalReadonlyAtom<T> extends InternalBaseAtom<T>, ReactiveNode {
}
/**
 * An atom that is read-only and cannot be set.
 *
 * @example
 *
 * ```ts
 * const atom = createAtom(() => 42);
 * // @ts-expect-error - Cannot set a readonly atom
 * atom.set(43);
 * ```
 */
export interface ReadonlyAtom<T> extends BaseAtom<T> {
}
/** A version of `Omit` that works with distributive types. */
type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never;
export type StoreLogic<TSnapshot extends StoreSnapshot<any>, TEvent extends EventObject, TEmitted extends EventObject> = {
    getInitialSnapshot: () => TSnapshot;
    transition: (snapshot: TSnapshot, event: TEvent) => [TSnapshot, StoreEffect<TEmitted>[]];
};
export type AnyStoreLogic = StoreLogic<any, any, any>;
export type AnyStoreConfig = StoreConfig<any, any, any>;
export type EventFromStoreConfig<TStore extends AnyStoreConfig> = TStore extends StoreConfig<any, infer TEventPayloadMap, any> ? ExtractEvents<TEventPayloadMap> : never;
export type EmitsFromStoreConfig<TStore extends AnyStoreConfig> = TStore extends StoreConfig<any, any, infer TEmitted> ? ExtractEvents<TEmitted> : never;
export type ContextFromStoreConfig<TStore extends AnyStoreConfig> = TStore extends StoreConfig<infer TContext, any, any> ? TContext : never;
export {};
