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

export const questions: Question[] = [
  {
    question:
      "O poder excessivo e a influência negativa de grandes corporações são uma ameaça maior à sociedade do que o poder do governo.",
    effect: { econ: 10, dipl: 0, govt: -5, scty: 0 },
  },
  {
    question:
      "A intervenção governamental na economia é necessária para proteger os consumidores de práticas injustas.",
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
      "A pesquisa científica financiada pelo governo traz mais benefícios à sociedade do que a pesquisa deixada puramente ao setor privado.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "Impor tarifas sobre produtos importados é importante para proteger e incentivar a indústria nacional.",
    effect: { econ: 5, dipl: -10, govt: -5, scty: 0 },
  },
  {
    question:
      "O princípio 'De cada um segundo sua capacidade, a cada um segundo suas necessidades' descreve uma sociedade ideal.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Seria melhor para a sociedade se os programas sociais governamentais fossem substituídos por iniciativas de caridade privada.",
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
      "Serviços essenciais, como fornecimento de água, eletricidade e infraestrutura de transporte, deveriam ser controlados ou de propriedade do setor público.",
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
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 },
  },
  {
    question:
      "O uso da força militar pelo nosso país é, por vezes, necessário para defender nossos interesses e segurança nacional.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 },
  },
  {
    question:
      "A formação de blocos de cooperação regionais entre países (como a União Europeia) é benéfica e deve ser apoiada.",
    effect: { econ: -5, dipl: 10, govt: 10, scty: 5 },
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
    question: "Sinto orgulho e considero minha nação superior a muitas outras.",
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
      "O uso da violência nunca se justifica em protestos políticos, mesmo contra regimes considerados opressores.",
    effect: { econ: 0, dipl: 5, govt: -5, scty: 0 },
  },
  {
    question:
      "É desejável que os valores da minha religião sejam amplamente divulgados e influenciem a sociedade como um todo.",
    effect: { econ: 0, dipl: -5, govt: -10, scty: -10 },
  },
  {
    question:
      "É importante promover ativamente os valores culturais e políticos do nosso país em outras nações.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 },
  },
  {
    question:
      "A manutenção da lei, da ordem e da segurança pública deve ser uma das principais prioridades do governo.",
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
      "Para garantir a segurança contra ameaças como o terrorismo, é aceitável que o governo restrinja algumas liberdades civis.",
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
    effect: { econ: 0, dipl: -10, govt: -10, scty: -5 },
  },
  {
    question:
      "Nenhuma forma de autoridade deve ser aceita sem questionamento crítico.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 5 },
  },
  {
    question:
      "Uma estrutura de governo claramente hierárquica, com linhas de comando definidas, é a mais eficaz.",
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
      "O aborto deveria ser ilegal ou permitido apenas em circunstâncias extremamente raras, como risco de vida para a mãe.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    question:
      "A posse de armas de fogo por civis deveria ser estritamente controlada e permitida apenas para quem demonstrar necessidade comprovada.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    question:
      "Defendo um sistema de saúde universal financiado por impostos, onde todos os cidadãos tenham acesso gratuito ou a baixo custo, independentemente da renda.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question: "A prostituição deveria ser considerada uma atividade ilegal.",
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
      "As fronteiras do nosso país deveriam ser mais abertas para permitir a entrada de imigrantes que desejam viver e trabalhar aqui.",
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
    effect: { econ: 10, dipl: 10, govt: 10, scty: 10 },
  },
  {
    question:
      "Os interesses e objetivos do meu grupo (seja ele nacional, étnico, religioso ou outro) devem ter prioridade sobre os interesses de outros grupos ou da sociedade em geral.",
    effect: { econ: -10, dipl: -10, govt: -10, scty: -10 },
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
      },
      {
        name: "Errico Malatesta",
        link: "https://pt.wikipedia.org/wiki/Errico_Malatesta",
      },
      {
        name: "Nestor Makhno",
        link: "https://pt.wikipedia.org/wiki/Nestor_Makhno",
      },
      {
        name: "Emma Goldman",
        link: "https://pt.wikipedia.org/wiki/Emma_Goldman",
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
      },
      {
        name: "Maria Lacerda de Moura (BR)",
        link: "https://pt.wikipedia.org/wiki/Maria_Lacerda_de_Moura",
      },
      {
        name: "José Oiticica (BR)",
        link: "https://pt.wikipedia.org/wiki/Jos%C3%A9_Oiticica",
      },
      {
        name: "Abdullah Öcalan",
        link: "https://pt.wikipedia.org/wiki/Abdullah_%C3%96calan",
      },
    ],
    books: [
      { title: "A Ecologia da Liberdade - Murray Bookchin", link: "" },
      { title: "Anarquismo: Da Teoria à Prática - Daniel Guérin", link: "" },
      { title: "Post-Scarcity Anarchism - Murray Bookchin", link: "" },
      { title: "Confederalismo Democrático - Abdullah Öcalan", link: "" },
      { title: "O Municipalismo Libertário - Murray Bookchin", link: "" },
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
      },
      {
        name: "Ernest Mandel",
        link: "https://pt.wikipedia.org/wiki/Ernest_Mandel",
      },
      {
        name: "James P. Cannon",
        link: "https://pt.wikipedia.org/wiki/James_P._Cannon",
      },
      {
        name: "Nahuel Moreno",
        link: "https://pt.wikipedia.org/wiki/Nahuel_Moreno",
      },
    ],
    books: [
      { title: "A Revolução Permanente - Trotsky", link: "" },
      { title: "História da Revolução Russa - Trotsky", link: "" },
      { title: "A Revolução Traída - Trotsky", link: "" },
      { title: "O Programa de Transição - Trotsky", link: "" },
      { title: "Capitalismo Tardio - Ernest Mandel", link: "" },
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
      },
      {
        name: "Antonio Gramsci",
        link: "https://pt.wikipedia.org/wiki/Antonio_Gramsci",
      },
      {
        name: "Theodor Adorno (Escola de Frankfurt)",
        link: "https://pt.wikipedia.org/wiki/Theodor_W._Adorno",
      },
      {
        name: "Luís Carlos Prestes (BR)",
        link: "https://pt.wikipedia.org/wiki/Lu%C3%ADs_Carlos_Prestes",
      },
      {
        name: "Álvaro Cunhal (PT)",
        link: "https://pt.wikipedia.org/wiki/%C3%81lvaro_Cunhal",
      },
    ],
    books: [
      { title: "O Manifesto Comunista - Marx e Engels", link: "" },
      { title: "Formação do Brasil Contemporâneo - Caio Prado Jr.", link: "" },
      { title: "O Cavaleiro da Esperança - Jorge Amado", link: "" },
      { title: "Cadernos do Cárcere - Gramsci", link: "" },
      { title: "Dialética do Esclarecimento - Adorno e Horkheimer", link: "" },
      { title: "O Capital - Karl Marx", link: "" },
    ],
  },
  {
    name: "De Leonismo",
    stats: { econ: 100, dipl: 30, govt: 30, scty: 80 },
    desc: "O caminho para o socialismo passa pela organização simultânea no campo político e no econômico. Defendemos sindicatos industriais revolucionários que, organizados por setor produtivo, formarão a base de uma república socialista industrial. O voto socialista nas urnas dará legitimidade à transformação; os sindicatos industriais darão a ela substância econômica. O Estado burguês será substituído por um congresso de representantes dos trabalhadores de cada indústria. Rejeitamos tanto o reformismo impotente quanto o anarquismo desorganizado. A classe trabalhadora, organizada e consciente, será sua própria libertadora.",
    roast: "Você é o único que ainda acredita que a revolução virá através de sindicatos industriais e um partido político que ninguém conhece. Seu plano é tão detalhado que ninguém consegue entender, e você passa mais tempo discutindo a pureza ideológica do que agindo.",
    politicians: [
      {
        name: "Daniel De Leon",
        link: "https://pt.wikipedia.org/wiki/Daniel_De_Leon",
      },
      {
        name: "James Connolly",
        link: "https://pt.wikipedia.org/wiki/James_Connolly",
      },
      {
        name: "Arnold Petersen",
        link: "https://en.wikipedia.org/wiki/Arnold_Petersen",
      },
    ],
    books: [
      { title: "Reforma ou Revolução - Daniel De Leon", link: "" },
      { title: "Reconstrução Socialista da Sociedade - De Leon", link: "" },
      { title: "Sindicalismo Industrial - De Leon", link: "" },
      { title: "O Que Significa De Leonismo - Arnold Petersen", link: "" },
    ],
  },
  {
    name: "Leninismo",
    stats: { econ: 100, dipl: 40, govt: 20, scty: 70 },
    desc: "A classe trabalhadora, por si só, não desenvolve espontaneamente consciência revolucionária. É necessário um partido de vanguarda, disciplinado e organizado pelo centralismo democrático, para trazer essa consciência de fora e liderar as massas na tomada do poder. O imperialismo é a fase superior do capitalismo, e sua derrota exige uma estratégia revolucionária coordenada. A ditadura do proletariado, através de sovietes e conselhos populares, esmaga a resistência da burguesia e inicia a construção socialista. O Estado eventualmente definha quando as classes desaparecem.",
    politicians: [
      {
        name: "Vladimir Lênin",
        link: "https://pt.wikipedia.org/wiki/Vladimir_Lenin",
      },
      {
        name: "Alexandra Kollontai",
        link: "https://pt.wikipedia.org/wiki/Alexandra_Kollontai",
      },
      {
        name: "Nikolai Bukharin",
        link: "https://pt.wikipedia.org/wiki/Nikolai_Bukharin",
      },
      {
        name: "Fidel Castro",
        link: "https://pt.wikipedia.org/wiki/Fidel_Castro",
      },
    ],
    books: [
      { title: "O Estado e a Revolução - Lênin", link: "" },
      { title: "Que Fazer? - Lênin", link: "" },
      { title: "Imperialismo, Fase Superior do Capitalismo - Lênin", link: "" },
      { title: "As Teses de Abril - Lênin", link: "" },
      { title: "Esquerdismo: Doença Infantil do Comunismo - Lênin", link: "" },
    ],
  },
  {
    name: "Stalinismo/Maoismo",
    stats: { econ: 100, dipl: 20, govt: 0, scty: 60 },
    desc: "É possível e necessário construir o socialismo em um só país, cercado por potências hostis. Isso exige industrialização acelerada, coletivização da agricultura e um partido forte que elimine implacavelmente inimigos de classe e sabotadores. O Maoismo adapta esses princípios às condições do Terceiro Mundo, reconhecendo o campesinato como força revolucionária principal e desenvolvendo a estratégia de guerra popular prolongada. A luta de classes continua sob o socialismo, exigindo vigilância constante e revolução cultural para combater a restauração capitalista. A linha de massas garante que o partido nunca se afaste do povo.",
    politicians: [
      {
        name: "Josef Stalin",
        link: "https://pt.wikipedia.org/wiki/Josef_Stalin",
      },
      {
        name: "Mao Tsé-Tung",
        link: "https://pt.wikipedia.org/wiki/Mao_Ts%C3%A9-Tung",
      },
      {
        name: "Kim Il-sung",
        link: "https://pt.wikipedia.org/wiki/Kim_Il-sung",
      },
      {
        name: "Enver Hoxha",
        link: "https://pt.wikipedia.org/wiki/Enver_Hoxha",
      },
    ],
    books: [
      { title: "Fundamentos do Leninismo - Stalin", link: "" },
      { title: "O Livro Vermelho - Mao Tsé-Tung", link: "" },
      { title: "Sobre a Prática e a Contradição - Mao", link: "" },
      {
        title: "Problemas Econômicos do Socialismo na URSS - Stalin",
        link: "",
      },
      { title: "Sobre a Guerra Prolongada - Mao", link: "" },
    ],
  },
  {
    name: "Comunismo Religioso",
    stats: { econ: 100, dipl: 50, govt: 30, scty: 30 },
    desc: "A comunhão de bens não é uma invenção moderna, está nas Escrituras: 'Nenhum deles considerava exclusivamente sua coisa alguma que possuísse, mas tudo entre eles era comum.' A verdadeira fé exige que vivamos como irmãos, partilhando o pão e o trabalho, sem propriedade privada que corrompe a alma com a ganância. A igualdade radical foi o plano divino desde o início; a propriedade é o pecado original da sociedade. Comunidades de fé que vivem em comum realizam na terra o Reino dos Céus, onde não há meu nem teu, mas apenas nosso sob os olhos de Deus.",
    politicians: [
      {
        name: "Thomas Müntzer",
        link: "https://pt.wikipedia.org/wiki/Thomas_M%C3%BCntzer",
      },
      {
        name: "Gerrard Winstanley",
        link: "https://pt.wikipedia.org/wiki/Gerrard_Winstanley",
      },
      {
        name: "Camilo Torres",
        link: "https://pt.wikipedia.org/wiki/Camilo_Torres_Restrepo",
      },
    ],
    books: [
      { title: "A Lei da Liberdade - Gerrard Winstanley", link: "" },
      { title: "A Nova Lei da Retidão - Winstanley", link: "" },
      { title: "Sermões Revolucionários - Thomas Müntzer", link: "" },
      { title: "Atos dos Apóstolos (Bíblia)", link: "" },
    ],
  },
  {
    name: "Socialismo de Estado",
    stats: { econ: 80, dipl: 30, govt: 30, scty: 70 },
    desc: "O Estado é o instrumento mais eficaz para transformar a sociedade e garantir justiça econômica. Através da propriedade pública dos setores estratégicos, planejamento centralizado e administração técnica, podemos superar a anarquia do mercado e suas crises cíclicas. A industrialização dirigida pelo Estado desenvolve a nação e eleva o padrão de vida do povo trabalhador. A burocracia estatal, quando bem organizada, distribui recursos de forma mais racional que a mão invisível do mercado. O desenvolvimento nacional vem antes das utopias internacionalistas.",
    politicians: [
      {
        name: "Getúlio Vargas",
        link: "https://pt.wikipedia.org/wiki/Get%C3%BAlio_Vargas",
      },
      {
        name: "Juan Perón",
        link: "https://pt.wikipedia.org/wiki/Juan_Per%C3%B3n",
      },
      {
        name: "Gamal Abdel Nasser",
        link: "https://pt.wikipedia.org/wiki/Gamal_Abdel_Nasser",
      },
      {
        name: "Jawaharlal Nehru",
        link: "https://pt.wikipedia.org/wiki/Jawaharlal_Nehru",
      },
    ],
    books: [
      { title: "A Descoberta da Índia - Nehru", link: "" },
      { title: "Filosofia do Peronismo - Juan Perón", link: "" },
      { title: "A Economia do Desenvolvimento - diversos autores", link: "" },
      { title: "Planejamento Econômico - Oscar Lange", link: "" },
    ],
  },
  {
    name: "Socialismo Teocrático",
    stats: { econ: 80, dipl: 50, govt: 30, scty: 20 },
    desc: "A justiça social e a justiça divina são uma só. A lei de Deus condena tanto a exploração do homem pelo homem quanto a imoralidade da sociedade secular. Defendemos um Estado que implemente a economia socialista sob orientação dos princípios sagrados e da liderança religiosa. A riqueza deve ser distribuída conforme os mandamentos divinos, e a sociedade deve viver segundo a moralidade prescrita pela fé verdadeira. Rejeitamos tanto o capitalismo materialista quanto o comunismo ateu. A revolução espiritual e a revolução social caminham juntas.",
    politicians: [
      {
        name: "Ali Shariati",
        link: "https://pt.wikipedia.org/wiki/Ali_Shariati",
      },
      {
        name: "Muammar Gaddafi",
        link: "https://pt.wikipedia.org/wiki/Muammar_Gaddafi",
      },
      {
        name: "Ruhollah Khomeini (aspectos econômicos)",
        link: "https://pt.wikipedia.org/wiki/Ruhollah_Khomeini",
      },
    ],
    books: [
      { title: "Religião contra Religião - Ali Shariati", link: "" },
      { title: "O Livro Verde - Muammar Gaddafi", link: "" },
      { title: "Marxismo e Outras Falácias Ocidentais - Shariati", link: "" },
      { title: "Economia Islâmica - diversos autores", link: "" },
    ],
  },
  {
    name: "Socialismo Religioso",
    stats: { econ: 80, dipl: 50, govt: 70, scty: 20 },
    desc: "A fé verdadeira exige compromisso com os pobres e oprimidos. Os profetas sempre denunciaram a injustiça e a acumulação de riquezas. A Teologia da Libertação nos ensina que pecar não é apenas transgressão individual, mas também estruturas sociais que perpetuam a miséria. Cristo estava entre os pobres, e nós devemos estar também. Defendemos reformas econômicas radicais, redistribuição de terras e riquezas, educação e saúde para todos, dentro de um quadro democrático. A libertação é espiritual e material, pessoal e coletiva.",
    politicians: [
      {
        name: "Frei Betto",
        link: "https://pt.wikipedia.org/wiki/Frei_Betto",
      },
      {
        name: "Leonardo Boff",
        link: "https://pt.wikipedia.org/wiki/Leonardo_Boff",
      },
      {
        name: "Oscar Romero",
        link: "https://pt.wikipedia.org/wiki/%C3%93scar_Romero",
      },
      {
        name: "Martin Luther King Jr.",
        link: "https://pt.wikipedia.org/wiki/Martin_Luther_King_Jr.",
      },
    ],
    books: [
      { title: "Teologia da Libertação - Gustavo Gutiérrez", link: "" },
      { title: "Jesus Cristo Libertador - Leonardo Boff", link: "" },
      { title: "Batismo de Sangue - Frei Betto", link: "" },
      { title: "Força para Amar - Martin Luther King Jr.", link: "" },
      { title: "Igreja: Carisma e Poder - Leonardo Boff", link: "" },
    ],
  },
  {   
    name: "Socialismo Democrático",
    stats: { econ: 80, dipl: 50, govt: 50, scty: 80 },
    desc: "O socialismo deve ser conquistado através da democracia, e a democracia só é plena quando se estende à esfera econômica. Lutamos nas urnas, nos sindicatos e nos movimentos sociais por uma transformação gradual mas profunda da sociedade. Os setores estratégicos da economia devem ser controlados democraticamente pelo povo, não por acionistas ou burocratas. Um Estado de bem-estar robusto garante saúde, educação e moradia como direitos, não mercadorias. Rejeitamos tanto o capitalismo selvagem quanto o autoritarismo que se disfarçou de socialismo no século XX.",
    politicians: [
      {
        name: "Leonel Brizola (BR)",
        link: "https://pt.wikipedia.org/wiki/Leonel_Brizola",
      },
      {
        name: "Pepe Mujica (Uruguai)",
        link: "https://pt.wikipedia.org/wiki/Jos%C3%A9_Mujica",
      },
      {
        name: "Salvador Allende",
        link: "https://pt.wikipedia.org/wiki/Salvador_Allende",
      },
      {
        name: "Alexandria Ocasio-Cortez",
        link: "https://pt.wikipedia.org/wiki/Alexandria_Ocasio-Cortez",
      },
    ],
    books: [
      { title: "O Caminho para o Poder - Karl Kautsky", link: "" },
      { title: "Fios da História - Uma Biografia de Brizola", link: "" },
      { title: "Por Que Não o Socialismo? - G.A. Cohen", link: "" },
      { title: "A Alma do Homem sob o Socialismo - Oscar Wilde", link: "" },
      { title: "O ABC do Socialismo - Leo Huberman", link: "" },
    ],
  },
  {
    name: "Socialismo Revolucionário",
    stats: { econ: 80, dipl: 20, govt: 50, scty: 70 },
    desc: "O reformismo é uma ilusão! A burguesia nunca entregará seu poder pacificamente. A história mostra que toda conquista dos trabalhadores foi arrancada pela luta, e que toda concessão pode ser retirada. A via parlamentar está bloqueada pelos interesses do capital. Somente a ação revolucionária das massas organizadas pode destruir o Estado burguês e construir uma nova sociedade. Não queremos reformar o capitalismo, queremos superá-lo. A revolução não é um momento, é um processo que exige organização, consciência de classe e disposição para a luta.",
    politicians: [
      {
        name: "Che Guevara",
        link: "https://pt.wikipedia.org/wiki/Che_Guevara",
      },
      {
        name: "Subcomandante Marcos",
        link: "https://pt.wikipedia.org/wiki/Subcomandante_Marcos",
      },
      {
        name: "Thomas Sankara",
        link: "https://pt.wikipedia.org/wiki/Thomas_Sankara",
      },
      {
        name: "Hugo Blanco",
        link: "https://pt.wikipedia.org/wiki/Hugo_Blanco",
      },
    ],
    books: [
      { title: "O Estado e a Revolução - Lênin", link: "" },
      { title: "Guerra de Guerrilhas - Che Guevara", link: "" },
      { title: "O Homem e o Socialismo em Cuba - Che Guevara", link: "" },
      { title: "Os Condenados da Terra - Frantz Fanon", link: "" },
      { title: "Nosotros Decimos No - Eduardo Galeano", link: "" },
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
      },
      {
        name: "Howard Zinn",
        link: "https://pt.wikipedia.org/wiki/Howard_Zinn",
      },
      {
        name: "David Graeber",
        link: "https://pt.wikipedia.org/wiki/David_Graeber",
      },
      {
        name: "Angela Davis",
        link: "https://pt.wikipedia.org/wiki/Angela_Davis",
      },
    ],
    books: [
      {
        title: "Uma História Popular dos Estados Unidos - Howard Zinn",
        link: "",
      },
      { title: "Sobre Anarquismo - Noam Chomsky", link: "" },
      { title: "Dívida: Os Primeiros 5000 Anos - David Graeber", link: "" },
      { title: "Mulheres, Raça e Classe - Angela Davis", link: "" },
      { title: "Razões para Agir - Noam Chomsky", link: "" },
    ],
  },
  {
    name: "Anarco-Sindicalismo",
    stats: { econ: 80, dipl: 50, govt: 100, scty: 80 },
    desc: "Os trabalhadores não precisam de políticos ou burocratas para se libertar. Através de sindicatos revolucionários organizados por indústria, construímos o poder para derrubar o capitalismo e a estrutura para a nova sociedade simultaneamente. A greve geral é nossa arma mais poderosa. Quando os trabalhadores cruzam os braços unidos, o sistema para. E quando tomam as fábricas em suas próprias mãos, o capitalismo acaba. A sociedade futura será uma federação de coletivos autogeridos, onde quem trabalha decide. Ação direta, não eleições; autogestão, não delegação!",
    roast: "Sua solução para tudo é uma greve geral. Se o pneu furar? Greve geral. Se chover no domingo? Greve geral. Você acha que organizar um sindicato é mais fácil do que organizar um churrasco.",
    politicians: [
      {
        name: "Edgard Leuenroth (BR)",
        link: "https://pt.wikipedia.org/wiki/Edgard_Leuenroth",
      },
      {
        name: "Buenaventura Durruti",
        link: "https://pt.wikipedia.org/wiki/Buenaventura_Durruti",
      },
      {
        name: "Neno Vasco (PT)",
        link: "https://pt.wikipedia.org/wiki/Neno_Vasco",
      },
      {
        name: "Rudolf Rocker",
        link: "https://pt.wikipedia.org/wiki/Rudolf_Rocker",
      },
    ],
    books: [
      {
        title: "Anarco-Sindicalismo: Teoria e Prática - Rudolf Rocker",
        link: "",
      },
      { title: "Homenagem à Catalunha - George Orwell", link: "" },
      { title: "Ação Direta - Émile Pouget", link: "" },
      { title: "A CNT na Revolução Espanhola - José Peirats", link: "" },
      { title: "O Que É a Propriedade? - Proudhon", link: "" },
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
      },
      {
        name: "Dilma Rousseff",
        link: "https://pt.wikipedia.org/wiki/Dilma_Rousseff",
      },
      {
        name: "Guilherme Boulos",
        link: "https://pt.wikipedia.org/wiki/Guilherme_Boulos",
      },
      {
        name: "Hugo Chávez",
        link: "https://pt.wikipedia.org/wiki/Hugo_Ch%C3%A1vez",
      },
    ],
    books: [
      { title: "A Verdade Vencerá - Lula", link: "" },
      { title: "O Povo Brasileiro - Darcy Ribeiro", link: "" },
      { title: "As Veias Abertas da América Latina - Galeano", link: "" },
      { title: "A Razão Populista - Ernesto Laclau", link: "" },
      { title: "O Que é Populismo? - Jan-Werner Müller", link: "" },
    ],
  },
  {
    name: "Distributismo Católico",
    stats: { econ: 60, dipl: 40, govt: 30, scty: 20 },
    desc: "A doutrina social da Igreja nos ensina que tanto o capitalismo de poucos quanto o coletivismo do Estado violam a dignidade humana. A propriedade deve estar amplamente distribuída entre as famílias, permitindo que cada um viva do próprio trabalho com dignidade. As guildas, cooperativas e pequenas empresas familiares são o modelo, não as grandes corporações nem a burocracia estatal. Mas essa ordem econômica só é estável quando a sociedade é guiada pelos princípios da fé verdadeira e da lei moral, sob a orientação da autoridade espiritual.",
    politicians: [
      {
        name: "Papa Leão XIII",
        link: "https://pt.wikipedia.org/wiki/Papa_Le%C3%A3o_XIII",
      },
      {
        name: "Papa Pio XI",
        link: "https://pt.wikipedia.org/wiki/Papa_Pio_XI",
      },
      {
        name: "Engelbert Dollfuss",
        link: "https://pt.wikipedia.org/wiki/Engelbert_Dollfuss",
      },
    ],
    books: [
      { title: "Rerum Novarum - Papa Leão XIII", link: "" },
      { title: "Quadragesimo Anno - Papa Pio XI", link: "" },
      { title: "Centesimus Annus - Papa João Paulo II", link: "" },
      { title: "O Estado Servil - Hilaire Belloc", link: "" },
    ],
  },
  {
    name: "Distributismo",
    stats: { econ: 60, dipl: 50, govt: 50, scty: 20 },
    desc: "Três acres e uma vaca! Nem capitalismo de monopólios nem socialismo de burocratas. A propriedade é boa, tão boa que todos deveriam tê-la. Defendemos uma sociedade de pequenos proprietários: agricultores em suas terras, artesãos em suas oficinas, comerciantes em suas lojas, todos donos dos meios de seu próprio sustento. As cooperativas e guildas organizam a produção sem criar nem plutocratas nem comissários. A família é a unidade básica da sociedade, e a comunidade local é onde a democracia realmente funciona. Grande demais é ruim, seja empresa ou Estado.",
    roast: "Você quer viver no Condado dos Hobbits. Acha que o problema do mundo é que não temos vacas suficientes e que o feudalismo foi injustiçado pela história.",
    politicians: [
      {
        name: "G. K. Chesterton",
        link: "https://pt.wikipedia.org/wiki/G._K._Chesterton",
      },
      {
        name: "Hilaire Belloc",
        link: "https://pt.wikipedia.org/wiki/Hilaire_Belloc",
      },
      {
        name: "E. F. Schumacher",
        link: "https://pt.wikipedia.org/wiki/E._F._Schumacher",
      },
      {
        name: "Dorothy Day",
        link: "https://pt.wikipedia.org/wiki/Dorothy_Day",
      },
    ],
    books: [
      { title: "O Que Há de Errado com o Mundo - Chesterton", link: "" },
      { title: "O Estado Servil - Hilaire Belloc", link: "" },
      { title: "O Negócio é Ser Pequeno - E. F. Schumacher", link: "" },
      { title: "O Esboço da Sanidade - G. K. Chesterton", link: "" },
      { title: "A Restauração da Propriedade - Belloc", link: "" },
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
      },
      {
        name: "Fernando Henrique Cardoso (BR)",
        link: "https://pt.wikipedia.org/wiki/Fernando_Henrique_Cardoso",
      },
      {
        name: "Joe Biden (EUA)",
        link: "https://pt.wikipedia.org/wiki/Joe_Biden",
      },
      {
        name: "Barack Obama",
        link: "https://pt.wikipedia.org/wiki/Barack_Obama",
      },
    ],
    books: [
      { title: "Uma Teoria da Justiça - John Rawls", link: "" },
      { title: "Desenvolvimento como Liberdade - Amartya Sen", link: "" },
      { title: "O Relatório Beveridge", link: "" },
      { title: "Liberalismo - L. T. Hobhouse", link: "" },
      { title: "Justiça como Equidade - John Rawls", link: "" },
    ],
  },
  {
    name: "Democracia Cristã",
    stats: { econ: 60, dipl: 60, govt: 50, scty: 30 },
    desc: "A política deve ser guiada por princípios morais enraizados na tradição cristã: dignidade da pessoa humana, solidariedade, subsidiariedade e bem comum. Defendemos uma economia social de mercado, onde a livre iniciativa é equilibrada pela responsabilidade social e pela proteção dos mais fracos. A família é a célula fundamental da sociedade e merece proteção especial. Somos favoráveis à cooperação internacional e à integração europeia, pois a paz e a prosperidade dependem da colaboração entre nações. Moderação, não extremismo; reforma, não revolução.",
    politicians: [
      {
        name: "Konrad Adenauer",
        link: "https://pt.wikipedia.org/wiki/Konrad_Adenauer",
      },
      {
        name: "Alcide De Gasperi",
        link: "https://pt.wikipedia.org/wiki/Alcide_De_Gasperi",
      },
      {
        name: "Angela Merkel",
        link: "https://pt.wikipedia.org/wiki/Angela_Merkel",
      },
      {
        name: "Robert Schuman",
        link: "https://pt.wikipedia.org/wiki/Robert_Schuman",
      },
    ],
    books: [
      { title: "Rerum Novarum - Papa Leão XIII", link: "" },
      { title: "Economia Social de Mercado - Alfred Müller-Armack", link: "" },
      { title: "Populorum Progressio - Papa Paulo VI", link: "" },
      { title: "Doutrina Social da Igreja - Compêndio", link: "" },
    ],
  },
  {
    name: "Social Democracia",
    stats: { econ: 60, dipl: 70, govt: 60, scty: 80 },
    desc: "O capitalismo pode ser civilizado. Através de sindicatos fortes, negociação coletiva, regulação do mercado e um Estado de bem-estar universal e generoso, podemos garantir que a prosperidade seja compartilhada por todos. Saúde universal, educação pública de qualidade, aposentadoria digna, seguro-desemprego e licenças parentais são direitos, não privilégios. A democracia não termina na urna; ela deve se estender ao local de trabalho e à economia. Buscamos uma sociedade onde todos tenham segurança material para viver com dignidade e liberdade real.",
    roast: "Você quer a revolução, desde que ela não atrase seu brunch. Acha que votar em partidos de esquerda moderada é um ato radical de rebeldia.",
    politicians: [
      {
        name: "Mário Soares (PT)",
        link: "https://pt.wikipedia.org/wiki/M%C3%A1rio_Soares",
      },
      {
        name: "Olof Palme",
        link: "https://pt.wikipedia.org/wiki/Olof_Palme",
      },
      {
        name: "Willy Brandt",
        link: "https://pt.wikipedia.org/wiki/Willy_Brandt",
      },
      {
        name: "Ulysses Guimarães (BR)",
        link: "https://pt.wikipedia.org/wiki/Ulysses_Guimar%C3%A3es",
      },
    ],
    books: [
      { title: "O Futuro do Socialismo - Anthony Crosland", link: "" },
      { title: "A Terceira Via - Anthony Giddens", link: "" },
      { title: "O Modelo Nórdico - diversos autores", link: "" },
      {
        title: "Ideias Socialistas em Transformação - Norberto Bobbio",
        link: "",
      },
      { title: "Capital no Século XXI - Thomas Piketty", link: "" },
    ],
  },
  {
    name: "Progressismo",
    stats: { econ: 60, dipl: 80, govt: 60, scty: 100 },
    desc: "O arco da história é longo, mas se curva em direção à justiça. Acreditamos no progresso: na ciência que cura doenças e resolve problemas, na educação que liberta mentes, nos direitos civis que expandem a dignidade a todos. Cada geração pode e deve melhorar a anterior. Lutamos contra todas as formas de discriminação, pela igualdade de gênero, pelos direitos LGBTQ+, pela justiça racial e pela proteção do meio ambiente. O governo é uma ferramenta para o bem comum quando usado corretamente. Não aceitamos que 'sempre foi assim' como desculpa para a injustiça.",
    roast: "Você cancela pessoas no Twitter por esporte e acha que usar a hashtag certa vai salvar o mundo. Sua principal angústia existencial é decidir qual leite vegetal polui menos.",
    politicians: [
      {
        name: "Theodore Roosevelt",
        link: "https://pt.wikipedia.org/wiki/Theodore_Roosevelt",
      },
      {
        name: "Elizabeth Warren",
        link: "https://pt.wikipedia.org/wiki/Elizabeth_Warren",
      },
      {
        name: "Justin Trudeau",
        link: "https://pt.wikipedia.org/wiki/Justin_Trudeau",
      },
      {
        name: "Simone de Beauvoir",
        link: "https://pt.wikipedia.org/wiki/Simone_de_Beauvoir",
      },
      {
        name: "Judith Butler",
        link: "https://pt.wikipedia.org/wiki/Judith_Butler",
      },
    ],
    books: [
      { title: "A Promessa da Vida Americana - Herbert Croly", link: "" },
      { title: "Democracia e Educação - John Dewey", link: "" },
      { title: "Os Anjos Bons da Nossa Natureza - Steven Pinker", link: "" },
      { title: "O Segundo Sexo - Simone de Beauvoir", link: "" },
      { title: "Problemas de Gênero - Judith Butler", link: "" },
      { title: "O Capital no Século XXI - Thomas Piketty", link: "" },
    ],
  },
  {
    name: "Anarco-Mutualismo",
    stats: { econ: 60, dipl: 50, govt: 100, scty: 70 },
    desc: "O Anarco-Mutualismo é uma forma de anarquismo de mercado associada a Pierre-Joseph Proudhon. Defende uma sociedade sem Estado onde os indivíduos ou coletivos possuem seus meios de produção e trocam bens e serviços em um mercado livre. A propriedade é legitimada pelo 'uso e ocupação', não pelo título legal, o que se opõe à propriedade ausente e à exploração através de aluguel e juros. Propõe a criação de 'bancos do povo' que forneceriam crédito sem juros para permitir que os trabalhadores adquirissem seu próprio capital.",
    politicians: [
      {
        name: "Pierre-Joseph Proudhon (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Pierre-Joseph_Proudhon",
      },
    ],
    books: [
      { title: "O Que é a Propriedade?", link: "" },
      {
        title: "Sistema das Contradições Econômicas ou Filosofia da Miséria",
        link: "",
      },
    ],
  },
  {
    name: "Totalitarismo Nacional",
    stats: { econ: 50, dipl: 20, govt: 0, scty: 50 },
    desc: "O Totalitarismo Nacional descreve um regime onde o Estado, geralmente sob o controle de um partido único e um líder supremo, busca regular e controlar todos os aspectos da vida pública e privada. É caracterizado pela supressão total da oposição, uso de propaganda massiva, vigilância constante e mobilização da população em torno de uma ideologia nacionalista. A economia é subserviente aos objetivos do Estado, seja através do controle direto ou do corporativismo.",
    politicians: [
      {
        name: "Kim Il-sung (Juche - Coreia do Norte)",
        link: "https://pt.wikipedia.org/wiki/Kim_Il-sung",
      },
      {
        name: "Saddam Hussein (Iraque)",
        link: "https://pt.wikipedia.org/wiki/Saddam_Hussein",
      },
      {
        name: "Getúlio Vargas (Estado Novo - BR)",
        link: "https://pt.wikipedia.org/wiki/Get%C3%BAlio_Vargas",
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
    politicians: [
      { name: "O Partido (1984 - George Orwell)", link: "" },
      { name: "Estado Mundial (Admirável Mundo Novo)", link: "" },
    ],
    books: [
      { title: "Admirável Mundo Novo (Aldous Huxley)", link: "" },
      { title: "(Ensaios sobre globalização e poder supranacional)", link: "" },
    ],
  },
  {
    name: "Tecnocracia",
    stats: { econ: 60, dipl: 60, govt: 20, scty: 70 },
    desc: "A Tecnocracia é um sistema de governo onde os tomadores de decisão são selecionados com base em sua especialização técnica e conhecimento científico, em vez de filiação partidária ou popularidade eleitoral. As políticas são formuladas com base em dados, métodos científicos e eficiência, buscando soluções racionais para os problemas sociais e econômicos. É uma forma de governança elitista, onde o poder reside nos 'especialistas', com o objetivo de otimizar a gestão da sociedade.",
    politicians: [
      { name: "Mario Monti (Itália)", link: "https://pt.wikipedia.org/wiki/Mario_Monti" },
      { name: "Singapura (Modelo de Governança)", link: "" },
    ],
    books: [
      { title: "The Technocrats: Prophets of Automation (Elsner)", link: "" },
      { title: "(Literatura sobre governança por especialistas)", link: "" },
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
      },
      {
        name: "Tony Blair (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/Tony_Blair",
      },
    ],
    books: [
      { title: "O Caminho do Meio (Aristóteles)", link: "" },
      { title: "A Terceira Via (Anthony Giddens)", link: "" },
    ],
  },
  {
    name: "Liberalismo",
    stats: { econ: 50, dipl: 60, govt: 60, scty: 60 },
    desc: "No contexto contemporâneo, especialmente nos Estados Unidos, o Liberalismo refere-se a uma posição de centro-esquerda. Apoia uma economia de mercado regulada para proteger os consumidores e o meio ambiente, juntamente com uma rede de segurança social financiada por impostos progressivos. Defende fortemente as liberdades civis, os direitos das minorias, a separação entre Igreja e Estado e uma política externa baseada na diplomacia e em alianças internacionais.",
    politicians: [
      {
        name: "Barack Obama (EUA)",
        link: "https://pt.wikipedia.org/wiki/Barack_Obama",
      },
      {
        name: "Joe Biden (EUA)",
        link: "https://pt.wikipedia.org/wiki/Joe_Biden",
      },
    ],
    books: [
      { title: "Liberalism and its Discontents (Francis Fukuyama)", link: "" },
    ],
  },
  {
    name: "Anarquismo Religioso",
    stats: { econ: 50, dipl: 50, govt: 100, scty: 20 },
    desc: "O Anarquismo Religioso, como o anarquismo cristão de Tolstói, rejeita o Estado e outras formas de autoridade coercitiva com base em princípios religiosos. Argumenta que a única autoridade legítima é a de Deus e que o Estado, com sua violência e coerção, usurpa essa autoridade e contradiz os ensinamentos de paz e amor ao próximo. Defende a não-violência, a resistência passiva e a formação de comunidades voluntárias baseadas na fé e na ajuda mútua, sendo socialmente tradicional.",
    politicians: [
      {
        name: "Liev Tolstói (Escritor/Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Liev_Tolst%C3%B3i",
      },
      {
        name: "Dorothy Day (Ativista)",
        link: "https://pt.wikipedia.org/wiki/Dorothy_Day",
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
      },
      {
        name: "Donald Trump (EUA)",
        link: "https://pt.wikipedia.org/wiki/Donald_Trump",
      },
      {
        name: "Javier Milei (Argentina)",
        link: "https://pt.wikipedia.org/wiki/Javier_Milei",
      },
      {
        name: "Nikolas Ferreira (BR)",
        link: "https://pt.wikipedia.org/wiki/Nikolas_Ferreira",
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
    politicians: [
      {
        name: "David Cameron (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/David_Cameron",
      },
      {
        name: "Mitt Romney (EUA)",
        link: "https://pt.wikipedia.org/wiki/Mitt_Romney",
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
    politicians: [
      {
        name: "Henry George (Economista)",
        link: "https://pt.wikipedia.org/wiki/Henry_George",
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
      },
      {
        name: "Jo Jorgensen (EUA)",
        link: "https://pt.wikipedia.org/wiki/Jo_Jorgensen",
      },
    ],
    books: [
      { title: "Anarquia, Estado e Utopia (Robert Nozick)", link: "" },
      { title: "A Ética da Liberdade (Murray Rothbard)", link: "" },
      { title: "Economia Numa Única Lição (Henry Hazlitt)", link: "" },
    ],
  },
  {
    name: "Anarco-Egoísmo",
    stats: { econ: 40, dipl: 50, govt: 100, scty: 50 },
    desc: "O Anarco-Egoísmo é uma forma radical de anarquismo individualista, baseada na filosofia de Max Stirner. Rejeita todas as abstrações e 'fantasmas' que limitam o indivíduo, como o Estado, a moralidade, a religião, a propriedade e até mesmo a 'humanidade'. O egoísta reconhece apenas a si mesmo e sua própria vontade como supremos. A sociedade seria uma 'União de Egoístas', uma associação voluntária e não sistemática que os indivíduos formam para seu próprio benefício e podem abandonar a qualquer momento.",
    politicians: [
      {
        name: "Max Stirner (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Max_Stirner",
      },
    ],
    books: [{ title: "O Único e a Sua Propriedade", link: "" }],
  },
  {
    name: "Nazismo",
    stats: { econ: 40, dipl: 0, govt: 0, scty: 5 },
    desc: "O Nazismo (Nacional-Socialismo) foi a ideologia totalitária do regime de Adolf Hitler na Alemanha. Baseava-se em um ultranacionalismo racial extremo, a crença na superioridade da 'raça ariana', um antissemitismo virulento que culminou no Holocausto, e um forte expansionismo militar (Lebensraum). Rejeitava a democracia, o liberalismo e o comunismo, promovendo o culto ao líder (Führerprinzip), a eugenia e um estado de partido único com controle absoluto sobre a sociedade. A economia era corporativista, subserviente aos objetivos de guerra do Estado.",
    politicians: [
      {
        name: "Adolf Hitler (Alemanha)",
        link: "https://pt.wikipedia.org/wiki/Adolf_Hitler",
      },
    ],
    books: [
      { title: "Minha Luta (Mein Kampf)", link: "" },
      { title: "Mito do Século XX (Alfred Rosenberg)", link: "" },
      {
        title:
          "('Ascensão e Queda do Terceiro Reich' de Shirer é essencial para entender)",
        link: "",
      },
    ],
  },
  {
    name: "Autocracia",
    stats: { econ: 50, dipl: 20, govt: 20, scty: 50 },
    desc: "A Autocracia é um sistema de governo onde o poder supremo está concentrado nas mãos de uma única pessoa, cujas decisões não estão sujeitas a restrições legais externas nem a mecanismos de controle popular. O autocrata governa sem o consentimento dos governados. A orientação econômica, social e diplomática pode variar enormemente dependendo dos caprichos e objetivos do líder, mas a característica definidora é a ausência de freios e contrapesos e a supressão da dissidência política.",
    politicians: [
      {
        name: "Rei Luís XIV (França - Absolutismo)",
        link: "https://pt.wikipedia.org/wiki/Lu%C3%ADs_XIV_de_Fran%C3%A7a",
      },
      {
        name: "Monarquia Saudita (Atual)",
        link: "https://pt.wikipedia.org/wiki/Ar%C3%A1bia_Saudita",
      },
    ],
    books: [
      { title: "O Príncipe (Maquiavel)", link: "" },
      { title: "(Biografias de autocratas específicos)", link: "" },
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
      },
      {
        name: "Plínio Salgado (Integralismo BR)",
        link: "https://pt.wikipedia.org/wiki/Pl%C3%ADnio_Salgado",
      },
      {
        name: "António de Oliveira Salazar (Estado Novo - PT)",
        link: "https://pt.wikipedia.org/wiki/Ant%C3%B3nio_de_Oliveira_Salazar",
      },
      {
        name: "Francisco Franco (Franquismo - ES)",
        link: "https://pt.wikipedia.org/wiki/Francisco_Franco",
      },
    ],
    books: [
      { title: "A Doutrina do Fascismo", link: "" },
      { title: "As Origens do Totalitarismo (Arendt)", link: "" },
      { title: "Anatomia do Fascismo (Robert Paxton)", link: "" },
    ],
  },
  {
    name: "Fascismo Capitalista",
    stats: { econ: 20, dipl: 20, govt: 20, scty: 20 },
    desc: "O Fascismo Capitalista é um termo que descreve regimes fascistas que, apesar de seu controle estatal e corporativismo, preservam a propriedade privada e se aliam fortemente aos interesses das grandes corporações e da elite capitalista. Nesse modelo, o Estado autoritário garante a ordem, suprime sindicatos e movimentos de esquerda, e dirige a economia em colaboração com os capitalistas para fortalecer a nação e seus objetivos militares, mantendo a estrutura de classes e o lucro privado.",
    politicians: [
      {
        name: "Augusto Pinochet (Chile)",
        link: "https://pt.wikipedia.org/wiki/Augusto_Pinochet",
      },
      {
        name: "Regime Militar Brasileiro (1964-1985)",
        link: "https://pt.wikipedia.org/wiki/Ditadura_militar_brasileira",
      },
    ],
    books: [{ title: "A Doutrina do Choque - Naomi Klein", link: "" }],
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
      },
      {
        name: "Gilberto Freyre (BR)",
        link: "https://pt.wikipedia.org/wiki/Gilberto_Freyre",
      },
      {
        name: "Roger Scruton",
        link: "https://pt.wikipedia.org/wiki/Roger_Scruton",
      },
      {
        name: "Winston Churchill",
        link: "https://pt.wikipedia.org/wiki/Winston_Churchill",
      },
      {
        name: "G. K. Chesterton",
        link: "https://pt.wikipedia.org/wiki/G._K._Chesterton",
      },
    ],
    books: [
      { title: "O Mínimo que Você Precisa Saber - Olavo de Carvalho", link: "" },
      { title: "Beleza - Roger Scruton", link: "" },
      { title: "Ortodoxia - G. K. Chesterton", link: "" },
      { title: "Compêndio da Doutrina Social da Igreja", link: "" },
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
      },
      {
        name: "Paulo Guedes (BR)",
        link: "https://pt.wikipedia.org/wiki/Paulo_Guedes",
      },
      {
        name: "Margaret Thatcher (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/Margaret_Thatcher",
      },
      {
        name: "Ronald Reagan (EUA)",
        link: "https://pt.wikipedia.org/wiki/Ronald_Reagan",
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
    politicians: [
      {
        name: "Rui Barbosa (BR)",
        link: "https://pt.wikipedia.org/wiki/Rui_Barbosa",
      },
      {
        name: "Joaquim Nabuco (BR)",
        link: "https://pt.wikipedia.org/wiki/Joaquim_Nabuco",
      },
      {
        name: "John Locke (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/John_Locke",
      },
      {
        name: "Adam Smith (Economista)",
        link: "https://pt.wikipedia.org/wiki/Adam_Smith",
      },
    ],
    books: [
      { title: "O Abolicionismo - Joaquim Nabuco", link: "" },
      { title: "A Riqueza das Nações - Adam Smith", link: "" },
      { title: "Cartas de Inglaterra - Rui Barbosa", link: "" },
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
      },
      {
        name: "Augusto Pinochet (Chile)",
        link: "https://pt.wikipedia.org/wiki/Augusto_Pinochet",
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
      },
      {
        name: "Park Chung-hee (Coreia do Sul)",
        link: "https://pt.wikipedia.org/wiki/Park_Chung-hee",
      },
    ],
    books: [{ title: "(Análises sobre economias dirigistas)", link: "" }],
  },
  {
    name: "Neoconservadorismo",
    stats: { econ: 20, dipl: 20, govt: 40, scty: 20 },
    desc: "O Neoconservadorismo é uma vertente do conservadorismo que se distingue por uma política externa assertiva, intervencionista e moralista. Defende a promoção da democracia e dos interesses nacionais no exterior, se necessário através do uso da força militar ('paz pela força'). Acreditam que os Estados Unidos, como única superpotência, têm a responsabilidade de liderar o mundo e confrontar regimes hostis. Domesticamente, são geralmente conservadores em questões econômicas e sociais.",
    politicians: [
      {
        name: "George W. Bush (EUA)",
        link: "https://pt.wikipedia.org/wiki/George_W._Bush",
      },
      {
        name: "Dick Cheney (EUA)",
        link: "https://pt.wikipedia.org/wiki/Dick_Cheney",
      },
      {
        name: "Paul Wolfowitz (EUA)",
        link: "https://pt.wikipedia.org/wiki/Paul_Wolfowitz",
      },
    ],
    books: [
      {
        title: "(Artigos de publicações como 'The Weekly Standard')",
        link: "",
      },
      { title: "(Análises sobre a Guerra do Iraque)", link: "" },
    ],
  },
  {
    name: "Fundamentalismo",
    stats: { econ: 20, dipl: 30, govt: 30, scty: 5 },
    desc: "O Fundamentalismo é uma postura que defende a adesão estrita e literal a um conjunto de crenças e princípios, geralmente de natureza religiosa. Rejeita interpretações modernas ou seculares e busca impor seus preceitos na sociedade, muitas vezes através da lei e do poder do Estado (teocracia). É caracterizado pela intolerância a visões de mundo diferentes e por uma visão reacionária da sociedade, buscando restaurar uma pureza original percebida na fé e nos costumes.",
    politicians: [
      {
        name: "Ruhollah Khomeini (Irã)",
        link: "https://pt.wikipedia.org/wiki/Ruhollah_Khomeini",
      },
    ],
    books: [
      { title: "As Batalhas de Deus (Gilles Kepel - análise)", link: "" },
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
      },
      {
        name: "Kevin Carson (Mutualista)",
        link: "https://en.wikipedia.org/wiki/Kevin_Carson",
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
    politicians: [
      {
        name: "Augusto Pinochet (Chile)",
        link: "https://pt.wikipedia.org/wiki/Augusto_Pinochet",
      },
      {
        name: "Jorge Rafael Videla (Argentina)",
        link: "https://pt.wikipedia.org/wiki/Jorge_Rafael_Videla",
      },
    ],
    books: [
      {
        title:
          "(Análises sobre a compatibilidade de totalitarismo e capitalismo)",
        link: "",
      },
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
      },
      {
        name: "David Friedman (Teórico)",
        link: "https://pt.wikipedia.org/wiki/David_D._Friedman",
      },
      {
        name: "Hans-Hermann Hoppe (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Hans-Hermann_Hoppe",
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
      },
      {
        name: "Guillaume Groen van Prinsterer",
        link: "https://pt.wikipedia.org/wiki/Guillaume_Groen_van_Prinsterer",
      },
      {
        name: "Herman Dooyeweerd",
        link: "https://pt.wikipedia.org/wiki/Herman_Dooyeweerd",
      },
      {
        name: "André Biéler",
        link: "https://pt.wikipedia.org/wiki/Andr%C3%A9_Bi%C3%A9ler",
      },
    ],
    books: [
      { title: "Palestras sobre o Calvinismo - Abraham Kuyper", link: "" },
      { title: "Raiz da Cultura - Herman Dooyeweerd", link: "" },
      { title: "O Pensamento Econômico e Social de Calvino - André Biéler", link: "" },
      { title: "No Ritmo do Reino - James K. A. Smith", link: "" },
    ],
  },
];

export function getMatchedIdeology(e: number, d: number, g: number, s: number): Ideology | null {
  let closestIdeology: Ideology | null = null;
  let minDistance = Infinity;

  for (const ideology of ideologies) {
    const distance = Math.sqrt(
      Math.pow(ideology.stats.econ - e, 2) +
      Math.pow(ideology.stats.dipl - d, 2) +
      Math.pow(ideology.stats.govt - g, 2) +
      Math.pow(ideology.stats.scty - s, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestIdeology = ideology;
    }
  }

  return closestIdeology;
}

