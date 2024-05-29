const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'

export const paypal = {}

async function generateAccessToken() {
    const {PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET} = process.env
    //auth is base64 hashed
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET).toString('base64')
    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: 'post',
        body: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${auth}`,
        }
    })

    const jsonData = await handleResponse(response)
    return jsonData.access_token
}

async function handleResponse(response: any) {
    if(response.status === 200 || response.status === 201) {
        return response.json()
    }

    const errorMessage = await response.text()
    throw new Error(errorMessage)
}

