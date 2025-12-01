# 📋 Setup Guide - Azure Cosmos DB Student CRUD API

## Complete Step-by-Step Setup Instructions

### Part 1: Prerequisites ✅

Before starting, ensure you have:

1. **Python 3.9 or higher**
   ```bash
   python --version
   ```

2. **Git installed**
   ```bash
   git --version
   ```

3. **Azure Cosmos DB Account**
   - Create at: https://portal.azure.com
   - Get your URI and Primary Key

4. **Text Editor or IDE** (VS Code recommended)
   - Download: https://code.visualstudio.com/

---

### Part 2: Clone & Environment Setup 🔧

#### Step 2.1: Clone Repository
```bash
git clone https://github.com/Amank326/Azure-Cosmos-DB.git
cd Azure-Cosmos-DB
```

#### Step 2.2: Create Virtual Environment
```powershell
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/Mac
python3 -m venv .venv
source .venv/bin/activate
```

#### Step 2.3: Install Dependencies
```bash
cd students-CRUD-mockAPIs
pip install -r requirements.txt
```

Expected output:
```
Successfully installed flask flask-cors azure-cosmos python-dotenv ...
```

---

### Part 3: Azure Cosmos DB Configuration 🔐

#### Step 3.1: Get Cosmos DB Credentials

1. Go to Azure Portal
2. Find your Cosmos DB account
3. Copy the following:
   - **URI** (URL)
   - **Primary Key** (Connection String)
   - **Database Name** (rungta)
   - **Container Name** (student)

#### Step 3.2: Create .env File

```bash
# From the root directory
copy .env.example .env  # Windows
cp .env.example .env    # Linux/Mac
```

#### Step 3.3: Edit .env with Your Credentials

Open `.env` and update:
```
COSMOS_URI=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-actual-primary-key-here
DATABASE_NAME=rungta
CONTAINER_NAME=student
FLASK_ENV=development
FLASK_DEBUG=True
```

---

### Part 4: Run Application 🚀

#### Step 4.1: Start Flask Server
```bash
cd students-CRUD-mockAPIs
python app.py
```

#### Expected Output:
```
✔ Connected to Cosmos DB
✔ Database & container ready
 * Running on http://127.0.0.1:8000
 * Debug mode: on
```

#### Step 4.2: Verify Server is Running
Open browser: `http://127.0.0.1:8000`

You should see:
```json
{
  "message": "Student Mock API Service",
  "status": "running",
  "endpoints": {...}
}
```

---

### Part 5: Load Sample Data 📊

#### Step 5.1: Run Seed Script
Open another terminal:
```bash
cd students-CRUD-mockAPIs
.venv\Scripts\activate  # Windows or appropriate activate
python seed_data.py
```

#### Expected Output:
```
✔ Loading sample students...
✔ Student 1 created: U001
✔ Student 2 created: U002
...
✔ 5 students loaded successfully
```

---

### Part 6: Test API Endpoints 🧪

#### Option A: Using Browser (GET requests only)

1. **Get All Students**
   ```
   http://127.0.0.1:8000/students
   ```

2. **Get Single Student**
   ```
   http://127.0.0.1:8000/student/U001
   ```

#### Option B: Using Postman (Recommended)

1. **Download Postman**: https://www.postman.com/downloads/
2. **Import Collection**: File → Import → Select `postman_collection.json`
3. **Set Environment**: Select your environment
4. **Run Requests**: Click on each endpoint to test

#### Option C: Using cURL

**Get All Students:**
```bash
curl http://127.0.0.1:8000/students
```

**Create Student:**
```bash
curl -X POST http://127.0.0.1:8000/student \
  -H "Content-Type: application/json" \
  -d '{
    "roll": "U006",
    "name": "New Student",
    "branch": "CSE",
    "gpa": 8.0
  }'
```

**Update Student:**
```bash
curl -X PUT http://127.0.0.1:8000/student/U001 \
  -H "Content-Type: application/json" \
  -d '{"gpa": 9.5}'
```

**Delete Student:**
```bash
curl -X DELETE http://127.0.0.1:8000/student/U001
```

---

### Part 7: API Response Examples 📝

#### Success Response
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
    }
  ]
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Student not found"
}
```

---

### Part 8: Troubleshooting 🛠️

#### Issue: "Module not found: azure.cosmos"
**Solution:**
```bash
pip install azure-cosmos
```

#### Issue: "Connection failed to Cosmos DB"
**Solution:**
- Check .env file has correct credentials
- Verify Cosmos DB account is active
- Check internet connection

#### Issue: "Port 8000 already in use"
**Solution:**
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

#### Issue: "Virtual environment not activating"
**Solution:**
```bash
# Create new venv
python -m venv .venv
.venv\Scripts\activate
```

---

### Part 9: Project Structure Explanation 📁

```
Azure-Cosmos-DB/
│
├── 📄 README.md                  ← Start here!
├── 📄 SETUP.md                   ← This file
├── 📄 .env.example               ← Copy to .env
├── 📄 .gitignore                 ← Git ignore patterns
├── 📄 requirements.txt           ← Python dependencies
│
└── students-CRUD-mockAPIs/       ← Main application
    ├── 📄 app.py                 ← Flask REST API
    ├── 📄 connect.py             ← Cosmos DB connection
    ├── 📄 seed_data.py           ← Load sample data
    ├── 📄 requirements.txt       ← App dependencies
    ├── 📄 runtime.txt            ← Python version
    ├── 📄 README.md              ← App-specific guide
    └── .github/
        └── workflows/            ← CI/CD pipelines
```

---

### Part 10: Next Steps 🎯

1. ✅ Complete setup above
2. ✅ Load sample data
3. ✅ Test all endpoints using Postman
4. ✅ Read API_DOCUMENTATION.md for detailed endpoint info
5. ✅ Customize app.py for your needs
6. ✅ Deploy to Azure (see DEPLOYMENT.md)

---

### Part 11: File Reference 📚

**Core Application Files:**

| File | Purpose |
|------|---------|
| `app.py` | Main Flask application with 6 endpoints |
| `connect.py` | Azure Cosmos DB connection setup |
| `seed_data.py` | Loads 5 sample students into database |
| `requirements.txt` | Python package dependencies |
| `runtime.txt` | Python version specification |

**Configuration Files:**

| File | Purpose |
|------|---------|
| `.env` | Your secret credentials (create from .env.example) |
| `.env.example` | Template for .env file |
| `.gitignore` | Files to exclude from git |

**Documentation Files:**

| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `SETUP.md` | This setup guide |
| `API_DOCUMENTATION.md` | Complete API reference |

---

### Part 12: Common Commands Reference 🔍

```bash
# Activate virtual environment
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac

# Deactivate virtual environment
deactivate

# Install packages
pip install -r requirements.txt

# Run Flask app
python app.py

# Load sample data
python seed_data.py

# Run tests
pytest tests/

# Check Python version
python --version

# Check installed packages
pip list
```

---

### Part 13: Getting Help 💬

**If you face any issues:**

1. Check this SETUP.md file
2. Review troubleshooting section
3. Open an issue on GitHub: https://github.com/Amank326/Azure-Cosmos-DB/issues
4. Check Flask documentation: https://flask.palletsprojects.com/
5. Check Azure Cosmos DB docs: https://docs.microsoft.com/azure/cosmos-db/

---

**Happy Coding! 🚀**

Last Updated: December 2025
