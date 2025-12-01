# Student Mock API Service

A Flask-based REST API service for managing student data, using Azure Cosmos DB as the backend database. This service is designed for teaching purposes and can be deployed to Azure App Service.

## Features

- ✅ RESTful API with GET, POST, PUT, DELETE endpoints
- ✅ Azure Cosmos DB integration
- ✅ CORS enabled for frontend integration
- ✅ Ready for Azure App Service deployment
- ✅ Complete CRUD operations for student records

## API Endpoints

### Health Check
- **GET /** - Service health check and API documentation

### Students
- **GET /students** - Get all students
- **GET /students/{id}** - Get a specific student by ID
- **POST /students** - Create a new student
- **PUT /students/{id}** - Update an existing student
- **DELETE /students/{id}** - Delete a student

## Request/Response Examples

### Create Student (POST /students)
```json
{
  "name": "John Doe",
  "branch": "Computer Science",
  "email": "john@example.com",
  "rollNumber": "CS001"
}
```

### Response
```json
{
  "success": true,
  "message": "Student created successfully",
  "student": {
    "id": "generated-uuid",
    "name": "John Doe",
    "branch": "Computer Science",
    "email": "john@example.com",
    "rollNumber": "CS001"
  }
}
```

## Local Development Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application:**
   ```bash
   python app.py
   ```

3. **Test the API:**
   - The service will run on `http://localhost:8000`
   - Use Postman or curl to test endpoints

## Azure App Service Deployment

### Prerequisites
- Azure CLI installed
- Azure subscription
- Git installed

### Deployment Steps

1. **Login to Azure:**
   ```bash
   az login
   ```

2. **Create a resource group (if not exists):**
   ```bash
   az group create --name myResourceGroup --location eastus
   ```

3. **Create an App Service plan:**
   ```bash
   az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1 --is-linux
   ```

4. **Create the web app:**
   ```bash
   az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name your-unique-app-name --runtime "PYTHON:3.11"
   ```

5. **Configure startup command:**
   ```bash
   az webapp config set --resource-group myResourceGroup --name your-unique-app-name --startup-file "startup.txt"
   ```

6. **Deploy from local Git:**
   ```bash
   # Initialize git repository (if not already)
   git init
   git add .
   git commit -m "Initial commit"

   # Configure deployment
   az webapp deployment user set --user-name <username> --password <password>
   
   # Get Git URL
   az webapp deployment source config-local-git --name your-unique-app-name --resource-group myResourceGroup
   
   # Add Azure as remote and push
   git remote add azure <git-url-from-previous-command>
   git push azure main
   ```

7. **Access your API:**
   - Your API will be available at: `https://your-unique-app-name.azurewebsites.net`

### Alternative: Deploy using VS Code

1. Install the **Azure App Service** extension in VS Code
2. Sign in to Azure
3. Right-click on the `mockAPIs` folder
4. Select **Deploy to Web App**
5. Follow the prompts to select/create App Service

## Environment Variables (Optional)

For production, consider moving credentials to Azure App Service Configuration:

1. Go to Azure Portal → Your App Service → Configuration
2. Add Application Settings:
   - `COSMOS_URI`
   - `COSMOS_KEY`
   - `DATABASE_NAME`
   - `CONTAINER_NAME`

3. Update `connect.py` to read from environment variables:
   ```python
   import os
   COSMOS_URI = os.environ.get('COSMOS_URI', 'your-default-uri')
   ```

## Project Structure

```
mockAPIs/
├── app.py              # Main Flask application
├── connect.py          # Cosmos DB connection logic
├── requirements.txt    # Python dependencies
├── startup.txt         # Azure App Service startup command
├── runtime.txt         # Python version specification
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Cosmos DB Configuration

The service uses Azure Cosmos DB with the following configuration:
- **Database:** rungta
- **Container:** student
- **Partition Key:** /branch

## Teaching Notes

This mock API is designed for educational purposes and includes:
- Basic error handling
- Input validation
- RESTful design patterns
- Cloud database integration
- Production-ready deployment configuration

### Suggested Exercises for Students:
1. Add authentication middleware
2. Implement pagination for GET /students
3. Add query parameters for filtering
4. Create additional endpoints for courses or grades
5. Add request logging
6. Implement rate limiting

## Security Note

⚠️ **Important:** The current implementation has hardcoded credentials in `connect.py`. For production use:
- Move credentials to Azure Key Vault or App Service Configuration
- Use Managed Identity for Azure services
- Never commit credentials to version control

## License

This project is created for educational purposes.
