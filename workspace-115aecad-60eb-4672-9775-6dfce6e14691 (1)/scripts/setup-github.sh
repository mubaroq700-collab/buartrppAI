#!/bin/bash

# RPP AI Pagurukiki - GitHub Setup Script
# Script ini akan membantu setup repository untuk publish ke GitHub

echo "🚀 RPP AI Pagurukiki - GitHub Setup Script"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Initial commit
echo "💾 Creating initial commit..."
git commit -m "🎉 Initial commit: RPP AI Pagurukiki v1.0.0

✨ Features:
- AI-powered RPP generation
- 6 RPP templates (Kurikulum Merdeka, K-13, STEM, etc.)
- Teacher and school identity integration
- Multiple export formats (TXT, PDF)
- Responsive design
- Edit & preview functionality

🛠 Tech Stack:
- Next.js 15 with TypeScript
- Tailwind CSS + shadcn/ui
- ZAI SDK for AI integration
- jsPDF for export functionality

📚 Documentation:
- Complete README.md
- Deployment guide
- Contributing guidelines
- CI/CD pipeline

🔧 Ready for deployment to Vercel, Netlify, and other platforms!"

# Check if remote exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "🔗 Please add your GitHub repository as remote:"
    echo "   git remote add origin https://github.com/your-username/rpp-ai-pagurukiki.git"
    echo ""
    echo "📝 After adding remote, run:"
    echo "   git push -u origin main"
else
    echo "✅ Remote origin already exists"
    echo "🚀 Pushing to GitHub..."
    git push -u origin main
fi

echo ""
echo "🎉 Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update package.json with your GitHub username"
echo "2. Update README.md with your information"
echo "3. Set up ZAI_API_KEY in your deployment platform"
echo "4. Deploy to your preferred platform"
echo ""
echo "📚 Check these files for more information:"
echo "- README.md - Complete documentation"
echo "- DEPLOYMENT.md - Deployment guide"
echo "- CONTRIBUTING.md - Contributing guidelines"
echo ""
echo "🌟 Happy coding with RPP AI Pagurukiki!"