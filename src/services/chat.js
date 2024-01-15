import api from "./api";


export const getChatsService = async () => api.get("/chats");


export const createPersonChatService = async (data) => api.post("/chats/personalchat", data);

export const createGroupChatService = async (userIds) => {
    return api.post("/chats/groupchat",
        {
            userIds,
        },
        {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        }
    );
}