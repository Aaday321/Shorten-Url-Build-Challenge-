import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

/*
TODO:
 1) Shorten url 
 2) Track clicks
 3) Referrers
 4) Geographic data
 */
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get()

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
