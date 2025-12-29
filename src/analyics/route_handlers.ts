import {idGenerator, makeBaseUrlFromRequestContext, validateURL} from "./utils.js";
import type {Context} from "hono";

export default class RouteHandlers {
    static async makeShorty(context: Context) {
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
    }

    static async getShorty(context: Context) {
        //TODO: Implement get url feature
        //TODO: Implement analytics update and storage
    }

    static async getAnalytics(context: Context) {
        //TODO: Implement analytics retrieval
    }
}