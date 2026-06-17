// Placas oficiais do CTB renderizadas em SVG (fiéis ao manual do CONTRAN).
// Identificadas pelo código oficial (R-, A-).

export type PlacaId =
  | "R-1"
  | "R-2"
  | "R-6a"
  | "R-6b"
  | "R-19"
  | "R-25a"
  | "R-25d"
  | "A-1a"
  | "A-2b"
  | "A-13a"
  | "A-32b"
  | "A-33a"
  | "I-Hospital"
  | "I-Posto";

interface Props {
  id: PlacaId;
  size?: number;
  className?: string;
}

export function Placa({ id, size = 160, className }: Props) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-white rounded-2xl p-4 shadow-card ${className ?? ""}`}
      style={{ width: size + 32, height: size + 32 }}
      aria-label={`Placa ${id}`}
      role="img"
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        {renderPlaca(id)}
      </svg>
    </div>
  );
}

function renderPlaca(id: PlacaId) {
  switch (id) {
    case "R-1": // PARE — octógono vermelho
      return (
        <>
          <polygon
            points="60,10 140,10 190,60 190,140 140,190 60,190 10,140 10,60"
            fill="#D7282F"
            stroke="#fff"
            strokeWidth="6"
          />
          <text
            x="100"
            y="120"
            textAnchor="middle"
            fill="#fff"
            fontSize="54"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            PARE
          </text>
        </>
      );

    case "R-2": // Dê a preferência — triângulo invertido
      return (
        <>
          <polygon
            points="10,30 190,30 100,185"
            fill="#fff"
            stroke="#D7282F"
            strokeWidth="14"
          />
        </>
      );

    case "R-6a": // Proibido estacionar — círculo vermelho com E cortado
      return (
        <>
          <circle cx="100" cy="100" r="90" fill="#fff" stroke="#D7282F" strokeWidth="14" />
          <text
            x="100"
            y="135"
            textAnchor="middle"
            fill="#000"
            fontSize="110"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            E
          </text>
          <line x1="35" y1="35" x2="165" y2="165" stroke="#D7282F" strokeWidth="14" />
        </>
      );

    case "R-6b": // Proibido parar e estacionar — círculo com "E" e X vermelho
      return (
        <>
          <circle cx="100" cy="100" r="90" fill="#fff" stroke="#D7282F" strokeWidth="14" />
          <text
            x="100"
            y="135"
            textAnchor="middle"
            fill="#000"
            fontSize="110"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            E
          </text>
          <line x1="35" y1="35" x2="165" y2="165" stroke="#D7282F" strokeWidth="14" />
          <line x1="165" y1="35" x2="35" y2="165" stroke="#D7282F" strokeWidth="14" />
        </>
      );

    case "R-19": // Velocidade máxima 60
      return (
        <>
          <circle cx="100" cy="100" r="90" fill="#fff" stroke="#D7282F" strokeWidth="14" />
          <text
            x="100"
            y="130"
            textAnchor="middle"
            fill="#000"
            fontSize="78"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            60
          </text>
        </>
      );

    case "R-25a": // Vire à esquerda
      return (
        <>
          <circle cx="100" cy="100" r="90" fill="#0B6BB5" />
          <path d="M120 60 L70 100 L120 140 L120 115 L150 115 L150 85 L120 85 Z" fill="#fff" />
        </>
      );

    case "R-25d": // Siga em frente
      return (
        <>
          <circle cx="100" cy="100" r="90" fill="#0B6BB5" />
          <path d="M100 40 L140 100 L115 100 L115 160 L85 160 L85 100 L60 100 Z" fill="#fff" />
        </>
      );

    case "A-1a": // Curva acentuada à esquerda — losango amarelo
      return (
        <>
          <polygon
            points="100,10 190,100 100,190 10,100"
            fill="#FFCB05"
            stroke="#000"
            strokeWidth="10"
          />
          <path
            d="M130 50 Q60 90 80 150 L70 130 M80 150 L100 145"
            fill="none"
            stroke="#000"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );

    case "A-2b": // Curva à direita
      return (
        <>
          <polygon
            points="100,10 190,100 100,190 10,100"
            fill="#FFCB05"
            stroke="#000"
            strokeWidth="10"
          />
          <path
            d="M70 50 Q140 90 120 150"
            fill="none"
            stroke="#000"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <polygon points="120,150 110,135 130,135" fill="#000" />
        </>
      );

    case "A-13a": // Confluência à esquerda
      return (
        <>
          <polygon
            points="100,10 190,100 100,190 10,100"
            fill="#FFCB05"
            stroke="#000"
            strokeWidth="10"
          />
          <line x1="100" y1="180" x2="100" y2="100" stroke="#000" strokeWidth="10" />
          <line x1="100" y1="100" x2="60" y2="60" stroke="#000" strokeWidth="10" />
        </>
      );

    case "A-32b": // Passagem sinalizada de pedestres
      return (
        <>
          <polygon
            points="100,10 190,100 100,190 10,100"
            fill="#FFCB05"
            stroke="#000"
            strokeWidth="10"
          />
          <circle cx="100" cy="60" r="12" fill="#000" />
          <path
            d="M88 80 L88 120 L80 160 L92 160 L96 130 L104 130 L108 160 L120 160 L112 120 L112 80 Z"
            fill="#000"
          />
          <rect x="60" y="170" width="80" height="4" fill="#000" />
          <rect x="60" y="160" width="12" height="14" fill="#000" />
          <rect x="84" y="160" width="12" height="14" fill="#000" />
          <rect x="108" y="160" width="12" height="14" fill="#000" />
          <rect x="132" y="160" width="8" height="14" fill="#000" />
        </>
      );

    case "A-33a": // Área escolar
      return (
        <>
          <polygon
            points="100,10 190,100 100,190 10,100"
            fill="#FFCB05"
            stroke="#000"
            strokeWidth="10"
          />
          {/* Criança maior */}
          <circle cx="80" cy="70" r="10" fill="#000" />
          <path d="M70 85 L70 130 L65 160 L78 160 L82 135 L88 135 L92 160 L105 160 L100 130 L100 85 Z" fill="#000" />
          {/* Criança menor */}
          <circle cx="125" cy="85" r="8" fill="#000" />
          <path d="M117 96 L117 135 L113 160 L124 160 L127 138 L131 138 L134 160 L145 160 L141 135 L141 96 Z" fill="#000" />
        </>
      );

    case "I-Hospital":
      return (
        <>
          <rect x="10" y="10" width="180" height="180" rx="14" fill="#0B6BB5" />
          <rect x="80" y="40" width="40" height="120" fill="#fff" />
          <rect x="40" y="80" width="120" height="40" fill="#fff" />
        </>
      );

    case "I-Posto":
      return (
        <>
          <rect x="10" y="10" width="180" height="180" rx="14" fill="#0B6BB5" />
          <text
            x="100"
            y="135"
            textAnchor="middle"
            fill="#fff"
            fontSize="120"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
          >
            P
          </text>
        </>
      );
  }
}
