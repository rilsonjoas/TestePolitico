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
    econ: { l: '#ef4444', r: '#22c55e' }, // Igualdade vs Mercado
    dipl: { l: '#06b6d4', r: '#f97316' }, // Global vs Nação
    govt: { l: '#eab308', r: '#3b82f6' }, // Liberdade vs Autoridade
    scty: { l: '#ec4899', r: '#a855f7' }, // Progresso vs Tradição
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
          justifyContent: 'space-between',
          backgroundColor: '#0f172a', // Slate 900
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px 60px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: 0, letterSpacing: '2px', color: '#ffffff' }}>
              TESTE POLÍTICO
            </h1>
            <span style={{ fontSize: '20px', fontWeight: 'bold', backgroundColor: 'rgba(59,130,246,0.2)', color: '#60a5fa', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(59,130,246,0.4)' }}>
              8 VALORES
            </span>
          </div>
          <p style={{ fontSize: '18px', color: '#94a3b8', margin: '6px 0 0 0', textTransform: 'uppercase', letterSpacing: '3px' }}>
            Resultado do Espectro Político
          </p>
        </div>

        {/* 4 Eixos */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '14px' }}>
          
          {/* Econômico */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
              <span style={{ color: colors.econ.l }}>Igualdade ({e.toFixed(1)}%)</span>
              <span style={{ color: colors.econ.r }}>Mercado ({(100-e).toFixed(1)}%)</span>
            </div>
            <div style={{ display: 'flex', height: '24px', width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#334155' }}>
              <div style={{ width: `${e}%`, height: '100%', backgroundColor: colors.econ.l }} />
              <div style={{ width: `${100-e}%`, height: '100%', backgroundColor: colors.econ.r }} />
            </div>
          </div>

          {/* Diplomático */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
              <span style={{ color: colors.dipl.l }}>Global ({d.toFixed(1)}%)</span>
              <span style={{ color: colors.dipl.r }}>Nação ({(100-d).toFixed(1)}%)</span>
            </div>
            <div style={{ display: 'flex', height: '24px', width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#334155' }}>
              <div style={{ width: `${d}%`, height: '100%', backgroundColor: colors.dipl.l }} />
              <div style={{ width: `${100-d}%`, height: '100%', backgroundColor: colors.dipl.r }} />
            </div>
          </div>

          {/* Civil */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
              <span style={{ color: colors.govt.l }}>Liberdade ({g.toFixed(1)}%)</span>
              <span style={{ color: colors.govt.r }}>Autoridade ({(100-g).toFixed(1)}%)</span>
            </div>
            <div style={{ display: 'flex', height: '24px', width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#334155' }}>
              <div style={{ width: `${g}%`, height: '100%', backgroundColor: colors.govt.l }} />
              <div style={{ width: `${100-g}%`, height: '100%', backgroundColor: colors.govt.r }} />
            </div>
          </div>

          {/* Social */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
              <span style={{ color: colors.scty.l }}>Progresso ({s.toFixed(1)}%)</span>
              <span style={{ color: colors.scty.r }}>Tradição ({(100-s).toFixed(1)}%)</span>
            </div>
            <div style={{ display: 'flex', height: '24px', width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#334155' }}>
              <div style={{ width: `${s}%`, height: '100%', backgroundColor: colors.scty.l }} />
              <div style={{ width: `${100-s}%`, height: '100%', backgroundColor: colors.scty.r }} />
            </div>
          </div>

        </div>

        {/* CTA Footer Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 28px',
            borderRadius: '30px',
            backgroundColor: 'rgba(30, 41, 59, 0.95)',
            border: '2px solid #3b82f6',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#e2e8f0',
          }}
        >
          <span>Descubra sua ideologia em&nbsp;</span>
          <span style={{ color: '#60a5fa' }}>testepolitico.com.br</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
