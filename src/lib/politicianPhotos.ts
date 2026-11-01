import photos from './politician-photos.json';

export interface PoliticianPhoto {
  file: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

const manifest = photos as Record<string, PoliticianPhoto>;

/** Chave do manifesto = título da página pt.wikipedia usado no `link` do político. */
export function wikiTitleFromLink(link: string): string {
  const last = link.split('/').pop() ?? '';
  try {
    return decodeURIComponent(last).replace(/_/g, ' ');
  } catch {
    return last.replace(/_/g, ' ');
  }
}

/** Foto livre (Commons) do político, ou null quando não há uma com licença aceita. */
export function getPoliticianPhoto(link?: string): PoliticianPhoto | null {
  if (!link) return null;
  return manifest[wikiTitleFromLink(link)] ?? null;
}

export function getAllPhotoCredits(): { title: string; photo: PoliticianPhoto }[] {
  return Object.entries(manifest)
    .map(([title, photo]) => ({ title, photo }))
    .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
}
