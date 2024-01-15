import api from "./api";


export const searchUsers = async (params) => api.get(`/users/search`, {
    params
});