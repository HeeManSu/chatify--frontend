import api from "./api";

export const loginUserService = async (data) => {
    return api.post("/login",
        data,
        {
            withCredentials: true,
        }
    );
}

export const registerUserService = async (data) => {
    return api.post("/register",
        data,
        {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        }
    );
}