import { serve } from '@hono/node-server'
import {type Context, Hono} from 'hono'
import {customAlphabet, urlAlphabet} from "nanoid";

const app = new Hono()
const DEFAULT_ID_LENGTH = 10

/*
TODO:
 1) Shorten url 
 2) Track clicks
 3) Referrers
 4) Geographic data
 */

function validateURL(url: string){
    // Thanks GPT for this regex 🥴. Someone tell me how to read this pls.
    const allowed = /^[A-Za-z0-9\-._~:/?#\[\]@!$&'()*+,;=%]+$/
    return allowed.test(url)
}

function idIsUnique (url: string){
    let db = {find:(s:string)=>s}
    const match = db.find(url)
    return !match
}

function issaNumber(hopefullyANumber: unknown) {
    return !isNaN(Number(hopefullyANumber))
}
function idGenerator(size: number){
    return ()=>customAlphabet(urlAlphabet)(size)
}

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
