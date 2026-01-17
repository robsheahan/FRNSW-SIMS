# Quick Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Name it: `frnsw-sims-dashboard`
4. Choose **Public** or **Private** (your preference)
5. **DO NOT** initialize with README (we already have one)
6. Click **"Create repository"**

## Step 2: Push Code to GitHub

Copy the repository URL from GitHub (looks like: `https://github.com/YOUR_USERNAME/frnsw-sims-dashboard.git`)

Then run these commands in your terminal:

```bash
cd /home/robsheahan/frnsw-sims-dashboard

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/frnsw-sims-dashboard.git

# Push to GitHub
git push -u origin main
```

You may be prompted for your GitHub credentials.

## Step 3: Deploy to Vercel

### Option A: Using Vercel Website (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"** (you can use your GitHub account)
3. Click **"Add New..."** → **"Project"**
4. Click **"Import Git Repository"**
5. Authorize Vercel to access your GitHub repositories
6. Find and select **"frnsw-sims-dashboard"**
7. Vercel will auto-detect it's a Vite project
8. Click **"Deploy"**

That's it! Vercel will:
- Install dependencies (`npm install`)
- Build the project (`npm run build`)
- Deploy to a URL like `https://frnsw-sims-dashboard.vercel.app`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy (follow the prompts)
cd /home/robsheahan/frnsw-sims-dashboard
vercel
```

## Step 4: View Your Live App

Once deployed, you'll get a URL like:
- `https://frnsw-sims-dashboard.vercel.app`
- `https://frnsw-sims-dashboard-username.vercel.app`

You can share this URL with anyone to demo the prototype!

## Making Updates

After making changes to your code:

```bash
# Commit changes
git add .
git commit -m "Description of changes"
git push

# Vercel will automatically redeploy!
```

## Troubleshooting

### "npm: command not found"

You need to install Node.js first:
- Download from [nodejs.org](https://nodejs.org)
- Or use a package manager like Homebrew (Mac) or apt (Linux)

### Push to GitHub fails

Make sure you've:
1. Set up Git credentials
2. Added the correct remote URL
3. Have permission to push to the repository

### Vercel build fails

Check the build logs in Vercel dashboard. Common issues:
- Missing dependencies (make sure `package.json` is correct)
- Build errors (test `npm run build` locally first)

## Testing Locally Before Deployment

Always test locally first:

```bash
cd /home/robsheahan/frnsw-sims-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:5173
```

## Custom Domain (Optional)

Once deployed to Vercel, you can add a custom domain:
1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `sims.frnsw.gov.au`)
4. Follow DNS configuration instructions

---

**Need help?** Check the full README.md for more details.
