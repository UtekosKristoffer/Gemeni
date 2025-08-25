Actions
Actions are fire-and-forget effects. When a state machine transitions, it may execute actions. Actions occur in response to events, and are typically defined on transitions in the actions: [...] property. Actions can also be defined for any transition that enters a state in the state's entry: [...] property, or for any transition that exits a state in the state's exit: [...] property.

You can visualize your state machines and easily add actions in our drag-and-drop Stately editor. Read more about actions in Stately’s editor.

Actions can also be on a state’s entry or exit, also as a single action or an array.
```tsx
import { setup } from 'xstate';

function trackResponse(response: string) {
  // ...
}

const feedbackMachine = setup({
  actions: {
    track: (_, params: { response: string }) => {
      trackResponse(params.response);
      // Tracks { response: 'good' }
    },
    showConfetti: () => {
      // ...
    }
  }
}).createMachine({
  // ...
  states: {
    // ...
    question: {
      on: {
        'feedback.good': {
          actions: [
            { type: 'track', params: { response: 'good' } }
          ]
        }
      },
      exit: [
        { type: 'exitAction' }
      ]
    }
    thanks: {
      entry: [
        { type: 'showConfetti' }
      ],
    }
  }
});
```

Examples of actions:

Logging a message
Sending a message to another actor
Updating context
Entry and exit actions
Entry actions are actions that occur on any transition that enters a state node. Exit actions are actions that occur on any transition that exits a state node.

Entry and exit actions are defined using the entry: [...] and exit: [...] attributes on a state node. You can fire multiple entry and exit actions on a state. Top-level final states cannot have exit actions, since the machine is stopped and no further transitions can occur.


Action objects
Action objects have an action type and an optional params object:

The action type property describes the action. Actions with the same type have the same implementation.
The action params property hold parameterized values that are relevant to the action.
```tsx
import { setup } from 'xstate';

const feedbackMachine = setup({
  actions: {
    track: (_, params: { response: string }) => {
      /* ... */
    },
  },
}).createMachine({
  // ...
  states: {
    // ...
    question: {
      on: {
        'feedback.good': {
          actions: [
            {
              // Action type
              type: 'track',
              // Action params
              params: { response: 'good' },
            },
          ],
        },
      },
    },
  },
});
```
Dynamic action parameters
You can dynamically pass parameters in the params property to action objects by using a function that returns the params. The function takes in an object that contains the current context and event as arguments.
```tsx
import { setup } from 'xstate';

const feedbackMachine = setup({
  actions: {
    logInitialRating: (_, params: { initialRating: number }) => {
      // ...
    },
  },
}).createMachine({
  context: {
    initialRating: 3,
  },
  entry: [
    {
      type: 'logInitialRating',
      params: ({ context }) => ({
        initialRating: context.initialRating,
      }),
    },
  ],
});
```
This is a recommended approach for making actions more reusable, since you can define actions that do not rely on the machine’s context or event types.
```tsx
import { setup } from 'xstate';

function logInitialRating(_, params: { initialRating: number }) {
  console.log(`Initial rating: ${params.initialRating}`);
}

const feedbackMachine = setup({
  actions: { logInitialRating },
}).createMachine({
  context: { initialRating: 3 },
  entry: [
    {
      type: 'logInitialRating',
      params: ({ context }) => ({
        initialRating: context.initialRating,
      }),
    },
  ],
});
```
Inline actions
You can declare actions as inline functions:
```tsx
import { createMachine } from 'xstate';

const feedbackMachine = createMachine({
  entry: [
    // Inline action
    ({ context, event }) => {
      console.log(/* ... */);
    },
  ],
});
```
Inline actions are useful for prototyping and simple cases but we generally recommended using action objects.

Implementing actions
You can setup the implementations for named actions in the actions property of the setup(...) function

import { setup } from 'xstate';

const feedbackMachine = setup({
  actions: {
    track: (_, params: { msg: string }) => {
      // Action implementation
      // ...
    },
  },
}).createMachine({
  // Machine config
  entry: [{ type: 'track', params: { msg: 'entered' } }],
});
```
You can also provide action implementations to override existing actions in the machine.provide(...) method, which creates a new machine with the same config but with the provided implementations:
```tsx
const feedbackActor = createActor(
  feedbackMachine.provide({
    actions: {
      track: ({ context, event }, params) => {
        // Different action implementation
        // (overrides previous implementation)
        // ...
      },
    },
  }),
);
```
Built-in actions
XState provides a number of useful built-in actions that are a core part of the logic of your state machines, and not merely side-effects.

Built-in actions, such as assign(…), sendTo(…), and raise(…), are not imperative; they return a special action object (e.g. { type: 'xstate.assign', … }) that are interpreted by the state machine. Do not call built-in action in custom action functions.
```tsx
// ❌ This will have no effect
const machine = createMachine({
  context: { count: 0 },
  entry: ({ context }) => {
    // This action creator only returns an action object
    // like { type: 'xstate.assign', ... }
    assign({ count: context.count + 1 });
  },
});

