#!/bin/bash

echo "🚀 Setting up Dutch Lingo - Local Development Environment"
echo "=============================================================="

# Check prerequisites
echo "📋 Checking prerequisites..."

command -v node >/dev/null 2>&1 || { echo "❌ Node.js required. Install from https://nodejs.org"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm required"; exit 1; }

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup Playwright
echo "🎭 Installing Playwright browsers..."
npx playwright install

# Create necessary directories
echo "📁 Creating project directories..."
mkdir -p tests/e2e tests/integration tests/unit
mkdir -p features/auth features/onboarding features/learning-session

# Copy environment template
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "✅ Created .env.local"
fi

echo ""
echo "✅ Setup complete! Run 'npm run dev' to start development."
echo ""
echo "Available commands:"
echo "  npm run dev         - Start development server"
echo "  npm run test:e2e    - Run E2E tests"
echo "  npm run docker:up   - Start Docker services"
echo ""
