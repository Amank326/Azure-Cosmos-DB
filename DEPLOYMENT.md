# 🚀 Deployment Guide

Complete guide to deploying Azure Cosmos DB Student CRUD API to production.

---

## 📋 Deployment Options

### Option 1: Azure App Service (Recommended)
- Easy Azure integration
- Automatic scaling
- Built-in monitoring
- Cost-effective

### Option 2: Azure Container Instances
- Containerized deployment
- Quick deployment
- Pay-per-second billing
- Docker required

### Option 3: Heroku
- Simple deployment
- Free tier available
- Easy CI/CD
- No Azure required

### Option 4: Self-hosted VPS
- Full control
- Cost-effective for scale
- Requires management
- Linux knowledge

---

## 🌩️ Option 1: Deploy to Azure App Service

### Prerequisites

- Azure account (Create free: https://azure.microsoft.com/free/)
- Azure CLI installed
- Git configured

### Installation Steps

#### Step 1: Install Azure CLI

**Windows:**
```bash
# Download and install from:
# https://aka.ms/installazurecliwindows

# Or use PowerShell
curl -sL https://aka.ms/InstallAzureCLIDeb | bash
```

**Mac:**
```bash
brew install azure-cli
```

**Linux:**
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | bash
```

#### Step 2: Login to Azure

```bash
az login
```

Browser will open for authentication.

#### Step 3: Create Resource Group

```bash
az group create \
  --name azure-cosmos-rg \
  --location eastus
```

#### Step 4: Create App Service Plan

```bash
az appservice plan create \
  --name azure-cosmos-plan \
  --resource-group azure-cosmos-rg \
  --sku B1 \
  --is-linux
```

#### Step 5: Create Web App

```bash
az webapp create \
  --resource-group azure-cosmos-rg \
  --plan azure-cosmos-plan \
  --name azure-cosmos-students \
  --runtime "PYTHON:3.10"
```

#### Step 6: Configure App Settings

```bash
az webapp config appsettings set \
  --name azure-cosmos-students \
  --resource-group azure-cosmos-rg \
  --settings \
    COSMOS_URI="your-cosmos-uri" \
    COSMOS_KEY="your-cosmos-key" \
    DATABASE_NAME="rungta" \
    CONTAINER_NAME="student" \
    FLASK_ENV="production"
```

#### Step 7: Deploy Code

```bash
# From project root
az webapp deployment source config-zip \
  --resource-group azure-cosmos-rg \
  --name azure-cosmos-students \
  --src project.zip
```

Or use Git deployment:

```bash
# Get git clone URL
az webapp deployment source config \
  --name azure-cosmos-students \
  --resource-group azure-cosmos-rg \
  --repo-url https://github.com/YOUR_USERNAME/Azure-Cosmos-DB.git \
  --branch main

# Push to deploy
git push azure main
```

#### Step 8: Verify Deployment

```bash
# Get app URL
az webapp show \
  --name azure-cosmos-students \
  --resource-group azure-cosmos-rg \
  --query "defaultHostName" \
  --output tsv

# Test API
curl https://azure-cosmos-students.azurewebsites.net/
```

---

## 🐳 Option 2: Deploy with Docker

### Create Dockerfile

```dockerfile
# Use Python runtime
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY students-CRUD-mockAPIs/ ./

# Expose port
EXPOSE 8000

# Set environment
ENV FLASK_ENV=production

# Run application
CMD ["python", "app.py"]
```

### Build Docker Image

```bash
# Build image
docker build -t azure-cosmos-api:1.0 .

# Test locally
docker run \
  -p 8000:8000 \
  -e COSMOS_URI="your-uri" \
  -e COSMOS_KEY="your-key" \
  azure-cosmos-api:1.0
```

### Push to Azure Container Registry

```bash
# Create registry
az acr create \
  --resource-group azure-cosmos-rg \
  --name azcosmos \
  --sku Basic

# Login to registry
az acr login --name azcosmos

# Tag image
docker tag azure-cosmos-api:1.0 \
  azcosmos.azurecr.io/azure-cosmos-api:1.0

# Push image
docker push azcosmos.azurecr.io/azure-cosmos-api:1.0

# Deploy to Container Instances
az container create \
  --resource-group azure-cosmos-rg \
  --name azure-cosmos-container \
  --image azcosmos.azurecr.io/azure-cosmos-api:1.0 \
  --cpu 1 \
  --memory 1 \
  --ports 8000 \
  --environment-variables \
    COSMOS_URI="your-uri" \
    COSMOS_KEY="your-key" \
  --registry-login-server azcosmos.azurecr.io \
  --registry-username <username> \
  --registry-password <password>
```

---

## 🦸 Option 3: Deploy to Heroku

### Prerequisites

- Heroku account (free at heroku.com)
- Heroku CLI installed

### Deployment Steps

#### Step 1: Install Heroku CLI

```bash
# Windows
choco install heroku-cli

# Mac
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

#### Step 2: Login to Heroku

```bash
heroku login
```

#### Step 3: Create Heroku App

```bash
heroku create azure-cosmos-api
```

#### Step 4: Create Procfile

```
web: python students-CRUD-mockAPIs/app.py
```

#### Step 5: Set Environment Variables

```bash
heroku config:set \
  COSMOS_URI="your-cosmos-uri" \
  COSMOS_KEY="your-cosmos-key" \
  DATABASE_NAME="rungta" \
  CONTAINER_NAME="student" \
  FLASK_ENV="production"
```

#### Step 6: Deploy

```bash
git push heroku main
```

#### Step 7: View Logs

```bash
heroku logs --tail
```

#### Step 8: Test Deployment

```bash
heroku open /
```

---

## 🖥️ Option 4: Self-Hosted (Linux VPS)

### Prerequisites

- Linux server (Ubuntu 18.04+)
- SSH access
- Domain name (optional)

### Setup Steps

#### Step 1: Connect to Server

```bash
ssh user@server-ip
```

#### Step 2: Install Python

```bash
sudo apt update
sudo apt install python3 python3-venv python3-pip
```

#### Step 3: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Azure-Cosmos-DB.git
cd Azure-Cosmos-DB
```

#### Step 4: Create Virtual Environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

#### Step 5: Install Dependencies

```bash
cd students-CRUD-mockAPIs
pip install -r requirements.txt
pip install gunicorn
```

#### Step 6: Setup Environment

```bash
cp .env.example .env
# Edit .env with credentials
nano .env
```

#### Step 7: Install & Configure Gunicorn

```bash
# Create systemd service file
sudo nano /etc/systemd/system/azure-cosmos.service
```

```ini
[Unit]
Description=Azure Cosmos DB Student API
After=network.target

[Service]
User=www-data
WorkingDirectory=/home/user/Azure-Cosmos-DB/students-CRUD-mockAPIs
ExecStart=/home/user/Azure-Cosmos-DB/.venv/bin/gunicorn \
  --workers 4 \
  --bind 0.0.0.0:8000 \
  app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

#### Step 8: Start Service

```bash
sudo systemctl daemon-reload
sudo systemctl start azure-cosmos
sudo systemctl enable azure-cosmos
```

#### Step 9: Configure Nginx (Optional)

```bash
sudo apt install nginx
```

Create config file:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable:

```bash
sudo ln -s /etc/nginx/sites-available/azure-cosmos \
  /etc/nginx/sites-enabled/

sudo nginx -t
sudo systemctl restart nginx
```

#### Step 10: Setup SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📊 Production Configuration

### Environment Variables

```env
COSMOS_URI=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-primary-key
DATABASE_NAME=rungta
CONTAINER_NAME=student
FLASK_ENV=production
FLASK_DEBUG=False
GUNICORN_WORKERS=4
```

### Application Settings

```python
# In app.py for production
if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=False,  # Disable debug
        threaded=True
    )
```

### Logging Configuration

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Remove all hardcoded secrets
- [ ] Use environment variables for credentials
- [ ] Enable HTTPS/SSL
- [ ] Set DEBUG=False
- [ ] Configure CORS properly
- [ ] Add authentication (API keys)
- [ ] Enable rate limiting
- [ ] Setup monitoring & logging
- [ ] Configure backup strategy
- [ ] Test all endpoints
- [ ] Load test application
- [ ] Plan disaster recovery
- [ ] Review security policies
- [ ] Enable firewall rules
- [ ] Setup log aggregation

---

## 📈 Monitoring & Maintenance

### Setup Monitoring

```bash
# Azure Monitor
az monitor metrics list \
  --resource-group azure-cosmos-rg \
  --resource-type "Microsoft.Web/sites" \
  --resource-name azure-cosmos-students
```

### View Logs

```bash
# Azure App Service
az webapp log tail \
  --name azure-cosmos-students \
  --resource-group azure-cosmos-rg
```

### Database Monitoring

```bash
# Monitor Cosmos DB
az cosmosdb show \
  --name cosmos-account \
  --resource-group azure-cosmos-rg
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: |
          cd students-CRUD-mockAPIs
          pip install -r requirements.txt
      
      - name: Run tests
        run: pytest
      
      - name: Deploy to Azure
        run: |
          # Deployment commands here
```

---

## 📊 Cost Estimation

### Azure App Service
- Free tier: $0/month (limited)
- B1: $10-15/month
- B2: $30-50/month

### Cosmos DB
- Free tier: 400 RU/s, 5GB storage
- Pay-as-you-go: ~$1.25 per 100 RU/s per hour

### Total Estimated Cost
- Development: Free to $10/month
- Small production: $50-100/month
- High traffic: $100-500+/month

---

## 🚨 Troubleshooting Deployment

### App Service Issues

```bash
# Check logs
az webapp log tail --name <app-name> --resource-group <rg>

# Check app status
az webapp show --name <app-name> --resource-group <rg>

# Restart app
az webapp restart --name <app-name> --resource-group <rg>
```

### Docker Issues

```bash
# Check image
docker images

# Check container logs
docker logs <container-id>

# Rebuild image
docker build --no-cache -t azure-cosmos-api:1.0 .
```

### Heroku Issues

```bash
# Check logs
heroku logs --tail

# Check config
heroku config

# Restart app
heroku restart
```

---

## 📚 Related Documentation

- See [SETUP.md](SETUP.md) - Local setup
- See [ADVANCED_FEATURES.md](ADVANCED_FEATURES.md) - Advanced topics
- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Problem solving

---

## 🔗 Resources

- [Azure App Service Docs](https://docs.microsoft.com/azure/app-service/)
- [Azure Cosmos DB Docs](https://docs.microsoft.com/azure/cosmos-db/)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Gunicorn Documentation](https://gunicorn.org/)
- [Nginx Documentation](https://nginx.org/)

---

**Last Updated:** December 2025  
**Version:** 1.0  
**Status:** Production-ready deployment guide
