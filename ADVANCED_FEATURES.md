# 🚀 Advanced Features & Customization

## Advanced Topics for Production Use

---

## 📊 Database Optimization

### 1. Query Performance

#### Indexed Queries
```python
# Efficient query with index
query = "SELECT * FROM c WHERE c.branch = 'CSE'"
items = list(container.query_items(query=query))
```

#### Cross-Partition Queries
```python
# Required for queries across partition key
items = list(container.query_items(
    query=query,
    enable_cross_partition_query=True
))
```

#### Pagination
```python
# Implement pagination for large datasets
query = "SELECT * FROM c ORDER BY c.roll"
items = list(container.query_items(
    query=query,
    enable_cross_partition_query=True,
    max_item_count=10  # Items per page
))
```

### 2. Partition Key Strategy

Current configuration:
```python
partition_key = PartitionKey(path="/branch")
```

**Benefits:**
- Efficiently distributes data by branch
- Good for queries filtered by branch
- Balances load across partitions

---

## 🔐 Security Implementation

### 1. Authentication (API Key)

Add to `app.py`:
```python
from functools import wraps
from flask import abort

# Simple API key validation
def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        if api_key != os.getenv('API_KEY'):
            abort(401)
        return f(*args, **kwargs)
    return decorated_function

# Usage
@app.route('/students', methods=['GET'])
@require_api_key
def get_students():
    # Protected endpoint
    pass
```

### 2. Request Validation

Add validation middleware:
```python
from jsonschema import validate, ValidationError

student_schema = {
    "type": "object",
    "properties": {
        "roll": {"type": "string"},
        "name": {"type": "string"},
        "branch": {"type": "string"},
        "gpa": {"type": "number", "minimum": 0, "maximum": 10}
    },
    "required": ["roll", "name", "branch", "gpa"]
}

@app.route('/student', methods=['POST'])
def create_student():
    try:
        validate(instance=request.json, schema=student_schema)
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    # Continue with creation
```

### 3. Rate Limiting

```bash
pip install Flask-Limiter
```

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(app, key_func=get_remote_address)

@app.route('/students', methods=['GET'])
@limiter.limit("100 per hour")
def get_students():
    # Limited to 100 requests per hour
    pass
```

---

## 📈 Monitoring & Logging

### 1. Request Logging

```python
import logging
from datetime import datetime

# Setup logging
logging.basicConfig(
    filename='api.log',
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

@app.before_request
def log_request():
    logging.info(f"{request.method} {request.path} from {request.remote_addr}")

@app.after_request
def log_response(response):
    logging.info(f"Response: {response.status_code}")
    return response
```

### 2. Error Tracking

```python
import traceback

@app.errorhandler(Exception)
def handle_error(error):
    logging.error(f"Error: {str(error)}")
    logging.error(traceback.format_exc())
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500
```

### 3. Database Query Monitoring

```python
import time

def timed_query(query, *args, **kwargs):
    start = time.time()
    result = container.query_items(query, *args, **kwargs)
    duration = time.time() - start
    logging.info(f"Query executed in {duration:.2f}s")
    return result
```

---

## 🔄 Caching Strategy

### In-Memory Caching with Flask

```bash
pip install Flask-Caching
```

```python
from flask_caching import Cache

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/students', methods=['GET'])
@cache.cached(timeout=300)  # Cache for 5 minutes
def get_students():
    # Expensive query result is cached
    pass
```

### Redis Caching

```python
import redis
from flask_caching import Cache

cache = Cache(app, config={
    'CACHE_TYPE': 'RedisCache',
    'CACHE_REDIS_URL': 'redis://localhost:6379/0'
})
```

---

## 🌍 API Versioning

### Version Routes

```python
# Version 1 endpoints
@app.route('/v1/students', methods=['GET'])
def get_students_v1():
    # Existing implementation
    pass

# Version 2 endpoints (enhanced)
@app.route('/v2/students', methods=['GET'])
def get_students_v2():
    # New features
    # Pagination, filtering, sorting
    pass
```

### Header-Based Versioning

```python
@app.route('/students', methods=['GET'])
def get_students():
    version = request.headers.get('API-Version', '1')
    if version == '2':
        return get_students_v2()
    return get_students_v1()
```

---

## 📋 Advanced Querying

### Filter by Multiple Conditions

```python
# Example: Get all CSE students with GPA > 8.0
query = """
SELECT * FROM c 
WHERE c.branch = 'CSE' 
AND c.gpa > 8.0 
ORDER BY c.gpa DESC
"""
items = list(container.query_items(
    query=query,
    enable_cross_partition_query=True
))
```

### Aggregation

```python
# Get average GPA by branch
query = """
SELECT c.branch, AVG(c.gpa) as avg_gpa 
FROM c 
GROUP BY c.branch
"""
results = list(container.query_items(
    query=query,
    enable_cross_partition_query=True
))
```

### Pagination Implementation

```python
@app.route('/students/page/<int:page>', methods=['GET'])
def get_students_paginated(page):
    page_size = 10
    skip = (page - 1) * page_size
    
    query = f"""
    SELECT * FROM c 
    ORDER BY c.roll 
    OFFSET {skip} LIMIT {page_size}
    """
    
    items = list(container.query_items(
        query=query,
        enable_cross_partition_query=True
    ))
    
    return jsonify({
        "success": True,
        "page": page,
        "items": items,
        "count": len(items)
    })
```

---

## 🧪 Testing Framework

### Unit Tests with pytest

```bash
pip install pytest pytest-flask
```

`test_app.py`:
```python
import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home(client):
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
        "name": "Test",
        "branch": "CSE",
        "gpa": 8.0
    }
    response = client.post('/student', json=student)
    assert response.status_code == 201
