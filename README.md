<h1> NodeJS & Typescript </h1>

Configurações iniciais para projetos de backend utilizando nodeJS.

Referência da Rocketseat: https://www.youtube.com/watch?v=rCeGfFk-uCk

<h2>PADRÃO</h2> 

1. yarn init -y #(Parâmetro -y faz com que aceite todas as configurações)
2. yarn add -D typescript #(Instalando o typescript em modo de desenvolvimento)
3. yarn tsc --init #(Criando as configurações do typescript)

<h2>Lib Express</h2> 
   <ol>
      <li>yarn add express</li>
      <li>yarn add -D @types/express #(A lib express não traz por padrão os types, então precisa adicionar nas DevDeP.)</li>
   </ol>

<h2>Convertendo código TS para JS (Para produção)</h2> 

<p style="font-size: 10pt;">Poderiamos usar simplesmente o comando "yarn tsc", porém não é a melhor maneira. Então em desenvolvimento usamos ferramentas para automatizar a execução do código Typescript, sem precisar ficar executando uma versão do código Javascript toda vez.</p>

1. yarn -D ts-node-dev #(Essa é uma ferramente que une 3 em 1, tsc(converte o código ts -> js) + node(executa o código) + nodemon(Observa mudanças))

   ## Executando o script

   1.1 - yarn ts-node-dev src/server.ts #(Roda o servidor, e todas as alterações atualiza automaticamente, sempre precisar subir outro servidor)

   # Podemos simplificar usando scripts que podem se adicionados no package.json para executar no terminal

   1.1.1 - "dev": "ts-node-dev src/server.ts"
   1.1.2 - "dev": "ts-node-dev --respawn src/server.ts" #(Flag para não deixar nenhum processo vivo)
   1.1.3 - "dev": "ts-node-dev --respawn --transpile-only src/server.ts" #(Flag para ignorar erros na tipagem do código, ele simplesmente execute, pois demora mais para executar, isso deixamos que o Eslint cuide!)
   1.1.4 - "dev": "ts-node-dev --respawn --transpileOnly --ignore-watch node_modules src/server.ts" #(Flag para ignorar as mudanças que ocorrem no node_modules, dando uma rapidez na execução)
   1.1.5 - "dev": "ts-node-dev --respawn --transpileOnly --ignore-watch node_modules --notify false src/server.ts" #(Flag para remover a notificação, opcional utilizá-la)

# <-- .gitignore -->

1. Criar o .gitignore #(Ignorar o upload de arquivos "desnecessários" ou "confidenciais")

   1.1 - Criar manualmente e adicionar os arquivos (node_modules, dist, etc...)

   1.2 - npx gitignore node - #(Criar através do npx, que gera um gitignore com possíveis arquivos que podem ser ignorados);

# <-- Encurtando Imports (paths) e Algumas configurações adicionais no tsconfig -->

Quando compilamos o código TS para JS, por padrão ele é gerado na mesma pasta, então podemos definir a configuração para uma nova pasta chamada "dist"

