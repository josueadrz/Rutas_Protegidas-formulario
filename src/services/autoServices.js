export const signIn = async (user) => {
    const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const status = response.status;
    const json = await response.json();
    return { status, json };
};

export const uploadPhoto = async (photo) => {
    let formData = new FormData()
    formData.append('image', photo)
    const response = await fetch("https://reqres.in/api/upload", {
        method: 'POST',
        body: formData
    })
    const status = response.status;
    const json = await response.json();
    return { status, json };
}

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    return true;
};