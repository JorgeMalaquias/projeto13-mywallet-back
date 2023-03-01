# MyWallet API

API Restful de suporte da aplicação [MyWallet](https://github.com/JorgeMalaquias/projeto13-mywallet-front)!
É responsável pelo cadastro, gerenciamento e listagem de informações sobre usuários, seus dados, e suas movimentações financeiras!

## Tecnologias empregadas
![Javascript]
![Node JS]
![Express JS]

## Como rodar localmente em sua máquina

   **OBS:É necessário ter Node JS e mongoDB (ou pode ser usado Mongo Atlas) instalados globalmente!!!**
   
1. Iniciar o servidor do mongo. Com um terminal aberto, rodar o comando:

```bash
mongod --dbpath ~/.mongo  
```

2. Criar um arquivo .env, com variáveis de ambiente baseadas no arquivo .env.example, e atribuir o seguinte endereço à variavél _MONGO_URI_:

```json
"mongodb://localhost:27017"
```

Esse endereço só funcionará se estiver sendo usado o mongoDB localmente. Caso, por exemplo, esteja sendo usado o banco de dados atráves do mongo atlas, utilizar o endereço fornecido lá.

3. Com um  terminal aberto na pasta do projeto, rodar o comando: 

```bash
npm i   
```

4. Com um  terminal aberto na pasta do projeto, rodar o comando: 

```bash
npm start   
```

## Como rodar localmente em sua máquina em desenvolvimento

1. Realizar os passos 1 ao 3 descrito em "Como rodar localmente em sua máquina".

2. Com um  terminal aberto na pasta do projeto, rodar o comando: 

```bash
npm run dev   
```
## Endpoints da api

### POST `/sign-up`

É o endpoint responsável pelos cadastros de novos usuários. Necessita dos seguintes parâmetros enviados no corpo da requisição:

`name`: uma string composta por letras apenas;  
`email`:uma string em formato de email válido;  
`password`: uma string qualquer.

exemplo:

```json
{
  "name": "Jefferson da Silva",
  "email": "jeffersonsilva@email.com",
  "password": "adedanha"
}
```

O `email` informado não pode pertencer há uma usuário previamente cadastrado.

Possíveis retornos da api:

**StatusCode**: 201  
**Dados**:  
**Descrição**: Foi feito com sucesso o cadastro do usuário com dados informados na requisição

**StatusCode**: 409  
**Dados**: 'The informed email is already been used!'  
**Descrição**: O cadastro não foi feito, pois já existe um usuário cadastrado com o email informado na requisição

**StatusCode**: 422  
**Dados**:  
**Descrição**: O corpo da requisição não é válido. Podem haver valores inválidos, ou valores obrigatórios que não foram informados.

### POST `/sign-in`

É o endpoint responsável pelo login de usuários já cadastrados. Necessita dos seguintes parâmetros enviados no corpo da requisição:

`email`:uma string em formato de email válido;  
`password`: uma string qualquer.

exemplo:

```json
{
  "email": "jeffersonsilva@email.com",
  "password": "adedanha"
}
```

O `email` informado deve pertencer há uma usuário previamente cadastrado, e `password` deve ser idêntica a senha cadastrada do usuário em questão.

Possíveis retornos da api:


**StatusCode**: 200  
**Dados**:
```json
{
  "token": "f6f42c49-c27f-4688-bde9-40ae9732bc85",
  "name": "Jefferson da Silva"
}
```
**Descrição**: Foi feito com sucesso o login do usuário com dados informados na requisição. São retornados dados do usuário. Conforme o exemplo logo acima.

**StatusCode**: 422  
**Dados**:  
**Descrição**: O corpo da requisição não é válido. Podem haver valores inválidos, ou valores obrigatórios que não foram informados.

**StatusCode**: 401  
**Dados**: 'Invalid Credentials'  
**Descrição**: Os dados informados não são válidos. Ou a senha é incorreta, ou até mesmo o email não foi cadastrado previamente.

### DELETE `/log-out`

É o endpoint responsável por encerrar uma sessão de um usuário. Necessita do token do usuário sendo informado via headers em formato, conforme exemplo abaixo:

```json
"headers": {
            "Authorization": `Bearer f6f42c49-c27f-4688-bde9-40ae9732bc85`
        }
```

O `token` informado deve ser o mesmo que foi gerado e retornado pela api no endpoint `POST '/sign-in'`.

Possíveis retornos da api:


**StatusCode**: 204
**Dados**:
**Descrição**: A atual sessão do usuário em questão foi encerrada com sucesso.

**StatusCode**: 401  
**Dados**: 'Invalid Credentials'  
**Descrição**: Os dados informados não são válidos. Ou a senha é incorreta, ou até mesmo o email não foi cadastrado previamente.

### GET `/records`
É o endpoint responsável por listar todos os registros de despesas e receitas de um usuário. Esse usuário será identificado de acordo com token informado via headers, comforme exemplo a seguir:

```json
"headers": {
            "Authorization": `Bearer f6f42c49-c27f-4688-bde9-40ae9732bc85`
        }
```

Possíveis retornos da api:


**StatusCode**: 200
**Dados**:
```json
[
  {
    "_id": "63fea5cf21a2fb4f5aefc2cf",
    "price": 500,
    "name": "payment",
    "type": "input",
    "date": "28/02",
    "userId": "63fea25321a2fb4f5aefc2cb"
  },
  {
    "_id": "63fea5da21a2fb4f5aefc2d0",
    "price": 600,
    "name": "another payment",
    "type": "input",
    "date": "28/02",
    "userId": "63fea25321a2fb4f5aefc2cb"
  },
  {
    "_id": "63fea5db21a2fb4f5aefc2d1",
    "price": 600,
    "name": "another payment",
    "type": "input",
    "date": "28/02",
    "userId": "63fea25321a2fb4f5aefc2cb"
  },
  {
    "_id": "63fea5db21a2fb4f5aefc2d2",
    "price": 600,
    "name": "another payment",
    "type": "input",
    "date": "28/02",
    "userId": "63fea25321a2fb4f5aefc2cb"
  },
  {
    "_id": "63fea5dc21a2fb4f5aefc2d3",
    "price": 600,
    "name": "another payment",
    "type": "input",
    "date": "28/02",
    "userId": "63fea25321a2fb4f5aefc2cb"
  }
]
```
**Descrição**: Será retornado um array com os registros do usuário no formato do exemplo acima. Caso o usuário não possua registros, será retornado um array vazio.


**StatusCode**: 401  
**Dados**: 'Invalid Credentials'  
**Descrição**: O token informado é inválido.

### POST `/records`
É o endpoint responsável pela criação de um novo registro, seja despesa ou receita. Só é possível a criação, com autenticação de usuário sendo informado o token da sessão corrente deste usuário via headers, conforme exemplo:

```json
"headers": {
            "Authorization": `Bearer f6f42c49-c27f-4688-bde9-40ae9732bc85`
        }
```
Também deve ser informado no corpo da requisição os seguintes parâmetros:
`price`: um número, podendo ser não inteiro;
`name`: uma string qualquer;
`type`: precisa ser 'input' ou 'output'.

exemplo:
```json
{
  "price": 600,
  "name": "another payment",
  "type": "input"
}
```

Possíveis retornos da api:


**StatusCode**: 201
**Dados**:
**Descrição**: O registro foi criado com sucesso.


**StatusCode**: 401  
**Dados**: 'Invalid Credentials'  
**Descrição**: O token informado é inválido.

**StatusCode**: 422  
**Dados**:  
**Descrição**: O corpo da requisição não é válido. Podem haver valores inválidos, ou valores obrigatórios que não foram informados.
