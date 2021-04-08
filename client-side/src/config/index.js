export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('token')) {
        return true
    } else {
        console.log("token",JSON.parse(localStorage.getItem('token')));
        return false;
    }
};
