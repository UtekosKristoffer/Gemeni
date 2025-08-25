

const interpret: <TLogic extends AnyActorLogic>(
    logic: TLogic,
    ...[options]: ConditionalRequired<
        [
            options?: ActorOptions<TLogic> & {
                [K in RequiredActorOptionsKeys<TLogic>]: unknown;
            }
        ],
        IsNotNever<RequiredActorOptionsKeys<TLogic>>
    >
) => Actor<TLogic>;


Creates a new Interpreter instance for the given machine with the provided options, if any.

Deprecated
Use createActor instead

variable stop

const stop: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TEvent extends EventObject
>(
    actorRef: ResolvableActorRef<TContext, TExpressionEvent, TParams, TEvent>
) => StopAction<TContext, TExpressionEvent, TParams, TEvent>;
Stops a child actor.

Deprecated
Use stopChild(...) instead

Functions
function and

and: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TArg extends unknown[]
>(
    guards: readonly [
        ...{
            [K in keyof TArg]: SingleGuardArg<
                TContext,
                TExpressionEvent,
                unknown,
                TArg[K]
            >;
        }
    ]
) => GuardPredicate<
    TContext,
    TExpressionEvent,
    unknown,
    NormalizeGuardArgArray<DoNotInfer<TArg>>
>;
Higher-order guard that evaluates to true if all guards passed to it evaluate to true.

Guards

Returns
A guard action object

Example 1

import { setup, and } from 'xstate';

const machine = setup({
  guards: {
    someNamedGuard: () => true
  }
}).createMachine({
  on: {
    someEvent: {
      guard: and([({ context }) => context.value > 0, 'someNamedGuard']),
      actions: () => {
        // will be executed if all guards in `and(...)`
        // evaluate to true
      }
    }
  }
});
function assertEvent

assertEvent: <TEvent extends EventObject, TAssertedType extends TEvent['type']>(
    event: TEvent,
    type: TAssertedType | TAssertedType[]
) => asserts event is TEvent & { type: TAssertedType };
Asserts that the given event object is of the specified type or types. Throws an error if the event object is not of the specified types.

Example 1

// ...
entry: ({ event }) => {
  assertEvent(event, 'doNothing');
  // event is { type: 'doNothing' }
},
// ...
exit: ({ event }) => {
  assertEvent(event, 'greet');
  // event is { type: 'greet'; message: string }

  assertEvent(event, ['greet', 'notify']);
  // event is { type: 'greet'; message: string }
  // or { type: 'notify'; message: string; level: 'info' | 'error' }
},
function assign

assign: <
    TContext extends MachineContext,
    TExpressionEvent extends AnyEventObject,
    TParams extends {},
    TEvent extends EventObject,
    TActor extends ProvidedActor
>(
    assignment:
        | Assigner<LowInfer<TContext>, TExpressionEvent, TParams, TEvent, TActor>
        | PropertyAssigner<
              LowInfer<TContext>,
              TExpressionEvent,
              TParams,
              TEvent,
              TActor
          >
) => ActionFunction<
    TContext,
    TExpressionEvent,
    TEvent,
    TParams,
    TActor,
    never,
    never,
    never,
    never
>;
Updates the current context of the machine.

Parameter assignment
An object that represents the partial context to update, or a function that returns an object that represents the partial context to update.

Example 1

import { createMachine, assign } from 'xstate';

const countMachine = createMachine({
  context: {
    count: 0,
    message: ''
  },
  on: {
    inc: {
      actions: assign({
        count: ({ context }) => context.count + 1
      })
    },
    updateMessage: {
      actions: assign(({ context, event }) => {
        return {
          message: event.message.trim()
        };
      })
    }
  }
});
function cancel

cancel: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TEvent extends EventObject
>(
    sendId: ResolvableSendId<TContext, TExpressionEvent, TParams, TEvent>
) => CancelAction<TContext, TExpressionEvent, TParams, TEvent>;
Cancels a delayed sendTo(...) action that is waiting to be executed. The canceled sendTo(...) action will not send its event or execute, unless the delay has already elapsed before cancel(...) is called.

Parameter sendId
The id of the sendTo(...) action to cancel.

Example 1

import { createMachine, sendTo, cancel } from 'xstate';

const machine = createMachine({
  // ...
  on: {
    sendEvent: {
      actions: sendTo(
        'some-actor',
        { type: 'someEvent' },
        {
          id: 'some-id',
          delay: 1000
        }
      )
    },
    cancelEvent: {
      actions: cancel('some-id')
    }
  }
});
function createActor

createActor: <TLogic extends AnyActorLogic>(
    logic: TLogic,
    ...[options]: ConditionalRequired<
        [
            options?: ActorOptions<TLogic> & {
                [K in RequiredActorOptionsKeys<TLogic>]: unknown;
            }
        ],
        IsNotNever<RequiredActorOptionsKeys<TLogic>>
    >
) => Actor<TLogic>;
Creates a new actor instance for the given actor logic with the provided options, if any.

Parameter logic
The actor logic to create an actor from. For a state machine actor logic creator, see createMachine. Other actor logic creators include fromCallback, fromEventObservable, fromObservable, fromPromise, and fromTransition.

Parameter options
Actor options

Remarks
When you create an actor from actor logic via createActor(logic), you implicitly create an actor system where the created actor is the root actor. Any actors spawned from this root actor and its descendants are part of that actor system.

Example 1

import { createActor } from 'xstate';
import { someActorLogic } from './someActorLogic.ts';

// Creating the actor, which implicitly creates an actor system with itself as the root actor
const actor = createActor(someActorLogic);

actor.subscribe((snapshot) => {
  console.log(snapshot);
});

// Actors must be started by calling `actor.start()`, which will also start the actor system.
actor.start();

// Actors can receive events
actor.send({ type: 'someEvent' });

// You can stop root actors by calling `actor.stop()`, which will also stop the actor system and all actors in that system.
actor.stop();
function createEmptyActor

createEmptyActor: () => ActorRef<
    Snapshot<undefined>,
    AnyEventObject,
    AnyEventObject
>;
function createMachine

createMachine: <
    TContext extends MachineContext,
    TEvent extends AnyEventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TTag extends string,
    TInput,
    TOutput extends {},
    TEmitted extends EventObject,
    TMeta extends MetaObject,
    _ = any
>(
    config: {
        types?: MachineTypes<
            TContext,
            TEvent,
            TActor,
            TAction,
            TGuard,
            TDelay,
            TTag,
            TInput,
            TOutput,
            TEmitted,
            TMeta
        >;
        schemas?: unknown;
    } & MachineConfig<
        TContext,
        TEvent,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TTag,
        TInput,
        TOutput,
        TEmitted,
        TMeta
    >,
    implementations?: InternalMachineImplementations<
        ResolvedStateMachineTypes<
            TContext,
            TEvent,
            TActor,
            TAction,
            TGuard,
            TDelay,
            TTag,
            TEmitted
        >
    >
) => StateMachine<
    TContext,
    TEvent,
    Cast<ToChildren<TActor>, Record<string, AnyActorRef | undefined>>,
    TActor,
    TAction,
    TGuard,
    TDelay,
    StateValue,
    TTag & string,
    TInput,
    TOutput,
    TEmitted,
    TMeta,
    TODO
>;
Creates a state machine (statechart) with the given configuration.

The state machine represents the pure logic of a state machine actor.

Parameter config
The state machine configuration.

Parameter options
DEPRECATED: use setup({ ... }) or machine.provide({ ... }) to provide machine implementations instead.

Example 1

import { createMachine } from 'xstate';

const lightMachine = createMachine({
  id: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: { target: 'yellow' }
      }
    },
    yellow: {
      on: {
        TIMER: { target: 'red' }
      }
    },
    red: {
      on: {
        TIMER: { target: 'green' }
      }
    }
  }
});

const lightActor = createActor(lightMachine);
lightActor.start();

lightActor.send({ type: 'TIMER' });
function emit

emit: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TEvent extends EventObject,
    TEmitted extends AnyEventObject
>(
    eventOrExpr:
        | DoNotInfer<TEmitted>
        | SendExpr<TContext, TExpressionEvent, TParams, DoNotInfer<TEmitted>, TEvent>
) => ActionFunction<
    TContext,
    TExpressionEvent,
    TEvent,
    TParams,
    never,
    never,
    never,
    never,
    TEmitted
>;
Emits an event to event handlers registered on the actor via `actor.on(event, handler)`.

Example 1

import { emit } from 'xstate';

const machine = createMachine({
  // ...
  on: {
    something: {
      actions: emit({
        type: 'emitted',
        some: 'data'
      })
    }
  }
  // ...
});

const actor = createActor(machine).start();

actor.on('emitted', (event) => {
  console.log(event);
});

actor.send({ type: 'something' });
// logs:
// {
//   type: 'emitted',
//   some: 'data'
// }
function enqueueActions

enqueueActions: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TEvent extends EventObject = TExpressionEvent,
    TActor extends ProvidedActor = ProvidedActor,
    TAction extends ParameterizedObject = ParameterizedObject,
    TGuard extends ParameterizedObject = ParameterizedObject,
    TDelay extends string = never,
    TEmitted extends EventObject = EventObject
>(
    collect: CollectActions<
        TContext,
        TExpressionEvent,
        TParams,
        TEvent,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TEmitted
    >
) => ActionFunction<
    TContext,
    TExpressionEvent,
    TEvent,
    TParams,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
>;
Creates an action object that will execute actions that are queued by the enqueue(action) function.

Example 1

import { createMachine, enqueueActions } from 'xstate';

const machine = createMachine({
  entry: enqueueActions(({ enqueue, check }) => {
    enqueue.assign({ count: 0 });

    if (check('someGuard')) {
      enqueue.assign({ count: 1 });
    }

    enqueue('someAction');
  })
});
function forwardTo

forwardTo: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TEvent extends EventObject,
    TDelay extends string = never,
    TUsedDelay extends TDelay = never
>(
    target: Target<TContext, TExpressionEvent, TParams, TEvent>,
    options?: SendToActionOptions<
        TContext,
        TExpressionEvent,
        TParams,
        TEvent,
        TUsedDelay
    >
) => ActionFunction<
    TContext,
    TExpressionEvent,
    TEvent,
    TParams,
    never,
    never,
    never,
    TDelay,
    never
>;
Forwards (sends) an event to the target actor.

Parameter target
The target actor to forward the event to.

Parameter options
Options to pass into the send action creator.

function fromCallback

fromCallback: <
    TEvent extends EventObject,
    TInput = {},
    TEmitted extends EventObject = EventObject
>(
    callback: CallbackLogicFunction<TEvent, AnyEventObject, TInput, TEmitted>
) => CallbackActorLogic<TEvent, TInput, TEmitted>;
An actor logic creator which returns callback logic as defined by a callback function.

Parameter callback
The callback function used to describe the callback logic The callback function is passed an object with the following properties:

- receive - A function that can send events back to the parent actor; the listener is then called whenever events are received by the callback actor - sendBack - A function that can send events back to the parent actor - input - Data that was provided to the callback actor - self - The parent actor of the callback actor - system - The actor system to which the callback actor belongs The callback function can (optionally) return a cleanup function, which is called when the actor is stopped.

Returns
Callback logic

Remarks
Useful for subscription-based or other free-form logic that can send events back to the parent actor.

Actors created from callback logic (“callback actors”) can:

- Receive events via the receive function - Send events to the parent actor via the sendBack function

Callback actors are a bit different from other actors in that they:

- Do not work with onDone - Do not produce a snapshot using .getSnapshot() - Do not emit values when used with .subscribe() - Can not be stopped with .stop()

Example 1

const callbackLogic = fromCallback(({ sendBack, receive }) => {
  let lockStatus = 'unlocked';

  const handler = (event) => {
    if (lockStatus === 'locked') {
      return;
    }
    sendBack(event);
  };

  receive((event) => {
    if (event.type === 'lock') {
      lockStatus = 'locked';
    } else if (event.type === 'unlock') {
      lockStatus = 'unlocked';
    }
  });

  document.body.addEventListener('click', handler);

  return () => {
    document.body.removeEventListener('click', handler);
  };
});
See Also
CallbackLogicFunction for more information about the callback function and its object argument

Input docs for more information about how input is passed

function fromEventObservable

fromEventObservable: <
    TEvent extends EventObject,
    TInput extends {},
    TEmitted extends EventObject = EventObject
>(
    lazyObservable: ({
        input,
        system,
        self,
        emit,
    }: {
        input: TInput;
        system: AnyActorSystem;
        self: ObservableActorRef<TEvent>;
        emit: (emitted: TEmitted) => void;
    }) => Subscribable<TEvent>
) => ObservableActorLogic<TEvent, TInput, TEmitted>;
Creates event observable logic that listens to an observable that delivers event objects.

Event observable actor logic is described by an observable stream of event objects. Actors created from event observable logic (“event observable actors”) can:

- Implicitly send events to its parent actor - Emit snapshots of its emitted event objects

Sending events to event observable actors will have no effect.

Parameter lazyObservable
A function that creates an observable that delivers event objects. It receives one argument, an object with the following properties:

- input - Data that was provided to the event observable actor - self - The parent actor - system - The actor system to which the event observable actor belongs.

It should return a Subscribable, which is compatible with an RxJS Observable, although RxJS is not required to create them.

Example 1

import {
  fromEventObservable,
  Subscribable,
  EventObject,
  createMachine,
  createActor
} from 'xstate';
import { fromEvent } from 'rxjs';

const mouseClickLogic = fromEventObservable(
  () => fromEvent(document.body, 'click') as Subscribable<EventObject>
);

const canvasMachine = createMachine({
  invoke: {
    // Will send mouse `click` events to the canvas actor
    src: mouseClickLogic
  }
});

const canvasActor = createActor(canvasMachine);
canvasActor.start();
function fromObservable

fromObservable: <
    TContext,
    TInput extends {},
    TEmitted extends EventObject = EventObject
>(
    observableCreator: ({
        input,
        system,
        self,
    }: {
        input: TInput;
        system: AnyActorSystem;
        self: ObservableActorRef<TContext>;
        emit: (emitted: TEmitted) => void;
    }) => Subscribable<TContext>
) => ObservableActorLogic<TContext, TInput, TEmitted>;
Observable actor logic is described by an observable stream of values. Actors created from observable logic (“observable actors”) can:

- Emit snapshots of the observable’s emitted value

The observable’s emitted value is used as its observable actor’s context.

Sending events to observable actors will have no effect.

