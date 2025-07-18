# 🚀 KKD API Guide for Flutter Developers

**Complete beginner-friendly documentation** to help you integrate our Express.js APIs into your Flutter mobile app.

---

## 📖 API Endpoints Overview

### 🔐 User Authentication APIs

| Method | Endpoint           | Description       | Auth Required |
| :----- | :----------------- | :---------------- | :------------ |
| `POST` | `/api/user/signup` | User Registration | ❌ No         |
| `POST` | `/api/user/login`  | User Login        | ❌ No         |

### 👤 User Profile APIs

| Method | Endpoint                    | Description         | Auth Required |
| :----- | :-------------------------- | :------------------ | :------------ |
| `GET`  | `/api/user/get-user`        | Get user profile    | ✅ Yes        |
| `PUT`  | `/api/user/update-profile`  | Update user profile | ✅ Yes        |
| `PUT`  | `/api/user/update-password` | Change password     | ✅ Yes        |

### 📄 Document Upload APIs

| Method | Endpoint                    | Description                | Auth Required |
| :----- | :-------------------------- | :------------------------- | :------------ |
| `POST` | `/api/user/upload-pan`      | Upload PAN card photo      | ✅ Yes        |
| `POST` | `/api/user/upload-aadhar`   | Upload Aadhar card photo   | ✅ Yes        |
| `POST` | `/api/user/upload-passbook` | Upload bank passbook photo | ✅ Yes        |

### 📂 Category & Content APIs

| Method | Endpoint                   | Description        | Auth Required |
| :----- | :------------------------- | :----------------- | :------------ |
| `GET`  | `/api/user/get-categories` | Get all categories | ✅ Yes        |
| `GET`  | `/api/user/get-promotions` | Get all promotions | ✅ Yes        |

### 🛍️ Product APIs

| Method | Endpoint                                  | Description                   | Auth Required |
| :----- | :---------------------------------------- | :---------------------------- | :------------ |
| `GET`  | `/api/user/products`                      | Get all active products       | ✅ Yes        |
| `GET`  | `/api/user/products/:productId`           | Get single product details    | ✅ Yes        |
| `GET`  | `/api/user/products/category/:categoryId` | Get products by category      | ✅ Yes        |
| `GET`  | `/api/user/products/featured`             | Get featured/popular products | ✅ Yes        |

### 🎯 QR Code Scanning API

| Method | Endpoint            | Description            | Auth Required |
| :----- | :------------------ | :--------------------- | :------------ |
| `POST` | `/api/user/scan-qr` | Scan QR code for coins | ✅ Yes        |

---

## 🔐 Authentication APIs

### 1️⃣ User Signup - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/signup`  
**📝 Method:** `POST`  
**🔒 Authentication:** Not Required

**📤 Request Body:**

\`\`\`json
{
"fullName": "Ravish Bisht",
"phone": "7060390453",
"email": "ravishbisht03@gmail.com",
"password": "123456"
}
\`\`\`

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "User registered successfully",
"data": {
"user": {
"userId": "ABC123XYZ456",
"fullName": "Ravish Bisht",
"phone": "7060390453",
"email": "ravishbisht03@gmail.com",
"coinsEarned": 0
}
}
}
\`\`\`

**❌ Error Response:**

\`\`\`json
{
"success": false,
"message": "Email or Phone already registered"
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Map<String, dynamic>> signupUser({
required String fullName,
required String phone,
required String email,
required String password,
}) async {
try {
final response = await http.post(
Uri.parse('https://kkd-backend-api.onrender.com/api/user/signup'),
headers: {
'Content-Type': 'application/json',
},
body: jsonEncode({
'fullName': fullName,
'phone': phone,
'email': email,
'password': password,
}),
);

    final data = jsonDecode(response.body);

    if (response.statusCode == 201) {
      print('✅ Signup successful: ${data['message']}');
      return data;
    } else {
      print('❌ Signup failed: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}

// Usage Example:
void handleSignup() async {
final result = await signupUser(
fullName: 'John Doe',
phone: '9876543210',
email: 'john@example.com',
password: 'securepass123',
);

if (result['success']) {
// Navigate to login or home screen
print('User registered successfully!');
} else {
// Show error message to user
print('Registration failed: ${result['message']}');
}
}
\`\`\`

---

### 2️⃣ User Login - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/login`  
**📝 Method:** `POST`  
**🔒 Authentication:** Not Required

**📤 Request Body:**

