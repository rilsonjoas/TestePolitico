export type QuestionContext =
  | "estado"
  | "mercado"
  | "internacional"
  | "individual"
  | "ambiente"
  | "costumes";

export interface Question {
  question: string;
  example?: string;
  context?: QuestionContext;
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

export const politicalDictionary: Record<string, string> = {
  "mais-valia": "A diferença entre o valor que o trabalhador produz e o salário que ele realmente recebe.",
  "fetichismo da mercadoria": "Quando as pessoas passam a valorizar um produto mais pelo seu status ou marca do que pelo trabalho humano por trás dele.",
  "materialismo histórico": "A ideia de que a economia e as condições materiais de vida são o que realmente moldam a história e a sociedade.",
  "ditadura do proletariado": "Uma fase de transição onde a classe trabalhadora assume o controle político para reorganizar a sociedade.",
  "centralismo democrático": "Um método onde as decisões são debatidas livremente internamente, mas, uma vez decididas, todos devem agir juntos.",
  "laissez-faire": "Uma expressão que significa 'deixe fazer', defendendo que o governo não deve interferir em nada na economia.",
  "welfare state": "Estado de Bem-Estar Social: quando o governo garante serviços básicos como saúde e educação para todos os cidadãos.",
  "estatismo": "A crença de que o Estado deve ter um papel central e forte no controle da economia e da sociedade.",
  "corporativismo": "Um sistema onde o governo organiza a sociedade em grupos de interesses (como sindicatos e associações patronais) sob seu controle.",
  "privatização": "Quando o governo vende empresas ou serviços públicos para empresas particulares.",
  "desregulamentação": "A redução ou retirada de leis e regras do governo sobre os negócios e a economia.",
  "secularismo": "A separação total entre o governo/estado e as religiões, garantindo que as leis não se baseiem em crenças religiosas.",
  "pluralismo": "A aceitação e convivência de diferentes opiniões, culturas e grupos dentro de uma mesma sociedade.",
  "multiculturalismo": "O reconhecimento e a valorização de várias culturas diferentes convivendo pacificamente no mesmo país.",
  "imperialismo": "Quando países poderosos usam sua força econômica ou militar para dominar e influenciar países mais fracos.",
  "soberania": "O poder absoluto de um país de governar a si mesmo e tomar suas próprias decisões sem interferência externa.",
  "automação": "O uso de máquinas, robôs e softwares para realizar trabalhos que antes eram feitos por humanos.",
  "libertarianismo": "Uma filosofia que defende a liberdade individual máxima e a interferência mínima do governo na vida e na economia.",
  "autoritarismo": "Um sistema de governo que exige obediência cega à autoridade, limitando as liberdades individuais e a oposição.",
  "totalitarismo": "Um tipo extremo de governo que tenta controlar absolutamente todos os aspectos da vida pública e privada das pessoas.",
  "reacionário": "Alguém que deseja voltar a um estado social ou político do passado, opondo-se a mudanças e ao progresso.",
  "progressismo": "A crença de que a sociedade deve evoluir constantemente através de reformas sociais, avanços científicos e igualdade.",
  "conservadorismo": "Uma visão que valoriza a preservação das tradições, da ordem social e das instituições que funcionaram ao longo do tempo.",
  "liberalismo": "Uma corrente que defende a liberdade individual, a democracia e, geralmente, a economia de mercado com menos peso do governo."
};

export const questions: Question[] = [
  {
    question:
      "A concorrência entre empresas, sem intervenção excessiva do Estado, é o principal mecanismo que reduz preços, aumenta qualidade e estimula inovação em uma economia.",
    example:
      "mercados onde várias empresas competem pelo mesmo cliente — como o de smartphones ou de transporte por aplicativo — tendem a oferecer produtos melhores a preços menores do que monopólios ou setores controlados pelo governo.",
    context: "mercado",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "O governo deve criar órgãos e leis para fiscalizar empresas e proteger os consumidores de abusos.",
    example:
      "impedir que empresas de energia, internet ou alimentos cobrem preços abusivos quando não existe concorrência real.",
    context: "mercado",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "O governo deve interferir o mínimo possível na economia e deixar as empresas e pessoas tomarem suas próprias decisões econômicas.",
    example:
      "reduzir impostos, simplificar licenças para abrir negócios e eliminar controles de preço fixados pelo Estado.",
    context: "mercado",
    effect: { econ: -20, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "O governo deve manter seus gastos equilibrados com o que arrecada em impostos, mesmo que para isso precise cortar programas sociais, para evitar dívidas que prejudiquem todos no futuro.",
    example:
      "gastar mais do que se arrecada leva à inflação e ao calote da dívida pública, que prejudicam especialmente os mais pobres.",
    context: "estado",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "O Estado deve ser o principal financiador da pesquisa científica, porque empresas privadas costumam investir apenas no que dá lucro rápido, ignorando pesquisas de impacto social.",
    example:
      "estudos sobre doenças raras, energias limpas ou prevenção de pandemias raramente atraem investimento privado suficiente.",
    context: "estado",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "O governo deve cobrar impostos extras sobre produtos importados para proteger as empresas e empregos nacionais da concorrência estrangeira.",
    example:
      "sobretaxar carros, calçados ou alimentos importados para que as fábricas locais consigam competir em preço.",
    context: "mercado",
    effect: { econ: 5, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "O setor privado, movido pela concorrência e pelo lucro, tende a entregar serviços de saúde, moradia e alimentação com mais eficiência e qualidade do que programas administrados pelo Estado.",
    example:
      "planos de saúde privados em concorrência costumam oferecer atendimento mais rápido e hospitais mais bem equipados do que o sistema público em muitos países.",
    context: "mercado",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Programas do governo que pagam uma renda mensal a pessoas de baixa renda criam dependência financeira e desincentivam o trabalho a longo prazo.",
    example:
      "quem recebe o benefício indefinidamente perde a motivação de buscar emprego — afinal, trabalhar significa arriscar perder o auxílio por um salário que pode não valer a pena.",
    context: "estado",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "A solidariedade deve ser um ato voluntário das pessoas — por meio de igrejas, ONGs e comunidades —, e não uma obrigação imposta pelo Estado por meio de impostos.",
    example:
      "cada um deveria poder decidir para qual causa ou instituição destinar seu dinheiro, em vez de o governo fazer essa escolha por todos.",
    context: "individual",
    effect: { econ: -5, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Impostos altos sobre quem ganha mais desestimulam o trabalho, o investimento e a criação de riqueza — prejudicando, no fim, toda a sociedade, incluindo os mais pobres.",
    example:
      "um empresário que ficará com menos da metade do que ganhar tende a investir menos, contratar menos e buscar países com tributação mais baixa.",
    context: "estado",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "O Estado deve cobrar impostos elevados sobre heranças de grande valor para reduzir a vantagem que filhos de famílias ricas têm sobre os demais desde o nascimento.",
    example:
      "cobrar 50% de imposto sobre heranças acima de R$ 10 milhões e usar esse dinheiro em educação e saúde pública.",
    context: "estado",
    effect: { econ: 15, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "Privatizar serviços como energia, saneamento e telecomunicações tende a aumentar eficiência, reduzir custos e melhorar a qualidade para os usuários.",
    example:
      "após a privatização, o setor de telecomunicações em vários países passou por forte queda nos preços e rápida expansão da cobertura, algo que empresas estatais raramente conseguiram com a mesma velocidade.",
    context: "mercado",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "A quantidade excessiva de regulações e burocracia impostas pelo governo sufoca o empreendedorismo e reduz o crescimento econômico.",
    example:
      "exigir dezenas de licenças, alvarás e certificados para abrir um pequeno negócio desestimula quem quer empreender.",
    context: "mercado",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "O Estado tem a obrigação de oferecer educação de qualidade a todos por meio de escolas públicas, e essa qualidade não pode depender da condição financeira da família.",
    example:
      "dar vouchers para escolas privadas favorece quem já pode bancar parte do custo, sem resolver o problema de quem não tem condições nenhuma.",
    context: "estado",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 5 },
  },
  {
    question:
      "A propriedade privada dos meios de produção — fábricas, fazendas, empresas — é o fundamento da prosperidade econômica e da liberdade individual; quando o Estado assume o controle, a eficiência cai e a liberdade encolhe.",
    example:
      "o contraste entre economias de mercado e economias planificadas do século XX mostra que o controle estatal sobre empresas levou sistematicamente a escassez, baixa qualidade e pouca inovação.",
    context: "mercado",
    effect: { econ: -20, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "Organizações internacionais como a ONU, a União Europeia e o Mercosul têm poder excessivo e deveriam ser enfraquecidas ou extintas, pois interferem nas decisões internas de cada país.",
    example:
      "um país que votar pela sua própria lei de imigração não pode aceitar que burocratas não eleitos em Bruxelas ou Nova York a derrubem — soberania popular não se delega a tribunal nenhum.",
    context: "internacional",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "Um país tem o direito de usar suas forças militares para se defender quando for invadido ou atacado por outro país.",
    example:
      "se tropas estrangeiras invadirem o território nacional, o governo tem plena legitimidade para reagir militarmente para expulsá-las.",
    context: "internacional",
    effect: { econ: 0, dipl: -5, govt: 0, scty: 0 },
  },
  {
    question:
      "Países vizinhos devem se unir em blocos de cooperação — como a União Europeia ou o Mercosul — para negociar juntos melhores acordos comerciais e ter mais peso nas decisões mundiais.",
    example:
      "países pequenos conseguem muito pouco sozinhos nas negociações com EUA ou China, mas ganham força quando negociam em bloco.",
    context: "internacional",
    effect: { econ: -5, dipl: 10, govt: 0, scty: 5 },
  },
  {
    question:
      "Um país deve preservar ao máximo sua independência para tomar decisões sem ceder a pressões de outros países ou de organismos internacionais.",
    example:
      "desenvolver tecnologia e indústria própria em áreas estratégicas — como energia e defesa — mesmo que seja mais caro do que simplesmente importar.",
    context: "internacional",
    effect: { econ: 0, dipl: -25, govt: 0, scty: 0 },
  },
  {
    question:
      "A humanidade seria melhor governada por um único governo mundial com autoridade real sobre todos os países, em vez de nações separadas que frequentemente entram em conflito.",
    example:
      "um governo mundial poderia impedir guerras, regular emissões de carbono e proteger direitos humanos em qualquer lugar, sem depender da cooperação voluntária de cada país.",
    context: "internacional",
    effect: { econ: 0, dipl: 20, govt: 0, scty: 0 },
  },
  {
    question:
      "A diplomacia e a cooperação entre países são mais eficazes do que o poder militar para garantir a paz e os interesses de uma nação no mundo.",
    example:
      "um país pode ter mais influência pelo seu desenvolvimento cultural, econômico e diplomático do que pelo tamanho do seu exército.",
    context: "internacional",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 },
  },
  {
    question:
      "Um país deve ter total autonomia para iniciar uma ação militar quando julgar necessário, sem precisar da aprovação de outros países ou da ONU.",
    example:
      "se o governo considerar que uma ameaça justifica uma intervenção militar, ele não deveria precisar aguardar o consenso internacional para agir.",
    context: "internacional",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "Altos investimentos em forças armadas representam um desperdício de dinheiro público que poderia ser melhor usado em saúde, educação e infraestrutura.",
    example:
      "um país que gasta 5% do seu orçamento com o exército poderia usar esse dinheiro para construir hospitais e universidades.",
    context: "estado",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 },
  },
  {
    question:
      "Enviar dinheiro ou ajuda humanitária para outros países é, na maioria das vezes, um desperdício, pois o próprio país ainda tem necessidades internas urgentes não resolvidas.",
    example:
      "um país que ainda luta contra a fome doméstica não deveria destinar bilhões a auxílios externos.",
    context: "internacional",
    effect: { econ: -5, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "Alguns sistemas de valores e formas de organizar a sociedade são objetivamente melhores do que outros.",
    example:
      "julgar que uma cultura que pratica casamentos forçados de crianças ou persegue minorias religiosas é 'inferior' não é etnocentrismo — é um julgamento moral universal. O relativismo cultural, levado ao extremo, impede condenar qualquer prática, por mais que viole a dignidade humana.",
    context: "internacional",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "A colaboração científica entre países traz mais benefícios para toda a humanidade do que cada país investir apenas em pesquisa própria e isolada.",
    example:
      "a vacina da COVID-19 foi desenvolvida em tempo recorde graças ao compartilhamento de dados científicos entre dezenas de países. Pesquisadores de diferentes nações, compartilhando dados e resultados em tempo real, chegaram a soluções em meses que teriam levado anos de forma isolada.",
    context: "internacional",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 10 },
  },
  {
    question:
      "Governos que violam direitos humanos de forma grave devem ser responsabilizados perante tribunais e organismos internacionais, mesmo que invocem soberania nacional para se defender.",
    example:
      "um ditador que massacra civis não deveria ser protegido pelo argumento de que nenhum país externo pode interferir em seus assuntos internos.",
    context: "internacional",
    effect: { econ: 0, dipl: 10, govt: 5, scty: 0 },
  },
  {
    question:
      "Derrubar um regime opressor pela força nunca é moralmente justificável; a mudança política deve sempre acontecer por vias pacíficas, como eleições, protestos e reformas legais.",
    example:
      "mesmo que um governo seja corrupto e cruel, a solução correta é derrotá-lo nas urnas ou por pressão popular pacífica, não através de levantes armados.",
    context: "estado",
    effect: { econ: 0, dipl: 5, govt: 0, scty: 0 },
  },
  {
    question:
      "As leis e políticas públicas de um país devem ser baseadas em princípios religiosos, já que os valores morais da religião são um guia ético legítimo para a sociedade.",
    example:
      "quando uma sociedade tem valores morais enraizados na fé, criar leis que ignoram completamente essa base é impor uma visão de mundo secular e artificial que desconecta o direito da ética que o próprio povo já vive no dia a dia.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    question:
      "Em situações de ameaça grave à segurança pública, o Estado deve ter autoridade para restringir liberdades individuais, como prender suspeitos sem processo ou monitorar comunicações sem autorização judicial.",
    example:
      "quando uma organização terrorista está planejando um ataque, não existe tempo para longas tramitações judiciais — a segurança da maioria justifica plenamente ações imediatas do Estado.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -5 },
  },
  {
    question:
      "Decisões complexas sobre economia, saúde ou segurança não deveriam ser definidas diretamente pelo voto popular, pois são assuntos técnicos que a maioria das pessoas não domina o suficiente para decidir bem.",
    example:
      "a população em geral não tem como avaliar a fundo os riscos de uma política monetária ou de uma aprovação emergencial de vacinas. Isso não deveria ser decidido por plebiscitos.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    question:
      "Um paciente com doença terminal e sem perspectiva de cura deve ter o direito legal de solicitar a um médico que ponha fim à sua vida, se esse for seu desejo consciente e livre.",
    example:
      "uma pessoa com câncer em estágio terminal, com grande sofrimento e sem possibilidade de recuperação, deveria poder optar por uma morte digna e assistida.",
    context: "individual",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 },
  },
  {
    question:
      "Em situações de ameaça à segurança nacional, o governo deve poder monitorar comunicações e prender suspeitos sem ordem judicial prévia.",
    example:
      "quando há uma ameaça real de ataque terrorista, cada minuto de atraso esperando um juiz pode custar vidas — a segurança da população não pode ser refém de burocracias pensadas para tempos normais.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    question:
      "O Estado, por sua própria natureza, tende a crescer e a restringir a liberdade das pessoas; por isso o ideal seria que ele fosse o menor possível ou que não existisse.",
    example:
      "cada nova lei, agência reguladora ou imposto criado pelo governo reduz um pouco mais a capacidade de cada pessoa de decidir sobre sua própria vida.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: 20, scty: 0 },
  },
  {
    question:
      "O sentimento de identidade nacional deve estar acima das divergências políticas internas, e criticar o próprio país em público é irresponsável e prejudica a coesão nacional.",
    example:
      "mesmo discordando de decisões do governo, um cidadão deveria evitar manifestar essa crítica perante estrangeiros ou em fóruns internacionais.",
    context: "costumes",
    effect: { econ: 0, dipl: -10, govt: -5, scty: -5 },
  },
  {
    question:
      "A liberdade de criticar, satirizar e questionar qualquer pessoa ou instituição com poder é uma garantia essencial contra a opressão, e nada e ninguém deveria estar acima dessa crítica.",
    example:
      "jornalistas e cidadãos devem poder fazer piadas ou críticas duras sobre presidentes, juízes e até líderes religiosos sem medo de prisão ou processo.",
    context: "individual",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 5 },
  },
  {
    question:
      "Em uma democracia, quando a maioria da população aprova uma mudança, o governo deve implementá-la, mesmo que essa decisão restrinja direitos de grupos minoritários ou contrarie tratados internacionais.",
    example:
      "se a maioria votar para proibir o uso de símbolos religiosos de uma minoria em espaços públicos, ou para restringir direitos civis de um grupo específico, o Estado deve implementar essa decisão sem precisar se justificar perante cortes constitucionais ou organismos internacionais.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    question:
      "Um líder que toma decisões rápidas e firmes, mesmo sem consenso amplo, consegue mais resultado prático do que um que busca constantemente a aprovação de todos.",
    example:
      "em uma crise econômica ou de segurança pública, um líder forte que age com rapidez pode salvar mais vidas do que um que depende de longas deliberações parlamentares.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    question:
      "Viver em uma democracia é o único sistema que garante de forma real a dignidade e os direitos das pessoas; trocar democracia por ‘eficiência’ ou ‘ordem’ sempre acaba em perseguição e autoritarismo.",
    example:
      "países que limitaram eleições livres em nome da estabilidade econômica acabaram em ditaduras.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 },
  },
  {
    question:
      "O governo deve criar leis ambientais rígidas para proteger o meio ambiente, mesmo que isso limite certos setores da economia.",
    example:
      "proibir empresas de despejar resíduos em rios ou exigir que indústrias reduzam suas emissões, mesmo que isso aumente os custos de produção.",
    context: "ambiente",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "O avanço científico e tecnológico é o principal caminho para resolver os grandes problemas da humanidade, inclusive questões éticas e sociais.",
    example:
      "inteligência artificial na medicina, energias renováveis e educação digital podem melhorar a vida de bilhões de pessoas mais rapidamente do que mudanças políticas.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "Os pais devem ter o direito de matricular seus filhos em escolas baseadas em valores religiosos, sem que o governo possa obrigá-los a seguir um currículo laico definido pelo Estado.",
    example:
      "uma família cristã ou muçulmana deveria poder ensinar seus filhos com base em sua fé, inclusive em temas como criação do mundo ou sexualidade.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 10, scty: -10 },
  },
  {
    question:
      "Tradições culturais, religiosas e familiares acumuladas ao longo de gerações são um patrimônio de sabedoria coletiva que deve ser preservado, mesmo que sua utilidade imediata nem sempre seja fácil de explicar racionalmente.",
    example:
      "ritos de passagem, celebrações religiosas e estruturas familiares tradicionais dão às pessoas senso de identidade, pertencimento e estabilidade que sistemas modernos raramente conseguem substituir.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -15 },
  },
  {
    question:
      "Igrejas, templos e demais instituições religiosas deveriam pagar os mesmos impostos que qualquer outra empresa ou associação.",
    example:
      "uma Igreja que arrecada milhões de reais por mês em doações dos fiéis não deveria ter isenção fiscal diferente de uma fundação civil ou de um clube esportivo.",
    context: "estado",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "Combater as mudanças climáticas exige metas e regras obrigatórias para todos os países, inclusive restrições sobre como cada um produz energia e alimentos.",
    example:
      "países ricos deveriam financiar a transição energética de países em desenvolvimento e aceitar limites sobre suas emissões de carbônicas, mesmo que isso custe caro à sua economia.",
    context: "ambiente",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 10 },
  },
  {
    question:
      "As gerações anteriores tinham valores mais sólidos e uma vida social mais saudável do que a atual. O mundo moderno, com o excesso de tecnologia e a quebra de tradições, está prejudicando a saúde mental e o caráter dos jovens.",
    example:
      "jovens de gerações anteriores cresceram com famílias presentes, comunidades coesas e valores claros — hoje crescem olhando para uma tela, comparando sua vida com versões editadas da vida alheia e sem saber quem são.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "O uso de drogas deve ser tratado como um problema de saúde pública, e não como um crime. Quem usa drogas deve receber acompanhamento médico, não prisão.",
    example:
      "Portugal descriminalizou o uso de todas as drogas em 2001 e registrou queda nas overdoses, no HIV e na reincidência — provando que tratar o vício como problema de saúde salva vidas enquanto a criminalização apenas enche cadeias e afasta quem precisa de ajuda.",
    context: "individual",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 2 },
  },
  {
    question:
      "O casamento como união estável entre homem e mulher é uma instituição com bases históricas, religiosas e biológicas sólidas e não deve ser redefinida por lei para incluir outros tipos de união.",
    example:
      "para muitas religiões e culturas ao redor do mundo, o casamento está fundamentalmente ligado à complementaridade entre os sexos e à formação de uma família para a criação de filhos.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    question:
      "Algumas culturas desenvolveram, ao longo da história, valores e instituições — como respeito aos direitos individuais, separação de poderes e Estado de Direito — que comprovadamente geram mais liberdade e prosperidade do que outras.",
    example:
      "afirmar que a escravidão era apenas 'diferente' de outras formas de organização social, ou que a liberdade de imprensa é 'relativa' ao contexto cultural, é uma posição que dificilmente se sustenta quando analisamos os resultados históricos.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "A normalização do sexo casual e a promoção de modelos de relacionamento fora dos padrões tradicionais enfraquecem a família e prejudicam a estabilidade social.",
    example:
      "a crescente aceitação pública de relações poligâmicas ou de conteúdo sexual explícito como entretenimento normalizado torna mais difícil para crianças formarem valores sãos.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "Imigrantes que vêm morar em um país devem adotar a língua e os costumes locais e não criar comunidades separadas que mantenham valores próprios em contradição com os do país que os recebeu.",
    example:
      "um imigrante não deveria reivindicar o direito de aplicar leis de sua cultura de origem dentro do território nacional.",
    context: "costumes",
    effect: { econ: 0, dipl: -5, govt: 0, scty: -10 },
  },
  {
    question:
      "O aborto deve ser proibido ou permitido apenas em casos extremos de risco de vida da mãe, pois a decisão de interromper uma gravidez não deve ser tratada como uma simples escolha pessoal da mulher.",
    example:
      "uma gravidez resultante de escolha consciente da mulher não justificaria o aborto, mesmo no primeiro trimestre.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    question:
      "O acesso de civis a armas de fogo deve ser fortemente restringido, pois a presença de armas entre a população em geral aumenta o risco de violência doméstica, acidentes fatais e homicídios.",
    example:
      "países com rígido controle de armas, como Japão e Nova Zelândia, registram taxas de homicídio por arma de fogo muito menores do que países com pouco controle.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: -5, scty: 0 },
  },
  {
    question:
      "Um sistema de saúde baseado na concorrência entre planos e hospitais privados tende a gerar mais inovação, melhores equipamentos e atendimento mais rápido do que um serviço monopolizado pelo Estado.",
    example:
      "países com forte presença privada regulada na saúde, como Suíça e Holanda, atingem alta qualidade e acesso universal sem depender de um sistema estatal único.",
    context: "mercado",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "A prostituição deveria ser proibida e tratada como crime pelo Estado, pois são atividades que ferem a dignidade humana e não podem ser equiparadas a profissões comuns.",
    example:
      "legalizar a prostituição envia a mensagem de que o corpo humano pode ser comprado como uma mercadoria em uma loja.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    question:
      "A velocidade com que a sociedade adota novas tecnologias e abandona valores tradicionais está acontecendo rápido demais e coloca em risco aspectos essenciais da experiência humana.",
    example:
      "a substituição de relações humanas por interações digitais e de trabalho artesanal por automação empobrece a vida das pessoas — nenhum ganho de eficiência compensa perder aquilo que nos torna humanos.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "A manipulação genética de embriões humanos e o uso da biotecnologia para ampliar capacidades além do tratamento de doenças ultrapassam limites éticos que a ciência não deve ignorar em nome do progresso.",
    example:
      "projetar crianças como se fossem produtos de catálogo — mais inteligentes, mais bonitas, mais produtivas — é tratar a vida humana como mercadoria e abrir a porta para uma eugenia que a história já mostrou aonde leva.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "Um país deveria facilitar ao máximo a entrada de trabalhadores estrangeiros, eliminando burocracia de vistos e exigências acadêmicas para quem queira vir trabalhar.",
    example:
      "qualquer pessoa disposta a trabalhar deveria poder se instalar e buscar emprego, sem precisar de um diploma universitário ou de um contrato prévio para obter autorização de trabalho.",
    context: "internacional",
    effect: { econ: 0, dipl: 10, govt: 10, scty: 0 },
  },
  {
    question:
      "Os governos têm a obrigação moral de ajudar a resolver crises humanitárias e proteger direitos humanos em outros países, mesmo que isso tenha um custo para o contribuinte.",
    example:
      "um país rico deveria financiar auxílio a refugiados de guerra ou a vítimas de fome em outras nações, porque a vida de um estrangeiro tem o mesmo valor que a de um cidadão local.",
    context: "internacional",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 },
  },
  {
    question:
      "Políticas de cotas e tratamento diferenciado com base em raça ou gênero ferem o princípio da igualdade perante a lei e deveriam ser substituídas por igualdade de oportunidades para todos, sem distinção de grupo.",
    example:
      "selecionar candidatos a universidades ou empregos levando em conta a cor da pele ou o sexo, em vez de somente o desempenho e o mérito, é uma forma de discriminação — mesmo que bem-intencionada.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    question:
      "É legítimo que um governo priorize os interesses de seus cidadãos nacionais em relação aos de estrangeiros ou a acordos internacionais, especialmente em áreas como empregos, benefícios sociais e segurança.",
    example:
      "um país pode preferir dar empregos a nacionais a imigrantes ou pode recusar cumprir um tratado que prejudique sua indústria local.",
    context: "internacional",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 },
  },
  {
    question:
      "O modelo econômico atual, baseado em crescimento e consumo infinitos, está destruindo os recursos naturais do planeta e precisa ser reformulado antes que o dano seja irreversível.",
    example:
      "a Terra possui recursos finitos como água potável, solos férteis e clima estável — um sistema que os consome mais rápido do que são renovados é insustentável.",
    context: "ambiente",
    effect: { econ: 10, dipl: 10, govt: 0, scty: 10 },
  },
  {
    question:
      "Resolver a crise climática exige mudar a própria estrutura do sistema econômico, não apenas adotar novas tecnologias ou incentivos financeiros.",
    example:
      "não basta trocar carros a gasolina por elétricos se o modelo de produção industrial em massa e de consumo descartável permanecer intocado.",
    context: "ambiente",
    effect: { econ: 10, dipl: 5, govt: 0, scty: 10 },
  },
  {
    question:
      "O Estado deve fiscalizar e punir empresas que paguem salários diferentes a homens e mulheres que exercem a mesma função, não se pode deixar isso apenas para o livre mercado corrigir.",
    example:
      "um governo deveria poder exigir auditoria salarial de empresas e multar aquelas que comprovadamente pagam menos a mulheres pelo mesmo cargo.",
    context: "estado",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "A lei deve obrigar empresas e instituições públicas a reservar uma proporção dos cargos de liderança para mulheres, pois sem essa obrigação as desigualdades históricas continuam se reproduzindo.",
    example:
      "exigir que ao menos 30% dos cargos de direção em grandes empresas e no parlamento sejam ocupados por mulheres.",
    context: "estado",
    effect: { econ: 5, dipl: 0, govt: -5, scty: 10 },
  },
  {
    question:
      "Ter a posse de uma terra, imóvel ou empresa só é moralmente justo se o dono estiver de fato gerindo e produzindo nela, pois quem apenas arrenda ou vive de investimentos está se beneficiando do trabalho alheio sem contribuir diretamente.",
    example:
      "um latifundiário que tem 10 mil hectares improdutivos que apenas aluga deveria perder o direito de propriedade para quem vai de fato produzir.",
    context: "mercado",
    effect: { econ: 10, dipl: 0, govt: -5, scty: 5 },
  },
  {
    question:
      "Uma pessoa adulta tem o direito de consumir qualquer substância que queira, inclusive drogas, sem interferência do Estado, e o comércio dessas substâncias deveria ser legal e regulado como qualquer outro produto.",
    example:
      "assim como o álcool e o cigarro são legais, apesar de causarem danos, a maconha e outras drogas também deveriam poder ser vendidas livremente para adultos.",
    context: "individual",
    effect: { econ: 0, dipl: 0, govt: 15, scty: 5 },
  },
  {
    question:
      "O objetivo da prisão deve ser punir o criminoso pelo crime que cometeu, não tentar reintegrá-lo à sociedade. Quem pratica um crime grave merece um castigo severo e proporcional, sem privilégios.",
    example:
      "assassinos e estupradores deveriam cumprir suas penas em condições duras, sem programas de ressocialização que na prática são regalias pagas pelo contribuinte.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: -15, scty: -10 },
  },
  {
    question:
      "O maior problema da sociedade não é a disputa entre esquerda e direita, mas uma elite política e econômica corrupta que usa o Estado para enriquecer às custas do restante da população.",
    example:
      "partidos de esquerda e de direita que chegam ao poder tendem a proteger os mesmos grupos econômicos privilegiados que financiaram suas campanhas.",
    context: "estado",
    effect: { econ: 5, dipl: -5, govt: -5, scty: -5 },
  },
  {
    question:
      "Alterar radicalmente o corpo humano por meios tecnológicos — como chips cerebrais ou edição genética — vai além do tratamento de doenças e representa uma ruptura perigosa com a natureza humana e com valores fundamentais.",
    example:
      "projetar crianças como produtos de catálogo e implantar chips no cérebro para aumentar produtividade não é progresso — é a destruição da dignidade humana em nome do lucro e da eficiência.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -15 },
  },
  {
    question:
      "O monopólio estatal sobre a justiça e a segurança pública deve ser questionado; empresas privadas competindo entre si provavelmente ofereceriam policiamento e tribunais mais eficientes e justos do que o Estado.",
    example:
      "imagine poder contratar a empresa de segurança que te dá mais garantias e que se responsabiliza financeiramente por falhas, em vez de depender de uma polícia pública sem concorrência.",
    context: "estado",
    effect: { econ: -15, dipl: 0, govt: 20, scty: 0 },
  },
  {
    question:
      "A sociedade deveria aceitar um nível menor de consumo e crescimento econômico, se isso for necessário para preservar o meio ambiente para as próximas gerações.",
    example:
      "produzir menos bens descartáveis, limitar viagens aéreas e reduzir o consumo de carne mesmo que isso signifique um padrão de vida materialmente mais simples.",
    context: "ambiente",
    effect: { econ: 15, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "A livre entrada de produtos, pessoas e ideias estrangeiras acaba enfraquecendo a cultura, as tradições e a identidade de um povo; o Estado deve criar barreiras para proteger o modo de vida e os valores nacionais diante da globalização.",
    example:
      "limitar a importação de conteúdo cultural estrangeiro — filmes, música, programas — ou restringir o acesso de estrangeiros a terras e negócios estratégicos para preservar a identidade nacional.",
    context: "internacional",
    effect: { econ: 0, dipl: -20, govt: 0, scty: -15 },
  },
  {
    question:
      "Decisões técnicas complexas — como política monetária, regulamentação de vacinas ou gestão de infraestrutura — deveriam estar nas mãos de especialistas e técnicos, não de políticos eleitos que priorizam o que agrada o eleitor.",
    example:
      "as taxas de juros de um banco central deveriam ser decididas por economistas independentes, e não por um presidente eleito que precisa ser popular.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: -20, scty: 5 },
  },
  {
    question:
      "Economias com mercados abertos e baixa interferência estatal geram mais crescimento, mais empregos e padrão de vida mais alto do que economias planificadas pelo governo.",
    example:
      "o contraste entre Coreia do Sul (economia de mercado) e Coreia do Norte (economia planificada) — dois países com a mesma origem cultural — é um exemplo claro: o Sul tem renda per capita dezenas de vezes maior.",
    context: "mercado",
    effect: { econ: -20, dipl: 0, govt: 0, scty: 0 },
  },
  {
    question:
      "O governo deveria ter o poder legal de monitorar mensagens e comunicações privadas na internet para prevenir crimes graves ou a disseminação de notícias falsas que causem pânico.",
    example:
      "autorizar que as forças de segurança leiam mensagens privadas de suspeitos de terrorismo ou de espalhadores de desinformação, mesmo sem autorização judicial prévia em casos urgentes.",
    context: "estado",
    effect: { econ: 0, dipl: 0, govt: -20, scty: -5 },
  },
  {
    question:
      "Com a automação eliminando cada vez mais postos de trabalho, o governo deveria garantir uma renda básica mensal a todos os cidadãos, independentemente de emprego, para que as pessoas possam viver com dignidade e escolher livremente suas atividades.",
    example:
      "se robôs e softwares já fazem o trabalho de motoristas, caixas de supermercado e operadores de fábrica, o governo deveria pagar um auxílio mensal a todos para cobrir necessidades básicas.",
    context: "estado",
    effect: { econ: 15, dipl: 0, govt: 0, scty: 10 },
  },
  {
    question:
      "A existência de países separados com fronteiras e interesses próprios é uma das principais causas de guerras e desigualdades; o ideal seria um único governo mundial com leis iguais para todos os seres humanos.",
    example:
      "conflitos entre países por território, recursos ou influência seriam impossíveis se existisse uma autoridade mundial legítima acima de qualquer governo nacional.",
    context: "internacional",
    effect: { econ: 0, dipl: 25, govt: 0, scty: 5 },
  },
  {
    question:
      "Quando o judiciário e o parlamento são lentos e travados, um líder popular que passe por cima desses obstáculos para beneficiar os mais pobres pode ser legítimo.",
    example:
      "quando o parlamento está travado por lobbies e o judiciário protege os privilégios de sempre, um líder que age diretamente pelo povo não está rompendo a democracia — está exercendo-a de verdade.",
    context: "estado",
    effect: { econ: 15, dipl: -10, govt: -15, scty: 0 },
  },
  {
    question:
      "A educação deve transmitir o conhecimento acumulado, os valores e a herança cultural de uma sociedade às novas gerações — e não servir como instrumento de desconstrução das normas, tradições e identidades consolidadas.",
    example:
      "escolas que substituem o ensino de literatura clássica, matemática e história por projetos de 'desconstrução social' privam os alunos de uma formação sólida e os deixam sem raízes, sem ferramentas e sem identidade.",
    context: "costumes",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
];

export const ideologies: Ideology[] = [
  {
    name: "Anarco-Comunismo",
    stats: { econ: 100, dipl: 50, govt: 100, scty: 90 },
    desc: "O Anarco-Comunismo (também conhecido como comunismo libertário ou anarquismo comunista) é uma teoria política e econômica que defende a abolição do Estado, do capitalismo, da propriedade privada dos meios de produção e de toda e qualquer forma de hierarquia coercitiva. Diferente do socialismo estatal, acredita que a transição para uma sociedade sem classes deve ser imediata e baseada na organização voluntária de comunas autogeridas.\n\nPropõe um sistema de distribuição baseado na máxima 'de cada qual segundo suas capacidades, a cada qual segundo suas necessidades', eliminando o conceito de salário e mercado. Historicamente, consolidou-se no final do século XIX através das obras de Piotr Kropotkin e Errico Malatesta, enfatizando a ajuda mútua como um fator de evolução biológica e social. Busca uma ordem social onde a liberdade individual absoluta coexiste com a igualdade econômica coletiva plena, sem a necessidade de um governo centralizado ou sistema policial.",
    content: {
      history: "O Anarco-Comunismo emergiu como corrente organizada no final do século XIX, consolidando-se principalmente através das obras de Piotr Kropotkin (1842–1921), um príncipe russo que abandonou os privilégios aristocráticos para dedicar sua vida à causa anarquista. Em sua obra 'A Conquista do Pão' (1892), Kropotkin argumentou que a ajuda mútua — e não a competição darwinista — é o motor fundamental da evolução biológica e social. O movimento ganhou força na Internacional Anarquista de Saint-Imier (1872), após a ruptura com Marx na Primeira Internacional. Na prática, o anarco-comunismo inspirou a Revolução Espanhola de 1936, quando trabalhadores e camponeses da Catalunha e de Aragão organizaram comunas autogeridas que funcionaram por quase três anos antes de serem esmagadas pela ditadura de Franco e pela própria Frente Popular. Errico Malatesta e Emma Goldman foram outros pensadores centrais que refinaram a doutrina, integrando o feminismo e a resistência anticolonial ao projeto libertário comunista.",
      corePrinciples: "O Anarco-Comunismo sustenta que o Estado, o capitalismo e a propriedade privada dos meios de produção formam um sistema mutuamente sustentado de dominação que precisa ser abolido simultaneamente. Diferentemente do marxismo-leninismo, rejeita qualquer 'fase de transição' estatal, pois acredita que o poder corrompe inevitavelmente qualquer vanguarda que o assuma. Em seu lugar, propõe a organização imediata em comunas livres federadas, onde as decisões são tomadas por assembleia direta e os recursos são distribuídos segundo o princípio 'de cada qual segundo suas capacidades, a cada qual segundo suas necessidades'. Não há salários, mercado ou dinheiro: a produção coletiva alimenta um bem comum acessível a todos. A segurança e a justiça social são garantidas pela solidariedade comunitária e pela educação emancipatória, substituindo polícias e tribunais por mediação voluntária e responsabilização coletiva.",
      curiosities: "Kropotkin escreveu 'Apoio Mútuo: Um Fator de Evolução' (1902) diretamente em resposta ao darwinismo social de Thomas Huxley, demonstrando com exemplos zoológicos e históricos que a cooperação — não a competição — é o traço dominante em espécies sociais bem-sucedidas, incluindo os humanos. Nestor Makhno, camponês ucraniano sem formação acadêmica, liderou o Exército Insurgente Negro e organizou o Território Livre (Makhnovshchina) entre 1918 e 1921, colocando os princípios anarco-comunistas em prática numa área do tamanho da França antes de ser derrotado pelo Exército Vermelho bolchevique."
    },
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
    content: {
      history: "O Comunismo Libertário como corrente teórica estruturada ganhou novo impulso no século XX com Murray Bookchin (1921–2006), intelectual nova-iorquino que começou como marxista e trotskista antes de migrar para o anarquismo. Em sua obra 'A Ecologia da Liberdade' (1982), Bookchin argumentou que a crise ecológica e a dominação da natureza são inseparáveis das hierarquias humanas — de gênero, de raça, de classe — tornando impossível resolver uma sem combater as outras. Ele desenvolveu o conceito de 'Municipalismo Libertário', uma estratégia para recuperar o poder político para as assembleias locais e substituir o Estado-nação por uma confederação de cidades democráticas. Esta visão influenciou profundamente o movimento Zapatista no México e o experimento do Confederalismo Democrático no Rojava (norte da Síria), onde o líder curdo Abdullah Öcalan adaptou as ideias de Bookchin para criar um sistema de autogoverno baseado em assembleias locais, paridade de gênero obrigatória e gestão ecológica comunitária.",
      corePrinciples: "O Comunismo Libertário distingue-se do Anarco-Comunismo pela ênfase na ecologia social como fundamento filosófico: a exploração do meio ambiente natural é vista como o prolongamento direto da exploração do ser humano pelo ser humano. Propõe a descentralização radical do poder político para assembleias de bairro e comunidades locais, mantendo a coesão social através de uma confederação democrática de baixo para cima. Valoriza a diversidade cultural e biológica, opõe-se ao monopólio tecnológico e defende tecnologias apropriadas que ampliem a autonomia das comunidades. Inclui o feminismo e o antirracismo como elementos fundamentais da luta anticapitalista, e não como questões secundárias.",
      curiosities: "O experimento do Rojava (Administração Autônoma do Norte e Leste da Síria), iniciado em 2012 em meio à guerra civil síria, é considerado o maior experimento de Comunismo Libertário em escala real do século XXI. Com uma população de mais de 4 milhões de pessoas, o sistema adota paridade obrigatória de gênero em todos os cargos de liderança, propriedade coletiva da terra e gestão comunitária dos recursos naturais — tudo inspirado diretamente nos escritos de Bookchin, mesmo que o movimento seja predominantemente curdo e parti de uma tradição marxista-leninista previamente."
    },
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
    content: {
      history: "O Trotskismo nasce da derrota política de Leon Trotsky (1879–1940) contra Joseph Stalin na luta pelo controle do Partido Comunista soviético após a morte de Lenin em 1924. Trotsky, criador do Exército Vermelho e arquiteto militar da Revolução de Outubro, resistiu à burocratização do Estado soviético e foi expulso do partido em 1927, exilado progressivamente até ser assassinado com um picador de gelo no México em 1940, por um agente de Stalin. Antes de morrer, fundou a Quarta Internacional (1938) como alternativa tanto à Segunda Internacional socialdemocrata quanto à Terceira Internacional estalinista, buscando reviver o internacionalismo revolucionário. O trotskismo influenciou profundamente a esquerda latino-americana, com pensadores como Nahuel Moreno na Argentina e Ernest Mandel na Bélgica desenvolvendo debates fundamentais sobre teoria do partido, frente única e análise do imperialismo.",
      corePrinciples: "O elemento central do Trotskismo é a Teoria da Revolução Permanente: em países semifeudais ou semicoloniais, a burguesia nacional é incapaz de completar as tarefas democráticas históricas (reforma agrária, industrialização, independência nacional), pois seu destino está atrelado aos interesses do imperialismo internacional. Portanto, o proletariado deve assumir a liderança dessas tarefas e, ao fazê-lo, será levado inevitavelmente além dos limites burgueses em direção ao socialismo — mas essa transição só pode sobreviver se a revolução se espalhar internacionalmente. O Trotskismo também defende a democracia operária genuína dentro do partido e do Estado operário, criticando a burocracia como uma casta parasitária que distorce e corrói as conquistas revolucionárias.",
      curiosities: "Trotsky foi um dos mais talentosos escritores políticos do século XX. Sua 'História da Revolução Russa' (1930–1932), escrita no exílio, é considerada por historiadores de diversas correntes uma obra literária e analítica de primeira grandeza. Ele também foi o primeiro a cunhar o termo 'termidor' para descrever a degeneração burocrática da URSS, comparando-a à fase reacionária da Revolução Francesa — uma análise que décadas depois seria confirmada em grande medida por historiadores como Sheila Fitzpatrick."
    },
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
    desc: "O Marxismo é o método de análise socioeconômica e a visão de mundo fundamentada nas obras de Karl Marx e Friedrich Engels, que vê a história da humanidade como a história da luta de classes. Seu conceito central é o materialismo histórico, que argumenta que a base econômica da sociedade (modo de produção) determina sua superestrutura política e ideológica.\n\nMarx analisa o capitalismo como um sistema baseado na exploração do trabalho assalariado e na extração de mais-valia pela burguesia, o que inevitavelmente gera crises de superprodução e o empobrecimento da classe trabalhadora. Propõe que o proletariado, ao tomar consciência de classe, deve liderar uma revolução para abolir a propriedade privada dos meios de produção, instaurando uma fase de transição (socialismo) que eventualmente levaria ao comunismo — uma sociedade sem classes e sem Estado.",
    content: {
      history: "Karl Marx (1818–1883) e Friedrich Engels (1820–1895) desenvolveram o marxismo ao longo de décadas de colaboração intelectual, partindo da crítica à filosofia de Hegel e à economia política clássica de Adam Smith e David Ricardo. O 'Manifesto do Partido Comunista' (1848) foi escrito às vésperas das revoluções europeias de 1848 e definiu a luta de classes como motor da história. A obra-vida de Marx, 'O Capital' (1867, volumes II e III publicados postumamente por Engels), é a análise mais sistemática já produzida sobre o funcionamento interno do capitalismo, introduzindo conceitos como mais-valia, fetichismo da mercadoria e tendência à queda da taxa de lucro. O marxismo influenciou praticamente todos os movimentos emancipatórios do século XX, da Revolução Russa às lutas de libertação nacional africanas e asiáticas, e permanece uma das ferramentas analíticas mais utilizadas nas ciências sociais contemporâneas.",
      corePrinciples: "O Materialismo Histórico é o método marxista central: as formas políticas, jurídicas e ideológicas de uma época são determinadas, em última instância, pela base econômica — ou seja, pelas relações de produção e pelo nível de desenvolvimento das forças produtivas. O capitalismo, segundo Marx, é historicamente progressista (superou o feudalismo) mas gera contradições insuperáveis: a acumulação de capital concentra riqueza enquanto pauperiza o proletariado, pois os trabalhadores não recebem o valor integral do que produzem (mais-valia). Essas contradições levarão inevitavelmente a crises cada vez mais agudas, culminando na tomada revolucionária do poder pelo proletariado, seguida de uma fase de transição socialista e, finalmente, uma sociedade comunista sem classes e sem Estado.",
      curiosities: "Marx previu com notável precisão a globalização do capitalismo, a concentração monopolista do capital financeiro e a formação de crises cíclicas de superprodução — tudo isso no século XIX. Seu conceito de 'alienação do trabalho', que descreve como o trabalhador torna-se estranho ao produto do seu próprio labor, antecipou debates do século XX sobre saúde mental, identidade e consumismo. Ironia histórica: Marx viveu a maior parte de sua vida em pobreza, dependente da generosidade financeira do amigo Engels, que era co-proprietário de uma fábrica têxtil em Manchester."
    },
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
    content: {
      history: "Vladimir Lenin (1870–1924) desenvolveu o Leninismo como uma adaptação prática do marxismo às condições específicas da Rússia czarista — um país majoritariamente camponês, com um proletariado industrial pequeno e concentrado, e sem tradição democrática. Em 'O que Fazer?' (1902), Lenin atacou o 'economismo' dos marxistas que esperavam que a consciência revolucionária emergisse espontaneamente dos trabalhadores, argumentando pela necessidade de um partido de vanguarda centralizado e disciplinado, composto por revolucionários profissionais. A Revolução de Outubro de 1917 foi a culminação prática dessas ideias: um partido pequeno e coeso (os Bolcheviques), em aliança com os sovietes de trabalhadores e soldados, conseguiu tomar o poder numa janela histórica de oportunidade. Lenin governou a nova URSS com pragmatismo relativo — a Nova Política Econômica de 1921 permitiu o retorno parcial ao mercado para recuperar a economia devastada pela guerra civil.",
      corePrinciples: "O Leninismo acrescenta ao marxismo três elementos-chave: a teoria do imperialismo (o capitalismo financeiro no século XX exporta capital e divide o mundo em imperialismos rivais, tornando a guerra inevitável e a revolução urgente); a teoria do partido de vanguarda (organização centralizada de revolucionários profissionais, funcionando segundo o 'centralismo democrático' — debate livre internamente, unidade de ação externamente); e a teoria do Estado (o aparato estatal burguês deve ser destruído, não apenas reformado, e substituído pela ditadura do proletariado como forma de transição para o socialismo). O Leninismo defende a aliança entre o proletariado urbano e o campesinato como força social da revolução em países agrários.",
      curiosities: "Lenin morreu em 1924 com apenas 53 anos, após uma série de derrames. Em seus últimos escritos — o 'Testamento de Lenin' — ele advertiu explicitamente contra a concentração de poder nas mãos de Stalin e pediu sua remoção do cargo de secretário-geral do partido, carta que Stalin suprimiu por anos. O próprio Lenin, nos meses finais de sua vida, expressou profunda preocupação com a burocratização do Estado soviético, tornando-se paradoxalmente um dos primeiros críticos internos daquilo que o Leninismo havia criado."
    },
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
    content: {
      history: "O Stalinismo como sistema consolidou-se na URSS entre os anos 1924 e 1953, período em que Joseph Stalin (1879–1953) exerceu poder absoluto sobre o maior país do mundo. Após a morte de Lenin, Stalin manobrou habilmente para eliminar seus rivais — Trotsky, Zinoviev, Kamenev, Bukharin — usando o aparato do partido e a polícia política. O Grande Expurgo (1936–1938) resultou em centenas de milhares de execuções sumárias e o envio de milhões para os campos de trabalho forçado (Gulag). A coletivização forçada da agricultura (1929–1933) causou a morte de 3 a 7 milhões de pessoas pela Grande Fome, especialmente na Ucrânia (Holodomor). Apesar do custo humano imensurável, Stalin transformou a URSS de uma nação agrária em uma superpotência industrial e militar capaz de vencer a Segunda Guerra Mundial e lançar o primeiro satélite espacial da história.",
      corePrinciples: "O Stalinismo baseia-se na tese do 'Socialismo em Um Só País': a revolução pode e deve ser consolidada em um único Estado antes de exportar-se para o mundo — uma ruptura direta com o internacionalismo leninista e trotskista. O Estado deve exercer controle total sobre a economia, a cultura, a ciência e a vida privada através de um partido único onipresente, da polícia política (NKVD/KGB), da censura e do culto à personalidade do líder. O planejamento centralalizado (Planos Quinquenais) é o motor do desenvolvimento, priorizando a indústria pesada e o armamento sobre os bens de consumo. A burocracia partidária, que Trotsky chamou de 'casta', é o instrumento de controle social e ideológico.",
      curiosities: "Após a morte de Stalin em 1953, seu próprio sucessor, Nikita Khrushchev, denunciou os crimes do stalinismo no famoso 'Discurso Secreto' ao XX Congresso do Partido Comunista da URSS (1956), chocando delegados do mundo inteiro ao detalhar execuções, torturas, deportações em massa e a fabricação de confissões nos processos-espetáculo. Stalin, que havia se autodenominado 'Pai das Nações', foi removido do mausoléu ao lado de Lenin em 1961 e seu nome foi apagado de ruas, cidades e monumentos pela União Soviética — num processo de 'desstalinização' que ele próprio nunca poderia ter imaginado."
    },
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
    content: {
      history: "O Maoismo desenvolveu-se a partir da Revolução Chinesa liderada por Mao Tsé-Tung (1893–1976) e do Partido Comunista Chinês (PCC), que chegou ao poder em 1949 após décadas de guerra civil e resistência à invasão japonesa. Mao adaptou o marxismo-leninismo à realidade de uma China predominantemente rural, deslocando o foco revolucionário do proletariado urbano para o campesinato — uma inovação teórica radical que abriu caminho para revoluções em países agrários do Terceiro Mundo. A Grande Marcha (1934–1935), a guerra de guerrilha contra o Kuomintang e contra o Japão, e a fundação da República Popular da China em 1949 são os marcos históricos fundadores. A Revolução Cultural (1966–1976), período de violência e caos deliberado contra a 'velha cultura', causou dezenas de milhares de mortos e o fechamento de universidades e museus em toda a China.",
      corePrinciples: "O Maoismo assume que a contradição é o motor dialético fundamental de toda a realidade e que a consciência pode, sob certas condições, transformar a matéria — daí a ênfase maoísta na formação ideológica permanente. A Guerra Popular Prolongada é a estratégia militar central: cercar as cidades a partir do campo, criar zonas liberadas progressivamente e construir um exército popular enraizado na população. O Maoismo também defende a necessidade de revoluções culturais periódicas para combater a formação de uma nova burguesia dentro do partido comunista que degenere a revolução. A Linha de Massa — aprender com o povo para depois guiar o povo — é o método político que diferencia o maoismo de um simples vanguardismo elitista.",
      curiosities: "O 'Livro Vermelho' (Citações do Presidente Mao Tsé-Tung), publicado em 1964, chegou a ser o segundo livro mais impresso da história humana, com estimativas que variam entre 800 milhões e 1,5 bilhão de cópias. Em seu pico, era obrigatório que todos os chineses o carregassem consigo e o citassem em situações cotidianas. Paradoxalmente, Mao era um leitor voraz de literatura clássica chinesa e escrevia poesia tradicional de alto nível técnico — um intelectual que inspirou um movimento que destruiu bibliotecas e perseguiu intelectuais."
    },
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
    content: {
      history: "O Socialismo de Estado como modelo prático emergiu com força no século XX através dos movimentos de libertação nacional do Terceiro Mundo, que buscavam alternativas tanto ao modelo soviético quanto ao capitalismo ocidental. O nasserismo no Egito (1952–1970) estatizou o Canal de Suez, criou o maior projeto de infraestrutura da África (a Barragem de Assuã) e tentou construir uma identidade pan-árabe autônoma. Na Índia, Jawaharlal Nehru conduziu uma política de 'misto econômico' baseada nos Planos Quinquenais indianos, com empresas públicas estratégicas coexistindo com o setor privado. Hugo Chávez na Venezuela (1999–2013) é o exemplo contemporâneo mais emblemático, utilizando as receitas do petróleo estatal para financiar programas sociais massivos (missões bolivarianas) enquanto mantinha o controle político centralizado.",
      corePrinciples: "O Socialismo de Estado distingue-se do Socialismo Democrático por sua ênfase no papel técnico-administrativo do Estado como planejador central, e do Comunismo pela preservação de formas limitadas de propriedade privada em setores não estratégicos. O Estado controla os 'commanding heights' — energia, transporte, comunicações, recursos naturais — enquanto permite alguma atividade privada nas margens da economia. O desenvolvimento nacional e a industrialização acelerada são prioridades absolutas, justificando a subordinação de algumas liberdades individuais à lógica coletiva do projeto nacional. A soberania sobre os recursos naturais contra as multinacionais estrangeiras é frequentemente o eixo central do discurso político.",
      curiosities: "Gamal Abdel Nasser, ao nacionalizar o Canal de Suez em 1956, provocou uma das últimas tentativas militares coloniais da história: a Crise de Suez, em que Reino Unido, França e Israel invadiram o Egito — apenas para serem forçados a recuar pela pressão conjunta de Estados Unidos e União Soviética, que se opuseram à ação de seus próprios aliados. Este episódio marcou simbolicamente o fim do imperialismo colonial clássico europeu e consagrou Nasser como herói do mundo árabe e do movimento dos países não alinhados."
    },
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
    content: {
      history: "O Socialismo Religioso como movimento organizado tem raízes no socialismo cristão europeu do século XIX, mas ganhou sua expressão mais poderosa e influente com a Teologia da Libertação latino-americana, surgida nas décadas de 1960 e 1970 em resposta às ditaduras militares e à pobreza extrema da região. O teólogo peruano Gustavo Gutiérrez publicou em 1971 'Teologia da Libertação', obra fundacional que propunha 'ver a história a partir dos pobres'. No Brasil, figuras como Dom Hélder Câmara, Leonardo Boff e Frei Betto articularam essa visão com movimentos de base, como as Comunidades Eclesiais de Base (CEBs), que organizavam trabalhadores e camponeses usando textos bíblicos como ferramentas de conscientização política. Oscar Romero, arcebispo de El Salvador, foi assassinado em 1980 enquanto celebrava missa, tornando-se mártir e símbolo internacional da resistência religiosa às ditaduras.",
      corePrinciples: "O Socialismo Religioso parte da premissa de que a fé autêntica exige compromisso histórico com a justiça social. O 'pecado' não é apenas individual e espiritual, mas também estrutural: sistemas econômicos que geram pobreza e exclusão são vistos como estruturas de pecado que precisam ser transformadas. A 'Opção Preferencial pelos Pobres' é o princípio hermenêutico central: Deus está do lado dos oprimidos, e a Igreja deve estar também. A Bíblia é lida como um texto político que narra a libertação histórica dos escravizados (Êxodo) e o projeto de um reino de justiça e partilha. Esta corrente rejeita tanto o ateísmo marxista tradicional quanto a religiosidade apolítica que legitima a ordem estabelecida.",
      curiosities: "O Vaticano, sob João Paulo II e o Cardeal Ratzinger (futuro Bento XVI), expressou objeções formais à Teologia da Libertação em 1984 e 1986, acusando-a de adotar de forma acrítica conceitos marxistas. Paradoxalmente, o Papa Francisco (Jorge Mario Bergoglio), eleito em 2013, é frequentemente associado a uma visão social próxima da Teologia da Libertação — sendo o primeiro papa latino-americano da história — demonstrando como essas ideias permearam profundamente a cultura eclesial do continente, mesmo sem nunca terem sido formalmente aprovadas."
    },
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
    content: {
      history: "O Socialismo Democrático tem raízes na Segunda Internacional Socialista (fundada em 1889), que reunia partidos socialistas de toda a Europa comprometidos com a via parlamentar para o socialismo. A grande cisão ocorreu em 1917: enquanto os bolcheviques russos optaram pela revolução violenta, os social-democratas europeus permaneceram no campo democrático. Na Alemanha, Rosa Luxemburgo (que depois migraria para posições mais radicais) e Karl Kautsky debateram intensamente os limites do reformismo eleitoral. No Terceiro Mundo, líderes como Julius Nyerere na Tanzânia (com o ujamaa, socialismo africano comunal) e Michael Manley na Jamaica tentaram construir caminhos socialistas autônomos. No século XXI, o movimento revitalizou-se com figuras como Bernie Sanders nos EUA e o PSOL no Brasil, atraindo jovens desiludidos tanto com o capitalismo quanto com as experiências autoritárias do socialismo real do século XX.",
      corePrinciples: "O Socialismo Democrático sustenta que as liberdades civis, o pluralismo político e a democracia representativa são valores intrínsecos — não apenas instrumentais — que devem ser preservados e aprofundados no caminho ao socialismo. Propõe a socialização progressiva dos meios de produção através de mecanismos democráticos: cooperativização, propriedade pública de bancos e setores estratégicos, gestão democrática das empresas. Diferencia-se da Social-Democracia clássica por não aceitar o capitalismo como estrutura permanente, mas buscar sua superação gradual. Defende o sufrágio universal ampliado com formas de democracia direta e participativa, e uma economia orientada para o bem comum em vez do lucro privado.",
      curiosities: "Pepe Mujica (José Mujica), ex-guerrilheiro tupamaro e presidente do Uruguai (2010–2015), é talvez o exemplo mais singular de socialista democrático do século XXI. Ele doou mais de 90% de seu salário presidencial para programas sociais e continuou vivendo em sua fazenda humilde durante o mandato, com dois cães e um carro Volkswagen Fusca de 1987. Sob sua presidência, o Uruguai legalizou o aborto, o casamento igualitário e foi o primeiro país do mundo a legalizar e regulamentar a produção e venda de maconha pelo Estado."
    },
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
    content: {
      history: "O Socialismo Revolucionário como corrente coerente articula-se em torno da convicção, nascida das lições de 1848 e 1917, de que classes dominantes nunca abrem mão voluntariamente do poder acumulado. Na América Latina, sua expressão mais marcante foi a Revolução Cubana de 1959, liderada por Fidel Castro e Che Guevara, que inspirou dezenas de movimentos guerrilheiros nas décadas seguintes — Tupamaros no Uruguai, FARC na Colômbia, Sendero Luminoso no Peru, MST e MR-8 no Brasil. Thomas Sankara, que governou Burkina Faso entre 1983 e 1987, realizou uma das experiências mais radicais de socialismo revolucionário africano: alfabetização em massa, vacinação em grande escala, proibição de excisões femininas e redistribuição de terras latifundiárias, tudo em apenas quatro anos antes de ser assassinado num golpe orquestrado com suspeita cumplicidade francesa.",
      corePrinciples: "O Socialismo Revolucionário sustenta que o sistema capitalista é intrinsecamente incapaz de ser reformado para atender aos interesses da maioria, pois o poder econômico das classes dominantes se traduz inevitavelmente em poder político. Qualquer avanço social conquistado dentro do capitalismo pode ser revertido quando a correlação de forças mudar. Portanto, a única via para a emancipação real é a ruptura revolucionária: a tomada do poder político pelas massas organizadas e a destruição do aparelho estatal burguês. Esta corrente prioriza a consciência de classe, a disciplina organizativa, a formação política militante e — quando necessário — a resistência armada como autodefesa histórica dos oprimidos contra a violência sistêmica do capital.",
      curiosities: "Che Guevara, médico argentino que participou da Revolução Cubana e depois tentou exportá-la para Congo e Bolívia, tornou-se o maior ícone pop da esquerda revolucionária mundial. Ironicamente, seu rosto estampado em camisetas — símbolo máximo de resistência ao capitalismo — é hoje um dos produtos mais vendidos globalmente, transformado em mercadoria pelo mesmo sistema que ele combatia. Guevara foi capturado e executado sem julgamento pela CIA e pelo exército boliviano em outubro de 1967, com 39 anos."
    },
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
    content: {
      history: "O Socialismo Libertário como ideia percorre toda a história do pensamento emancipatório moderno, desde Proudhon e Bakunin no século XIX, passando pela CNT espanhola e pelo movimento de trabalhadores industriais da América (IWW) no início do século XX, até a New Left dos anos 1960 e 1970. Em seu leque estão incluídas correntes tão diversas quanto o Anarcossindicalismo (que vê os sindicatos revolucionários como o embrião da nova sociedade), o Conselhismo (que aposta nos conselhos de trabalhadores como forma autônoma de poder), e vertentes mais recentes como o Socialismo do Século XXI de inspiração latino-americana. Noam Chomsky e David Graeber são os dois intelectuais contemporâneos mais associados ao campo, tendo ambos combinado rigorosa crítica ao capitalismo com a defesa das liberdades civis e do pensamento crítico independente.",
      corePrinciples: "O Socialismo Libertário reúne todas as correntes anticapitalistas que, simultaneamente, se opõem às hierarquias ilegítimas de toda ordem — estatal, econômica, cultural, patriarcal. Diferência central em relação ao anarco-comunismo clássico: o Socialismo Libertário não necessariamente exige a abolição imediata do Estado, mas insiste na abolição do capitalismo e no aprofundamento radical da democracia. Prefere construir alternativas 'prefigurativas' — cooperativas, assembleias, espaços autônomos — dentro da sociedade existente, transformando o mundo de forma prática, não apenas através da tomada do poder estatal. A crítica da alienação do trabalho, da dominação burocrática e do controle corporativo da mídia e da cultura são pilares centrais dessa visão.",
      curiosities: "David Graeber, antropólogo anarquista americano, foi um dos organizadores intelectuais do movimento Occupy Wall Street em 2011, que popularizou a divisão '99% vs. 1%' e influenciou profundamente a linguagem da política progressista americana. Seu livro 'Debt: The First 5,000 Years' (2011) argumentou que a dívida e o dinheiro não são fenômenos naturais do mercado, mas invenções políticas historicamente vinculadas à violência estatal — e se tornou um dos livros de ciências sociais mais lidos da década."
    },
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
    content: {
      history: "O Populismo de Esquerda como fenômeno moderno tem raízes na América Latina do século XX, com os movimentos de Getúlio Vargas no Brasil, Juan Perón na Argentina e, mais recentemente, com o Bolivarismo de Hugo Chávez e o Kirchnerismo argentino. No plano teórico, o filósofo argentino Ernesto Laclau (1935–2014) e sua parceira Chantal Mouffe forneceram a base conceitual mais sofisticada desta corrente na obra 'Hegemonia e Estratégia Socialista' (1985) e, especialmente, 'A Razão Populista' (2005). No Brasil, o PT de Lula representa a variante mais bem-sucedida eleitoralmente, tendo retirado mais de 30 milhões de pessoas da pobreza extrema entre 2003 e 2014 através dos programas Bolsa Família e políticas de valorização do salário mínimo, dentro de uma lógica de redistribuição de renda sem questionar estruturalmente a propriedade do capital.",
      corePrinciples: "O Populismo de Esquerda constrói a política em torno de uma fronteira antagonista entre 'o povo' (os de baixo, os produtores, os excluídos) e 'a elite' (os rentistas, os banqueiros, os latifundiários, o imperialismo). Esta lógica é deliberadamente mais ampla e emocional que a análise marxista de classes, buscando aglutinar setores sociais heterogêneos (trabalhadores, pequena burguesia, movimentos sociais, igrejas) em torno de uma identidade popular unificada. Propõe um Estado ativo e redistributivo, a defesa da soberania nacional e o controle estratégico de setores-chave da economia. Reivindica lideranças carismáticas como necessárias para articular a demandas dispersas do povo numa vontade coletiva capaz de desafiar as elites.",
      curiosities: "O Bolsa Família brasileiro, criado em 2003 por Lula ao unificar programas sociais anteriores, tornou-se referência mundial de política de redução da pobreza e foi estudado e replicado em mais de 50 países — inclusive por nações tão diferentes quanto os Estados Unidos, México e Quênia. O economista do MIT Abhijit Banerjee (Prêmio Nobel de Economia 2019) e outros pesquisadores demonstraram que transferências diretas de renda como o Bolsa Família são mais eficientes e menos paternalistas do que a maioria das políticas sociais tradicionais."
    },
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
    content: {
      history: "O Justicialismo nasceu formalmente com a eleição de Juan Domingo Perón (1895–1974) como presidente da Argentina em 1946, após um golpe militar em 1943 que o alçou ao Ministério do Trabalho — posição a partir da qual construiu uma base de apoio sindical massiva antes de chegar à presidência. Eva Perón (Evita, 1919–1952), sua segunda esposa, tornou-se a figura mais amada e odiada do movimento: fundou a Fundação Eva Perón, que distribuía habitações, hospitais e bens de consumo aos 'descamisados' (os trabalhadores pobres), e foi a primeira mulher a votar numa eleição nacional argentina em 1951. O peronismo sobreviveu à ditadura que depôs Perón em 1955, à sua morte em 1974, a ditaduras militares e ao neoliberalismo de Carlos Menem nos anos 1990, mantendo-se como a maior força política da Argentina até o século XXI.",
      corePrinciples: "O Justicialismo fundamenta-se em três pilares: Soberania Política (independência nacional frente às potências estrangeiras), Independência Econômica (industrialização e controle estatal de setores estratégicos, especialmente o petróleo) e Justiça Social (redistribuição de renda, direitos trabalhistas e integração dos 'descamisados' na vida política e econômica do país). Rejeita tanto o liberalismo quanto o marxismo, propondo a 'Terceira Posição' como alternativa ao capitalismo e ao comunismo. O corporativismo peronista, com sindicatos poderosos como pilares do Estado, é o mecanismo prático dessa síntese. Sua característica mais marcante é a flexibilidade ideológica: líderes radicalmente diferentes como Héctor Cámpora (de esquerda) e José López Rega (de extrema direita) coexistiram sob o mesmo manto peronista.",
      curiosities: "O termo 'descamisados', usado por Evita para designar os trabalhadores humildes que apoiavam Perón, surgiu como insulto da classe alta argentina, que chamava pejorativamente os partidários populares de 'sem camisa' — e Evita o transformou num orgulhoso símbolo de identidade. A popularidade de Eva Perón foi tão extraordinária que, após sua morte de câncer em 1952 com 33 anos, o Partido Peronista chegou a propor formalmente ao Vaticano sua canonização como santa, pedido que foi negado pela Igreja Católica."
    },
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
    content: {
      history: "O Distributismo como doutrina articulada surge sobretudo com G.K. Chesterton (1874–1936) e Hilaire Belloc (1870–1953), ambos intelectuais católicos britânicos que respondiam à questão social do industrialismo com uma alternativa que não fosse nem o socialismo (que entregava a propriedade ao Estado) nem o capitalismo (que a concentrava em poucos). Chesterton resumiu o problema em sua frase lapidar: 'o problema do capitalismo não é que exista muita propriedade privada, mas que existe de menos'. A encíclica 'Rerum Novarum' (1891) do Papa Leão XIII, que condenava tanto o socialismo quanto o liberalismo econômico e defendia o direito dos trabalhadores à propriedade, é o documento fundacional do pensamento social cristão que embasa o distributismo. Na prática, a experiência mais bem-sucedida de distributismo é a Cooperativa Mondragón, fundada em 1956 pelo padre basque José María Arizmendiarrieta no País Basco espanhol, hoje o maior grupo cooperativo do mundo, com mais de 80 mil trabalhadores-proprietários.",
      corePrinciples: "O Distributismo opõe-se tanto ao capitalismo concentrador (monopólios, grandes corporações, latifúndios) quanto ao socialismo estatal (propriedade coletiva gerida pela burocracia), propondo em seu lugar a ampla distribuição da propriedade produtiva (terra, ferramentas, pequenas empresas) entre o maior número possível de famílias e indivíduos. O princípio da subsidiraridade — cada problema deve ser resolvido no nível mais local possível, sem que instâncias superiores substituam o que as menores podem fazer — é herdado diretamente da Doutrina Social da Igreja e é central para o Distributismo. Valoriza o artesanato, a agricultura familiar, as guildas medievais atualizadas e as cooperativas como modelos econômicos. Opõe-se ao gigantismo estatal e corporativo por razões tanto práticas quanto espirituais, vendo a concentração de poder econômico como uma ameaça à liberdade e à dignidade humana.",
      curiosities: "Chesterton nunca usou formalmente o termo 'distributismo', preferindo descrever suas ideias como um retorno à propriedade humana normal. Além de ser um dos maiores polemistas britânicos de sua época, ele também criou o personagem do Padre Brown — o padre-detetive que resolveu mistérios através de profundidade psicológica e intuição moral, não de ciência forense. J.R.R. Tolkien e C.S. Lewis, dois dos maiores escritores cristãos do século XX, eram profundamente influenciados pelo pensamento de Chesterton."
    },
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
    content: {
      history: "A Democracia Cristã como movimento político organizado emergiu na Europa Ocidental após a Segunda Guerra Mundial como uma alternativa tanto ao fascismo derrotado quanto ao comunismo emergente e ao liberalismo sem valores. Konrad Adenauer na Alemanha (CDU), Alcide De Gasperi na Itália (DC) e Robert Schuman na França foram os 'Pais Fundadores' da Europa cristã-democrata e da própria integração europeia. A 'Economia Social de Mercado' alemã — um capitalismo regulado com forte Estado de bem-estar, cogestão dos trabalhadores nas empresas e cooperação social — é considerada a maior conquista prática da Democracia Cristã e foi determinante para o 'Milagre Econômico Alemão' do pós-guerra (Wirtschaftswunder). Na América Latina, partidos democrata-cristãos tiveram papel relevante no Chile (Eduardo Frei Montalva), na Venezuela e no Brasil.",
      corePrinciples: "A Democracia Cristã baseia-se na aplicação dos princípios do ensinamento social da Igreja — especialmente dignidade da pessoa humana, solidariedade social e subsidiariedade — à política democrática pluralista. A Economia Social de Mercado combina livre iniciativa e propriedade privada com regulação estatal, proteção social e responsabilidade das empresas para com seus trabalhadores e a comunidade. O princípio da subsidiariedade — cada problema deve ser resolvido pelo nível mais próximo do cidadão, com o Estado intervindo apenas quando necessário — é central para limitar o Estado sem eliminá-lo. Opõe-se ao laicismo agressivo e defende que os valores cristãos devem informar a vida pública sem que a Igreja assuma o comando do Estado.",
      curiosities: "Robert Schuman, um dos pais fundadores da União Europeia e ex-ministro das Relações Exteriores da França, foi declarado 'Servo de Deus' pelo Vaticano em 2004, primeiro passo para uma possível beatificação. A ironia histórica é que a construção do projeto europeu — frequentemente atacada hoje por conservadores e populistas como uma burocracia secularista — foi em grande parte obra de católicos fervorosos motivados pela visão cristã de fraternidade universal entre os povos europeus."
    },
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
    content: {
      history: "A Social-Democracia nasceu das organizações trabalhistas europeias do final do século XIX, mas ganhou sua forma definitiva após as duas Guerras Mundiais. O modelo nórdico — construído principalmente nos anos 1930 a 1970 pela social-democracia sueca (SAP), com Tage Erlander (primeiro-ministro por 23 anos ininterruptos entre 1946 e 1969) como figura central — combinou pleno emprego, negociação coletiva, Estado universal de bem-estar e economia de mercado aberta numa síntese notavelmente estável. Olof Palme, assassinado em 1986, representou o pico de uma social-democracia internacionalista que apoiava movimentos de libertação africanos e combatia a Guerra do Vietnã, combinando reformismo doméstico com uma política externa progressista radical. Na Alemanha, Willy Brandt (chanceler 1969–1974) iniciou a Ostpolitik — a aproximação diplomática com os países do Leste Europeu — e ganhou o Nobel da Paz em 1971.",
      corePrinciples: "A Social-Democracia aceita o capitalismo de mercado como o sistema mais eficiente para gerar riqueza, mas rejeita seus resultados distributivos espontâneos, intervindo ativamente para corrigir suas falhas através de impostos progressivos, regulação trabalhista e ambiental e provisão pública de serviços essenciais. O 'Estado de Bem-Estar Social' — que garante saúde universal, educação pública de qualidade, seguro-desemprego robusto, aposentadoria por repartição e habitação acessível — é a realização prática dessa síntese. O modelo nórdico demonstrou que alta tributação e generosa proteção social são compatíveis com alta produtividade, inovação e abertura comercial, refutando empiricamente o argumento liberal de que redistribuição necessariamente inibe o crescimento. Os sindicatos têm papel central na cogestão da economia e da política social.",
      curiosities: "A Suécia, frequentemente citada como o grande sucesso da Social-Democracia, foi governada ininterruptamente pelo Partido Social-Democrata por 44 anos consecutivos (1932–1976). Nesse período, o país transformou-se de uma das nações mais desiguais da Europa em uma das mais igualitárias do mundo, com alguns dos maiores índices de mobilidade social, expectativa de vida e qualidade de vida registrados. Paradoxalmente, a Suécia manteve uma das economias mais abertas ao comércio internacional e mais favoráveis às empresas do continente, desmentindo o estereótipo de que social-democracia equivale a estatismo econômico."
    },
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
    content: {
      history: "O Progressismo moderno tem raízes no movimento Progressista americano do início do século XX (1890–1920), que reagia à Gilded Age — período de extrema desigualdade, corrupção política e poder dos monopólios industriais. Figuras como Theodore Roosevelt, que 'quebrou' grandes trustes usando leis antimonopólio, e o filósofo John Dewey, que defendia a educação democrática como base do progresso cívico, definiram o tom dessa primeira onda. No século XX, os direitos civis dos afro-americanos, o feminismo de segunda onda, o ambientalismo e o movimento LGBT expandiram progressivamente o programa progressista, que passou a incluir não apenas redistribuição econômica mas também reconhecimento de identidades marginalizadas. O governo Lyndon Johnson nos EUA (1963–1969), com a Grande Sociedade e o Civil Rights Act, representa o pico do progressismo reformista governamental do século XX.",
      corePrinciples: "O Progressismo sustenta que a sociedade pode e deve ser melhorada através de políticas públicas baseadas em evidências científicas, expandindo progressivamente os círculos de direitos, proteção e oportunidade para grupos historicamente marginalizados. Diferentemente das vertentes revolucionárias, acredita na transformação gradual dentro do quadro democrático, combinando reformas institucionais com mudanças culturais. O Estado tem papel ativo como corretor das falhas do mercado e garantidor de direitos sociais. O progressismo contemporâneo é caracterizado pela interseccionalidade — o reconhecimento de que opressões de gênero, raça, classe e orientação sexual se cruzam e devem ser combatidas simultaneamente. Defende regulação ambiental robusta, proteção das minorias culturais e religiosas e políticas de ação afirmativa para corrigir desigualdades históricas estruturais.",
      curiosities: "O termo 'woke' — hoje frequentemente usado como insulto a progressistas — originalmente era uma gíria afro-americana que significava 'estar acordado para as injustiças sociais', especialmente o racismo sistêmico. Seu uso moderno remonta ao movimento pelos direitos civis dos anos 1960. A ironia é que foi apropriado como arma cultural pela direita para descrever genericamente o ativismo progressista, enquanto muitos progressistas passaram a rejeitar o próprio termo que suas comunidades haviam criado."
    },
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
    content: {
      history: "O Anarco-Mutualismo nasce com Pierre-Joseph Proudhon (1809–1865), gráfico autodidato francês que escreveu em 1840 'O Que é a Propriedade?' — onde cunhou a frase provocadora 'A Propriedade é um Roubo'. Proudhon foi o primeiro pensador a se autodeclarar publicamente 'anarquista', mas seu anarquismo era radicalmente diferente do de Bakunin ou Kropotkin: ele não queria abolir o mercado nem a pequena propriedade, mas sim eliminar os elementos parasitários do capitalismo — o lucro, o juro, a renda da terra — através de reformas institucionais. Na América do Norte, Benjamin Tucker (1854–1939) desenvolveu o mutualismo em diálogo com o individualismo americano de Lysander Spooner, criando uma versão mais libertária e pro-mercado da doutrina. O pensamento mutualista influenciou tanto a tradição anarquista quanto vertentes do cooperativismo e do socialismo de mercado.",
      corePrinciples: "O Anarco-Mutualismo defende que a exploração econômica não deriva da propriedade privada em si, mas do acesso privilegiado ao crédito e ao capital, que permite aos proprietários apropriar-se de parte do trabalho dos produtores. Se o crédito fosse gratuito (juro zero), se a terra fosse distribuída por uso e ocupação, e se o trabalhador retivesse o produto integral do seu trabalho, a exploração desapareceria sem necessidade de abolir o mercado ou a propriedade pessoal. O 'Banco do Povo' — uma cooperativa de crédito que fornecesse empréstimos a custo — é o instrumento prático central desta visão. A ordem social emerge de contratos livres e recíprocos entre indivíduos iguais, sem necessidade de Estado ou hierarquias centralizadas. O mutualismo é compatível com a pequena propriedade e com o intercâmbio de mercadorias, desde que baseados no trabalho efetivo.",
      curiosities: "Proudhon foi o primeiro grande pensador político moderno a propor a autogestão operária como alternativa ao capitalismo — décadas antes de Marx desenvolver sua teoria econômica completa. Os dois corresponderam-se e Marx chegou a elogiar Proudhon antes de atacá-lo virulentamente no livro 'Miséria da Filosofia' (1847), apelidando-o sarcasticamente de 'o filósofo da pequena-burguesia'. Apesar da rivalidade histórica, muitos princípios mutualistas reapareceriam décadas depois nas experiências de autogestão iugoslava, nas cooperativas de Mondragón e no socialismo de mercado do século XX."
    },
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
    content: {
      history: "O Comunismo Totalitário como sistema político completo materializou-se em seus exemplos mais extremos no Camboja do Khmer Vermelho (1975–1979) e na Coreia do Norte desde 1948. Pol Pot, líder do Khmer Vermelho formado em Paris, implementou o Plano Zero — uma tentativa de reiniciar a história apagando toda a herança urbana, acadêmica e cultural. Em quatro anos, seu regime resultou na morte de 1,5 a 2 milhões de pessoas — entre 20% e 25% da população total do Camboja — por execuções, fome e trabalho forçado. Kim Il-sung criou na Coreia do Norte o sistema Juche, uma ideologia de autossuficiência radical e culto dinástico da família Kim, com poder transmitido de pai para filho (Kim Jong-il e Kim Jong-un), num sistema único no mundo que combina iconografia comunista com monarquia hereditária de fato.",
      corePrinciples: "O Comunismo Totalitário distingue-se das demais formas de socialismo pela fusão absoluta e indissociável entre partido, Estado, ideologia e a pessoa do líder, que elimina qualquer fronteira entre esfera pública e privada. O controle não é apenas político e econômico, mas penetra na linguagem, na memória histórica, nos laços familiares e na vida íntima dos cidadãos, que são transformados em instrumentos do projeto coletivo encarnado pelo líder supremo. A dissidência não é apenas punida — é impossível por definição, pois o sistema controla os próprios pensamentos e sentimentos através de indoutrinação permanente. A economia é totalmente militarizada e planificada em função dos objetivos do regime, priorizando o armamento e a sobrevivência do poder sobre o bem-estar da população.",
      curiosities: "A Coreia do Norte mantém, até hoje, o Dia do Sol (15 de abril, aniversário de Kim Il-sung) como o feriado mais importante do ano, quando cidadãos são obrigados a comparecer a cerimônias públicas. O país possui um sistema de 'songbun' — classificação de lealdade ao regime herdada dos antepassados — que determina onde cada cidadão pode morar, trabalhar, estudar e até com quem pode se casar. George Orwell, ao escrever '1984' em 1948, baseou-se principalmente no stalinismo soviético; mal poderia imaginar que décadas depois existiria um Estado ainda mais próximo de sua distopia ficcional do que aquele que o inspirou."
    },
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
    content: {
      history: "A Tecnocracia como proposta política sistemática surgiu nos EUA dos anos 1930, durante a Grande Depressão, com o Movimento Tecnocrático liderado pelo engenheiro Howard Scott, que propunha substituir o sistema de preços e o governo por um sistema de administração energética científica. Na prática, a tecnocracia ganha força em contextos de crise financeira ou pós-conflito, quando a desconfiança nos políticos profissionais é máxima. As experiências mais emblemáticas foram as nomeações de Mario Monti (economista) e Mario Draghi (banqueiro central) como primeiros-ministros da Itália em períodos de crise (2011 e 2021, respectivamente), governando sem mandato eleitoral. Cingapura sob Lee Kuan Yew é frequentemente citado como o modelo mais bem-sucedido de governo tecnocrático: um sistema de meritocracia altamente competitivo que transformou a ilha em uma das economias mais ricas do mundo em poucas décadas.",
      corePrinciples: "A Tecnocracia parte da premissa de que problemas sociais complexos têm soluções objetivas identificáveis por especialistas treinados, e que a interferência de políticos eleitos movidos por interesses partidários ou popularidade imediata distorce essas soluções. O ideal tecnocrático é um governo de gestores neutros que 'administram as coisas, não as pessoas'. Na prática, o modelo defende que decisões cruciais — política monetária, normas alimentares, regulação ambiental — devem ser delegadas a agências independentes, isoladas da pressão eleitoral de curto prazo. É criticada por seu 'déficit democrático' e por assumir ilusoriamente que existe neutralidade política na ciência aplicada.",
      curiosities: "O Banco Central Europeu (BCE), o FMI e a OMC são frequentemente descritos como instituições tecnocráticas — organizadas por especialistas que tomam decisões econômicas globais com impacto sobre bilhões de pessoas sem mandato popular direto. Curiosamente, a crítica democrática a essas instituições uniu esquerda e direita em muitos países, embora por razões opostas: a esquerda as viu como instrumentos do capital global, a direita como ameaças à soberania nacional."
    },
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
    content: {
      history: "O Centrismo como posição política articulada ganhou proeminência com a 'Terceira Via' de Anthony Giddens e Tony Blair nos anos 1990, que buscava superar a divisão entre trabalhismo e conservadorismo britânicos. Bill Clinton nos EUA adotou estratégia similar com o Democratic Leadership Council, deslocando o Partido Democrata para o centro. Emmanuel Macron, fundador do movimento 'La République En Marche!' em 2016, é o exemplo mais recente de centrismo europeu que se apresenta deliberadamente como 'nem esquerda nem direita', priorizando a competência técnica e o europeismo sobre as fraturas ideológicas tradicionais. No Brasil, o centrismo associa-se historicamente ao 'Centrão' do Congresso — blocos de partidos que negociam apoio ao governo em troca de cargos e verbas.",
      corePrinciples: "O Centrismo defende o pragmatismo e a acomodação como virtudes políticas: as melhores políticas são aquelas baseadas em evidências, não em ideologias rígidas, e a democracia liberal funciona melhor quando governada por forças que buscam o consenso máximo possível. Defende o livre mercado com redes de segurança social modestas, a cooperação entre vários países (multilateralismo) e as instituições internacionais, e opõe-se às polarizações que considera 'extremistas'. Não é ideologicamente neutro, contudo: implicitamente assume a estabilidade do capitalismo de bem-estar como horizonte desejável. Critica tanto a redistribuição radical da esquerda quanto o conservadorismo social da direita.",
      curiosities: "A 'Lei de Duverger', formulada pelo cientista político francês Maurice Duverger em 1951, previu matematicamente que sistemas eleitorais majoritários tendem a produzir bipartidarismo, criando pressão estrutural para que ambos os partidos se movam ao centro. Isso explica por que o centrismo tende a dominar em sistemas majoritários — os partidos que não convergirem ao centro tendem a perder eleições consistentemente, independentemente de suas posições ideológicas."
    },
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
    content: {
      history: "O Liberalismo Social teve antecedentes no 'New Liberalism' britânico do final do século XIX, com T.H. Green e L.T. Hobhouse argumentando que a liberdade real exige condições materiais mínimas. O New Deal de Franklin D. Roosevelt nos EUA (1933–1945) foi a primeira grande expressão governamental do liberalismo social, criando o seguro-desemprego, a Previdência Social e a regulação do sistema financeiro. A teoria mais rigorosa do liberalismo igualitário foi formulada por John Rawls em 'Uma Teoria da Justiça' (1971): por trás de um 'véu de ignorância', ninguém escolheria uma sociedade sem redes de proteção, pois não sabe em que posição social vai nascer. No Brasil, Rui Barbosa foi o mais importante liberal clássico da República Velha, defensor fervoroso do habeas corpus e dos direitos individuais.",
      corePrinciples: "O Liberalismo de Esquerda sustenta que a liberdade individual é o valor central da política, mas que liberdade sem igualdade de oportunidades é uma ficção. O mercado livre é o mecanismo mais eficiente de coordenação econômica, mas precisa ser regulado para prevenir abusos monopolistas, externalidades ambientais negativas e a concentração excessiva de riqueza que corrói a própria liberdade política. O Estado deve garantir educação, saúde e renda mínima como pré-condições da liberdade efetiva. Opõe-se tanto ao autoritarismo estatal quanto ao libertarianismo puro. Defende o pluralismo, o multiculturalismo e o internacionalismo como extensões naturais do princípio liberal de respeito à diversidade individual.",
      curiosities: "John Rawls afirmou que o capitalismo de bem-estar não era suficiente para realizar sua teoria de justiça: o ideal seriam economias de propriedade amplamente distribuída ou socialismo de mercado — uma concepção significativamente mais radical do que a maioria de seus adeptos políticos reconhece ou implementa."
    },
    roast:
      "Você é tão mente aberta que seu cérebro caiu. Apoia todas as causas atuais até que elas afetem levemente o valor do seu imóvel.",
    politicians: [
      {
        name: "Geraldo Alckmin",
        link: "https://pt.wikipedia.org/wiki/Geraldo_Alckmin",
        stats: { econ: 40, dipl: 55, govt: 60, scty: 65 },
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
    content: {
      history: "O Anarquismo Religioso Cristão como doutrina estruturada deve-se sobretudo a León Tolstói (1828–1910), romancista russo que, após uma profunda crise espiritual, passou a interpretar o Evangelho de forma radicalmente literal e pacifista. Em 'O Reino de Deus Está em Vós' (1894), Tolstói argumentou que qualquer forma de governo humano viola o mandamento de Jesus de 'não resistência ao mal'. Seus escritos influenciaram diretamente Mahatma Gandhi, que os descobriu com 24 anos e os citou como inspiração fundamental para a Satyagraha (resistência passiva). Dorothy Day (1897–1980), convertida ao catolicismo e cofundadora do Movimento dos Trabalhadores Católicos americano, viveu num pacifismo radical que a colocou em conflito com o governo dos EUA durante guerras e com a própria hierarquia eclesiástica.",
      corePrinciples: "O Anarquismo Religioso sustenta que a autoridade humana é sempre uma usurpação da soberania divina. Toda a hierarquia humana — civil, eclesial, militar — é ilegítima. O pacifismo absoluto é a prática política central. A ordem social nasce da transformação íntima e espiritual de cada indivíduo, que ao viver segundo os mandamentos do amor ao próximo torna o Estado redundante. A resistência passiva e o sofrimento voluntariamente suportado é a arma moral mais poderosa contra a injustiça, pois expõe moralmente o opressor sem reproduzir a violência que o sustenta.",
      curiosities: "Tolstói, autor de 'Guerra e Paz' e 'Anna Karênina', foi excomungado pela Igreja Ortodoxa Russa em 1901 por suas ideias religiosas radicais. Ele doou os direitos autorais de suas obras a organizações de ajuda aos pobres e recusou o Prêmio Nobel da Literatura. Morreu em 1910 numa estação ferroviária anônima, fugindo de casa aos 82 anos para tentar viver em conformidade com seus ideais de pobreza e humildade — um dos finais mais extraordinários na história da literatura mundial."
    },
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
    content: {
      history: "O Populismo de Direita como fenômeno político contemporâneo refloresceu com especial intensidade após a crise financeira de 2008 e a crise de refugiados europeia de 2015. Viktor Orbán na Hungria fundou o conceito de 'democracia iliberal'. Donald Trump nos EUA em 2016 e Jair Bolsonaro no Brasil em 2018 representam variações do mesmo fenômeno, combinando retórica antiestablishment, conservadorismo cultural radical e uso das redes sociais para contornar a mídia tradicional. No Brasil, o bolsonarismo fundiu o populismo com um apostolado religioso neopentecostal, a cultura de armas e o anticomunismo tardio, criando uma base eleitoral de alta intensidade emocional e fidelidade ideológica.",
      corePrinciples: "O Populismo de Direita constrói a política em torno da fronteira entre 'o povo verdadeiro e virtuoso' (trabalhadores, patriotas, cristãos) e uma 'elite corrupta e cosmopolita' (mídia, universidades, globalismo). Defende controles de imigração rigorosos, soberania nacional frente a organismos internacionais, valores familiares tradicionais e políticas de lei e ordem. Economicamente, mescla livre iniciativa com protecionismo nacionalista seletivo. A desconfiança nas instituições democráticas — tribunais, imprensa, eleições — é um traço cada vez mais característico dessas correntes.",
      curiosities: "O cientista político húngaro Bálint Magyar cunhou o termo 'Estado Mafioso' para descrever o regime de Orbán: um sistema onde o poder político e o capital econômico estão fundidos numa rede de legalidade, e onde o processo de desmonte da democracia é gradual e recorre às próprias leis que deveria preservar, tornando a oposição legal progressivamente mais difícil sem que haja um golpe formalmente identificado."
    },
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
    content: {
      history: "O Reacionárismo como corrente filosófica organizada emergiu como resposta à Revolução Francesa (1789), que Joseph de Maistre (1753–1821) interpretou como o julgamento divino sobre uma civilização que havia rejeitado a autoridade da Igreja e do Rei. No século XX, a Escola Tradicionalista — com René Guénon e Julius Evola como principais expoentes — radicalizou esta visão ao propor um retorno às formas tradicionais de espiritualidade sagrada como única saída para a crise da modernidade. Nicolás Gómez Dávila, escritor colombiano que nunca deu entrevistas e raramente saiu de Bogotá, é o reacionário mais lido atualmente — seus aforismos viralizados em redes sociais atraem um enorme público online, sobretudo entre jovens desiludidos com a política contemporânea.",
      corePrinciples: "O Reacionárismo sustenta que a modernidade política — democracia, igualitarismo, secularismo, individualismo — é uma história de degeneração em relação a uma ordem hierárquica tradicional fundada na autoridade divina, na tradição cultural e na desigualdade natural entre os homens. Diferentemente do conservador, que aceita lentamente as mudanças orgânicas da sociedade, o reacionário busca ativamente reverter a história: restaurar a monarquia, a autoridade da Igreja na vida pública e as hierarquias sociais naturais. Desconfia profundamente da razão abstrata iluminista e prefere a sabedoria concreta da tradição, da Revelação e da experiência histórica acumulada.",
      curiosities: "Nicolás Gómez Dávila, considerado por muitos o maior filósofo colombiano do século XX, viveu internacionalmente desconhecido. Sua obra só foi descoberta pelo mundo após sua morte em 1994, quando traduções para o alemão criaram um seguimento cult europeu. Hoje seus aforismos são viralizados em redes sociais por reacionários e conservadores de todo o mundo — uma ironia máxima para um homem que desprezava profundamente a modernidade e qualquer tipo de popularidade midiática."
    },
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
    content: {
      history: "O Libertarianismo moderno foi sistematizado sobretudo nos EUA do século XX. Friedrich Hayek (1899–1992) e Ludwig von Mises (1881–1973), economistas austríacos exilados, construíram a crítica mais sistemática ao planejamento central, argumentando que o preço de mercado é o único mecanismo capaz de processar a informação dispersa numa economia complexa. Ayn Rand (1905–1982) popularizou o 'Objetivismo' em romances como 'A Fonte Viva' e 'A Revolta de Atlas'. Murray Rothbard (1926–1995) radicalizou o libertarianismo em direção ao anarco-capitalismo: se o Estado é coercitivo por definição, nenhuma forma de governo pode ser moralmente legítima. Javier Milei, eleito presidente da Argentina em 2023, tornou-se o primeiro chefe de Estado autodeclarado libertariano da história.",
      corePrinciples: "O Libertarianismo funda-se no Princípio de Não-Agressão (PNA): nenhuma pessoa ou instituição tem direito a iniciar o uso da força contra outra, exceto em legítima defesa. Todo o sistema moral e político decorre deste princípio: impostos são coerção; a única função legítima do Estado é proteger a vida, a liberdade e a propriedade. O livre mercado absoluto é visto como o sistema econômico mais eficiente e mais moral, pois baseia-se exclusivamente em trocas voluntárias. Defende liberdades civis plenas: legalização de drogas, direito ao aborto, livre imigração e liberdade de expressão irrestrita. Propõe uma política externa estritamente não-intervencionista.",
      curiosities: "Javier Milei foi eleito presidente da Argentina em 2023 com uma plataforma que inclua abolir o Banco Central argentino e dolarizar a economia — prometendo medidas que nenhum outro chefe de Estado havia tentado em escala nacional. Seu comportamento excluíante e uso agressivo das redes sociais redefiniu o debate político argentino, ao mesmo tempo que tornou o libertarianismo radica l num fenômeno cult global especialmente entre jovens do sexo masculino descontentes com o establishmént político."
    },
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
    content: {
      history: "O Nacional-Socialismo (Nazismo) surgiu na Alemanha devastada pela derrota na Primeira Guerra Mundial, pela humilhante paz de Versalhes (1919) e pela Hyperflação de 1923 que destruiu a classe média. Adolf Hitler (1889–1945), cabo austríaco e artista fracassado, fundou o NSDAP e ascendeu ao poder em 1933 pela via legal em aliança com a elite conservadora que subestimou sua radicalidade. O Regime Nazista (1933–1945) sistematizou o antissemitismo em leis (Lei de Nuremberg, 1935), campos de concentração e, finalmente, a 'Solução Final' — o exterminio industrial de 6 milhões de judeus e 5-6 milhões de outras vítimas, no maior crime genocida da história. A derrota na Segunda Guerra Mundial em 1945 pôs fim ao regime, que deixou um total de 70-85 milhões de mortos.",
      corePrinciples: "O Nazismo baseava-se em: ultranacionalismo racial (a 'raça ariana' como superior e destinada a dominar); antissemitismo como teoria conspirativa total; 'Führerprinzip' (princípio do líder absoluto, incontestavél, encarnando a vontade nacional); Lebensraum ('espaço vital', justificativa para a expansão territorial pela força); e um corporativismo econômico subordinado inteiramente aos objetivos de guerra e à raça. Rejeita a democracia como 'decadência', prega a eugen ia e vê a violência como força purificadora da nação. O Nazismo é reconhecido como um dos maiores crimes contra a humanidade da história e é crime em vários países.",
      curiosities: "A Conferência de Wannsee (20 de janeiro de 1942), que coordenou a logística do Holocausto entre 15 altos funcionários nazistas, durou menos de duas horas. Hannah Arendt, ao cobrir o julgamento de Adolf Eichmann em Jerusalém (1961), cunhou a expressão 'banalidade do mal': Eichmann era não um monstro excepcional, mas um burocrata comum que havia recusado pensar moralmente sobre o que fazia — alertando que o mal extremo pode ser perpetrado por pessoas absolutamente ord inárias."
    },
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
    content: {
      history: "A Autocracia tem como exemplos históricos mais emblemáticos o absolutismo monarquico europeu — com Luís XIV da França (1638–1715) como arquetípico, com sua frase 'L'état c'est moi' (O Estado sou eu) — e as ditaduras personalistas do século XX. No Oriente Médio, a Arábia Saudita dos Al-Saud e o Iraque de Saddam Hussein representam variações distintas: monarquia tribal fundada em valores islâmicos vs. ditador secular de inspiração ba'athista. O século XXI viu um ressurgimento autocrático com líderes que combinam legitimidade eleitoral inicial com o progressivo desmantelamento dos controles democráticos — o que politologistas como Steven Levitsky chamaram de 'morte das democracias pela erosão interna'.",
      corePrinciples: "A Autocracia baseia-se na concentração incontestavél do poder político, legislativo, judicial e frequentemente econômico nas mãos de uma única pessoa ou família, sem mecanismos efetivos de controle ou possibilidade de alternância pacífica de poder. A legitimidade pode ser derivada de: tradição dinas tica e autoridade sagrada (monarquias absolutas); carisma pessoal e vitória militar (Napoleão, Alexandre); ou controle do partido único (ditaduras modernas). A eficiência e a estabilidade são frequentemente invocadas como justificativas, mas a história mostra que regimes autocráticos são estruturalmente instáveis no longo prazo por não terem mecanismos pacíficos de sucessão.",
      curiosities: "Luís XIV governou a França por 72 anos e 110 dias — o reinado mais longo de qualquer monarca europeu na história. Ele centralizou sistematicamente o poder na corte de Versalhes, enfraquecendo a nobreza local ao transformá-la em cortesanes dependentes de sua benevolenci a. Paradoxalmente, o imenso gasto com Versalhes e as guerras de Luiz XIV contribuíram significativamente para o endividamento crônico do Estado francês — uma das causas estruturais da Revolução Francesa um século depois."
    },
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
    content: {
      history: "O Nacional-Autoritarismo manifestou-se em suas formas mais duradouras nos regimes de Salazar em Portugal (Estado Novo, 1933–1974) e Franco na Espanha (1939–1975), que sobreviveram a Mussolini e Hitler alinhando-se com os EUA como bastiões anticomunistas durante a Guerra Fria. No Brasil, o Estado Novo de Getúlio Vargas (1937–1945) criou a CLT e consolidou um nacional-desenvolvimentismo autoritário que moldou a economia brasileira por décadas. Salazar, professor de economia e devoto católico, governou Portugal por 36 anos sem jamais conceder entrevistas televisivas, promovendo uma ideologia de austeridade, catolicismo e paternalismo que manteve Portugal como um dos países mais pobres da Europa Ocidental até a Revolução dos Cravos (1974).",
      corePrinciples: "O Nacional-Autoritarismo baseia-se na subordinação das liberdades políticas à 'ordem, progresso e organização nacional', rejeitando tanto o pluralismo democrático quanto o igualitarismo revolucionário. O Estado atua como mediador absoluto entre capital e trabalho, eliminando conflitos de classe através de corporações oficiais que representam empregadores e trabalhadores sob a tutela estatal. Diferentemente do fascismo revolucionário, o Nacional-Autoritarismo é fundamentalmente conservador e passivo: busca 'depolitizar' as massas — mantê-las quietas, trabalhando e obedientes. A Igreja Católica tem papel central na legitimação do regime.",
      curiosities: "O Estado Novo de Salazar possui uma das mais extraordinárias ironias da história: enquanto colaborava com regimes fascistas europeus, o cônsul português Aristides de Sousa Mendes emitiu ilegalmente dezenas de milhares de vistos em 1940, salvando estimados 30.000 vidas de refugiados judeus fugindo do Holocausto — contrariando diretamente as ordens de Salazar, pelo que foi punido com demissão e perseguição pelo próprio regime."
    },
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
    content: {
      history: "O Fascismo como ideologia política organizada nasceu na Itália com Benito Mussolini (1883–1945), ex-socialista que fundou os Fasci Italiani di Combattimento em 1919, após a Primeira Guerra Mundial, num contexto de crise econômica e temor de uma revolução comunista. Mussolini chegou ao poder em 1922 com a 'Marcha sobre Roma', quando o Rei Vitor Emanuel III o convidou a formar governo. O Fascismo italiano era menos ideologicamente consistente e menos racista que o Nazismo alemão — Mussolini só adotou leis antijudaicas em 1938, sob pressão de Hitler. No Brasil, o Integralismo de Plínio Salgado foi a expressão do fascismo adaptado à realidade latino-americana. A derrota na Segunda Guerra Mundial deslegitimou o fascismo histórico, mas neofascismos emergem ciclicamente em períodos de crise social e desconfiança institucional.",
      corePrinciples: "O Fascismo é o único movimento político que afirma a negação das ideologias como sua própria ideologia. Mussolini escreveu que 'a ação é nossa fonte de doutrina'. Seus elementos fundamentais são: ultranacionalismo e exaltação da nação como organismo vivo; corporativismo econômico (fusão Estado-capital-trabalho); culto à ação e à violência; culto ao líder carismático; mobilização permanente das massas; e rejeição total do individualismo iluminista em favor do coletivismo nacional. O fascismo auto-identifica-se como uma 'Terceira Via' entre o capitalismo liberal e o socialismo de classes.",
      curiosities: "A palavra 'fascismo' vem do italiano 'fascio', que significa 'feixe' ou 'atado de gravetos' — simbolizando a força pela união. Umberto Eco publicou em 1995 o ensaio 'O Fascismo Eterno' (Ur-Fascism), listando 14 características do fascismo que, segundo ele, jamais desaparecem completamente da cultura política — tornando-se um dos textos mais citados em debates sobre autoritarismo contemporâneo."
    },
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
    content: {
      history: "O Conservadorismo clássico como tradición intelectual organizada nasce com Edmund Burke (1729–1797) e sua obra 'Reflexões sobre a Revolução na França' (1790), que atacou o projeto iluminista de refundar a sociedade em bases racionais abstratas, argumentando que a liberdade só sobrevive ancorada na tradição, nas instituições históricas e na moralidade religiosa herdada. Nos EUA, o século XX viu o conservadorismo transformar-se em movimento político com Russell Kirk, William F. Buckley e a fundação da National Review (1955). Na Inglaterra, Roger Scruton (1944–2020) defendeu que a beleza, a arquitetura e a estética conservadoras são expressões de um amor pelo lugar e pela continuidade. No Brasil, J.G. de Araujo Jorge e depois Gilberto Freyre representaram vertentes distintas do conservadorismo cultural luso-brasileiro.",
      corePrinciples: "O Conservadorismo sustenta que a prudencia é a virtude suprema da política: mudanças sociais brus cas e baseadas em teorias abstratas destroem as precárias e preciosas instituições que garantem a ordem civil. A sociedade é um organismo vivo, não uma máquina que pode ser desmontada e remontada à vontade: sua sabedoria reside nas tradições, costumes e instituições que sobreviveram ao teste do tempo. Respeita a propriedade privada, a autoridade legítima, a hierarquia natural, a familia e a religião como pilares da vida civil. Opõe-se igualmente ao igualitarismo radical da esquerda e ao individualismo sem raízes do libertarianismo. O conservadorismo autentíco diferencia-se do reacionárismo por aceitar a mudança gradual e orgânica.",
      curiosities: "Thomas Sowell, economista e intelectual conservador americano nascido na pobreza extrema na Carolina do Sul em 1930, argumentou que a divisão política fundamental não é esquerda vs. direita, mas entre duas 'visões': a 'visão restrita' (conservadora) que aceita as limitações da natureza humana, e a 'visão irrestrita' (progressista) que acredita que a natureza humana pode ser infinitamente aperffeiçoada pela engenharia social — tese exposta em 'A Conflict of Visions' (1987), livro que continua central no debate conservador americano."
    },
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
    content: {
      history: "O Liberalismo Clássico construiu os alicerces da modernidade ocidental em três grandes ondas: a Revolução Gloriosa inglesa de 1688 (inspirada por John Locke); a Revolução Americana de 1776; e a Revolução Francesa de 1789. Adam Smith publicou 'A Riqueza das Nações' em 1776, argumentando que a divisão do trabalho e a livre troca são os motores do progresso econômico. John Stuart Mill (1806–1873) expandiu o liberalismo para incluir as mulheres e as minorias, publicando em 1869 'A Submissão das Mulheres'. No Brasil, Rui Barbosa foi o maior representante do liberalismo clássico, lutando pelo habeas corpus, pelo federalismo e pela abolição da escravatura dentro de um quadro de Estado de Direito.",
      corePrinciples: "O Liberalismo Clássico parte da tese lockiana de que todo ser humano possui direitos naturais à vida, à liberdade e à propriedade — direitos que precedem e limitam o poder estatal. O Estado legítimo é aquele fundado no contrato social e no consentimento dos governados, cujo papel deve ser limitado à proteção desses direitos e à garantia do império da lei. O livre mercado e a livre troca são as formas mais eficientes e éticas de organização econômica, pois respeitam a liberdade individual. O princípio do dano (harm principle) de Mill é central: o único fundamento legítimo para restringir a liberdade de alguém é prevenir dano a terceiros.",
      curiosities: "John Locke escreveu seus 'Dois Tratados sobre o Governo' (1689) como justificativa da Revolução Gloriosa que depôs o Rei Jaime II da Inglaterra — mas publicou o texto como se fosse anterior ao evento para proteger-se. Thomas Jefferson, ao escrever que 'todos os homens são criados iguais', adaptou quase literalmente a formulação de Locke sobre direitos naturais — substituindo 'propriedade' por 'busca pela felicidade', numa mudança sutil que tem fascinado historiadores por séculos."
    },
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
    content: {
      history: "O Capitalismo Autoritário como modelo emergiu em dois grandes contextos: os regimes militares latino-americanos das décadas de 1960-80 (Chile de Pinochet, Brasil da ditadura militar) e os 'Tigres Asiáticos' que combinaram mercados abertos com autoritarismo político (Singapura de Lee Kuan Yew, Coreia do Sul de Park Chung-hee). O experimento mais radical foi o Chile de Pinochet (1973–1990): após o golpe que depôs Salvador Allende, a ditadura implantou as reformas dos 'Chicago Boys' — economistas formados com Milton Friedman — privatizando empresas estatais e abrindo a economia ao capital estrangeiro, enquanto perseguia opositores. Lee Kuan Yew em Singapura construiu um Estado eficiente e próspero sem violações brutais dos direitos humanos, mas com severa restrição das liberdades civis.",
      corePrinciples: "O Capitalismo Autoritário parte da premissa de que o desenvolvimento econômico acelerado requer uma autoridade política forte que possa tomar decisões impopulares sem pressão eleitoral de curto prazo e suprimir conflitos trabalhistas que assustam investidores. Combina livre mercado, propriedade privada e integração ao comércio global com repressão dos direitos sindicais, limitação da imprensa e do judiciário independente. A 'sequência de Lee Kuan Yew' defende que o progresso econômico deve preceder a democracia política.",
      curiosities: "Milton Friedman, teórico do livre mercado e Nobel de Economia, visitou o Chile de Pinochet em 1975 e deu aulas para economistas do regime, tornando-se alvo de forte controvérsia acadêmica. Anos depois, declarou que a liberdade econômica e a liberdade política andariam juntas no longo prazo — uma previsão que o exemplo chinês tem desafiado enfaticamente desde os anos 1990."
    },
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
    content: {
      history: "O Capitalismo de Estado ganhou forma moderna com o Plano de desenvolvimento de Park Chung-hee na Coreia do Sul (1963–1979), que utilizou grandes conglomerados industriais (chaebols — como Samsung, Hyundai e LG) direcionados pelo Estado para industrializar o país em décadas. Na China, Deng Xiaoping iniciou em 1978 as 'Reformas e Abertura', criando as Zonas Econômicas Especiais que transformaram a China numa potência industrial global em apenas três décadas, sem jamais abandonar o monopólio político do Partido Comunista. O resultado — maior crescimento econômico sustentado da história humana, com centenas de milhões de pessoas saindo da pobreza — tornou o modelo chinês objeto de intenso debate.",
      corePrinciples: "O Capitalismo de Estado usa o mercado como ferramenta, não como ideologia. O Estado dirige o capital — através de bancos de desenvolvimento estatais, empresas públicas nos setores estratégicos e política industrial seletiva — para atingir objetivos nacionais de longo prazo que o mercado privado não alcançaria por conta própria. Prioriza setores estratégicos para a segurança nacional (energia, comunicações, tecnologia) e protege as empresas nacionais enquanto as prepara para competir globalmente. Difere do socialismo soviético por não abolir a propriedade privada ou o lucro.",
      curiosities: "Quando Deng Xiaoping foi perguntado sobre como compatibilizar o comunismo com o mercado, teria respondido: 'Não importa se o gato é branco ou preto, desde que cace ratos.' Esta frase tornou-se o aforismo mais citado sobre pragmatismo ideológico do século XX. A China de hoje é simultaneamente o maior produtor de energias renováveis do mundo e o maior emissor de CO2, o maior mercado de luxo global e um país comunista de partido único — ilustrando a profunda ambiguidade do modelo."
    },
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
    content: {
      history: "O Neoconservadorismo surgiu nos EUA dos anos 1960-70 com intelectuais que começaram como socialistas ou democratas e migraram para a direita diante do que viam como o fracasso da Grande Sociedade de Johnson e da ingenuidade da esquerda anti-guerra em relação ao comunismo soviético. Irving Kristol (1920–2009), chamado de 'padrinho do neoconservadorismo', definiu o neoconservador como 'um liberal atacado pela realidade'. A hegemonia neocon atingiu seu auge com a administração de George W. Bush (2001–2009), que usou os ataques de 11 de setembro como justificativa para invadir o Iraque (2003) — uma guerra que criou o vazio de poder que deu origem ao Estado Islâmico.",
      corePrinciples: "O Neoconservadorismo distingue-se do conservadorismo tradicional por sua política externa intervencionista e messiânica: os EUA têm não apenas o direito, mas o dever moral de usar sua superpotência para promover a democracia liberal globalmente, inclusive pela força militar preventiva. Internamente, defende a virtude cívica, o patriotismo, a família tradicional e a autoridade moral em detrimento do relativismo cultural da esquerda. Aceita o Estado de Bem-Estar Social herdado do New Deal, mas com reformas de eficiência.",
      curiosities: "Francis Fukuyama, que havia publicado 'O Fim da História e o Último Homem' (1992), prevendo a vitória definitiva da democracia liberal, foi um dos neoconservadores que publicamente se arrependeu do apoio à invasão do Iraque, publicando 'America at the Crossroads' (2006) criticando o messianismo militarista — expondo as contradições internas do neoconservadorismo entre sua aspiração universal e sua lógica imperial."
    },
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
    content: {
      history: "O Fundamentalismo Religioso como fenômeno político moderno tem o Irã como referência central: a Revolução Islâmica de 1979, liderada pelo Aiatolá Khomeini, foi o primeiro caso moderno de estabelecimento de uma teocracia islâmica plena no século XX, criando a República Islâmica com uma constituição baseada no Corão. O movimento wahhabita saudita, financiado pelos petrodólares do Reino da Arábia Saudita desde os anos 1970, exportou uma versão rígida do islamismo sunita para todo o mundo muçulmano. O Fundamentalismo cristão protestante americano tornou-se força política com a Moral Majority de Jerry Falwell nos anos 1980, moldando a política sobre aborto, casamento gay e ensino da teoria evolucionista nas escolas.",
      corePrinciples: "O Fundamentalismo Religioso baseia-se na premissa de que um texto sagrado é literalmente verdadeiro em todos os seus aspectos — históricos, científicos e morais — e que toda a vida social, política e jurídica deve ser organizada em conformidade com esse texto. Rejeita a interpretação histórico-crítica dos textos sagrados, o pluralismo religioso e o laicismo. A Sharia (lei islâmica), a Halachá (lei judaica ortodoxa) ou os mandamentos bíblicos (para cristãos fundamentalistas) devem ser a base do direito positivo do Estado. O secularismo é visto como uma apostasia da modernidade.",
      curiosities: "A palavra 'fundamentalismo' foi cunhada nos EUA em referência a uma série de panfletos chamados 'The Fundamentals' (1910–1915), que defendiam a literalidade das escrituras bíblicas contra a teologia liberal — incluindo a aceitação cristã da teoria evolucionista. O termo só começou a ser aplicado ao islamismo e a outras religiões na década de 1970. Hoje, o uso do termo é contestado por muitos muçulmanos devotos que rejeitam o terrorismo mas são igualmente classificados como 'fundamentalistas'."
    },
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
    content: {
      history: "O Anarco-Capitalismo foi sistematizado por Murray Rothbard (1926–1995), economista americano que sintetizou a teoria econômica da Escola Austríaca com a ética libertária do Princípio de Não-Agressão para chegar à conclusão de que o Estado é, por definição, uma organização criminosa. Rothbard desenvolveu sua teoria em obras como 'Man, Economy, and State' (1962). Hans-Hermann Hoppe expandiu o anarco-capitalismo com a 'teoria da argumentação', argumentando que o próprio ato de debater princípios éticos pressupõe o direito de propriedade sobre o próprio corpo. David Friedman, filho de Milton Friedman, ofereceu uma versão mais pragmática e utilitarista do anarco-capitalismo em 'The Machinery of Freedom' (1973).",
      corePrinciples: "O Anarco-Capitalismo defende que o Estado é radicalmente ilegítimo por basear-se no monopólio territorial da violência e na tributação coercitiva (que equipara a roubo). Todas as funções estatais — segurança, justiça, infraestrutura, saúde, educação — podem e devem ser fornecidas por agências privadas competindo num mercado livre. A ordem social emerge espontaneamente através de contratos voluntários, do sistema de preços e da proteção concorrencial da propriedade privada. O Princípio de Não-Agressão é o fundamento moral supremo: qualquer iniciação de força física é ilegítima, independentemente de quem a pratica.",
      curiosities: "Javier Milei, presidente da Argentina desde 2023, é o mais proeminente político autodeclarado anarco-capitalista do mundo — mas enfrenta a ironia prática de governar usando exatamente o aparato estatal que sua filosofia condena como ilegítimo. Rothbard, apesar de defender o livre mercado radical, chegou a fazer alianças táticas com a esquerda anti-intervencionista contra guerras americanas, revelando que o anarco-capitalismo como projeto político real é repleto de tensões e paradoxos práticos."
    },
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
    content: {
      history: "O Neocalvinismo como movimento teológico e político foi fundado pelo holandês Abraham Kuyper (1837–1920), pastor, jornalista, fundador do Partido Anti-Revolucionário e primeiro-ministro dos Países Baixos (1901–1905). Kuyper articulou a 'Soberania das Esferas' em suas 'Conferências sobre Calvinismo' (1898) na Universidade de Princeton. Seu discípulo Herman Dooyeweerd (1894–1977) desenvolveu a Filosofia da Ideia Cosmonomica, uma das mais ambiciosas tentativas de criar uma epistemologia cristã alternativa à modernidade secular. O neocalvinismo influenciou profundamente o pensamento reformado americano, canadense e sul-africano, e continua a inspirar movimentos de cosmovisão cristã em todo o mundo.",
      corePrinciples: "O Neocalvinismo sustenta que Cristo é soberano sobre todos os domínios da vida humana — não apenas sobre a esfera religiosa pessoal. Cada esfera da sociedade (Estado, Igreja, família, arte, ciência, negócios) tem sua própria soberania dada por Deus, o que impede que qualquer esfera — inclusive o Estado — assuma controle totalitário sobre as demais. O conceito de 'pluralismo institucional' defende que o Estado deve reconhecer e respeitar a autonomia das igrejas, escolas confessionais e associações civis. Rejeita tanto a teocracia (controle da Igreja sobre o Estado) quanto o jacobinismo (Estado laico que suprime expressões religiosas públicas).",
      curiosities: "Abraham Kuyper, além de político e teólogo, foi um prolífico jornalista e pregador que fundou a Vrije Universiteit de Amsterdam (1880) — a primeira universidade do mundo fundada por uma iniciativa civil não-estatal e não-eclesiástica. Seu princípio de que 'não existe um centímetro quadrado de toda a criação sobre o qual Cristo não clama soberania' tornou-se um dos aforismos mais citados do neocalvinismo e tem inspirado desde escolas cristãs até movimentos de arte e arquitetura confessional."
    },
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
    content: {
      history: "O Liberalismo Econômico de Direita ganhou forma como força política dominante com a eleição de Margaret Thatcher no Reino Unido (1979) e Ronald Reagan nos EUA (1981), que marcaram o fim do consenso keynesiano do pós-guerra e o início da era das privatizações, desregulamentações e cortes de impostos. No Brasil, Roberto Campos (1917–2001) foi o mais consistente defensor do liberalismo econômico, tendo sido ministro do governo Castelo Branco (1964–1967) e defendendo câmbio flutuante, abertura comercial e austeridade fiscal. Paulo Guedes, ministro da Economia de Bolsonaro (2019–2022), representou a tentativa mais recente de aplicar o programa liberal na escala brasileira, com resultados parciais e controversos.",
      corePrinciples: "O Liberalismo de Direita defende primariamente a redução drástica do tamanho e do papel do Estado na economia: privatizações das empresas estatais, desregulamentação dos mercados, simplificação tributária e responsabilidade fiscal rigorosa. Sustenta que a intervenção estatal na economia — mesmo bem-intencionada — produz distorções, ineficiências e corrupção que prejudicam especialmente os mais pobres. Diferencia-se do libertarianismo por aceitar um Estado com funções de segurança, justiça e redes de proteção social mínimas.",
      curiosities: "Roberto Campos, chamado de 'Bob Fields' por seus críticos (numa tradução irônica de seu nome), tornou-se senador pelo estado do Mato Grosso do Sul em 1991 e usou a tribuna do Senado para defender com rigor e humor o liberalismo econômico num país ainda fortemente estatista. Sua autobiografia 'A Lanterna na Popa' (1994) é considerada uma das mais inteligentes memórias políticas brasileiras — e um manifesto do pensamento liberal nacional."
    },
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
        stats: { econ: 15, dipl: 35, govt: 65, scty: 45 },
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
    content: {
      history: "O Integralismo Brasileiro nasceu em 1932 com a fundação da Ação Integralista Brasileira (AIB) por Plínio Salgado (1895–1975), escritor modernista paulista que havia participado da Semana de Arte Moderna de 1922 antes de aproximar-se do fascismo europeu. O movimento adotou a camisa verde, o sigma (σ) como símbolo e o cumprimento com o braço estendido. Em 1937, a AIB chegou a ter entre 200.000 e 400.000 membros — o maior movimento de massas do Brasil até aquele momento. Em 1938, após a tentativa fracassada de golpe contra Vargas, o movimento foi proibido e Plínio Salgado exilou-se em Portugal. Diferente do fascismo europeu, o Integralismo incorporou forte ênfase no catolicismo, no espiritualismo e na identidade nacional brasileira.",
      corePrinciples: "O Integralismo Brasileiro fundamentava-se no trinômio 'Deus, Pátria e Família', adaptando o corporativismo fascista europeu à realidade e ao catolicismo brasileiro. Defendia um Estado autoritário integral que superasse o liberalismo individualista e o marxismo materialista, propondo uma organização corporativista da sociedade onde classes e grupos profissionais fossem representados sem conflito. Seu antissemitismo era presente mas menos central que no nazismo alemão, e sua visão racial era mais ambígua, incluindo a celebração da mistura étnica brasileira ao lado de elementos xenofóbicos.",
      curiosities: "Gustavo Barroso, um dos líderes do Integralismo, era um antissemita virulento que traduziu e publicou o 'Protocolo dos Sábios de Sião' no Brasil. Paradoxalmente, Plínio Salgado nunca foi tão explicitamente antissemita, criando uma tensão interna irresolvida. Após a proibição do movimento, Plínio exilou-se em Portugal, foi recebido por Salazar e retornou ao Brasil anos depois, chegando a ser eleito deputado federal — mostrando a resiliência política do integralismo mesmo após sua derrota."
    },
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
    content: {
      history: "O Conservadorismo Liberal (ou Liberalconservadorismo) como projeto político organizado no Brasil ganhou expressão com a fundação do Partido Novo em 2016 por João Amoêdo, empresário do setor financeiro, e com o Movimento Brasil Livre (MBL), fundado em 2014 por jovens ligados ao Instituto Mises Brasil e outros think tanks liberais. Em 2022, o partido elegeu Nikolas Ferreira como a deputada federal mais votada da história do Brasil. Internacionalmente, o liberalconservadorismo foi o projeto da Era Thatcher-Reagan e é representado por partidos como o Partido Conservador britânico e o Partido Republicano americano (em sua versão pré-Trump).",
      corePrinciples: "O Conservadorismo Liberal une dois projetos que podem estar em tensão: a defesa da liberdade econômica (livre mercado, privatizações, desregulamentação, responsabilidade fiscal) com a valorização das instituições, tradições e valores morais estabelecidos (família, religião, nação, ordem). Defende privatizações e desregulamentação da economia, dentro de um quadro de respeito à ordem constitucional, à família tradicional e à cultura nacional. Distingue-se da Social-Democracia por rejeitar o Estado de Bem-Estar extenso, e do Libertarianismo por não defender as liberdades individuais em questões de costumes.",
      curiosities: "A tensão entre o componente liberal e o componente conservador do liberalconservadorismo tornou-se cada vez mais visível no Brasil dos anos 2020: segmentos do MBL aproximaram-se de pautas populistas e conservadoras culturais que contradiziam o liberalismo clássico, revelando que a fusão 'liberal na economia, conservador nos costumes' é frequentemente mais um posicionamento pragmático de classe do que uma filosofia política coerente."
    },
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
    content: {
      history: "O Feminismo atravessou três ondas históricas principais: a Primeira Onda (séc. XIX – início do XX) centrada no sufrágio feminino, com figuras como Mary Wollstonecraft, Susan B. Anthony e Emmeline Pankhurst; a Segunda Onda (anos 1960-80) que expandiu a luta para igualdade no trabalho, autonomia reprodutiva e violência doméstica, com Betty Friedan ('A Mística Feminina', 1963) e Simone de Beauvoir ('O Segundo Sexo', 1949) como obras fundadoras; e a Terceira Onda (anos 1990 em diante), que introduziu a interseccionalidade (Kimberlé Crenshaw) e a teoria queer (Judith Butler). No Brasil, Bertha Lutz liderou a luta pelo voto feminino conquistado em 1932.",
      corePrinciples: "O Feminismo sustenta que as desigualdades entre homens e mulheres são social e historicamente construídas — não biologicamente inevitáveis — e que as estruturas patriarcais que as perpetuam devem ser ativamente desconstruídas. Os princípios centrais variam conforme a corrente: o Feminismo Liberal foca em igualdade jurídica e representação institucional; o Feminismo Marxista vê a opressão de gênero como ligada à exploração de classe; o Feminismo Radical identifica o patriarcado como a estrutura primária de dominação; e o Feminismo Interseccional analisa como gênero, raça, classe e orientação sexual se cruzam e se reforçam mutuamente na produção de opressões específicas.",
      curiosities: "Simone de Beauvoir publicou 'O Segundo Sexo' em 1949, num ato que chocou a França: o Vaticano colocou o livro no Índice de Livros Proibidos. Sua frase 'não se nasce mulher, torna-se mulher' antecipou em décadas o debate contemporâneo sobre gênero como construção social. Ironicamente, Beauvoir viveu durante décadas numa relação aberta com Jean-Paul Sartre que, segundo cartas publicadas postumamente, incluía desequilíbrios de poder que ela mesma nunca analisou publicamente através de sua lente feminista."
    },
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
