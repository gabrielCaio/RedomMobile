import React, { createContext, useReducer, useCallback } from 'react'
import { initialState, UserReducer } from '../reducers/userReducer'

import AsyncStorage from '@react-native-community/async-storage'

export const UserContext = createContext();

export default ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState)
    const [refreshFeed, setRefreshFeed] = React.useState({ name: '', func: null })

    function signOut() {
        AsyncStorage.clear().then(() => {
            dispatch({...initialState})
        })
    }

    const addRefreshFeed = useCallback((name, func) => {
        setRefreshFeed({ name, func })
    }, [])

    return (
        <UserContext.Provider value={{ state, dispatch, signOut, addRefreshFeed, refreshFeed }} >
            {children}
        </UserContext.Provider>
    )
}
