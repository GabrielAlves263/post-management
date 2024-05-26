# Post Management API

## Descrição
A Post Management API é uma aplicação desenvolvida em Node.js utilizando Express para o gerenciamento de posts. A API oferece funcionalidades para criar, ler, atualizar e deletar posts, além de gerenciar usuários e autenticação. 

## Tecnologias Utilizadas
- **Node.js**: Plataforma de execução para JavaScript no lado do servidor.
- **Express**: Framework web para Node.js.
- **Joi**: Biblioteca de validação de dados.
- **MySQL2**: Driver para conectar com banco de dados MySQL.
- **Bcrypt**: Biblioteca para hashing de senhas.
- **body-parser**: Middleware para analisar o corpo das requisições.
- **JWT (jsonwebtoken)**: Biblioteca para criação e verificação de tokens JWT.
- **Multer**: Middleware para upload de arquivos.
- **uuid**: Biblioteca para criação de identificadores únicos.
- **Jest**: Framework de testes unitários.
- **Babel**: Compilador JavaScript para utilizar as funcionalidades mais recentes da linguagem.
- **Swagger**: Ferramenta para documentação de APIs.

## Funcionalidades
- **Autenticação de Usuários**
  - Registro de usuários
  - Login de usuários
  - Autenticação via JWT
- **Gerenciamento de Posts**
  - Criação de novos posts
  - Leitura de posts existentes
  - Atualização de posts
  - Deleção de posts
- **Upload de Arquivos**
  - Upload de imagens para posts

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/post-management.git
   cd post-management

2. Instale as dependências:
   ```bash
   npm install

3. Configure as variáveis de ambiente no arquivo .env:
   ```
   PORT=3000
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=senha
   MYSQL_DATABASE=nome_do_banco
   MYSQL_PORT=porta_do_banco
   JWT_KEY=seu_segredo_jwt

4. Inicie a aplicação
    ```bash
    npm start src/server.js

# Uso

## Endpoints
A documentação completa dos endpoints pode ser acessada via Swagger em: http://localhost:3000/docs

## Testes
Para rodar os testes unitários, utilize o comando:
   ```bash
   npx jest