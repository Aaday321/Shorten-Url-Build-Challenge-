import { serve } from '@hono/node-server'
import {type Context, Hono} from 'hono'
import {idGenerator, makeBaseUrlFromRequestContext, validateURL} from "./internals.js";

const app = new Hono()

/*
TODO:
 1) Shorten url -- DONE
 2) Retrieve url
 2) Track usage
 3) Track Referrers
 4) Track Geographic data
*/

app.get('/shorty', async (context) => {
    const { url, customPath, length } = await context.req.parseBody()

    const id = idGenerator(length)

    if(customPath) {
       if (typeof customPath !== 'string' || !validateURL(url as string)) {
           throw new Error('Invalid URL parameter')
       }
    }

    const baseUrl = makeBaseUrlFromRequestContext(context.req)
    const shorty = `${baseUrl}/${id}`

   return context.text(shorty)
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
