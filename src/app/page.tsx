'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { questions } from '@/lib/data';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { 
  ArrowRight, 
  ChevronDown, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Globe2,
  Lock,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Teste Político 8 Valores",
    "description": "Descubra sua ideologia política com base em 8 valores fundamentais. Responda a 70 perguntas para ver seu posicionamento no espectro político.",
    "educationalUse": "self-assessment",
    "about": {
      "@type": "Thing",
      "name": "Ideologia Política"
    },
    "assesses": ["Economic Policy", "Civil Liberty", "Diplomatic views", "Societal views"],
    "learningResourceType": "Assessment"
  };

  const values = [
    { name: 'Igualdade', icon: '/imagens/igualdade.png', color: '#e63946' },
    { name: 'Mercado', icon: '/imagens/mercado.png', color: '#1d3557' },
    { name: 'Nação', icon: '/imagens/nacao.png', color: '#f77f00' },
    { name: 'Global', icon: '/imagens/global.png', color: '#a8dadc' },
    { name: 'Liberdade', icon: '/imagens/liberdade.png', color: '#ffc300' },
    { name: 'Autoridade', icon: '/imagens/autoridade.png', color: '#457b9d' },
    { name: 'Tradição', icon: '/imagens/tradicao.png', color: '#8338ec' },
    { name: 'Progresso', icon: '/imagens/progresso.png', color: '#3a86ff' },
  ];

  const axes = [
    { 
      name: 'Econômico', 
      values: ['Igualdade', 'Mercado'], 
      color1: '#e63946', 
      color2: '#1d3557', 
      desc1: 'Aqueles com pontuações mais altas em Igualdade acreditam que a economia deve distribuir valor de forma equitativa entre a população. Eles tendem a apoiar códigos tributários progressivos, programas sociais e, para aqueles que se destacam neste valor, o socialismo.', 
      desc2: 'Aqueles com pontuações mais altas em Mercado acreditam que a economia deve focar em proporcionar um crescimento rápido. Eles tendem a apoiar impostos mais baixos, privatização, desregulamentação e, para aqueles que se destacam neste valor, o capitalismo laissez-faire e o liberalismo econômico.' 
    },
    { 
      name: 'Diplomático', 
      values: ['Nação', 'Global'], 
      color1: '#f77f00', 
      color2: '#a8dadc', 
      desc1: 'Aqueles com pontuações mais altas em Nação são patriotas e nacionalistas. Eles frequentemente acreditam em uma política externa agressiva, priorizando os interesses de sua própria nação acima de tudo.', 
      desc2: 'Aqueles com pontuações mais altas em Global acreditam que a cooperação internacional é a chave para o progresso. Eles tendem a apoiar políticas externas pacíficas, diplomacia e organizações globais.' 
    },
    { 
      name: 'Civil', 
      values: ['Liberdade', 'Autoridade'], 
      color1: '#ffc300', 
      color2: '#457b9d', 
      desc1: 'Aqueles com pontuações mais altas em Liberdade acreditam fortemente nos direitos individuais e na liberdade civil. Eles tendem a apoiar o governo limitado e se opor à vigilância estatal e ao autoritarismo.', 
      desc2: 'Aqueles com pontuações mais altas em Autoridade acreditam que a ordem social é necessária para o funcionamento da sociedade. Eles tendem a apoiar um Estado forte para manter a segurança e a estabilidade.' 
    },
    { 
      name: 'Social', 
      values: ['Tradição', 'Progresso'], 
      color1: '#8338ec', 
      color2: '#3a86ff', 
      desc1: 'Aqueles com pontuações mais altas em Tradição valorizam os costumes tradicionais e a moralidade religiosa. Eles tendem a olhar para o passado em busca de sabedoria e estabilidade social.', 
      desc2: 'Aqueles com pontuações mais altas em Progresso acreditam na mudança social e na inovação. Eles tendem a apoiar o avanço tecnológico, o secularismo e a experimentação social.' 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 selection:bg-blue-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center gap-6"
          >
            <Logo size={80} showText={false} className="shadow-2xl rounded-full p-2 bg-white dark:bg-gray-800" />
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight max-w-4xl">
              Descubra seu Verdadeiro <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Perfil Político</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
              Analise seu posicionamento através de 8 valores fundamentais e 
              descubra qual ideologia melhor representa suas convicções.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/instructions">
                <Button size="lg" className="h-16 px-10 rounded-2xl text-xl font-black bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/25">
                  COMEÇAR TESTE AGORA <Zap className="ml-2 fill-current" />
                </Button>
              </Link>
              <Link href="/ideologia">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-xl font-bold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                  ENCICLOPÉDIA
                </Button>
              </Link>
            </div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-16 text-gray-400"
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Values Grid */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 mb-4">A Estrutura do Teste</h2>
            <p className="text-3xl md:text-4xl font-black">Os 8 Valores Políticos</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6"
          >
            {values.map((value) => (
              <motion.div 
                key={value.name}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div 
                  className="absolute inset-x-0 bottom-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" 
                  style={{ backgroundColor: value.color }}
                />
                <Card className="h-full bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm group-hover:shadow-xl transition-all duration-300 overflow-hidden rounded-none">
                  <CardHeader className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-3 group-hover:scale-110 transition-transform duration-500">
                       <Image src={value.icon} alt={value.name} width={80} height={80} className="grayscale group-hover:grayscale-0 transition-all rounded-none" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">{value.name}</span>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Axis Information */}
      <section id="anchor" className="py-24 container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-20"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Os 4 Eixos Fundamentais</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Cada par de valores representa um eixo de conflito político clássico. 
              Sua resposta a cada pergunta molda sua posição final em cada um deles.
            </p>
          </div>

          <div className="grid gap-10">
            {axes.map((axis, i) => (
              <motion.div 
                key={axis.name}
                initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row items-stretch gap-8 p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden group"
              >
                <div className="lg:w-1/3 flex flex-col justify-center">
                   <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">EIXO #{i+1}</div>
                   <h3 className="text-3xl font-black mb-4">{axis.name}</h3>
                   <div className="w-12 h-1 bg-blue-600 rounded-full group-hover:w-24 transition-all duration-500" />
                </div>

                <div className="lg:w-2/3 grid md:grid-cols-2 gap-8 items-center">
                  <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-50 dark:border-gray-800">
                    <h4 className="text-xl font-black mb-3" style={{ color: axis.color1 }}>{axis.values[0]}</h4>
                    <p className="text-sm dark:text-gray-400 leading-relaxed font-medium">{axis.desc1}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-50 dark:border-gray-800">
                    <h4 className="text-xl font-black mb-3" style={{ color: axis.color2 }}>{axis.values[1]}</h4>
                    <p className="text-sm dark:text-gray-400 leading-relaxed font-medium">{axis.desc2}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quick Info / Stats */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Logo size={400} />
        </div>
        <div className="container mx-auto px-4 overflow-hidden relative z-10">
           <div className="grid md:grid-cols-3 gap-12 text-center pointer-events-none">
              <div className="space-y-4">
                <BarChart3 size={48} className="mx-auto mb-4" />
                <div className="text-4xl font-black">{questions.length}</div>
                <div className="text-blue-100 font-bold uppercase tracking-widest text-sm">Perguntas Totais</div>
              </div>
              <div className="space-y-4">
                <Globe2 size={48} className="mx-auto mb-4" />
                <div className="text-4xl font-black">40+</div>
                <div className="text-blue-100 font-bold uppercase tracking-widest text-sm">Ideologias Mapeadas</div>
              </div>
              <div className="space-y-4">
                <ShieldCheck size={48} className="mx-auto mb-4" />
                <div className="text-4xl font-black">100%</div>
                <div className="text-blue-100 font-bold uppercase tracking-widest text-sm">Anônimo e Privado</div>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials or Trust Bar */}
      <section className="py-24 container mx-auto px-4 text-center max-w-3xl">
         <h2 className="text-2xl font-black mb-12 uppercase tracking-widest text-gray-400">Por que fazer este teste?</h2>
         <div className="grid gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6 text-left">
               <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 shrink-0">
                  <Lock size={32} />
               </div>
               <div>
                  <h4 className="text-xl font-bold mb-1">Privacidade Total</h4>
                  <p className="text-gray-500 dark:text-gray-400">Suas respostas nunca saem do seu dispositivo. O cálculo é feito localmente e os resultados só são compartilhados se você quiser.</p>
               </div>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6 text-left">
               <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare size={32} />
               </div>
               <div>
                  <h4 className="text-xl font-bold mb-1">Debate Construtivo</h4>
                  <p className="text-gray-500 dark:text-gray-400">Entenda os valores por trás das opiniões políticas em vez de apenas rótulos superficiais.</p>
               </div>
            </div>
         </div>

         <div className="mt-20">
            <Link href="/instructions">
               <Button size="xl" className="h-20 px-16 rounded-3xl text-2xl font-black group">
                  INICIAR AGORA
                  <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
               </Button>
            </Link>
         </div>
      </section>
    </div>
  );
}