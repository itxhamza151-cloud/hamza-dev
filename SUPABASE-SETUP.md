# Supabase backend setup — Hamza Dev

The repository is hosted as a static site on GitHub Pages. This commit prepares the database schema and security policies, but it does not create a Supabase project or activate live backend features.

## 1. Create your Supabase project
1. Open https://supabase.com/dashboard and create a project.
2. Choose a strong database password and save it privately.
3. In **Project Settings → API**, copy the **Project URL** and **publishable/anon key**.
4. Do not share or commit the database password, service-role key, or secret keys.

## 2. Create the database
1. Open **SQL Editor → New query** in Supabase.
2. Copy and run the complete SQL from `supabase/schema.sql`.
3. Create your account using Supabase Auth (Email provider).
4. In **Authentication → Users**, copy your user UUID.
5. In SQL Editor, run:
   `update public.profiles set role = 'admin' where id = 'YOUR_AUTH_USER_UUID';`
   Replace the placeholder with your own UUID. Do not promote public users.

## 3. Configure backups and authentication
- Review the backup and point-in-time recovery options available for your Supabase plan; enable the schedule/retention you need and test a restore.
- Configure the allowed site URL as `https://itxhamza151-cloud.github.io` and add the exact callback URLs used by the site.
- Enable email confirmation and configure SMTP before using real client accounts.
- Keep Row Level Security enabled on every exposed table. The supplied schema enables RLS and restricts admin records to the admin role.

## 4. Connect the website
Send the **Project URL** and **publishable/anon key only** when ready. These are intended for browser use when RLS is correctly configured. Never send the service-role key or database password.
The next integration step is to replace localStorage demo authentication, client portal data, and admin data with Supabase Auth and database queries. Public forms will be connected to secure insert policies; sensitive validation, rate limiting, and CAPTCHA verification should run in an Edge Function.

## Current status
- Database schema and row-level security policies: prepared in this repository.
- Live Supabase project: not connected yet.
- Secure login, live admin/client portal, persistent orders/messages, CAPTCHA verification, and automated backups: not active until project credentials and deployment configuration are completed.
