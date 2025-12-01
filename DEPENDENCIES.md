# 📦 Dependencies & Requirements

## Python Version

- **Minimum**: Python 3.9
- **Recommended**: Python 3.10 or higher
- **Tested On**: Python 3.9, 3.10, 3.11

---

## Core Dependencies

### Production (students-CRUD-mockAPIs/requirements.txt)

```
Flask==3.0.0
Flask-CORS==4.0.0
azure-cosmos==4.3.1
python-dotenv==1.0.0
```

### Dependency Details

| Package | Version | Purpose |
|---------|---------|---------|
| **Flask** | 3.0.0 | Web framework for REST API |
| **Flask-CORS** | 4.0.0 | Handle Cross-Origin requests |
| **azure-cosmos** | 4.3.1 | Azure Cosmos DB client |
| **python-dotenv** | 1.0.0 | Environment variable management |

---

## Installation Instructions

### Option 1: Quick Install
```bash
cd students-CRUD-mockAPIs
pip install -r requirements.txt
```

### Option 2: Install Individually
```bash
pip install Flask==3.0.0
pip install Flask-CORS==4.0.0
pip install azure-cosmos==4.3.1
pip install python-dotenv==1.0.0
```

### Option 3: Latest Compatible Versions
```bash
pip install Flask
pip install Flask-CORS
pip install azure-cosmos
pip install python-dotenv
```

---

## Package Descriptions

### 🌐 Flask 3.0.0
**Purpose**: Web framework for building REST APIs

**Key Features**:
- Route decorators for endpoints
- Request/response handling
- JSON serialization
- HTTP status codes

**Documentation**: https://flask.palletsprojects.com/

**Used in**: `app.py` - All API endpoints

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/students', methods=['GET'])
def get_students():
    return jsonify({'message': 'students'})
```

---

### 🔄 Flask-CORS 4.0.0
**Purpose**: Handle Cross-Origin Resource Sharing

**Key Features**:
- Allow requests from different domains
- Configurable origin policies
- Simple decorator usage

**Documentation**: https://flask-cors.readthedocs.io/

**Used in**: `app.py` - CORS configuration

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
```

---

### ☁️ azure-cosmos 4.3.1
**Purpose**: Official Azure Cosmos DB client library

**Key Features**:
- Database operations
- Container management
- Query execution
- Item CRUD operations

**Documentation**: https://docs.microsoft.com/python/api/azure-cosmos/

**Used in**: `connect.py` - Database connection

```python
from azure.cosmos import CosmosClient, PartitionKey

client = CosmosClient(uri, credential)
database = client.create_database_if_not_exists(id="rungta")
container = database.create_container_if_not_exists(
    id="student",
    partition_key=PartitionKey(path="/branch")
)
```

---

### 🔐 python-dotenv 1.0.0
**Purpose**: Environment variable management

**Key Features**:
- Load `.env` files
- Secure credential storage
- Development/production separation

**Documentation**: https://pypi.org/project/python-dotenv/

**Used in**: `connect.py` - Load credentials

```python
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file
cosmos_uri = os.getenv("COSMOS_URI")
cosmos_key = os.getenv("COSMOS_KEY")
```

---

## System Requirements

### Operating System
- ✅ Windows 10/11
- ✅ macOS 10.14+
- ✅ Linux (Ubuntu 18.04+)

### RAM
- **Minimum**: 2 GB
- **Recommended**: 4 GB

### Disk Space
- **Minimum**: 500 MB
- **Recommended**: 1 GB

### Network
- Internet connection required
- Azure Cosmos DB connectivity
- HTTPS support (443)

---

## Optional Development Tools

### Recommended for Development

```bash
pip install pytest              # Testing framework
pip install black              # Code formatter
pip install pylint             # Code linter
pip install requests           # HTTP client library
```

### Installation
```bash
pip install pytest black pylint requests
```

---

## Verification

### Verify Installation
```bash
python -c "import flask; print(flask.__version__)"
python -c "import flask_cors; print('Flask-CORS OK')"
python -c "import azure.cosmos; print('Azure Cosmos OK')"
python -c "import dotenv; print('Python-dotenv OK')"
```

