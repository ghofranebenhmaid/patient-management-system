# Patient Management System

A comprehensive full-stack patient management solution built with modern technologies, featuring role-based access control, secure authentication, and a responsive user interface.

## 🚀 Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Role-based access control (RBAC)** with Admin and User roles
- **Protected API endpoints** with proper authorization guards
- **Session management** with automatic token refresh

### 👥 User Management
- **Admin users**: Full CRUD permissions for all resources
- **Regular users**: Read-only access to patient data
- **User registration** and profile management
- **Role-based UI** that adapts to user permissions

### 🏥 Patient Management
- **Complete CRUD operations** for patient records
- **Responsive data tables** with sorting and pagination
- **Form validation** with comprehensive error handling
- **Search and filter** capabilities

### 💻 Frontend Features
- **Modern React/Next.js** application with TypeScript
- **Shadcn/UI components** for consistent design
- **Responsive design** that works on all devices
- **Dark mode support** (coming soon)
- **Form validation** with react-hook-form and Zod

### 🛡️ Backend Features
- **NestJS framework** with TypeScript
- **PostgreSQL database** with TypeORM
- **JWT authentication** strategy
- **Role-based guards** and decorators
- **Input validation** with class-validator
- **CORS configuration** for secure cross-origin requests

## 🏗️ Architecture

```
patient-management/
├── patient-management-backend/     # NestJS Backend API
│   ├── src/
│   │   ├── auth/                  # Authentication module
│   │   ├── patients/              # Patient management module
│   │   ├── users/                 # User management module
│   │   └── main.ts                # Application entry point
│   └── package.json
└── patient-management-frontend/    # Next.js Frontend
    ├── src/
    │   ├── app/                   # Next.js App Router
    │   ├── components/            # React components
    │   ├── contexts/              # React contexts
    │   └── lib/                   # Utilities and API clients
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator, class-transformer
- **Security**: bcryptjs for password hashing

### Frontend
- **Framework**: Next.js 15 with TypeScript
- **UI Library**: Shadcn/UI with Tailwind CSS
- **Forms**: react-hook-form with Zod validation
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- pnpm (recommended) or npm

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd patient-management-backend
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials:
   ```env
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the development server**:
   ```bash
   pnpm run start:dev
   ```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd patient-management-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## 👤 User Roles & Permissions

### Admin User
- ✅ Create, read, update, delete patients
- ✅ Manage user accounts
- ✅ Access all system features
- ✅ View system analytics

### Regular User
- ✅ View patient list (read-only)
- ✅ View patient details
- ❌ Cannot create/edit/delete patients
- ❌ Cannot access admin features

## 🔑 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /users/register` - User registration

### Patients (Protected)
- `GET /patients` - Get all patients (Admin + User)
- `GET /patients/:id` - Get patient by ID (Admin + User)
- `POST /patients` - Create patient (Admin only)
- `PATCH /patients/:id` - Update patient (Admin only)
- `DELETE /patients/:id` - Delete patient (Admin only)

### Users (Protected)
- `GET /users` - Get all users (Admin only)
- `POST /users` - Create user (Admin only)
- `DELETE /users/:id` - Delete user (Admin only)

## 🧪 Testing

### Create Test Users

**Admin User**:
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123",
    "firstName": "Admin",
    "lastName": "User",
    "role": "admin"
  }'
```

**Regular User**:
```bash
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "user123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

## 🚀 Deployment

### Backend Deployment
1. Build the application: `pnpm run build`
2. Set production environment variables
3. Run: `pnpm run start:prod`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or your preferred hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request



## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Next.js](https://nextjs.org/) - React framework for production
- [Shadcn/UI](https://ui.shadcn.com/) - Beautiful UI components
- [TypeORM](https://typeorm.io/) - TypeScript ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

