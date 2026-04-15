import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  jsonLd?: Record<string, unknown>;
}

export default function SeoHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  jsonLd,
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', ogTitle ?? title, 'property');
    setMeta('og:description', ogDescription ?? description, 'property');
    if (ogImage) setMeta('og:image', ogImage, 'property');
    if (ogUrl) setMeta('og:url', ogUrl, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', ogTitle ?? title);
    setMeta('twitter:description', ogDescription ?? description);
    if (ogImage) setMeta('twitter:image', ogImage);

    // JSON-LD
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
      // Restore root page defaults on unmount
      document.title = 'Crossoul – Build Your Ecosystem. Meet Your Tribe.';
      setMeta('description', 'Crossoul is a platform where ideas turn into real-world communities. Express thoughts, refine them, and connect offline.');
      setMeta('og:title', 'Crossoul – Build Your Ecosystem. Meet Your Tribe.', 'property');
      setMeta('og:description', 'Crossoul is a platform where ideas turn into real-world communities. Express thoughts, refine them, and connect offline.', 'property');
      setMeta('og:type', 'website', 'property');
      const ldEl = document.getElementById('seo-json-ld');
      if (ldEl) ldEl.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, jsonLd]);

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
