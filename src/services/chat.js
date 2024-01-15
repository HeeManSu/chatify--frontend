import api from "./api";


export const getChatsService = async () => api.get("/chats");


export const createPersonChatService = async (data) => {
    return api.post("/chats/personalchat",
        data,
        {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        }
    );
}