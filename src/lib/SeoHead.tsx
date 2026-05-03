import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
}

export default function SeoHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonical,
  jsonLd,
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', ogTitle ?? title, 'property');
    setMeta('og:description', ogDescription ?? description, 'property');
    if (ogImage) setMeta('og:image', ogImage, 'property');
    if (ogUrl) setMeta('og:url', ogUrl, 'property');
    setMeta('og:type', 'profile', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', ogTitle ?? title);
    setMeta('twitter:description', ogDescription ?? description);
    if (ogImage) setMeta('twitter:image', ogImage);
    if (canonical) setCanonical(canonical);

    if (jsonLd) {
      const id = 'seo-json-ld';
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      document.title = 'Crossoul - Build Your Ecosystem. Meet Your Tribe.';
      setMeta('description', 'Crossoul is a platform where ideas turn into real-world communities. Express thoughts, refine them, and connect offline.');
      setMeta('og:title', 'Crossoul - Build Your Ecosystem. Meet Your Tribe.', 'property');
      setMeta('og:description', 'Crossoul is a platform where ideas turn into real-world communities. Express thoughts, refine them, and connect offline.', 'property');
      setMeta('og:type', 'website', 'property');
      setCanonical('https://crossoul.com/');
      const ldEl = document.getElementById('seo-json-ld');
      if (ldEl) ldEl.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, canonical, jsonLd]);

  return null;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}
