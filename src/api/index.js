import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const production = "https://app-lugares.herokuapp.com"

const api = axios.create({
    baseURL: production
})

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token")
    if (token) config.headers = {
        'Authorization': `Bearer ${token}`
    }
    return config
})

export default api