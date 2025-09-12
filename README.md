# CaixaVerso - Sistema de Cadastro e Login ✅

Uma aplicação web moderna e responsiva para cadastro e login de usuários, desenvolvida com HTML5, CSS3 e JavaScript puro. **Implementação completa do exercício proposto.**

## 👥 Grupo 3 - Alunos:
   - Bruno Nyland
   - Danilo Lima
   - Jean Coelho
   - Marcos Ceo

## 🎯 Funcionalidades Implementadas

- ✅ **Página Inicial** com campo de email e botão "Avançar"
- ✅ **Verificação de E-mail** com API fictícia
- ✅ **Fluxo Condicional** baseado na existência do email
- ✅ **Formulário de Cadastro** completo com todos os campos
- ✅ **Validações e Formatações** em todos os campos
- ✅ **Envio de Dados** para API no formato JSON
- ✅ **Sistema de Login** com email e senha
- ✅ **Token de Acesso** simulado e salvo localmente
- ✅ **Tela de Dados Cadastrais** com informações do usuário
- ✅ **Edição de Dados** após login
- ✅ **SPA (Single Page Application)** com navegação fluida
- ✅ **Interface Responsiva** para desktop e mobile

## 📋 Campos de Cadastro

- **Email** (pré-preenchido e não editável)
- **Nome** (mínimo 2 caracteres)
- **Telefone** (com máscara brasileira)
- **Endereço** (mínimo 5 caracteres)
- **CPF** (com validação completa e máscara)
- **Senha** (mínimo 6 caracteres)
- **Confirmação de Senha**

## 🔧 Validações Implementadas

- **Email**: Formato válido de email
- **CPF**: Algoritmo de validação brasileiro completo
- **Telefone**: Formato brasileiro (11) 99999-9999
- **Nome**: Mínimo 2 caracteres, apenas letras e espaços
- **Endereço**: Mínimo 5 caracteres
- **Senha**: Mínimo 6 caracteres
- **Confirmação**: Deve coincidir com a senha

## 🎨 Design

- **Cores**: Paleta da Caixa Econômica Federal (azul e branco)
- **Tipografia**: Segoe UI, moderna e legível
- **Animações**: Transições suaves e loading states
- **Responsividade**: Layout adaptável para todos os dispositivos

## 🚀 Como Usar

1. **Abra o arquivo** `index.html` em qualquer navegador moderno
2. **Digite seu email** na tela inicial
3. **Se for novo usuário**: Preencha o formulário de cadastro
4. **Se já cadastrado**: Digite sua senha para fazer login
5. **Gerencie seu perfil**: Visualize e edite seus dados

## 📁 Estrutura do Projeto

```
caixaverso/
├── index.html      # Estrutura HTML da aplicação
├── styles.css      # Estilos CSS responsivos
└── script.js       # Lógica JavaScript da aplicação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântica e estrutura
- **CSS3**: Flexbox, Grid, animações e responsividade
- **JavaScript ES6+**: Classes, async/await, localStorage
- **Regex**: Validações de formato
- **SPA Pattern**: Navegação sem reload

## 🔒 Segurança

- Validação completa de dados no frontend
- Sanitização de inputs
- Armazenamento seguro no localStorage
- Prevenção de XSS através de manipulação DOM segura

## 📱 Compatibilidade

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Navegadores móveis modernos

## 🎯 Diferenciais Implementados

- **Interface Moderna**: Design inspirado na Caixa Econômica Federal
- **Validações em Tempo Real**: Feedback imediato para o usuário
- **Máscaras Automáticas**: Para CPF e telefone
- **Estados de Loading**: Animações durante processamento
- **Mensagens de Sucesso/Erro**: Feedback visual claro
- **Responsividade Total**: Funciona em todos os dispositivos
- **Código Organizado**: Estrutura modular com classes
- **Simulação de API**: Com delays realistas

## 📝 Arquitetura

### Classes Implementadas:
- **LocalStorageManager**: Gerenciamento de dados locais
- **Validator**: Validações de campos
- **APISimulator**: Simulação de API com async/await
- **CaixaversoApp**: Classe principal da aplicação

### Funcionalidades Técnicas:
- Navegação SPA sem reload
- Event listeners para interatividade
- Manipulação DOM eficiente
- Design patterns modernos
- Tratamento de erros robusto

---

**✅ Exercício implementado com sucesso! Todos os requisitos foram atendidos e superados com funcionalidades extras.**
