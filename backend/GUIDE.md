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

### 1️⃣ User Signup

**Endpoint:** `https://kkd-backend-api.onrender.com/api/user/signup`

**Request Body:**
```json
{
  "fullName": "Ravish Bisht",
  "phone": "7060390453",
  "email": "ravishbisht03@gmail.com",
  "password": "123456"
}
```

**Success Response:**
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

**Flutter Example:**
```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<void> signupUser() async {
  final response = await http.post(
    Uri.parse('https://kkd-backend-api.onrender.com/api/user/signup'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      'fullName': 'Ravish Bisht',
      'phone': '7060390453',
      'email': 'ravishbisht03@gmail.com',
      'password': '123456'
    }),
  );

  if (response.statusCode == 201) {
    final data = jsonDecode(response.body);
    print('Signup successful: \${data['message']}');
  } else {
    print('Signup failed: \${response.body}');
  }
}
```

---

### 2️⃣ User Login

**Endpoint:** `https://kkd-backend-api.onrender.com/api/user/login`

**Request Body:**
```json
{
  "identifier": "ravishbisht03@gmail.com",
  "password": "123456"
}
```

**Success Response:**
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

**Flutter Example:**
```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

Future<void> loginUser() async {
  final response = await http.post(
    Uri.parse('https://kkd-backend-api.onrender.com/api/user/login'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      'identifier': 'ravishbisht03@gmail.com', // Can be email or phone
      'password': '123456'
    }),
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    String token = data['data']['token'];
    
    // Save token securely
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
    
    print('Login successful!');
  } else {
    print('Login failed: \${response.body}');
  }
}
```

---

## 👤 User Profile APIs

### 3️⃣ Get User Profile

**Endpoint:** `https://kkd-backend-api.onrender.com/api/user/get-user`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Success Response:**
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
    "isPassbookVerified": true
  }
}
```

**Flutter Example:**
```dart
Future<void> getUserProfile() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('auth_token');

  final response = await http.get(
    Uri.parse('https://kkd-backend-api.onrender.com/api/user/get-user'),
    headers: {
      'Authorization': 'Bearer \$token',
      'Content-Type': 'application/json',
    },
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    print('User data: \${data['data']}');
  } else {
    print('Failed to get profile: \${response.body}');
  }
}
```

---

### 4️⃣ Update User Profile

**Endpoint:** `https://kkd-backend-api.onrender.com/api/user/update-profile`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**Request Body (JSON):**
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

**Success Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    // Updated user object
  }
}
```

**Flutter Example (JSON Update):**
```dart
Future<void> updateProfile() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('auth_token');

  final response = await http.put(
    Uri.parse('https://kkd-backend-api.onrender.com/api/user/update-profile'),
    headers: {
      'Authorization': 'Bearer \$token',
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'fullName': 'Updated Name',
      'dob': '1995-01-15',
      'address': 'New Address Line',
      'pinCode': '110001',
      'state': 'Delhi',
      'country': 'India',
      'accountNumber': '9876543210',
      'accountHolderName': 'Updated Name',
      'bankName': 'HDFC Bank',
      'ifscCode': 'HDFC0001234'
    }),
  );

  if (response.statusCode == 200) {
    print('Profile updated successfully!');
  } else {
    print('Update failed: \${response.body}');
  }
}
```

**Flutter Example (With Profile Image):**
```dart
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'dart:io';

Future<void> updateProfileWithImage() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('auth_token');

  // Pick image
  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);
  
  if (pickedFile != null) {
    var request = http.MultipartRequest(
      'PUT',
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/update-profile'),
    );

    // Add headers
    request.headers['Authorization'] = 'Bearer \$token';

    // Add text fields
    request.fields['fullName'] = 'Updated Name';
    request.fields['dob'] = '1995-01-15';
    request.fields['address'] = 'New Address';

    // Add image file
    request.files.add(
      await http.MultipartFile.fromPath('profilePick', pickedFile.path),
    );

    var response = await request.send();
    
    if (response.statusCode == 200) {
      print('Profile updated with image!');
    } else {
      print('Update failed');
    }
  }
}
```

---

### 5️⃣ Update Password

**Endpoint:** `https://kkd-backend-api.onrender.com/api/user/update-password`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

