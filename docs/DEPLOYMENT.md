# Deployment Guide

## Deploying to Vercel

This project includes a demo site that showcases the rc-text-ellipsis component functionality.

### Prerequisites

- A [Vercel account](https://vercel.com/signup)
- Git repository hosted on GitHub, GitLab, or Bitbucket

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wulala0102/rc-text-ellipsis)

### Manual Deployment

#### Option 1: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

#### Option 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Click "Deploy"

### Configuration

The project includes a `vercel.json` configuration file:

```json
{
  "buildCommand": "npm run build:example",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": null
}
```

### Build Commands

```bash
# Build the demo site
npm run build:example

# Preview the build locally
npm run preview

# Start development server
npm run dev
```

### Project Structure

```
rc-text-ellipsis/
├── demo/                  # Demo site source
│   ├── index.html        # HTML template
│   └── index.tsx         # Demo application
├── dist/                  # Build output (created after build)
├── vite.config.ts        # Vite configuration
└── vercel.json           # Vercel configuration
```

### Environment Variables

No environment variables are required for the demo site.

### Custom Domain

To use a custom domain:

1. Go to your project on Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow the DNS configuration instructions

### Continuous Deployment

Vercel automatically deploys:

- **Production**: When you push to the `main` branch
- **Preview**: For all pull requests and other branches

### Build Settings

- **Framework Preset**: None (Custom)
- **Build Command**: `npm run build:example`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher (specified in package.json)

### Troubleshooting

#### Build fails with "Module not found"

Make sure all dependencies are listed in `package.json`:
```bash
npm install
npm run build:example
```

#### TypeScript errors during build

Verify your TypeScript configuration:
```bash
npx tsc --noEmit
```

#### Assets not loading

Check that asset paths in the demo are relative and correct:
- CSS: `import '../assets/index.css'`
- Images: Use public directory or import them

### Performance Optimization

The demo site is optimized for performance:

- ✅ Code splitting
- ✅ Minified assets
- ✅ Gzip compression
- ✅ React production build
- ✅ Fast page loads

### Monitoring

View deployment analytics on the Vercel Dashboard:
- Visitor stats
- Page load times
- Error tracking
- Traffic sources

### Local Preview

Test the production build locally:

```bash
npm run build:example
npm run preview
```

Visit `http://localhost:4173` to see the preview.

### Rollback

To rollback to a previous deployment:

1. Go to Vercel Dashboard → Your Project
2. Click on "Deployments"
3. Find the previous successful deployment
4. Click the three dots → "Promote to Production"

## Deploying to Other Platforms

### Netlify

1. Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build:example"
     publish = "dist"
   ```

2. Connect repository on Netlify Dashboard

### GitHub Pages

1. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/rc-text-ellipsis"
   ```

2. Deploy:
   ```bash
   npm run build:example
   npx gh-pages -d dist
   ```

### Cloudflare Pages

1. Connect repository on Cloudflare Dashboard
2. Set build command: `npm run build:example`
3. Set output directory: `dist`

## Support

For deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Project Issues](https://github.com/wulala0102/rc-text-ellipsis/issues)
