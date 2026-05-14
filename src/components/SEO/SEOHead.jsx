import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://loopagency.io';
const SITE_NAME = 'Loop — Digital Agency';
const DEFAULT_OG_IMAGE = '/images/og-default.png';

export default function SEOHead({
  title = SITE_NAME,
  description = 'Loop is a premium digital agency specializing in strategy, UI/UX design, web development, mobile apps, cloud architecture, and AI solutions.',
  keywords = 'digital agency, software development, UI/UX design, web development, mobile apps',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonicalUrl = '',
  structuredData = null,
}) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const fullCanonical = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : undefined;

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={`${SITE_URL}${ogImage}`} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${ogImage}`} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
