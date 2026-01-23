import { ImageResponse } from 'next/og';
import { getMatchedIdeology } from '@/lib/data';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const scores = {
      e: parseFloat(searchParams.get('e') || '50'),
      d: parseFloat(searchParams.get('d') || '50'),
      g: parseFloat(searchParams.get('g') || '50'),
      s: parseFloat(searchParams.get('s') || '50'),
    };

    const matchedIdeology = getMatchedIdeology(scores.e, scores.d, scores.g, scores.s);

    const values = [
      { name: 'Econômico', value1: scores.e, value2: 100 - scores.e, label1: 'Igualdade', label2: 'Mercado', color1: '#e63946', color2: '#1d3557' },
      { name: 'Diplomático', value1: scores.d, value2: 100 - scores.d, label1: 'Nação', label2: 'Global', color1: '#f77f00', color2: '#a8dadc' },
      { name: 'Civil', value1: scores.g, value2: 100 - scores.g, label1: 'Liberdade', label2: 'Autoridade', color1: '#ffc300', color2: '#457b9d' },
      { name: 'Social', value1: scores.s, value2: 100 - scores.s, label1: 'Tradição', label2: 'Progresso', color1: '#8338ec', color2: '#3a86ff' },
    ];

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
            color: 'white',
            padding: 40,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 24, fontWeight: 'bold', color: '#60a5fa', marginRight: 10 }}>Teste Político</span>
            <span style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>8 Valores</span>
          </div>

          {/* Main Content: Ideology Name */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 20, color: '#9ca3af', marginBottom: 5 }}>Minha ideologia é</span>
            <span style={{ fontSize: 64, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', lineHeight: 1.1 }}>
              {matchedIdeology?.name || 'Indefinida'}
            </span>
          </div>

          {/* Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 800, gap: 15 }}>
            {values.map((axis) => (
              <div key={axis.name} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {/* Left Label */}
                <div style={{ 
                  width: 120, 
                  textAlign: 'right', 
                  paddingRight: 15, 
                  fontSize: 18, 
                  fontWeight: 600, 
                  color: axis.color1 
                }}>
                  {axis.label1}
                </div>

                {/* Bar Container */}
                <div style={{ 
                  flex: 1, 
                  height: 24, 
                  background: '#374151', 
                  borderRadius: 12, 
                  overflow: 'hidden', 
                  display: 'flex' 
                }}>
                  <div style={{ width: `${axis.value1}%`, height: '100%', background: axis.color1 }} />
                  <div style={{ width: `${axis.value2}%`, height: '100%', background: axis.color2 }} />
                </div>

                {/* Right Label */}
                <div style={{ 
                  width: 120, 
                  textAlign: 'left', 
                  paddingLeft: 15, 
                  fontSize: 18, 
                  fontWeight: 600, 
                  color: axis.color2 
                }}>
                  {axis.label2}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ marginTop: 40, fontSize: 18, color: '#6b7280' }}>
            testepolitico.com.br
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    console.log(errorMessage);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
