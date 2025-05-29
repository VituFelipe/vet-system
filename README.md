# API de Gerenciamento de Serviços Veterinários

Este projeto consiste em um conjunto de APIs RESTful para gerenciar serviços veterinários, incluindo autenticação de usuários, cadastro de animais, pessoas e serviços.

## Como Rodar o Sistema

Siga estas instruções para configurar e executar o backend da API no seu ambiente local:

1.  **Pré-requisitos:**
    * [Node.js](https://nodejs.org/) (versão LTS recomendada) instalado.
    * [npm](https://www.npmjs.com/) (instalado com o Node.js).
    * [MongoDB](https://www.mongodb.com/) instalado e rodando na sua máquina (a URI de conexão padrão é `mongodb://localhost:27017/vet_system`).

2.  **Clonar o Repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd vet-system
    ```

3.  **Instalar Dependências:**
    ```bash
    npm install
    ```

4.  **Configurar Variáveis de Ambiente:**
    * Crie um arquivo `.env` na raiz do projeto (se ainda não existir) e adicione as seguintes variáveis, ajustando-as conforme necessário:
        ```env
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/vet_system
        JWT_SECRET=sua_chave_secreta_aqui
        ```
        Substitua `sua_chave_secreta_aqui` por uma string secreta forte para a geração de tokens JWT.

5.  **Iniciar o Servidor:**
    ```bash
    npm start
    ```
    Ou, se você não tiver o script `start` configurado no `package.json`:
    ```bash
    node index.js
    ```
    O servidor backend estará rodando na porta especificada no arquivo `.env` (padrão: `http://localhost:3000`).

## Endpoints Disponíveis

Todas as rotas da API estão prefixadas com `/api`.

### 1. API de Autenticação (`/api/auth`)

* **`POST /register`**: Registra um novo usuário.
    * **Corpo da Requisição (JSON):**
        ```json
        {
            "email": "novo_usuario@email.com",
            "password": "senha123"
        }
        ```
    * **Resposta (Sucesso - 201 Created):**
        ```json
        {
            "message": "Usuário registrado com sucesso."
        }
        ```
    * **Resposta (Erro - 400 Bad Request):**
        ```json
        {
            "message": "Erro ao registrar usuário.",
            "error": "Mensagem de erro detalhada"
        }
        ```

* **`POST /login`**: Faz login e retorna um token JWT.
    * **Corpo da Requisição (JSON):**
        ```json
        {
            "email": "usuario@email.com",
            "password": "senha"
        }
        ```
    * **Resposta (Sucesso - 200 OK):**
        ```json
        {
            "token": "seu_token_jwt_aqui"
        }
        ```
    * **Resposta (Erro - 401 Unauthorized):**
        ```json
        {
            "message": "Credenciais inválidas."
        }
        ```
    * **Resposta (Erro - 500 Internal Server Error):**
        ```json
        {
            "message": "Erro ao fazer login.",
            "error": "Mensagem de erro detalhada"
        }
        ```

### 2. API de Animais (`/api/animais`)

* **`POST /`**: Cadastra um novo animal (requer token JWT).
    * **Corpo da Requisição (JSON):**
        ```json
        {
            "nome": "Rex",
            "especie": "Cachorro",
            "raca": "Labrador",
            "idade": 3,
            "tutor": "ID_DO_TUTOR_NO_MONGODB"
        }
        ```
    * **Cabeçalho da Requisição:** `Authorization: Bearer <seu_token_jwt>`
    * **Resposta (Sucesso - 201 Created):** Retorna o objeto do animal criado.
    * **Resposta (Erro - 400 Bad Request):** Erro ao criar o animal.
    * **Resposta (Erro - 401 Unauthorized):** Token não fornecido ou inválido.

* **`GET /`**: Lista todos os animais (requer token JWT).
    * **Cabeçalho da Requisição:** `Authorization: Bearer <seu_token_jwt>`
    * **Resposta (Sucesso - 200 OK):** Retorna um array de objetos de animais, com os dados do tutor populados.
    * **Resposta (Erro - 500 Internal Server Error):** Erro ao listar os animais.
    * **Resposta (Erro - 401 Unauthorized):** Token não fornecido ou inválido.

### 3. API de Pessoas (`/api/pessoas`)

* **`POST /`**: Cadastra uma nova pessoa (requer token JWT).
    * **Corpo da Requisição (JSON):**
        ```json
        {
            "nome": "João da Silva",
            "cpf": "123.456.789-00",
            "telefone": "(16) 99999-8888",
            "endereco": "Rua das Flores, 123"
        }
        ```
    * **Cabeçalho da Requisição:** `Authorization: Bearer <seu_token_jwt>`
    * **Resposta (Sucesso - 201 Created):** Retorna o objeto da pessoa criada.
    * **Resposta (Erro - 400 Bad Request):** Erro ao criar a pessoa.
    * **Resposta (Erro - 401 Unauthorized):** Token não fornecido ou inválido.

* **`GET /`**: Lista todas as pessoas (requer token JWT).
    * **Cabeçalho da Requisição:** `Authorization: Bearer <seu_token_jwt>`
    * **Resposta (Sucesso - 200 OK):** Retorna um array de objetos de pessoas.
    * **Resposta (Erro - 500 Internal Server Error):** Erro ao listar as pessoas.
    * **Resposta (Erro - 401 Unauthorized):** Token não fornecido ou inválido.

### 4. API de Serviços (`/api/servicos`)

* **`POST /`**: Registra um novo serviço (requer token JWT).
    * **Corpo da Requisição (JSON):**
        ```json
        {
            "tipo": "Consulta",
            "data": "2025-05-30T10:00:00.000Z",
            "valor": 150.00,
            "status": "agendado",
            "animal": "ID_DO_ANIMAL_NO_MONGODB"
        }
        ```
    * **Cabeçalho da Requisição:** `Authorization: Bearer <seu_token_jwt>`
    * **Resposta (Sucesso - 201 Created):** Retorna o objeto do serviço criado.
    * **Resposta (Erro - 400 Bad Request):** Erro ao criar o serviço.
    * **Resposta (Erro - 401 Unauthorized):** Token não fornecido ou inválido.

* **`GET /`**: Lista todos os serviços (requer token JWT).
    * **Cabeçalho da Requisição:** `Authorization: Bearer <seu_token_jwt>`
    * **Resposta (Sucesso - 200 OK):** Retorna um array de objetos de serviços, com os dados do animal populados.
    * **Resposta (Erro - 500 Internal Server Error):** Erro ao listar os serviços.
    * **Resposta (Erro - 401 Unauthorized):** Token não fornecido ou inválido.

## Como Gerar e Usar o Token JWT

1.  **Gerar o Token:**
    * Faça uma requisição `POST` para o endpoint `/api/auth/login` com suas credenciais de usuário (email e senha) no corpo da requisição JSON.
    * Se as credenciais forem válidas, a resposta conterá um token JWT no campo `token`.

2.  **Usar o Token:**
    * Para acessar as rotas protegidas (todas as rotas em `/api/animais`, `/api/pessoas` e `/api/servicos`), você precisa incluir o token JWT no cabeçalho `Authorization` da sua requisição HTTP.
    * O formato do cabeçalho deve ser: `Authorization: Bearer <seu_token_jwt>`.
    * Substitua `<seu_token_jwt>` pelo token que você recebeu na resposta da requisição de login.

## Exemplos de Uso das APIs

### Usando `curl`

1.  **Registrar um novo usuário:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"email": "novo_usuario_curl@email.com", "password": "senha_curl"}' http://localhost:3000/api/auth/register
    ```

2.  **Fazer login e obter o token:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"email": "novo_usuario_curl@email.com", "password": "senha_curl"}' http://localhost:3000/api/auth/login
    ```
    Anote o token retornado na resposta.

3.  **Cadastrar um novo animal (requer token):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <seu_token_jwt>" -d '{"nome": "Bolt", "especie": "Cachorro", "raca": "Border Collie", "idade": 5, "tutor": "ID_DO_TUTOR_NO_MONGODB"}' http://localhost:3000/api/animais
    ```
    Substitua `<seu_token_jwt>` pelo token obtido no login e `ID_DO_TUTOR_NO_MONGODB` pelo ID de uma pessoa cadastrada no banco.

4.  **Listar todos os animais (requer token):**
    ```bash
    curl -X GET -H "Authorization: Bearer <seu_token_jwt>" http://localhost:3000/api/animais
    ```
    Substitua `<seu_token_jwt>` pelo seu token.

### Usando Postman

1.  **Configurar o Postman:**
    * Baixe e instale o Postman da [página oficial](https://www.postman.com/).
    * Crie uma nova coleção para o seu projeto.

2.  **Exemplos de Requisições:**
    * **Registrar Usuário:**
        * Método: `POST`
        * URL: `http://localhost:3000/api/auth/register`
        * Corpo: `raw` -> `JSON` com o exemplo fornecido acima.
    * **Login:**
        * Método: `POST`
        * URL: `http://localhost:3000/api/auth/login`
        * Corpo: `raw` -> `JSON` com o exemplo fornecido acima.
    * **Cadastrar Animal:**
        * Método: `POST`
        * URL: `http://localhost:3000/api/animais`
        * Corpo: `raw` -> `JSON` com o exemplo fornecido acima (substitua o ID do tutor).
        * Cabeçalho: Adicione um cabeçalho `Authorization` com o valor `Bearer <seu_token_jwt>` (substitua pelo seu token).
    * **Listar Animais:**
        * Método: `GET`
        * URL: `http://localhost:3000/api/animais`
        * Cabeçalho: Adicione um cabeçalho `Authorization` com o valor `Bearer <seu_token_jwt>`.

Esta documentação deve fornecer as informações necessárias para que outros desenvolvedores (ou você mesmo no futuro) possam entender e utilizar sua API de gerenciamento veterinário. Lembre-se de adaptar os exemplos e as explicações conforme você adiciona mais funcionalidades (como rotas para atualizar e excluir registros).
