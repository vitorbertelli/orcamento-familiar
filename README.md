# Orçamento familiar

## Sobre

O objetivo do projeto foi desenvolver uma central que auxiliasse no controle fianaceiro. A aplicação se resume na criação de receitas e despesas, categorizadas conforme a necessidade. É possível também a visualização de um resumo mensal segundo os lucros e gastos listados na API.

## Getting Started

### Executar localmente

Antes de executar o projeto localmente, é necessário atribuir algumas variáveis de ambientes no arquivo `config.env`. Sendo elas:

`DATABASE` & `DATABASE_PASSWORD` = Para conexão com o banco de dados.

`JWT_KEY` = Secret key nessária para autenticação via JWT.

`JWT_EXPIRES_IN` & `JWT_COOKIE_EXPIRES_IN` = Tempo de expiração do token.


* Instalar as dependências necessárias
```
npm install
```

* Rodar o projeto seu servidor localhost
```
npm run dev
```

### Acessar via URL

* https://orcamento.herokuapp.com/


## JWT Authentication

Todas as rotas da aplicação são protegidas, para acessar é necessário criar uma conta de usuário e realiar o login.

* Crie uma conta de usuário em /user/signup
* Faça uma requisição POST em /user/login para receber o token de autenticação

Se tudo der certo, você vai receber essa mensagem:

~~~json
{
    "status": "success"
}
~~~

## Endpoints

| Method | Route                           | Body Params                                  |
|--------|---------------------------------|----------------------------------------------|
| GET    | /despesas                       | -                                            |
| POST   | /despesas                       | {'descricao', 'valor'}                       |
| GET    | /despesas/{id}                  | -                                            |
| PATCH  | /despesas/{id}                  | {'descricao', 'valor'}                       |
| DELETE | /despesas/{id}                  | -                                            |
| GET    | /despesas?descricao={descricao} | -                                            |
| GET    | /despesas/{ano}/{mes}           | -                                            |
| GET    | /receitas                       | -                                            |
| POST   | /receitas                       | {'descricao', 'valor'}                       |
| GET    | /receitas/{id}                  | -                                            |
| PATCH  | /receitas/{id}                  | {'descricao', 'valor'}                       |
| DELETE | /receitas/{id}                  | -                                            |
| GET    | /receitas?descricao={descricao} | -                                            |
| GET    | /receitas/{ano}/{mes}           | -                                            |
| GET    | /resumo/{ano}/{mes}             | -                                            |
| POST   | /user/signup                    | {'nome', 'email', 'senha', 'confirmarSenha'} |
| POST   | /user/login                     | {'email', 'senha'}                           |
