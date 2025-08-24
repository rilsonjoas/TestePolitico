import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader} from '@/components/ui/card';
import { questions } from '@/lib/data';
import Image from 'next/image';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { Logo } from '@/components/Logo';

export default function Home() {
  const values = [
    { name: 'Igualdade', icon: '/imagens/igualdade.png', anchor: '#anchor' },
    { name: 'Nação', icon: '/imagens/nacao.png', anchor: '#anchor' },
    { name: 'Liberdade', icon: '/imagens/liberdade.png', anchor: '#anchor' },
    { name: 'Tradição', icon: '/imagens/tradicao.png', anchor: '#anchor' },
    { name: 'Mercado', icon: '/imagens/mercado.png', anchor: '#anchor' },
    { name: 'Global', icon: '/imagens/global.png', anchor: '#anchor' },
    { name: 'Autoridade', icon: '/imagens/autoridade.png', anchor: '#anchor' },
    { name: 'Progresso', icon: '/imagens/progresso.png', anchor: '#anchor' },
  ];

  const axes = [
    { name: 'Econômico', values: ['Igualdade', 'Mercado'], color1: '#e63946', color2: '#1d3557' },
    { name: 'Diplomático', values: ['Nação', 'Global'], color1: '#f77f00', color2: '#a8dadc' },
    { name: 'Civil', values: ['Liberdade', 'Autoridade'], color1: '#ffc300', color2: '#457b9d' },
    { name: 'Social', values: ['Tradição', 'Progresso'], color1: '#8338ec', color2: '#3a86ff' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4 md:p-8 dark:bg-gray-900">
      <header className="relative mb-10 mt-8 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <Logo size={64} showText={false} />
          <h1 className="text-4xl md:text-5xl font-bold text-center dark:text-gray-100">Teste Político 8 Valores</h1>
        </div>
      </header>

      <main className="dark:bg-gray-900">
        <div className="flex justify-center w-full mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {values.map((value) => (
              <Link href={value.anchor} key={value.name}>
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center p-2" style={{ width: 152, height: 152 }}>
                  <CardHeader className="p-0 flex justify-center items-center h-full w-full">
                    <Image src={value.icon} alt={`Ícone ${value.name}`} width={140} height={140} className="rounded-lg mx-auto block" />
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center my-10">
          <Link href="/instructions">
            <Button
              size="lg"
              className="mt-8 px-6 py-2 rounded font-semibold bg-white text-gray-900 border border-gray-300 shadow-lg hover:bg-blue-100 hover:border-blue-400 transition duration-150"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              Clique aqui para começar!
            </Button>
          </Link>
        </div>

        <hr className="my-10 border-gray-300 dark:border-gray-700" />

        <section className="max-w-4xl mx-auto dark:bg-gray-900">
          <h2 className="text-3xl font-bold text-center mb-4 dark:text-gray-100">Como funciona o teste?</h2>
          <p className="text-lg text-center dark:text-gray-300">
            Este é um questionário político que tenta atribuir porcentagens para oito valores políticos diferentes. Você será apresentado a uma afirmação e, em seguida, responderá com sua opinião sobre ela, de <b>Concordo Totalmente</b> a <b>Discordo Totalmente</b>, com cada resposta afetando suas pontuações. No final do questionário, suas respostas serão comparadas ao máximo possível para cada valor, dando-lhe assim uma porcentagem.
          </p>
          <p className="text-lg text-center mt-4 dark:text-gray-300">Portanto, se você deseja ter um resultado confiável, responda honestamente!</p>
          <p className="text-lg text-center mt-4 dark:text-gray-300">Há <b><u>{questions.length}</u></b> perguntas no teste.</p>
        </section>

        <hr className="my-10 border-gray-300 dark:border-gray-700" />

        <section id="anchor" className="max-w-5xl mx-auto dark:bg-gray-900">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">Quais são os oito valores?</h2>
          <div className="space-y-10">
            {axes.map((axis) => (
              <div key={axis.name} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full md:w-2/5 text-center md:text-left">
                  <h3 className="text-2xl font-bold" style={{ color: axis.color1 }}>{axis.values[0].toUpperCase()}</h3>
                  <p className="mt-2 dark:text-gray-300">Aqueles com pontuações mais altas em {axis.values[0]} acreditam que a economia deve distribuir valor de forma equitativa entre a população. Eles tendem a apoiar códigos tributários progressivos, programas sociais e, para aqueles que se destacam neste valor, o socialismo.</p>
                </div>
                <div className="w-full md:w-1/5 text-center">
                  <h4 className="text-xl font-semibold dark:text-gray-100">{axis.name.toUpperCase()}</h4>
                  <div className="text-4xl my-2 dark:text-gray-100">↔</div>
                </div>
                <div className="w-full md:w-2/5 text-center md:text-right">
                  <h3 className="text-2xl font-bold" style={{ color: axis.color2 }}>{axis.values[1].toUpperCase()}</h3>
                  <p className="mt-2 dark:text-gray-300">Aqueles com pontuações mais altas em {axis.values[1]} acreditam que a economia deve focar em proporcionar um crescimento rápido. Eles tendem a apoiar impostos mais baixos, privatização, desregulamentação e, para aqueles que se destacam neste valor, o capitalismo laissez-faire e o liberalismo econômico.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center mt-16 py-4 border-t border-gray-300 dark:border-gray-700 dark:bg-gray-900">
        <p className="dark:text-gray-400">&copy; 2025 - Desenvolvido por <a href="https://github.com/rilsonjoas" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Rilson Joás</a></p>
      </footer>
      </div>
    </div>
  );
}