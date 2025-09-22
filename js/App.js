import { LocalStorageManager } from './LocalStorageManager.js';
import { Validator } from './Validator.js';
import { API } from './API.js';

// Classe principal da aplicação
export class App {
    constructor() {
        this.currentPage = null;
        this.messageQueue = [];
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

        // Máscaras
        this.setupMasks();
        // Validações em tempo real
        this.setupRealTimeValidation();
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
            value = value.substring(0, 11);
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;
            }
        });

        // Cria classe uppercase e lowercase para limitar a entrada dos dados
        document.querySelectorAll("input").forEach(input => {
            if (input.classList.contains('uppercase')){
                input.addEventListener("blur", function () {
                    input.value = input.value.toUpperCase();
                });
                input.addEventListener("input", function () {
                    const start = input.selectionStart;
                    const end = input.selectionEnd;
                    input.value = input.value.toUpperCase();
                    try {
                        input.setSelectionRange(start, end);
                    } catch (e) {
                        // Ignora erro para tipos que não suportam seleção
                    }
                });
            }
            if (input.classList.contains('lowercase')){
                input.addEventListener("blur", function () {
                    input.value = input.value.toLowerCase();
                });
                input.addEventListener("input", function () {
                    const start = input.selectionStart;
                    const end = input.selectionEnd;
                    input.value = input.value.toLowerCase();
                    try {
                        input.setSelectionRange(start, end);
                    } catch (e) {
                        // Ignora erro para tipos que não suportam seleção
                    }
                });
            }
        });

        // Máscara para telefone no cadastro
        document.getElementById('register-phone').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 11); // Limita a 11 dígitos
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

        // Máscara para telefone na edição
        document.getElementById('edit-phone').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 11); // Limita a 11 dígitos
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

    async checkInitialState() {
        await API.logStatus();
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

        // Foco automático baseado na página
        if (pageId === 'email-page') {
            document.getElementById('email-input').focus();
        } else if (pageId === 'password-page') {
            document.getElementById('password-input').focus();
        }
    }

    clearMessages() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.success-message, .error-banner').forEach(el => el.remove());
    }

    showMessage(message, type = 'error') {
        const messageElement = document.createElement('div');
        messageElement.className = type === 'success' ? 'success-message' : 'error-banner';
        messageElement.textContent = message;

        // Adiciona à fila de mensagens
        this.messageQueue.push(messageElement);

        // Calcula a posição baseada na quantidade de mensagens
        const messageIndex = this.messageQueue.length - 1;
        const topPosition = 20 + (messageIndex * 70); // 70px de espaçamento entre mensagens
        messageElement.style.top = `${topPosition}px`;

        // Insere a mensagem no body
        document.body.appendChild(messageElement);

        // Remove a mensagem após 3 segundos com efeito de fade out
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                // Remove da fila e reposiciona as mensagens restantes
                const index = this.messageQueue.indexOf(messageElement);
                if (index > -1) {
                    this.messageQueue.splice(index, 1);
                    this.repositionMessages();
                }
                messageElement.remove();
            }, 500); // Tempo da transição CSS
        }, 2500); // Mostra por 2.5 segundos antes de começar fade out
    }

    repositionMessages() {
        this.messageQueue.forEach((message, index) => {
            const topPosition = 20 + (index * 70);
            message.style.top = `${topPosition}px`;
        });
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

        try {
            // Verifica se o email já existe
            const emailExists = await API.checkEmailExists(email);
            
            if (emailExists) {
                // Email existe, vai para login
                document.getElementById('login-email-display').textContent = email;
                // Preenche o campo username oculto para acessibilidade
                document.getElementById('login-username').value = email;
                this.showPage('password-page');
                document.getElementById('password-input').focus();
            } else {
                // Email não existe, vai para cadastro
                document.getElementById('register-email').value = email;
                this.showPage('register-page');
                document.getElementById('register-name').focus();
            }
        } catch (error) {
            this.showMessage('Erro ao verificar email: ' + error.message);
        } finally {
            this.setLoading(button, false);
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
            const response = await API.login(email, password);
            if (response.success) {
                LocalStorageManager.saveToken(response.token);
                this.showPage('profile-page');
                this.loadProfile();
                this.showMessage('Login realizado com sucesso!', 'success');
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
            const response = await API.register(formData);
            if (response.success) {
                LocalStorageManager.saveToken(response.token);
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

    async loadProfile() {
        const token = LocalStorageManager.getToken();
        if (!token) return this.handleLogout();

        try {
            const response = await API.getUserProfile(token);
            if (response.success) {
                const user = response.user;

                document.getElementById('profile-name').textContent = user.nome;
                document.getElementById('profile-email').textContent = user.email;
                document.getElementById('profile-cpf').textContent = user.cpf ? user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
                document.getElementById('profile-phone').textContent = user.telefone;
                document.getElementById('profile-address').textContent = user.endereco;

                // Preenche formulário de edição
                document.getElementById('edit-name').value = user.nome;
                document.getElementById('edit-phone').value = user.telefone;
                document.getElementById('edit-address').value = user.endereco;
                document.getElementById('edit-username').value = user.email;
            }
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            this.showMessage('Erro ao carregar perfil: ' + error.message);
            if (error.message.includes('Token') || error.message.includes('inválido')) {
                this.handleLogout();
            }
        }
    }

    showEditProfile() {
        this.loadProfile();
        this.showPage('edit-profile-page');
    }

    async handleSaveProfile() {
        const token = LocalStorageManager.getToken();
        if (!token) {
            this.showMessage('Token não encontrado. Faça login novamente.');
            this.handleLogout();
            return;
        }

        const formData = {
            name: document.getElementById('edit-name').value.trim(),
            phone: document.getElementById('edit-phone').value.trim(),
            address: document.getElementById('edit-address').value.trim()
        };

        // Validações
        if (!formData.name || !Validator.name(formData.name)) {
            this.showMessage('Nome inválido');
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
            const response = await API.updateProfile(token, formData);
            if (response.success) {
                this.showMessage('Perfil atualizado com sucesso!', 'success');
                setTimeout(() => {
                    this.showPage('profile-page');
                    this.loadProfile();
                }, 1500);
            }
        } catch (error) {
            this.showMessage(error.message);
            // Se erro de token, fazer logout
            if (error.message.includes('Token') || error.message.includes('inválido')) {
                this.handleLogout();
            }
        } finally {
            this.setLoading(button, false);
        }
    }

    handleLogout() {
        LocalStorageManager.clearToken();
        this.showPage('email-page');
        // Limpa formulários
        document.querySelectorAll('input').forEach(input => {
            if (input.type !== 'button' && input.type !== 'submit') {
                input.value = '';
            }
        });
        this.showMessage('Usuário Desconectado com sucesso!','success');
    }
}