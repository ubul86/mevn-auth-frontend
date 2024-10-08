import AuthService from './auth.service';
import {publicApi} from "./api.js";

class RegistrationService {
    registration(user) {
        return publicApi.post('/registration/register', user);
    }

    activation(token) {
        return publicApi.post('/activation', { token });
    }
}

export default new RegistrationService();
