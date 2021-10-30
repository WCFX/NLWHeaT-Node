# Changelog

All notable changes to this project will be documented in this file.

## [0.0.03] - 29/10/2021

### Updated

- Criamos o sign para gerar um token.

### Updated

- Dentro do prisma, criamos um model user ( schema ) passando os valores da tabela por dentro do schema.prisma
  isto permitirá com o comando [yarn prisma migrate dev] criar automaticamente uma pasta migration e dentro
  uma migration.sql passando os dados dessa tabela para um db.
- Criamos uma pasta prisma e dentro dela um index com uma configuração que fará a configuração com o nosso db.
- Verificação se o usuário existe no DB.
- Criação do JWT_SECRET em MD5 para segurança da aplicação.

## [0.0.02] - 28/10/2021

### Updated

- Criação da pasta controllers, routes, services.
- Criamos o AuthenticateUserService, dentro dele passamos os parametros do client_id e \_secret junto do código de
  autenticação do usuário.
- Criamos tipagem para retornar os dados que estamos buscando da api do github.
- Buscando o código do usuário pelo corpo da requisição POST.
- Buscando o resultado da operação.

## [0.0.01] - 27/10/2021

### Updated

- Criação do projeto base
- Libs necessárias para criar o projeto
- Criação da configuração de Typescript
- Criação da configuração do Eslint e prettier
- Criação da pasta source e dos arquivos ali inseridos.
- Utilização do router.
- Utilização do express.json para enviar dados no corpo da requição post.
