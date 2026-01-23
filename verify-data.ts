import { ideologies } from './src/lib/data';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

console.log(`Checking ${ideologies.length} ideologies...`);

let errors = 0;
const slugs = new Set();

ideologies.forEach((i, index) => {
  if (!i.name) { console.error(`Error: Ideology at index ${index} missing name`); errors++; }
  if (!i.stats) { console.error(`Error: Ideology ${i.name} missing stats`); errors++; }
  else {
    if (typeof i.stats.econ !== 'number') { console.error(`Error: Ideology ${i.name} missing econ stat`); errors++; }
    if (typeof i.stats.dipl !== 'number') { console.error(`Error: Ideology ${i.name} missing dipl stat`); errors++; }
    if (typeof i.stats.govt !== 'number') { console.error(`Error: Ideology ${i.name} missing govt stat`); errors++; }
    if (typeof i.stats.scty !== 'number') { console.error(`Error: Ideology ${i.name} missing scty stat`); errors++; }
  }
  if (!i.desc) { console.error(`Error: Ideology ${i.name} missing desc`); errors++; }
  if (!i.politicians) { console.error(`Error: Ideology ${i.name} missing politicians`); errors++; }
  if (!i.books) { console.error(`Error: Ideology ${i.name} missing books`); errors++; }

  const slug = slugify(i.name);
  if (slugs.has(slug)) {
    console.error(`Warning: Duplicate slug found: ${slug} for ideology ${i.name}`);
  }
  slugs.add(slug);
});

if (errors === 0) {
  console.log("All ideologies verified successfully!");
} else {
  console.log(`${errors} errors found.`);
}
