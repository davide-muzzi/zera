const backend = 'http://localhost:7070'

class ValidationError {
    message
    errors

    constructor (message, errors) {
        this.message = message
        this.errors = errors
    }
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

//Users

//logs the users in
export async function loginUser (email, password) {
    console.log(email + " " + password)
    const response = await request(`/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })

    return response.data
}

//logs the users out
export async function logoutUser () {
    console.log("logout")
    const response = await request(`/logout`, {
        method: 'POST',
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

//Shifts
//start shift
export async function startShift (current_date , current_time) {
    console.log( JSON.stringify({current_date, current_time}))
    const response = await request(`/start`, {
        method: 'POST',
        body: JSON.stringify({ current_date, current_time }),
    })

    return response.data
}
//end shift
export async function endShift (current_date , current_time) {
    console.log( JSON.stringify({current_date, current_time}))
    const response = await request(`/end`, {
        method: 'POST',
        body: JSON.stringify({ current_date, current_time }),
    })

    return response.data
}

//get time worked (for money calc)
export async function getWorkedTime() {
    console.log( "MY EARNIGS WHYYYYYYYYYYYY:"+JSON.stringify())
    const response = await request(`/shifts`, {
        method: 'GET',
    })

    return 1
}