Parameter observableCreator
A function that creates an observable. It receives one argument, an object with the following properties:

- input - Data that was provided to the observable actor - self - The parent actor - system - The actor system to which the observable actor belongs

It should return a Subscribable, which is compatible with an RxJS Observable, although RxJS is not required to create them.

Example 1

import { fromObservable, createActor } from 'xstate';
import { interval } from 'rxjs';

const logic = fromObservable((obj) => interval(1000));

const actor = createActor(logic);

actor.subscribe((snapshot) => {
  console.log(snapshot.context);
});

actor.start();
// At every second:
// Logs 0
// Logs 1
// Logs 2
// ...
See Also
https://rxjs.dev for documentation on RxJS Observable and observable creators.

Subscribable interface in XState, which is based on and compatible with RxJS Observable.

function fromPromise

fromPromise: <TOutput, TInput = {}, TEmitted extends EventObject = EventObject>(
    promiseCreator: ({
        input,
        system,
        self,
        signal,
        emit,
    }: {
        input: TInput;
        system: AnyActorSystem;
        self: PromiseActorRef<TOutput>;
        signal: AbortSignal;
        emit: (emitted: TEmitted) => void;
    }) => PromiseLike<TOutput>
) => PromiseActorLogic<TOutput, TInput, TEmitted>;
An actor logic creator which returns promise logic as defined by an async process that resolves or rejects after some time.

Actors created from promise actor logic (“promise actors”) can:

- Emit the resolved value of the promise - Output the resolved value of the promise

Sending events to promise actors will have no effect.

Parameter promiseCreator
A function which returns a Promise, and accepts an object with the following properties:

- input - Data that was provided to the promise actor - self - The parent actor of the promise actor - system - The actor system to which the promise actor belongs

Example 1

const promiseLogic = fromPromise(async () => {
  const result = await fetch('https://example.com/...').then((data) =>
    data.json()
  );

  return result;
});

const promiseActor = createActor(promiseLogic);
promiseActor.subscribe((snapshot) => {
  console.log(snapshot);
});
promiseActor.start();
// => {
//   output: undefined,
//   status: 'active'
//   ...
// }

// After promise resolves
// => {
//   output: { ... },
//   status: 'done',
//   ...
// }
See Also
Input docs for more information about how input is passed

function fromTransition

fromTransition: <
    TContext,
    TEvent extends EventObject,
    TSystem extends AnyActorSystem,
    TInput extends {},
    TEmitted extends EventObject = EventObject
>(
    transition: (
        snapshot: TContext,
        event: TEvent,
        actorScope: ActorScope<
            TransitionSnapshot<TContext>,
            TEvent,
            TSystem,
            TEmitted
        >
    ) => TContext,
    initialContext:
        | TContext
        | (({
              input,
              self,
          }: {
              input: TInput;
              self: TransitionActorRef<TContext, TEvent>;
          }) => TContext)
) => TransitionActorLogic<TContext, TEvent, TInput, TEmitted>;
Returns actor logic given a transition function and its initial state.

A “transition function” is a function that takes the current state and received event object as arguments, and returns the next state, similar to a reducer.

Actors created from transition logic (“transition actors”) can:

- Receive events - Emit snapshots of its state

The transition function’s state is used as its transition actor’s context.

Note that the "state" for a transition function is provided by the initial state argument, and is not the same as the State object of an actor or a state within a machine configuration.

Parameter transition
The transition function used to describe the transition logic. It should return the next state given the current state and event. It receives the following arguments:

- state - the current state. - event - the received event. - actorScope - the actor scope object, with properties like self and system.

Parameter initialContext
The initial state of the transition function, either an object representing the state, or a function which returns a state object. If a function, it will receive as its only argument an object with the following properties:

- input - the input provided to its parent transition actor. - self - a reference to its parent transition actor.

Returns
Actor logic

Example 1

const transitionLogic = fromTransition(
  (state, event) => {
    if (event.type === 'increment') {
      return {
        ...state,
        count: state.count + 1
      };
    }
    return state;
  },
  { count: 0 }
);

const transitionActor = createActor(transitionLogic);
transitionActor.subscribe((snapshot) => {
  console.log(snapshot);
});
transitionActor.start();
// => {
//   status: 'active',
//   context: { count: 0 },
//   ...
// }

transitionActor.send({ type: 'increment' });
// => {
//   status: 'active',
//   context: { count: 1 },
//   ...
// }
See Also
Input docs for more information about how input is passed

function getInitialSnapshot

getInitialSnapshot: <T extends AnyActorLogic>(
    actorLogic: T,
    ...[input]: undefined extends InputFrom<T>
        ? [input?: InputFrom<T>]
        : [input: InputFrom<T>]
) => SnapshotFrom<T>;
Deprecated
Use initialTransition(…) instead.

function getNextSnapshot

getNextSnapshot: <T extends AnyActorLogic>(
    actorLogic: T,
    snapshot: SnapshotFrom<T>,
    event: EventFromLogic<T>
) => SnapshotFrom<T>;
Determines the next snapshot for the given actorLogic based on the given snapshot and event.

If the snapshot is undefined, the initial snapshot of the actorLogic is used.

Example 1

import { getNextSnapshot } from 'xstate';
import { trafficLightMachine } from './trafficLightMachine.ts';

const nextSnapshot = getNextSnapshot(
  trafficLightMachine, // actor logic
  undefined, // snapshot (or initial state if undefined)
  { type: 'TIMER' }
); // event object

console.log(nextSnapshot.value);
// => 'yellow'

const nextSnapshot2 = getNextSnapshot(
  trafficLightMachine, // actor logic
  nextSnapshot, // snapshot
  { type: 'TIMER' }
); // event object

console.log(nextSnapshot2.value);
// =>'red'
Deprecated
Use transition(…) instead.

function getStateNodes

getStateNodes: (
    stateNode: AnyStateNode,
    stateValue: StateValue
) => Array<AnyStateNode>;
Returns the state nodes represented by the current state value.

Parameter stateValue
The state value or State instance

function initialTransition

initialTransition: <T extends AnyActorLogic>(
    logic: T,
    ...[input]: undefined extends InputFrom<T>
        ? [input?: InputFrom<T>]
        : [input: InputFrom<T>]
) => [SnapshotFrom<T>, ExecutableActionsFrom<T>[]];
Given actor logic and optional input, returns a tuple of the nextSnapshot and actions to execute from the initial transition (no previous state).

This is a pure function that does not execute actions.

function isMachineSnapshot

isMachineSnapshot: (value: unknown) => value is AnyMachineSnapshot;
function log

log: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TEvent extends EventObject
>(
    value?: ResolvableLogValue<TContext, TExpressionEvent, TParams, TEvent>,
    label?: string
) => LogAction<TContext, TExpressionEvent, TParams, TEvent>;
Parameter expr
The expression function to evaluate which will be logged. Takes in 2 arguments:

- ctx - the current state context - event - the event that caused this action to be executed.

Parameter label
The label to give to the logged expression.

function matchesState

matchesState: (parentStateId: StateValue, childStateId: StateValue) => boolean;
function not

not: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TArg
>(
    guard: SingleGuardArg<TContext, TExpressionEvent, unknown, TArg>
) => GuardPredicate<
    TContext,
    TExpressionEvent,
    unknown,
    NormalizeGuardArg<DoNotInfer<TArg>>
>;
Higher-order guard that evaluates to true if the guard passed to it evaluates to false.

Guards

Returns
A guard

Example 1

import { setup, not } from 'xstate';

const machine = setup({
  guards: {
    someNamedGuard: () => false
  }
}).createMachine({
  on: {
    someEvent: {
      guard: not('someNamedGuard'),
      actions: () => {
        // will be executed if guard in `not(...)`
        // evaluates to `false`
      }
    }
  }
});
function or

or: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TArg extends unknown[]
>(
    guards: readonly [
        ...{
            [K in keyof TArg]: SingleGuardArg<
                TContext,
                TExpressionEvent,
                unknown,
                TArg[K]
            >;
        }
    ]
) => GuardPredicate<
    TContext,
    TExpressionEvent,
    unknown,
    NormalizeGuardArgArray<DoNotInfer<TArg>>
>;
Higher-order guard that evaluates to true if any of the guards passed to it evaluate to true.

Guards

Returns
A guard action object

Example 1

import { setup, or } from 'xstate';

const machine = setup({
  guards: {
    someNamedGuard: () => true
  }
}).createMachine({
  on: {
    someEvent: {
      guard: or([({ context }) => context.value > 0, 'someNamedGuard']),
      actions: () => {
        // will be executed if any of the guards in `or(...)`
        // evaluate to true
      }
    }
  }
});
function pathToStateValue

pathToStateValue: (statePath: string[]) => StateValue;
function raise

raise: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TEvent extends EventObject,
    TParams extends {},
    TDelay extends string = never,
    TUsedDelay extends TDelay = never
>(
    eventOrExpr:
        | DoNotInfer<TEvent>
        | SendExpr<TContext, TExpressionEvent, TParams, DoNotInfer<TEvent>, TEvent>,
    options?: RaiseActionOptions<
        TContext,
        TExpressionEvent,
        TParams,
        DoNotInfer<TEvent>,
        TUsedDelay
    >
) => ActionFunction<
    TContext,
    TExpressionEvent,
    TEvent,
    TParams,
    never,
    never,
    never,
    TDelay,
    never
>;
Raises an event. This places the event in the internal event queue, so that the event is immediately consumed by the machine in the current step.

Parameter eventType
The event to raise.

function sendParent

sendParent: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TSentEvent extends EventObject = AnyEventObject,
    TEvent extends EventObject = AnyEventObject,
    TDelay extends string = never,
    TUsedDelay extends TDelay = never
>(
    event:
        | TSentEvent
        | SendExpr<TContext, TExpressionEvent, TParams, TSentEvent, TEvent>,
    options?: SendToActionOptions<
        TContext,
        TExpressionEvent,
        TParams,
        TEvent,
        TUsedDelay
    >
) => ActionFunction<
    TContext,
    TExpressionEvent,
    TEvent,
    TParams,
    never,
    never,
    never,
    TDelay,
    never
>;
Sends an event to this machine's parent.

Parameter event
The event to send to the parent machine.

Parameter options
Options to pass into the send event.

function sendTo

sendTo: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TTargetActor extends AnyActorRef,
    TEvent extends EventObject,
    TDelay extends string = never,
    TUsedDelay extends TDelay = never
>(
    to:
        | string
        | TTargetActor
        | ((
              args: ActionArgs<TContext, TExpressionEvent, TEvent>,
              params: TParams
          ) => TTargetActor | string),
    eventOrExpr:
        | EventFrom<TTargetActor>
        | SendExpr<
              TContext,
              TExpressionEvent,
              TParams,
              InferEvent<Cast<EventFrom<TTargetActor>, EventObject>>,
              TEvent
          >,
    options?: SendToActionOptions<
        TContext,
        TExpressionEvent,
        TParams,
        DoNotInfer<TEvent>,
        TUsedDelay
    >
) => ActionFunction<
    TContext,
    TExpressionEvent,
    TEvent,
    TParams,
    never,
    never,
    never,
    TDelay,
    never
>;
Sends an event to an actor.

Parameter actor
The ActorRef to send the event to.

Parameter event
The event to send, or an expression that evaluates to the event to send

Parameter options
Send action options

- id - The unique send event identifier (used with cancel()). - delay - The number of milliseconds to delay the sending of the event.

function setup

setup: <
    TContext extends MachineContext,
    TEvent extends AnyEventObject,
    TActors extends Record<string, UnknownActorLogic> = {},
    TChildrenMap extends Record<string, string> = {},
    TActions extends Record<string, {}> = {},
    TGuards extends Record<string, {}> = {},
    TDelay extends string = never,
    TTag extends string = string,
    TInput = {},
    TOutput extends {} = {},
    TEmitted extends EventObject = EventObject,
    TMeta extends MetaObject = MetaObject
>({
    schemas,
    actors,
    actions,
    guards,
    delays,
}: {
    schemas?: unknown;
    types?: SetupTypes<
        TContext,
        TEvent,
        TChildrenMap,
        TTag,
        TInput,
        TOutput,
        TEmitted,
        TMeta
    >;
    actors?: {
        [K in keyof TActors | Values<TChildrenMap>]: K extends keyof TActors
            ? TActors[K]
            : never;
    };
    actions?: {
        [K in keyof TActions]: ActionFunction<
            TContext,
            TEvent,
            TEvent,
            TActions[K],
            ToProvidedActor<TChildrenMap, TActors>,
            ToParameterizedObject<TActions>,
            ToParameterizedObject<TGuards>,
            TDelay,
            TEmitted
        >;
    };
    guards?: {
        [K in keyof TGuards]: GuardPredicate<
            TContext,
            TEvent,
            TGuards[K],
            ToParameterizedObject<TGuards>
        >;
    };
    delays?: {
        [K in TDelay]: DelayConfig<
            TContext,
            TEvent,
            ToParameterizedObject<TActions>['params'],
            TEvent
        >;
    };
} & { [K in RequiredSetupKeys<TChildrenMap>]: unknown }) => {
    createMachine: () => const;
};
function spawnChild

spawnChild: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TEvent extends EventObject,
    TActor extends ProvidedActor
>(
    ...[src, { id, systemId, input, syncSnapshot }]: SpawnArguments<
        TContext,
        TExpressionEvent,
        TEvent,
        TActor
    >
) => ActionFunction<
    TContext,
    TExpressionEvent,
    TEvent,
    TParams,
    TActor,
    never,
    never,
    never,
    never
>;
function stateIn

stateIn: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {}
>(
    stateValue: StateValue
) => GuardPredicate<TContext, TExpressionEvent, TParams, any>;
function stopChild

stopChild: <
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends {},
    TEvent extends EventObject
>(
    actorRef: ResolvableActorRef<TContext, TExpressionEvent, TParams, TEvent>
) => StopAction<TContext, TExpressionEvent, TParams, TEvent>;
Stops a child actor.

Parameter actorRef
The actor to stop.

function toObserver

toObserver: <T>(
    nextHandler?: Observer<T> | ((value: T) => void),
    errorHandler?: (error: any) => void,
    completionHandler?: () => void
) => Observer<T>;
function toPromise

toPromise: <T extends AnyActorRef>(actor: T) => Promise<OutputFrom<T>>;
Returns a promise that resolves to the output of the actor when it is done.

Example 1

const machine = createMachine({
  // ...
  output: {
    count: 42
  }
});

const actor = createActor(machine);

