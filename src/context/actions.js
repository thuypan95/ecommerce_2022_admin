import axios from "axios";

const BASE_URL = 'http://localhost:1337/auth/local';
export async function loginUser(dispatch, loginPayload) {
    const dataConfig = {
        identifier: loginPayload.email,
        password: loginPayload.password,
    }
    try {

        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await axios.post(BASE_URL, dataConfig);
        let data = await response.data;

        if (data) {
            if (data?.user?.role?.type === 'admin') {
                dispatch({ type: 'LOGIN_SUCCESS', payload: data });
                localStorage.setItem('currentUser', JSON.stringify(data));
                return data;
            }
            else {
                dispatch({ type: 'LOGIN_ERROR', error: 'Identifier or password invalid.' });
            }
        }
        return;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error.response.data.message[0].messages[0].message });
        console.log(error.response);
    }

}
