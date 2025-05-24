#!/bin/bash

echo "🚀 Setting up SignApp Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "📋 Creating .env.local file from example..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ .env.local file created. Please update it with your configuration."
else
    echo "⚠️  .env.local file already exists. Skipping creation."
fi

echo ""
echo "🎉 Frontend setup complete!"
echo ""
echo "Next steps:"
echo "1. Update the .env.local file with your API URL"
echo "2. Run 'npm run dev' to start the development server"
echo "3. The app will be available at http://localhost:3000"
echo ""
echo "Environment variables to configure:"
echo "- NEXT_PUBLIC_API_URL (default: http://localhost:5000)" 