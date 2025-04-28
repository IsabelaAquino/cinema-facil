# Cinema fácil 
Projeto do cinema fácil foi criado com vite e material ui. Adicionei ao projeto do cinema o uso de Typescript nos componentes. obtei por não criar os arquivos de css separados e usar o css-inline do material como seguia o modelo inicial do projeto até mesmo por se tratar de um projeto mais simples e com poucas telas. 

# Resumo das decições tomadas 
1- No primeiro contato com o projeto percebi que a rota de listar os filme estava sendo chamada de forma errada gerando um looping infinito de requisições, corrigi esse problema e criei um service para organizar e facilitar o consumo das rotas da api-fake, também tipei (interfaces) os dados da api para facilitar a manipulação deles e mitigar os erros, também fiz alguns ajustes de layout. Posteriormente componentizei o box de exibição dos filmes (BoxFilmList) pois tinha intenção de reutilizá-lo no painel administrativo. Na tela de checkout componentizei os assentos (seats) pois eu achei que ficaria mais organizado do que deixar uma função dentro do componente de checkout como estava antes. Adicinei um skeleton loading nos cards de exibição dos filmes pensando em melhorar a usabilidade em caso de demora de retorno dos dados da api (pensando em um projeto que consome uma api real), e também adicionei um alerta de erro em caso de alguma falha, utilizei o componente de alert já existente com algumas modificações que fiz nele passando =o para TS e assim adicionei os teste desse skeleton e do alert no arquivo de SelectionPage.test e criei os testes do componente de Checkout de que faltavam (optei por testar se a reserva estava sendo criada com sucesso, adicinei um disabled no button de confirmar caso ele não esteja preenchido para melhorar a ui/ux mas tomei o cuidado de validar nos testes garantindo que a reserva só vai ser adicionada com um nome).

2- Criei um esquema de rota utilizando ```react-router-dom``` afim de criar o componente de administração do cinema, criei uma rota privada para acessar esse painel administrativo.
Como o projeto não tem tela de login/autenticação criei uma variável booleana para controlar o acesso a rota que chamei de /admin e também criei uma rota de acesso negado para simular o controle de acesso e restrição da página de administração.

``` A rota /admin está com acesso bloqueado no arquivo de App do projeto para modificar basta alterar a variável isAuthenticated para true ``` 

3- Criei uma pasta private para os componentes do painel adiministrativo. Optei por deixar um usuário escolher um ou mais assentos como já estava sendo assim no total de espectatores somei a quantidade de assentos ao invez de somar a quantidade de reservas. Usei a função de reduce do JS para fazer esses calculos.  

Obs: criei um arquivo .env para adicionar as variaveis de ambiente do projeto, o ideal é não subir esse arquivo mas como trata-se de um projeto de teste eu mantive. Não adicionei nenhuma nova biblioteca, optei por estrutura o que já havia e fazer a nova tela (painel adm) usando os recursos que adicionei. Em relação a etapa bonus eu criei um conta na moviedb e gerei uma chave de api para consumo dos dados deixei o service da apiMovieDb configurado em com o endpoint de get dos filmes funcionando, deixei um exemplo de consumo na aplicação comentado no arquivo SectionPage cabe resaltar que para o projeto funcionar integralmente com a api do MovieDB teriamos que modificar a interface de filmes, reservas, adequando-as para os dados retornados na api do moviedp que segue uma estrutura de dados diferente, como a api do moviebd também é paginada caberia também uma implementação de infine scroll ou algum tipo de paginação dos filmes listados como uma melhoria. 

### :rocket: Comandos
- Executar a API fake (`porta 3000`)
```bash
npm run fake:api
```

- Subir a aplicação web em `http://localhost:5173`
```bash
npm run dev
```

- Executar os testes sem `watch mode`
```bash
npm run test
```

- Executar os testes no `watch mode`
```bash
npm run test:dev
```

- Relatório de cobertura de testes ([Istanbul](https://istanbul.js.org/))
```bash
  npm run coverage
```

- Crie um [git bundle](https://git-scm.com/docs/git-bundle) com o seu trabalho para entrega
```bash
git bundle create nome-sobrenome.bundle HEAD main
```
