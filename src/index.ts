import { serve } from '@hono/node-server'
import {type Context, Hono} from 'hono'
import {idGenerator, idIsUnique, issaNumber, validateURL} from "./internals.js";

const app = new Hono()
const DEFAULT_ID_LENGTH = 10

/*
TODO:
 1) Shorten url -- DONE
 2) Retrieve url
 2) Track usage
 3) Track Referrers
 4) Track Geographic data
 */

app.get('/shorty', async (context) => {
    const { url, customPath, customLength } = await context.req.parseBody()

    const urlLength = issaNumber(customLength) ? Number(customLength) : DEFAULT_ID_LENGTH
    const makeId = idGenerator(urlLength)

    if(customPath) {
       if (typeof customPath !== 'string' || !validateURL(url as string)) {
           throw new Error('Invalid URL parameter')
       }
    }
    let newId = makeId()
    while(!idIsUnique(newId)){
       newId = makeId()
   }

    const proto = context.req.header('x-forwarded-proto') ?? 'http'
    const host = context.req.header('host')
    const baseUrl = `${proto}://${host}`
    const shorty = `${baseUrl}${host}/${newId}`

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
