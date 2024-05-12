<div id="header">
   <p align="center">
      <img src="/@assets/logo/polymorphicus-philosophus-logo.svg" width="200px" align="center" alt="polymorphicus-philosophus-logo" />
   <h1 align="center">Polymorphicus Philosophus</h1>
   </p>
</div>

<br/>

## Introdução

Nesse repositório, será construída a mesma API diversas vezes, entretanto, uma vez para cada linguagem de programação que eu for aprendendo ao longo das décadas. Toda vez que eu aprender uma linguagem nova, refarei a API com a nova tecnologia aprendida.

## Sobre

As APIs terão como tema principal filósofos e escolas da filosofia que foram criadas ao decorrer da história. O banco de dados será centralizado e compartilhado por todas elas e os arquivos do banco de dados [PostgreSQL](https://www.postgresql.org/) podem ser acessados [aqui](/database/). No decorrer do documento, serão descritas funcionalidades e requisitos que todas as APIs deverão cumprir, cada uma resolvendo as demandas dentro do ecossistema de cada linguagem.

## Linguagens

Abaixo, as linguagens em que a API foi feita:

- [TypeScript](/source/typescript/)

## API

Todas as APIs manipularão um banco de dados em comum, as tabelas e seus relacionamentos estão explicitados no diagrama abaixo:

<p align="center">
      <img src="/@assets/docs/uml-database.svg" align="center" alt="uml-database" />
</p>

### Tabelas

- **philosopher**: Tabela de filósofos, nela estarão as informações básicas dos filósofos;
- **philosophy_school**: Tabela de escolas filosóficas, nela estarão as informações básicas das escolas filosóficas;
- **philosophers_schools**: Tabela associativa entre filósofos e escolas filosóficas, possui a relação filósofo-escola;
- **quote**: Tabela de citações e frases conhecidas de filósofos;
- **user**: Tabela de usuários, nela estarão os dados dos usuários para autenticação.