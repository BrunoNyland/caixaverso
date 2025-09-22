# Trabalho Final de Front End Dinâmico (JS DOM) - Sistema de Cadastro e Login ✅

## Grupo 3 - Alunos 👥

   - Bruno Nyland
   - Danilo Lima
   - Jean Coelho
   - Marcos Ceo

## 🚀 Instruções 

- Para rodar a api e o site deverá ter o NodeJS instalado
   https://nodejs.org/en/download
- Instale as dependencias do NodeJS com o comando abaixo:
   cd api
   npm install
- Para iniciar o servidor rode:
   Na pasta raiz: node api/index.js
   Na pasta api: node index.js
- Acesse o site pela url: http://localhost:3000/ ou http://127.0.0.1:3000/

## 🎯 Funcionalidades Implementadas

- ✅ **Página Inicial SPA** com campo de email e botão "Avançar" que ao digitar verifica a existencia do email na api, caso não exista segue para cadastro, caso contrário segue para login (solita a senha)
- ✅ **Formulário de Cadastro** completo com todos os campos
- ✅ **Validações e Formatações** em todos os campos
- ✅ **Envio de Dados** para API no formato JSON
- ✅ **Sistema de Login** com email e senha
- ✅ **Token de Acesso** simulado e salvo localmente
- ✅ **Tela de Dados Cadastrais** com informações do usuário
- ✅ **Edição de Dados** após login
- ✅ **SPA (Single Page Application)** com navegação fluida
- ✅ **Interface Responsiva** para desktop e mobile

## 🔧 Validações Implementadas

- **Email**: Formato válido de email
- **CPF**: Algoritmo de validação brasileiro completo
- **Telefone**: Formato brasileiro (11) 99999-9999
- **Nome**: Mínimo 2 caracteres, apenas letras e espaços
- **Endereço**: Mínimo 5 caracteres
- **Senha**: Mínimo 6 caracteres
- **Confirmação**: Deve coincidir com a senha

## 🔧 Modificações realizadas na API do professor

- **CORS (Cross-Origin Resource Sharing)**: CORS  é um mecanismo de segurança que permite que navegadores permitam que uma aplicação web acesse recursos de uma origem (domínio, protocolo, ou porta) diferente da sua. Adicionei para poder acessar a API por um dominio diferente. 

- **Servidor de Arquivos Estáticos com o Express**: Para servir os arquivos do site da pasta raiz do projeto juntamente com a API




