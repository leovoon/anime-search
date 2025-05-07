import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  /**
   * Page title (will be appended with app name)
   */
  title: string;
  
  /**
   * Page description for meta tags
   */
  description?: string;
  
  /**
   * Canonical URL for this page
   */
  canonicalUrl?: string;
  
  /**
   * Structured data for rich results (JSON-LD)
   */
  structuredData?: Record<string, any>;
  
  /**
   * Additional meta tags
   */
  meta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

/**
 * Component for managing SEO-related tags in the document head
 */
const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  canonicalUrl,
  structuredData,
  meta = [],
}) => {
  const appName = 'Anime App';
  const fullTitle = `${title} | ${appName}`;
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter meta tags */}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      
      {/* Additional meta tags */}
      {meta.map((tag, index) => (
        <meta
          key={index}
          {...(tag.name && { name: tag.name })}
          {...(tag.property && { property: tag.property })}
          content={tag.content}
        />
      ))}
      
      {/* Structured data for rich results */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;
