export default class HttpHelper {
    private header = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
    })

    constructor() {
        const storage = window.localStorage
        if (storage.getItem('journali-token')) {
            this.header.append(
                'Authorization',
                'Bearer ' + storage.getItem('journali-token'),
            )
        }
    }

    async auth(data: object): Promise<Response> {
        //Send request
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(data),
        })

        const responseClone = response.clone()

        // console.log(response)
        // put token in localStorage
        const responseObject = await response.json()
        console.log(responseObject.token)
        const storage = window.localStorage
        storage.setItem('journali-token', responseObject.token)

        this.header.append('Authorization', 'Bearer ' + responseObject.token)

        return responseClone
    }

    post(url: string, data: object): Promise<Response> {
        return fetch('/api/' + url, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(data),
        })
    }
}
