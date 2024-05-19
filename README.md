<div id="header">
   <p align="center">
      <img src="/@assets/logo/polymorphicus-philosophus-logo.svg" width="200px" align="center" alt="polymorphicus-philosophus-logo" />
   <h1 align="center">Polymorphicus Philosophus</h1>
   </p>
</div>

<br/>

## :brain: Introdução

Nesse repositório, será construída a mesma API diversas vezes, entretanto, uma vez para cada linguagem de programação que eu for aprendendo ao longo das décadas. Toda vez que eu aprender uma linguagem nova, refarei a API com a nova tecnologia aprendida.

## :scroll: Sobre

As APIs terão como tema principal filósofos e escolas da filosofia que foram criadas ao decorrer da história. O banco de dados será centralizado e compartilhado por todas elas e os arquivos do banco de dados [PostgreSQL](https://www.postgresql.org/) podem ser acessados [aqui](/database/). No decorrer do documento, serão descritas funcionalidades e requisitos que todas as APIs deverão cumprir, cada uma resolvendo as demandas dentro do ecossistema de cada linguagem.

## :tongue: Linguagens

Abaixo, as linguagens em que a API foi feita:

- [TypeScript](/source/typescript/)

## :purple_circle: API

Todas as APIs manipularão um banco de dados em comum, as tabelas e seus relacionamentos estão explicitados no diagrama abaixo:

<p align="center">
      <img src="/@assets/docs/uml-database.svg" align="center" alt="uml-database" />
</p>

### :game_die: Tabelas

- **philosopher**: Tabela de filósofos, nela estarão as informações básicas dos filósofos;
- **philosophy_school**: Tabela de escolas filosóficas, nela estarão as informações básicas das escolas filosóficas;
- **philosopher_school**: Tabela associativa entre filósofos e escolas filosóficas, possui a relação filósofo-escola;
- **quote**: Tabela de citações e frases conhecidas de filósofos;
- **daily_quote**: Tabela de citações diárias, nela estará a citação diária, e também o histórico de todos os dias anteriores;
- **user**: Tabela de usuários, nela estarão os dados dos usuários para autenticação.

### :gear: Funcionalidades

#### :purple_heart: Health Check

Para conferência da saúde da API, será disponibilizada uma rota `GET /api/`, onde será retornado o status da aplicação. Caso se mostre necessário retornar dados adicionais sobre a API, pode ser utilizada essa rota.

**Essa rota não precisa exigir autenticação*

#### :lock: Autenticação

Para essa funcionalidade, serão necessários dois endpoints: 

- **`POST: /api/register`**: responsável por interagir com a tabela *user*, criando novos usuários para controle de acesso;
- **`POST: /api/session`**: responsável por validar a existência do cadastro de um usuário e geração de um token JWT para uso.

Essas duas rotas da API não precisarão de autenticação, pois serão abertas para uso. Todas as outras deverão possuir controle de acesso, exigindo token antes de realizar qualquer outra ação. 

#### :heavy_plus_sign: Criações

Serão disponibilizados cinco endpoints para criação de informações dentro da API:

- **`POST: /api/school`**: responsável por receber as informações de uma escola filosófica e a registrar no banco de dados;
- **`POST: /api/philosopher`**: responsável por receber as informações de um filósofo e o código identificador de uma escola filosófica já criada e registrar o filósofo e o vincular à escola informada;
- **`POST: /api/philosopher/link`**: responsável por receber o código identificador de um filósofo e o código identificador de uma escola filosófica, e realizar o vínculo entre os dois no banco de dados;
- **`POST: /api/quote`**: responsável por receber uma citação e o código identificador de um filósofo e a registrar no banco de dados;
- **`POST: /api/quote/list`**: responsável por receber uma lista de citações e o código identificador de um filósofo e a registrar todas elas no banco de dados.

**Todos os endpoints devem exigir autenticação*

#### :mag_right: Buscas

Serão disponibilizados sete endpoints para busca de informações:

- **`GET: /api/school`**: responsável por retornar uma lista de escolas filosóficas;
- **`GET: /api/school/:id`**: responsável por retornar uma escola literária específica e todos os filósofos vinculados a ela;
- **`GET: /api/philosopher`**: responsável por retornar uma lista de filósofos;
- **`GET: /api/philosopher/:id`**: responsável por retornar um filósofo específico e todas as citações vinculadas a ele;
- **`GET: /api/quote`**: responsável por trazer uma lista de citações paginadas. Retornará vinte itens por página;
- **`GET: /api/quote/random`**: responsável por retornar uma citação aleatória de um filósofo. O filósofo pode ser informado como parâmetro opcional, caso seja necessária uma citação aleatória de um filósofo específico; 
- **`GET: /api/quote/daily`**: responsável por retornar uma citação de um filósofo diferente a cada dia.

**Todos os endpoints devem exigir autenticação*

#### :page_facing_up: Swagger

Será disponibilizada uma rota `GET /api-docs` para documentação via Swagger de todos os endpoints.

**Essa rota não precisa exigir autenticação*

#### :test_tube: Testes

A API deve possuir testes automatizados em seus endpoints e/ou em suas camadas mais internas que contemplem a lógica principal de cada funcionalidade.

#### :stopwatch: CronJob

A API deve possuir uma rotina que deve atualizar a citação do endpoint `GET: /api/quote/daily` diariamente.

### :bookmark_tabs: Resumo dos Requisitos

- [X] Um endpoint voltado para a saúde da aplicação
  - [X] Rota pública `GET /`
- [X] Dois endpoints voltados para autenticação
  - [X] Rota pública `POST: /api/register`
  - [X] Rota pública `POST: /api/session`
- [X] Cinco endpoints voltados a criação de entidades
  - [X] Rota autenticada `POST: /api/school`
  - [X] Rota autenticada `POST: /api/philosopher`
  - [X] Rota autenticada `POST: /api/philosopher/link`
  - [X] Rota autenticada `POST: /api/quote`
  - [X] Rota autenticada `POST: /api/quote/list`
- [X] Sete endpoints voltados a busca de entidades
  - [X] Rota autenticada `GET: /api/school`
  - [X] Rota autenticada `GET: /api/school/:id`
  - [X] Rota autenticada `GET: /api/philosopher`
  - [X] Rota autenticada `GET: /api/philosopher/:id`
  - [X] Rota autenticada `GET: /api/quote`
  - [X] Rota autenticada `GET: /api/quote/random`
  - [X] Rota autenticada `GET: /api/quote/daily`
- [X] Swagger em todas as rotas
  - [X] Rota pública `GET /api-docs`
- [X] Testes automatizados onde for possível testar
- [X] Uma rotina de execução diária
