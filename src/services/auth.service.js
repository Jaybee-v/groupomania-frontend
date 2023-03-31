let saveToken = (data) => {
    localStorage.setItem("token", data.token)
    localStorage.setItem("userId", data.userId)
    localStorage.setItem("role", data.role)
}

let isLogged = () => {
    let token = localStorage.getItem("token")
    return !!token
}

let options = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}

export const authService = {
    saveToken,
    isLogged,
    options,
}
