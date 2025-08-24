// ideologies.js
// ADICIONADO: Campos 'desc', 'politicians', 'books' para cada ideologia.
// OBS: A seleção de políticos e livros é ilustrativa e pode ser subjetiva.
// Descrições tentam relacionar a ideologia aos eixos do teste (Igualdade/Mercado, Nação/Global, Liberdade/Autoridade, Tradição/Progresso).

ideologies = [
  {
    name: "Anarco-Comunismo",
    stats: { econ: 100, dipl: 50, govt: 100, scty: 90 },
    desc: "Busca a abolição completa do Estado (Liberdade total) e do capitalismo, defendendo uma sociedade baseada na propriedade comum dos meios de produção (Igualdade total) e associações voluntárias. Geralmente Progressista e neutro diplomaticamente.",
    politicians: ["Piotr Kropotkin (Teórico)", "Errico Malatesta (Teórico)", "Nestor Makhno (Líder Revolucionário)"],
    books: ["A Conquista do Pão (Kropotkin)", "Mutualismo: Um Fator de Evolução (Kropotkin)", "Anarquismo e Outros Ensaios (Emma Goldman)"]
  },
  {
    name: "Comunismo Libertário",
    stats: { econ: 100, dipl: 70, govt: 80, scty: 80 },
    desc: "Defende a máxima Igualdade econômica através da propriedade comum, mas com alta Liberdade individual e estruturas descentralizadas ou não-estatais. Favorece a diplomacia (Global) e o Progresso social.",
    politicians: ["Murray Bookchin (Teórico - fases iniciais)", "Daniel Guérin (Teórico)"],
    books: ["A Ecologia da Liberdade (Bookchin)", "Anarquismo: Da Teoria à Prática (Guérin)"]
  },
  {
    name: "Trotskismo",
    stats: { econ: 100, dipl: 100, govt: 60, scty: 80 },
    desc: "Variante do Marxismo que defende a revolução proletária internacional permanente (máximo Global e Igualdade). Critica o stalinismo e defende formas de democracia operária (moderada Liberdade), sendo socialmente Progressista.",
    politicians: ["Leon Trotsky (Teórico/Revolucionário)", "Ernest Mandel (Teórico)"],
    books: ["A Revolução Permanente (Trotsky)", "História da Revolução Russa (Trotsky)", "A Revolução Traída (Trotsky)"]
  },
  {
    name: "Marxismo",
    stats: { econ: 100, dipl: 70, govt: 40, scty: 80 },
    desc: "Baseado nas ideias de Karl Marx, busca a superação do capitalismo através da luta de classes, visando uma sociedade comunista sem classes e sem Estado (máxima Igualdade). Historicamente envolve uma fase de ditadura do proletariado (moderada Autoridade) e é internacionalista (Global) e Progressista.",
    politicians: ["Karl Marx (Filósofo)", "Friedrich Engels (Filósofo)", "Rosa Luxemburgo (Revolucionária)"],
    books: ["O Manifesto Comunista (Marx/Engels)", "O Capital (Marx)", "Reforma ou Revolução? (Luxemburgo)"]
  },
  {
    name: "De Leonismo",
    stats: { econ: 100, dipl: 30, govt: 30, scty: 80 },
    desc: "Forma de Marxismo sindicalista que defende o estabelecimento do socialismo (máxima Igualdade) através de sindicatos industriais revolucionários e ação política simultânea. É estatista na transição (Autoridade) e focado na Nação, mas socialmente Progressista.",
    politicians: ["Daniel De Leon (Teórico/Ativista)"],
    books: ["Reform or Revolution? (De Leon)", "Socialist Reconstruction of Society (De Leon)"]
  },
  {
    name: "Leninismo",
    stats: { econ: 100, dipl: 40, govt: 20, scty: 70 },
    desc: "Desenvolvimento do Marxismo por Lênin, enfatiza a necessidade de um partido de vanguarda para liderar a revolução proletária e estabelecer uma ditadura do proletariado (alta Autoridade) como transição para o comunismo (máxima Igualdade). Moderadamente focado na Nação e no Progresso.",
    politicians: ["Vladimir Lênin (Revolucionário/Teórico)"],
    books: ["O Estado e a Revolução (Lênin)", "Que Fazer? (Lênin)", "Imperialismo, Fase Superior do Capitalismo (Lênin)"]
  },
  {
    name: "Stalinismo/Maoismo", // Agrupados pelo teste original
    stats: { econ: 100, dipl: 20, govt: 0, scty: 60 },
    desc: "Ideologias totalitárias que implementaram o Marxismo-Leninismo com extremo autoritarismo (máxima Autoridade), culto à personalidade, controle estatal total sobre a economia (máxima Igualdade) e foco na construção do socialismo 'em um só país' (alta Nação). Socialmente pode variar, mas geralmente conservador na prática.",
    politicians: ["Josef Stalin (URSS)", "Mao Tsé-Tung (China)"],
    books: ["Fundamentos do Leninismo (Stalin)", "O Livro Vermelho (Citações de Mao Tsé-Tung)", "(Textos críticos como 'Arquipélago Gulag' de Soljenítsin ou 'A Vida Privada do Camarada Mao' de Li Zhisui oferecem contraponto)"]
  },
  {
    name: "Comunismo Religioso",
    stats: { econ: 100, dipl: 50, govt: 30, scty: 30 },
    desc: "Interpreta preceitos religiosos como base para uma sociedade comunista (máxima Igualdade), enfatizando a vida comunitária e a partilha. Pode variar em autoridade e diplomacia, mas tende a ser socialmente Tradicional.",
    politicians: ["Thomas Müntzer (Teólogo/Rebelde - Pré-Marxista)", "Gerrard Winstanley (Digger - Pré-Marxista)"],
    books: ["(Textos religiosos específicos interpretados sob essa ótica, como Atos dos Apóstolos)", "A Lei da Liberdade (Winstanley)"]
  },
  {
    name: "Socialismo de Estado",
    stats: { econ: 80, dipl: 30, govt: 30, scty: 70 },
    desc: "Defende a propriedade estatal significativa dos meios de produção (alta Igualdade) e forte intervenção governamental, mantendo um aparato estatal centralizado (moderada Autoridade). Geralmente focado na Nação e socialmente Progressista.",
    politicians: ["(Figuras de regimes de partido único não-totalitários, como alguns líderes pós-coloniais)"], // Difícil generalizar
    books: ["(Textos variam muito, dependendo do contexto nacional específico)"]
  },
  {
    name: "Socialismo Teocrático",
    stats: { econ: 80, dipl: 50, govt: 30, scty: 20 },
    desc: "Combina princípios socialistas de Igualdade econômica com um governo baseado em preceitos religiosos e liderança clerical (moderada Autoridade e alta Tradição). A diplomacia pode variar.",
    politicians: ["Ali Shariati (Influência no Irã - Complexo)"], // Exemplos são raros e contextuais
    books: ["(Textos que misturam escrituras religiosas e teoria socialista)"]
  },
  {
    name: "Socialismo Religioso",
    stats: { econ: 80, dipl: 50, govt: 70, scty: 20 },
    desc: "Busca conciliar princípios socialistas (alta Igualdade) com valores e ensinamentos religiosos, operando dentro de sistemas democráticos (moderada Liberdade). Tende a ser socialmente mais Tradicional que o socialismo secular.",
    politicians: ["(Figuras da Teologia da Libertação como Frei Betto, Leonardo Boff)", "Martin Luther King Jr. (Associado a alguns aspectos)"],
    books: ["Cristianismo e a Luta de Classes (Karl Barth - influência)", "Um Testamento de Esperança (MLK)"]
  },
  {
    name: "Socialismo Democrático",
    stats: { econ: 80, dipl: 50, govt: 50, scty: 80 },
    desc: "Visa alcançar o socialismo (alta Igualdade) através de reformas democráticas graduais dentro de um sistema capitalista, em vez de revolução. Apoia forte estado de bem-estar, regulação e democracia participativa (moderada Liberdade/Autoridade). Geralmente Progressista e neutro diplomaticamente.",
    politicians: ["Bernie Sanders (EUA - autoidentificado)", "Salvador Allende (Chile)", "Evo Morales (Bolívia - associado)"],
    books: ["O Caminho para o Poder (Karl Kautsky - histórico)", "Socialismo: Passado e Futuro (Michael Harrington)"]
  },
  {
    name: "Socialismo Revolucionário",
    stats: { econ: 80, dipl: 20, govt: 50, scty: 70 },
    desc: "Acredita que o socialismo (alta Igualdade) só pode ser alcançado através da derrubada revolucionária do sistema capitalista, rejeitando reformas graduais. Pode variar na visão do Estado pós-revolução (moderado Liberdade/Autoridade). Focado na Nação durante a luta e geralmente Progressista.",
    politicians: ["Che Guevara (Revolucionário)", "Subcomandante Marcos (Zapatista)"],
    books: ["O Estado e a Revolução (Lênin - influência)", "Guerra de Guerrilhas (Che Guevara)"]
  },
  {
    name: "Socialismo Libertário", // Repetido, mas com stats diferentes no original? Mantendo como estava.
    stats: { econ: 80, dipl: 80, govt: 80, scty: 80 },
    desc: "Prioriza a Igualdade econômica e alta Liberdade civil e pessoal, opondo-se a hierarquias autoritárias, tanto estatais quanto privadas. Geralmente apoia a diplomacia e o internacionalismo (Global) e é Progressista.",
    politicians: ["Noam Chomsky (Intelectual)", "Howard Zinn (Historiador/Ativista)"],
    books: ["A People's History of the United States (Zinn)", "Sobre Anarquismo (Chomsky)"]
  },
  {
    name: "Anarco-Sindicalismo",
    stats: { econ: 80, dipl: 50, govt: 100, scty: 80 },
    desc: "Vertente anarquista que propõe a organização da sociedade através de sindicatos federados e controlados pelos trabalhadores (alta Igualdade e máxima Liberdade). A greve geral é vista como meio revolucionário. Geralmente Progressista.",
    politicians: ["Rudolf Rocker (Teórico)", "Buenaventura Durruti (Sindicalista/Militar)"],
    books: ["Anarco-Sindicalismo: Teoria e Prática (Rocker)", "Homage to Catalonia (George Orwell - descreve a experiência)"]
  },
  {
    name: "Populismo de Esquerda",
    stats: { econ: 60, dipl: 40, govt: 30, scty: 70 },
    desc: "Apela ao 'povo' contra uma 'elite' corrupta, defendendo políticas de redistribuição (moderada Igualdade), protecionismo (Nação) e expansão de direitos sociais (Progresso), frequentemente com um líder carismático e tendências centralizadoras (Autoridade).",
    politicians: ["Hugo Chávez (Venezuela)", "Jean-Luc Mélenchon (França)", "(Varia muito por país)"],
    books: ["A Razão Populista (Ernesto Laclau - teórico)", "(Manifestos e discursos específicos de cada movimento)"]
  },
  {
    name: "Distributismo Teocrático",
    stats: { econ: 60, dipl: 40, govt: 30, scty: 20 },
    desc: "Busca ampla distribuição da propriedade produtiva (moderada Igualdade/Mercado) baseada em princípios católicos sociais, com forte influência religiosa nas leis e no governo (Autoridade e alta Tradição). Foco na comunidade local (Nação).",
    politicians: ["(Principalmente teóricos ou figuras históricas de movimentos católicos sociais)"],
    books: ["Rerum Novarum (Encíclica Papal - Influência)", "Quadragesimo Anno (Encíclica Papal - Influência)"]
  },
  {
    name: "Distributismo",
    stats: { econ: 60, dipl: 50, govt: 50, scty: 20 },
    desc: "Defende a propriedade privada largamente distribuída (nem capitalismo concentrado, nem socialismo estatal - moderado Igualdade/Mercado), favorecendo pequenas empresas, cooperativas e agricultura familiar. Geralmente baseado em valores Tradicionais e comunitários.",
    politicians: ["G. K. Chesterton (Escritor/Teórico)", "Hilaire Belloc (Escritor/Teórico)"],
    books: ["O Que Há de Errado com o Mundo (Chesterton)", "O Estado Servil (Belloc)"]
  },
  {
    name: "Liberalismo Social", // Nome comum para Social Liberalism
    stats: { econ: 60, dipl: 60, govt: 60, scty: 80 },
    desc: "Combina apoio a uma economia de Mercado regulada para garantir justiça social e oportunidade (moderada Igualdade/Mercado) com forte ênfase nos direitos individuais e liberdades civis (moderada Liberdade). Valoriza o bem-estar social, é Progressista e moderadamente Global.",
    politicians: ["John Rawls (Filósofo)", "William Beveridge (Arquiteto do Welfare State Britânico)", "Lloyd George (Reino Unido - Reformas Liberais)"],
    books: ["Uma Teoria da Justiça (Rawls)", "Relatório Beveridge", "Liberalism (L.T. Hobhouse)"]
  },
  {
    name: "Democracia Cristã",
    stats: { econ: 60, dipl: 60, govt: 50, scty: 30 },
    desc: "Busca aplicar princípios cristãos à política pública. Apoia uma economia social de mercado (moderada Igualdade/Mercado), estado de bem-estar e valores sociais Tradicionais, operando dentro da democracia liberal (moderada Liberdade/Autoridade). Geralmente pró-integração (Global).",
    politicians: ["Konrad Adenauer (Alemanha)", "Alcide De Gasperi (Itália)", "Angela Merkel (Alemanha - CDU)"],
    books: ["(Documentos de partidos democrata-cristãos)", "(Encíclicas sociais católicas como Rerum Novarum e Centesimus Annus são influentes)"]
  },
  {
    name: "Social Democracia", // Repetido, mas com stats diferentes no original? Mantendo.
    stats: { econ: 60, dipl: 70, govt: 60, scty: 80 },
    desc: "Defende uma economia mista com forte regulação estatal (moderada Igualdade), estado de bem-estar social robusto e democracia liberal (moderada Liberdade). Geralmente apoia a cooperação internacional (Global) e é Progressista.",
    politicians: ["Olof Palme (Suécia)", "Willy Brandt (Alemanha Ocidental)", "Clement Attlee (Reino Unido)"],
    books: ["O Futuro do Socialismo (Anthony Crosland)", "Capitalismo, Socialismo e Democracia (Schumpeter - discute temas relevantes)"]
  },
  {
    name: "Progressismo",
    stats: { econ: 60, dipl: 80, govt: 60, scty: 100 },
    desc: "Enfatiza a necessidade de Progresso social, reforma e melhoria contínua da sociedade através da ciência, tecnologia e ação governamental. Apoia direitos civis, proteção ambiental (Global), bem-estar social (moderada Igualdade) e democracia (Liberdade).",
    politicians: ["Theodore Roosevelt (EUA - Era Progressista)", "Woodrow Wilson (EUA - Era Progressista)", "(Muitos políticos contemporâneos de centro-esquerda se alinham)"],
    books: ["A Promessa da Vida Americana (Herbert Croly)", "Democracia e Educação (John Dewey)"]
  },
  {
    name: "Anarco-Mutualismo",
    stats: { econ: 60, dipl: 50, govt: 100, scty: 70 },
    desc: "Forma de anarquismo baseada nas ideias de Proudhon. Defende uma sociedade sem Estado (máxima Liberdade) onde indivíduos ou coletivos possuam seus meios de produção e troquem bens e serviços baseados em valor-trabalho, usando crédito mútuo (moderada Igualdade/Mercado). Geralmente Progressista.",
    politicians: ["Pierre-Joseph Proudhon (Filósofo)"],
    books: ["O Que é a Propriedade? (Proudhon)", "Sistema das Contradições Econômicas ou Filosofia da Miséria (Proudhon)"]
  },
  {
    name: "Totalitarismo Nacional",
    stats: { econ: 50, dipl: 20, govt: 0, scty: 50 },
    desc: "Regime de partido único com controle absoluto sobre todos os aspectos da vida (máxima Autoridade), nacionalismo extremo (Nação), economia centralizada ou corporativista (Neutro/Igualdade) e supressão da dissidência. O eixo social pode variar.",
    politicians: ["(Líderes de regimes totalitários não especificamente classificados como fascistas ou comunistas)"],
    books: ["As Origens do Totalitarismo (Hannah Arendt - análise)", "1984 (George Orwell - ficção distópica)"]
  },
  {
    name: "Totalitarismo Global",
    stats: { econ: 50, dipl: 80, govt: 0, scty: 50 },
    desc: "Hipótese de um regime mundial com controle absoluto sobre indivíduos e nações (máxima Autoridade e Global), possivelmente com economia centralizada. Semelhante ao Totalitarismo Nacional, mas em escala planetária.",
    politicians: ["(Personagens de ficção científica ou figuras hipotéticas)"],
    books: ["Admirável Mundo Novo (Aldous Huxley - ficção distópica)", "(Ensaios sobre globalização e poder supranacional podem tocar no tema)"]
  },
  {
    name: "Tecnocracia",
    stats: { econ: 60, dipl: 60, govt: 20, scty: 70 },
    desc: "Defende um sistema de governo onde especialistas técnicos e cientistas detêm o poder de decisão (alta Autoridade), baseando políticas em dados e racionalidade científica. Pode favorecer planejamento econômico (Igualdade) e Progresso tecnológico, com visão Global.",
    politicians: ["(Movimentos tecnocráticos históricos, figuras científicas que defendem o modelo)"],
    books: ["The Technocrats: Prophets of Automation (Elsner)", "(Literatura sobre governança por especialistas e planejamento científico)"]
  },
  {
    name: "Centrista",
    stats: { econ: 50, dipl: 50, govt: 50, scty: 50 },
    desc: "Posiciona-se no meio do espectro em todos os eixos, buscando um equilíbrio pragmático entre Mercado e Igualdade, Nação e Global, Autoridade e Liberdade, Tradição e Progresso. Rejeita extremismos e favorece a moderação.",
    politicians: ["Emmanuel Macron (França - frequentemente descrito como)", "Tony Blair (Reino Unido - 'Terceira Via', associado)"], // Exemplos podem ser contextuais
    books: ["O Caminho do Meio (Aristóteles - conceito filosófico)", "A Terceira Via (Anthony Giddens - teoria relacionada)"]
  },
  {
    name: "Liberalismo", // Geralmente se refere ao liberalismo moderno/social nos EUA, ou clássico na Europa. Aqui parece mais o moderno.
    stats: { econ: 50, dipl: 60, govt: 60, scty: 60 },
    desc: "No contexto contemporâneo (especialmente EUA), apoia economia de Mercado regulada com rede de segurança social (Neutro/Igualdade), liberdades civis (Liberdade), diplomacia (Global) e Progresso social moderado.",
    politicians: ["Barack Obama (EUA - associado ao liberalismo americano moderno)", "Joe Biden (EUA)"],
    books: ["Liberalism and its Discontents (Francis Fukuyama)", "(Textos de think tanks e publicações liberais modernas)"]
  },
  {
    name: "Anarquismo Religioso",
    stats: { econ: 50, dipl: 50, govt: 100, scty: 20 },
    desc: "Rejeita toda autoridade coercitiva, incluindo o Estado (máxima Liberdade), baseando-se em princípios religiosos de paz, amor e não-violência. Pode variar economicamente, mas frequentemente comunitário (Neutro/Igualdade). Socialmente Tradicional.",
    politicians: ["Liev Tolstói (Escritor/Filósofo)", "Dorothy Day (Ativista - Movimento do Trabalhador Católico)"],
    books: ["O Reino de Deus Está em Vós (Tolstói)", "Loaves and Fishes (Dorothy Day)"]
  },
  {
    name: "Populismo de Direita",
    stats: { econ: 40, dipl: 30, govt: 30, scty: 30 },
    desc: "Combina nacionalismo forte (Nação), apelo anti-elite, políticas anti-imigração e defesa de valores Tradicionais. Economicamente, pode ser pró-Mercado, mas com tendências protecionistas. Frequentemente associado a líderes autoritários (Autoridade).",
    politicians: ["Donald Trump (EUA - associado)", "Marine Le Pen (França)", "Viktor Orbán (Hungria)"],
    books: ["O Que É Populismo? (Jan-Werner Müller - análise crítica)", "(Manifestos e discursos específicos de cada movimento)"]
  },
  {
    name: "Conservadorismo Moderado",
    stats: { econ: 40, dipl: 40, govt: 50, scty: 30 },
    desc: "Busca preservar instituições e valores Tradicionais através de mudanças graduais. Apoia economia de Mercado (Mercado), responsabilidade fiscal, ordem pública (Neutro Liberdade/Autoridade) e uma Nação forte, mas não isolacionista.",
    politicians: ["David Cameron (Reino Unido)", "Mitt Romney (EUA - ala moderada)"],
    books: ["O Conservadorismo (Michael Oakeshott - filosófico)", "(Textos de think tanks conservadores moderados)"]
  },
  {
    name: "Reacionário",
    stats: { econ: 40, dipl: 40, govt: 40, scty: 10 },
    desc: "Opõe-se fortemente ao Progresso social e busca restaurar uma ordem social, política ou econômica anterior, vista como superior (extrema Tradição). Pode ser autoritário (Autoridade) e nacionalista (Nação), com visões de Mercado.",
    politicians: ["Joseph de Maistre (Filósofo - Contra-Revolucionário)"], // Figuras contemporâneas são controversas
    books: ["Considerações sobre a França (De Maistre)", "(Literatura que idealiza eras passadas específicas)"]
  },
  {
    name: "Libertarianismo Social", // Também conhecido como Geolibertarianismo ou Esquerda Libertária (varia)
    stats: { econ: 60, dipl: 70, govt: 80, scty: 70 },
    desc: "Combina alta Liberdade individual e ceticismo em relação ao Estado com preocupações sobre justiça social e Igualdade de oportunidades. Pode apoiar renda básica ou imposto sobre valor da terra. Geralmente Global e Progressista.",
    politicians: ["Henry George (Economista - Geolibertarianismo)", "(Figuras de think tanks ou movimentos específicos)"],
    books: ["Progresso e Pobreza (Henry George)", "(Textos de publicações como o Center for a Stateless Society)"]
  },
  {
    name: "Libertarianismo", // Ou Libertarismo
    stats: { econ: 40, dipl: 60, govt: 80, scty: 60 },
    desc: "Prioriza a máxima Liberdade individual (civil e econômica), governo limitado (Estado mínimo), e livre Mercado (Mercado). Geralmente apoia política externa não-intervencionista (Global) e é neutro ou Progressista socialmente.",
    politicians: ["Ron Paul (EUA)", "Jo Jorgensen (EUA - Candidata Libertária)"],
    books: ["Anarquia, Estado e Utopia (Robert Nozick)", "A Ética da Liberdade (Murray Rothbard - embora leve ao AnCap)", "Economia Numa Única Lição (Henry Hazlitt)"]
  },
  {
    name: "Anarco-Egoísmo",
    stats: { econ: 40, dipl: 50, govt: 100, scty: 50 },
    desc: "Forma radical de anarquismo individualista que rejeita todas as abstrações e 'fantasmas' (Estado, moralidade, religião, propriedade privada coletiva) em favor do ego único e sua vontade (máxima Liberdade). A economia é baseada em associações voluntárias de egoístas (Mercado/Neutro).",
    politicians: ["Max Stirner (Filósofo)"],
    books: ["O Único e a Sua Propriedade (Stirner)"]
  },
  {
    name: "Nazismo", // Nacional Socialismo
    stats: { econ: 40, dipl: 0, govt: 0, scty: 5 },
    desc: "Ideologia totalitária (máxima Autoridade) baseada em supremacia racial, ultranacionalismo extremo (Nação), antissemitismo, eugenia e expansionismo militar. Economicamente corporativista/estatista (Mercado/Neutro), e socialmente ultra-Reacionária.",
    politicians: ["Adolf Hitler (Alemanha)"],
    books: ["Minha Luta (Mein Kampf - Hitler)", "Mito do Século XX (Alfred Rosenberg)", "(Livros de análise histórica como 'Ascensão e Queda do Terceiro Reich' de Shirer são essenciais para entender, não para endossar)"]
  },
  {
    name: "Autocracia",
    stats: { econ: 50, dipl: 20, govt: 20, scty: 50 },
    desc: "Sistema de governo onde um único líder detém poder absoluto e irrestrito (alta Autoridade), sem mecanismos de controle democrático ou constitucional. A orientação econômica, diplomática (geralmente Nação) e social pode variar muito dependendo do autocrata.",
    politicians: ["(Diversos monarcas absolutistas históricos, ditadores modernos não alinhados a ideologias específicas)"],
    books: ["O Príncipe (Maquiavel - análise do poder)", "(Biografias de autocratas específicos)"]
  },
  {
    name: "Fascismo",
    stats: { econ: 40, dipl: 20, govt: 20, scty: 20 },
    desc: "Ideologia totalitária (alta Autoridade) caracterizada por nacionalismo extremo (Nação), militarismo, corporativismo econômico (Mercado/Neutro), supressão da oposição e culto ao líder. Rejeita liberalismo e comunismo, e é socialmente Tradicional/Reacionária.",
    politicians: ["Benito Mussolini (Itália)", "Francisco Franco (Espanha - frequentemente classificado como)"],
    books: ["A Doutrina do Fascismo (Mussolini/Gentile)", "As Origens do Totalitarismo (Arendt - análise)", "Anatomia do Fascismo (Robert Paxton - análise)"]
  },
  {
    name: "Fascismo Capitalista", // Termo menos comum, pode se referir a regimes fascistas que mantiveram/favoreceram grandes capitalistas.
    stats: { econ: 20, dipl: 20, govt: 20, scty: 20 },
    desc: "Regime fascista (Autoridade, Nação, Tradição) que preserva ou se alia fortemente à propriedade privada e aos interesses capitalistas (Mercado), em contraste com modelos mais estatistas.",
    politicians: ["(Interpretações de figuras como Hitler ou Pinochet podem se encaixar aqui, dependendo da análise econômica)"],
    books: ["(Análises econômicas de regimes fascistas específicos)"]
  },
  {
    name: "Conservadorismo",
    stats: { econ: 30, dipl: 40, govt: 40, scty: 20 },
    desc: "Prioriza a preservação das instituições, valores e hierarquias sociais Tradicionais. Apoia economia de Mercado com prudência fiscal (Mercado), ordem e segurança (moderada Autoridade), e interesses nacionais (Nação).",
    politicians: ["Edmund Burke (Filósofo)", "Margaret Thatcher (Reino Unido)", "Ronald Reagan (EUA - associado)"],
    books: ["Reflexões sobre a Revolução na França (Burke)", "A Política da Prudência (Russell Kirk)", "O Caminho da Servidão (Hayek - influência econômica)"]
  },
  {
    name: "Neoliberalismo", // Termo frequentemente usado de forma pejorativa, mas referente à ressurgência de ideias de livre mercado.
    stats: { econ: 30, dipl: 30, govt: 50, scty: 60 },
    desc: "Enfatiza o livre Mercado (Mercado), desregulamentação, privatização, livre comércio (moderado Global/Nação) e redução do gasto público. Geralmente opera dentro de uma democracia liberal (Neutro Liberdade/Autoridade) e pode ser socialmente neutro ou Progressista.",
    politicians: ["Margaret Thatcher (Reino Unido - implementação)", "Ronald Reagan (EUA - implementação)", "Augusto Pinochet (Chile - implementação autoritária)"],
    books: ["O Caminho da Servidão (Hayek)", "Capitalismo e Liberdade (Milton Friedman)", "A Doutrina do Choque (Naomi Klein - crítica)"]
  },
  {
    name: "Liberalismo Clássico",
    stats: { econ: 30, dipl: 60, govt: 60, scty: 80 },
    desc: "Enfatiza a liberdade individual (Liberdade), direitos naturais, governo limitado, Estado de Direito e livre Mercado (Mercado). Precursor do liberalismo moderno e do libertarianismo. Tende a ser mais Progressista socialmente e aberto à diplomacia (Global).",
    politicians: ["John Locke (Filósofo)", "Adam Smith (Economista)", "Montesquieu (Filósofo)"],
    books: ["Dois Tratados sobre o Governo (Locke)", "A Riqueza das Nações (Smith)", "O Espírito das Leis (Montesquieu)"]
  },
  {
    name: "Capitalismo Autoritário",
    stats: { econ: 20, dipl: 30, govt: 20, scty: 40 },
    desc: "Sistema que combina economia de Mercado capitalista (Mercado) com um regime político autoritário (Autoridade) que restringe liberdades civis e políticas. Pode ser nacionalista (Nação) e socialmente conservador ou neutro.",
    politicians: ["Lee Kuan Yew (Singapura)", "Augusto Pinochet (Chile)", "(Líderes da China contemporânea são frequentemente citados)"],
    books: ["(Estudos sobre Cingapura, Chile sob Pinochet, China moderna)", "O Fim da História e o Último Homem (Fukuyama - discute alternativas ao liberalismo democrático)"]
  },
  {
    name: "Capitalismo de Estado",
    stats: { econ: 20, dipl: 50, govt: 30, scty: 50 },
    desc: "Sistema onde o Estado exerce controle dominante sobre a economia capitalista (Mercado), possuindo ou controlando grandes empresas ('campeões nacionais'), dirigindo investimentos e limitando a concorrência. O nível de autoridade política e social pode variar (moderado/Neutro).",
    politicians: ["(Líderes de países com forte setor estatal como Noruega - petróleo, ou França - dirigismo histórico)"],
    books: ["(Análises sobre economias dirigistas ou com forte presença de empresas estatais)"]
  },
  {
    name: "Neoconservadorismo",
    stats: { econ: 20, dipl: 20, govt: 40, scty: 20 },
    desc: "Vertente do conservadorismo (Mercado, moderada Autoridade, Tradição) que se distingue por uma política externa assertiva e intervencionista (Nação), visando promover a democracia e os interesses nacionais no exterior, frequentemente através de força militar.",
    politicians: ["George W. Bush (EUA - associado à política externa)", "Dick Cheney (EUA)", "Paul Wolfowitz (EUA - intelectual)"],
    books: ["(Artigos de publicações como 'The Weekly Standard')", "(Análises sobre a Guerra do Iraque e a política externa dos EUA pós-9/11)"]
  },
  {
    name: "Fundamentalismo", // Geralmente religioso
    stats: { econ: 20, dipl: 30, govt: 30, scty: 5 },
    desc: "Adesão estrita e literal a um conjunto de crenças religiosas ou ideológicas, rejeitando interpretações modernas e buscando impor esses preceitos na sociedade (extrema Tradição e Autoridade). Pode ser nacionalista (Nação) e variar economicamente (geralmente pró-Mercado).",
    politicians: ["Ruhollah Khomeini (Irã)", "(Líderes de movimentos fundamentalistas religiosos em várias partes do mundo)"],
    books: ["(Textos sagrados interpretados literalmente)", "(Escritos de líderes fundamentalistas específicos)", "As Batalhas de Deus (Gilles Kepel - análise)"]
  },
  {
    name: "Capitalismo Libertário", // Semelhante ao Libertarianismo, talvez com ênfase maior no aspecto econômico.
    stats: { econ: 20, dipl: 50, govt: 80, scty: 60 },
    desc: "Defende máxima Liberdade econômica (Mercado) e individual, com um Estado mínimo ('guarda noturno') focado apenas em proteger direitos de propriedade e contratos. Geralmente neutro na diplomacia e socialmente neutro ou Progressista.",
    politicians: ["(Muitos se identificam como Libertários em geral)"],
    books: ["Anarquia, Estado e Utopia (Nozick)", "Capitalismo e Liberdade (Milton Friedman)"]
  },
  {
    name: "Anarquismo de Mercado",
    stats: { econ: 20, dipl: 50, govt: 100, scty: 50 },
    desc: "Forma de anarquismo individualista que defende uma sociedade sem Estado (máxima Liberdade) com uma economia totalmente baseada no livre Mercado, propriedade privada e contratos voluntários. Difere do Anarco-Capitalismo em algumas visões sobre propriedade ou estratégia. Neutro nos eixos diplomático e social.",
    politicians: ["Samuel Edward Konkin III (Agorismo - vertente)", "Kevin Carson (Mutualista contemporâneo - associado)"],
    books: ["New Libertarian Manifesto (Konkin)", "Studies in Mutualist Political Economy (Carson)"]
  },
  {
    name: "Objetivismo",
    stats: { econ: 10, dipl: 50, govt: 90, scty: 40 },
    desc: "Filosofia fundada por Ayn Rand, defende o egoísmo racional, individualismo e capitalismo laissez-faire (alto Mercado). Rejeita o altruísmo e o coletivismo. Defende um Estado mínimo (alta Liberdade) para proteger direitos. Socialmente neutra/conservadora.",
    politicians: ["Ayn Rand (Filósofa/Escritora)"], // Principalmente filósofa
    books: ["A Revolta de Atlas (Rand)", "A Nascente (Rand)", "A Virtude do Egoísmo (Rand)"]
  },
  {
    name: "Capitalismo Totalitário", // Combinação extrema
    stats: { econ: 0, dipl: 30, govt: 0, scty: 50 },
    desc: "Sistema hipotético ou real que une controle estatal totalitário (máxima Autoridade) com uma economia puramente capitalista de livre Mercado (máximo Mercado), onde o Estado garante a ordem para o capital sem liberdades individuais. Foco na Nação e socialmente neutro.",
    politicians: ["(Interpretações de regimes como Chile sob Pinochet podem se aproximar, embora complexo)"],
    books: ["(Análises teóricas sobre a compatibilidade/incompatibilidade de totalitarismo e capitalismo puro)"]
  },
  {
    name: "Ultracapitalismo", // Não é um termo padrão, provavelmente se refere a um capitalismo extremo.
    stats: { econ: 0, dipl: 40, govt: 50, scty: 50 },
    desc: "Defende a minimização extrema de qualquer barreira ao Mercado e ao lucro (máximo Mercado), possivelmente com pouca consideração por externalidades ou regulação social. Pode operar dentro de uma democracia (Neutro Liberdade/Autoridade) e ser neutro nos eixos diplomático e social.",
    politicians: ["(Figuras associadas a desregulamentação extrema ou 'capitalismo selvagem')"],
    books: ["(Textos que defendem a maximização do lucro e a minimização de restrições ao capital)"]
  },
  {
    name: "Anarco-Capitalismo", // Repetido? Mantendo como no original.
    stats: { econ: 0, dipl: 50, govt: 100, scty: 50 },
    desc: "Defende a abolição completa do Estado (máxima Liberdade) e a organização da sociedade puramente através do livre Mercado (máximo Mercado), onde todas as funções (segurança, justiça) são providas privadamente por agências concorrentes.",
    politicians: ["Murray Rothbard (Teórico)", "David Friedman (Teórico)", "Hans-Hermann Hoppe (Teórico)"],
    books: ["Por Uma Nova Liberdade: O Manifesto Libertário (Rothbard)", "A Maquinaria da Liberdade (D. Friedman)", "Democracia: O deus que falhou (Hoppe)"]
  }
];