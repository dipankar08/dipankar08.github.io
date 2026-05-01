#!/usr/bin/env bash
set -euo pipefail

echo "==> Checking prerequisites..."

if ! command -v node &>/dev/null; then
  echo "Error: node is not installed." >&2
  exit 1
fi

if ! command -v firebase &>/dev/null; then
  echo "Error: firebase-tools is not installed."
  echo "Install with: npm install -g firebase-tools"
  exit 1
fi

echo "==> Installing dependencies..."
yarn install --frozen-lockfile

echo "==> Building for production..."
yarn build

echo "==> Build output:"
du -sh out/
echo ""
find out -type f | head -30

echo ""
echo "==> Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo ""
echo "==> Deploy complete!"
