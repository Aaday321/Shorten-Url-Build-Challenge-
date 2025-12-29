import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import RouteHandlers from "./analyics/route_handlers.js";

const app = new Hono()

/*
TODO:
 1) Shorten url -- DONE
 2) Retrieve url
 3) Track usage
 4) Track Referrers
 5) Track Geographic data
*/

app.post('/shorty', RouteHandlers.makeShorty)

app.get('/:id', RouteHandlers.getShorty)

app.get('/analytics/:id', RouteHandlers.getAnalytics)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
