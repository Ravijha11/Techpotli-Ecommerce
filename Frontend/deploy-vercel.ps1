# TechPotli Vercel Deployment Script
Write-Host "🚀 Starting TechPotli deployment to Vercel..." -ForegroundColor Green

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI version: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

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
if (Test-Path ".next") {
    Write-Host "✅ Build successful! .next directory created." -ForegroundColor Green
    
    # Display deployment options
    Write-Host "`n🎯 Vercel Deployment Options:" -ForegroundColor Cyan
    Write-Host "1. Deploy via Vercel CLI (Recommended):" -ForegroundColor White
    Write-Host "   - Run: vercel login" -ForegroundColor Gray
    Write-Host "   - Run: vercel --prod" -ForegroundColor Gray
    
    Write-Host "`n2. Deploy via Vercel Dashboard:" -ForegroundColor White
    Write-Host "   - Go to https://vercel.com" -ForegroundColor Gray
    Write-Host "   - Click 'New Project'" -ForegroundColor Gray
    Write-Host "   - Import your GitHub repository" -ForegroundColor Gray
    Write-Host "   - Set Root Directory to: Frontend" -ForegroundColor Gray
    Write-Host "   - Deploy!" -ForegroundColor Gray
    
    Write-Host "`n📁 Your built files are ready in the '.next' directory!" -ForegroundColor Green
    Write-Host "🌐 Ready for Vercel deployment!" -ForegroundColor Green
    
} else {
    Write-Host "❌ Build failed! Check the error messages above." -ForegroundColor Red
    exit 1
}
