# Pós Tech FIAP - Tech Challenge - SOAT1 - Grupo 5

Projeto do curso da pós tech Fiap Arquitetura de Software

## Como rodar o projeto

Subir os contâineres do MongoDB e do Node usando o arquivo docker-compose.yml:

```shell
  docker compose -f docker-compose.yml up -d
```

Verificar se subiram os containeres MONGODB e NODEJS_SERVER:

```shell
  docker ps
```

Instalar as dependências do projeto:

```shell
  npm install
```

Rodar o projeto em modo de desenvolvimento:

```shell
  npm run dev
```

## Chamando as API's

Em uma ferramenta como POSTMAN ou INSOMNIA executar por exemplo:

```shell
  http://localhost:6001/api/produtos/lanche
```

> Retorna os produtos na categoria lanche
