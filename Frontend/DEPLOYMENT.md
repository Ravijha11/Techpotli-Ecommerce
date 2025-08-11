# Netlify Deployment Guide for TechPotli

## Prerequisites
- GitHub account with your project repository
- Netlify account (free)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign in/Sign up

3. **Deploy from Git**
   - Click "New site from Git"
   - Choose GitHub
   - Select your TechPotli repository
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `out`
   - Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=out
   ```

## Build Configuration

The project is configured for static export:
- `next.config.mjs` has `output: 'export'`
- Build output goes to `out/` directory
- `netlify.toml` is configured for the build

## Custom Domain (Optional)

After deployment:
1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS as instructed

## Environment Variables

If you need environment variables:
1. Go to Site settings > Environment variables
2. Add any required variables

## Automatic Deploys

Netlify will automatically deploy when you push to your main branch.

## Troubleshooting

- Check build logs in Netlify dashboard
- Ensure all dependencies are in package.json
- Verify build command and publish directory
