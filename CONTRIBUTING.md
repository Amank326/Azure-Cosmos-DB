# 🤝 Contributing Guide

Thank you for your interest in contributing to the Azure Cosmos DB Student CRUD API project!

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Making Changes](#making-changes)
4. [Testing](#testing)
5. [Submitting Changes](#submitting-changes)
6. [Code Standards](#code-standards)
7. [Reporting Bugs](#reporting-bugs)
8. [Feature Requests](#feature-requests)
9. [Code of Conduct](#code-of-conduct)

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Git
- GitHub account
- Azure Cosmos DB account (for testing)

### Fork & Clone

```bash
# 1. Fork the repository on GitHub
# Visit: https://github.com/Amank326/Azure-Cosmos-DB
# Click "Fork" button

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Azure-Cosmos-DB.git
cd Azure-Cosmos-DB

# 3. Add upstream remote
git remote add upstream https://github.com/Amank326/Azure-Cosmos-DB.git

# 4. Verify remotes
git remote -v
# origin    YOUR_USERNAME/Azure-Cosmos-DB (fetch/push)
# upstream  Amank326/Azure-Cosmos-DB (fetch)
```

---

## 🔧 Development Setup

### Create Virtual Environment

```bash
# Create venv
python -m venv .venv

# Activate
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac
```

### Install Dependencies

```bash
cd students-CRUD-mockAPIs
pip install -r requirements.txt

# Optional: Install dev tools
pip install pytest black pylint
```

### Setup Environment

```bash
# From root directory
copy .env.example .env  # Windows
cp .env.example .env     # Linux/Mac

# Edit .env with your credentials
```

---

## 📝 Making Changes

### Create Feature Branch

```bash
# Update main branch
git fetch upstream
git rebase upstream/main

# Create feature branch
git checkout -b feature/your-feature-name

# Or bugfix branch
git checkout -b bugfix/bug-description
```

### Naming Conventions

**Branch names:**
- `feature/add-pagination` - New feature
- `bugfix/fix-cors-error` - Bug fix
- `docs/update-readme` - Documentation
- `refactor/cleanup-imports` - Code cleanup

**Commit messages:**
```
feat: Add student filtering by branch
fix: Resolve CORS error on DELETE endpoint
docs: Update API documentation
refactor: Simplify connect_cosmos function
test: Add unit tests for POST endpoint
```

### Code Style

```python
# Good: Follow PEP 8
def get_students():
    """Get all students from database."""
    try:
        query = "SELECT * FROM c"
        items = list(container.query_items(
            query=query,
            enable_cross_partition_query=True
        ))
        return jsonify({"success": True, "students": items})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Format with Black
black app.py

# Lint with Pylint
pylint app.py
```

---

## 🧪 Testing

### Run Existing Tests

```bash
pytest tests/ -v
```

### Write New Tests

Create `tests/test_endpoints.py`:

```python
import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_endpoint(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Student Mock API Service' in response.data

def test_get_students(client):
    response = client.get('/students')
    assert response.status_code == 200
    data = response.get_json()
    assert 'students' in data

def test_create_student(client):
    student = {
        "roll": "TEST1",
        "name": "Test Student",
        "branch": "CSE",
        "gpa": 8.5
    }
    response = client.post('/student', json=student)
    assert response.status_code == 201
    data = response.get_json()
    assert data['success'] is True
```

### Run Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test
pytest tests/test_endpoints.py::test_create_student
```

### Test Locally Before Submitting

```bash
# Start server
python app.py

# In another terminal, test endpoints
curl http://127.0.0.1:8000/students

# Run full test suite
pytest -v
```

---

## 📤 Submitting Changes

### Commit & Push

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Add student filtering by GPA"

# Push to your fork
git push origin feature/add-pagination
```

### Create Pull Request

1. Go to GitHub: https://github.com/YOUR_USERNAME/Azure-Cosmos-DB
2. Click "Compare & pull request"
3. Fill PR description with:
   - What changed
   - Why it changed
   - How to test
   - Related issues

**PR Template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Code refactoring

## Changes Made
- Change 1
- Change 2
- Change 3

## How to Test
1. Step 1
2. Step 2
3. Expected result

## Related Issues
Fixes #123

## Screenshots (if applicable)
```

### Review Process

- Maintainers will review your PR
- Address requested changes
- Push updates to same branch
- Don't create new PR for updates

---

## 📋 Code Standards

### Python Style Guide

Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/):

```python
# Naming
my_variable = 1  # snake_case
MY_CONSTANT = 100  # UPPER_CASE
class MyClass:  # PascalCase
    def my_method(self):  # snake_case
        pass

# Line length
# Maximum 79 characters

# Imports
import os
import sys
from flask import Flask
from azure.cosmos import CosmosClient

# Comments
# Good comment explains WHY, not WHAT
result = complex_calculation()  # Calculates student GPA

# Docstrings
def get_students():
    """
    Retrieve all students from database.
    
    Returns:
        Response: JSON with all student records
    """
    pass
```

### Documentation Standards

```python
def create_student(data):
    """
    Create a new student record.
    
    Args:
        data (dict): Student data with keys:
            - roll (str): Student roll number
            - name (str): Student name
            - branch (str): Student branch
            - gpa (float): Student GPA
    
    Returns:
        Response: JSON with created student record
        
    Raises:
        ValueError: If required fields missing
        
    Example:
        >>> create_student({
        ...     'roll': 'U001',
        ...     'name': 'Aman',
        ...     'branch': 'CSE',
        ...     'gpa': 8.5
        ... })
    """
    pass
```

### Error Handling

```python
# Good error handling
try:
    result = container.query_items(query)
    return jsonify({"success": True, "data": result}), 200
except exceptions.CosmosHttpResponseError as e:
    logging.error(f"Cosmos DB error: {e}")
    return jsonify({
        "success": False,
        "error": "Database error"
    }), 500
except Exception as e:
    logging.error(f"Unexpected error: {e}")
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500
```

---

## 🐛 Reporting Bugs

### Before Reporting

- Check existing issues
- Read TROUBLESHOOTING.md
- Verify it's reproducible

### Report Template

**Title:** `[BUG] Short description`

**Description:**
```markdown
## Describe the Bug
Clear description of the problem

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happened

## Environment
- Python version: 3.10
- OS: Windows 11
- Branch: CSE
- GPA: 8.5

## Error Message
```
Full error trace here
```

## Logs
Relevant log output

## Screenshots
If applicable
```

---

## ✨ Feature Requests

### Feature Request Template

**Title:** `[FEATURE] Short description`

**Description:**
```markdown
## Use Case
Why do we need this feature?

## Proposed Solution
How should it work?

## Alternative Solutions
Are there alternatives?

## Additional Context
Any other relevant info?

## Examples
```
curl -X GET http://127.0.0.1:8000/students?branch=CSE
```

## Benefits
- Benefit 1
- Benefit 2
```

---

## 📚 Types of Contributions

### Code Contributions

- New features
- Bug fixes
- Performance improvements
- Security enhancements

### Documentation Contributions

- README improvements
- API documentation
- Setup guide updates
- Tutorial creation

### Testing Contributions

- New test cases
- Test automation
- Integration tests
- Performance tests

### Community Contributions

- Issue discussions
- Code reviews
- Helping others
- Sharing use cases

---

## 🎯 Good First Issues

Looking for where to start?

- Issues tagged `good first issue`
- Issues tagged `help wanted`
- Documentation improvements
- Adding new test cases
- Code refactoring

---

## 📖 Useful Resources

### Guides
- [SETUP.md](SETUP.md) - Setup instructions
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [ADVANCED_FEATURES.md](ADVANCED_FEATURES.md) - Advanced topics

### External Links
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [PEP 8 Style Guide](https://www.python.org/dev/peps/pep-0008/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/)

---

## 💬 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We respect all people regardless of their background or identity.

### Our Standards

Examples of behavior that contributes to a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing opinions
- Accepting constructive criticism gracefully
- Focusing on what's best for the community
- Showing empathy toward other community members

### Enforcement

Instances of unacceptable behavior may be reported by contacting maintainers. All complaints will be reviewed and investigated.

---

## ❓ Questions?

### Getting Help

1. Check existing documentation
2. Search existing issues
3. Ask in issue discussions
4. Email: Check repository

### Resources

- 📚 Documentation: See all .md files
- 🔗 GitHub: https://github.com/Amank326/Azure-Cosmos-DB
- 💬 Discussions: Use GitHub Discussions
- 🐛 Issues: Report bugs with detailed info

---

## 🎉 Thank You!

Your contributions make this project better. Thank you for taking the time to contribute!

---

**Happy Contributing! 🚀**

Last Updated: December 2025
