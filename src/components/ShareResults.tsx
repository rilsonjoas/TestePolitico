import { useRef, useState, useEffect } from "react";
// Removed static import to fix SSR error
// import * as domToImage from 'dom-to-image-more';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "./Toast";

type SocialFormat = 'instagram' | 'twitter' | 'square';

interface ShareResultsProps {
  targetId: string;
  scores?: { e: number; d: number; g: number; s: number };
  matchedIdeology?: {
    name: string;
    desc: string;
    roast?: string;
    politicians: { name: string }[];
    books: { title: string }[];

  } | null;
  enableComparison?: boolean;
}

export function ShareResults({ targetId, scores, matchedIdeology, enableComparison = false }: ShareResultsProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supportsClipboard, setSupportsClipboard] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>('instagram');
  const [showRoast, setShowRoast] = useState(false);
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);
  const { showToast, ToastComponent } = useToast();

  const [canShare, setCanShare] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCompareLink, setCopiedCompareLink] = useState(false);

  useEffect(() => {
    setSupportsClipboard(
      'navigator' in window &&
      'clipboard' in navigator &&
      'write' in navigator.clipboard &&
      window.isSecureContext
    );
    
    // Check for Web Share API support
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setCanShare(true);
    }
  }, []);

  // --- COMPARTILHAMENTO E LINKS (Definidos antes do uso) ---
  const shareUrl = `https://testepolitico.com.br/results?e=${scores?.e || 50}&d=${scores?.d || 50}&g=${scores?.g || 50}&s=${scores?.s || 50}`;

  const shareText = matchedIdeology
    ? `Fiz o Teste Político 8 Valores e minha ideologia mais próxima é: ${matchedIdeology.name}!`
    : `Fiz o Teste Político 8 Valores! Descubra sua ideologia:`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Teste Político 8 Valores',
          text: shareText,
          url: shareUrl,
        });
        showToast("Compartilhado com sucesso!", "success");
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
           console.error('Error sharing:', err);
        }
      }
    }
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      showToast("Link copiado!", "success");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      showToast("Erro ao copiar link", "error");
    }
  };

  const handleCopyCompareLink = async () => {
    if (!scores) return;
    const compareUrl = `https://testepolitico.com.br/quiz?compareE=${scores.e}&compareD=${scores.d}&compareG=${scores.g}&compareS=${scores.s}`;
    try {
      await navigator.clipboard.writeText(compareUrl);
      setCopiedCompareLink(true);
      showToast("Link de desafio copiado!", "success");
      setTimeout(() => setCopiedCompareLink(false), 2000);
    } catch {
      showToast("Erro ao copiar link", "error");
    }
  };

  // --- GERAÇÃO DE IMAGEM ---

  const getFormatDimensions = (format: SocialFormat) => {
    switch (format) {
      case 'instagram':
        return { width: 1080, height: 1920 }; // 9:16 Stories
      case 'twitter':
        return { width: 1200, height: 675 }; // 16:9 Posts
      case 'square':
        return { width: 1080, height: 1080 }; // 1:1 Square
      default:
        return { width: 1080, height: 1920 };
    }
  };

  const createManualCanvas = async (format: SocialFormat = selectedFormat): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Configurações de dimensão
    const { width, height } = getFormatDimensions(format);
    canvas.width = width;
    canvas.height = height;
    
    // --- ESTILO E PALETA ---
    // const isDark = true; // Forçar modo escuro para estética "Premium"
    const textPrimary = '#ffffff';
    const textSecondary = '#94a3b8';
    
    // Fundo Gradiente "Deep Space"
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#0f172a'); // Slate 900
    bgGradient.addColorStop(1, '#1e293b'); // Slate 800
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Padding base
    const padding = Math.max(50, canvas.width * 0.05);

    // --- CABEÇALHO ---
    // Logo centralizado e minimalista
    const logoY = padding + 40;
    
    // Título do Site
    ctx.textAlign = 'center';
    ctx.fillStyle = textPrimary;
    const titleSize = format === 'twitter' ? 28 : 36;
    ctx.font = `bold ${titleSize}px Arial`;
    ctx.fillText('TESTE POLÍTICO', canvas.width / 2, logoY);
    
    ctx.fillStyle = '#3b82f6'; // Azul destaque
    ctx.font = `bold ${titleSize}px Arial`;
    // Pequeno ajuste para desenhar o "8 VALORES" logo abaixo ou ao lado se for twitter
    if (format === 'twitter') {
       ctx.fillText('8 VALORES', canvas.width / 2, logoY + 35);
    } else {
       ctx.fillText('8 VALORES', canvas.width / 2, logoY + 45);
    }

    // --- CONTEÚDO PRINCIPAL (IDEOLOGIA) ---
    const centerY = canvas.height * (format === 'twitter' ? 0.35 : 0.28);
    
    if (matchedIdeology) {
      // Label "Minha ideologia é"
      ctx.fillStyle = textSecondary;
      ctx.font = '24px Arial';
      ctx.fillText('Minha ideologia é', canvas.width / 2, centerY - 20);

      // Nome da Ideologia (Hero Text)
      ctx.fillStyle = textPrimary;
      // Ajuste dinâmico de tamanho de fonte baseado no tamanho do nome
      const nameLength = matchedIdeology.name.length;
      let ideologyFontSize = format === 'twitter' ? 48 : 72;
      if (nameLength > 20) ideologyFontSize *= 0.8;
      
      ctx.font = `800 ${ideologyFontSize}px Arial`;
      
      // Efeito de brilho no texto (Shadow)
      ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
      ctx.shadowBlur = 20;
      ctx.fillText(matchedIdeology.name, canvas.width / 2, centerY + (format === 'twitter' ? 40 : 60));
      ctx.shadowBlur = 0; // Reset shadow
    }

    // --- BARRAS DE EIXOS ---
    if (!scores) return canvas;

    const axes = [
      { name: 'Econômico', value1: scores.e, value2: 100 - scores.e, label1: 'Igualdade', label2: 'Mercado', color1: '#ef4444', color2: '#22c55e' }, // Cores mais vibrantes
      { name: 'Diplomático', value1: scores.d, value2: 100 - scores.d, label1: 'Nação', label2: 'Global', color1: '#f97316', color2: '#06b6d4' },
      { name: 'Civil', value1: scores.g, value2: 100 - scores.g, label1: 'Liberdade', label2: 'Autoridade', color1: '#eab308', color2: '#3b82f6' },
      { name: 'Social', value1: scores.s, value2: 100 - scores.s, label1: 'Tradição', label2: 'Progresso', color1: '#a855f7', color2: '#ec4899' },
    ];

    // Layout das barras muda drasticamente baseado no formato
    const isTwitter = format === 'twitter';
    const startBarsY = isTwitter 
      ? canvas.height * 0.55 
      : canvas.height * 0.45;
    
    const barSpacing = isTwitter ? 45 : 70;
    const barHeight = isTwitter ? 25 : 40;
    const maxBarWidth = Math.min(800, canvas.width - (padding * 2));
    const barStartX = (canvas.width - maxBarWidth) / 2;

    const fontSize = {
      label: isTwitter ? 14 : 20,
      percent: isTwitter ? 14 : 20
    };

    axes.forEach((axis, i) => {
      const y = startBarsY + (i * barSpacing);
      
      // Fundo da barra (track)
      const trackY = y - (barHeight / 2);
      
      // Labels acima da barra
      ctx.fillStyle = textSecondary;
      ctx.font = `600 ${fontSize.label}px Arial`;
      ctx.textAlign = 'left';
      ctx.fillStyle = axis.color1;
      ctx.fillText(axis.label1, barStartX, trackY - 10);
      
      ctx.textAlign = 'right';
      ctx.fillStyle = axis.color2;
      ctx.fillText(axis.label2, barStartX + maxBarWidth, trackY - 10);

      // Barra Container (arredondada)
      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ctx.roundRect(barStartX, trackY, maxBarWidth, barHeight, barHeight/2);
      ctx.fillStyle = '#334155'; // Slate 700
      ctx.fill();

      // Parte Esquerda (Color 1)
      const width1 = (maxBarWidth * axis.value1) / 100;
      if (width1 > 0) {
        ctx.beginPath();
        // Arredondar canto esquerdo sempre, direito apenas se for 100%
        // [top-left, top-right, bottom-right, bottom-left]
        const radii = width1 === maxBarWidth 
          ? [barHeight/2] 
          : [barHeight/2, 0, 0, barHeight/2];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ctx.roundRect(barStartX, trackY, width1, barHeight, radii);
        ctx.fillStyle = axis.color1;
        ctx.fill();
      }

      // Parte Direita (Color 2)
      const width2 = maxBarWidth - width1;
      if (width2 > 0) {
        ctx.beginPath();
        // Arredondar canto direito sempre, esquerdo apenas se for 100%
        const radii = width2 === maxBarWidth 
          ? [barHeight/2] 
          : [0, barHeight/2, barHeight/2, 0];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ctx.roundRect(barStartX + width1, trackY, width2, barHeight, radii);
        ctx.fillStyle = axis.color2;
        ctx.fill();
      }

      // Porcentagens dentro da barra (se houver espaço) ou ao lado
      ctx.font = `bold ${fontSize.percent}px Arial`;
      ctx.fillStyle = '#ffffff';
      
      // Texto da esquerda
      if (width1 > 50) {
        ctx.textAlign = 'left';
        ctx.fillText(`${axis.value1.toFixed(1)}%`, barStartX + 12, trackY + barHeight/2 + fontSize.percent/3);
      }
      
      // Texto da direita
      if (width2 > 50) {
        ctx.textAlign = 'right';
        ctx.fillText(`${axis.value2.toFixed(1)}%`, barStartX + maxBarWidth - 12, trackY + barHeight/2 + fontSize.percent/3);
      }
    });

    // --- RODAPÉ ---
    const footerY = canvas.height - (padding);
    
    // Linha divisória sutil
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - 100, footerY - 50);
    ctx.lineTo(canvas.width/2 + 100, footerY - 50);
    ctx.stroke();

    ctx.fillStyle = textSecondary;
    ctx.font = `bold ${isTwitter ? 18 : 24}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('testepolitico.com.br', canvas.width / 2, footerY);

    return canvas;
  };

  const handleCapture = async () => {
    setError(null);
    setLoading(true);
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
    
    loadingTimeout.current = setTimeout(() => {
      setLoading(false);
      setError("Tempo excedido. Usando método alternativo...");
    }, 12000);

    try {
      // MÉTODO 1: Canvas manual (mais confiável)
      console.log(`Gerando imagem no formato ${selectedFormat}...`);
      const canvas = await createManualCanvas(selectedFormat);
      const url = canvas.toDataURL("image/png", 0.95);
      setImageUrl(url);
      
    } catch (e1) {
      console.error('Método canvas falhou:', e1);
      
      // MÉTODO 2: dom-to-image como fallback
      try {
        console.log('Tentando dom-to-image como fallback...');
        
        // Dynamically import dom-to-image-more to avoid SSR issues
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const domToImage = (await import('dom-to-image-more')).default;

        const target = document.getElementById(targetId);
        if (!target) {
          throw new Error('Elemento não encontrado');
        }
        
        const { width, height } = getFormatDimensions(selectedFormat);
        const dataUrl = await domToImage.toPng(target, {
          bgcolor: '#ffffff',
          width: width,
          height: height,
          style: {
            fontFamily: 'Arial, sans-serif'
          },
          filter: (node: Element) => {
            // Filtra elementos problemáticos
            if (node.className && typeof node.className === 'string') {
              return !node.className.includes('dark:');
            }
            return true;
          }
        });
        
        setImageUrl(dataUrl);
        
      } catch (e2) {
        console.error('Método dom-to-image também falhou:', e2);
        const errorMessage = e1 instanceof Error ? e1.message : 'Erro desconhecido';
        setError(`Erro ao gerar imagem: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
      if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
    }
  };

  const handleCopy = async () => {
    if (!imageUrl) return;
    
    if (!supportsClipboard) {
      showToast("Seu navegador não suporta copiar imagens", "error");
      return;
    }
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      if (!blob.type.startsWith('image/')) {
        throw new Error('Tipo de arquivo inválido');
      }
      
      const clipboardItem = new ClipboardItem({
        [blob.type]: blob
      });
      
      await navigator.clipboard.write([clipboardItem]);
      
      setError(null);
      showToast("Imagem copiada para a área de transferência!", "success");
    } catch (err) {
      console.error("Erro ao copiar:", err);
      showToast("Falha ao copiar. Tente o download!", "error");
      setError("Falha ao copiar a imagem. Use o botão de download ou tente em outro navegador.");
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    const formatNames = {
      instagram: 'story',
      twitter: 'post', 
      square: 'feed'
    };
    link.download = `resultados_politico_${formatNames[selectedFormat]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Imagem ${formatNames[selectedFormat]} baixada!`, "success");
  };

  return (
    <>
      {ToastComponent}
      <div className="mt-8 w-full max-w-lg mx-auto space-y-6">

        {/* Card 1: Compartilhar Link */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
            Compartilhar Resultado
          </h3>

          <div className="flex flex-col gap-3">
             {/* Botão de Compartilhamento Nativo (Mobile/Supported) */}
             {canShare && (
               <button
                 onClick={handleNativeShare}
                 className="w-full flex items-center justify-center gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all shadow-md transform hover:scale-[1.02]"
               >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                 </svg>
                 <span className="font-bold text-lg">Compartilhar</span>
               </button>
             )}

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleShareWhatsApp}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Compartilhar no WhatsApp"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">WhatsApp</span>
              </button>

              <button
                onClick={handleShareTwitter}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Compartilhar no Twitter/X"
              >
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white font-bold">𝕏</span>
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Twitter</span>
              </button>

              <button
                onClick={handleCopyLink}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                  copiedLink 
                    ? 'bg-green-100 dark:bg-green-900/30 border border-green-500' 
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                title="Copiar Link para Área de Transferência"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  copiedLink ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {copiedLink ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs font-medium ${
                  copiedLink ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {copiedLink ? 'Copiado!' : 'Copiar'}
                </span>
              </button>
            </div>
            </div>
            
            {/* Botão de Desafiar Amigo */}
            {enableComparison && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleCopyCompareLink}
                  className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    copiedCompareLink
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                  }`}
                >
                  <span className="font-bold">
                    {copiedCompareLink ? 'Link Copiado!' : '⚔️ Desafiar um Amigo'}
                  </span>
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                  Envia um link para seu amigo fazer o teste e comparar com você!
                </p>
              </div>
            )}
          </div>


        {/* Card 2: Gerar Imagem */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
            Gerar Imagem para Redes Sociais
          </h3>

          {/* Seletor de formato */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'instagram' as SocialFormat, label: 'Story', desc: '9:16' },
              { key: 'twitter' as SocialFormat, label: 'Twitter', desc: '16:9' },
              { key: 'square' as SocialFormat, label: 'Feed', desc: '1:1' },
            ].map((format) => (
              <button
                key={format.key}
                onClick={() => setSelectedFormat(format.key)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedFormat === format.key
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div>{format.label}</div>
                <div className="text-xs opacity-75">{format.desc}</div>
              </button>
            ))}
          </div>

          <Button
            onClick={handleCapture}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Gerando...
              </span>
            ) : (
              "Gerar Imagem"
            )}
          </Button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-3">{error}</p>
          )}

          {/* Imagem gerada */}
          {imageUrl && (
            <div className="mt-6 space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Resultados do Teste Político"
                  className="w-full h-auto"
                />
              </div>

              <div className="flex gap-3">
                {supportsClipboard && (
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copiar
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Baixar
                </Button>
              </div>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Salve a imagem e anexe ao compartilhar nas redes sociais
              </p>
            </div>
          )}
        </div>


      </div>
    </>
  );
}