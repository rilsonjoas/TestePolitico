#!/usr/bin/env python3
"""Baixa a foto principal de cada político (página pt.wikipedia do `link`) e só
guarda as que estão na Wikimedia Commons com licença livre. Grava
public/politicos/<chave>.<ext> e src/lib/politician-photos.json (autor, licença,
fonte), que alimenta o cartão de compartilhamento e a página de créditos.

Uso: python3 scripts/fetch-politician-photos.py names.json
(names.json = [{"name":..., "link":...}], gerado a partir de src/lib/data.ts)
"""
import json, re, sys, time, urllib.parse, urllib.request, html, os

UA = "TestePoliticoPhotoBot/1.0 (https://testepolitico.com.br; rilsonjoas10@gmail.com)"
OK = re.compile(r"^(public domain|cc0|cc[ -]by(-sa)?[ -]\d|pd[- ]|no restrictions|attribution)", re.I)
BAD = re.compile(r"(nc|nd|fair use|non-free|gfdl only)", re.I)
THUMB = 300
# Avisos genéricos da Commons que não são restrição de licença: direitos de imagem
# (retrato de pessoa real) e símbolos comunistas. `nazi`, `terrorism` etc. continuam barrando.
IGNORED_RESTRICTIONS = {"personality", "communist"}

def get(url, binary=False):
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
                return data if binary else json.loads(data)
        except Exception as e:
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"falhou: {url}")

def title_of(link):
    return urllib.parse.unquote(link.rsplit("/", 1)[1]).replace("_", " ")

def key_of(title):
    return re.sub(r"[^A-Za-z0-9._-]+", "-", title.replace(" ", "_")).strip("-")

def api(host, **p):
    return get(f"https://{host}/w/api.php?" + urllib.parse.urlencode({"format": "json", "formatversion": 2, **p}))

people = json.load(open(sys.argv[1]))
titles = {title_of(p["link"]): p["name"] for p in people}
manifest, rejected = {}, {}
os.makedirs("public/politicos", exist_ok=True)

for t, name in titles.items():
    try:
        q = api("pt.wikipedia.org", action="query", prop="pageimages", piprop="name", redirects=1, titles=t)
        page = q["query"]["pages"][0]
        fname = page.get("pageimage")
        if not fname:
            rejected[t] = "sem imagem na página"; continue
        c = api("commons.wikimedia.org", action="query", prop="imageinfo", titles="File:" + fname,
                iiprop="url|extmetadata", iiurlwidth=THUMB)
        cp = c["query"]["pages"][0]
        if cp.get("missing") or "imageinfo" not in cp:
            rejected[t] = f"{fname}: não está na Commons (provável uso justo)"; continue
        ii = cp["imageinfo"][0]; md = ii["extmetadata"]
        lic = md.get("LicenseShortName", {}).get("value", "")
        restr = {r.strip() for r in md.get("Restrictions", {}).get("value", "").split(",") if r.strip()}
        if not OK.search(lic) or BAD.search(lic) or restr - IGNORED_RESTRICTIONS:
            rejected[t] = f"{fname}: licença não aceita ({lic or 'desconhecida'}) {','.join(sorted(restr))}"; continue
        author = html.unescape(re.sub(r"<[^>]+>", "", md.get("Artist", {}).get("value", ""))).strip() or "Autor não informado"
        k = key_of(t)
        ext = os.path.splitext(urllib.parse.urlparse(ii["thumburl"]).path)[1].lower() or ".jpg"
        img = get(ii["thumburl"], binary=True)
        open(f"public/politicos/{k}{ext}", "wb").write(img)
        manifest[t] = {
            "file": f"/politicos/{k}{ext}", "author": author[:160], "license": lic,
            "licenseUrl": md.get("LicenseUrl", {}).get("value", ""), "source": ii["descriptionurl"],
        }
    except Exception as e:
        rejected[t] = f"erro: {e}"
    time.sleep(0.4)

json.dump(manifest, open("src/lib/politician-photos.json", "w"), ensure_ascii=False, indent=1, sort_keys=True)
json.dump(rejected, open("scripts/politician-photos-rejected.json", "w"), ensure_ascii=False, indent=1, sort_keys=True)
print(f"{len(manifest)} aceitas, {len(rejected)} rejeitadas de {len(titles)}")
