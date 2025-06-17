import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();
console.log('first');
console.log('second');
console.log('third');
app.get('/', (c) => {
    return c.text('Hello 3rcd.com!');
});

const port = 8080;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
