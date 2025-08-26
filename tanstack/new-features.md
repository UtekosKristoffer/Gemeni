# New Features 🚀

## Simplified optimistic updates

- We have a new, simplified way to perform optimistic updates by leveraging the returned variables from useMutation:

  ```typescript
  const queryInfo = useTodos()
  const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  if (queryInfo.data) {
  return (
  <ul>
      {queryInfo.data.items.map((todo) => (
      <li key={todo.id}>{todo.text}</li>
      ))}
      {addTodoMutation.isPending && (
      <li key={String(addTodoMutation.submittedAt)} style={{ opacity: 0.5 }}>
          {addTodoMutation.variables}
      </li>
      )}
  </ul>
  )
  }
  ```

  Here, we are only changing how the UI looks when the mutation is running instead of writing data directly to the cache. This works best if we only have one place where we need to show the optimistic update.

- Infinite Queries can prefetch multiple pages
  Infinite Queries can be prefetched like regular Queries. Per default, only the first page of the Query will be prefetched and will be stored under the given QueryKey. If you want to prefetch more than one page, you can use the pages option. Read the prefetching guide for more information.

## Combine

    If you want to combine data (or other Query information) from the results into a single value, you can use the combine option. The result will be structurally shared to be as referentially stable as possible.

        ```tsx
        const ids = [1, 2, 3]
        const combinedQueries = useQueries({
        queries: ids.map(id => ({
            queryKey: ['post', id],
            queryFn: () => fetchPost(id)
        })),
        combine: results => {
            return {
            data: results.map(result => result.data),
            pending: results.some(result => result.isPending)
            }
        }
        })
        ```

        In the above example, combinedQueries will be an object with a data and a pending property. Note that all other properties of the Query results will be lost.

        Memoization
        The combine function will only re-run if:

        the combine function itself changed referentially
        any of the query results changed
        This means that an inlined combine function, as shown above, will run on every render. To avoid this, you can wrap the combine function in useCallback, or extract it to a stable function reference if it doesn't have any dependencies.

## New hooks for suspense | Visit file `.github/tanstack-query-v5/hooks/copilot-tanstack-query-v5-hooks.md`

With v5, suspense for data fetching finally becomes "stable". We've added dedicated useSuspenseQuery, useSuspenseInfiniteQuery and useSuspenseQueries hooks. With these hooks, data will never be potentially undefined on type level:

    ```javascript
        const { data: post } = useSuspenseQuery({

        // ^? const post: Post
        queryKey: ['post', postId],
        queryFn: () => fetchPost(postId),
        })
    ```

See file `.github/tanstack-query-v5/hooks/examples/copilot-tanstack-suspense-streaming-examples.md` for details regarding ## New hooks for suspense
