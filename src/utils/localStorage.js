export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}
export const addTokenToLocalStorage = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
}

// export const addConversationoLocalStorage = (conversation) => {
//     localStorage.setItem('conversation', JSON.stringify(conversation));
// }

// export const addCartToLocalStorage = (mode) => {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }


export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
}
export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
}


export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user
}

export const getTokenFromLocalStorage = () => {
    const result = localStorage.getItem('token');
    const user = result ? JSON.parse(result) : null;
    return user
}
export const getConversationFromLocalStorage = () => {
    const result = localStorage.getItem('conversation')
    const user = result ? JSON.parse(result) : null
    return user
}








export const addConversationoLocalStorage = (conversation) => {
    localStorage.setItem('conversation', JSON.stringify(conversation));
}

export const addModeToLocalStorage = (mode) => {
    localStorage.setItem('mode', JSON.stringify(mode));
}



export const getModeFromLocalStorage = () => {
    const result = localStorage.getItem('mode');
    const user = result ? JSON.parse(result) : null;
    return user
}