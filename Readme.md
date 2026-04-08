<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">HELLDESTRUCTION</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> HELLDESTRUCTION is a modern e-commerce platform built with Next.js and Laravel, offering seamless shopping experience with advanced admin panel powered by Filament.
    <br> 
</p>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Admin Panel](#admin-panel)
- [License](#license)

## 🎯 About <a name = "about"></a>

HELLDESTRUCTION is a full-stack e-commerce application with:
- **Modern Frontend** - Next.js 16 with TypeScript and Tailwind CSS 4
- **Robust Backend** - Laravel 11 with REST API and Sanctum authentication
- **Admin Dashboard** - Filament admin panel for managing products, orders, categories, and payments
- **Payment Integration** - Xendit payment gateway integration for secure transactions
- **Real-time Updates** - WebHook support for order status tracking

## ✨ Features <a name = "features"></a>

### Customer Features
- 🛍️ Product browsing with search
- 🛒 Shopping cart management with real-time updates
- 👤 User authentication and profile management
- 📍 Multiple address management
- 💳 Secure payment processing via Xendit
- 📦 Order tracking and history
- 📱 Fully responsive design (mobile, tablet, desktop)

### Admin Features
- 📊 Dashboard with sales analytics
- 🏷️ Product management (CRUD operations)
- 📑 Category and collection management
- 👥 Customer management
- 📦 Order management with status tracking
- 💰 Payment and settlement tracking
- 📈 Sales reports and statistics

## 🛠️ Tech Stack <a name = "tech-stack"></a>

### Frontend
- **Framework**: Next.js 16.1.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.18
- **State Management**: Zustand
- **API Client**: Axios
- **UI Components**: Custom components with Tailwind

### Backend
- **Framework**: Laravel 11
- **Database**: MySQL
- **Authentication**: Laravel Sanctum
- **Admin Panel**: Filament 4
- **Payment Gateway**: Xendit API
- **File Storage**: Laravel Storage

## 📋 Prerequisites <a name = "prerequisites"></a>

- Node.js 18+ (Frontend)
- PHP 8.2+ (Backend)
- MySQL 8.0+ (Database)
- Composer (PHP dependency manager)
- Bun or npm (Node package manager)

## 🚀 Installation <a name = "installation"></a>

### Backend Setup 

```bash
# Navigate to backend directory
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
# DB_DATABASE=helldestruction
# DB_USERNAME=root
# DB_PASSWORD=

# Run migrations
php artisan migrate

# to create admin user or add admin user
php artisan make:user-admin

# Start Laravel development server
php artisan serve
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
bun install
# or: npm install

# Create environment file
cp .env.example .env.local

# Configure environment variables
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
# NEXT_PUBLIC_STORAGE_URL=http://localhost:8000/storage
# NEXT_PUBLIC_APP_ENV=local

# Start development server
bun run dev
# or: npm run dev
```

Access frontend at `http://localhost:3000` and backend API at `http://localhost:8000`

## 📁 Project Structure <a name = "project-structure"></a>

```
Helldestruction/
├── backend/                           # Laravel application
│   ├── app/
│   │   ├── Models/                   # Database models
│   │   ├── Http/Controllers/         # API controllers
│   │   ├── Filament/Resources/       # Admin panel resources
│   │   └── Observers/                # Model observers
│   ├── database/
│   │   ├── migrations/               # Database migrations
│   │   └── seeders/                  # Database seeders
│   ├── routes/
│   │   ├── api.php                   # API routes
│   │   └── web.php                   # Web routes
│   └── ...
│
└── frontend/                          # Next.js application
    ├── src/
    │   ├── app/                      # App router pages
    │   ├── components/               # Reusable components
    │   ├── features/                 # Feature modules
    │   ├── hooks/                    # Custom hooks
    │   ├── stores/                   # Zustand stores
    │   ├── lib/                      # Utilities and helpers
    │   └── styles/                   # Global styles
    ├── public/                       # Static assets
    └── ...
```

## 🔌 API Documentation <a name = "api-documentation"></a>

### Authentication Endpoints
```
GET     /api/dashboard      - User Dashboard
GET     /api/user           - User current user
POST    /api/logout         - Logout User
GET     /cart               - Get All User Cart
POST    /cart/add           - Add Products To Cart User
DELETE  /cart/remove/{id}   - Remove Item In Cart
GET     /address            - Get all address user
POST    /address            - Add New address user
GET     /address/{id}       - Get user address by id
PUT     /address/{id}       - Update User address by id
DELETE  /address/{id}       - Delete user addres by id
POST    /checkout           - Checkout product Cart 
POST    /payment/{orderId}  - Create Payment Xendit
```

### Product Endpoints
```
GET    /api/products           - Get all products
GET    /api/products/{slug}    - Get product detail
GET    /api/products?q         - Search products
GET    /api/category           - Get all category
GET    /api/category/{slug}    - Get category by slug
```

### Order Endpoints
```
GET    /api/orders                      - Get user orders
GET    /api/orders/{external_id}        - Get order detail by external_id
```

### Payment Endpoints
```
POST   /api/payment            - Initiate payment
GET    /api/payment/{id}       - Get payment status
POST   /webhook/xendit         - Xendit webhook handler
```

## 📊 Admin Panel <a name = "admin-panel"></a>

Access Filament admin panel at `/admin` (authenticated users only)

Features:
- Dashboard with KPIs
- Product management with variants
- Order management with status tracking
- Category management
- Payment reconciliation
- User management
- Sales analytics

## 📝 License <a name = "license"></a>

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by <a href="">HELLDESTRUCTION Team</a>
</div>