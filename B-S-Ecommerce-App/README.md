# B&S Ecommerce

B&S Ecommerce is a fully functional e-commerce web application built with **Node.js**, **Express**, **MongoDB**, and **Razorpay** for handling payments. This app allows users to browse products, add them to the cart, make payments via Razorpay (Indian payment gateway), and view their order history.

---

## Features

- **User Authentication**: Users can register, login, and manage their sessions with JWT-based authentication.
- **Product Management**: Manage a collection of products with details such as name, price, and description (Can be extended for admin features).
- **Shopping Cart**: Add products to the cart, view the cart, and proceed to checkout.
- **Razorpay Payment Integration**: Users can complete payments via Razorpay.
- **Order Management**: After payment, the system stores the order details, including status.
  
---

## Tech Stack

- **Frontend**: React.js (To be integrated with the server-side code)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (via Mongoose)
- **Payment Gateway**: Razorpay
- **Authentication**: JSON Web Tokens (JWT)

---

## Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB locally](https://www.mongodb.com/try/download/community) or use a cloud database like MongoDB Atlas.
- **Razorpay Account**: Create a Razorpay account [here](https://razorpay.com/).

---

## Setup Instructions

### 1. Clone the repository

Clone the project to your local machine:

```bash
git clone https://github.com/your-username/bs-ecommerce.git
cd bs-ecommerce

