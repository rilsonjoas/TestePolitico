questions = [
  // --- Eixo Econômico (Igualdade vs. Mercado) ---
  {
    // Original: "Oppression by corporations is more of a concern than oppression by governments."
    // Efeito: econ: 10 (Igualdade), govt: -5 (Autoridade Leve) -> Concordar = Corporações são pior; menos preocupado com governo
    question:
      "O poder excessivo e a influência negativa de grandes corporações são uma ameaça maior à sociedade do que o poder do governo.",
    effect: { econ: 10, dipl: 0, govt: -5, scty: 0 },
  },
  {
    // Original: "It is necessary for the government to intervene in the economy to protect consumers."
    // Efeito: econ: 10 (Igualdade)
    question:
      "A intervenção governamental na economia é necessária para proteger os consumidores de práticas injustas.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "The freer the markets, the freer the people."
    // Efeito: econ: -10 (Mercado)
    question:
      "Quanto menos o governo interfere na economia, maior a prosperidade e liberdade econômica das pessoas.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "It is better to maintain a balanced budget than to ensure welfare for all citizens."
    // Efeito: econ: -10 (Mercado) -> Prioriza orçamento sobre bem-estar universal
    question:
      "Manter um orçamento governamental equilibrado deve ser prioridade, mesmo que signifique limitar gastos com programas de bem-estar social.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "Publicly-funded research is more beneficial to the people than leaving it to the market."
    // Efeito: econ: 10 (Igualdade), scty: 10 (Progresso) -> Pesquisa pública beneficia mais
    question:
      "A pesquisa científica financiada pelo governo traz mais benefícios à sociedade do que a pesquisa deixada puramente ao setor privado.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 10 },
  },
  {
    // Original: "Tariffs on international trade are important to encourage local production."
    // Efeito: econ: 5 (Igualdade/Protecionismo), dipl: -10 (Nação) -> Tarifas = Nacionalista
    // Correção: Efeito original dipl:0 govt:-10. Mantendo original por enquanto. Reinterpretando: Tarifas (dipl:-10 Nação), Intervencionismo (econ: 5 Igualdade), Controle (govt:-10 Autoridade?)
    // Revisão visando clareza do protecionismo:
    question:
      "Impor tarifas sobre produtos importados é importante para proteger e incentivar a indústria nacional.",
    effect: { econ: 5, dipl: -10, govt: -5, scty: 0 }, // Ajustando levemente govt baseado na ideia de controle, mas mantendo dipl:-10 como principal.
  },
  {
    // Original: "From each according to his ability, to each according to his needs." (Citação Marxista Clássica)
    // Efeito: econ: 10 (Igualdade)
    question:
      "O princípio 'De cada um segundo sua capacidade, a cada um segundo suas necessidades' descreve uma sociedade ideal.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "It would be best if social programs were abolished in favor of private charity."
    // Efeito: econ: -10 (Mercado) -> Prefere caridade privada a programas sociais
    question:
      "Seria melhor para a sociedade se os programas sociais governamentais fossem substituídos por iniciativas de caridade privada.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "Taxes should be increased on the rich to provide for the poor."
    // Efeito: econ: 10 (Igualdade) -> Redistribuição via impostos
    question:
      "Aumentar os impostos sobre os mais ricos é uma forma justa de financiar programas de apoio aos mais pobres.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "Inheritance is a legitimate form of wealth."
    // Efeito: econ: -10 (Mercado), scty: -5 (Tradição?) -> Aceita riqueza herdada
    question:
      "Receber herança é uma forma legítima e aceitável de adquirir riqueza.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: -5 },
  },
  {
    // Original: "Basic utilities like roads and electricity should be publicly owned."
    // Efeito: econ: 10 (Igualdade) -> Propriedade pública de serviços essenciais
    question:
      "Serviços essenciais, como fornecimento de água, eletricidade e infraestrutura de transporte, deveriam ser controlados ou de propriedade do setor público.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "Government intervention is a threat to the economy."
    // Efeito: econ: -10 (Mercado) -> Intervenção é ruim
    question:
      "A intervenção excessiva do governo na economia prejudica o crescimento e a eficiência.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "Those with a greater ability to pay should receive better healthcare."
    // Efeito: econ: -10 (Mercado) -> Saúde baseada na capacidade de pagamento
    question:
      "É aceitável que pessoas com maior poder aquisitivo tenham acesso a cuidados de saúde de melhor qualidade ou mais rápidos.",
    effect: { econ: -10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "Quality education is a right of all people."
    // Efeito: econ: 10 (Igualdade), scty: 5 (Progresso?) -> Educação como direito universal
    question:
      "O acesso a uma educação de qualidade deve ser garantido como um direito fundamental para todos, independentemente da sua condição financeira.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 5 },
  },
  {
    // Original: "The means of production should belong to the workers who use them." (Princípio Socialista/Anarquista)
    // Efeito: econ: 10 (Igualdade)
    question:
      "As fábricas, terras e outras ferramentas de produção deveriam ser de propriedade e controle dos trabalhadores que as operam.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },

  // --- Eixo Diplomático (Nação vs. Global) ---
  {
    // Original: "The United Nations should be abolished."
    // Efeito: dipl: -10 (Nação), govt: -5 (Autoridade Leve?) -> Contra ONU = Nacionalista
    question:
      "Organizações internacionais como a ONU possuem influência excessiva e deveriam ter seu poder reduzido ou ser extintas.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 },
  },
  {
    // Original: "Military action by our nation is often necessary to protect it."
    // Efeito: dipl: -10 (Nação), govt: -10 (Autoridade) -> Ação militar = Nacionalista e Autoritário
    question:
      "O uso da força militar pelo nosso país é, por vezes, necessário para defender nossos interesses e segurança nacional.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 },
  },
  {
    // Original: "I support regional unions, such as the European Union."
    // Efeito: econ: -5 (Mercado - integração), dipl: 10 (Global), govt: 10 (Liberdade - cooperação dem.), scty: 5 (Progresso - modernização)
    question:
      "A formação de blocos de cooperação regionais entre países (como a União Europeia) é benéfica e deve ser apoiada.",
    effect: { econ: -5, dipl: 10, govt: 10, scty: 5 },
  },
  {
    // Original: "It is important to maintain our national sovereignty."
    // Efeito: dipl: -10 (Nação), govt: -5 (Autoridade Leve?) -> Soberania = Nacionalista
    question:
      "Preservar a soberania e a independência do nosso país em relação a influências externas é fundamental.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 },
  },
  {
    // Original: "A united world government would be beneficial to mankind."
    // Efeito: dipl: 10 (Global) -> Governo mundial = Globalista
    question:
      "A criação de um governo mundial unificado seria um passo positivo para a paz e o progresso da humanidade.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 },
  },
  {
    // Original: "It is more important to retain peaceful relations than to further our strength."
    // Efeito: dipl: 10 (Global) -> Paz sobre força = Globalista/Pacifista
    question:
      "Manter relações pacíficas com outras nações é mais importante do que projetar poder e força militar no cenário internacional.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 },
  },
  {
    // Original: "Wars do not need to be justified to other countries."
    // Efeito: dipl: -10 (Nação), govt: -10 (Autoridade) -> Guerra sem justificar = Nacionalista e Autoritário
    question:
      "Nosso país não precisa da aprovação ou justificativa de outras nações para iniciar uma ação militar que considere necessária.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 },
  },
  {
    // Original: "Military spending is a waste of money."
    // Efeito: dipl: 10 (Global), govt: 10 (Liberdade - menos poder estatal?) -> Gasto militar é ruim
    question:
      "Altos investimentos em forças armadas representam um desperdício de recursos que poderiam ser melhor aplicados em outras áreas.",
    effect: { econ: 0, dipl: 10, govt: 10, scty: 0 },
  },
  {
    // Original: "International aid is a waste of money."
    // Efeito: econ: -5 (Mercado - sem ajuda), dipl: -10 (Nação) -> Ajuda externa é ruim
    question:
      "Enviar ajuda financeira ou humanitária para outros países é, na maioria das vezes, um desperdício dos recursos do nosso próprio país.",
    effect: { econ: -5, dipl: -10, govt: 0, scty: 0 },
  },
  {
    // Original: "My nation is great."
    // Efeito: dipl: -10 (Nação) -> Nacionalismo direto
    question: "Sinto orgulho e considero minha nação superior a muitas outras.",
    effect: { econ: 0, dipl: -10, govt: 0, scty: 0 },
  },
  {
    // Original: "Research should be conducted on an international scale."
    // Efeito: dipl: 10 (Global), scty: 10 (Progresso) -> Pesquisa internacional
    question:
      "A colaboração científica internacional é crucial e mais eficaz do que esforços de pesquisa puramente nacionais.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 10 },
  },
  {
    // Original: "Governments should be accountable to the international community."
    // Efeito: dipl: 10 (Global), govt: 5 (Liberdade - accountability) -> Prestação de contas internacional
    question:
      "Os governos nacionais deveriam ser responsabilizados por suas ações perante a comunidade internacional e organismos multilaterais.",
    effect: { econ: 0, dipl: 10, govt: 5, scty: 0 },
  },

  // --- Eixo Civil (Liberdade vs. Autoridade) ---
  {
    // Original: "Even when protesting an authoritarian government, violence is not acceptable."
    // Efeito: dipl: 5 (Paz), govt: -5 (Autoridade) -> Não-violência = Ordem/Autoridade
    question:
      "O uso da violência nunca se justifica em protestos políticos, mesmo contra regimes considerados opressores.",
    effect: { econ: 0, dipl: 5, govt: -5, scty: 0 },
  },
  {
    // Original: "My religious values should be spread as much as possible."
    // Efeito: dipl: -5 (Nação - se for religião nacional?), govt: -10 (Autoridade), scty: -10 (Tradição) -> Impor religião
    question:
      "É desejável que os valores da minha religião sejam amplamente divulgados e influenciem a sociedade como um todo.",
    effect: { econ: 0, dipl: -5, govt: -10, scty: -10 },
  },
  {
    // Original: "Our nation's values should be spread as much as possible."
    // Efeito: dipl: -10 (Nação), govt: -5 (Autoridade), scty: 0 (Varia) -> Impor valores nacionais
    question:
      "É importante promover ativamente os valores culturais e políticos do nosso país em outras nações.",
    effect: { econ: 0, dipl: -10, govt: -5, scty: 0 },
  },
  {
    // Original: "It is very important to maintain law and order."
    // Efeito: dipl: -5 (Nação?), govt: -10 (Autoridade), scty: -5 (Tradição?) -> Lei e Ordem = Autoridade
    question:
      "A manutenção da lei, da ordem e da segurança pública deve ser uma das principais prioridades do governo.",
    effect: { econ: 0, dipl: -5, govt: -10, scty: -5 },
  },
  {
    // Original: "The general populace makes poor decisions."
    // Efeito: govt: -10 (Autoridade) -> Povo decide mal = Elitismo/Autoritarismo
    question:
      "Em geral, a maioria das pessoas não está preparada para tomar decisões políticas complexas de forma sensata.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    // Original: "Physician-assisted suicide should be legal."
    // Efeito: govt: 10 (Liberdade) -> Suicídio assistido = Liberdade individual
    question:
      "O suicídio assistido por médicos deveria ser uma opção legal para pacientes terminais que o desejarem.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 }, // Mantido scty: 0, embora possa ter leve inclinação progressista
  },
  {
    // Original: "The sacrifice of some civil liberties is necessary to protect us from acts of terrorism."
    // Efeito: govt: -10 (Autoridade) -> Sacrificar liberdade por segurança = Autoridade
    question:
      "Para garantir a segurança contra ameaças como o terrorismo, é aceitável que o governo restrinja algumas liberdades civis.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    // Original: "Government surveillance is necessary in the modern world."
    // Efeito: govt: -10 (Autoridade) -> Vigilância = Autoridade
    question:
      "A vigilância de comunicações e espaços públicos pelo governo é uma ferramenta necessária para a segurança na era moderna.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    // Original: "The very existence of the state is a threat to our liberty." (Anarquismo)
    // Efeito: govt: 10 (Liberdade)
    question:
      "Qualquer forma de Estado organizado representa, inerentemente, uma ameaça à liberdade individual.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 },
  },
  {
    // Original: "Regardless of political opinions, it is important to side with your country."
    // Efeito: dipl: -10 (Nação), govt: -10 (Autoridade), scty: -5 (Tradição?) -> Lealdade incondicional
    question:
      "Devemos sempre apoiar nosso país, mesmo quando discordamos de suas ações ou governo.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: -5 },
  },
  {
    // Original: "All authority should be questioned."
    // Efeito: govt: 10 (Liberdade), scty: 5 (Progresso) -> Questionar autoridade
    question:
      "Nenhuma forma de autoridade deve ser aceita sem questionamento crítico.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 5 },
  },
  {
    // Original: "A hierarchical state is best."
    // Efeito: govt: -10 (Autoridade) -> Hierarquia = Autoridade
    question:
      "Uma estrutura de governo claramente hierárquica, com linhas de comando definidas, é a mais eficaz.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    // Original: "It is important that the government follows the majority opinion, even if it is wrong."
    // Efeito: govt: 10 (Liberdade/Democracia Direta) -> Vontade da maioria acima de tudo
    question:
      "O governo deve sempre seguir a vontade da maioria da população, mesmo que essa vontade pareça equivocada para alguns.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 },
  },
  {
    // Original: "The stronger the leadership, the better."
    // Efeito: dipl: -10 (Nação - líder forte nacional?), govt: -10 (Autoridade) -> Liderança forte = Autoridade
    question:
      "Um líder forte e decidido é mais benéfico para um país do que um que busca constantemente o consenso.",
    effect: { econ: 0, dipl: -10, govt: -10, scty: 0 },
  },
  {
    // Original: "Democracy is more than a decision-making process."
    // Efeito: govt: 10 (Liberdade) -> Democracia como valor intrínseco
    question:
      "A democracia não é apenas um método para tomar decisões, mas um valor fundamental em si mesma.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 0 },
  },

  // --- Eixo Social (Tradição vs. Progresso) ---
  {
    // Original: "Environmental regulations are essential."
    // Efeito: econ: 5 (Igualdade - regulação), scty: 10 (Progresso) -> Regulação ambiental
    question:
      "A imposição de regulamentações ambientais rigorosas é essencial para proteger o planeta para as futuras gerações.",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 },
  },
  {
    // Original: "A better world will come from automation, science, and technology."
    // Efeito: scty: 10 (Progresso) -> Fé na tecnologia
    question:
      "O caminho para um futuro melhor para a humanidade passa, principalmente, pelo avanço da automação, ciência e tecnologia.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    // Original: "Children should be educated in religious or traditional values."
    // Efeito: govt: -5 (Autoridade - impor educação), scty: -10 (Tradição) -> Educação tradicional/religiosa
    question:
      "A educação das crianças deve incluir, prioritariamente, a transmissão de valores religiosos e tradicionais.",
    effect: { econ: 0, dipl: 0, govt: -5, scty: -10 },
  },
  {
    // Original: "Traditions are of no value on their own."
    // Efeito: scty: 10 (Progresso) -> Rejeição da tradição per se
    question:
      "As tradições só devem ser mantidas se tiverem um propósito claro e benéfico para a sociedade atual; não possuem valor intrínseco.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    // Original: "Religion should play a role in government."
    // Efeito: govt: -10 (Autoridade), scty: -10 (Tradição) -> Religião no governo
    question:
      "As instituições religiosas e seus preceitos deveriam ter influência direta nas leis e nas políticas governamentais.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    // Original: "Churches should be taxed the same way other institutions are taxed."
    // Efeito: econ: 5 (Igualdade fiscal), scty: 10 (Progresso/Secularismo) -> Taxar igrejas
    question:
      "As instituições religiosas deveriam pagar os mesmos impostos que outras organizações e empresas.",
    effect: { econ: 5, dipl: 0, govt: 0, scty: 10 },
  },
  {
    // Original: "Climate change is currently one of the greatest threats to our way of life."
    // Efeito: scty: 10 (Progresso) -> Reconhecimento da mudança climática
    question:
      "As mudanças climáticas representam uma ameaça grave e urgente que exige ações significativas imediatas.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    // Original: "It is important that we work as a united world to combat climate change."
    // Efeito: dipl: 10 (Global), scty: 10 (Progresso) -> Ação global pelo clima
    question:
      "O combate eficaz às mudanças climáticas exige cooperação e esforço conjuntos de todas as nações.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 10 },
  },
  {
    // Original: "Society was better many years ago than it is now."
    // Efeito: scty: -10 (Tradição) -> Nostalgia/Passadismo
    question:
      "De modo geral, a sociedade vivia melhor e com mais valores em gerações passadas.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    // Original: "It is important that we maintain the traditions of our past."
    // Efeito: scty: -10 (Tradição) -> Manter tradições
    question:
      "É fundamental preservar as tradições culturais e os costumes herdados dos nossos antepassados.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    // Original: "It is important that we think in the long term, beyond our lifespans."
    // Efeito: scty: 10 (Progresso) -> Pensamento de longo prazo/Sustentabilidade
    question:
      "Devemos tomar decisões considerando o impacto a longo prazo, pensando nas próximas gerações e não apenas em benefícios imediatos.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    // Original: "Reason is more important than maintaining our culture."
    // Efeito: scty: 10 (Progresso) -> Razão sobre cultura/tradição
    question:
      "A razão e a lógica devem prevalecer sobre a manutenção da cultura e das tradições quando há conflito entre elas.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    // Original: "Drug use should be legalized or decriminalized."
    // Efeito: govt: 10 (Liberdade), scty: 2 (Progresso Leve) -> Legalizar/Descriminalizar drogas
    question:
      "O uso de drogas deveria ser tratado como questão de saúde pública, com legalização ou descriminalização, em vez de um problema criminal.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 2 },
  },
  {
    // Original: "Same-sex marriage should be legal."
    // Efeito: govt: 10 (Liberdade), scty: 10 (Progresso) -> Casamento homoafetivo
    question:
      "Casais do mesmo sexo deveriam ter o direito legal ao casamento, com os mesmos direitos e reconhecimento que casais heterossexuais.",
    effect: { econ: 0, dipl: 0, govt: 10, scty: 10 },
  },
  {
    // Original: "No cultures are superior to others."
    // Efeito: dipl: 10 (Global), govt: 5 (Liberdade), scty: 10 (Progresso) -> Relativismo cultural
    question:
      "Todas as culturas têm seu valor intrínseco e nenhuma pode ser considerada objetivamente superior às outras.",
    effect: { econ: 0, dipl: 10, govt: 5, scty: 10 },
  },
  {
    // Original: "Sex outside marriage is immoral."
    // Efeito: govt: -5 (Autoridade - moralidade imposta?), scty: -10 (Tradição) -> Moralidade sexual tradicional
    question: "Relações sexuais fora do casamento são moralmente erradas.",
    effect: { econ: 0, dipl: 0, govt: -5, scty: -10 },
  },
  {
    // Original: "If we accept migrants at all, it is important that they assimilate into our culture."
    // Efeito: dipl: 0 (Neutro - aceita com condição), govt: -5 (Autoridade), scty: -10 (Tradição) -> Assimilação forçada
    question:
      "Imigrantes que vêm para nosso país devem se esforçar para abandonar suas culturas de origem e assimilar completamente a nossa.",
    effect: { econ: 0, dipl: 0, govt: -5, scty: -10 },
  },
  {
    // Original: "Abortion should be prohibited in most or all cases."
    // Efeito: govt: -10 (Autoridade), scty: -10 (Tradição) -> Proibição do aborto
    question:
      "O aborto deveria ser ilegal ou permitido apenas em circunstâncias extremamente raras, como risco de vida para a mãe.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    // Original: "Gun ownership should be prohibited for those without a valid reason."
    // Efeito: govt: -10 (Autoridade) -> Restrição de armas = Controle/Autoridade
    question:
      "A posse de armas de fogo por civis deveria ser estritamente controlada e permitida apenas para quem demonstrar necessidade comprovada.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: 0 },
  },
  {
    // Original: "I support single-payer, universal healthcare."
    // Efeito: econ: 10 (Igualdade) -> Saúde universal pública
    question:
      "Defendo um sistema de saúde universal financiado por impostos, onde todos os cidadãos tenham acesso gratuito ou a baixo custo, independentemente da renda.",
    effect: { econ: 10, dipl: 0, govt: 0, scty: 0 },
  },
  {
    // Original: "Prostitution should be illegal."
    // Efeito: govt: -10 (Autoridade), scty: -10 (Tradição) -> Proibir prostituição
    question: "A prostituição deveria ser considerada uma atividade ilegal.",
    effect: { econ: 0, dipl: 0, govt: -10, scty: -10 },
  },
  {
    // Original: "Maintaining family values is essential."
    // Efeito: scty: -10 (Tradição) -> Valores familiares tradicionais
    question:
      "A preservação dos valores familiares tradicionais é essencial para a saúde e estabilidade da sociedade.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    // Original: "To chase progress at all costs is dangerous."
    // Efeito: scty: -10 (Tradição) -> Cautela com progresso = Tradicionalista
    question:
      "A busca incessante pelo progresso tecnológico e social, sem considerar os riscos e os valores tradicionais, é perigosa.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: -10 },
  },
  {
    // Original: "Genetic modification is a force for good, even on humans."
    // Efeito: scty: 10 (Progresso) -> Apoio à modificação genética
    question:
      "A modificação genética, incluindo em seres humanos, tem potencial para trazer grandes benefícios e deveria ser explorada.",
    effect: { econ: 0, dipl: 0, govt: 0, scty: 10 },
  },
  {
    // Original: "We should open our borders to immigration."
    // Efeito: dipl: 10 (Global), govt: 10 (Liberdade) -> Fronteiras abertas
    question:
      "As fronteiras do nosso país deveriam ser mais abertas para permitir a entrada de imigrantes que desejam viver e trabalhar aqui.",
    effect: { econ: 0, dipl: 10, govt: 10, scty: 0 },
  },
  {
    // Original: "Governments should be as concerned about foreigners as they are about their own citizens."
    // Efeito: dipl: 10 (Global) -> Cosmopolitismo/Universalismo
    question:
      "O governo do nosso país deveria se preocupar com o bem-estar de todas as pessoas no mundo, não apenas com seus próprios cidadãos.",
    effect: { econ: 0, dipl: 10, govt: 0, scty: 0 },
  },
  {
    // Original: "All people - regardless of factors like culture or sexuality - should be treated equally."
    // Efeito: econ: 10 (Igualdade), dipl: 10 (Global), govt: 10 (Liberdade), scty: 10 (Progresso) -> Igualdade Universal
    question:
      "Todas as pessoas devem ser tratadas com igualdade e respeito, independentemente de sua origem, cultura, religião, orientação sexual ou identidade de gênero.",
    effect: { econ: 10, dipl: 10, govt: 10, scty: 10 },
  },
  {
    // Original: "It is important that we further my group's goals above all others."
    // Efeito: econ: -10 (Mercado/Grupo), dipl: -10 (Nação/Grupo), govt: -10 (Autoridade/Grupo), scty: -10 (Tradição/Grupo) -> Tribalismo/Identitarismo
    question:
      "Os interesses e objetivos do meu grupo (seja ele nacional, étnico, religioso ou outro) devem ter prioridade sobre os interesses de outros grupos ou da sociedade em geral.",
    effect: { econ: -10, dipl: -10, govt: -10, scty: -10 },
  },
];
