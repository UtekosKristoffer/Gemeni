# Note: This file contains original examples from Tanstack Query v5 that are specific to next.js - our framework.

In this simple example, we integrate React-Query seamlessly with Next.js data fetching methods to fetch queries in the server and hydrate them in the browser.

In addition to fetching and mutating data, React-Query analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run.

## Full useQuery example in Next JS

### The Hook

```typescript
//Path: src/hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query'

type Post = {
  id: number
  title: string
  body: string
}

const fetchPosts = async (limit = 10): Promise<Array<Post>> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  return data.filter((x: Post) => x.id <= limit)
}

const usePosts = (limit: number) => {
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: () => fetchPosts(limit)
  })
}

export { usePosts, fetchPosts }
```

### In the component

```tsx
//Path src/components/PostList.tsx
import React, { useState } from 'react'
import { usePosts } from '../hooks/usePosts'

export const PostList = () => {
  const [postCount, setPostCount] = useState(10)
  const { data, isPending, isFetching } = usePosts(postCount)

  if (isPending) return <div>Loading</div>

  return (
    <section>
      <ul>
        {data?.map((post, index) => (
          <li key={post.id}>
            {index + 1}. {post.title}
          </li>
        ))}
      </ul>
      {postCount <= 90 && (
        <button onClick={() => setPostCount(postCount + 10)} disabled={isFetching}>
          {isFetching ? 'Loading...' : 'Show More'}
        </button>
      )}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}
```

### On app.tsx

```tsx
//Path: src/pages/_app.tsx
import React from 'react'
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
```

### On the page

```tsx
//Path: src/pages/client-only.tsx
import React from 'react'
import { Header, InfoBox, Layout, PostList } from '../components'

const ClientOnly = () => {
  return (
    <Layout>
      <Header />
      <InfoBox>ℹ️ This data is loaded on client and not prefetched</InfoBox>
      <PostList />
    </Layout>
  )
}

export default ClientOnly
```
