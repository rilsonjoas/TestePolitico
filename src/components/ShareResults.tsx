import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "./Toast";
import { Swords, Instagram, Twitter, Link as LinkIcon, Download, Copy, Share2, Check } from "lucide-react";
import { shareEvents } from "@/lib/analytics";

type SocialFormat = 'instagram' | 'twitter' | 'square';

interface ShareResultsProps {
  scores?: { e: number; d: number; g: number; s: number };
  matchedIdeology?: {
    name: string;
    desc: string;
    roast?: string;
    politicians: { name: string }[];
    books: { title: string }[];

  } | null;
  enableComparison?: boolean;
  isRoastActive?: boolean;
}

export function ShareResults({ scores, matchedIdeology, enableComparison = false, isRoastActive = false }: ShareResultsProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supportsClipboard, setSupportsClipboard] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>('instagram');
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

  const shareText = isRoastActive && matchedIdeology?.roast
    ? `💀 Tomei uma sapatada do Teste Político: "${matchedIdeology.roast}" kkkk. Veja o seu!`
    : matchedIdeology
      ? `Descobri que minha ideologia é *${matchedIdeology.name}*! E você, qual será a sua? Faça o teste e descubra!`
      : `Fiz o Teste Político! Você é de esquerda ou direita? Liberal ou conservador? Descubra agora! 🤔`;

  
  // Helper to convert dataURL to File for Web Share API
  const dataUrlToFile = async (dataUrl: string, filename: string): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: 'image/png' });
  };

    const handleSocialShare = async (platform: 'instagram' | 'twitter') => {
    setError(null);
    setLoading(true);
    setSelectedFormat(platform === 'instagram' ? 'instagram' : 'twitter');

    if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
    loadingTimeout.current = setTimeout(() => {
      setLoading(false);
      setError("Tempo excedido ao gerar imagem.");
    }, 12000);

    try {
      // 1. Generate Image silently
      const format = platform === 'instagram' ? 'instagram' : 'twitter';
      const canvas = await createManualCanvas(format);
      const dataUrl = canvas.toDataURL("image/png", 0.95);
      setImageUrl(dataUrl); // Keep it mounted so user can see/download if share fails

      // 2. Try Native Web Share with File
      if (canShare) {
        try {
          const file = await dataUrlToFile(dataUrl, `resultado_${platform}.png`);
          const shareData = {
            title: `Meu resultado no Teste Político: ${matchedIdeology?.name || 'Inconclusivo'}`,
            text: platform === 'twitter' ? `${shareText} ${shareUrl}` : shareText, // Instagram doesn't parse text well, but Twitter does
            files: [file]
          };

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share(shareData);
            shareEvents.share(platform, matchedIdeology?.name || 'unknown');
            showToast("Abrindo opções de compartilhamento!", "success");
            setLoading(false);
            return; // Success!
          }
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
             console.log("Web Share com arquivo falhou, caindo para fallback");
          } else {
             setLoading(false);
             return; // User canceled
          }
        }
      }

      // 3. Fallbacks if native share fails or is not supported
      if (platform === 'twitter') {
         // Open intent URL for Twitter, user will have to manually attach the generated image which is now visible
         shareEvents.share('twitter', matchedIdeology?.name || 'unknown');
         const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
         window.open(twitterUrl, '_blank', 'width=600,height=400');
         showToast("Copie ou baixe a imagem gerada para colar no seu Tweet!", "success");
      } else {
         showToast("Imagem gerada! Baixe ou copie para postar no Instagram.", "success");
      }

    } catch (e) {
      console.error('Erro ao gerar/compartilhar:', e);
      setError("Falha ao preparar o compartilhamento.");
    } finally {
      setLoading(false);
      if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
    }
  };

  const handleShareWhatsApp = () => {
    shareEvents.share('whatsapp', matchedIdeology?.name || 'unknown');
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

    if (!scores) return canvas;

    const axes = [
      { value1: scores.e, value2: 100 - scores.e, label1: 'Igualdade', label2: 'Mercado', color1: '#ef4444', color2: '#22c55e' },
      { value1: scores.d, value2: 100 - scores.d, label1: 'Global', label2: 'Nação', color1: '#06b6d4', color2: '#f97316' },
      { value1: scores.g, value2: 100 - scores.g, label1: 'Liberdade', label2: 'Autoridade', color1: '#eab308', color2: '#3b82f6' },
      { value1: scores.s, value2: 100 - scores.s, label1: 'Progresso', label2: 'Tradição', color1: '#ec4899', color2: '#a855f7' },
    ];

    // ─────────────────────────────────────────────────────────────────
    // PER-FORMAT LAYOUT CONSTANTS
    // All Y coordinates are absolute pixels from the top of the canvas.
    // ─────────────────────────────────────────────────────────────────
    type LayoutConfig = {
      logoSize: number; logoY: number;
      titleFontSize: number; titleY: number;
      titleLine2?: string; titleLine2Y?: number;    // instagram only
      ideologyLabelFontSize: number; ideologyLabelY: number;
      ideologyNameFontSize: number; ideologyNameY: number;
      // Bars
      barStartX: number; maxBarWidth: number;
      barStartY: number; barSpacing: number; barHeight: number;
      barFontSize: number;
      // Compass
      compassX: number; compassY: number; compassSize: number;
      compassLblSize: number;
      footerY: number;
    };

    let L: LayoutConfig;

    if (format === 'twitter') {
      // ── TWITTER 1200 × 675 ─────────────────────────────────────────
      // Compact header above two columns: bars left | compass right.
      const bsX = 60, bsW = 530, bH = 28, bSp = 88;
      const bsY = 272;                              // bar-centre y of 1st bar
      const barTop  = bsY - bH / 2 - 10;           // topmost label pixel ≈ 244
      const barBot  = bsY + 3 * bSp + bH / 2;      // last bar bottom      ≈ 550
      const barMidY = (barTop + barBot) / 2;        // ≈ 397
      const cs = 270;
      const compassAreaX = 620, compassAreaW = 545;
      const cxT = compassAreaX + (compassAreaW - cs) / 2; // ≈ 757
      const cyT = barMidY - cs / 2;                       // ≈ 262, bottom ≈ 532
      L = {
        logoSize: 40, logoY: 18,
        titleFontSize: 26, titleY: 80,           // logo bottom=58 → gap 32px ✓
        ideologyLabelFontSize: 16, ideologyLabelY: 122, // accent line≈108 → gap 14px ✓
        ideologyNameFontSize: 38, ideologyNameY: 162,   // label 122 + ~font height ✓
        barStartX: bsX, maxBarWidth: bsW,
        barStartY: bsY, barSpacing: bSp, barHeight: bH, barFontSize: 14,
        compassX: cxT, compassY: cyT, compassSize: cs, compassLblSize: 12,
        footerY: 652,
      };
    } else if (format === 'square') {
      // ── SQUARE 1080 × 1080 ─────────────────────────────────────────
      // Stacked: header → ideology → bars → compass → footer.
      const bH = 38, bSp = 72, bsW = 920;
      const bsX = (1080 - bsW) / 2;
      const bsY = 390;
      const barBot = bsY + 3 * bSp + bH / 2; // ≈ 625
      const cs = 260;
      const cx = (1080 - cs) / 2;
      const cy = barBot + 60;                  // ≈ 685
      // Libertário label sits at cy+cs+lblSize+6 = 685+260+14+6 = 965
      // footer divider at 1040-50 = 990 → 25 px gap ✓
      L = {
        logoSize: 78, logoY: 48,
        titleFontSize: 38, titleY: 178,
        ideologyLabelFontSize: 22, ideologyLabelY: 252,
        ideologyNameFontSize: 66, ideologyNameY: 318,
        barStartX: bsX, maxBarWidth: bsW,
        barStartY: bsY, barSpacing: bSp, barHeight: bH, barFontSize: 20,
        compassX: cx, compassY: cy, compassSize: cs, compassLblSize: 14,
        footerY: 1040,
      };
    } else {
      // ── INSTAGRAM 1080 × 1920 ──────────────────────────────────────
      // Stacked: header (2-line) → ideology → bars → large compass → footer.
      const bH = 52, bSp = 112, bsW = 920;
      const bsX = (1080 - bsW) / 2;
      const bsY = 478;
      const barBot = bsY + 3 * bSp + bH / 2; // = 478+336+26 = 840
      const cs = 720;
      const cx = (1080 - cs) / 2;
      const cy = barBot + 95;                  // = 935
      // Compass bottom: 935+720=1655, "Libertário" label ≈1672
      // Footer divider at 1825, gap = 153px ✓
      L = {
        logoSize: 80, logoY: 60,
        titleFontSize: 46, titleY: 184,
        titleLine2: '8 Valores', titleLine2Y: 232,
        ideologyLabelFontSize: 25, ideologyLabelY: 306,
        ideologyNameFontSize: 76, ideologyNameY: 392,
        barStartX: bsX, maxBarWidth: bsW,
        barStartY: bsY, barSpacing: bSp, barHeight: bH, barFontSize: 23,
        compassX: cx, compassY: cy, compassSize: cs, compassLblSize: 17,
        footerY: 1875,
      };
    }

    // ─────────────────────────────────────────────────────────────────
    // DRAW LOGO
    // ─────────────────────────────────────────────────────────────────
    try {
      const loadImage = (src: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
          const img = new Image(); img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img); img.onerror = reject; img.src = src;
        });
      const logoImg = await loadImage('/logo.svg');
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 15;
      ctx.drawImage(logoImg, (canvas.width - L.logoSize) / 2, L.logoY, L.logoSize, L.logoSize);
      ctx.shadowBlur = 0;
    } catch { /* logo optional */ }

    // ─────────────────────────────────────────────────────────────────
    // DRAW TITLE
    // ─────────────────────────────────────────────────────────────────
    ctx.textAlign = 'center';
    ctx.fillStyle = textPrimary;
    ctx.font = `900 ${L.titleFontSize}px Arial`;
    if (L.titleLine2) {
      // instagram: two-line title — main line white, subtitle blue
      ctx.fillText('Teste Político', canvas.width / 2, L.titleY);
      ctx.fillStyle = '#3b82f6';
      ctx.font = `700 ${Math.round(L.titleFontSize * 0.85)}px Arial`;
      ctx.fillText(L.titleLine2, canvas.width / 2, L.titleLine2Y!);
    } else {
      ctx.fillText('Teste Político', canvas.width / 2, L.titleY);
    }

    // thin accent line under title (all formats)
    {
      const lineW = format === 'twitter' ? 300 : 400;
      const lineY = L.titleLine2Y ? L.titleLine2Y! + 22 : L.titleY + 18;
      const grad = ctx.createLinearGradient(canvas.width / 2 - lineW / 2, 0, canvas.width / 2 + lineW / 2, 0);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.3, '#3b82f6');
      grad.addColorStop(0.7, '#3b82f6');
      grad.addColorStop(1, 'transparent');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - lineW / 2, lineY);
      ctx.lineTo(canvas.width / 2 + lineW / 2, lineY);
      ctx.stroke();
    }

    // ─────────────────────────────────────────────────────────────────
    // DRAW IDEOLOGY
    // ─────────────────────────────────────────────────────────────────
    if (matchedIdeology) {
      ctx.textAlign = 'center';
      ctx.fillStyle = textSecondary;
      ctx.font = `${L.ideologyLabelFontSize}px Arial`;
      ctx.fillText('Minha ideologia é', canvas.width / 2, L.ideologyLabelY);

      let fontSize = L.ideologyNameFontSize;
      if (matchedIdeology.name.length > 20) fontSize = Math.round(fontSize * 0.78);

      ctx.fillStyle = textPrimary;
      ctx.font = `800 ${fontSize}px Arial`;
      ctx.shadowColor = 'rgba(59,130,246,0.45)';
      ctx.shadowBlur = 18;
      ctx.fillText(matchedIdeology.name, canvas.width / 2, L.ideologyNameY);
      ctx.shadowBlur = 0;
    }

    // ─────────────────────────────────────────────────────────────────
    // DRAW AXIS BARS
    // ─────────────────────────────────────────────────────────────────
    const { barStartX, maxBarWidth, barStartY, barSpacing, barHeight, barFontSize } = L;

    axes.forEach((axis, i) => {
      const centreY = barStartY + i * barSpacing;
      const trackY  = centreY - barHeight / 2;

      // labels
      ctx.font = `600 ${barFontSize}px Arial`;
      ctx.textAlign = 'left';
      ctx.fillStyle = axis.color1;
      ctx.fillText(axis.label1, barStartX, trackY - 10);
      ctx.textAlign = 'right';
      ctx.fillStyle = axis.color2;
      ctx.fillText(axis.label2, barStartX + maxBarWidth, trackY - 10);

      // track background
      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ctx.roundRect(barStartX, trackY, maxBarWidth, barHeight, barHeight / 2);
      ctx.fillStyle = '#334155';
      ctx.fill();

      // left fill
      const w1 = (maxBarWidth * axis.value1) / 100;
      if (w1 > 0) {
        ctx.beginPath();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ctx.roundRect(barStartX, trackY, w1, barHeight, w1 === maxBarWidth ? [barHeight / 2] : [barHeight / 2, 0, 0, barHeight / 2]);
        ctx.fillStyle = axis.color1; ctx.fill();
      }

      // right fill
      const w2 = maxBarWidth - w1;
      if (w2 > 0) {
        ctx.beginPath();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ctx.roundRect(barStartX + w1, trackY, w2, barHeight, w2 === maxBarWidth ? [barHeight / 2] : [0, barHeight / 2, barHeight / 2, 0]);
        ctx.fillStyle = axis.color2; ctx.fill();
      }

      // percentage labels inside bars
      ctx.font = `bold ${barFontSize}px Arial`;
      ctx.fillStyle = '#ffffff';
      if (w1 > 50) {
        ctx.textAlign = 'left';
        ctx.fillText(`${axis.value1.toFixed(1)}%`, barStartX + 12, centreY + barFontSize / 3);
      }
      if (w2 > 50) {
        ctx.textAlign = 'right';
        ctx.fillText(`${axis.value2.toFixed(1)}%`, barStartX + maxBarWidth - 12, centreY + barFontSize / 3);
      }
    });

    // ─────────────────────────────────────────────────────────────────
    // DRAW POLITICAL COMPASS
    // ─────────────────────────────────────────────────────────────────
    {
      const dotNormX = (100 - scores.e) / 100; // left=0 right=1
      const dotNormY = scores.g / 100;          // top=0(auth) bottom=1(lib)

      const { compassX: cx, compassY: cy, compassSize: cs, compassLblSize: lblSize } = L;

      // Clip only the fill/grid — NOT the dot (dot can be at a corner and would be half-cut)
      ctx.save();
      ctx.beginPath();
      ctx.rect(cx, cy, cs, cs);
      ctx.clip();

      // quadrant fills
      for (const [dx, dy, col] of [[0, 0, '#ef4444'], [cs/2, 0, '#3b82f6'], [0, cs/2, '#22c55e'], [cs/2, cs/2, '#eab308']] as [number,number,string][]) {
        ctx.fillStyle = col + '40';
        ctx.fillRect(cx + dx, cy + dy, cs / 2, cs / 2);
      }

      // subtle grid
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      for (let p = 0.1; p < 1; p += 0.1) {
        if (Math.abs(p - 0.5) < 0.01) continue;
        ctx.beginPath(); ctx.moveTo(cx + p * cs, cy); ctx.lineTo(cx + p * cs, cy + cs); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy + p * cs); ctx.lineTo(cx + cs, cy + p * cs); ctx.stroke();
      }

      // Restore clip — draw border, axes, dot OUTSIDE clip so nothing is cut
      ctx.restore();

      // border
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
      ctx.strokeRect(cx, cy, cs, cs);

      // centre axes
      ctx.strokeStyle = 'rgba(226,232,240,0.7)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx + cs / 2, cy); ctx.lineTo(cx + cs / 2, cy + cs); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy + cs / 2); ctx.lineTo(cx + cs, cy + cs / 2); ctx.stroke();

      // user dot (drawn outside clip — always fully visible even at corners)
      const dotX = cx + dotNormX * cs;
      const dotY = cy + dotNormY * cs;
      const dotR = Math.max(9, cs * 0.04);

      const glow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, dotR * 4);
      glow.addColorStop(0, 'rgba(59,130,246,0.65)');
      glow.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(dotX, dotY, dotR * 4, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#3b82f6';
      ctx.beginPath(); ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(dotX, dotY, dotR * 0.45, 0, Math.PI * 2); ctx.fill();

      // axis labels (outside compass, clip is lifted)
      ctx.font = `bold ${lblSize}px Arial`;
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText('Autoritário', cx + cs / 2, cy - 8);
      ctx.fillText('Libertário',  cx + cs / 2, cy + cs + lblSize + 6);

      ctx.save(); ctx.translate(cx - 8, cy + cs / 2); ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center'; ctx.fillText('Esquerda', 0, 0); ctx.restore();

      ctx.save(); ctx.translate(cx + cs + 8, cy + cs / 2); ctx.rotate(Math.PI / 2);
      ctx.textAlign = 'center'; ctx.fillText('Direita', 0, 0); ctx.restore();

      const youLblY = dotNormY > 0.85 ? dotY - dotR - 6 : dotY + dotR + lblSize + 4;
      ctx.fillStyle = '#60a5fa';
      ctx.font = `900 ${lblSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('VOCÊ', dotX, youLblY);
    }

    // ─────────────────────────────────────────────────────────────────
    // FOOTER
    // ─────────────────────────────────────────────────────────────────
    const footerY = L.footerY;
    const isTwitter = format === 'twitter';

    // Linha divisória sutil
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 100, footerY - 50);
    ctx.lineTo(canvas.width / 2 + 100, footerY - 50);
    ctx.stroke();

    ctx.fillStyle = textSecondary;
    ctx.font = `bold ${isTwitter ? 18 : 24}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('testepolitico.com.br', canvas.width / 2, footerY);

    return canvas;
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
    shareEvents.download(selectedFormat);
    showToast(`Imagem ${formatNames[selectedFormat]} baixada!`, "success");
  };

  return (
    <>
      {ToastComponent}
      <div className="w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center justify-center gap-2">
              <Share2 className="text-blue-500" />
              Compartilhe seu resultado
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Poste nas redes ou desafie seus amigos para ver quem combina mais com você!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Instagram Story Button */}
            <button
              onClick={() => handleSocialShare('instagram')}
              disabled={loading}
              className="relative flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 hover:opacity-90 text-white transition-all transform hover:-translate-y-1 shadow-md disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading && selectedFormat === 'instagram' ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              ) : (
                <Instagram className="w-6 h-6" />
              )}
              <span className="font-bold text-lg">Story</span>
            </button>

            {/* Twitter Button */}
            <button
              onClick={() => handleSocialShare('twitter')}
              disabled={loading}
              className="relative flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-900 hover:bg-black text-white transition-all transform hover:-translate-y-1 shadow-md disabled:opacity-70 disabled:hover:translate-y-0"
            >
               {loading && selectedFormat === 'twitter' ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              ) : (
                <Twitter className="w-6 h-6 fill-current" />
              )}
              <span className="font-bold text-lg">Postar no X</span>
            </button>
            
            {/* WhatsApp Button */}
            <button
              onClick={handleShareWhatsApp}
              disabled={loading}
              className="relative flex items-center justify-center gap-3 p-4 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all transform hover:-translate-y-1 shadow-md disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="font-bold text-lg">WhatsApp</span>
            </button>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              disabled={loading}
              className={`relative flex items-center justify-center gap-3 p-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-md disabled:opacity-70 disabled:hover:translate-y-0 ${
                copiedLink 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-2 border-green-500' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {copiedLink ? <Check className="w-6 h-6" /> : <LinkIcon className="w-6 h-6" />}
              <span className="font-bold text-lg">{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
            </button>
          </div>

          {/* Desafiar amigo */}
          {enableComparison && (
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={handleCopyCompareLink}
                className={`w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  copiedCompareLink
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'border-blue-200 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                {copiedCompareLink ? <Check className="w-5 h-5" /> : <Swords className="w-5 h-5" />}
                <span className="font-bold">Desafiar um amigo</span>
              </button>
              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-3">
                Ao clicar aqui, você copia um link especial. Quem responder ao teste por esse link terá os resultados comparados com os seus lado a lado!
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          {/* Fallback Image Viewer (if native share fails but image was generated) */}
          {imageUrl && !loading && (
             <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center mb-4">
                 Sua imagem foi gerada
               </h4>
               <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm mb-4 bg-gray-50 dark:bg-gray-900/50 p-2 flex justify-center">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img
                   src={imageUrl}
                   alt="Resultados do Teste Político"
                   className="max-h-[300px] w-auto rounded-lg shadow-sm"
                 />
               </div>
               
               <div className="flex flex-col sm:flex-row gap-3">
                 {supportsClipboard && (
                   <Button
                     onClick={handleCopy}
                     className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 text-sm"
                   >
                     <Copy className="w-4 h-4 shrink-0" />
                     <span className="truncate">Copiar Imagem</span>
                   </Button>
                 )}
                 <Button
                   onClick={handleDownload}
                   className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 text-sm"
                 >
                   <Download className="w-4 h-4 shrink-0" />
                   <span className="truncate">Baixar Imagem</span>
                 </Button>
               </div>
             </div>
          )}

        </div>
      </div>
    </>
  );
}