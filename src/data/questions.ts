import type { PlacaId } from "@/components/Placa";

export type Incidence = "altissima" | "alta" | "media" | "baixa";
export type Category =
  | "legislacao"
  | "placas"
  | "direcao-defensiva"
  | "primeiros-socorros"
  | "infracoes"
  | "meio-ambiente"
  | "mecanica"
  | "prioridade";

export interface Question {
  id: string;
  category: Category;
  statement: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  detailedExplanation?: string; // texto longo para fixação e revisão
  legalBase?: string; // ex: "Art. 218 do CTB"
  commonMistake?: string; // qual pegadinha as bancas usam
  tip?: string;
  memoryHook?: string; // gancho mnemônico para memorização (frase-chave, rima, sigla, imagem mental)
  incidence: Incidence;
  trap?: boolean; // pegadinha clássica
  difficulty: 1 | 2 | 3;
  placa?: PlacaId; // placa visual oficial para questões de identificação
}

export const CATEGORY_LABELS: Record<Category, string> = {
  legislacao: "Legislação",
  placas: "Placas",
  "direcao-defensiva": "Direção Defensiva",
  "primeiros-socorros": "Primeiros Socorros",
  infracoes: "Infrações",
  "meio-ambiente": "Meio Ambiente",
  mecanica: "Mecânica Básica",
  prioridade: "Prioridade de Passagem",
};

export const INCIDENCE_META: Record<
  Incidence,
  { label: string; emoji: string; className: string; weight: number }
