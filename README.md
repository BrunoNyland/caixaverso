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
- ✅ **Validações e Formatações** nos campos de input de dados
- ✅ **Tela de Dados Cadastrais** com informações do usuário
- ✅ **Edição de Dados** O usuário pode alterar seus dados após o login

## 🔧 Validações Implementadas

- **Email**: Formato válido de email
- **CPF**: Algoritmo de validação brasileiro completo
- **Telefone**: Formato brasileiro (11) 99999-9999
- **Nome**: Mínimo 2 caracteres, apenas letras e espaços
- **Endereço**: Mínimo 5 caracteres
- **Senha**: Mínimo 6 caracteres
- **Confirmação de Senha**: Deve coincidir com a senha

## 🔧 Modificações realizadas na API do professor

- **CORS (Cross-Origin Resource Sharing)**: CORS  é um mecanismo de segurança que permite que navegadores permitam que uma aplicação web acesse recursos de uma origem (domínio, protocolo, ou porta) diferente da sua. Adicionei para poder acessar a API por um dominio diferente. 

- **Servidor de Arquivos Estáticos com o Express**: Para servir os arquivos do site da pasta raiz do projeto juntamente com a API

- **README.txt da API feito pelo COPILOT**: Utilizei o Copilot para criar uma documentação detalhada da API para facilitar o entendimento


