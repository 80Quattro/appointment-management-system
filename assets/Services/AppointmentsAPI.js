import axios from "axios";
import { API_ROUTES } from "../Utils/constants";
import { dateTimeToISOString, dateToISOString } from "../Utils/dateTimeHelpers";

class AppointmentAPI {

    static async readAvailable(startDate, endDate) {

        const url = API_ROUTES.READ_AVAILABLE;
        const token = localStorage.getItem('token');

        const options = {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
            params: {
                startDate: dateToISOString(startDate),
                endDate: dateToISOString(endDate)
            }
        }

        try {
            const response = await axios(url, options);
            return response.data;
        } catch(error) {
            console.log(error);
        }
    }

    static async create(dateTime) {

        const url = API_ROUTES.CREATE;
        const token = localStorage.getItem('token');

        const options = {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            data: {
                date: dateTimeToISOString(dateTime)
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