import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const local = "http://192.168.0.111:3333"

const api = axios.create({
    baseURL: local
})


api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) config.headers.token = token;
    return config;
});

export default api;