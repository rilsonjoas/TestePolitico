export interface AxisDetail {
  slug: string;
  name: string;
  shortDescription: string;
  leftValue: {
    name: string;
    description: string;
    keyPrinciples: string[];
    thinkers: string[];
    color: string;
  };
  rightValue: {
    name: string;
    description: string;
    keyPrinciples: string[];
    thinkers: string[];
    color: string;
  };
  overview: string;
  historicalContext: string;
  policyImpacts: {
    topic: string;
    leftStance: string;
    rightStance: string;
  }[];
  relatedIdeologyNames: string[];
}

export const eixosData: AxisDetail[] = [
  {
    slug: 'economico',
    name: 'Eixo Econômico',
    shortDescription: 'Avalia a organização da economia entre redistribuição pública/social e o livre mercado sem intervenções.',
    overview: `O Eixo Econômico analisa a visão sobre como a riqueza deve ser gerada, distribuída e regulada em uma sociedade. De um lado, defensores da Igualdade acreditam que o Estado ou a coletividade devem atuar para reduzir disparidades sociais e garantir bem-estar básico universal. Do outro, entusiastas do Mercado defendem que o livre comércio, a concorrência e a propriedade privada produzem maior eficiência e prosperidade.`,
    historicalContext: `A dicotomia econômica tomou forma central durante a Revolução Industrial no século XIX, com o surgimento do capitalismo moderno e o desenvolvimento de teorias críticas formuladas por pensadores como Karl Marx e Friedrich Engels. Ao longo do século XX, esse debate polarizou o mundo na Guerra Fria entre o modelo estatal soviético e a economia de mercado ocidental, desdobrando-se em vertentes como a Social-Democracia europeia e o Neoliberalismo da Escola de Chicago.`,
    leftValue: {
      name: 'Igualdade',
      description: 'Prioriza a redistribuição de renda, serviços públicos universais (saúde, educação, transporte), regulamentação do trabalho e forte presença do Estado na economia para impedir monopolização e vulnerabilidade social.',
      keyPrinciples: [
        'Redistribuição de renda via tributação progressiva',
        'Serviços públicos estratégicos e universais',
        'Regulamentação trabalhista e proteção social',
        'Combate às desigualdades estruturais de classe'
      ],
      thinkers: ['Karl Marx', 'John Maynard Keynes', 'Thomas Piketty', 'Rosa Luxemburgo'],
      color: '#e63946'
    },
    rightValue: {
      name: 'Mercado',
      description: 'Prioriza o livre comércio, a desregulamentação, a redução de impostos, a privatização de empresas estatais e a soberania da lei da oferta e da procura na alocação de recursos.',
      keyPrinciples: [
        'Livre concorrência e desregulamentação da economia',
        'Garantia irrestrita da propriedade privada',
        'Redução do peso e dos gastos do Estado',
        'Incentivo ao empreendedorismo e livre iniciativa'
      ],
      thinkers: ['Adam Smith', 'Milton Friedman', 'Friedrich Hayek', 'Ludwig von Mises'],
      color: '#1d3557'
    },
    policyImpacts: [
      {
        topic: 'Impostos e Tributação',
        leftStance: 'Defende tributação progressiva (quem ganha mais paga mais), impostos sobre grandes fortunas e dividendos para financiar serviços públicos.',
        rightStance: 'Defende alíquotas baixas, simplificação tributária e isenção fiscal para estimular investimentos e criação de empregos.'
      },
      {
        topic: 'Empresas Estatais vs Privatização',
        leftStance: 'Advoga pela manutenção e criação de estatais em setores estratégicos (energia, saneamento, bancos de desenvolvimento).',
        rightStance: 'Defende a privatização de estatais para aumentar a eficiência econômica e eliminar ineficiências burocráticas.'
      },
      {
        topic: 'Leis Trabalhistas',
        leftStance: 'Exige forte proteção ao trabalhador (salário mínimo robusto, previdência pública, jornada limitada).',
        rightStance: 'Favorece acordos diretos entre empregado e empregador, com flexibilização trabalhista.'
      }
    ],
    relatedIdeologyNames: [
      'Socialismo Científico',
      'Social Democracia',
      'Neoliberalismo',
      'Anarco-Capitalismo',
      'Capitalismo de Estado'
    ]
  },
  {
    slug: 'diplomatico',
    name: 'Eixo Diplomático',
    shortDescription: 'Mede a relação entre soberania da Nação e engajamento diplomático no espaço Global.',
    overview: `O Eixo Diplomático analisa como uma nação deve se posicionar no cenário internacional. O polo Nacionalista enfatiza a prioridade dos interesses e fronteiras da própria pátria, preservando a cultura local e a autodeterminação. O polo Globalista advoga pela integração das nações, cooperação via organismos internacionais e resposta conjunta aos desafios planetários.`,
    historicalContext: `Esse debate remonta à Paz de Vestfália (1648), que estabeleceu a noção moderna de soberania dos Estados-Nação. No século XX, as duas Guerras Mundiais impulsionaram a criação da Liga das Nações e, posteriormente, da ONU. Com o avanço da globalização nas últimas décadas, a tensão entre identidades nacionais e arranjos supranacionais (como a União Europeia) tornou-se um dos temas mais aquecidos da política global.`,
    leftValue: {
      name: 'Global',
      description: 'Defende a cooperação internacional, pactos mundiais sobre meio ambiente e direitos humanos, livre circulação de pessoas e a participação ativa em blocos geopolíticos.',
      keyPrinciples: [
        'Multilateralismo e diplomacia via organismos como a ONU',
        'Acordos globais de combate às mudanças climáticas',
        'Políticas de acolhimento humanitário a refugiados',
        'Redução de barreiras alfandegárias e isolacionismos'
      ],
      thinkers: ['Immanuel Kant', 'Woodrow Wilson', 'Jürgen Habermas', 'Amartya Sen'],
      color: '#a8dadc'
    },
    rightValue: {
      name: 'Nação',
      description: 'Prioriza a soberania nacional, o desenvolvimento e segurança internos antes de compromissos externos, o controle rigoroso de fronteiras e a preservação do patrimônio cultural nativo.',
      keyPrinciples: [
        'Defesa intransigente da soberania e autodeterminação nacional',
        'Controle soberano sobre fronteiras e políticas imigratórias',
        'Patriotismo e valorização do patrimônio histórico-cultural',
        'Rejeição à imposição de diretrizes por órgãos supranacionais'
      ],
      thinkers: ['Charles de Gaulle', 'Niccolò Machiavelli', 'Alexander Hamilton', 'George Washington'],
      color: '#f77f00'
    },
    policyImpacts: [
      {
        topic: 'Tratados Internacionais',
        leftStance: 'Apoia a assinatura de tratados multilaterais obrigatórios de direitos humanos, clima e desarmamento.',
        rightStance: 'Manteve ceticismo contra acordos que limitem a liberdade de decisão do poder legislativo e executivo nacional.'
      },
      {
        topic: 'Imigração e Refugiados',
        leftStance: 'Defende políticas abertas de migração, facilitação de vistos e solidariedade a refugiados.',
        rightStance: 'Exige critérios estritos de segurança, proteção de empregos locais e assimilação cultural prévia.'
      },
      {
        topic: 'Comércio Exterior',
        leftStance: 'Favorece o comércio multilateral com regras sociais e ambientais compartilhadas.',
        rightStance: 'Busca acordos bilaterais práticos ou tarifas protecionistas para salvaguardar a indústria nacional.'
      }
    ],
    relatedIdeologyNames: [
      'Nacionalismo',
      'Cosmopolitismo',
      'Internacionalismo',
      'Isolacionismo',
      'Patriotismo Constitucional'
    ]
  },
  {
    slug: 'civil',
    name: 'Eixo Civil',
    shortDescription: 'Contrapõe a valorização das Liberdades individuais em relação à autoridade central do Estado.',
    overview: `O Eixo Civil examina a distribuição de poder entre o indivíduo e o Estado. Os defensores da Liberdade enfatizam que os direitos fundamentais, como expressão, privacidade e autonomia pessoal, são invioláveis. Já os defensores da Autoridade sustentam que um Estado forte é indispensável para manter a ordem pública, combater a criminalidade e garantir a estabilidade social.`,
    historicalContext: `O desenvolvimento do direito constitucional moderno deve-se à luta histórica contra o absolutismo monárquico na Europa. Documentos como a Magna Carta (1215), a Declaração de Direitos da Virgínia (1776) e a Declaração dos Direitos do Homem e do Cidadão (1789) consagraram as liberdades individuais. No entanto, crises econômicas e conflitos ao longo do século XX frequentemente levaram ao aumento do poder estatal em nome da segurança nacional.`,
    leftValue: {
      name: 'Liberdade',
      description: 'Defende a maximização da liberdade individual, a proteção rigorosa contra a vigilância governamental, a descriminalização de comportamentos pessoais e a limitação do poder policial.',
      keyPrinciples: [
        'Inviolabilidade da liberdade de expressão e imprensa',
        'Privacidade de dados e proteção contra vigilância de massa',
        'Garantia do devido processo legal e direitos civis',
        'Rejeição a arbitrariedades e abusos de autoridade'
      ],
      thinkers: ['John Locke', 'John Stuart Mill', 'Noam Chomsky', 'Henry David Thoreau'],
      color: '#ffc300'
    },
    rightValue: {
      name: 'Autoridade',
      description: 'Sustenta que o Estado deve possuir autoridade forte e consolidada para aplicar leis de maneira firme, manter a ordem pública, coibir o crime e assegurar a coesão nacional.',
      keyPrinciples: [
        'Valorização da lei, ordem e segurança pública',
        'Fortalecimento das forças policiais e judiciárias',
        'Combate enérgico a desordens civis e subversões',
        'Centralização de decisões estratégicas em instituições fortes'
      ],
      thinkers: ['Thomas Hobbes', 'Carl Schmitt', 'Jean Bodin', 'Joseph de Maistre'],
      color: '#457b9d'
    },
    policyImpacts: [
      {
        topic: 'Segurança Pública e Punição',
        leftStance: 'Foco na reforma do sistema judiciário, prevenção primária e garantias processuais contra abusos.',
        rightStance: 'Aumento de penas, ampliação do aparato policial e tolerância zero com a criminalidade.'
      },
      {
        topic: 'Vigilância e Privacidade',
        leftStance: 'Oposição à coleta indevida de dados pessoais pelo governo e restrições a tecnologias de reconhecimento facial.',
        rightStance: 'Uso de monitoramento ostensivo e inteligência estatal para prevenção de atos terroristas e crimes graves.'
      },
      {
        topic: 'Liberdade de Expressão',
        leftStance: 'Defesa irrestrita do direito de crítica, protesto pacífico e livre manifestação artística.',
        rightStance: 'Apoio a sanções ou restrições a discursos julgados desestabilizadores da moral pública ou da segurança nacional.'
      }
    ],
    relatedIdeologyNames: [
      'Libertarianismo',
      'Anarquismo',
      'Autoritarismo',
      'Fascismo',
      'Liberalismo Clássico'
    ]
  },
  {
    slug: 'social',
    name: 'Eixo Social',
    shortDescription: 'Mede a posição entre a manutenção da Tradição e o avanço da inovação social e Progresso.',
    overview: `O Eixo Social reflete a postura em relação à cultura, costumes, religião e estruturas sociais tradicionais. A visão Tradicionalista busca preservar valores ancestrais, papéis de gênero históricos e a influência moral da família e da religião. A visão Progressista defende a constante transformação cultural, a expansão de novos direitos sociais, o secularismo e o acolhimento de novas formas de vida.`,
    historicalContext: `A dicotomia social intensificou-se com o Iluminismo no século XVIII, que desafiou a autoridade dogmática da Igreja e da Monarquia. No século XX, as revoluções culturais da década de 1960 — incluindo os movimentos pelos direitos civis, feminismo e libertação sexual — redefiniram os costumes da sociedade ocidental, criando uma divisão persistente entre visões conservadoras e progressistas.`,
    leftValue: {
      name: 'Progresso',
      description: 'Advoga pela inovação social, secularismo no governo, direitos LGBTQIA+, igualdade de gênero e questionamento de estruturas tradicionais em prol de maior inclusão e diversidade.',
      keyPrinciples: [
        'Laicidade estrita do Estado e liberdade religiosa universal',
        'Igualdade de direitos para minorias e equidade de gênero',
        'Reforma de leis sobre drogas, aborto e bioética com base científica',
        'Acolhimento da diversidade de novos arranjos familiares'
      ],
      thinkers: ['Voltaire', 'Simone de Beauvoir', 'Judith Butler', 'Michel Foucault'],
      color: '#3a86ff'
    },
    rightValue: {
      name: 'Tradição',
      description: 'Valoriza a herança cultural, os ensinamentos morais religiosos, o modelo tradicional de família e o respeito às instituições históricas que moldaram a sociedade.',
      keyPrinciples: [
        'Preservação da família tradicional como pilar moral da sociedade',
        'Respeito à fé religiosa e às tradições históricas da nação',
        'Prudência na alteração de normas e costumes sociais testados no tempo',
        'Rejeição ao relativismo moral e à desconstrução cultural veloz'
      ],
      thinkers: ['Edmund Burke', 'Roger Scruton', 'Chesterton', 'Thomas de Aquino'],
      color: '#8338ec'
    },
    policyImpacts: [
      {
        topic: 'Estado Laico e Religião',
        leftStance: 'Separação total entre religião e políticas públicas; ensino estritamente laico nas escolas.',
        rightStance: 'Reconhecimento dos valores cristãos e ético-religiosos como fundamento cultural da legislação.'
      },
      {
        topic: 'Direitos Civis e Família',
        leftStance: 'Apoio irrestrito a casamentos homoafetivos, adoção por casais do mesmo sexo e igualdade de gênero.',
        rightStance: 'Proteção prioritária da família nuclear tradicional como célula-mãe da sociedade.'
      },
      {
        topic: 'Bioética e Liberdades Pessoais',
        leftStance: 'Legalização do aborto como questão de saúde pública e descriminalização de substâncias entorpecentes.',
        rightStance: 'Defesa da vida desde a concepção e combate rigoroso ao uso de drogas ilícitas.'
      }
    ],
    relatedIdeologyNames: [
      'Conservadorismo',
      'Progressismo',
      'Revolucionarismo',
      'Tradicionalismo',
      'Social-Democracia'
    ]
  }
];

export function getAxisBySlug(slug: string): AxisDetail | undefined {
  return eixosData.find((axis) => axis.slug === slug);
}
