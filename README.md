# <-- PADRÃO --> 

1. yarn init -y #(Parâmetro -y faz com que aceite todas as configurações)
2. yarn add -D typescript #(Instalando o typescript em modo de desenvolvimento)
3. yarn tsc --init #(Criando as configurações do typescript)

# <-- Lib Express --> 

1. yarn add express
2. yarn add -D @types/express #(A lib express não traz por padrão os types, então precisa adicionar nas DevDeP.)

# <-- Convertendo código TS para JS (Para produção) --> 

## Poderiamos usar simplesmente o comando "yarn tsc", porém não é a melhor maneira. Então em desenvolvimento usamos ferramentas para automatizar a execução do código Typescript, sem precisar ficar executando uma versão do código Javascript toda vez. 

1. yarn -D ts-node-dev #(Essa é uma ferramente que une 3 em 1, tsc(converte o código ts -> js) + node(executa o código) + nodemon(Observa mudanças))
    
    ## Executando o script
    1.1 - yarn ts-node-dev src/server.ts #(Roda o servidor, e todas as alterações atualiza automaticamente, sempre precisar subir outro servidor)
        
        # Podemos simplificar usando scripts que podem se adicionados no package.json para executar no terminal #
        1.1.1 - "dev": "ts-node-dev src/server.ts"
        1.1.2 - "dev": "ts-node-dev --respawn src/server.ts" #(Flag para não deixar nenhum processo vivo)
        1.1.3 - "dev": "ts-node-dev --respawn --transpileOnly src/server.ts" #(Flag para ignorar erros na tipagem do código, ele simplesmente execute, pois demora mais para executar, isso deixamos que o Eslint cuide!)
        1.1.4 - "dev": "ts-node-dev --respawn --transpileOnly --ignore-watch node_modules src/server.ts" #(Flag para ignorar as mudanças que ocorrem no node_modules, dando uma rapidez na execução)
        1.1.5 - "dev": "ts-node-dev --respawn --transpileOnly --ignore-watch node_modules  --no-notify src/server.ts" #(Flag para remover a notificação, opcional utilizá-la)


# <-- Commitando -->

1. Criar o .gitignore #(Ignorar o upload de arquivos "desnecessários" ou "confidenciais")
    1.1 - Criar manualmente e adicionar o primeiro item "node_modules" ou...
    1.2 - npx gitignore node - #(Criar através do npx, que gera um gitignore com possíveis arquivos que podem ser ignorados)