// Classe para gerenciar o armazenamento local
class LocalStorageManager {
    static saveUser(user) {
        localStorage.setItem('caixaverso_user', JSON.stringify(user));
    }

    static getUser() {
        const user = localStorage.getItem('caixaverso_user');
        return user ? JSON.parse(user) : null;
    }

    static clearUser() {
        localStorage.removeItem('caixaverso_user');
    }

    static isLoggedIn() {
        return this.getUser() !== null;
    }
}

// Classe para validações
class Validator {
    static email(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static cpf(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        if (cpf.length !== 11) return false;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) return false;

        // Calcula primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf[i]) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10) remainder = 0;
        if (remainder !== parseInt(cpf[9])) return false;

        // Calcula segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf[i]) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10) remainder = 0;
        if (remainder !== parseInt(cpf[10])) return false;

        return true;
    }

    static phone(phone) {
        const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return regex.test(phone);
    }

    static password(password) {
        return password.length >= 6;
    }

    static name(name) {
        return name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name.trim());
    }
}

// Classe para simular API
class APISimulator {
    static async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = LocalStorageManager.getUser();
                if (user && user.email === email && user.password === password) {
                    resolve({ success: true, user: user });
                } else {
                    reject({ success: false, message: 'Email ou senha incorretos' });
                }
            }, 1000);
        });
    }

    static async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingUser = LocalStorageManager.getUser();
                if (existingUser && existingUser.email === userData.email) {
                    reject({ success: false, message: 'Email já cadastrado' });
                } else if (existingUser && existingUser.cpf === userData.cpf) {
                    reject({ success: false, message: 'CPF já cadastrado' });
                } else {
                    const user = {
                        ...userData,
                        id: Date.now(),
                        createdAt: new Date().toISOString()
                    };
                    LocalStorageManager.saveUser(user);
                    resolve({ success: true, user: user });
                }
            }, 1500);
        });
    }

    static async updateProfile(userData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const currentUser = LocalStorageManager.getUser();
                const updatedUser = { ...currentUser, ...userData };
                LocalStorageManager.saveUser(updatedUser);
                resolve({ success: true, user: updatedUser });
            }, 1000);
        });
    }
}

// Classe principal da aplicação
class CaixaversoApp {
    constructor() {
        this.currentPage = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkInitialState();
    }

    bindEvents() {
        // Botões de navegação
        document.getElementById('advance-btn').addEventListener('click', () => this.handleEmailSubmit());
        document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
        document.getElementById('edit-profile-btn').addEventListener('click', () => this.showEditProfile());
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
        document.getElementById('back-to-email-btn').addEventListener('click', () => this.showPage('email-page'));
        document.getElementById('back-to-email-from-register-btn').addEventListener('click', () => this.showPage('email-page'));
        document.getElementById('cancel-edit-btn').addEventListener('click', () => this.showPage('profile-page'));

        // Formulários
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
        document.getElementById('edit-profile-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSaveProfile();
        });

        // Validações em tempo real
        this.setupRealTimeValidation();