**Flutter Example:**
```dart
Future<void> updatePassword() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('auth_token');

  final response = await http.put(
    Uri.parse('https://kkd-backend-api.onrender.com/api/user/update-password'),
    headers: {
      'Authorization': 'Bearer \$token',
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'currentPassword': 'oldpassword123',
      'newPassword': 'newpassword456'
    }),
  );

  if (response.statusCode == 200) {
    print('Password updated successfully!');
  } else {
    print('Password update failed: \${response.body}');
  }
}
```

---

## 📄 Document Upload APIs

### 6️⃣ Upload PAN Card Photo

**Endpoint:** `https://kkd-backend-api.onrender.com/api/user/upload-pan`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data
```

**Form Data:**
- `panPhoto`: Image file (JPG, PNG, PDF - Max 10MB)

**Success Response:**
```json
{
  "success": true,
  "message": "PAN photo uploaded successfully",
  "data": {
    "panPhoto": "https://cloudinary-url...",
    "isPanVerified": false
  }
}
```

**Flutter Example:**
```dart
Future<void> uploadPanPhoto() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('auth_token');

  // Pick image
  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);
  
  if (pickedFile != null) {
    var request = http.MultipartRequest(
      'POST',
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/upload-pan'),
    );

    request.headers['Authorization'] = 'Bearer \$token';
    request.files.add(
      await http.MultipartFile.fromPath('panPhoto', pickedFile.path),
    );

    var response = await request.send();
    
    if (response.statusCode == 200) {
      print('PAN photo uploaded successfully!');
    } else {
      print('Upload failed');
    }
  }
}
```

---

### 7️⃣ Upload Aadhar Card Photo

**Endpoint:** `https://kkd-backend-api.onrender.com/api/user/upload-aadhar`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data
```

**Form Data:**
- `aadharPhoto`: Image file (JPG, PNG, PDF - Max 10MB)

**Success Response:**
```json
{
  "success": true,
  "message": "Aadhar photo uploaded successfully",
  "data": {
    "aadharPhoto": "https://cloudinary-url...",
    "isAadharVerified": false
  }
}
```

**Flutter Example:**
```dart
Future<void> uploadAadharPhoto() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('auth_token');

  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);
  
  if (pickedFile != null) {
    var request = http.MultipartRequest(
      'POST',
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/upload-aadhar'),
    );

    request.headers['Authorization'] = 'Bearer \$token';
    request.files.add(
      await http.MultipartFile.fromPath('aadharPhoto', pickedFile.path),
    );

    var response = await request.send();
    
    if (response.statusCode == 200) {
      print('Aadhar photo uploaded successfully!');
    }
  }
}
```

---

### 8️⃣ Upload Bank Passbook Photo

**Endpoint:** `https://kkd-backend-api.onrender.com/api/user/upload-passbook`

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: multipart/form-data
```

**Form Data:**
- `passbookPhoto`: Image file (JPG, PNG, PDF - Max 10MB)

**Success Response:**
```json
{
  "success": true,
  "message": "Passbook photo uploaded successfully",
  "data": {
    "passbookPhoto": "https://cloudinary-url...",
    "isPassbookVerified": false
  }
}
```

**Flutter Example:**
```dart
Future<void> uploadPassbookPhoto() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('auth_token');

  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);
  
  if (pickedFile != null) {
    var request = http.MultipartRequest(
      'POST',
      Uri.parse('https://kkd-backend-api.onrender.com/api/user/upload-passbook'),
    );

    request.headers['Authorization'] = 'Bearer \$token';
    request.files.add(
      await http.MultipartFile.fromPath('passbookPhoto', pickedFile.path),
    );

    var response = await request.send();
    
    if (response.statusCode == 200) {
      print('Passbook photo uploaded successfully!');
    }
  }
}
```

---

## 📂 Category APIs

### 9️⃣ Get All Categories

**Endpoint:** `https://kkd-backend-api.onrender.com/api/user/get-categories`

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Success Response:**
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012345",
      "categoryName": "Electronics",
      "categoryImage": "https://cloudinary-url...",
      "createdAt": "2023-07-01T10:30:00.000Z",
      "updatedAt": "2023-07-01T10:30:00.000Z"
    },
    {
      "_id": "64a1b2c3d4e5f6789012346",
      "categoryName": "Fashion",
      "categoryImage": "https://cloudinary-url...",
      "createdAt": "2023-07-01T11:00:00.000Z",
      "updatedAt": "2023-07-01T11:00:00.000Z"
    }
  ]
}
```

**Flutter Example:**
```dart
Future<void> getCategories() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString('auth_token');

  final response = await http.get(
    Uri.parse('https://kkd-backend-api.onrender.com/api/user/get-categories'),
    headers: {
      'Authorization': 'Bearer \$token',
      'Content-Type': 'application/json',
    },
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    List categories = data['data'];
    print('Categories: \$categories');
  } else {
    print('Failed to get categories: \${response.body}');
  }
}
```

---

## 🔧 Admin APIs (Optional)

### Admin Login

**Endpoint:** `https://kkd-backend-api.onrender.com/api/admin/login`