actor.start();

const output = await toPromise(actor);

console.log(output);
// logs { count: 42 }
function transition

transition: <T extends AnyActorLogic>(
    logic: T,
    snapshot: SnapshotFrom<T>,
    event: EventFromLogic<T>
) => [nextSnapshot: SnapshotFrom<T>, actions: ExecutableActionsFrom<T>[]];
Given actor logic, a snapshot, and an event, returns a tuple of the nextSnapshot and actions to execute.

This is a pure function that does not execute actions.

function waitFor

waitFor: <TActorRef extends AnyActorRef>(
    actorRef: TActorRef,
    predicate: (emitted: SnapshotFrom<TActorRef>) => boolean,
    options?: Partial<WaitForOptions>
) => Promise<SnapshotFrom<TActorRef>>;
Subscribes to an actor ref and waits for its emitted value to satisfy a predicate, and then resolves with that value. Will throw if the desired state is not reached after an optional timeout. (defaults to Infinity).

Parameter actorRef
The actor ref to subscribe to

Parameter predicate
Determines if a value matches the condition to wait for

Parameter options
Returns
A promise that eventually resolves to the emitted value that matches the condition

Example 1

const state = await waitFor(someService, (state) => {
  return state.hasTag('loaded');
});

state.hasTag('loaded'); // true
Classes
class Actor

class Actor<TLogic extends AnyActorLogic>
    implements
        ActorRef<
            SnapshotFrom<TLogic>,
            EventFromLogic<TLogic>,
            EmittedFrom<TLogic>
        > {}
An Actor is a running process that can receive events, send events and change its behavior based on the events it receives, which can cause effects outside of the actor. When you run a state machine, it becomes an actor.

constructor

constructor(
    logic: ActorLogic<any, any, any, any, any>,
    options?: ActorOptions<TLogic>
);
Creates a new actor instance for the given logic with the provided options, if any.

Parameter logic
The logic to create an actor from

Parameter options
Actor options

property clock

clock: Clock;
The clock that is responsible for setting and clearing timeouts, such as delayed events and transitions.

property id

id: string;
The unique identifier for this actor relative to its parent.

property logic

logic: ActorLogic<any, any, any, any, any>;
property options

options: Readonly<ActorOptions<TLogic>>;
property ref

ref: ActorRef<SnapshotFrom<TLogic>, EventFromLogic<TLogic>, EmittedFrom<TLogic>>;
property sessionId

sessionId: string;
The globally unique process ID for this invocation.

property src

src: string | AnyActorLogic;
property system

system: AnyActorSystem;
The system to which this actor belongs.

method [symbolObservable]

[symbolObservable]: () => InteropSubscribable<SnapshotFrom<TLogic>>;
method getPersistedSnapshot

getPersistedSnapshot: () => Snapshot<unknown>;
Obtain the internal state of the actor, which can be persisted.

Remarks
The internal state can be persisted from any actor, not only machines.

Note that the persisted state is not the same as the snapshot from Actor.getSnapshot. Persisted state represents the internal state of the actor, while snapshots represent the actor's last emitted value.

Can be restored with ActorOptions.state

See Also
https://stately.ai/docs/persistence

method getSnapshot

getSnapshot: () => SnapshotFrom<TLogic>;
Read an actor’s snapshot synchronously.

Remarks
The snapshot represent an actor's last emitted value.

When an actor receives an event, its internal state may change. An actor may emit a snapshot when a state transition occurs.

Note that some actors, such as callback actors generated with fromCallback, will not emit snapshots.

See Also
Actor.subscribe to subscribe to an actor’s snapshot values.

Actor.getPersistedSnapshot to persist the internal state of an actor (which is more than just a snapshot).

method on

on: <TType extends EmittedFrom<TLogic>['type'] | '*'>(
    type: TType,
    handler: (
        emitted: EmittedFrom<TLogic> &
            (TType extends '*' ? unknown : { type: TType })
    ) => void
) => Subscription;
method send

send: (event: EventFromLogic<TLogic>) => void;
Sends an event to the running Actor to trigger a transition.

Parameter event
The event to send

method start

start: () => this;
Starts the Actor from the initial state

method stop

stop: () => this;
Stops the Actor and unsubscribe all listeners.

method subscribe

subscribe: {
    (observer: Observer<SnapshotFrom<TLogic>>): Subscription;
    (
        nextListener?: (snapshot: SnapshotFrom<TLogic>) => void,
        errorListener?: (error: any) => void,
        completeListener?: () => void
    ): Subscription;
};
Subscribe an observer to an actor’s snapshot values.

Parameter observer
Either a plain function that receives the latest snapshot, or an observer object whose .next(snapshot) method receives the latest snapshot

Remarks
The observer will receive the actor’s snapshot value when it is emitted. The observer can be:

- A plain function that receives the latest snapshot, or - An observer object whose .next(snapshot) method receives the latest snapshot

Example 1

// Observer as a plain function
const subscription = actor.subscribe((snapshot) => {
  console.log(snapshot);
});
Example 2

// Observer as an object
const subscription = actor.subscribe({
  next(snapshot) {
    console.log(snapshot);
  },
  error(err) {
    // ...
  },
  complete() {
    // ...
  }
});
The return value of actor.subscribe(observer) is a subscription object that has an .unsubscribe() method. You can call subscription.unsubscribe() to unsubscribe the observer:

Example 3

const subscription = actor.subscribe((snapshot) => {
  // ...
});

// Unsubscribe the observer
subscription.unsubscribe();
When the actor is stopped, all of its observers will automatically be unsubscribed.

method toJSON

toJSON: () => { xstate$$type: number; id: string };
class SimulatedClock

class SimulatedClock implements SimulatedClock {}
method clearTimeout

clearTimeout: (id: number) => void;
method now

now: () => number;
method setTimeout

setTimeout: (fn: (...args: any[]) => void, timeout: number) => number;
class StateMachine

class StateMachine<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TChildren extends Record<string, AnyActorRef | undefined>,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TStateValue extends StateValue,
    TTag extends string,
    TInput,
    TOutput,
    TEmitted extends EventObject,
    TMeta extends MetaObject,
    TConfig extends StateSchema
> implements
        ActorLogic<
            MachineSnapshot<
                TContext,
                TEvent,
                TChildren,
                TStateValue,
                TTag,
                TOutput,
                TMeta,
                TConfig
            >,
            TEvent,
            TInput,
            AnyActorSystem,
            TEmitted
        > {}
constructor

constructor(
    config: Omit<
        StateNodeConfig<
            DoNotInfer<TContext>,
            DoNotInfer<TEvent>,
            any,
            any,
            any,
            any,
            any,
            DoNotInfer<TOutput>,
            any,
            any
        >,
        'output'
    > & {
        version?: string;
        output?:
            | TOutput
            | Mapper<TContext, DoneStateEvent<unknown>, TOutput, TEvent>;
    } & (
            | { context?: InitialContext<TContext, any, any, TEvent> }
            | { context: InitialContext<TContext, any, any, TEvent> }
        ) & { schemas?: unknown },
    implementations?: MachineImplementationsSimplified<
        TContext,
        TEvent,
        ProvidedActor,
        ParameterizedObject,
        ParameterizedObject
    >
);
property config

config: Omit<
    StateNodeConfig<
        DoNotInfer<TContext>,
        DoNotInfer<TEvent>,
        any,
        any,
        any,
        any,
        any,
        DoNotInfer<TOutput>,
        any,
        any
    >,
    'output'
> & {
    version?: string;
    output?:
        | TOutput
        | Mapper<TContext, DoneStateEvent<unknown>, TOutput, TEvent>;
} & (
        | { context?: InitialContext<TContext, any, any, TEvent> }
        | { context: InitialContext<TContext, any, any, TEvent> }
    ) & { schemas?: unknown };
The raw config used to create the machine.

property definition

readonly definition: StateMachineDefinition<TContext, TEvent>;
property events

events: EventDescriptor<TEvent>[];
property id

id: string;
property implementations

implementations: MachineImplementationsSimplified<
    TContext,
    TEvent,
    ProvidedActor,
    ParameterizedObject,
    ParameterizedObject
>;
property root

root: StateNode<TContext, TEvent>;
property schemas

schemas: {};
property states

states: StateNodesConfig<TContext, TEvent>;
property version

version?: string;
The machine's own version.

method getInitialSnapshot

getInitialSnapshot: (
    actorScope: ActorScope<
        MachineSnapshot<
            TContext,
            TEvent,
            TChildren,
            TStateValue,
            TTag,
            TOutput,
            TMeta,
            TConfig
        >,
        TEvent,
        AnyActorSystem,
        TEmitted
    >,
    input?: TInput
) => MachineSnapshot<
    TContext,
    TEvent,
    TChildren,
    TStateValue,
    TTag,
    TOutput,
    TMeta,
    TConfig
>;
Returns the initial State instance, with reference to self as an ActorRef.

method getPersistedSnapshot

getPersistedSnapshot: (
    snapshot: MachineSnapshot<
        TContext,
        TEvent,
        TChildren,
        TStateValue,
        TTag,
        TOutput,
        TMeta,
        TConfig
    >,
    options?: unknown
) => Snapshot<unknown>;
method getStateNodeById

getStateNodeById: (stateId: string) => StateNode<TContext, TEvent>;
method getTransitionData

getTransitionData: (
    snapshot: MachineSnapshot<
        TContext,
        TEvent,
        TChildren,
        TStateValue,
        TTag,
        TOutput,
        TMeta,
        TConfig
    >,
    event: TEvent
) => Array<TransitionDefinition<TContext, TEvent>>;
method microstep

microstep: (
    snapshot: MachineSnapshot<
        TContext,
        TEvent,
        TChildren,
        TStateValue,
        TTag,
        TOutput,
        TMeta,
        TConfig
    >,
    event: TEvent,
    actorScope: AnyActorScope
) => Array<
    MachineSnapshot<
        TContext,
        TEvent,
        TChildren,
        TStateValue,
        TTag,
        TOutput,
        TMeta,
        TConfig
    >
>;
Determines the next state given the current state and event. Calculates a microstep.

Parameter state
The current state

Parameter event
The received event

method provide

provide: (
    implementations: InternalMachineImplementations<
        ResolvedStateMachineTypes<
            TContext,
            DoNotInfer<TEvent>,
            TActor,
            TAction,
            TGuard,
            TDelay,
            TTag,
            TEmitted
        >
    >
) => StateMachine<
    TContext,
    TEvent,
    TChildren,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TStateValue,
    TTag,
    TInput,
    TOutput,
    TEmitted,
    TMeta,
    TConfig
>;
Clones this state machine with the provided implementations.

Parameter implementations
Options (actions, guards, actors, delays) to recursively merge with the existing options.

Returns
A new StateMachine instance with the provided implementations.

method resolveState

resolveState: (
    config: {
        value: StateValue;
        context?: TContext;
        historyValue?: HistoryValue<TContext, TEvent>;
        status?: SnapshotStatus;
        output?: TOutput;
        error?: unknown;
    } & (Equals<TContext, MachineContext> extends false
        ? { context: unknown }
        : {})
) => MachineSnapshot<
    TContext,
    TEvent,
    TChildren,
    TStateValue,
    TTag,
    TOutput,
    TMeta,
    TConfig
>;
method restoreSnapshot

restoreSnapshot: (
    snapshot: Snapshot<unknown>,
    _actorScope: ActorScope<
        MachineSnapshot<
            TContext,
            TEvent,
            TChildren,
            TStateValue,
            TTag,
            TOutput,
            TMeta,
            TConfig
        >,
        TEvent,
        AnyActorSystem,
        TEmitted
    >
) => MachineSnapshot<
    TContext,
    TEvent,
    TChildren,
    TStateValue,
    TTag,
    TOutput,
    TMeta,
    TConfig
>;
method start

start: (
    snapshot: MachineSnapshot<
        TContext,
        TEvent,
        TChildren,
        TStateValue,
        TTag,
        TOutput,
        TMeta,
        TConfig
    >
) => void;
method toJSON

toJSON: () => StateMachineDefinition<TContext, TEvent>;
method transition

transition: (
    snapshot: MachineSnapshot<
        TContext,
        TEvent,
        TChildren,
        TStateValue,
        TTag,
        TOutput,
        TMeta,
        TConfig
    >,
    event: TEvent,
    actorScope: ActorScope<typeof snapshot, TEvent, AnyActorSystem, TEmitted>
) => MachineSnapshot<
    TContext,
    TEvent,
    TChildren,
    TStateValue,
    TTag,
    TOutput,
    TMeta,
    TConfig
>;
Determines the next snapshot given the current snapshot and received event. Calculates a full macrostep from all microsteps.

Parameter snapshot
The current snapshot

Parameter event
The received event

class StateNode

class StateNode<
    TContext extends MachineContext = MachineContext,
    TEvent extends EventObject = EventObject
> {}
constructor

constructor(
    config: StateNodeConfig<
        TContext,
        TEvent,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any
    >,
    options: StateNodeOptions<TContext, TEvent>
);
property after

readonly after: DelayedTransitionDefinition<TContext, TEvent>[];
property always

always?: TransitionDefinition<TContext, TEvent>[];
property config

config: StateNodeConfig<
    TContext,
    TEvent,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
>;
The raw config used to create the machine.

property definition

readonly definition: StateNodeDefinition<TContext, TEvent>;
The well-structured state node definition.

property description

description?: string;
property entry

entry: UnknownAction[];
The action(s) to be executed upon entering the state node.

property events

readonly events: EventDescriptor<TEvent>[];
All the event types accepted by this state node and its descendants.

property exit

exit: UnknownAction[];
The action(s) to be executed upon exiting the state node.

property history

history: false | 'shallow' | 'deep';
The type of history on this state node. Can be:

- 'shallow' - recalls only top-level historical state value - 'deep' - recalls historical state value at all levels

property id

id: string;
The unique ID of the state node.

property initial

readonly initial: InitialTransitionDefinition<TContext, TEvent>;
property invoke

readonly invoke: InvokeDefinition<
    TContext,
    TEvent,
    ProvidedActor,
    ParameterizedObject,
    ParameterizedObject,
    string,
    any,
    any
>[];
The logic invoked as actors by this state node.

property key

key: string;
The relative key of the state node, which represents its location in the overall state value.

property machine

machine: StateMachine<
    TContext,
    TEvent,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
>;
The root machine node.

property meta

meta?: any;
The meta data associated with this state node, which will be returned in State instances.

property on

