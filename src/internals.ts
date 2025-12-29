import {customAlphabet, urlAlphabet} from "nanoid"
import { type HonoRequest } from "hono"
const DEFAULT_ID_LENGTH = 10


function validateURL(url: string){
    // Thanks, GPT for this regex 🥴. Can anyone tell me how to read this pls?
    const allowed = /^[A-Za-z0-9\-._~:/?#\[\]@!$&'()*+,;=%]+$/
    return allowed.test(url)
}

function idIsUnique (url: string){
    //Will add db logic later
    let db = {find:(s:string)=>!!s && false}
    const match = db.find(url)
    return !match
}

function issaNumber(hopefullyANumber: unknown) {
    return !isNaN(Number(hopefullyANumber))
}

function idGenerator(size: unknown){
    const urlLength = issaNumber(size) ? Number(size) : DEFAULT_ID_LENGTH
    let newId = customAlphabet(urlAlphabet, urlLength)()
    while(!idIsUnique(newId)){
        newId = customAlphabet(urlAlphabet, urlLength)()
    }
    return newId
}

function makeBaseUrlFromRequestContext(requestContext: HonoRequest) {
    const proto = requestContext.header('x-forwarded-proto') ?? 'http'
    const host = requestContext.header('host')
    return `${proto}://${host}`
}

export {
    validateURL,
    idGenerator,
    makeBaseUrlFromRequestContext,
}