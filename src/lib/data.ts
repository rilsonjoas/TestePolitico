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
  politicians: Politician[];
  books: Book[];
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
    desc: "O Anarco-Comunismo é uma vertente do anarquismo que defende a abolição do Estado, do capitalismo, do trabalho assalariado e da propriedade privada, substituindo-os pela propriedade comum dos meios de produção. A visão é de uma sociedade horizontal composta por comunas autogeridas e associações voluntárias, onde os indivíduos são livres para satisfazer suas necessidades com base no princípio 'de cada um segundo sua capacidade, a cada um segundo suas necessidades'. É uma filosofia que combina um forte compromisso com a igualdade econômica (comunismo) com um igualmente forte compromisso com a liberdade individual (anarquismo).",
    politicians: [
      {
        name: "Piotr Kropotkin (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Piotr_Kropotkin",
      },
      {
        name: "Errico Malatesta (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Errico_Malatesta",
      },
      {
        name: "Nestor Makhno (Líder Revolucionário)",
        link: "https://pt.wikipedia.org/wiki/Nestor_Makhno",
      },
    ],
    books: [
      { title: "A Conquista do Pão", link: "" },
      { title: "Mutualismo: Um Fator de Evolução", link: "" },
      { title: "Anarquismo e Outros Ensaios", link: "" },
      { title: "Campos, Fábricas e Oficinas", link: "" },
    ],
  },
  {
    name: "Comunismo Libertário",
    stats: { econ: 100, dipl: 70, govt: 80, scty: 80 },
    desc: "O Comunismo Libertário compartilha muitas semelhanças com o Anarco-Comunismo, defendendo uma sociedade sem Estado e sem classes. No entanto, pode haver uma maior ênfase em estruturas federais e democráticas para coordenar as comunas. A ideologia se opõe a todas as formas de autoridade coercitiva e hierarquia, seja ela estatal, capitalista ou social. O objetivo é criar uma sociedade onde a liberdade individual e a igualdade social sejam mutuamente reforçadas e interdependentes, frequentemente incorporando pautas ecológicas e municipalistas.",
    politicians: [
      {
        name: "Murray Bookchin (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Murray_Bookchin",
      },
      {
        name: "Daniel Guérin (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Daniel_Gu%C3%A9rin",
      },
    ],
    books: [
      { title: "A Ecologia da Liberdade", link: "" },
      { title: "Anarquismo: Da Teoria à Prática", link: "" },
      { title: "Post-Scarcity Anarchism", link: "" },
    ],
  },
  {
    name: "Trotskismo",
    stats: { econ: 100, dipl: 100, govt: 60, scty: 80 },
    desc: "O Trotskismo é uma corrente do marxismo desenvolvida por Leon Trotsky. Sua principal característica é a teoria da 'revolução permanente', que argumenta que a revolução socialista deve ser um processo contínuo e mundial, não confinado a um único país. Trotskistas são críticos ferrenhos do stalinismo, que acusam de ter traído a revolução ao criar uma burocracia totalitária e contrarrevolucionária. Defendem a democracia operária, com controle dos trabalhadores sobre o Estado e a economia, e são internacionalistas convictos, promovendo a solidariedade e a união da classe trabalhadora global.",
    politicians: [
      {
        name: "Leon Trotsky (Revolucionário)",
        link: "https://pt.wikipedia.org/wiki/Leon_Trotsky",
      },
      {
        name: "Ernest Mandel (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Ernest_Mandel",
      },
    ],
    books: [
      { title: "A Revolução Permanente", link: "" },
      { title: "História da Revolução Russa", link: "" },
      { title: "A Revolução Traída", link: "" },
      { title: "Terrorismo e Comunismo", link: "" },
    ],
  },
  {
    name: "Marxismo",
    stats: { econ: 100, dipl: 70, govt: 40, scty: 80 },
    desc: "O Marxismo é um método de análise socioeconômica baseado nas obras de Karl Marx e Friedrich Engels. Ele postula que a história humana é uma sucessão de lutas de classes e que o capitalismo é um sistema inerentemente explorador. Busca a superação do capitalismo através da revolução proletária, visando uma sociedade comunista final: sem classes, sem Estado e com propriedade comum dos meios de produção. No período de transição, propõe a 'ditadura do proletariado' para consolidar o poder dos trabalhadores. É uma ideologia fundamentalmente internacionalista e progressista.",
    politicians: [
      {
        name: "Karl Marx (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Karl_Marx",
      },
      {
        name: "Friedrich Engels (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Friedrich_Engels",
      },
      {
        name: "Rosa Luxemburgo (Revolucionária)",
        link: "https://pt.wikipedia.org/wiki/Rosa_Luxemburgo",
      },
    ],
    books: [
      { title: "O Manifesto Comunista", link: "" },
      { title: "O Capital", link: "" },
      { title: "Reforma ou Revolução?", link: "" },
    ],
  },
  {
    name: "De Leonismo",
    stats: { econ: 100, dipl: 30, govt: 30, scty: 80 },
    desc: "O De Leonismo é uma forma de marxismo sindicalista desenvolvida por Daniel De Leon. Ele defende o estabelecimento de uma república socialista industrial, onde o governo seria formado por sindicatos organizados por setor. A estratégia combina a luta política, através de um partido socialista, com a luta econômica, por meio de sindicatos industriais revolucionários. O objetivo é alcançar o socialismo (propriedade comum) através de uma transformação radical da sociedade, com uma estrutura de poder centralizada na transição, mas focada na nação e socialmente progressista.",
    politicians: [
      {
        name: "Daniel De Leon (Teórico/Ativista)",
        link: "https://pt.wikipedia.org/wiki/Daniel_De_Leon",
      },
    ],
    books: [
      { title: "Reform or Revolution?", link: "" },
      { title: "Socialist Reconstruction of Society", link: "" },
    ],
  },
  {
    name: "Leninismo",
    stats: { econ: 100, dipl: 40, govt: 20, scty: 70 },
    desc: "O Leninismo é um desenvolvimento da teoria marxista por Vladimir Lênin, que adapta o marxismo às condições da Rússia no início do século XX. Sua principal contribuição é a ênfase na necessidade de um 'partido de vanguarda', composto por revolucionários profissionais, para liderar a classe trabalhadora na tomada do poder e estabelecer uma ditadura do proletariado. O Leninismo é pragmático e focado na estratégia revolucionária, defendendo o centralismo democrático dentro do partido e um Estado forte na fase de transição para o comunismo.",
    politicians: [
      {
        name: "Vladimir Lênin (Revolucionário)",
        link: "https://pt.wikipedia.org/wiki/Vladimir_Lenin",
      },
    ],
    books: [
      { title: "O Estado e a Revolução", link: "" },
      { title: "Que Fazer?", link: "" },
      { title: "Imperialismo, Fase Superior do Capitalismo", link: "" },
    ],
  },
  {
    name: "Stalinismo/Maoismo",
    stats: { econ: 100, dipl: 20, govt: 0, scty: 60 },
    desc: "Stalinismo e Maoismo são ideologias totalitárias baseadas no Marxismo-Leninismo. O Stalinismo, sob Josef Stalin, se caracteriza pelo controle estatal absoluto sobre a economia (planos quinquenais), industrialização forçada, coletivização da agricultura, culto extremo à personalidade, e repressão em massa através de expurgos e gulags. O Maoismo, de Mao Tsé-Tung, adapta o leninismo à China, enfatizando o campesinato como força revolucionária, a guerra popular prolongada e a 'revolução cultural'. Ambas as ideologias são marcadas por um autoritarismo extremo, nacionalismo ('socialismo em um só país') e supressão total da dissidência.",
    politicians: [
      {
        name: "Josef Stalin (URSS)",
        link: "https://pt.wikipedia.org/wiki/Josef_Stalin",
      },
      {
        name: "Mao Tsé-Tung (China)",
        link: "https://pt.wikipedia.org/wiki/Mao_Ts%C3%A9-Tung",
      },
    ],
    books: [
      { title: "Fundamentos do Leninismo", link: "" },
      { title: "O Livro Vermelho", link: "" },
      {
        title: "(Textos críticos como 'Arquipélago Gulag' de Soljenítsin)",
        link: "",
      },
    ],
  },
  {
    name: "Comunismo Religioso",
    stats: { econ: 100, dipl: 50, govt: 30, scty: 30 },
    desc: "O Comunismo Religioso é uma forma de comunismo que encontra suas bases em preceitos religiosos, em vez do materialismo histórico marxista. Defende que os princípios de partilha, vida comunitária e igualdade radical estão presentes em textos sagrados (como nos Atos dos Apóstolos do Cristianismo). Propõe uma sociedade com propriedade comum e ausência de classes, motivada por ideais espirituais e morais. Tende a ser socialmente tradicionalista e pode variar em sua visão sobre a estrutura de poder, mas geralmente se opõe ao Estado secular.",
    politicians: [
      {
        name: "Thomas Müntzer (Teólogo/Rebelde)",
        link: "https://pt.wikipedia.org/wiki/Thomas_M%C3%BCntzer",
      },
      {
        name: "Gerrard Winstanley (Digger)",
        link: "https://pt.wikipedia.org/wiki/Gerrard_Winstanley",
      },
    ],
    books: [
      { title: "A Lei da Liberdade", link: "" },
    ],
  },
  {
    name: "Socialismo de Estado",
    stats: { econ: 80, dipl: 30, govt: 30, scty: 70 },
    desc: "O Socialismo de Estado é uma ideologia que defende a propriedade e o controle estatal sobre os meios de produção e a economia. Diferente de vertentes mais libertárias, vê o aparato estatal como o principal agente para implementar o socialismo. Mantém uma estrutura de governo centralizada e burocrática para administrar a economia planificada e os serviços públicos. Geralmente é nacionalista, focando no desenvolvimento do próprio país, e pode ser socialmente progressista, embora com controle estatal sobre a vida civil.",
    politicians: [
      {
        name: "(Líderes de regimes de partido único não-totalitários)",
        link: "",
      },
    ],
    books: [
    ],
  },
  {
    name: "Socialismo Teocrático",
    stats: { econ: 80, dipl: 50, govt: 30, scty: 20 },
    desc: "O Socialismo Teocrático combina princípios econômicos socialistas, como a propriedade estatal ou coletiva e a forte regulação, com um sistema de governo teocrático, onde as leis e a autoridade política derivam de preceitos religiosos e são exercidas por uma liderança clerical. Busca criar uma sociedade economicamente igualitária que adere estritamente a códigos morais e sociais tradicionais ditados pela religião dominante. É uma fusão de autoritarismo religioso com planejamento econômico centralizado.",
    politicians: [
      {
        name: "Ali Shariati (Influência no Irã)",
        link: "https://pt.wikipedia.org/wiki/Ali_Shariati",
      },
    ],
    books: [
      {
        title:
      "",
        link: "",
      },
    ],
  },
  {
    name: "Socialismo Religioso",
    stats: { econ: 80, dipl: 50, govt: 70, scty: 20 },
    desc: "O Socialismo Religioso busca conciliar os princípios socialistas de justiça social, igualdade e cooperação com os valores e ensinamentos de uma determinada fé. Diferente do socialismo teocrático, geralmente opera dentro de sistemas democráticos e não busca um Estado clerical. Movimentos como a Teologia da Libertação no Catolicismo são exemplos, interpretando a fé como uma 'opção preferencial pelos pobres' e defendendo reformas estruturais para combater a desigualdade. Tende a ser economicamente de esquerda, mas socialmente mais tradicionalista que o socialismo secular.",
    politicians: [
      {
        name: "Frei Betto (Teólogo da Libertação)",
        link: "https://pt.wikipedia.org/wiki/Frei_Betto",
      },
      {
        name: "Leonardo Boff (Teólogo da Libertação)",
        link: "https://pt.wikipedia.org/wiki/Leonardo_Boff",
      },
      {
        name: "Martin Luther King Jr. (Associado a alguns aspectos)",
        link: "https://pt.wikipedia.org/wiki/Martin_Luther_King_Jr.",
      },
    ],
    books: [
      { title: "Cristianismo e a Luta de Classes", link: "" },
      { title: "Um Testamento de Esperança", link: "" },
    ],
  },
  {
    name: "Socialismo Democrático",
    stats: { econ: 80, dipl: 50, govt: 50, scty: 80 },
    desc: "O Socialismo Democrático é uma ideologia que visa alcançar uma sociedade socialista através de meios democráticos e graduais, em vez de uma revolução violenta. Seus defensores participam do processo eleitoral para implementar reformas que aumentem o controle público e dos trabalhadores sobre a economia. Defendem a propriedade social ou estatal de setores estratégicos, um robusto estado de bem-estar social, e a expansão da democracia para a esfera econômica. Rejeitam os modelos autoritários associados ao comunismo do século XX.",
    politicians: [
      {
        name: "Bernie Sanders (EUA)",
        link: "https://pt.wikipedia.org/wiki/Bernie_Sanders",
      },
      {
        name: "Salvador Allende (Chile)",
        link: "https://pt.wikipedia.org/wiki/Salvador_Allende",
      },
      {
        name: "Evo Morales (Bolívia)",
        link: "https://pt.wikipedia.org/wiki/Evo_Morales",
      },
    ],
    books: [
      { title: "O Caminho para o Poder (Karl Kautsky)", link: "" },
      { title: "Socialismo: Passado e Futuro (Michael Harrington)", link: "" },
    ],
  },
  {
    name: "Socialismo Revolucionário",
    stats: { econ: 80, dipl: 20, govt: 50, scty: 70 },
    desc: "O Socialismo Revolucionário abrange correntes que acreditam que o socialismo só pode ser alcançado através da derrubada fundamental do sistema capitalista e do Estado burguês. Rejeita o reformismo e a via parlamentar como insuficientes para superar as estruturas de poder existentes. Acredita que a classe dominante nunca cederá seu poder pacificamente, tornando a revolução uma necessidade. A visão do Estado pós-revolucionário pode variar, mas a ênfase está na ruptura, não na transição gradual.",
    politicians: [
      {
        name: "Che Guevara (Revolucionário)",
        link: "https://pt.wikipedia.org/wiki/Che_Guevara",
      },
      {
        name: "Subcomandante Marcos (Zapatista)",
        link: "https://pt.wikipedia.org/wiki/Subcomandante_Marcos",
      },
    ],
    books: [
      { title: "O Estado e a Revolução (Lênin)", link: "" },
      { title: "Guerra de Guerrilhas (Che Guevara)", link: "" },
    ],
  },
  {
    name: "Socialismo Libertário",
    stats: { econ: 80, dipl: 80, govt: 80, scty: 80 },
    desc: "O Socialismo Libertário é uma ampla categoria de filosofias políticas que promovem uma sociedade socialista sem um Estado centralizado e autoritário. Prioriza tanto a igualdade econômica quanto a liberdade individual, opondo-se a todas as formas de hierarquia coercitiva, sejam elas do Estado ou do capital. Defende a autogestão dos trabalhadores, a democracia direta e a descentralização do poder político. Inclui correntes como o anarquismo social, o municipalismo libertário e o sindicalismo.",
    politicians: [
      {
        name: "Noam Chomsky (Intelectual)",
        link: "https://pt.wikipedia.org/wiki/Noam_Chomsky",
      },
      {
        name: "Howard Zinn (Historiador/Ativista)",
        link: "https://pt.wikipedia.org/wiki/Howard_Zinn",
      },
    ],
    books: [
      { title: "A People's History of the United States", link: "" },
      { title: "Sobre Anarquismo", link: "" },
    ],
  },
  {
    name: "Anarco-Sindicalismo",
    stats: { econ: 80, dipl: 50, govt: 100, scty: 80 },
    desc: "O Anarco-Sindicalismo é uma vertente do anarquismo que vê os sindicatos revolucionários como o meio para derrubar o capitalismo e o Estado, e como a base para a organização da futura sociedade. Os trabalhadores, organizados por indústria, tomariam controle dos meios de produção através de uma 'greve geral expropriadora'. A sociedade pós-revolucionária seria uma federação de coletivos de trabalhadores autogeridos, eliminando a necessidade de um governo central. É uma estratégia pragmática para alcançar uma sociedade anarquista.",
    politicians: [
      {
        name: "Rudolf Rocker (Teórico)",
        link: "https://pt.wikipedia.org/wiki/Rudolf_Rocker",
      },
      {
        name: "Buenaventura Durruti (Sindicalista)",
        link: "https://pt.wikipedia.org/wiki/Buenaventura_Durruti",
      },
    ],
    books: [
      { title: "Anarco-Sindicalismo: Teoria e Prática", link: "" },
      { title: "Homage to Catalonia (George Orwell)", link: "" },
    ],
  },
  {
    name: "Populismo de Esquerda",
    stats: { econ: 60, dipl: 40, govt: 30, scty: 70 },
    desc: "O Populismo de Esquerda é uma estratégia política que constrói um antagonismo entre 'o povo' (a maioria trabalhadora) e 'a elite' (uma oligarquia corrupta e poderosa). Defende políticas de redistribuição de renda, fortalecimento do Estado de bem-estar, nacionalização de setores estratégicos e maior soberania nacional. Frequentemente é liderado por figuras carismáticas que buscam mobilizar as massas e pode ter tendências centralizadoras de poder para implementar sua agenda contra a oposição estabelecida.",
    politicians: [
      {
        name: "Hugo Chávez (Venezuela)",
        link: "https://pt.wikipedia.org/wiki/Hugo_Ch%C3%A1vez",
      },
      {
        name: "Jean-Luc Mélenchon (França)",
        link: "https://pt.wikipedia.org/wiki/Jean-Luc_M%C3%A9lenchon",
      },
    ],
    books: [
      { title: "A Razão Populista (Ernesto Laclau)", link: "" },
      { title: "(Manifestos e discursos de cada movimento)", link: "" },
    ],
  },
  {
    name: "Distributismo Teocrático",
    stats: { econ: 60, dipl: 40, govt: 30, scty: 20 },
    desc: "O Distributismo Teocrático combina a filosofia econômica do distributismo com um governo teocrático. Economicamente, busca uma ampla distribuição da propriedade produtiva, favorecendo pequenas empresas e cooperativas, baseada em doutrinas sociais religiosas (como as encíclicas papais). Politicamente, defende que as leis e a governança da sociedade devem ser diretamente guiadas por princípios e autoridades religiosas, criando um Estado onde a fé e a política são inseparáveis e a moralidade tradicional é imposta por lei.",
    politicians: [
      {
        name: "(Principalmente teóricos de movimentos católicos sociais)",
        link: "",
      },
    ],
    books: [
      { title: "Rerum Novarum (Encíclica Papal)", link: "" },
      { title: "Quadragesimo Anno (Encíclica Papal)", link: "" },
    ],
  },
  {
    name: "Distributismo",
    stats: { econ: 60, dipl: 50, govt: 50, scty: 20 },
    desc: "O Distributismo é uma 'terceira via' econômica, distinta tanto do capitalismo quanto do socialismo. Sua tese central é que a propriedade dos meios de produção deve ser distribuída o mais amplamente possível entre a população, em vez de ser concentrada nas mãos do Estado ou de poucos capitalistas. Favorece a pequena propriedade, a agricultura familiar, as cooperativas e as guildas de artesãos. Geralmente é baseado em valores comunitários e tradicionais, com forte influência da doutrina social católica.",
    politicians: [
      {
        name: "G. K. Chesterton (Escritor/Teórico)",
        link: "https://pt.wikipedia.org/wiki/G._K._Chesterton",
      },
      {
        name: "Hilaire Belloc (Escritor/Teórico)",
        link: "https://pt.wikipedia.org/wiki/Hilaire_Belloc",
      },
    ],
    books: [
      { title: "O Que Há de Errado com o Mundo", link: "" },
      { title: "O Estado Servil", link: "" },
    ],
  },
  {
    name: "Liberalismo Social",
    stats: { econ: 60, dipl: 60, govt: 60, scty: 80 },
    desc: "O Liberalismo Social, também conhecido como liberalismo de esquerda, é uma ideologia que acredita que a liberdade individual só pode ser plenamente alcançada sob condições sociais e econômicas justas. Combina o apoio a uma economia de mercado com a necessidade de intervenção governamental para corrigir falhas de mercado, reduzir a desigualdade e garantir a igualdade de oportunidades através de um forte estado de bem-estar. Defende firmemente os direitos civis e liberdades individuais, sendo socialmente progressista.",
    politicians: [
      {
        name: "John Rawls (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/John_Rawls",
      },
      {
        name: "William Beveridge (Economista)",
        link: "https://pt.wikipedia.org/wiki/William_Beveridge",
      },
      {
        name: "Franklin D. Roosevelt (EUA)",
        link: "https://pt.wikipedia.org/wiki/Franklin_D._Roosevelt",
      },
    ],
    books: [
      { title: "Uma Teoria da Justiça", link: "" },
      { title: "Relatório Beveridge", link: "" },
      { title: "Liberalism (L.T. Hobhouse)", link: "" },
    ],
  },
  {
    name: "Democracia Cristã",
    stats: { econ: 60, dipl: 60, govt: 50, scty: 30 },
    desc: "A Democracia Cristã é uma ideologia política que busca aplicar princípios cristãos à esfera pública. Opera dentro de um quadro democrático e apoia uma 'economia social de mercado', que combina a livre iniciativa com a responsabilidade social e um estado de bem-estar para proteger os vulneráveis. Socialmente, tende a ser conservadora, enfatizando valores como a família tradicional e a comunidade. Em política externa, é geralmente favorável à cooperação internacional e à integração, como a União Europeia.",
    politicians: [
      {
        name: "Konrad Adenauer (Alemanha)",
        link: "https://pt.wikipedia.org/wiki/Konrad_Adenauer",
      },
      {
        name: "Alcide De Gasperi (Itália)",
        link: "https://pt.wikipedia.org/wiki/Alcide_De_Gasperi",
      },
      {
        name: "Angela Merkel (Alemanha)",
        link: "https://pt.wikipedia.org/wiki/Angela_Merkel",
      },
    ],
    books: [
      { title: "(Encíclicas sociais católicas como Rerum Novarum)", link: "" },
    ],
  },
  {
    name: "Social Democracia",
    stats: { econ: 60, dipl: 70, govt: 60, scty: 80 },
    desc: "A Social Democracia é uma ideologia que apoia intervenções econômicas e sociais para promover a justiça social dentro do quadro de uma economia capitalista. É caracterizada por um compromisso com a democracia representativa, um robusto estado de bem-estar social universal (saúde, educação), regulação do mercado de trabalho e um sistema de negociação coletiva entre sindicatos e empregadores. Busca 'humanizar' o capitalismo, garantindo que seus benefícios sejam amplamente compartilhados pela sociedade.",
    politicians: [
      {
        name: "Olof Palme (Suécia)",
        link: "https://pt.wikipedia.org/wiki/Olof_Palme",
      },
      {
        name: "Willy Brandt (Alemanha Ocidental)",
        link: "https://pt.wikipedia.org/wiki/Willy_Brandt",
      },
      {
        name: "Clement Attlee (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/Clement_Attlee",
      },
    ],
    books: [
      { title: "O Futuro do Socialismo (Anthony Crosland)", link: "" },
      { title: "Capitalismo, Socialismo e Democracia (Schumpeter)", link: "" },
    ],
  },
  {
    name: "Progressismo",
    stats: { econ: 60, dipl: 80, govt: 60, scty: 100 },
    desc: "O Progressismo é uma filosofia política que acredita no progresso social e na melhoria da condição humana através da reforma social, da ciência e da ação governamental. Opõe-se ao status quo e busca combater problemas como a desigualdade econômica, a discriminação e a degradação ambiental. Defende a expansão dos direitos civis, a regulação da economia para o bem comum e o investimento em serviços públicos. É uma ideologia fundamentalmente otimista sobre a capacidade da humanidade de resolver seus problemas coletivamente.",
    politicians: [
      {
        name: "Theodore Roosevelt (EUA)",
        link: "https://pt.wikipedia.org/wiki/Theodore_Roosevelt",
      },
      {
        name: "Woodrow Wilson (EUA)",
        link: "https://pt.wikipedia.org/wiki/Woodrow_Wilson",
      },
      {
        name: "John Dewey (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/John_Dewey",
      },
    ],
    books: [
      { title: "A Promessa da Vida Americana (Herbert Croly)", link: "" },
      { title: "Democracia e Educação (John Dewey)", link: "" },
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
        name: "(Líderes de regimes totalitários não-fascistas ou comunistas)",
        link: "",
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
      { name: "(Personagens de ficção ou figuras hipotéticas)", link: "" },
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
    politicians: [{ name: "(Movimentos tecnocráticos históricos)", link: "" }],
    books: [
      { title: "The Technocrats: Prophets of Automation (Elsner)", link: "" },
      { title: "(Literatura sobre governança por especialistas)", link: "" },
    ],
  },
  {
    name: "Centrista",
    stats: { econ: 50, dipl: 50, govt: 50, scty: 50 },
    desc: "O Centrismo é uma posição política que busca um equilíbrio pragmático, rejeitando os extremos do espectro político de esquerda e direita. Os centristas tendem a adotar uma abordagem moderada, combinando políticas de diferentes ideologias conforme a situação. Favorecem a reforma gradual em vez de mudanças radicais, valorizam o consenso e a estabilidade. Podem apoiar uma economia de mercado com uma rede de segurança social, liberdades individuais com responsabilidade cívica, e uma política externa que equilibra interesses nacionais e cooperação internacional.",
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
      { title: "Liberalism and its Discontents (Francis Fukuyama)", link: "" }
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
    politicians: [
      {
        name: "Donald Trump (EUA)",
        link: "https://pt.wikipedia.org/wiki/Donald_Trump",
      },
      {
        name: "Marine Le Pen (França)",
        link: "https://pt.wikipedia.org/wiki/Marine_Le_Pen",
      },
      {
        name: "Viktor Orbán (Hungria)",
        link: "https://pt.wikipedia.org/wiki/Viktor_Orb%C3%A1n",
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
    books: [
      { title: "O Conservadorismo (Michael Oakeshott)", link: "" },
    ],
  },
  {
    name: "Reacionário",
    stats: { econ: 40, dipl: 40, govt: 40, scty: 10 },
    desc: "O Reacionarismo é uma postura política que se opõe radicalmente às mudanças sociais, políticas e econômicas da modernidade (como a Revolução Francesa ou o Iluminismo) e busca restaurar uma ordem social anterior, considerada superior. Idealiza o passado, defendendo estruturas hierárquicas, monarquia, aristocracia e a autoridade da religião. Rejeita conceitos como democracia, igualdade e liberalismo, vendo-os como fontes de decadência e desordem.",
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
    books: [
      { title: "Progresso e Pobreza", link: "" },
    ],
  },
  {
    name: "Libertarianismo",
    stats: { econ: 40, dipl: 60, govt: 80, scty: 60 },
    desc: "O Libertarianismo é uma filosofia política que prioriza a liberdade individual como seu valor fundamental. Defende a maximização da autonomia e da liberdade de escolha, enfatizando a soberania do indivíduo. Advoga por um governo mínimo ('Estado mínimo'), cuja única função legítima é proteger os direitos individuais contra a força e a fraude. Apoia o livre mercado, a propriedade privada e as liberdades civis, e geralmente promove uma política externa não-intervencionista.",
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
        name: "(Monarcas absolutistas históricos, ditadores modernos)",
        link: "",
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
    politicians: [
      {
        name: "Benito Mussolini (Itália)",
        link: "https://pt.wikipedia.org/wiki/Benito_Mussolini",
      },
      {
        name: "Francisco Franco (Espanha)",
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
        name: "(Interpretações de Hitler ou Pinochet podem se encaixar aqui)",
        link: "",
      },
    ],
    books: [{ title: "(Análises econômicas de regimes fascistas)", link: "" }],
  },
  {
    name: "Conservadorismo",
    stats: { econ: 30, dipl: 40, govt: 40, scty: 20 },
    desc: "O Conservadorismo é uma filosofia política que prioriza a preservação das instituições e tradições sociais estabelecidas, acreditando que elas representam a sabedoria acumulada de gerações. Apoia a mudança gradual e orgânica em vez de reformas radicais. Valoriza a ordem, a autoridade, a propriedade privada, a religião e a família como pilares da estabilidade social. Economicamente, favorece o livre mercado com prudência fiscal, e politicamente, defende um governo forte mas limitado.",
    politicians: [
      {
        name: "Edmund Burke (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Edmund_Burke",
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
      { title: "Reflexões sobre a Revolução na França", link: "" },
      { title: "A Política da Prudência", link: "" },
      { title: "O Caminho da Servidão", link: "" },
    ],
  },
  {
    name: "Neoliberalismo",
    stats: { econ: 30, dipl: 30, govt: 50, scty: 60 },
    desc: "O Neoliberalismo é uma filosofia política e econômica que ressurgiu no final do século XX, enfatizando o livre mercado como o principal mecanismo para o progresso econômico. Suas políticas características incluem privatização de empresas estatais, desregulamentação da economia, liberalização do comércio e do capital, e redução dos gastos públicos e dos impostos. Acredita que a redução da intervenção estatal libera as forças do mercado, gerando maior eficiência e prosperidade.",
    politicians: [
      {
        name: "Margaret Thatcher (Reino Unido)",
        link: "https://pt.wikipedia.org/wiki/Margaret_Thatcher",
      },
      {
        name: "Ronald Reagan (EUA)",
        link: "https://pt.wikipedia.org/wiki/Ronald_Reagan",
      },
      {
        name: "Augusto Pinochet (Chile)",
        link: "https://pt.wikipedia.org/wiki/Augusto_Pinochet",
      },
    ],
    books: [
      { title: "O Caminho da Servidão (Hayek)", link: "" },
      { title: "Capitalismo e Liberdade (Milton Friedman)", link: "" },
      { title: "A Doutrina do Choque (Naomi Klein - crítica)", link: "" },
    ],
  },
  {
    name: "Liberalismo Clássico",
    stats: { econ: 30, dipl: 60, govt: 60, scty: 80 },
    desc: "O Liberalismo Clássico é a ideologia que floresceu nos séculos XVIII e XIX, baseada nas ideias de filósofos como John Locke e economistas como Adam Smith. Enfatiza a liberdade individual, os direitos naturais (vida, liberdade e propriedade), o governo limitado e constitucional (Estado de Direito), e o livre mercado (laissez-faire). Acredita que a sociedade prospera quando os indivíduos são livres para perseguir seus próprios interesses com mínima interferência do Estado.",
    politicians: [
      {
        name: "John Locke (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/John_Locke",
      },
      {
        name: "Adam Smith (Economista)",
        link: "https://pt.wikipedia.org/wiki/Adam_Smith",
      },
      {
        name: "Montesquieu (Filósofo)",
        link: "https://pt.wikipedia.org/wiki/Montesquieu",
      },
    ],
    books: [
      { title: "Dois Tratados sobre o Governo", link: "" },
      { title: "A Riqueza das Nações", link: "" },
      { title: "O Espírito das Leis", link: "" },
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
        name: "(Líderes de países com forte setor estatal como a França)",
        link: "",
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
        name: "(Interpretações de regimes como o Chile sob Pinochet)",
        link: "",
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
    name: "Ultracapitalismo",
    stats: { econ: 0, dipl: 40, govt: 50, scty: 50 },
    desc: "O Ultracapitalismo representa a defesa da forma mais pura e desinibida de capitalismo, onde a lógica do mercado e a busca pelo lucro permeiam todas as esferas da vida. Defende a minimização extrema de qualquer barreira ao capital, como regulamentações, impostos, fronteiras e considerações éticas ou ambientais. É uma ideologia focada unicamente na eficiência do mercado, independentemente das consequências sociais.",
    politicians: [
      { name: "(Figuras associadas a desregulamentação extrema)", link: "" },
    ],
    books: [
    ],
  },
  {
    name: "Anarco-Capitalismo",
    stats: { econ: 0, dipl: 50, govt: 100, scty: 50 },
    desc: "O Anarco-Capitalismo é uma filosofia política que defende a eliminação completa do Estado e a organização da sociedade inteiramente através do livre mercado. Acredita que todas as funções atualmente desempenhadas pelo Estado, incluindo a segurança, a justiça e a defesa, poderiam ser fornecidas de forma mais eficiente e ética por agências privadas em concorrência. Baseia-se no princípio de não-agressão, que proíbe o início de força contra pessoas ou sua propriedade.",
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
];
