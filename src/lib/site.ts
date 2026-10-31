// Content and URL helpers shared by every page.
import data from "../data/site.json";

export const site = data.site;
export const content = data;

export type ImageKey = keyof typeof data.images;

export function image(key: string) {
  const img = (data.images as Record<string, { id: string; w: number; h: number; alt: string }>)[key];
  if (!img) throw new Error(`Unknown image key: ${key}`);
  return img;
}

/** Wix media URL resized server-side; Wix serves AVIF/WebP to browsers that accept them. */
/** `align` picks which part of the photo a crop keeps: "t" keeps the top, so faces stay in frame. */
export function imageUrl(key: string, w: number, h: number, mode: "fill" | "fit" = "fill", align: "c" | "t" = "c"): string {
  const { id } = image(key);
  return `https://static.wixstatic.com/media/${id}/v1/${mode}/w_${w},h_${h},al_${align},q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/${key}.jpg`;
}

/** Height that keeps the photo's own aspect ratio at a given width. */
export function naturalHeight(key: string, w: number): number {
  const img = image(key);
  return Math.round((w * img.h) / img.w);
}

export function whatsappUrl(text: string = site.waGreeting): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function askPriceUrl(packageName: string): string {
  return whatsappUrl(`Hi Menan Makeovers, could you share the price of the ${packageName} package? My wedding date is `);
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
