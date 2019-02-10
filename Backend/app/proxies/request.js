const Request = require('request');
function postRequest(headers, url, reqBody) {
    return new Promise((resolve, reject) => {
        Request.post(
            {
                headers,
                url,
                body: JSON.stringify(reqBody)
            },
            function (error, res, body) {
                if (!error) {
                    resolve(body)
                } else {
                    reject(error)
                }
            }
        )
    })
}

function postFormRequest(headers, url, reqBody) {
    return new Promise((resolve, reject) => {
        Request.post(
            {
                headers,
                url,
                form: reqBody
            },
            function (error, res, body) {
                if (!error) {
                    resolve(body)
                } else {
                    reject(error)
                }
            }
        )
    })
}

function getRequest(headers, url) {
    return new Promise((resolve, reject) => {
        Request.get(
            {
                headers,
                url
            },
            function (error, res, body) {
                if (!error) {
                    resolve(body)
                } else {
                    reject(error)
                }
            }
        )
    })
}

module.exports = {
    postRequest,
    getRequest,
    postFormRequest
}
