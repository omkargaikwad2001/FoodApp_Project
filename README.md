🍽️ Food Ordering App
This is a full-stack food ordering application where users can browse and order food, while admins can manage food items through a separate admin panel. The application supports authentication, cart functionality, online payments (test mode), and image uploads.

🚀 Features
User Side:
🔐 User Authentication: Register/Login with JWT-based authentication.

🛍️ Order Food: Browse and add food items to the cart.

🛒 Cart Management: Add, remove, or update cart items before checkout.

💳 Payments: Integrated Razorpay for payments (Test Mode).

📜 Order History: View previous orders.

Admin Panel:
📂 Food Management: Add, update, and remove food items.

📸 AWS S3 Integration: Upload food images to AWS S3.

🔑 Admin Authentication: Secure login for admin panel access.

🛠️ Tech Stack
Backend:
Java + Spring Boot (REST API)

MongoDB (Database)

JWT Authentication

Frontend:
React (Vite for both User & Admin panels)

Tailwind CSS / Bootstrap (Styling)

Other Integrations:
AWS S3 (Image Upload)

Razorpay (Test Payment Mode)

React Router (Navigation)

📂 Project Structure
This project consists of two separate Vite projects:

Frontend (User Panel)

Admin Panel (Separate Vite project)

Backend (Spring Boot API)