**Request Body:**
```json
{
  "emailOrPhone": "admin@example.com",
  "password": "admin_password"
}
```

### Add Category (Admin)

**Endpoint:** `https://kkd-backend-api.onrender.com/api/admin/add-category`

**Form Data:**
- `categoryName`: String
- `categoryImage`: Image file (Max 5MB)

### Get All Categories (Admin)

**Endpoint:** `https://kkd-backend-api.onrender.com/api/admin/categories`

### Delete Category (Admin)

**Endpoint:** `https://kkd-backend-api.onrender.com/api/admin/delete-category/:id`

---

## 📱 Flutter Setup

### Required Packages

Add these to your `pubspec.yaml`:

```yaml
dependencies:
  http: ^1.1.0
  shared_preferences: ^2.2.2
  image_picker: ^1.0.4
```

Install packages:
```bash
flutter pub get
```

### Complete Flutter Service Class

```dart
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'https://kkd-backend-api.onrender.com';
  
  // Get stored token
  Future<String?> getToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('auth_token');
  }
  
  // Save token
  Future<void> saveToken(String token) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
  }
  
  // User Signup
  Future<Map<String, dynamic>> signup({
    required String fullName,
    required String phone,
    required String email,
    required String password,
  }) async {
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
  }
  
  // User Login
  Future<Map<String, dynamic>> login({
    required String identifier,
    required String password,
  }) async {
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
  }
  
  // Get User Profile
  Future<Map<String, dynamic>> getUserProfile() async {
    String? token = await getToken();
    
    final response = await http.get(
      Uri.parse('\$baseUrl/api/user/get-user'),
      headers: {
        'Authorization': 'Bearer \$token',
        'Content-Type': 'application/json',
      },
    );
    
    return jsonDecode(response.body);
  }
  
  // Update Profile
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
    String? token = await getToken();
    
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
      final response = await http.put(
        Uri.parse('\$baseUrl/api/user/update-profile'),
        headers: {
          'Authorization': 'Bearer \$token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          if (fullName != null) 'fullName': fullName,
          if (dob != null) 'dob': dob,
          if (address != null) 'address': address,
          if (pinCode != null) 'pinCode': pinCode,
          if (state != null) 'state': state,
          if (country != null) 'country': country,
          if (accountNumber != null) 'accountNumber': accountNumber,
          if (accountHolderName != null) 'accountHolderName': accountHolderName,
          if (bankName != null) 'bankName': bankName,
          if (ifscCode != null) 'ifscCode': ifscCode,
        }),
      );
      
      return jsonDecode(response.body);
    }
  }
  
  // Upload Document
  Future<Map<String, dynamic>> uploadDocument({
    required String documentType, // 'pan', 'aadhar', 'passbook'
    required File documentFile,
  }) async {
    String? token = await getToken();
    
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
  }
  
  // Get Categories
  Future<Map<String, dynamic>> getCategories() async {
    String? token = await getToken();
    
    final response = await http.get(
      Uri.parse('\$baseUrl/api/user/get-categories'),
      headers: {
        'Authorization': 'Bearer \$token',
        'Content-Type': 'application/json',
      },
    );
    
    return jsonDecode(response.body);
  }
}
```

