import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const e = parseFloat(searchParams.get('e') || '50');
  const d = parseFloat(searchParams.get('d') || '50');
  const g = parseFloat(searchParams.get('g') || '50');
  const s = parseFloat(searchParams.get('s') || '50');

  // Cores dos eixos
  const colors = {
    econ: { l: '#f44336', r: '#4caf50' }, // Igualdade vs Mercado
    dipl: { l: '#ff9800', r: '#03a9f4' }, // Nação vs Global
    govt: { l: '#ffeb3b', r: '#3f51b5' }, // Liberdade vs Autoridade
    scty: { l: '#9c27b0', r: '#e91e63' }, // Tradição vs Progresso
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827', // Gray 900
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '60px', fontWeight: '900', margin: 0, textTransform: 'uppercase', letterSpacing: '4px' }}>
            Teste Político
          </h1>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>
            MEUS RESULTADOS
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px', padding: '0 60px' }}>
          
          {/* Econômico */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
              <span style={{ color: colors.econ.l }}>Igualdade</span>
              <span style={{ color: colors.econ.r }}>Mercado</span>
            </div>
            <div style={{ display: 'flex', height: '30px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
              <div style={{ width: `${e}%`, height: '100%', backgroundColor: colors.econ.l, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}>{e > 15 && `${e.toFixed(1)}%`}</div>
              <div style={{ width: `${100-e}%`, height: '100%', backgroundColor: colors.econ.r, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px' }}>{100-e > 15 && `${(100-e).toFixed(1)}%`}</div>
            </div>
          </div>

          {/* Diplomático */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
              <span style={{ color: colors.dipl.l }}>Nação</span>
              <span style={{ color: colors.dipl.r }}>Global</span>
            </div>
            <div style={{ display: 'flex', height: '30px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
              <div style={{ width: `${d}%`, height: '100%', backgroundColor: colors.dipl.l, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}>{d > 15 && `${d.toFixed(1)}%`}</div>
              <div style={{ width: `${100-d}%`, height: '100%', backgroundColor: colors.dipl.r, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px' }}>{100-d > 15 && `${(100-d).toFixed(1)}%`}</div>
            </div>
          </div>

          {/* Civil */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
              <span style={{ color: colors.govt.l }}>Liberdade</span>
              <span style={{ color: colors.govt.r }}>Autoridade</span>
            </div>
            <div style={{ display: 'flex', height: '30px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
              <div style={{ width: `${g}%`, height: '100%', backgroundColor: colors.govt.l, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}>{g > 15 && `${g.toFixed(1)}%`}</div>
              <div style={{ width: `${100-g}%`, height: '100%', backgroundColor: colors.govt.r, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px' }}>{100-g > 15 && `${(100-g).toFixed(1)}%`}</div>
            </div>
          </div>

          {/* Social */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
              <span style={{ color: colors.scty.l }}>Tradição</span>
              <span style={{ color: colors.scty.r }}>Progresso</span>
            </div>
            <div style={{ display: 'flex', height: '30px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
              <div style={{ width: `${s}%`, height: '100%', backgroundColor: colors.scty.l, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}>{s > 15 && `${s.toFixed(1)}%`}</div>
              <div style={{ width: `${100-s}%`, height: '100%', backgroundColor: colors.scty.r, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px' }}>{100-s > 15 && `${(100-s).toFixed(1)}%`}</div>
            </div>
          </div>

        </div>

        <div style={{ marginTop: '30px', fontSize: '20px', color: '#9ca3af' }}>
          testepolitico.com.br
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
