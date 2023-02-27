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
mongodb://localhost:27017
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