---

## ⚠️ Error Handling

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
  "message": "All fields are required"
}
```

**409 Conflict:**
```json
{
  "success": false,
  "message": "Email or Phone already registered"
}
```

### Flutter Error Handling Example

```dart
Future<void> handleApiCall() async {
  try {
    final response = await apiService.getUserProfile();
    
    if (response['success'] == true) {
      // Success - use response['data']
      print('Success: \${response['data']}');
    } else {
      // API returned error
      print('API Error: \${response['message']}');
    }
  } catch (e) {
    // Network or other error
    print('Network Error: \$e');
  }
}
```

---

## 📌 Important Notes

### 🔐 Security Best Practices
- **Always store tokens securely** using `SharedPreferences` or `flutter_secure_storage`
- **Never hardcode API credentials** in your app
- **Handle token expiration** gracefully by redirecting to login
- **Validate user input** before sending to API

### 📱 File Upload Guidelines
- **Profile Images**: Max 5MB (JPG, PNG, WebP, AVIF)
- **Documents**: Max 10MB (JPG, PNG, PDF)
- **Always check file size** before uploading
- **Show upload progress** for better UX

### 🌐 Network Handling
- **Handle network timeouts** appropriately
- **Show loading indicators** during API calls
- **Cache data locally** when possible
- **Implement retry logic** for failed requests

### 🔄 Token Management
- **Check token validity** before making authenticated requests
- **Refresh tokens** when they expire
- **Clear tokens** on logout
- **Handle multiple device login** scenarios

---

## 🔗 Testing & Resources

### Postman Collection
👉 [Test APIs on Postman](https://express-flutter-devs.postman.co/workspace/express-%252B-flutter-devs-Workspac~c8483be6-d1e5-4e20-8cde-5ea1e8a946fe/collection/26812494-b0ca2371-2cab-43e1-9f60-83e84f4fc23f?action=share&source=copy-link&creator=26812494)

### Base URL
```
https://kkd-backend-api.onrender.com
```

### Useful Flutter Packages
```yaml
dependencies:
  http: ^1.1.0                    # HTTP requests
  shared_preferences: ^2.2.2      # Local storage
  image_picker: ^1.0.4           # Image selection
  flutter_secure_storage: ^9.0.0  # Secure token storage
  cached_network_image: ^3.3.0   # Image caching
  dio: ^5.3.2                    # Advanced HTTP client (alternative)
```

---

## 🙌 Made with ❤️ by Ravish

**Happy Coding! 🚀**

*For any issues or questions, please refer to the Postman collection or contact the development team.*
```

This comprehensive guide includes:

✅ **Complete API documentation** with all your new endpoints  
✅ **Step-by-step Flutter examples** for beginners  
✅ **File upload examples** with proper multipart handling  
✅ **Complete service class** ready to use  
✅ **Error handling** examples and best practices  
✅ **Security guidelines** for token management  
✅ **Professional formatting** with clear sections  

The guide is beginner-friendly while being comprehensive enough for production use! 🚀

