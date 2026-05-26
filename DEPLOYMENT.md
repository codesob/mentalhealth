# MindHeal - Deployment Guide

This guide provides comprehensive instructions for deploying the MindHeal mental health platform to various hosting services.

## 📋 Prerequisites

Before deploying, ensure you have:
- Git repository pushed to GitHub (✅ Already done!)
- Source code committed (✅ Completed!)
- Environment variables ready (if using authentication features)

## 🚀 Recommended: Deploy to Vercel (Best for Next.js)

Vercel is the recommended platform as it's built by the Next.js team and provides optimal performance.

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Visit Vercel**: Go to [https://vercel.com](https://vercel.com)

2. **Sign Up/Login**: Use your GitHub account to sign in

3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `codesob/mentalhealth` from your GitHub repositories
   - Click "Import"

4. **Configure Project**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

5. **Environment Variables** (if needed):
   - Add any environment variables from your `.env.local` file
   - Example: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, database credentials, etc.

6. **Deploy**: Click "Deploy" button

7. **Access Your Site**:
   - Vercel will provide a URL like: `https://mentalhealth-xxx.vercel.app`
   - You can add a custom domain later in project settings

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally (requires authentication)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

## 🌐 Alternative Deployment Options

### Deploy to Netlify

1. Visit [https://app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `codesob/mentalhealth`
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Framework: Next.js (auto-detected)
5. Click "Deploy site"

### Deploy to Cloudflare Pages

1. Visit [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to "Workers & Pages" → "Create application" → "Pages"
3. Connect to GitHub and select `codesob/mentalhealth`
4. Configure:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
5. Click "Save and Deploy"

### Deploy to Railway

1. Visit [https://railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `codesob/mentalhealth`
4. Railway will auto-detect Next.js and deploy
5. Access your app via the generated Railway URL

### Deploy to Render

1. Visit [https://render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub and select `codesob/mentalhealth`
4. Configure:
   - Name: mentalhealth
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Click "Create Web Service"

### Deploy to Fly.io

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly.io
flyctl auth login

# Initialize and deploy
flyctl launch
flyctl deploy
```

## 🔐 Environment Variables

If you're using authentication or database features, make sure to add these environment variables to your hosting platform:

```env
NEXTAUTH_URL=https://your-deployed-url.com
NEXTAUTH_SECRET=your-secret-key-here
DATABASE_URL=your-database-connection-string
# Add any other required variables
```

## 📊 Current Status

✅ **Repository**: https://github.com/codesob/mentalhealth
✅ **Latest Commit**: Redesign MindHeal platform with modern responsive UI
✅ **Branch**: main
✅ **Source Code**: All committed and pushed
✅ **Build Files**: Properly ignored in .gitignore
✅ **Configuration**: vercel.json created for optimal Vercel deployment

## 🎨 Features Deployed

- ✅ Modern responsive design (mobile, tablet, desktop)
- ✅ Glass-morphism UI with purple gradient theme
- ✅ Mobile hamburger navigation menu
- ✅ Hero section with animated stats
- ✅ Feature cards with hover effects
- ✅ Testimonials carousel
- ✅ Touch-optimized interactions
- ✅ Fluid typography with clamp()
- ✅ Accessibility features (reduced motion, safe areas)

## 🔍 Post-Deployment Checklist

After deployment:
1. ✅ Visit the deployed URL to verify the site works
2. ✅ Test on mobile devices (responsive design)
3. ✅ Test all navigation links
4. ✅ Verify chat and therapy pages load correctly
5. ✅ Check browser console for any errors
6. ✅ Test authentication if configured
7. ✅ Configure custom domain (optional)

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (should be 18.x or higher)
- Verify all dependencies in package.json
- Check build logs for specific errors

### Site Loads But Features Don't Work
- Verify environment variables are set correctly
- Check browser console for JavaScript errors
- Ensure API routes are accessible

### Styling Issues
- Clear browser cache
- Verify globals.css is being loaded
- Check for CSS import errors in build logs

## 📞 Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Cloudflare Pages: https://developers.cloudflare.com/pages

---

**Ready to Deploy!** The code is committed and pushed to GitHub. Simply choose your preferred hosting platform above and follow the instructions.
