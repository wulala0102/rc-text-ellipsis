# 🚀 Quick Start: Deploy to Vercel

## Method 1: One-Click Deploy (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "feat: add demo site"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Click "Deploy" (Vercel auto-detects the config!)

3. **Done!** 🎉
   Your site will be live at `https://your-project.vercel.app`

## Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Local Testing

Before deploying, test locally:

```bash
# Build the demo
npm run build:example

# Preview locally
npm run preview

# Visit http://localhost:4173
```

## What Gets Deployed?

- ✅ Demo site with all examples
- ✅ Full component documentation
- ✅ Interactive examples
- ✅ API reference table
- ✅ Responsive design

## Files for Deployment

- `demo/index.html` - Demo HTML template
- `demo/index.tsx` - Demo React app
- `vite.config.ts` - Build configuration
- `vercel.json` - Vercel settings
- `dist/` - Build output (auto-generated)

## Need Help?

- 📖 [Full Deployment Guide](./docs/DEPLOYMENT.md)
- 🐛 [Report Issues](https://github.com/wulala0102/rc-text-ellipsis/issues)

---

**Tip**: Vercel automatically deploys on every push to `main` branch!
