import axios from "axios";
import { API_ROUTES } from "../Utils/constants"

class AppointmentAPI {

    static async readAvailable(startDate, endDate) {

        const startDateString = startDate.getDate() + "." + (startDate.getMonth() + 1) + "." + startDate.getFullYear();
        const endDateString = endDate.getDate() + "." + (endDate.getMonth() + 1) + "." + endDate.getFullYear();

        const url = API_ROUTES.READ_AVAILABLE + "/" + startDateString + "/" + endDateString;
        const token = localStorage.getItem('token');

        const options = {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        }

        try {
            const response = await axios(url, options);
            return response.data;
        } catch(error) {
            console.log(error);
        }
    }

    static async create(dateTime) {

        const dateText = dateTime.getDate() + "." + (dateTime.getMonth() + 1) + "." + dateTime.getFullYear() + " " 
                + dateTime.getHours() + ":" + dateTime.getMinutes();

        const url = API_ROUTES.CREATE;
        const token = localStorage.getItem('token');

        const options = {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            data: {
                date: dateText
            }
        }

        try {
            const response = await axios(url, options);
            return response.data;
        } catch(error) {
            console.log(error);
        }

    }

}

export const readAvailable = AppointmentAPI.readAvailable;
export const create = AppointmentAPI.create;

export default AppointmentAPI;