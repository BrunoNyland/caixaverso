// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Caixaverso carregado com sucesso!');
    
    // Configurar botão interativo
    configurarBotaoInterativo();
    
    // Configurar formulário de contato
    configurarFormulario();
    
    // Configurar navegação suave
    configurarNavegacaoSuave();
    
    // Mostrar mensagem de boas-vindas
    mostrarMensagemBoasVindas();
});

// Função para configurar o botão interativo
function configurarBotaoInterativo() {
    const botao = document.getElementById('botao-interativo');
    const mensagem = document.getElementById('mensagem');
    let contador = 0;
    
    if (botao && mensagem) {
        botao.addEventListener('click', function() {
            contador++;
            
            const mensagens = [
                'Olá! Bem-vindo ao Caixaverso! 🌟',
                'Você clicou no botão novamente! 🎉',
                'Que legal! Você está explorando a página! 🚀',
                'Continue clicando para ver mais mensagens! 💫',
                'Você é persistente! Parabéns! 🏆'
            ];
            
            const indice = Math.min(contador - 1, mensagens.length - 1);
            mensagem.textContent = mensagens[indice];
            mensagem.style.opacity = '0';
            
            // Animação de fade-in
            setTimeout(() => {
                mensagem.style.opacity = '1';
            }, 100);
        });
    }
}

// Função para configurar o formulário de contato
function configurarFormulario() {
    const formulario = document.getElementById('formulario-contato');
    
    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagemForm = document.getElementById('mensagem-form').value;
            
            // Simular envio do formulário
            if (validarFormulario(nome, email, mensagemForm)) {
                mostrarMensagemSucesso();
                formulario.reset();
            }
        });
    }
}

// Função para validar o formulário
function validarFormulario(nome, email, mensagem) {
    if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
        alert('Por favor, preencha todos os campos!');
        return false;
    }
    
    // Validação simples de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert('Por favor, insira um e-mail válido!');
        return false;
    }
    
    return true;
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso() {
    const mensagemSucesso = document.createElement('div');
    mensagemSucesso.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    mensagemSucesso.textContent = 'Mensagem enviada com sucesso! 📧';
    document.body.appendChild(mensagemSucesso);
    
    // Remover mensagem após 3 segundos
    setTimeout(() => {
        mensagemSucesso.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(mensagemSucesso);
        }, 300);
    }, 3000);
}

// Função para configurar navegação suave
function configurarNavegacaoSuave() {
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(evento) {
            evento.preventDefault();
            
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                destino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para mostrar mensagem de boas-vindas
function mostrarMensagemBoasVindas() {
    console.log('🎉 Bem-vindo ao Caixaverso!');
    console.log('📱 Esta página foi criada com HTML, CSS e JavaScript');
    console.log('🌟 Explore as diferentes seções da página!');
}

// Função utilitária para obter data e hora atual
function obterDataHoraAtual() {
    const agora = new Date();
    return agora.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        dateStyle: 'short',
        timeStyle: 'short'
    });
}

// Adicionar algumas animações CSS via JavaScript
const estilo = document.createElement('style');
estilo.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    #mensagem {
        transition: opacity 0.3s ease;
    }
`;

document.head.appendChild(estilo);