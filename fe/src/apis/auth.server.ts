import { api } from "./api"

export const register = async (email: string, password: string) => {
    const response = await api.post('/auth/register', {email, password});
    if(response.status == 201) {
        window.location.href = '/login';
    } else
        alert(response)
}

export const login = (email: string, password: string) => {
    api.post('/login', {email, password})
    .then((res) => {
        if(res.status == 200) {
            localStorage.setItem('userId', res.data.user.id);
            window.location.href = '/rooms';
        }
    })
}