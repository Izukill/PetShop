<div align="center">
    <h1>🐾 PetControl App V1</h1>

 ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
 ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
 ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

 <br>
 <img src="/home/izuki/Documentos/PetShop/pet-shop/assets/images/mewo.png" alt="Mewo pet" width="280">
 
</div>

## 📑 Sumário

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [🎯 Objetivos e Funcionalidades](#-objetivos-e-funcionalidades)
- [🧪 Stack Tecnológica](#-stack-tecnológica)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚡ Quick Start](#-quick-start)
- [🏗️ Arquitetura e Salvamento de Dados (Mock API)](#-arquitetura-e-salvamento-de-dados-mock-api)
- [📝 Padrão de Commits](#-padrão-de-commits)

## 📖 Sobre o Projeto

O **PetControl** é um aplicativo mobile desenvolvido para a gestão completa de clínicas veterinárias e petshops. Desenvolvido para a matéria de Programação de dispositívos móveis.

Atualmente, o aplicativo opera de forma sem backend real, utilizando uma arquitetura simulada em memória antes da integração com uma API definitiva.

## 🎯 Objetivos e Funcionalidades (V1)

* **Gestão de Clientes:** CRUD completo com listagem, busca dinâmica, criação, edição e inativação (Soft Delete).
* **Gestão de Pets:** Controle de animais vinculados aos seus respectivos donos (Relacionamento 1:N simulado).
* **Gestão de Funcionários:** Controle da equipe com auto-incremento de matrículas.
* **Filtros e Navegação Cruzada:** Acesso rápido aos pets de um cliente específico ou ao dono de um pet diretamente pelos cartões da lista.
* **Dashboard Inicial com dados Mockados:** Tela inicial com resumo financeiro, atalhos de ações rápidas, agenda do dia e avisos do sistema com dados mockados para ser implementado posteriormente com uma api real.

---

## 🧪 Stack Tecnológica

| Tecnologia | Descrição |
|------------|----------|
| React Native | Framework principal para desenvolvimento Mobile |
| Expo | Toolchain e plataforma para compilação rápida |
| Expo Router | Roteamento baseado em arquivos (File-based routing) |
| TypeScript | Tipagem estática para segurança do código |
| UUID | Geração de identificadores únicos universais |

---

## 📁 Estrutura do Projeto

    pet-shop/
    ├── app/                          # Rotas e Telas (Expo Router)
    │   ├── (tabs)/                   # Navegação principal inferior (Bottom Tabs)
    │   │   ├── _layout.tsx           
    │   │   ├── agendamentos.tsx      
    │   │   ├── cadastros.tsx         
    │   │   ├── catalogo.tsx          
    │   │   ├── index.tsx             # Tela de Home (Dashboard)
    │   │   └── vendas.tsx            
    │   │
    │   └── cadastros/                # Telas de Formulários e Listagens (CRUD)
    │       ├── clientes/             
    │       │   ├── editar/
    │       │   │   └── [lookupId].tsx
    │       │   ├── index.tsx
    │       │   └── novo.tsx
    │       ├── funcionarios/         
    │       │   ├── editar/
    │       │   │   └── [lookupId].tsx
    │       │   ├── index.tsx
    │       │   └── novo.tsx
    │       └── pets/                 
    │           ├── editar/
    │           │   └── [lookupId].tsx
    │           ├── index.tsx
    │           └── novo.tsx
    │
    ├── assets/                       
    │
    ├── components/                   # Componentes visuais reutilizáveis (UI)
    │   ├── clientes/                 
    │   ├── funcionarios/ 
    │   ├── layout/                   
    │   └── pets/                     
    │  
    │
    ├── data/                         # Data Layer (Banco de Dados Local em RAM)
    │   ├── clientes.ts           
    │   ├── funcionarios.ts       
    │   └── pets.ts               
    │
    └── services/                     # Configuração de Serviços e Integrações
        └── api.ts                    # Roteador Mock da API
---

## ⚡ Quick Start

### Pré-requisitos
* Node.js (versão LTS recomendada)

* Expo CLI instalado globalmente

* Aplicativo Expo Go instalado no seu celular (para testes físicos) ou um Emulador

---

Siga os passos abaixo para rodar a aplicação localmente:

### 1. Clone o projeto e acesse a pasta

```bash
git clone https://github.com/Izukill/PetShop
cd PetShop
cd pet-shop
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor do Expo

```bash
npx expo start
```

Após o comando, escaneie o QR Code gerado no terminal com o aplicativo Expo Go no seu celular, ou pressione a para abrir no emulador Android.

---

## 🏗️ Arquitetura e Salvamento de Dados (Mock API)

Como este projeto ainda não possui um Backend e Banco de Dados reais (Node, Spring, Postgres, etc.), utilizei um padrão de arquitetura focado em In-Memory Storage, ou seja salva apenas na memória ram.


O fluxo de salvamento funciona em 3 camadas:

### 1. A Camada de Interface (UI)

As telas do aplicativo (ex: tela de Novo Pet) efetuam chamadas HTTP <strong> simuladas </strong> , aguardando um promese:

```text
await api.post("/pet", { nome: "Rex" raca:"Pug" }, ...);
```

### 2. O Roteador Central (src/services/api.ts)

Este arquivo atua como o "Axios" virtual do projeto. Ele intercepta a requisição e roteia a string da URL (ex: /pet) para a classe de dados correspondente.

Fiz isso apenas para ser mais simples quando for conectar com o back não ter que alterar tanto as requisições das telas apenas modificar o arquivo api.ts

### 3. A Camada de Dados / In-Memory Storage (src/data/)

Os arquivos dentro da pasta data recebem a requisição e atuam sobre Arrays Globais em Memória RAM (ex: let pets = []).

---

## 📝 Padrão de Commits

Para manter o histórico do repositório limpo, rastreável e padronizado usando prefixos convencionais, utilizei as seguintes regras de commit:

| Tipo     | Descrição                                                                                   | Exemplo de Uso                                                  |
|:---------|:--------------------------------------------------------------------------------------------|:----------------------------------------------------------------|
| feat     | Introdução de um recurso totalmente novo no sistema ou no código.                           | feat: implementacao do endpoint de criar pedido                 |
| refactor | Refatoração de código, melhora de lógicas ou de algum sistema sem alterar comportamento.    | refactor: isolamento do card de cliente em um componente        |
| fix      | Resolução de um bug, erro ou ajuste de comportamento incorreto de algo já entregue.         | fix: correcao do loop infinito no useEffect de funcionarios     |
| remove   | Exclusão de arquivos, limpeza de código morto ou remoção de configurações antigas.          | remove: exclusao do AsyncStorage em prol do banco em RAM        |
| chore    | Adição/Edição de documentação, arquivos de build ou ferramentas.                            | chore: atualização do arquivo README com a nova arquitetura     |