# 🚀 KKD API Guide for Flutter Developers

Beginner-friendly, clean documentation to help you integrate our Express.js APIs into your Flutter mobile app.

---

## 📖 API Endpoints Overview  

| Method | Endpoint | Description |
|:--------|:-------------------------------------|:----------------|
| `POST`  | `/api/user/signup`                  | User Signup |
| `POST`  | `/api/user/login`                   | User Login |
| `GET`   | `/api/user/get-user`                | Fetch logged-in user's profile |
| `GET`   | `/api/user/get-categories`          | Fetch all categories |

---

## 📌 API Details  

### 🔐 1️⃣ POST Signup API

**Endpoint:**  
`https://kkd-backend-api.onrender.com/api/user/signup`

**Request Body:**
```json
{
  "fullName": "Ravish Bisht",
  "phone": "7060390453",
  "email": "ravishbisht03@gmail.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "userId": "…",
      "fullName": "…",
      "phone": "…",
      "email": "…",
      "coinsEarned": 0
    }
  }
}
```

✅ **No token required**

**Flutter Example:**
```dart
var response = await http.post(
  Uri.parse('https://kkd-backend-api.onrender.com/api/user/signup'),
  body: {
    'fullName': 'Ravish Bisht',
    'phone': '7060390453',
    'email': 'ravishbisht03@gmail.com',
    'password': '123456'
  },
);
```

---

### 🔐 2️⃣ POST Login API

**Endpoint:**  
`https://kkd-backend-api.onrender.com/api/user/login`

**Request Body:**
```json
{
  "identifier": "ravishbisht03@gmail.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN_HERE",
    "user": { ... }
  }
}
```

✅ **No token required**

**Flutter Example:**
```dart
var response = await http.post(
  Uri.parse('https://kkd-backend-api.onrender.com/api/user/login'),
  body: {
    'identifier': 'ravishbisht03@gmail.com',
    'password': '123456'
  },
);
```

---

### 🔐 3️⃣ GET User Profile API

**Endpoint:**  
`https://kkd-backend-api.onrender.com/api/user/get-user`

**Headers:**
```
Authorization: Bearer <token_from_login>
```

**Response:**
```json
{
  "success": true,
  "message": "User profile fetched",
  "data": { ... }
}
```

**Flutter Example:**
```dart
var response = await http.get(
  Uri.parse('https://kkd-backend-api.onrender.com/api/user/get-user'),
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  },
);
```

---

### 🔐 4️⃣ GET Categories API

**Endpoint:**  
`https://kkd-backend-api.onrender.com/api/user/get-categories`

**Headers:**
```
Authorization: Bearer <token_from_login>
```

**Response:**
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    { "categoryName": "…", "categoryImage": "…" },
    …
  ]
}
```

**Flutter Example:**
```dart
var response = await http.get(
  Uri.parse('https://kkd-backend-api.onrender.com/api/user/get-categories'),
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  },
);
```

---

## 🔗 Postman Collection  
👉 [Check APIs on Postman Workspace](https://express-flutter-devs.postman.co/workspace/express-%252B-flutter-devs-Workspac~c8483be6-d1e5-4e20-8cde-5ea1e8a946fe/collection/26812494-b0ca2371-2cab-43e1-9f60-83e84f4fc23f?action=share&source=copy-link&creator=26812494)

---

## 📌 Notes  
- Always store token securely in **Shared Preferences** or **Secure Storage** after login.
- Handle errors and invalid tokens properly.
- You can test APIs directly in Postman using the link above before integrating.
- Base URL for all APIs:  
`https://kkd-backend-api.onrender.com`

---

## 📱 Flutter http Package  
Install http package:
```bash
flutter pub add http
```

---

## 🙌 Made with ❤️ by Ravish
