# 💈 Barbershop Booking System

Sistema completo de agendamento para barbearias, permitindo que clientes realizem reservas de horários e que administradores gerenciem todos os atendimentos através de um painel seguro, intuitivo e responsivo.

---

## 🚧 Status do Projeto

✅ Concluído *(em fase de aprimoramentos finais)*

---

## ✨ Funcionalidades

- 🔐 **Autenticação e Controle de Acesso**
  - Login seguro utilizando JWT e Cookies.
  - Proteção de rotas.
  - Controle de acesso baseado em permissões (Role-Based Access).

- 📊 **Painel Administrativo**
  - Visualização de todos os agendamentos.
  - Interface intuitiva para gerenciamento dos atendimentos.

- 🔍 **Filtros e Ordenação**
  - Filtragem por status:
    - Ativo
    - Concluído
    - Cancelado
  - Ordenação por data através de Query Parameters na URL.

- ✏️ **Gerenciamento de Agendamentos**
  - Alteração do status de um agendamento diretamente pelo painel.
  - Atualização automática da interface após alterações.
  - API utilizando o método `PATCH`.

- 📱 **Design Responsivo**
  - Interface moderna desenvolvida com Tailwind CSS.
  - Componentes reutilizáveis.
  - Layout adaptado para dispositivos móveis.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Phosphor Icons

### Backend
- Next.js API Routes (Serverless)

### Banco de Dados
- PostgreSQL
- Aiven Cloud
- SSL Connection Pool

### Autenticação
- JWT
- Cookies Seguros

---

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Acesse a pasta do projeto

```bash
cd nome-do-projeto
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto contendo as credenciais do banco de dados e as chaves de autenticação.

Exemplo:

```env
DATABASE_URL=...
JWT_SECRET=...
```

### 5. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🤝 Contribuições

Contribuições são sempre bem-vindas!

Caso encontre algum problema ou tenha sugestões de melhorias, fique à vontade para abrir uma **Issue** ou enviar um **Pull Request**.

---

## 👨‍💻 Autor

Desenvolvido por **Enzo**.
