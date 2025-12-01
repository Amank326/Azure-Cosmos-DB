# ⚡ Quick Reference - Commands & Examples

Quick lookup for common commands and API calls.

## 🚀 Setup Commands

```bash
# Clone repository
git clone https://github.com/Amank326/Azure-Cosmos-DB.git
cd Azure-Cosmos-DB

# Create virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac

# Install dependencies
cd students-CRUD-mockAPIs
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run app
python app.py

# Load sample data
python seed_data.py
```

---

## 🌐 API Endpoints Quick Lookup

```
✅ GET    http://127.0.0.1:8000/                    Health check
✅ GET    http://127.0.0.1:8000/students           Get all students
✅ GET    http://127.0.0.1:8000/student/U001       Get single student
✅ POST   http://127.0.0.1:8000/student            Create student
✅ PUT    http://127.0.0.1:8000/student/U001       Update student
✅ DELETE http://127.0.0.1:8000/student/U001       Delete student
```

---

## 📋 cURL Examples

### Get All Students
```bash
curl http://127.0.0.1:8000/students
```

### Get Single Student
```bash
curl http://127.0.0.1:8000/student/U001
```

### Create Student
```bash
curl -X POST http://127.0.0.1:8000/student \
  -H "Content-Type: application/json" \
  -d '{"roll":"U006","name":"John","branch":"CSE","gpa":8.5}'
```

### Update Student (GPA)
```bash
curl -X PUT http://127.0.0.1:8000/student/U001 \
  -H "Content-Type: application/json" \
  -d '{"gpa":9.0}'
```

### Update Student (Name)
```bash
curl -X PUT http://127.0.0.1:8000/student/U001 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'
```

### Delete Student
```bash
curl -X DELETE http://127.0.0.1:8000/student/U001
```

---

## 🧪 Testing Workflow

```bash
# 1. Start server
python app.py

# 2. In another terminal, load data
python seed_data.py

# 3. Get all students
curl http://127.0.0.1:8000/students

# 4. Get one student
curl http://127.0.0.1:8000/student/U001

# 5. Create new student
curl -X POST http://127.0.0.1:8000/student \
  -H "Content-Type: application/json" \
  -d '{"roll":"U100","name":"Test","branch":"IT","gpa":8.0}'

# 6. Update that student
curl -X PUT http://127.0.0.1:8000/student/U100 \
  -H "Content-Type: application/json" \
  -d '{"gpa":9.0}'

# 7. Delete that student
curl -X DELETE http://127.0.0.1:8000/student/U100
```

---

## 📁 Project Structure

```
Azure-Cosmos-DB/
├── README.md                    # Project overview
├── SETUP.md                     # Setup guide
├── API_DOCUMENTATION.md         # Full API docs
├── QUICK_REFERENCE.md           # This file
├── .env.example                 # Env template
├── .gitignore                   # Git ignore
├── requirements.txt             # Root dependencies
└── students-CRUD-mockAPIs/
    ├── app.py                   # Flask API
    ├── connect.py               # DB connection
    ├── seed_data.py             # Sample data
    ├── requirements.txt         # App dependencies
    ├── runtime.txt              # Python version
    └── README.md                # App-specific guide
```

---

## 🔐 Environment Variables

```
COSMOS_URI=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-primary-key
DATABASE_NAME=rungta
CONTAINER_NAME=student
FLASK_ENV=development
FLASK_DEBUG=True
```

---

## 📊 Student Record Format

```json
{
  "id": "U001",
  "roll": "U001",
  "name": "Aman Sharma",
  "branch": "CSE",
  "gpa": 8.5
}
```

**Valid Branches:**
- CSE (Computer Science)
- ECE (Electronics)
- ME (Mechanical)
- IT (Information Technology)
- CE (Civil)

**GPA Range:** 0.0 - 10.0

---

## 🎯 Common Tasks

### Check if server is running
```bash
curl http://127.0.0.1:8000/
```

### Count total students
```bash
curl http://127.0.0.1:8000/students | grep -o '"count":[0-9]*'
```

### Find student by roll
```bash
curl http://127.0.0.1:8000/student/U001
```

### Create student with highest GPA
```bash
curl -X POST http://127.0.0.1:8000/student \
  -H "Content-Type: application/json" \
  -d '{"roll":"TOPPER","name":"Topper","branch":"CSE","gpa":10.0}'
```

### Bulk delete test students
```bash
for i in {1..5}; do
  curl -X DELETE http://127.0.0.1:8000/student/TEST$i
done
```

---

## ⚠️ Troubleshooting

### Port already in use
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Module not found
```bash
pip install -r requirements.txt
```

### Connection error
- Check .env has correct credentials
- Verify Cosmos DB is running
- Check internet connection

### Permission denied
```bash
# On Linux/Mac
chmod +x app.py
```

---

## 📚 File Descriptions

| File | Purpose | Size |
|------|---------|------|
| `app.py` | Main Flask API | ~233 lines |
| `connect.py` | Cosmos DB setup | ~31 lines |
| `seed_data.py` | Load sample data | ~50 lines |
| `requirements.txt` | Dependencies | 4 packages |
| `.env.example` | Config template | 7 lines |
| `README.md` | Project overview | ~150 lines |
| `SETUP.md` | Setup guide | ~370 lines |
| `API_DOCUMENTATION.md` | Complete API ref | ~520 lines |

---

## 🔗 Useful Links

- **Repository**: https://github.com/Amank326/Azure-Cosmos-DB
- **Flask Docs**: https://flask.palletsprojects.com/
- **Azure Cosmos DB**: https://docs.microsoft.com/azure/cosmos-db/
- **Python**: https://www.python.org/
- **Postman**: https://www.postman.com/

---

## 📞 Support

- Check SETUP.md for detailed setup
- See API_DOCUMENTATION.md for API details
- Open an issue on GitHub
- Email: Check repository

---

**Last Updated:** December 2025  
**Version:** 1.0