### Expected Output
```
3.0.0
Flask-CORS OK
Azure Cosmos OK
Python-dotenv OK
```

---

## Troubleshooting

### Issue: "No module named 'flask'"
**Solution:**
```bash
pip install Flask
```

### Issue: "Permission denied"
**Solution (Windows):**
```bash
python -m pip install --upgrade pip
pip install --user Flask
```

### Issue: "Wheel is not compatible"
**Solution:**
```bash
pip install --upgrade pip
pip install --upgrade setuptools wheel
pip install -r requirements.txt
```

### Issue: Multiple Python versions
**Solution:**
```bash
python3 -m pip install -r requirements.txt
# or
python3.10 -m pip install -r requirements.txt
```

---

## Version Compatibility

### Tested Combinations

| Python | Flask | Azure-Cosmos | Flask-CORS | Status |
|--------|-------|--------------|-----------|--------|
| 3.9 | 3.0.0 | 4.3.1 | 4.0.0 | ✅ Working |
| 3.10 | 3.0.0 | 4.3.1 | 4.0.0 | ✅ Working |
| 3.11 | 3.0.0 | 4.3.1 | 4.0.0 | ✅ Working |

---

## Upgrade Instructions

### Update All Packages
```bash
pip install --upgrade pip
pip install --upgrade -r requirements.txt
```

### Update Specific Package
```bash
pip install --upgrade Flask
pip install --upgrade azure-cosmos
```

### Check for Updates
```bash
pip list --outdated
```

---

## Virtual Environment Setup

### Create Virtual Environment
```bash
python -m venv .venv
```

### Activate Virtual Environment

**Windows:**
```bash
.venv\Scripts\activate
```

**Linux/Mac:**
```bash
source .venv/bin/activate
```

### Deactivate Virtual Environment
```bash
deactivate
```

### Install in Virtual Environment
```bash
# After activating venv
pip install -r requirements.txt
```

---

## Production vs Development

### Development Requirements
```
Flask==3.0.0
Flask-CORS==4.0.0
azure-cosmos==4.3.1
python-dotenv==1.0.0
pytest
black
pylint
```

### Production Requirements
```
Flask==3.0.0
Flask-CORS==4.0.0
azure-cosmos==4.3.1
python-dotenv==1.0.0
```

### Production Installation
```bash
pip install -r requirements.txt
# No dev tools in production
```

---

## Dependency Graph

```
Azure-Cosmos-DB Application
│
├── Flask 3.0.0
│   └── Werkzeug (auto-installed)
│   └── Jinja2 (auto-installed)
│
├── Flask-CORS 4.0.0
│   └── Flask (dependency)
│
├── azure-cosmos 4.3.1
│   └── azure-core (auto-installed)
│   └── requests (auto-installed)
│
└── python-dotenv 1.0.0
    └── (no dependencies)
```

---

## Size Reference

### Package Sizes (Installed)
| Package | Size |
|---------|------|
| Flask | ~2.5 MB |
| Flask-CORS | ~0.5 MB |
| azure-cosmos | ~10 MB |
| python-dotenv | ~0.3 MB |
| **Total** | **~13-15 MB** |

---

## Updates & Maintenance

### Check for Security Updates
```bash
pip list --outdated
pip check
```

### Update pip Itself
```bash
python -m pip install --upgrade pip
```

### Freeze Current Environment
```bash
pip freeze > requirements-lock.txt
```

### Recreate Environment
```bash
pip install -r requirements-lock.txt
```

---

## Support & Documentation

- **Flask**: https://flask.palletsprojects.com/
- **Azure Cosmos**: https://docs.microsoft.com/python/api/azure-cosmos/
- **Flask-CORS**: https://flask-cors.readthedocs.io/
- **Python-dotenv**: https://pypi.org/project/python-dotenv/

---

**Last Updated:** December 2025  
**Status:** ✅ All dependencies tested and verified
