import {customAlphabet, urlAlphabet} from "nanoid";

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

export {
    validateURL,
    idIsUnique,
    idGenerator,
    issaNumber,
}