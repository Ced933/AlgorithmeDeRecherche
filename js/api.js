class Api {
    constructor(url) {
        this._url = url
    }
    async getApi() {
        return fetch(this._url)
            .then((res) => res.json())
            .then(data => data)
            .catch(err => console.log('error', err))
    }
}