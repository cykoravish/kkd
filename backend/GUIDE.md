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

### 📂 Category APIs

| Method | Endpoint                   | Description        | Auth Required |
| :----- | :------------------------- | :----------------- | :------------ |
| `GET`  | `/api/user/get-categories` | Get all categories | ✅ Yes        |

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
      "createdAt": "2023-07-01T10:30:00.000Z",
      "updatedAt": "2023-07-01T10:30:00.000Z"
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

    // 🚀 NEW: Status-based verification system
    "panPhoto": "https://cloudinary-url...",
    "panVerificationStatus": "verified",
    "panRejectionReason": "",

    "aadharPhoto": "https://cloudinary-url...",
    "aadharVerificationStatus": "processing",
    "aadharRejectionReason": "",

    "passbookPhoto": "https://cloudinary-url...",
    "passbookVerificationStatus": "rejected",
    "passbookRejectionReason": "Document is not clear, please upload a clearer image",

    // 🚀 NEW: KYC Request System
    "kycStatus": "pending",
    "kycRequestDate": "2023-07-15T10:30:00.000Z",
    "kycApprovalDate": null,
    "kycRejectionReason": "",
    "isProfileComplete": true,

    "productsQrScanned": ["QR123", "QR456"],
    "createdAt": "2023-07-01T10:30:00.000Z",
    "updatedAt": "2023-07-15T14:20:00.000Z"
  }
}
```

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

// 🚀 NEW: Helper functions for status checking
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

    // 🚀 NEW: Check verification statuses
    print('PAN Status: ${getVerificationStatusText(user['panVerificationStatus'])}');
    print('Aadhar Status: ${getVerificationStatusText(user['aadharVerificationStatus'])}');
    print('Passbook Status: ${getVerificationStatusText(user['passbookVerificationStatus'])}');
    print('KYC Status: ${getKYCStatusText(user['kycStatus'])}');

    // Check if any document was rejected
    if (user['panVerificationStatus'] == 'rejected') {
      print('PAN Rejection Reason: ${user['panRejectionReason']}');
    }
    if (user['aadharVerificationStatus'] == 'rejected') {
      print('Aadhar Rejection Reason: ${user['aadharRejectionReason']}');
    }
    if (user['passbookVerificationStatus'] == 'rejected') {
      print('Passbook Rejection Reason: ${user['passbookRejectionReason']}');
    }

    // Check KYC status
    if (user['kycStatus'] == 'rejected') {
      print('KYC Rejection Reason: ${user['kycRejectionReason']}');
    }
  } else {
    print('Error: ${result['message']}');
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

- `userId`, `email`, `phone`, `password`, `coinsEarned`
- `panPhoto`, `aadharPhoto`, `passbookPhoto` (use separate upload endpoints)
- All verification status fields and KYC fields

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

**✅ Success Response (with KYC Auto-trigger):**

```json
{
  "success": true,
  "message": "Profile updated successfully! KYC verification request has been submitted.",
  "data": {
    // Updated user object with all fields
    "userId": "ABC123XYZ456",
    "fullName": "Updated Name",
    // ... other fields
    "kycStatus": "pending",
    "kycRequestDate": "2023-07-15T14:30:00.000Z",
    "isProfileComplete": true
  },
  "kycRequestCreated": true
}
```

**✅ Success Response (without KYC trigger):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    // Updated user object
  },
  "kycRequestCreated": false
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
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(updateData),
    );

    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Profile updated successfully!');

      // 🚀 NEW: Check if KYC request was created
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

      // 🚀 NEW: Check if KYC request was created
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

    // Show KYC notification if applicable
    if (result['kycRequestCreated'] == true) {
      // Show success dialog with KYC info
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text('Profile Complete! 🎉'),
          content: Text('Your profile is now complete and KYC verification request has been submitted. You will be notified once the review is complete.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('OK'),
            ),
          ],
        ),
      );
    }
  } else {
    print('Update failed: ${result['message']}');
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
    print('Password change failed: ${result['message']}');
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

**✅ Success Response (with KYC Auto-trigger):**

```json
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
```

**✅ Success Response (without KYC trigger):**

```json
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

    request.headers['Authorization'] = 'Bearer $token';
    request.files.add(
      await http.MultipartFile.fromPath('panPhoto', panImage.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ PAN photo uploaded successfully!');

      // 🚀 NEW: Check if KYC request was created
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

// Usage Example:
void handlePanUpload() async {
  final picker = ImagePicker();
  final pickedFile = await picker.pickImage(source: ImageSource.gallery);

  if (pickedFile != null) {
    File panFile = File(pickedFile.path);

    final result = await uploadPanPhoto(panFile);

    if (result['success']) {
      print('PAN card uploaded! Status: ${result['data']['panVerificationStatus']}');

      // Show appropriate message based on KYC status
      if (result['kycRequestCreated'] == true) {
        // Show KYC completion dialog
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: Text('Documents Complete! 🎉'),
            content: Text('All your documents have been uploaded and KYC verification is now in progress. You will be notified once the review is complete.'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: Text('OK'),
              ),
            ],
          ),
        );
      } else {
        // Show upload success message
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('PAN card uploaded successfully! ✅'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } else {
      print('Upload failed: ${result['message']}');
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

**✅ Success Response (with KYC Auto-trigger):**

```json
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
```

**✅ Success Response (without KYC trigger):**

```json
{
  "success": true,
  "message": "Aadhar photo uploaded successfully. Verification in progress.",
  "data": {
    "aadharPhoto": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/documents/aadhar/xyz789.jpg",
    "aadharVerificationStatus": "processing",
    "kycStatus": "incomplete"
  },
  "kycRequestCreated": false
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

    request.headers['Authorization'] = 'Bearer $token';
    request.files.add(
      await http.MultipartFile.fromPath('aadharPhoto', aadharImage.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Aadhar photo uploaded successfully!');

      // 🚀 NEW: Check if KYC request was created
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

**✅ Success Response (with KYC Auto-trigger):**

```json
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
```

**✅ Success Response (without KYC trigger):**

```json
{
  "success": true,
  "message": "Passbook photo uploaded successfully. Verification in progress.",
  "data": {
    "passbookPhoto": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kkd/documents/passbook/def456.jpg",
    "passbookVerificationStatus": "processing",
    "kycStatus": "incomplete"
  },
  "kycRequestCreated": false
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

    request.headers['Authorization'] = 'Bearer $token';
    request.files.add(
      await http.MultipartFile.fromPath('passbookPhoto', passbookImage.path),
    );

    var streamedResponse = await request.send();
    var response = await http.Response.fromStream(streamedResponse);
    final data = jsonDecode(response.body);

    if (response.statusCode == 200 && data['success']) {
      print('✅ Passbook photo uploaded successfully!');

      // 🚀 NEW: Check if KYC request was created
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
```

**💡 Document Upload Tips:**

- **File Size**: Keep documents under 10MB for faster upload
- **File Format**: JPG/PNG for images, PDF for scanned documents
- **Image Quality**: Ensure documents are clear and readable
- **Auto KYC**: When profile is complete and all documents are uploaded, KYC request is automatically created
- **Status Tracking**: Use the verification status to show progress to users

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

// Usage Example:
void loadCategories() async {
  final result = await getCategories();

  if (result['success']) {
    List categories = result['data'];

    for (var category in categories) {
      print('Category: ${category['categoryName']}');
      print('Image: ${category['categoryImage']}');
      print('---');
    }
  } else {
    print('Error: ${result['message']}');
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
  http: ^1.1.0 # For API calls
  shared_preferences: ^2.2.2 # For token storage
  image_picker: ^1.0.4 # For image selection
  cached_network_image: ^3.3.0 # For image caching

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

  // 📂 Category APIs
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

  // 🚀 NEW: Helper functions for status checking
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
```

### 🚀 NEW: Enhanced Profile Screen Example

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
          color: _apiService.getStatusColor(status),
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
                          Text('Coins: ${userData!['coinsEarned']}'),
                          Text('User ID: ${userData!['userId']}'),
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
                ],
              ),
            )
          : Center(child: Text('Failed to load profile')),
    );
  }
}
```

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

### 🚀 NEW: KYC & Verification System

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

4. **🚀 NEW: KYC User Experience**
   - ✅ Show clear progress indicators for verification
   - ✅ Notify users when KYC is auto-triggered
   - ✅ Display rejection reasons clearly
   - ✅ Provide guidance for resubmission

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
  http: ^1.1.0 # HTTP requests
  shared_preferences: ^2.2.2 # Local storage
  flutter_secure_storage: ^9.0.0 # Secure token storage

  # Image Handling
  image_picker: ^1.0.4 # Image selection
  cached_network_image: ^3.3.0 # Image caching
  image: ^4.1.3 # Image processing

  # UI & UX
  flutter_spinkit: ^5.2.0 # Loading animations
  fluttertoast: ^8.2.4 # Toast messages

  # Advanced HTTP (Optional)
  dio: ^5.3.2 # Advanced HTTP client
  connectivity_plus: ^5.0.1 # Network connectivity
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
- [ ] 🚀 **NEW:** Implement status-based verification UI
- [ ] 🚀 **NEW:** Handle KYC request notifications
- [ ] 🚀 **NEW:** Show document rejection reasons
- [ ] 🚀 **NEW:** Add profile completion tracking

---

## 🆕 What's New in This Version

### ✅ **Status-Based Verification System**

- Replaced boolean verification flags with status-based system
- Four status values: `incomplete`, `processing`, `verified`, `rejected`
- Added rejection reason fields for each document type

### ✅ **KYC Request System**

- Automatic KYC request creation when profile is complete
- KYC status tracking: `incomplete`, `pending`, `approved`, `rejected`
- KYC request date and approval date tracking
- KYC rejection reasons

### ✅ **Enhanced API Responses**

- Added `kycRequestCreated` flag in responses
- Enhanced success messages with KYC information
- More detailed user profile data

### ✅ **Improved Flutter Integration**

- Updated API service class with new fields
- Added helper functions for status display
- Enhanced error handling for new fields
- Better UI examples for verification status

---

## 🙌 Made with ❤️ by Ravish

**Happy Coding! 🚀**

_This documentation covers all user APIs for the KKD mobile app with the latest KYC and verification system updates. For any issues or questions, please refer to the Postman collection or contact the development team._

---

**📞 Support:** For technical support or API issues, please contact the development team.  
**🔄 Updates:** This documentation will be updated as new features are added to the API.
