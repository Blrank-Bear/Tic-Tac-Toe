import { api } from "./api"

export const register = async (email: string, password: string) => {
    const respons = await api.post('/auth/register', {email, password});
    if(respons.status == 201) {
        window.location.href = '/login';
    } else
        alert(respons)
}

export const login = (email: string, password: string) => {
    api.post('/login', {email, password})
    .then((res) => {
        if(res.status == 200) {
            localStorage.setItem('user_id', res.data.user.id);
            window.location.href = '/rooms';
        }
    })
}