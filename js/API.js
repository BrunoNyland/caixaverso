// Classe para comunicação com a API real do CaixaVerso
export class API {
    static baseURL = 'http://localhost:3000/api';
    static isAPIAvailable = false;

    // Verificar se email existe
    static async checkEmailExists(email) {
        const response = await fetch(`${this.baseURL}/users/validate-email?email=${encodeURIComponent(email)}`);
        // 204 = email disponível, 409 = email já existe
        return response.status === 409;
    }

    // Login do usuário
    static async login(email, senha) {
        const response = await fetch(`${this.baseURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, token: data.token };
        } else {
            throw new Error(data.error || 'Erro no login');
        }
    }

    // Criar usuário
    static async register(userData) {
        // Mapear campos do frontend para API
        const apiData = {
            nome: userData.name,
            email: userData.email,
            senha: userData.password,
            telefone: userData.phone,
            endereco: userData.address,
            cpf: userData.cpf.replace(/\D/g, '') // Remove formatação do CPF
        };

        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiData)
        });

        const data = await response.json();

        if (response.ok) {
            // Login automático após cadastro
            const loginResponse = await this.login(userData.email, userData.password);
            return { 
                success: true, 
                user: data, 
                token: loginResponse.token 
            };
        } else {
            throw new Error(data.error || 'Erro no cadastro');
        }
    }

    // Obter dados do usuário logado
    static async getUserProfile(token) {
        const response = await fetch(`${this.baseURL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, user: data };
        } else {
            throw new Error(data.error || 'Erro ao buscar perfil');
        }
    }

    // Atualizar perfil do usuário
    static async updateProfile(token, userData) {
        // Decodificar token para obter ID (implementação simplificada)
        const decoded = this.decodeToken(token);
        if (!decoded) {
            throw new Error('Token inválido');
        }

        const updateData = {
            nome: userData.name,
            telefone: userData.phone,
            endereco: userData.address
        };

        const response = await fetch(`${this.baseURL}/users/${decoded.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updateData)
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, user: data };
        } else {
            throw new Error(data.error || 'Erro ao atualizar perfil');
        }
    }

    // Deletar usuário
    static async deleteUser(token) {
        // Decodificar token para obter ID (implementação simplificada)
        const decoded = this.decodeToken(token);
        if (!decoded) {
            throw new Error('Token inválido');
        }

        const response = await fetch(`${this.baseURL}/users/${decoded.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, user: data };
        } else {
            throw new Error(data.error || 'Erro ao deletar usuário');
        }
    }

    // Decodificar token JWT (método auxiliar)
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

    // Verificar se a API está disponível
    static async isAvailable() {
        try {
            const response = await fetch(`${this.baseURL}`);
            return response.status === 404; // 204 = disponível, 409 = email existe (API funcionando)
        } catch (error) {
            return false;
        }
    }

    // Log do status da API
    static async logStatus() {
        try {
            this.isAPIAvailable = await this.isAvailable();
            console.log(`📊 Status da API: ${this.isAPIAvailable ? '✅ Online' : '❌ Offline'}`);
            if (this.isAPIAvailable) {
                console.log(`🌐 API disponível em: ${this.baseURL}`);
            } else {
                console.log(`⚠️  API indisponível. Verifique se o servidor está rodando.`);
            }
        } catch (error) {
            console.error('❌ Erro ao verificar status da API:', error.message);
            this.isAPIAvailable = false;
        }
    }
}