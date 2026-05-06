import ENVIRONMENT from "../config/environment"

export async function login ({email, password}){
    try {
        const response_http = await fetch(
            `${ENVIRONMENT.API_URL}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        email, 
                        password
                    }
                )
            }
        )

        if (!response_http.ok) {
            throw new Error(`HTTP Error: ${response_http.status}`)
        }

        const response = await response_http.json()
        return response
    } catch (error) {
        console.error('Error in login:', error)
        throw error
    }
}


export async function register ({email, password, name}){
    try {
        const response_http = await fetch(
            `${ENVIRONMENT.API_URL}/api/auth/register`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        email, 
                        password,
                        name
                    }
                )
            }
        )

        if (!response_http.ok) {
            throw new Error(`HTTP Error: ${response_http.status}`)
        }

        const response = await response_http.json()
        return response
    } catch (error) {
        console.error('Error in register:', error)
        throw error
    }
}

export async function resetPasswordRequest ({email}){
    /* 
    fetch sirve para hacer consultas HTTP
    */
    try {
        const response_http = await fetch(
            `${ENVIRONMENT.API_URL}/api/auth/reset-password-request`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json" //Indica que enviamos un JSON
                },
                credentials: 'include', // Envía cookies si es necesario
                body: JSON.stringify( // Convertimos el objeto a JSON
                    {
                        email
                    }
                )
            }
        )

        // Verificar si la respuesta HTTP fue exitosa
        if (!response_http.ok) {
            throw new Error(`HTTP Error: ${response_http.status}`)
        }

        const response = await response_http.json()
        return response
    } catch (error) {
        console.error('Error in resetPasswordRequest:', error)
        throw error
    }
}