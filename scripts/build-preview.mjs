// Build the static client-review preview into dist-preview/ and zip it for upload.
//   node scripts/build-preview.mjs
// The browser talks to the live site's Wix form through its public OAuth client id (manual auth),
// so src/wix/config.ts is pointed at it for this build only and restored afterwards.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const CONFIG = join(ROOT, "src/wix/config.ts");
const OUT = join(ROOT, "dist-preview");
const CLIENT_ID = "35640c86-5c69-4af9-b8ef-a55ec388731e";
const PAGES = ["services", "portfolio", "about", "contact", "book-online", "english-privacy-policy",
  "english-terms-conditions", "english-refund-policy", "accessibility-statement"];

const original = readFileSync(CONFIG, "utf8");
const pattern = /export const WIX_CLIENT_ID: string \| null = [^;]+;/;
if (!pattern.test(original)) throw new Error("WIX_CLIENT_ID line not found in src/wix/config.ts");
writeFileSync(CONFIG, original.replace(pattern, `export const WIX_CLIENT_ID: string | null = "${CLIENT_ID}";`));
try {
  execSync("npx astro build --config astro.config.preview.mjs", {
    cwd: ROOT, stdio: "inherit", env: { ...process.env, PUBLIC_PREVIEW: "1" }, shell: true,
  });
} finally {
  writeFileSync(CONFIG, original);
}

// Point internal links at the emitted files: /services → /services.html (anchors kept).
const linkPattern = new RegExp(`href="/(${PAGES.join("|")})(#[^"]*)?"`, "g");
const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
let rewritten = 0;
for (const file of walk(OUT).filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const next = html.replace(linkPattern, (_, page, hash = "") => { rewritten++; return `href="/${page}.html${hash}"`; });
  if (next !== html) writeFileSync(file, next);
}
const files = walk(OUT).map((f) => relative(OUT, f).replace(/\\/g, "/"));
console.log(JSON.stringify({ outDir: OUT, files: files.length, linksRewritten: rewritten, pages: files.filter((f) => f.endsWith(".html")) }));
