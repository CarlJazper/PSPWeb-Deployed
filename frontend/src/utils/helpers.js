import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('token', data.token);  // Store token as a string, not an object
        sessionStorage.setItem('user', JSON.stringify(data.user));
    }

    if (data.user && data.user.role === 'admin') {
        next('/admin/dashboard'); // Redirect to the dashboard if the user is an admin
    } else {
        next(); // Default redirect if not admin
    }
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('token');
        return token ? token : null;  // Return token as a string, not an object
    }
    return null;
};

export const getUser = () => {
    if (typeof window !== 'undefined') {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;  // Return null if no user found
    }
    return null;
};

export const logout = (next) => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
    next();
};

export const errMsg = (message = '') => toast.error(message, {
    position: 'bottom-right'
});

export const successMsg = (message = '') => toast.success(message, {
    position: 'bottom-right'
});
