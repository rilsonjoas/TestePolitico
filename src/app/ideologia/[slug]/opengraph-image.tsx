import { ImageResponse } from 'next/og';
import { ideologies } from '@/lib/data';

export const dynamic = 'force-static';

export const alt = 'Teste Político 8 Valores - Detalhes da Ideologia';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Função helper idêntica à da página
function slugify(text: string) {
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

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ideology = ideologies.find((i) => slugify(i.name) === slug);

  if (!ideology) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Ideologia não encontrada
        </div>
      ),
      { ...size }
    );
  }

  const axes = [
    { name: 'Econômico', value: ideology.stats.econ, label1: 'Igualdade', label2: 'Mercado', color1: '#e63946', color2: '#1d3557' },
    { name: 'Diplomático', value: ideology.stats.dipl, label1: 'Nação', label2: 'Global', color1: '#f77f00', color2: '#a8dadc' },
    { name: 'Civil', value: ideology.stats.govt, label1: 'Liberdade', label2: 'Autoridade', color1: '#ffc300', color2: '#457b9d' },
    { name: 'Social', value: ideology.stats.scty, label1: 'Tradição', label2: 'Progresso', color1: '#8338ec', color2: '#3a86ff' },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
          {/* Logo Simulado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'conic-gradient(#e63946 0deg 90deg, #f77f00 90deg 180deg, #ffc300 180deg 270deg, #3a86ff 270deg 360deg)' }} />
            <span style={{ fontSize: 24, fontWeight: 'bold', color: '#e5e7eb' }}>Teste Político</span>
          </div>
          
          <h1 style={{ fontSize: 72, fontWeight: 900, margin: 0, textAlign: 'center', lineHeight: 1.1 }}>
            {ideology.name}
          </h1>
          <p style={{ fontSize: 24, color: '#9ca3af', marginTop: 10 }}>O que define esta ideologia?</p>
        </div>

        <div style={{ display: 'flex', gap: 20, width: '100%', padding: '0 40px' }}>
          {axes.map((axis) => (
            <div key={axis.name} style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 'bold' }}>
                  <span>{axis.name}</span>
               </div>
               <div style={{ display: 'flex', height: 16, width: '100%', borderRadius: 8, overflow: 'hidden', background: '#374151' }}>
                  <div style={{ width: `${axis.value}%`, height: '100%', background: axis.color1 }} />
                  <div style={{ width: `${100 - axis.value}%`, height: '100%', background: axis.color2 }} />
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: '#d1d5db' }}>
                  <span>{axis.label1}</span>
                  <span>{axis.label2}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
