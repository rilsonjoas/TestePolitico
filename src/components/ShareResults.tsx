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
    
    if (format === 'twitter') {
      // LAYOUT TWITTER (2 colunas)
      const colWidth = (canvas.width - 3 * padding) / 2;
      const leftColX = padding;
      const rightColX = padding + colWidth + padding;
      let leftY = padding + headerHeight + 40;
      let rightY = leftY;
      
      // Configurações para Twitter
      const axisNameSize = 20;
      const labelSize = 16;
      const percentSize = 14;
      const barHeight = 25;
      const barWidth = colWidth - 20;
      
      axes.forEach((axis, index) => {
        const isLeft = index % 2 === 0;
        const colX = isLeft ? leftColX : rightColX;
        const barX = colX + 10;
        let yPos = isLeft ? leftY : rightY;
        
        // Card de fundo para cada eixo
        const cardHeight = 100;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 3;
        ctx.fillRect(colX, yPos - 10, colWidth, cardHeight);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(colX, yPos - 10, colWidth, cardHeight);
        
        // Nome do eixo
        ctx.font = `bold ${axisNameSize}px Arial`;
        ctx.fillStyle = '#374151';
        ctx.textAlign = 'center';
        ctx.fillText(axis.name, colX + colWidth / 2, yPos + 10);
        
        yPos += 30;
        
        // Labels
        ctx.font = `600 ${labelSize}px Arial`;
        ctx.textAlign = 'left';
        ctx.fillStyle = axis.color1;
        ctx.fillText(axis.label1, barX, yPos);
        ctx.textAlign = 'right';
        ctx.fillStyle = axis.color2;
        ctx.fillText(axis.label2, barX + barWidth, yPos);
        
        yPos += 20;
        
        // Barra de progresso
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(barX, yPos, barWidth, barHeight);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, yPos, barWidth, barHeight);
        
        // Gradientes
        const leftGradient = ctx.createLinearGradient(barX, yPos, barX, yPos + barHeight);
        leftGradient.addColorStop(0, axis.color1);
        leftGradient.addColorStop(1, axis.color1 + 'CC');
        
        const rightGradient = ctx.createLinearGradient(barX, yPos, barX, yPos + barHeight);
        rightGradient.addColorStop(0, axis.color2);
        rightGradient.addColorStop(1, axis.color2 + 'CC');
        
        // Partes da barra
        ctx.fillStyle = leftGradient;
        ctx.fillRect(barX, yPos, (barWidth * axis.value1) / 100, barHeight);
        ctx.fillStyle = rightGradient;
        ctx.fillRect(barX + (barWidth * axis.value1) / 100, yPos, (barWidth * axis.value2) / 100, barHeight);
        
        yPos += barHeight + 15;
        
        // Percentuais
        ctx.font = `bold ${percentSize}px Arial`;
        const leftPercent = `${axis.value1.toFixed(1)}%`;
        const rightPercent = `${axis.value2.toFixed(1)}%`;
        
        const leftMetrics = ctx.measureText(leftPercent);
        const rightMetrics = ctx.measureText(rightPercent);
        
        ctx.fillStyle = axis.color1;
        ctx.fillRect(barX - 3, yPos - percentSize - 3, leftMetrics.width + 6, percentSize + 6);
        ctx.fillStyle = axis.color2;
        ctx.fillRect(barX + barWidth - rightMetrics.width - 3, yPos - percentSize - 3, rightMetrics.width + 6, percentSize + 6);
        
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText(leftPercent, barX, yPos);
        ctx.textAlign = 'right';
        ctx.fillText(rightPercent, barX + barWidth, yPos);
        
        if (isLeft) {
          leftY = yPos + 30;
        } else {
          rightY = yPos + 30;
        }
      });
      
      // Ideologia no Twitter (embaixo das colunas)
      if (matchedIdeology) {
        const ideologyY = Math.max(leftY, rightY) + 20;
        const ideologyHeight = canvas.height - ideologyY - 60;
        
        if (ideologyHeight > 100) {
          // Card da ideologia
          const ideologyGradient = ctx.createLinearGradient(0, ideologyY, 0, ideologyY + ideologyHeight);
          ideologyGradient.addColorStop(0, '#1e40af');
          ideologyGradient.addColorStop(1, '#1d4ed8');
          ctx.fillStyle = ideologyGradient;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 4;
          ctx.fillRect(padding, ideologyY, canvas.width - 2 * padding, ideologyHeight);
          ctx.shadowBlur = 0;
          
          // Título
          ctx.font = '600 18px Arial';
          ctx.fillStyle = '#e2e8f0';
          ctx.textAlign = 'center';
          ctx.fillText('Correspondência Mais Próxima:', canvas.width / 2, ideologyY + 25);
          
          ctx.font = 'bold 22px Arial';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(matchedIdeology.name, canvas.width / 2, ideologyY + 55);
          
          // Descrição resumida
          if (ideologyHeight > 140) {
            ctx.font = '16px Arial';
            ctx.fillStyle = '#e2e8f0';
            
            const shortDesc = matchedIdeology.desc.substring(0, 180) + '...';
            const words = shortDesc.split(' ');
            const maxWidth = canvas.width - 2 * padding - 40;
            let line = '';
            let descY = ideologyY + 85;
            
            for (const word of words) {
              const testLine = line + word + ' ';
              const metrics = ctx.measureText(testLine);
              if (metrics.width > maxWidth && line !== '') {
                ctx.fillText(line, canvas.width / 2, descY);
                line = word + ' ';
                descY += 20;
                if (descY > ideologyY + ideologyHeight - 30) break;
              } else {
                line = testLine;
              }
            }
            if (descY <= ideologyY + ideologyHeight - 30 && line.trim()) {
              ctx.fillText(line, canvas.width / 2, descY);
            }
          }
        }
      }
      
    } else {
      // LAYOUT INSTAGRAM E SQUARE (uma coluna)
      let yPos = padding + headerHeight + (format === 'instagram' ? 80 : 40);
      
      // Configurações responsivas - otimizadas para caber tudo
      const axisNameSize = format === 'instagram' ? 36 : 26;
      const labelSize = format === 'instagram' ? 28 : 20;
      const percentSize = format === 'instagram' ? 24 : 18;
      const barHeight = format === 'instagram' ? 45 : 32;
      // Reduzindo espaçamento para caber a ideologia no square
      const axisSpacing = format === 'instagram' ? 120 : 85;
      const barWidth = canvas.width - 2 * padding - 80;
      const barX = padding + 40;
      
      axes.forEach((axis) => {
        // Card de fundo para cada eixo
        const cardHeight = axisSpacing - 15;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = format === 'instagram' ? 8 : 6;
        ctx.shadowOffsetY = format === 'instagram' ? 4 : 3;
        ctx.fillRect(padding, yPos - 15, canvas.width - 2 * padding, cardHeight);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = format === 'instagram' ? 2 : 1;
        ctx.strokeRect(padding, yPos - 15, canvas.width - 2 * padding, cardHeight);
        
        // Nome do eixo
        ctx.font = `bold ${axisNameSize}px Arial`;
        ctx.fillStyle = '#374151';
        ctx.textAlign = 'center';
        ctx.fillText(`${axis.name}`, canvas.width / 2, yPos + 10);
        
        yPos += format === 'instagram' ? 45 : 35;
        
        // Labels
        ctx.font = `600 ${labelSize}px Arial`;
        ctx.textAlign = 'left';
        ctx.fillStyle = axis.color1;
        ctx.fillText(axis.label1, barX, yPos);
        ctx.textAlign = 'right';
        ctx.fillStyle = axis.color2;
        ctx.fillText(axis.label2, barX + barWidth, yPos);
        
        yPos += format === 'instagram' ? 35 : 25;
        
        // Barra de progresso
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(barX + 3, yPos + 3, barWidth, barHeight);
        
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(barX, yPos, barWidth, barHeight);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = format === 'instagram' ? 2 : 1;
        ctx.strokeRect(barX, yPos, barWidth, barHeight);
        
        // Gradientes
        const leftGradient = ctx.createLinearGradient(barX, yPos, barX, yPos + barHeight);
        leftGradient.addColorStop(0, axis.color1);
        leftGradient.addColorStop(1, axis.color1 + 'CC');
        
        const rightGradient = ctx.createLinearGradient(barX, yPos, barX, yPos + barHeight);
        rightGradient.addColorStop(0, axis.color2);
        rightGradient.addColorStop(1, axis.color2 + 'CC');
        
        // Partes da barra
        ctx.fillStyle = leftGradient;
        ctx.fillRect(barX, yPos, (barWidth * axis.value1) / 100, barHeight);
        ctx.fillStyle = rightGradient;
        ctx.fillRect(barX + (barWidth * axis.value1) / 100, yPos, (barWidth * axis.value2) / 100, barHeight);
        
        yPos += barHeight + 15;
        
        // Percentuais
        ctx.font = `bold ${percentSize}px Arial`;
        const leftPercent = `${axis.value1.toFixed(1)}%`;
        const rightPercent = `${axis.value2.toFixed(1)}%`;
        
        const leftMetrics = ctx.measureText(leftPercent);
        const rightMetrics = ctx.measureText(rightPercent);
        
        ctx.fillStyle = axis.color1;
        ctx.fillRect(barX - 6, yPos - percentSize - 3, leftMetrics.width + 12, percentSize + 8);
        ctx.fillStyle = axis.color2;
        ctx.fillRect(barX + barWidth - rightMetrics.width - 6, yPos - percentSize - 3, rightMetrics.width + 12, percentSize + 8);
        
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText(leftPercent, barX, yPos);
        ctx.textAlign = 'right';
        ctx.fillText(rightPercent, barX + barWidth, yPos);
        
        yPos += axisSpacing - (format === 'instagram' ? 55 : 45);
      });
      
      // SEMPRE incluir ideologia para Instagram e Square
      if (matchedIdeology) {
        // Calcular espaço restante e ajustar altura do card
        const remainingSpace = canvas.height - yPos - (format === 'instagram' ? 80 : 60);
        const minCardHeight = format === 'instagram' ? 200 : 160;
        const ideologyCardHeight = Math.max(minCardHeight, remainingSpace);
        
        // Se não couber, reduzir fonte e espaçamento
        const fontScale = remainingSpace < minCardHeight ? 0.8 : 1.0;
        
        const ideologyGradient = ctx.createLinearGradient(0, yPos, 0, yPos + ideologyCardHeight);
        ideologyGradient.addColorStop(0, '#1e40af');
        ideologyGradient.addColorStop(1, '#1d4ed8');
        ctx.fillStyle = ideologyGradient;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = format === 'instagram' ? 12 : 8;
        ctx.shadowOffsetY = format === 'instagram' ? 6 : 4;
        ctx.fillRect(padding, yPos, canvas.width - 2 * padding, ideologyCardHeight);
        ctx.shadowBlur = 0;
        
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 3;
        ctx.strokeRect(padding, yPos, canvas.width - 2 * padding, ideologyCardHeight);
        
        yPos += 25;
        
        const ideologyTitleSize = Math.floor((format === 'instagram' ? 32 : 24) * fontScale);
        ctx.font = `600 ${ideologyTitleSize}px Arial`;
        ctx.fillStyle = '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.fillText(`Correspondência Mais Próxima:`, canvas.width / 2, yPos);
        
        yPos += ideologyTitleSize + 10;
        
        ctx.font = `bold ${Math.floor((ideologyTitleSize + 6) * fontScale)}px Arial`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(matchedIdeology.name, canvas.width / 2, yPos);
        
        // Descrição - SEMPRE incluir, mesmo que reduzida
        yPos += 25;
        const descFontSize = Math.floor((format === 'instagram' ? 22 : 18) * fontScale);
        ctx.font = `${descFontSize}px Arial`;
        ctx.fillStyle = '#e2e8f0';
        
        // Ajustar tamanho da descrição baseado no espaço disponível
        const maxDescLength = format === 'instagram' ? 160 : 
                              remainingSpace < minCardHeight ? 80 : 120;
        const shortDesc = matchedIdeology.desc.substring(0, maxDescLength) + 
                          (matchedIdeology.desc.length > maxDescLength ? '...' : '');
        
        const words = shortDesc.split(' ');
        const maxWidth = canvas.width - 2 * padding - 40;
        let line = '';
        const lineHeight = descFontSize + 4;
        const maxLines = Math.floor((canvas.height - yPos - 40) / lineHeight);
        let currentLine = 0;
        
        for (const word of words) {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && line !== '') {
            if (currentLine < maxLines - 1) {
              ctx.fillText(line, canvas.width / 2, yPos);
              line = word + ' ';
              yPos += lineHeight;
              currentLine++;
            } else {
              // Última linha - adicionar ...
              const truncated = line.trim() + '...';
              ctx.fillText(truncated, canvas.width / 2, yPos);
              break;
            }
          } else {
            line = testLine;
          }
        }
        
        // Última linha se sobrar espaço
        if (currentLine < maxLines && line.trim()) {
          ctx.fillText(line, canvas.width / 2, yPos);
        }
      }
    }
    
    // Rodapé com call-to-action
    const footerY = canvas.height - (format === 'instagram' ? 60 : 40);
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

  return (
    <>
      {ToastComponent}
      <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-md mx-auto">
        {/* Seletor de formato */}
        <div className="w-full">
          <p className="text-sm font-medium mb-3 text-center text-gray-700 dark:text-gray-300">
            Escolha o formato ideal:
          </p>
          <div className="flex gap-2 w-full">
            <button
              onClick={() => setSelectedFormat('instagram')}
              className={`flex-1 py-3 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFormat === 'instagram' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Instagram Story
            </button>
            <button
              onClick={() => setSelectedFormat('twitter')}
              className={`flex-1 py-3 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFormat === 'twitter' 
                  ? 'bg-blue-500 text-white shadow-lg scale-105' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Twitter Post
            </button>
            <button
              onClick={() => setSelectedFormat('square')}
              className={`flex-1 py-3 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFormat === 'square' 
                  ? 'bg-green-500 text-white shadow-lg scale-105' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Instagram Feed
            </button>
          </div>
          <div className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
            {
              selectedFormat === 'instagram' ? '9:16 - 1080x1920px - Ideal para Stories' :
              selectedFormat === 'twitter' ? '16:9 - 1200x675px - Ideal para Posts' :
              '1:1 - 1080x1080px - Ideal para Instagram Feed'
            }
          </div>
        </div>
        
        <Button onClick={handleCapture} disabled={loading} className="w-full">
          {loading ? "Gerando Imagem..." : "Gerar Imagem"}
        </Button>

        {error && <span className="text-red-500 text-sm text-center">{error}</span>}

        {imageUrl && (
          <div className="flex flex-col items-center gap-4 mt-4 p-4 border rounded-lg shadow-md w-full">
            <p className="text-center font-semibold">Sua imagem está pronta!</p>
            <div className="max-w-full overflow-hidden rounded-lg border shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Resultados do Teste Político" className="max-w-full h-auto" />
            </div>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              {supportsClipboard 
                ? "Copie a imagem para compartilhar ou faça o download."
                : "Faça o download da imagem para compartilhar."}
            </p>
            <div className="flex gap-3 w-full">
              {supportsClipboard && (
                <Button variant="outline" onClick={handleCopy} className="flex-1">
                  📋 Copiar
                </Button>
              )}
              <Button variant="outline" onClick={handleDownload} className={supportsClipboard ? "flex-1" : "w-full"}>
                💾 Baixar
              </Button>
            </div>
            {!supportsClipboard && (
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Use Chrome, Firefox ou Safari para copiar
              </p>
            )}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              ✨ Otimizado para {selectedFormat === 'instagram' ? 'Stories do Instagram' : selectedFormat === 'twitter' ? 'posts no Twitter' : 'o Feed do Instagram'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}