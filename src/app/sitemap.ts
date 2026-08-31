import { MetadataRoute } from 'next';
import { ideologies, slugify } from '@/lib/data';
import { eixosData } from '@/lib/eixosData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://testepolitico.com.br';

  // Páginas estáticas principais
  const routes = [
    '',
    '/sobre',
    '/metodologia',
    '/dicionario',
    '/eixos',
    '/contato',
    '/instructions',
    '/ideologia',
    '/privacidade',
    '/termos',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Páginas dinâmicas dos 4 eixos
  const eixosRoutes = eixosData.map((axis) => ({
    url: `${baseUrl}/eixos/${axis.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Páginas dinâmicas de ideologias
  const ideologyRoutes = ideologies.map((ideology) => ({
    url: `${baseUrl}/ideologia/${slugify(ideology.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...eixosRoutes, ...ideologyRoutes];
}

