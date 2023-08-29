# Pós Tech FIAP - Tech Challenge - SOAT1 - Grupo 5

Projeto do curso da pós tech Fiap Arquitetura de Software

## Update Fase 2 - Kubernetes

Para executar os Pods da Fase 2, consultar a wiki:
https://github.com/karineriquena/fiap-soat1-tech-challenge/wiki/Fase-2

## Documentação DDD

Pode acessar a wiki deste projeto:

https://github.com/karineriquena/fiap-soat1-tech-challenge/wiki/Fase-1

## Como rodar o projeto (Fase 1 - Docker)

Fazer o clone e ir na pasta do projeto (por exemplo: fiap-soat1-tech-challenge)

```shell
cd fiap-soat1-tech-challenge
```

Subir os contâineres do MongoDB e do Node usando o arquivo docker-compose.yml:

```shell
docker compose -f docker-compose.yml up -d
```

Verificar se subiram os containeres fastFoodMongodb e fastFoodApi:

```shell
docker ps
```

## Documentação das API's

Em qualquer navegador acessar a url:

```shell
http://localhost:6001/api-docs
```

## Chamando as API's

Em uma ferramenta como POSTMAN ou INSOMNIA executar por exemplo (também é possível testar no swagger):

```shell
http://localhost:6001/api/produtos/lanche
```

> Retorna os produtos na categoria lanche
