let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user.username : '';
let token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).jwt : '';
let id = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user.id : '';
export const initialState = {
    user: '' || user,
    token: '' || token,
    id: '' || id,
    loading: false,
    errorMessage: null,
    flagClick: false
}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                ...initialState,
                loading: true
            }
        case 'LOGIN_SUCCESS':
            return {
                ...initialState,
                loading: false,
                user: action.payload.user.username,
                id: action.payload.user.id,
                token: action.payload.jwt
            }
        case 'LOGIN_ERROR':
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            }
        case 'LOGOUT':
            return {
                ...initialState,
                user: '',
                token: '',
                id: ''
            }
        default: throw new Error(`Unhandled action type: ${action.type}`);

    }
}