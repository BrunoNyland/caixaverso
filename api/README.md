# API RESTful para sistema de cadastro e autenticação de usuários

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Instalação](#-instalação)
- [Execução](#-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Documentação da API](#-documentação-da-api)
- [Autenticação](#-autenticação)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Tecnologias](#-tecnologias)

## 🎯 Visão Geral

Esta API fornece endpoints para:
- ✅ Cadastro de usuários
- ✅ Autenticação via JWT
- ✅ Gerenciamento de perfil (CRUD)
- ✅ Validação de e-mail
- ✅ Armazenamento em arquivo JSON local

## 🔧 Instalação

1. **Clone o repositório** (se necessário)
2. **Navegue até a pasta da API:**
```bash
cd api
```

3. **Instale as dependências:**
```bash
npm install
```

## ▶️ Execução

### Desenvolvimento
```bash
npm start
```
ou
```bash
node index.js
```

O servidor será iniciado em: `http://localhost:3000`

### PowerShell (Windows)
```powershell
cd api; node index.js
```

## 📁 Estrutura do Projeto

```
api/
├── index.js                 # Arquivo principal do servidor
├── package.json             # Dependências e configurações
├── data/                    # Armazenamento de dados
│   └── users.json          # Base de dados dos usuários
└── src/
    ├── app/
    │   └── userService.js   # Lógica de negócio
    ├── controllers/
    │   └── userController.js # Controladores das rotas
    └── middleware/
        └── auth.js          # Middleware de autenticação JWT
```

## 📚 Documentação da API

### Base URL
```
http://localhost:3000/api
```

### Endpoints Disponíveis

| Método | Endpoint | Autenticação | Descrição |
|--------|----------|-------------|-----------|
| POST | `/users` | ❌ | Criar usuário |
| POST | `/login` | ❌ | Login do usuário |
| GET | `/users` | ✅ | Dados do usuário logado |
| GET | `/users/validate-email` | ❌ | Validar e-mail |
| PUT | `/users/:id` | ✅ | Atualizar usuário |
| DELETE | `/users/:id` | ✅ | Deletar usuário |

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)** para autenticação.

### Header de Autorização
Para endpoints protegidos, inclua o header:
```http
Authorization: Bearer <seu_jwt_token>
```

---

## 📖 Exemplos de Uso

### 1. Criar Usuário
```http
POST /api/users
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua das Flores, 123",
  "cpf": "123.456.789-00"
}
```

**Resposta (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua das Flores, 123",
  "cpf": "123.456.789-00"
}
```

### 2. Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZW1haWwuY29tIiwiaWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJpYXQiOjE2MzIzNDU2Nzh9.abc123"
}
```

### 3. Obter Dados do Usuário
```http
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua das Flores, 123",
  "cpf": "123.456.789-00"
}
```

### 4. Validar E-mail
```http
GET /api/users/validate-email?email=novo@email.com
```

**Respostas:**
- **204** - E-mail disponível
- **409** - E-mail já cadastrado

### 5. Atualizar Usuário
```http
PUT /api/users/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "nome": "João Santos",
  "telefone": "(11) 88888-8888"
}
```

### 6. Deletar Usuário
```http
DELETE /api/users/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ⚠️ Tratamento de Erros

### Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 204 | Sem conteúdo (e-mail disponível) |
| 400 | Dados inválidos |
| 401 | Não autorizado |
| 403 | Acesso negado |
| 404 | Não encontrado |
| 409 | Conflito (e-mail/CPF já existe) |
| 500 | Erro interno do servidor |

### Formato de Erro
```json
{
  "error": "Mensagem de erro descritiva"
}
```

### Exemplos de Erros

**Campos obrigatórios faltando:**
```json
{
  "error": "Campos obrigatórios faltando: nome, email"
}
```

**Token inválido:**
```json
{
  "error": "Token inválido"
}
```

**E-mail já cadastrado:**
```json
{
  "error": "Email já cadastrado"
}
```

---

## 🛠️ Tecnologias

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Express](https://expressjs.com/)** - Framework web
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - Autenticação JWT
- **[uuid](https://github.com/uuidjs/uuid)** - Geração de IDs únicos

---

## 🧪 Testando a API

### 1. Via cURL
```bash
# Testar criação de usuário
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com","senha":"123456","telefone":"(11) 99999-9999","endereco":"Rua Teste, 123","cpf":"123.456.789-00"}'

# Testar login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","senha":"123456"}'
```

### 2. Via Postman/Insomnia
Importe a collection com os endpoints acima.

### 3. Via Frontend
O projeto inclui um frontend completo em `../index.html` que consome esta API.

---

