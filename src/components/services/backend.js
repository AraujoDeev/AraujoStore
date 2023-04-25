import axios from 'axios'

export const backend = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

console.log(import.meta.env.VITE_BASE_URL)

export const createSession = async (email, password) => {
  try {
    const response = await backend.post('/auth/login', { email, password })
    return response
  } catch (error) {
    if (error.code == 'ERR_NETWORK') {
      return {
        message: 'ERR_NETWORK',
        status: 500,
      }
    }
    const erro = {
      message: error.response.data.msg,
      status: error.response.status,
    }
    return erro
  }
}

export const createUser = async (newUser) => {
  try {
    const response = await backend.post('/auth/register', newUser)
    return response
  } catch (error) {
    if (error.code == 'ERR_NETWORK') {
      return {
        message: 'ERR_NETWORK',
        status: 500,
      }
    }
    const erro = {
      message: error.response.data.msg,
      status: error.response.status,
    }
    return erro
  }
}
