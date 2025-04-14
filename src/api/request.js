const backend = 'http://localhost:7070'

//logs the users in
export async function loginUser (email, password) {
    console.log(email + " " + password)
    const response = await request(`/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })

    return response.data
}

//register the user
export async function registerUser (email, password) {
    console.log(email + " " + password)
    const response = await request(`/register`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })

    return response.data
}

// Generische Request-Funktion.
async function request (url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }

    const response = await fetch(backend + url, { headers, ...options })

    if (response.ok) {
        return response.json()
    } else if (response.status === 422) {
        const data = await response.json()

        throw new ValidationError('validation failed', data.errors)
    } else {
        throw new Error(`Server error: ${await response.text()}`)
    }
}


class ValidationError {
    message
    errors

    constructor (message, errors) {
        this.message = message
        this.errors = errors
    }
}