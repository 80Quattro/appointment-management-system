import axios from "axios";
import { API_ROUTES } from "../Utils/constants"

class AuthService {

    static async register(email, password) {
    
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);

        try {
            const response = await axios.post(API_ROUTES.SIGN_UP, params);
            return response.data;
        } catch(error) {
            console.log(error);
        }

    }

    static async login(email, password) {

        const options = {
            method: 'post',
            data: { email, password }
        }

        try {
            const response = await axios(API_ROUTES.SIGN_IN, options);
            return response.data;
        } catch(error) {
            console.log(error);
        }

    }

}

export const register = AuthService.register;
export const login = AuthService.login;

export default AuthService;