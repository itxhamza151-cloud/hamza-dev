# Hamza Dev — SEO & Google integrations setup

## Already configured in the website
- Page-level SEO descriptions, canonical URLs, robots directives and Open Graph/Twitter sharing metadata.
- XML sitemap: https://itxhamza151-cloud.github.io/hamza-dev/sitemap.xml
- robots.txt points search crawlers to the sitemap.
- WhatsApp click-to-chat uses the existing business chat number.
- Blog listing and search are available at /blog.html. Update the article cards in blog.html to publish/edit static posts.
- Newsletter email link opens a pre-filled email draft. It does not automatically store subscribers or send campaigns.

## Google Analytics
1. Create a GA4 property at https://analytics.google.com/.
2. Copy the Measurement ID (format G-XXXXXXXXXX).
3. Open google-integrations.js and set googleAnalyticsId to that ID.
4. Commit the change and verify visits in the GA4 Realtime report.

## Google Search Console
1. Add the website property at https://search.google.com/search-console/.
2. Choose the HTML tag verification method and copy the content token.
3. Add this inside the <head> of the site's HTML pages: <meta name="google-site-verification" content="YOUR_TOKEN_HERE">.
4. Submit sitemap.xml in Search Console. A domain property may instead require DNS verification.

## Google Reviews
Provide the public Google Business Profile / Google Maps review link (or Place ID) to add a real review button or supported reviews widget. No reviews or ratings are fabricated on the site.

## Newsletter and full blog management
A production newsletter needs a mailing-list provider (for example, a provider account and signup endpoint). A full admin blog editor needs a CMS/backend. The current static website does not have a secure admin panel or database.
