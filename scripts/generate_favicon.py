#!/usr/bin/env python3
"""
Script para gerar favicon.ico a partir do SVG
Requer: pip install pillow cairosvg
"""

import os
from pathlib import Path

def generate_favicon():
    try:
        import cairosvg
        from PIL import Image
        import io
        
        # Caminhos
        project_root = Path(__file__).parent.parent
        svg_path = project_root / "public" / "favicon.svg"
        output_path = project_root / "public" / "favicon.ico"
        
        # Lê o SVG
        with open(svg_path, 'r') as f:
            svg_content = f.read()
        
        # Converte SVG para PNG em múltiplos tamanhos
        sizes = [16, 32, 48, 64]
        images = []
        
        for size in sizes:
            png_bytes = cairosvg.svg2png(
                bytestring=svg_content.encode(),
                output_width=size,
                output_height=size
            )
            
            img = Image.open(io.BytesIO(png_bytes))
            images.append(img)
        
        # Salva como ICO multi-tamanho
        images[0].save(
            output_path,
            format='ICO',
            sizes=[(img.width, img.height) for img in images],
            append_images=images[1:]
        )
        
        print(f"Favicon gerado com sucesso: {output_path}")
        
        # Gera também PNG individual
        png_path = project_root / "public" / "favicon.png"
        png_bytes = cairosvg.svg2png(
            bytestring=svg_content.encode(),
            output_width=32,
            output_height=32
        )
        
        with open(png_path, 'wb') as f:
            f.write(png_bytes)
        
        print(f"Favicon PNG gerado: {png_path}")
        
    except ImportError:
        print("Bibliotecas necessárias não encontradas.")
        print("Execute: pip install pillow cairosvg")
        
        # Fallback: cria um favicon simples usando apenas PIL
        try:
            from PIL import Image, ImageDraw
            
            # Cria favicon simples com desenho geométrico
            img = Image.new('RGBA', (32, 32), (37, 99, 235, 255))  # Azul
            draw = ImageDraw.Draw(img)
            
            # Desenha um padrão simples representando os 8 valores
            colors = [
                (230, 57, 70),    # Vermelho (Igualdade)
                (29, 53, 87),     # Azul escuro (Mercado)
                (247, 127, 0),    # Laranja (Nação)
                (168, 218, 220),  # Azul claro (Global)
                (131, 56, 236),   # Roxo (Tradição)
                (58, 134, 255),   # Azul (Progresso)
                (255, 195, 0),    # Amarelo (Liberdade)
                (69, 123, 157),   # Azul médio (Autoridade)
            ]
            
            # Desenha 8 segmentos
            for i, color in enumerate(colors):
                angle_start = i * 45
                angle_end = (i + 1) * 45
                draw.pieslice([4, 4, 28, 28], angle_start, angle_end, fill=color)
            
            # Centro branco com círculo
            draw.ellipse([10, 10, 22, 22], fill='white')
            
            # Salva
            output_path = Path(__file__).parent.parent / "public" / "favicon.ico"
            img.save(output_path, format='ICO')
            print(f"Favicon simples gerado: {output_path}")
            
        except ImportError:
            print("PIL também não encontrada. Instale: pip install pillow")
            
    except Exception as e:
        print(f"Erro ao gerar favicon: {e}")

if __name__ == "__main__":
    generate_favicon()