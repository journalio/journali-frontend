export default class HttpHelper {
    post(url: string, data: object): Promise<Response> {
        return fetch('api/' + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }
}
