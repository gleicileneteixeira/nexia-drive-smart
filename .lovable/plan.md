## Avaliação por estrelas do app

Adicionar um pedido de avaliação (1 a 5 estrelas + comentário opcional) que aparece ao usuário em momentos estratégicos e fica salvo no banco para você acompanhar no admin.

### Quando aparece
Um modal discreto (não bloqueia o app, pode fechar com "Agora não") disparado quando **qualquer** destas condições acontecer, a primeira que bater:

1. Ao **terminar um simulado** (na tela de resultado), depois de 2 segundos.
2. Ao **navegar entre abas** (ex.: sair do Simulado e ir para Placas) — só depois que o usuário já usou o app por pelo menos ~1 minuto na sessão.
3. Como fallback, no **login**, se já se passaram 3+ dias desde o cadastro e ainda não avaliou.

Regras para não ser chato:
- Nunca aparece mais de 1 vez por sessão.
- Se o usuário clicar "Agora não" ou fechar → volta a perguntar só depois de 3 dias.
- Se o usuário **avaliar**, nunca mais aparece (fica registrado que já avaliou). Fica disponível um link "Editar minha avaliação" no menu da conta caso ele queira mudar.

### Tela do modal
```text
┌─────────────────────────────────────┐
│  Como está sua experiência?         │
│  Sua nota ajuda a melhorar o app.   │
│                                     │
│      ☆  ☆  ☆  ☆  ☆                  │
│                                     │
│  Comentário (opcional)              │
│  [                              ]   │
│                                     │
│  [ Agora não ]     [ Enviar ]       │
└─────────────────────────────────────┘
```
Estrelas com hover/tap, obrigatório escolher pelo menos 1 para habilitar "Enviar".

### Painel admin
Nova aba/seção **"Avaliações"** mostrando:
- Média geral (ex.: 4,3 ★) e total de avaliações.
- Distribuição por nota (quantos deram 5, 4, 3, 2, 1).
- Lista com nome, e-mail, nota, comentário e data — com filtro por nota e export para Excel.

### Detalhes técnicos

**Banco de dados (migração)**
- Nova tabela `app_ratings` com `user_id` (único — 1 avaliação por usuário, permite update), `rating` (1–5), `comment` (texto opcional), `created_at`, `updated_at`.
- RLS: usuário lê/insere/atualiza a própria avaliação; admin lê todas (via `has_role`).
- GRANTs para `authenticated` e `service_role`.
- Nova tabela `app_rating_prompts` (ou coluna em `profiles`) para lembrar `last_prompted_at` e `dismissed_count` — usado para respeitar o "3 dias".

**Frontend**
- Novo componente `src/components/RatingPrompt.tsx` montado no `AppShell` (assim vale para qualquer rota).
- Hook `useRatingPrompt()` que decide se deve abrir, com base em:
  - Já avaliou? (consulta `app_ratings`)
  - Último prompt? (consulta `app_rating_prompts`)
  - Evento que disparou (fim de simulado / troca de aba / login).
- `simulado.tsx`: ao entrar na tela `done`, dispara evento `rating:trigger` (via callback do hook).
- `AppShell.tsx`: observa mudança de `pathname` para disparar o gatilho de "troca de aba" (com timer de sessão).
- `AppShell.tsx`: adiciona item "Avaliar o app" no dropdown da conta, para o usuário abrir manualmente / editar nota.

**Admin (`src/routes/admin.tsx`)**
- Nova aba "Avaliações" com os cards de média, distribuição e tabela paginada (reaproveita o padrão de paginação já existente).

### Fora do escopo
- Não publica avaliações em loja externa (App Store/Play Store).
- Não envia e-mail nem push pedindo avaliação.
- Não implementa moderação de comentários (admin apenas visualiza).