// ✅ This will work as expected
const machine = createMachine({
  context: { count: 0 },
  entry: assign({
    count: ({ context }) => context.count + 1,
  }),
});

// ✅ Imperative built-in actions are available in `enqueueActions(…)`
const machine = createMachine({
  context: { count: 0 },
  entry: enqueueActions(({ context, enqueue }) => {
    enqueue.assign({
      count: context.count + 1,
    });
  }),
});

```
Assign action
The assign(...) action is a special action that assigns data to the state context. The assignments argument in assign(assignments) is where assignments to context are specified.

Assignments can be an object of key-value pairs where the keys are context keys and the values are either static values or expressions that return the new value:
```
import { setup } from 'xstate';

const countMachine = setup({
  types: {
    events: {} as { type: 'increment'; value: number },
  },
}).createMachine({
  context: {
    count: 0,
  },
  on: {
    increment: {
      actions: assign({
        count: ({ context, event }) => context.count + event.value,
      }),
    },
  },
});

const countActor = createActor(countMachine);
countActor.subscribe((state) => {
  console.log(state.context.count);
});
countActor.start();
// logs 0

countActor.send({ type: 'increment', value: 3 });
// logs 3

countActor.send({ type: 'increment', value: 2 });
// logs 5
```
For more dynamic assignments, the argument passed to assign(...) may also be a function that returns the partial or full context value:
```tsx
import { setup } from 'xstate';

const countMachine = setup({
  types: {
    events: {} as { type: 'increment'; value: number },
  },
}).createMachine({
  context: {
    count: 0,
  },
  on: {
    increment: {
      actions: assign(({ context, event }) => {
        return {
          count: context.count + event.value,
        };
      }),
    },
  },
});
```
Do not mutate the context object. Instead, you should use the assign(...) action to update context immutably. If you mutate the context object, you may get unexpected behavior, such as mutating the context of other actors.

You can create state machines with the assign(...) action in our drag-and-drop Stately editor. Read more about built-in assign action in Stately’s editor.

Raise action
The raise action is a special action that raises an event that is received by the same machine. Raising an event is how a machine can “send” an event to itself:
```tsx
import { createMachine, raise } from 'xstate';

const machine = createMachine({
  // ...
  entry: raise({ type: 'someEvent', data: 'someData' });
});
```
Internally, when an event is raised, it is placed into an “internal event queue”. After the current transition is finished, these events are processed in insertion order (first-in first-out, or FIFO). External events are only processed once all events in the internal event queue are processed.

Raised events can be dynamic:
```tsx
import { createMachine, raise } from 'xstate';

const machine = createMachine({
  // ...
  entry: raise(({ context, event }) => ({
    type: 'dynamicEvent',
    data: context.someValue,
  })),
});
```
Events can also be raised with a delay, which will not place them in the internal event queue, since they will not be immediately processed:
```tsx
import { createMachine, raise } from 'xstate';

const machine = createMachine({
  // ...
  entry: raise(
    { type: 'someEvent' },
    { delay: 1000 }
  );
});
```
You can create state machines with the raise(...) action in our drag-and-drop Stately editor. Read more about the built-in raise action in Stately’s editor.
``
Send-to action
The sendTo(...) action is a special action that sends an event to a specific actor.
```tsx
const machine = createMachine({
  on: {
    transmit: {
      actions: sendTo('someActor', { type: 'someEvent' }),
    },
  },
});
```
The event can be dynamic:
```tsx
const machine = createMachine({
  on: {
    transmit: {
      actions: sendTo('someActor', ({ context, event }) => {
        return { type: 'someEvent', data: context.someData };
      }),
    },
  },
});
```
The destination actor can be the actor ID or the actor reference itself:
```tsx
const machine = createMachine({
  context: ({ spawn }) => ({
    someActorRef: spawn(fromPromise(/* ... */)),
  }),
  on: {
    transmit: {
      actions: sendTo(({ context }) => context.someActorRef, {
        type: 'someEvent',
      }),
    },
  },
});
```
Other options, such as delay and id, can be passed as the 3rd argument:
```tsx
const machine = createMachine({
  on: {
    transmit: {
      actions: sendTo(
        'someActor',
        { type: 'someEvent' },
        {
          id: 'transmission',
          delay: 1000,
        },
      ),
    },
  },
});
```
Delayed actions can be cancelled by their id. See cancel(...).

You can create state machines with the sendTo(...) action in our drag-and-drop Stately editor. Read more about the built-in sendTo action in Stately’s editor.

Send-parent action
The sendParent(...) action is a special action that sends an event to the parent actor, if it exists.

It is recommended to use sendTo(...) by to pass actor refs (e.g. the parent actor ref) to other actors via input or events and storing those actor refs in context rather than using sendParent(...). This avoids tight coupling between actors and can be more type-safe.

Example using input:
Example using input (TypeScript):
Enqueue actions
```tsx
The enqueueActions(...) action creator is a higher-level action that enqueues actions to be executed sequentially, without actually executing any of the actions. It takes a callback that receives the context, event as well as enqueue and check functions:

