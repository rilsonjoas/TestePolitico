export interface Question {
  question: string;
  effect: {
    econ: number;
    dipl: number;
    govt: number;
    scty: number;
  };
}

export interface Politician {
  name: string;
  link: string;
  stats?: {
    econ: number;
    dipl: number;
    govt: number;
    scty: number;
  };
}

export interface Book {
  title: string;
  link: string;
}

export interface Ideology {
  name: string;
  stats: {
    econ: number;
    dipl: number;
    govt: number;
    scty: number;
  };
  desc: string;
  roast?: string;
  politicians: Politician[];
  books: Book[];
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-') // Substitui espaços por hifens
    .replace(/[^\w\-]+/g, '') // Remove caracteres não-alfanuméricos
    .replace(/\-\-+/g, '-') // Substitui múltiplos hifens por um único
    .replace(/^-+/, '') // Remove hifens do início
    .replace(/-+$/, ''); // Remove hifens do fim
}

export function getClosestPolitician(e: number, d: number, g: number, s: number) {
  let closestPolitician: Politician | null = null;
  let minDistance = Infinity;

  // Flatten all politicians from all ideologies
  const allPoliticians: Politician[] = [];
  ideologies.forEach(ideology => {
    ideology.politicians.forEach(p => {
      // Only include politicians with stats
      if (p.stats) {
        allPoliticians.push(p);
      }
    });
  });

  for (const politician of allPoliticians) {
    if (!politician.stats) continue;

    // Euclidean distance
    const distance = Math.sqrt(
      Math.pow(politician.stats.econ - e, 2) +
      Math.pow(politician.stats.dipl - d, 2) +
      Math.pow(politician.stats.govt - g, 2) +
      Math.pow(politician.stats.scty - s, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestPolitician = politician;
    }
  }

  return closestPolitician;
}

export const questions: Question[] = [
  {
    question:
      "O poder excessivo e a influência negativa de grandes corporações são uma ameaça maior à sociedade do que o poder do governo.",
    effect: { econ: 10, dipl: 0, govt: -5, scty: 0 },
  },
  {
    question:
      "O governo deve intervir ativamente na economia — além de apenas coibir monopólios — para proteger consumidores de práticas abusivas de empresas privadas.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Quanto menos o governo interfere na economia, maior a prosperidade e liberdade econômica das pessoas.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Manter um orçamento governamental equilibrado deve ser prioridade, mesmo que signifique limitar gastos com programas de bem-estar social.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "O financiamento público de pesquisa científica deve ser priorizado em relação ao privado, pois o mercado tende a negligenciar pesquisas sem retorno comercial imediato.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "Impor tarifas sobre produtos importados é importante para proteger e incentivar a indústria nacional.",
    effect: { econ: 5, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "A distribuição de recursos na sociedade deveria ser baseada nas necessidades de cada pessoa, não na sua capacidade de pagar ou produzir.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Programas sociais governamentais permanentes fazem mais mal do que bem — a caridade voluntária e a iniciativa privada são formas mais eficazes de ajudar os mais vulneráveis.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Aumentar os impostos sobre os mais ricos é uma forma justa de financiar programas de apoio aos mais pobres.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Receber herança é uma forma legítima e aceitável de adquirir riqueza.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: -5 },
  },
  {
    question:
      "Serviços de infraestrutura essencial — como água, energia elétrica e saneamento — devem ser de propriedade ou controle público, pois não podem ser deixados à lógica do lucro privado.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "A intervenção excessiva do governo na economia prejudica o crescimento e a eficiência.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "É aceitável que pessoas com maior poder aquisitivo tenham acesso a cuidados de saúde de melhor qualidade ou mais rápidos.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "O acesso a uma educação de qualidade deve ser garantido como um direito fundamental para todos, independentemente da sua condição financeira.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 5 },
  },
  {
    question:
      "As fábricas, terras e outras ferramentas de produção deveriam ser de propriedade e controle dos trabalhadores que as operam.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Organizações internacionais como a ONU possuem influência excessiva e deveriam ter seu poder reduzido ou ser extintas.",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "O uso da força militar é justificável não apenas em legítima defesa, mas também para proteger interesses estratégicos nacionais no exterior.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 },
  },
  {
    question:
      "A formação de blocos de cooperação regionais entre países (como a União Europeia e o Mercosul) é benéfica e deve ser apoiada.",
    effect: { econ: -5, dipl: 10, govt: 0, scty: 5 },
  },
  {
    question:
      "Preservar a soberania e a independência do nosso país em relação a influências externas é fundamental.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 },
  },
  {
    question:
      "A criação de um governo mundial unificado seria um passo positivo para a paz e o progresso da humanidade.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 },
  },
  {
    question:
      "Manter relações pacíficas com outras nações é mais importante do que projetar poder e força militar no cenário internacional.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 },
  },
  {
    question:
      "Nosso país não precisa da aprovação ou justificativa de outras nações para iniciar uma ação militar que considere necessária.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 },
  },
  {
    question:
      "Altos investimentos em forças armadas representam um desperdício de recursos que poderiam ser melhor aplicados em outras áreas.",
    effect: { econ: 0, dipl: 10, govt: 10, scty: 0 },
  },
  {
    question:
      "Enviar ajuda financeira ou humanitária para outros países é, na maioria das vezes, um desperdício dos recursos do nosso próprio país.",
    effect: { econ: -5, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question: "Acredito que minha nação tem uma cultura, história ou valores que a tornam superior à maioria das outras nações.",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "A colaboração científica internacional é crucial e mais eficaz do que esforços de pesquisa puramente nacionais.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 10 },
  },
  {
    question:
      "Os governos nacionais deveriam ser responsabilizados por suas ações perante a comunidade internacional e organismos multilaterais.",
    effect: { econ: 0, dipl: 10, govt: 5, scty: 0 },
  },
  {
    question:
      "A resistência violenta contra um regime opressor nunca é moralmente justificável — a mudança deve vir sempre por meios pacíficos.",
    effect: { econ: 0, dipl: 5, govt: 0, scty: 0 },
  },
  {
    question:
      "As leis e políticas públicas do país deveriam refletir os valores e princípios da religião predominante na sociedade.",
    effect: { econ: 0, dipl: -5, govt: -10, scty: -10 },
  },
  {
    question:
      "É importante promover ativamente os valores culturais e políticos do nosso país em outras nações.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 },
  },
  {
    question:
      "Garantir lei e ordem deve ter prioridade sobre a proteção de liberdades civis quando há conflito entre os dois.",
    effect: { econ: 0, dipl: -5, govt: -10, scty: -5 },
  },
  {
    question:
      "Em geral, a maioria das pessoas não está preparada para tomar decisões políticas complexas de forma sensata.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    question:
      "O suicídio assistido por médicos deveria ser uma opção legal para pacientes terminais que o desejarem.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 },
  },
  {
    question:
      "Em situações de ameaça à segurança nacional, o governo deve ter autoridade para restringir liberdades civis — como privacidade e liberdade de expressão — mesmo sem mandado judicial.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    question:
      "A vigilância de comunicações e espaços públicos pelo governo é uma ferramenta necessária para a segurança na era moderna.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    question:
      "Qualquer forma de Estado organizado representa, inerentemente, uma ameaça à liberdade individual.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 },
  },
  {
    question:
      "Devemos sempre apoiar nosso país, mesmo quando discordamos de suas ações ou governo.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: -5 },
  },
  {
    question:
      "Nenhuma forma de autoridade deve ser aceita sem questionamento crítico.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 5 },
  },
  {
    question:
      "Um governo com liderança forte e hierarquia clara é mais eficaz do que um baseado em consenso e participação horizontal.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    question:
      "O governo deve sempre seguir a vontade da maioria da população, mesmo que essa vontade pareça equivocada para alguns.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 },
  },
  {
    question:
      "Um líder forte e decidido é mais benéfico para um país do que um que busca constantemente o consenso.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 },
  },
  {
    question:
      "A democracia não é apenas um método para tomar decisões, mas um valor fundamental em si mesma.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 },
  },
  {
    question:
      "A imposição de regulamentações ambientais rigorosas é essencial para proteger o planeta para as futuras gerações.",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "O caminho para um futuro melhor para a humanidade passa, principalmente, pelo avanço da automação, ciência e tecnologia.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "A educação das crianças deve incluir, prioritariamente, a transmissão de valores religiosos e tradicionais.",
    effect: { econ: 0, dipl: 0, govt: -5, scty: -10 },
  },
  {
    question:
      "As tradições só devem ser mantidas se tiverem um propósito claro e benéfico para a sociedade atual; não possuem valor intrínseco.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "As instituições religiosas e seus preceitos deveriam ter influência direta nas leis e nas políticas governamentais.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    question:
      "As instituições religiosas deveriam pagar os mesmos impostos que outras organizações e empresas.",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "As mudanças climáticas representam uma ameaça grave e urgente que exige ações significativas imediatas.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "O combate eficaz às mudanças climáticas exige cooperação e esforço conjuntos de todas as nações.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 10 },
  },
  {
    question:
      "De modo geral, a sociedade vivia melhor e com mais valores em gerações passadas.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "É fundamental preservar as tradições culturais e os costumes herdados dos nossos antepassados.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "Devemos tomar decisões considerando o impacto a longo prazo, pensando nas próximas gerações e não apenas em benefícios imediatos.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "A razão e a lógica devem prevalecer sobre a manutenção da cultura e das tradições quando há conflito entre elas.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "O uso de drogas deveria ser tratado como questão de saúde pública, com legalização ou descriminalização, em vez de um problema criminal.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 2 },
  },
  {
    question:
      "Casais do mesmo sexo deveriam ter o direito legal ao casamento, com os mesmos direitos e reconhecimento que casais heterossexuais.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 10 },
  },
  {
    question:
      "Todas as culturas têm seu valor intrínseco e nenhuma pode ser considerada objetivamente superior às outras.",
    effect: { econ: 0, dipl: 10, govt: 5, scty: 10 },
  },
  {
    question: "Relações sexuais fora do casamento são moralmente erradas.",
    effect: { econ: 0, dipl: 0, govt: -5, scty: -10 },
  },
  {
    question:
      "Imigrantes que vêm para nosso país devem se esforçar para abandonar suas culturas de origem e assimilar completamente a nossa.",
    effect: { econ: 0, dipl: 0, govt: -5, scty: -10 },
  },
  {
    question:
      "O Estado deve proibir o aborto ou permitir apenas em casos extremos — a decisão não deve ser deixada à escolha individual da mulher.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    question:
      "A posse de armas de fogo por civis deveria ser estritamente controlada e permitida apenas para quem demonstrar necessidade comprovada.",
    effect: { econ: 0, dipl: 0, govt: 5, scty: 0 },
  },
  {
    question:
      "O governo deve garantir acesso universal à saúde, financiado por impostos, independentemente da capacidade de pagamento do cidadão.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question: "O Estado deve criminalizar a prostituição — ela não deve ser tratada como trabalho legítimo nem regulamentada.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    question:
      "A preservação dos valores familiares tradicionais é essencial para a saúde e estabilidade da sociedade.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "A busca incessante pelo progresso tecnológico e social, sem considerar os riscos e os valores tradicionais, é perigosa.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "A modificação genética, incluindo em seres humanos, tem potencial para trazer grandes benefícios e deveria ser explorada.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "O país deve facilitar significativamente a imigração legal de trabalho, reduzindo barreiras burocráticas e cotas restritivas.",
    effect: { econ: 0, dipl: 10, govt: 10, scty: 0 },
  },
  {
    question:
      "O governo do nosso país deveria se preocupar com o bem-estar de todas as pessoas no mundo, não apenas com seus próprios cidadãos.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 },
  },
  {
    question:
      "Todas as pessoas devem ser tratadas com igualdade e respeito, independentemente de sua origem, cultura, religião, orientação sexual ou identidade de gênero.",
    effect: { econ: 0, dipl: 5, govt: 5, scty: 10 },
  },
  {
    question:
      "É legítimo que um governo priorize os interesses de sua população nacional em detrimento de acordos internacionais ou de populações estrangeiras.",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "O crescimento econômico ilimitado é incompatível com a sustentabilidade do planeta — a economia precisa ser reorganizada dentro dos limites ecológicos, não apenas 'verde-lavada'.",
    effect: { econ: 10, dipl: 10, govt: 0, scty: 10 },
  },
  {
    question:
      "O combate à crise climática exige uma transformação estrutural do sistema econômico, não apenas ajustes tecnológicos ou incentivos de mercado.",
    effect: { econ: 10, dipl: 5, govt: 0, scty: 10 },
  },
  {
    question:
      "O Estado deve garantir por lei a igualdade salarial entre homens e mulheres que exercem as mesmas funções.",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "Cotas de gênero em cargos de liderança — seja no setor público ou privado — são uma ferramenta legítima para corrigir desigualdades históricas.",
    effect: { econ: 5, dipl: 0, govt: 5, scty: 10 },
  },
  {
    question:
      "A propriedade privada é legítima apenas quando o proprietário a usa diretamente — quem possui terra ou capital sem trabalhá-los explora o trabalho alheio.",
    effect: { econ: 10, dipl: 0, govt: 5, scty: 5 },
  },
  {
    question:
      "Decisões políticas complexas deveriam ser tomadas por especialistas técnicos e científicos, não por políticos eleitos ou pela opinião pública.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 5 },
  },
  {
    question:
      "Todas as funções do Estado — segurança, justiça, defesa — poderiam ser providas de forma mais eficiente por empresas privadas em competição do que pelo governo.",
    effect: { econ: -10, dipl: 0, govt: 10, scty: 0 },
  },
  {
    question:
      "O principal problema do país não é esquerda ou direita, mas uma elite corrupta que se serve do Estado às custas do povo trabalhador.",
    effect: { econ: 5, dipl: -5, govt: -5, scty: -5 },
  },
];

export const ideologies: Ideology[] = [
  {
    name: "Anarco-Comunismo",
    stats: { econ: 100, dipl: 50, govt: 100, scty: 90 },
    desc: "Acreditamos que a verdadeira liberdade só é possível com igualdade material. Lutamos pela abolição do Estado, do capitalismo e de toda hierarquia opressora, construindo em seu lugar uma sociedade de comunas livres e autogeridas. Cada pessoa contribui voluntariamente segundo suas capacidades e recebe segundo suas necessidades, sem patrões, sem polícia, sem fronteiras. A cooperação livre entre iguais substitui a coerção. Rejeitamos tanto a tirania do capital quanto a do Estado autoritário.",
    roast: "Para você, qualquer hierarquia é fascismo, menos a do grupo do WhatsApp da comuna que ninguém modera. Você acredita que a humanidade viveria em paz e harmonia se não fosse o Estado, ignorando 5.000 anos de história humana.",
    politicians: [
      {
        name: "Piotr Kropotkin",
        link: "https://pt.wikipedia.org/wiki/Piotr_Kropotkin",
        stats: { econ: 100, dipl: 50, govt: 100, scty: 90 },
      },
      {
        name: "Errico Malatesta",
        link: "https://pt.wikipedia.org/wiki/Errico_Malatesta",
        stats: { econ: 100, dipl: 40, govt: 100, scty: 85 },
      },
      {
        name: "Nestor Makhno",
        link: "https://pt.wikipedia.org/wiki/Nestor_Makhno",
        stats: { econ: 95, dipl: 20, govt: 100, scty: 70 },
      },
      {
        name: "Emma Goldman",
        link: "https://pt.wikipedia.org/wiki/Emma_Goldman",
        stats: { econ: 100, dipl: 60, govt: 100, scty: 100 },
      },
    ],
    books: [
      {
        title: "A Conquista do Pão - Kropotkin",
        link: "https://amzn.to/4r7aY6Q",
      },
      {
        title:
          "O indivíduo, a sociedade e o Estado e outros ensaios - Emma Goldman",
        link: "https://amzn.to/4sQW9qy",
      },
      {
        title: "No Café - Diálogos Sobre O Anarquismo - Malatesta",
        link: "https://amzn.to/4jQ7djI",
      },
    ],
  },
  {
    name: "Comunismo Libertário",
    stats: { econ: 100, dipl: 70, govt: 80, scty: 80 },
    desc: "Defendemos uma sociedade sem classes e sem Estado, organizada através de federações de comunas democráticas e assembleias populares. Não basta derrubar o capitalismo se for para erguer uma nova burocracia em seu lugar. O poder deve fluir de baixo para cima, das bases para as coordenações, nunca o contrário. Combinamos a luta por justiça econômica com a defesa intransigente das liberdades individuais. Incorporamos também a luta ecológica, pois não há libertação humana sem harmonia com a natureza. Municipalismo, democracia direta e ecologia social são nossos pilares.",
    roast: "Você é o anarquista que insiste em ter um plano de 5 anos para a revolução, mas não consegue organizar a vaquinha do churrasco. Sua utopia é um conselho de bairro que debate por 12 horas se a lixeira deve ser de plástico ou metal.",
    politicians: [
      {
        name: "Murray Bookchin",
        link: "https://pt.wikipedia.org/wiki/Murray_Bookchin",
        stats: { econ: 90, dipl: 70, govt: 90, scty: 95 },
      },
      {
        name: "Maria Lacerda de Moura (BR)",
        link: "https://pt.wikipedia.org/wiki/Maria_Lacerda_de_Moura",
        stats: { econ: 90, dipl: 60, govt: 95, scty: 90 },
      },
      {
        name: "José Oiticica (BR)",
        link: "https://pt.wikipedia.org/wiki/Jos%C3%A9_Oiticica",
        stats: { econ: 95, dipl: 50, govt: 95, scty: 80 },
      },
      {
        name: "Abdullah Öcalan",
        link: "https://pt.wikipedia.org/wiki/Abdullah_%C3%96calan",
        stats: { econ: 85, dipl: 60, govt: 80, scty: 85 },
      },
    ],
    books: [
      { title: "A Ecologia da Liberdade - Murray Bookchin", link: "https://amzn.to/3ZG4mRl" },
      { title: "O anarquismo: Da doutrina à ação - Daniel Guérin", link: "https://amzn.to/3OykDVT" },
      { title: "Anarquismo: crítica e autocrítica", link: "https://amzn.to/4qMcDOy" },
    ],
  },
  {
    name: "Trotskismo",
    stats: { econ: 100, dipl: 100, govt: 60, scty: 80 },
    desc: "Seguimos a tradição de Trotski, defendendo a revolução permanente e internacional. O socialismo não pode ser construído em um só país; deve ser uma luta global da classe trabalhadora. Opomos-nos à burocracia estalinista que traiu a revolução, defendendo a verdadeira democracia operária e os conselhos de trabalhadores (sovietes). A vanguarda revolucionária é necessária, mas deve permanecer ligada às massas.",
    roast: "Sua habilidade principal é fundar partidos que se dividem em três facções na primeira reunião. Você vende jornal na porta da faculdade e espera a Revolução Mundial há 80 anos.",
    politicians: [
      {
        name: "Leon Trotsky",
        link: "https://pt.wikipedia.org/wiki/Leon_Trotsky",
        stats: { econ: 100, dipl: 100, govt: 55, scty: 75 },
      },
      {
        name: "Ernest Mandel",
        link: "https://pt.wikipedia.org/wiki/Ernest_Mandel",
        stats: { econ: 95, dipl: 90, govt: 65, scty: 85 },
      },
      {
        name: "James P. Cannon",
        link: "https://pt.wikipedia.org/wiki/James_P._Cannon",
        stats: { econ: 90, dipl: 80, govt: 55, scty: 75 },
      },
      {
        name: "Nahuel Moreno",
        link: "https://pt.wikipedia.org/wiki/Nahuel_Moreno",
        stats: { econ: 95, dipl: 70, govt: 50, scty: 70 },
      },
      {
        name: "Raya Dunayevskaya (EUA)",
        link: "https://pt.wikipedia.org/wiki/Raya_Dunayevskaya",
        stats: { econ: 90, dipl: 80, govt: 60, scty: 85 },
      },
    ],
    books: [
      { title: "A Revolução Permanente - Trotsky", link: "https://amzn.to/46Rxk4n" },
      { title: "História da Revolução Russa - Trotsky", link: "https://amzn.to/4tQ26Vt" },
      { title: "A Revolução Traída - Trotsky", link: "https://amzn.to/4c2ox3k" },
      { title: "O Programa de Transição - Trotsky", link: "https://amzn.to/4qJUkJR" },
      { title: "Capitalismo Tardio - Ernest Mandel", link: "https://amzn.to/46fBXFh" },
    ],
  },
  {
    name: "Marxismo",
    stats: { econ: 100, dipl: 70, govt: 40, scty: 80 },
    desc: "O Marxismo é a análise científica do capitalismo e a luta pela emancipação do proletariado. Acreditamos que a história é movida pela luta de classes e que o capitalismo, com suas contradições internas, será inevitavelmente superado pelo comunismo. Defendemos a socialização dos meios de produção e a organização da classe trabalhadora para tomar o poder político e construir uma sociedade sem classes.",
    roast: "Você chama tudo de 'dialético' quando não sabe explicar. Provavelmente acha que ler livros difíceis te torna moralmente superior a quem trabalha num emprego real.",
    politicians: [
      {
        name: "Karl Marx",
        link: "https://pt.wikipedia.org/wiki/Karl_Marx",
        stats: { econ: 100, dipl: 60, govt: 40, scty: 70 },
      },
      {
        name: "Antonio Gramsci",
        link: "https://pt.wikipedia.org/wiki/Antonio_Gramsci",
        stats: { econ: 95, dipl: 60, govt: 50, scty: 75 },
      },
      {
        name: "Theodor Adorno",
        link: "https://pt.wikipedia.org/wiki/Theodor_W._Adorno",
        stats: { econ: 85, dipl: 60, govt: 60, scty: 85 },
      },
      {
        name: "Luís Carlos Prestes (BR)",
        link: "https://pt.wikipedia.org/wiki/Lu%C3%ADs_Carlos_Prestes",
        stats: { econ: 100, dipl: 30, govt: 20, scty: 50 },
      },
      {
        name: "Álvaro Cunhal (PT)",
        link: "https://pt.wikipedia.org/wiki/%C3%81lvaro_Cunhal",
        stats: { econ: 100, dipl: 40, govt: 30, scty: 50 },
      },
    ],
    books: [
      { title: "O Manifesto Comunista - Marx e Engels", link: "https://amzn.to/4roqkUZ" },
      { title: "Formação do Brasil Contemporâneo - Caio Prado Jr.", link: "https://amzn.to/4tJEmC4" },
      { title: "O Cavaleiro da Esperança - Jorge Amado", link: "https://amzn.to/4cGOk0W" },
      { title: "Cadernos do Cárcere - Gramsci", link: "https://amzn.to/3MNNQvC" },
      { title: "Dialética do Esclarecimento - Adorno e Horkheimer", link: "https://amzn.to/4aBVYan" },
      { title: "O Capital - Karl Marx", link: "https://amzn.to/3OmVEoy" },
    ],
  },
  {
    name: "Leninismo",
    stats: { econ: 100, dipl: 40, govt: 20, scty: 70 },
    desc: "A classe trabalhadora, por si só, não desenvolve espontaneamente consciência revolucionária. É necessário um partido de vanguarda, disciplinado e organizado pelo centralismo democrático, para trazer essa consciência de fora e liderar as massas na tomada do poder. O imperialismo é a fase superior do capitalismo, e sua derrota exige uma estratégia revolucionária coordenada. A ditadura do proletariado, através de sovietes e conselhos populares, esmaga a resistência da burguesia e inicia a construção socialista. O Estado eventualmente definha quando as classes desaparecem.",
    roast: "Você acha que democracia é uma invenção burguesa e que a única liberdade real é obedecer ao Comitê Central. Se alguém discorda de você, é obviamente um agente da CIA ou um 'revisionista'.",
    politicians: [
      {
        name: "Vladimir Lênin",
        link: "https://pt.wikipedia.org/wiki/Vladimir_Lenin",
        stats: { econ: 100, dipl: 35, govt: 15, scty: 65 },
      },
      {
        name: "Alexandra Kollontai",
        link: "https://pt.wikipedia.org/wiki/Alexandra_Kollontai",
        stats: { econ: 95, dipl: 50, govt: 30, scty: 80 },
      },
      {
        name: "Nikolai Bukharin",
        link: "https://pt.wikipedia.org/wiki/Nikolai_Bukharin",
        stats: { econ: 90, dipl: 60, govt: 40, scty: 70 },
      },
      {
        name: "Fidel Castro",
        link: "https://pt.wikipedia.org/wiki/Fidel_Castro",
        stats: { econ: 100, dipl: 30, govt: 15, scty: 60 },
      },
    ],
    books: [
      { title: "O Estado e a Revolução - Lênin", link: "https://amzn.to/4c2246o" },
      { title: "O que fazer?: questões candentes de nosso movimento - Lênin", link: "https://amzn.to/46KdAzG" },
      { title: "Imperialismo, Fase Superior do Capitalismo - Lênin", link: "https://amzn.to/4rihrwa" },
      { title: "Teses de Abril - Lênin", link: "https://amzn.to/4kF3zJM" },
      { title: "Esquerdismo, doença infantil do comunismo - Lênin", link: "https://amzn.to/4qNfiaB" },
    ],
  },
  {
    name: "Stalinismo/Maoismo",
    stats: { econ: 100, dipl: 20, govt: 0, scty: 60 },
    desc: "É possível e necessário construir o socialismo em um só país, cercado por potências hostis. Isso exige industrialização acelerada, coletivização da agricultura e um partido forte que elimine implacavelmente inimigos de classe e sabotadores. O Maoismo adapta esses princípios às condições do Terceiro Mundo, reconhecendo o campesinato como força revolucionária principal e desenvolvendo a estratégia de guerra popular prolongada. A luta de classes continua sob o socialismo, exigindo vigilância constante e revolução cultural para combater a restauração capitalista. A linha de massas garante que o partido nunca se afaste do povo.",
    roast: "Você tem um pôster de um ditador bigodudo no quarto e acha que Gulags eram apenas 'colônias de férias para reeducação'. Sua solução para qualquer problema econômico é fuzilar os sabotadores.",
    politicians: [
      {
        name: "Josef Stalin",
        link: "https://pt.wikipedia.org/wiki/Josef_Stalin",
        stats: { econ: 100, dipl: 20, govt: 0, scty: 30 },
      },
      {
        name: "Mao Tsé-Tung",
        link: "https://pt.wikipedia.org/wiki/Mao_Ts%C3%A9-Tung",
        stats: { econ: 100, dipl: 10, govt: 10, scty: 40 },
      },
      {
        name: "Enver Hoxha",
        link: "https://pt.wikipedia.org/wiki/Enver_Hoxha",
        stats: { econ: 100, dipl: 5, govt: 5, scty: 20 },
      },
    ],
    books: [
      { title: "Fundamentos do Leninismo - Stalin", link: "https://amzn.to/46V7g8w" },
      { title: "O Livro Vermelho - Mao Tsé-Tung", link: "https://amzn.to/4s3RcK5" },
      { title: "Sobre a Prática e a Contradição - Mao", link: "https://amzn.to/46gKvfb" },
      { title: "Sobre a Guerra Prolongada - Mao", link: "https://amzn.to/4rXE0Gf" },
    ],
  },
  {
    name: "Socialismo de Estado",
    stats: { econ: 80, dipl: 30, govt: 30, scty: 70 },
    desc: "O Estado é o instrumento mais eficaz para transformar a sociedade e garantir justiça econômica. Através da propriedade pública dos setores estratégicos, planejamento centralizado e administração técnica, podemos superar a anarquia do mercado e suas crises cíclicas. A industrialização dirigida pelo Estado desenvolve a nação e eleva o padrão de vida do povo trabalhador. A burocracia estatal, quando bem organizada, distribui recursos de forma mais racional que a mão invisível do mercado. O desenvolvimento nacional vem antes das utopias internacionalistas.",
    roast: "Você ama preencher formulários em triplicata e acha que a fila do cartório é o auge da civilização. Seu sonho é um mundo onde tudo é funcionário público e nada funciona sem um carimbo.",
    politicians: [
      {
        name: "Gamal Abdel Nasser",
        link: "https://pt.wikipedia.org/wiki/Gamal_Abdel_Nasser",
        stats: { econ: 85, dipl: 20, govt: 25, scty: 60 },
      },
      {
        name: "Jawaharlal Nehru",
        link: "https://pt.wikipedia.org/wiki/Jawaharlal_Nehru",
        stats: { econ: 70, dipl: 50, govt: 40, scty: 75 },
      },
      {
        name: "Muammar Gaddafi",
        link: "https://pt.wikipedia.org/wiki/Muammar_Gaddafi",
        stats: { econ: 75, dipl: 25, govt: 20, scty: 30 },
      },
      {
        name: "Hugo Chávez",
        link: "https://pt.wikipedia.org/wiki/Hugo_Ch%C3%A1vez",
        stats: { econ: 75, dipl: 20, govt: 10, scty: 50 },
      },
    ],
    books: [
      { title: "A terceira teoria universal: O Livro Verde - Muammar Gaddafi", link: "https://amzn.to/4s1Dasn" },
      { title: "Estratégia do Desenvolvimento Econômico - Albert Hirschman", link: "https://amzn.to/4rrjbDv" },
      { title: "A Economia Política do Desenvolvimento - Paul Baran", link: "https://amzn.to/4qCWlHD" },
      { title: "A Economia Mundial e o Imperialismo - Nikolai Bukharin", link: "https://amzn.to/4azS5Tj" },
    ],
  },
  {
    name: "Socialismo Religioso",
    stats: { econ: 80, dipl: 50, govt: 70, scty: 20 },
    desc: "A fé verdadeira exige compromisso com os pobres e oprimidos. Os profetas sempre denunciaram a injustiça e a acumulação de riquezas. A Teologia da Libertação nos ensina que pecar não é apenas transgressão individual, mas também estruturas sociais que perpetuam a miséria. Cristo estava entre os pobres, e nós devemos estar também. Defendemos reformas econômicas radicais, redistribuição de terras e riquezas, educação e saúde para todos, dentro de um quadro democrático. A libertação é espiritual e material, pessoal e coletiva.",
    roast: "Você vai à missa com uma camiseta de Che Guevara e deixa o padre confuso. Acha que Jesus multiplicou os pães e os peixes como uma crítica à cadeia de suprimentos capitalista.",
    politicians: [
      {
        name: "Frei Betto",
        link: "https://pt.wikipedia.org/wiki/Frei_Betto",
        stats: { econ: 80, dipl: 45, govt: 65, scty: 25 },
      },
      {
        name: "Leonardo Boff",
        link: "https://pt.wikipedia.org/wiki/Leonardo_Boff",
        stats: { econ: 75, dipl: 60, govt: 75, scty: 30 },
      },
      {
        name: "Oscar Romero",
        link: "https://pt.wikipedia.org/wiki/%C3%93scar_Romero",
        stats: { econ: 85, dipl: 40, govt: 60, scty: 15 },
      },
    ],
    books: [
      { title: "Teologia da Libertação - Gustavo Gutiérrez", link: "https://amzn.to/3OPlVvN" },
      { title: "Jesus Cristo Libertador - Leonardo Boff", link: "https://amzn.to/3OPlX6T" },
      { title: "Batismo de Sangue - Frei Betto", link: "https://amzn.to/3Mlf0Kd" },
      { title: "Igreja: Carisma e Poder - Leonardo Boff", link: "https://amzn.to/4cCc9Hj" },
    ],
  },
  {
    name: "Socialismo Democrático",
    stats: { econ: 80, dipl: 50, govt: 50, scty: 80 },
    desc: "O socialismo deve ser conquistado através da democracia, e a democracia só é plena quando se estende à esfera econômica. Lutamos nas urnas, nos sindicatos e nos movimentos sociais por uma transformação gradual mas profunda da sociedade. Os setores estratégicos da economia devem ser controlados democraticamente pelo povo, não por acionistas ou burocratas. Um Estado de bem-estar robusto garante saúde, educação e moradia como direitos, não mercadorias. Rejeitamos tanto o capitalismo selvagem quanto o autoritarismo que se disfarçou de socialismo no século XX.",
    roast: "Você é radical demais para os liberais e moderado demais para os comunistas, então ninguém te convida para as festas. Acha que pode derrubar o sistema votando nele a cada 4 anos.",
    politicians: [
      {
        name: "Leonel Brizola (BR)",
        link: "https://pt.wikipedia.org/wiki/Leonel_Brizola",
        stats: { econ: 75, dipl: 40, govt: 50, scty: 60 },
      },
      {
        name: "Pepe Mujica (Uruguai)",
        link: "https://pt.wikipedia.org/wiki/Jos%C3%A9_Mujica",
        stats: { econ: 70, dipl: 60, govt: 70, scty: 80 },
      },
      {
        name: "Alexandria Ocasio-Cortez",
        link: "https://pt.wikipedia.org/wiki/Alexandria_Ocasio-Cortez",
        stats: { econ: 60, dipl: 50, govt: 60, scty: 90 },
      },
    ],
    books: [
      { title: "O Caminho para o Poder - Karl Kautsky", link: "https://amzn.to/4kG2Vfa" },
      { title: "Por Que Não o Socialismo? - G.A. Cohen", link: "https://amzn.to/3ZFM9mT" },
      { title: "Socialismo Evolucionário - Eduard Bernstein", link: "https://amzn.to/4qIpLEg" },
    ],
  },
  {
    name: "Socialismo Revolucionário",
    stats: { econ: 80, dipl: 20, govt: 50, scty: 70 },
    desc: "O reformismo é uma ilusão! A burguesia nunca entregará seu poder pacificamente. A história mostra que toda conquista dos trabalhadores foi arrancada pela luta, e que toda concessão pode ser retirada. A via parlamentar está bloqueada pelos interesses do capital. Somente a ação revolucionária das massas organizadas pode destruir o Estado burguês e construir uma nova sociedade. Não queremos reformar o capitalismo, queremos superá-lo. A revolução não é um momento, é um processo que exige organização, consciência de classe e disposição para a luta.",
    roast: "Você usa boina em dias quentes e chama qualquer um que tenha um iPhone de 'pequeno-burguês'. Vive esperando o Grande Dia da Revolução enquanto reclama do preço do latão.",
    politicians: [
      {
        name: "Che Guevara",
        link: "https://pt.wikipedia.org/wiki/Che_Guevara",
        stats: { econ: 80, dipl: 20, govt: 50, scty: 70 },
      },
      {
        name: "Thomas Sankara",
        link: "https://pt.wikipedia.org/wiki/Thomas_Sankara",
        stats: { econ: 90, dipl: 40, govt: 40, scty: 70 },
      },
      {
        name: "Hugo Blanco",
        link: "https://pt.wikipedia.org/wiki/Hugo_Blanco",
        stats: { econ: 85, dipl: 30, govt: 55, scty: 75 },
      },
    ],
    books: [
      { title: "O socialismo humanista - Che Guevara", link: "https://amzn.to/4apCLtH" },
      { title: "De moto pela América do Sul - Che Guevara", link: "https://amzn.to/4aJG65X" },
      { title: "Os Condenados da Terra - Frantz Fanon", link: "https://amzn.to/4tNT6jC" },
      { title: "A Situação da Classe Trabalhadora na Inglaterra - Friedrich Engels", link: "https://amzn.to/4c1l4C3" },
    ],
  },
  {
    name: "Socialismo Libertário",
    stats: { econ: 80, dipl: 80, govt: 80, scty: 80 },
    desc: "O Socialismo Libertário busca uma sociedade igualitária e livre, rejeitando tanto o controle estatal centralizado quanto a exploração capitalista. Acreditamos na autogestão dos trabalhadores, na democracia direta e na propriedade coletiva ou comum dos meios de produção, mas sem a brutalidade de uma vanguarda autoritária. A liberdade individual é inseparável da igualdade social; não pode haver uma sem a outra.",
    roast: "Você passa 90% do tempo explicando que a URSS não era socialismo de verdade e os outros 10% brigando com outros esquerdistas sobre quem é mais revolucionário.",
    politicians: [
      {
        name: "Noam Chomsky",
        link: "https://pt.wikipedia.org/wiki/Noam_Chomsky",
        stats: { econ: 80, dipl: 80, govt: 90, scty: 90 },
      },
      {
        name: "Howard Zinn",
        link: "https://pt.wikipedia.org/wiki/Howard_Zinn",
        stats: { econ: 85, dipl: 85, govt: 90, scty: 95 },
      },
      {
        name: "David Graeber",
        link: "https://pt.wikipedia.org/wiki/David_Graeber",
        stats: { econ: 90, dipl: 80, govt: 95, scty: 90 },
      },
      {
        name: "Murray Bookchin (EUA)",
        link: "https://pt.wikipedia.org/wiki/Murray_Bookchin",
        stats: { econ: 85, dipl: 75, govt: 95, scty: 85 },
      },
    ],
    books: [
      { title: "Quem manda no mundo? - Noam Chomsky", link: "https://amzn.to/46VAvYQ" },
      { title: "Dívida: Os Primeiros 5000 Anos - David Graeber", link: "https://amzn.to/46ZZudB" },
      { title: "Textos anarquistas - Mikhail Bakunin", link: "https://amzn.to/4aWrh0S" },
      { title: "Ecologia social e outros ensaios - Murray Bookchin", link: "https://amzn.to/4qLV4hF" },
    ],
  },
  {
    name: "Populismo de Esquerda",
    stats: { econ: 60, dipl: 40, govt: 30, scty: 70 },
    desc: "O povo contra a oligarquia! Por décadas, uma elite corrupta governou em benefício próprio, privatizando o público, entregando nossas riquezas ao capital estrangeiro e empobrecendo a maioria. Chegou a hora do povo retomar o que é seu. Nacionalização dos recursos estratégicos, redistribuição de renda, serviços públicos de qualidade e soberania nacional. Não somos nem esquerda nem direita tradicionais; representamos os de baixo contra os de cima. A democracia deve servir ao povo, não aos banqueiros. Pátria, povo e dignidade!",
    roast: "Você acha que a inflação é uma conspiração das elites e que imprimir dinheiro é política social. Seu passatempo favorito é culpar o imperialismo ianque porque seu time perdeu.",
    politicians: [
      {
        name: "Lula (Luiz Inácio Lula da Silva)",
        link: "https://pt.wikipedia.org/wiki/Luiz_In%C3%A1cio_Lula_da_Silva",
        stats: { econ: 65, dipl: 35, govt: 35, scty: 65 },
      },
      {
        name: "Dilma Rousseff",
        link: "https://pt.wikipedia.org/wiki/Dilma_Rousseff",
        stats: { econ: 65, dipl: 35, govt: 25, scty: 65 },
      },
      {
        name: "Guilherme Boulos",
        link: "https://pt.wikipedia.org/wiki/Guilherme_Boulos",
        stats: { econ: 70, dipl: 45, govt: 40, scty: 80 },
      },
      {
        name: "Juan Perón",
        link: "https://pt.wikipedia.org/wiki/Juan_Per%C3%B3n",
        stats: { econ: 70, dipl: 30, govt: 25, scty: 55 },
      },
    ],
    books: [
      { title: "A Verdade Vencerá - Lula", link: "https://amzn.to/4kSNxMP" },
      { title: "As Veias Abertas da América Latina - Galeano", link: "https://amzn.to/3OXp8JK" },
      { title: "A Razão Populista - Ernesto Laclau", link: "https://amzn.to/3MoHYZJ" },
      { title: "O Que é Populismo? - Jan-Werner Müller", link: "https://amzn.to/4c3huau" },
    ],
  },
  {
    name: "Distributismo",
    stats: { econ: 60, dipl: 45, govt: 40, scty: 20 },
    desc: "Três acres e uma vaca! Nem capitalismo de monopólios nem socialismo de burocratas. A propriedade deve estar amplamente distribuída entre as famílias, baseada nos princípios da justiça e da Doutrina Social da Igreja (como a Rerum Novarum). Defendemos uma sociedade de pequenos proprietários: agricultores em suas terras e artesãos em suas oficinas, organizando a produção via guildas e cooperativas. A família é a unidade básica da sociedade, e a comunidade local é onde a democracia realmente funciona. Grande demais é ruim, seja empresa ou Estado.",
    roast: "Você quer viver no Condado dos Hobbits pagando dízimo. Acha que o problema do mundo é que não temos vacas suficientes e que o feudalismo foi injustiçado pela história, então sua solução para a internet é criar uma cooperativa católica de fibra ótica.",
    politicians: [
      {
        name: "G. K. Chesterton",
        link: "https://pt.wikipedia.org/wiki/G._K._Chesterton",
        stats: { econ: 65, dipl: 55, govt: 55, scty: 25 },
      },
      {
        name: "Papa Leão XIII",
        link: "https://pt.wikipedia.org/wiki/Papa_Le%C3%A3o_XIII",
        stats: { econ: 55, dipl: 35, govt: 25, scty: 15 },
      },
      {
        name: "Hilaire Belloc",
        link: "https://pt.wikipedia.org/wiki/Hilaire_Belloc",
        stats: { econ: 55, dipl: 45, govt: 45, scty: 15 },
      },
      {
        name: "Dorothy Day",
        link: "https://pt.wikipedia.org/wiki/Dorothy_Day",
        stats: { econ: 80, dipl: 70, govt: 70, scty: 50 },
      },
    ],
    books: [
      { title: "Rerum Novarum - Papa Leão XIII", link: "https://amzn.to/4s5hz1V" },
      { title: "Quadragesimo Anno - Papa Pio XI", link: "https://amzn.to/46m4Ek0" },
      { title: "Centesimus Annus - Papa João Paulo II", link: "https://amzn.to/4ryabwv" },
      { title: "O Estado Servil - Hilaire Belloc", link: "https://amzn.to/4qTUs9I" },
      { title: "Um esboço da sanidade - Chesterton", link: "https://amzn.to/4tQCLus" },
    ],
  },
  {
    name: "Liberalismo Social",
    stats: { econ: 60, dipl: 60, govt: 60, scty: 80 },
    desc: "A verdadeira liberdade não é apenas a ausência de coerção do Estado, mas a capacidade real de viver uma vida plena. De que adianta a liberdade formal para quem não tem educação, saúde ou oportunidades? Defendemos uma economia de mercado regulada, onde o Estado corrige as falhas do mercado, garante igualdade de oportunidades e protege os mais vulneráveis com uma rede de segurança social robusta. Direitos civis, tolerância, pluralismo e justiça social caminham juntos. A liberdade de cada um depende das condições materiais que permitem exercê-la.",
    roast: "Sua ideologia é 'por que não podemos todos nos dar bem e tributar os ricos um pouquinho?'. Você provavelmente tem uma foto do Obama na estante e acha que twittar é ativismo.",
    politicians: [
      {
        name: "Geraldo Alckmin",
        link: "https://pt.wikipedia.org/wiki/Geraldo_Alckmin",
        stats: { econ: 50, dipl: 50, govt: 50, scty: 60 },
      },
      {
        name: "Fernando Henrique Cardoso (BR)",
        link: "https://pt.wikipedia.org/wiki/Fernando_Henrique_Cardoso",
        stats: { econ: 55, dipl: 60, govt: 55, scty: 70 },
      },
      {
        name: "Joe Biden (EUA)",
        link: "https://pt.wikipedia.org/wiki/Joe_Biden",
        stats: { econ: 50, dipl: 60, govt: 60, scty: 70 },
      },
      {
        name: "Barack Obama",
        link: "https://pt.wikipedia.org/wiki/Barack_Obama",
        stats: { econ: 55, dipl: 70, govt: 65, scty: 80 },
      },
      {
        name: "Theodore Roosevelt (EUA)",
        link: "https://pt.wikipedia.org/wiki/Theodore_Roosevelt",
        stats: { econ: 55, dipl: 60, govt: 55, scty: 65 },
      },
      {
        name: "Martin Luther King Jr. (EUA)",
        link: "https://pt.wikipedia.org/wiki/Martin_Luther_King_Jr.",
        stats: { econ: 60, dipl: 75, govt: 70, scty: 95 },
      },
    ],
    books: [
      { title: "Uma Teoria da Justiça - John Rawls", link: "https://amzn.to/4ruzSOa" },
      { title: "Desenvolvimento como Liberdade - Amartya Sen", link: "https://amzn.to/4avdrCF" },
      { title: "Liberalismo - L. T. Hobhouse", link: "https://amzn.to/4rvQkOh" },
      { title: "Justiça como Equidade - John Rawls", link: "https://amzn.to/4l9kKDT" },
      { title: "A dádiva do amor - Martin Luther King Jr.", link: "https://amzn.to/4tRaELs" },
    ],
  },
  {
    name: "Democracia Cristã",
    stats: { econ: 60, dipl: 60, govt: 50, scty: 30 },
    desc: "A política deve ser guiada por princípios morais enraizados na tradição cristã: dignidade da pessoa humana, solidariedade, subsidiariedade e bem comum. Defendemos uma economia social de mercado, onde a livre iniciativa é equilibrada pela responsabilidade social e pela proteção dos mais fracos. A família é a célula fundamental da sociedade e merece proteção especial. Somos favoráveis à cooperação internacional e à integração europeia, pois a paz e a prosperidade dependem da colaboração entre nações. Moderação, não extremismo; reforma, não revolução.",
    roast: "Você é o político padrão da Europa: entediante, burocrático e levemente religioso. Sua maior aventura é aumentar a taxa de juros em 0,25%.",
    politicians: [
      {
        name: "Konrad Adenauer",
        link: "https://pt.wikipedia.org/wiki/Konrad_Adenauer",
        stats: { econ: 55, dipl: 55, govt: 45, scty: 25 },
      },
      {
        name: "Alcide De Gasperi",
        link: "https://pt.wikipedia.org/wiki/Alcide_De_Gasperi",
        stats: { econ: 65, dipl: 65, govt: 55, scty: 35 },
      },
      {
        name: "Angela Merkel",
        link: "https://pt.wikipedia.org/wiki/Angela_Merkel",
        stats: { econ: 50, dipl: 70, govt: 60, scty: 50 },
      },
      {
        name: "Robert Schuman",
        link: "https://pt.wikipedia.org/wiki/Robert_Schuman",
        stats: { econ: 55, dipl: 75, govt: 60, scty: 40 },
      },
    ],
    books: [
      { title: "Rerum Novarum - Papa Leão XIII", link: "https://amzn.to/4s5hz1V" },
      { title: "Populorum Progressio - Papa Paulo VI", link: "https://amzn.to/4aQOqkj" },
      { title: "Doutrina Social da Igreja - Compêndio", link: "https://amzn.to/4tOK45T" },
    ],
  },
  {
    name: "Social Democracia",
    stats: { econ: 60, dipl: 70, govt: 60, scty: 80 },
    desc: "O capitalismo pode ser civilizado. Através de sindicatos fortes, negociação coletiva, regulação do mercado e um Estado de bem-estar universal e generoso, podemos garantir que a prosperidade seja compartilhada por todos. Saúde universal, educação pública de qualidade, aposentadoria digna, seguro-desemprego e licenças parentais são direitos, não privilégios. A democracia não termina na urna; ela deve se estender ao local de trabalho e à economia. Buscamos uma sociedade onde todos tenham segurança material para viver com dignidade e liberdade real.",
    roast: "Você quer a revolução, desde que ela não atrase seu brunch. Acha que votar em partidos de esquerda moderada é um ato radical de rebeldia.",
    politicians: [
      {
        name: "Olof Palme",
        link: "https://pt.wikipedia.org/wiki/Olof_Palme",
        stats: { econ: 70, dipl: 70, govt: 60, scty: 80 },
      },
      {
        name: "Willy Brandt",
        link: "https://pt.wikipedia.org/wiki/Willy_Brandt",
        stats: { econ: 65, dipl: 75, govt: 65, scty: 85 },
      },
      {
        name: "Fernando Henrique Cardoso (BR)",
        link: "https://pt.wikipedia.org/wiki/Fernando_Henrique_Cardoso",
        stats: { econ: 50, dipl: 60, govt: 70, scty: 70 },
      },
    ],
    books: [
      { title: "A Terceira Via - Anthony Giddens", link: "https://amzn.to/4axxf8x" },
      {
        title: "Nem com Marx, nem contra Marx - Norberto Bobbio",
        link: "https://amzn.to/4kVrzJ4",
      },
      { title: "Capital no Século XXI - Thomas Piketty", link: "https://amzn.to/4kVq3Xq" },
    ],
  },
  {
    name: "Progressismo",
    stats: { econ: 60, dipl: 80, govt: 60, scty: 100 },
    desc: "O arco da história é longo, mas se curva em direção à justiça. Acreditamos no progresso: na ciência que cura doenças e resolve problemas, na educação que liberta mentes, nos direitos civis que expandem a dignidade a todos. Cada geração pode e deve melhorar a anterior. Lutamos contra todas as formas de discriminação, pela igualdade de gênero, pelos direitos LGBTQ+, pela justiça racial e pela proteção do meio ambiente. O governo é uma ferramenta para o bem comum quando usado corretamente. Não aceitamos que 'sempre foi assim' como desculpa para a injustiça.",
    roast: "Você cancela pessoas no Twitter por esporte e acha que usar a hashtag certa vai salvar o mundo. Sua principal angústia existencial é decidir qual leite vegetal polui menos.",
    politicians: [
      {
        name: "Elizabeth Warren",
        link: "https://pt.wikipedia.org/wiki/Elizabeth_Warren",
        stats: { econ: 65, dipl: 85, govt: 70, scty: 95 },
      },
      {
        name: "Justin Trudeau",
        link: "https://pt.wikipedia.org/wiki/Justin_Trudeau",
        stats: { econ: 55, dipl: 80, govt: 65, scty: 90 },
      },
      {
        name: "Erika Hilton (BR)",
        link: "https://pt.wikipedia.org/wiki/Erika_Hilton",
        stats: { econ: 70, dipl: 80, govt: 70, scty: 100 },
      },
    ],
    books: [
      { title: "A Promessa da Vida Americana - Herbert Croly", link: "https://amzn.to/4qPLrhO" },
      { title: "Democracia e Educação - John Dewey", link: "https://amzn.to/4cHICMo" },
      { title: "Pequeno Manual Antirracista - Djamila Ribeiro", link: "https://amzn.to/4tQyiI4" },
      { title: "O Capital no Século XXI - Thomas Piketty", link: "https://amzn.to/4kVq3Xq" },
    ],
  },
  {
    name: "Anarco-Mutualismo",
    stats: { econ: 60, dipl: 50, govt: 100, scty: 70 },
    desc: "O Anarco-Mutualismo é uma forma de anarquismo de mercado associada a Pierre-Joseph Proudhon. Defende uma sociedade sem Estado onde os indivíduos ou coletivos possuem seus meios de produção e trocam bens e serviços em um mercado livre. A propriedade é legitimada pelo 'uso e ocupação', não pelo título legal, o que se opõe à propriedade ausente e à exploração através de aluguel e juros. Propõe a criação de 'bancos do povo' que forneceriam crédito sem juros para permitir que os trabalhadores adquirissem seu próprio capital.",
    roast: "Você gosta de mercado livre mas odeia patrões, então criou uma teoria que ninguém além de você entende para justificar isso. Acha que 'banco do povo' não vai virar um agiota glorificado.",
    politicians: [
      {
        name: "Pierre-Joseph Proudhon (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Pierre-Joseph_Proudhon",
        stats: { econ: 60, dipl: 50, govt: 100, scty: 70 },
      },
      {
        name: "Lysander Spooner (EUA)",
        link: "https://pt.wikipedia.org/wiki/Lysander_Spooner",
        stats: { econ: 55, dipl: 55, govt: 95, scty: 75 },
      },
      {
        name: "Benjamin Tucker (EUA)",
        link: "https://pt.wikipedia.org/wiki/Benjamin_Tucker",
        stats: { econ: 50, dipl: 50, govt: 100, scty: 65 },
      },
    ],
    books: [
      { title: "O Que é a Propriedade? - Pierre-Joseph Proudhon", link: "" },
      { title: "Sistema das Contradições Econômicas - Pierre-Joseph Proudhon", link: "" },
      { title: "Sem Traidor, Sem Mestre - Benjamin Tucker", link: "" },
    ],
  },
  {
    name: "Totalitarismo Nacional",
    stats: { econ: 50, dipl: 20, govt: 0, scty: 50 },
    desc: "O Totalitarismo Nacional descreve um regime onde o Estado, geralmente sob o controle de um partido único e um líder supremo, busca regular e controlar todos os aspectos da vida pública e privada. É caracterizado pela supressão total da oposição, uso de propaganda massiva, vigilância constante e mobilização da população em torno de uma ideologia nacionalista. A economia é subserviente aos objetivos do Estado, seja através do controle direto ou do corporativismo.",
    roast: "Você acha que '1984' era um manual de instruções, não um aviso. Sua ideia de fim de semana divertido é marchar em linha reta e denunciar seus vizinhos.",
    politicians: [
      {
        name: "Kim Il-sung (Juche - Coreia do Norte)",
        link: "https://pt.wikipedia.org/wiki/Kim_Il-sung",
        stats: { econ: 100, dipl: 0, govt: 0, scty: 5 },
      },
      {
        name: "Saddam Hussein (Iraque)",
        link: "https://pt.wikipedia.org/wiki/Saddam_Hussein",
        stats: { econ: 55, dipl: 15, govt: 5, scty: 40 },
      },
      {
        name: "Getúlio Vargas (Estado Novo - BR)",
        link: "https://pt.wikipedia.org/wiki/Get%C3%BAlio_Vargas",
        stats: { econ: 80, dipl: 30, govt: 30, scty: 70 },
      },
      {
        name: "Pol Pot (Camboja)",
        link: "https://pt.wikipedia.org/wiki/Pol_Pot",
        stats: { econ: 95, dipl: 5, govt: 0, scty: 20 },
      },
    ],
    books: [
      { title: "As Origens do Totalitarismo (Hannah Arendt)", link: "" },
      { title: "1984 (George Orwell)", link: "" },
    ],
  },
  {
    name: "Totalitarismo Global",
    stats: { econ: 50, dipl: 80, govt: 0, scty: 50 },
    desc: "O Totalitarismo Global é um conceito, geralmente explorado na ficção distópica, de um regime mundial unificado que exerce controle absoluto sobre todos os indivíduos e nações. Elimina a soberania nacional e impõe uma ideologia única em escala planetária, utilizando tecnologia avançada para vigilância e controle social. Representa a extensão máxima do poder autoritário, onde não há escapatória ou refúgio da autoridade central.",
    roast: "Seu vilão favorito é o Império Galáctico. Você acha que a única coisa errada com ditaduras é que elas não controlam o mundo inteiro ainda.",
    politicians: [
      {
        name: "H. G. Wells (Escritor/Teórico)",
        link: "https://pt.wikipedia.org/wiki/H._G._Wells",
        stats: { econ: 60, dipl: 80, govt: 20, scty: 60 },
      },
      {
        name: "Zbigniew Brzezinski (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Zbigniew_Brzezinski",
        stats: { econ: 40, dipl: 70, govt: 30, scty: 50 },
      },
    ],
    books: [
      { title: "Admirável Mundo Novo - Aldous Huxley", link: "" },
      { title: "1984 - George Orwell", link: "" },
      { title: "O Estado Mundial - H. G. Wells", link: "" },
    ],
  },
  {
    name: "Tecnocracia",
    stats: { econ: 60, dipl: 60, govt: 20, scty: 70 },
    desc: "A Tecnocracia é um sistema de governo onde os tomadores de decisão são selecionados com base em sua especialização técnica e conhecimento científico, em vez de filiação partidária ou popularidade eleitoral. As políticas são formuladas com base em dados, métodos científicos e eficiência, buscando soluções racionais para os problemas sociais e econômicos. É uma forma de governança elitista, onde o poder reside nos 'especialistas', com o objetivo de otimizar a gestão da sociedade.",
    roast: "Você acha que política é uma equação de matemática e que as pessoas são apenas variáveis ineficientes. Se pudesse, substituiria o Congresso por uma planilha de Excel.",
    politicians: [
      {
        name: "Mario Monti (Itália)",
        link: "https://pt.wikipedia.org/wiki/Mario_Monti",
        stats: { econ: 60, dipl: 60, govt: 20, scty: 70 },
      },
      {
        name: "Mario Draghi (Itália/BCE)",
        link: "https://pt.wikipedia.org/wiki/Mario_Draghi",
        stats: { econ: 55, dipl: 65, govt: 25, scty: 65 },
      },
      {
        name: "Lee Kuan Yew (Singapura)",
        link: "https://pt.wikipedia.org/wiki/Lee_Kuan_Yew",
        stats: { econ: 30, dipl: 50, govt: 15, scty: 40 },
      },
    ],
    books: [
      { title: "The Technocrats: Prophets of Automation - Elsner", link: "" },
      { title: "A Terceira Onda - Alvin Toffler", link: "" },
      { title: "O Fim da História e o Último Homem - Francis Fukuyama", link: "" },
    ],
  },
  {
    name: "Centrista",
    stats: { econ: 50, dipl: 50, govt: 50, scty: 50 },
    desc: "O Centrismo é uma posição política que busca um equilíbrio pragmático, rejeitando os extremos do espectro político de esquerda e direita. Os centristas tendem a adotar uma abordagem moderada, combinando políticas de diferentes ideologias conforme a situação. Favorecem a reforma gradual em vez de mudanças radicais, valorizam o consenso e a estabilidade. Podem apoiar uma economia de mercado com uma rede de segurança social, liberdades individuais com responsabilidade cívica, e uma política externa que equilibra interesses nacionais e cooperação internacional.",
    roast: "Sua opinião mais forte é que não se deve ter opiniões fortes. Você é o equivalente político de pão com água e acha que a virtude está sempre no meio, mesmo que o meio seja uma catástrofe.",
    politicians: [
      {
        name: "Emmanuel Macron (França)",
        link: "https://pt.wikipedia.org/wiki/Emmanuel_Macron",
        stats: { econ: 40, dipl: 60, govt: 50, scty: 60 },
      },
      {
        name: "Tony Blair (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/Tony_Blair",
        stats: { econ: 45, dipl: 65, govt: 55, scty: 70 },
      },
    ],
    books: [
      { title: "O Caminho do Meio (Aristóteles)", link: "" },
      { title: "A Terceira Via (Anthony Giddens)", link: "" },
    ],
  },
  {
    name: "Liberalismo de Esquerda",
    stats: { econ: 50, dipl: 60, govt: 60, scty: 60 },
    desc: "No contexto contemporâneo, especialmente nos Estados Unidos, o Liberalismo refere-se a uma posição de centro-esquerda. Apoia uma economia de mercado regulada para proteger os consumidores e o meio ambiente, juntamente com uma rede de segurança social financiada por impostos progressivos. Defende fortemente as liberdades civis, os direitos das minorias, a separação entre Igreja e Estado e uma política externa baseada na diplomacia e em alianças internacionais.",
    roast: "Você é tão mente aberta que seu cérebro caiu. Apoia todas as causas atuais até que elas afetem levemente o valor do seu imóvel.",
    politicians: [
      {
        name: "Barack Obama (EUA)",
        link: "https://pt.wikipedia.org/wiki/Barack_Obama",
        stats: { econ: 55, dipl: 70, govt: 65, scty: 80 },
      },
      {
        name: "Joe Biden (EUA)",
        link: "https://pt.wikipedia.org/wiki/Joe_Biden",
        stats: { econ: 50, dipl: 60, govt: 60, scty: 70 },
      },
      {
        name: "Hillary Clinton (EUA)",
        link: "https://pt.wikipedia.org/wiki/Hillary_Clinton",
        stats: { econ: 50, dipl: 65, govt: 60, scty: 75 },
      },
    ],
    books: [
      { title: "Liberalism and its Discontents - Francis Fukuyama", link: "" },
      { title: "A Audácia da Esperança - Barack Obama", link: "" },
      { title: "Uma Teoria da Justiça - John Rawls", link: "" },
    ],
  },
  {
    name: "Anarquismo Religioso",
    stats: { econ: 50, dipl: 50, govt: 100, scty: 20 },
    desc: "O Anarquismo Religioso, como o anarquismo cristão de Tolstói, rejeita o Estado e outras formas de autoridade coercitiva com base em princípios religiosos. Argumenta que a única autoridade legítima é a de Deus e que o Estado, com sua violência e coerção, usurpa essa autoridade e contradiz os ensinamentos de paz e amor ao próximo. Defende a não-violência, a resistência passiva e a formação de comunidades voluntárias baseadas na fé e na ajuda mútua, sendo socialmente tradicional.",
    roast: "Você é pacifista demais para o mundo real e religioso demais para os anarquistas. Acha que pode derrotar um tanque de guerra rezando e oferecendo a outra face.",
    politicians: [
      {
        name: "León Tolstói (Escritor/Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Liev_Tolst%C3%B3i",
        stats: { econ: 50, dipl: 50, govt: 100, scty: 20 },
      },
      {
        name: "Dorothy Day (Ativista)",
        link: "https://pt.wikipedia.org/wiki/Dorothy_Day",
        stats: { econ: 80, dipl: 70, govt: 70, scty: 50 },
      },
    ],
    books: [
      { title: "O Reino de Deus Está em Vós", link: "" },
      { title: "Loaves and Fishes", link: "" },
    ],
  },
  {
    name: "Populismo de Direita",
    stats: { econ: 40, dipl: 30, govt: 30, scty: 30 },
    desc: "O Populismo de Direita combina um forte nacionalismo, políticas anti-imigração e um apelo ao 'povo' contra 'elites' cosmopolitas e progressistas. Defende a soberania nacional, a ordem pública e valores sociais tradicionais. Economicamente, pode ser pró-mercado, mas frequentemente adota medidas protecionistas para proteger a indústria e os trabalhadores nacionais. Está associado a líderes carismáticos e autoritários que afirmam ser a 'voz do povo silencioso'.",
    roast: "Você compartilha fake news no grupo da família e acha que a terra é plana porque 'a mídia mente'. Para você, qualquer um à esquerda de Gengis Khan é comunista.",
    politicians: [
      {
        name: "Jair Bolsonaro (BR)",
        link: "https://pt.wikipedia.org/wiki/Jair_Bolsonaro",
        stats: { econ: 20, dipl: 20, govt: 20, scty: 20 },
      },
      {
        name: "Donald Trump (EUA)",
        link: "https://pt.wikipedia.org/wiki/Donald_Trump",
        stats: { econ: 30, dipl: 20, govt: 40, scty: 30 },
      },
      {
        name: "Javier Milei (Argentina)",
        link: "https://pt.wikipedia.org/wiki/Javier_Milei",
        stats: { econ: 5, dipl: 20, govt: 20, scty: 50 },
      },
      {
        name: "Nikolas Ferreira (BR)",
        link: "https://pt.wikipedia.org/wiki/Nikolas_Ferreira",
        stats: { econ: 15, dipl: 25, govt: 25, scty: 15 },
      },
      {
        name: "Viktor Orbán",
        link: "https://pt.wikipedia.org/wiki/Viktor_Orb%C3%A1n",
        stats: { econ: 40, dipl: 10, govt: 20, scty: 20 },
      },
      {
        name: "Olavo de Carvalho (BR)",
        link: "https://pt.wikipedia.org/wiki/Olavo_de_Carvalho",
        stats: { econ: 15, dipl: 15, govt: 20, scty: 15 },
      },
    ],
    books: [
      { title: "O Que É Populismo? (Jan-Werner Müller)", link: "" },
      { title: "(Manifestos e discursos de cada movimento)", link: "" },
    ],
  },
  {
    name: "Conservadorismo Moderado",
    stats: { econ: 40, dipl: 40, govt: 50, scty: 30 },
    desc: "O Conservadorismo Moderado busca preservar as instituições e valores tradicionais através de mudanças graduais e prudentes, em vez de uma resistência reacionária. Apoia a economia de mercado com responsabilidade fiscal, um governo limitado mas eficaz na manutenção da ordem e da segurança, e uma nação forte que se engaja diplomaticamente. Aceita algumas reformas sociais, desde que não ameacem a estabilidade da sociedade. É uma abordagem pragmática que valoriza a experiência histórica sobre teorias abstratas.",
    roast: "Você tem medo de mudanças bruscas, tipo trocar a marca do chá. Sua maior ambição é manter tudo exatamente como está, só que um pouquinho 'mais eficiente'.",
    politicians: [
      {
        name: "David Cameron (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/David_Cameron",
        stats: { econ: 40, dipl: 40, govt: 50, scty: 30 },
      },
      {
        name: "Mitt Romney (EUA)",
        link: "https://pt.wikipedia.org/wiki/Mitt_Romney",
        stats: { econ: 35, dipl: 45, govt: 55, scty: 35 },
      },
    ],
    books: [{ title: "O Conservadorismo (Michael Oakeshott)", link: "" }],
  },
  {
    name: "Reacionário",
    stats: { econ: 40, dipl: 40, govt: 40, scty: 10 },
    desc: "O Reacionarismo é uma postura política que se opõe radicalmente às mudanças sociais, políticas e econômicas da modernidade (como a Revolução Francesa ou o Iluminismo) e busca restaurar uma ordem social anterior, considerada superior. Idealiza o passado, defendendo estruturas hierárquicas, monarquia, aristocracia e a autoridade da religião. Rejeita conceitos como democracia, igualdade e liberalismo, vendo-os como fontes de decadência e desordem.",
    roast: "Você quer voltar para 1600, mas provavelmente morreria de disenteria na primeira semana. Acha que a civilização acabou quando permitiram que as pessoas votassem.",
    politicians: [
      {
        name: "Joseph de Maistre (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Joseph_de_Maistre",
        stats: { econ: 40, dipl: 40, govt: 40, scty: 10 },
      },
    ],
    books: [
      { title: "Considerações sobre a França", link: "" },
      { title: "(Literatura que idealiza eras passadas)", link: "" },
    ],
  },
  {
    name: "Libertarianismo Social",
    stats: { econ: 60, dipl: 70, govt: 80, scty: 70 },
    desc: "O Libertarianismo Social, por vezes chamado de Geolibertarianismo, combina um forte compromisso com a liberdade individual e o ceticismo em relação ao Estado com uma preocupação com a justiça social. Defende que a terra e os recursos naturais são propriedade comum da humanidade e que, embora os indivíduos possam ter o uso exclusivo, devem compensar a sociedade por isso através de um 'imposto único sobre o valor da terra'. A receita desse imposto poderia financiar serviços públicos ou uma renda básica, eliminando outros impostos.",
    roast: "Você ama o livre mercado mas odeia quem tem terreno. Sua solução mágica para a economia é taxar a terra e esperar que o resto se resolva sozinho.",
    politicians: [
      {
        name: "Henry George (Economista)",
        link: "https://pt.wikipedia.org/wiki/Henry_George",
        stats: { econ: 60, dipl: 65, govt: 80, scty: 75 },
      },
    ],
    books: [{ title: "Progresso e Pobreza", link: "" }],
  },
  {
    name: "Libertarianismo",
    stats: { econ: 40, dipl: 60, govt: 80, scty: 60 },
    desc: "O Libertarianismo é uma filosofia política que prioriza a liberdade individual como seu valor fundamental. Defende a maximização da autonomia e da liberdade de escolha, enfatizando a soberania do indivíduo. Advoga por um governo mínimo ('Estado mínimo'), cuja única função legítima é proteger os direitos individuais contra a força e a fraude. Apoia o livre mercado, a propriedade privada e as liberdades civis, e geralmente promove uma política externa não-intervencionista.",
    roast: "Para você, leis de trânsito são tirania e impostos são literalmente estupro. Você provavelmente explicou o padrão ouro para uma mulher numa festa e ela fingiu desmaiar para fugir.",
    politicians: [
      {
        name: "Ron Paul (EUA)",
        link: "https://pt.wikipedia.org/wiki/Ron_Paul",
        stats: { econ: 35, dipl: 65, govt: 85, scty: 65 },
      },
      {
        name: "Jo Jorgensen (EUA)",
        link: "https://pt.wikipedia.org/wiki/Jo_Jorgensen",
        stats: { econ: 35, dipl: 65, govt: 85, scty: 70 },
      },
    ],
    books: [
      { title: "Anarquia, Estado e Utopia (Robert Nozick)", link: "" },
      { title: "A Ética da Liberdade (Murray Rothbard)", link: "" },
      { title: "Economia Numa Única Lição (Henry Hazlitt)", link: "" },
    ],
  },
  {
    name: "Nazismo",
    stats: { econ: 40, dipl: 0, govt: 0, scty: 5 },
    desc: "O Nazismo (Nacional-Socialismo) foi a ideologia totalitária do regime de Adolf Hitler na Alemanha. Baseava-se em um ultranacionalismo racial extremo, a crença na superioridade da 'raça ariana', um antissemitismo virulento que culminou no Holocausto, e um forte expansionismo militar (Lebensraum). Rejeitava a democracia, o liberalismo e o comunismo, promovendo o culto ao líder (Führerprinzip), a eugenia e um estado de partido único com controle absoluto sobre a sociedade. A economia era corporativista, subserviente aos objetivos de guerra do Estado.",
    roast: "Seu lugar não é na política, é numa cela ou num hospício. Você consegue estar errado em todas as dimensões morais possíveis simultaneamente.",
    politicians: [
      {
        name: "Adolf Hitler (Alemanha)",
        link: "https://pt.wikipedia.org/wiki/Adolf_Hitler",
        stats: { econ: 40, dipl: 0, govt: 0, scty: 5 },
      },
    ],
    books: [
      { title: "Minha Luta (Adolf Hitler)", link: "https://archive.org/details/meinkampf_minha_luta" },
      { title: "Os diários de Alfred Rosenberg", link: "https://amzn.to/4az5kDS" },
      { title: "Hitler (Joachim Fest)", link: "https://www.amazon.com.br/Box-Hitler-Joachim-Fest-ebook/dp/B072863DP1?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.oE9QqywuLP_ENk0c5YZDiH1WNFQlkg_7x7XWfbMM_vBd92UJxkdG77XtEbr1yxQmWhyolm6OUgeCIHetPFjLtRlPg2C_9RVP1tLNwEHxQJyEm9L9z73maWJggooEbC40c9AbXu23u2Q-W-URA5rnOE3z7LyVd4I6unxkkz9uXrrAePkK9ZtbqemYQzvO7Fs7SK30M15jWZzbT2nPy4ZrjI0VeWPiTcn5IvCXgpdCZ1MK8_vY6PrJU6isjhWipHOaM60f2jxppLE-K7AKOsax2Qw0q20uKD6SHXnvs8l528k.DY_mxTCdvFduqY9v0Ug8zJyR_BNieixEniRspB9Cf4A&qid=1771446526&sr=8-7" },
      {
        title:
          "Ascensão e Queda do Terceiro Reich (Walter Shirer)",
        link: "https://amzn.to/46gNvIq",
      },
    ],
  },
  {
    name: "Autocracia",
    stats: { econ: 50, dipl: 20, govt: 20, scty: 50 },
    desc: "A Autocracia é um sistema de governo onde o poder supremo está concentrado nas mãos de uma única pessoa, cujas decisões não estão sujeitas a restrições legais externas nem a mecanismos de controle popular. O autocrata governa sem o consentimento dos governados. A orientação econômica, social e diplomática pode variar enormemente dependendo dos caprichos e objetivos do líder, mas a característica definidora é a ausência de freios e contrapesos e a supressão da dissidência política.",
    roast: "Você só quer um rei para chamar de seu. Tem fetiche por coroas e tronos e acha que 'direitos humanos' atrapalham a estética do palácio.",
    politicians: [
      {
        name: "Rei Luís XIV (França - Absolutismo)",
        link: "https://pt.wikipedia.org/wiki/Lu%C3%ADs_XIV_de_Fran%C3%A7a",
        stats: { econ: 55, dipl: 25, govt: 25, scty: 55 },
      },
      {
        name: "Mohammed bin Salman (Arábia Saudita)",
        link: "https://pt.wikipedia.org/wiki/Mohammed_bin_Salman",
        stats: { econ: 25, dipl: 15, govt: 5, scty: 10 },
      },
      {
        name: "Alexandre, o Grande (Macedônia)",
        link: "https://pt.wikipedia.org/wiki/Alexandre,_o_Grande",
        stats: { econ: 50, dipl: 30, govt: 15, scty: 50 },
      },
    ],
    books: [
      { title: "O Príncipe - Maquiavel", link: "" },
      { title: "O Leviatã - Thomas Hobbes", link: "" },
    ],
  },
  {
    name: "Fascismo",
    stats: { econ: 40, dipl: 20, govt: 20, scty: 20 },
    desc: "O Fascismo é uma ideologia política de extrema-direita, autoritária e ultranacionalista, caracterizada por um poder ditatorial, supressão da oposição e forte controle da sociedade e da economia. Exalta a nação ou a raça como uma comunidade orgânica que transcende todos os outros interesses, e promove o militarismo, a violência e o culto ao líder. Economicamente, adota o corporativismo, onde o Estado media as relações entre capital e trabalho para servir aos interesses nacionais.",
    roast: "Você precisa de um abraço ou de terapia, mas escolheu odiar minorias. Sua masculinidade é tão frágil que precisa de um ditador para protegê-la. Ah, e pare de tentar justificar uniformes militares.",
    politicians: [
      {
        name: "Benito Mussolini (Itália)",
        link: "https://pt.wikipedia.org/wiki/Benito_Mussolini",
        stats: { econ: 40, dipl: 20, govt: 20, scty: 20 },
      },
      {
        name: "António de Oliveira Salazar (Estado Novo - PT)",
        link: "https://pt.wikipedia.org/wiki/Ant%C3%B3nio_de_Oliveira_Salazar",
        stats: { econ: 35, dipl: 15, govt: 15, scty: 10 },
      },
      {
        name: "Francisco Franco (Franquismo - ES)",
        link: "https://pt.wikipedia.org/wiki/Francisco_Franco",
        stats: { econ: 30, dipl: 10, govt: 10, scty: 5 },
      },
    ],
    books: [
      { title: "A Doutrina do Fascismo - Benito Mussolini", link: "" },
      { title: "As Origens do Totalitarismo - Hannah Arendt", link: "" },
      { title: "Anatomia do Fascismo - Robert Paxton", link: "" },
    ],
  },
  {
    name: "Conservadorismo",
    stats: { econ: 30, dipl: 40, govt: 40, scty: 20 },
    desc: "O Conservadorismo é uma filosofia política que prioriza a preservação das instituições e tradições sociais estabelecidas, acreditando que elas representam a sabedoria acumulada de gerações. Apoia a mudança gradual e orgânica em vez de reformas radicais. Valoriza a ordem, a autoridade, a propriedade privada, a religião e a família como pilares da estabilidade social. Economicamente, favorece o livre mercado com prudência fiscal, e politicamente, defende um governo forte mas limitado.",
    roast: "O mundo moderno te assusta, então você se apega a tradições que nem seus avós seguiam. Acha que 'bons costumes' é sinônimo de proibir o que você não gosta e chama tudo de 'engenharia social'.",
    politicians: [
      {
        name: "Edmund Burke (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Edmund_Burke",
        stats: { econ: 40, dipl: 30, govt: 50, scty: 30 },
      },
      {
        name: "Russell Kirk (EUA)",
        link: "https://pt.wikipedia.org/wiki/Russell_Kirk",
        stats: { econ: 35, dipl: 35, govt: 45, scty: 20 },
      },
      {
        name: "Gilberto Freyre (BR)",
        link: "https://pt.wikipedia.org/wiki/Gilberto_Freyre",
        stats: { econ: 30, dipl: 40, govt: 40, scty: 20 },
      },
      {
        name: "Roger Scruton",
        link: "https://pt.wikipedia.org/wiki/Roger_Scruton",
        stats: { econ: 25, dipl: 35, govt: 45, scty: 15 },
      },
      {
        name: "Winston Churchill",
        link: "https://pt.wikipedia.org/wiki/Winston_Churchill",
        stats: { econ: 35, dipl: 20, govt: 40, scty: 35 },
      },
      {
        name: "G. K. Chesterton",
        link: "https://pt.wikipedia.org/wiki/G._K._Chesterton",
        stats: { econ: 55, dipl: 45, govt: 50, scty: 20 },
      },
    ],
    books: [
      { title: "Reflexões sobre a Revolução em França - Edmund Burke", link: "" },
      { title: "A Mente Conservadora - Russell Kirk", link: "" },
      { title: "Como Ser um Conservador - Roger Scruton", link: "" },
      { title: "Beleza - Roger Scruton", link: "" },
      { title: "O Mínimo que Você Precisa Saber - Olavo de Carvalho", link: "" },
    ],
  },
  {
    name: "Neoliberalismo",
    stats: { econ: 30, dipl: 30, govt: 50, scty: 60 },
    desc: "O Neoliberalismo é uma filosofia política e econômica que ressurgiu no final do século XX, enfatizando o livre mercado como o principal mecanismo para o progresso econômico. Suas políticas características incluem privatização de empresas estatais, desregulamentação da economia, liberalização do comércio e do capital, e redução dos gastos públicos e dos impostos. Acredita que a redução da intervenção estatal libera as forças do mercado, gerando maior eficiência e prosperidade.",
    roast: "Você acredita que o mercado resolve tudo, até seu divórcio. Para você, pessoas pobres são apenas 'externalidades negativas' e o aquecimento global se resolve vendendo créditos de carbono.",
    politicians: [
      {
        name: "Roberto Campos (BR)",
        link: "https://pt.wikipedia.org/wiki/Roberto_Campos",
        stats: { econ: 20, dipl: 60, govt: 70, scty: 60 },
      },
      {
        name: "Paulo Guedes (BR)",
        link: "https://pt.wikipedia.org/wiki/Paulo_Guedes",
        stats: { econ: 20, dipl: 55, govt: 70, scty: 65 },
      },
      {
        name: "Margaret Thatcher (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/Margaret_Thatcher",
        stats: { econ: 30, dipl: 40, govt: 50, scty: 40 },
      },
      {
        name: "Ronald Reagan (EUA)",
        link: "https://pt.wikipedia.org/wiki/Ronald_Reagan",
        stats: { econ: 25, dipl: 45, govt: 55, scty: 35 },
      },
    ],
    books: [
      { title: "A Lanterna na Popa - Roberto Campos", link: "" },
      { title: "Capitalismo e Liberdade - Milton Friedman", link: "" },
      { title: "O Caminho da Servidão - Hayek", link: "" },
    ],
  },
  {
    name: "Liberalismo Clássico",
    stats: { econ: 30, dipl: 60, govt: 60, scty: 80 },
    desc: "O Liberalismo Clássico é a ideologia que floresceu nos séculos XVIII e XIX, baseada nas ideias de filósofos como John Locke e economistas como Adam Smith. Enfatiza a liberdade individual, os direitos naturais (vida, liberdade e propriedade), o governo limitado e constitucional (Estado de Direito), e o livre mercado (laissez-faire). Acredita que a sociedade prospera quando os indivíduos são livres para perseguir seus próprios interesses com mínima interferência do Estado.",
    roast: "Você acredita que o mercado livre resolve tudo e que o governo é o problema, mas vive em uma cidade com calçadas públicas. Cita Adam Smith em festas e acha que o século XIX foi o auge da civilização.",
    politicians: [
      {
        name: "Rui Barbosa (BR)",
        link: "https://pt.wikipedia.org/wiki/Rui_Barbosa",
        stats: { econ: 30, dipl: 60, govt: 60, scty: 80 },
      },
      {
        name: "Joaquim Nabuco (BR)",
        link: "https://pt.wikipedia.org/wiki/Joaquim_Nabuco",
        stats: { econ: 40, dipl: 70, govt: 70, scty: 90 },
      },
      {
        name: "John Locke (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/John_Locke",
        stats: { econ: 30, dipl: 60, govt: 60, scty: 80 },
      },
      {
        name: "Adam Smith (Economista)",
        link: "https://pt.wikipedia.org/wiki/Adam_Smith",
        stats: { econ: 20, dipl: 50, govt: 70, scty: 70 },
      },
      {
        name: "John Stuart Mill (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/John_Stuart_Mill",
        stats: { econ: 35, dipl: 65, govt: 70, scty: 85 },
      },
    ],
    books: [
      { title: "O Abolicionismo - Joaquim Nabuco", link: "" },
      { title: "A Riqueza das Nações - Adam Smith", link: "" },
      { title: "Cartas de Inglaterra - Rui Barbosa", link: "" },
      { title: "Sobre a Liberdade - John Stuart Mill", link: "" },
      { title: "Os Anjos Bons da Nossa Natureza - Steven Pinker", link: "https://amzn.to/4s3SlBd" },
    ],
  },
  {
    name: "Capitalismo Autoritário",
    stats: { econ: 20, dipl: 30, govt: 20, scty: 40 },
    desc: "O Capitalismo Autoritário, também conhecido como capitalismo de Estado autoritário, é um sistema político que combina uma economia de mercado com um regime político autoritário. Nesse modelo, o Estado restringe severamente as liberdades civis e políticas, suprime a dissidência e mantém o poder sem legitimidade democrática, ao mesmo tempo em que permite a propriedade privada e a operação de mercados para gerar crescimento econômico. Exemplos contemporâneos incluem Cingapura e a China moderna.",
    politicians: [
      {
        name: "Lee Kuan Yew (Singapura)",
        link: "https://pt.wikipedia.org/wiki/Lee_Kuan_Yew",
        stats: { econ: 15, dipl: 35, govt: 15, scty: 35 },
      },
      {
        name: "Augusto Pinochet (Chile)",
        link: "https://pt.wikipedia.org/wiki/Augusto_Pinochet",
        stats: { econ: 20, dipl: 20, govt: 20, scty: 20 },
      },
    ],
    books: [
      {
        title: "(Estudos sobre Cingapura, Chile sob Pinochet, China moderna)",
        link: "",
      },
      { title: "O Fim da História e o Último Homem (Fukuyama)", link: "" },
    ],
  },
  {
    name: "Capitalismo de Estado",
    stats: { econ: 20, dipl: 50, govt: 30, scty: 50 },
    desc: "O Capitalismo de Estado é um sistema econômico onde o Estado exerce um controle comercial e administrativo dominante sobre a economia. Embora a propriedade privada e os mercados existam, o Estado é o principal ator econômico, possuindo e operando grandes empresas ('campeões nacionais'), dirigindo investimentos para setores estratégicos e utilizando a economia para alcançar objetivos políticos nacionais. Difere do socialismo de Estado pois o objetivo final não é a abolição do capital, mas sim seu controle pelo Estado.",
    politicians: [
      {
        name: "Deng Xiaoping (China)",
        link: "https://pt.wikipedia.org/wiki/Deng_Xiaoping",
        stats: { econ: 15, dipl: 55, govt: 25, scty: 45 },
      },
      {
        name: "Park Chung-hee (Coreia do Sul)",
        link: "https://pt.wikipedia.org/wiki/Park_Chung-hee",
        stats: { econ: 25, dipl: 40, govt: 25, scty: 45 },
      },
    ],
    books: [
      { title: "O Capitalismo de Estado Chinês - Nicholas Lardy", link: "" },
      { title: "Como a China Escapa da Armadilha - Yuen Yuen Ang", link: "" },
      { title: "O Milagre Asiático - Joe Studwell", link: "" },
    ],
  },
  {
    name: "Neoconservadorismo",
    stats: { econ: 20, dipl: 20, govt: 40, scty: 20 },
    desc: "O Neoconservadorismo é uma vertente do conservadorismo que se distingue por uma política externa assertiva, intervencionista e moralista. Defende a promoção da democracia e dos interesses nacionais no exterior, se necessário através do uso da força militar ('paz pela força'). Acreditam que os Estados Unidos, como única superpotência, têm a responsabilidade de liderar o mundo e confrontar regimes hostís. Domesticamente, são geralmente conservadores em questões econômicas e sociais.",
    roast: "Você acha que a solução para todo problema internacional é bombardear e depois perguntar. Chama qualquer país que não tem McDonald's de 'ameaça à democracia'.",
    politicians: [
      {
        name: "George W. Bush (EUA)",
        link: "https://pt.wikipedia.org/wiki/George_W._Bush",
        stats: { econ: 25, dipl: 15, govt: 35, scty: 25 },
      },
      {
        name: "Dick Cheney (EUA)",
        link: "https://pt.wikipedia.org/wiki/Dick_Cheney",
        stats: { econ: 15, dipl: 15, govt: 35, scty: 15 },
      },
      {
        name: "Paul Wolfowitz (EUA)",
        link: "https://pt.wikipedia.org/wiki/Paul_Wolfowitz",
        stats: { econ: 25, dipl: 25, govt: 45, scty: 25 },
      },
      {
        name: "Irving Kristol (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Irving_Kristol",
        stats: { econ: 25, dipl: 20, govt: 45, scty: 25 },
      },
    ],
    books: [
      { title: "O Fim da História e o Último Homem - Francis Fukuyama", link: "" },
      { title: "O Caso para a Democracia - Natan Sharansky", link: "" },
      { title: "Of Paradise and Power - Robert Kagan", link: "" },
      { title: "Reflexos de uma Era de Ouro - Charles Krauthammer", link: "" },
    ],
  },
  {
    name: "Fundamentalismo",
    stats: { econ: 20, dipl: 30, govt: 30, scty: 5 },
    desc: "O Fundamentalismo é uma postura que defende a adesão estrita e literal a um conjunto de crenças e princípios, geralmente de natureza religiosa. Rejeita interpretações modernas ou seculares e busca impor seus preceitos na sociedade, muitas vezes através da lei e do poder do Estado (teocracia). É caracterizado pela intolerância a visões de mundo diferentes e por uma visão reacionária da sociedade, buscando restaurar uma pureza original percebida na fé e nos costumes.",
    roast: "Você acha que o maior problema do mundo é que as pessoas não estão seguindo o livro certo da maneira certa. Sua solução para tudo é mais fé e menos perguntas.",
    politicians: [
      {
        name: "Ruhollah Khomeini (Irã)",
        link: "https://pt.wikipedia.org/wiki/Ruhollah_Khomeini",
        stats: { econ: 25, dipl: 25, govt: 25, scty: 0 },
      },
      {
        name: "Osama bin Laden (Al-Qaeda)",
        link: "https://pt.wikipedia.org/wiki/Osama_bin_Laden",
        stats: { econ: 30, dipl: 5, govt: 5, scty: 0 },
      },
      {
        name: "Abu Bakr al-Baghdadi (ISIS)",
        link: "https://pt.wikipedia.org/wiki/Abu_Bakr_al-Baghdadi",
        stats: { econ: 40, dipl: 0, govt: 0, scty: 0 },
      },
    ],
    books: [
      { title: "As Batalhas de Deus - Gilles Kepel (análise)", link: "" },
      { title: "O Choque de Civilizações - Samuel Huntington", link: "" },
    ],
  },
  {
    name: "Capitalismo Libertário",
    stats: { econ: 20, dipl: 50, govt: 80, scty: 60 },
    desc: "O Capitalismo Libertário (ou Minarquismo) é uma filosofia que defende a máxima liberdade econômica e individual. Advoga por um Estado mínimo, frequentemente chamado de 'guarda noturno', cuja única função legítima seria proteger os indivíduos da agressão, roubo e fraude, e garantir o cumprimento de contratos. Todas as outras funções, como educação, saúde e infraestrutura, deveriam ser providas pelo livre mercado.",
    politicians: [
      {
        name: "Robert Nozick (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Robert_Nozick",
        stats: { econ: 15, dipl: 55, govt: 85, scty: 65 },
      },
    ],
    books: [
      { title: "Anarquia, Estado e Utopia", link: "" },
      { title: "Capitalismo e Liberdade (Milton Friedman)", link: "" },
    ],
  },
  {
    name: "Anarquismo de Mercado",
    stats: { econ: 20, dipl: 50, govt: 100, scty: 50 },
    desc: "O Anarquismo de Mercado é uma forma de anarquismo individualista que defende uma sociedade sem Estado com uma economia totalmente baseada no livre mercado, propriedade privada e contratos voluntários. Acredita que a ausência do Estado levaria a um mercado mais justo e livre de privilégios corporativos. Difere do Anarco-Capitalismo em algumas visões sobre a natureza da propriedade ou em suas raízes históricas, muitas vezes se alinhando mais com o anarquismo de esquerda anti-capitalista do século XIX.",
    politicians: [
      {
        name: "Samuel Edward Konkin III (Agorismo)",
        link: "https://en.wikipedia.org/wiki/Samuel_Edward_Konkin_III",
        stats: { econ: 15, dipl: 55, govt: 100, scty: 55 },
      },
      {
        name: "Kevin Carson (Mutualista)",
        link: "https://en.wikipedia.org/wiki/Kevin_Carson",
        stats: { econ: 30, dipl: 60, govt: 90, scty: 60 },
      },
    ],
    books: [
      { title: "New Libertarian Manifesto", link: "" },
      { title: "Studies in Mutualist Political Economy", link: "" },
    ],
  },
  {
    name: "Objetivismo",
    stats: { econ: 10, dipl: 50, govt: 90, scty: 40 },
    desc: "O Objetivismo é a filosofia fundada por Ayn Rand. Defende a realidade objetiva, a razão como único guia para o conhecimento, o egoísmo racional como código moral e o capitalismo laissez-faire como sistema político ideal. Rejeita o altruísmo, o coletivismo e a religião como moralmente destrutivos. Advoga por um Estado mínimo para proteger os direitos individuais, mas com uma forte ênfase na liberdade pessoal e econômica, vendo o indivíduo heróico como o motor do progresso humano.",
    politicians: [
      {
        name: "Ayn Rand (Filósofa/Escritora)",
        link: "https://pt.wikipedia.org/wiki/Ayn_Rand",
        stats: { econ: 5, dipl: 55, govt: 95, scty: 35 },
      },
    ],
    books: [
      { title: "A Revolta de Atlas", link: "" },
      { title: "A Nascente", link: "" },
      { title: "A Virtude do Egoísmo", link: "" },
    ],
  },
  {
    name: "Capitalismo Totalitário",
    stats: { econ: 0, dipl: 30, govt: 0, scty: 50 },
    desc: "O Capitalismo Totalitário é um sistema hipotético que une um controle estatal totalitário sobre a vida dos indivíduos com uma economia de livre mercado desregulada. Nesse cenário distópico, o Estado usa seu poder absoluto não para controlar a economia, mas para suprimir qualquer resistência ao capital, garantindo uma ordem social onde as corporações têm liberdade máxima e os cidadãos, mínima. É a fusão do autoritarismo político extremo com o liberalismo econômico extremo.",
    roast: "Você quer um Estado que bata nos trabalhadores e desregule as empresas ao mesmo tempo. Seu herói é um CEO com um exército particular.",
    politicians: [
      {
        name: "Jorge Rafael Videla (Argentina)",
        link: "https://pt.wikipedia.org/wiki/Jorge_Rafael_Videla",
        stats: { econ: 10, dipl: 10, govt: 0, scty: 30 },
      },
      {
        name: "Efraín Ríos Montt (Guatemala)",
        link: "https://pt.wikipedia.org/wiki/Efra%C3%ADn_R%C3%ADos_Montt",
        stats: { econ: 15, dipl: 15, govt: 5, scty: 25 },
      },
    ],
    books: [
      { title: "A Doutrina do Choque - Naomi Klein", link: "" },
      { title: "Capitalismo e Liberdade - Milton Friedman (crítica)", link: "" },
    ],
  },

  {
    name: "Anarco-Capitalismo",
    stats: { econ: 0, dipl: 50, govt: 100, scty: 50 },
    desc: "O Anarco-Capitalismo é uma filosofia política que defende a eliminação completa do Estado e a organização da sociedade inteiramente através do livre mercado. Acredita que todas as funções atualmente desempenhadas pelo Estado, incluindo a segurança, a justiça e a defesa, poderiam ser fornecidas de forma mais eficiente e ética por agências privadas em concorrência. Baseia-se no princípio de não-agressão, que proíbe o início de força contra pessoas ou sua propriedade.",
    roast: "Você pagaria para andar na calçada e acha que vender órgãos infantis é 'livre mercado'. Sua utopia é um condomínio fechado armado até os dentes onde a lei é ditada pelo dono da rua.",
    politicians: [
      {
        name: "Murray Rothbard (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Murray_Rothbard",
        stats: { econ: 0, dipl: 50, govt: 100, scty: 50 },
      },
      {
        name: "David Friedman (Teórico)",
        link: "https://pt.wikipedia.org/wiki/David_D._Friedman",
        stats: { econ: 5, dipl: 55, govt: 95, scty: 55 },
      },
      {
        name: "Hans-Hermann Hoppe (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Hans-Hermann_Hoppe",
        stats: { econ: 0, dipl: 30, govt: 100, scty: 40 },
      },
    ],
    books: [
      { title: "Por Uma Nova Liberdade: O Manifesto Libertário", link: "" },
      { title: "A Maquinaria da Liberdade", link: "" },
      { title: "Democracia: O deus que falhou", link: "" },
    ],
  },
  {
    name: "Neocalvinismo",
    stats: { econ: 50, dipl: 50, govt: 70, scty: 20 },
    desc: "O Neocalvinismo, fundamentado no pensamento de Abraham Kuyper, defende a 'Soberania das Esferas', onde cada área da vida (estado, igreja, família, arte, ciência) possui sua própria autoridade dada por Deus, impedindo que o Estado ou qualquer outra instituição se torne totalitária. Promove uma visão de pluralismo social e compromisso cristão com a cultura e a justiça social, equilibrando um profundo conservadorismo moral com a defesa fervorosa da liberdade religiosa e institucional. Rejeita tanto a secularização totalitária quanto o domínio direto da igreja sobre o estado.",
    roast: "Você acredita piamente que existe um 'palmo quadrado' de autoridade divina até na escolha da marca do café. Sua solução para tudo é criar uma instituição paralela christian-only e depois reclamar que a sociedade está fragmentada.",
    politicians: [
      {
        name: "Abraham Kuyper",
        link: "https://pt.wikipedia.org/wiki/Abraham_Kuyper",
        stats: { econ: 50, dipl: 45, govt: 65, scty: 15 },
      },
      {
        name: "Guillaume Groen van Prinsterer",
        link: "https://pt.wikipedia.org/wiki/Guillaume_Groen_van_Prinsterer",
        stats: { econ: 45, dipl: 45, govt: 65, scty: 15 },
      },
      {
        name: "Herman Dooyeweerd",
        link: "https://pt.wikipedia.org/wiki/Herman_Dooyeweerd",
        stats: { econ: 55, dipl: 55, govt: 75, scty: 25 },
      },
      {
        name: "André Biéler",
        link: "https://pt.wikipedia.org/wiki/Andr%C3%A9_Bi%C3%A9ler",
        stats: { econ: 60, dipl: 60, govt: 80, scty: 30 },
      },
    ],
    books: [
      { title: "Palestras sobre o Calvinismo - Abraham Kuyper", link: "" },
      { title: "Raiz da Cultura - Herman Dooyeweerd", link: "" },
      { title: "O Pensamento Econômico e Social de Calvino - André Biéler", link: "" },
      { title: "No Ritmo do Reino - James K. A. Smith", link: "" },
    ],
  },
  {
    name: "Liberalismo de Direita",
    stats: { econ: 20, dipl: 40, govt: 70, scty: 70 },
    desc: "O Liberalismo de Direita (ou Liberalismo Econômico Moderno) foca na redução drástica do Estado, privatizações, desregulamentação e responsabilidade fiscal. No contexto brasileiro, é associado à defesa das reformas estruturantes e da liberdade individual como motor do progresso. Acredita que o livre mercado é o mecanismo mais eficiente para gerar riqueza e que o papel do governo deve se limitar a garantir a segurança, a justiça e o cumprimento de contratos, evitando intervenções na economia.",
    roast: "Você cita o Roberto Campos em jantares de família e acha que o 'imposto é roubo' é a única frase que precisa para explicar toda a sociologia moderna. Provavelmente tem um adesivo do MBL no carro e acredita que a mão invisível do mercado vai consertar até o seu Wi-Fi ruim.",
    politicians: [
      {
        name: "Roberto Campos",
        link: "https://pt.wikipedia.org/wiki/Roberto_Campos",
        stats: { econ: 20, dipl: 60, govt: 70, scty: 70 },
      },
      {
        name: "Paulo Guedes",
        link: "https://pt.wikipedia.org/wiki/Paulo_Guedes",
        stats: { econ: 20, dipl: 55, govt: 70, scty: 70 },
      },
      {
        name: "Kim Kataguiri (MBL)",
        link: "https://pt.wikipedia.org/wiki/Kim_Kataguiri",
        stats: { econ: 25, dipl: 50, govt: 75, scty: 75 },
      },
      {
        name: "Friedrich Hayek",
        link: "https://pt.wikipedia.org/wiki/Friedrich_Hayek",
        stats: { econ: 15, dipl: 60, govt: 80, scty: 80 },
      },
    ],
    books: [
      { title: "A Lanterna na Popa - Roberto Campos", link: "" },
      { title: "O Caminho da Servidão - Friedrich Hayek", link: "" },
      { title: "As Seis Lições - Ludwig von Mises", link: "" },
      { title: "Livre para Escolher - Milton Friedman", link: "" },
    ],
  },
  {
    name: "Integralismo Brasileiro",
    stats: { econ: 50, dipl: 10, govt: 10, scty: 5 },
    desc: "O Integralismo foi o principal movimento fascista brasileiro, fundado por Plínio Salgado na década de 1930. Diferente do fascismo europeu, incorporou forte ênfase no catolicismo, no espiritualismo e na identidade nacional brasileira, com o lema 'Deus, Pátria e Família'. Defendia um Estado corporativista e autoritário, anticomunista e antiliberal, que unisse as classes sociais sob a liderança nacional. Adotava a camisa verde e o sigma (Σ) como símbolo, e chegou a ter centenas de milhares de membros antes de ser proibido por Vargas em 1937.",
    roast: "Você usa camisa verde e acha que o Brasil seria perfeito se fosse governado por um intelectual católico de mão de ferro. Sua solução para a luta de classes é fazer todo mundo rezar junto e obedecer ao líder.",
    politicians: [
      {
        name: "Plínio Salgado (BR)",
        link: "https://pt.wikipedia.org/wiki/Pl%C3%ADnio_Salgado",
        stats: { econ: 50, dipl: 10, govt: 10, scty: 5 },
      },
      {
        name: "Gustavo Barroso (BR)",
        link: "https://pt.wikipedia.org/wiki/Gustavo_Barroso",
        stats: { econ: 45, dipl: 5, govt: 10, scty: 5 },
      },
      {
        name: "Miguel Reale (BR - fase integralista)",
        link: "https://pt.wikipedia.org/wiki/Miguel_Reale",
        stats: { econ: 55, dipl: 15, govt: 15, scty: 10 },
      },
    ],
    books: [
      { title: "O que é o Integralismo - Plínio Salgado", link: "" },
      { title: "A Doutrina do Sigma - Plínio Salgado", link: "" },
      { title: "Brasil, Colônia de Banqueiros - Gustavo Barroso", link: "" },
    ],
  },
  {
    name: "Conservadorismo Liberal",
    stats: { econ: 20, dipl: 50, govt: 65, scty: 35 },
    desc: "O Conservadorismo Liberal, ou Liberalconservadorismo, combina o compromisso com a liberdade econômica e o livre mercado com a valorização das instituições, tradições e valores morais estabelecidos. Defende privatizações, responsabilidade fiscal e desregulamentação, mas dentro de um quadro de respeito à ordem constitucional, à família e à cultura nacional. No Brasil, representa correntes como o Partido Novo e setores do MBL, que rejeitam tanto o estatismo da esquerda quanto o autoritarismo da direita radical.",
    roast: "Você quer um Estado mínimo, mas só para a economia. Para os costumes, quer um Estado bem presente na sua cama. Acha que liberdade é poder demitir funcionários sem aviso, mas não poder casar com quem quiser.",
    politicians: [
      {
        name: "João Amoêdo (BR)",
        link: "https://pt.wikipedia.org/wiki/Jo%C3%A3o_Amoêdo",
        stats: { econ: 20, dipl: 50, govt: 65, scty: 35 },
      },
      {
        name: "Luís Felipe d'Avila (BR)",
        link: "https://pt.wikipedia.org/wiki/Lu%C3%ADs_Felipe_d%27Avila",
        stats: { econ: 15, dipl: 55, govt: 70, scty: 40 },
      },
      {
        name: "Gustavo Franco (BR)",
        link: "https://pt.wikipedia.org/wiki/Gustavo_Franco",
        stats: { econ: 20, dipl: 60, govt: 70, scty: 50 },
      },
    ],
    books: [
      { title: "O Caminho da Servidão - Friedrich Hayek", link: "" },
      { title: "Capitalismo e Liberdade - Milton Friedman", link: "" },
      { title: "A Mente Conservadora - Russell Kirk", link: "" },
    ],
  },
  {
    name: "Ecossocialismo",
    stats: { econ: 80, dipl: 70, govt: 50, scty: 80 },
    desc: "O Ecossocialismo parte da crítica marxista ao capitalismo e a aprofunda: a destruição ambiental não é um acidente do sistema, é sua lógica central. A acumulação infinita de capital é incompatível com um planeta finito. Defendemos a socialização dos meios de produção e a planificação democrática da economia orientada para as necessidades humanas e os limites ecológicos, não para o lucro. A transição energética, a agroecologia e a soberania alimentar são bandeiras centrais. Não há socialismo em um planeta morto.",
    roast: "Você quer fazer a revolução, mas só se for carbono neutro. Sua maior angústia é decidir se o coletivo de bicicletas é suficientemente anticapitalista ou apenas uma startup de mobilidade urbana.",
    politicians: [
      {
        name: "Chico Mendes (BR)",
        link: "https://pt.wikipedia.org/wiki/Chico_Mendes",
        stats: { econ: 85, dipl: 60, govt: 55, scty: 75 },
      },
      {
        name: "Joel Kovel (EUA)",
        link: "https://pt.wikipedia.org/wiki/Joel_Kovel",
        stats: { econ: 80, dipl: 70, govt: 50, scty: 80 },
      },
      {
        name: "Michael Löwy (BR/França)",
        link: "https://pt.wikipedia.org/wiki/Michael_L%C3%B6wy",
        stats: { econ: 85, dipl: 75, govt: 55, scty: 85 },
      },
      {
        name: "Vandana Shiva (Índia)",
        link: "https://pt.wikipedia.org/wiki/Vandana_Shiva",
        stats: { econ: 75, dipl: 80, govt: 60, scty: 90 },
      },
    ],
    books: [
      { title: "Ecossocialismo - Michael Löwy", link: "" },
      { title: "O Capitalismo e a Destruição do Mundo - Joel Kovel", link: "" },
      { title: "Monocultures of the Mind - Vandana Shiva", link: "" },
      { title: "Chico Mendes: Crime e Castigo - Zuenir Ventura", link: "" },
    ],
  },
  {
    name: "Feminismo",
    stats: { econ: 50, dipl: 75, govt: 70, scty: 100 },
    desc: "O Feminismo busca a libertação da mulher e a desconstrução das hierarquias de gênero. Luta pela igualdade de direitos, pelo fim da discriminação, pela autonomia sobre o próprio corpo e, em suas vertentes mais radicais, pelo fim das estruturas patriarcais e da opressão sistêmica. Diferentes correntes feministas podem questionar estruturas como o capitalismo, a linguagem ou até mesmo o conceito de gênero, mas todas compartilham o objetivo de emancipar não apenas as mulheres, mas toda a sociedade dos papéis de gênero opressivos.",
    roast: "Sua citação preferida é 'lugar de mulher é onde ela quiser', exceto se for pra discordar de você no Twitter. Você cancelaria o Papai Noel por não ser uma entidade agênero.",
    politicians: [
      {
        name: "Mary Wollstonecraft (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/Mary_Wollstonecraft",
        stats: { econ: 50, dipl: 70, govt: 70, scty: 100 },
      },
      {
        name: "Betty Friedan (EUA)",
        link: "https://pt.wikipedia.org/wiki/Betty_Friedan",
        stats: { econ: 45, dipl: 65, govt: 65, scty: 100 },
      },
      {
        name: "Gloria Steinem (EUA)",
        link: "https://pt.wikipedia.org/wiki/Gloria_Steinem",
        stats: { econ: 50, dipl: 75, govt: 70, scty: 100 },
      },
      {
        name: "Simone de Beauvoir (França)",
        link: "https://pt.wikipedia.org/wiki/Simone_de_Beauvoir",
        stats: { econ: 60, dipl: 80, govt: 75, scty: 100 },
      },
      {
        name: "Judith Butler",
        link: "https://pt.wikipedia.org/wiki/Judith_Butler",
        stats: { econ: 70, dipl: 90, govt: 80, scty: 100 },
      },
    ],
    books: [
      { title: "A Vindication of the Rights of Woman - Mary Wollstonecraft", link: "" },
      { title: "A Mística Feminina - Betty Friedan", link: "" },
      { title: "O Segundo Sexo - Simone de Beauvoir", link: "" },
      { title: "Problemas de Gênero - Judith Butler", link: "" },
    ],
  },
];

export function getMatchedIdeology(e: number, d: number, g: number, s: number): Ideology | null {
  const top = getTopMatchedIdeologies(e, d, g, s, 1);
  return top.length > 0 ? top[0] : null;
}

export function getTopMatchedIdeologies(e: number, d: number, g: number, s: number, count: number = 3): Ideology[] {
  const results = ideologies.map(ideology => {
    const distance = Math.sqrt(
      Math.pow(ideology.stats.econ - e, 2) +
      Math.pow(ideology.stats.dipl - d, 2) +
      Math.pow(ideology.stats.govt - g, 2) +
      Math.pow(ideology.stats.scty - s, 2)
    );
    return { ideology, distance };
  });

  results.sort((a, b) => a.distance - b.distance);

  return results.slice(0, count).map(r => r.ideology);
}