\`\`\`json
{
"identifier": "ravishbisht03@gmail.com",
"password": "123456"
}
\`\`\`

> **💡 Note:** `identifier` can be either email or phone number

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "Login successful",
"data": {
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"user": {
"userId": "ABC123XYZ456",
"fullName": "Ravish Bisht",
"email": "ravishbisht03@gmail.com",
"phone": "7060390453",
"coinsEarned": 0,
"profilePick": "",
"dob": "",
"address": "",
"pinCode": "",
"state": "",
"country": "",
"accountNumber": "",
"accountHolderName": "",
"bankName": "",
"ifscCode": "",
"panPhoto": "",
"panVerificationStatus": "incomplete",
"panRejectionReason": "",
"aadharPhoto": "",
"aadharVerificationStatus": "incomplete",
"aadharRejectionReason": "",
"passbookPhoto": "",
"passbookVerificationStatus": "incomplete",
"passbookRejectionReason": "",
"kycStatus": "incomplete",
"kycRequestDate": null,
"kycApprovalDate": null,
"kycRejectionReason": "",
"isProfileComplete": false,
"productsQrScanned": [],
"scanHistory": [],
"createdAt": "2023-07-01T10:30:00.000Z",
"updatedAt": "2023-07-01T10:30:00.000Z"
}
}
}
\`\`\`

**❌ Error Response:**

\`\`\`json
{
"success": false,
"message": "Invalid credentials"
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

Future<Map<String, dynamic>> loginUser({
required String identifier, // email or phone
required String password,
}) async {
try {
final response = await http.post(
Uri.parse('https://kkd-backend-api.onrender.com/api/user/login'),
headers: {
'Content-Type': 'application/json',
},
body: jsonEncode({
'identifier': identifier,
'password': password,
}),
);

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      // Save token securely
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('auth_token', data['data']['token']);

      print('✅ Login successful!');
      return data;
    } else {
      print('❌ Login failed: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}

// Usage Example:
void handleLogin() async {
final result = await loginUser(
identifier: 'user@example.com', // or phone number
password: 'userpassword123',
);

if (result['success']) {
// Navigate to home screen
print('Welcome ${result['data']['user']['fullName']}!');
} else {
// Show error message
print('Login failed: ${result['message']}');
}
}
\`\`\`

---

## 👤 User Profile APIs

### 3️⃣ Get User Profile - `GET` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/get-user`  
**📝 Method:** `GET`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json
\`\`\`

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "User profile fetched",
"data": {
"userId": "ABC123XYZ456",
"fullName": "Ravish Bisht",
"email": "ravishbisht03@gmail.com",
"phone": "7060390453",
"profilePick": "https://cloudinary-url...",
"coinsEarned": 150,
"dob": "1995-01-15",
"address": "123 Main Street",
"pinCode": "110001",
"state": "Delhi",
"country": "India",
"accountNumber": "1234567890",
"accountHolderName": "Ravish Bisht",
"bankName": "State Bank of India",
"ifscCode": "SBIN0001234",

    // 🚀 Status-based verification system
    "panPhoto": "https://cloudinary-url...",
    "panVerificationStatus": "verified",
    "panRejectionReason": "",

    "aadharPhoto": "https://cloudinary-url...",
    "aadharVerificationStatus": "processing",
    "aadharRejectionReason": "",

    "passbookPhoto": "https://cloudinary-url...",
    "passbookVerificationStatus": "rejected",
    "passbookRejectionReason": "Document is not clear, please upload a clearer image",

    // 🚀 KYC Request System
    "kycStatus": "pending",
    "kycRequestDate": "2023-07-15T10:30:00.000Z",
    "kycApprovalDate": null,
    "kycRejectionReason": "",
    "isProfileComplete": true,

    // 🚀 Enhanced scan tracking
    "productsQrScanned": ["PROD_ABC123", "PROD_XYZ789"],
    "scanHistory": [
      {
        "productId": "PROD_ABC123",
        "productName": "iPhone 15 Pro",
        "categoryName": "Electronics",
        "coinsEarned": 50,
        "scannedAt": "2023-07-15T14:30:00.000Z"
      }
    ],
    "createdAt": "2023-07-01T10:30:00.000Z",
    "updatedAt": "2023-07-15T14:20:00.000Z"

}
}
\`\`\`

**🔍 Verification Status Values:**

- `"incomplete"` - Document not uploaded yet
- `"processing"` - Document uploaded, under review
- `"verified"` - Document approved by admin
- `"rejected"` - Document rejected (check rejectionReason)

**🔍 KYC Status Values:**

- `"incomplete"` - Profile or documents not complete
- `"pending"` - KYC request submitted, awaiting admin review
- `"approved"` - KYC approved by admin
- `"rejected"` - KYC rejected (check kycRejectionReason)

**❌ Error Response:**

\`\`\`json
{
"success": false,
"message": "Invalid or expired token"
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> getUserProfile() async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found. Please login again.'};
    }

    final response = await http.get(
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/get-user'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Profile fetched successfully');
      return data;
    } else {
      print('❌ Failed to get profile: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}

// 🚀 Helper functions for status checking
String getVerificationStatusText(String status) {
switch (status) {
case 'verified':
return '✅ Verified';
case 'processing':
return '⏳ Under Review';
case 'rejected':
return '❌ Rejected';
case 'incomplete':
default:
return '📋 Not Uploaded';
}
}

String getKYCStatusText(String status) {
switch (status) {
case 'approved':
return '✅ KYC Approved';
case 'pending':
return '⏳ KYC Pending';
case 'rejected':
return '❌ KYC Rejected';
case 'incomplete':
default:
return '📋 KYC Incomplete';
}
}

// Usage Example:
void loadUserProfile() async {
final result = await getUserProfile();

if (result['success']) {
final user = result['data'];
print('User: ${user['fullName']}');
print('Coins: ${user['coinsEarned']}');

    // Check verification statuses
    print('PAN Status: ${getVerificationStatusText(user['panVerificationStatus'])}');
    print('Aadhar Status: ${getVerificationStatusText(user['aadharVerificationStatus'])}');
    print('Passbook Status: ${getVerificationStatusText(user['passbookVerificationStatus'])}');
    print('KYC Status: ${getKYCStatusText(user['kycStatus'])}');

    // Check scan history
    List scanHistory = user['scanHistory'] ?? [];
    print('Total Scans: ${scanHistory.length}');

    for (var scan in scanHistory) {
      print('Scanned: ${scan['productName']} - ${scan['coinsEarned']} coins');
    }

} else {
print('Error: ${result['message']}');
}
}
\`\`\`

---

### 4️⃣ Update User Profile - `PUT` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/update-profile`  
**📝 Method:** `PUT`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json (for JSON data)
Content-Type: multipart/form-data (for file upload)
\`\`\`

**📝 Updatable Fields:**

- `fullName` - User's full name
- `dob` - Date of birth (YYYY-MM-DD format)
- `address` - Full address
- `pinCode` - 6-digit PIN code
- `state` - State name
- `country` - Country name
- `accountNumber` - Bank account number
- `accountHolderName` - Account holder name
- `bankName` - Bank name
- `ifscCode` - Bank IFSC code
- `profilePick` - Profile image (file upload)

**🚫 Protected Fields (Cannot be updated):**

- `userId`, `email`, `phone`, `password`, `coinsEarned`
- `panPhoto`, `aadharPhoto`, `passbookPhoto` (use separate upload endpoints)
- All verification status fields and KYC fields
- `productsQrScanned`, `scanHistory` (managed by QR scanning system)

#### Option A: JSON Update (Text fields only)

**📤 Request Body:**

\`\`\`json
{
"fullName": "Updated Name",
"dob": "1995-01-15",
"address": "New Address Line",
"pinCode": "110001",
"state": "Delhi",
"country": "India",
"accountNumber": "9876543210",
"accountHolderName": "Updated Name",
"bankName": "HDFC Bank",
"ifscCode": "HDFC0001234"
}
\`\`\`

**✅ Success Response (with KYC Auto-trigger):**

\`\`\`json
{
"success": true,
"message": "Profile updated successfully! KYC verification request has been submitted.",
"data": {
"userId": "ABC123XYZ456",
"fullName": "Updated Name",
"kycStatus": "pending",
"kycRequestDate": "2023-07-15T14:30:00.000Z",
"isProfileComplete": true
},
"kycRequestCreated": true
}
\`\`\`

**✅ Success Response (without KYC trigger):**

\`\`\`json
{
"success": true,
"message": "Profile updated successfully",
"data": {
// Updated user object
},
"kycRequestCreated": false
}
\`\`\`

**📱 Flutter Example (JSON Update):**

\`\`\`dart
Future<Map<String, dynamic>> updateProfile({
String? fullName,
String? dob,
String? address,
String? pinCode,
String? state,
String? country,
String? accountNumber,
String? accountHolderName,
String? bankName,
String? ifscCode,
}) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    // Create update data (only include non-null values)
    Map<String, dynamic> updateData = {};
    if (fullName != null) updateData['fullName'] = fullName;
    if (dob != null) updateData['dob'] = dob;
    if (address != null) updateData['address'] = address;
    if (pinCode != null) updateData['pinCode'] = pinCode;
    if (state != null) updateData['state'] = state;
    if (country != null) updateData['country'] = country;
    if (accountNumber != null) updateData['accountNumber'] = accountNumber;
    if (accountHolderName != null) updateData['accountHolderName'] = accountHolderName;
    if (bankName != null) updateData['bankName'] = bankName;
    if (ifscCode != null) updateData['ifscCode'] = ifscCode;

    final response = await http.put(
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/update-profile'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(updateData),
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Profile updated successfully!');

      // Check if KYC request was created
      if (data['kycRequestCreated'] == true) {
        print('🎉 KYC verification request submitted automatically!');
        print('Your profile is now complete and under review.');
      }

      return data;
    } else {
      print('❌ Update failed: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}
\`\`\`

#### Option B: Multipart Update (With Profile Image)

**📤 Form Data:**

- Text fields: `fullName`, `dob`, `address`, etc.
- File field: `profilePick` (Image file - Max 5MB)

**📱 Flutter Example (With Profile Image):**

\`\`\`dart
import 'package:image_picker/image_picker.dart';
import 'dart:io';

Future<Map<String, dynamic>> updateProfileWithImage({
String? fullName,
String? dob,
String? address,
File? profileImage,
}) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    var request = http.MultipartRequest(
      'PUT',
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/update-profile'),
    );

    // Add headers
    request.headers['Authorization'] = 'Bearer $token';

    // Add text fields
    if (fullName != null) request.fields['fullName'] = fullName;
    if (dob != null) request.fields['dob'] = dob;
    if (address != null) request.fields['address'] = address;

    // Add image file if provided
    if (profileImage != null) {
      request.files.add(
        await http.MultipartFile.fromPath('profilePick', profileImage.path),
      );
    }

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Profile updated with image!');

      // Check if KYC request was created
      if (data['kycRequestCreated'] == true) {
        print('🎉 KYC verification request submitted automatically!');
      }

      return data;
    } else {
      print('❌ Update failed: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}
\`\`\`

---

### 5️⃣ Update Password - `PUT` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/update-password`  
**📝 Method:** `PUT`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json
\`\`\`

**📤 Request Body:**

\`\`\`json
{
"currentPassword": "oldpassword123",
"newPassword": "newpassword456"
}
\`\`\`

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "Password updated successfully"
}
\`\`\`

**❌ Error Response:**

\`\`\`json
{
"success": false,
"message": "Current password is incorrect"
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> updatePassword({
required String currentPassword,
required String newPassword,
}) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    // Validate new password
    if (newPassword.length < 6) {
      return {'success': false, 'message': 'New password must be at least 6 characters'};
    }

    final response = await http.put(
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/update-password'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'currentPassword': currentPassword,
        'newPassword': newPassword,
      }),
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Password updated successfully!');
      return data;
    } else {
      print('❌ Password update failed: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}
\`\`\`

---

## 📄 Document Upload APIs

### 6️⃣ Upload PAN Card Photo - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/upload-pan`  
**📝 Method:** `POST`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data
\`\`\`

**📤 Form Data:**

- `panPhoto`: Image file (JPG, PNG, PDF - Max 10MB)

**✅ Success Response (with KYC Auto-trigger):**

\`\`\`json
{
"success": true,
"message": "PAN photo uploaded successfully. KYC verification request has been submitted.",
"data": {
"panPhoto": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/documents/pan/abc123.jpg",
"panVerificationStatus": "processing",
"kycStatus": "pending"
},
"kycRequestCreated": true
}
\`\`\`

**✅ Success Response (without KYC trigger):**

\`\`\`json
{
"success": true,
"message": "PAN photo uploaded successfully. Verification in progress.",
"data": {
"panPhoto": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/documents/pan/abc123.jpg",
"panVerificationStatus": "processing",
"kycStatus": "incomplete"
},
"kycRequestCreated": false
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> uploadPanPhoto(File panImage) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    var request = http.MultipartRequest(
      'POST',
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/upload-pan'),
    );

    request.headers['Authorization'] = 'Bearer $token';
    request.files.add(
      await http.MultipartFile.fromPath('panPhoto', panImage.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ PAN photo uploaded successfully!');

      // Check if KYC request was created
      if (data['kycRequestCreated'] == true) {
        print('🎉 KYC verification request submitted automatically!');
        print('All your documents are now under review.');
      }

      return data;
    } else {
      print('❌ PAN upload failed: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}
\`\`\`

---

### 7️⃣ Upload Aadhar Card Photo - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/upload-aadhar`  
**📝 Method:** `POST`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data
\`\`\`

**📤 Form Data:**

- `aadharPhoto`: Image file (JPG, PNG, PDF - Max 10MB)

**✅ Success Response (with KYC Auto-trigger):**

\`\`\`json
{
"success": true,
"message": "Aadhar photo uploaded successfully. KYC verification request has been submitted.",
"data": {
"aadharPhoto": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/documents/aadhar/xyz789.jpg",
"aadharVerificationStatus": "processing",
"kycStatus": "pending"
},
"kycRequestCreated": true
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> uploadAadharPhoto(File aadharImage) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    var request = http.MultipartRequest(
      'POST',
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/upload-aadhar'),
    );

    request.headers['Authorization'] = 'Bearer $token';
    request.files.add(
      await http.MultipartFile.fromPath('aadharPhoto', aadharImage.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Aadhar photo uploaded successfully!');

      // Check if KYC request was created
      if (data['kycRequestCreated'] == true) {
        print('🎉 KYC verification request submitted automatically!');
      }

      return data;
    } else {
      print('❌ Aadhar upload failed: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}
\`\`\`

---

### 8️⃣ Upload Bank Passbook Photo - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/upload-passbook`  
**📝 Method:** `POST`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data
\`\`\`

**📤 Form Data:**

- `passbookPhoto`: Image file (JPG, PNG, PDF - Max 10MB)

**✅ Success Response (with KYC Auto-trigger):**

\`\`\`json
{
"success": true,
"message": "Passbook photo uploaded successfully. KYC verification request has been submitted.",
"data": {
"passbookPhoto": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/documents/passbook/def456.jpg",
"passbookVerificationStatus": "processing",
"kycStatus": "pending"
},
"kycRequestCreated": true
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> uploadPassbookPhoto(File passbookImage) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    var request = http.MultipartRequest(
      'POST',
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/upload-passbook'),
    );

    request.headers['Authorization'] = 'Bearer $token';
    request.files.add(
      await http.MultipartFile.fromPath('passbookPhoto', passbookImage.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Passbook photo uploaded successfully!');

      // Check if KYC request was created
      if (data['kycRequestCreated'] == true) {
        print('🎉 KYC verification request submitted automatically!');
      }

      return data;
    } else {
      print('❌ Passbook upload failed: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}
\`\`\`

**💡 Document Upload Tips:**

- **File Size**: Keep documents under 10MB for faster upload
- **File Format**: JPG/PNG for images, PDF for scanned documents
- **Image Quality**: Ensure documents are clear and readable
- **Auto KYC**: When profile is complete and all documents are uploaded, KYC request is automatically created
- **Status Tracking**: Use the verification status to show progress to users

---

## 📂 Category & Content APIs

### 9️⃣ Get All Categories - `GET` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/get-categories`  
**📝 Method:** `GET`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json
\`\`\`

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "Categories fetched successfully",
"data": [
{
"_id": "64a1b2c3d4e5f6789012345",
"categoryName": "Electronics",
"categoryImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/electronics.jpg",
"createdAt": "2023-07-01T10:30:00.000Z",
"updatedAt": "2023-07-01T10:30:00.000Z"
},
{
"_id": "64a1b2c3d4e5f6789012346",
"categoryName": "Fashion",
"categoryImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/fashion.jpg",
"createdAt": "2023-07-01T11:00:00.000Z",
"updatedAt": "2023-07-01T11:00:00.000Z"
},
{
"_id": "64a1b2c3d4e5f6789012347",
"categoryName": "Home & Garden",
"categoryImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/home-garden.jpg",
"createdAt": "2023-07-01T11:30:00.000Z",
"updatedAt": "2023-07-01T11:30:00.000Z"
}
]
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> getCategories() async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    final response = await http.get(
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/get-categories'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Categories fetched successfully');
      return data;
    } else {
      print('❌ Failed to get categories: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}
\`\`\`

---

### 🔟 Get All Promotions - `GET` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/get-promotions`  
**📝 Method:** `GET`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json
\`\`\`

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "Promotions fetched successfully",
"data": [
{
"_id": "64a1b2c3d4e5f6789012348",
"promotionName": "Summer Sale",
"promotionImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/promotions/summer-sale.jpg",
"createdAt": "2023-07-01T12:00:00.000Z"
},
{
"_id": "64a1b2c3d4e5f6789012349",
"promotionName": "Black Friday",
"promotionImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/promotions/black-friday.jpg",
"createdAt": "2023-07-01T12:30:00.000Z"
}
]
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> getPromotions() async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    final response = await http.get(
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/get-promotions'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Promotions fetched successfully');
      return data;
    } else {
      print('❌ Failed to get promotions: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}
\`\`\`

---

## 🛍️ Product APIs

### 1️⃣1️⃣ Get All Active Products - `GET` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/products`  
**📝 Method:** `GET`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json
\`\`\`

**📤 Query Parameters (Optional):**

- `category` - Filter by category ID
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by product name or description

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "Products fetched successfully",
"data": [
{
"_id": "64a1b2c3d4e5f6789012350",
"productId": "PROD_ABC123XYZ456",
"productName": "iPhone 15 Pro",
"productDescription": "Latest iPhone with advanced features",
"productImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/products/iphone15.jpg",
"category": {
"_id": "64a1b2c3d4e5f6789012345",
"categoryName": "Electronics",
"categoryImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/electronics.jpg"
},
"coinReward": 50,
"createdAt": "2023-07-01T13:00:00.000Z"
},
{
"_id": "64a1b2c3d4e5f6789012351",
"productId": "PROD_DEF789GHI012",
"productName": "Samsung Galaxy S24",
"productDescription": "Premium Android smartphone",
"productImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/products/galaxy-s24.jpg",
"category": {
"_id": "64a1b2c3d4e5f6789012345",
"categoryName": "Electronics",
"categoryImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/electronics.jpg"
},
"coinReward": 45,
"createdAt": "2023-07-01T13:30:00.000Z"
}
],
"pagination": {
"currentPage": 1,
"totalPages": 5,
"totalProducts": 50,
"hasMore": true
}
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> getProducts({
String? category,
int page = 1,
int limit = 10,
String? search,
}) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    // Build query parameters
    Map<String, String> queryParams = {
      'page': page.toString(),
      'limit': limit.toString(),
    };

    if (category != null) queryParams['category'] = category;
    if (search != null && search.isNotEmpty) queryParams['search'] = search;

    final uri = Uri.parse('https://kkd-backend-api.onrender.com/api/user/products')
        .replace(queryParameters: queryParams);

    final response = await http.get(
      uri,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Products fetched successfully');
      return data;
    } else {
      print('❌ Failed to get products: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}

// Usage Examples:
void loadAllProducts() async {
final result = await getProducts();
if (result['success']) {
List products = result['data'];
print('Loaded ${products.length} products');
}
}

void searchProducts(String query) async {
final result = await getProducts(search: query);
if (result['success']) {
List products = result['data'];
print('Found ${products.length} products for "$query"');
}
}

void loadProductsByCategory(String categoryId) async {
final result = await getProducts(category: categoryId);
if (result['success']) {
List products = result['data'];
print('Loaded ${products.length} products in category');
}
}
\`\`\`

---

### 1️⃣2️⃣ Get Single Product Details - `GET` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/products/:productId`  
**📝 Method:** `GET`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json
\`\`\`

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "Product details fetched successfully",
"data": {
"productId": "PROD_ABC123XYZ456",
"productName": "iPhone 15 Pro",
"productDescription": "Latest iPhone with advanced features and A17 Pro chip",
"productImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/products/iphone15.jpg",
"category": {
"\_id": "64a1b2c3d4e5f6789012345",
"categoryName": "Electronics",
"categoryImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/electronics.jpg"
},
"coinReward": 50,
"isAvailable": true,
"createdAt": "2023-07-01T13:00:00.000Z"
}
}
\`\`\`

**❌ Error Response:**

\`\`\`json
{
"success": false,
"message": "Product not found or not available"
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> getProductById(String productId) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    final response = await http.get(
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/products/$productId'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Product details fetched successfully');
      return data;
    } else {
      print('❌ Failed to get product: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}

// Usage Example:
void loadProductDetails(String productId) async {
final result = await getProductById(productId);

if (result['success']) {
final product = result['data'];
print('Product: ${product['productName']}');
print('Category: ${product['category']['categoryName']}');
print('Coin Reward: ${product['coinReward']}');
print('Available: ${product['isAvailable']}');
} else {
print('Error: ${result['message']}');
}
}
\`\`\`

---

### 1️⃣3️⃣ Get Products by Category - `GET` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/products/category/:categoryId`  
**📝 Method:** `GET`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json
\`\`\`

**📤 Query Parameters (Optional):**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "Products in Electronics fetched successfully",
"data": [
{
"_id": "64a1b2c3d4e5f6789012350",
"productId": "PROD_ABC123XYZ456",
"productName": "iPhone 15 Pro",
"productDescription": "Latest iPhone with advanced features",
"productImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/products/iphone15.jpg",
"category": {
"_id": "64a1b2c3d4e5f6789012345",
"categoryName": "Electronics",
"categoryImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/electronics.jpg"
},
"coinReward": 50,
"createdAt": "2023-07-01T13:00:00.000Z"
}
],
"category": {
"id": "64a1b2c3d4e5f6789012345",
"name": "Electronics",
"image": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/electronics.jpg"
},
"pagination": {
"currentPage": 1,
"totalPages": 3,
"totalProducts": 25,
"hasMore": true
}
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> getProductsByCategory(
String categoryId, {
int page = 1,
int limit = 10,
}) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    final uri = Uri.parse('https://kkd-backend-api.onrender.com/api/user/products/category/$categoryId')
        .replace(queryParameters: {
          'page': page.toString(),
          'limit': limit.toString(),
        });

    final response = await http.get(
      uri,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Category products fetched successfully');
      return data;
    } else {
      print('❌ Failed to get category products: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}

// Usage Example:
void loadCategoryProducts(String categoryId) async {
final result = await getProductsByCategory(categoryId);

if (result['success']) {
List products = result['data'];
final category = result['category'];

    print('Category: ${category['name']}');
    print('Products: ${products.length}');

    for (var product in products) {
      print('- ${product['productName']} (${product['coinReward']} coins)');
    }

} else {
print('Error: ${result['message']}');
}
}
\`\`\`

---

### 1️⃣4️⃣ Get Featured/Popular Products - `GET` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/products/featured`  
**📝 Method:** `GET`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json
\`\`\`

**📤 Query Parameters (Optional):**

- `limit` - Number of featured products (default: 6)

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "Featured products fetched successfully",
"data": [
{
"_id": "64a1b2c3d4e5f6789012350",
"productId": "PROD_ABC123XYZ456",
"productName": "iPhone 15 Pro",
"productDescription": "Latest iPhone with advanced features",
"productImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/products/iphone15.jpg",
"category": {
"_id": "64a1b2c3d4e5f6789012345",
"categoryName": "Electronics",
"categoryImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/electronics.jpg"
},
"coinReward": 50,
"createdAt": "2023-07-01T13:00:00.000Z"
},
{
"_id": "64a1b2c3d4e5f6789012351",
"productId": "PROD_DEF789GHI012",
"productName": "MacBook Pro M3",
"productDescription": "Powerful laptop for professionals",
"productImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/products/macbook-pro.jpg",
"category": {
"_id": "64a1b2c3d4e5f6789012345",
"categoryName": "Electronics",
"categoryImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/categories/electronics.jpg"
},
"coinReward": 75,
"createdAt": "2023-07-01T13:30:00.000Z"
}
]
}
\`\`\`

**📱 Flutter Example:**

\`\`\`dart
Future<Map<String, dynamic>> getFeaturedProducts({int limit = 6}) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

    if (token == null) {
      return {'success': false, 'message': 'No token found'};
    }

    final uri = Uri.parse('https://kkd-backend-api.onrender.com/api/user/products/featured')
        .replace(queryParameters: {'limit': limit.toString()});

    final response = await http.get(
      uri,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Featured products fetched successfully');
      return data;
    } else {
      print('❌ Failed to get featured products: ${data['message']}');
      return data;
    }

} catch (e) {
print('🌐 Network error: $e');
return {'success': false, 'message': 'Network error occurred'};
}
}

// Usage Example:
void loadFeaturedProducts() async {
final result = await getFeaturedProducts(limit: 8);

if (result['success']) {
List products = result['data'];

    print('Featured Products:');
    for (var product in products) {
      print('⭐ ${product['productName']} - ${product['coinReward']} coins');
    }

} else {
print('Error: ${result['message']}');
}
}
\`\`\`

**💡 Product API Tips:**

- **Active Products Only**: User APIs only return products with `qrStatus: "active"`
- **Pagination**: Use pagination for better performance with large product lists
- **Search Functionality**: Use the search parameter to find specific products
- **Category Filtering**: Filter products by category for better organization
- **Featured Products**: Show high-reward and recently added products prominently
- **Coin Rewards**: Display coin rewards to motivate users to scan QR codes

---

## 🎯 QR Code Scanning API

### 1️⃣5️⃣ Scan QR Code for Coins - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/scan-qr`  
**📝 Method:** `POST`  
**🔒 Authentication:** Required (Bearer Token)

