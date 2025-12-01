# 🛠️ Troubleshooting Guide

## Common Issues & Solutions

---

## 🔴 Installation Issues

### Issue 1: "No module named 'flask'"

**Symptoms:**
```
ModuleNotFoundError: No module named 'flask'
```

**Causes:**
- Flask not installed
- Wrong Python environment
- Virtual environment not activated

**Solutions:**

✅ **Solution 1: Install Flask**
```bash
pip install Flask
```

✅ **Solution 2: Check if venv is activated**
```bash
# Windows
.venv\Scripts\activate

# Linux/Mac
source .venv/bin/activate
```

✅ **Solution 3: Install all requirements**
```bash
pip install -r requirements.txt
```

✅ **Solution 4: Use Python 3**
```bash
python3 -m pip install Flask
```

---

### Issue 2: "Permission denied" on Windows

**Symptoms:**
```
ERROR: Could not install packages due to EnvironmentError: [WinError 5] Access is denied
```

**Causes:**
- Insufficient permissions
- Python installed in system directory
- Antivirus blocking

**Solutions:**

✅ **Solution 1: Use --user flag**
```bash
pip install --user Flask
pip install --user -r requirements.txt
```

✅ **Solution 2: Run as Administrator**
- Open Command Prompt as Administrator
- Reinstall packages

✅ **Solution 3: Upgrade pip**
```bash
python -m pip install --upgrade pip
pip install Flask
```

---

### Issue 3: "Wheel is not compatible"

**Symptoms:**
```
ERROR: something-1.0-py3-none-win_amd64.whl is not compatible with this Python
```

**Causes:**
- Python version mismatch
- 32-bit vs 64-bit mismatch
- Outdated pip

**Solutions:**

✅ **Solution 1: Upgrade pip and setuptools**
```bash
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

✅ **Solution 2: Check Python version**
```bash
python --version  # Should be 3.9+
```

✅ **Solution 3: Check if 32-bit or 64-bit**
```bash
python -c "import struct; print(struct.calcsize('P') * 8)"
# Output: 64 (64-bit) or 32 (32-bit)
```

---

## 🔴 Runtime Issues

### Issue 4: "Port 8000 already in use"

**Symptoms:**
```
OSError: [Errno 48] Address already in use
```

**Causes:**
- Another process using port 8000
- Previous Flask instance still running
- Port not released after crash

**Solutions:**

✅ **Solution 1: Kill process using port**
```powershell
# Windows - Find process
netstat -ano | findstr :8000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Example: taskkill /PID 5432 /F
```

✅ **Solution 2: Change Flask port**
```python
# In app.py, modify the run command
if __name__ == '__main__':
    app.run(port=8001)  # Use different port
```

✅ **Solution 3: Wait and retry**
```bash
# Wait 30 seconds
timeout /t 30

# Then run app again
python app.py
```

---

### Issue 5: "Cannot connect to Cosmos DB"

**Symptoms:**
```
CosmosHttpResponseError: Unauthorized
or
ConnectionError: Failed to establish connection
```

**Causes:**
- Invalid credentials in .env
- Cosmos DB account inactive
- Network issues
- Incorrect URI/key

**Solutions:**

✅ **Solution 1: Verify .env file**
```bash
# Check .env exists in students-CRUD-mockAPIs folder
cat .env  # Linux/Mac
type .env  # Windows

# Should contain:
# COSMOS_URI=https://...
# COSMOS_KEY=...
```

✅ **Solution 2: Verify credentials**
```bash
# Get from Azure Portal
# 1. Go to Azure Portal
# 2. Find Cosmos DB account
# 3. Copy URL and Primary Key
# 4. Update .env
```

✅ **Solution 3: Test connection**
```python
# In connect.py
from connect import connect_cosmos
try:
    container = connect_cosmos()
    print("✅ Connected successfully!")
except Exception as e:
    print(f"❌ Connection failed: {e}")
```

✅ **Solution 4: Check network**
```bash
# Verify internet connection
ping google.com