> = {
  altissima: {
    label: "Altíssima incidência",
    emoji: "🔴",
    className: "bg-destructive/15 text-destructive border-destructive/30",
    weight: 8,
  },
  alta: {
    label: "Cai muito",
    emoji: "🟠",
    className: "bg-warning/15 text-warning border-warning/30",
    weight: 5,
  },
  media: {
    label: "Importante",
    emoji: "🟡",
    className: "bg-warning/10 text-warning border-warning/20",
    weight: 3,
  },
  baixa: {
    label: "Revisão rápida",
    emoji: "🟢",
    className: "bg-success/15 text-success border-success/30",
    weight: 1,
  },
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "legislacao",
    statement:
      "A Carteira Nacional de Habilitação (CNH) na categoria B autoriza a condução de:",
    options: [
      "Veículos com até 3.500 kg e até 8 lugares além do motorista",
      "Motocicletas e ciclomotores",
      "Veículos articulados de carga",
      "Veículos com mais de 8 lugares além do motorista",
    ],
    correctIndex: 0,
    explanation:
      "Categoria B: veículo de até 3.500 kg de PBT e até 8 passageiros, excluído o motorista.",
    detailedExplanation:
      "A categoria B é a mais comum e habilita a dirigir automóveis de passeio, utilitários, camionetas, caminhonetes e furgões — desde que o peso bruto total (PBT) não ultrapasse 3.500 kg e a lotação seja de no máximo 8 passageiros, sem contar o motorista (regra do 8 + 1). Motocicletas exigem categoria A. Veículos acima de 3.500 kg exigem categoria C. Mais de 8 passageiros exige D. Veículos articulados ou com reboque pesado exigem E.",
    legalBase: "Art. 143 do CTB",
    commonMistake:
      "A banca costuma trocar '8 passageiros além do motorista' por '8 passageiros no total' — fique atento: são 8 + 1.",
    tip: "Decore: B = até 3.500 kg e 8 + 1.",
    incidence: "altissima",
    difficulty: 1,
  },
  {
    id: "q2",
    category: "placas",
    statement: "Placas de regulamentação possuem qual formato e cor predominante?",
    options: [
      "Triangular amarela",
      "Circular vermelha e branca",
      "Retangular azul",
      "Losango amarelo",
    ],
    correctIndex: 1,
    explanation:
      "Regulamentação = círculo com bordas vermelhas e fundo branco. Indicam proibição ou obrigação.",
    detailedExplanation:
      "As placas de regulamentação (série R) são CIRCULARES, com fundo branco, orla e tarja vermelhas e símbolo preto. Comunicam ordens e proibições — desobedecer é infração de trânsito. Exceções de formato: a placa PARE (R-1) é OCTOGONAL e a 'Dê a preferência' (R-2) é um TRIÂNGULO INVERTIDO. Mesmo com formato diferente, ambas pertencem ao grupo de regulamentação.",
    commonMistake:
      "Muitos candidatos confundem com as de advertência (losango amarelo). Regra de ouro: vermelho = obrigação; amarelo = aviso.",
    tip: "Vermelho = você é OBRIGADO a obedecer.",
    incidence: "altissima",
    difficulty: 1,
  },
  {
    id: "q3",
    category: "direcao-defensiva",
    statement:
      "Em uma via de pista dupla, ao perceber um pedestre atravessando fora da faixa, o condutor deve:",
    options: [
      "Buzinar continuamente para afastá-lo",
      "Acelerar para passar antes dele",
      "Reduzir a velocidade e dar preferência ao pedestre",
      "Manter a velocidade pois ele está em local proibido",
    ],
    correctIndex: 2,
    explanation:
      "O pedestre sempre tem preferência, mesmo fora da faixa. Direção defensiva = preservar vidas.",
    detailedExplanation:
      "O CTB classifica o pedestre como o usuário mais vulnerável da via e atribui a ele preferência absoluta, ainda que esteja em local proibido. O condutor deve reduzir a velocidade, parar se necessário e só prosseguir quando a travessia terminar. A responsabilidade pela preservação da vida é sempre do condutor — o erro do pedestre não autoriza o motorista a atropelá-lo.",
    legalBase: "Art. 29, §2º do CTB",
    commonMistake:
      "Pegadinha clássica: a banca sugere que, por estar fora da faixa, o pedestre 'perde' a preferência. ERRADO — ele continua tendo prioridade.",
    incidence: "alta",
    trap: true,
    difficulty: 2,
  },
  // ===== EXPANSÃO: simulados 2-5 (mesmo nível DETRAN) =====
  {
    id: "qe01", category: "legislacao",
    statement: "O processo de habilitação inicia-se com a abertura do RENACH no:",
    options: ["DETRAN do estado de residência", "Cartório civil", "Ministério dos Transportes", "Sindicato dos condutores"],
    correctIndex: 0,
    explanation: "O RENACH é aberto no DETRAN do estado em que o candidato reside.",
    detailedExplanation: "O RENACH (Registro Nacional de Carteiras de Habilitação) é o banco de dados nacional que unifica os registros de condutores. O processo de habilitação começa no DETRAN do estado onde o candidato reside, pois cada DETRAN é o órgão executivo de trânsito estadual responsável por emitir a CNH. Iniciar em outro estado ou órgão não seria válido, já que o RENACH é alimentado localmente e integrado ao sistema nacional. Tentar abrir em local diferente pode gerar inconsistências no prontuário e atrasar o processo.",
    legalBase: "Res. CONTRAN 168/2004", incidence: "alta", difficulty: 1
  },
  {
    id: "qe02", category: "legislacao",
    statement: "A Permissão para Dirigir tem validade de:",
    options: ["6 meses", "1 ano", "2 anos", "5 anos"],
    correctIndex: 1,
    explanation: "A PPD vale 1 ano; após esse período sem infrações graves/gravíssimas ou reincidência em média, é convertida em CNH definitiva.",
    detailedExplanation: "A Permissão para Dirigir (PPD) é a primeira fase da habilitação, com validade de 1 ano. Durante esse período, o condutor é avaliado na prática: se cometer infração grave, gravíssima ou for reincidente em infração média, a CNH definitiva não é emitida e o processo recomeça do zero. Esse período probatório existe para garantir que o condutor novato desenvolva responsabilidade no trânsito antes de obter o documento definitivo.",
    legalBase: "Art. 148, §3º CTB", incidence: "altissima", difficulty: 1
  },
  {
    id: "qe03", category: "legislacao",
    statement: "O limite de pontos para suspensão da CNH (sem infrações gravíssimas) é de:",
    options: ["10", "14", "20", "30"],
    correctIndex: 2,
    explanation: "Lei 14.071/21: 20 pontos sem nenhuma gravíssima; 16 com uma gravíssima; 14 com duas ou mais gravíssimas.",
    detailedExplanation: "A Lei 14.071/2021 alterou o sistema de pontuação para suspensão da CNH. Atualmente, o limite varia conforme a gravidade das infrações cometidas: se não houver nenhuma infração gravíssima no período, o limite é de 40 pontos; com uma gravíssima, cai para 30 pontos; com duas ou mais gravíssimas, o limite é de 20 pontos. A regra anterior dos '20 pontos fixos' não vale mais desde 2021 — por isso é importante atualizar os estudos com a nova lei.",
    legalBase: "Art. 261 CTB", commonMistake: "A regra mudou: não é mais 20 pontos fixos.", incidence: "altissima", trap: true, difficulty: 2
  },
  {
    id: "qe04", category: "legislacao",
    statement: "Para condutores que exercem atividade remunerada (EAR), o limite de pontos é:",
    options: ["20 pontos sempre", "40 pontos sempre", "Mesmo limite dos demais condutores", "Não há limite"],
    correctIndex: 2,
    explanation: "Desde a Lei 14.071/21 o limite é igual para todos; o que muda é a obrigação de exame toxicológico.",
    detailedExplanation: "Antes da Lei 14.071/2021, condutores que exercem atividade remunerada (EAR) — como motoristas de táxi, aplicativo, ônibus e caminhão — tinham um limite de pontos diferenciado. Hoje, o limite de pontos para EAR é o mesmo dos demais condutores (até 40 pontos sem gravíssimas). A diferença está na obrigatoriedade do exame toxicológico periódico para EAR, que não se aplica a condutores comuns das categorias A e B.",
    incidence: "alta", difficulty: 2
  },
  {
    id: "qe05", category: "legislacao",
    statement: "É documento obrigatório de porte do condutor:",
    options: ["CNH e CRLV", "Apenas a CNH", "Apenas o CRLV", "RG e CPF"],
    correctIndex: 0,
    explanation: "Condutor deve portar CNH (ou CNH Digital) e o CRLV do veículo (físico ou digital).",
    detailedExplanation: "Para circular legalmente, o condutor precisa portar dois documentos: a CNH (Carteira Nacional de Habilitação, que comprova sua aptidão para dirigir) e o CRLV (Certificado de Registro e Licenciamento do Veículo, que comprova que o veículo está regular). Ambos podem ser apresentados na versão digital (CDT e CRLV-e) através do aplicativo oficial, com o mesmo valor legal do documento impresso. Estar sem um deles resulta em infração e remoção do veículo.",
    legalBase: "Art. 159 CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe06", category: "legislacao",
    statement: "A categoria 'A' habilita a conduzir:",
    options: ["Carros de até 3.500 kg", "Motocicletas e ciclomotores", "Caminhões", "Ônibus"],
    correctIndex: 1,
    explanation: "Categoria A é exclusiva de motos e similares.",
    detailedExplanation: "O CTB divide as categorias de habilitação por tipo de veículo. A categoria A é destinada exclusivamente a veículos de duas ou três rodas: motocicletas, motonetas, ciclomotores e triciclos. Carros de passeio exigem categoria B, caminhões exigem C, veículos com mais de 8 passageiros exigem D, e combinações de veículos com reboque pesado exigem E. Cada categoria tem requisitos de idade e tempo de habilitação específicos.",
    legalBase: "Art. 143 CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe07", category: "legislacao",
    statement: "Conduzir veículo sem CNH ou Permissão é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Gravíssima, multa x3 e retenção do veículo.",
    detailedExplanation: "Dirigir sem possuir CNH ou Permissão para Dirigir é uma das infrações mais graves do CTB, classificada como GRAVÍSSIMA, com multa multiplicada por 3 e retenção do veículo até a apresentação de um condutor habilitado. A lógica é simples: se a pessoa não foi aprovada nos exames teórico e prático, ela não tem comprovação de que sabe dirigir com segurança, colocando em risco a própria vida e a dos outros.",
    legalBase: "Art. 162, I CTB", incidence: "altissima", difficulty: 1
  },
  {
    id: "qe08", category: "legislacao",
    statement: "A reciclagem do condutor é obrigatória quando:",
    options: ["A CNH atinge o limite de pontos e o direito de dirigir é suspenso", "A cada renovação", "A cada 5 anos sempre", "Apenas para EAR"],
    correctIndex: 0,
    explanation: "Curso de reciclagem é exigido após suspensão ou cassação.",
    detailedExplanation: "O curso de reciclagem é uma medida educativa obrigatória para quem teve o direito de dirigir suspenso ou cassado. O objetivo é reeducar o condutor, atualizando seus conhecimentos sobre legislação, direção defensiva, primeiros socorros e meio ambiente. O curso tem carga horária definida pelo CONTRAN e, ao final, o condutor precisa ser aprovado em avaliação para reaver a CNH. Não se trata de punição, mas de oportunidade de aprendizado e correção de comportamento.",
    legalBase: "Art. 268 CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe09", category: "legislacao",
    statement: "Para mudar a categoria da CNH, o condutor deve:",
    options: ["Esperar 2 anos sem infração gravíssima e nenhuma média reincidente nos últimos 12 meses", "Pagar uma taxa adicional apenas", "Solicitar imediatamente", "Aguardar 5 anos"],
    correctIndex: 0,
    explanation: "Para adição/mudança é exigido o prazo de 1 ano de habilitação e ausência de gravíssimas nos últimos 12 meses.",
    detailedExplanation: "Para mudar ou adicionar categoria (por exemplo, de B para D ou de A para B), o condutor deve cumprir requisitos específicos: ter pelo menos 1 ano de habilitação na categoria anterior, não ter cometido infração grave ou gravíssima nos últimos 12 meses, e, dependendo da categoria desejada, ter idade mínima de 21 anos (para C, D e E). Esses requisitos existem porque dirigir veículos maiores ou mais complexos exige mais experiência e maturidade.",
    incidence: "media", difficulty: 2
  },
  {
    id: "qe10", category: "legislacao",
    statement: "A idade mínima para obter CNH é:",
    options: ["16 anos", "17 anos", "18 anos", "21 anos"],
    correctIndex: 2,
    explanation: "18 anos completos.",
    detailedExplanation: "A idade mínima de 18 anos para obter a CNH está prevista no artigo 140 do CTB. O candidato também precisa saber ler e escrever, possuir CPF e documento de identidade, e ser penalmente imputável. Aos 18 anos a pessoa já responde criminalmente como adulta, o que é compatível com a responsabilidade exigida para conduzir um veículo. Para categorias profissionais (C, D e E), a idade mínima sobe para 21 anos.",
    legalBase: "Art. 140 CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe11", category: "legislacao",
    statement: "A CNH Definitiva é obtida após:",
    options: ["Aprovação direta no exame", "1 ano de PPD sem cometer infração grave/gravíssima ou reincidir em média", "Pagamento adicional", "3 anos de habilitação"],
    correctIndex: 1,
    explanation: "Conversão automática após 1 ano sem essas infrações.",
    detailedExplanation: "Após ser aprovado nos exames, o condutor recebe a Permissão para Dirigir (PPD), válida por 1 ano. Durante esse período probatório, o condutor novato precisa demonstrar que dirige com responsabilidade: se não cometer infração grave, gravíssima nem reincidir em infração média, a CNH definitiva é emitida automaticamente. Se cometer alguma dessas infrações, terá que reiniciar todo o processo de habilitação — incluindo aulas e exames.",
    legalBase: "Art. 148 CTB", incidence: "altissima", trap: true, difficulty: 2
  },
  {
    id: "qe12", category: "legislacao",
    statement: "Exame toxicológico é obrigatório para condutores das categorias:",
    options: ["A e B", "C, D e E", "Apenas D", "Todos"],
    correctIndex: 1,
    explanation: "Obrigatório para C, D e E (renovação, mudança e adição).",
    detailedExplanation: "O exame toxicológico é obrigatório para condutores das categorias C, D e E (caminhões, ônibus e veículos com reboque) tanto na obtenção quanto na renovação da CNH. O objetivo é detectar o uso de substâncias psicoativas que possam comprometer a segurança no trânsito. Motoristas de veículos pesados têm maior responsabilidade devido ao porte do veículo e ao transporte de passageiros ou cargas, justificando a exigência desse exame específico.",
    legalBase: "Art. 148-A CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe13", category: "infracoes",
    statement: "Estacionar em vaga de idoso sem credencial é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 1,
    explanation: "Média, 4 pontos.",
    detailedExplanation: "Estacionar em vaga destinada a idoso sem a credencial adequada é infração MÉDIA, com 4 pontos na CNH e multa. As vagas de idoso são garantidas por lei (Estatuto do Idoso) e exigem credencial específica fornecida pelo DETRAN ou órgão municipal. Utilizá-las indevidamente prejudica quem realmente tem direito à prioridade. Já estacionar em vaga de pessoa com deficiência sem credencial é infração GRAVÍSSIMA — a gravidade é maior.",
    legalBase: "Art. 181, XVII CTB", incidence: "media", difficulty: 1
  },
  {
    id: "qe14", category: "infracoes",
    statement: "Estacionar em vaga PCD sem credencial é infração:",
    options: ["Leve", "Grave", "Gravíssima", "Média"],
    correctIndex: 2,
    explanation: "Gravíssima, 7 pontos.",
    detailedExplanation: "Estacionar em vaga reservada para pessoa com deficiência (PCD) sem a credencial exigida é infração GRAVÍSSIMA, a mais severa da categoria de estacionamento, com 7 pontos na CNH e multa. A diferença de gravidade em relação à vaga de idoso (que é Média) reflete a proteção especial da lei às pessoas com deficiência. A vaga PCD tem dimensões maiores para permitir embarque e desembarque com cadeira de rodas, e usá-la indevidamente dificulta a mobilidade de quem realmente precisa.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe15", category: "infracoes",
    statement: "Não usar cinto de segurança é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 2,
    explanation: "Grave, 5 pontos.",
    detailedExplanation: "NÃO usar o cinto de segurança é infração GRAVE, com 5 pontos na CNH e multa. O cinto é obrigatório para TODOS os ocupantes do veículo (frente e trás), em todas as vias. Em caso de colisão, o cinto impede que o ocupante seja arremessado contra o painel, o para-brisa ou para fora do veículo, além de evitar colisões secundárias dentro da cabine. A responsabilidade pelo uso do cinto também é do condutor — ele responde pela infração mesmo quando o passageiro é quem não está usando.",
    legalBase: "Art. 167 CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe16", category: "infracoes",
    statement: "Dirigir usando celular SEGURANDO o aparelho é infração:",
    options: ["Média", "Grave", "Gravíssima", "Gravíssima multiplicada por 2"],
    correctIndex: 2,
    explanation: "Gravíssima, 7 pontos.",
    detailedExplanation: "Segurar o celular ao volante é infração GRAVÍSSIMA, com 7 pontos na CNH e multa. A Lei 14.071/2021 endureceu essa penalidade porque manusear o celular reduz drasticamente a capacidade de reação do condutor — estudos mostram que equivale a dirigir alcoolizado. Só é permitido usar o celular ao volante em modo viva-voz ou com fone, sem segurar o aparelho. Mesmo olhar a tela do celular estacionado no suporte do painel pode distrair e gerar multa.",
    legalBase: "Art. 252, §1º CTB", incidence: "altissima", difficulty: 1
  },
  {
    id: "qe17", category: "infracoes",
    statement: "Disputar corrida (racha) é infração:",
    options: ["Grave", "Gravíssima", "Gravíssima multiplicada por 10 + suspensão", "Média"],
    correctIndex: 2,
    explanation: "Gravíssima x10, suspensão do direito de dirigir e recolhimento da CNH; ainda configura crime.",
    detailedExplanation: "Disputar corrida em via pública (racha) é uma das infrações mais severas do CTB: GRAVÍSSIMA com fator multiplicador 10, suspensão imediata do direito de dirigir, recolhimento da CNH e remoção do veículo. Além da infração administrativa, o racha configura CRIME de trânsito (art. 308 do CTB), com detenção de 6 meses a 3 anos. A gravidade se justifica porque o racha coloca em risco não só os participantes, mas todos os usuários da via — pedestres, ciclistas e outros motoristas.",
    legalBase: "Art. 173/308 CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe18", category: "infracoes",
    statement: "Transitar 20% a 50% acima da velocidade permitida é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 2,
    explanation: "Grave, 5 pontos.",
    detailedExplanation: "Transitar entre 20% e 50% acima do limite de velocidade é infração GRAVE: 5 pontos na CNH e multa. O CTB divide o excesso de velocidade em faixas de gravidade crescente: até 20% acima é Média; de 20% a 50% é Grave; acima de 50% passa a ser Gravíssima com multa multiplicada por 3 e suspensão. Quanto maior a velocidade, menor o tempo de reação e maior a distância de frenagem, aumentando drasticamente o risco e a gravidade de um acidente.",
    legalBase: "Art. 218, II CTB", incidence: "altissima", difficulty: 2
  },
  {
    id: "qe19", category: "infracoes",
    statement: "Transitar acima de 50% da velocidade permitida é infração:",
    options: ["Grave", "Gravíssima x3 + suspensão", "Média", "Leve"],
    correctIndex: 1,
    explanation: "Gravíssima multiplicada por 3, com suspensão imediata.",
    detailedExplanation: "Ultrapassar o limite de velocidade em mais de 50% é infração GRAVÍSSIMA com fator multiplicador 3: o valor da multa é triplicado, além de 7 pontos na CNH e suspensão imediata do direito de dirigir. Essa é a faixa mais severa de excesso de velocidade porque representa um perigo extremo — um veículo a 90 km/h em uma via de 60 km/h, por exemplo, precisa do dobro da distância para parar. Acima de 50%, a margem de erro é mínima e as consequências de um acidente são frequentemente fatais.",
    legalBase: "Art. 218, III CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe20", category: "infracoes",
    statement: "Não dar preferência a pedestre na faixa é infração:",
    options: ["Leve", "Grave", "Gravíssima", "Média"],
    correctIndex: 2,
    explanation: "Gravíssima, 7 pontos.",
    detailedExplanation: "Não dar preferência ao pedestre que está atravessando na faixa de segurança é infração GRAVÍSSIMA, com 7 pontos na CNH e multa. O pedestre é o usuário mais vulnerável do trânsito, e a faixa a ele destinada é um instrumento para garantir sua travessia segura. Desrespeitar essa prioridade demonstra falta de direção defensiva e coloca uma vida em risco. O correto é parar antes da faixa sempre que houver pedestre aguardando ou atravessando.",
    legalBase: "Art. 214 CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe21", category: "infracoes",
    statement: "Transportar criança menor de 10 anos no banco da frente é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Gravíssima, 7 pontos.",
    detailedExplanation: "Transportar criança menor de 10 anos no banco da frente é infração GRAVÍSSIMA, com 7 pontos na CNH e multa. Crianças até 10 anos devem ocupar o banco traseiro, utilizando dispositivo de retenção adequado (bebê conforto, cadeirinha ou assento de elevação) conforme idade, peso e altura. O banco da frente expõe a criança ao risco do airbag — em caso de colisão, o airbag pode machucar gravemente uma criança pequena. A Resolução CONTRAN 819/2021 atualizou essas regras.",
    legalBase: "Art. 168 CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe22", category: "infracoes",
    statement: "Ultrapassar pela direita (salvo exceções legais) é infração:",
    options: ["Grave", "Gravíssima", "Média", "Leve"],
    correctIndex: 1,
    explanation: "Gravíssima, 7 pontos.",
    detailedExplanation: "Ultrapassar pela direita é infração GRAVÍSSIMA, com 7 pontos na CNH e multa. A ultrapassagem deve ser feita sempre pela esquerda, conforme determina o CTB. As únicas exceções são: quando o veículo da esquerda sinaliza que vai virar à esquerda (abrindo espaço), ou em vias de mão dupla com câmeras de sentido. Ultrapassar pela direita é perigoso porque o outro condutor não espera movimento rápido vindo desse lado, aumentando o risco de colisão.",
    legalBase: "Art. 199 CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe23", category: "infracoes",
    statement: "Ultrapassar em local proibido (faixa contínua, curva, ponte) é:",
    options: ["Grave", "Média", "Gravíssima multiplicada por 5", "Leve"],
    correctIndex: 2,
    explanation: "Gravíssima x5, suspensão.",
    detailedExplanation: "Ultrapassar em local proibido — como faixa dupla contínua, curvas, pontes, viadutos, túneis e aclives sem visibilidade — é infração GRAVÍSSIMA com fator multiplicador 5, além de suspensão do direito de dirigir e recolhimento da CNH. Esses locais são proibidos justamente porque a visibilidade é reduzida ou as condições da via não permitem uma ultrapassagem segura. Fazer uma ultrapassagem nessas condições pode resultar em colisão frontal, uma das mais letais.",
    legalBase: "Art. 191 CTB", incidence: "altissima", difficulty: 1
  },
  {
    id: "qe24", category: "infracoes",
    statement: "Recusar-se ao teste do bafômetro:",
    options: ["É direito do condutor sem penalidade", "Configura infração leve", "Tem a mesma penalidade de dirigir alcoolizado (gravíssima x10)", "Configura infração grave"],
    correctIndex: 2,
    explanation: "A recusa tem mesma sanção administrativa do art. 165.",
    legalBase: "Art. 165-A CTB",
    detailedExplanation: "Recusar-se a soprar o bafômetro, fazer exame de sangue ou qualquer outro procedimento que detecte álcool tem a MESMA penalidade de dirigir alcoolizado: infração GRAVÍSSIMA com multa multiplicada por 10, suspensão do direito de dirigir por 12 meses e recolhimento da CNH. Muitos condutores acham que recusar o teste e fica por isso — mas a lei preve essa penalidade justamente para evitar que motoristas embriagados escapem da fiscalizacao.",
    incidence: "altissima", trap: true, difficulty: 2
  },
  {
    id: "qe25", category: "infracoes",
    statement: "Conduzir com CNH vencida há mais de 30 dias é infração:",
    options: ["Leve", "Média", "Gravíssima", "Grave"],
    correctIndex: 2,
    explanation: "Gravíssima, 7 pontos e retenção do veículo.",
    detailedExplanation: "Dirigir com CNH vencida há mais de 30 dias é infração GRAVÍSSIMA, com 7 pontos na CNH, multa e retenção do veículo. A CNH vencida perde a validade como documento de identificação do condutor, e circular com ela vencida significa que o motorista não comprova estar apto a dirigir. O prazo de 30 dias é a tolerância legal para renovação. Após esse período, o condutor é considerado como não habilitado para efeitos da infração.",
    legalBase: "Art. 162, V CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe26", category: "infracoes",
    statement: "Buzinar em local proibido ou entre 22h e 6h é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 0,
    explanation: "Leve, 3 pontos.",
    detailedExplanation: "Buzinar em local proibido (como hospitais, escolas) ou durante o período noturno (22h às 6h) é infração LEVE, com 3 pontos na CNH e multa. A buzina deve ser usada apenas em TOQUES BREVES para advertir sobre risco iminente. Usá-la em excesso ou fora dessas situações configura poluição sonora, perturba o sossego público e pode até gerar multa por perturbação ambiental. A regra é simples: buzine só o suficiente para evitar acidentes.",
    legalBase: "Art. 227 CTB", incidence: "media", difficulty: 2
  },
  {
    id: "qe27", category: "direcao-defensiva",
    statement: "A condução defensiva visa principalmente:",
    options: ["Chegar mais rápido", "Prevenir acidentes, mesmo por erro de terceiros", "Economizar combustível", "Cumprir prazos comerciais"],
    correctIndex: 1,
    explanation: "É evitar acidentes apesar das ações erradas dos outros e das condições adversas.",
    detailedExplanation: "Direção defensiva é o conjunto de técnicas que permite ao condutor dirigir de forma a prevenir acidentes, mesmo diante de condições adversas (clima, via, trânsito) e dos erros de outros motoristas e pedestres. O foco principal NÃO é chegar rápido, economizar combustível ou cumprir prazos — embora esses benefícios possam surgir como consequência. O objetivo central é salvar vidas, antecipando situações de risco e agindo com segurança.",
    incidence: "altissima", difficulty: 1
  },
  {
    id: "qe28", category: "direcao-defensiva",
    statement: "Condições adversas de luz incluem:",
    options: ["Neblina densa", "Sol baixo no horizonte ofuscando a visão", "Pista molhada", "Pneu careca"],
    correctIndex: 1,
    explanation: "Adversidade de LUZ refere-se a sol ofuscante, escuridão, faróis altos vindo de frente etc.",
    detailedExplanation: "Condições adversas de LUZ incluem situações que afetam a visibilidade por iluminação inadequada: sol baixo ofuscante, faróis altos de veículos em sentido contrário, penumbra ao anoitecer, neblina e chuva forte. Cada tipo exige uma reação específica — desviar o olhar para a margem direita da pista quando ofuscado, acender faróis baixos ou de neblina quando necessário. Neblina é condição adversa de clima, não de luz. Pneu careca é mecânica.",
    incidence: "alta", trap: true, difficulty: 2
  },
  {
    id: "qe29", category: "direcao-defensiva",
    statement: "Para ultrapassar com segurança, o condutor deve:",
    options: ["Acelerar bruscamente sem sinalizar", "Sinalizar, verificar retrovisores e ponto cego, ultrapassar e retornar com segurança", "Buzinar e seguir", "Manter a faixa esquerda permanentemente"],
    correctIndex: 1,
    explanation: "Sequência: sinaliza → verifica → ultrapassa → retorna.",
    detailedExplanation: "A ultrapassagem segura segue uma sequência lógica: 1) sinalizar com a seta esquerda com antecedência; 2) verificar o retrovisor interno e lateral, e virar a cabeça para checar o ponto cego; 3) deslocar-se para a faixa esquerda com segurança; 4) acelerar e ultrapassar; 5) sinalizar com a seta direita e 6) retornar à faixa original só quando enxergar o veículo ultrapassado pelo retrovisor interno. Pular qualquer etapa aumenta o risco de colisão.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe30", category: "direcao-defensiva",
    statement: "Em pista molhada, a aquaplanagem é causada por:",
    options: ["Excesso de velocidade sobre lâmina d'água que faz o pneu perder contato com o solo", "Pneu quente", "Freios novos", "Câmbio automático"],
    correctIndex: 0,
    explanation: "Velocidade alta + água acumulada + pneu desgastado = perda de contato.",
    detailedExplanation: "Aquaplanagem (hidroplanagem) ocorre quando uma lâmina de água se acumula entre o pneu e o asfalto, fazendo os pneus perderem completamente o contato com o solo. As causas principais são: excesso de velocidade sobre poças d'água, pneus com sulcos desgastados (abaixo de 1,6 mm) e calibragem inadequada. O motorista perde o controle da direção e da frenagem. Para prevenir, reduza a velocidade em dias de chuva e mantenha os pneus em bom estado.",
    incidence: "alta", difficulty: 2
  },
  {
    id: "qe31", category: "direcao-defensiva",
    statement: "Em caso de aquaplanagem o condutor deve:",
    options: ["Frear bruscamente", "Tirar o pé do acelerador, segurar firme a direção e NÃO frear bruscamente", "Acelerar mais", "Virar a direção bruscamente"],
    correctIndex: 1,
    explanation: "Tirar o pé, segurar a direção, evitar freadas e movimentos bruscos até recuperar aderência.",
    detailedExplanation: "Ao sentir que o veículo está aquaplanando, a reação instintiva de frear ou virar bruscamente é justamente o que NÃO se deve fazer. O correto é: 1) tire o pé do acelerador; 2) segure o volante FIRME, mantendo a direção reta; 3) NÃO freie nem vire bruscamente — isso pode fazer o carro rodar. Em alguns veículos com freios ABS, é possível frear suavemente se houver certa aderência. Aguarde até sentir os pneus retomarem o contato com o solo.",
    incidence: "altissima", difficulty: 2
  },
  {
    id: "qe32", category: "direcao-defensiva",
    statement: "Ao dirigir cansado o condutor deve:",
    options: ["Tomar bebida energética e seguir", "Parar em local seguro para descansar", "Aumentar a velocidade para chegar logo", "Ligar o ar-condicionado no máximo"],
    correctIndex: 1,
    explanation: "Sono não se vence: pare e descanse.",
    detailedExplanation: "O cansaço e o sono ao volante são extremamente perigosos — um condutor com sono tem reflexos reduzidos, tempo de reação aumentado e pode até cochilar ao volante. Nenhum truque (energético, café, ar gelado, música alta) substitui o descanso. A única atitude segura é parar o veículo em local apropriado (posto de gasolina, área de descanso) e dormir ou descansar antes de seguir viagem. Dirigir cansado pode ser tão perigoso quanto dirigir alcoolizado.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe33", category: "direcao-defensiva",
    statement: "Ponto cego é:",
    options: ["Área não enxergada pelos retrovisores", "Farol queimado", "Para-brisa sujo", "Lâmpada queimada do painel"],
    correctIndex: 0,
    explanation: "Área lateral-traseira invisível mesmo com retrovisores ajustados; deve-se virar a cabeça antes de mudar de faixa.",
    detailedExplanation: "Ponto cego é a área lateral e traseira do veículo que não é captada pelos retrovisores interno e laterais, mesmo bem ajustados. Todo veículo tem pontos cegos, geralmente na traseira lateral (ângulo morto). O condutor deve VIRAR A CABEÇA e olhar por cima do ombro antes de mudar de faixa ou fazer conversão para garantir que não há outro veículo no ponto cego. Veículos mais modernos têm sensores de ponto cego que auxiliam, mas não substituem a verificação visual.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe34", category: "direcao-defensiva",
    statement: "À noite, em estrada sem iluminação, o farol correto é:",
    options: ["Baixo sempre", "Alto, reduzindo para baixo ao cruzar com outro veículo", "Pisca-alerta", "Meia-luz"],
    correctIndex: 1,
    explanation: "Use farol alto, baixando quando cruzar com outro condutor para não ofuscar.",
    detailedExplanation: "Em estradas sem iluminação pública, o farol ALTO deve ser usado para maximizar a visibilidade. Porém, ao cruzar com outro veículo em sentido contrário, o condutor deve REDUZIR para farol BAIXO com antecedência para não ofuscar o motorista que vem na direção oposta — a cegueira temporária causada pelo farol alto pode causar acidentes graves. O mesmo vale quando estiver seguindo outro veículo: mantenha o farol baixo para não ofuscar o retrovisor do carro à frente.",
    legalBase: "Art. 40 CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe35", category: "direcao-defensiva",
    statement: "Em túneis o farol deve estar:",
    options: ["Apagado", "Baixo ligado mesmo de dia", "Alto sempre", "Pisca-alerta"],
    correctIndex: 1,
    explanation: "Farol baixo obrigatório, independentemente da hora.",
    detailedExplanation: "Em túneis, o farol BAIXO deve estar ligado SEMPRE, mesmo durante o dia. Isso garante que o veículo seja visto pelos demais condutores e também ilumina parte da via. O farol alto não deve ser usado em túneis porque o reflexo pode ofuscar o próprio condutor e os outros. O pisca-alerta só deve ser usado em emergências ou imobilizações. O farol baixo em túneis é regra básica de segurança que salva vidas.",
    legalBase: "Art. 40 CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe36", category: "direcao-defensiva",
    statement: "Distância de frenagem aumenta com:",
    options: ["Velocidade alta, pista molhada e pneus desgastados", "Veículo leve", "Freios ABS novos", "Câmbio manual"],
    correctIndex: 0,
    explanation: "Mais velocidade e menor aderência aumentam a distância para parar.",
    detailedExplanation: "A distância de frenagem — espaço percorrido desde o momento em que o condutor pisa no freio até a parada total — aumenta com: maior velocidade (o dobro da velocidade quadruplica a distância), pista molhada ou escorregadia (reduz o atrito dos pneus com o solo) e pneus desgastados (perdem aderência). Veículos mais pesados também têm maior distância de frenagem. Manter distância de segurança adequada é essencial para compensar esses fatores.",
    incidence: "alta", difficulty: 2
  },
  {
    id: "qe37", category: "primeiros-socorros",
    statement: "A sigla PAS significa:",
    options: ["Parar-Aguardar-Sair", "Proteger-Avisar-Socorrer", "Pedir-Ajudar-Salvar", "Prevenir-Atender-Sinalizar"],
    correctIndex: 1,
    explanation: "Proteger o local, Avisar autoridades, Socorrer com cuidado.",
    detailedExplanation: "O protocolo PAS é a sequência de ações que todo condutor deve seguir ao chegar em um local de acidente: PROTEGER o local sinalizando com triângulo a 30 metros e ligando o pisca-alerta; AVISAR as autoridades ligando para o SAMU (192), Bombeiros (193) ou Polícia (190); SOCORRER as vítimas apenas se tiver conhecimento técnico. O PAS é universalmente adotado porque estabelece uma ordem lógica que evita que o socorrista se torne mais uma vítima.",
    incidence: "altissima", difficulty: 1
  },
  {
    id: "qe38", category: "primeiros-socorros",
    statement: "Para hemorragia externa intensa, o procedimento inicial é:",
    options: ["Aplicar torniquete imediatamente", "Comprimir o local com pano limpo", "Esperar socorro sem agir", "Lavar com álcool"],
    correctIndex: 1,
    explanation: "Compressão direta com pano limpo até a chegada do socorro.",
    detailedExplanation: "O primeiro procedimento para hemorragia externa intensa é a COMPRESSÃO DIRETA sobre o ferimento com um pano limpo, gaze ou até mesmo a mão (protegida por luva ou saco plástico). A compressão reduz o fluxo sanguíneo e permite a coagulação. O torniquete só deve ser usado em último caso (amputação ou hemorragia incontrolável), pois pode causar necrose e perda do membro. Lavar com álcool dói e prejudica a coagulação — não se faz isso.",
    incidence: "alta", difficulty: 2
  },
  {
    id: "qe39", category: "primeiros-socorros",
    statement: "Vítima com suspeita de fratura na coluna deve ser:",
    options: ["Movida rapidamente", "Mantida imóvel até a chegada do socorro especializado", "Colocada sentada", "Sacudida para reagir"],
    correctIndex: 1,
    explanation: "Não mover, salvo risco iminente (fogo, explosão).",
    detailedExplanation: "NUNCA mova uma vítima com suspeita de lesão na coluna. Qualquer movimento inadequado pode agravar a lesão da medula espinhal e causar paralisia permanente. A vítima deve ser mantida IMÓVEL, na posição em que se encontra, até a chegada do socorro especializado (SAMU ou bombeiros) que possui equipamentos de imobilização. A única exceção é se houver risco iminente, como incêndio, afogamento ou explosão — nesse caso, deve-se mover a vítima em BLOCO com 3 pessoas.",
    incidence: "altissima", trap: true, difficulty: 2
  },
  {
    id: "qe40", category: "primeiros-socorros",
    statement: "O telefone do SAMU é:",
    options: ["190", "192", "193", "199"],
    correctIndex: 1,
    explanation: "192 SAMU, 193 Bombeiros, 190 Polícia.",
    detailedExplanation: "Saber os números de emergência é fundamental para agir rápido em um acidente: SAMU (192) para emergências médicas e resgate de vítimas; Corpo de Bombeiros (193) para incêndios, desastres e resgate em ferragens; Polícia Militar (190) para ocorrências de trânsito com crime ou conflito; PRF (191) para rodovias federais. Memorize o 192 — é o principal número para solicitar socorro médico, pois os atendentes do SAMU podem orientar os primeiros socorros por telefone.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe41", category: "primeiros-socorros",
    statement: "Distância mínima para colocar o triângulo de sinalização em via comum é:",
    options: ["10 m", "30 m", "100 m", "5 m"],
    correctIndex: 1,
    explanation: "30 m em via urbana/rodovia comum; em rodovias de alta velocidade considerar maior distância.",
    detailedExplanation: "O triângulo de sinalização deve ser colocado a NO MÍNIMO 30 metros atrás do veículo (na mesma faixa), em vias urbanas e rodovias comuns. O objetivo é alertar os veículos que estão atrás para que reduzam a velocidade a tempo de desviar. Em rodovias de alta velocidade, o ideal é colocar ainda mais longe (50 a 100 metros), considerando a distância de frenagem em alta velocidade. Não colocar o triângulo ou colocá-lo muito perto pode causar colisões traseiras.",
    incidence: "alta", difficulty: 2
  },
  {
    id: "qe42", category: "primeiros-socorros",
    statement: "Diante de queimadura, o correto é:",
    options: ["Passar pasta de dente ou manteiga", "Resfriar com água corrente em temperatura ambiente", "Estourar bolhas", "Aplicar gelo direto"],
    correctIndex: 1,
    explanation: "Resfriar com água; nunca usar remédios caseiros nem estourar bolhas.",
    detailedExplanation: "O procedimento correto para queimaduras é resfriar a área com água CORRENTE em temperatura ambiente por cerca de 10 a 15 minutos, para aliviar a dor e interromper o processo de queimadura térmica. NUNCA aplique pasta de dente, manteiga, clara de ovo, café ou qualquer outra substância caseira — isso piora a lesão e pode causar infecção. NUNCA estoure as bolhas, pois a pele bolhosa protege contra infecções. Também não aplique gelo diretamente, pois queima mais ainda o tecido.",
    incidence: "media", difficulty: 2
  },
  {
    id: "qe43", category: "primeiros-socorros",
    statement: "Vítima consciente em estado de choque deve ser:",
    options: ["Deitada com pernas elevadas e mantida aquecida", "Sentada e oferecendo água", "Em pé andando", "Colocada de bruços"],
    correctIndex: 0,
    explanation: "Posição de choque: deitada com pernas elevadas, agasalhada.",
    detailedExplanation: "O estado de choque (hipovolêmico) ocorre quando o corpo não recebe oxigênio suficiente nos órgãos vitais, geralmente após hemorragia, trauma ou desidratação. A vítima consciente deve ser deitada de costas com as pernas elevadas cerca de 30 cm (para ajudar o sangue a chegar ao cérebro), mantida aquecida (cobrir com casaco ou cobertor) e NÃO receber água ou comida, pois pode precisar de cirurgia ou estar com lesões internas. Fale calmamente com a vítima até o socorro chegar.",
    incidence: "media", difficulty: 2
  },
  {
    id: "qe44", category: "meio-ambiente",
    statement: "O principal poluente emitido por motores a combustão é:",
    options: ["Oxigênio", "Monóxido e dióxido de carbono", "Vapor de água puro", "Hidrogênio"],
    correctIndex: 1,
    explanation: "CO e CO2 são os principais gases liberados.",
    detailedExplanation: "Motores a combustão (gasolina, diesel, etanol) queimam combustível fóssil ou biocombustível, liberando diversos gases. Os principais poluentes são o monóxido de carbono (CO — gás tóxico e inodoro) e o dióxido de carbono (CO2 — gás do efeito estufa). Também são emitidos óxidos de nitrogênio (NOx), hidrocarbonetos não queimados e material particulado (fumaça preta). A manutenção preventiva reduz essas emissões, contribuindo para a qualidade do ar e a saúde pública.",
    incidence: "media", difficulty: 1
  },
  {
    id: "qe45", category: "meio-ambiente",
    statement: "Direção econômica contribui para o meio ambiente porque:",
    options: ["Reduz consumo de combustível e emissões", "Aumenta velocidade", "Aquece o motor mais rápido", "Reduz a vida útil do veículo"],
    correctIndex: 0,
    explanation: "Menos combustível = menos poluição.",
    detailedExplanation: "A direção econômica é um conjunto de práticas que reduzem o consumo de combustível: trocar marcha em rotações adequadas (2.000 a 2.500 rpm), evitar acelerações e freadas bruscas, manter a calibragem correta dos pneus, fazer manutenções preventivas e reduzir o peso desnecessário no veículo. Menos combustível queimado significa menos emissão de CO2 e poluentes na atmosfera. Além de ajudar o meio ambiente, a direção econômica reduz os custos com combustível e manutenção.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe46", category: "meio-ambiente",
    statement: "Jogar lixo pela janela do veículo é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 1,
    explanation: "Média, 4 pontos.",
    detailedExplanation: "Jogar lixo pela janela do veículo é infração MÉDIA, 4 pontos na CNH e multa. Além da penalidade de trânsito, o ato configura crime ambiental, especialmente se o lixo for orgânico ou tóxico. Jogar uma bituca de cigarro pela janela, por exemplo, já causou incêndios florestais gravíssimos. O lixo na pista também pode causar acidentes: um objeto no asfalto pode fazer um motociclista perder o controle ou danificar pneus e suspensão de veículos.",
    legalBase: "Art. 172 CTB", incidence: "media", difficulty: 1
  },
  {
    id: "qe47", category: "meio-ambiente",
    statement: "Uso de buzina desnecessário gera poluição:",
    options: ["Visual", "Sonora", "Atmosférica", "Hídrica"],
    correctIndex: 1,
    explanation: "Buzina = poluição sonora.",
    detailedExplanation: "A buzina emite som — portanto, o uso excessivo ou desnecessário gera POLUIÇÃO SONORA, que é um dos tipos de poluição reconhecidos pela legislação ambiental. A poluição sonora causa estresse, perda auditiva, irritabilidade e problemas de saúde. O CTB restringe o uso da buzina a toques breves para advertir sobre risco iminente, sendo proibida em locais como hospitais e escolas, e durante o período noturno (22h às 6h), justamente para controlar esse tipo de poluição.",
    incidence: "media", difficulty: 1
  },
  {
    id: "qe48", category: "meio-ambiente",
    statement: "Cidadania no trânsito envolve principalmente:",
    options: ["Respeito mútuo, prudência e responsabilidade", "Prioridade absoluta dos carros", "Pressa e individualismo", "Buzinar para tudo"],
    correctIndex: 0,
    explanation: "Trânsito seguro depende de respeito e responsabilidade coletiva.",
    detailedExplanation: "Cidadania no trânsito significa que cada pessoa — motorista, passageiro, ciclista, pedestre — deve agir com RESPEITO MÚTUO, PRUDÊNCIA e RESPONSABILIDADE. O trânsito é um espaço coletivo, onde os direitos e deveres são compartilhados. Priorizar apenas os carros, agir com pressa ou buzinar excessivamente são atitudes opostas à cidadania. Um trânsito seguro e humano depende de cada um fazer a sua parte, protegendo a si mesmo e aos outros.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe49", category: "mecanica",
    statement: "O nível baixo de óleo do motor pode causar:",
    options: ["Aumento da potência", "Superaquecimento e desgaste do motor", "Economia de combustível", "Melhora na frenagem"],
    correctIndex: 1,
    explanation: "Falta de lubrificação aquece e danifica peças móveis.",
    detailedExplanation: "O óleo do motor tem a função essencial de lubrificar as peças móveis (pistões, bielas, virabrequim), reduzindo o atrito e dissipando calor. Quando o nível está baixo, a lubrificação é insuficiente, causando atrito excessivo entre as peças metálicas. Isso gera superaquecimento localizado, desgaste prematuro e pode levar à fundição do motor (travamento completo). Verificar o nível do óleo regularmente (com o motor frio e o veículo nivelado) é uma manutenção simples que evita um prejuízo enorme.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe50", category: "mecanica",
    statement: "Pneu careca aumenta o risco de:",
    options: ["Aquaplanagem e perda de aderência", "Maior economia", "Menos desgaste", "Melhor frenagem"],
    correctIndex: 0,
    explanation: "Sem sulcos a água não escoa e a aderência cai.",
    detailedExplanation: "Pneu careca (com sulcos abaixo de 1,6 mm de profundidade — indicado pelo TWI) perde a capacidade de escoar água em pista molhada. Sem os sulcos, a água forma uma lâmina entre o pneu e o asfalto, causando aquaplanagem. Além disso, a aderência em curvas e frenagens cai drasticamente, aumentando o risco de derrapagens e colisões. Rodar com pneu careca é infração GRAVE e coloca em risco a vida do condutor e dos passageiros.",
    incidence: "altissima", difficulty: 1
  },
  {
    id: "qe51", category: "mecanica",
    statement: "O líquido de arrefecimento serve para:",
    options: ["Lubrificar o motor", "Manter a temperatura do motor", "Limpar o para-brisa", "Acionar os freios"],
    correctIndex: 1,
    explanation: "Mantém o motor na temperatura ideal de funcionamento.",
    detailedExplanation: "O líquido de arrefecimento (também chamado de radiador ou coolant) circula pelo motor absorvendo o calor gerado pela combustão e o dissipa no radiador. Sua função é manter o motor na temperatura ideal de funcionamento (cerca de 90°C). Sem ele, o motor superaquece rapidamente, podendo empenar o cabeçote, danificar a junta e até fundir o motor. O nível deve ser verificado no reservatório e o líquido trocado conforme o manual do fabricante.",
    incidence: "media", difficulty: 1
  },
  {
    id: "qe52", category: "mecanica",
    statement: "A luz amarela do painel indica:",
    options: ["Emergência grave e parada imediata", "Alerta/atenção: verificar em breve", "Funcionamento normal", "Nada significativo"],
    correctIndex: 1,
    explanation: "Amarelo = atenção; vermelho = perigo/parada.",
    detailedExplanation: "As luzes do painel seguem um padrão universal de cores: AMARELA (ou laranja) indica ALERTA — algo precisa ser verificado em breve, mas não exige parada imediata (exemplos: luz de injeção eletrônica, luz de pneu baixo, luz de reserva de combustível). VERMELHA indica PERIGO — o motorista deve parar o veículo assim que possível (exemplos: luz de pressão do óleo, luz de temperatura do motor, luz do freio de estacionamento). Ignorar luzes amarelas pode levar a problemas mais graves.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe53", category: "mecanica",
    statement: "O fluido de freio deve ser trocado:",
    options: ["Nunca", "Conforme manual do fabricante (em geral a cada 1-2 anos)", "Somente em pane", "A cada 10 anos"],
    correctIndex: 1,
    explanation: "É higroscópico (absorve água) e perde eficiência com o tempo.",
    detailedExplanation: "O fluido de freio é HIGROSCÓPICO, ou seja, absorve a umidade do ar ao longo do tempo. A água no fluido reduz a temperatura de ebulição do sistema de freios — em freadas intensas e prolongadas, o fluido pode ferver, formar bolhas de vapor e fazer o pedal do freio 'ir ao chão' sem travar as rodas (conhecido como 'fadiga do freio'). Por isso, o fabricante recomenda a troca periódica, geralmente a cada 1 ou 2 anos, independentemente do uso.",
    incidence: "media", difficulty: 2
  },
  {
    id: "qe54", category: "mecanica",
    statement: "Para conferir a pressão dos pneus, deve-se:",
    options: ["Verificar com pneus a frio", "Verificar somente com pneus quentes", "Não importa a temperatura", "Encher sempre acima do recomendado"],
    correctIndex: 0,
    explanation: "Pneus frios garantem leitura correta; quentes inflam e enganam o medidor.",
    detailedExplanation: "A pressão dos pneus deve ser verificada com os pneus FRIOS (veículo parado por pelo menos 3 horas ou rodado no máximo 1 km). Quando o pneu roda, o atrito com o solo aquece o ar interno, que se expande e aumenta a pressão — a leitura fica falsamente alta. Calibrar com pneu quente resulta em pressão abaixo da recomendada quando os pneus esfriarem. Pressão incorreta causa desgaste irregular, aumenta o consumo de combustível e compromete a segurança.",
    incidence: "alta", difficulty: 2
  },
  {
    id: "qe55", category: "prioridade",
    statement: "Veículos de emergência em serviço (ambulância, polícia, bombeiros):",
    options: ["Devem aguardar a vez", "Têm prioridade absoluta, mesmo sobre sinalização", "Só têm prioridade em vias rurais", "Não têm prioridade"],
    correctIndex: 1,
    explanation: "Sirene + giroflex ligados = prioridade total.",
    detailedExplanation: "Veículos de emergência (ambulância, polícia, bombeiros) com sirene e giroflex acionados têm prioridade ABSOLUTA sobre todos os demais veículos e pedestres. Eles podem avançar sinais vermelhos, ultrapassar pela direita e exceder limites de velocidade — desde que com cuidado e segurança. Os demais condutores devem facilitar a passagem, encostando o veículo à direita. Se o veículo de emergência estiver sem sinais sonoros e luminosos, perde essa prioridade.",
    legalBase: "Art. 29, VII CTB", incidence: "altissima", difficulty: 1
  },
  {
    id: "qe56", category: "prioridade",
    statement: "Em via preferencial, o veículo que entra a partir de via secundária:",
    options: ["Tem preferência", "Deve dar passagem aos que estão na preferencial", "Deve buzinar e seguir", "Tem preferência se for maior"],
    correctIndex: 1,
    explanation: "Quem entra cede passagem.",
    detailedExplanation: "Quando um veículo que está em via secundária (menos movimentada, geralmente sem sinalização de preferência) deseja entrar em uma via preferencial (principal, mais larga ou mais movimentada), ele DEVE dar passagem aos veículos que já estão circulando na via preferencial. A via preferencial tem prioridade de passagem. Quem entra deve reduzir, parar se necessário, e só entrar quando houver espaço seguro, sem forçar a passagem.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe57", category: "prioridade",
    statement: "Veículo subindo em ladeira estreita tem:",
    options: ["Que ceder passagem ao que desce", "Preferência sobre o que desce", "Mesma preferência", "Preferência apenas à noite"],
    correctIndex: 1,
    explanation: "Quem sobe tem preferência porque manobrar para trás na subida é mais perigoso.",
    detailedExplanation: "Em ladeiras estreitas onde não é possível a passagem simultânea de dois veículos, quem SOBE tem preferência sobre quem DESCE. A lógica é de segurança: engatar a ré em uma subida para dar passagem é muito mais difícil e perigoso do que em uma descida, pois o condutor tem menos visibilidade e controle. O veículo que desce deve manobrar para trás até um local onde o veículo que sobe possa passar com segurança.",
    legalBase: "Art. 29, III, 'e' CTB", incidence: "media", trap: true, difficulty: 2
  },
  {
    id: "qe58", category: "prioridade",
    statement: "Ciclistas e pedestres na via:",
    options: ["Têm sempre preferência por serem mais vulneráveis", "Devem ceder ao automóvel", "Não devem usar a via", "Têm preferência apenas em ciclovia"],
    correctIndex: 0,
    explanation: "Vulneráveis têm preferência (art. 29, §2º).",
    detailedExplanation: "O CTB estabelece que os usuários mais vulneráveis da via têm PRIORIDADE: pedestres, ciclistas e pessoas com mobilidade reduzida. Isso significa que o condutor de veículo motorizado deve redobrar a atenção, reduzir a velocidade e dar passagem a eles. O Código é claro: 'os pedestres que estiverem atravessando a via sobre as faixas terão prioridade' e 'nenhum condutor pode colocar em risco a segurança dos pedestres'. A hierarquia coloca a vida acima da fluidez do trânsito.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe59", category: "legislacao",
    statement: "Multa por avançar parada obrigatória (placa PARE) é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Gravíssima, 7 pontos.",
    detailedExplanation: "Avançar a parada obrigatória imposta pela placa PARE (R-1) sem parar o veículo completamente é infração GRAVÍSSIMA, com 7 pontos na CNH e multa. A placa PARE exige PARADA TOTAL, não apenas redução de velocidade. Mesmo que não haja veículos se aproximando, o condutor deve parar antes da faixa de retenção, observar o trânsito e só então prosseguir. É uma das infrações mais cobradas nas provas do DETRAN e também uma das mais perigosas no dia a dia.",
    legalBase: "Art. 208 CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe60", category: "direcao-defensiva",
    statement: "Em descidas longas, a forma correta de usar o freio é:",
    options: ["Pisar continuamente no freio", "Usar freio motor (marcha reduzida) e o freio de serviço pontualmente", "Engatar ponto morto (banguela)", "Desligar o motor"],
    correctIndex: 1,
    explanation: "Freio-motor evita superaquecimento dos freios; banguela é infração gravíssima.",
    detailedExplanation: "Em descidas longas, o correto é utilizar o FREIO MOTOR: engate uma marcha reduzida (2ª ou 3ª, dependendo da inclinação) e deixe o próprio motor segurar a velocidade, usando o freio de serviço apenas pontualmente para corrigir a velocidade. Pisar continuamente no freio superaquece o sistema, podendo causar 'fading' (perda de eficiência) ou até falha total dos freios. Descer em ponto morto (banguela) é PROIBIDO (infração gravíssima) e tira o controle do veículo.",
    legalBase: "Art. 252, V CTB", incidence: "altissima", trap: true, difficulty: 2
  },
  {
    id: "qe61", category: "infracoes",
    statement: "Dirigir em 'banguela' (motor desligado ou ponto morto em descida) é infração:",
    options: ["Leve", "Grave", "Gravíssima", "Média"],
    correctIndex: 2,
    explanation: "Gravíssima, 7 pontos.",
    detailedExplanation: "Dirigir o veículo em 'banguela' — com o motor desligado ou em ponto morto durante descidas — é infração GRAVÍSSIMA, com 7 pontos na CNH e multa. A prática é perigosa porque, em ponto morto, o condutor perde o freio motor e depende exclusivamente do freio de serviço, que pode superaquecer e falhar. Além disso, o veículo fica mais difícil de controlar em curvas e emergências. A marcha deve estar sempre engatada enquanto o veículo estiver em movimento.",
    legalBase: "Art. 252, V CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe62", category: "legislacao",
    statement: "Para condutor que comete infração gravíssima na PPD, ocorre:",
    options: ["Nada", "Não obtém a CNH definitiva e reinicia o processo", "Multa apenas", "Aumento de pontos"],
    correctIndex: 1,
    explanation: "Reinício do processo de habilitação.",
    detailedExplanation: "O condutor que comete uma infração GRAVÍSSIMA durante o período da Permissão para Dirigir (PPD) PERDE o direito de obter a CNH definitiva. Ele terá que REINICIAR todo o processo de habilitação — fazer novamente as aulas teóricas, prova teórica, aulas práticas e exame prático. O mesmo vale se cometer infração GRAVE (5 pontos) ou for reincidente em infração MÉDIA. A PPD é um período probatório que exige do condutor novato um comportamento exemplar no trânsito.",
    legalBase: "Art. 148 CTB", incidence: "alta", trap: true, difficulty: 2
  },
  {
    id: "qe63", category: "legislacao",
    statement: "Cadeirinha/assento de elevação é obrigatório para crianças até:",
    options: ["4 anos", "7 anos e meio", "10 anos", "12 anos"],
    correctIndex: 2,
    explanation: "Resolução 819/21 CONTRAN: dispositivo de retenção até 10 anos OU 1,45 m; banco traseiro até 10 anos.",
    detailedExplanation: "A Resolução CONTRAN 819/2021 determina que crianças com ATÉ 10 ANOS de idade ou com altura inferior a 1,45 metro devem utilizar dispositivo de retenção adequado (bebê conforto, cadeirinha ou assento de elevação) no BANCO TRASEIRO. A regra anterior era de 7 anos e meio — a lei ampliou a proteção. Crianças acima de 10 anos ou com mais de 1,45 m podem usar o cinto de segurança do banco traseiro. Transportar criança em desacordo com a regra é infração gravíssima.",
    incidence: "altissima", difficulty: 2
  },
  {
    id: "qe64", category: "direcao-defensiva",
    statement: "Ao ser ofuscado por farol alto de outro veículo à noite, o condutor deve:",
    options: ["Olhar fixamente para o farol", "Desviar o olhar para a margem direita da pista", "Acelerar para passar logo", "Apagar os próprios faróis"],
    correctIndex: 1,
    explanation: "Olhar à direita evita cegueira temporária.",
    detailedExplanation: "Quando um veículo em sentido contrário se aproxima com farol alto e ofusca a visão, o condutor NUNCA deve olhar diretamente para o farol — isso causa cegueira temporária que pode durar vários segundos. O correto é DESVIAR O OLHAR para a margem DIREITA da pista (ou para a linha de bordo) e reduzir a velocidade. Isso mantém a visão periférica ativa sem ser ofuscado. Também deve-se piscar o farol rapidamente para alertar o outro motorista.",
    incidence: "alta", difficulty: 2
  },
  {
    id: "qe65", category: "direcao-defensiva",
    statement: "Pisca-alerta deve ser usado quando o veículo:",
    options: ["Estiver imobilizado em local que ofereça risco", "Estiver em movimento normal", "Em chuva", "Para agradecer outro condutor"],
    correctIndex: 0,
    explanation: "Apenas com veículo parado em local de risco.",
    detailedExplanation: "O pisca-alerta (quatro setas piscando simultaneamente) só deve ser acionado quando o veículo estiver IMOVILIZADO em situação de EMERGÊNCIA ou que ofereça RISCO — por exemplo, pane mecânica, acidente ou necessidade de parada no acostamento. Usar o pisca-alerta com o veículo em movimento é PROIBIDO e pode causar acidentes, pois os outros motoristas podem interpretar que você está parado ou reduzindo bruscamente. Em chuva forte, deve-se usar farol baixo ou de neblina, NÃO o pisca-alerta.",
    legalBase: "Art. 251 CTB", incidence: "alta", trap: true, difficulty: 2
  },
  {
    id: "qe66", category: "infracoes",
    statement: "Trafegar com o veículo na contramão é infração:",
    options: ["Grave", "Gravíssima", "Média", "Leve"],
    correctIndex: 1,
    explanation: "Gravíssima, 7 pontos.",
    detailedExplanation: "Trafegar na contramão de direção é infração GRAVÍSSIMA, com 7 pontos na CNH e multa. A contramão é extremamente perigosa porque o veículo se desloca no sentido oposto ao fluxo normal, gerando risco iminente de colisão frontal — uma das mais letais. Dependendo das circunstâncias (em vias de alta velocidade, pontes ou túneis), pode também configurar crime de trânsito se houver perigo. Atenção especial para conversões: entrar na contramão ao sair de um estacionamento também conta.",
    legalBase: "Art. 186 CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe67", category: "infracoes",
    statement: "Deixar de prestar socorro à vítima de acidente quando podia fazê-lo é:",
    options: ["Apenas infração administrativa", "Crime de omissão de socorro", "Falta leve", "Sem consequência se chamar resgate"],
    correctIndex: 1,
    explanation: "É crime de trânsito (art. 304 CTB).",
    detailedExplanation: "Deixar de prestar socorro a uma vítima de acidente, quando o condutor podia fazê-lo sem risco pessoal, configura CRIME de trânsito previsto no art. 304 do CTB, com detenção de 6 meses a 1 ano e multa, além da suspensão da CNH. A omissão de socorro é crime mesmo que o condutor não tenha causado o acidente. Se o condutor CAUSOU o acidente e foge sem prestar socorro, a pena é maior (6 meses a 3 anos). Chamar o resgate (SAMU 192) já configura prestação de socorro.",
    legalBase: "Art. 304 CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe68", category: "primeiros-socorros",
    statement: "Em caso de parada cardiorrespiratória, deve-se iniciar:",
    options: ["Manobra de Heimlich", "Massagem cardíaca + ventilação (RCP) se houver treinamento", "Tapas no rosto", "Esperar o SAMU sem agir"],
    correctIndex: 1,
    explanation: "RCP com 30 compressões para 2 ventilações (adulto).",
    detailedExplanation: "Na parada cardiorrespiratória (PCR), cada segundo conta para manter o sangue oxigenado chegar ao cérebro. A RCP (Reanimação Cardiopulmonar) deve ser iniciada imediatamente: 30 compressões torácicas fortes e rápidas (100 a 120 por minuto, afundando o peito 5 a 6 cm), seguidas de 2 ventilações de resgate se o socorrista tiver treinamento. Se não tiver treinamento ou não quiser fazer ventilações, apenas as compressões contínuas já ajudam. A manobra de Heimlich é para engasgo, não para PCR.",
    incidence: "alta", difficulty: 2
  },
  {
    id: "qe69", category: "meio-ambiente",
    statement: "A inspeção veicular tem como objetivo principal:",
    options: ["Aumentar arrecadação", "Garantir segurança e controle de emissões", "Reduzir o IPVA", "Substituir o licenciamento"],
    correctIndex: 1,
    explanation: "Verifica condições de segurança e poluentes.",
    detailedExplanation: "A inspeção veicular (obrigatória em alguns estados) tem como principal objetivo verificar as CONDIÇÕES DE SEGURANÇA do veículo (freios, pneus, suspensão, faróis, para-brisa, cinto de segurança) e o CONTROLE DE EMISSÕES de poluentes. O intuito é garantir que os veículos em circulação não ofereçam riscos aos ocupantes nem ao meio ambiente. Não é um imposto — é uma medida de segurança e proteção ambiental que salva vidas e reduz a poluição do ar.",
    incidence: "media", difficulty: 1
  },
  {
    id: "qe70", category: "mecanica",
    statement: "Antes de viajar, é prudente verificar:",
    options: ["Apenas combustível", "Pneus, óleo, água, freios, faróis e documentação", "Apenas o som", "Apenas o ar-condicionado"],
    correctIndex: 1,
    explanation: "Checklist completo previne panes.",
    detailedExplanation: "Antes de qualquer viagem, o condutor prudente realiza um CHECKLIST de segurança: calibragem e estado dos pneus (inclusive estepe), nível do óleo do motor, nível do líquido de arrefecimento, funcionamento dos freios, faróis e lanternas, nível do fluido de freio e do lavador do para-brisa, e a documentação (CNH e CRLV). Essa verificação preventiva reduz drasticamente o risco de panes, acidentes e multas durante a viagem.",
    incidence: "alta", difficulty: 1
  },
  {
    id: "qe71", category: "legislacao",
    statement: "Velocidade máxima padrão em via local urbana (sem placa) é:",
    options: ["30 km/h", "40 km/h", "60 km/h", "80 km/h"],
    correctIndex: 0,
    explanation: "Via local: 30 km/h; coletora: 40; arterial: 60; trânsito rápido: 80.",
    detailedExplanation: "Em vias urbanas SEM sinalização de velocidade, o CTB estabelece limites MÁXIMOS padrão: VIA LOCAL (ruas residenciais, baixo fluxo): 30 km/h; VIA COLETORA (distribui o tráfego entre bairros): 40 km/h; VIA ARTERIAL (grandes avenidas com semáforos): 60 km/h; VIA DE TRÂNSITO RÁPIDO (pistas expressas sem cruzamentos em nível): 80 km/h. Esses limites existem porque cada tipo de via tem características diferentes de fluxo, travessia de pedestres e risco de acidentes.",
    legalBase: "Art. 61 CTB", incidence: "altissima", difficulty: 2
  },
  {
    id: "qe72", category: "legislacao",
    statement: "Velocidade máxima padrão em rodovia para automóveis é:",
    options: ["80 km/h", "90 km/h", "110 km/h", "120 km/h"],
    correctIndex: 2,
    explanation: "110 km/h para automóveis; 90 para ônibus/caminhões; 60 para os demais.",
    detailedExplanation: "Em rodovias sem sinalização de velocidade, os limites padrão variam conforme o tipo de veículo: AUTOMÓVEIS, camionetas e motocicletas: 110 km/h; ÔNIBUS e caminhões: 90 km/h; DEMAIS veículos (reboque, cargas especiais): 80 km/h. Já em ESTRADAS (não pavimentadas/rurals), o limite cai para 60 km/h para automóveis. Esses limites refletem a capacidade de frenagem e estabilidade de cada tipo de veículo.",
    legalBase: "Art. 61 CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe73", category: "legislacao",
    statement: "Velocidade máxima padrão em estrada (não pavimentada/rural) é:",
    options: ["60 km/h", "80 km/h", "100 km/h", "120 km/h"],
    correctIndex: 0,
    explanation: "Estrada (não pavimentada): 60 km/h para automóveis.",
    detailedExplanation: "O CTB diferencia RODOVIA (via pavimentada) de ESTRADA (via rural não pavimentada). Em estradas sem sinalização, o limite máximo é de 60 km/h para automóveis, camionetas e motocicletas, e 30 km/h para os demais veículos. Estradas não pavimentadas têm menor aderência, mais irregularidades, pedras soltas e buracos — trafegar em velocidade elevada nessas condições perde o controle do veículo com muito mais facilidade.",
    legalBase: "Art. 61 CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe74", category: "direcao-defensiva",
    statement: "Em neblina densa, o farol correto é:",
    options: ["Alto", "Baixo + farol de neblina (se houver)", "Pisca-alerta", "Apagado"],
    correctIndex: 1,
    explanation: "Farol alto reflete na neblina e ofusca o próprio condutor.",
    detailedExplanation: "Em neblina densa, o farol ALTO é prejudicial — ele reflete nas gotículas de água suspensas no ar e forma uma 'parede branca' que ofusca o próprio condutor e reduz ainda mais a visibilidade. O correto é usar o FAROL BAIXO, de preferência com o farol de NEBLINA dianteiro (que projeta a luz para baixo e para os lados, sem refletir). O pisca-alerta com o veículo em movimento é PROIBIDO e perigoso, pois os outros motoristas podem achar que você está parado.",
    incidence: "alta", trap: true, difficulty: 2
  },
  {
    id: "qe75", category: "infracoes",
    statement: "Estacionar sobre a calçada é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 2,
    explanation: "Grave, 5 pontos.",
    detailedExplanation: "Estacionar sobre a calçada (passeio público) é infração GRAVE, com 5 pontos na CNH e multa. A calçada é espaço exclusivo dos pedestres — estacionar sobre ela obriga o pedestre a descer para a rua para contornar o veículo, colocando em risco sua segurança. Pessoas com deficiência visual, cadeirantes e pais com carrinhos de bebê são especialmente prejudicados. O respeito à calçada é uma questão de cidadania e acessibilidade.",
    legalBase: "Art. 181, VIII CTB", incidence: "media", difficulty: 1
  },
  {
    id: "qe76", category: "infracoes",
    statement: "Deixar de usar o cinto de segurança nos bancos traseiros é infração:",
    options: ["Leve do passageiro", "Grave do condutor", "Sem multa", "Gravíssima"],
    correctIndex: 1,
    explanation: "Responsabilidade é do condutor; infração grave, 5 pontos.",
    detailedExplanation: "O cinto de segurança é obrigatório para TODOS os ocupantes do veículo — inclusive nos bancos traseiros. E a RESPONSABILIDADE pela infração é do CONDUTOR, mesmo que o passageiro adulto seja quem optou por não usar o cinto. A infração é GRAVE, 5 pontos e multa. Em caso de colisão, um passageiro sem cinto no banco traseiro pode ser arremessado contra o banco da frente, ferindo também os ocupantes dianteiros. O cinto traseiro salva vidas.",
    incidence: "alta", difficulty: 2
  },
  {
    id: "qe77", category: "direcao-defensiva",
    statement: "Beber pequena quantidade e dirigir:",
    options: ["É permitido até certo limite", "É infração gravíssima, qualquer concentração já é proibida", "Só vira infração com sintomas", "Vale apenas o exame de sangue"],
    correctIndex: 1,
    explanation: "Lei Seca: tolerância zero.",
    detailedExplanation: "A Lei Seca (Lei 11.705/2008) estabelece TOLERÂNCIA ZERO para álcool ao dirigir. Qualquer quantidade detectável configura infração GRAVÍSSIMA, com multa multiplicada por 10, suspensão da CNH por 12 meses e recolhimento do documento. Acima de 0,34 mg/L de ar expirado no bafômetro, também configura CRIME de trânsito (art. 306 CTB), com detenção de 6 meses a 3 anos. Não existe 'quantidade segura' de álcool para dirigir — mesmo uma lata de cerveja já altera os reflexos.",
    incidence: "altissima", trap: true, difficulty: 1
  },
  {
    id: "qe78", category: "primeiros-socorros",
    statement: "Engasgo em adulto consciente é tratado com:",
    options: ["Manobra de Heimlich", "RCP imediata", "Água em jato", "Tapas no rosto"],
    correctIndex: 0,
    explanation: "Compressões abdominais (Heimlich) até desobstruir.",
    detailedExplanation: "O engasgo por obstrução das vias aéreas em adulto CONSCIENTE é tratado com a MANOBRA DE HEIMLICH: o socorrista posiciona-se atrás da vítima, envolve-a com os braços, coloca o punho fechado acima do umbigo e abaixo do esterno, e realiza compressões rápidas para dentro e para cima. O objetivo é expulsar o objeto da traqueia. Se a vítima estiver INCONSCIENTE, inicia-se RCP. A manobra de Heimlich NÃO se aplica a bebês menores de 1 ano — nesse caso, usa-se tapas nas costas e compressões torácicas.",
    incidence: "media", difficulty: 2
  },
  {
    id: "qe79", category: "meio-ambiente",
    statement: "Dirigir com escapamento adulterado/aberto é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 2,
    explanation: "Grave, 5 pontos.",
    detailedExplanation: "Transitar com escapamento adulterado ou aberto (descarga livre) é infração GRAVE, com 5 pontos na CNH e multa, além de medida administrativa de retenção do veículo para regularização. O escapamento adulterado aumenta a emissão de ruídos (poluição sonora) e, dependendo da alteração, pode também aumentar a emissão de poluentes. Além da multa, o condutor pode ser enquadrado por perturbação do sossego público. A manutenção do escapamento original é obrigação do proprietário.",
    legalBase: "Art. 230, IX CTB", incidence: "media", difficulty: 2
  },
  {
    id: "qe80", category: "mecanica",
    statement: "Vazamento de combustível deve ser tratado como:",
    options: ["Problema sem urgência", "Emergência — risco de incêndio e dano ambiental", "Característica normal", "Sinal de bom desempenho"],
    correctIndex: 1,
    explanation: "Risco grave; pare e procure mecânico.",
    detailedExplanation: "Vazamento de combustível é uma EMERGÊNCIA que exige ação imediata: o combustível é altamente inflamável e qualquer faísca (do motor, do escapamento, de um cigarro próximo) pode causar incêndio ou explosão. Além do risco de incêndio, o combustível derramado contamina o solo e a água, configurando dano ambiental. Ao perceber vazamento, pare o veículo em local seguro e arejado, desligue o motor, não fume e acione um mecânico ou guincho.",
    incidence: "media", difficulty: 1
  },
  {
    id: "qe81", category: "prioridade",
    statement: "Veículo prestes a entrar numa via vindo de propriedade lindeira (garagem):",
    options: ["Tem preferência", "Deve dar preferência aos veículos e pedestres da via", "Pode buzinar e entrar", "Tem preferência se a saída for em rampa"],
    correctIndex: 1,
    explanation: "Quem sai de imóvel cede passagem.",
    detailedExplanation: "Quando um veículo está saindo de garagem, estacionamento ou qualquer propriedade lindeira para entrar em uma via, ele DEVE dar preferência a TODOS os veículos e pedestres que já estão circulando na via. Isso inclui tanto veículos quanto pedestres passando pela calçada. O condutor deve reduzir, parar se necessário, sinalizar com seta e só entrar quando tiver espaço seguro. Ignorar essa regra pode causar colisões com veículos e atropelamentos.",
    legalBase: "Art. 36 CTB", incidence: "alta", difficulty: 2
  },
  {
    id: "qe82", category: "legislacao",
    statement: "A placa do veículo deve estar:",
    options: ["Limpa e legível", "Pode estar suja", "Pintada à mão se quebrar", "Encoberta por adesivo"],
    correctIndex: 0,
    explanation: "Adulterar ou cobrir é gravíssima.",
    detailedExplanation: "A placa de identificação do veículo deve estar sempre LIMPA e LEGÍVEL, sem obstruções, sujeira, adesivos ou alterações. Qualquer adulteração — como cobrir parcialmente a placa, usar películas, adesivos ou materiais que dificultem a leitura — é infração GRAVÍSSIMA, com 7 pontos, multa e apreensão do veículo. Placa adulterada também configura crime de adulteração de sinal identificador. A placa é o documento de identidade do veículo e precisa ser claramente visível para fiscalização.",
    legalBase: "Art. 230, IV CTB", incidence: "alta", difficulty: 1
  },
  {
    id: "qe83", category: "direcao-defensiva",
    statement: "Em ultrapassagens, a distância ideal para retornar à faixa é:",
    options: ["Logo que ultrapassar o para-choque", "Quando enxergar o veículo ultrapassado pelo retrovisor interno", "Sem critério", "Depois de 1 km"],
    correctIndex: 1,
    explanation: "Garantir que há espaço seguro para retornar.",
    detailedExplanation: "Após ultrapassar, o condutor deve retornar à faixa original apenas quando enxergar o veículo ultrapassado COMPLETAMENTE pelo RETROVISOR INTERNO. Isso garante que há distância suficiente entre os veículos para a manobra segura. Retornar logo após ultrapassar o para-choque (antes de ver no retrovisor) é arriscado — pode fechar o outro veículo e causar colisão. A seta direita deve ser acionada antes de retornar, sinalizando a intenção.",
    incidence: "media", difficulty: 2
  },
  {
    id: "qe84", category: "infracoes",
    statement: "Trafegar com farol apagado à noite é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 1,
    explanation: "Média, 4 pontos.",
    detailedExplanation: "Transitar com os faróis apagados durante a noite é infração MÉDIA, com 4 pontos na CNH e multa. O farol baixo deve estar aceso OBRIGATORIAMENTE das 18h às 6h em vias públicas. Além da infração, dirigir sem faróis à noite é extremamente perigoso: reduz a visibilidade do condutor e, mais importante, torna o veículo quase invisível para outros motoristas, pedestres e ciclistas. O farol aceso serve tanto para o condutor enxergar quanto para ser visto.",
    legalBase: "Art. 250 CTB", incidence: "media", difficulty: 2
  },
  {
    id: "qe85", category: "legislacao",
    statement: "Em rodovia de pista dupla com canteiro central, durante o dia, o farol baixo:",
    options: ["É proibido", "É obrigatório", "É opcional", "Só com chuva"],
    correctIndex: 1,
    explanation: "Lei do Farol Baixo: obrigatório em rodovias de dia.",
    detailedExplanation: "A 'Lei do Farol Baixo' (Lei 13.290/2016, alterada pela 14.071/2021) determina que o farol baixo deve estar ligado OBRIGATORIAMENTE durante o dia em rodovias de pista simples. Em rodovias de pista DUPLA com canteiro central (também chamadas de freeway), o uso do farol baixo durante o dia é DISPENSADO, pois o canteiro separa os fluxos. No entanto, muitos condutores mantêm ligado por segurança. Em túneis, chuva ou neblina, o farol baixo é sempre obrigatório.",
    legalBase: "Lei 13.290/16", incidence: "alta", difficulty: 2
  },
  {
    id: "qp16", category: "placas",
    statement: "Quanto à classificação geral da sinalização vertical do CTB, qual grupo tem por objetivo principal AUXILIAR/ORIENTAR o condutor com informações de serviços (hospital, posto, telefone)?",
    options: ["Regulamentação", "Advertência", "Indicação", "Especiais"],
    correctIndex: 2,
    explanation: "Sinalização de Indicação informa serviços auxiliares e atrativos turísticos (placas azuis).",
    detailedExplanation: "A sinalização de INDICAÇÃO (série I) tem o objetivo de orientar e auxiliar o condutor. Divide-se em: INDICAÇÃO DE SERVIÇOS AUXILIARES (placas AZUIS com símbolo branco — hospital, posto de gasolina, telefone, restaurante, hospedagem) e INDICAÇÃO DE ORIENTAÇÃO DE DESTINO (placas VERDES para orientação de cidades e distâncias, MARRONS para atrativos turísticos e BRANCAS para identificação de logradouros). Diferente das placas de regulamentação (que obrigam) e advertência (que alertam), as de indicação apenas informam.",
    incidence: "media", difficulty: 2
  },
  {
    id: "q4",
    category: "primeiros-socorros",
    statement:
      "Diante de uma vítima de acidente inconsciente respirando normalmente, o procedimento inicial correto é:",
    options: [
      "Oferecer água imediatamente",
      "Colocá-la em posição de recuperação (lateral)",
      "Movê-la rapidamente para fora da pista carregando-a",
      "Aplicar respiração boca a boca",
    ],
    correctIndex: 1,
    explanation:
      "Vítima inconsciente que respira deve ser colocada em posição lateral de segurança para evitar sufocamento.",
    detailedExplanation:
      "A posição lateral de segurança (PLS) impede que a língua obstrua as vias aéreas e evita que a vítima se afogue com o próprio vômito ou saliva. Só se aplica quando há respiração espontânea. Nunca ofereça líquidos a vítima inconsciente (risco de aspiração) e nunca mova a vítima desnecessariamente, pois pode haver lesão na coluna — só remova se houver risco iminente (fogo, explosão).",
    commonMistake:
      "Muitos marcam 'respiração boca a boca' — mas isso só é feito se a vítima NÃO estiver respirando.",
    tip: "Respira + inconsciente = posição lateral.",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "q5",
    category: "infracoes",
    statement: "Dirigir sob influência de álcool é uma infração de natureza:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation:
      "Infração gravíssima, multa multiplicada e suspensão imediata do direito de dirigir.",
    detailedExplanation:
      "A Lei Seca (Lei 11.705/08, alterada pela 12.760/12) tornou tolerância zero: qualquer concentração de álcool já configura infração gravíssima, com multa multiplicada por 10 (R$ 2.934,70), suspensão do direito de dirigir por 12 meses e recolhimento da CNH. Recusar o bafômetro tem a mesma penalidade. Se houver concentração acima de 0,34 mg/L de ar expirado, configura também CRIME de trânsito (art. 306 do CTB), com prisão de 6 meses a 3 anos.",
    legalBase: "Art. 165 e 306 do CTB",
    incidence: "altissima",
    difficulty: 1,
  },
  {
    id: "q6",
    category: "prioridade",
    statement:
      "Em um cruzamento não sinalizado, qual veículo tem preferência de passagem?",
    options: [
      "O que vier pela esquerda do condutor",
      "O que vier pela direita do condutor",
      "O maior veículo",
      "O que chegar primeiro, independente do lado",
    ],
    correctIndex: 1,
    explanation:
      "Em cruzamento sem sinalização, a preferência é de quem vem pela DIREITA.",
    detailedExplanation:
      "Regra geral: em cruzamento ou interseção sem sinalização, dá-se preferência ao veículo que vem pela DIREITA. Exceções: (1) veículos circulando em rotatória têm preferência sobre quem entra; (2) veículos em via preferencial (mesmo sem placa, geralmente a mais larga ou pavimentada) têm prioridade; (3) veículos de emergência em serviço têm prioridade absoluta.",
    legalBase: "Art. 29, III, 'c' do CTB",
    commonMistake:
      "É a pegadinha mais cobrada da prova. Muitos marcam 'esquerda' por confusão. Memorize: DIREITA = preferência.",
    tip: "Direita = preferência. Memorize!",
    incidence: "altissima",
    trap: true,
    difficulty: 1,
  },
  {
    id: "q7",
    category: "placas",
    statement: "A placa 'PARE' (R-1) é classificada como:",
    options: [
      "Placa de advertência",
      "Placa de regulamentação",
      "Placa de indicação",
      "Placa educativa",
    ],
    correctIndex: 1,
    explanation:
      "R-1 (PARE) é a principal placa de regulamentação. Octogonal, vermelha — obriga parada total.",
    detailedExplanation:
      "A placa PARE (R-1) é OCTOGONAL (8 lados), vermelha com letras brancas, e obriga parada TOTAL do veículo antes da faixa de retenção, mesmo que não haja outro veículo se aproximando. Desobedecer é infração gravíssima (7 pontos). É a única placa octogonal do CTB justamente para ser reconhecida mesmo se estiver suja, virada ou em más condições.",
    commonMistake:
      "Confundir com advertência por causa do formato diferente. Lembre: PARE é REGULAMENTAÇÃO.",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q8",
    category: "meio-ambiente",
    statement:
      "A emissão excessiva de poluentes pelo escapamento de um veículo configura infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 2,
    explanation:
      "É infração grave, com multa e retenção do veículo para regularização.",
    detailedExplanation:
      "Conforme o art. 231, III do CTB, transitar com o veículo produzindo fumaça, gases ou partículas em níveis superiores aos permitidos é infração GRAVE: 5 pontos na CNH, multa e medida administrativa de retenção do veículo para regularização. O controle se dá pelo PROCONVE (Programa de Controle da Poluição do Ar por Veículos Automotores).",
    legalBase: "Art. 231, III do CTB",
    incidence: "media",
    difficulty: 2,
  },
  {
    id: "q9",
    category: "mecanica",
    statement:
      "O sistema responsável por reduzir a velocidade do veículo é:",
    options: ["Sistema de ignição", "Sistema de freios", "Sistema de transmissão", "Sistema de arrefecimento"],
    correctIndex: 1,
    explanation: "Freios reduzem ou interrompem o movimento — verificação obrigatória antes de dirigir.",
    detailedExplanation:
      "O sistema de freios converte energia cinética em calor por atrito, reduzindo a velocidade. É composto por: pedal, cilindro mestre, fluido (DOT3/DOT4), pastilhas, discos (ou lonas e tambores) e o freio de estacionamento. Sinais de problema: pedal baixo, ruído metálico, puxar para um lado, vibração. Verificação periódica é obrigação do condutor — dirigir com freio defeituoso é infração GRAVÍSSIMA.",
    incidence: "media",
    difficulty: 1,
  },
  {
    id: "q10",
    category: "direcao-defensiva",
    statement:
      "A distância de seguimento ideal entre veículos em condições normais é medida pela regra dos:",
    options: ["1 segundo", "2 segundos", "3 segundos", "5 segundos"],
    correctIndex: 1,
    explanation:
      "Regra dos 2 segundos: tempo mínimo para reagir em condições normais. Em chuva, dobre.",
    detailedExplanation:
      "Como aplicar: escolha um ponto fixo na via (placa, árvore). Quando o veículo da frente passar por ele, conte 'mil e um, mil e dois'. Se você passar antes de terminar a contagem, está perto demais. Em condições normais e secas, 2 segundos. Em chuva, neblina ou pista escorregadia: DOBRE para 4 segundos. À noite ou com cargas pesadas: aumente também. Essa distância dá tempo de reação para frear sem colisão traseira.",
    tip: "Normal = 2s · Chuva = 4s",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "q11",
    category: "legislacao",
    statement: "A validade da CNH para condutores com menos de 50 anos é de:",
    options: ["3 anos", "5 anos", "10 anos", "Indeterminada"],
    correctIndex: 2,
    explanation:
      "Desde 2021: até 49 anos → 10 anos · 50 a 69 anos → 5 anos · 70+ → 3 anos.",
    detailedExplanation:
      "A Lei 14.071/2021 alterou o art. 147 do CTB. Validade conforme idade do condutor NA DATA DO EXAME: menos de 50 anos = 10 anos; de 50 a menos de 70 = 5 anos; 70 ou mais = 3 anos. Condutores que exercem atividade remunerada (EAR — táxi, ônibus, escolar, transporte de carga) precisam fazer toxicológico e o prazo segue regras próprias.",
    legalBase: "Art. 147, §2º do CTB (Lei 14.071/2021)",
    commonMistake:
      "Provas antigas falavam em '5 anos' — a regra MUDOU em 2021. Hoje, jovem renova de 10 em 10 anos.",
    tip: "10 / 5 / 3 — quanto mais idade, menor validade.",
    incidence: "altissima",
    trap: true,
    difficulty: 2,
  },
  {
    id: "q12",
    category: "infracoes",
    statement: "Avançar o sinal vermelho do semáforo é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Gravíssima — 7 pontos na CNH e multa.",
    detailedExplanation:
      "Avançar sinal vermelho é infração GRAVÍSSIMA: 7 pontos na CNH e multa de R$ 293,47. Não há tolerância — mesmo parar 'em cima' da faixa de pedestres no vermelho conta. Exceção: à noite, entre 22h e 5h, em locais com risco de assalto, alguns municípios autorizam reduzir e prosseguir após confirmar a ausência de pedestres e outros veículos.",
    legalBase: "Art. 208 do CTB",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q13",
    category: "placas",
    statement: "Placas de advertência possuem qual formato e cor?",
    options: [
      "Losango amarelo com símbolos pretos",
      "Círculo vermelho",
      "Retângulo azul",
      "Octógono vermelho",
    ],
    correctIndex: 0,
    explanation: "Advertência = losango amarelo com tarja preta. Avisa perigo à frente.",
    detailedExplanation:
      "As placas de advertência (série A) são LOSANGOS amarelos com orla e símbolos pretos. Avisam o condutor sobre condições perigosas à frente: curvas, lombadas, cruzamentos, animais, pedestres, escolas, obras. Não obrigam, apenas alertam — mas ignorar uma advertência e causar acidente agrava a responsabilidade do condutor. Exceções: 'Cruz de Santo André' (cruzamento com via férrea) tem formato próprio.",
    tip: "Amarelo = atenção, perigo próximo.",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q14",
    category: "primeiros-socorros",
    statement:
      "O primeiro procedimento ao chegar em local de acidente é:",
    options: [
      "Mover as vítimas imediatamente",
      "Sinalizar o local para evitar novos acidentes",
      "Tirar fotos para o seguro",
      "Oferecer água às vítimas",
    ],
    correctIndex: 1,
    explanation:
      "PAS: Proteger → Avisar → Socorrer. Sinalizar é proteger o local.",
    detailedExplanation:
      "Protocolo PAS é mundialmente adotado: (1) PROTEGER o local — sinalize com triângulo a no mínimo 30 metros, ligue o pisca-alerta e impeça novas vítimas; (2) AVISAR — ligue 192 (SAMU), 193 (Bombeiros) ou 190 (Polícia), informando local exato, número e estado das vítimas; (3) SOCORRER — só preste socorro direto se tiver conhecimento. Mover vítima sem necessidade pode agravar lesões de coluna.",
    tip: "Decore: P-A-S.",
    incidence: "altissima",
    difficulty: 2,
  },
  {
    id: "q15",
    category: "prioridade",
    statement: "Em rotatória, a preferência é de:",
    options: [
      "Quem está entrando",
      "Quem já está circulando dentro da rotatória",
      "O veículo maior",
      "Quem vem pela esquerda",
    ],
    correctIndex: 1,
    explanation: "Quem já circula tem preferência. Quem entra deve esperar.",
    detailedExplanation:
      "Desde a Lei 10.830/2003, em rotatórias (também chamadas de retornos ou balões), quem JÁ ESTÁ circulando tem preferência sobre quem deseja entrar. Antes dessa lei, valia a regra geral da direita — por isso muitas pessoas mais velhas ainda erram. Quem entra deve dar seta à direita ao sair e à esquerda enquanto circula, conforme o caso.",
    legalBase: "Art. 29, III, 'f' do CTB",
    commonMistake:
      "Pegadinha: a banca insinua a regra da direita. Mas em rotatória vale a regra ESPECÍFICA: já está dentro = preferência.",
    tip: "Já dentro = preferência.",
    incidence: "altissima",
    trap: true,
    difficulty: 1,
  },
  {
    id: "q16",
    category: "direcao-defensiva",
    statement: "São considerados elementos da direção defensiva, EXCETO:",
    options: ["Atenção", "Previsão", "Pressa", "Conhecimento"],
    correctIndex: 2,
    explanation:
      "Elementos: conhecimento, atenção, previsão, habilidade e ação. Pressa é inimiga.",
    detailedExplanation:
      "Os 5 elementos básicos da direção defensiva são: CONHECIMENTO (das leis, do veículo, da via), ATENÇÃO (foco constante), PREVISÃO (antecipar o que pode acontecer), HABILIDADE (domínio prático do veículo) e AÇÃO (reação correta na hora certa). Pressa, distração, álcool e cansaço são justamente os INIMIGOS da direção defensiva.",
    commonMistake:
      "Questão tipo 'EXCETO' é armadilha — leia duas vezes. Pressa NÃO é elemento, é inimigo.",
    incidence: "alta",
    trap: true,
    difficulty: 2,
  },
  {
    id: "q17",
    category: "legislacao",
    statement: "O uso do cinto de segurança é obrigatório para:",
    options: [
      "Apenas o motorista",
      "Apenas os passageiros da frente",
      "Todos os ocupantes do veículo",
      "Somente em rodovias",
    ],
    correctIndex: 2,
    explanation: "Todos os ocupantes, em todas as vias. Não usar = infração grave.",
    detailedExplanation:
      "O cinto é obrigatório para TODOS os ocupantes (frente e trás), em TODAS as vias (urbanas ou rurais). Não usar é infração GRAVE: 5 pontos e multa. A responsabilidade pelo cinto dos passageiros é também do condutor. Crianças até 10 anos devem ir no banco traseiro, em dispositivos de retenção apropriados (bebê conforto, cadeirinha ou assento de elevação) conforme idade e peso.",
    legalBase: "Art. 167 do CTB",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q18",
    category: "meio-ambiente",
    statement: "Qual atitude do condutor contribui para reduzir a poluição?",
    options: [
      "Manter o motor sempre acelerado em alta rotação",
      "Realizar manutenções preventivas regularmente",
      "Trocar de marcha apenas em alta rotação",
      "Deixar o motor ligado em paradas longas",
    ],
    correctIndex: 1,
    explanation: "Manutenção em dia = motor eficiente e menos emissões.",
    detailedExplanation:
      "Manutenção preventiva (troca de óleo, filtros, vela, regulagem do motor, calibragem dos pneus) garante combustão completa, reduz emissão de CO, CO2 e particulados, e economiza combustível. Outras atitudes que ajudam: trocar marcha em rotações médias (2.000-2.500 rpm), desligar o motor em paradas longas, evitar acelerações bruscas e manter pneus calibrados.",
    incidence: "media",
    difficulty: 1,
  },
  {
    id: "q19",
    category: "mecanica",
    statement: "A função do sistema de suspensão é:",
    options: [
      "Reduzir o consumo de combustível",
      "Absorver impactos e dar estabilidade",
      "Refrigerar o motor",
      "Controlar a emissão de poluentes",
    ],
    correctIndex: 1,
    explanation: "Suspensão = conforto, estabilidade e segurança.",
    detailedExplanation:
      "A suspensão (molas, amortecedores, bandejas, batentes) absorve as irregularidades da pista, mantém os pneus em contato com o solo, dá estabilidade nas curvas e protege passageiros e carga. Suspensão gasta = carro 'flutua', aumenta a distância de frenagem e o risco de perda de controle. Sinais: ruídos, balanço excessivo, desgaste irregular dos pneus.",
    incidence: "baixa",
    difficulty: 1,
  },
  {
    id: "q20",
    category: "infracoes",
    statement: "Usar o celular ao volante (segurando) é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Gravíssima — multa e 7 pontos na CNH.",
    detailedExplanation:
      "Desde a Lei 14.071/2021, segurar o celular ao dirigir é infração GRAVÍSSIMA: 7 pontos e multa de R$ 293,47. O uso é permitido apenas em modo viva-voz ou com fone, sem manuseio. Olhar a tela para ver mapa também conta — coloque o aparelho em suporte fixo. Motoristas profissionais (EAR) podem ter a CNH suspensa diretamente nesta infração.",
    legalBase: "Art. 252, §1º do CTB",
    tip: "Celular na mão = gravíssima.",
    incidence: "altissima",
    difficulty: 1,
  },
  {
    id: "q21",
    category: "placas",
    statement: "Placas de indicação têm qual cor de fundo predominante?",
    options: ["Vermelho", "Amarelo", "Azul ou verde", "Branco"],
    correctIndex: 2,
    explanation: "Indicação = azul (serviços) ou verde (orientação de destino).",
    detailedExplanation:
      "Placas de INDICAÇÃO orientam o condutor: AZUL = serviços auxiliares (posto, hospital, telefone, restaurante); VERDE = orientação de destino (saídas, cidades, distâncias); MARROM = atrativos turísticos; BRANCAS com bordas pretas = identificação de logradouro. São informativas, não obrigam nem proíbem.",
    incidence: "media",
    difficulty: 1,
  },
  {
    id: "q22",
    category: "legislacao",
    statement: "O Sistema Nacional de Trânsito é composto por:",
    options: [
      "Apenas o DETRAN",
      "Órgãos e entidades executivos, normativos e de fiscalização",
      "Somente a Polícia Rodoviária",
      "Empresas privadas de trânsito",
    ],
    correctIndex: 1,
    explanation:
      "SNT inclui CONTRAN, DENATRAN, DETRANs, JARI, PRF, polícias militares etc.",
    detailedExplanation:
      "O Sistema Nacional de Trânsito (SNT) é o conjunto de órgãos federais, estaduais e municipais que cuidam do trânsito no Brasil. Principais: CONTRAN (normativo máximo), SENATRAN (executivo federal — antigo DENATRAN), DETRANs (executivos estaduais), DNIT e PRF (rodovias federais), polícias militares estaduais, órgãos municipais de trânsito e as JARIs (julgam recursos de multas).",
    legalBase: "Art. 5º a 25 do CTB",
    incidence: "media",
    difficulty: 3,
  },
  {
    id: "q23",
    category: "direcao-defensiva",
    statement:
      "Em pista molhada, a aquaplanagem pode ser evitada principalmente por meio de:",
    options: [
      "Aceleração brusca",
      "Redução da velocidade e pneus em bom estado",
      "Frenagem forte e contínua",
      "Esterçamento rápido do volante",
    ],
    correctIndex: 1,
    explanation:
      "Velocidade baixa + pneus com sulcos adequados = sem aquaplanagem.",
    detailedExplanation:
      "Aquaplanagem (ou hidroplanagem) ocorre quando uma lâmina de água se forma entre o pneu e o asfalto, fazendo o veículo 'deslizar' sem contato com o solo. Prevenção: reduzir velocidade na chuva, manter pneus com sulcos mínimos de 1,6 mm (a TWI), calibragem correta e evitar poças. Se acontecer: NÃO freie nem esterce bruscamente — tire o pé do acelerador, segure o volante firme e deixe o veículo retomar o contato com o solo.",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "q24",
    category: "primeiros-socorros",
    statement:
      "Em caso de hemorragia externa intensa, o procedimento correto é:",
    options: [
      "Aplicar torniquete imediatamente",
      "Comprimir o local com pano limpo",
      "Lavar a ferida com água corrente",
      "Aguardar o socorro sem agir",
    ],
    correctIndex: 1,
    explanation:
      "Compressão direta com pano limpo é o primeiro passo. Torniquete só em casos extremos.",
    detailedExplanation:
      "Procedimento correto: (1) use luvas ou saco plástico para se proteger; (2) comprima diretamente sobre o ferimento com pano limpo ou gaze; (3) eleve o membro afetado, se possível, acima do nível do coração; (4) mantenha a compressão até chegada do socorro; (5) NÃO retire o pano se ensopar — coloque outro por cima. Torniquete só em último caso (amputação ou hemorragia incontrolável), pois pode causar perda do membro.",
    commonMistake:
      "A banca induz ao torniquete porque parece 'mais técnico'. ERRADO — primeira escolha é compressão direta.",
    incidence: "media",
    trap: true,
    difficulty: 2,
  },
  {
    id: "q25",
    category: "prioridade",
    statement:
      "Veículos com prioridade absoluta de passagem (sirene + giroflex acionados) são:",
    options: [
      "Caminhões de carga",
      "Ambulâncias, bombeiros e polícia em serviço de urgência",
      "Ônibus em horário de pico",
      "Veículos de aplicativo",
    ],
    correctIndex: 1,
    explanation:
      "Veículos de emergência em serviço têm prioridade sobre todos os demais.",
    detailedExplanation:
      "Veículos de emergência em serviço urgente — com sirene E giroflex acionados — têm prioridade ABSOLUTA: podem ultrapassar pela direita, transitar acima do limite de velocidade, avançar semáforo vermelho (com cuidado) e estacionar onde for necessário. Demais condutores devem dar passagem encostando à direita. SEM sirene ou giroflex acionados, perdem essa prioridade e seguem as regras gerais.",
    legalBase: "Art. 29, VII e Art. 89 do CTB",
    incidence: "alta",
    difficulty: 1,
  },
  // ============================================================
  // QUESTÕES VISUAIS — IDENTIFICAÇÃO DE PLACAS (as que mais caem)
  // ============================================================
  {
    id: "p1",
    category: "placas",
    statement: "Que placa é essa?",
    placa: "R-1",
    options: [
      "Dê a preferência",
      "Parada obrigatória (PARE)",
      "Proibido seguir em frente",
      "Sentido proibido",
    ],
    correctIndex: 1,
    explanation: "R-1 PARE — octogonal, vermelha. Obriga parada total do veículo.",
    detailedExplanation:
      "A placa R-1 (PARE) é a única placa OCTOGONAL do CTB — formato escolhido para que o motorista a reconheça mesmo se estiver suja, virada ou em más condições. Obriga PARADA TOTAL do veículo antes da faixa de retenção, mesmo que não venha ninguém. Desobedecer é infração GRAVÍSSIMA: 7 pontos na CNH e multa.",
    legalBase: "Art. 208 do CTB",
    tip: "Octógono vermelho com letras brancas = sempre PARE.",
    incidence: "altissima",
    difficulty: 1,
  },
  {
    id: "p2",
    category: "placas",
    statement: "Qual o significado da placa abaixo?",
    placa: "R-2",
    options: [
      "Parada obrigatória",
      "Dê a preferência",
      "Proibido virar à direita",
      "Trânsito proibido",
    ],
    correctIndex: 1,
    explanation: "R-2 Dê a Preferência — triângulo invertido, branca com borda vermelha.",
    detailedExplanation:
      "A R-2 é um TRIÂNGULO EQUILÁTERO com a ponta voltada para BAIXO, fundo branco e orla vermelha. Obriga o condutor a reduzir e ceder passagem aos veículos da via preferencial. Diferente do PARE, não exige parada total se a via estiver livre — basta dar a preferência.",
    commonMistake:
      "Muitos confundem com PARE. Lembre: triângulo invertido = preferência; octógono = PARE.",
    incidence: "altissima",
    trap: true,
    difficulty: 1,
  },
  {
    id: "p3",
    category: "placas",
    statement: "O que indica esta placa?",
    placa: "R-6a",
    options: [
      "Estacionamento permitido",
      "Proibido estacionar",
      "Proibido parar e estacionar",
      "Estacionamento exclusivo",
    ],
    correctIndex: 1,
    explanation:
      "R-6a Proibido Estacionar — círculo branco com 'E' cortado por linha vermelha.",
    detailedExplanation:
      "A R-6a proíbe ESTACIONAR (deixar o veículo parado por tempo prolongado), mas PERMITE parada rápida para embarque/desembarque de passageiros ou carga/descarga. Estacionar onde a placa proíbe é infração MÉDIA: 4 pontos e multa, com possível remoção do veículo.",
    commonMistake:
      "Não confunda com R-6b (Proibido Parar e Estacionar — tem um X). Esta só proíbe ESTACIONAR.",
    legalBase: "Art. 181 do CTB",
    tip: "Letra E cortada = só proíbe Estacionar.",
    incidence: "altissima",
    difficulty: 1,
  },
  {
    id: "p4",
    category: "placas",
    statement: "Esta placa significa:",
    placa: "R-6b",
    options: [
      "Proibido estacionar",
      "Proibido parar e estacionar",
      "Cruzamento perigoso",
      "Sentido proibido",
    ],
    correctIndex: 1,
    explanation: "R-6b Proibido Parar e Estacionar — X vermelho em círculo branco.",
    detailedExplanation:
      "A R-6b é MAIS RESTRITIVA que a R-6a: proíbe QUALQUER tipo de parada, mesmo para embarque/desembarque. Comum em frente a hospitais, escolas em horário de movimento, pontes e túneis. Parar onde a placa proíbe é infração GRAVE: 5 pontos e multa.",
    commonMistake: "X = proíbe TUDO (parar e estacionar). Apenas E cortado = só estacionar.",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "p5",
    category: "placas",
    statement: "Que placa é essa?",
    placa: "R-19",
    options: [
      "Velocidade mínima permitida 60 km/h",
      "Velocidade máxima permitida 60 km/h",
      "Distância obrigatória de 60 metros",
      "Rodovia federal 60",
    ],
    correctIndex: 1,
    explanation: "R-19 Velocidade Máxima Permitida — limite que NÃO pode ser ultrapassado.",
    detailedExplanation:
      "A R-19 informa o limite MÁXIMO de velocidade naquele trecho. Trafegar acima é infração que varia conforme o excesso: até 20% acima = média (4 pts); 20% a 50% = grave (5 pts); acima de 50% = gravíssima x3 (7 pts + suspensão). A velocidade MÍNIMA tem placa diferente (R-20), redonda azul.",
    commonMistake:
      "Pegadinha clássica: confundir com velocidade mínima. Borda vermelha = proibição = não ultrapassar = MÁXIMA.",
    legalBase: "Art. 218 do CTB",
    incidence: "alta",
    trap: true,
    difficulty: 1,
  },
  {
    id: "p6",
    category: "placas",
    statement: "O que indica esta placa?",
    placa: "A-1a",
    options: [
      "Obras na pista",
      "Curva acentuada à esquerda",
      "Curva acentuada à direita",
      "Pista escorregadia",
    ],
    correctIndex: 1,
    explanation: "A-1a Curva Acentuada à Esquerda — advertência (losango amarelo).",
    detailedExplanation:
      "Placa de ADVERTÊNCIA (série A): losango amarelo com símbolo preto. Avisa curva fechada à esquerda à frente — reduza a velocidade ANTES de entrar na curva. 'Acentuada' significa raio menor (curva mais fechada) do que a A-2 (curva normal).",
    tip: "Losango amarelo = atenção, perigo à frente. Vermelho seria obrigação.",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "p7",
    category: "placas",
    statement: "Esta placa indica:",
    placa: "A-32b",
    options: [
      "Área escolar",
      "Passagem sinalizada de pedestres",
      "Proibido pedestres",
      "Travessia de animais",
    ],
    correctIndex: 1,
    explanation:
      "A-32b Passagem Sinalizada de Pedestres — alerta para faixa de travessia à frente.",
    detailedExplanation:
      "Adverte que há uma FAIXA DE PEDESTRES próxima. O condutor deve reduzir a velocidade e estar pronto para parar e dar preferência. Atropelar pedestre na faixa é circunstância agravante. Não confundir com A-33a (Área Escolar), que mostra duas crianças.",
    commonMistake: "Adulto + faixa zebrada = passagem de pedestres. Duas crianças = área escolar.",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "p8",
    category: "placas",
    statement: "Que placa é essa?",
    placa: "A-33a",
    options: [
      "Passagem de pedestres",
      "Área escolar",
      "Trânsito de bicicletas",
      "Local de recreação",
    ],
    correctIndex: 1,
    explanation: "A-33a Área Escolar — duas crianças, advertência.",
    detailedExplanation:
      "Sinaliza proximidade de ESCOLA. Em geral acompanhada de redução de velocidade (R-19) e faixas pintadas no asfalto. Velocidade em área escolar costuma ser 30-40 km/h, e a fiscalização é rigorosa nos horários de entrada/saída.",
    incidence: "media",
    difficulty: 1,
  },
  {
    id: "p9",
    category: "placas",
    statement: "Esta placa significa:",
    placa: "R-25d",
    options: [
      "Vire à esquerda obrigatório",
      "Siga em frente obrigatório",
      "Sentido único",
      "Estacionamento à frente",
    ],
    correctIndex: 1,
    explanation: "R-25d Siga em Frente Obrigatório — regulamentação azul circular.",
    detailedExplanation:
      "Placa de REGULAMENTAÇÃO de fundo AZUL: indica obrigação (e não proibição). Aqui obriga o condutor a seguir em frente — não pode virar à direita nem à esquerda. As placas R-25 (sentido obrigatório) variam: R-25a esquerda, R-25b direita, R-25c esquerda e frente, R-25d frente.",
    tip: "Azul = obrigação (faça assim). Vermelho = proibição (não faça).",
    incidence: "media",
    difficulty: 2,
  },
  {
    id: "p10",
    category: "placas",
    statement: "O que indica esta placa?",
    placa: "I-Hospital",
    options: [
      "Posto de combustível",
      "Hospital",
      "Farmácia 24h",
      "Posto policial",
    ],
    correctIndex: 1,
    explanation: "Placa de Indicação de Serviço Auxiliar — Hospital.",
    detailedExplanation:
      "Placas de INDICAÇÃO de serviços auxiliares têm fundo AZUL com símbolo branco. Informam ao condutor a presença de serviços úteis: hospital (cruz), posto de gasolina (P/bomba), telefone, restaurante, hospedagem etc. São apenas informativas — não obrigam nada.",
    incidence: "media",
    difficulty: 1,
  },
  // ============================================================
  // BANCO EXPANDIDO — temas recorrentes na prova teórica DETRAN
  // ============================================================
  {
    id: "q26",
    category: "legislacao",
    statement: "A idade mínima para obter a CNH nas categorias A e B é de:",
    options: ["16 anos", "17 anos", "18 anos", "21 anos"],
    correctIndex: 2,
    explanation: "18 anos completos, saber ler e escrever, e possuir CPF.",
    detailedExplanation:
      "Para tirar a CNH nas categorias A (moto) e B (carro), o candidato precisa ter no mínimo 18 anos completos, ser penalmente imputável, saber ler e escrever e possuir documento de identidade e CPF. Para as categorias C, D e E há ainda requisitos adicionais de tempo de habilitação.",
    legalBase: "Art. 140 do CTB",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q27",
    category: "legislacao",
    statement: "Para obter a categoria D (ônibus/vans escolares), o condutor precisa:",
    options: [
      "Ter 18 anos e CNH B há 1 ano",
      "Ter no mínimo 21 anos, CNH C/B por 2 anos e não ter cometido infração grave nos últimos 12 meses",
      "Apenas pagar a taxa do DETRAN",
      "Ter 25 anos e curso superior",
    ],
    correctIndex: 1,
    explanation: "D = 21 anos + habilitado há pelo menos 2 anos na B (ou 1 ano na C) + ficha limpa.",
    detailedExplanation: "Cada categoria de CNH exigida para transporte de passageiros ou carga tem requisitos de idade e tempo de habilitação. Categoria D (veículos com mais de 8 lugares, como ônibus e vans escolares): mínimo 21 anos, estar habilitado há pelo menos 2 anos na categoria B ou 1 ano na C, e não ter cometido infração grave ou gravíssima nos últimos 12 meses. A categoria E (caminhões com reboque) exige 21 anos e 1 ano na C. É importante decorar esses pré-requisitos para não cair na pegadinha da idade mínima (21, não 18 ou 25).",
    legalBase: "Art. 145 do CTB",
    incidence: "media",
    difficulty: 2,
  },
  {
    id: "q28",
    category: "legislacao",
    statement: "O condutor é considerado infrator reincidente quando:",
    options: [
      "Comete duas infrações em datas distintas",
      "Comete a mesma infração no período de 12 meses",
      "Acumula 20 pontos no prontuário",
      "É autuado em outro estado",
    ],
    correctIndex: 1,
    explanation: "Reincidência = mesma infração dentro de 12 meses, com multa em dobro.",
    detailedExplanation: "Reincidência no CTB é um conceito específico: cometer a MESMA infração (mesmo artigo) duas ou mais vezes no período de 12 meses. Não é simplesmente cometer infrações diferentes — a alternativa A fala em 'duas infrações em datas distintas' (que seria pegadinha), enquanto a reincidência exige que seja o mesmo tipo de infração. Consequência: multa multiplicada por 2 (dobro) na reincidência. Para infrações médias, a reincidência também impede a transformação da PPD em CNH definitiva. Atenção: não confunda reincidência com acúmulo de pontos ou suspensão.",
    legalBase: "Art. 259, §1º do CTB",
    incidence: "media",
    difficulty: 2,
  },
  {
    id: "q29",
    category: "legislacao",
    statement: "Em 2021, o CTB passou a permitir suspensão do direito de dirigir a partir de:",
    options: [
      "20 pontos em 12 meses",
      "Pontuação variável: 20, 30 ou 40 conforme natureza das infrações",
      "Sempre 14 pontos",
      "Apenas após cometer uma gravíssima",
    ],
    correctIndex: 1,
    explanation:
      "Hoje: 40 pontos sem gravíssima; 30 pontos com 1 gravíssima; 20 pontos com 2+ gravíssimas. EAR é sempre 40.",
    detailedExplanation: "A Lei 14.071/2021 mudou o sistema de suspensão por pontuação, que antes era fixo em 20 pontos. Agora o limite varia conforme a gravidade das infrações cometidas: 40 pontos se NENHUMA infração for gravíssima; 30 pontos se houver UMA infração gravíssima; 20 pontos se houver DUAS OU MAIS infrações gravíssimas. O condutor que exerce atividade remunerada (EAR) tem limite fixo de 40 pontos independentemente das infrações. Essa é uma das matérias mais cobradas nas provas do DETRAN, sempre com pegadinha nos valores.",
    legalBase: "Art. 261 do CTB (Lei 14.071/2021)",
    commonMistake: "A regra dos '20 pontos' fixos é antiga — caiu em 2021.",
    incidence: "altissima",
    trap: true,
    difficulty: 3,
  },
  {
    id: "q30",
    category: "legislacao",
    statement: "Documentos obrigatórios para circular com um veículo são:",
    options: [
      "CNH e CRLV (físicos ou digitais)",
      "Somente o CRLV",
      "Apenas a CNH",
      "CRLV e comprovante de IPVA pago em papel",
    ],
    correctIndex: 0,
    explanation: "CNH + CRLV em dia. Versões digitais (CDT/CRLV-e) têm o mesmo valor legal.",
    detailedExplanation: "Para circular legalmente, o condutor deve portar a CNH ou PPD (Permissão para Dirigir) e o CRLV (Certificado de Registro e Licenciamento do Veículo). Ambos podem ser apresentados em formato digital — CNH Digital (CDT) e CRLV-e — que têm o mesmo valor legal dos documentos físicos. O comprovante de IPVA pago não precisa ser levado no veículo; o sistema do DETRAN já verifica o débito automaticamente no momento do licenciamento. Atenção: o CRLV precisa estar dentro da validade (renovado anualmente).",
    legalBase: "Art. 159 do CTB",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q31",
    category: "infracoes",
    statement: "Estacionar em vaga de pessoa com deficiência sem credencial é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Gravíssima — 7 pontos e multa. Mesmo vale para vaga de idoso (grave).",
    detailedExplanation: "Estacionar em vaga reservada a pessoa com deficiência sem a credencial de estacionamento (que deve estar visível sobre o painel) é infração GRAVÍSSIMA: 7 pontos na CNH e multa. Já estacionar em vaga de idoso (pessoas com 60+) é infração GRAVE (5 pontos). A diferença de gravidade existe porque as vagas para PCD têm proteção legal mais rigorosa. A credencial é emitida pelo órgão de trânsito municipal e deve estar sempre visível. Atenção: mesmo que a vaga esteja vazia, não é permitido usar sem a credencial.",
    legalBase: "Art. 181, XVII do CTB",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q32",
    category: "infracoes",
    statement: "Dirigir sem CNH ou Permissão para Dirigir é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Gravíssima — multa x3, e pode configurar crime se gerar perigo.",
    detailedExplanation: "Dirigir sem ser habilitado (sem CNH ou PPD) é infração GRAVÍSSIMA com multa multiplicada por 3 (fator 3). Além disso, se o ato de dirigir sem habilitação gerar perigo de dano a alguém, pode configurar o crime previsto no art. 309 do CTB, com detenção de 6 meses a 1 ano. Se o condutor tem CNH, mas não a porta no momento da abordagem, é infração LEVE (art. 232). A prova costuma cobrar essa diferença: dirigir SEM CNH é gravíssima, mas dirigir SEM PORTAR a CNH é leve. Fique atento!",
    legalBase: "Art. 162, I do CTB",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q33",
    category: "infracoes",
    statement: "Transportar criança menor de 10 anos no banco da frente é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 3,
    explanation: "Gravíssima — crianças até 10 anos vão atrás, em dispositivo adequado à idade.",
    detailedExplanation: "Crianças com até 10 anos de idade (ou que ainda não tenham atingido 1,45 m de altura) DEVEM ser transportadas no banco traseiro, em dispositivo de retenção adequado conforme a faixa etária: bebê conforto (até 1 ano), cadeirinha (1 a 4 anos), assento de elevação (4 a 7,5 anos) e cinto de segurança (após). A infração por descumprir essa regra é GRAVÍSSIMA: 7 pontos na CNH e multa. Muitos alunos erram achando que é 'grave', mas a banca classifica como gravíssima justamente pela gravidade do risco à vida da criança.",
    legalBase: "Art. 168 do CTB / Res. CONTRAN 277",
    commonMistake: "Não é 'grave' — é GRAVÍSSIMA. Bancas confundem para derrubar.",
    incidence: "alta",
    trap: true,
    difficulty: 2,
  },
  {
    id: "q34",
    category: "infracoes",
    statement: "Disputar corrida (racha) em via pública é:",
    options: [
      "Infração média",
      "Infração grave",
      "Infração gravíssima e crime de trânsito",
      "Apenas advertência verbal",
    ],
    correctIndex: 2,
    explanation: "Gravíssima x10 + suspensão da CNH + crime (art. 308 do CTB, detenção 6 meses a 3 anos).",
    detailedExplanation: "Disputar corrida ('racha') em via pública é uma das infrações mais graves do CTB. É classificada como GRAVÍSSIMA com fator multiplicador 10 — ou seja, a multa-base é multiplicada por 10, resultando em um valor altíssimo. Além da multa, gera suspensão imediata do direito de dirigir e recolhimento da CNH. Também configura CRIME DE TRÂNSITO (art. 308), com detenção de 6 meses a 3 anos, multa e suspensão da habilitação. Diferencia-se da simples 'manobra perigosa' (art. 175, gravíssima x3), pois o racha envolve disputa de velocidade entre dois ou mais veículos.",
    legalBase: "Art. 173 e 308 do CTB",
    incidence: "media",
    difficulty: 1,
  },
  {
    id: "q35",
    category: "direcao-defensiva",
    statement: "Os 'pontos cegos' do veículo são:",
    options: [
      "Locais onde a visão é totalmente obstruída pelas colunas e fora do alcance dos retrovisores",
      "Áreas escuras dentro do carro à noite",
      "Pontos de desgaste do pneu",
      "Manchas do para-brisa",
    ],
    correctIndex: 0,
    explanation: "São áreas não visíveis pelos espelhos — sempre olhe por cima do ombro antes de mudar de faixa.",
    detailedExplanation: "Os pontos cegos (ou 'ângulos mortos') são regiões ao redor do veículo que não podem ser vistas pelos retrovisores interno e externos, geralmente situadas nas laterais traseiras, obstruídas pelas colunas da carroceria. Um motociclista ou carro pequeno pode 'desaparecer' nesses pontos. Por isso, a direção defensiva ensina: antes de mudar de faixa ou fazer conversão, o condutor deve olhar rapidamente por cima do ombro (over-the-shoulder check) para verificar se há alguém no ponto cego. Ajustar corretamente os retrovisores reduz, mas não elimina, essas áreas.",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q36",
    category: "direcao-defensiva",
    statement: "Em uma descida íngreme e longa, o procedimento mais seguro é:",
    options: [
      "Manter o ponto morto para economizar combustível",
      "Usar marcha reduzida, aproveitando o freio motor",
      "Manter os freios pressionados continuamente",
      "Desligar o motor",
    ],
    correctIndex: 1,
    explanation: "Marcha reduzida + freio motor evita superaquecimento dos freios.",
    detailedExplanation:
      "Descer em ponto morto (banguela) é PROIBIDO (infração média) e perigoso — o motorista perde o freio motor, exigindo demais do sistema hidráulico, que pode superaquecer e falhar. O correto é engatar marcha reduzida (2ª ou 3ª) e deixar o motor segurar o carro.",
    legalBase: "Art. 187 do CTB",
    commonMistake: "Descer em 'N' parece economizar — mas é infração e perigosíssimo.",
    incidence: "alta",
    trap: true,
    difficulty: 2,
  },
  {
    id: "q37",
    category: "direcao-defensiva",
    statement: "Antes de ultrapassar outro veículo, o condutor deve:",
    options: [
      "Acelerar imediatamente sem sinalizar",
      "Verificar a visibilidade, sinalizar com seta e checar retrovisores e ponto cego",
      "Buzinar continuamente",
      "Acender o pisca-alerta",
    ],
    correctIndex: 1,
    explanation: "Ultrapassagem segura = visibilidade + seta + espelhos + ponto cego.",
    detailedExplanation: "A sequência correta para uma ultrapassagem segura é: (1) verificar se há visibilidade suficiente e sinalização que permita a manobra (faixa tracejada); (2) sinalizar com a seta para a esquerda; (3) checar os retrovisores e o ponto cego; (4) acelerar com segurança, fazer a ultrapassagem e retornar à faixa; (5) sinalizar com a seta para a direita ao retornar. Buzinar ou acender pisca-alerta não faz parte do procedimento correto. A pressa ou a falta de checagem do ponto cego é uma das principais causas de colisões laterais em rodovias.",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q38",
    category: "direcao-defensiva",
    statement: "É PROIBIDO ultrapassar:",
    options: [
      "Em retas com boa visibilidade",
      "Em pontes, viadutos, túneis, curvas e faixa contínua",
      "Em qualquer rodovia federal",
      "Durante o dia",
    ],
    correctIndex: 1,
    explanation: "Ultrapassagem proibida em pontes, viadutos, túneis, curvas, aclives sem visibilidade e faixa contínua.",
    detailedExplanation: "O CTB lista locais onde é proibido ultrapassar por questão de segurança: pontes, viadutos, túneis, curvas, aclives (subidas) sem visibilidade suficiente e onde houver faixa contínua (simples ou dupla) no sentido do veículo. A faixa contínua indica proibição de ultrapassagem, enquanto a tracejada permite com segurança. Ultrapassar em local proibido é infração GRAVÍSSIMA com multa multiplicada por 5 (fator 5), uma das multas mais caras do CTB. Atenção: não é proibido apenas 'em rodovias' — o que define a proibição é a sinalização e o local.",
    legalBase: "Art. 203 do CTB",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q39",
    category: "primeiros-socorros",
    statement: "Em vítima com suspeita de fratura, o correto é:",
    options: [
      "Tentar colocar o osso no lugar",
      "Imobilizar o membro na posição encontrada e aguardar socorro",
      "Movimentar a vítima para verificar a extensão da lesão",
      "Massagear o local da dor",
    ],
    correctIndex: 1,
    explanation: "NUNCA recoloque osso. Imobilize como está e chame o SAMU.",
    detailedExplanation: "Ao suspeitar de fratura em uma vítima de acidente, o procedimento correto é: NÃO tentar recolocar o osso no lugar — isso pode causar danos a nervos, vasos sanguíneos e agravar a lesão. Deve-se imobilizar o membro na posição em que se encontra, usando talas improvisadas (papelão, revista, madeira) e ataduras, sem apertar demais. Depois, aguardar o socorro especializado (SAMU 192). Movimentar a vítima desnecessariamente também é perigoso, especialmente se houver suspeita de fratura na coluna vertebral, pois pode causar lesão medular irreversível.",
    incidence: "media",
    difficulty: 2,
  },
  {
    id: "q40",
    category: "primeiros-socorros",
    statement: "O número do SAMU para emergências médicas é:",
    options: ["190", "192", "193", "199"],
    correctIndex: 1,
    explanation: "192 SAMU · 193 Bombeiros · 190 Polícia Militar · 191 PRF.",
    detailedExplanation: "Em emergências de trânsito, é essencial saber os números de telefone corretos: SAMU (Serviço de Atendimento Móvel de Urgência) disca 192 — emergências médicas, como acidentes com feridos; Corpo de Bombeiros disca 193 — resgate veicular, incêndios e desencarceramento; Polícia Militar disca 190 — ocorrências de trânsito sem vítimas; PRF (Polícia Rodoviária Federal) disca 191 — ocorrências em rodovias federais. Confundir esses números pode atrasar o atendimento e custar vidas. Uma dica: SAMU (192) é serviço médico, enquanto Bombeiros (193) fazem o resgate técnico.",
    tip: "1-9-2: o '2' lembra 'dois braços do socorrista'.",
    incidence: "alta",
    difficulty: 1,
  },
  {
    id: "q41",
    category: "primeiros-socorros",
    statement: "Em caso de queimadura, NÃO se deve:",
    options: [
      "Resfriar com água corrente em temperatura ambiente",
      "Cobrir com pano limpo",
      "Aplicar pasta de dente, manteiga ou pomadas caseiras",
      "Procurar atendimento médico",
    ],
    correctIndex: 2,
    explanation: "Pasta de dente/manteiga pioram a lesão e podem causar infecção.",
    detailedExplanation: "Em caso de queimadura, o procedimento correto é: resfriar a área com água corrente em temperatura ambiente por cerca de 10 minutos (nunca gelo), cobrir com pano limpo ou gaze umedecida e procurar atendimento médico. O que NUNCA se deve fazer: aplicar pasta de dente, manteiga, clara de ovo, pomadas caseiras ou qualquer outro produto caseiro — essas substâncias retêm o calor na pele, agravam a queimadura e podem causar infecções. Também não se deve furar bolhas ou arrancar roupas grudadas na pele. O conhecimento de primeiros socorros pode evitar sequelas permanentes.",
    incidence: "media",
    trap: true,
    difficulty: 1,
  },
  {
    id: "q42",
    category: "primeiros-socorros",
    statement: "Diante de vítima inconsciente que NÃO respira, deve-se:",
    options: [
      "Esperar o socorro chegar",
      "Iniciar compressões torácicas (RCP) imediatamente",
      "Dar água",
      "Sacudir a vítima",
    ],
    correctIndex: 1,
    explanation: "Parada respiratória = iniciar RCP (100 a 120 compressões/min no centro do peito).",
    detailedExplanation: "A parada cardiorrespiratória (PCR) exige ação imediata. A sequência correta é: (1) verificar se a vítima está consciente e respirando (olhar, ouvir, sentir por até 10 segundos); (2) chamar o SAMU (192) ou pedir que alguém chame; (3) iniciar compressões torácicas (RCP) no centro do peito, a uma profundidade de 5 cm, ritmo de 100 a 120 compressões por minuto, permitindo o retorno do tórax entre as compressões. Para leigos, recomenda-se apenas compressões (hands-only CPR). Não se deve dar água (a vítima pode aspirar) nem sacudir. A cada minuto sem RCP, a chance de sobrevivência cai 7-10%.",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "q43",
    category: "meio-ambiente",
    statement: "Buzina pode ser usada:",
    options: [
      "Em qualquer situação, livremente",
      "Apenas em toques breves e para advertir sobre risco iminente",
      "Para cumprimentar amigos",
      "Em frente a hospitais e escolas",
    ],
    correctIndex: 1,
    explanation: "Uso indevido de buzina = poluição sonora = infração leve.",
    detailedExplanation: "O uso da buzina é regulado pelo CTB: deve ser em toques breves (não prolongados) e apenas para advertir sobre risco iminente ou em situações de emergência. É proibido usar a buzina para cumprimentar, chamar alguém, em manifestações de protesto, ou em locais proibidos (como hospitais e escolas, entre 22h e 6h em vias próximas). O uso indevido é infração LEVE (3 pontos, multa). Além da penalidade, o abuso da buzina contribui para a poluição sonora urbana, que causa estresse, perda auditiva e distúrbios do sono na população.",
    legalBase: "Art. 227 do CTB",
    incidence: "media",
    difficulty: 1,
  },
  {
    id: "q44",
    category: "meio-ambiente",
    statement: "Jogar lixo pela janela do veículo é infração:",
    options: ["Leve", "Média", "Grave", "Gravíssima"],
    correctIndex: 1,
    explanation: "Média — 4 pontos. Também pode causar incêndios e acidentes.",
    detailedExplanation: "Atirar do veículo ou abandonar objetos ou substâncias na via é infração MÉDIA (4 pontos na CNH e multa). Pode parecer uma infração leve, mas as consequências são sérias: uma bituca de cigarro pode causar incêndio em vegetação às margens da rodovia; uma garrafa ou lata pode provocar acidentes com motociclistas ou danificar outros veículos. Além da multa de trânsito, o ato de jogar lixo em via pública também pode ser enquadrado como crime ambiental (Lei 9.605/98). O condutor responsável mantém o lixo dentro do veículo e descarta em local adequado.",
    legalBase: "Art. 172 do CTB",
    incidence: "media",
    difficulty: 1,
  },
  {
    id: "q45",
    category: "mecanica",
    statement: "A calibragem dos pneus deve ser verificada:",
    options: [
      "Uma vez por ano",
      "Pelo menos a cada 15 dias, com pneus frios",
      "Somente quando o carro 'puxa' para um lado",
      "Apenas em viagens longas",
    ],
    correctIndex: 1,
    explanation: "A cada 15 dias e antes de viagens. Pneu frio = leitura correta.",
    detailedExplanation: "A calibragem dos pneus deve ser verificada no mínimo a cada 15 dias e antes de viagens longas. O ideal é calibrar com os pneus FRIOS (veículo parado por pelo menos 2 horas ou rodado no máximo 3 km), porque o ar se expande com o calor e a leitura será imprecisa se os pneus estiverem quentes. Pneus descalibrados aumentam o consumo de combustível, reduzem a vida útil dos pneus (desgaste irregular) e comprometem a segurança nas frenagens e curvas. Cada veículo tem uma pressão recomendada (geralmente indicada no manual ou na tampa do tanque).",
    incidence: "media",
    difficulty: 1,
  },
  {
    id: "q46",
    category: "mecanica",
    statement: "O indicador 'TWI' no pneu serve para:",
    options: [
      "Mostrar a marca do pneu",
      "Indicar o limite mínimo legal de profundidade dos sulcos (1,6 mm)",
      "Medir a pressão",
      "Indicar a data de fabricação",
    ],
    correctIndex: 1,
    explanation: "TWI (Tread Wear Indicator) = quando o sulco chega ao indicador, troque o pneu.",
    detailedExplanation: "TWI (Tread Wear Indicator) são saliências no fundo dos sulcos do pneu que indicam o desgaste máximo permitido. Quando a banda de rodagem atinge a altura desses indicadores, significa que os sulcos estão com profundidade igual ou inferior a 1,6 mm — o limite mínimo legal. Rodar com pneus carecas (abaixo de 1,6 mm) é infração GRAVÍSSIMA e aumenta drasticamente o risco de aquaplanagem e perda de aderência em piso molhado. Um teste simples: coloque uma moeda de R$ 1 no sulco; se a borda dourada aparecer, o pneu precisa ser trocado.",
    incidence: "media",
    difficulty: 2,
  },
  {
    id: "q47",
    category: "mecanica",
    statement: "O nível do óleo do motor deve ser verificado:",
    options: [
      "Com o motor quente e funcionando",
      "Com o veículo em plano nivelado e o motor frio (ou desligado há alguns minutos)",
      "Somente em oficinas",
      "Uma vez por ano",
    ],
    correctIndex: 1,
    explanation: "Plano + motor frio = leitura precisa da vareta.",
    detailedExplanation: "A verificação do nível de óleo do motor é feita com a vareta medidora. O procedimento correto: estacionar em terreno plano, desligar o motor e aguardar alguns minutos (para o óleo retornar ao cárter), retirar a vareta, limpar, recolocar e retirar novamente para ver o nível entre as marcas de mínimo e máximo. Se o nível estiver abaixo do mínimo, o motor pode sofrer danos graves por falta de lubrificação. A verificação deve ser feita periodicamente (semanalmente ou a cada abastecimento), e não apenas em oficinas.",
    incidence: "baixa",
    difficulty: 1,
  },
  {
    id: "q48",
    category: "mecanica",
    statement: "A luz vermelha de bateria acesa no painel indica:",
    options: [
      "Problema no sistema de carga (alternador, correia ou bateria)",
      "Falta de combustível",
      "Problema nos freios",
      "Pneu furado",
    ],
    correctIndex: 0,
    explanation: "Vermelho = pare assim que possível. Continuar pode deixar o carro sem energia.",
    detailedExplanation: "A luz vermelha da bateria no painel indica falha no sistema de carga: o alternador não está gerando energia suficiente, a correia do alternador pode ter rompido ou a bateria pode estar com problemas. Se essa luz acender durante a condução, o veículo está funcionando apenas com a carga residual da bateria e irá parar quando essa carga acabar. O correto é parar em local seguro assim que possível e solicitar assistência. Ignorar pode deixar o veículo imobilizado em local perigoso (pista, acostamento) e danificar outros componentes elétricos.",
    incidence: "media",
    difficulty: 2,
  },
  {
    id: "q49",
    category: "prioridade",
    statement: "Na via, a ordem de prioridade é:",
    options: [
      "Veículos pesados → automóveis → pedestres",
      "Veículos de emergência → pedestres → veículos não motorizados → motorizados",
      "Sempre quem chegou primeiro",
      "Motos → carros → ônibus",
    ],
    correctIndex: 1,
    explanation: "Hierarquia: emergência > pedestre > não motorizado > motorizado.",
    detailedExplanation: "O CTB estabelece uma hierarquia de prioridade nas vias: (1) veículos de emergência (ambulância, bombeiros, polícia) com sirene e luz vermelha; (2) pedestres e pessoas transportadas em veículos não motorizados (bicicletas, carroças); (3) veículos não motorizados; (4) veículos motorizados (carros, motos, ônibus). Os veículos de emergência têm preferência sobre todos, devendo os demais condutores dar passagem pela esquerda. Os pedestres têm prioridade sobre os veículos, especialmente nas faixas de pedestres. Essa hierarquia visa proteger os usuários mais vulneráveis do trânsito.",
    legalBase: "Art. 29, §2º do CTB",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "q50",
    category: "legislacao",
    statement: "Velocidade máxima padrão em vias urbanas locais (sem sinalização) é:",
    options: ["20 km/h", "30 km/h", "40 km/h", "60 km/h"],
    correctIndex: 1,
    explanation: "Local 30 · Coletora 40 · Arterial 60 · Trânsito rápido 80 (urbanas, sem sinalização).",
    detailedExplanation: "Na ausência de sinalização regulamentadora de velocidade, o CTB estabelece os limites máximos para vias urbanas: VIA LOCAL (residencial, baixo fluxo): 30 km/h; VIA COLETORA (distribui o tráfego entre bairros): 40 km/h; VIA ARTERIAL (grande fluxo, semaforizada): 60 km/h; VIA DE TRÂNSITO RÁPIDO (pistas múltiplas, sem cruzamentos): 80 km/h. Esses limites são frequentemente cobrados na prova. Dica: a sequência é progressiva: 30, 40, 60, 80 — quanto maior a capacidade da via, maior o limite.",
    legalBase: "Art. 61 do CTB",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "q51",
    category: "legislacao",
    statement: "Em rodovias, a velocidade máxima padrão para automóveis (sem sinalização) é:",
    options: ["80 km/h", "100 km/h", "110 km/h", "120 km/h"],
    correctIndex: 2,
    explanation: "Rodovia: automóvel 110 · ônibus 90 · demais 80. Estrada (não pavimentada): 60.",
    detailedExplanation: "Em rodovias (vias pavimentadas, rurais) sem sinalização específica, os limites padrão são: automóveis, camionetas e motocicletas: 110 km/h; ônibus e micro-ônibus: 90 km/h; demais veículos (caminhões, reboques): 80 km/h. Já em estradas NÃO pavimentadas, o limite é 60 km/h para todos. Esses valores são para vias de pista dupla (com separador). Se a rodovia for de pista simples (sem canteiro central), os limites são reduzidos em 10 km/h para cada categoria. É comum a banca trocar os valores para derrubar o candidato.",
    legalBase: "Art. 61, §1º do CTB",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "q52",
    category: "infracoes",
    statement: "Trafegar acima de 50% da velocidade máxima permitida é infração:",
    options: ["Média", "Grave", "Gravíssima com fator multiplicador 3", "Apenas advertência"],
    correctIndex: 2,
    explanation: "Gravíssima x3 (7 pts + multa x3) + suspensão imediata da CNH.",
    detailedExplanation: "As infrações por excesso de velocidade são graduadas: até 20% acima do limite = infração MÉDIA; de 20% a 50% = infração GRAVE; ACIMA DE 50% = infração GRAVÍSSIMA com fator multiplicador 3 (multa x3), 7 pontos na CNH e suspensão imediata do direito de dirigir. Esta última é uma das poucas infrações que geram suspensão automática (sem necessidade de processo administrativo). Além da multa salgada, o condutor tem a CNH recolhida e precisa passar pelo curso de reciclagem. É uma das pegadinhas favoritas da banca.",
    legalBase: "Art. 218, III do CTB",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "q53",
    category: "direcao-defensiva",
    statement: "Faróis baixos acesos durante o dia em rodovias são:",
    options: [
      "Proibidos",
      "Obrigatórios em rodovias sem iluminação artificial (ou usar DRL)",
      "Opcionais",
      "Apenas em túneis",
    ],
    correctIndex: 1,
    explanation: "Lei 13.290/2016 / 14.071/2021: obrigatório em rodovias; DRL substitui.",
    detailedExplanation: "Desde a Lei 13.290/2016 (alterada pela 14.071/2021), é obrigatório trafegar com farol baixo aceso durante o dia em rodovias (mesmo em condições normais de visibilidade). A principal finalidade é aumentar a visibilidade do veículo para outros condutores, reduzindo colisões frontais e laterais. O DRL (Daytime Running Light — luz de rodagem diurna) pode substituir o farol baixo, pois tem a mesma função de tornar o veículo mais visível. Nas vias urbanas não há essa obrigatoriedade, a menos que haja túneis ou condições adversas (chuva, neblina).",
    legalBase: "Art. 250 do CTB",
    incidence: "media",
    difficulty: 2,
  },
  {
    id: "q54",
    category: "legislacao",
    statement: "A Permissão para Dirigir (PPD) é válida por:",
    options: ["3 meses", "6 meses", "1 ano", "2 anos"],
    correctIndex: 2,
    explanation: "PPD vale por 1 ano. Sem cometer infração grave/gravíssima nem reincidir em média, vira CNH definitiva.",
    detailedExplanation: "A PPD (Permissão para Dirigir) é o documento provisório emitido ao candidato aprovado nos exames teórico e prático. Tem validade de 1 ano (não confunda com os 6 meses de prazo para concluir o processo inicial). Durante esse período, o condutor deve cumprir um estágio probatório: se não cometer nenhuma infração grave ou gravíssima, e não for reincidente em infração média, a PPD é convertida automaticamente em CNH definitiva. Se cometer infração grave/gravíssima OU reincidir em média, a PPD é cassada e o condutor perde o direito de dirigir, tendo que reiniciar todo o processo.",
    legalBase: "Art. 148, §3º do CTB",
    incidence: "alta",
    difficulty: 1,
  },
  // ===================== PEGADINHAS CLÁSSICAS DO DETRAN =====================
  {
    id: "qp01",
    category: "direcao-defensiva",
    statement:
      "Sob condições adversas de tempo, como chuva forte, neblina ou cerração, a respeito do uso das luzes do veículo, é correto afirmar que o condutor deve:",
    options: [
      "Manter as luzes de posição apagadas e ligar o pisca-alerta com o veículo em movimento.",
      "Ligar o farol alto para aumentar o feixe de luz e melhorar a visibilidade através da neblina.",
      "Manter acesos, pelo menos, as luzes de posição ou o farol baixo do veículo, sendo proibido o uso do pisca-alerta com o carro em movimento.",
      "Acionar o pisca-alerta e trafegar pelo acostamento até que a visibilidade melhore.",
    ],
    correctIndex: 2,
    explanation:
      "Em cerração/neblina: farol baixo ou luz de posição. Pisca-alerta com o carro em movimento é PROIBIDO — só em imobilizações ou emergências.",
    detailedExplanation:
      "O Art. 40 do CTB determina que o pisca-alerta só pode ser usado em imobilizações ou em situações de emergência. Andar com pisca-alerta ligado na neblina faz com que o motorista de trás pense que você está parado, podendo causar colisão traseira. Cerração é sinônimo de neblina densa.",
    legalBase: "Art. 40 do CTB",
    commonMistake:
      "Quase todo mundo liga o pisca-alerta na cerração na vida real — mas na prova isso está ERRADO. Além disso, 'cerração' confunde quem não sabe que é neblina densa.",
    tip: "Cerração = neblina. Pisca-alerta NUNCA com o carro andando.",
    incidence: "altissima",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp02",
    category: "infracoes",
    statement:
      "O condutor que deixa de guardar distância de segurança lateral e frontal entre o seu veículo e os demais, bem como em relação ao bordo da pista, considerando-se, no momento, a velocidade, as condições climáticas e do local, comete uma infração de natureza:",
    options: ["Média", "Grave", "Gravíssima", "Leve"],
    correctIndex: 1,
    explanation:
      "Art. 192 do CTB: infração GRAVE — 5 pontos na CNH e multa.",
    detailedExplanation:
      "Apesar do enunciado longo citar 'condições climáticas' e 'distância lateral e frontal', a resposta é simples: o Art. 192 classifica como GRAVE. Muita gente marca 'Gravíssima' por achar que é mais perigoso, mas a lei é clara.",
    legalBase: "Art. 192 do CTB",
    commonMistake:
      "Enunciado longo e 'independente das condições climáticas' tentam cansar e confundir. Muita gente marca Gravíssima — está errado.",
    tip: "Distância de segurança = GRAVE (5 pontos).",
    incidence: "altissima",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp03",
    category: "legislacao",
    statement: "O consumo de álcool pelo condutor causa, entre outros efeitos:",
    options: [
      "Perda total da visão",
      "Visão turva e agilidade",
      "Falta de atenção e sono",
      "Aumento dos reflexos e melhor coordenação motora",
    ],
    correctIndex: 2,
    explanation:
      "Álcool reduz reflexos, atenção e causa sonolência. 'Visão turva' está certa, mas 'agilidade' invalida a alternativa.",
    commonMistake:
      "Pegadinha de fim de frase: a opção começa correta ('visão turva') e termina errada ('agilidade'). Leia até a última palavra!",
    tip: "Álcool NUNCA dá agilidade. Leia a alternativa inteira.",
    incidence: "alta",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp04",
    category: "meio-ambiente",
    statement:
      "A principal consequência DIRETA para a SAÚDE HUMANA, decorrente da maior exposição aos raios ultravioleta (UV) provocada pelo buraco na camada de ozônio, é:",
    options: [
      "Aumento da temperatura global e desconforto térmico",
      "Maior incidência de doenças respiratórias, como asma e bronquite",
      "Aumento nos casos de câncer de pele e problemas oculares, como a catarata",
      "Aumento da quantidade de raios ultravioleta que chegam à Terra",
    ],
    correctIndex: 2,
    explanation:
      "A pergunta pede a consequência para a SAÚDE HUMANA. Câncer de pele e catarata são os efeitos diretos da radiação UV no corpo.",
    commonMistake:
      "Muita gente marca 'aumento de raios UV' — mas isso é a CAUSA, não a consequência na saúde.",
    tip: "Leia o enunciado: se pede 'saúde humana', procure efeito no CORPO.",
    incidence: "alta",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp05",
    category: "direcao-defensiva",
    statement:
      "A respeito do uso das luzes e do sistema de iluminação do veículo, de acordo com o CTB, é correto afirmar:",
    options: [
      "O condutor deve manter o farol baixo ligado dia e noite em qualquer tipo de via urbana ou de bairro.",
      "A troca de luz baixa e alta de forma intermitente só é permitida para indicar a intenção de ultrapassar ou alertar sobre riscos à segurança à frente.",
      "O uso do farolete substitui o farol baixo em rodovias durante o dia sob chuva forte.",
      "O farol alto deve ser mantido ligado permanentemente em vias com iluminação pública.",
    ],
    correctIndex: 1,
    explanation:
      "Intercalar farol alto e baixo (piscar) só é permitido para avisar ultrapassagem ou alertar risco.",
    commonMistake:
      "Palavras como 'qualquer', 'sempre' e 'permanentemente' geralmente invalidam a alternativa. Farol baixo de dia é obrigatório só em rodovias.",
    tip: "Cuidado com palavras absolutas: 'qualquer', 'sempre', 'nunca'.",
    legalBase: "Art. 40 do CTB",
    incidence: "alta",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp06",
    category: "prioridade",
    statement:
      "Em um cruzamento não sinalizado, a preferência de passagem do veículo que se desloca sobre trilhos em relação aos demais veículos é:",
    options: [
      "Apenas se o outro veículo for de menor porte",
      "Condicionada à sinalização semafórica local",
      "Absoluta, devendo os demais condutores aguardar a passagem dele",
      "Compartilhada, aplicando-se a regra da direita",
    ],
    correctIndex: 2,
    explanation:
      "Veículos sobre trilhos (trem, bonde) têm preferência ABSOLUTA — não desviam e não param rápido.",
    commonMistake:
      "O DETRAN não usa a palavra 'trem' — diz 'veículo que se desloca sobre trilhos'. Não confunda com 'carro passando por cima do trilho'.",
    tip: "Sobre trilhos = trem = preferência absoluta.",
    legalBase: "Art. 29, VII do CTB",
    incidence: "alta",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp07",
    category: "legislacao",
    statement:
      "De acordo com o CTB, são consideradas vias terrestres urbanas e rurais as ruas, avenidas, logradouros, caminhos, passagens e estradas, ALÉM DE:",
    options: [
      "Áreas privadas e estacionamentos de comércios de bairro",
      "As praias abertas à circulação pública e as vias internas pertencentes aos condomínios constituídos por unidades autônomas",
      "Vias particulares e condomínios fechados, onde o CTB não tem poder de fiscalização",
      "Zonas de preservação ambiental e calçadões litorâneos privatizados",
    ],
    correctIndex: 1,
    explanation:
      "Praias abertas à circulação pública e vias internas de condomínios são consideradas vias terrestres — o CTB se aplica ali!",
    commonMistake:
      "O 'bom senso' leva a marcar 'área privada' por achar que condomínio fechado não é público. ERRADO — o CTB vale lá dentro.",
    tip: "Condomínio + praia = via terrestre. CTB se aplica.",
    legalBase: "Art. 2º, parágrafo único do CTB",
    incidence: "alta",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp08",
    category: "primeiros-socorros",
    statement:
      "Em situações excepcionais, quando houver necessidade absoluta de movimentar uma vítima com suspeita de lesão na coluna antes da chegada do socorro especializado, o procedimento correto é:",
    options: [
      "Puxar a vítima pelos braços ou pelas pernas o mais rápido possível para retirá-la do local",
      "Levantar a vítima individualmente, colocando-a sentada no banco de trás de um veículo particular",
      "Utilizar três pessoas para erguer a vítima em bloco, mantendo o corpo alinhado: uma segura a cabeça e o pescoço, a outra o tronco e a terceira as pernas",
      "Virar a cabeça da vítima para os lados para verificar se há fraturas no pescoço antes de movê-la",
    ],
    correctIndex: 2,
    explanation:
      "Rolamento em bloco com 3 pessoas: cabeça/pescoço, tronco e pernas — para proteger a coluna.",
    tip: "Movimentou vítima? Sempre em BLOCO, com 3 pessoas.",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "qp09",
    category: "primeiros-socorros",
    statement: "O conceito correto de Primeiros Socorros no trânsito consiste em:",
    options: [
      "Aplicar técnicas médicas avançadas e medicar a vítima imediatamente no local do acidente",
      "Prestar o atendimento inicial e temporário à vítima, garantindo o suporte básico até a chegada do socorro profissional especializado",
      "Transportar a vítima rapidamente para o hospital mais próximo, mesmo sem imobilizá-la",
      "Realizar pequenos procedimentos cirúrgicos de emergência para conter hemorragias internas graves",
    ],
    correctIndex: 1,
    explanation:
      "Primeiros socorros = atendimento INICIAL e TEMPORÁRIO até o socorro profissional chegar.",
    commonMistake: "Alternativas com 'medicar', 'cirurgia' ou 'técnicas médicas' estão sempre erradas — leigo não substitui médico.",
    tip: "Inicial + temporário = primeiros socorros.",
    incidence: "alta",
    difficulty: 2,
  },
  {
    id: "qp10",
    category: "direcao-defensiva",
    statement:
      "O verdadeiro conceito de Direção Defensiva pode ser definido como:",
    options: [
      "O ato de evitar acidentes, mortes e prejuízos a qualquer custo, independentemente das condições de manutenção do carro ou do clima",
      "Um tipo de acidente misterioso onde o condutor não consegue realizar nenhuma manobra para evitar a colisão",
      "O conjunto de técnicas e procedimentos que capacita o condutor a dirigir prevenindo acidentes, apesar das condições adversas e das ações incorretas de outros motoristas ou pedestres",
      "A habilidade de dirigir em alta velocidade com segurança, confiando plenamente nos reflexos do motorista",
    ],
    correctIndex: 2,
    explanation:
      "Direção defensiva: prevenir acidentes APESAR das condições adversas e dos erros dos outros.",
    commonMistake:
      "A palavra 'a qualquer custo' invalida a alternativa. E 'acidente misterioso' é outro conceito (acidente sem causa aparente), não é direção defensiva.",
    tip: "Procure a palavra 'apesar' — ela aparece na resposta certa.",
    incidence: "alta",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp11",
    category: "prioridade",
    statement:
      "Em um cruzamento sem sinalização (sem placas e sem semáforo), entre dois veículos que se aproximam ao mesmo tempo, a preferência de passagem é:",
    options: [
      "Do veículo que trafega pela via mais larga ou movimentada",
      "Do veículo que estiver em maior velocidade",
      "Do veículo que vier pela direita do outro",
      "De qualquer um dos dois, desde que pisque o farol para pedir passagem",
    ],
    correctIndex: 2,
    explanation:
      "Cruzamento sem sinalização: preferência é SEMPRE de quem vem pela DIREITA.",
    commonMistake:
      "Vida real: motorista acha que rua 'mais larga' tem preferência. ERRADO — sem placa, vale a regra da direita.",
    tip: "Sem placa, sem semáforo? Direita passa.",
    legalBase: "Art. 29, III do CTB",
    incidence: "altissima",
    difficulty: 2,
  },
  {
    id: "qp12",
    category: "legislacao",
    statement:
      "O condutor, com o braço esquerdo na posição HORIZONTAL para fora do veículo (estendido para o lado), está sinalizando que vai:",
    options: [
      "Diminuir a marcha do veículo",
      "Parar o veículo imediatamente",
      "Virar à esquerda",
      "Permitir a ultrapassagem pela esquerda",
    ],
    correctIndex: 2,
    explanation:
      "Braço esquerdo estendido HORIZONTALMENTE para fora do veículo = vou VIRAR À ESQUERDA.",
    detailedExplanation:
      "Art. 38 do CTB / Resolução CONTRAN. Os 3 sinais de braço que caem na prova: (1) braço HORIZONTAL para fora = virar à ESQUERDA; (2) braço para CIMA (cotovelo dobrado, mão pra cima) = virar à DIREITA; (3) braço para BAIXO, movimentando de cima pra baixo = vou DIMINUIR ou PARAR.",
    commonMistake:
      "Pegadinha clássica: a banca troca a posição do braço. Muita gente confunde 'horizontal' com 'pra baixo' e marca 'diminuir/parar'. Decore: HORIZONTAL = ESQUERDA.",
    tip: "Braço reto pro lado = ESQUERDA. Pra cima = DIREITA. Pra baixo = PARAR.",
    legalBase: "Art. 38 do CTB",
    incidence: "altissima",
    trap: true,
    difficulty: 2,
  },
  {
    id: "qp13",
    category: "legislacao",
    statement:
      "O condutor com o braço esquerdo para fora do veículo, dobrado no cotovelo com a mão apontando para CIMA, está sinalizando que vai:",
    options: [
      "Virar à esquerda",
      "Virar à direita",
      "Dar passagem ao veículo de trás",
      "Reduzir a velocidade",
    ],
    correctIndex: 1,
    explanation:
      "Braço esquerdo dobrado com a mão para CIMA = vou VIRAR À DIREITA.",
    commonMistake:
      "A pegadinha é o braço estar do lado ESQUERDO. Muitos marcam 'esquerda' por reflexo — mas a posição da MÃO é que define: pra cima = direita.",
    tip: "Mão pra cima = direita, mesmo com o braço do lado esquerdo.",
    legalBase: "Art. 38 do CTB",
    incidence: "alta",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp14",
    category: "direcao-defensiva",
    statement:
      "Ao se aproximar de um cruzamento onde pretende CONVERTER À ESQUERDA, em via de mão dupla, o condutor deve:",
    options: [
      "Acionar a seta esquerda apenas no momento da curva, manter a faixa da direita e avançar rapidamente para não atrapalhar o trânsito de trás.",
      "Sinalizar com antecedência, deslocar-se para a faixa da esquerda, reduzir a velocidade e dar preferência aos veículos que venham em sentido contrário.",
      "Buzinar para avisar os outros motoristas, acelerar e cruzar a via antes do veículo que vem em sentido contrário, garantindo a passagem.",
      "Sinalizar com a seta direita para enganar quem vem atrás e fazer a curva pela contramão para ganhar tempo.",
    ],
    correctIndex: 1,
    explanation:
      "Conversão à esquerda: sinalizar com antecedência, posicionar-se à esquerda, reduzir e DAR PREFERÊNCIA a quem vem em sentido contrário.",
    commonMistake:
      "Pegadinha das opções longas e 'quase certas': a alternativa A começa parecendo razoável (acionar seta, manter faixa) mas erra ao mandar avançar rápido e usar a faixa errada. Sempre leia até o final.",
    tip: "Virar à esquerda = sinalizar ANTES, ir pra faixa da esquerda, REDUZIR e dar preferência a quem vem de frente.",
    legalBase: "Art. 38 do CTB",
    incidence: "altissima",
    trap: true,
    difficulty: 3,
  },
  {
    id: "qp15",
    category: "legislacao",
    statement:
      "Antes de efetuar qualquer manobra que implique deslocamento lateral (mudança de faixa, conversão, ultrapassagem), o condutor é OBRIGADO a:",
    options: [
      "Apenas olhar pelo retrovisor interno e iniciar a manobra.",
      "Buzinar três vezes e seguir em frente.",
      "Certificar-se de que pode executá-la sem perigo para os demais e indicar com antecedência a sua intenção, por meio de luz indicadora ou gesto convencional de braço.",
      "Acelerar bruscamente para abrir espaço entre os veículos.",
    ],
    correctIndex: 2,
    explanation:
      "Art. 35 do CTB: antes de qualquer manobra lateral é OBRIGATÓRIO certificar-se da segurança E sinalizar com antecedência (seta ou braço).",
    commonMistake:
      "Cuidado: a alternativa correta é a mais LONGA — muita gente descarta logo achando 'enrolação'. Na prova do DETRAN, a opção certa costuma ser a mais detalhada.",
    tip: "Manobra lateral = SEGURANÇA + SINALIZAÇÃO antecipada. Sempre.",
    legalBase: "Art. 35 do CTB",
    incidence: "alta",
    trap: true,
    difficulty: 2,
  },
];





