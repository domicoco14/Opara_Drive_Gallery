# Ephraim Autos 🚘

> A premium, high-performance auto dealership platform built with Next.js 15, Tailwind CSS, and Supabase.

![Ephraim Autos Showcase](https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2938&ixlib=rb-4.0.3)

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

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ephraim-autos.git
   cd ephraim-autos
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the showroom.

## 📦 Using the Bulk Importer

If you have a local folder containing car images structured by Make and Model, you can automatically upload them to your live database:

```bash
node import-cars.mjs
```
*Note: This script requires admin credentials inside the script to bypass Row Level Security.*

## 🔒 Security

All database modifications (Inserts, Updates, Deletes) are strictly protected by **Row Level Security (RLS)** in Supabase. Only authenticated admin users can modify inventory or upload images to the storage bucket.
