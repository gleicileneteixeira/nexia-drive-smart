## Modal unificado: estrelas + contribuição

Combino o modal de estrelas atual com um bloco de contribuição (LivePix) em um único pop-up, com as travas de tempo que você pediu e um histórico de cliques em "Contribuir" no admin.

### Comportamento do modal

Um pop-up só, com duas ações independentes:

```text
┌──────────────────────────────────────────┐
│  Como está sua experiência?              │
│  Sua nota ajuda a melhorar o app.        │
│                                          │
│      ☆  ☆  ☆  ☆  ☆                       │
│  Comentário (opcional)                   │
│  [                                    ]  │
│                    [ Enviar avaliação ]  │
│  ────────────────────────────────────    │
│  Contribua com o projeto                 │
│  Sugerimos R$ 10,00, mas você pode       │
│  apoiar com qualquer valor para nos      │
│  ajudar a manter o app ativo.            │
│                       [ Quero Contribuir]│
│  ────────────────────────────────────    │
│                             [ Agora não ]│
└──────────────────────────────────────────┘
```

- "Enviar avaliação": salva estrelas + comentário (fluxo atual) e fecha.
- "Quero Contribuir": registra o clique, marca `statusContribuicao = "ja_ajudou"`, abre `https://livepix.gg/gleicilene` em nova aba e fecha.
- "Agora não": marca `statusContribuicao = "agora_nao"` + `dataUltimaVisualizacao = agora` e fecha.
- Clicar fora / fechar no X = mesma coisa que "Agora não".

### Travas de tempo (LocalStorage)

Chaves novas: `statusContribuicao` (`ja_ajudou` | `agora_nao`) e `dataUltimaVisualizacao`.

- `ja_ajudou`: modal nunca mais abre sozinho.
- `agora_nao`: modal só reabre automaticamente após 72h.
- Se já avaliou (fluxo atual de estrelas) mas ainda não contribuiu, o modal continua podendo abrir — sempre que abrir, mostra as estrelas em modo "atualizar" e o bloco de contribuição normal.
- Botão do menu "Avaliar o app" IGNORA todas as travas (`ja_ajudou`, `agora_nao`, 72h, "1x por sessão") e abre imediatamente. Continua chamando "Avaliar o app".

### Gatilhos automáticos

- Gatilho A (fim de simulado): dispara 2s depois de terminar/enviar o simulado (já existe hoje, permanece).
- Gatilho B (troca de aba do navegador): via Page Visibility API — quando o documento volta a `visible` depois de estar `hidden`, e o usuário já acumulou ≥ 1 minuto de uso no app na sessão. Substitui o gatilho atual de "troca de rota interna".

Ambos respeitam as travas. Login não é mais gatilho automático.

### Admin — aba "Avaliações"

Mantém a estrutura atual (média, distribuição por estrela, lista de comentários, filtro por nota, export para Excel) e ganha, logo abaixo, uma segunda seção:

- Card "Total de cliques em contribuição" + "Últimos 7 dias".
- Tabela "Histórico de Cliques em Contribuição" com colunas: nome, e-mail, data/hora do clique. Paginada como as outras.
- Filtro de data (intervalo) aplicável tanto à lista de estrelas quanto à lista de contribuições (dois date pickers no topo da aba).
- Botão "Exportar para Excel" com dois arquivos: `avaliacoes.xlsx` e `contribuicoes.xlsx` (ou uma planilha com duas abas — o que já for consistente com o padrão atual do admin).

### Detalhes técnicos

- Nova tabela `contribution_clicks` (`id`, `user_id`, `clicked_at`) — cada clique em "Quero Contribuir" grava uma linha (permite ver quantas vezes cada pessoa clicou). RLS: usuário insere só o próprio clique; admin lê tudo. GRANTs para `authenticated` e `service_role`.
- `RatingPrompt.tsx`: adiciona o bloco de contribuição, a lógica de `statusContribuicao`/`dataUltimaVisualizacao`, a exceção "manual ignora travas", e troca o observador de `pathname` por um `visibilitychange` (Page Visibility API) mantendo o mínimo de 1min de sessão. Mantém o gatilho de fim de simulado.
- `admin.tsx`: adiciona a subseção "Histórico de Cliques em Contribuição" na aba Avaliações, com filtro de data compartilhado e export.
- Sem mudanças no `AppShell` além das já existentes (o item "Avaliar o app" continua igual).

### Fora do escopo

- Não integra com API do LivePix (não há confirmação de pagamento, só registro do clique).
- Não envia e-mail, push, nem moderação de comentários.
