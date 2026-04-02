const getUserId = (): number => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId.toString()) : 0;
}

export const getLocalStorage = () => {
    return {
        userId: getUserId(),
    }
}