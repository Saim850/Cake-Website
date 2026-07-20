# 🎂 Cake Shop - Full Stack E-commerce Website

A modern full-stack cake e-commerce application built with **React**, **Django REST Framework**, and **PostgreSQL**. Customers can browse cakes, manage their cart, place orders, and administrators can manage products, categories, and orders.

---

## 🚀 Features

### Customer Features

- User Registration & Login (JWT Authentication)
- Browse Cakes by Category
- Shopping Cart
- Shipping Address Management
- Checkout System
- Cash on Delivery Payment
- Order History
- Responsive Design

### Admin Features

- Admin Dashboard
- Product Management (Create, Update, Delete)
- Category Management
- Order Management
- User Management
- Protected Admin Routes

---

## 🛠 Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- Lucide React Icons
- AOS (Animate On Scroll)

### Backend

- Django
- Django REST Framework
- Djoser
- Simple JWT Authentication

### Database

- PostgreSQL

---

## 📁 Project Structure

```
project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── api/
│   ├── ecommerce/
│   ├── requirements.txt
│   └── manage.py
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Saim850/Cake-Website.git

```

---

## Backend Setup

Create a virtual environment

```bash
python -m venv env
```

Activate it

### Windows

```bash
env\Scripts\activate
```

### Linux / macOS

```bash
source env/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Apply migrations

```bash
python manage.py migrate
```

Create superuser

```bash
python manage.py createsuperuser
```

Run server

```bash
python manage.py runserver
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## Frontend Setup

Go to frontend folder

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

## Environment Variables

Backend `.env`

```env
SECRET_KEY=your_secret_key

DEBUG=True

DATABASE_URL=your_database_url
```

Frontend `.env`

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## API Features

- JWT Authentication
- Products API
- Categories API
- Cart API
- Orders API
- Shipping Address API
- User Profile API

---

## Future Improvements

- Online Payment Integration (SSLCommerz / Stripe)
- Product Reviews
- Wishlist
- Coupon System
- Email Notifications
- Product Ratings
- Order Tracking
- Inventory Management

---

## Author

**Sayeem Ahmed**

GitHub:
https://github.com/Saim850

Project Live Link:
https://sweet-cake-kappa.vercel.app/

---

## License

This project is licensed under the MIT License.
