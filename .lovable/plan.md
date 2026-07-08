# Plano: cadastro com CPF + completar dados + paginação admin

## 1. Resumo
- Incluir **CPF** no cadastro e garantir que seja único.
- Criar tela obrigatória **"Complete seu cadastro para continuar"** para novos e antigos usuários preencherem telefone, CPF e situação profissional.
- No painel admin, adicionar **paginação** na listagem de usuários com opções de 10, 20, 50 e 100 por página.

## 2. O que muda para o usuário

### Cadastro novo
- Novo campo **CPF**, obrigatório, com máscara `000.000.000-00`.
- Validação de CPF (dígitos verificadores + bloqueio de sequências inválidas como `111.111.111-11`).
- Erro claro se o CPF já estiver cadastrado.

### Ao entrar no app
- Se faltar **nome, telefone, CPF ou situação profissional**, aparece a tela:
  - **"Complete seu cadastro para continuar"**
  - Todos os dados já cadastrados aparecem para edição.
  - E-mail fica em modo leitura.
  - Campos faltantes são destacados.
  - Sem botão "Depois" — só libera o app após salvar.

### Painel admin
- Nova coluna **CPF** na tabela e no export Excel/CSV.
- Paginação com opções: **10, 20, 50, 100** usuários por página.
- Controles: página anterior/próxima, indicador "Página X de Y".

## 3. Diagrama da tela "Complete seu cadastro"

```text
┌─────────────────────────────────────────┐
│  Complete seu cadastro                  │
│  Para continuar, preencha os campos     │
│  abaixo. Você pode editar os dados já   │
│  cadastrados.                           │
│                                         │
│  Nome completo *                        │
│  [ Maria Silva                  ]       │
│                                         │
│  E-mail (não editável)                  │
│  [ maria@email.com              ] 🔒    │
│                                         │
│  CPF *                                  │
│  [ 000.000.000-00               ] ⚠    │
│                                         │
│  Telefone *                             │
│  [ (00) 00000-0000              ]       │
│                                         │
│  Situação profissional *                │
│  [ Selecione…                ▾  ] ⚠    │
│                                         │
│       [   Salvar e continuar   ]        │
└─────────────────────────────────────────┘
```

## 4. Detalhes técnicos

### Banco de dados
- Adicionar **índice único parcial** em `profiles.cpf` para bloquear CPF duplicado sem quebrar perfis antigos sem CPF.
- Atualizar trigger `handle_new_user` para capturar `cpf` do `raw_user_meta_data`.

### Validação de CPF
- Criar utilitário `src/lib/cpf.ts` com máscara, limpeza e validação de dígitos verificadores.

### Cadastro (`src/routes/auth.tsx`)
- Adicionar campo CPF obrigatório com máscara.
- Enviar CPF no `signUp options.data.cpf`.
- Tratar erro `23505` (CPF ou e-mail duplicado) com mensagem amigável.

### Tela de completar cadastro (`src/components/ProfilePrompt.tsx`)
- Buscar `display_name, email, cpf, phone, employment_status, employment_other`.
- Mostrar todos os campos; e-mail desabilitado.
- Validar CPF antes de salvar.
- Não permitir fechar sem salvar.
- Reabrir automaticamente se dados continuarem incompletos.

### Painel admin (`src/routes/admin.tsx`)
- Adicionar estado de paginação: `page` e `pageSize` (10, 20, 50, 100).
- Calcular `paginatedUsers` a partir de `filtered`.
- Adicionar seletor de itens por página e botões de navegação.
- Adicionar coluna CPF na tabela e nos exports.

## 5. Fora do escopo
- Não altera login/senha.
- Não altera papéis (admin).
- Não valida CPF na Receita Federal — apenas formato e dígitos verificadores.
