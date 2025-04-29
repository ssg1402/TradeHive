# 🛒 E-Commerce Platform

A full-stack, feature-rich e-commerce web application built using **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **Clerk Auth**. 

This project showcases a scalable architecture, modern UI/UX, admin dashboard, product management, and user authentication.

---

## 🚀 Features

- ✅ Dynamic product listings
- 🛍️ Cart & checkout workflow
- 🔐 Authentication with Clerk
- 🎨 Modern UI using Tailwind CSS
- 📦 CMS-style product management (admin)
- 🌐 Cloud image upload (Next-Cloudinary)
- ⚙️ Responsive, accessible & mobile-friendly

---

## 🧑‍💻 Tech Stack

| Frontend        | Backend              | Other Tools          |
|-----------------|----------------------|-----------------------|
| React 19 (or 18)| Next.js API Routes   | Tailwind CSS          |
| TypeScript      | SQL + MySQL + prisma | Clerk Authentication  |
| Next-Cloudinary | AWS (DEPLOY)         | Zustand / Redux (if used) |

---
## 🧑‍💻 Prerequisites
Before running the project, ensure you have the following installed:

Node.js (v16 or later)
npm or yarn
PostgreSQL (or any database supported by Prisma)
Clerk API Key (for authentication)
---
## 🧑‍💻 Getting Started
1. Clone the Repository
  	```bash
  		git clone https://github.com/your-username/e-commerce-platform.git
		cd e-commerce-platform
   
 2. Install Dependencies
	Using npm:
	```bash
  		npm install
 
 3. Set Up Environment Variables
	Create a .env file in the root directory and add the following environment variables:

     Replace username, password, host, port, database, and Clerk keys with your actual credentials.
	```bash
 		DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
		NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
		CLERK_API_KEY=<your-clerk-api-key>
		CLERK_JWT_KEY=<your-clerk-jwt-key>
 
   
5. Set Up Prisma
	Generate the Prisma client and migrate the database:
	```bash
		npx prisma generate
		npx prisma migrate dev --name init

 6. Run the Development Server
	Start the development server:
	```bash
 		npm run dev

   ### The application will be available at http://localhost:3000.
---

## 🧑‍💻 Testing the Project
1. Create a Store
Sign in using the Clerk authentication system.
Navigate to the "Create Store" modal and add a new store.
2. Manage Products
Use the dashboard to add, edit, or delete products for the created store.
3. Test Authentication
Sign out and try accessing the dashboard to ensure redirection to the sign-in page.

---
## 🧑‍💻 Available Scripts
1. Install Dependencies
	```bash
 		npm install
3. Run Development Server
	```bash
 		npm run dev
5. Build for Production
	```bash
 		npm run build
7. Start Production Server
	```bash
 		npm start
9. Run Prisma Studio
	```bash
 		npx prisma studio
---

## 📁 Folder Structure (example)

```bash
e-commerce-platform/
├── app/
│   ├── (auth)/
│   │   ├── (routes)/
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx
│   ├── (dashboard)/
│   │   ├── [storeId]/
│   │   │   ├── layout.tsx
│   │   │   ├── (routes)/
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx
├── components/
│   ├── modals/
│   │   └── store-modal.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── popover.tsx
│   │   └── store-switcher.tsx
├── lib/
│   └── prismadb.ts
├── prisma/
│   └── schema.prisma
├── public/
├── styles/
│   └── globals.css
├── .env
├── package.json
└── README.md
