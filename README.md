# Opara Drive Gallery 🚘

> A premium, high-performance auto dealership platform built with Next.js 15, Tailwind CSS, and Supabase.

![Opara Drive Gallery Showcase](https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2938&ixlib=rb-4.0.3)

Ephraim Autos is a modern, glassmorphism-inspired web application designed for luxury car dealerships. It features a stunning user-facing showroom, an interactive image gallery, and a fully authenticated admin dashboard for seamless inventory management.

## ✨ Features

- **Premium Showroom:** A beautiful, dark-mode glassmorphism UI designed to highlight luxury vehicles.
- **Dynamic Image Galleries:** Buyers can click on any vehicle to explore a high-resolution, interactive image gallery.
- **Secure Admin Dashboard:** A protected `/admin` portal allowing the dealership to add, edit, or remove inventory in real-time.
- **Bulk Import Automation:** Includes a custom Node.js script (`import-cars.mjs`) that instantly parses local folders and securely uploads hundreds of car images to Supabase Storage in seconds.
- **Direct WhatsApp Integration:** 1-click "Order Now" buttons that instantly connect buyers to the dealership via WhatsApp.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router, Server Actions)
- **Styling:** Tailwind CSS (Custom themes, Glassmorphism, Animations)
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage Buckets
- **Authentication:** Supabase Auth (Row Level Security enabled)

## 🛠️ Local Setup

1. **Install Node.js:** Install Node.js 20.9 or newer (LTS recommended), then open a new terminal and check:
   ```bash
   node --version
   npm --version
   ```

2. **Install dependencies** from the repository root:
   ```bash
   npm install
   ```

3. **Create a Supabase project:** In the Supabase dashboard, create a project and copy its Project URL and publishable (anon) key from **Project Settings → API**.

4. **Configure local environment variables:** Create `.env.local` in the repository root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   ```
   For bulk imports, also add the email and password of a Supabase Auth user that has the required database and Storage permissions. Keep these values local; `.env.local` is git-ignored:
   ```env
   SUPABASE_ADMIN_EMAIL=your-admin-email
   SUPABASE_ADMIN_PASSWORD=your-admin-password
   ```

5. **Create the database and image storage:** In Supabase **SQL Editor**, run `schema.sql`. In **Storage**, create a bucket named `cars`. Configure its policies so images can be read publicly and only authorized admins can upload. The SQL file currently grants public read access to the `cars` table only; configure suitable insert/update/delete policies for your admin workflow without granting those operations to the public.

6. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the showroom.
   To check the production build and lint rules, run `npm run build` and `npm run lint`.

7. **Create an admin login:** In Supabase **Authentication → Users**, create the user you want to use for `/admin/login`. Use this user's email/password in the local import variables above if you run the bulk importer.

## 📦 Using the Bulk Importer

After completing the Supabase setup and configuring the importer's admin credentials in `.env.local`, run this from the repository root. The script reads folders under `Ephraim Autos Available Cars` and uploads their images and vehicle records to Supabase:

```bash
node import-cars.mjs
```
The importer uses the signed-in user's normal Supabase permissions; do not add a service-role key to the application or expose one in a `NEXT_PUBLIC_` variable.

## 🔒 Security

All database modifications (Inserts, Updates, Deletes) are strictly protected by **Row Level Security (RLS)** in Supabase. Only authenticated admin users can modify inventory or upload images to the storage bucket.