1.  {
    "compilerOptions" : {

       <!-- Neste caso o arquivo principal está na src -->

    "rootDir": "./src", - Está configuração depende de adicionar outra camada chamada "include", depois do "compilerOptions"

       <!-- Diretório onde o arquivo .js vai ficar depois do build -->

    "outDir": "./dirt",

       <!-- Permite que arquivos .js possam ser importados no typescript -->

    "allowJs" : true,

       <!-- Lib -->

    "lib" : ["es6"],

       <!-- Permite sobrescrever tipagens prontas-->

    "typeRoots": [

       <!-- Procurar os typesRoots nessas pastas -->

    "./node_modules/@types",

       <!-- Estrutura criada manualmente, na qual podemos sobrescrever as tipagens -->

    "./src/@types"
    ]

       <!-- Remove todos os comentários no processo de build  -->

    "removeComments": true,

       <!-- "Por alto"!!, obriga um função a retorna o arquivo tipado. Quando desabilitado podemos retornar valores nulos. -->

    "strict" : true,

       <!-- Emitir no processo de build os metadas dos decorators para fazer isso funcionar em produção (Muito usado com TypeORM, sequelize...)-->

          "experimentalDecoratos" : true,
          "emitDecoratorMetadata" : true,

       <!-- Permite importação de arquivos Json dentro do código -->

          "resolveJsonModule": true,

       <!-- Configurando caminhos para facilitar na importação de arquivos do próprio ambiente de desenvolvimento -->

          "baseUrl": ".", // Caminho base no qual vai procurar os arquivos
          "paths": {

       <!-- @nome/* : ["directorio/*"] -->
       <!-- {
                @nome = nome para importação,
                /* = tudo que vier depois,
                ["caminho"/*]
             } -->

             "@models/*" : ["./src/models/*"],
             "@views/*" : ["./src/views/*"],
             "@controllers/*" : ["./src/controllers/*"],
             "@configs/*" : ["./src/configs/*"],
          }

    },
    "include": [
    "src/**/*"
    ]
    }

2)  Caso utilize o atalho de paths no seu projeto, é necessário adicionar uma outra dependência para que o ts-node-dev reconheça esses novos atalhos de directórios

    2.1 Dependência de configurações de paths

    - yarn add -D tsconfig-paths

      2.2 Adicionar novas configurações no script de execução "dev" no arquivo package.json

    - "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only --ignore-watch node_modules --no-notify src/server.ts"

# <- Configurando o ESLINT para definir um padrão de código na aplicação e para todos que utilizarem o projeto adotarem esse padrão ->

1. Adicionando dependência

   - yarn add -D eslint

2. Criando arquivo de configuração do eslint

   - yarn eslint --init (https://prnt.sc/liqlaXE-6ZCm)
   - Referência de configurações do eslint Diego-Rocketseat: https://github.com/diego3g/node-microservices-ddd/blob/master/packages/server/.eslintrc.json

3. Instalando as dependências pendentes do eslint
   - yarn add -D @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.25.2 @typescript-eslint/parser@latest

# <-- Configurando o Jest para realizar testes -->

1. Adicionando dependência

   - yarn add -D jest
   - yarn add -D @types/jest
   - yarn add -D ts-jest

2. Criando arquivo de configuração do jest

   - yarn jest --init (https://prnt.sc/0C8av6s8pgEv)

3. Habilitando o jest no eslint

   - "env": {"jest": true}

4. Configurações principais do arquivo jest.config.ts
   - clearMocks: true,
   - preset: 'ts-jest',
   - testEnvironment: 'node'

Por enquanto apresentou erros, então ignorei essa opção e passei a importar os arquivos de maneira padrão (../../models)

5. Caso estejamos utilizando o atalho de importação de arquivos precisaremos configurar o jest.config.ts também.
   <!-- Importando o compilerOptions do arquivo tsconfig -->
   - import { compilerOptions } from './tsconfig.json'
     <!-- Importe do plugin para mapear os directorios -->
   - import { pathsToModuleNameMapper } from 'ts-jest'
     <!-- Adicionando configuração ao jest.config.ts -->
   - moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
     <!-- Necessário adicionar o include no arquivo tsconfig.json -->
     "include": [
     "src/**/*"
     ]

# <-- Adicionando o BABEL para facilitar a execução do código javascript depois do build -->

Poderiamos utilizar uma ferramenta chamada tsc paths para fazer o replace e transformar todas as importações, porém podemos usar o babel que tem todas as funcionalidades integradas

1. Instalando a dependências do babel
   - yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver

2. Criar o arquivo de configuração babel.config.js na raíz
   - Configuração utilizada neste projeto: https://prnt.sc/fyw3I-gouv9C 

3. Criar o script que vai gerar a build no package.json
   - "build": "babel src --extensions \".js,.ts\" --out-dir dist --copy-files --no-copy-ignored"

4. Criando o .eslintignore para o eslint não ficar tentando corrigir os códigos javascript
   - dist
   - /*.js

5. Criando script para executar a aplicação em produção
   - "start": "node dist/server.js"

5. Projeto pronto para Build
