export const initialState = {
    id: "",
    avatar: null,
    banner: null,
    favorites: [],
    nome: "",
    email: "",
    username: "",
    userTag: "",
    latitude: "",
    longitude: "",
    role: "",
    numPosts: 0,
    numReviews: 0,
    numPlaces: 0,
    title: "",
};

export const UserReducer = (state, action) => {
    switch(action.type) {
        case "setAvatar":
            return { ...state, avatar: action.payload.avatar };
        case "setDataUser":
            return {
                ...state,
                id: action.data.id,
                nome: action.data.nome,
                email: action.data.email,
                username: action.data.username,
                role: action.data.role,
                avatar: action.data.avatar,
                banner: action.data.banner,
                numPosts: action.data.numPosts,
                numReviews: action.data.numReviews,
                numPlaces: action.data.numPlaces,
            }
            case "setUserLocation":
                return {
                    ...state,
                    latitude: action.coords.latitude,
                    longitude: action.coords.longitude
                }
            case "clear":
                return {
                    ...initialState
                }
            case "update":
                return {
                    ...state,
                    numPosts: action.data.numPosts,
                    numReviews: action.data.numReviews,
                    numPlaces: action.data.numPlaces
                }
            case "setAvatar":
                return {
                    ...state,
                    avatar: action.payload.avatar
                }
            case "setBanner":
                return {
                    ...state,
                    banner: action.payload.banner
                }
            case "setNome":
                return {
                    ...state,
                    nome: action.payload.nome
                }
            case "preload":
                return {
                    ...state,
                    id: action.data.id,
                    nome: action.data.nome,
                    email: action.data.email,
                    username: action.data.username,
                    role: action.data.role,
                    avatar: action.data.avatar,
                    banner: action.data.banner,
                    numPosts: action.data.numPosts,
                    numReviews: action.data.numReviews,
                    numPlaces: action.data.numPlaces,
                    latitude: action.data.latitude,
                    longitude: action.data.longitude
                }
        default:
            return state;
    }
}