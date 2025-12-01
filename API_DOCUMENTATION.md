# 📚 API Documentation - Student CRUD API

## Complete API Reference Guide

---

## 🌐 Base URL

```
http://127.0.0.1:8000
```

---

## 📋 API Endpoints Summary

| # | Method | Endpoint | Description |
|----|--------|----------|-------------|
| 1 | GET | `/` | Health check - API status |
| 2 | GET | `/students` | Get all students |
| 3 | GET | `/student/<roll>` | Get student by roll number |
| 4 | POST | `/student` | Create new student |
| 5 | PUT | `/student/<roll>` | Update student data |
| 6 | DELETE | `/student/<roll>` | Delete student |

---

## 🔍 Detailed Endpoint Documentation

### 1️⃣ GET / - Health Check

**Purpose:** Check if API is running

**URL:**
```
GET http://127.0.0.1:8000/
```

**Parameters:** None

**Response (200 OK):**
```json
{
  "message": "Student Mock API Service",
  "status": "running",
  "endpoints": {
    "GET /students": "Get all students",
    "GET /students/<id>": "Get student by id",
    "POST /students": "Create new student",
    "PUT /students/<id>": "Update student",
    "DELETE /students/<id>": "Delete student"
  }
}
```

**Example:**
```bash
curl http://127.0.0.1:8000/
```

---

### 2️⃣ GET /students - Get All Students

**Purpose:** Retrieve all students from database

**URL:**
```
GET http://127.0.0.1:8000/students
```

**Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "students": [
    {
      "id": "U001",
      "roll": "U001",
      "name": "Aman Sharma",
      "branch": "CSE",
      "gpa": 8.5
    },
    {
      "id": "U002",
      "roll": "U002",
      "name": "Priya Singh",
      "branch": "ECE",
      "gpa": 9.0
    }
  ]
}
```

**Example:**
```bash
curl http://127.0.0.1:8000/students
```

**Postman:**
- Method: GET
- URL: http://127.0.0.1:8000/students

---

### 3️⃣ GET /student/<roll> - Get Single Student

**Purpose:** Retrieve specific student by roll number

**URL:**
```
GET http://127.0.0.1:8000/student/{roll_number}
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| roll | string | Yes | Student roll number (e.g., "U001") |

**Response (200 OK):**
```json
{
  "success": true,
  "student": {
    "id": "U001",
    "roll": "U001",
    "name": "Aman Sharma",
    "branch": "CSE",
    "gpa": 8.5
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Student not found"
}
```

**Example:**
```bash
curl http://127.0.0.1:8000/student/U001
```

**Postman:**
- Method: GET
- URL: http://127.0.0.1:8000/student/U001

---

### 4️⃣ POST /student - Create New Student

**Purpose:** Create a new student record

**URL:**
```
POST http://127.0.0.1:8000/student
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "roll": "U006",
  "name": "New Student",
  "branch": "CSE",
  "gpa": 8.5
}
```

**Request Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| roll | string | Yes | Unique roll number |
| name | string | Yes | Student name |
| branch | string | Yes | Branch (CSE, ECE, ME, etc.) |
| gpa | number | Yes | GPA (0.0 - 10.0) |

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "student": {
    "id": "U006",
    "roll": "U006",
    "name": "New Student",
    "branch": "CSE",
    "gpa": 8.5
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Roll number already exists"
}
```

**Example - cURL:**
```bash
curl -X POST http://127.0.0.1:8000/student \
  -H "Content-Type: application/json" \
  -d '{
    "roll": "U006",
    "name": "Rajesh Kumar",
    "branch": "CSE",
    "gpa": 8.5
  }'
```

**Example - Postman:**
1. Method: POST
2. URL: http://127.0.0.1:8000/student
3. Headers: Content-Type: application/json
4. Body (Raw JSON):
```json
{
  "roll": "U006",
  "name": "Rajesh Kumar",
  "branch": "CSE",
  "gpa": 8.5
}
```

---

### 5️⃣ PUT /student/<roll> - Update Student

**Purpose:** Update an existing student's information

**URL:**
```
PUT http://127.0.0.1:8000/student/{roll_number}
```

**Headers:**
```
Content-Type: application/json
```

**URL Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| roll | string | Yes | Student roll number to update |

**Request Body (partial update):**
```json
{
  "name": "Updated Name",
  "gpa": 9.0
}
```

**Allowed Fields to Update:**
- `name` - Student name
- `branch` - Student branch
- `gpa` - Student GPA

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "student": {
    "id": "U001",
    "roll": "U001",
    "name": "Updated Name",
    "branch": "CSE",
    "gpa": 9.0
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Student not found"
}
```