readonly on: TransitionDefinitionMap<TContext, TEvent>;
The mapping of events to transitions.

property order

order: number;
The order this state node appears. Corresponds to the implicit document order.

property output

output?: {} | Mapper<MachineContext, EventObject, unknown, EventObject>;
The output data sent with the "xstate.done.state._id_" event if this is a final state node.

property ownEvents

readonly ownEvents: EventDescriptor<TEvent>[];
All the events that have transitions directly from this state node.

Excludes any inert events.

property parent

parent?: StateNode<TContext, TEvent>;
The parent state node.

property path

path: string[];
The string path from the root machine node to this node.

property states

states: StateNodesConfig<TContext, TEvent>;
The child state nodes.

property tags

tags: string[];
property transitions

transitions: Map<string, TransitionDefinition<TContext, TEvent>[]>;
property type

type: 'history' | 'atomic' | 'compound' | 'parallel' | 'final';
The type of this state node:

- 'atomic' - no child state nodes - 'compound' - nested child state nodes (XOR) - 'parallel' - orthogonal nested child state nodes (AND) - 'history' - history state node - 'final' - final state node

Interfaces
interface ActionArgs

interface ActionArgs<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TEvent extends EventObject
> extends UnifiedArg<TContext, TExpressionEvent, TEvent> {}
interface ActorLike

interface ActorLike<TCurrent, TEvent extends EventObject>
    extends Subscribable<TCurrent> {}
property send

send: (event: TEvent) => void;
interface ActorLogic

interface ActorLogic<
    in out TSnapshot extends Snapshot<unknown>, // it's invariant because it's also part of `ActorScope["self"]["getSnapshot"]`
    in out TEvent extends EventObject, // it's invariant because it's also part of `ActorScope["self"]["send"]`
    in TInput = NonReducibleUnknown,
    TSystem extends AnyActorSystem = AnyActorSystem,
    in out TEmitted extends EventObject = EventObject
> {}
Represents logic which can be used by an actor.

TSnapshot - The type of the snapshot. TEvent - The type of the event object. TInput - The type of the input. TSystem - The type of the actor system.

property config

config?: unknown;
The initial setup/configuration used to create the actor logic.

property getInitialSnapshot

getInitialSnapshot: (
    actorScope: ActorScope<TSnapshot, TEvent, TSystem, TEmitted>,
    input: TInput
) => TSnapshot;
Called to provide the initial state of the actor.

Parameter actorScope
The actor scope.

Parameter input
The input for the initial state.

Returns
The initial state.

property getPersistedSnapshot

getPersistedSnapshot: (
    snapshot: TSnapshot,
    options?: unknown
) => Snapshot<unknown>;
Obtains the internal state of the actor in a representation which can be be persisted. The persisted state can be restored by restoreSnapshot.

Parameter snapshot
The current state.

Returns
The a representation of the internal state to be persisted.

property restoreSnapshot

restoreSnapshot?: (
    persistedState: Snapshot<unknown>,
    actorScope: ActorScope<TSnapshot, TEvent, AnyActorSystem, TEmitted>
) => TSnapshot;
Called when Actor is created to restore the internal state of the actor given a persisted state. The persisted state can be created by getPersistedSnapshot.

Parameter persistedState
The persisted state to restore from.

Parameter actorScope
The actor scope.

Returns
The restored state.

property start

start?: (
    snapshot: TSnapshot,
    actorScope: ActorScope<TSnapshot, TEvent, AnyActorSystem, TEmitted>
) => void;
Called when the actor is started.

Parameter snapshot
The starting state.

Parameter actorScope
The actor scope.

property transition

transition: (
    snapshot: TSnapshot,
    event: TEvent,
    actorScope: ActorScope<TSnapshot, TEvent, TSystem, TEmitted>
) => TSnapshot;
Transition function that processes the current state and an incoming event to produce a new state.

Parameter snapshot
The current state.

Parameter event
The incoming event.

Parameter actorScope
The actor scope.

Returns
The new state.

interface ActorOptions

interface ActorOptions<TLogic extends AnyActorLogic> {}
property clock

clock?: Clock;
The clock that is responsible for setting and clearing timeouts, such as delayed events and transitions.

Remarks
You can create your own “clock”. The clock interface is an object with two functions/methods:

- setTimeout - same arguments as window.setTimeout(fn, timeout) - clearTimeout - same arguments as window.clearTimeout(id)

By default, the native setTimeout and clearTimeout functions are used.

For testing, XState provides SimulatedClock.

See Also
Clock

SimulatedClock

property devTools

devTools?: never;
Deprecated
Use inspect instead.

property id

id?: string;
The custom id for referencing this service.

property input

input?: InputFrom<TLogic>;
The input data to pass to the actor.

property inspect

inspect?:
    | Observer<InspectionEvent>
    | ((inspectionEvent: InspectionEvent) => void);
A callback function or observer object which can be used to inspect actor system updates.

Remarks
If a callback function is provided, it can accept an inspection event argument. The types of inspection events that can be observed include:

- @xstate.actor - An actor ref has been created in the system - @xstate.event - An event was sent from a source actor ref to a target actor ref in the system - @xstate.snapshot - An actor ref emitted a snapshot due to a received event

Example 1

import { createMachine } from 'xstate';

const machine = createMachine({
  // ...
});

const actor = createActor(machine, {
  inspect: (inspectionEvent) => {
    if (inspectionEvent.actorRef === actor) {
      // This event is for the root actor
    }

    if (inspectionEvent.type === '@xstate.actor') {
      console.log(inspectionEvent.actorRef);
    }

    if (inspectionEvent.type === '@xstate.event') {
      console.log(inspectionEvent.sourceRef);
      console.log(inspectionEvent.actorRef);
      console.log(inspectionEvent.event);
    }

    if (inspectionEvent.type === '@xstate.snapshot') {
      console.log(inspectionEvent.actorRef);
      console.log(inspectionEvent.event);
      console.log(inspectionEvent.snapshot);
    }
  }
});
Alternately, an observer object ({ next?, error?, complete? }) can be provided:

Example 2

const actor = createActor(machine, {
  inspect: {
    next: (inspectionEvent) => {
      if (inspectionEvent.actorRef === actor) {
        // This event is for the root actor
      }

      if (inspectionEvent.type === '@xstate.actor') {
        console.log(inspectionEvent.actorRef);
      }

      if (inspectionEvent.type === '@xstate.event') {
        console.log(inspectionEvent.sourceRef);
        console.log(inspectionEvent.actorRef);
        console.log(inspectionEvent.event);
      }

      if (inspectionEvent.type === '@xstate.snapshot') {
        console.log(inspectionEvent.actorRef);
        console.log(inspectionEvent.event);
        console.log(inspectionEvent.snapshot);
      }
    }
  }
});
property logger

logger?: (...args: any[]) => void;
Specifies the logger to be used for log(...) actions. Defaults to the native console.log(...) method.

property parent

parent?: AnyActorRef;
property snapshot

snapshot?: Snapshot<unknown>;
Initializes actor logic from a specific persisted internal state.

Remarks
If the state is compatible with the actor logic, when the actor is started it will be at that persisted state. Actions from machine actors will not be re-executed, because they are assumed to have been already executed. However, invocations will be restarted, and spawned actors will be restored recursively.

Can be generated with Actor.getPersistedSnapshot.

See Also
https://stately.ai/docs/persistence

property src

src?: string | AnyActorLogic;
The source actor logic.

property state

state?: Snapshot<unknown>;
Deprecated
Use snapshot instead.

property systemId

systemId?: string;
The system ID to register this actor under.

interface ActorRef

interface ActorRef<
    TSnapshot extends Snapshot<unknown>,
    TEvent extends EventObject,
    TEmitted extends EventObject = EventObject
> extends Subscribable<TSnapshot>,
        InteropObservable<TSnapshot> {}
property getPersistedSnapshot

getPersistedSnapshot: () => Snapshot<unknown>;
property getSnapshot

getSnapshot: () => TSnapshot;
property id

id: string;
The unique identifier for this actor relative to its parent.

property on

on: <TType extends TEmitted['type'] | '*'>(
    type: TType,
    handler: (
        emitted: TEmitted &
            (TType extends '*'
                ? unknown
                : {
                      type: TType;
                  })
    ) => void
) => Subscription;
property send

send: (event: TEvent) => void;
property sessionId

sessionId: string;
property src

src: string | AnyActorLogic;
property start

start: () => void;
property stop

stop: () => void;
property system

system: AnyActorSystem;
property toJSON

toJSON?: () => any;
interface ActorScope

interface ActorScope<
    TSnapshot extends Snapshot<unknown>,
    TEvent extends EventObject,
    TSystem extends AnyActorSystem = AnyActorSystem,
    TEmitted extends EventObject = EventObject
> {}
property actionExecutor

actionExecutor: ActionExecutor;
property defer

defer: (fn: () => void) => void;
property emit

emit: (event: TEmitted) => void;
property id

id: string;
property logger

logger: (...args: any[]) => void;
property self

self: ActorRef<TSnapshot, TEvent, TEmitted>;
property sessionId

sessionId: string;
property stopChild

stopChild: (child: AnyActorRef) => void;
property system

system: TSystem;
interface ActorSystem

interface ActorSystem<T extends ActorSystemInfo> {}
property get

get: <K extends keyof T['actors']>(key: K) => T['actors'][K] | undefined;
property getSnapshot

getSnapshot: () => {
    _scheduledEvents: Record<string, ScheduledEvent>;
};
property inspect

inspect: (
    observer:
        | Observer<InspectionEvent>
        | ((inspectionEvent: InspectionEvent) => void)
) => Subscription;
property scheduler

scheduler: Scheduler;
property start

start: () => void;
interface ActorSystemInfo

interface ActorSystemInfo {}
property actors

actors: Record<string, AnyActorRef>;
interface AnyEventObject

interface AnyEventObject extends EventObject {}
index signature

[key: string]: any;
interface AssignAction

interface AssignAction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TActor extends ProvidedActor
> {}
call signature

