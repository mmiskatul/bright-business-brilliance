# ASFA Design — Sports Apparel & Football Jersey Platform

A complete, production-ready, light-themed customer-facing sportswear and matchday jersey store for **ASFA Design** (Dhaka, Bangladesh).

## 🚀 Tech Stack

- **Frontend**: Next.js 15+ (App Router), TypeScript, TailwindCSS, Sonner, Lucide React
- **Backend**: Fastify 5+, TypeScript, Mongoose ODM, `@fastify/swagger`
- **Database**: MongoDB Atlas (`asfa_design` collection)
- **API Port**: `5000` (`http://localhost:5000`)
- **Frontend Port**: `3000` (`http://localhost:3000`)

---

## 📦 Getting Started

### 1. Install Dependencies

```bash
bun install
# or
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=5000
HOST=0.0.0.0
NEXT_PUBLIC_API_URL=http://localhost:5000/api
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.prftcce.mongodb.net/asfa_design?retryWrites=true&w=majority&appName=Cluster0
```

### 3. Seed Database

```bash
bun run seed
# or
npm run seed
```

### 4. Run Development Server

```bash
bun run dev
# or
npm run dev
```

- Web Application: [http://localhost:3000](http://localhost:3000)
- Fastify Backend API: [http://localhost:5000](http://localhost:5000)
- Swagger OpenAPI Docs: [http://localhost:5000/documentation](http://localhost:5000/documentation)
- Store Admin Portal: [http://localhost:3000/admin](http://localhost:3000/admin)
