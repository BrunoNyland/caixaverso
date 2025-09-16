// Classe para validações
export class Validator {
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