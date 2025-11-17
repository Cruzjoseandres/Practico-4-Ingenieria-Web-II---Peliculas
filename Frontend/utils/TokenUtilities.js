const saveAccessToken = (token) => {
    localStorage.setItem("tokenMovie", token);
    console.log("Token saved:", token);
}

const getAccessToken = () => {
    const token = localStorage.getItem("tokenMovie");
    return token;
}

const removeAccessToken = () => {
    localStorage.removeItem("tokenMovie");
}

export {
    saveAccessToken,
    getAccessToken,
    removeAccessToken
}