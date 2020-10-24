export const initialState = {
    avatar: '',
    favorites: [],
    nome: "",
    email: "",
    username: "",
    userTag: "",
    latitude: "",
    longitude: "",
    role: "",
};

export const UserReducer = (state, action) => {
    switch(action.type) {
        case "setAvatar":
            return { ...state, avatar: action.payload.avatar };
        case "setDataUser":
            return {
                ...state,
                nome: action.data.nome,
                email: action.data.email,
                username: action.data.username,
                role: action.data.role,
                token: action.data.token
            }
            case "setUserLocation":
                return {
                    ...state,
                    latitude: action.coords.latitude,
                    longitude: action.coords.longitude
                }
            case "clear":
                return {
                    state: initialState
                }
        default:
            return state;
    }
}