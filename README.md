# Exercício - Página de Cadastro de Usuário

Implemente um fluxo completo de **cadastro e login de usuário** utilizando **HTML, CSS e JavaScript**, com comunicação a uma **API fictícia**. O fluxo deve contemplar **validações, persistência e edição de dados do cliente**.

## 👥 Grupo 3 - Alunos:
   ● Bruno Nyland
   ● Danilo Lima
   ● Jean Coelho
   ● Marcos Ceo

## 🧭 Passos do Exercício

1. **Página Inicial**
   - Criar uma página com um campo de digitação de **e-mail** e um botão **"Avançar"**.

2. **Verificação de E-mail**
   - Ao clicar em **"Avançar"**, realizar uma pesquisa em uma API para verificar se o e-mail já está cadastrado.

3. **Fluxo Condicional**
   - **Se o e-mail já existir**:
     - Direcionar o usuário para a página de **senha** para autenticação.
   - **Se o e-mail não existir**:
     - Abrir um **formulário de cadastro** com os seguintes campos:
       - **Email** (pré-preenchido e não editável)
       - **Nome** (mínimo 3 caracteres)
       - **Telefone** (DDD + número)
       - **Endereço** (mínimo 3 caracteres)
       - **CPF**
       - **Senha** (mínimo 8 caracteres, contendo pelo menos uma letra maiúscula e um número)

4. **Validações**
   - Aplicar **validações e formatações corretas** em todos os campos do formulário.

5. **Envio de Dados**
   - Ao submeter o formulário, enviar os dados para a API no formato **JSON**.

6. **Login**
   - Após o cadastro, permitir que o cliente faça **login utilizando e-mail e senha**.

7. **Token de Acesso**
   - Ao autenticar, a API deve retornar um **token de acesso**.
   - Esse token deve ser **salvo localmente**.

8. **Tela de Dados Cadastrais**
   - Com o token salvo, exibir uma tela com os **dados cadastrais do cliente**.

9. **Extra**
   - Implementar funcionalidade para **editar os dados do cliente** após estar logado.

---

## 👥 Organização do Trabalho

- Este exercício deverá ser feito em **grupos de 4 pessoas**.
- A entrega será feita através de **repositório no GitHub**.
- **Apenas um projeto por grupo** precisa ser entregue.

---

## 📌 Tecnologias Sugeridas

- HTML
- CSS
- JavaScript
- API (fictícia, simulada com JSON ou mock)

---

## ✅ Requisitos Obrigatórios

- Validações nos campos
- Persistência de dados
- Autenticação com token
- Edição de dados após login

---

## 🚀 Boa sorte e bom código!