export function getRandomizedQuestions(
  count: number,
  opts?: { categories?: Category[]; seed?: number; exclude?: string[]; placasCount?: number }
): Question[] {
  let pool = opts?.categories?.length
    ? QUESTIONS.filter((q) => opts.categories!.includes(q.category))
    : [...QUESTIONS];

  if (opts?.exclude?.length) {
    const ex = new Set(opts.exclude);
    const filtered = pool.filter((q) => !ex.has(q.id));
    // se filtrou demais e não dá pra completar, libera os já vistos para evitar set vazio
    if (filtered.length >= count) pool = filtered;
    else if (filtered.length > 0) pool = filtered.concat(pool.filter((q) => ex.has(q.id)));
  }

  // Modo simulado: 3 placas + (count-3) demais categorias
  if (opts?.placasCount && opts.placasCount > 0 && !opts.categories?.length) {
    const placasPool = pool.filter((q) => q.category === "placas");
    const restPool = pool.filter((q) => q.category !== "placas");
    const pickWeighted = (arr: Question[], n: number) =>
      arr
        .map((q) => ({ q, s: Math.random() * INCIDENCE_META[q.incidence].weight }))
        .sort((a, b) => b.s - a.s)
        .slice(0, n)
        .map((x) => x.q);
    const placas = pickWeighted(placasPool, Math.min(opts.placasCount, placasPool.length));
    const rest = pickWeighted(restPool, Math.max(0, count - placas.length));
    const merged = [...placas, ...rest];
    // embaralha posição final
    for (let i = merged.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [merged[i], merged[j]] = [merged[j], merged[i]];
    }
    return merged.map(shuffleOptions);
  }

  const weighted = pool
    .map((q) => ({
      q,
      score: Math.random() * INCIDENCE_META[q.incidence].weight,
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.q);

  const picked = weighted.slice(0, Math.min(count, weighted.length));

  return picked.map(shuffleOptions);
}

function shuffleOptions(q: Question): Question {
  const indices = q.options.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newOptions = indices.map((i) => q.options[i]);
  const newCorrect = indices.indexOf(q.correctIndex);
  return { ...q, options: newOptions, correctIndex: newCorrect };
}
