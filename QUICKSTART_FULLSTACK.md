# Quick Start Guide - Full Stack

Get the entire application up and running in minutes!

## 📋 Prerequisites

Before starting, ensure you have:
- **Python 3.9+** - For backend
- **Node.js 16+** - For frontend
- **Azure Cosmos DB account** with credentials
- **Git** for version control

## 🚀 One-Time Setup

### 1. Clone Repository

```bash
git clone https://github.com/Amank326/Azure-Cosmos-DB.git
cd Azure-Cosmos-DB
```

### 2. Backend Setup

```bash
# Navigate to backend
cd students-CRUD-mockAPIs

# Create Python virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On Linux/Mac:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your credentials
cp .env.example .env
```

**Edit `.students-CRUD-mockAPIs/.env`** with your Azure Cosmos DB credentials:
```
COSMOS_URI=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-primary-key
DATABASE_NAME=rungta
CONTAINER_NAME=student
```

### 3. Frontend Setup

```bash
# From root directory, navigate to frontend
cd frontend

# Install dependencies
npm install
```

## ▶️ Running the Application

### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Backend**
```bash
cd students-CRUD-mockAPIs
# Activate virtual environment first
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac

# Run backend
python app.py
```

Expected output:
```
 * Running on http://127.0.0.1:8000
 * Press CTRL+C to quit
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Option 2: Using Concurrently (Single Terminal)

Add to root `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"cd students-CRUD-mockAPIs && python app.py\" \"cd frontend && npm run dev\""
  }
}
```

Then run:
```bash
npm install -D concurrently
npm run dev
```

## 🌐 Access Application

- **Frontend UI**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **API Endpoints**: [http://127.0.0.1:8000/students](http://127.0.0.1:8000/students)

## 📊 Sample Data

### Load Sample Data (Optional)

From `students-CRUD-mockAPIs` directory:
```bash
python seed_data.py
```

Or create a student via the UI:
1. Click "Add Student" button
2. Fill in the form:
   - Roll: U001
   - Name: Aman Kumar
   - Branch: CSE
   - GPA: 8.5
3. Click Save

## ✨ Features Overview

### Frontend
- ✅ Create new students
- ✅ View all students in table
- ✅ Sort by name, branch, roll, GPA
- ✅ Paginate results (5/10/25/50 rows)
- ✅ Edit student information
- ✅ Delete students with confirmation
- ✅ Dark/Light theme toggle
- ✅ Real-time error notifications

### Backend
- ✅ 6 RESTful API endpoints
- ✅ Azure Cosmos DB integration
- ✅ CRUD operations
- ✅ Error handling
- ✅ Input validation

## 🧪 Testing

### Test via Frontend UI
1. Navigate to http://localhost:5173
2. Click "Add Student"
3. Fill form and click Save
4. See student appear in table
5. Edit or delete as needed

### Test via API (cURL)

**Get all students:**
```bash
curl http://localhost:8000/students
```

**Create student:**
```bash
curl -X POST http://localhost:8000/student \
  -H "Content-Type: application/json" \
  -d '{
    "roll": "U001",
    "name": "Aman Kumar",
    "branch": "CSE",
    "gpa": 8.5
  }'
```

**Update student:**
```bash
curl -X PUT http://localhost:8000/student/U001 \
  -H "Content-Type: application/json" \
  -d '{"gpa": 9.0}'
```

**Delete student:**
```bash
curl -X DELETE http://localhost:8000/student/U001
```

## 🔧 Troubleshooting

### Backend Issues

**Problem: Backend won't start**
```
Error: ModuleNotFoundError: No module named 'flask'
```
**Solution:**
```bash
# Activate virtual environment
.venv\Scripts\activate
# Reinstall dependencies
pip install -r requirements.txt
```

**Problem: Cosmos DB connection error**
```
Error: Invalid cosmosdb credentials
```
**Solution:**
1. Check `.env` file exists and has correct credentials
2. Verify credentials in Azure Portal
3. Ensure network allows connection

**Problem: Port 8000 already in use**
```
Error: Address already in use
```
**Solution:**
```bash
# Edit app.py and change port in last line:
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8001, debug=True)
```

### Frontend Issues

**Problem: npm dependencies won't install**
```
Error: npm ERR! code ERESOLVE
```
**Solution:**
```bash
npm install --legacy-peer-deps
```

**Problem: Port 5173 already in use**
```
Error: Port 5173 is already in use
```
**Solution:**
```bash
npm run dev -- --port 5174
```

**Problem: Cannot reach backend from frontend**
```
Error: Cannot reach http://127.0.0.1:8000
```
**Solution:**
1. Ensure backend is running
2. Check API URL in `frontend/src/App.tsx`
3. Verify CORS is enabled in backend
4. Check browser console for specific error

### Common Solutions

**Clear cache and reinstall:**
```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd ../students-CRUD-mockAPIs
rm -rf .venv
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

**Restart from scratch:**
```bash
# Kill both processes (Ctrl+C in both terminals)
# Then run setup again from "Running the Application"
```

## 📦 Production Deployment

### Build Frontend

```bash
cd frontend
npm run build
```

Output in `frontend/dist/`

### Deploy Backend

See `DEPLOYMENT.md` for detailed instructions for:
- Azure App Service
- Heroku
- Docker
- VPS

## 📚 Documentation

- **Full Project**: See `README.md`
- **Frontend Details**: See `FRONTEND.md`
- **Backend Details**: See `students-CRUD-mockAPIs/README.md`
- **API Reference**: See `API_DOCUMENTATION.md`
- **Deployment**: See `DEPLOYMENT.md`

## 🎓 Project Structure

```
azure4/
├── frontend/                    # React + TypeScript + Material-UI
│   ├── src/
│   │   ├── App.tsx
│   │   ├── types.ts
│   │   ├── index.css
│   │   └── components/
│   ├── package.json
│   └── vite.config.ts
│
└── students-CRUD-mockAPIs/      # Flask Backend
    ├── app.py
    ├── connect.py
    ├── seed_data.py
    ├── requirements.txt
    └── .env.example
```

## 🚦 Status Check

Everything working? Check:
- ✅ Backend running at http://127.0.0.1:8000
- ✅ Frontend running at http://localhost:5173
- ✅ Can see students in table
- ✅ Can create new student
- ✅ Can edit/delete students
- ✅ Theme toggle works
- ✅ Error notifications appear

## 💡 Tips

- Keep both terminals open during development
- Use browser DevTools for frontend debugging
- Check browser console for API errors
- Check terminal output for backend errors
- Refresh browser if frontend seems stuck
- Verify .env credentials if DB errors occur

## 🤝 Next Steps

1. **Customize**: Modify components and styling
2. **Extend**: Add more fields to student data
3. **Deploy**: Use deployment guide for production
4. **Integrate**: Connect with other services
5. **Enhance**: Add authentication, authorization

## 📞 Support

- Check this guide
- Review error messages carefully
- Look at console logs (browser and terminal)
- Read main README.md
- Check GitHub issues

---

**Ready to develop?** Start with Terminal 1 & 2 above and you're good to go! 🎉

**Last Updated**: December 2025
