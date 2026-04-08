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
- [Technical Documentation](#technical-documentation)
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

#link storage
php artisan storage:link

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
- Product management with variants
- Order management with status tracking
- Category management
- Payment reconciliation
- User management

## Technical Documentation <a name="technical-documentation"></a>

### 1. ERD <a name="erd"></a>
<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/kaciqy.png" alt="ERD"></a>
</p>
<p align="center">
  <a href="https://www.drawdb.app/editor?shareId=26e8abf8b17b974f579a8caa3a727342" rel="noopener">Second Link ERD</a>
</p>

### 2. CHECKOUT FLOW && PAYMENT <a name="checkout-flow"></a>

<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/ki6io9.png" alt="home"></a>
</p>
 
Pertama kali user masuk website mereka akan masuk pada halaman home website user bisa
klik svg orang di kanan atas dekat humbergger menu atau casenya user langsung mencari baju

<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/won6ri.png" alt="home"></a>
</p>

klik svg orang di kanan atas dekat humbergger

<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/r9hy9t.png" alt="login"></a>
</p>

setelah di klik user akan masuk kebagian login jika belum meiliki akun maka bisa klik sign up

jika user login maka akan hit api 
- `POST /api/login`



<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/9679qp.png" alt="register"></a>
</p>

disini user bisa mengisi data diri yang dimana membutuhkan Nama Lengkap, Email, Serta password

user melakukan register maka hit api

- `POST /api/register`

**PROCESS**
- validasi email jika email telah terdaftar
- jika email belum terdaftar, maka akan berhasil mendaftar

<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/y1shus.png" alt="dashboard"></a>
</p>

setelah register maka user akan secara otomatis di redirect ke halaman dasboard

- `GET /api/dashboard`
- `GET /api/user`
- `GET /api/address`
- `GET /api/orders`
- `GET /api/cart`


**PROCESS**
- disini tugas  `GET /api/user` akan mengecek apakah valid sessionnya atau tidak
- lalu sistem akan mengambil data dari `GET /api/dashboard` 


<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/d76uvi.png" alt="dashboard"></a>
</p>

disini user bisa klik button add new address untuk menambahkan alamat pengiriman


<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/ivdhnv.png" alt="dashboard"></a>
</p>

disini user bisa mengisi nama penerima dan alamat pengiriman seperti jalan kota negara dan kode pos serta nomor telephone

- `POST /api/address`

**PROCESS**
- disini sistem akan menyimpan data yang telah user isi ke dalam database

<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/rqac1g.png" alt="dashboard"></a>
</p>

maka setelah user berhasil menambahkan alamat, alamat akan muncul pada tab address yang dimana itu akan menjadi alamat default, akan tetapi jika user memiliki alamat lain maka user bisa menambahkan dan bisa memilih alamat tersebut

- `GET /api/address`

**PROCESS**
- mengambil data ulang dikarenakan ada perubahan dari api - `GET /api/address`

<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/k5fvgq.png" alt="products"></a>
</p>

selanjutnya user bisa membeli product dari website kami dengan cara berpindahalaman melalui search atau dengan melakukan klik navbar humbergger lalu memilih product maka akan muncul semua product, user juga tidak bisa mengklik product tersebut jika sudah memiliki tanda sold out

- `GET /api/products`

**PROCESS**
- disini sistem akan mengambil data dari endpoint - `GET /api/products` 
<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/5y5bff.png" alt="products"></a>
</p>

selanjutnya jika user sudah memiliki barang yang ingin mereka beli user bisa pilih size terlebih dahulu dan minimal permbelian yaitu 1

- `GET /api/products{slug}`

**PROCESS**
- disini sistem akan mengambil data dari endpoint tersebut berdasarkan slug

<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/7s9dr9.png" alt="products"></a>
</p>

user menambahkan product ke cart dan melakukan checkout

- `POST /api/cart/add`
- `GET /api/cart`

**PROCESS**
- disini sistem akan melakukan insert pada database pada column cart dan cart_items
- disini sistem akan mengambil data dari endpoint tersebut 

<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/jfskas.png" alt="products"></a>
</p>

setelah user melakukan checkout maka disini kita bisa memilih alamat addres terlebih dahulu jika ingin diganti

- `GET /api/address`

**PROCESS**
- disini sistem akan mengambil data dari endpoint tersebut 
<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/yigt2o.png" alt="products"></a>
</p>

setelah user mengklik button pay now maka disini kita akan di pindahkan pada halaman pembayaran dari xendit itu sendiri

- `POST api/checkout`

**PROCESS**
- disini sistem akan mengambil data dari total price dari column cart dan akan melakukan pembuatan invoice berdasarkan total cart tadi
<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/1soihl.png" alt="products"></a>
</p>

setelah user memilih ingin melakukan pembayaran menggunakan apa dan berhasil maka selanjutnya endpoint dari

- `POST api/xendit/webhook`

**PROCESS**
- disini sistem webhook akan berjalan sesuai dari return data dari xendit, jika ada perubahan maka sistem akan melakukan insert data pada column database

### CASE 2
<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/w2wd1l.png" alt="dashboard"></a>
</p>

disini user juga bisa melakukan pemabayaran pada halaman dashboard pada tab chart & checkout, yang berbeda disini adalah jika user ingin menganti alamat bisa pada tab address sebelumnya yang kita tamabahkan

- `GET api/cart`

**PROCESS**
- disini sistem akan mengambil data dari endpoint tersebut 

<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/9w9rbl.png" alt="products"></a>
</p>

setelah user mengklik button proceed to checkout maka disini kita akan di pindahkan pada halaman pembayaran dari xendit itu sendiri

- `POST api/checkout`

**PROCESS**
- disini sistem akan mengambil data dari total price dari column cart dan akan melakukan pembuatan invoice berdasarkan total cart tadi
<p align="center">
  <a href="" rel="noopener">
 <img  src="https://files.catbox.moe/8et6md.png" alt="products"></a>
</p>

setelah user memilih ingin melakukan pembayaran menggunakan apa dan berhasil maka selanjutnya endpoint dari

- `POST api/xendit/webhook`

**PROCESS**
- disini sistem webhook akan berjalan sesuai dari return data dari xendit, jika ada perubahan maka sistem akan melakukan insert data pada column database













## 📝 License <a name = "license"></a>

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by <a href="">HELLDESTRUCTION Team</a>
</div>