**Example - cURL:**
```bash
curl -X PUT http://127.0.0.1:8000/student/U001 \
  -H "Content-Type: application/json" \
  -d '{
    "gpa": 9.0,
    "name": "Aman Sharma Updated"
  }'
```

**Example - Postman:**
1. Method: PUT
2. URL: http://127.0.0.1:8000/student/U001
3. Headers: Content-Type: application/json
4. Body (Raw JSON):
```json
{
  "name": "Aman Sharma Updated",
  "gpa": 9.0
}
```

---

### 6️⃣ DELETE /student/<roll> - Delete Student

**Purpose:** Delete a student record

**URL:**
```
DELETE http://127.0.0.1:8000/student/{roll_number}
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| roll | string | Yes | Student roll number to delete |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Student not found"
}
```

**Example - cURL:**
```bash
curl -X DELETE http://127.0.0.1:8000/student/U001
```

**Example - Postman:**
1. Method: DELETE
2. URL: http://127.0.0.1:8000/student/U001

---

## 🧪 Testing Scenarios

### Scenario 1: Create and Retrieve Student

**Step 1: Create Student**
```bash
curl -X POST http://127.0.0.1:8000/student \
  -H "Content-Type: application/json" \
  -d '{
    "roll": "U010",
    "name": "Test Student",
    "branch": "IT",
    "gpa": 7.8
  }'
```

**Step 2: Retrieve Student**
```bash
curl http://127.0.0.1:8000/student/U010
```

**Step 3: Update Student**
```bash
curl -X PUT http://127.0.0.1:8000/student/U010 \
  -H "Content-Type: application/json" \
  -d '{"gpa": 8.5}'
```

**Step 4: Delete Student**
```bash
curl -X DELETE http://127.0.0.1:8000/student/U010
```

---

### Scenario 2: Bulk Operations

**Get All Students:**
```bash
curl http://127.0.0.1:8000/students
```

**Create Multiple Students:**
```bash
# Student 1
curl -X POST http://127.0.0.1:8000/student \
  -H "Content-Type: application/json" \
  -d '{"roll":"B001","name":"Batch One","branch":"CSE","gpa":8.0}'

# Student 2
curl -X POST http://127.0.0.1:8000/student \
  -H "Content-Type: application/json" \
  -d '{"roll":"B002","name":"Batch Two","branch":"ECE","gpa":8.5}'
```

---

## ⚠️ Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Missing required fields: name, branch, gpa"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Student not found"
}
```

**409 Conflict:**
```json
{
  "success": false,
  "error": "Roll number already exists"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Database connection error"
}
```

---

## 📊 Response Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Student successfully created (POST) |
| 400 | Bad Request | Missing/invalid request data |
| 404 | Not Found | Student doesn't exist |
| 409 | Conflict | Duplicate roll number |
| 500 | Server Error | Database/internal error |

---

## 💡 Best Practices

1. **Always include Content-Type header for POST/PUT**
   ```
   Content-Type: application/json
   ```

2. **Validate data before sending:**
   - Roll number is unique
   - GPA is between 0.0 and 10.0
   - Name and branch are not empty

3. **Use descriptive roll numbers:**
   - ✅ `U001`, `CSE01`, `2024001`
   - ❌ `1`, `abc`, `@#$`

4. **Handle errors gracefully:**
   - Check `success` field in response
   - Log error messages for debugging

5. **Test all endpoints** before deployment

---

## 🔗 Related Documentation

- See `SETUP.md` for installation instructions
- See `README.md` for project overview
- See `QUICK_REFERENCE.md` for quick command lookup

---

## 📝 Sample Data Structure

Each student record contains:

```json
{
  "id": "unique-cosmos-id",
  "roll": "unique-roll-number",
  "name": "Full Name",
  "branch": "Department/Branch",
  "gpa": 8.5
}
```

### Sample Students:
- U001: Aman Sharma (CSE, 8.5)
- U002: Priya Singh (ECE, 9.0)
- U003: Rajesh Kumar (ME, 7.8)
- U004: Sneha Desai (IT, 8.9)
- U005: Vikram Patel (CSE, 8.2)

---

**Last Updated:** December 2025  
**Version:** 1.0  
**Status:** Production Ready
