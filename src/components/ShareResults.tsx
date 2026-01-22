import { useRef, useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as domToImage from 'dom-to-image-more';
import { Button } from "@/components/ui/button";
import { useToast } from "./Toast";

type SocialFormat = 'instagram' | 'twitter' | 'square';

interface ShareResultsProps {
  targetId: string;
  scores?: { e: number; d: number; g: number; s: number };
  matchedIdeology?: {
    name: string;
    desc: string;
    politicians: { name: string }[];
    books: { title: string }[];
  } | null;
}

export function ShareResults({ targetId, scores, matchedIdeology }: ShareResultsProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supportsClipboard, setSupportsClipboard] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>('instagram');
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);
  const { showToast, ToastComponent } = useToast();

  useEffect(() => {
    setSupportsClipboard(
      'navigator' in window &&
      'clipboard' in navigator &&
      'write' in navigator.clipboard &&
      window.isSecureContext
    );
  }, []);

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
    
    const { width, height } = getFormatDimensions(format);
    canvas.width = width;
    canvas.height = height;
    
    // Fundo com gradiente
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#f8fafc');
    bgGradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Configurações baseadas no formato
    const padding = Math.max(40, canvas.width * 0.05);
    const headerHeight = format === 'instagram' ? 140 : (format === 'twitter' ? 80 : 120);
    
    // Header com gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, headerHeight);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = gradient;
    ctx.fillRect(padding, padding, canvas.width - 2 * padding, headerHeight);
    
    // Borda do header
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 3;
    ctx.strokeRect(padding, padding, canvas.width - 2 * padding, headerHeight);
    
    // Logo simples no header (círculo com 8 segmentos)
    const logoSize = format === 'instagram' ? 50 : (format === 'twitter' ? 35 : 45);
    const logoX = padding + logoSize + 30;
    const logoY = padding + headerHeight / 2;
    const logoRadius = logoSize;
    
    // Desenha logo circular
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(logoX, logoY, logoRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 8 segmentos coloridos no logo
    const logoColors = ['#e63946', '#1d3557', '#f77f00', '#a8dadc', '#8338ec', '#3a86ff', '#ffc300', '#457b9d'];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const nextAngle = ((i + 1) * Math.PI) / 4;
      
      ctx.fillStyle = logoColors[i];
      ctx.beginPath();
      ctx.moveTo(logoX, logoY);
      ctx.arc(logoX, logoY, logoRadius - 8, angle, nextAngle);
      ctx.closePath();
      ctx.fill();
    }
    
    // Centro do logo
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.arc(logoX, logoY, 12, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('8', logoX, logoY + 6);
    
    // Título do site
    const titleFontSize = format === 'instagram' ? 42 : (format === 'twitter' ? 28 : 36);
    const subtitleFontSize = format === 'instagram' ? 22 : (format === 'twitter' ? 16 : 20);
    
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.font = `bold ${titleFontSize}px Arial`;
    ctx.fillText('Teste Político 8 Valores', logoX + logoRadius + 25, logoY - 10);
    
    ctx.font = `${subtitleFontSize}px Arial`;
    ctx.fillText('Descubra suas ideologias políticas', logoX + logoRadius + 25, logoY + 20);
    
    if (!scores) return canvas;
    
    const axes = [
      { name: 'Econômico', value1: scores.e, value2: 100 - scores.e, label1: 'Igualdade', label2: 'Mercado', color1: '#e63946', color2: '#1d3557' },
      { name: 'Diplomático', value1: scores.d, value2: 100 - scores.d, label1: 'Nação', label2: 'Global', color1: '#f77f00', color2: '#a8dadc' },
      { name: 'Civil', value1: scores.g, value2: 100 - scores.g, label1: 'Liberdade', label2: 'Autoridade', color1: '#ffc300', color2: '#457b9d' },
      { name: 'Social', value1: scores.s, value2: 100 - scores.s, label1: 'Tradição', label2: 'Progresso', color1: '#8338ec', color2: '#3a86ff' },
    ];
    
    // Função auxiliar para desenhar card de eixo (conteúdo centralizado verticalmente)
    const drawAxisCard = (
      axis: typeof axes[0],
      x: number,
      y: number,
      cardW: number,
      cardH: number,
      fontSize: { name: number; label: number; percent: number },
      barH: number
    ) => {
      const innerPadding = 15;
      const barX = x + innerPadding;
      const barWidth = cardW - innerPadding * 2;

      // Card branco
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, y, cardW, cardH);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cardW, cardH);

      // Calcular altura total do conteúdo para centralizar
      const contentHeight = fontSize.name + 15 + fontSize.label + 12 + barH + 8 + fontSize.percent;
      const startY = y + (cardH - contentHeight) / 2;

      // Nome do eixo
      ctx.font = `bold ${fontSize.name}px Arial`;
      ctx.fillStyle = '#1f2937';
      ctx.textAlign = 'center';
      ctx.fillText(axis.name, x + cardW / 2, startY + fontSize.name);

      // Labels
      const labelY = startY + fontSize.name + 15 + fontSize.label;
      ctx.font = `600 ${fontSize.label}px Arial`;
      ctx.textAlign = 'left';
      ctx.fillStyle = axis.color1;
      ctx.fillText(axis.label1, barX, labelY);
      ctx.textAlign = 'right';
      ctx.fillStyle = axis.color2;
      ctx.fillText(axis.label2, barX + barWidth, labelY);

      // Barra de progresso
      const barY = labelY + 12;
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(barX, barY, barWidth, barH);

      // Partes coloridas da barra
      ctx.fillStyle = axis.color1;
      ctx.fillRect(barX, barY, (barWidth * axis.value1) / 100, barH);
      ctx.fillStyle = axis.color2;
      ctx.fillRect(barX + (barWidth * axis.value1) / 100, barY, (barWidth * axis.value2) / 100, barH);

      // Percentuais
      const percentY = barY + barH + fontSize.percent + 8;
      ctx.font = `bold ${fontSize.percent}px Arial`;

      ctx.fillStyle = axis.color1;
      ctx.textAlign = 'left';
      ctx.fillText(`${axis.value1.toFixed(1)}%`, barX, percentY);

      ctx.fillStyle = axis.color2;
      ctx.textAlign = 'right';
      ctx.fillText(`${axis.value2.toFixed(1)}%`, barX + barWidth, percentY);
    };

    // Função para desenhar card de ideologia
    const drawIdeologyCard = (
      x: number,
      y: number,
      cardW: number,
      cardH: number,
      fontSize: { title: number; name: number; desc: number },
      maxDescLines?: number
    ) => {
      if (!matchedIdeology) return;

      // Gradiente azul
      const gradient = ctx.createLinearGradient(x, y, x, y + cardH);
      gradient.addColorStop(0, '#2563eb');
      gradient.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, cardW, cardH);

      let textY = y + 25;

      // Subtítulo
      ctx.font = `${fontSize.title}px Arial`;
      ctx.fillStyle = '#93c5fd';
      ctx.textAlign = 'center';
      ctx.fillText('Correspondência Mais Próxima:', x + cardW / 2, textY + fontSize.title);

      textY += fontSize.title + 15;

      // Nome da ideologia
      ctx.font = `bold ${fontSize.name}px Arial`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(matchedIdeology.name, x + cardW / 2, textY + fontSize.name * 0.8);

      textY += fontSize.name + 20;

      // Descrição - sem truncamento prematuro
      ctx.font = `${fontSize.desc}px Arial`;
      ctx.fillStyle = '#dbeafe';

      const maxWidth = cardW - 50;
      const lineH = fontSize.desc + 8;
      const availableHeight = cardH - (textY - y) - 25;
      const maxLines = maxDescLines || Math.floor(availableHeight / lineH);

      // Quebrar em linhas usando toda a descrição
  const words = matchedIdeology.desc.split(' ');
  let line = '';
  const allLines: string[] = [];

      for (const word of words) {
        const test = line + word + ' ';
        if (ctx.measureText(test).width > maxWidth && line) {
          allLines.push(line.trim());
          line = word + ' ';
        } else {
          line = test;
        }
      }
      if (line.trim()) {
        allLines.push(line.trim());
      }

      // Desenhar as linhas (até o máximo permitido)
      for (let i = 0; i < Math.min(allLines.length, maxLines); i++) {
        let lineText = allLines[i];
        // Se for a última linha e houver mais texto, adicionar ...
        if (i === maxLines - 1 && allLines.length > maxLines) {
          lineText = lineText.substring(0, lineText.length - 3) + '...';
        }
  ctx.fillText(lineText, x + cardW / 2, textY);
  textY += lineH;
      }
    };

    if (format === 'twitter') {
      // LAYOUT TWITTER - 2x2 grid mais compacto com ideologia à direita
      const footerSpace = 70; // Espaço reservado para footer
      const contentStartY = padding + headerHeight + 20;
      const contentEndY = canvas.height - footerSpace;
      const contentH = contentEndY - contentStartY;

      // Layout: 2 colunas - eixos à esquerda, ideologia à direita
      const leftWidth = (canvas.width - 3 * padding) * 0.6;
      const rightWidth = (canvas.width - 3 * padding) * 0.4;

      // Calcular altura dos cards de eixo para o grid 2x2
      const gridSpacing = 12;
      const cardH = (contentH - gridSpacing) / 2;

      const fontSize = { name: 18, label: 14, percent: 13 };

      // Calcular altura total do grid 2x2 e centralizar verticalmente
      const totalGridH = 2 * cardH + gridSpacing;
      const gridStartY = contentStartY + (contentH - totalGridH) / 2;

      // Cards dos eixos (2x2) - centralizados verticalmente
      axes.forEach((axis, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cardW = (leftWidth - 10) / 2;
        const x = padding + col * (cardW + 10);
        const y = gridStartY + row * (cardH + gridSpacing);
        drawAxisCard(axis, x, y, cardW, cardH, fontSize, 22);
      });

      // Card de ideologia à direita - usa todo o espaço disponível
      const ideologyX = padding + leftWidth + padding;
      drawIdeologyCard(ideologyX, contentStartY, rightWidth, contentH, { title: 14, name: 22, desc: 13 }, 10);

    } else {
      // LAYOUT INSTAGRAM E SQUARE (uma coluna)
      const isInstagram = format === 'instagram';

      const footerH = isInstagram ? 70 : 60;
      const ideologyH = isInstagram ? 300 : 200; // Aumentado para mais linhas de descrição
      const contentStartY = padding + headerHeight + (isInstagram ? 40 : 25);
      const contentEndY = canvas.height - footerH;
      const totalAvailableH = contentEndY - contentStartY;

      const cardSpacing = isInstagram ? 18 : 12;
      const ideologySpacing = isInstagram ? 25 : 15;

      // Calcular altura disponível para os 4 cards de eixo
      const axisAreaH = totalAvailableH - ideologyH - ideologySpacing;
      const cardH = Math.floor((axisAreaH - 3 * cardSpacing) / 4);
      const cardW = canvas.width - 2 * padding;

      const fontSize = {
        name: isInstagram ? 38 : 24,
        label: isInstagram ? 28 : 18,
        percent: isInstagram ? 24 : 16
      };

      // Calcular altura real dos 4 cards + espaçamentos
      const totalAxisH = 4 * cardH + 3 * cardSpacing;

      // Centralizar os cards de eixo verticalmente na área disponível
      const axisStartY = contentStartY + (axisAreaH - totalAxisH) / 2;

      let yPos = axisStartY;
      axes.forEach((axis) => {
        drawAxisCard(axis, padding, yPos, cardW, cardH, fontSize, isInstagram ? 45 : 28);
        yPos += cardH + cardSpacing;
      });

      // Card de ideologia - logo após os eixos
      const ideologyY = contentStartY + axisAreaH + ideologySpacing;
      drawIdeologyCard(
        padding,
        ideologyY,
        cardW,
        ideologyH,
        { title: isInstagram ? 26 : 18, name: isInstagram ? 42 : 28, desc: isInstagram ? 22 : 16 },
        isInstagram ? 5 : 4
      );
    }
    
    // Rodapé com call-to-action - posicionado mais abaixo para não sobrepor o conteúdo
    const footerY = canvas.height - (format === 'instagram' ? 50 : format === 'twitter' ? 25 : 30);
    ctx.fillStyle = '#64748b';
    ctx.font = `${format === 'instagram' ? '28' : format === 'twitter' ? '18' : '24'}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('Faça seu teste em testepolitico8valores.com', canvas.width / 2, footerY);
    
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

  const shareUrl = `https://teste-politico.vercel.app/results?e=${scores?.e || 50}&d=${scores?.d || 50}&g=${scores?.g || 50}&s=${scores?.s || 50}`;

  const shareText = matchedIdeology
    ? `Fiz o Teste Político 8 Valores e minha ideologia mais próxima é: ${matchedIdeology.name}!`
    : `Fiz o Teste Político 8 Valores! Descubra sua ideologia:`;

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
      showToast("Link copiado!", "success");
    } catch {
      showToast("Erro ao copiar link", "error");
    }
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

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleShareTwitter}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-white font-bold">𝕏</span>
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Twitter</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Copiar Link</span>
            </button>
          </div>
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