**📤 Request Headers:**

\`\`\`
Authorization: Bearer <your_token_here>
Content-Type: application/json
\`\`\`

**📤 Request Body:**

\`\`\`json
{
"qrData": "{\"productId\":\"PROD_ABC123XYZ456\",\"type\":\"PRODUCT_QR\",\"timestamp\":1690123456789,\"hash\":\"abc123def456\"}"
}
\`\`\`

> **💡 Note:** `qrData` should be the complete JSON string read from the QR code

**✅ Success Response:**

\`\`\`json
{
"success": true,
"message": "Congratulations! You've earned 50 coins for scanning iPhone 15 Pro.",
"data": {
"productName": "iPhone 15 Pro",
"coinsEarned": 50,
"totalCoins": 200,
"scannedAt": "2023-07-15T14:30:00.000Z"
}
}
\`\`\`

**❌ Error Responses:**

\`\`\`json
{
"success": false,
"message": "Invalid QR code. This is not a valid product QR."
}
\`\`\`

\`\`\`json
{
"success": false,
"message": "This QR code has already been used."
}
\`\`\`

\`\`\`json
{
"success": false,
"message": "You have already scanned this product."
}
\`\`\`

\`\`\`json
{
"success": false,
"message": "This QR code is currently inactive."
}
\`\`\`

**📱 Flutter Implementation:**

### Required Packages for QR Scanning

Add these to your `pubspec.yaml`:

\`\`\`yaml
dependencies:
qr_code_scanner: ^1.0.1 # For QR code scanning
permission_handler: ^11.0.1 # For camera permissions
\`\`\`

### Complete QR Scanner Implementation

\`\`\`dart
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class QRScannerScreen extends StatefulWidget {
@override
\_QRScannerScreenState createState() => \_QRScannerScreenState();
}

class \_QRScannerScreenState extends State<QRScannerScreen> {
final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
QRViewController? controller;
bool isScanning = true;
bool isProcessing = false;

@override
void initState() {
super.initState();
\_requestCameraPermission();
}

Future<void> \_requestCameraPermission() async {
final status = await Permission.camera.request();
if (status != PermissionStatus.granted) {
ScaffoldMessenger.of(context).showSnackBar(
SnackBar(
content: Text('Camera permission is required to scan QR codes'),
backgroundColor: Colors.red,
),
);
Navigator.pop(context);
}
}

@override
Widget build(BuildContext context) {
return Scaffold(
appBar: AppBar(
title: Text('Scan QR Code'),
backgroundColor: Colors.black,
foregroundColor: Colors.white,
actions: [
IconButton(
icon: Icon(Icons.flash_on),
onPressed: () async {
await controller?.toggleFlash();
},
),
],
),
body: Column(
children: [
Expanded(
flex: 4,
child: Stack(
children: [
QRView(
key: qrKey,
onQRViewCreated: \_onQRViewCreated,
overlay: QrScannerOverlayShape(
borderColor: Colors.green,
borderRadius: 10,
borderLength: 30,
borderWidth: 10,
cutOutSize: 250,
),
),
if (isProcessing)
Container(
color: Colors.black54,
child: Center(
child: Column(
mainAxisAlignment: MainAxisAlignment.center,
children: [
CircularProgressIndicator(color: Colors.white),
SizedBox(height: 16),
Text(
'Processing QR Code...',
style: TextStyle(color: Colors.white, fontSize: 16),
),
],
),
),
),
],
),
),
Expanded(
flex: 1,
child: Container(
padding: EdgeInsets.all(20),
child: Column(
mainAxisAlignment: MainAxisAlignment.center,
children: [
Icon(
Icons.qr_code_scanner,
size: 48,
color: Colors.green,
),
SizedBox(height: 8),
Text(
'Point your camera at a QR code',
style: TextStyle(
fontSize: 16,
fontWeight: FontWeight.w500,
),
textAlign: TextAlign.center,
),
SizedBox(height: 4),
Text(
'Scan product QR codes to earn coins!',
style: TextStyle(
fontSize: 14,
color: Colors.grey[600],
),
textAlign: TextAlign.center,
),
],
),
),
),
],
),
);
}

void \_onQRViewCreated(QRViewController controller) {
setState(() {
this.controller = controller;
});

    controller.scannedDataStream.listen((scanData) {
      if (isScanning && !isProcessing && scanData.code != null) {
        _handleQRScan(scanData.code!);
      }
    });

}

Future<void> \_handleQRScan(String qrData) async {
if (isProcessing) return;

    setState(() {
      isProcessing = true;
      isScanning = false;
    });

    // Pause camera
    await controller?.pauseCamera();

    try {
      // Validate QR data format
      Map<String, dynamic> qrJson;
      try {
        qrJson = jsonDecode(qrData);
      } catch (e) {
        _showErrorDialog('Invalid QR Code', 'This QR code is not in the correct format.');
        return;
      }

      // Check if it's a product QR
      if (qrJson['type'] != 'PRODUCT_QR' || qrJson['productId'] == null) {
        _showErrorDialog('Invalid QR Code', 'This is not a valid product QR code.');
        return;
      }

      // Send to API
      final result = await _scanQRCode(qrData);

      if (result['success']) {
        _showSuccessDialog(result);
      } else {
        _showErrorDialog('Scan Failed', result['message'] ?? 'Unknown error occurred');
      }
    } catch (e) {
      _showErrorDialog('Error', 'Failed to process QR code. Please try again.');
    } finally {
      setState(() {
        isProcessing = false;
      });
    }

}

Future<Map<String, dynamic>> \_scanQRCode(String qrData) async {
try {
SharedPreferences prefs = await SharedPreferences.getInstance();
String? token = prefs.getString('auth_token');

      if (token == null) {
        return {'success': false, 'message': 'Please login to scan QR codes'};
      }

      final response = await http.post(
        Uri.parse('https://kkd-backend-api.onrender.com/api/user/scan-qr'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'qrData': qrData}),
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error occurred'};
    }

}

void \_showSuccessDialog(Map<String, dynamic> result) {
final data = result['data'];
showDialog(
context: context,
barrierDismissible: false,
builder: (context) => AlertDialog(
title: Row(
children: [
Icon(Icons.celebration, color: Colors.green, size: 28),
SizedBox(width: 8),
Text('Success! 🎉'),
],
),
content: Column(
mainAxisSize: MainAxisSize.min,
crossAxisAlignment: CrossAxisAlignment.start,
children: [
Text(
result['message'] ?? 'QR code scanned successfully!',
style: TextStyle(fontSize: 16),
),
SizedBox(height: 16),
Container(
padding: EdgeInsets.all(12),
decoration: BoxDecoration(
color: Colors.green.shade50,
borderRadius: BorderRadius.circular(8),
border: Border.all(color: Colors.green.shade200),
),
child: Column(
children: [
Row(
mainAxisAlignment: MainAxisAlignment.spaceBetween,
children: [
Text('Product:', style: TextStyle(fontWeight: FontWeight.w500)),
Text(data['productName'] ?? 'Unknown'),
],
),
SizedBox(height: 8),
Row(
mainAxisAlignment: MainAxisAlignment.spaceBetween,
children: [
Text('Coins Earned:', style: TextStyle(fontWeight: FontWeight.w500)),
Text(
'+${data['coinsEarned']} 🪙',
                        style: TextStyle(
                          color: Colors.green,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Total Coins:', style: TextStyle(fontWeight: FontWeight.w500)),
                      Text(
                        '${data['totalCoins']} 🪙',
style: TextStyle(
color: Colors.blue,
fontWeight: FontWeight.bold,
fontSize: 16,
),
),
],
),
],
),
),
],
),
actions: [
TextButton(
onPressed: () {
Navigator.pop(context); // Close dialog
Navigator.pop(context); // Go back to previous screen
},
child: Text('Done'),
),
ElevatedButton(
onPressed: () {
Navigator.pop(context); // Close dialog
_resumeScanning(); // Continue scanning
},
child: Text('Scan Another'),
),
],
),
);
}

void \_showErrorDialog(String title, String message) {
showDialog(
context: context,
builder: (context) => AlertDialog(
title: Row(
children: [
Icon(Icons.error, color: Colors.red, size: 28),
SizedBox(width: 8),
Text(title),
],
),
content: Text(message),
actions: [
TextButton(
onPressed: () {
Navigator.pop(context); // Close dialog
Navigator.pop(context); // Go back to previous screen
},
child: Text('Cancel'),
),
ElevatedButton(
onPressed: () {
Navigator.pop(context); // Close dialog
_resumeScanning(); // Try again
},
child: Text('Try Again'),
),
],
),
);
}

void \_resumeScanning() {
setState(() {
isScanning = true;
isProcessing = false;
});
controller?.resumeCamera();
}

@override
void dispose() {
controller?.dispose();
super.dispose();
}
}
\`\`\`

### QR Code Data Structure

The QR codes generated by the admin contain JSON data in this format:

\`\`\`json
{
"productId": "PROD_ABC123XYZ456",
"type": "PRODUCT_QR",
"timestamp": 1690123456789,
"hash": "abc123def456"
}
\`\`\`

**🔍 QR Code Validation:**

- ✅ Must be valid JSON format
- ✅ Must have `type: "PRODUCT_QR"`
- ✅ Must have valid `productId`
- ✅ Product must exist and be active
- ✅ User must not have scanned this product before
- ✅ QR code must not be already used by another user

**🎯 QR Scanning Flow:**

1. **User opens QR scanner** → Camera permission requested
2. **User points camera at QR code** → QR data automatically detected
3. **App validates QR format** → Checks JSON structure and type
4. **App sends to API** → `/api/user/scan-qr` with QR data
5. **Backend validates** → Product exists, not scanned, user eligible
6. **Coins awarded** → User's coin balance updated
7. **Success shown** → User sees earned coins and total

---

## 📱 Complete Flutter Setup

### Required Packages

Add these to your `pubspec.yaml`:

\`\`\`yaml
dependencies:
flutter:
sdk: flutter

# Core HTTP & Storage

http: ^1.1.0 # For API calls
shared_preferences: ^2.2.2 # For token storage

# Image Handling

image_picker: ^1.0.4 # For image selection
cached_network_image: ^3.3.0 # For image caching

# QR Code Scanning

qr_code_scanner: ^1.0.1 # For QR scanning
permission_handler: ^11.0.1 # For camera permissions

# UI & UX

flutter_spinkit: ^5.2.0 # Loading animations
fluttertoast: ^8.2.4 # Toast messages

dev_dependencies:
flutter_test:
sdk: flutter
\`\`\`

Install packages:

\`\`\`bash
flutter pub get
\`\`\`

### Complete API Service Class

Create a file `lib/services/api_service.dart`:

\`\`\`dart
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
static const String baseUrl = 'https://kkd-backend-api.onrender.com';

// 🔐 Token Management
Future<String?> getToken() async {
SharedPreferences prefs = await SharedPreferences.getInstance();
return prefs.getString('auth_token');
}

Future<void> saveToken(String token) async {
SharedPreferences prefs = await SharedPreferences.getInstance();
await prefs.setString('auth_token', token);
}

Future<void> clearToken() async {
SharedPreferences prefs = await SharedPreferences.getInstance();
await prefs.remove('auth_token');
}

// 📝 Authentication APIs
Future<Map<String, dynamic>> signup({
required String fullName,
required String phone,
required String email,
required String password,
}) async {
try {
final response = await http.post(
Uri.parse('$baseUrl/api/user/signup'),
headers: {'Content-Type': 'application/json'},
body: jsonEncode({
'fullName': fullName,
'phone': phone,
'email': email,
'password': password,
}),
);

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

Future<Map<String, dynamic>> login({
required String identifier,
required String password,
}) async {
try {
final response = await http.post(
Uri.parse('$baseUrl/api/user/login'),
headers: {'Content-Type': 'application/json'},
body: jsonEncode({
'identifier': identifier,
'password': password,
}),
);

      final data = jsonDecode(response.body);

      if (data['success'] == true) {
        await saveToken(data['data']['token']);
      }

      return data;
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

// 👤 Profile APIs
Future<Map<String, dynamic>> getUserProfile() async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      final response = await http.get(
        Uri.parse('$baseUrl/api/user/get-user'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

Future<Map<String, dynamic>> updateProfile({
String? fullName,
String? dob,
String? address,
String? pinCode,
String? state,
String? country,
String? accountNumber,
String? accountHolderName,
String? bankName,
String? ifscCode,
File? profileImage,
}) async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      if (profileImage != null) {
        // Multipart request for image upload
        var request = http.MultipartRequest(
          'PUT',
          Uri.parse('$baseUrl/api/user/update-profile'),
        );

        request.headers['Authorization'] = 'Bearer $token';

        // Add text fields
        if (fullName != null) request.fields['fullName'] = fullName;
        if (dob != null) request.fields['dob'] = dob;
        if (address != null) request.fields['address'] = address;
        if (pinCode != null) request.fields['pinCode'] = pinCode;
        if (state != null) request.fields['state'] = state;
        if (country != null) request.fields['country'] = country;
        if (accountNumber != null) request.fields['accountNumber'] = accountNumber;
        if (accountHolderName != null) request.fields['accountHolderName'] = accountHolderName;
        if (bankName != null) request.fields['bankName'] = bankName;
        if (ifscCode != null) request.fields['ifscCode'] = ifscCode;

        // Add image file
        request.files.add(
          await http.MultipartFile.fromPath('profilePick', profileImage.path),
        );

        var streamedResponse = await request.send();
        var response = await http.Response.fromStream(streamedResponse);

        return jsonDecode(response.body);
      } else {
        // JSON request for text-only updates
        Map<String, dynamic> updateData = {};
        if (fullName != null) updateData['fullName'] = fullName;
        if (dob != null) updateData['dob'] = dob;
        if (address != null) updateData['address'] = address;
        if (pinCode != null) updateData['pinCode'] = pinCode;
        if (state != null) updateData['state'] = state;
        if (country != null) updateData['country'] = country;
        if (accountNumber != null) updateData['accountNumber'] = accountNumber;
        if (accountHolderName != null) updateData['accountHolderName'] = accountHolderName;
        if (bankName != null) updateData['bankName'] = bankName;
        if (ifscCode != null) updateData['ifscCode'] = ifscCode;

        final response = await http.put(
          Uri.parse('$baseUrl/api/user/update-profile'),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
          body: jsonEncode(updateData),
        );

        return jsonDecode(response.body);
      }
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

Future<Map<String, dynamic>> updatePassword({
required String currentPassword,
required String newPassword,
}) async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      final response = await http.put(
        Uri.parse('$baseUrl/api/user/update-password'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'currentPassword': currentPassword,
          'newPassword': newPassword,
        }),
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

// 📄 Document Upload APIs
Future<Map<String, dynamic>> uploadDocument({
required String documentType, // 'pan', 'aadhar', 'passbook'
required File documentFile,
}) async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      var request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/api/user/upload-$documentType'),
      );

      request.headers['Authorization'] = 'Bearer $token';
      request.files.add(
        await http.MultipartFile.fromPath('${documentType}Photo', documentFile.path),
      );

      var streamedResponse = await request.send();
      var response = await http.Response.fromStream(streamedResponse);

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

// 📂 Category & Content APIs
Future<Map<String, dynamic>> getCategories() async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      final response = await http.get(
        Uri.parse('$baseUrl/api/user/get-categories'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

Future<Map<String, dynamic>> getPromotions() async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      final response = await http.get(
        Uri.parse('$baseUrl/api/user/get-promotions'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

// 🛍️ Product APIs
Future<Map<String, dynamic>> getProducts({
String? category,
int page = 1,
int limit = 10,
String? search,
}) async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      Map<String, String> queryParams = {
        'page': page.toString(),
        'limit': limit.toString(),
      };

      if (category != null) queryParams['category'] = category;
      if (search != null && search.isNotEmpty) queryParams['search'] = search;

      final uri = Uri.parse('$baseUrl/api/user/products')
          .replace(queryParameters: queryParams);

      final response = await http.get(
        uri,
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

Future<Map<String, dynamic>> getProductById(String productId) async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      final response = await http.get(
        Uri.parse('$baseUrl/api/user/products/$productId'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

Future<Map<String, dynamic>> getProductsByCategory(
String categoryId, {
int page = 1,
int limit = 10,
}) async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      final uri = Uri.parse('$baseUrl/api/user/products/category/$categoryId')
          .replace(queryParameters: {
            'page': page.toString(),
            'limit': limit.toString(),
          });

      final response = await http.get(
        uri,
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

Future<Map<String, dynamic>> getFeaturedProducts({int limit = 6}) async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      final uri = Uri.parse('$baseUrl/api/user/products/featured')
          .replace(queryParameters: {'limit': limit.toString()});

      final response = await http.get(
        uri,
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

// 🎯 QR Code Scanning API
Future<Map<String, dynamic>> scanQRCode(String qrData) async {
try {
String? token = await getToken();
if (token == null) {
return {'success': false, 'message': 'No token found'};
}

      final response = await http.post(
        Uri.parse('$baseUrl/api/user/scan-qr'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'qrData': qrData}),
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: $e'};
    }

}

// 🚀 Helper functions for status checking
String getVerificationStatusText(String status) {
switch (status) {
case 'verified':
return '✅ Verified';
case 'processing':
return '⏳ Under Review';
case 'rejected':
return '❌ Rejected';
case 'incomplete':
default:
return '📋 Not Uploaded';
}
}

String getKYCStatusText(String status) {
switch (status) {
case 'approved':
return '✅ KYC Approved';
case 'pending':
return '⏳ KYC Pending';
case 'rejected':
return '❌ KYC Rejected';
case 'incomplete':
default:
return '📋 KYC Incomplete';
}
}

Color getStatusColor(String status) {
switch (status) {
case 'verified':
case 'approved':
return Colors.green;
case 'processing':
case 'pending':
return Colors.orange;
case 'rejected':
return Colors.red;
case 'incomplete':
default:
return Colors.grey;
}
}

// 🚪 Logout
Future<void> logout() async {
await clearToken();
}
}
\`\`\`

### 🚀 Enhanced Profile Screen Example

\`\`\`dart
import 'package:flutter/material.dart';
import 'services/api_service.dart';

class ProfileScreen extends StatefulWidget {
@override
\_ProfileScreenState createState() => \_ProfileScreenState();
}

class \_ProfileScreenState extends State<ProfileScreen> {
final ApiService \_apiService = ApiService();
Map<String, dynamic>? userData;
bool isLoading = true;

@override
void initState() {
super.initState();
loadUserProfile();
}

void loadUserProfile() async {
final result = await \_apiService.getUserProfile();

    setState(() {
      isLoading = false;
      if (result['success']) {
        userData = result['data'];
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${result['message']}')),
        );
      }
    });

}

Widget buildVerificationStatus(String title, String status, String? rejectionReason) {
return Card(
child: ListTile(
title: Text(title),
subtitle: Column(
crossAxisAlignment: CrossAxisAlignment.start,
children: [
Text(
_apiService.getVerificationStatusText(status),
style: TextStyle(
color: _apiService.getStatusColor(status),
fontWeight: FontWeight.bold,
),
),
if (status == 'rejected' && rejectionReason != null && rejectionReason.isNotEmpty)
Padding(
padding: EdgeInsets.only(top: 4),
child: Text(
'Reason: $rejectionReason',
style: TextStyle(color: Colors.red, fontSize: 12),
),
),
],
),
leading: Icon(
status == 'verified' ? Icons.check_circle :
status == 'processing' ? Icons.hourglass_empty :
status == 'rejected' ? Icons.cancel :
Icons.upload_file,
color: \_apiService.getStatusColor(status),
),
),
);
}

Widget buildKYCStatus() {
if (userData == null) return SizedBox.shrink();

    String kycStatus = userData!['kycStatus'] ?? 'incomplete';
    String kycRejectionReason = userData!['kycRejectionReason'] ?? '';

    return Card(
      color: _apiService.getStatusColor(kycStatus).withOpacity(0.1),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  kycStatus == 'approved' ? Icons.verified_user :
                  kycStatus == 'pending' ? Icons.pending :
                  kycStatus == 'rejected' ? Icons.error :
                  Icons.assignment,
                  color: _apiService.getStatusColor(kycStatus),
                ),
                SizedBox(width: 8),
                Text(
                  'KYC Status',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 8),
            Text(
              _apiService.getKYCStatusText(kycStatus),
              style: TextStyle(
                color: _apiService.getStatusColor(kycStatus),
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            if (kycStatus == 'rejected' && kycRejectionReason.isNotEmpty)
              Padding(
                padding: EdgeInsets.only(top: 8),
                child: Text(
                  'Rejection Reason: $kycRejectionReason',
                  style: TextStyle(color: Colors.red),
                ),
              ),
            if (kycStatus == 'pending')
              Padding(
                padding: EdgeInsets.only(top: 8),
                child: Text(
                  'Your KYC is under review. You will be notified once the verification is complete.',
                  style: TextStyle(color: Colors.orange[700]),
                ),
              ),
          ],
        ),
      ),
    );

}

Widget buildScanHistory() {
if (userData == null) return SizedBox.shrink();

    List scanHistory = userData!['scanHistory'] ?? [];

    if (scanHistory.isEmpty) {
      return Card(
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            children: [
              Icon(Icons.qr_code_scanner, size: 48, color: Colors.grey),
              SizedBox(height: 8),
              Text(
                'No QR codes scanned yet',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              Text(
                'Start scanning product QR codes to earn coins!',
                style: TextStyle(color: Colors.grey[600]),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      );
    }

    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Recent Scans (${scanHistory.length})',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            ...scanHistory.take(3).map((scan) => ListTile(
              leading: Icon(Icons.qr_code, color: Colors.green),
              title: Text(scan['productName'] ?? 'Unknown Product'),
              subtitle: Text(scan['categoryName'] ?? 'Unknown Category'),
              trailing: Text(
                '+${scan['coinsEarned']} 🪙',
                style: TextStyle(
                  color: Colors.green,
                  fontWeight: FontWeight.bold,
                ),
              ),
            )).toList(),
            if (scanHistory.length > 3)
              TextButton(
                onPressed: () {
                  // Navigate to full scan history
                },
                child: Text('View All Scans'),
              ),
          ],
        ),
      ),
    );

}

@override
Widget build(BuildContext context) {
if (isLoading) {
return Scaffold(
body: Center(child: CircularProgressIndicator()),
);
}

    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
        actions: [
          IconButton(
            icon: Icon(Icons.qr_code_scanner),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => QRScannerScreen()),
              );
            },
          ),
        ],
      ),
      body: userData != null
          ? SingleChildScrollView(
              padding: EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Basic Info
                  Card(
                    child: Padding(
                      padding: EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Basic Information', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                          SizedBox(height: 8),
                          Text('Name: ${userData!['fullName']}'),
                          Text('Email: ${userData!['email']}'),
                          Text('Phone: ${userData!['phone']}'),
                          Text('Coins: ${userData!['coinsEarned']} 🪙'),
                          Text('User ID: ${userData!['userId']}'),
                          Text('Products Scanned: ${(userData!['productsQrScanned'] as List?)?.length ?? 0}'),
                        ],
                      ),
                    ),
                  ),

                  SizedBox(height: 16),

                  // KYC Status
                  buildKYCStatus(),

                  SizedBox(height: 16),

                  // Document Verification Status
                  Text('Document Verification Status', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),

                  buildVerificationStatus(
                    'PAN Card',
                    userData!['panVerificationStatus'] ?? 'incomplete',
                    userData!['panRejectionReason'],
                  ),

                  buildVerificationStatus(
                    'Aadhar Card',
                    userData!['aadharVerificationStatus'] ?? 'incomplete',
                    userData!['aadharRejectionReason'],
                  ),

                  buildVerificationStatus(
                    'Bank Passbook',
                    userData!['passbookVerificationStatus'] ?? 'incomplete',
                    userData!['passbookRejectionReason'],
                  ),

                  SizedBox(height: 16),

                  // Scan History
                  buildScanHistory(),

                  SizedBox(height: 16),

                  // Profile Completion Status
                  Card(
                    child: ListTile(
                      title: Text('Profile Completion'),
                      subtitle: Text(
                        userData!['isProfileComplete'] == true ? 'Complete ✅' : 'Incomplete ❌',
                        style: TextStyle(
                          color: userData!['isProfileComplete'] == true ? Colors.green : Colors.red,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      leading: Icon(
                        userData!['isProfileComplete'] == true ? Icons.check_circle : Icons.incomplete_circle,
                        color: userData!['isProfileComplete'] == true ? Colors.green : Colors.red,
                      ),
                    ),
                  ),

                  SizedBox(height: 16),

                  // QR Scanner Button
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => QRScannerScreen()),
                        );
                      },
                      icon: Icon(Icons.qr_code_scanner),
                      label: Text('Scan QR Code to Earn Coins'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        foregroundColor: Colors.white,
                        padding: EdgeInsets.symmetric(vertical: 12),
                      ),
                    ),
                  ),
                ],
              ),
            )
          : Center(child: Text('Failed to load profile')),
    );

}
}
\`\`\`

---

## ⚠️ Error Handling Guide

### Common HTTP Status Codes

| Status Code | Meaning         | Common Causes                               |
| :---------- | :-------------- | :------------------------------------------ |
| `200`       | ✅ Success      | Request completed successfully              |
| `201`       | ✅ Created      | Resource created successfully (signup)      |
| `400`       | ❌ Bad Request  | Invalid request data, validation errors     |
| `401`       | ❌ Unauthorized | No token provided or invalid token          |
| `403`       | ❌ Forbidden    | Token expired or insufficient permissions   |
| `404`       | ❌ Not Found    | User or resource not found                  |
| `409`       | ❌ Conflict     | Duplicate data (email/phone already exists) |
| `500`       | ❌ Server Error | Internal server error                       |

### Common Error Responses

**401 Unauthorized:**

\`\`\`json
{
"success": false,
"message": "No token provided"
}
\`\`\`

**403 Forbidden:**

\`\`\`json
{
"success": false,
"message": "Invalid or expired token"
}
\`\`\`

**400 Bad Request:**

\`\`\`json
{
"success": false,
"message": "Pin code must be 6 digits"
}
\`\`\`

**409 Conflict:**

\`\`\`json
{
"success": false,
"message": "Email or Phone already registered"
}
\`\`\`

### Flutter Error Handling Best Practices

\`\`\`dart
Future<void> handleApiCall() async {
try {
final result = await apiService.getUserProfile();

    if (result['success'] == true) {
      // ✅ Success - use result['data']
      print('Success: ${result['data']}');
    } else {
      // ❌ API returned error
      String errorMessage = result['message'] ?? 'Unknown error occurred';

      // Handle specific errors
      if (errorMessage.contains('token')) {
        // Token issue - redirect to login
        Navigator.pushReplacementNamed(context, '/login');
      } else {
        // Show error to user
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error: $errorMessage'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }

} catch (e) {
// 🌐 Network or other error
print('Network Error: $e');
ScaffoldMessenger.of(context).showSnackBar(
SnackBar(
content: Text('Network error. Please check your connection.'),
backgroundColor: Colors.orange,
),
);
}
}
\`\`\`

---

## 📌 Important Notes & Best Practices

### 🔐 Security Best Practices

1. **Token Storage**

   - ✅ Use `SharedPreferences` for basic token storage
   - ✅ Use `flutter_secure_storage` for enhanced security
   - ❌ Never store tokens in plain text files

2. **Token Management**

   - ✅ Check token validity before API calls
   - ✅ Handle token expiration gracefully
   - ✅ Clear tokens on logout
   - ✅ Implement automatic logout on 401/403 errors

3. **Input Validation**
   - ✅ Validate data on client side before sending
   - ✅ Handle server validation errors properly
   - ✅ Sanitize user inputs

### 📱 File Upload Guidelines

1. **File Size Limits**

   - Profile Images: **Max 5MB**
   - Documents: **Max 10MB**
   - Always check file size before upload

2. **Supported Formats**

   - Images: JPG, JPEG, PNG, WebP, AVIF
   - Documents: JPG, JPEG, PNG, PDF

3. **Upload Best Practices**
   - ✅ Show upload progress indicators
   - ✅ Compress images before upload
   - ✅ Handle upload failures gracefully
   - ✅ Provide retry options

### 🎯 QR Code Scanning Best Practices

1. **Camera Permissions**

   - ✅ Request camera permission before opening scanner
   - ✅ Handle permission denied gracefully
   - ✅ Provide clear instructions to users

2. **QR Code Validation**

   - ✅ Validate QR data format before sending to API
   - ✅ Check for required fields (productId, type)
   - ✅ Handle invalid QR codes gracefully
   - ✅ Show clear error messages

3. **User Experience**
   - ✅ Show scanning instructions
   - ✅ Provide visual feedback during scanning
   - ✅ Handle success/error states properly
   - ✅ Allow users to scan multiple codes
   - ✅ Show coin earnings prominently

### 🚀 KYC & Verification System

1. **Status-Based Verification**

   - ✅ Use status values instead of boolean flags
   - ✅ Handle all four states: `incomplete`, `processing`, `verified`, `rejected`
   - ✅ Show rejection reasons to users when applicable
   - ✅ Provide clear status indicators in UI

2. **KYC Request System**

   - ✅ Monitor `kycRequestCreated` flag in responses
   - ✅ Show appropriate notifications when KYC is auto-triggered
   - ✅ Handle KYC status changes in real-time
   - ✅ Guide users through the verification process

3. **Profile Completion Logic**
   - ✅ Check `isProfileComplete` flag
   - ✅ Ensure all required fields are filled
   - ✅ Verify all documents are uploaded
   - ✅ Auto-trigger KYC when conditions are met

### 🛍️ Product Management

1. **Product Display**

   - ✅ Show product images with proper caching
   - ✅ Display coin rewards prominently
   - ✅ Group products by categories
   - ✅ Implement search functionality

2. **Product Interaction**

   - ✅ Show product details on tap
   - ✅ Indicate which products have been scanned
   - ✅ Display featured/popular products
   - ✅ Handle pagination for large product lists

3. **QR Integration**
   - ✅ Link products to QR scanning functionality
   - ✅ Show scan history with product details
   - ✅ Prevent duplicate scans per user
   - ✅ Update UI after successful scans

### 🌐 Network Handling

1. **Connection Management**

   - ✅ Check internet connectivity
   - ✅ Handle network timeouts
   - ✅ Implement retry logic
   - ✅ Show appropriate loading states

2. **Performance Optimization**
   - ✅ Cache API responses when appropriate
   - ✅ Use pagination for large data sets
   - ✅ Implement pull-to-refresh
   - ✅ Optimize image loading with caching

### 🔄 User Experience

1. **Loading States**

   - ✅ Show loading indicators during API calls
   - ✅ Disable buttons during processing
   - ✅ Provide feedback for long operations

2. **Error Messages**

   - ✅ Show user-friendly error messages
   - ✅ Provide actionable solutions
   - ✅ Use appropriate colors (red for errors, green for success)

3. **Form Validation**

   - ✅ Validate inputs in real-time
   - ✅ Show validation errors clearly
   - ✅ Guide users to correct inputs

4. **KYC User Experience**

   - ✅ Show clear progress indicators for verification
   - ✅ Notify users when KYC is auto-triggered
   - ✅ Display rejection reasons clearly
   - ✅ Provide guidance for resubmission

5. **QR Scanning User Experience**

   - ✅ Provide clear scanning instructions
   - ✅ Show real-time feedback during scanning
   - ✅ Display coin earnings prominently
   - ✅ Handle duplicate scans gracefully
   - ✅ Allow continuous scanning workflow

6. **Product Browsing Experience**
   - ✅ Implement smooth scrolling and pagination
   - ✅ Show product images with loading states
   - ✅ Provide search and filter options
   - ✅ Display coin rewards clearly
   - ✅ Show scan status for each product

---

## 🔗 Testing & Resources

### Base URL

\`\`\`
https://kkd-backend-api.onrender.com
\`\`\`

### Postman Collection

👉 [Test APIs on Postman Workspace](https://express-flutter-devs.postman.co/workspace/express-%252B-flutter-devs-Workspac~c8483be6-d1e5-4e20-8cde-5ea1e8a946fe/collection/26812494-b0ca2371-2cab-43e1-9f60-83e84f4fc23f?action=share&source=copy-link&creator=26812494)

### Useful Flutter Packages

\`\`\`yaml
dependencies:

# Core HTTP & Storage

http: ^1.1.0 # HTTP requests
shared_preferences: ^2.2.2 # Local storage
flutter_secure_storage: ^9.0.0 # Secure token storage

# Image Handling

image_picker: ^1.0.4 # Image selection
cached_network_image: ^3.3.0 # Image caching
image: ^4.1.3 # Image processing

# QR Code Scanning

qr_code_scanner: ^1.0.1 # QR scanning
permission_handler: ^11.0.1 # Camera permissions

# UI & UX

flutter_spinkit: ^5.2.0 # Loading animations
fluttertoast: ^8.2.4 # Toast messages

# Advanced HTTP (Optional)

dio: ^5.3.2 # Advanced HTTP client
connectivity_plus: ^5.0.1 # Network connectivity
\`\`\`

### Quick Setup Commands

\`\`\`bash

# Add required packages

flutter pub add http shared_preferences image_picker cached_network_image qr_code_scanner permission_handler

# Get packages

flutter pub get

# Run your app

flutter run
\`\`\`

---

## 🚀 Quick Start Checklist

- [ ] Install required Flutter packages
- [ ] Copy the ApiService class to your project
- [ ] Set up token storage with SharedPreferences
- [ ] Implement login/signup screens
- [ ] Add profile management screens
- [ ] Implement document upload functionality
- [ ] Add proper error handling
- [ ] Test all API endpoints
- [ ] Handle network connectivity issues
- [ ] Add loading states and user feedback
- [ ] ✅ **Implement status-based verification UI**
- [ ] ✅ **Handle KYC request notifications**
- [ ] ✅ **Show document rejection reasons**
- [ ] ✅ **Add profile completion tracking**
- [ ] ✅ **Implement QR code scanning functionality**
- [ ] ✅ **Add camera permissions handling**
- [ ] ✅ **Test QR scanning with real products**
- [ ] ✅ **Handle QR scanning success/error states**
- [ ] 🆕 **Implement product listing screens**
- [ ] 🆕 **Add product search and filtering**
- [ ] 🆕 **Show featured products section**
- [ ] 🆕 **Display product details with QR integration**
- [ ] 🆕 **Add category-based product browsing**
- [ ] 🆕 **Implement scan history with product details**
- [ ] 🆕 **Test all product APIs**
- [ ] 🆕 **Add product image caching**

---

## 🆕 What's New in This Version

### ✅ **Complete Product API Integration**

- **Get All Products** - Paginated product listing with search and category filtering
- **Product Details** - Individual product information with QR integration
- **Category-based Products** - Filter products by specific categories
- **Featured Products** - Highlight popular and high-reward products
- **Enhanced Product Data** - Complete product information including coin rewards

### ✅ **Enhanced QR Code System**

- **Product-QR Integration** - QR codes now linked to specific products
- **Scan History Enhancement** - Detailed scan history with product information
- **Coin Reward System** - Dynamic coin rewards based on product value
- **Duplicate Prevention** - Users can only scan each product once

### ✅ **Improved Mobile Integration**

- **Product Browsing UI** - Complete Flutter examples for product listing
- **Search Functionality** - Real-time product search implementation
- **Category Navigation** - Browse products by categories
- **Enhanced Profile Screen** - Shows scan history with product details

### ✅ **Better User Experience**

- **Scan History Display** - Visual representation of scanned products
- **Product Status Indicators** - Show which products have been scanned
- **Coin Tracking** - Clear display of earned coins per product
- **Featured Products Section** - Highlight high-value scanning opportunities

### ✅ **API Response Enhancements**

- **Pagination Support** - Efficient handling of large product lists
- **Search Results** - Filtered product responses based on search queries
- **Category Information** - Complete category details with products
- **Enhanced Error Handling** - Better error messages for product-related operations

### ✅ **Flutter Implementation Updates**

- **Complete ApiService** - All product APIs integrated in service class
- **Product Screens Examples** - Ready-to-use Flutter screens for products
- **Enhanced Error Handling** - Better error management for product operations
- **Performance Optimizations** - Caching and pagination for better performance

---

## 🙌 Made with ❤️ by Ravish

**Happy Coding! 🚀**

_This comprehensive documentation covers all user APIs for the KKD mobile app including complete product management, QR code scanning system, KYC verification, and extensive Flutter integration examples. The guide now includes everything needed to build a complete mobile application with product browsing, QR scanning, and user management features._

---

**📞 Support:** For technical support or API issues, please contact the development team.  
**🔄 Updates:** This documentation will be updated as new features are added to the API.  
**🎯 Testing:** Use the admin panel to create products and test all functionality including QR scanning.  
**🛍️ Products:** All product APIs are now documented with complete Flutter integration examples.
