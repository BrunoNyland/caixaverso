import { LocalStorageManager } from './LocalStorageManager.js';

// Classe para simular API com delay
export class APISimulator {
    static async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = LocalStorageManager.getUser(email);
                if (user && user.email === email && user.password === password) {
                    resolve({ success: true, user: user, token: email });
                } else {
                    reject({ success: false, message: 'Email ou senha incorretos' });
                }
            }, 1000);
        });
    }

    static async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingUser = LocalStorageManager.getUser(userData.email);
                if (existingUser && existingUser.email === userData.email) {
                    reject({ success: false, message: 'Email já cadastrado' });
                } else {
                    const user = {
                        ...userData,
                        id: Date.now(),
                        createdAt: new Date().toISOString()
                    };
                    LocalStorageManager.saveUser(user);
                    resolve({ success: true, user: user, token: userData.email });
                }
            }, 1500);
        });
    }

    static async updateProfile(email, userData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const currentUser = LocalStorageManager.getUser(email);
                const updatedUser = { ...currentUser, ...userData };
                LocalStorageManager.saveUser(updatedUser);
                resolve({ success: true, user: updatedUser });
            }, 1000);
        });
    }
}