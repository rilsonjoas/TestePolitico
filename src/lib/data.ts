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
  affinity?: number;
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
  content?: {
    history: string;
    corePrinciples: string;
    curiosities: string;
  };
  roast?: string;
  politicians: Politician[];
  books: Book[];
  affinity?: number;
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // Substitui espaços por hifens
    .replace(/[^\w\-]+/g, "") // Remove caracteres não-alfanuméricos
    .replace(/\-\-+/g, "-") // Substitui múltiplos hifens por um único
    .replace(/^-+/, "") // Remove hifens do início
    .replace(/-+$/, ""); // Remove hifens do fim
}

export function getClosestPolitician(
  e: number,
  d: number,
  g: number,
  s: number,
) {
  let closestPolitician: Politician | null = null;
  let minDistance = Infinity;

  // Flatten all politicians from all ideologies
  const allPoliticians: Politician[] = [];
  ideologies.forEach((ideology) => {
    ideology.politicians.forEach((p) => {
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
      Math.pow(politician.stats.scty - s, 2),
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestPolitician = {
        ...politician,
        affinity: getMatchPercentage(distance)
      };
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
    effect: { econ: -20, dipl: 0, govt: 0, scty: 0 },
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
      "Programas de bem-estar social mantidos pelo Estado acabam criando dependência financeira e fazem mais mal do que bem a longo prazo.",
    effect: { econ: -5, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "É mais eficaz e moralmente superior ajudar os vulneráveis através da caridade voluntária e iniciativa privada do que pela coerção dos impostos do Estado.",
    effect: { econ: -5, dipl: 0, govt: 0, scty: 0 },
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
      "Serviços de infraestrutura essencial na sociedade — como água cristalina e energia elétrica — devem obrigatoriamente estar sob o modelo de controle público e propriedade do Estado.",
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
    effect: { econ: 20, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Organizações internacionais como a ONU possuem influência excessiva e deveriam ter seu poder reduzido ou ser extintas.",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "O uso da força militar é plenamente justificável em casos de legítima defesa contra ataques estrangeiros.",
    effect: { econ: 0, dipl: -5, govt: -5, scty: 0 },
  },
  {
    question:
      "O uso da força militar é justificável para proteger interesses econômicos ou estratégicos do nosso país no exterior, mesmo sem ataque direto.",
    effect: { econ: 0, dipl: -5, govt: -5, scty: 0 },
  },
  {
    question:
      "A formação de blocos de cooperação regionais entre países (como a União Europeia e o Mercosul) é benéfica e deve ser apoiada.",
    effect: { econ: -5, dipl: 10, govt: 0, scty: 5 },
  },
  {
    question:
      "Preservar a soberania e a independência do nosso país em relação a influências externas é fundamental.",
    effect: { econ: 0, dipl: -20, govt: -5, scty: 0 },
  },
  {
    question:
      "A criação de um governo mundial unificado seria um passo positivo para a paz e o progresso da humanidade.",
    effect: { econ: 0, dipl: 20, govt: 0, scty: 0 },
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
    question:
      "Acredito que minha nação tem uma cultura, história ou valores que a tornam superior à maioria das outras nações.",
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
    effect: { econ: 0, dipl: 0, govt: 20, scty: 0 },
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
    effect: { econ: 0, dipl: 0, govt: -20, scty: 0 },
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
    effect: { econ: 0, dipl: 0, govt: 0, scty: 20 },
  },
  {
    question:
      "As instituições religiosas e seus preceitos deveriam ter influência direta nas leis e nas políticas governamentais.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -20 },
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
    question:
      "O Estado deve criminalizar a prostituição — ela não deve ser tratada como trabalho legítimo nem regulamentada.",
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
    desc: "O Anarco-Comunismo (também conhecido como comunismo libertário ou anarquismo comunista) é uma teoria política e econômica que defende a abolição do Estado, do capitalismo, da propriedade privada dos meios de produção e de toda e qualquer forma de hierarquia coercitiva. Diferente do socialismo estatal, acredita que a transição para uma sociedade sem classes deve ser imediata e baseada na organização voluntária de comunas autogeridas.\n\nPropõe um sistema de distribuição baseado na máxima 'de cada qual segundo suas capacidades, a cada qual segundo suas necessidades', eliminando o conceito de salário e mercado. Historicamente, consolidou-se no final do século XIX através das obras de Piotr Kropotkin e Errico Malatesta, enfatizando a ajuda mútua como um fator de evolução biológica e social. Busca uma ordem social onde a liberdade individual absoluta coexiste com a igualdade econômica coletiva plena, sem a necessidade de um governo centralizado ou sistema policial.",
    roast:
      "Para você, qualquer hierarquia é fascismo, menos a do grupo do WhatsApp da comuna que ninguém modera. Você acredita que a humanidade viveria em paz e harmonia se não fosse o Estado, ignorando 5.000 anos de história humana.",
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
        title: "A Conquista do Pão (Kropotkin)",
        link: "https://amzn.to/4r7aY6Q",
      },
      {
        title:
          "O indivíduo, a sociedade e o Estado e outros ensaios (Emma Goldman)",
        link: "https://amzn.to/4sQW9qy",
      },
      {
        title: "No Café - Diálogos Sobre O Anarquismo (Malatesta)",
        link: "https://amzn.to/4jQ7djI",
      },
    ],
  },
  {
    name: "Comunismo Libertário",
    stats: { econ: 100, dipl: 65, govt: 85, scty: 80 },
    desc: "O Comunismo Libertário é uma vertente do anarquismo que busca o equilíbrio sintético entre o socialismo científico e a liberdade individual radical. Diferente de correntes autoritárias do marxismo, rejeita a 'ditadura do proletariado' através do Estado, propondo em seu lugar federações de comunas democráticas e conselhos de trabalhadores organizados de baixo para cima.\n\nNo século XX, esta visão foi renovada pela Ecologia Social de Murray Bookchin, que argumenta que a dominação da natureza pela humanidade é um subproduto da dominação do homem pelo homem. Assim, a luta contra o capitalismo é indissociável da luta contra o patriarcado, o racismo e a hierarquia urbana. Defende o municipalismo libertário como estratégia para retomar o poder político para as comunidades locais, transformando as cidades em assembleias populares soberanas que cooperam de forma confederada.",
    roast:
      "Você é o anarquista que insiste em ter um plano de 5 anos para a revolução, mas não consegue organizar a vaquinha do churrasco. Sua utopia é um conselho de bairro que debate por 12 horas se a lixeira deve ser de plástico ou metal.",
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
      {
        title: "A Ecologia da Liberdade (Murray Bookchin)",
        link: "https://amzn.to/3ZG4mRl",
      },
      {
        title: "O anarquismo: Da doutrina à ação (Daniel Guérin)",
        link: "https://amzn.to/3OykDVT",
      },
      {
        title: "Anarquismo: crítica e autocrítica",
        link: "https://amzn.to/4qMcDOy",
      },
    ],
  },
  {
    name: "Trotskismo",
    stats: { econ: 100, dipl: 100, govt: 60, scty: 80 },
    desc: "O Trotskismo é a vertente do Marxismo-Leninismo baseada no pensamento do revolucionário russo Leon Trotsky, surgida como uma oposição ferrenha ao estalinismo dentro da União Soviética. Seu pilar fundamental é a Teoria da Revolução Permanente, que sustenta que a revolução socialista em países subdesenvolvidos deve transbordar as fronteiras nacionais e se tornar mundial para sobreviver, rejeitando a tese do 'socialismo em um só país'.\n\nOs trotskistas defendem a ditadura do proletariado baseada na democracia operária genuína (sovietes), criticando a degeneração burocrática dos Estados operários onde uma casta de funcionários (a burocracia) tomou o poder dos trabalhadores. Prioriza a tática da Frente Única e a luta contra o fascismo, mantendo uma organização internacionalista rigorosa (como a Quarta Internacional) para coordenar a luta global contra o capital e a burocracia.",
    roast:
      "Sua habilidade principal é fundar partidos que se dividem em três facções na primeira reunião. Você vende jornal na porta da faculdade e espera a Revolução Mundial há 80 anos.",
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
      {
        title: "A Revolução Permanente (Trotsky)",
        link: "https://amzn.to/46Rxk4n",
      },
      {
        title: "História da Revolução Russa (Trotsky)",
        link: "https://amzn.to/4tQ26Vt",
      },
      {
        title: "A Revolução Traída (Trotsky)",
        link: "https://amzn.to/4c2ox3k",
      },
      {
        title: "O Programa de Transição (Trotsky)",
        link: "https://amzn.to/4qJUkJR",
      },
      {
        title: "Capitalismo Tardio (Ernest Mandel)",
        link: "https://amzn.to/46fBXFh",
      },
    ],
  },
  {
    name: "Marxismo",
    stats: { econ: 100, dipl: 70, govt: 40, scty: 80 },
    desc: "O Marxismo é o método de análise socioeconômica e a visão de mundo fundamentada nas obras de Karl Marx e Friedrich Engels, que vê a história da humanidade como a história da luta de classes. Seu conceito central é o materialismo histórico, que argumenta que a base econômica da sociedade (modo de produção) determina sua superestrutura política e ideológica.\n\nMarx analisa o capitalismo como um sistema baseado na exploração do trabalho assalariado e na extração de mais-valia pela burguesia, o que inevitavelmente gera crises de superprodução e a pauperização do proletariado. Propõe que o proletariado, ao tomar consciência de classe, deve liderar uma revolução para abolir a propriedade privada dos meios de produção, instaurando uma fase de transição (socialismo) que eventualmente levaria ao comunismo — uma sociedade sem classes e sem Estado.",
    roast:
      "Você chama tudo de 'dialético' quando não sabe explicar. Provavelmente acha que ler livros difíceis te torna moralmente superior a quem trabalha num emprego real.",
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
      {
        title: "O Manifesto Comunista (Marx e Engels)",
        link: "https://amzn.to/4roqkUZ",
      },
      {
        title: "Formação do Brasil Contemporâneo (Caio Prado Jr.)",
        link: "https://amzn.to/4tJEmC4",
      },
      {
        title: "O Cavaleiro da Esperança (Jorge Amado)",
        link: "https://amzn.to/4cGOk0W",
      },
      {
        title: "Cadernos do Cárcere (Gramsci)",
        link: "https://amzn.to/3MNNQvC",
      },
      {
        title: "Dialética do Esclarecimento (Adorno e Horkheimer)",
        link: "https://amzn.to/4aBVYan",
      },
      { title: "O Capital (Karl Marx)", link: "https://amzn.to/3OmVEoy" },
    ],
  },
  {
    name: "Leninismo",
    stats: { econ: 100, dipl: 40, govt: 20, scty: 70 },
    desc: "O Leninismo é o desenvolvimento prático e teórico do marxismo aplicado à era do imperialismo, formulado por Vladimir Lenin para a realidade da Revolução Russa. Sua principal inovação é o conceito de Partido de Vanguarda: uma organização centralizada de revolucionários profissionais que deve liderar, educar e organizar a classe trabalhadora, que sozinha só atingiria uma consciência sindicalista.\n\nLenin defendia o centralismo democrático (liberdade de discussão, unidade de ação) e a necessidade de quebrar o aparelho estatal burguês através de uma revolução violenta, substituindo-o pela ditadura do proletariado baseada na aliança operário-camponesa. Sua obra também analisa o imperialismo como a fase superior do capitalismo, onde a exportação de capitais e a dominação financeira levam a guerras globais, tornando a revolução uma necessidade urgente para a sobrevivência da humanidade.",
    roast:
      "Você acha que democracia é uma invenção burguesa e que a única liberdade real é obedecer ao Comitê Central. Se alguém discorda de você, é obviamente um agente da CIA ou um 'revisionista'.",
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
      {
        title: "O Estado e a Revolução (Lênin)",
        link: "https://amzn.to/4c2246o",
      },
      {
        title: "O que fazer?: questões candentes de nosso movimento (Lênin)",
        link: "https://amzn.to/46KdAzG",
      },
      {
        title: "Imperialismo, Fase Superior do Capitalismo (Lênin)",
        link: "https://amzn.to/4rihrwa",
      },
      { title: "Teses de Abril (Lênin)", link: "https://amzn.to/4kF3zJM" },
      {
        title: "Esquerdismo, doença infantil do comunismo (Lênin)",
        link: "https://amzn.to/4qNfiaB",
      },
    ],
  },
  {
    name: "Stalinismo",
    stats: { econ: 100, dipl: 10, govt: 0, scty: 15 },
    desc: "O Stalinismo descreve o sistema político e econômico implementado por Joseph Stalin na União Soviética, caracterizado por uma industrialização pesada acelerada, a coletivização forçada da agricultura e um regime de controle totalitário absoluto. Abandonando o internacionalismo imediato pelo 'Socialismo em um só país', o stalinismo transformou o partido único em um aparato burocrático onipresente sob o comando indiscutível de um líder supremo.\n\nHistoricamente, é associado ao Grande Expurgo, à rede de campos de trabalho forçado (Gulags) e a uma vigilância estatal extrema, onde qualquer dissidência era vista como sabotagem contra-revolucionária. Embora tenha transformado a URSS em uma superpotência militar e industrial, o custo humano foi imenso, resultando em milhões de mortes por fome e repressão, deixando um legado de centralização extrema e culto à personalidade que moldou o bloco soviético por décadas.",
    roast:
      "Você tem um pôster de um ditador bigodudo no quarto e acha que Gulags eram 'colônias de férias para reeducação'. Sua solução para qualquer problema econômico é fuzilar os sabotadores.",
    politicians: [
      {
        name: "Josef Stalin",
        link: "https://pt.wikipedia.org/wiki/Josef_Stalin",
        stats: { econ: 100, dipl: 10, govt: 0, scty: 15 },
      },
      {
        name: "Enver Hoxha",
        link: "https://pt.wikipedia.org/wiki/Enver_Hoxha",
        stats: { econ: 100, dipl: 5, govt: 5, scty: 20 },
      },
    ],
    books: [
      {
        title: "Fundamentos do Leninismo (Stalin)",
        link: "https://amzn.to/46V7g8w",
      },
      {
        title: "Problemas Econômicos do Socialismo na URSS (Stalin)",
        link: "https://amzn.to/4rN2q7y",
      },
      {
        title: "Arquipélago Gulag (Aleksandr Soljenítsin (análise crítica))",
        link: "https://amzn.to/4kXCGRM",
      },
    ],
  },
  {
    name: "Maoismo",
    stats: { econ: 100, dipl: 20, govt: 5, scty: 65 },
    desc: "O Maoismo é a adaptação do Marxismo-Leninismo para a realidade de países agrários e coloniais, desenvolvida por Mao Tsé-Tung durante a Revolução Chinesa. Sua principal tese é a transferência do eixo revolucionário do proletariado urbano para o campesinato, através da estratégia da 'Guerra Popular Prolongada' e do cerco das cidades pelo campo.\n\nMao enfatizava a necessidade de revoluções culturais permanentes para evitar o surgimento de uma nova burguesia dentro do partido, além de promover a 'Linha de Massa' (aprender com o povo para liderar o povo). Esta corrente foca na luta contra o revisionismo e o imperialismo, defendendo que a consciência revolucionária deve ser constantemente temperada pela prática e pelo trabalho manual, tendo influenciado diversos movimentos de libertação no Terceiro Mundo.",
    roast:
      "Você acha que '1984' era um manual de instruções e que queimar bibliotecas é 'educação popular'. Sua solução para a burocracia é criar uma nova burocracia para vigiá-la.",
    politicians: [
      {
        name: "Mao Tsé-Tung",
        link: "https://pt.wikipedia.org/wiki/Mao_Ts%C3%A9-Tung",
        stats: { econ: 100, dipl: 20, govt: 5, scty: 65 },
      },
      {
        name: "Pol Pot (Camboja)",
        link: "https://pt.wikipedia.org/wiki/Pol_Pot",
        stats: { econ: 95, dipl: 5, govt: 0, scty: 20 },
      },
    ],
    books: [
      {
        title: "O Livro Vermelho (Mao Tsé-Tung)",
        link: "https://amzn.to/4s3RcK5",
      },
      {
        title: "Sobre a Prática e a Contradição (Mao)",
        link: "https://amzn.to/46gKvfb",
      },
      {
        title: "Sobre a Guerra Prolongada (Mao)",
        link: "https://amzn.to/4rXE0Gf",
      },
    ],
  },
  {
    name: "Socialismo de Estado",
    stats: { econ: 80, dipl: 30, govt: 30, scty: 70 },
    desc: "O Socialismo de Estado é uma teoria econômica e política que defende o controle estatal direto sobre a produção e distribuição como o meio mais eficaz para alcançar a justiça social e o desenvolvimento nacional. Diferente de vertentes que focam na autogestão operária ou no mercado regulado, esta corrente enfatiza o papel técnico e administrativo do Estado como o planejador central da economia.\n\nHistoricamente, foi adotado por regimes de libertação nacional e desenvolvimentistas no Terceiro Mundo (como o Nasserismo no Egito e o Nehrismo na Índia), buscando superar o subdesenvolvimento através da industrialização dirigida e do controle de recursos estratégicos. Acredita que a burocracia estatal, quando racionalizada e comprometida com o povo, pode eliminar o desperdício capitalista e garantir que o progresso material chegue a todas as camadas da população, muitas vezes priorizando a soberania nacional em detrimento de liberdades individuais clássicas.",
    roast:
      "Você ama preencher formulários em triplicata e acha que a fila do cartório é o auge da civilização. Seu sonho é um mundo onde tudo é funcionário público e nada funciona sem um carimbo.",
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
      {
        title: "A terceira teoria universal: O Livro Verde (Muammar Gaddafi)",
        link: "https://amzn.to/4s1Dasn",
      },
      {
        title: "Estratégia do Desenvolvimento Econômico (Albert Hirschman)",
        link: "https://amzn.to/4rrjbDv",
      },
      {
        title: "A Economia Política do Desenvolvimento (Paul Baran)",
        link: "https://amzn.to/4qCWlHD",
      },
      {
        title: "A Economia Mundial e o Imperialismo (Nikolai Bukharin)",
        link: "https://amzn.to/4azS5Tj",
      },
    ],
  },
  {
    name: "Socialismo Religioso",
    stats: { econ: 80, dipl: 50, govt: 70, scty: 20 },
    desc: "O Socialismo Religioso é uma vertente que busca fundamentar os ideais de justiça social, igualdade e vida comunitária em preceitos de fé e escrituras sagradas. Diferente do socialismo secular, que muitas vezes rejeita a religião, esta corrente argumenta que a mensagem divina (seja cristã, islâmica ou judaica) exige ativamente a abolição da exploração, a proteção dos pobres e a gestão coletiva dos recursos naturais como uma forma de mordomia espiritual.\n\nNo Brasil, este pensamento manifestou-se fortemente na Teologia da Libertação, que propõe a 'Opção Preferencial pelos Pobres' e vê o pecado não apenas como um ato individual, mas como estruturas sociais opressivas que devem ser derrubadas. Para o socialista religioso, a luta política por dignidade material é uma extensão direta do culto a Deus, buscando construir o 'Reino' na terra através de comunidades eclesiais de base, movimentos agrários e a defesa intransigente dos direitos humanos como sagrados.",
    roast:
      "Você vai à missa com uma camiseta de Che Guevara e deixa o padre confuso. Acha que Jesus multiplicou os pães e os peixes como uma crítica à cadeia de suprimentos capitalista.",
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
      {
        title: "Teologia da Libertação (Gustavo Gutiérrez)",
        link: "https://amzn.to/3OPlVvN",
      },
      {
        title: "Jesus Cristo Libertador (Leonardo Boff)",
        link: "https://amzn.to/3OPlX6T",
      },
      {
        title: "Batismo de Sangue (Frei Betto)",
        link: "https://amzn.to/3Mlf0Kd",
      },
      {
        title: "Igreja: Carisma e Poder (Leonardo Boff)",
        link: "https://amzn.to/4cCc9Hj",
      },
    ],
  },
  {
    name: "Socialismo Democrático",
    stats: { econ: 80, dipl: 50, govt: 50, scty: 80 },
    desc: "O Socialismo Democrático é a ideologia que defende a criação de uma economia socialista através de métodos democráticos, constitucionais e parlamentares, rejeitando tanto o autoritarismo de partido único quanto a desigualdade intrínseca ao capitalismo. Seu objetivo é a democratização total da vida social, estendendo o ideal de voto e participação popular da política para os locais de trabalho, através da autogestão ou do controle público de setores estratégicos.\n\nDiferente da social-democracia clássica, o socialismo democrático não busca apenas reformar ou 'humanizar' o capitalismo, mas superá-lo gradualmente em direção a uma economia focada no bem comum e na propriedade coletiva. Valoriza profundamente as liberdades civis, o pluralismo e os direitos individuais, acreditando que a verdadeira liberdade só é possível quando todos possuem segurança econômica e participação real nas decisões que moldam seu futuro.",
    roast:
      "Você é radical demais para os liberais e moderado demais para os comunistas, então ninguém te convida para as festas. Acha que pode derrubar o sistema votando nele a cada 4 anos.",
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
      {
        title: "O Caminho para o Poder (Karl Kautsky)",
        link: "https://amzn.to/4kG2Vfa",
      },
      {
        title: "Por Que Não o Socialismo? (G.A. Cohen)",
        link: "https://amzn.to/3ZFM9mT",
      },
      {
        title: "Socialismo Evolucionário (Eduard Bernstein)",
        link: "https://amzn.to/4qIpLEg",
      },
    ],
  },
  {
    name: "Socialismo Revolucionário",
    stats: { econ: 80, dipl: 20, govt: 50, scty: 70 },
    desc: "O Socialismo Revolucionário descreve vertentes que acreditam que as estruturas de poder do capitalismo são tão entranhadas e auto-preservativas que uma mudança gradual ou eleitoral é impossível ou insuficiente para derrubá-las. Esta corrente defende a necessidade de uma ruptura abrupta e profunda com a ordem estabelecida, geralmente através de movimentos de massa, greves gerais insurrecionais ou luta armada, para desmantelar o Estado burguês e suas instituições.\n\nPara o revolucionário, a 'violência revolucionária' é vista como uma autodefesa histórica contra as opressões sistêmicas do capital. Embora compartilhe objetivos finais com outras correntes socialistas, sua característica definidora é a estratégia de confronto direto e a crença de que a nova sociedade deve ser construída sobre os escombros da antiga, sem tentar reformar o que é visto como irremediavelmente injusto.\n\nO Socialismo Revolucionário sustenta que o sistema capitalista é intrinsecamente incapaz de ser reformado para atender aos interesses da maioria e que qualquer tentativa de mudança puramente parlamentar será bloqueada ou sabotada pela classe dominante. Portanto, a única via para a emancipação real é a ruptura revolucionária — a tomada do poder político pelas massas organizadas e a destruição do aparelho estatal burguês. Esta corrente prioriza a luta direta, a greve general e, em casos de repressão, a resistência armada. Inspirada por figuras como Che Guevara e Thomas Sankara, enfatiza a necessidade de uma ética revolucionária, o internacionalismo militante e a construção de um novo homem e mulher, livres da alienação mercantil. Vê a revolução não como um golpe de Estado, mas como uma transformação radical da consciência e das relações de poder na sociedade.",
    roast:
      "Você usa boina em dias quentes e chama qualquer um que tenha um iPhone de 'pequeno-burguês'. Vive esperando o Grande Dia da Revolução enquanto reclama do preço do latão.",
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
      {
        title: "O socialismo humanista (Che Guevara)",
        link: "https://amzn.to/4apCLtH",
      },
      {
        title: "De moto pela América do Sul (Che Guevara)",
        link: "https://amzn.to/4aJG65X",
      },
      {
        title: "Os Condenados da Terra (Frantz Fanon)",
        link: "https://amzn.to/4tNT6jC",
      },
      {
        title:
          "A Situação da Classe Trabalhadora na Inglaterra (Friedrich Engels)",
        link: "https://amzn.to/4c1l4C3",
      },
    ],
  },
  {
    name: "Socialismo Libertário",
    stats: { econ: 80, dipl: 80, govt: 75, scty: 80 },
    desc: "O Socialismo Libertário é um guarda-chuva amplo que reúne correntes anticapitalistas comprometidas com a liberdade individual e a crítica radical a toda forma de hierarquia ilegítima — seja do Estado, do capital ou de estruturas culturais opressoras. Diferentemente do Anarco-Comunismo (que prioriza a abolição imediata do Estado) e do Comunismo Libertário (que parte de Bookchin e da ecologia social), o Socialismo Libertário enfatiza a crítica intelectual, o ativismo civil e a construção de alternativas prefigurativas dentro da sociedade existente. Inclui sindicalistas revolucionários, anarquistas individuais e socialistas anticentralistas.",
    roast:
      "Você passa 90% do tempo explicando que a URSS não era socialismo de verdade e os outros 10% brigando com outros esquerdistas sobre quem é mais revolucionário.",
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
    ],
    books: [
      {
        title: "Quem manda no mundo? (Noam Chomsky)",
        link: "https://amzn.to/46VAvYQ",
      },
      {
        title: "Dívida: Os Primeiros 5000 Anos (David Graeber)",
        link: "https://amzn.to/46ZZudB",
      },
      {
        title: "Textos anarquistas (Mikhail Bakunin)",
        link: "https://amzn.to/4aWrh0S",
      },
      {
        title: "Ecologia social e outros ensaios (Murray Bookchin)",
        link: "https://amzn.to/4qLV4hF",
      },
    ],
  },
  {
    name: "Populismo de Esquerda",
    stats: { econ: 60, dipl: 40, govt: 30, scty: 70 },
    desc: "O Populismo de Esquerda é uma estratégia política que busca mobilizar 'o povo' contra uma 'elite' ou oligarquia percebida como opressora e corrupta. Diferente das vertentes marxistas ortodoxas, baseia-se mais na identidade popular e na demanda por justiça social imediata do que exclusivamente na luta industrial de classes. Propõe um Estado forte e interventor que atue como o defensor dos interesses das maiorias despossuídas, muitas vezes através de programas de redistribuição de renda nacionalistas e carismáticos.\n\nTeorizado por pensadores como Ernesto Laclau e Chantal Mouffe, o populismo de esquerda vê a política como a construção de uma 'fronteira antagônica' entre os de baixo e os de cima, buscando radicalizar a democracia para incluir os setores historicamente marginalizados. Critica as instituições liberais como sendo meras ferramentas das elites, preferindo formas de participação direta e lideranças fortes que encarnem a vontade popular contra os interesses financeiros e internacionais.",
    roast:
      "Você acha que a inflação é uma conspiração das elites e que imprimir dinheiro é política social. Seu passatempo favorito é culpar o imperialismo ianque porque seu time perdeu.",
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
    ],
    books: [
      { title: "A Verdade Vencerá (Lula)", link: "https://amzn.to/4kSNxMP" },
      {
        title: "As Veias Abertas da América Latina (Galeano)",
        link: "https://amzn.to/3OXp8JK",
      },
      {
        title: "A Razão Populista (Ernesto Laclau)",
        link: "https://amzn.to/3MoHYZJ",
      },
      {
        title: "O Que é Populismo? (Jan-Werner Müller)",
        link: "https://amzn.to/4c3huau",
      },
    ],
  },
  {
    name: "Justicialismo",
    stats: { econ: 65, dipl: 30, govt: 25, scty: 55 },
    desc: "O Justicialismo (ou Peronismo) é o movimento nacionalista e social fundado por Juan Domingo Perón na Argentina, baseado em três pilares fundamentais: a soberania política, a independência econômica e a justiça social (a 'Terceira Posição'). Rejeita tanto o liberalismo capitalista quanto o socialismo marxista, propondo em seu lugar uma organização corporativista onde o Estado atua como um mediador harmonioso entre o capital e o trabalho, buscando o bem-estar da classe operária sem abolir a propriedade privada.\n\nÉ marcado por um forte componente emocional e simbólico, centralizado no culto às figuras de Perón e Evita, e pela mobilização massiva através de sindicatos. O justicialismo defende o desenvolvimento industrial nacional, a proteção aos trabalhadores e uma política externa nacionalista, mantendo-se como uma força política camaleônica que abrange vertentes que vão da extrema-esquerda à direita conservadora, sempre unidas pela mística peronista e pela defesa do interesse nacional argentino.",
    roast:
      "Sua política econômica consiste em tabelar preços, imprimir dinheiro e culpar os estrangeiros quando dá errado. Você não sabe se é de esquerda ou de direita, mas sabe que o líder tem sempre razão.",
    politicians: [
      {
        name: "Juan Domingo Perón",
        link: "https://pt.wikipedia.org/wiki/Juan_Per%C3%B3n",
        stats: { econ: 65, dipl: 30, govt: 25, scty: 55 },
      },
      {
        name: "Eva Perón (Evita)",
        link: "https://pt.wikipedia.org/wiki/Eva_Per%C3%B3n",
        stats: { econ: 75, dipl: 30, govt: 35, scty: 65 },
      },
      {
        name: "Cristina Kirchner",
        link: "https://pt.wikipedia.org/wiki/Cristina_Fern%C3%A1ndez_de_Kirchner",
        stats: { econ: 65, dipl: 30, govt: 25, scty: 55 },
      },
    ],
    books: [
      {
        title: "A Comunidade Organizada (Juan Perón)",
        link: "https://amzn.to/4l3ajRT",
      },
      {
        title: "A Razão da Minha Vida (Eva Perón)",
        link: "https://amzn.to/4aUslkH",
      },
    ],
  },
  {
    name: "Distributismo",
    stats: { econ: 60, dipl: 45, govt: 40, scty: 20 },
    desc: "O Distributismo é uma filosofia social e econômica baseada nos princípios do pensamento social cristão (especialmente de G.K. Chesterton e Hilaire Belloc). Defende que a melhor forma de garantir a liberdade é assegurar que a propriedade dos meios de produção seja distribuída o mais amplamente possível na sociedade, em vez de ficar concentrada nas mãos do Estado (socialismo) ou de poucos indivíduos e corporações (capitalismo).\n\nPara o distributista, a família é a unidade econômica básica, e a liberdade real só existe quando o homem possui sua própria terra ou ferramentas de trabalho. Promove o cooperativismo, o fortalecimento das comunidades locais e o princípio da subsidiariedade, acreditando que os problemas devem ser resolvidos no nível mais próximo possível do cidadão. É uma visão que valoriza a pequena propriedade, o artesanato e a dignidade do trabalho manual, vendo a concentração de poder econômico como uma ameaça direta à liberdade humana e espiritual.",
    roast:
      "Você quer viver no Condado dos Hobbits pagando dízimo. Acha que o problema do mundo é que não temos vacas suficientes e que o feudalismo foi injustiçado pela história, então sua solução para a internet é criar uma cooperativa católica de fibra ótica.",
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
    ],
    books: [
      {
        title: "Rerum Novarum (Papa Leão XIII)",
        link: "https://amzn.to/4s5hz1V",
      },
      {
        title: "Quadragesimo Anno (Papa Pio XI)",
        link: "https://amzn.to/46m4Ek0",
      },
      {
        title: "Centesimus Annus (Papa João Paulo II)",
        link: "https://amzn.to/4ryabwv",
      },
      {
        title: "O Estado Servil (Hilaire Belloc)",
        link: "https://amzn.to/4qTUs9I",
      },
      {
        title: "Um esboço da sanidade (Chesterton)",
        link: "https://amzn.to/4tQCLus",
      },
    ],
  },

  {
    name: "Democracia Cristã",
    stats: { econ: 60, dipl: 60, govt: 50, scty: 30 },
    desc: "A Democracia Cristã é uma ideologia política que busca aplicar princípios cristãos (especialmente católicos e protestantes neocalvinistas) à vida pública, operando dentro de um quadro democrático e pluralista. Sua atuação baseia-se na defesa da dignidade da pessoa humana, na justiça social e, crucialmente, no princípio da subsidiariedade — que sustenta que o Estado deve intervir apenas quando as famílias e comunidades locais não puderem resolver seus problemas.\n\nHistoricamente, foi fundamental na reconstrução da Europa após a Segunda Guerra Mundial, sendo uma das arquitetas da União Europeia. Propõe a 'Economia Social de Mercado', que combina a liberdade econômica e o livre mercado com um robusto sistema de bem-estar social para garantir que ninguém seja deixado para trás. Valoriza as instituições tradicionais, a ordem moral e o compromisso cristão com a paz, posicionando-se como uma força centrista que equilibra o conservadorismo social com a responsabilidade econômica e a solidariedade comunitária.",
    roast:
      "Você é o político padrão da Europa: entediante, burocrático e levemente religioso. Sua maior aventura é aumentar a taxa de juros em 0,25%.",
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
      {
        title: "Rerum Novarum (Papa Leão XIII)",
        link: "https://amzn.to/4s5hz1V",
      },
      {
        title: "Populorum Progressio (Papa Paulo VI)",
        link: "https://amzn.to/4aQOqkj",
      },
      {
        title: "Doutrina Social da Igreja (Compêndio)",
        link: "https://amzn.to/4tOK45T",
      },
    ],
  },
  {
    name: "Social Democracia",
    stats: { econ: 60, dipl: 70, govt: 60, scty: 80 },
    desc: "A Social Democracia é um regime político e econômico que busca conciliar o capitalismo de mercado com a justiça social e a redução das desigualdades através de um Estado de Bem-Estar Social (Welfare State) robusto. Diferente do socialismo democrático, a social-democracia não visa abolir a propriedade privada ou o mercado, mas sim 'civilizá-los' através de impostos progressivos, regulação estatal e serviços públicos universais de alta qualidade (saúde, educação, creches, lazer). Baseia-se no consenso entre capital e trabalho, onde os sindicatos têm um papel central na definição de políticas e os lucros das empresas financiam uma rede de segurança que protege o cidadão 'do berço ao túmulo'. É o modelo clássico dos países escandinavos, onde a alta eficiência econômica coexiste com as menores taxas de pobreza e desigualdade do mundo.",
    roast:
      "Você quer a revolução, desde que ela não atrase seu brunch. Acha que votar em partidos de esquerda moderada é um ato radical de rebeldia.",
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
      {
        title: "A Terceira Via (Anthony Giddens)",
        link: "https://amzn.to/4axxf8x",
      },
      {
        title: "Nem com Marx, nem contra Marx (Norberto Bobbio)",
        link: "https://amzn.to/4kVrzJ4",
      },
      {
        title: "Capital no Século XXI (Thomas Piketty)",
        link: "https://amzn.to/4kVq3Xq",
      },
    ],
  },
  {
    name: "Progressismo",
    stats: { econ: 60, dipl: 80, govt: 60, scty: 100 },
    desc: "O Progressismo é uma filosofia política que defende que o progresso social, científico e econômico é essencial para a melhoria da condição humana. Historicamente ligado ao Iluminismo, acredita que a sociedade pode e deve ser ativamente reformada através de políticas públicas baseadas na ciência, na razão e na justiça social.\n\nO progressista moderno foca na defesa dos direitos civis, na proteção ambiental, na regulação dos mercados para evitar abusos corporativos e na criação de uma rede de segurança social robusta. Diferente das vertentes revolucionárias, busca mudanças dentro do quadro democrático, enfatizando a inclusão de grupos marginalizados e a superação de preconceitos estruturais como o racismo, o sexismo e a homofobia. Vê o Estado não como um fim em si mesmo, mas como o motor necessário para corrigir desigualdades e garantir que o avanço tecnológico beneficie toda a população.",
    roast:
      "Você cancela pessoas no Twitter por esporte e acha que usar a hashtag certa vai salvar o mundo. Sua principal angústia existencial é decidir qual leite vegetal polui menos.",
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
      {
        title: "A Promessa da Vida Americana (Herbert Croly)",
        link: "https://amzn.to/4qPLrhO",
      },
      {
        title: "Democracia e Educação (John Dewey)",
        link: "https://amzn.to/4cHICMo",
      },
      {
        title: "Pequeno Manual Antirracista (Djamila Ribeiro)",
        link: "https://amzn.to/4tQyiI4",
      },
      {
        title: "O Capital no Século XXI (Thomas Piketty)",
        link: "https://amzn.to/4kVq3Xq",
      },
    ],
  },
  {
    name: "Anarco-Mutualismo",
    stats: { econ: 60, dipl: 50, govt: 100, scty: 70 },
    desc: "O Anarco-Mutualismo é uma teoria anarquista baseada no pensamento de Pierre-Joseph Proudhon, que propõe uma sociedade organizada em torno da troca recíproca e do livre contrato, sem a necessidade de um Estado ou de hierarquias corporativas. Diferente do anarco-comunismo, o mutualismo aceita o mercado e a propriedade pessoal, mas defende que a posse de capital e terra só é legítima através do 'uso e ocupação'.\n\nSeu objetivo central é a criação de um 'Banco do Povo' ou cooperativas de crédito que forneçam empréstimos a juro zero, eliminando o lucro parasitário e garantindo que o trabalhador receba o valor integral do seu produto. É um sistema que busca a liberdade individual absoluta combinada com a solidariedade econômica mútua, onde a competição serve para reduzir preços e a cooperação serve para garantir segurança social.",
    roast:
      "Você gosta de mercado livre mas odeia patrões, então criou uma hipótese econômica elegante do século XIX para provar que juros desapareceriam magicamente. Acha que 'banco do povo' não vai virar um agiota glorificado.",
    politicians: [
      {
        name: "Pierre-Joseph Proudhon (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Pierre-Joseph_Proudhon",
        stats: { econ: 60, dipl: 50, govt: 100, scty: 70 },
      },
      {
        name: "Benjamin Tucker (EUA)",
        link: "https://pt.wikipedia.org/wiki/Benjamin_Tucker",
        stats: { econ: 50, dipl: 50, govt: 100, scty: 65 },
      },
      {
        name: "Josiah Warren (EUA)",
        link: "https://pt.wikipedia.org/wiki/Josiah_Warren",
        stats: { econ: 60, dipl: 50, govt: 100, scty: 70 },
      },
    ],
    books: [
      {
        title: "O Que é a Propriedade? (Pierre-Joseph Proudhon)",
        link: "https://amzn.to/4s52qxA",
      },
      {
        title: "A propriedade é um roubo (Pierre-Joseph Proudhon)",
        link: "https://amzn.to/4aPdlos",
      },
    ],
  },
  {
    name: "Comunismo Totalitário",
    stats: { econ: 100, dipl: 0, govt: 0, scty: 5 },
    desc: "O Comunismo Totalitário refere-se a regimes de matriz marxista-leninista que exercem um controle absoluto e incondicional sobre todos os aspectos da vida pública e privada. Caracteriza-se pela fusão total entre o partido único, o Estado e a ideologia oficial, sob o comando de um líder supremo cujo culto à personalidade beira o religioso.\n\nExemplos extremos incluem o Camboja sob o Khmer Vermelho (Ano Zero) e a Coreia do Norte (ideologia Juche). Nestes sistemas, a dissidência é punida com a morte ou campos de concentração, a economia é totalmente planificada e militarizada, e a vigilância mútua é institucionalizada. O objetivo é a aniquilação completa da 'velha sociedade' e a criação forçada de um novo tipo de cidadão totalmente subordinado à vontade coletiva encarnada pelo líder.",
    roast:
      "Você acha que '1984' era um manual de instruções, não um aviso. Sua ideia de fim de semana divertido é marchar em linha reta, denunciar seus vizinhos e agradecer ao Grande Líder pela colheita.",
    politicians: [
      {
        name: "Kim Il-sung (Juche - Coreia do Norte)",
        link: "https://pt.wikipedia.org/wiki/Kim_Il-sung",
        stats: { econ: 100, dipl: 0, govt: 0, scty: 5 },
      },
      {
        name: "Pol Pot (Camboja)",
        link: "https://pt.wikipedia.org/wiki/Pol_Pot",
        stats: { econ: 95, dipl: 5, govt: 0, scty: 20 },
      },
    ],
    books: [
      {
        title: "As Origens do Totalitarismo (Hannah Arendt)",
        link: "https://amzn.to/476uYia",
      },
      { title: "1984 (George Orwell)", link: "https://amzn.to/3MMmgPp" },
      {
        title: "Arquipélago Gulag (Aleksandr Soljenítsin)",
        link: "https://amzn.to/4kXCGRM",
      },
      {
        title: "O Livro Negro do Comunismo (S. Courtois)",
        link: "https://amzn.to/4rCuaKr",
      },
    ],
  },

  {
    name: "Tecnocracia",
    stats: { econ: 60, dipl: 60, govt: 20, scty: 70 },
    desc: "A Tecnocracia é um modelo de governança onde o poder de decisão reside em especialistas técnicos (cientistas, engenheiros, economistas) em vez de políticos eleitos ou representantes baseados em ideologia partidária. O princípio fundamental é a 'administração das coisas' de forma eficiente, lógica e fundamentada em dados empíricos, buscando resolver problemas sociais como se fossem desafios de engenharia.\n\nOs tecnocratas argumentam que o partidarismo político é ineficiente e emocional, e que a sociedade prosperaria mais se a política fosse substituída pela gestão racional de recursos. Embora prometa eficácia administrativa, a tecnocracia é frequentemente criticada pelo seu déficit democrático e por tratar cidadãos como meros números em uma planilha de otimização.",
    roast:
      "Você acha que política é uma equação de matemática e que as pessoas são apenas variáveis ineficientes. Se pudesse, substituiria o Congresso por uma planilha de Excel.",
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
      {
        title: "The Technocrats: Prophets of Automation (Elsner)",
        link: "https://amzn.to/4aMXOW9",
      },
      {
        title: "Economia e Sociedade (Max Weber)",
        link: "https://amzn.to/3MrVgER",
      },
      { title: "Tecnopólio (Neil Postman)", link: "https://amzn.to/4tXerao" },
      {
        title: "The Technological Society (Jacques Ellul)",
        link: "https://amzn.to/3MoVfl2",
      },
    ],
  },
  {
    name: "Centrista",
    stats: { econ: 50, dipl: 50, govt: 50, scty: 50 },
    desc: "O Centrismo é uma posição política que busca o equilíbrio através do pragmatismo, da moderação e da conciliação entre visões opostas. Rejeitando as soluções radicais da esquerda e da direita, os centristas defendem que a política mais eficaz é aquela que utiliza evidências e resultados imediatos, misturando livre mercado com responsabilidade social de forma incremental.\n\nNão se trata de uma falta de convicção, mas de uma preferência pela estabilidade institucional e pelo consenso democrático. Governos centristas focam na gestão eficiente da máquina pública e na manutenção de uma 'Terceira Via' que evite polarizações profundas, buscando integrar o melhor dos dois mundos para garantir a paz social e o crescimento econômico estável.",
    roast:
      "Sua opinião mais forte é que não se deve ter opiniões fortes. Você é o equivalente político de pão com água e acha que a virtude está sempre no meio, mesmo que o meio seja uma catástrofe.",
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
      {
        title: "A Terceira Via (Anthony Giddens)",
        link: "https://amzn.to/40EcpOM",
      },
      {
        title: "The Radical Center (Ted Halstead e Michael Lind)",
        link: "https://amzn.to/4lbsaq8",
      },
      {
        title:
          "Por Que as Nações Fracassam (Daron Acemoglu e James A. Robinson)",
        link: "https://amzn.to/4aXSm2u",
      },
    ],
  },
  {
    name: "Liberalismo de Esquerda",
    stats: { econ: 50, dipl: 60, govt: 60, scty: 60 },
    desc: "O Liberalismo de Esquerda (ou Liberalismo Social) é uma vertente que concilia as liberdades individuais e civis do liberalismo clássico com a necessidade de intervenção estatal para garantir justiça social e igualdade de oportunidades. Acredita que a liberdade real é impossível para quem vive na miséria ou sem acesso a serviços fundamentais.\n\nPortanto, defende um mercado regulado, impostos progressivos para financiar o bem-estar social e uma proteção ativa dos direitos das minorias. É a base do pensamento de filósofos como John Rawls, que argumentam que o sucesso individual deve ser equilibrado com a cooperação social. No cenário global, é a ideologia que sustenta a defesa das instituições democráticas, do multilateralismo e das liberdades individuais contra tanto o socialismo autoritário quanto o conservadorismo nacionalista.",
    roast:
      "Você é tão mente aberta que seu cérebro caiu. Apoia todas as causas atuais até que elas afetem levemente o valor do seu imóvel.",
    politicians: [
      {
        name: "Geraldo Alckmin",
        link: "https://pt.wikipedia.org/wiki/Geraldo_Alckmin",
        stats: { econ: 50, dipl: 50, govt: 50, scty: 60 },
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
      {
        title: "Uma Teoria da Justiça (John Rawls)",
        link: "https://amzn.to/4ruzSOa",
      },
      {
        title: "Desenvolvimento como Liberdade (Amartya Sen)",
        link: "https://amzn.to/4avdrCF",
      },
      {
        title: "Justiça como Equidade (John Rawls)",
        link: "https://amzn.to/4l9kKDT",
      },
      {
        title: "A dádiva do amor (Martin Luther King Jr.)",
        link: "https://amzn.to/4tRaELs",
      },
      {
        title: "Liberalismo e seus descontentes (Francis Fukuyama)",
        link: "https://amzn.to/4l2CnFb",
      },
      {
        title: "A Audácia da Esperança (Barack Obama)",
        link: "https://amzn.to/4cmfM4c",
      },
    ],
  },
  {
    name: "Anarquismo Religioso",
    stats: { econ: 50, dipl: 50, govt: 100, scty: 20 },
    desc: "O Anarquismo Religioso (especialmente o Cristão) é a crença de que a única autoridade legítima sobre o ser humano é divina, e que, portanto, todas as formas de governo terreno, leis humanas e instituições estatais são usurpações ilegais de poder. Inspirados pelos ensinamentos de Jesus no Sermão da Montanha e popularizados por León Tolstói, os anarquistas religiosos defendem o pacifismo absoluto e a 'resistência passiva' contra o Estado.\n\nAcreditam que a verdadeira ordem social surge naturalmente quando os indivíduos vivem em conformidade com o amor ao próximo e a ajuda mútua, sem tribunais, prisões ou exércitos. Rejeitam a violência revolucionária, acreditando que a mudança deve vir de uma transformação íntima e espiritual que torne o governo exterior irrelevante.",
    roast:
      "Você é pacifista demais para o mundo real e religioso demais para os anarquistas. Acha que pode derrotar um tanque de guerra rezando e oferecendo a outra face.",
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
      {
        title: "O Reino de Deus Está em Vós (León Tolstói)",
        link: "https://amzn.to/4r2E7PW",
      },
      {
        title: "A longa solidão (Dorothy Day)",
        link: "https://amzn.to/4r8bgKr",
      },
    ],
  },
  {
    name: "Populismo de Direita",
    stats: { econ: 40, dipl: 30, govt: 30, scty: 30 },
    desc: "O Populismo de Direita é uma ideologia que combina o nacionalismo conservador com a retórica do 'povo comum' contra uma 'elite cosmopolita e globalista'. Caracteriza-se pela defesa da soberania nacional rigorosa, controle de fronteiras (anti-imigração), proteção de valores culturais tradicionais e uma postura de 'lei e ordem'.\n\nDiferente do conservadorismo tradicional, o populismo de direita utiliza uma comunicação direta e frequentemente agressiva, confrontando as instituições estabelecidas (mídia, academia, tribunais) como sendo parciais ou inimigas da nação. Economicamente, mescla a defesa da livre iniciativa com tendências protecionistas, buscando restaurar a prosperidade através de um patriotismo econômico que prioriza os cidadãos nacionais sobre acordos internacionais.",
    roast:
      "Você compartilha fake news no grupo da família e acha que a terra é plana porque 'a mídia mente'. Para você, qualquer um à esquerda de Gengis Khan é comunista.",
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
      {
        title:
          "O Mínimo que Você Precisa Saber para Não Ser um Idiota (Olavo de Carvalho)",
        link: "https://amzn.to/4aIC6nh",
      },
      {
        title: "O Cristão e a Política (Nikolas Ferreira)",
        link: "https://amzn.to/4aKaC0K",
      },
      {
        title:
          "América debilitada: como tornar a América grande novamente (Donald Trump)",
        link: "https://amzn.to/4l4sabo",
      },
    ],
  },

  {
    name: "Reacionário",
    stats: { econ: 40, dipl: 40, govt: 40, scty: 10 },
    desc: "O Reacionarismo é uma postura política que deseja não apenas conservar o presente, mas retornar a uma ordem social do passado que foi perdida ou destruída pelas transformações da modernidade (como o Iluminismo, o Liberalismo ou o Socialismo). O reacionário vê as mudanças sociais dos últimos séculos como uma história de decadência e desordem, e prega a restauração de hierarquias tradicionais, da autoridade religiosa e de estruturas monárquicas ou aristocráticas de poder.\n\nDiferente do conservador, que aceita mudanças lentas e orgânicas, o reacionário busca ativamente reverter a história, acreditando que a base da civilização reside na estabilidade de valores imutáveis, na tradição sagrada e na obediência a uma autoridade transcendental.",
    roast:
      "Você quer voltar para 1600, mas provavelmente morreria de disenteria na primeira semana. Acha que a civilização acabou quando permitiram que as pessoas votassem.",
    politicians: [
      {
        name: "Joseph de Maistre (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Joseph_de_Maistre",
        stats: { econ: 40, dipl: 40, govt: 40, scty: 10 },
      },
      {
        name: "Nicolás Gómez Dávila (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Nicol%C3%A1s_G%C3%B3mez_D%C3%A1vila",
        stats: { econ: 45, dipl: 40, govt: 40, scty: 5 },
      },
      {
        name: "Julius Evola (Filósofo/Tradicionalista)",
        link: "https://pt.wikipedia.org/wiki/Julius_Evola",
        stats: { econ: 35, dipl: 30, govt: 20, scty: 5 },
      },
      {
        name: "René Guénon (Escola Tradicionalista)",
        link: "https://pt.wikipedia.org/wiki/Ren%C3%A9_Gu%C3%A9non",
        stats: { econ: 40, dipl: 40, govt: 30, scty: 5 },
      },
    ],
    books: [
      {
        title: "Considerações sobre a França (Joseph de Maistre)",
        link: "https://amzn.to/3Nc0h4z",
      },
      {
        title: "Escolios a um Texto Implícito (Nicolás Gómez Dávila)",
        link: "https://amzn.to/4u3sJ9i",
      },
      {
        title: "Revolta Contra o Mundo Moderno (Julius Evola)",
        link: "https://amzn.to/4u1P9I3",
      },
      {
        title: "A Crise do Mundo Moderno (René Guénon)",
        link: "https://amzn.to/46vHjfU",
      },
    ],
  },
  {
    name: "Libertarianismo",
    stats: { econ: 40, dipl: 60, govt: 80, scty: 60 },
    desc: "O Libertarianismo é uma filosofia política que coloca a liberdade individual e a soberania do indivíduo (auto-propriedade) como os valores morais e práticos supremos. Defende que a única função legítima de um governo (se é que ele deve existir) é o 'Estado Mínimo' — limitado exclusivamente à proteção dos cidadãos contra a agressão, o roubo e a fraude.\n\nOs libertários advogam pelo livre mercado absoluto (capitalismo de laissez-faire), pela propriedade privada irrestrita e pela abolição de quase todas as formas de regulação estatal, imposto e intervenção social. Acreditam que a cooperação voluntária e o sistema de preços são mais eficazes e éticos para organizar a sociedade do que o planejamento centralizado ou a coerção estatal, promovendo frequentemente uma política externa estritamente não-intervencionista.",
    roast:
      "Para você, leis de trânsito são tirania e impostos são literalmente estupro. Você provavelmente explicou o padrão ouro para uma mulher numa festa e ela fingiu desmaiar para fugir.",
    politicians: [
      {
        name: "Ron Paul (EUA)",
        link: "https://pt.wikipedia.org/wiki/Ron_Paul",
        stats: { econ: 35, dipl: 65, govt: 85, scty: 65 },
      },
      {
        name: "Ayn Rand (Filósofa do Objetivismo)",
        link: "https://pt.wikipedia.org/wiki/Ayn_Rand",
        stats: { econ: 5, dipl: 55, govt: 95, scty: 35 },
      },
      {
        name: "Javier Milei (Argentina)",
        link: "https://pt.wikipedia.org/wiki/Javier_Milei",
        stats: { econ: 5, dipl: 20, govt: 20, scty: 50 },
      },
    ],
    books: [
      {
        title: "A Revolta de Atlas (Ayn Rand)",
        link: "https://amzn.to/4l1ATeh",
      },
      {
        title: "Anarquia, Estado e Utopia (Robert Nozick)",
        link: "https://amzn.to/4l8BYBg",
      },
      {
        title: "O manifesto libertário (Murray Rothbard)",
        link: "https://amzn.to/4lmf35D",
      },
      {
        title: "Economia Numa Única Lição (Henry Hazlitt)",
        link: "https://amzn.to/3OKFSE8",
      },
    ],
  },
  {
    name: "Nazismo",
    stats: { econ: 70, dipl: 0, govt: 0, scty: 5 },
    desc: "O Nazismo (Nacional-Socialismo) foi a ideologia totalitária do regime de Adolf Hitler na Alemanha. Baseava-se em um ultranacionalismo racial extremo, a crença na superioridade da 'raça ariana', um antissemitismo virulento que culminou no Holocausto, e um forte expansionismo militar (Lebensraum).\n\nRejeitava a democracia, o liberalismo e o comunismo, promovendo o culto ao líder (Führerprinzip), a eugenia e um estado de partido único com controle absoluto sobre a sociedade. A economia era corporativista, subserviente aos objetivos de guerra do Estado.",
    roast:
      "Seu lugar não é na política, é numa cela ou num hospício. Você consegue estar errado em todas as dimensões morais possíveis simultaneamente.",
    politicians: [
      {
        name: "Adolf Hitler (Alemanha)",
        link: "https://pt.wikipedia.org/wiki/Adolf_Hitler",
        stats: { econ: 70, dipl: 0, govt: 0, scty: 5 },
      },
      {
        name: "Joseph Goebbels (Alemanha)",
        link: "https://pt.wikipedia.org/wiki/Joseph_Goebbels",
        stats: { econ: 70, dipl: 0, govt: 0, scty: 5 },
      },
    ],
    books: [
      {
        title: "Minha Luta (Adolf Hitler)",
        link: "https://archive.org/details/meinkampf_minha_luta",
      },
      {
        title: "Os diários de Alfred Rosenberg",
        link: "https://amzn.to/4az5kDS",
      },
      {
        title: "Hitler (Joachim Fest)",
        link: "https://www.amazon.com.br/Box-Hitler-Joachim-Fest-ebook/dp/B072863DP1?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.oE9QqywuLP_ENk0c5YZDiH1WNFQlkg_7x7XWfbMM_vBd92UJxkdG77XtEbr1yxQmWhyolm6OUgeCIHetPFjLtRlPg2C_9RVP1tLNwEHxQJyEm9L9z73maWJggooEbC40c9AbXu23u2Q-W-URA5rnOE3z7LyVd4I6unxkkz9uXrrAePkK9ZtbqemYQzvO7Fs7SK30M15jWZzbT2nPy4ZrjI0VeWPiTcn5IvCXgpdCZ1MK8_vY6PrJU6isjhWipHO0M60f2jxppLE-K7AKOsax2Qw0q20uKD6SHXnvs8l528k.DY_mxTCdvFduqY9v0Ug8zJyR_BNieixEniRspB9Cf4A&qid=1771446526&sr=8-7",
      },
      {
        title: "Ascensão e Queda do Terceiro Reich (Walter Shirer)",
        link: "https://amzn.to/46gNvIq",
      },
    ],
  },
  {
    name: "Autocracia",
    stats: { econ: 50, dipl: 20, govt: 20, scty: 50 },
    desc: "A Autocracia é um sistema de governo onde todo o poder político e autoridade suprema estão concentrados de forma incontestável nas mãos de uma única pessoa, cujas decisões não são limitadas por leis externas ou mecanismos de controle popular.\n\nDiferente da democracia, onde o poder é delegado temporariamente, na autocracia a legitimidade muitas vezes deriva da tradição, do comando militar ou de uma suposta superioridade natural do líder. Historicamente manifestou-se no absolutismo monárquico e em ditaduras personalistas contemporâneas. O autocrata exerce controle total sobre o aparelho estatal, a justiça e muitas vezes a economia, suprimindo qualquer dissidência para manter a estabilidade do regime sob sua vontade absoluta.",
    roast:
      "Você só quer um rei para chamar de seu. Tem fetiche por coroas e tronos e acha que 'direitos humanos' atrapalham a estética do palácio.",
    politicians: [
      {
        name: "Rei Luís XIV (França - Absolutismo)",
        link: "https://pt.wikipedia.org/wiki/Lu%C3%ADs_XIV_de_Fran%C3%A7a",
        stats: { econ: 55, dipl: 25, govt: 25, scty: 55 },
      },
      {
        name: "Mohammed bin Salman (Arábia Saudita)",
        link: "https://pt.wikipedia.org/wiki/Mohammad_bin_Salman",
        stats: { econ: 40, dipl: 40, govt: 10, scty: 20 },
      },
      {
        name: "Saddam Hussein (Iraque)",
        link: "https://pt.wikipedia.org/wiki/Saddam_Hussein",
        stats: { econ: 55, dipl: 15, govt: 5, scty: 40 },
      },
      {
        name: "Alexandre, o Grande (Macedônia)",
        link: "https://pt.wikipedia.org/wiki/Alexandre,_o_Grande",
        stats: { econ: 50, dipl: 30, govt: 15, scty: 50 },
      },
    ],
    books: [
      { title: "O Príncipe (Maquiavel)", link: "https://amzn.to/4sjcIun" },
      { title: "O Leviatã (Thomas Hobbes)", link: "https://amzn.to/4siE0Rl" },
    ],
  },
  {
    name: "Nacional-Autoritarismo",
    stats: { econ: 60, dipl: 30, govt: 20, scty: 30 },
    desc: "O Nacional-Autoritarismo (frequentemente associado ao Corporativismo de Estado) descreve regimes que utilizam a autoridade centralizada e o nacionalismo romântico para despolitizar a sociedade e manter a ordem social. Diferente do fascismo puramente revolucionário, esta vertente é muitas vezes conservadora ou reacionária em sua essência, buscando proteger tradições, instituições religiosas e hierarquias estabelecidas contra o liberalismo e o socialismo.\n\nRegimes como o de Salazar em Portugal (Estado Novo) e Franco na Espanha exemplificam este modelo, onde o Estado age como um mediador absoluto entre o capital e o trabalho através de corporações oficiais, restringindo liberdades políticas e civis em nome da 'unidade nacional' e da estabilidade interna do país.",
    roast:
      "Você não quer dominar o mundo, só quer que todo mundo fique quieto em casa, produza e não reclame. Acha que a democracia é muito barulhenta e prefere um general ou um ditador paternalista cuidando de 'tudo'.",
    politicians: [
      {
        name: "Getúlio Vargas (Estado Novo - BR)",
        link: "https://pt.wikipedia.org/wiki/Get%C3%BAlio_Vargas",
        stats: { econ: 80, dipl: 30, govt: 30, scty: 70 },
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
      {
        title: "O Estado Nacional (Francisco Campos)",
        link: "https://amzn.to/4sagFkM",
      },
      {
        title: "Como se levanta um Estado (António de Oliveira Salazar)",
        link: "https://amzn.to/4cirooR",
      },
      {
        title: "O Conceito do Político (Carl Schmitt)",
        link: "https://amzn.to/4s34kQ5",
      },
      {
        title: "Instituições Políticas Brasileiras (Oliveira Vianna)",
        link: "https://amzn.to/4qXHyaF",
      },
    ],
  },
  {
    name: "Fascismo",
    stats: { econ: 40, dipl: 20, govt: 20, scty: 20 },
    desc: "O Fascismo é uma ideologia política de extrema-direita, totalitária e ultranacionalista, originária da Itália. Exalta a nação (e frequentemente a raça) como uma comunidade orgânica que transcende o indivíduo, exigindo mobilização permanente das massas e fanatismo revolucionário.\n\nPromove o militarismo, a violência purificadora e o culto absoluto ao líder. Diferente do nacional-autoritarismo conservador de Franco ou Salazar, o Fascismo busca construir o 'Novo Homem' através da fusão total entre Estado, corporações e sociedade.",
    roast:
      "Você precisa de um abraço ou de terapia, mas escolheu marchar com tochas. Sua masculinidade é tão frágil que precisa de um ditador carismático para protegê-la. Ah, e pare de tentar justificar uniformes militares.",
    politicians: [
      {
        name: "Benito Mussolini (Itália)",
        link: "https://pt.wikipedia.org/wiki/Benito_Mussolini",
        stats: { econ: 40, dipl: 20, govt: 20, scty: 20 },
      },
      {
        name: "Oswald Mosley (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/Oswald_Mosley",
        stats: { econ: 45, dipl: 25, govt: 20, scty: 25 },
      },
    ],
    books: [
      {
        title: "A Doutrina do Fascismo (Benito Mussolini)",
        link: "https://www.amazon.com.br/Doutrina-do-Fascismo-Benito-Mussolini-ebook/dp/B0844JN2RJ?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=19I4VP2ELNN9S&dib=eyJ2IjoiMSJ9.ANYkeAfT97oQwZmATq08jmf4q_A2H6azu3je294v-kI609rBUjXxg7HJug3GTzjeJrqNueSeMkmDdBoHRhyVdwZU7UTz56oEOi152fqO9FFPIYKWPjv01TJrDm8PpCN0ONT9a4DPL2Y28IWXGGAZKBZ4hfOd4q5qjOBg1AbWdZ43tAM9T-b1PN01rpjydZXPE7FATMzURA05tvz3aSCHT8ZtuvdHA9tujzVYMo67jybyNtHJjajXQ8mgv1mrksfeH54q5G6TxfR-3JCzrbxTY1DNnQdjJSL9OldX-0GXvG0.jML8R9zYJ5MHdyKUoEkpoRHlTEXgcrC1owcrQ34jQ-Y&dib_tag=se&keywords=A+Doutrina+do+Fascismo+-+Benito+Mussolini&qid=1772392320&sprefix=a+doutrina+do+fascismo+-+benito+mussolini%2Caps%2C252&sr=8-1",
      },

      {
        title: "As Origens do Totalitarismo (Hannah Arendt)",
        link: "https://amzn.to/4r8nD8Z",
      },
      {
        title: "O que é Fascismo e Outros Ensaios (George Orwell)",
        link: "https://amzn.to/46A2Vrl",
      },
    ],
  },
  {
    name: "Conservadorismo",
    stats: { econ: 30, dipl: 40, govt: 40, scty: 20 },
    desc: "O Conservadorismo Clássico é uma filosofia política baseada na preservação das instituições sociais, tradições e costumes que foram desenvolvidos organicamente ao longo de séculos. Enraizado no pensamento de Edmund Burke, ele desconfia profundamente de modelos abstratos de progresso ou de revoluções bruscas, preferindo a mudança gradual e temperada pela experiência acumulada.\n\nPara o conservador, a sociedade é um contrato entre os mortos, os vivos e os que ainda vão nascer, onde a autoridade legítima, a religião e a ordem moral são fundamentais para conter os impulsos humanos e garantir a liberdade real. Valoriza as 'pequenas patotas' (famílias, comunidades locais e associações voluntárias) como os verdadeiros pilares de uma civilização estável e florescente.",
    roast:
      "O mundo moderno te assusta, então você se apega a tradições que nem seus avós seguiam. Acha que 'bons costumes' é sinônimo de proibir o que você não gosta e chama tudo de 'engenharia social'.",
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
        stats: { econ: 35, dipl: 40, govt: 45, scty: 20 },
      },
      {
        name: "Winston Churchill",
        link: "https://pt.wikipedia.org/wiki/Winston_Churchill",
        stats: { econ: 50, dipl: 60, govt: 50, scty: 35 },
      },
      {
        name: "G. K. Chesterton",
        link: "https://pt.wikipedia.org/wiki/G._K._Chesterton",
        stats: { econ: 45, dipl: 45, govt: 40, scty: 20 },
      },
      {
        name: "João Pereira Coutinho (PT)",
        link: "https://pt.wikipedia.org/wiki/Jo%C3%A3o_Pereira_Coutinho",
        stats: { econ: 35, dipl: 50, govt: 45, scty: 30 },
      },
    ],
    books: [
      {
        title: "Reflexões sobre a Revolução na França (Edmund Burke)",
        link: "https://amzn.to/4aXNudX",
      },
      {
        title: "Como Ser um Conservador (Roger Scruton)",
        link: "https://amzn.to/407wrRF",
      },
      {
        title: "O que é Conservadorismo (Roger Scruton)",
        link: "https://amzn.to/4rKGFDO",
      },
      {
        title: "A Política da Prudência (Russell Kirk)",
        link: "https://amzn.to/47gg88U",
      },
      {
        title: "As Ideias Conservadoras (João Pereira Coutinho)",
        link: "https://amzn.to/4siEh72",
      },
      {
        title: "O Conservadorismo (Michael Oakeshott)",
        link: "https://amzn.to/4cmA25Q",
      },
    ],
  },
  {
    name: "Liberalismo Clássico",
    stats: { econ: 30, dipl: 60, govt: 60, scty: 80 },
    desc: "O Liberalismo Clássico é a filosofia política e econômica que fundamentou a modernidade ocidental, enfatizando a liberdade individual como o direito natural supremo. Baseado nos ideais do Iluminismo, defende que os seres humanos possuem direitos à vida, liberdade e propriedade que o Estado deve proteger, mas nunca violar.\n\nPropõe um governo limitado e constitucional, o império da lei e o livre mercado (laissez-faire) como os melhores meios para organizar a sociedade e gerar prosperidade. Para o liberal clássico, o progresso nasce da inovação individual e da livre troca sob um quadro institucional estável, vendo a livre concorrência não apenas como um motor econômico, mas como um bastião contra a tirania política e o privilégio corporativista.",
    roast:
      "Você acredita que o mercado livre resolve tudo e que o governo é o problema, mas vive em uma cidade com calçadas públicas. Cita Adam Smith em festas e acha que o século XIX foi o auge da civilização.",
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
      {
        title: "O Abolicionismo (Joaquim Nabuco)",
        link: "https://amzn.to/4aJyUrz",
      },
      {
        title: "A Riqueza das Nações (Adam Smith)",
        link: "https://amzn.to/4saU4Vs",
      },
      {
        title: "A questão social e política do Brasil (Rui Barbosa)",
        link: "https://amzn.to/4l5l9qD",
      },
      {
        title: "Sobre a Liberdade (John Stuart Mill)",
        link: "https://amzn.to/4bmzzhV",
      },
      {
        title: "Os Anjos Bons da Nossa Natureza (Steven Pinker)",
        link: "https://amzn.to/46vflkj",
      },
    ],
  },
  {
    name: "Capitalismo Autoritário",
    stats: { econ: 20, dipl: 30, govt: 20, scty: 40 },
    desc: "O Capitalismo Autoritário (frequentemente associado às ditaduras desenvolvimentistas) é um modelo que combina uma economia de mercado altamente competitiva e industrializada com um regime político não democrático. A premissa central é que o crescimento econômico acelerado e a estabilidade social exigem um comando político firme e inabalável que 'proteja' os mercados do suposto caos das democracias eleitorais.\n\nEste modelo foi adotado por regimes de direita na América Latina e no Sudeste Asiático, utilizando o Estado para facilitar o investimento estrangeiro e reprimir movimentos trabalhistas, acreditando que o desenvolvimento material deve preceder as liberdades políticas formais. É a fusão da eficiência capitalista globalizada com um aparelho estatal repressivo e centralizado.",
    roast:
      "Para você, crescimento de 5% de PIB justifica jogar a oposição de um helicóptero ou censurar a internet. Você adora um bom ditador, desde que ele vista terno, corte impostos, estude em Chicago ou em Singapura e tire os seus direitos trabalhistas do caminho.",
    politicians: [
      {
        name: "Lee Kuan Yew (Cingapura)",
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
        title: "Do Terceiro Mundo para o Primeiro (Lee Kuan Yew)",
        link: "hhttps://amzn.to/4uaHZl1",
      },
      {
        title: "A Doutrina do Choque (Naomi Klein)",
        link: "https://amzn.to/47cY6Ev",
      },
    ],
  },
  {
    name: "Capitalismo de Estado",
    stats: { econ: 20, dipl: 50, govt: 30, scty: 50 },
    desc: "O Capitalismo de Estado descreve um sistema onde o governo atua como o principal agente comercial e administrativo da economia nacional, utilizando o aparelho estatal e empresas públicas ('campeões nacionais') para competir globalmente e dirigir o investimento doméstico.\n\nDiferente do socialismo soviético, o Capitalismo de Estado utiliza as ferramentas do mercado, do lucro e do sistema financeiro para ampliar o poder nacional e político, em vez de buscar a igualdade social absoluta. É o modelo predominante em potências emergentes, onde o Estado define as direções estratégicas da economia, apoia seus oligarcas ou burocratas leais e intervém massivamente para garantir que a economia sirva aos interesses da segurança nacional e da manutenção do regime.",
    roast:
      "Você adora o livre mercado, desde que o governo seja o verdadeiro CEO do país e possa prender qualquer bilionário que discordar. Acha lindo um 'projeto nacional de desenvolvimento de 50 anos' que atropela os indivíduos para construir ferrovias e indústrias.",
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
      {
        title: "Capitalismo sem rivais (Branko Milanović)",
        link: "https://amzn.to/4aKJXkp",
      },
      {
        title:
          "O Modelo Chinês: A meritocracia política e os limites da democracia (Daniel A. Bell)",
        link: "https://amzn.to/4r4Kkew",
      },
      {
        title: "Como a China Escapa da Armadilha da pobreza (Yuen Yuen Ang)",
        link: "https://amzn.to/3N6SJA5",
      },
    ],
  },
  {
    name: "Neoconservadorismo",
    stats: { econ: 20, dipl: 20, govt: 40, scty: 20 },
    desc: "O Neoconservadorismo é uma vertente política que combina o conservadorismo social e econômico com uma política externa altamente intervencionista e assertiva. Surgida de intelectuais ex-esquerdistas americanos desiludidos, defende que os Estados Unidos e as potências democráticas têm o dever moral de usar sua força militar para ativamente derrubar tiranias e 'plantar a semente' da democracia em regiões estratégicas.\n\nValorizam a virtude cívica, o patriotismo incondicional e a crença de que a liberdade não se mantém apenas por processos de mercado, mas exige uma autoridade moral forte e, se necessário, o uso preventivo da força para garantir a 'paz pela musculatura'. Internamente, criticam o relativismo moral e buscam fortalecer as instituições tradicionais da vida ocidental.",
    roast:
      "Você queria salvar os pobres, percebeu que era difícil demais e decidiu que é muito mais fácil impor a democracia no Oriente Médio usando drones. Seu filósofo favorito morreu na década de 70, mas você jura que ele ordenaria a invasão do Iraque.",
    politicians: [
      {
        name: "Irving Kristol",
        link: "https://pt.wikipedia.org/wiki/Irving_Kristol",
        stats: { econ: 25, dipl: 20, govt: 45, scty: 25 },
      },
      {
        name: "Leo Strauss (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Leo_Strauss",
        stats: { econ: 30, dipl: 30, govt: 50, scty: 20 },
      },
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
    ],
    books: [
      {
        title: "A persuasão neoconservadora (Irving Kristol)",
        link: "https://amzn.to/4ulvIub",
      },
      {
        title: "Direito Natural e História (Leo Strauss)",
        link: "https://amzn.to/4l3pDxV",
      },
      {
        title: "O Fim da História e o Último Homem (Francis Fukuyama)",
        link: "https://amzn.to/4aOGLCQ",
      },
    ],
  },
  {
    name: "Fundamentalismo",
    stats: { econ: 20, dipl: 30, govt: 30, scty: 5 },
    desc: "O Fundamentalismo é uma postura que defende a adesão estrita, literal e inquestionável a um conjunto de dogmas religiosos ou ideológicos, considerados como a verdade absoluta e imutável. Surge frequentemente como uma reação à modernidade, ao secularismo e ao pluralismo, buscando restaurar uma suposta pureza original da fe através da aplicação rigorosa de leis religiosas na esfera pública (Teocracia).\n\nO fundamentalista rejeita interpretações críticas ou históricas de seus textos sagrados, vendo qualquer desvio como apostasia ou traição moral. Esta ideologia busca subordinar todas as instituições sociais, políticas e educacionais à autoridade religiosa, muitas vezes utilizando o poder do Estado para impor normas de conduta estritas e suprimir visões de mundo divergentes em nome da obediência divina.",
    roast:
      "Você acha que o maior problema do mundo é que as pessoas não estão seguindo o livro certo da maneira certa. Sua solução para tudo é mais fé e menos perguntas.",
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
      {
        title: "A revanche de Deus (Gilles Kepel)",
        link: "https://amzn.to/46y352s",
      },
      {
        title: "O Choque de Civilizações (Samuel Huntington)",
        link: "https://amzn.to/46zffbq",
      },
    ],
  },

  {
    name: "Anarco-Capitalismo",
    stats: { econ: 0, dipl: 15, govt: 100, scty: 50 },
    desc: "O Anarco-Capitalismo é uma filosofia política e econômica que defende a abolição total do Estado em favor da soberania individual e do livre mercado absoluto. Baseia-se no 'Princípio de Não-Agressão' (PNA), que sustenta que qualquer iniciação de força física contra a pessoa ou propriedade de outrem é ilegítima.\n\nOs anarco-capitalistas argumentam que todas as funções tradicionalmente estatais — incluindo justiça, segurança, policiamento e infraestrutura — podem e devem ser fornecidas por agências privadas e tribunais arbitrais em um mercado competitivo. Para esta corrente, o Estado é visto como uma organização criminosa que sobrevive através do roubo institucionalizado (impostos). A ordem social surgiria espontaneamente através de contratos voluntários, da proteção da propriedade privada e da livre iniciativa, sem a necessidade de um monopólio central da força.",
    roast:
      "Você pagaria para andar na calçada e acha que vender órgãos infantis é 'livre mercado'. Sua utopia é um condomínio fechado armado até os dentes onde a lei é ditada pelo dono da rua.",
    politicians: [
      {
        name: "Murray Rothbard (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Murray_Rothbard",
        stats: { econ: 0, dipl: 15, govt: 100, scty: 50 },
      },
      {
        name: "David Friedman (Teórico)",
        link: "https://pt.wikipedia.org/wiki/David_D._Friedman",
        stats: { econ: 5, dipl: 20, govt: 95, scty: 55 },
      },
      {
        name: "Hans-Hermann Hoppe (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Hans-Hermann_Hoppe",
        stats: { econ: 0, dipl: 10, govt: 100, scty: 40 },
      },
    ],
    books: [
      {
        title:
          "Por Uma Nova Liberdade: O Manifesto Libertário (Murray Rothbard)",
        link: "https://amzn.to/3MRiLY4",
      },
      {
        title: "Anatomia do Estado (Murray Rothbard)",
        link: "https://amzn.to/4tYDJoF",
      },
      {
        title: "Democracia: O deus que falhou (Hans-Hermann Hoppe)",
        link: "https://amzn.to/4soyM6V",
      },
    ],
  },
  {
    name: "Neocalvinismo",
    stats: { econ: 50, dipl: 50, govt: 70, scty: 20 },
    desc: "O Neocalvinismo, fundamentado no pensamento de Abraham Kuyper, defende a 'Soberania das Esferas', onde cada área da vida (estado, igreja, família, arte, ciência) possui sua própria autoridade dada por Deus, impedindo que o Estado ou qualquer outra instituição se torne totalitária.\n\nPromove uma visão de pluralismo social e compromisso cristão com a cultura e a justiça social, equilibrando um profundo conservadorismo moral com a defesa fervorosa da liberdade religiosa e institucional. Rejeita tanto a secularização totalitária quanto o domínio direto da igreja sobre o estado.",
    roast:
      "Você acredita piamente que existe um 'palmo quadrado' de autoridade divina até na escolha da marca do café. Sua solução para tudo é criar uma instituição paralela christian-only e depois reclamar que a sociedade está fragmentada.",
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
      { title: "Calvinismo (Abraham Kuyper)", link: "https://amzn.to/46UbE87" },
      {
        title: "Raiz da Cultura Ocidental (Herman Dooyeweerd)",
        link: "https://amzn.to/4kZAngS",
      },
      {
        title: "O Pensamento Econômico e Social de Calvino (André Biéler)",
        link: "https://amzn.to/3MRj2KA",
      },
    ],
  },
  {
    name: "Liberalismo de Direita",
    stats: { econ: 20, dipl: 40, govt: 70, scty: 70 },
    desc: "O Liberalismo de Direita (ou Liberalismo Econômico Moderno) foca na redução drástica do Estado, privatizações, desregulamentação e responsabilidade fiscal. No contexto brasileiro, é associado à defesa das reformas estruturantes e da liberdade individual como motor do progresso.\n\nAcredita que o livre mercado é o mecanismo mais eficiente para gerar riqueza e que o papel do governo deve se limitar a garantir a segurança, a justiça e o cumprimento de contratos, evitando intervenções na economia.",
    roast:
      "Você cita o Roberto Campos em jantares de família e acha que o 'imposto é roubo' é a única frase que precisa para explicar toda a sociologia moderna. Provavelmente tem um adesivo de think tank no carro e acredita que a mão invisível do mercado vai consertar até o seu Wi-Fi ruim.",
    politicians: [
      {
        name: "Roberto Campos (BR)",
        link: "https://pt.wikipedia.org/wiki/Roberto_Campos",
        stats: { econ: 20, dipl: 60, govt: 70, scty: 70 },
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
      {
        name: "Paulo Guedes (BR)",
        link: "https://pt.wikipedia.org/wiki/Paulo_Guedes",
        stats: { econ: 20, dipl: 55, govt: 70, scty: 70 },
      },
    ],
    books: [
      {
        title: "A Lanterna na Popa (Roberto Campos)",
        link: "https://amzn.to/4aLhDqK",
      },
      {
        title: "O Caminho da Servidão (Friedrich Hayek)",
        link: "https://amzn.to/4ulkkyr",
      },
      {
        title: "As Seis Lições (Ludwig von Mises)",
        link: "https://amzn.to/46vqzVZ",
      },
      {
        title: "Capitalismo e Liberdade (Milton Friedman)",
        link: "https://amzn.to/4skCPB7",
      },
    ],
  },
  {
    name: "Integralismo Brasileiro",
    stats: { econ: 50, dipl: 10, govt: 10, scty: 5 },
    desc: "O Integralismo foi o principal movimento fascista brasileiro, fundado por Plínio Salgado na década de 1930. Diferente do fascismo europeu, incorporou forte ênfase no catolicismo, no espiritualismo e na identidade nacional brasileira, com o lema 'Deus, Pátria e Família'.\n\nDefendia um Estado corporativista e autoritário, anticomunista e antiliberal, que unisse as classes sociais sob a liderança nacional. Adotava a camisa verde e o sigma (Σ) como símbolo, e chegou a ter centenas de milhares de membros antes de ser proibido por Vargas em 1937.",
    roast:
      "Você usa camisa verde e acha que o Brasil seria perfeito se fosse governado por um intelectual católico de mão de ferro. Sua solução para a luta de classes é fazer todo mundo rezar junto e obedecer ao líder.",
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
    ],
    books: [
      { title: "O que é o Integralismo (Plínio Salgado)", link: "https://amzn.to/4b0PmCK" },
      { title: "A Doutrina do Sigma (Plínio Salgado)", link: "https://amzn.to/4b0PphU" },
      { title: "O que o integralista deve saber (Gustavo Barroso)", link: "https://amzn.to/4qXUiy1" },
    ],
  },
  {
    name: "Conservadorismo Liberal",
    stats: { econ: 20, dipl: 50, govt: 65, scty: 35 },
    desc: "O Conservadorismo Liberal, ou Liberalconservadorismo, combina o compromisso com a liberdade econômica e o livre mercado com a valorização das instituições, tradições e valores morais estabelecidos.\n\nDefende privatizações, responsabilidade fiscal e desregulamentação, mas dentro de um quadro de respeito à ordem constitucional, à família e à cultura nacional. No Brasil, representa correntes como o Partido Novo e setores do MBL, que rejeitam tanto o estatismo da esquerda quanto o autoritarismo da direita radical.",
    roast:
      "Você quer um Estado mínimo, mas só para a economia. Para os costumes, quer um Estado bem presente na sua cama. Acha que liberdade é poder demitir funcionários sem aviso, mas não poder casar com quem quiser.",
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
      { title: "O Caminho da Servidão (Friedrich Hayek)", link: "https://amzn.to/4ulkkyr" },
      { title: "Capitalismo e Liberdade (Milton Friedman)", link: "https://amzn.to/4skCPB7" },
      { title: "A política da prudência (Russell Kirk)", link: "https://amzn.to/47gg88U" },
    ],
  },

  {
    name: "Feminismo",
    stats: { econ: 50, dipl: 75, govt: 70, scty: 100 },
    desc: "O Feminismo é um movimento social, político e filosófico que luta pela emancipação das mulheres e pela superação das desigualdades históricas baseadas no gênero. Seu objetivo central é a desconstrução das estruturas patriarcais que subordinam o feminino ao masculino, buscando garantir a igualdade de direitos, a autonomia reprodutiva, a paridade econômica e o fim de todas as formas de violência contra a mulher.\n\nO feminismo bifurca-se em diversas correntes: o Liberal (focado em igualdade jurídica e institucional), o Marxista (que vê a opressão de gênero ligada à de classe), o Radical (que foca na raiz cultural do patriarcado) e o Interseccional (que analisa como gênero, raça e classe se cruzam). Mais do que uma luta setorial, o feminismo propõe uma reavaliação profunda de todos os papéis sociais para construir uma sociedade onde o gênero não seja um fator de opressão ou limitação da liberdade humana.",
    roast:
      "Sua citação preferida é 'lugar de mulher é onde ela quiser', exceto se for pra discordar de você no Twitter. Você cancelaria o Papai Noel por não ser uma entidade agênero.",
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
      {
        title: "Reivindicação dos Direitos da Mulher (Mary Wollstonecraft)",
        link: "https://amzn.to/40BLVxl",
      },
      { title: "O Segundo Sexo (Simone de Beauvoir)", link: "https://amzn.to/4cTVE9B" },
      { title: "Problemas de Gênero (Judith Butler)", link: "https://amzn.to/400GAj5" },
    ],
  },
];

export function getMatchPercentage(distance: number): number {
  const maxDistance = 200;
  return Math.max(0, 100 * (1 - distance / maxDistance));
}

export function getMatchedIdeology(
  e: number,
  d: number,
  g: number,
  s: number,
): Ideology | null {
  const top = getTopMatchedIdeologies(e, d, g, s, 1);
  return top.length > 0 ? top[0] : null;
}

export function getTopMatchedIdeologies(
  e: number,
  d: number,
  g: number,
  s: number,
  count: number = 3,
): Ideology[] {
  const results = ideologies.map((ideology) => {
    const distance = Math.sqrt(
      Math.pow(ideology.stats.econ - e, 2) +
      Math.pow(ideology.stats.dipl - d, 2) +
      Math.pow(ideology.stats.govt - g, 2) +
      Math.pow(ideology.stats.scty - s, 2),
    );
    const affinity = getMatchPercentage(distance);
    return { ideology: { ...ideology, affinity }, distance };
  });

  results.sort((a, b) => a.distance - b.distance);

  return results.slice(0, count).map((r) => r.ideology);
}