        // Máscaras
        this.setupMasks();
    }

    setupRealTimeValidation() {
        // Email
        document.getElementById('email-input').addEventListener('input', (e) => {
            this.validateField('email-input', Validator.email, 'email-error', 'Email inválido');
        });

        // CPF
        document.getElementById('register-cpf').addEventListener('input', (e) => {
            this.validateField('register-cpf', Validator.cpf, 'cpf-error', 'CPF inválido');
        });

        // Telefone
        document.getElementById('register-phone').addEventListener('input', (e) => {
            this.validateField('register-phone', Validator.phone, 'phone-error', 'Telefone inválido');
        });

        // Senha
        document.getElementById('password-input').addEventListener('input', (e) => {
            this.validateField('password-input', Validator.password, 'password-error', 'Senha deve ter pelo menos 6 caracteres');
        });

        // Nome
        document.getElementById('register-name').addEventListener('input', (e) => {
            this.validateField('register-name', Validator.name, 'name-error', 'Nome deve ter pelo menos 2 caracteres');
        });

        // Endereço
        document.getElementById('register-address').addEventListener('input', (e) => {
            this.validateField('register-address', (value) => value.trim().length >= 5, 'address-error', 'Endereço deve ter pelo menos 5 caracteres');
        });

        // Confirmação de senha
        document.getElementById('register-confirm-password').addEventListener('input', (e) => {
            this.validatePasswordConfirmation();
        });

        // Validações para edição
        document.getElementById('edit-name').addEventListener('input', (e) => {
            this.validateField('edit-name', Validator.name, 'edit-name-error', 'Nome deve ter pelo menos 2 caracteres');
        });

        document.getElementById('edit-phone').addEventListener('input', (e) => {
            this.validateField('edit-phone', Validator.phone, 'edit-phone-error', 'Telefone inválido');
        });

        document.getElementById('edit-address').addEventListener('input', (e) => {
            this.validateField('edit-address', (value) => value.trim().length >= 5, 'edit-address-error', 'Endereço deve ter pelo menos 5 caracteres');
        });
    }

    setupMasks() {
        // Máscara para CPF
        document.getElementById('register-cpf').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;
            }
        });

        // Máscara para telefone
        document.getElementById('register-phone').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    value = value.replace(/(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                }
                e.target.value = value;
            }
        });
    }

    validateField(fieldId, validator, errorId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(errorId);

        if (field.value && !validator(field.value)) {
            field.style.borderColor = 'var(--error-color)';
            errorElement.textContent = errorMessage;
        } else {
            field.style.borderColor = 'var(--medium-gray)';
            errorElement.textContent = '';
        }
    }

    validatePasswordConfirmation() {
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const errorElement = document.getElementById('confirm-password-error');

        if (confirmPassword && password !== confirmPassword) {
            document.getElementById('register-confirm-password').style.borderColor = 'var(--error-color)';
            errorElement.textContent = 'As senhas não coincidem';
        } else {
            document.getElementById('register-confirm-password').style.borderColor = 'var(--medium-gray)';
            errorElement.textContent = '';
        }
    }

    checkInitialState() {
        if (LocalStorageManager.isLoggedIn()) {
            this.showPage('profile-page');
            this.loadProfile();
        } else {
            this.showPage('email-page');
        }
    }

    showPage(pageId) {
        // Esconde todas as páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Mostra a página solicitada
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;

        // Limpa mensagens de erro/sucesso
        this.clearMessages();
    }

    clearMessages() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.success-message, .error-banner').forEach(el => el.remove());
    }

    showMessage(message, type = 'error') {
        const messageElement = document.createElement('div');
        messageElement.className = type === 'success' ? 'success-message' : 'error-banner';
        messageElement.textContent = message;

        const formContainer = document.querySelector('.page.active .form-container') ||
                             document.querySelector('.page.active .profile-container');
        if (formContainer) {
            formContainer.insertBefore(messageElement, formContainer.firstElementChild);
        }
    }

    setLoading(button, loading = true) {
        if (loading) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.innerHTML = '<span class="spinner"></span>Processando...';
            button.classList.add('loading');
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || 'Continuar';
            button.classList.remove('loading');
        }
    }

    async handleEmailSubmit() {
        const email = document.getElementById('email-input').value.trim();

        if (!email) {
            this.showMessage('Por favor, digite seu email');
            return;
        }

        if (!Validator.email(email)) {
            this.showMessage('Email inválido');
            return;
        }

        const button = document.getElementById('advance-btn');
        this.setLoading(button, true);

        // Simula verificação do email
        setTimeout(() => {
            this.setLoading(button, false);
            this.processEmailCheck(email);
        }, 500);
    }

    processEmailCheck(email) {
        // Verifica se o email existe
        const existingUser = LocalStorageManager.getUser();
        if (existingUser && existingUser.email === email) {
            // Email existe, vai para login
            document.getElementById('login-email-display').textContent = email;
            this.showPage('password-page');
        } else {
            // Email não existe, vai para cadastro
            document.getElementById('register-email').value = email;
            this.showPage('register-page');
        }
    }

    async handleLogin() {
        const password = document.getElementById('password-input').value;
        const email = document.getElementById('login-email-display').textContent.trim();

        if (!password) {
            this.showMessage('Por favor, digite sua senha');
            return;
        }

        const button = document.getElementById('login-btn');
        this.setLoading(button, true);

        try {
            const response = await APISimulator.login(email, password);
            if (response.success) {
                this.showPage('profile-page');
                this.loadProfile();
            }
        } catch (error) {
            this.showMessage(error.message);
        } finally {
            this.setLoading(button, false);
        }
    }

    async handleRegister() {
        const formData = {
            name: document.getElementById('register-name').value.trim(),
            email: document.getElementById('register-email').value.trim(),
            cpf: document.getElementById('register-cpf').value.trim(),
            phone: document.getElementById('register-phone').value.trim(),
            address: document.getElementById('register-address').value.trim(),
            password: document.getElementById('register-password').value,
            confirmPassword: document.getElementById('register-confirm-password').value
        };

        // Validações
        if (!formData.name || !Validator.name(formData.name)) {
            this.showMessage('Nome inválido');
            return;
        }

        if (!formData.email || !Validator.email(formData.email)) {
            this.showMessage('Email inválido');
            return;
        }

        if (!formData.cpf || !Validator.cpf(formData.cpf.replace(/\D/g, ''))) {
            this.showMessage('CPF inválido');
            return;
        }

        if (!formData.phone || !Validator.phone(formData.phone)) {
            this.showMessage('Telefone inválido');
            return;
        }

        if (!formData.address || formData.address.length < 5) {
            this.showMessage('Endereço deve ter pelo menos 5 caracteres');
            return;
        }

        if (!formData.password || !Validator.password(formData.password)) {
            this.showMessage('Senha deve ter pelo menos 6 caracteres');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            this.showMessage('As senhas não coincidem');
            return;
        }

        const button = document.querySelector('#register-form button[type="submit"]');
        this.setLoading(button, true);

        try {
            const response = await APISimulator.register(formData);
            if (response.success) {
                this.showMessage('Cadastro realizado com sucesso!', 'success');
                setTimeout(() => {
                    this.showPage('profile-page');
                    this.loadProfile();
                }, 1500);
            }
        } catch (error) {
            this.showMessage(error.message);
        } finally {
            this.setLoading(button, false);
        }
    }

    loadProfile() {
        const user = LocalStorageManager.getUser();
        if (user) {
            document.getElementById('profile-name').textContent = user.name;
            document.getElementById('profile-email').textContent = user.email;
            document.getElementById('profile-cpf').textContent = user.cpf;
            document.getElementById('profile-phone').textContent = user.phone;
            document.getElementById('profile-address').textContent = user.address;

            // Preenche formulário de edição
            document.getElementById('edit-name').value = user.name;
            document.getElementById('edit-email').value = user.email;
            document.getElementById('edit-phone').value = user.phone;
            document.getElementById('edit-address').value = user.address;
        }
    }

    showEditProfile() {
        this.showPage('edit-profile-page');
    }

    async handleSaveProfile() {
        const formData = {
            name: document.getElementById('edit-name').value.trim(),
            email: document.getElementById('edit-email').value.trim(),
            phone: document.getElementById('edit-phone').value.trim(),
            address: document.getElementById('edit-address').value.trim()
        };

        // Validações
        if (!formData.name || !Validator.name(formData.name)) {
            this.showMessage('Nome inválido');
            return;
        }

        if (!formData.email || !Validator.email(formData.email)) {
            this.showMessage('Email inválido');
            return;
        }

        if (!formData.phone || !Validator.phone(formData.phone)) {
            this.showMessage('Telefone inválido');
            return;
        }

        if (!formData.address || formData.address.length < 5) {
            this.showMessage('Endereço deve ter pelo menos 5 caracteres');
            return;
        }

        const button = document.querySelector('#edit-profile-form button[type="submit"]');
        this.setLoading(button, true);

        try {
            const response = await APISimulator.updateProfile(formData);
            if (response.success) {
                this.showMessage('Perfil atualizado com sucesso!', 'success');
                setTimeout(() => {
                    this.showPage('profile-page');
                    this.loadProfile();
                }, 1500);
            }
        } catch (error) {
            this.showMessage(error.message);
        } finally {
            this.setLoading(button, false);
        }
    }

    handleLogout() {
        LocalStorageManager.clearUser();
        this.showPage('email-page');
        // Limpa formulários
        document.querySelectorAll('input').forEach(input => {
            if (input.type !== 'button' && input.type !== 'submit') {
                input.value = '';
            }
        });
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CaixaversoApp();
});
