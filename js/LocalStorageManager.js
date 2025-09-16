// Classe para gerenciar o armazenamento local
export class LocalStorageManager {
    static saveUser(user) {
        localStorage.setItem(user.email, JSON.stringify(user));
    }

    static getUser(email) {
        const user = localStorage.getItem(email);
        return user ? JSON.parse(user) : null;
    }

    static clearUser(email) {
        localStorage.removeItem(email);
    }

    static saveToken(token) {
        return localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static clearToken() {
        localStorage.removeItem('token');
    }

    static isLoggedIn() {
        return this.getToken() !== null;
    }
}