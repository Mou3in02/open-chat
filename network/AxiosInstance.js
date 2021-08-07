import Axios from "axios";

const AxiosInstance = Axios.create({
    baseURL: 'http://192.168.1.14:3000',
})

export default AxiosInstance
