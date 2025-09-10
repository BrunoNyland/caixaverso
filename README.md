# Exercício - Página de Cadastro de Usuário


# Implemente um fluxo completo de cadastro e login de usuário utilizando HTML, CSS e JavaScript, com comunicação a uma API fictícia. O fluxo deve contemplar validações, persistência e edição de dados do cliente. 

# Passos do Exercício:
● Criar uma página inicial com um campo de digitação de e-mail e um botão 'Avançar'.
● Ao clicar em 'Avançar', realizar uma pesquisa em uma API verificando se o e-mail já está
cadastrado.
● Se o e-mail já existir, direcione o usuário para a página de senha para autenticação.
● Se o e-mail não existir, abrir um formulário de cadastro contendo os seguintes campos:
○ Email (pré-preenchido e não editável)
○ Nome (pelo menos 3 caracteres)
○ Telefone ddd + número
○ Endereço (pelo menos 3 caracteres)
○ CPF
○ Senha (mínimo 8 caracteres, contendo pelo menos uma letra maiúscula e um número)
● Aplicar validações e formatações corretas em todos os campos.
● Ao submeter o formulário, enviar os dados informados para a API no formato JSON.
● Após o cadastro, permitir que o cliente faça login utilizando e-mail e senha.
● Ao autenticar, a API deve retornar um token de acesso. Esse token deve ser salvo.
● Com o token salvo, exibir uma tela com os dados cadastrais do cliente.
○ Extra: Implementar funcionalidade para editar os dados do cliente após estar
logado.
Esse exercício deverá ser feito em grupos de 4 pessoas, com entrega através de repositório no
github. apenas um projeto por grupo precisa ser entregue.
