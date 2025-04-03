import Head from 'next/head'

interface MetadataProps {
  title: string
  description: string
  keywords: string
  language: 'tr' | 'en' | 'de' | 'ru'
  canonicalUrl: string
  ogImage?: string
}

export default function Metadata({
  title,
  description,
  keywords,
  language,
  canonicalUrl,
  ogImage = '/images/og-image.jpg'
}: MetadataProps) {
  const alternateUrls = {
    tr: 'https://holidaytransfer.com/anasayfa',
    en: 'https://holidaytransfer.com/en',
    de: 'https://holidaytransfer.com/de',
    ru: 'https://holidaytransfer.com/ru'
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical and Language Alternates */}
      <link rel="canonical" href={canonicalUrl} />
      {Object.entries(alternateUrls).map(([lang, url]) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={url}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.en} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : `${language}_${language.toUpperCase()}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language} />
      <meta httpEquiv="content-language" content={language} />
      
      {/* Yandex Meta Tags */}
      <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
      
      {/* Google Meta Tags */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Holiday Transfer",
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Antalya",
              "addressCountry": "TR"
            },
            "priceRange": "$$",
            "telephone": "+90-XXX-XXX-XXXX"
          })
        }}
      />
    </Head>
  )
} 