(args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
interface AssignArgs

interface AssignArgs<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TEvent extends EventObject,
    TActor extends ProvidedActor
> extends ActionArgs<TContext, TExpressionEvent, TEvent> {}
property spawn

spawn: Spawner<TActor>;
interface AtomicStateNodeConfig

interface AtomicStateNodeConfig<
    TContext extends MachineContext,
    TEvent extends EventObject
> extends StateNodeConfig<
        TContext,
        TEvent,
        TODO,
        TODO,
        TODO,
        TODO,
        TODO,
        TODO,
        TODO, // emitted
        TODO
    > {}
property initial

initial?: undefined;
property onDone

onDone?: undefined;
property parallel

parallel?: false | undefined;
property states

states?: undefined;
interface BaseActorRef

interface BaseActorRef<TEvent extends EventObject> {}
property send

send: (event: TEvent) => void;
interface CancelAction

interface CancelAction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject
> {}
call signature

(args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
interface DelayedTransitionDefinition

interface DelayedTransitionDefinition<
    TContext extends MachineContext,
    TEvent extends EventObject
> extends TransitionDefinition<TContext, TEvent> {}
property delay

delay: number | string | DelayExpr<TContext, TEvent, undefined, TEvent>;
interface DoneActorEvent

interface DoneActorEvent<TOutput = unknown, TId extends string = string>
    extends EventObject {}
property actorId

actorId: TId;
property output

output: TOutput;
property type

type: `xstate.done.actor.${TId}`;
interface DoneStateEvent

interface DoneStateEvent<TOutput = unknown> extends EventObject {}
property output

output: TOutput;
property type

type: `xstate.done.state.${string}`;
interface EmitAction

interface EmitAction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TEmitted extends EventObject
> {}
call signature

(args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
interface EnqueueActionsAction

interface EnqueueActionsAction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string
> {}
call signature

(args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
interface ErrorActorEvent

interface ErrorActorEvent<TErrorData = unknown, TId extends string = string>
    extends EventObject {}
property actorId

actorId: TId;
property error

error: TErrorData;
property type

type: `xstate.error.actor.${TId}`;
interface ExecutableActionObject

interface ExecutableActionObject {}
property exec

exec: ((info: ActionArgs<any, any, any>, params: unknown) => void) | undefined;
property info

info: ActionArgs<MachineContext, EventObject, EventObject>;
property params

params: NonReducibleUnknown;
property type

type: string;
interface ExecutableSpawnAction

interface ExecutableSpawnAction extends ExecutableActionObject {}
property info

info: ActionArgs<MachineContext, EventObject, EventObject>;
property params

params: {
    id: string;
    actorRef: AnyActorRef | undefined;
    src: string | AnyActorLogic;
};
property type

type: 'xstate.spawnChild';
interface HistoryStateNode

interface HistoryStateNode<TContext extends MachineContext>
    extends StateNode<TContext> {}
property history

history: 'shallow' | 'deep';
property target

target: string | undefined;
interface HistoryStateNodeConfig

interface HistoryStateNodeConfig<
    TContext extends MachineContext,
    TEvent extends EventObject
> extends AtomicStateNodeConfig<TContext, TEvent> {}
property history

history: 'shallow' | 'deep' | true;
property target

target: string | undefined;
interface InitialTransitionConfig

interface InitialTransitionConfig<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string
> extends TransitionConfig<
        TContext,
        TEvent,
        TEvent,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TODO, // TEmitted
        TODO
    > {}
property target

target: string;
interface InitialTransitionDefinition

interface InitialTransitionDefinition<
    TContext extends MachineContext,
    TEvent extends EventObject
> extends TransitionDefinition<TContext, TEvent> {}
property guard

guard?: never;
property target

target: ReadonlyArray<StateNode<TContext, TEvent>>;
interface InspectedActionEvent

interface InspectedActionEvent extends BaseInspectionEventProperties {}
property action

action: {
    type: string;
    params: unknown;
};
property type

type: '@xstate.action';
interface InspectedActorEvent

interface InspectedActorEvent extends BaseInspectionEventProperties {}
property type

type: '@xstate.actor';
interface InspectedEventEvent

interface InspectedEventEvent extends BaseInspectionEventProperties {}
property event

event: AnyEventObject;
property sourceRef

sourceRef: ActorRefLike | undefined;
property type

type: '@xstate.event';
interface InspectedMicrostepEvent

interface InspectedMicrostepEvent extends BaseInspectionEventProperties {}
property event

event: AnyEventObject;
property snapshot

snapshot: Snapshot<unknown>;
property type

type: '@xstate.microstep';
interface InspectedSnapshotEvent

interface InspectedSnapshotEvent extends BaseInspectionEventProperties {}
property event

event: AnyEventObject;
property snapshot

snapshot: Snapshot<unknown>;
property type

type: '@xstate.snapshot';
interface InteropObservable

interface InteropObservable<T> {}
property [Symbol.observable]

[Symbol.observable]: () => InteropSubscribable<T>;
interface InteropSubscribable

interface InteropSubscribable<T> {}
method subscribe

subscribe: (observer: Observer<T>) => Subscription;
interface InvokeDefinition

interface InvokeDefinition<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TEmitted extends EventObject,
    TMeta extends MetaObject
> {}
property id

id: string;
property input

input?:
    | Mapper<TContext, TEvent, NonReducibleUnknown, TEvent>
    | NonReducibleUnknown;
property onDone

onDone?:
    | string
    | SingleOrArray<
          TransitionConfig<
              TContext,
              DoneActorEvent<unknown>,
              TEvent,
              TActor,
              TAction,
              TGuard,
              TDelay,
              TEmitted,
              TMeta
          >
      >;
The transition to take upon the invoked child machine reaching its final top-level state.

property onError

onError?:
    | string
    | SingleOrArray<
          TransitionConfig<
              TContext,
              ErrorActorEvent,
              TEvent,
              TActor,
              TAction,
              TGuard,
              TDelay,
              TEmitted,
              TMeta
          >
      >;
The transition to take upon the invoked child machine sending an error event.

property onSnapshot

onSnapshot?:
    | string
    | SingleOrArray<
          TransitionConfig<
              TContext,
              SnapshotEvent,
              TEvent,
              TActor,
              TAction,
              TGuard,
              TDelay,
              TEmitted,
              TMeta
          >
      >;
property src

src: AnyActorLogic | string;
The source of the actor logic to be invoked

property systemId

systemId: string | undefined;
property toJSON

toJSON: () => Omit<
    InvokeDefinition<
        TContext,
        TEvent,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TEmitted,
        TMeta
    >,
    'onDone' | 'onError' | 'toJSON'
>;
interface LogAction

interface LogAction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject
> {}
call signature

(args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
interface MachineImplementationsSimplified

interface MachineImplementationsSimplified<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor = ProvidedActor,
    TAction extends ParameterizedObject = ParameterizedObject,
    TGuard extends ParameterizedObject = ParameterizedObject
> {}
property actions

actions: ActionFunctionMap<TContext, TEvent, TActor, TAction>;
property actors

actors: Record<
    string,
    | AnyActorLogic
    | {
          src: AnyActorLogic;
          input: Mapper<TContext, TEvent, unknown, TEvent> | NonReducibleUnknown;
      }
>;
property delays

delays: DelayFunctionMap<TContext, TEvent, TAction>;
property guards

guards: GuardMap<TContext, TEvent, TGuard>;
interface MachineTypes

interface MachineTypes<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TTag extends string,
    TInput,
    TOutput,
    TEmitted extends EventObject,
    TMeta extends MetaObject
> extends SetupTypes<
        TContext,
        TEvent,
        never,
        TTag,
        TInput,
        TOutput,
        TEmitted,
        TMeta
    > {}
property actions

actions?: TAction;
property actors

actors?: TActor;
property delays

delays?: TDelay;
property guards

guards?: TGuard;
property meta

meta?: TMeta;
interface ParameterizedObject

interface ParameterizedObject {}
property params

params?: NonReducibleUnknown;
property type

type: string;
interface ProvidedActor

interface ProvidedActor {}
property id

id?: string | undefined;
property logic

logic: UnknownActorLogic;
property src

src: string;
interface RaiseAction

interface RaiseAction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TDelay extends string
> {}
call signature

(args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
interface RaiseActionOptions

interface RaiseActionOptions<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TDelay extends string
> {}
property delay

delay?: Delay<TDelay> | DelayExpr<TContext, TExpressionEvent, TParams, TEvent>;
property id

id?: string;
interface RaiseActionParams

interface RaiseActionParams<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TDelay extends string
> extends RaiseActionOptions<TContext, TExpressionEvent, TParams, TEvent, TDelay> {}
property event

event: TEvent | SendExpr<TContext, TExpressionEvent, TParams, TEvent, TEvent>;
interface ResolvedStateMachineTypes

interface ResolvedStateMachineTypes<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TTag extends string,
    TEmitted extends EventObject = EventObject
> {}
Deprecated
property actions

actions: TAction;
property actors

actors: TActor;
property context

context: TContext;
property delays

delays: TDelay;
property emitted

emitted: TEmitted;
property events

events: TEvent;
property guards

guards: TGuard;
property tags

tags: TTag;
interface SendToAction

interface SendToAction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TDelay extends string
> {}
call signature

(args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
interface SendToActionOptions

interface SendToActionOptions<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TDelay extends string
> extends RaiseActionOptions<TContext, TExpressionEvent, TParams, TEvent, TDelay> {}
interface SendToActionParams

interface SendToActionParams<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TSentEvent extends EventObject,
    TEvent extends EventObject,
    TDelay extends string
> extends SendToActionOptions<TContext, TExpressionEvent, TParams, TEvent, TDelay> {}
property event

event:
    | TSentEvent
    | SendExpr<TContext, TExpressionEvent, TParams, TSentEvent, TEvent>;
interface SetupTypes

interface SetupTypes<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TChildrenMap extends Record<string, string>,
    TTag extends string,
    TInput,
    TOutput,
    TEmitted extends EventObject,
    TMeta extends MetaObject
> {}
property children

children?: TChildrenMap;
property context

context?: TContext;
property emitted

emitted?: TEmitted;
property events

events?: TEvent;
property input

input?: TInput;
property meta

meta?: TMeta;
property output

output?: TOutput;
property tags

tags?: TTag;
interface SimulatedClock

interface SimulatedClock extends Clock {}
method increment

increment: (ms: number) => void;
method set

set: (ms: number) => void;
method start

start: (speed: number) => void;
interface SnapshotEvent

interface SnapshotEvent<TSnapshot extends Snapshot<unknown> = Snapshot<unknown>>
    extends EventObject {}
property snapshot

snapshot: TSnapshot;
property type

type: `xstate.snapshot.${string}`;
interface SpawnAction

interface SpawnAction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TActor extends ProvidedActor
> {}
call signature

(args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
interface StateConfig

interface StateConfig<TContext extends MachineContext, TEvent extends EventObject> {}
property children

children: Record<string, AnyActorRef>;
property context

context: TContext;
property error

error?: unknown;
property historyValue

historyValue?: HistoryValue<TContext, TEvent>;
property machine

machine?: StateMachine<
    TContext,
    TEvent,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any, // TMeta
    any
>;
property output

output?: any;
property status

status: SnapshotStatus;
interface StateLike

interface StateLike<TContext extends MachineContext> {}
property context

context: TContext;
property event

event: EventObject;
property value

value: StateValue;
interface StateMachineDefinition

interface StateMachineDefinition<
    TContext extends MachineContext,
    TEvent extends EventObject
> extends StateNodeDefinition<TContext, TEvent> {}
interface StateMachineTypes

interface StateMachineTypes {}
property actions

actions: ParameterizedObject;
property actors

actors: ProvidedActor;
property context

context: MachineContext;
property delays

delays: string;
property emitted

emitted: EventObject;
property events

events: EventObject;
property guards

guards: ParameterizedObject;
property tags

tags: string;
interface StateNodeConfig

interface StateNodeConfig<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TTag extends string,
    _TOutput,
    TEmitted extends EventObject,
    TMeta extends MetaObject
> {}
property after

after?: DelayedTransitions<TContext, TEvent, TActor, TAction, TGuard, TDelay>;
The mapping (or array) of delays (in milliseconds) to their potential transition(s). The delayed transitions are taken after the specified delay in an interpreter.

property always

always?: TransitionConfigOrTarget<
    TContext,
    TEvent,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted,
    TMeta
>;
An eventless transition that is always taken when this state node is active.

property description

description?: string;
A text description of the state node

property entry

entry?: Actions<
    TContext,
    TEvent,
    TEvent,
    undefined,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
>;
The action(s) to be executed upon entering the state node.

property exit

exit?: Actions<
    TContext,
    TEvent,
    TEvent,
    undefined,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
>;
The action(s) to be executed upon exiting the state node.

property history

history?: 'shallow' | 'deep' | boolean | undefined;
Indicates whether the state node is a history state node, and what type of history: shallow, deep, true (shallow), false (none), undefined (none)

property id

id?: string | undefined;
The unique ID of the state node, which can be referenced as a transition target via the #id syntax.

property initial

initial?:
    | InitialTransitionConfig<TContext, TEvent, TActor, TAction, TGuard, TDelay>
    | string
    | undefined;
The initial state transition.

property invoke

invoke?: SingleOrArray<
    InvokeConfig<
        TContext,
        TEvent,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TEmitted,
        TMeta
    >
>;
The services to invoke upon entering this state node. These services will be stopped upon exiting this state node.

property meta

meta?: TMeta;
The meta data associated with this state node, which will be returned in State instances.

property on

on?: TransitionsConfig<
    TContext,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted,
    TMeta
>;
The mapping of event types to their potential transition(s).

property onDone

onDone?:
    | string
    | SingleOrArray<
          TransitionConfig<
              TContext,
              DoneStateEvent,
              TEvent,
              TActor,
              TAction,
              TGuard,
              TDelay,
              TEmitted,
              TMeta
          >
      >
    | undefined;
The potential transition(s) to be taken upon reaching a final child state node.

This is equivalent to defining a [done(id)] transition on this state node's on property.

property order

order?: number;
The order this state node appears. Corresponds to the implicit document order.

property output

output?: Mapper<TContext, TEvent, unknown, TEvent> | NonReducibleUnknown;
The output data sent with the "xstate.done.state._id_" event if this is a final state node.

The output data will be evaluated with the current context and placed on the .data property of the event.

property parent

parent?: StateNode<TContext, TEvent>;
property states

states?:
    | StatesConfig<
          TContext,
          TEvent,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TTag,
          NonReducibleUnknown,
          TEmitted,
          TMeta
      >
    | undefined;
The mapping of state node keys to their state node configurations (recursive).

property tags

tags?: SingleOrArray<TTag>;
The tags for this state node, which are accumulated into the state.tags property.

property target

target?: string | undefined;
A default target for a history state

property type

type?: 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
The type of this state node:

- 'atomic' - no child state nodes - 'compound' - nested child state nodes (XOR) - 'parallel' - orthogonal nested child state nodes (AND) - 'history' - history state node - 'final' - final state node

interface StateNodeDefinition

interface StateNodeDefinition<
    TContext extends MachineContext,
    TEvent extends EventObject
> {}
property description

description?: string;
property entry

entry: UnknownAction[];
property exit

exit: UnknownAction[];
property history

history: boolean | 'shallow' | 'deep' | undefined;
property id

id: string;
property initial

initial: InitialTransitionDefinition<TContext, TEvent> | undefined;
property invoke

invoke: Array<
    InvokeDefinition<
        TContext,
        TEvent,
        TODO,
        TODO,
        TODO,
        TODO,
        TODO, // TEmitted
        TODO
    >
>;
property key

key: string;
property meta

meta: any;
property on

on: TransitionDefinitionMap<TContext, TEvent>;
property order

order: number;
property output

output?: StateNodeConfig<
    TContext,
    TEvent,
    ProvidedActor,
    ParameterizedObject,
    ParameterizedObject,
    string,
    string,
    unknown,
    EventObject, // TEmitted
    any
>['output'];
property states

states: StatesDefinition<TContext, TEvent>;
property tags

tags: string[];
property transitions

transitions: Array<TransitionDefinition<TContext, TEvent>>;
property type

type: 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
property version

version?: string | undefined;
interface StateValueMap

interface StateValueMap {}
index signature

[key: string]: StateValue | undefined;
interface StopAction

interface StopAction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject
> {}
call signature

(args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
interface Subscribable

interface Subscribable<T> extends InteropSubscribable<T> {}
method subscribe

subscribe: {
    (observer: Observer<T>): Subscription;
    (
        next: (value: T) => void,
        error?: (error: any) => void,
        complete?: () => void
    ): Subscription;
};
interface Subscription

interface Subscription {}
method unsubscribe

unsubscribe: () => void;
interface ToExecutableAction

interface ToExecutableAction<T extends ParameterizedObject>
    extends ExecutableActionObject {}
property exec

exec: undefined;
property params

params: T['params'];
property type

type: T['type'];
interface TransitionConfig

interface TransitionConfig<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TEmitted extends EventObject = EventObject,
    TMeta extends MetaObject = MetaObject
> {}
property actions

actions?: Actions<
    TContext,
    TExpressionEvent,
    TEvent,
    undefined,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
>;
property description

description?: string;
property guard

guard?: Guard<TContext, TExpressionEvent, undefined, TGuard>;
property meta

meta?: TMeta;
property reenter

reenter?: boolean;
property target

target?: TransitionTarget | undefined;
interface TransitionDefinition

interface TransitionDefinition<
    TContext extends MachineContext,
    TEvent extends EventObject
> extends Omit<
        TransitionConfig<
            TContext,
            TEvent,
            TEvent,
            TODO,
            TODO,
            TODO,
            TODO,
            TODO, // TEmitted
            TODO
        >,
        'target' | 'guard'
    > {}
property actions

actions: readonly UnknownAction[];
property eventType

eventType: EventDescriptor<TEvent>;
property guard

guard?: UnknownGuard;
property reenter

reenter: boolean;
property source

source: StateNode<TContext, TEvent>;
property target

target: ReadonlyArray<StateNode<TContext, TEvent>> | undefined;
property toJSON

toJSON: () => {
    target: string[] | undefined;
    source: string;
    actions: readonly UnknownAction[];
    guard?: UnknownGuard;
    eventType: EventDescriptor<TEvent>;
    meta?: Record<string, any>;
};
interface UnifiedArg

interface UnifiedArg<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TEvent extends EventObject
> {}
property context

context: TContext;
property event

event: TExpressionEvent;
property self

self: ActorRef<
    MachineSnapshot<
        TContext,
        TEvent,
        Record<string, AnyActorRef | undefined>, // TODO: this should be replaced with `TChildren`
        StateValue,
        string,
        unknown,
        TODO, // TMeta
        TODO
    >,
    TEvent,
    AnyEventObject
>;
property system

system: AnyActorSystem;
Enums
enum SpecialTargets

enum SpecialTargets {
    Parent = '#_parent',
    Internal = '#_internal',
}
member Internal

Internal = '#_internal'
member Parent

Parent = '#_parent'
Type Aliases
type Action

type Action<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TEmitted extends EventObject
> =
    | NoRequiredParams<TAction>
    | WithDynamicParams<TContext, TExpressionEvent, TAction>
    | ActionFunction<
          TContext,
          TExpressionEvent,
          TEvent,
          TParams,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TEmitted
      >;
type ActionExecutor

type ActionExecutor = (actionToExecute: ExecutableActionObject) => void;
type ActionFunction

type ActionFunction<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TEmitted extends EventObject
> = {
    (args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
    _out_TEvent?: TEvent;
    _out_TActor?: TActor;
    _out_TAction?: TAction;
    _out_TGuard?: TGuard;
    _out_TDelay?: TDelay;
    _out_TEmitted?: TEmitted;
};
type ActionFunctionMap

type ActionFunctionMap<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject = ParameterizedObject,
    TGuard extends ParameterizedObject = ParameterizedObject,
    TDelay extends string = string,
    TEmitted extends EventObject = EventObject
> = {
    [K in TAction['type']]?: ActionFunction<
        TContext,
        TEvent,
        TEvent,
        GetParameterizedParams<
            TAction extends {
                type: K;
            }
                ? TAction
                : never
        >,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TEmitted
    >;
};
type Actions

type Actions<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TEmitted extends EventObject
> = SingleOrArray<
    Action<
        TContext,
        TExpressionEvent,
        TEvent,
        TParams,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TEmitted
    >
>;
type ActorLogicFrom

type ActorLogicFrom<T> = ReturnTypeOrValue<T> extends infer R
    ? R extends StateMachine<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any, // TMeta
          any
      >
        ? R
        : R extends Promise<infer U>
        ? PromiseActorLogic<U>
        : never
    : never;
type ActorRefFrom

type ActorRefFrom<T> = ReturnTypeOrValue<T> extends infer R
    ? R extends StateMachine<
          infer TContext,
          infer TEvent,
          infer TChildren,
          infer _TActor,
          infer _TAction,
          infer _TGuard,
          infer _TDelay,
          infer TStateValue,
          infer TTag,
          infer _TInput,
          infer TOutput,
          infer TEmitted,
          infer TMeta,
          infer TStateSchema
      >
        ? ActorRef<
              MachineSnapshot<
                  TContext,
                  TEvent,
                  TChildren,
                  TStateValue,
                  TTag,
                  TOutput,
                  TMeta,
                  TStateSchema
              >,
              TEvent,
              TEmitted
          >
        : R extends Promise<infer U>
        ? ActorRefFrom<PromiseActorLogic<U>>
        : R extends ActorLogic<
              infer TSnapshot,
              infer TEvent,
              infer _TInput,
              infer _TSystem,
              infer TEmitted
          >
        ? ActorRef<TSnapshot, TEvent, TEmitted>
        : never
    : never;
type ActorRefFromLogic

type ActorRefFromLogic<T extends AnyActorLogic> = ActorRef<
    SnapshotFrom<T>,
    EventFromLogic<T>,
    EmittedFrom<T>
>;
type ActorRefLike

type ActorRefLike = Pick<AnyActorRef, 'sessionId' | 'send' | 'getSnapshot'>;
type AnyActor

type AnyActor = Actor<any>;
type AnyActorLogic

type AnyActorLogic = ActorLogic<
    any, // snapshot
    any, // event
    any, // input
    any, // system
    any
>;
type AnyActorRef

type AnyActorRef = ActorRef<
    any,
    any, // TODO: shouldn't this be AnyEventObject?
    any
>;
type AnyActorScope

type AnyActorScope = ActorScope<
    any, // TSnapshot
    any, // TEvent
    AnyActorSystem,
    any
>;
type AnyFunction

type AnyFunction = (...args: any[]) => any;
type AnyHistoryValue

type AnyHistoryValue = HistoryValue<any, any>;
type AnyInterpreter

type AnyInterpreter = AnyActor;
Deprecated
Use AnyActor instead.

type AnyInvokeConfig

type AnyInvokeConfig = InvokeConfig<any, any, any, any, any, any, any, any>;
type AnyMachineSnapshot

type AnyMachineSnapshot = MachineSnapshot<any, any, any, any, any, any, any, any>;
type AnyState

type AnyState = AnyMachineSnapshot;
Deprecated
Use AnyMachineSnapshot instead

type AnyStateConfig

type AnyStateConfig = StateConfig<any, AnyEventObject>;
type AnyStateMachine

type AnyStateMachine = StateMachine<
    any, // context
    any, // event
    any, // children
    any, // actor
    any, // action
    any, // guard
    any, // delay
    any, // state value
    any, // tag
    any, // input
    any, // output
    any, // emitted
    any, // TMeta
    any
>;
type AnyStateNode

type AnyStateNode = StateNode<any, any>;
type AnyStateNodeConfig

type AnyStateNodeConfig = StateNodeConfig<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any, // emitted
    any
>;
type AnyStateNodeDefinition

type AnyStateNodeDefinition = StateNodeDefinition<any, any>;
type AnyTransitionConfig

type AnyTransitionConfig = TransitionConfig<
    any, // TContext
    any, // TExpressionEvent
    any, // TEvent
    any, // TActor
    any, // TAction
    any, // TGuard
    any, // TDelay
    any, // TEmitted
    any
>;
type AnyTransitionDefinition

type AnyTransitionDefinition = TransitionDefinition<any, any>;
type Assigner

type Assigner<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TActor extends ProvidedActor
> = (
    args: AssignArgs<TContext, TExpressionEvent, TEvent, TActor>,
    params: TParams
) => Partial<TContext>;
type BuiltinActionResolution

type BuiltinActionResolution = [
    AnyMachineSnapshot,
    NonReducibleUnknown,
    // params
    UnknownAction[] | undefined
];
type CallbackActorLogic

type CallbackActorLogic<
    TEvent extends EventObject,
    TInput = NonReducibleUnknown,
    TEmitted extends EventObject = EventObject
> = ActorLogic<CallbackSnapshot<TInput>, TEvent, TInput, AnyActorSystem, TEmitted>;
type CallbackActorRef

type CallbackActorRef<
    TEvent extends EventObject,
    TInput = NonReducibleUnknown
> = ActorRefFromLogic<CallbackActorLogic<TEvent, TInput>>;
Represents an actor created by fromCallback.

The type of self within the actor's logic.

Example 1

import { fromCallback, createActor } from 'xstate';

// The events the actor receives.
type Event = { type: 'someEvent' };
// The actor's input.
type Input = { name: string };

// Actor logic that logs whenever it receives an event of type `someEvent`.
const logic = fromCallback<Event, Input>(({ self, input, receive }) => {
  self;
  // ^? CallbackActorRef<Event, Input>

  receive((event) => {
    if (event.type === 'someEvent') {
      console.log(`${input.name}: received "someEvent" event`);
      // logs 'myActor: received "someEvent" event'
    }
  });
});

const actor = createActor(logic, { input: { name: 'myActor' } });
//    ^? CallbackActorRef<Event, Input>
See Also
fromCallback

type CallbackLogicFunction

type CallbackLogicFunction<
    TEvent extends EventObject = AnyEventObject,
    TSentEvent extends EventObject = AnyEventObject,
    TInput = NonReducibleUnknown,
    TEmitted extends EventObject = EventObject
> = ({
    input,
    system,
    self,
    sendBack,
    receive,
    emit,
}: {
    /**
     * Data that was provided to the callback actor
     *
     * @see {@link https://stately.ai/docs/input | Input docs}
     */
    input: TInput;
    /** The actor system to which the callback actor belongs */
    system: AnyActorSystem;
    /** The parent actor of the callback actor */
    self: CallbackActorRef<TEvent>;
    /** A function that can send events back to the parent actor */
    sendBack: (event: TSentEvent) => void;
    /**
     * A function that can be called with a listener function argument; the
     * listener is then called whenever events are received by the callback actor
     */
    receive: Receiver<TEvent>;
    emit: (emitted: TEmitted) => void;
}) => (() => void) | void;
type CallbackSnapshot

type CallbackSnapshot<TInput> = Snapshot<undefined> & {
    input: TInput;
};
type Cast

type Cast<A, B> = A extends B ? A : B;
type Compute

type Compute<A> = {
    [K in keyof A]: A[K];
} & unknown;
type ConditionalRequired

type ConditionalRequired<T, Condition extends boolean> = Condition extends true
    ? Required<T>
    : T;
type ContextFactory

type ContextFactory<
    TContext extends MachineContext,
    TActor extends ProvidedActor,
    TInput,
    TEvent extends EventObject = EventObject
> = ({
    spawn,
    input,
    self,
}: {
    spawn: Spawner<TActor>;
    input: TInput;
    self: ActorRef<
        MachineSnapshot<
            TContext,
            TEvent,
            Record<string, AnyActorRef | undefined>, // TODO: this should be replaced with `TChildren`
            StateValue,
            string,
            unknown,
            TODO, // TMeta
            TODO
        >,
        TEvent,
        AnyEventObject
    >;
}) => TContext;
type ContextFrom

type ContextFrom<T> = ReturnTypeOrValue<T> extends infer R
    ? R extends StateMachine<
          infer TContext,
          infer _TEvent,
          infer _TChildren,
          infer _TActor,
          infer _TAction,
          infer _TGuard,
          infer _TDelay,
          infer _TStateValue,
          infer _TTag,
          infer _TInput,
          infer _TOutput,
          infer _TEmitted,
          infer _TMeta,
          infer _TStateSchema
      >
        ? TContext
        : R extends MachineSnapshot<
              infer TContext,
              infer _TEvent,
              infer _TChildren,
              infer _TStateValue,
              infer _TTag,
              infer _TOutput,
              infer _TMeta,
              infer _TStateSchema
          >
        ? TContext
        : R extends Actor<infer TActorLogic>
        ? TActorLogic extends StateMachine<
              infer TContext,
              infer _TEvent,
              infer _TChildren,
              infer _TActor,
              infer _TAction,
              infer _TGuard,
              infer _TDelay,
              infer _TStateValue,
              infer _TTag,
              infer _TInput,
              infer _TOutput,
              infer _TEmitted,
              infer _TMeta,
              infer _TStateSchema
          >
            ? TContext
            : never
        : never
    : never;
type DelayConfig

type DelayConfig<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject
> = number | DelayExpr<TContext, TExpressionEvent, TParams, TEvent>;
type DelayedTransitions

type DelayedTransitions<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string
> = {
    [K in Delay<TDelay>]?:
        | string
        | SingleOrArray<
              TransitionConfig<
                  TContext,
                  TEvent,
                  TEvent,
                  TActor,
                  TAction,
                  TGuard,
                  TDelay,
                  TODO, // TEmitted
                  TODO
              >
          >;
};
type DelayExpr

type DelayExpr<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject
> = (
    args: ActionArgs<TContext, TExpressionEvent, TEvent>,
    params: TParams
) => number;
type DelayFunctionMap

type DelayFunctionMap<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TAction extends ParameterizedObject
> = Record<string, DelayConfig<TContext, TEvent, TAction['params'], TEvent>>;
type DevToolsAdapter

type DevToolsAdapter = (service: AnyActor) => void;
type DoNotInfer

type DoNotInfer<T> = [T][T extends any ? 0 : any];
type Elements

type Elements<T> = T[keyof T & `${number}`];
type EmittedFrom

type EmittedFrom<TLogic extends AnyActorLogic> = TLogic extends ActorLogic<
    infer _TSnapshot,
    infer _TEvent,
    infer _TInput,
    infer _TSystem,
    infer TEmitted
>
    ? TEmitted
    : never;
type Equals

type Equals<A1, A2> = (<A>() => A extends A2 ? true : false) extends <
    A
>() => A extends A1 ? true : false
    ? true
    : false;
type EventDescriptor

type EventDescriptor<TEvent extends EventObject> =
    | TEvent['type']
    | PartialEventDescriptor<TEvent['type']>
    | '*';
type EventFrom

type EventFrom<
    T,
    K extends Prop<TEvent, 'type'> = never,
    TEvent extends EventObject = ResolveEventType<T>
> = IsNever<K> extends true ? TEvent : ExtractEvent<TEvent, K>;
type EventFromLogic

type EventFromLogic<TLogic extends AnyActorLogic> = TLogic extends ActorLogic<
    infer _TSnapshot,
    infer TEvent,
    infer _TInput,
    infer _TEmitted,
    infer _TSystem
>
    ? TEvent
    : never;
type EventObject

type EventObject = {
    /** The type of event that is sent. */
    type: string;
};
The full definition of an event, with a string type.

type ExecutableActionsFrom

type ExecutableActionsFrom<T extends AnyActorLogic> = T extends StateMachine<
    infer _TContext,
    infer _TEvent,
    infer _TChildren,
    infer _TActor,
    infer TAction,
    infer _TGuard,
    infer _TDelay,
    infer _TStateValue,
    infer _TTag,
    infer _TInput,
    infer _TOutput,
    infer _TEmitted,
    infer _TMeta,
    infer _TConfig
>
    ?
          | SpecialExecutableAction
          | (string extends TAction['type'] ? never : ToExecutableAction<TAction>)
    : never;
type ExtractEvent

type ExtractEvent<
    TEvent extends EventObject,
    TDescriptor extends EventDescriptor<TEvent>
> = string extends TEvent['type']
    ? TEvent
    : NormalizeDescriptor<TDescriptor> extends infer TNormalizedDescriptor
    ? TEvent extends any
        ? true extends EventDescriptorMatches<TEvent['type'], TNormalizedDescriptor>
            ? TEvent
            : never
        : never
    : never;
type GetConcreteByKey

type GetConcreteByKey<T, TKey extends keyof T, TValue extends T[TKey]> = T &
    Record<TKey, TValue>;
type GetParameterizedParams

type GetParameterizedParams<T extends ParameterizedObject | undefined> =
    T extends any ? ('params' extends keyof T ? T['params'] : undefined) : never;
type HistoryValue

type HistoryValue<
    TContext extends MachineContext,
    TEvent extends EventObject
> = Record<string, Array<StateNode<TContext, TEvent>>>;
type HomomorphicOmit

type HomomorphicOmit<T, K extends keyof any> = {
    [P in keyof T as Exclude<P, K>]: T[P];
};
type HomomorphicPick

type HomomorphicPick<T, K extends keyof any> = {
    [P in keyof T as P & K]: T[P];
};
type Identity

type Identity<T> = {
    [K in keyof T]: T[K];
};
type IndexByProp

type IndexByProp<T extends Record<P, string>, P extends keyof T> = {
    [E in T as E[P]]: E;
};
type IndexByType

type IndexByType<
    T extends {
        type: string;
    }
> = IndexByProp<T, 'type'>;
type InferEvent

type InferEvent<E extends EventObject> = {
    [T in E['type']]: {
        type: T;
    } & Extract<
        E,
        {
            type: T;
        }
    >;
}[E['type']];
type InputFrom

type InputFrom<T> = T extends StateMachine<
    infer _TContext,
    infer _TEvent,
    infer _TChildren,
    infer _TActor,
    infer _TAction,
    infer _TGuard,
    infer _TDelay,
    infer _TStateValue,
    infer _TTag,
    infer TInput,
    infer _TOutput,
    infer _TEmitted,
    infer _TMeta,
    infer _TStateSchema
>
    ? TInput
    : T extends ActorLogic<
          infer _TSnapshot,
          infer _TEvent,
          infer TInput,
          infer _TSystem,
          infer _TEmitted
      >
    ? TInput
    : never;
type InspectionEvent

type InspectionEvent =
    | InspectedSnapshotEvent
    | InspectedEventEvent
    | InspectedActorEvent
    | InspectedMicrostepEvent
    | InspectedActionEvent;
type InternalMachineImplementations

type InternalMachineImplementations<TTypes extends StateMachineTypes> = {
    actions?: MachineImplementationsActions<TTypes>;
    actors?: MachineImplementationsActors<TTypes>;
    delays?: MachineImplementationsDelays<TTypes>;
    guards?: MachineImplementationsGuards<TTypes>;
};
type Interpreter

type Interpreter = typeof Actor;
Deprecated
Use Actor instead.

type InterpreterFrom

type InterpreterFrom<
    T extends AnyStateMachine | ((...args: any[]) => AnyStateMachine)
> = ReturnTypeOrValue<T> extends StateMachine<
    infer TContext,
    infer TEvent,
    infer TChildren,
    infer _TActor,
    infer _TAction,
    infer _TGuard,
    infer _TDelay,
    infer TStateValue,
    infer TTag,
    infer TInput,
    infer TOutput,
    infer TEmitted,
    infer TMeta,
    infer TStateSchema
>
    ? Actor<
          ActorLogic<
              MachineSnapshot<
                  TContext,
                  TEvent,
                  TChildren,
                  TStateValue,
                  TTag,
                  TOutput,
                  TMeta,
                  TStateSchema
              >,
              TEvent,
              TInput,
              AnyActorSystem,
              TEmitted
          >
      >
    : never;
Deprecated
Use Actor<T> instead.

type Invert

type Invert<T extends Record<PropertyKey, PropertyKey>> = {
    [K in keyof T as T[K]]: K;
};
type InvokeConfig

type InvokeConfig<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TEmitted extends EventObject,
    TMeta extends MetaObject
> = IsLiteralString<TActor['src']> extends true
    ? DistributeActors<
          TContext,
          TEvent,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TEmitted,
          TMeta,
          TActor
      >
    : {
          /**
           * The unique identifier for the invoked machine. If not specified, this
           * will be the machine's own `id`, or the URL (from `src`).
           */
          id?: string;
          systemId?: string;
          /** The source of the machine to be invoked, or the machine itself. */
          src: AnyActorLogic | string;
          input?:
              | Mapper<TContext, TEvent, NonReducibleUnknown, TEvent>
              | NonReducibleUnknown;
          /**
           * The transition to take upon the invoked child machine reaching its
           * final top-level state.
           */
          onDone?:
              | string
              | SingleOrArray<
                    TransitionConfigOrTarget<
                        TContext,
                        DoneActorEvent<any>, // TODO: consider replacing with `unknown`
                        TEvent,
                        TActor,
                        TAction,
                        TGuard,
                        TDelay,
                        TEmitted,
                        TMeta
                    >
                >;
          /**
           * The transition to take upon the invoked child machine sending an
           * error event.
           */
          onError?:
              | string
              | SingleOrArray<
                    TransitionConfigOrTarget<
                        TContext,
                        ErrorActorEvent,
                        TEvent,
                        TActor,
                        TAction,
                        TGuard,
                        TDelay,
                        TEmitted,
                        TMeta
                    >
                >;
          onSnapshot?:
              | string
              | SingleOrArray<
                    TransitionConfigOrTarget<
                        TContext,
                        SnapshotEvent,
                        TEvent,
                        TActor,
                        TAction,
                        TGuard,
                        TDelay,
                        TEmitted,
                        TMeta
                    >
                >;
      };
type IsAny

type IsAny<T> = Equals<T, any>;
type IsLiteralString

type IsLiteralString<T extends string> = string extends T ? false : true;
type IsNever

type IsNever<T> = [T] extends [never] ? true : false;
type IsNotNever

type IsNotNever<T> = [T] extends [never] ? false : true;
type Lazy

type Lazy<T> = () => T;
type LogExpr

type LogExpr<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject
> = (
    args: ActionArgs<TContext, TExpressionEvent, TEvent>,
    params: TParams
) => unknown;
type LowInfer

type LowInfer<T> = T & NonNullable<unknown>;
type MachineConfig

type MachineConfig<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor = ProvidedActor,
    TAction extends ParameterizedObject = ParameterizedObject,
    TGuard extends ParameterizedObject = ParameterizedObject,
    TDelay extends string = string,
    TTag extends string = string,
    TInput = any,
    TOutput = unknown,
    TEmitted extends EventObject = EventObject,
    TMeta extends MetaObject = MetaObject
> = (Omit<
    StateNodeConfig<
        DoNotInfer<TContext>,
        DoNotInfer<TEvent>,
        DoNotInfer<TActor>,
        DoNotInfer<TAction>,
        DoNotInfer<TGuard>,
        DoNotInfer<TDelay>,
        DoNotInfer<TTag>,
        DoNotInfer<TOutput>,
        DoNotInfer<TEmitted>,
        DoNotInfer<TMeta>
    >,
    'output'
> & {
    /** The initial context (extended state) */
    /** The machine's own version. */
    version?: string;
    output?: Mapper<TContext, DoneStateEvent, TOutput, TEvent> | TOutput;
}) &
    (MachineContext extends TContext
        ? {
              context?: InitialContext<LowInfer<TContext>, TActor, TInput, TEvent>;
          }
        : {
              context: InitialContext<LowInfer<TContext>, TActor, TInput, TEvent>;
          });
type MachineContext

type MachineContext = Record<string, any>;
type MachineImplementationsFrom

type MachineImplementationsFrom<
    T extends AnyStateMachine | ((...args: any[]) => AnyStateMachine)
> = ReturnTypeOrValue<T> extends StateMachine<
    infer TContext,
    infer TEvent,
    infer _TChildren,
    infer TActor,
    infer TAction,
    infer TGuard,
    infer TDelay,
    infer _TStateValue,
    infer TTag,
    infer _TInput,
    infer _TOutput,
    infer TEmitted,
    infer _TMeta,
    infer _TStateSchema
>
    ? InternalMachineImplementations<
          ResolvedStateMachineTypes<
              TContext,
              TEvent,
              TActor,
              TAction,
              TGuard,
              TDelay,
              TTag,
              TEmitted
          >
      >
    : never;
type MachineSnapshot

type MachineSnapshot<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TChildren extends Record<string, AnyActorRef | undefined>,
    TStateValue extends StateValue,
    TTag extends string,
    TOutput,
    TMeta extends MetaObject,
    TConfig extends StateSchema
> =
    | ActiveMachineSnapshot<
          TContext,
          TEvent,
          TChildren,
          TStateValue,
          TTag,
          TOutput,
          TMeta,
          TConfig
      >
    | DoneMachineSnapshot<
          TContext,
          TEvent,
          TChildren,
          TStateValue,
          TTag,
          TOutput,
          TMeta,
          TConfig
      >
    | ErrorMachineSnapshot<
          TContext,
          TEvent,
          TChildren,
          TStateValue,
          TTag,
          TOutput,
          TMeta,
          TConfig
      >
    | StoppedMachineSnapshot<
          TContext,
          TEvent,
          TChildren,
          TStateValue,
          TTag,
          TOutput,
          TMeta,
          TConfig
      >;
type Mapper

type Mapper<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TResult,
    TEvent extends EventObject
> = (args: {
    context: TContext;
    event: TExpressionEvent;
    self: ActorRef<
        MachineSnapshot<
            TContext,
            TEvent,
            Record<string, AnyActorRef>, // TODO: this should be replaced with `TChildren`
            StateValue,
            string,
            unknown,
            TODO, // TMeta
            TODO
        >,
        TEvent,
        AnyEventObject
    >;
}) => TResult;
type MaybeLazy

type MaybeLazy<T> = T | Lazy<T>;
type Merge

type Merge<M, N> = Omit<M, keyof N> & N;
type MetaObject

type MetaObject = Record<string, any>;
type NoInfer

type NoInfer<T> = DoNotInfer<T>;
Deprecated
Use the built-in NoInfer type instead

type NonReducibleUnknown

type NonReducibleUnknown = {} | null | undefined;
Remarks
T | unknown reduces to unknown and that can be problematic when it comes to contextual typing. It especially is a problem when the union has a function member, like here:


declare function test(
  cbOrVal: ((arg: number) => unknown) | unknown
): void;
test((arg) => {}); // oops, implicit any
This type can be used to avoid this problem. This union represents the same value space as unknown.

type NoRequiredParams

type NoRequiredParams<T extends ParameterizedObject> = T extends any
    ? undefined extends T['params']
        ? T['type']
        : never
    : never;
type ObservableActorLogic

type ObservableActorLogic<
    TContext,
    TInput extends NonReducibleUnknown,
    TEmitted extends EventObject = EventObject
> = ActorLogic<
    ObservableSnapshot<TContext, TInput>,
    {
        type: string;
        [k: string]: unknown;
    },
    TInput,
    AnyActorSystem,
    TEmitted
>;
type ObservableActorRef

type ObservableActorRef<TContext> = ActorRefFromLogic<
    ObservableActorLogic<TContext, any>
>;
Represents an actor created by fromObservable or fromEventObservable.

The type of self within the actor's logic.

Example 1

import { fromObservable, createActor } from 'xstate';
import { interval } from 'rxjs';

// The type of the value observed by the actor's logic.
type Context = number;
// The actor's input.
type Input = { period?: number };

// Actor logic that observes a number incremented every `input.period`
// milliseconds (default: 1_000).
const logic = fromObservable<Context, Input>(({ input, self }) => {
  self;
  // ^? ObservableActorRef<Event, Input>

  return interval(input.period ?? 1_000);
});

const actor = createActor(logic, { input: { period: 2_000 } });
//    ^? ObservableActorRef<Event, Input>
See Also
fromObservable

fromEventObservable

type ObservableSnapshot

type ObservableSnapshot<
    TContext,
    TInput extends NonReducibleUnknown
> = Snapshot<undefined> & {
    context: TContext | undefined;
    input: TInput | undefined;
    _subscription: Subscription | undefined;
};
type Observer

type Observer<T> = {
    next?: (value: T) => void;
    error?: (err: unknown) => void;
    complete?: () => void;
};
type OutputFrom

type OutputFrom<T> = T extends ActorLogic<
    infer TSnapshot,
    infer _TEvent,
    infer _TInput,
    infer _TSystem,
    infer _TEmitted
>
    ? (TSnapshot & {
          status: 'done';
      })['output']
    : T extends ActorRef<infer TSnapshot, infer _TEvent, infer _TEmitted>
    ? (TSnapshot & {
          status: 'done';
      })['output']
    : never;
type PartialAssigner

type PartialAssigner<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TKey extends keyof TContext
> = (
    args: AssignArgs<TContext, TExpressionEvent, TEvent, TActor>,
    params: TParams
) => TContext[TKey];
type PersistedHistoryValue

type PersistedHistoryValue = Record<
    string,
    Array<{
        id: string;
    }>
>;
type PromiseActorLogic

type PromiseActorLogic<
    TOutput,
    TInput = unknown,
    TEmitted extends EventObject = EventObject
> = ActorLogic<
    PromiseSnapshot<TOutput, TInput>,
    {
        type: string;
        [k: string]: unknown;
    },
    TInput, // input
    AnyActorSystem,
    TEmitted
>;
type PromiseActorRef

type PromiseActorRef<TOutput> = ActorRefFromLogic<
    PromiseActorLogic<TOutput, unknown>
>;
Represents an actor created by fromPromise.

The type of self within the actor's logic.

Example 1

import { fromPromise, createActor } from 'xstate';

// The actor's resolved output
type Output = string;
// The actor's input.
type Input = { message: string };

// Actor logic that fetches the url of an image of a cat saying `input.message`.
const logic = fromPromise<Output, Input>(async ({ input, self }) => {
  self;
  // ^? PromiseActorRef<Output, Input>

  const data = await fetch(
    `https://cataas.com/cat/says/${input.message}`
  );
  const url = await data.json();
  return url;
});

const actor = createActor(logic, { input: { message: 'hello world' } });
//    ^? PromiseActorRef<Output, Input>
See Also
fromPromise

type PromiseSnapshot

type PromiseSnapshot<TOutput, TInput> = Snapshot<TOutput> & {
    input: TInput | undefined;
};
type Prop

type Prop<T, K> = K extends keyof T ? T[K] : never;
type PropertyAssigner

type PropertyAssigner<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TEvent extends EventObject,
    TActor extends ProvidedActor
> = {
    [K in keyof TContext]?:
        | PartialAssigner<TContext, TExpressionEvent, TParams, TEvent, TActor, K>
        | TContext[K];
};
type RequiredActorOptions

type RequiredActorOptions<TActor extends ProvidedActor> =
    | (undefined extends TActor['id'] ? never : 'id')
    | (undefined extends InputFrom<TActor['logic']> ? never : 'input');
type RequiredActorOptionsKeys

type RequiredActorOptionsKeys<TLogic extends AnyActorLogic> =
    undefined extends InputFrom<TLogic> ? never : 'input';
type RequiredLogicInput

type RequiredLogicInput<TLogic extends AnyActorLogic> =
    undefined extends InputFrom<TLogic> ? never : 'input';
type SendExpr

type SendExpr<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TParams extends ParameterizedObject['params'] | undefined,
    TSentEvent extends EventObject,
    TEvent extends EventObject
> = (
    args: ActionArgs<TContext, TExpressionEvent, TEvent>,
    params: TParams
) => TSentEvent;
type SimpleOrStateNodeConfig

type SimpleOrStateNodeConfig<
    TContext extends MachineContext,
    TEvent extends EventObject
> =
    | AtomicStateNodeConfig<TContext, TEvent>
    | StateNodeConfig<
          TContext,
          TEvent,
          TODO,
          TODO,
          TODO,
          TODO,
          TODO,
          TODO,
          TODO, // emitted
          TODO
      >;
type SingleOrArray

type SingleOrArray<T> = readonly T[] | T;
type Snapshot

type Snapshot<TOutput> =
    | {
          status: 'active';
          output: undefined;
          error: undefined;
      }
    | {
          status: 'done';
          output: TOutput;
          error: undefined;
      }
    | {
          status: 'error';
          output: undefined;
          error: unknown;
      }
    | {
          status: 'stopped';
          output: undefined;
          error: undefined;
      };
type SnapshotFrom

type SnapshotFrom<T> = ReturnTypeOrValue<T> extends infer R
    ? R extends ActorRef<infer TSnapshot, infer _, infer __>
        ? TSnapshot
        : R extends Actor<infer TLogic>
        ? SnapshotFrom<TLogic>
        : R extends ActorLogic<
              infer _TSnapshot,
              infer _TEvent,
              infer _TInput,
              infer _TEmitted,
              infer _TSystem
          >
        ? ReturnType<R['transition']>
        : R extends ActorScope<
              infer TSnapshot,
              infer _TEvent,
              infer _TEmitted,
              infer _TSystem
          >
        ? TSnapshot
        : never
    : never;
type SnapshotStatus

type SnapshotStatus = 'active' | 'done' | 'error' | 'stopped';
type Spawner

type Spawner<TActor extends ProvidedActor> = IsLiteralString<
    TActor['src']
> extends true
    ? {
          <TSrc extends TActor['src']>(
              logic: TSrc,
              ...[options]: SpawnOptions<TActor, TSrc>
          ): ActorRefFromLogic<GetConcreteByKey<TActor, 'src', TSrc>['logic']>;
          <TLogic extends AnyActorLogic>(
              src: TLogic,
              ...[options]: ConditionalRequired<
                  [
                      options?: {
                          id?: never;
                          systemId?: string;
                          input?: InputFrom<TLogic>;
                          syncSnapshot?: boolean;
                      } & {
                          [K in RequiredLogicInput<TLogic>]: unknown;
                      }
                  ],
                  IsNotNever<RequiredLogicInput<TLogic>>
              >
          ): ActorRefFromLogic<TLogic>;
      }
    : <TLogic extends AnyActorLogic | string>(
          src: TLogic,
          ...[options]: ConditionalRequired<
              [
                  options?: {
                      id?: string;
                      systemId?: string;
                      input?: TLogic extends string ? unknown : InputFrom<TLogic>;
                      syncSnapshot?: boolean;
                  } & (TLogic extends AnyActorLogic
                      ? {
                            [K in RequiredLogicInput<TLogic>]: unknown;
                        }
                      : {})
              ],
              IsNotNever<
                  TLogic extends AnyActorLogic ? RequiredLogicInput<TLogic> : never
              >
          >
      ) => TLogic extends AnyActorLogic ? ActorRefFromLogic<TLogic> : AnyActorRef;
type SpecialExecutableAction

type SpecialExecutableAction =
    | ExecutableSpawnAction
    | ExecutableRaiseAction
    | ExecutableSendToAction;
type StateFrom

type StateFrom<T extends AnyStateMachine | ((...args: any[]) => AnyStateMachine)> =
    T extends AnyStateMachine
        ? ReturnType<T['transition']>
        : T extends (...args: any[]) => AnyStateMachine
        ? ReturnType<ReturnType<T>['transition']>
        : never;
type StateId

type StateId<
    TSchema extends StateSchema,
    TKey extends string = '(machine)',
    TParentKey extends string | null = null
> =
    | (TSchema extends {
          id: string;
      }
          ? TSchema['id']
          : TParentKey extends null
          ? TKey
          : `${TParentKey}.${TKey}`)
    | (TSchema['states'] extends Record<string, any>
          ? Values<{
                [K in keyof TSchema['states'] & string]: StateId<
                    TSchema['states'][K],
                    K,
                    TParentKey extends string
                        ? `${TParentKey}.${TKey}`
                        : TSchema['id'] extends string
                        ? TSchema['id']
                        : TKey
                >;
            }>
          : never);
type StateKey

type StateKey = string | AnyMachineSnapshot;
type StateNodesConfig

type StateNodesConfig<
    TContext extends MachineContext,
    TEvent extends EventObject
> = {
    [K in string]: StateNode<TContext, TEvent>;
};
type StateSchema

type StateSchema = {
    id?: string;
    states?: Record<string, StateSchema>;
    type?: unknown;
    invoke?: unknown;
    on?: unknown;
    entry?: unknown;
    exit?: unknown;
    onDone?: unknown;
    after?: unknown;
    always?: unknown;
    meta?: unknown;
    output?: unknown;
    tags?: unknown;
    description?: unknown;
};
type StatesConfig

type StatesConfig<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TTag extends string,
    TOutput,
    TEmitted extends EventObject,
    TMeta extends MetaObject
> = {
    [K in string]: StateNodeConfig<
        TContext,
        TEvent,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TTag,
        TOutput,
        TEmitted,
        TMeta
    >;
};
type StatesDefinition

type StatesDefinition<
    TContext extends MachineContext,
    TEvent extends EventObject
> = {
    [K in string]: StateNodeDefinition<TContext, TEvent>;
};
type StateTypes

type StateTypes =
    | 'atomic'
    | 'compound'
    | 'parallel'
    | 'final'
    | 'history'
    | ({} & string);
type StateValue

type StateValue = string | StateValueMap;
The string or object representing the state value relative to the parent state node.

Remarks
- For a child atomic state node, this is a string, e.g., "pending". - For complex state nodes, this is an object, e.g., `{ success: "someChildState" }`.

type StateValueFrom

type StateValueFrom<TMachine extends AnyStateMachine> = Parameters<
    StateFrom<TMachine>['matches']
>[0];
type TagsFrom

type TagsFrom<TMachine extends AnyStateMachine> = Parameters<
    StateFrom<TMachine>['hasTag']
>[0];
type ToChildren

type ToChildren<TActor extends ProvidedActor> = string extends TActor['src']
    ? Record<string, AnyActorRef>
    : Compute<
          ToConcreteChildren<TActor> &
              {
                  include: {
                      [id: string]: TActor extends any
                          ? ActorRefFromLogic<TActor['logic']> | undefined
                          : never;
                  };
                  exclude: unknown;
              }[undefined extends TActor['id']
                  ? 'include'
                  : string extends TActor['id']
                  ? 'include'
                  : 'exclude']
      >;
type TODO

type TODO = any;
type ToStateValue

type ToStateValue<T extends StateSchema> = T extends {
    states: Record<infer S, any>;
}
    ? IsNever<S> extends true
        ? {}
        :
              | GroupStateKeys<T, S>['leaf']
              | (IsNever<GroupStateKeys<T, S>['nonLeaf']> extends false
                    ? T extends {
                          type: 'parallel';
                      }
                        ? {
                              [K in GroupStateKeys<T, S>['nonLeaf']]: ToStateValue<
                                  T['states'][K]
                              >;
                          }
                        : Compute<
                              Values<{
                                  [K in GroupStateKeys<T, S>['nonLeaf']]: {
                                      [StateKey in K]: ToStateValue<T['states'][K]>;
                                  };
                              }>
                          >
                    : never)
    : {};
type TransitionActorLogic

type TransitionActorLogic<
    TContext,
    TEvent extends EventObject,
    TInput extends NonReducibleUnknown,
    TEmitted extends EventObject = EventObject
> = ActorLogic<
    TransitionSnapshot<TContext>,
    TEvent,
    TInput,
    AnyActorSystem,
    TEmitted
>;
type TransitionActorRef

type TransitionActorRef<TContext, TEvent extends EventObject> = ActorRefFromLogic<
    TransitionActorLogic<TransitionSnapshot<TContext>, TEvent, unknown>
>;
Represents an actor created by fromTransition.

The type of self within the actor's logic.

Example 1

import {
  fromTransition,
  createActor,
  type AnyActorSystem
} from 'xstate';

//* The actor's stored context.
type Context = {
  // The current count.
  count: number;
  // The amount to increase `count` by.
  step: number;
};
// The events the actor receives.
type Event = { type: 'increment' };
// The actor's input.
type Input = { step?: number };

// Actor logic that increments `count` by `step` when it receives an event of
// type `increment`.
const logic = fromTransition<Context, Event, AnyActorSystem, Input>(
  (state, event, actorScope) => {
    actorScope.self;
    //         ^? TransitionActorRef<Context, Event>

    if (event.type === 'increment') {
      return {
        ...state,
        count: state.count + state.step
      };
    }
    return state;
  },
  ({ input, self }) => {
    self;
    // ^? TransitionActorRef<Context, Event>

    return {
      count: 0,
      step: input.step ?? 1
    };
  }
);

const actor = createActor(logic, { input: { step: 10 } });
//    ^? TransitionActorRef<Context, Event>
See Also
fromTransition

type TransitionConfigOrTarget

type TransitionConfigOrTarget<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TEmitted extends EventObject,
    TMeta extends MetaObject
> = SingleOrArray<
    | TransitionConfigTarget
    | TransitionConfig<
          TContext,
          TExpressionEvent,
          TEvent,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TEmitted,
          TMeta
      >
>;
type TransitionConfigTarget

type TransitionConfigTarget = string | undefined;
type TransitionDefinitionMap

type TransitionDefinitionMap<
    TContext extends MachineContext,
    TEvent extends EventObject
> = {
    [K in EventDescriptor<TEvent>]: Array<
        TransitionDefinition<TContext, ExtractEvent<TEvent, K>>
    >;
};
type Transitions

type Transitions<
    TContext extends MachineContext,
    TEvent extends EventObject
> = Array<TransitionDefinition<TContext, TEvent>>;
type TransitionsConfig

type TransitionsConfig<
    TContext extends MachineContext,
    TEvent extends EventObject,
    TActor extends ProvidedActor,
    TAction extends ParameterizedObject,
    TGuard extends ParameterizedObject,
    TDelay extends string,
    TEmitted extends EventObject,
    TMeta extends MetaObject
> = {
    [K in EventDescriptor<TEvent>]?: TransitionConfigOrTarget<
        TContext,
        ExtractEvent<TEvent, K>,
        TEvent,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TEmitted,
        TMeta
    >;
};
type TransitionSnapshot

type TransitionSnapshot<TContext> = Snapshot<undefined> & {
    context: TContext;
};
type TransitionTarget

type TransitionTarget = SingleOrArray<string>;
type UnknownAction

type UnknownAction = Action<
    MachineContext,
    EventObject,
    EventObject,
    ParameterizedObject['params'] | undefined,
    ProvidedActor,
    ParameterizedObject,
    ParameterizedObject,
    string,
    EventObject
>;
type UnknownActorLogic

type UnknownActorLogic = ActorLogic<
    any, // snapshot
    any, // event
    any, // input
    AnyActorSystem,
    any
>;
type UnknownActorRef

type UnknownActorRef = ActorRef<Snapshot<unknown>, EventObject>;
type UnknownMachineConfig

type UnknownMachineConfig = MachineConfig<MachineContext, EventObject>;
type Values

type Values<T> = T[keyof T];
type WithDynamicParams

type WithDynamicParams<
    TContext extends MachineContext,
    TExpressionEvent extends EventObject,
    T extends ParameterizedObject
> = T extends any
    ? ConditionalRequired<
          {
              type: T['type'];
              params?:
                  | T['params']
                  | (({
                        context,
                        event,
                    }: {
                        context: TContext;
                        event: TExpressionEvent;
                    }) => T['params']);
          },
          undefined extends T['params'] ? false : true
      >
    : never;
Package Files (34)
dist/declarations/src/SimulatedClock.d.ts
dist/declarations/src/State.d.ts
dist/declarations/src/StateMachine.d.ts
dist/declarations/src/StateNode.d.ts
dist/declarations/src/actions/assign.d.ts
dist/declarations/src/actions/cancel.d.ts
dist/declarations/src/actions/emit.d.ts
dist/declarations/src/actions/enqueueActions.d.ts
dist/declarations/src/actions/log.d.ts
dist/declarations/src/actions/raise.d.ts
dist/declarations/src/actions/send.d.ts
dist/declarations/src/actions/spawnChild.d.ts
dist/declarations/src/actions/stopChild.d.ts
dist/declarations/src/actors/callback.d.ts
dist/declarations/src/actors/index.d.ts
dist/declarations/src/actors/observable.d.ts
dist/declarations/src/actors/promise.d.ts
dist/declarations/src/actors/transition.d.ts
dist/declarations/src/assert.d.ts
dist/declarations/src/createActor.d.ts
dist/declarations/src/createMachine.d.ts
dist/declarations/src/getNextSnapshot.d.ts
dist/declarations/src/guards.d.ts
dist/declarations/src/inspection.d.ts
dist/declarations/src/setup.d.ts
dist/declarations/src/spawn.d.ts
dist/declarations/src/stateUtils.d.ts
dist/declarations/src/system.d.ts
dist/declarations/src/toPromise.d.ts
dist/declarations/src/transition.d.ts
dist/declarations/src/types.d.ts
dist/declarations/src/utils.d.ts
dist/declarations/src/waitFor.d.ts
dist/xstate.cjs.d.ts
Dependencies (0)
No dependencies.

Dev Dependencies (5)
@scion-scxml/test-framework
ajv
pkg-up
rxjs
xml-js
Peer Dependencies (0)
No peer dependencies.

Badge
To add a badge like this onejsDocs.io badgeto your package's README, use the codes available below.

You may also use Shields.io to create a custom badge linking to https://www.jsdocs.io/package/xstate.

Markdown

[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/xstate)
HTML

<a href="https://www.jsdocs.io/package/xstate"><img src="https://img.shields.io/badge/jsDocs.io-reference-blue" alt="jsDocs.io"></a>
Updated 18 days ago.
Package analyzed in 6159 ms.
Missing or incorrect documentation? Open an issue for this package.
Back to top
Logo for jsDocs.io
jsDocs.io
Home
Guide
Donate
About
Credits
Privacy
GitHub
Issues
Twitter
