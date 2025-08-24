#!/usr/bin/env python3
"""
Script para gerar favicon.ico com o novo design circular
"""

from PIL import Image, ImageDraw
from pathlib import Path
import math

def generate_favicon():
    try:
        # Caminhos
        project_root = Path(__file__).parent.parent
        output_path = project_root / "public" / "favicon.ico"
        
        # Tamanhos para o favicon
        sizes = [16, 32, 48, 64]
        images = []
        
        # Cores dos 8 valores
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
        
        for size in sizes:
            # Cria imagem com fundo transparente
            img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
            draw = ImageDraw.Draw(img)
            
            center = size // 2
            outer_radius = size // 2 - 1
            inner_radius = max(3, size // 5)
            
            # Fundo circular branco
            draw.ellipse([1, 1, size-1, size-1], fill=(255, 255, 255, 255), outline=(30, 64, 175), width=1)
            
            # Desenha 8 segmentos
            segment_angle = 360 / 8
            for i, color in enumerate(colors):
                start_angle = i * segment_angle - 90  # -90 para começar no topo
                end_angle = start_angle + segment_angle
                
                # Calcula pontos do segmento
                start_rad = math.radians(start_angle)
                end_rad = math.radians(end_angle)
                
                # Pontos do arco externo
                x1 = center + outer_radius * math.cos(start_rad)
                y1 = center + outer_radius * math.sin(start_rad)
                x2 = center + outer_radius * math.cos(end_rad)
                y2 = center + outer_radius * math.sin(end_rad)
                
                # Pontos do arco interno
                x3 = center + inner_radius * math.cos(end_rad)
                y3 = center + inner_radius * math.sin(end_rad)
                x4 = center + inner_radius * math.cos(start_rad)
                y4 = center + inner_radius * math.sin(start_rad)
                
                # Desenha o segmento como polígono
                points = []
                
                # Adiciona pontos do arco externo
                for angle in range(int(start_angle), int(end_angle) + 1):
                    rad = math.radians(angle)
                    x = center + outer_radius * math.cos(rad)
                    y = center + outer_radius * math.sin(rad)
                    points.append((x, y))
                
                # Adiciona pontos do arco interno (reverso)
                for angle in range(int(end_angle), int(start_angle) - 1, -1):
                    rad = math.radians(angle)
                    x = center + inner_radius * math.cos(rad)
                    y = center + inner_radius * math.sin(rad)
                    points.append((x, y))
                
                if points:
                    draw.polygon(points, fill=color)
            
            # Centro azul com número 8
            draw.ellipse([center - inner_radius, center - inner_radius, 
                         center + inner_radius, center + inner_radius], 
                        fill=(37, 99, 235), outline=None)
            
            # Número 8 (apenas em tamanhos maiores)
            if size >= 32:
                font_size = max(6, size // 4)
                try:
                    from PIL import ImageFont
                    # Tenta usar fonte padrão
                    font = ImageFont.load_default()
                except:
                    font = None
                
                # Desenha o "8"
                text = "8"
                if font:
                    bbox = draw.textbbox((0, 0), text, font=font)
                    text_width = bbox[2] - bbox[0]
                    text_height = bbox[3] - bbox[1]
                else:
                    text_width = font_size * 0.6
                    text_height = font_size
                
                text_x = center - text_width // 2
                text_y = center - text_height // 2
                
                draw.text((text_x, text_y), text, fill=(255, 255, 255), font=font)
            
            images.append(img)
        
        # Salva como ICO multi-tamanho
        images[0].save(
            output_path,
            format='ICO',
            sizes=[(img.width, img.height) for img in images],
            append_images=images[1:]
        )
        
        print(f"Favicon atualizado gerado com sucesso: {output_path}")
        
        # Gera também PNG individual para web
        png_path = project_root / "public" / "favicon.png"
        images[1].save(png_path, format='PNG')  # Usa tamanho 32x32
        print(f"Favicon PNG gerado: {png_path}")
        
    except ImportError:
        print("PIL não encontrada. Execute: pip install pillow")
    except Exception as e:
        print(f"Erro ao gerar favicon: {e}")

if __name__ == "__main__":
    generate_favicon()