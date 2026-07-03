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
  { id: "qe01", category: "legislacao", statement: "O processo de habilitação inicia-se com a abertura do RENACH no:", options: ["DETRAN do estado de residência", "Cartório civil", "Ministério dos Transportes", "Sindicato dos condutores"], correctIndex: 0, explanation: "O RENACH é aberto no DETRAN do estado em que o candidato reside.", legalBase: "Res. CONTRAN 168/2004", incidence: "alta", difficulty: 1 },
  { id: "qe02", category: "legislacao", statement: "A Permissão para Dirigir tem validade de:", options: ["6 meses", "1 ano", "2 anos", "5 anos"], correctIndex: 1, explanation: "A PPD vale 1 ano; após esse período sem infrações graves/gravíssimas ou reincidência em média, é convertida em CNH definitiva.", legalBase: "Art. 148, §3º CTB", incidence: "altissima", difficulty: 1 },
  { id: "qe03", category: "legislacao", statement: "O limite de pontos para suspensão da CNH (sem infrações gravíssimas) é de:", options: ["10", "14", "20", "30"], correctIndex: 2, explanation: "Lei 14.071/21: 20 pontos sem nenhuma gravíssima; 16 com uma gravíssima; 14 com duas ou mais gravíssimas.", legalBase: "Art. 261 CTB", commonMistake: "A regra mudou: não é mais 20 pontos fixos.", incidence: "altissima", trap: true, difficulty: 2 },
  { id: "qe04", category: "legislacao", statement: "Para condutores que exercem atividade remunerada (EAR), o limite de pontos é:", options: ["20 pontos sempre", "40 pontos sempre", "Mesmo limite dos demais condutores", "Não há limite"], correctIndex: 2, explanation: "Desde a Lei 14.071/21 o limite é igual para todos; o que muda é a obrigação de exame toxicológico.", incidence: "alta", difficulty: 2 },
  { id: "qe05", category: "legislacao", statement: "É documento obrigatório de porte do condutor:", options: ["CNH e CRLV", "Apenas a CNH", "Apenas o CRLV", "RG e CPF"], correctIndex: 0, explanation: "Condutor deve portar CNH (ou CNH Digital) e o CRLV do veículo (físico ou digital).", legalBase: "Art. 159 CTB", incidence: "alta", difficulty: 1 },
  { id: "qe06", category: "legislacao", statement: "A categoria 'A' habilita a conduzir:", options: ["Carros de até 3.500 kg", "Motocicletas e ciclomotores", "Caminhões", "Ônibus"], correctIndex: 1, explanation: "Categoria A é exclusiva de motos e similares.", legalBase: "Art. 143 CTB", incidence: "alta", difficulty: 1 },
  { id: "qe07", category: "legislacao", statement: "Conduzir veículo sem CNH ou Permissão é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 3, explanation: "Gravíssima, multa x3 e retenção do veículo.", legalBase: "Art. 162, I CTB", incidence: "altissima", difficulty: 1 },
  { id: "qe08", category: "legislacao", statement: "A reciclagem do condutor é obrigatória quando:", options: ["A CNH atinge o limite de pontos e o direito de dirigir é suspenso", "A cada renovação", "A cada 5 anos sempre", "Apenas para EAR"], correctIndex: 0, explanation: "Curso de reciclagem é exigido após suspensão ou cassação.", legalBase: "Art. 268 CTB", incidence: "alta", difficulty: 2 },
  { id: "qe09", category: "legislacao", statement: "Para mudar a categoria da CNH, o condutor deve:", options: ["Esperar 2 anos sem infração gravíssima e nenhuma média reincidente nos últimos 12 meses", "Pagar uma taxa adicional apenas", "Solicitar imediatamente", "Aguardar 5 anos"], correctIndex: 0, explanation: "Para adição/mudança é exigido o prazo de 1 ano de habilitação e ausência de gravíssimas nos últimos 12 meses.", incidence: "media", difficulty: 2 },
  { id: "qe10", category: "legislacao", statement: "A idade mínima para obter CNH é:", options: ["16 anos", "17 anos", "18 anos", "21 anos"], correctIndex: 2, explanation: "18 anos completos.", legalBase: "Art. 140 CTB", incidence: "alta", difficulty: 1 },
  { id: "qe11", category: "legislacao", statement: "A CNH Definitiva é obtida após:", options: ["Aprovação direta no exame", "1 ano de PPD sem cometer infração grave/gravíssima ou reincidir em média", "Pagamento adicional", "3 anos de habilitação"], correctIndex: 1, explanation: "Conversão automática após 1 ano sem essas infrações.", legalBase: "Art. 148 CTB", incidence: "altissima", trap: true, difficulty: 2 },
  { id: "qe12", category: "legislacao", statement: "Exame toxicológico é obrigatório para condutores das categorias:", options: ["A e B", "C, D e E", "Apenas D", "Todos"], correctIndex: 1, explanation: "Obrigatório para C, D e E (renovação, mudança e adição).", legalBase: "Art. 148-A CTB", incidence: "alta", difficulty: 2 },
  { id: "qe13", category: "infracoes", statement: "Estacionar em vaga de idoso sem credencial é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 1, explanation: "Média, 4 pontos.", legalBase: "Art. 181, XVII CTB", incidence: "media", difficulty: 1 },
  { id: "qe14", category: "infracoes", statement: "Estacionar em vaga PCD sem credencial é infração:", options: ["Leve", "Grave", "Gravíssima", "Média"], correctIndex: 2, explanation: "Gravíssima, 7 pontos.", incidence: "alta", difficulty: 1 },
  { id: "qe15", category: "infracoes", statement: "Não usar cinto de segurança é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 2, explanation: "Grave, 5 pontos.", legalBase: "Art. 167 CTB", incidence: "alta", difficulty: 1 },
  { id: "qe16", category: "infracoes", statement: "Dirigir usando celular SEGURANDO o aparelho é infração:", options: ["Média", "Grave", "Gravíssima", "Gravíssima multiplicada por 2"], correctIndex: 2, explanation: "Gravíssima, 7 pontos.", legalBase: "Art. 252, §1º CTB", incidence: "altissima", difficulty: 1 },
  { id: "qe17", category: "infracoes", statement: "Disputar corrida (racha) é infração:", options: ["Grave", "Gravíssima", "Gravíssima multiplicada por 10 + suspensão", "Média"], correctIndex: 2, explanation: "Gravíssima x10, suspensão do direito de dirigir e recolhimento da CNH; ainda configura crime.", legalBase: "Art. 173/308 CTB", incidence: "alta", difficulty: 2 },
  { id: "qe18", category: "infracoes", statement: "Transitar 20% a 50% acima da velocidade permitida é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 2, explanation: "Grave, 5 pontos.", legalBase: "Art. 218, II CTB", incidence: "altissima", difficulty: 2 },
  { id: "qe19", category: "infracoes", statement: "Transitar acima de 50% da velocidade permitida é infração:", options: ["Grave", "Gravíssima x3 + suspensão", "Média", "Leve"], correctIndex: 1, explanation: "Gravíssima multiplicada por 3, com suspensão imediata.", legalBase: "Art. 218, III CTB", incidence: "alta", difficulty: 2 },
  { id: "qe20", category: "infracoes", statement: "Não dar preferência a pedestre na faixa é infração:", options: ["Leve", "Grave", "Gravíssima", "Média"], correctIndex: 2, explanation: "Gravíssima, 7 pontos.", legalBase: "Art. 214 CTB", incidence: "alta", difficulty: 1 },
  { id: "qe21", category: "infracoes", statement: "Transportar criança menor de 10 anos no banco da frente é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 3, explanation: "Gravíssima, 7 pontos.", legalBase: "Art. 168 CTB", incidence: "alta", difficulty: 1 },
  { id: "qe22", category: "infracoes", statement: "Ultrapassar pela direita (salvo exceções legais) é infração:", options: ["Grave", "Gravíssima", "Média", "Leve"], correctIndex: 1, explanation: "Gravíssima, 7 pontos.", legalBase: "Art. 199 CTB", incidence: "alta", difficulty: 2 },
  { id: "qe23", category: "infracoes", statement: "Ultrapassar em local proibido (faixa contínua, curva, ponte) é:", options: ["Grave", "Média", "Gravíssima multiplicada por 5", "Leve"], correctIndex: 2, explanation: "Gravíssima x5, suspensão.", legalBase: "Art. 191 CTB", incidence: "altissima", difficulty: 1 },
  { id: "qe24", category: "infracoes", statement: "Recusar-se ao teste do bafômetro:", options: ["É direito do condutor sem penalidade", "Configura infração leve", "Tem a mesma penalidade de dirigir alcoolizado (gravíssima x10)", "Configura infração grave"], correctIndex: 2, explanation: "A recusa tem mesma sanção administrativa do art. 165.", legalBase: "Art. 165-A CTB", incidence: "altissima", trap: true, difficulty: 2 },
  { id: "qe25", category: "infracoes", statement: "Conduzir com CNH vencida há mais de 30 dias é infração:", options: ["Leve", "Média", "Gravíssima", "Grave"], correctIndex: 2, explanation: "Gravíssima, 7 pontos e retenção do veículo.", legalBase: "Art. 162, V CTB", incidence: "alta", difficulty: 1 },
  { id: "qe26", category: "infracoes", statement: "Buzinar em local proibido ou entre 22h e 6h é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 0, explanation: "Leve, 3 pontos.", legalBase: "Art. 227 CTB", incidence: "media", difficulty: 2 },
  { id: "qe27", category: "direcao-defensiva", statement: "A condução defensiva visa principalmente:", options: ["Chegar mais rápido", "Prevenir acidentes, mesmo por erro de terceiros", "Economizar combustível", "Cumprir prazos comerciais"], correctIndex: 1, explanation: "É evitar acidentes apesar das ações erradas dos outros e das condições adversas.", incidence: "altissima", difficulty: 1 },
  { id: "qe28", category: "direcao-defensiva", statement: "Condições adversas de luz incluem:", options: ["Neblina densa", "Sol baixo no horizonte ofuscando a visão", "Pista molhada", "Pneu careca"], correctIndex: 1, explanation: "Adversidade de LUZ refere-se a sol ofuscante, escuridão, faróis altos vindo de frente etc.", incidence: "alta", trap: true, difficulty: 2 },
  { id: "qe29", category: "direcao-defensiva", statement: "Para ultrapassar com segurança, o condutor deve:", options: ["Acelerar bruscamente sem sinalizar", "Sinalizar, verificar retrovisores e ponto cego, ultrapassar e retornar com segurança", "Buzinar e seguir", "Manter a faixa esquerda permanentemente"], correctIndex: 1, explanation: "Sequência: sinaliza → verifica → ultrapassa → retorna.", incidence: "alta", difficulty: 1 },
  { id: "qe30", category: "direcao-defensiva", statement: "Em pista molhada, a aquaplanagem é causada por:", options: ["Excesso de velocidade sobre lâmina d'água que faz o pneu perder contato com o solo", "Pneu quente", "Freios novos", "Câmbio automático"], correctIndex: 0, explanation: "Velocidade alta + água acumulada + pneu desgastado = perda de contato.", incidence: "alta", difficulty: 2 },
  { id: "qe31", category: "direcao-defensiva", statement: "Em caso de aquaplanagem o condutor deve:", options: ["Frear bruscamente", "Tirar o pé do acelerador, segurar firme a direção e NÃO frear bruscamente", "Acelerar mais", "Virar a direção bruscamente"], correctIndex: 1, explanation: "Tirar o pé, segurar a direção, evitar freadas e movimentos bruscos até recuperar aderência.", incidence: "altissima", difficulty: 2 },
  { id: "qe32", category: "direcao-defensiva", statement: "Ao dirigir cansado o condutor deve:", options: ["Tomar bebida energética e seguir", "Parar em local seguro para descansar", "Aumentar a velocidade para chegar logo", "Ligar o ar-condicionado no máximo"], correctIndex: 1, explanation: "Sono não se vence: pare e descanse.", incidence: "alta", difficulty: 1 },
  { id: "qe33", category: "direcao-defensiva", statement: "Ponto cego é:", options: ["Área não enxergada pelos retrovisores", "Farol queimado", "Para-brisa sujo", "Lâmpada queimada do painel"], correctIndex: 0, explanation: "Área lateral-traseira invisível mesmo com retrovisores ajustados; deve-se virar a cabeça antes de mudar de faixa.", incidence: "alta", difficulty: 1 },
  { id: "qe34", category: "direcao-defensiva", statement: "À noite, em estrada sem iluminação, o farol correto é:", options: ["Baixo sempre", "Alto, reduzindo para baixo ao cruzar com outro veículo", "Pisca-alerta", "Meia-luz"], correctIndex: 1, explanation: "Use farol alto, baixando quando cruzar com outro condutor para não ofuscar.", legalBase: "Art. 40 CTB", incidence: "alta", difficulty: 2 },
  { id: "qe35", category: "direcao-defensiva", statement: "Em túneis o farol deve estar:", options: ["Apagado", "Baixo ligado mesmo de dia", "Alto sempre", "Pisca-alerta"], correctIndex: 1, explanation: "Farol baixo obrigatório, independentemente da hora.", legalBase: "Art. 40 CTB", incidence: "alta", difficulty: 1 },
  { id: "qe36", category: "direcao-defensiva", statement: "Distância de frenagem aumenta com:", options: ["Velocidade alta, pista molhada e pneus desgastados", "Veículo leve", "Freios ABS novos", "Câmbio manual"], correctIndex: 0, explanation: "Mais velocidade e menor aderência aumentam a distância para parar.", incidence: "alta", difficulty: 2 },
  { id: "qe37", category: "primeiros-socorros", statement: "A sigla PAS significa:", options: ["Parar-Aguardar-Sair", "Proteger-Avisar-Socorrer", "Pedir-Ajudar-Salvar", "Prevenir-Atender-Sinalizar"], correctIndex: 1, explanation: "Proteger o local, Avisar autoridades, Socorrer com cuidado.", incidence: "altissima", difficulty: 1 },
  { id: "qe38", category: "primeiros-socorros", statement: "Para hemorragia externa intensa, o procedimento inicial é:", options: ["Aplicar torniquete imediatamente", "Comprimir o local com pano limpo", "Esperar socorro sem agir", "Lavar com álcool"], correctIndex: 1, explanation: "Compressão direta com pano limpo até a chegada do socorro.", incidence: "alta", difficulty: 2 },
  { id: "qe39", category: "primeiros-socorros", statement: "Vítima com suspeita de fratura na coluna deve ser:", options: ["Movida rapidamente", "Mantida imóvel até a chegada do socorro especializado", "Colocada sentada", "Sacudida para reagir"], correctIndex: 1, explanation: "Não mover, salvo risco iminente (fogo, explosão).", incidence: "altissima", trap: true, difficulty: 2 },
  { id: "qe40", category: "primeiros-socorros", statement: "O telefone do SAMU é:", options: ["190", "192", "193", "199"], correctIndex: 1, explanation: "192 SAMU, 193 Bombeiros, 190 Polícia.", incidence: "alta", difficulty: 1 },
  { id: "qe41", category: "primeiros-socorros", statement: "Distância mínima para colocar o triângulo de sinalização em via comum é:", options: ["10 m", "30 m", "100 m", "5 m"], correctIndex: 1, explanation: "30 m em via urbana/rodovia comum; em rodovias de alta velocidade considerar maior distância.", incidence: "alta", difficulty: 2 },
  { id: "qe42", category: "primeiros-socorros", statement: "Diante de queimadura, o correto é:", options: ["Passar pasta de dente ou manteiga", "Resfriar com água corrente em temperatura ambiente", "Estourar bolhas", "Aplicar gelo direto"], correctIndex: 1, explanation: "Resfriar com água; nunca usar remédios caseiros nem estourar bolhas.", incidence: "media", difficulty: 2 },
  { id: "qe43", category: "primeiros-socorros", statement: "Vítima consciente em estado de choque deve ser:", options: ["Deitada com pernas elevadas e mantida aquecida", "Sentada e oferecendo água", "Em pé andando", "Colocada de bruços"], correctIndex: 0, explanation: "Posição de choque: deitada com pernas elevadas, agasalhada.", incidence: "media", difficulty: 2 },
  { id: "qe44", category: "meio-ambiente", statement: "O principal poluente emitido por motores a combustão é:", options: ["Oxigênio", "Monóxido e dióxido de carbono", "Vapor de água puro", "Hidrogênio"], correctIndex: 1, explanation: "CO e CO2 são os principais gases liberados.", incidence: "media", difficulty: 1 },
  { id: "qe45", category: "meio-ambiente", statement: "Direção econômica contribui para o meio ambiente porque:", options: ["Reduz consumo de combustível e emissões", "Aumenta velocidade", "Aquece o motor mais rápido", "Reduz a vida útil do veículo"], correctIndex: 0, explanation: "Menos combustível = menos poluição.", incidence: "alta", difficulty: 1 },
  { id: "qe46", category: "meio-ambiente", statement: "Jogar lixo pela janela do veículo é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 1, explanation: "Média, 4 pontos.", legalBase: "Art. 172 CTB", incidence: "media", difficulty: 1 },
  { id: "qe47", category: "meio-ambiente", statement: "Uso de buzina desnecessário gera poluição:", options: ["Visual", "Sonora", "Atmosférica", "Hídrica"], correctIndex: 1, explanation: "Buzina = poluição sonora.", incidence: "media", difficulty: 1 },
  { id: "qe48", category: "meio-ambiente", statement: "Cidadania no trânsito envolve principalmente:", options: ["Respeito mútuo, prudência e responsabilidade", "Prioridade absoluta dos carros", "Pressa e individualismo", "Buzinar para tudo"], correctIndex: 0, explanation: "Trânsito seguro depende de respeito e responsabilidade coletiva.", incidence: "alta", difficulty: 1 },
  { id: "qe49", category: "mecanica", statement: "O nível baixo de óleo do motor pode causar:", options: ["Aumento da potência", "Superaquecimento e desgaste do motor", "Economia de combustível", "Melhora na frenagem"], correctIndex: 1, explanation: "Falta de lubrificação aquece e danifica peças móveis.", incidence: "alta", difficulty: 1 },
  { id: "qe50", category: "mecanica", statement: "Pneu careca aumenta o risco de:", options: ["Aquaplanagem e perda de aderência", "Maior economia", "Menos desgaste", "Melhor frenagem"], correctIndex: 0, explanation: "Sem sulcos a água não escoa e a aderência cai.", incidence: "altissima", difficulty: 1 },
  { id: "qe51", category: "mecanica", statement: "O líquido de arrefecimento serve para:", options: ["Lubrificar o motor", "Manter a temperatura do motor", "Limpar o para-brisa", "Acionar os freios"], correctIndex: 1, explanation: "Mantém o motor na temperatura ideal de funcionamento.", incidence: "media", difficulty: 1 },
  { id: "qe52", category: "mecanica", statement: "A luz amarela do painel indica:", options: ["Emergência grave e parada imediata", "Alerta/atenção: verificar em breve", "Funcionamento normal", "Nada significativo"], correctIndex: 1, explanation: "Amarelo = atenção; vermelho = perigo/parada.", incidence: "alta", difficulty: 1 },
  { id: "qe53", category: "mecanica", statement: "O fluido de freio deve ser trocado:", options: ["Nunca", "Conforme manual do fabricante (em geral a cada 1-2 anos)", "Somente em pane", "A cada 10 anos"], correctIndex: 1, explanation: "É higroscópico (absorve água) e perde eficiência com o tempo.", incidence: "media", difficulty: 2 },
  { id: "qe54", category: "mecanica", statement: "Para conferir a pressão dos pneus, deve-se:", options: ["Verificar com pneus a frio", "Verificar somente com pneus quentes", "Não importa a temperatura", "Encher sempre acima do recomendado"], correctIndex: 0, explanation: "Pneus frios garantem leitura correta; quentes inflam e enganam o medidor.", incidence: "alta", difficulty: 2 },
  { id: "qe55", category: "prioridade", statement: "Veículos de emergência em serviço (ambulância, polícia, bombeiros):", options: ["Devem aguardar a vez", "Têm prioridade absoluta, mesmo sobre sinalização", "Só têm prioridade em vias rurais", "Não têm prioridade"], correctIndex: 1, explanation: "Sirene + giroflex ligados = prioridade total.", legalBase: "Art. 29, VII CTB", incidence: "altissima", difficulty: 1 },
  { id: "qe56", category: "prioridade", statement: "Em via preferencial, o veículo que entra a partir de via secundária:", options: ["Tem preferência", "Deve dar passagem aos que estão na preferencial", "Deve buzinar e seguir", "Tem preferência se for maior"], correctIndex: 1, explanation: "Quem entra cede passagem.", incidence: "alta", difficulty: 1 },
  { id: "qe57", category: "prioridade", statement: "Veículo subindo em ladeira estreita tem:", options: ["Que ceder passagem ao que desce", "Preferência sobre o que desce", "Mesma preferência", "Preferência apenas à noite"], correctIndex: 1, explanation: "Quem sobe tem preferência porque manobrar para trás na subida é mais perigoso.", legalBase: "Art. 29, III, 'e' CTB", incidence: "media", trap: true, difficulty: 2 },
  { id: "qe58", category: "prioridade", statement: "Ciclistas e pedestres na via:", options: ["Têm sempre preferência por serem mais vulneráveis", "Devem ceder ao automóvel", "Não devem usar a via", "Têm preferência apenas em ciclovia"], correctIndex: 0, explanation: "Vulneráveis têm preferência (art. 29, §2º).", incidence: "alta", difficulty: 1 },
  { id: "qe59", category: "legislacao", statement: "Multa por avançar parada obrigatória (placa PARE) é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 3, explanation: "Gravíssima, 7 pontos.", legalBase: "Art. 208 CTB", incidence: "alta", difficulty: 1 },
  { id: "qe60", category: "direcao-defensiva", statement: "Em descidas longas, a forma correta de usar o freio é:", options: ["Pisar continuamente no freio", "Usar freio motor (marcha reduzida) e o freio de serviço pontualmente", "Engatar ponto morto (banguela)", "Desligar o motor"], correctIndex: 1, explanation: "Freio-motor evita superaquecimento dos freios; banguela é infração gravíssima.", legalBase: "Art. 252, V CTB", incidence: "altissima", trap: true, difficulty: 2 },
  { id: "qe61", category: "infracoes", statement: "Dirigir em 'banguela' (motor desligado ou ponto morto em descida) é infração:", options: ["Leve", "Grave", "Gravíssima", "Média"], correctIndex: 2, explanation: "Gravíssima, 7 pontos.", legalBase: "Art. 252, V CTB", incidence: "alta", difficulty: 2 },
  { id: "qe62", category: "legislacao", statement: "Para condutor que comete infração gravíssima na PPD, ocorre:", options: ["Nada", "Não obtém a CNH definitiva e reinicia o processo", "Multa apenas", "Aumento de pontos"], correctIndex: 1, explanation: "Reinício do processo de habilitação.", legalBase: "Art. 148 CTB", incidence: "alta", trap: true, difficulty: 2 },
  { id: "qe63", category: "legislacao", statement: "Cadeirinha/assento de elevação é obrigatório para crianças até:", options: ["4 anos", "7 anos e meio", "10 anos", "12 anos"], correctIndex: 2, explanation: "Resolução 819/21 CONTRAN: dispositivo de retenção até 10 anos OU 1,45 m; banco traseiro até 10 anos.", incidence: "altissima", difficulty: 2 },
  { id: "qe64", category: "direcao-defensiva", statement: "Ao ser ofuscado por farol alto de outro veículo à noite, o condutor deve:", options: ["Olhar fixamente para o farol", "Desviar o olhar para a margem direita da pista", "Acelerar para passar logo", "Apagar os próprios faróis"], correctIndex: 1, explanation: "Olhar à direita evita cegueira temporária.", incidence: "alta", difficulty: 2 },
  { id: "qe65", category: "direcao-defensiva", statement: "Pisca-alerta deve ser usado quando o veículo:", options: ["Estiver imobilizado em local que ofereça risco", "Estiver em movimento normal", "Em chuva", "Para agradecer outro condutor"], correctIndex: 0, explanation: "Apenas com veículo parado em local de risco.", legalBase: "Art. 251 CTB", incidence: "alta", trap: true, difficulty: 2 },
  { id: "qe66", category: "infracoes", statement: "Trafegar com o veículo na contramão é infração:", options: ["Grave", "Gravíssima", "Média", "Leve"], correctIndex: 1, explanation: "Gravíssima, 7 pontos.", legalBase: "Art. 186 CTB", incidence: "alta", difficulty: 1 },
  { id: "qe67", category: "infracoes", statement: "Deixar de prestar socorro à vítima de acidente quando podia fazê-lo é:", options: ["Apenas infração administrativa", "Crime de omissão de socorro", "Falta leve", "Sem consequência se chamar resgate"], correctIndex: 1, explanation: "É crime de trânsito (art. 304 CTB).", legalBase: "Art. 304 CTB", incidence: "alta", difficulty: 2 },
  { id: "qe68", category: "primeiros-socorros", statement: "Em caso de parada cardiorrespiratória, deve-se iniciar:", options: ["Manobra de Heimlich", "Massagem cardíaca + ventilação (RCP) se houver treinamento", "Tapas no rosto", "Esperar o SAMU sem agir"], correctIndex: 1, explanation: "RCP com 30 compressões para 2 ventilações (adulto).", incidence: "alta", difficulty: 2 },
  { id: "qe69", category: "meio-ambiente", statement: "A inspeção veicular tem como objetivo principal:", options: ["Aumentar arrecadação", "Garantir segurança e controle de emissões", "Reduzir o IPVA", "Substituir o licenciamento"], correctIndex: 1, explanation: "Verifica condições de segurança e poluentes.", incidence: "media", difficulty: 1 },
  { id: "qe70", category: "mecanica", statement: "Antes de viajar, é prudente verificar:", options: ["Apenas combustível", "Pneus, óleo, água, freios, faróis e documentação", "Apenas o som", "Apenas o ar-condicionado"], correctIndex: 1, explanation: "Checklist completo previne panes.", incidence: "alta", difficulty: 1 },
  { id: "qe71", category: "legislacao", statement: "Velocidade máxima padrão em via local urbana (sem placa) é:", options: ["30 km/h", "40 km/h", "60 km/h", "80 km/h"], correctIndex: 0, explanation: "Via local: 30 km/h; coletora: 40; arterial: 60; trânsito rápido: 80.", legalBase: "Art. 61 CTB", incidence: "altissima", difficulty: 2 },
  { id: "qe72", category: "legislacao", statement: "Velocidade máxima padrão em rodovia para automóveis é:", options: ["80 km/h", "90 km/h", "110 km/h", "120 km/h"], correctIndex: 2, explanation: "110 km/h para automóveis; 90 para ônibus/caminhões; 60 para os demais.", legalBase: "Art. 61 CTB", incidence: "alta", difficulty: 2 },
  { id: "qe73", category: "legislacao", statement: "Velocidade máxima padrão em estrada (não pavimentada/rural) é:", options: ["60 km/h", "80 km/h", "100 km/h", "120 km/h"], correctIndex: 0, explanation: "Estrada (não pavimentada): 60 km/h para automóveis.", legalBase: "Art. 61 CTB", incidence: "alta", difficulty: 2 },
  { id: "qe74", category: "direcao-defensiva", statement: "Em neblina densa, o farol correto é:", options: ["Alto", "Baixo + farol de neblina (se houver)", "Pisca-alerta", "Apagado"], correctIndex: 1, explanation: "Farol alto reflete na neblina e ofusca o próprio condutor.", incidence: "alta", trap: true, difficulty: 2 },
  { id: "qe75", category: "infracoes", statement: "Estacionar sobre a calçada é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 2, explanation: "Grave, 5 pontos.", legalBase: "Art. 181, VIII CTB", incidence: "media", difficulty: 1 },
  { id: "qe76", category: "infracoes", statement: "Deixar de usar o cinto de segurança nos bancos traseiros é infração:", options: ["Leve do passageiro", "Grave do condutor", "Sem multa", "Gravíssima"], correctIndex: 1, explanation: "Responsabilidade é do condutor; infração grave, 5 pontos.", incidence: "alta", difficulty: 2 },
  { id: "qe77", category: "direcao-defensiva", statement: "Beber pequena quantidade e dirigir:", options: ["É permitido até certo limite", "É infração gravíssima, qualquer concentração já é proibida", "Só vira infração com sintomas", "Vale apenas o exame de sangue"], correctIndex: 1, explanation: "Lei Seca: tolerância zero.", incidence: "altissima", trap: true, difficulty: 1 },
  { id: "qe78", category: "primeiros-socorros", statement: "Engasgo em adulto consciente é tratado com:", options: ["Manobra de Heimlich", "RCP imediata", "Água em jato", "Tapas no rosto"], correctIndex: 0, explanation: "Compressões abdominais (Heimlich) até desobstruir.", incidence: "media", difficulty: 2 },
  { id: "qe79", category: "meio-ambiente", statement: "Dirigir com escapamento adulterado/aberto é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 2, explanation: "Grave, 5 pontos.", legalBase: "Art. 230, IX CTB", incidence: "media", difficulty: 2 },
  { id: "qe80", category: "mecanica", statement: "Vazamento de combustível deve ser tratado como:", options: ["Problema sem urgência", "Emergência — risco de incêndio e dano ambiental", "Característica normal", "Sinal de bom desempenho"], correctIndex: 1, explanation: "Risco grave; pare e procure mecânico.", incidence: "media", difficulty: 1 },
  { id: "qe81", category: "prioridade", statement: "Veículo prestes a entrar numa via vindo de propriedade lindeira (garagem):", options: ["Tem preferência", "Deve dar preferência aos veículos e pedestres da via", "Pode buzinar e entrar", "Tem preferência se a saída for em rampa"], correctIndex: 1, explanation: "Quem sai de imóvel cede passagem.", legalBase: "Art. 36 CTB", incidence: "alta", difficulty: 2 },
  { id: "qe82", category: "legislacao", statement: "A placa do veículo deve estar:", options: ["Limpa e legível", "Pode estar suja", "Pintada à mão se quebrar", "Encoberta por adesivo"], correctIndex: 0, explanation: "Adulterar ou cobrir é gravíssima.", legalBase: "Art. 230, IV CTB", incidence: "alta", difficulty: 1 },
  { id: "qe83", category: "direcao-defensiva", statement: "Em ultrapassagens, a distância ideal para retornar à faixa é:", options: ["Logo que ultrapassar o para-choque", "Quando enxergar o veículo ultrapassado pelo retrovisor interno", "Sem critério", "Depois de 1 km"], correctIndex: 1, explanation: "Garantir que há espaço seguro para retornar.", incidence: "media", difficulty: 2 },
  { id: "qe84", category: "infracoes", statement: "Trafegar com farol apagado à noite é infração:", options: ["Leve", "Média", "Grave", "Gravíssima"], correctIndex: 1, explanation: "Média, 4 pontos.", legalBase: "Art. 250 CTB", incidence: "media", difficulty: 2 },
  { id: "qe85", category: "legislacao", statement: "Em rodovia de pista dupla com canteiro central, durante o dia, o farol baixo:", options: ["É proibido", "É obrigatório", "É opcional", "Só com chuva"], correctIndex: 1, explanation: "Lei do Farol Baixo: obrigatório em rodovias de dia.", legalBase: "Lei 13.290/16", incidence: "alta", difficulty: 2 },
  // 1 placa extra para fechar 15
  { id: "qp16", category: "placas", statement: "Quanto à classificação geral da sinalização vertical do CTB, qual grupo tem por objetivo principal AUXILIAR/ORIENTAR o condutor com informações de serviços (hospital, posto, telefone)?", options: ["Regulamentação", "Advertência", "Indicação", "Especiais"], correctIndex: 2, explanation: "Sinalização de Indicação informa serviços auxiliares e atrativos turísticos (placas azuis).", incidence: "media", difficulty: 2 },
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
