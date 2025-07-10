# 🚀 KKD API Guide for Flutter Developers

**Complete beginner-friendly documentation** to help you integrate our Express.js APIs into your Flutter mobile app.

---

## 📖 API Endpoints Overview  

### 🔐 User Authentication APIs
| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| `POST` | `/api/user/signup` | User Registration | ❌ No |
| `POST` | `/api/user/login` | User Login | ❌ No |

### 👤 User Profile APIs  
| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| `GET` | `/api/user/get-user` | Get user profile | ✅ Yes |
| `PUT` | `/api/user/update-profile` | Update user profile | ✅ Yes |
| `PUT` | `/api/user/update-password` | Change password | ✅ Yes |

### 📄 Document Upload APIs
| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| `POST` | `/api/user/upload-pan` | Upload PAN card photo | ✅ Yes |
| `POST` | `/api/user/upload-aadhar` | Upload Aadhar card photo | ✅ Yes |
| `POST` | `/api/user/upload-passbook` | Upload bank passbook photo | ✅ Yes |

### 📂 Category APIs
| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| `GET` | `/api/user/get-categories` | Get all categories | ✅ Yes |

---

## 🔐 Authentication APIs

### 1️⃣ User Signup - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/signup`  
**📝 Method:** `POST`  
**🔒 Authentication:** Not Required  

**📤 Request Body:**
```json
{
  "fullName": "Ravish Bisht",
  "phone": "7060390453",
  "email": "ravishbisht03@gmail.com",
  "password": "123456"
}
```

**✅ Success Response:**
```json
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
```

**❌ Error Response:**
```json
{
  "success": false,
  "message": "Email or Phone already registered"
}
```

**📱 Flutter Example:**
```dart
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
      print('✅ Signup successful: \${data['message']}');
      return data;
    } else {
      print('❌ Signup failed: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
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
    print('Registration failed: \${result['message']}');
  }
}
```

---

### 2️⃣ User Login - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/login`  
**📝 Method:** `POST`  
**🔒 Authentication:** Not Required  

**📤 Request Body:**
```json
{
  "identifier": "ravishbisht03@gmail.com",
  "password": "123456"
}
```

> **💡 Note:** `identifier` can be either email or phone number

**✅ Success Response:**
```json
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
      "address": ""
    }
  }
}
```

**❌ Error Response:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**📱 Flutter Example:**
```dart
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
      print('❌ Login failed: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
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
    print('Welcome \${result['data']['user']['fullName']}!');
  } else {
    // Show error message
    print('Login failed: \${result['message']}');
  }
}
```

---

## 👤 User Profile APIs

### 3️⃣ Get User Profile - `GET` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/get-user`  
**📝 Method:** `GET`  
**🔒 Authentication:** Required (Bearer Token)  

**📤 Request Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**✅ Success Response:**
```json
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
    "panPhoto": "https://cloudinary-url...",
    "isPanVerified": true,
    "aadharPhoto": "https://cloudinary-url...",
    "isAadharVerified": false,
    "passbookPhoto": "https://cloudinary-url...",
    "isPassbookVerified": true,
    "productsQrScanned": ["QR123", "QR456"],
    "createdAt": "2023-07-01T10:30:00.000Z",
    "updatedAt": "2023-07-15T14:20:00.000Z"
  }
}
```

**❌ Error Response:**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**📱 Flutter Example:**
```dart
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
        'Authorization': 'Bearer \$token',
        'Content-Type': 'application/json',
      },
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Profile fetched successfully');
      return data;
    } else {
      print('❌ Failed to get profile: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
    return {'success': false, 'message': 'Network error occurred'};
  }
}

// Usage Example:
void loadUserProfile() async {
  final result = await getUserProfile();
  
  if (result['success']) {
    final user = result['data'];
    print('User: \${user['fullName']}');
    print('Coins: \${user['coinsEarned']}');
    print('Verified: PAN-\${user['isPanVerified']}, Aadhar-\${user['isAadharVerified']}');
  } else {
    print('Error: \${result['message']}');
  }
}
```

---

### 4️⃣ Update User Profile - `PUT` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/update-profile`  
**📝 Method:** `PUT`  
**🔒 Authentication:** Required (Bearer Token)  

**📤 Request Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json (for JSON data)
Content-Type: multipart/form-data (for file upload)
```

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
- `userId`, `email`, `phone`, `password`, `coinsEarned`, `verification flags`

#### Option A: JSON Update (Text fields only)

**📤 Request Body:**
```json
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
```

**📱 Flutter Example (JSON Update):**
```dart
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
        'Authorization': 'Bearer \$token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(updateData),
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Profile updated successfully!');
      return data;
    } else {
      print('❌ Update failed: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
    return {'success': false, 'message': 'Network error occurred'};
  }
}
```

#### Option B: Multipart Update (With Profile Image)

**📤 Form Data:**
- Text fields: `fullName`, `dob`, `address`, etc.
- File field: `profilePick` (Image file - Max 5MB)

**📱 Flutter Example (With Profile Image):**
```dart
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
    request.headers['Authorization'] = 'Bearer \$token';

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
      return data;
    } else {
      print('❌ Update failed: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
    return {'success': false, 'message': 'Network error occurred'};
  }
}

