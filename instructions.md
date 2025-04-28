# Take Home Code Challenge

O objetivo deste Take-Home Challenge é, mais do que seu currículo, formação e certificações, avaliaremos como você lida com esse desafio, a qualidade do seu código e a maneira de pensar nele.

## 📝 O que nós avaliaremos?
- Seu estilo de codificação;
- Conhecimento nos frameworks e tecnologias propostas;
- Boas práticas;
- Testes;
- Suas habilidades sobre ler e aplicar UI/UX.

## 🔒 Quais as regras?
- Seu código deverá ser disponibilizado na entrega como um bundle;
- Idealmente, você pode entregar o desafio no prazo combinado. Mas se precisar de mais tempo, avise-nos;
- Faça um Readme explicando suas soluções;

## 🎯 Sobre o Desafio
Desenvolvemos um projeto do Cinema Fácil, esse projeto foi desenvolvido com o objetivo de ser um teste técnico dos processos seletivos. O projeto contém duas telas e segue o fluxo para a reseva do ingresso de um filme no cinema, onde primeiro você escolhe o filme, depois seleciona a sessão, os assentos e finaliza, conectado com uma api fake ([json-server](https://github.com/typicode/json-server/)).
Todas essas etapas já estão desenvolvidas, porém você vai perceber que não foi usada nenhuma boa prática de codificação, tornando o código acoplado e complexo de manutenção.
Nosso objetivo é avaliar como você vai lidar com esse cenário, onde será necessário aplicar boas práticas de isolamento de código, desacoplamento, alta coesão, e MUITA criatividade para tornar essas telas melhores.
Ficaremos surpresos se colocar em práticas os fundamentos de [S.O.L.I.D](https://pt.wikipedia.org/wiki/SOLID)

Além dessa etapa para você refatorar o código, você também deverá criar uma nova tela que está disponibilizada por um arquivo do Figma, no próximo tópico vamos explicar melhor sobre os critérios de aceite do desafio.

## 🚀 Critérios de Aceite
Separamos o desafio em três etapas para você desenvolver e seguir os respectivos critérios de aceite:

### Primeira Etapa
No projeto já existem duas telas que seguem o padrão do Figma, que é a tela inicial e a tela de checkout dos ingressos. Como dito anteriormente, essas telas foram desenvolvidas sem nenhuma boa prática de código. O seu objetivo nessa primeira etapa é refatorar e melhorar todo esse código já existente, mantendo o fluxo completo do projeto.

- [ ] Aplicar boas práticas no código usando SOLID e [Ports and Adapters](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))
- [ ] Corrigir e criar testes unitários que faltam.
> Só para constar: Aqui no projeto (real), exigimos 100% de cobertura de código (front e back), ou seja, quanto mais próximo aos 100%, melhor 😉

### Segunda Etapa
Com a primeira etapa feita e os arquivos iniciais reestruturados, agora você precisa criar uma nova página no projeto, essa página tem o objetivo de ser uma área de gestão do cinema, onde você tem informações sobre os filmes, as vendas e outros itens, para isso você deve seguir exatamente o layout proposto no figma, que está disponibilizado da pasta "Figma", e também considerar os seguintes critérios:
- [ ] A página deve listar horizontalmente os filmes mostrando apenas a capa deles.
- [ ] A listagem deve conter um scroll horizontal personalizado.
- [ ] Deve ser possível clicar em alguma capa de filme e exibir os detalhes deste filme.
- [ ] O filme selecionado deve sair da lista horizontal de filmes mostrando os detalhes abaixo.
- [ ] Deve-se exibir duas informações totais (espectadores e receita), somando de todas as sessões.
- [ ] Cada sessão deve exibir uma lista de clientes, contendo nome, assento e valor.
- [ ] Cada sessão deve exibir o total de espectador e o total de receita.

### Etapa Bônus
Como você deve ter notado, os filmes listados pela API `/films` estão muito defasados, portanto, nosso Product Owner definiu para usarmos uma API mais atual, portanto o Arquiteto do time escolheu o portal [themoviedb.org](https://www.themoviedb.org/) por ter uma API aberta contendo os filmes reais que estão atualmente nos cinemas. 😁
Pensando nisso, mude a implementação para que em vez buscar o catálogo da API fake, seja carregado os detalhes dos filmes que estão nos cinemas.
Pode modificar a API `/films` para melhor atender a esse requisito (como sessão, preço e etc).

## ⚠️ Importante considerar
- O fluxo precisa estar completo com tela inicial, checkout e gestão
- Para a segunda etapa, deve-se seguir o layout proposto no Figma
- O layout deve ser responsivo
- Para os testes unitários deve usar a biblioteca padrão do vitest (já configurada no projeto)
- Deve-se adotar boas práticas de javascript/typescript
- Importante que os testes tenham 100% de coverage
- Se adicionar funcões novas, ou bibliotecas, mapear no readme e justificar

## 📩 Como entregar
Você deve disponibilizar seu código em um arquivo bundle, assim que finalizar, envie o bundle em anexo para o e-mail barbara.santos@facilinformatica.com.br para avaliarmos e te dar um retorno o mais rápido possível.

⚠️ Lembre-se de criar o arquivo README com todas as instruções de como executar, do que foi feito e a motivação de cada decisão e escolhas. Isso será muito importante para entendermos o porque das coisas.

## Vai algumas dicas e comandos para te ajudar
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

Boa sorte! 😎