```

**Run tests:**
```bash
pytest test_app.py -v
```

---

## 🚀 Performance Optimization

### 1. Connection Pooling

```python
from azure.cosmos import CosmosClient

client = CosmosClient(
    COSMOS_URI,
    credential=COSMOS_KEY,
    connection_policy={
        'max_connection_pool_size': 100,
        'request_timeout': 30
    }
)
```

### 2. Batch Operations

```python
# Batch create students
def batch_create_students(students):
    with container.batch_request_transaction() as batch:
        for student in students:
            batch.create_item(student)
```

### 3. Lazy Loading

```python
# Don't load all fields at once
query = "SELECT c.id, c.roll, c.name FROM c"
items = list(container.query_items(query=query))
```

---

## 🌐 API Gateway Integration

### Azure API Management

```python
# Add custom headers for tracing
@app.before_request
def add_tracing():
    request.correlation_id = request.headers.get('X-Correlation-ID')
    
@app.after_request
def return_tracing(response):
    response.headers['X-Correlation-ID'] = request.correlation_id
    return response
```

---

## 📊 Analytics & Reporting

### Usage Statistics

```python
from collections import defaultdict
from datetime import datetime

stats = defaultdict(int)

@app.after_request
def collect_stats(response):
    endpoint = request.path
    method = request.method
    status = response.status_code
    
    key = f"{method} {endpoint} - {status}"
    stats[key] += 1
    
    return response

@app.route('/stats', methods=['GET'])
def get_stats():
    return jsonify(dict(stats))
```

---

## 🔧 Debugging

### Flask Debug Mode

```python
if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,  # Enable debug mode
        use_debugger=True
    )
```

### Request Context Debugging

```python
from flask import g

@app.before_request
def debug_request():
    g.start_time = time.time()

@app.teardown_appcontext
def log_duration(exception):
    if hasattr(g, 'start_time'):
        duration = time.time() - g.start_time
        print(f"Request took {duration:.2f}s")
```

---

## 🚀 Deployment Optimization

### Production Configuration

```python
# Use gunicorn for production
# pip install gunicorn
# gunicorn --workers 4 --bind 0.0.0.0:8000 app:app

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=False,  # Disable in production
        threaded=True
    )
```

### Environment-Specific Config

```python
import os

ENV = os.getenv('FLASK_ENV', 'development')

if ENV == 'production':
    # Production settings
    DEBUG = False
    TESTING = False
else:
    # Development settings
    DEBUG = True
    TESTING = False
```

---

## 📚 Related Documentation

- See `API_DOCUMENTATION.md` for API details
- See `SETUP.md` for installation
- See `DEPENDENCIES.md` for packages

---

**Last Updated:** December 2025  
**Version:** 1.0  
**Status:** Advanced features documented