The enqueue(...) function is used to enqueue an action. It takes an action object or action function:

actions: enqueueActions(({ enqueue }) => {
  // Enqueue an action object
  enqueue({ type: 'greet', params: { message: 'hi' } });

  // Enqueue an action function
  enqueue(() => console.log('Hello'));

  // Enqueue a simple action with no params
  enqueue('doSomething');
});
```
The check(...) function is used to conditionally enqueue an action. It takes a guard object or a guard function and returns a boolean that represents whether the guard evaluates to true:
```tsx
actions: enqueueActions(({ enqueue, check }) => {
  if (check({ type: 'everythingLooksGood' })) {
    enqueue('doSomething');
  }
});
```
There are also helper methods on enqueue for enqueueing built-in actions:
```tsx
enqueue.assign(...): Enqueues an assign(...) action
enqueue.sendTo(...): Enqueues a sendTo(...) action
enqueue.raise(...): Enqueues a raise(...) action
enqueue.spawnChild(...): Enqueues a spawnChild(...) action
enqueue.stopChild(...): Enqueues a stopChild(...) action
enqueue.cancel(...): Enqueues a cancel(...) action
// Enqueued actions can be called conditionally, but they cannot be enqueued asynchronously.
```tsx
const machine = createMachine({
  // ...
  entry: enqueueActions(({ context, event, enqueue, check }) => {
    // assign action
    enqueue.assign({
      count: context.count + 1,
    });

    // Conditional actions (replaces choose(...))
    if (event.someOption) {
      enqueue.sendTo('someActor', { type: 'blah', thing: context.thing });

      // other actions
      enqueue('namedAction');
      // with params
      enqueue({ type: 'greet', params: { message: 'hello' } });
    } else {
      // inline
      enqueue(() => console.log('hello'));

      // even built-in actions
    }

    // Use check(...) to conditionally enqueue actions based on a guard
    if (check({ type: 'someGuard' })) {
      // ...
    }

    // no return
  }),
});

```
You can use parameters with referenced enqueue actions:
```tsx
import { setup, enqueueActions } from 'xstate';

const machine = setup({
  actions: {
    doThings: enqueueActions(({ enqueue }, params: { name: string }) => {
      enqueue({ type: 'greet', params: { name } });
      // ...
    }),
    greet: (_, params: { name: string }) => {
      console.log(`Hello ${params.name}!`);
    },
  },
}).createMachine({
  // ...
  entry: {
    type: 'doThings',
    params: { name: 'World' },
  },
});


// Log action
The log(...) action is an easy way to log messages to the console.

import { createMachine, log } from 'xstate';

const machine = createMachine({
  on: {
    someEvent: {
      actions: log('some message'),
    },
  },
});

// You can create state machines with the log(...) action in our drag-and-drop Stately editor. Read more about the built-in log action in Stately’s editor.

// Cancel action
// The cancel(...) action cancels a delayed sendTo(...) or raise(...) action by their IDs:
```tsx
import { createMachine, sendTo, cancel } from 'xstate';

const machine = createMachine({
  on: {
    event: {
      actions: sendTo(
        'someActor',
        { type: 'someEvent' },
        {
          id: 'someId',
          delay: 1000,
        },
      ),
    },
    cancelEvent: {
      actions: cancel('someId'),
    },
  },
});
```
Stop child action
The stopChild(...) action stops a child actor. Actors can only be stopped from their parent actor:
```tsx
import { createMachine, stopChild } from 'xstate';

const machine = createMachine({
  context: ({ spawn }) => ({
    spawnedRef: spawn(fromPromise(/* ... */), { id: 'spawnedId' }),
  }),
  on: {
    stopById: {
      actions: stopChild('spawnedId'),
    },
    stopByRef: {
      actions: stopChild(({ context }) => context.spawnedRef),
    },
  },
});
```
Modeling
If you only need to execute actions in response to events, you can create a self-transition that only has actions: [ ... ] defined. For example, a machine that only needs to assign to context in transitions may look like this:
```tsx
import { createMachine } from 'xstate';

