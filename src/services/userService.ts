import { fetchService } from "@/utils/fetchService";


const endpoint = `http://www.mocky.io/v2/5ba8efb23100007200c2750c`


export const getUsers = async () => {
    try { 
        const response = await fetchService(endpoint);
        let data = {
            success: true,
            users: response
        }
        return data;
    }
    catch (err) {
        console.error(err)
        let data = {
            success: false,
            users:[]
        }
        return data
    }
}