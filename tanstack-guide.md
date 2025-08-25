---
applyTo: 'src/**/*.{ts,tsx}'
---

# Tanstack Query v5

## Breaking Changes

- v5 is a major version, so there are some breaking changes to be aware of:
  Supports a single signature, one object:
  useQuery and friends used to have many overloads in TypeScript: different ways how the function could be invoked. Not only was this tough to maintain, type wise, it also required a runtime check to see which types the first and the second parameter were, to correctly create options.
  Now they only support the object format.

- queryClient.getQueryData now accepts queryKey only as an Argument
  queryClient.getQueryData argument is changed to accept only a queryKey

  ```tsx
  //before
  queryClient.getQueryData(queryKey, filters)
  //now
  queryClient.getQueryData(queryKey)
  ```

- queryClient.getQueryState now accepts queryKey only as an Argument
  queryClient.getQueryState argument is changed to accept only a queryKey

  ```tsx
  //before
  queryClient.getQueryState(queryKey, filters)
  //now
  queryClient.getQueryState(queryKey)
  ```

- Callbacks on useQuery (and QueryObserver) have been removed
  onSuccess, onError and onSettled have been removed from Queries. They haven't been touched for Mutations. Please see this RFC for motivations behind this change and what to do instead

  The refetchInterval callback function only gets query passed
  This streamlines how callbacks are invoked (the refetchOnWindowFocus, refetchOnMount and refetchOnReconnect callbacks all only get the query passed as well), and it fixes some typing issues when callbacks get data transformed by select.

  ```tsx
  //before
  refetchInterval: number | false | ((data: TData | undefined, query: Query) => number | false | undefined)
  //now
  refetchInterval: number | false | ((query: Query) => number | false | undefined)
  ```

  You can still access data with query.state.data, however, it will not be data that has been transformed by select. If you need to access the transformed data, you can call the transformation again on query.state.data.

- The remove method has been removed from useQuery
  Previously, remove method used to remove the query from the queryCache without informing observers about it. It was best used to remove data imperatively that is no longer needed, e.g. when logging a user out.

  But It doesn't make much sense to do this while a query is still active, because it will just trigger a hard loading state with the next re-render.
  if you still need to remove a query, you can use queryClient.removeQueries({queryKey: key})

  ```tsx
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey, queryFn })
  //before
  query.remove()
  //now
  queryClient.removeQueries({ queryKey })
  ```

  so:
  NOT: query.remove()
  USE: queryClient.removeQueries({ queryKey })

- The isDataEqual option has been removed from useQuery
  Previously, This function was used to indicate whether to use previous data (true) or new data (false) as a resolved data for the query.

  You can achieve the same functionality by passing a function to structuralSharing instead:

  ```tsx
  import { replaceEqualDeep } from '@tanstack/react-query'
  - isDataEqual: (oldData, newData) => customCheck(oldData, newData)
  + structuralSharing: (oldData, newData) => customCheck(oldData, newData) ? oldData : replaceEqualDeep(oldData, newData)
  ```

- Rename cacheTime to gcTime
  Almost everyone gets cacheTime wrong. It sounds like "the amount of time that data is cached for", but that is not correct.

  cacheTime does nothing as long as a query is still in use. It only kicks in as soon as the query becomes unused. After the time has passed, data will be "garbage collected" to avoid the cache from growing.

  gc is referring to "garbage collect" time. It's a bit more technical, but also a quite well known abbreviation in computer science.

  ```tsx
    const MINUTE = 1000 * 60;

    const queryClient = new QueryClient({
    defaultOptions: {
    queries: {
    -      cacheTime: 10 * MINUTE,
    +      gcTime: 10 * MINUTE,
    },
  },
  })
  ```

- The useErrorBoundary option has been renamed to throwOnError
  To make the useErrorBoundary option more framework-agnostic and avoid confusion with the established React function prefix "use" for hooks and the "ErrorBoundary" component name, it has been renamed to throwOnError to more accurately reflect its functionality.

  TypeScript: Error is now the default type for errors instead of unknown
  Even though in JavaScript, you can throw anything (which makes unknown the most correct type), almost always, Errors (or subclasses of Error) are thrown. This change makes it easier to work with the error field in TypeScript for most cases.

  If you want to throw something that isn't an Error, you'll now have to set the generic for yourself:

  ```typescript
  useQuery<number, string>({
    queryKey: ['some-query'],
    queryFn: async () => {
      if (Math.random() > 0.5) {
        throw 'some error'
      }
      return 42
    }
  })
  ```

