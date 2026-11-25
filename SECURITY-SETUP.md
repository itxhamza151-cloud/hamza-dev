# Security and performance setup — Hamza Dev

## Implemented in this static site
- Native browser form validation remains enabled; required fields and email input types are checked.
- A hidden honeypot field is added to forms as a basic bot deterrent. It is not a substitute for server-side spam filtering.
- Images use asynchronous decoding and lazy loading (the first two images are eager-loaded).
- New-tab links receive `noopener noreferrer`.
- Global JavaScript errors and unhandled promise rejections show a generic recovery message.
- GitHub Pages serves the site over HTTPS when Pages is configured for HTTPS.

## Requires account / backend configuration (not enabled by front-end code)
1. **SSL certificate / HTTPS:** GitHub Pages provisions and renews the certificate. In repository Settings → Pages, use the HTTPS site URL and enable “Enforce HTTPS” when GitHub makes it available. Do not install a self-signed certificate.
2. **reCAPTCHA / spam protection:** Create a reCAPTCHA site key and secret for the production domain. The secret must be verified on a server or trusted serverless function. Never put the secret in JavaScript or commit it to GitHub.
3. **Secure authentication:** Use a backend identity provider (for example, Supabase Auth or Firebase Authentication), enforce authorization server-side, and protect admin routes/data. The current localStorage client portal/admin is a demo and is not secure authentication.
4. **Database backup:** Connect a managed database, enable scheduled automated backups / point-in-time recovery, and test restores. Static GitHub Pages cannot back up a database that does not exist.
5. **Server-side validation and rate limiting:** Validate every submission on the server, normalize inputs, rate-limit by IP/account, and store secrets in deployment environment variables.

## Important limitations
This repository is a static HTML/CSS/JavaScript GitHub Pages site. Client-side validation and a honeypot can be bypassed. Do not collect passwords, payment details, or sensitive client information in localStorage. Real authentication, database storage, verified reCAPTCHA, server-side spam filtering, and automated database backups require a backend service and configuration.

## Image performance recommendations
Use WebP/AVIF versions with correctly sized dimensions, compress large source images, and provide explicit width/height attributes to reduce layout shift. Existing image files are not automatically converted by lazy loading.