// Usage Example:
void handleProfileUpdate() async {
  // Pick image from gallery
  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);
  
  File? imageFile;
  if (pickedFile != null) {
    imageFile = File(pickedFile.path);
  }

  final result = await updateProfileWithImage(
    fullName: 'Updated Name',
    dob: '1995-01-15',
    address: 'New Address',
    profileImage: imageFile,
  );
  
  if (result['success']) {
    print('Profile updated successfully!');
  } else {
    print('Update failed: \${result['message']}');
  }
}
```

**✅ Success Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    // Updated user object with all fields
  }
}
```

**❌ Error Responses:**
```json
{
  "success": false,
  "message": "Pin code must be 6 digits"
}
```

---

### 5️⃣ Update Password - `PUT` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/update-password`  
**📝 Method:** `PUT`  
**🔒 Authentication:** Required (Bearer Token)  

**📤 Request Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**📤 Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**✅ Success Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

**❌ Error Response:**
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

**📱 Flutter Example:**
```dart
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
        'Authorization': 'Bearer \$token',
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
      print('❌ Password update failed: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
    return {'success': false, 'message': 'Network error occurred'};
  }
}

// Usage Example:
void handlePasswordUpdate() async {
  final result = await updatePassword(
    currentPassword: 'myoldpassword',
    newPassword: 'mynewsecurepassword123',
  );
  
  if (result['success']) {
    print('Password changed successfully!');
    // Optionally logout user to re-login with new password
  } else {
    print('Password change failed: \${result['message']}');
  }
}
```

---

## 📄 Document Upload APIs

### 6️⃣ Upload PAN Card Photo - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/upload-pan`  
**📝 Method:** `POST`  
**🔒 Authentication:** Required (Bearer Token)  

**📤 Request Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data
```

**📤 Form Data:**
- `panPhoto`: Image file (JPG, PNG, PDF - Max 10MB)

**✅ Success Response:**
```json
{
  "success": true,
  "message": "PAN photo uploaded successfully",
  "data": {
    "panPhoto": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/documents/pan/abc123.jpg",
    "isPanVerified": false
  }
}
```

**📱 Flutter Example:**
```dart
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

    request.headers['Authorization'] = 'Bearer \$token';
    request.files.add(
      await http.MultipartFile.fromPath('panPhoto', panImage.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ PAN photo uploaded successfully!');
      return data;
    } else {
      print('❌ PAN upload failed: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
    return {'success': false, 'message': 'Network error occurred'};
  }
}

// Usage Example:
void handlePanUpload() async {
  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);
  
  if (pickedFile != null) {
    File panFile = File(pickedFile.path);
    
    final result = await uploadPanPhoto(panFile);
    
    if (result['success']) {
      print('PAN card uploaded! Verification status: \${result['data']['isPanVerified']}');
    } else {
      print('Upload failed: \${result['message']}');
    }
  }
}
```

---

### 7️⃣ Upload Aadhar Card Photo - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/upload-aadhar`  
**📝 Method:** `POST`  
**🔒 Authentication:** Required (Bearer Token)  