- New dehydrate API
  The options you can pass to dehydrate have been simplified. Queries and Mutations are always dehydrated (according to the default function implementation). To change this behaviour, instead of using the removed boolean options dehydrateMutations and dehydrateQueries you can implement the function equivalents shouldDehydrateQuery or shouldDehydrateMutation instead. To get the old behaviour of not hydrating queries/mutations at all, pass in () => false.

  ```tsx
  - dehydrateMutations?: boolean
  - dehydrateQueries?: boolean
  ```

- Infinite queries now need a initialPageParam
  Previously, we've passed undefined to the queryFn as pageParam, and you could assign a default value to the pageParam parameter in the queryFn function signature. This had the drawback of storing undefined in the queryCache, which is not serializable.

  Instead, you now have to pass an explicit initialPageParam to the infinite query options. This will be used as the pageParam for the first page:

  ```tsx
      useInfiniteQuery({
      queryKey,
      -  queryFn: ({ pageParam = 0 }) => fetchSomething(pageParam),
      +  queryFn: ({ pageParam }) => fetchSomething(pageParam),
      +  initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.next,
      })
  ```

- No retries on the server
  On the server, retry now defaults to 0 instead of 3. For prefetching, we have always defaulted to 0 retries, but since queries that have suspense enabled can now execute directly on the server as well (since React18), we have to make sure that we don't retry on the server at all.

- status: loading has been changed to status: pending and isLoading has been changed to isPending and isInitialLoading has now been renamed to isLoading

- The loading status has been renamed to pending, and similarly the derived isLoading flag has been renamed to isPending.

- For mutations as well the status has been changed from loading to pending and the isLoading flag has been changed to isPending.

- Lastly, a new derived isLoading flag has been added to the queries that is implemented as isPending && isFetching. This means that isLoading and isInitialLoading have the same thing, but isInitialLoading is deprecated now and will be removed in the next major version.

## Hydration API changes

To better support concurrent features and transitions we've made some changes to the hydration APIs. The Hydrate component has been renamed to HydrationBoundary and the useHydrate hook has been removed.

The HydrationBoundary no longer hydrates mutations, only queries. To hydrate mutations, use the low level hydrate API or the persistQueryClient plugin.

Finally, as a technical detail, the timing for when queries are hydrated have changed slightly. New queries are still hydrated in the render phase so that SSR works as usual, but any queries that already exist in the cache are now hydrated in an effect instead (as long as their data is fresher than what is in the cache). If you are hydrating just once at the start of your application as is common, this wont affect you, but if you are using Server Components and pass down fresh data for hydration on a page navigation, you might notice a flash of the old data before the page immediately rerenders.

This last change is technically a breaking one, and was made so we don't prematurely update content on the existing page before a page transition has been fully committed. No action is required on your part.

```tsx
- import { Hydrate } from '@tanstack/react-query'
+ import { HydrationBoundary } from '@tanstack/react-query'


- <Hydrate state={dehydratedState}>
+ <HydrationBoundary state={dehydratedState}>
  <App />
- </Hydrate>
+ </HydrationBoundary>
```

- Query defaults changes
  queryClient.getQueryDefaults will now merge together all matching registrations instead of returning only the first matching registration.

  As a result, calls to queryClient.setQueryDefaults should now be ordered with increasing specificity. That is, registrations should be made from the most generic key to the least generic one.

  For example:

  ```typescript
  //now
  + queryClient.setQueryDefaults(['todo'], {
  +   retry: false,
  +   staleTime: 60_000,
    + })
  queryClient.setQueryDefaults(['todo', 'detail'], {

  + retry: true,
    retryDelay: 1_000,
    staleTime: 10_000,
    })

   //before
  - queryClient.setQueryDefaults(['todo'], {
  - retry: false,
    - staleTime: 60_000,
    - })
  ```

  - Note that in this specific example, retry: true was added to the ['todo', 'detail'] registration to counteract it now inheriting retry: false from the more general registration. The specific changes needed to maintain exact behavior will vary depending on your defaults.
