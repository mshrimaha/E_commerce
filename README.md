# 🛍️ ShopEase – Modern E-Commerce Web Application

ShopEase is a modern, responsive, and interactive e-commerce web application built using **React, TypeScript, and Vite**.

The project provides a complete frontend shopping experience inspired by the usability of large e-commerce platforms while maintaining its own original ShopEase branding and design.

Users can browse products, search and filter items, add products to their cart or wishlist, complete a demo checkout process, place orders, track deliveries, and submit product reviews.

---

## ✨ Features

### 🏠 Modern Home Page

- Attractive hero section
- Popular categories
- Featured products
- Best deals
- Trending products
- Top-rated products
- New arrivals
- Promotional sections
- Customer testimonials
- Professional footer

---

## 🔍 Smart Product Search

Users can:

- Search products by name
- Search by category
- Search using relevant keywords
- Press **Enter** to search
- Use the search button to view matching products

Examples:

- `dress` → Shows dresses
- `phone` → Shows smartphones
- `shoes` → Shows footwear
- `electronics` → Shows electronic products

---

## 🗂️ Multiple Product Categories

ShopEase includes multiple product categories such as:

- Electronics
- Mobiles
- Laptops
- Fashion
- Women's Fashion
- Men's Fashion
- Shoes
- Beauty
- Accessories
- Home & Kitchen
- Furniture
- Books
- Sports & Fitness
- Grocery
- Toys
- Travel

Each category can be used to browse relevant products.

---

## 🛒 Product Collection

The application includes realistic demo products from different categories.

### Electronics

- Smartphones
- Laptops
- Wireless headphones
- Bluetooth speakers
- Smart watches
- Tablets
- Cameras

### Fashion

- Dresses
- Sarees
- T-shirts
- Shirts
- Jeans
- Jackets
- Handbags
- Shoes

### Home & Living

- Chairs
- Lamps
- Kitchen products
- Home décor

### Beauty

- Skincare products
- Makeup
- Perfumes

### Sports & Fitness

- Running shoes
- Fitness equipment

Each product includes:

- Product image
- Product name
- Category
- Price in Indian Rupees (₹)
- Original price
- Discount information
- Star rating
- Review count
- Add to Cart functionality
- Wishlist functionality

---

## 📦 Product Details

Clicking on a product opens a detailed product page containing:

- Large product image
- Product information
- Price and discount
- Star rating
- Number of reviews
- Product description
- Features and specifications
- Category information
- Quantity selector
- Add to Cart button
- Buy Now button
- Wishlist button
- Delivery information
- Customer reviews

---

## 🎯 Search, Filter & Sort

ShopEase allows users to discover products easily using:

- Product search
- Category filtering
- Price filtering
- Rating filtering
- Sort by price: Low to High
- Sort by price: High to Low
- Sort by popularity
- Sort by rating
- Clear filters option

The product list updates dynamically based on the selected filters.

---

## 🛒 Fully Functional Shopping Cart

Users can:

- Add products to the cart
- Increase product quantity
- Decrease product quantity
- Remove products
- View individual item totals
- View subtotal
- View delivery charges
- View total amount
- Continue shopping
- Proceed to checkout

The cart item count updates dynamically.

Cart data is persisted using **localStorage**, allowing cart information to remain available after refreshing the application.

---

## ❤️ Wishlist

Users can:

- Add products to their wishlist
- Remove products from the wishlist
- View all saved wishlist products
- Move wishlist products directly to the cart

Wishlist data and item counts are persisted using **localStorage**.

---

## 💳 Demo Checkout Experience

ShopEase includes a multi-step checkout experience.

### 1️⃣ Delivery Address

Users can:

- Add their full name
- Enter phone number
- Enter house/street details
- Enter city/area
- Select state
- Enter pincode
- Save addresses
- Edit saved addresses
- Select an address for delivery

### 2️⃣ Delivery Details

Users can view:

- Ordered products
- Delivery information
- Delivery charges
- Order total
- Estimated delivery date

### 3️⃣ Payment Method

The demo includes selectable payment methods:

- Cash on Delivery
- UPI
- Credit Card
- Debit Card

> ⚠️ This is a frontend demonstration project. No real payments are processed, and sensitive payment information is not permanently stored.

---

## ✅ Order Confirmation

After placing an order, the application:

- Generates a demo order ID
- Displays ordered products
- Shows the selected delivery address
- Shows the payment method
- Displays the total amount
- Shows the estimated delivery date
- Saves the order to **My Orders**

Orders are persisted using **localStorage**.

---

## 📋 My Orders

Users can view their previously placed demo orders, including:

- Order ID
- Ordered products
- Order date
- Total amount
- Estimated delivery date
- Payment method
- Order status

Orders can also be viewed in more detail.

---

## 🚚 Delivery Tracking

ShopEase includes a visual order tracking system with stages such as:

1. Order Confirmed
2. Packed
3. Shipped
4. Out for Delivery
5. Delivered

The current delivery stage is displayed using a visual progress tracker.

---

## ⭐ Product Reviews

The product details page includes customer reviews.

Users can:

- Enter their name
- Select a rating from 1 to 5 stars
- Write a review
- Submit the review

Submitted demo reviews appear on the product page and are persisted using **localStorage**.

---

# 📱 Responsive Design

ShopEase is designed to work across different screen sizes:

- 💻 Desktop
- 📱 Mobile phones
- 📱 Tablets

The interface adapts to provide a smooth shopping experience on different devices.

---

# 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **CSS**
- **LocalStorage**

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mshrimaha/E_commerce.git