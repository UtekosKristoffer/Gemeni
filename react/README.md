#  This folder contains carefully selected documentation from React - version 19, sorted into separate files.

## For understanding the React Compiler - visit the folder react-compiler and read its files.

### react-dom@19.1 - is what this project are depending on, with Next.js version 15.5

## Important updates are as follows:

## Key Features and Hooks

## Visit the folder named hooks

### The 

1. useActionState

useActionState is a Hook that allows you to update state based on the result of a form action.

useActionState(action, initialState, permalink?) 

const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);

SEE FILE hooks/useActionState.md

2. use

Special Hook ! use is a React API that lets you read the value of a resource like a Promise or context.

use(resource)

const value = use(resource);

SEE FILE hooks/use.md

3. useDeferredValue

useDeferredValue is a React Hook that lets you defer updating a part of the UI.

const deferredValue = useDeferredValue(value)

SEE FILE hooks/useDeferredValue.md

4. useState

useState is a React Hook that lets you add a state variable to your component.

const [state, setState] = useState(initialState)

SEE FILE hooks/useState.md

5. useFormStatus

useFormStatus is a Hook that gives you status information of the last form submission.

useFormStatus()

const { pending, data, method, action } = useFormStatus();

SEE FILE hooks/useFormStatus.md

6. useId

useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.

const id = useId()

SEE FILE hooks/useId.md

7. useReducer

useReducer is a React Hook that lets you add a reducer to your component.

useRef(initialValue) 

const [state, dispatch] = useReducer(reducer, initialArg, init?)

SEE FILE hooks/useReducer.md

8. useRef 

useRef is a React Hook that lets you reference a value that’s not needed for rendering.

SEE FILE hooks/useRef.md

## Server Functions

Server Functions allow Client Components to call async functions executed on the server.

SEE FILE server-functions.md

## Server Components

Server Components are a new type of Component that renders ahead of time, before bundling, in an environment separate from your client app or SSR server.

This separate environment is the “server” in React Server Components. Server Components can run once at build time on your CI server, or they can be run for each request using a web server.

SEE FILE server-components.md

## Clients Components

SEE file use-client.md


## "use server

#### React Server Components
'use server' is for use with using React Server Components.

'use server' marks server-side functions that can be called from client-side code.

SEE FILE use-server.md

## "use client"

#### React Server Components

'use client' is for use with React Server Components.

'use client' lets you mark what code runs on the client.

SEE FILE use-client.md


## Other files in this folder is also important and must be read and understood in relevant use cases