const countMachine = createMachine({
  context: {
    count: 0,
  },
  on: {
    increment: {
      actions: assign({
        count: ({ context, event }) => context.count + event.value,
      }),
    },
    decrement: {
      actions: assign({
        count: ({ context, event }) => context.count - event.value,
      }),
    },
  },
});
```
Shorthands
For simple actions, you can specify an action string instead of an action object. Though we prefer using objects for consistency.
```tsx
import { createMachine } from 'xstate';

const feedbackMachine = createMachine({
  // ...
  states: {
    // ...
    question: {
      on: {
        'feedback.good': {
          actions: ['track'],
        },
      },
    },
  },
});
```
Actions and TypeScript
XState v5 requires TypeScript version 5.0 or greater.

For best results, use the latest TypeScript version. Read more about XState and TypeScript

To strongly setup action types, use the setup({ ... }) function and place the action implementations in the actions: { ... } object. The key is the action type and the value is the action function implementation.

You should also strongly type the parameters of the action function, which are passed as the second argument to the action function.
```tsx
import { setup } from 'xstate';

const machine = setup({
  actions: {
    track: (_, params: { response: string }) => {
      // ...
    },
    increment: (_, params: { value: number }) => {
      // ...
    },
  },
}).createMachine({
  // ...
  entry: [
    { type: 'track', params: { response: 'good' } },
    { type: 'increment', params: { value: 1 } },
  ],
});
```
If you are not using setup({ ... }) (strongly recommended), you can strongly type the actions of your machine in the types.actions property of the machine config.
```tsx
const machine = createMachine({
  types: {} as {
    actions:
      | {
          type: 'track';
          params: {
            response: string;
          };
        }
      | { type: 'increment'; params: { value: number } };
  },
  // ...
  entry: [
    { type: 'track', params: { response: 'good' } },
    { type: 'increment', params: { value: 1 } },
  ],
});
```
Actions cheatsheet
Cheatsheet: entry and exit actions
```tsx
import { createMachine } from 'xstate';

const machine = createMachine({
  // Entry action on root
  entry: [{ type: 'entryAction' }],
  exit: [{ type: 'exitAction' }],
  initial: 'start',
  states: {
    start: {
      entry: [{ type: 'startEntryAction' }],
      exit: [{ type: 'startExitAction' }],
    },
  },
});
```
Cheatsheet: transition actions
```tsx
import { createMachine } from 'xstate';

const machine = createMachine({
  on: {
    someEvent: {
      actions: [
        { type: 'doSomething' },
        { type: 'doSomethingElse' },
      ],
    },
  },
});
```
Cheatsheet: inline action functions
```tsx
import { createMachine } from 'xstate';

const machine = createMachine({
  on: {
    someEvent: {
      actions: [
        ({ context, event }) => {
          console.log(context, event);
        },
      ],
    },
  },
});
```
Cheatsheet: setting up actions
```tsx
import { setup } from 'xstate';

const someAction = () => {
  //...
};

const machine = setup({
  actions: {
    someAction,
  },
}).createMachine({
  entry: [
    { type: 'someAction' },
  ],
  // ...
});
```
Cheatsheet: providing actions
```tsx
import { setup } from 'xstate';

const someAction = () => {
  //...
};

const machine = setup({
  actions: {
    someAction,
  },
}).createMachine({
  // ...
});

const modifiedMachine = machine.provide({
  someAction: () => {
    // Overridden action implementation
  },
});
```
Cheatsheet: assign action
With property assigners
```tsx
import { createMachine } from 'xstate';

const countMachine = createMachine({
  context: {
    count: 0,
  },
  on: {
    increment: {
      actions: assign({
        count: ({ context, event }) => {
          return context.count + event.value;
        },
      }),
    },
  },
});
```
With function assigners
```tsx
import { createMachine } from 'xstate';

const countMachine = createMachine({
  context: {
    count: 0,
  },
  on: {
    increment: {
      actions: assign(({ context, event }) => {
        return {
          count: context.count + event.value,
        };
      }),
    },
  },
});
```
Cheatsheet: raise action
```tsx
import { createMachine, raise } from 'xstate';

const machine = createMachine({
  on: {
    someEvent: {
      actions: raise({ type: 'anotherEvent' }),
    },
  },
});

Cheatsheet: send-to action
const machine = createMachine({
  on: {
    transmit: {
      actions: sendTo('someActor', { type: 'someEvent' }),
    },
  },
});
```
Cheatsheet: enqueue actions
```tsx
import { createMachine, enqueueActions } from 'xstate';
const machine = createMachine({
  entry: enqueueActions(({ enqueue, check }) => {
    enqueue({ type: 'someAction' });

    if (check({ type: 'someGuard' })) {
      enqueue({ type: 'anotherAction' });
    }

    enqueue.assign({
      count: 0,
    });

    enqueue.sendTo('someActor', { type: 'someEvent' });

    enqueue.raise({ type: 'anEvent' });
  }),
});
```
