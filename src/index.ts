import { serve } from '@hono/node-server'
import {Context, Hono} from 'hono'

const app = new Hono()

/*
TODO:
 1) Shorten url 
 2) Track clicks
 3) Referrers
 4) Geographic data
 */
app.get('/shorty', async (c) => {
    const {
        url,
        customPath,
    } = await c.req.parseBody()

    
    return c.json({
      newUrl
  })
})

app.get('/:id', (context: Context) => {
    const { id } = context.req.param()
    const url
})

app.get()

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
