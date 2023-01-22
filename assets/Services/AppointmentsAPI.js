import axios from "axios";
import { API_ROUTES } from "../Utils/constants"

class AppointmentAPI {

    static async read(date) {

        const dateString = date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
        const url = API_ROUTES.READ + "/" + dateString;
        const token = localStorage.getItem('token');

        const options = {
            method: 'get',
            headers: { Authorization: `Bearer ${token}` }
        }

        try {
            const response = await axios(url, options);
            return response.data;
        } catch(error) {
            console.log(error);
        }
    }

}

export const read = AppointmentAPI.read;

export default AppointmentAPI;