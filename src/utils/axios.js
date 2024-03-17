import axios from "axios";

const customFetch = axios.create({
    baseURL : "https://socialmedia-server.up.railway.app/api/v1"
})


export default customFetch;