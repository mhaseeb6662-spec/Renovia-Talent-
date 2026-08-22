# Renovia-Talent-backend-

Node.js, Express, and MongoDB Backend API for the **Renovia Talent** platform.

## Features
- **Enterprise ATS (Applicant Tracking System):** Candidate application ingestion, file uploads (Multer), and deterministic AI resume parsing.
- **Leads CRM:** Contact inquiry management with AI priority classification (`High`, `Medium`, `General`, `Spam`).
- **Dynamic Blog CMS:** Full CRUD for tech articles with 1-click AI generation.
- **Job Vacancy Management:** Live job postings and AI job specification studio.
- **AI Website Assistant:** RAG knowledge conversational assistant.
- **Admin Authentication:** Secure JWT-based RBAC authentication with bcrypt.

## Environment Variables
Create a `.env` file based on `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
```

## Running Locally
```bash
npm install
npm run dev
```