# Test Azure connectivity
ping amandb.documents.azure.com
```

---

### Issue 6: "Module not found: azure.cosmos"

**Symptoms:**
```
ModuleNotFoundError: No module named 'azure.cosmos'
```

**Causes:**
- Azure SDK not installed
- Using wrong virtual environment
- Installation failed

**Solutions:**

✅ **Solution 1: Install Azure SDK**
```bash
pip install azure-cosmos
```

✅ **Solution 2: Install all dependencies**
```bash
pip install -r requirements.txt
```

✅ **Solution 3: Verify installation**
```bash
python -c "import azure.cosmos; print('Azure Cosmos installed')"
```

---

## 🔴 API Issues

### Issue 7: "GET /students returns empty"

**Symptoms:**
```json
{
  "success": true,
  "count": 0,
  "students": []
}
```

**Causes:**
- No data loaded
- Seed script not run
- Database connection issue

**Solutions:**

✅ **Solution 1: Load sample data**
```bash
cd students-CRUD-mockAPIs
python seed_data.py
```

✅ **Solution 2: Check if connection works**
```bash
curl http://127.0.0.1:8000/
# Should return healthy response
```

✅ **Solution 3: Verify database**
```bash
# In Azure Portal
# Check students database exists
# Check student container has items
```

---

### Issue 8: "404 Not Found" for endpoints

**Symptoms:**
```
404 Not Found
The requested URL / was not found on this server.
```

**Causes:**
- Wrong URL
- Server not running
- Typo in endpoint

**Solutions:**

✅ **Solution 1: Verify server is running**
```bash
# Should see:
# * Running on http://127.0.0.1:8000
```

✅ **Solution 2: Check URL**
```bash
# Correct: http://127.0.0.1:8000/students
# Incorrect: http://127.0.0.1:8000/students/
# Wrong: http://127.0.0.1:8000/student
```

✅ **Solution 3: Test home endpoint**
```bash
curl http://127.0.0.1:8000/
```

---

### Issue 9: "POST request returns 400 Bad Request"

**Symptoms:**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

**Causes:**
- Missing required fields
- Wrong data type
- Invalid JSON

**Solutions:**

✅ **Solution 1: Check request format**
```bash
# Correct format
curl -X POST http://127.0.0.1:8000/student \
  -H "Content-Type: application/json" \
  -d '{
    "roll": "U001",
    "name": "Student",
    "branch": "CSE",
    "gpa": 8.5
  }'
```

✅ **Solution 2: Verify all fields present**
```json
// Required fields:
{
  "roll": "string",        // unique
  "name": "string",        // required
  "branch": "string",      // CSE, ECE, ME, IT, CE
  "gpa": number            // 0.0 - 10.0
}
```

✅ **Solution 3: Test with Postman**
- Open Postman
- Set method to POST
- Add headers: Content-Type: application/json
- Add raw JSON body
- Send request

---

### Issue 10: "201 Created but student not found"

**Symptoms:**
```
Student created but GET returns 404
```

**Causes:**
- Database write delay
- Cosmos DB latency
- Partition key issue

**Solutions:**

✅ **Solution 1: Wait and retry**
```bash
# Created successfully, wait 2-3 seconds
sleep 3
curl http://127.0.0.1:8000/students
```

✅ **Solution 2: Check partition key**
```python
# Verify partition key in connect.py
partition_key = PartitionKey(path="/branch")
# Branch must be included when creating student
```

✅ **Solution 3: Query all students**
```bash
# Get all students and search
curl http://127.0.0.1:8000/students | grep "U001"
```

---

## 🔴 Database Issues

### Issue 11: "Cosmos DB quota exceeded"

**Symptoms:**
```
QuotaExceededError: Request rate is large
```

**Causes:**
- Too many requests
- Throughput limit exceeded
- Rate limiting active

**Solutions:**

✅ **Solution 1: Add delays**
```python
import time
time.sleep(1)  # Wait 1 second between requests
```

✅ **Solution 2: Reduce batch size**
```python
# Create in smaller batches
for i in range(0, len(students), 10):
    batch = students[i:i+10]
    # Process batch
