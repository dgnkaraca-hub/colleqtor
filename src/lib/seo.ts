import { useEffect } from "react";
import site from "../data/site.json";

export const SITE = site;

interface DocumentMeta {
  /** Page title; rendered as "<title> — colleqtor". Omit for the site default. */
  title?: string;
  description?: string;
  /** Path for canonical / og:url, e.g. "/koleksiyon". */
  path: string;
  /** Absolute or root-relative social image; falls back to the brand symbol. */
  image?: string;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const absolute = (pathOrUrl: string) =>
  pathOrUrl.startsWith("http") ? pathOrUrl : SITE.url + pathOrUrl;

/**
 * Per-route document metadata without a helmet dependency. Updates the tags
 * already present in index.html in place, so crawlers that execute JS and
 * social scrapers reading the SPA both see route-specific values.
 */
export function useDocumentMeta({ title, description, path, image }: DocumentMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
    const desc = description ?? SITE.description;
    const url = absolute(path);
    const img = absolute(image ?? SITE.logoLockup);

    document.title = fullTitle;
    upsertMeta("name", "description", desc);
    upsertCanonical(url);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);

    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
    upsertMeta("name", "twitter:image", img);
  }, [title, description, path, image]);
}

/**
 * Injects a schema.org JSON-LD block for the current route and removes it on
 * unmount, so route changes never leave stale structured data behind.
 */
export function useJsonLd(data: object | null) {
  useEffect(() => {
    if (!data) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify(data);
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, [data ? JSON.stringify(data) : null]);
}
