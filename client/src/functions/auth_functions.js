import { apiGetRequest } from "../tools/api";

export const LoginWithJwt = async () => {
    const api = 'auth/login-by-jwt'
    const res = await apiGetRequest(api);
    if (res.ok) {
            return res.result
    }else{
        return false
    }
    
}
