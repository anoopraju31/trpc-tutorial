# tRPC (TypeScript Remote Procedure Call)

**tRPC** is a library that enables you to create end-to-end typesafe APIs for your TypeScript applications. It provides a simple and efficient way to define and use APIs without the need for a traditional REST or GraphQL setup. Here are some key features and concepts of tRPC:

## Key Features

1. **Type Safety**: Ensures types are shared and enforced both on the client and server side.
2. **Ease of Use**: Simplifies the process of creating and consuming APIs without boilerplate code.
3. **Flexibility**: Compatible with various backend and frontend frameworks.
4. **No Code Generation**: No need for code generation steps, making the development process faster.

## Core Concepts

- **Router**: A collection of procedures (endpoints) that your application exposes.
- **Procedure**: A function handling a specific operation (query or mutation).
- **Middleware**: Runs code before or after procedures for tasks like authentication or logging.
- **Client**: Calls the procedures defined on the server, ensuring type safety.

## Example Usage

### Server Side

1. Install tRPC server packages:

   ```bash
   npm install @trpc/server zod
   ```
2. Define your API router:
   
   ```typescript
   import { initTRPC } from '@trpc/server';
   import { z } from 'zod';
  
   const t = initTRPC.create();
  
   const appRouter = t.router({
     getUser: t.procedure
       .input(z.object({ id: z.string() }))
       .query(async ({ input }) => {
         // Your logic to fetch the user
         return { id: input.id, name: 'John Doe' };
       }),
   });
  
   export type AppRouter = typeof appRouter;
   ```
   
3. Create an HTTP server to handle the requests:
   
    ```typescript
    import express from 'express';
    import { createExpressMiddleware } from '@trpc/server/adapters/express';
    import { appRouter } from './router';
    
    const app = express();
    app.use('/trpc', createExpressMiddleware({ router: appRouter }));
    
    app.listen(4000, () => {
      console.log('Server is running on http://localhost:4000');
    });
    ```

### Client Side
1. Install tRPC client packages:

   ```bash
   npm install @trpc/server zod
   ```
2. Create a client to call the API:

   ```typescript
     import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
     import type { AppRouter } from './server';
  
    const trpc = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc',
        }),
      ],
    });
  
    async function fetchUser() {
      const user = await trpc.getUser.query({ id: '123' });
      console.log(user);
    }
    
    fetchUser();
   ```
   