```

✅ **Solution 3: Increase throughput (Azure Portal)**
- Go to Azure Portal
- Find Cosmos DB account
- Increase RU/s (Request Units per second)

---

### Issue 12: "Partition key not specified"

**Symptoms:**
```
Error: Partition key value must be supplied
```

**Causes:**
- Missing branch field
- NULL partition key
- Wrong field name

**Solutions:**

✅ **Solution 1: Include branch in request**
```json
{
  "roll": "U001",
  "name": "Student",
  "branch": "CSE",      // Required - partition key
  "gpa": 8.5
}
```

✅ **Solution 2: Valid branches**
```
- CSE (Computer Science)
- ECE (Electronics)
- ME (Mechanical)
- IT (Information Technology)
- CE (Civil Engineering)
```

---

## 🔴 Environment Issues

### Issue 13: "No such file or directory: .env"

**Symptoms:**
```
FileNotFoundError: [Errno 2] No such file or directory: '.env'
```

**Causes:**
- .env file not created
- Wrong directory
- File deleted

**Solutions:**

✅ **Solution 1: Create .env file**
```bash
# From root directory
copy .env.example .env  # Windows
cp .env.example .env     # Linux/Mac
```

✅ **Solution 2: Add to correct location**
```
Azure-Cosmos-DB/
├── .env              ← Should be here
└── students-CRUD-mockAPIs/
    └── app.py
```

✅ **Solution 3: Verify .env content**
```bash
cat .env
# Should contain:
# COSMOS_URI=...
# COSMOS_KEY=...
```

---

### Issue 14: "Cannot import from connect"

**Symptoms:**
```
ImportError: cannot import name 'connect_cosmos' from connect
```

**Causes:**
- Wrong import path
- connect.py not found
- Function name typo

**Solutions:**

✅ **Solution 1: Verify file exists**
```bash
# From students-CRUD-mockAPIs folder
ls connect.py  # Linux/Mac
dir connect.py  # Windows
```

✅ **Solution 2: Check function name**
```python
# In connect.py, ensure function exists:
def connect_cosmos():
    # ... code ...
    return container
```

✅ **Solution 3: Verify import**
```python
# In app.py, import should be:
from connect import connect_cosmos
# NOT: from students-CRUD-mockAPIs.connect import connect_cosmos
```

---

## 🔴 Virtual Environment Issues

### Issue 15: "Virtual environment not activating"

**Symptoms:**
- Command prompt still shows (base)
- pip shows wrong Python

**Solutions:**

✅ **Solution 1: Activate properly**
```powershell
# Windows PowerShell
.venv\Scripts\Activate.ps1

# Windows CMD
.venv\Scripts\activate.bat

# Linux/Mac
source .venv/bin/activate
```

✅ **Solution 2: Recreate virtual environment**
```bash
# Delete old venv
Remove-Item -Recurse .venv  # Windows
rm -rf .venv  # Linux/Mac

# Create new venv
python -m venv .venv

# Activate
.venv\Scripts\activate
```

✅ **Solution 3: Check Python path**
```bash
# Should show venv path
which python  # Linux/Mac
where python  # Windows

# Should contain: \.venv\Scripts\python.exe
```

---

## 📞 Getting Help

### Before Posting Issue

1. Check this troubleshooting guide
2. Read error message carefully
3. Verify all prerequisites installed
4. Test with simple curl command
5. Check .env file

### Report Issue with:

1. **Error message** (full text)
2. **Python version** (`python --version`)
3. **OS** (Windows/Linux/Mac)
4. **Steps to reproduce**
5. **What you tried**

### Resources

- 📚 Full Docs: See README.md
- 📖 Setup Guide: See SETUP.md
- 🔗 API Docs: See API_DOCUMENTATION.md
- 💬 GitHub Issues: https://github.com/Amank326/Azure-Cosmos-DB/issues

---

## ✅ Verification Checklist

Before reporting issue, verify:

```
☐ Python 3.9+ installed
☐ Virtual environment created and activated
☐ Dependencies installed (pip list)
☐ .env file exists with credentials
☐ Cosmos DB credentials are valid
☐ Internet connection working
☐ Port 8000 available
☐ Flask app starts without errors
☐ Server responds to http://127.0.0.1:8000/
☐ Sample data loaded (python seed_data.py)
```

---

**Last Updated:** December 2025  
**Version:** 1.0  
**Status:** Comprehensive troubleshooting guide
