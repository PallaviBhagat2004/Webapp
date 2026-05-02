# Simple React + Node.js App

A minimal full-stack app perfect for practicing Azure Pipelines.

## Project Structure
```
simple-app/
├── backend/         (Node.js + Express API)
│   ├── server.js
│   └── package.json
└── frontend/        (React app)
    ├── src/
    ├── public/
    └── package.json
```

## How to Run Locally

### Backend
```bash
cd backend
npm install
npm start
```
Backend runs on http://localhost:5000

### Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm start
```
Frontend runs on http://localhost:3000

## API Endpoints
- `GET /api/hello` → returns greeting
- `GET /api/users` → returns user list

## Next Step: Push to Azure Repos
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-azure-repo-url>
git push -u origin main
```

## Sample Build Pipeline (azure-pipelines.yml)

```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

stages:
  - stage: BuildBackend
    jobs:
      - job: Backend
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '18.x'
            displayName: 'Install Node.js'

          - script: |
              cd backend
              npm install
              npm test
            displayName: 'Install backend dependencies and test'

          - task: ArchiveFiles@2
            inputs:
              rootFolderOrFile: 'backend'
              includeRootFolder: false
              archiveFile: '$(Build.ArtifactStagingDirectory)/backend.zip'
            displayName: 'Archive backend'

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: '$(Build.ArtifactStagingDirectory)'
              artifactName: 'backend-artifact'
            displayName: 'Publish backend artifact'

  - stage: BuildFrontend
    jobs:
      - job: Frontend
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '18.x'
            displayName: 'Install Node.js'

          - script: |
              cd frontend
              npm install
              npm run build
            displayName: 'Install frontend dependencies and build'

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: 'frontend/build'
              artifactName: 'frontend-artifact'
            displayName: 'Publish frontend artifact'
```
