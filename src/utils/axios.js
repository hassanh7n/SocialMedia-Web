import axios from "axios";

const customFetch = axios.create({
    baseURL : "https://social-media-server.zeabur.app/api/v1"
})


export default customFetch;