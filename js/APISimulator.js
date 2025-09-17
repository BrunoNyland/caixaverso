// Classe para simular a API localmente (desenvolvimento/testes)
export class APISimulator {
    // Simular JWT Token
    static generateToken(user) {
        const header = { alg: "HS256", typ: "JWT" };
        const payload = { email: user.email, id: user.id, iat: Math.floor(Date.now() / 1000) };
        
        // Simula um token JWT (não é um JWT real, apenas para demonstração)
        return `eyJ${btoa(JSON.stringify(header))}.${btoa(JSON.stringify(payload))}.fake_signature`;
    }

    static decodeToken(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;
            const payload = JSON.parse(atob(parts[1]));
            return payload;
        } catch (error) {
            return null;
        }
    }

    // Verificar se email existe (simulado)
    static async checkEmailExists(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('caixaverso_users') || '[]');
                const exists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
                resolve(exists);
            }, 300);
        });
    }

    // Login simulado
    static async login(email, senha) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('caixaverso_users') || '[]');
                const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha);
                
                if (user) {
                    const token = this.generateToken(user);
                    resolve({ success: true, token });
                } else {
                    reject(new Error('Credenciais inválidas'));
                }
            }, 800);
        });
    }

    // Cadastro simulado
    static async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('caixaverso_users') || '[]');
                
                // Verificar se email já existe
                if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
                    reject(new Error('Email já cadastrado'));
                    return;
                }

                // Verificar se CPF já existe
                const cleanCPF = userData.cpf.replace(/\D/g, '');
                if (users.some(u => u.cpf === cleanCPF)) {
                    reject(new Error('CPF já cadastrado'));
                    return;
                }

                const user = {
                    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    nome: userData.name,
                    email: userData.email,
                    telefone: userData.phone,
                    endereco: userData.address,
                    cpf: cleanCPF,
                    senha: userData.password,
                    createdAt: new Date().toISOString()
                };

                users.push(user);
                localStorage.setItem('caixaverso_users', JSON.stringify(users));

                const token = this.generateToken(user);
                resolve({ success: true, user, token });
            }, 1200);
        });
    }

    // Obter perfil simulado
    static async getUserProfile(token) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const decoded = this.decodeToken(token);
                if (!decoded) {
                    reject(new Error('Token inválido'));
                    return;
                }

                const users = JSON.parse(localStorage.getItem('caixaverso_users') || '[]');
                const user = users.find(u => u.email === decoded.email);
                
                if (user) {
                    const { senha, ...userWithoutPassword } = user;
                    resolve({ success: true, user: userWithoutPassword });
                } else {
                    reject(new Error('Usuário não encontrado'));
                }
            }, 500);
        });
    }

    // Atualizar perfil simulado
    static async updateProfile(token, userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const decoded = this.decodeToken(token);
                if (!decoded) {
                    reject(new Error('Token inválido'));
                    return;
                }

                const users = JSON.parse(localStorage.getItem('caixaverso_users') || '[]');
                const userIndex = users.findIndex(u => u.email === decoded.email);
                
                if (userIndex === -1) {
                    reject(new Error('Usuário não encontrado'));
                    return;
                }

                // Atualizar apenas os campos permitidos
                users[userIndex].nome = userData.name;
                users[userIndex].telefone = userData.phone;
                users[userIndex].endereco = userData.address;
                users[userIndex].updatedAt = new Date().toISOString();

                localStorage.setItem('caixaverso_users', JSON.stringify(users));

                const { senha, ...userWithoutPassword } = users[userIndex];
                resolve({ success: true, user: userWithoutPassword });
            }, 1000);
        });
    }

    // Deletar usuário simulado
    static async deleteUser(token) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const decoded = this.decodeToken(token);
                if (!decoded) {
                    reject(new Error('Token inválido'));
                    return;
                }

                const users = JSON.parse(localStorage.getItem('caixaverso_users') || '[]');
                const userIndex = users.findIndex(u => u.email === decoded.email);
                
                if (userIndex === -1) {
                    reject(new Error('Usuário não encontrado'));
                    return;
                }

                const [deletedUser] = users.splice(userIndex, 1);
                localStorage.setItem('caixaverso_users', JSON.stringify(users));

                const { senha, ...userWithoutPassword } = deletedUser;
                resolve({ success: true, user: userWithoutPassword });
            }, 800);
        });
    }

    // Verificar se a API está disponível (simulado - sempre retorna true)
    static async isAvailable() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true); // Simulador sempre está disponível
            }, 100);
        });
    }

    // Log do status da API
    static async logStatus() {
        try {
            const isAvailable = await this.isAvailable();
            if (isAvailable) {
                console.log(`📊 Status da API: ✅ Online - Obs: Usando SIMULADOR da API`);
            } else {
                console.log(`📊 Status da API: ❌ Offline - Simulador indisponível`);
            }
        } catch (error) {
            console.error('Erro ao verificar status da API simulada:', error);
            console.log(`📊 Status da API: ❌ Erro - Simulador com problemas`);
        }
    }
}