# Barbershop Booking System

Este projeto é um sistema completo de agendamento de serviços para barbearia, permitindo que clientes marquem horários e que administradores gerenciem o fluxo de atendimentos de forma dinâmica através de um painel de controle seguro e intuitivo.

## 🚧 Status do Projeto

Concluído / Em fase de aprimoramento final.

## ✨ Funcionalidades Implementadas

* **Autenticação e Controle de Acesso:** Sistema de login seguro com tokens e validação de rotas para administradores (Role-based access).
* **Painel Administrativo (Dashboard):** Visualização completa da listagem de agendamentos.
* **Filtros Dinâmicos e Ordenação:** Filtragem por status dos agendamentos (Ativo, Concluído, Cancelado) e ordenação por data utilizando Query Parameters na URL.
* **Gerenciamento de Status:** Capacidade para o administrador alterar o status de um agendamento diretamente pela interface (com rotas de API em método `PATCH` e atualização automática da tabela).
* **Design Responsivo:** Interface moderna desenvolvida com Tailwind CSS e componentes customizados.

## 🛠 Tecnologias Utilizadas

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Phosphor Icons.
* **Backend:** Next.js API Routes (Serverless).
* **Banco de Dados & Infraestrutura:** PostgreSQL (hospedado na Aiven com conexão SSL segura via Pool).
* **Autenticação:** Cookies seguros e JWT.

## 🚀 Como rodar o projeto


1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
Instale as dependências:


npm install
Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto com as credenciais do seu banco de dados e chaves de segurança.

Execute o projeto em ambiente de desenvolvimento:


npm run dev
Acesse http://localhost:3000 no seu navegador.

🤝 Contribuições
Contribuições são muito bem-vindas! Sinta-se à vontade para abrir uma issue para relatar bugs ou sugerir melhorias.

Desenvolvido por Enzo.
