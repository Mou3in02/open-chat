import Axios from "axios";

const URL = 'http://192.168.1.14:3000'

const AxiosInstance = Axios.create({
    baseURL: URL
})

export default AxiosInstance
