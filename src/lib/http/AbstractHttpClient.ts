import store from '@/store'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type RequestBody = string | Blob | Record<string, any> | null

export default abstract class AbstractHttpClient {
    protected async request<T extends Record<string, any>>(
        method: HttpMethod,
        route: string,
        requestBody: RequestBody,
        extraOptions: object = {},
    ): Promise<T> {
        const headers = this.createHeaders(extraOptions)
        const body =
            method === 'GET' ? undefined : this.prepareBody(requestBody)

        return fetch(route, { method, headers, body }).then((response) =>
            response.json(),
        )
    }

    protected async post<T>(route: string, data: RequestBody) {
        return this.request<T>('POST', route, data)
    }

    protected async get<T>(route: string, extraOptions: object = {}) {
        return this.request<T>('GET', route, null, extraOptions)
    }

    private prepareBody = (body: RequestBody): string | Blob => {
        if (body instanceof Blob) {
            return body
        }
        if (typeof body === 'string') {
            return body
        }
        return JSON.stringify(body)
    }

    private createHeaders = (extraOptions: object) => {
        const headers = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...extraOptions,
        })

        if (store.state.user) {
            headers.append('Authorization', `Bearer ${store.state.user}`)
        }
        return headers
    }
}
