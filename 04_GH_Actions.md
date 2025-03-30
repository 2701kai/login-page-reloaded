# GitHub Action

> implemented to check the sanity of the current project

## Add GH Action

```bash
mkdir -p .github/workflows
touch .github/workflows/deploy-check.yml
```

then

```yml
name: Deploy Sanity Check

on:
  push:
    branches: [main]

jobs:
  deploy-check:
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v3

      - name: 📦 Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "22.x"

      - name: ⚙️ Install Frontend Dependencies
        run: |
          npm ci

      - name: 🧪 Test Render Backend Login Endpoint
        run: |
          curl -X POST https://login-page-reloaded.onrender.com/api/auth/login \
            -H "Content-Type: application/json" \
            -d '{"username": "testuser", "password": "test123"}' \
            -i

      - name: 🧪 Check Vercel Frontend is Up
        run: |
          curl -I https://login-page-reloaded-git-main-2701kais-projects.vercel.app/ | head -n 1
```

then

```bash
git add .github/workflows/deploy-check.yml
git commit -m "add: deploy sanity check GitHub Action"
git push
```
