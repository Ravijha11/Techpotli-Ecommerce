# TechPotli Netlify Deployment Script
Write-Host "🚀 Starting TechPotli deployment to Netlify..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (Test-Path "out") {
    Write-Host "✅ Build successful! Output directory created." -ForegroundColor Green
    
    # Display deployment options
    Write-Host "`n🎯 Deployment Options:" -ForegroundColor Cyan
    Write-Host "1. Deploy via Netlify UI (Recommended):" -ForegroundColor White
    Write-Host "   - Go to https://netlify.com" -ForegroundColor Gray
    Write-Host "   - Click 'New site from Git'" -ForegroundColor Gray
    Write-Host "   - Connect your GitHub repository" -ForegroundColor Gray
    Write-Host "   - Set build command: npm run build" -ForegroundColor Gray
    Write-Host "   - Set publish directory: out" -ForegroundColor Gray
    
    Write-Host "`n2. Deploy via Netlify CLI:" -ForegroundColor White
    Write-Host "   - Install: npm install -g netlify-cli" -ForegroundColor Gray
    Write-Host "   - Login: netlify login" -ForegroundColor Gray
    Write-Host "   - Deploy: netlify deploy --prod --dir=out" -ForegroundColor Gray
    
    Write-Host "`n📁 Your built files are ready in the 'out' directory!" -ForegroundColor Green
    Write-Host "🌐 Ready for Netlify deployment!" -ForegroundColor Green
    
} else {
    Write-Host "❌ Build failed! Check the error messages above." -ForegroundColor Red
    exit 1
}