**📤 Request Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data
```

**📤 Form Data:**
- `aadharPhoto`: Image file (JPG, PNG, PDF - Max 10MB)

**✅ Success Response:**
```json
{
  "success": true,
  "message": "Aadhar photo uploaded successfully",
  "data": {
    "aadharPhoto": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/documents/aadhar/xyz789.jpg",
    "isAadharVerified": false
  }
}
```

**📱 Flutter Example:**
```dart
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

    request.headers['Authorization'] = 'Bearer \$token';
    request.files.add(
      await http.MultipartFile.fromPath('aadharPhoto', aadharImage.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Aadhar photo uploaded successfully!');
      return data;
    } else {
      print('❌ Aadhar upload failed: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
    return {'success': false, 'message': 'Network error occurred'};
  }
}
```

---

### 8️⃣ Upload Bank Passbook Photo - `POST` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/upload-passbook`  
**📝 Method:** `POST`  
**🔒 Authentication:** Required (Bearer Token)  

**📤 Request Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data
```

**📤 Form Data:**
- `passbookPhoto`: Image file (JPG, PNG, PDF - Max 10MB)

**✅ Success Response:**
```json
{
  "success": true,
  "message": "Passbook photo uploaded successfully",
  "data": {
    "passbookPhoto": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/documents/passbook/def456.jpg",
    "isPassbookVerified": false
  }
}
```

**📱 Flutter Example:**
```dart
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

    request.headers['Authorization'] = 'Bearer \$token';
    request.files.add(
      await http.MultipartFile.fromPath('passbookPhoto', passbookImage.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Passbook photo uploaded successfully!');
      return data;
    } else {
      print('❌ Passbook upload failed: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
    return {'success': false, 'message': 'Network error occurred'};
  }
}
```

**💡 Document Upload Tips:**
- **File Size**: Keep documents under 10MB for faster upload
- **File Format**: JPG/PNG for images, PDF for scanned documents
- **Image Quality**: Ensure documents are clear and readable
- **Verification**: Documents will be verified by admin after upload

---

## 📂 Category APIs

### 9️⃣ Get All Categories - `GET` Request

**🌐 Endpoint:** `https://kkd-backend-api.onrender.com/api/user/get-categories`  
**📝 Method:** `GET`  
**🔒 Authentication:** Required (Bearer Token)  

**📤 Request Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**✅ Success Response:**
```json
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
```

**📱 Flutter Example:**
```dart
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
        'Authorization': 'Bearer \$token',
        'Content-Type': 'application/json',
      },
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Categories fetched successfully');
      return data;
    } else {
      print('❌ Failed to get categories: \${data['message']}');
      return data;
    }
  } catch (e) {
    print('🌐 Network error: \$e');
    return {'success': false, 'message': 'Network error occurred'};
  }
}

// Usage Example:
void loadCategories() async {
  final result = await getCategories();
  
  if (result['success']) {
    List categories = result['data'];
    
    for (var category in categories) {
      print('Category: \${category['categoryName']}');
      print('Image: \${category['categoryImage']}');
      print('---');
    }
  } else {
    print('Error: \${result['message']}');
  }
}
```

---

## 📱 Complete Flutter Setup

### Required Packages

Add these to your `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0                    # For API calls
  shared_preferences: ^2.2.2      # For token storage
  image_picker: ^1.0.4           # For image selection
  cached_network_image: ^3.3.0   # For image caching
  
dev_dependencies:
  flutter_test:
    sdk: flutter
```

Install packages:
```bash
flutter pub get
```

### Complete API Service Class

Create a file `lib/services/api_service.dart`:

```dart
import 'dart:convert';
import 'dart:io';
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
        Uri.parse('\$baseUrl/api/user/signup'),
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
      return {'success': false, 'message': 'Network error: \$e'};
    }
  }
  
  Future<Map<String, dynamic>> login({
    required String identifier,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('\$baseUrl/api/user/login'),
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
      return {'success': false, 'message': 'Network error: \$e'};
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
        Uri.parse('\$baseUrl/api/user/get-user'),
        headers: {
          'Authorization': 'Bearer \$token',
          'Content-Type': 'application/json',
        },
      );
      
      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: \$e'};
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
          Uri.parse('\$baseUrl/api/user/update-profile'),
        );
        
        request.headers['Authorization'] = 'Bearer \$token';
        
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
          Uri.parse('\$baseUrl/api/user/update-profile'),
          headers: {
            'Authorization': 'Bearer \$token',
            'Content-Type': 'application/json',
          },
          body: jsonEncode(updateData),
        );
        
        return jsonDecode(response.body);
      }
    } catch (e) {
      return {'success': false, 'message': 'Network error: \$e'};
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
        Uri.parse('\$baseUrl/api/user/update-password'),
        headers: {
          'Authorization': 'Bearer \$token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'currentPassword': currentPassword,
          'newPassword': newPassword,
        }),
      );
      
      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: \$e'};
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
        Uri.parse('\$baseUrl/api/user/upload-\$documentType'),
      );
      
      request.headers['Authorization'] = 'Bearer \$token';
      request.files.add(
        await http.MultipartFile.fromPath('\${documentType}Photo', documentFile.path),
      );
      
      var streamedResponse = await request.send();
      var response = await http.Response.fromStream(streamedResponse);
      
      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: \$e'};
    }
  }
  
  // 📂 Category APIs
  Future<Map<String, dynamic>> getCategories() async {
    try {
      String? token = await getToken();
      if (token == null) {
        return {'success': false, 'message': 'No token found'};
      }
      
      final response = await http.get(
        Uri.parse('\$baseUrl/api/user/get-categories'),
        headers: {
          'Authorization': 'Bearer \$token',
          'Content-Type': 'application/json',
        },
      );
      
      return jsonDecode(response.body);
    } catch (e) {
      return {'success': false, 'message': 'Network error: \$e'};
    }
  }
  
  // 🚪 Logout
  Future<void> logout() async {
    await clearToken();
  }
}
```

### Usage Example in Flutter Widget

```dart
import 'package:flutter/material.dart';
import 'services/api_service.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final ApiService _apiService = ApiService();
  Map<String, dynamic>? userData;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    loadUserProfile();
  }

  void loadUserProfile() async {
    final result = await _apiService.getUserProfile();
    
    setState(() {
      isLoading = false;
      if (result['success']) {
        userData = result['data'];
      } else {
        // Handle error
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: \${result['message']}')),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Profile')),
      body: userData != null
          ? Column(
              children: [
                Text('Name: \${userData!['fullName']}'),
                Text('Email: \${userData!['email']}'),
                Text('Coins: \${userData!['coinsEarned']}'),
                Text('PAN Verified: \${userData!['isPanVerified']}'),
                // Add more fields as needed
              ],
            )
          : Center(child: Text('Failed to load profile')),
    );
  }
}
```

---

## ⚠️ Error Handling Guide

### Common HTTP Status Codes

| Status Code | Meaning | Common Causes |
|:------------|:--------|:--------------|
| `200` | ✅ Success | Request completed successfully |
| `201` | ✅ Created | Resource created successfully (signup) |
| `400` | ❌ Bad Request | Invalid request data, validation errors |
| `401` | ❌ Unauthorized | No token provided or invalid token |
| `403` | ❌ Forbidden | Token expired or insufficient permissions |
| `404` | ❌ Not Found | User or resource not found |
| `409` | ❌ Conflict | Duplicate data (email/phone already exists) |
| `500` | ❌ Server Error | Internal server error |

### Common Error Responses

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Pin code must be 6 digits"
}
```

**409 Conflict:**
```json
{
  "success": false,
  "message": "Email or Phone already registered"
}
```

### Flutter Error Handling Best Practices

```dart
Future<void> handleApiCall() async {
  try {
    final result = await apiService.getUserProfile();
    
    if (result['success'] == true) {
      // ✅ Success - use result['data']
      print('Success: \${result['data']}');
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
            content: Text('Error: \$errorMessage'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  } catch (e) {
    // 🌐 Network or other error
    print('Network Error: \$e');
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Network error. Please check your connection.'),
        backgroundColor: Colors.orange,
      ),
    );
  }
}
```

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

---

## 🔗 Testing & Resources

### Base URL
```
https://kkd-backend-api.onrender.com
```

### Postman Collection
👉 [Test APIs on Postman Workspace](https://express-flutter-devs.postman.co/workspace/express-%252B-flutter-devs-Workspac~c8483be6-d1e5-4e20-8cde-5ea1e8a946fe/collection/26812494-b0ca2371-2cab-43e1-9f60-83e84f4fc23f?action=share&source=copy-link&creator=26812494)

### Useful Flutter Packages

```yaml
dependencies:
  # Core HTTP & Storage
  http: ^1.1.0                    # HTTP requests
  shared_preferences: ^2.2.2      # Local storage
  flutter_secure_storage: ^9.0.0  # Secure token storage
  
  # Image Handling
  image_picker: ^1.0.4           # Image selection
  cached_network_image: ^3.3.0   # Image caching
  image: ^4.1.3                  # Image processing
  
  # UI & UX
  flutter_spinkit: ^5.2.0        # Loading animations
  fluttertoast: ^8.2.4          # Toast messages
  
  # Advanced HTTP (Optional)
  dio: ^5.3.2                    # Advanced HTTP client
  connectivity_plus: ^5.0.1      # Network connectivity
```

### Quick Setup Commands

```bash
# Add required packages
flutter pub add http shared_preferences image_picker cached_network_image

# Get packages
flutter pub get

# Run your app
flutter run
```

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

---

## 🙌 Made with ❤️ by Ravish

**Happy Coding! 🚀**

*This documentation covers all user APIs for the KKD mobile app. For any issues or questions, please refer to the Postman collection or contact the development team.*

---

**📞 Support:** For technical support or API issues, please contact the development team.  
**🔄 Updates:** This documentation will be updated as new features are added to the API.
```

## 🎉 **Key Improvements Made:**

### ✅ **Clear Method Indicators**
- Added `POST`, `GET`, `PUT` labels prominently
- Color-coded method types in headers
- Clear endpoint structure with method types

### ✅ **Enhanced Developer Experience**
- Removed admin APIs as requested
- Added comprehensive error handling examples
- Included complete Flutter service class
- Added usage examples for each endpoint

### ✅ **Better Organization**
- Grouped APIs by functionality
- Added quick reference tables
- Included setup checklists
- Added troubleshooting guides

### ✅ **Beginner-Friendly Features**
- Step-by-step Flutter examples
- Complete code snippets ready to use
- Error handling best practices
- Security guidelines
- Performance tips
