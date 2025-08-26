# QueryClient

- TanStack Query is a game-changer for managing server state in Next.js applications. With its caching, background updates, and error handling, it simplifies data fetching and improves performance.
- The QueryClient is the heart of TanStack Query. It manages the cache and provides the context for your queries.
- Next.js supports Server-Side Rendering (SSR). You can prefetch data on the server and hydrate it on the client using TanStack Query

## Key Concepts

- The first step of any React Query setup is always to create a queryClient and wrap your application in a QueryClientProvider. With Server Components, this looks mostly the same across frameworks

```tsx
// In Next.js, this file would be called: app/providers.tsx
'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
```

```tsx
// In Next.js, this file would be called: app/layout.tsx
import Providers from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

## Prefetching and de/hydrating data

- This is how the Server Component that does the prefetching part can look like:

```tsx
// app/posts/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Posts from './posts'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}
```

- This is how the Client Component can look like

```tsx
// app/posts/posts.tsx
'use client'

export default function Posts() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts()
  })

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix.
  const { data: commentsData } = useQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments
  })

  // ...
}
```

## Set Up the QueryClient

- The QueryClient can be used to interact with a cache:

  ```tsx
  import { QueryClient } from '@tanstack/react-query'
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity
      }
    }
  })

  await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: fetchPosts })
  ```

- Its available methods are:s
  - queryClient.getQueryCache

    ```tsx
    const queryCache = queryClient.getQueryCache()
    ```

    - Returns
      The getQueryCache method returns the query cache this client is connected to.

  - queryClient.getMutationCache

    ```tsx
    const mutationCache = queryClient.getMutationCache()
    ```

    - Returns
      The getMutationCache method returns the mutation cache this client is connected to.

  - queryClient.clear

        ```tsx
        queryClient.clear()
        ```

        The clear method clears all connected caches.

  - queryClient.fetchQuery
    - fetchQuery is an asynchronous method that can be used to fetch and cache a query. It will either resolve with the data or throw with the error. Use the prefetchQuery method if you just want to fetch a query without needing the result.
      If the query exists and the data is not invalidated or older than the given staleTime, then the data
      from the cache will be returned. Otherwise it will try to fetch the latest data.

      ```tsx
      try {
        const data = await queryClient.fetchQuery({ queryKey, queryFn })
      } catch (error) {
        console.log(error)
      }

      //Specify a staleTime to only fetch when the data is older than a certain amount of time:
      try {
        const data = await queryClient.fetchQuery({
          queryKey,
          queryFn,
          staleTime: 10000
        })
      } catch (error) {
        console.log(error)
      }
      ```

      - Returns
        - Promise<TData>

  - queryClient.getQueryData
    - getQueryData is a synchronous function that can be used to get an existing query's cached data. If the query does not exist, undefined will be returned.

    ```tsx
    const data = queryClient.getQueryData(queryKey)
    ```

    - Returns
      data: TQueryFnData | undefined
      The data for the cached query, or undefined if the query does not exist.

  - queryClient.ensureQueryData
    - ensureQueryData is an asynchronous function that can be used to get an existing query's cached data. If the query does not exist, queryClient.fetchQuery will be called and its results returned.

    ```tsx
    const data = await queryClient.ensureQueryData({ queryKey, queryFn })
    ```

    - Options
      - the same options as fetchQuery:
        The options for fetchQuery are exactly the same as those of useQuery, except the following: enabled, refetchInterval, refetchIntervalInBackground, refetchOnWindowFocus, refetchOnReconnect, refetchOnMount, notifyOnChangeProps, throwOnError, select, suspense, placeholderData; which are strictly for useQuery and useInfiniteQuery. You can check the source code for more clarity.

  - Other options:
    queryClient.fetchInfiniteQuery
    queryClient.prefetchQuery
    queryClient.prefetchInfiniteQuery
    queryClient.ensureQueryData
    queryClient.ensureInfiniteQueryData
    queryClient.getQueriesData
    queryClient.setQueryData
    queryClient.getQueryState
    queryClient.setQueriesData
    queryClient.invalidateQueries
    queryClient.refetchQueries
    queryClient.cancelQueries
    queryClient.removeQueries
    queryClient.resetQueries
    queryClient.isFetching
    queryClient.isMutating
    queryClient.getDefaultOptions
    queryClient.setDefaultOptions
    queryClient.getQueryDefaults
    queryClient.setQueryDefaults
    queryClient.getMutationDefaults
    queryClient.setMutationDefaults
    queryClient.resumePausedMutations

## Wrap Your App with the QueryClientProvider

- Use the QueryClientProvider component to connect and provide a QueryClient to your application:

  ```typescript
      import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

      const queryClient = new QueryClient()

      function App() {
      return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
      }
  ```

  - Options
    - client: QueryClient - Required
      the QueryClient instance to provide

  - Fetch Data with useQuery
    - Query Keys
      - Query keys are unique identifiers for your queries. They can be strings or arrays.
        Example: ["posts", 1] for fetching a specific post.

    - Query Functions
      - A query function is an asynchronous function that returns data.

## Common Patterns

1.  Pagination
    Use the useQuery hook with a dynamic query key to handle pagination:

    ```typescript
    const { data } = useQuery({
      queryKey: ['posts', page],
      queryFn: () => fetchPosts(page)
    })
    ```

2.  Infinite Queries
    For infinite loading, use the useInfiniteQuery hook:

    ```typescript
    const { data, fetchNextPage } = useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
      getNextPageParam: (lastPage, allPages) => lastPage.nextPage
    })
    ```
