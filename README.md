## 🤖 API de Previdência Privada para Chatbot (NestJS)

Este projeto implementa uma API para consulta de saldo e solicitação de resgate em um contexto de previdência privada, conforme o desafio técnico proposto.

O projeto foi desenvolvido utilizando **_Node.js_** com **_TypeScript_** e o **_framework NestJS_**, seguindo uma arquitetura inspirada em **_Domain-Driven Design (DDD)_** e **_Clean Architecture_** para garantir alta **_manutenibilidade_**, **_testabilidade_** e **_separação de responsabilidades_**.

## 🎯 Objetivo da API

A API expõe dois endpoints principais para serem consumidos por um chatbot:

1. Consulta de Saldo: Retorna o saldo total e o saldo disponível para resgate do usuário.

2. Solicitação de Resgate: Permite ao usuário solicitar o resgate total ou parcial do valor disponível.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para preparar e executar a aplicação.

**_pré-requisitos_**

- Node.js (versão recomendada 20+)
- npm

**_Instalação_**

1. Clone o repositório:

```bash

git clone https://github.com/astesio/retirement-plan-stay
cd retirement-plan-stay

```

2. Instale as dependências:

```bash
npm install
```

#### Execução em Modo de Desenvolvimento

Para rodar a aplicação em modo watch (reinicia automaticamente ao salvar alterações):

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000.`

#### Execução de Testes

```bash
npm run test
# ou para o modo watch
npm run test:watch
```

## 🏗️ Modelagem e Arquitetura Proposta

O projeto está estruturado em [MONOLITO MODULAR](https://medium.com/@abel.ncm/arquitetura-monol%C3%ADtica-modular-estrutura%C3%A7%C3%A3o-escal%C3%A1vel-do-projecto-8888ed51f53b).
A arquitetura do projeto foi estruturada para ser robusta e evolutiva, focada na separação de preocupações.

- `src/domain:` Contém as regras de negócio puras (Entidades, Objetos de Valor, Erros de Domínio). Não tem dependência de infraestrutura (frameworks, bancos de dados).
  - Ex: ContributionEntity, BalanceVO.

- `src/core:` Utilitários de arquitetura que suportam o domínio e os casos de uso.
  - Ex: `Either` (para tratamento explícito de sucesso/falha), `Usecase.interface.`

- `src/Balance` e `src/Redemption` **_(Módulos)_**: Contêm as funcionalidades específicas.
  - `use-cases:` Coordena a lógica de aplicação (quem faz o quê). Implementa o fluxo de trabalho.

  - `infra/http:` Controladores NestJS, responsáveis apenas por receber a requisição HTTP, chamar o Caso de Uso correspondente e formatar a resposta.

  - `services` (em `Balance`): Contém a lógica de cálculo de saldo (Serviço de Domínio/Aplicação).

- `src/infra:` Implementações concretas de interfaces de repositório e integrações externas
  - Ex: `in-memory-contribution.repository.ts` (mock), `postgres-contribution.repository.ts` (nao implementado).

```bash
.
├── README.md
├── eslint.config.mjs
├── infra
│   ├── main.tf
│   ├── outputs.tf
│   ├── rds.tf
│   └── variables.tf
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── Balance
│   │   ├── balance.module.ts
│   │   ├── dto
│   │   │   └── consult-balance.dto.ts
│   │   ├── infra
│   │   │   └── http
│   │   │       └── balance.controller.ts
│   │   ├── services
│   │   │   └── balance-calculator.ts
│   │   └── use-cases
│   │       └── consult-balance.usecase.ts
│   ├── Redemption
│   │   ├── dto
│   │   │   └── request-redemption.dto.ts
│   │   ├── entity
│   │   │   └── redemption.entity.ts
│   │   ├── infra
│   │   │   └── http
│   │   │       └── redemption.controller.ts
│   │   ├── redemption.module.ts
│   │   └── use-cases
│   │       └── request-redemption.usecase.ts
│   ├── app.module.ts
│   ├── common
│   │   ├── auth
│   │   ├── common.module.ts
│   │   └── config
│   ├── core
│   │   ├── either.ts
│   │   └── usecase.interface.ts
│   ├── domain
│   │   ├── entities
│   │   │   └── contribution.entity.ts
│   │   ├── errors
│   │   │   ├── domain.error.ts
│   │   │   ├── empty-balance.error.ts
│   │   │   ├── insufficient-balance.error.ts
│   │   │   ├── user-not-found.error.ts
│   │   │   └── validation.error.ts
│   │   └── value-objects
│   │       └── balance.vo.ts
│   ├── infra
│   │   ├── persistence
│   │   │   ├── ports
│   │   │   │   └── contribution-repository.interface.ts
│   │   │   └── repositories
│   │   │       ├── in-memory-contribution.repository.ts
│   │   │       └── postgres-contribution.repository.ts
│   │   └── persistence.module.ts
│   └── main.ts
├── test
│   ├── Balance
│   │   └── services
│   │       └── balance-calculator.test.ts
│   ├── Redemption
│   │   └── redemption.entity.test.ts
│   ├── core
│   │   ├── either.test.ts
│   │   └── usecase.interface.spec.ts
│   ├── domain
│   │   ├── entities
│   │   │   └── contribution.test.ts
│   │   ├── errors
│   │   │   ├── domain.error.test.ts
│   │   │   ├── empty-balance.error.test.ts
│   │   │   └── validation.error.test.ts
│   │   └── value-objects
│   │       └── balance.test.ts
│   └── equal.test.ts
├── tsconfig.build.json
└── tsconfig.json
```

#### 🔗 Endpoints da API

Os endpoints podem ser consultados no endereço do [Swagger](http://localhost:3000/api)
