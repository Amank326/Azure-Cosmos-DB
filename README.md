# Azure Cosmos DB Student CRUD API 🎓

A complete Flask REST API with Azure Cosmos DB integration for student management. Full CRUD operations with production-ready code and comprehensive documentation.

## 📋 Project Structure

```
azure4/
├── connect.py                          # Root connection file (for reference)
├── requirements.txt                    # Python dependencies
├── README.md                           # This file
├── .env.example                        # Environment variables template
│
└── students-CRUD-mockAPIs/             # Main Application
    ├── app.py                          # Flask REST API (6 endpoints)
    ├── connect.py                      # Cosmos DB connection
    ├── seed_data.py                    # Sample data loader
    ├── requirements.txt                # Dependencies
    ├── runtime.txt                     # Python runtime version
    ├── README.md                       # Setup guide
    └── .github/workflows/              # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Azure Cosmos DB account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Amank326/Azure-Cosmos-DB.git
cd Azure-Cosmos-DB
```

2. **Create virtual environment**
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac
```

3. **Install dependencies**
```bash
cd students-CRUD-mockAPIs
pip install -r requirements.txt
```

4. **Setup environment variables**
```bash
# Create .env file with your credentials
cp .env.example .env
# Edit .env and add your Azure Cosmos DB credentials
```

5. **Run the application**
```bash
python app.py
```

Server will run at: `http://127.0.0.1:8000`

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/students` | Get all students |
| GET | `/student/<roll>` | Get student by roll number |
| POST | `/student` | Create new student |
| PUT | `/student/<roll>` | Update student |
| DELETE | `/student/<roll>` | Delete student |

## 🔧 API Examples

### Get All Students
```bash
curl http://localhost:8000/students
```

### Create Student
```bash
curl -X POST http://localhost:8000/student \
  -H "Content-Type: application/json" \
  -d '{
    "roll": "U001",
    "name": "Aman Sharma",
    "branch": "CSE",
    "gpa": 8.5
  }'
```

### Update Student
```bash
curl -X PUT http://localhost:8000/student/U001 \
  -H "Content-Type: application/json" \
  -d '{"gpa": 9.0}'
```

### Delete Student
```bash
curl -X DELETE http://localhost:8000/student/U001
```

## 📁 Key Files

- **`students-CRUD-mockAPIs/app.py`** - Main Flask application with all 6 endpoints
- **`students-CRUD-mockAPIs/connect.py`** - Azure Cosmos DB connection setup
- **`students-CRUD-mockAPIs/seed_data.py`** - Load sample student data
- **`students-CRUD-mockAPIs/requirements.txt`** - All Python dependencies

## 🧪 Testing

### Using Postman
1. Import `postman_collection.json` into Postman
2. Update environment variables with your API URL
3. Run all requests

### Using cURL
See API Examples section above

### Load Sample Data
```bash
python seed_data.py
```

## 🔐 Environment Variables

Required variables in `.env`:
```
COSMOS_URI=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-cosmos-db-primary-key
DATABASE_NAME=rungta
CONTAINER_NAME=student
```

## 📦 Dependencies

- **flask** - Web framework
- **azure-cosmos** - Cosmos DB client
- **python-dotenv** - Environment variable management

See `requirements.txt` for complete list

## 🎯 Features

✅ Complete CRUD operations  
✅ Azure Cosmos DB integration  
✅ RESTful API design  
✅ Error handling  
✅ Environment-based configuration  
✅ Sample data loading  
✅ Production-ready code  
✅ Comprehensive documentation  

## 🛠️ Development

### Running Locally
```bash
python students-CRUD-mockAPIs/app.py
```

### Adding More Endpoints
Edit `students-CRUD-mockAPIs/app.py` and add new Flask routes

### Modifying Database
Update connection in `students-CRUD-mockAPIs/connect.py`

## 📖 Documentation

For detailed documentation, see:
- `students-CRUD-mockAPIs/README.md` - Full setup guide
- API documentation with examples included

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Aman Sharma** (@Amank326)

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Status**: ✅ Production Ready  
**Last Updated**: December 2025
