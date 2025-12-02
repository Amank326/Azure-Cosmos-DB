<!--
NOTE FOR MAINTAINER (Aman):
- Replace any ./assets/*.gif / .png paths with your own images.
- Create an /assets folder in repo root and add your banner + logos + stickers there.
-->

<div align="center">

  <!-- 🔥 MAIN ANIMATED BANNER -->
  <img src="./assets/cosmos-banner.gif" alt="Azure Cosmos DB Student CRUD API Banner" width="100%" />

  <br/><br/>

  <!-- 🌌 ANIMATED LOGOS ROW -->
  <img src="./assets/cosmos-logo-animated.gif" alt="Cosmos DB Logo" width="140" style="margin:0 10px;"/>
  <img src="./assets/python-animated.gif" alt="Python Logo" width="120" style="margin:0 10px;"/>
  <img src="./assets/azure-rotating.gif" alt="Azure Logo" width="120" style="margin:0 10px;"/>

<div align="center">

  <h1 align="center">✨ Azure Cosmos DB – Student CRUD API</h1>
  <h3 align="center">Complete Full-Stack Solution with React Frontend + Flask Backend</h3>

  <p align="center">
    <i>Professional • Production-Ready • Modern • Student-Friendly Open Source Project</i>
  </p>

  <!-- 🏷 BADGES -->
  <p>
    <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
    <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
    <img src="https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask&logoColor=white"/>
    <img src="https://img.shields.io/badge/Azure-Cosmos%20DB-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white"/>
    <img src="https://img.shields.io/badge/Material--UI-Latest-007FFF?style=for-the-badge&logo=mui&logoColor=white"/>
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge"/>
  </p>

  <p align="center">
    <b>Full-stack learning project: React + TypeScript + Material-UI + Flask + Azure Cosmos DB</b>
  </p>

</div>

---

## 🎯 Project Overview

**Azure Cosmos DB Student CRUD API** is a complete full-stack application:

### 🎨 **Frontend (React + TypeScript)**
- Modern Material-UI design
- Professional table with sorting & pagination
- Form validation & error handling
- Dark mode support
- Real-time notifications
- Responsive design

### 🔌 **Backend (Flask)**
- RESTful API with 6 endpoints
- CORS enabled for frontend integration
- Comprehensive error handling
- Environment-based configuration

### ☁️ **Database (Azure Cosmos DB)**
- NoSQL document database
- Partition key optimization
- Scalable architecture
- Real-world cloud integration  

---

## 🚀 Getting Started

<img src="./assets/neon-divider.gif" alt="Divider" width="70%"/>

### ✅ Prerequisites

Make sure you have:

- 🐍 **Python** `3.9+`
- 🔧 **Git**
- ☁️ **GitHub account**
- 🌌 **Azure Cosmos DB account** (for real DB testing)

---


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
├── frontend/                           # React TypeScript Frontend
│   ├── src/
│   │   ├── App.tsx                    # Main component with state & API
│   │   ├── types.ts                   # TypeScript interfaces
│   │   ├── index.css                  # Global styles & animations
│   │   └── components/
│   │       ├── StudentTable.tsx       # Table with sorting & pagination
│   │       ├── StudentDialog.tsx      # Create/Edit form with validation
│   │       ├── DeleteConfirmationDialog.tsx
│   │       └── Snackbar.tsx           # Toast notifications
│   ├── package.json                   # npm dependencies
│   ├── vite.config.ts                 # Vite configuration
│   └── tsconfig.json                  # TypeScript configuration
│
└── students-CRUD-mockAPIs/             # Flask Backend
    ├── app.py                          # Flask REST API (6 endpoints)
    ├── connect.py                      # Cosmos DB connection
    ├── seed_data.py                    # Sample data loader
    ├── requirements.txt                # Python dependencies
    ├── runtime.txt                     # Python runtime version
    ├── README.md                       # Backend setup guide
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

## 🎨 Frontend (React + TypeScript + Material-UI)

A professional, production-ready React frontend for the student management system.

### Frontend Prerequisites
- Node.js 16+
- npm or yarn

### Frontend Setup

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Run development server**
```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

### Frontend Features

✨ **Modern UI/UX**
- Material-UI 5.15 components for professional styling
- Dark/Light theme toggle
- Responsive design for all devices
- Smooth animations and transitions

🔄 **Data Management**
- Real-time student list with auto-refresh
- Sorting by Name, Branch, Roll, GPA
- Pagination (5, 10, 25, 50 rows)
- Color-coded GPA display (Green: 8+, Yellow: Lower)

✅ **Form Validation**
- Roll number required and unique
- Name and branch validation
- GPA range constraint (0-10)
- Real-time error messages

🔔 **User Feedback**
- Toast notifications for all actions
- Success/Error/Warning alerts
- 5-second auto-dismiss
- Professional dialog confirmations

💾 **CRUD Operations**
- Create new students with validation
- Edit existing student information
- Delete with confirmation dialog
- Immediate UI updates

### Frontend Stack

```
frontend/
├── src/
│   ├── App.tsx                 # Main React component
│   ├── types.ts                # TypeScript interfaces
│   ├── index.css               # Global styles
│   └── components/
│       ├── StudentTable.tsx    # Table with sorting/pagination
│       ├── StudentDialog.tsx   # Create/Edit form
│       ├── DeleteConfirmationDialog.tsx
│       └── Snackbar.tsx        # Toast notifications
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
└── tsconfig.json               # TypeScript config
```

### Frontend Dependencies

- **React** 18.2 - UI library
- **Material-UI** 5.15 - Professional components
- **TypeScript** 5.0+ - Type safety
- **Axios** 1.6.2 - HTTP client
- **Vite** - Fast build tool

### Running Both Backend & Frontend

**Terminal 1 (Backend):**
```bash
cd students-CRUD-mockAPIs
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Then open: `http://localhost:5173`

### Frontend Build

For production:
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

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

**Backend**
✅ Complete CRUD operations  
✅ Azure Cosmos DB integration  
✅ RESTful API design (6 endpoints)  
✅ Comprehensive error handling  
✅ Environment-based configuration  
✅ Sample data loading  
✅ Production-ready code  

**Frontend**
✅ Professional Material-UI design  
✅ Full CRUD UI with validation  
✅ Advanced table (sorting, pagination)  
✅ Dark/Light theme support  
✅ TypeScript type safety  
✅ Real-time error notifications  
✅ Responsive design  
✅ Delete confirmation dialogs  

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

**Aman Kumar Gupta** (@Amank326)

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
