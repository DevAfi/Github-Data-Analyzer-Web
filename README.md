# 🔍 GitHub Data Analyzer Web
**Python** **React** **Flask** **Material-UI** **License** **Web** **API**

## Overview
A comprehensive, full-stack web application for analyzing GitHub repositories with beautiful visualizations and deep insights. Features include:

🔍 **Repository Analysis** - Deep insights into any public GitHub repository  
📊 **Health Score Calculation** - Multi-factor repository health assessment (activity, contributors, documentation)  
📈 **Commit Statistics** - Total commits, commits per day, most active day/hour analysis  
👥 **Contributor Analytics** - Top contributors with contribution percentages and visualizations  
💻 **Language Distribution** - Percentage breakdown of programming languages used  
🎨 **Beautiful UI** - Modern Material-UI design with smooth animations and responsive layout  
💾 **Smart Caching** - Local pickle-based caching to reduce API calls and improve performance  
🔐 **GitHub API Integration** - Secure token-based authentication with rate limit handling  
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices  
🔗 **URL Sharing** - Shareable repository analysis links via URL parameters  
📝 **Recent Searches** - Local storage of recently analyzed repositories for quick access  
⚡ **Fast Performance** - Optimized API calls with intelligent caching system  

This repo includes a complete full-stack application with a Flask REST API backend and a React frontend, providing production-ready GitHub repository analysis capabilities.

## Tech Stack

### Backend
- **Python 3.9+**: Core backend language
- **Flask 3.0.0**: Lightweight web framework for REST API
- **Flask-CORS 4.0.0**: Cross-origin resource sharing support
- **requests 2.31.0+**: HTTP library for GitHub API calls
- **python-dotenv 1.0.0+**: Environment variable management
- **gunicorn 21.2.0**: Production WSGI server
- **pickle**: Local caching system for API responses

### Frontend
- **React 19.2.0**: Modern UI library
- **Vite 7.2.2**: Fast build tool and dev server
- **Material-UI (MUI) 7.3.5**: Component library with beautiful design system
- **@mui/x-charts 8.17.0**: Advanced charting components
- **React Router 7.9.5**: Client-side routing
- **Axios 1.13.2**: HTTP client for API requests
- **Emotion**: CSS-in-JS styling solution

## Why I Built This
I created this GitHub analyzer to solve a real problem I faced - quickly understanding repository health, activity patterns, and contributor dynamics without manually digging through GitHub's interface. Commercial tools often require subscriptions or lack the specific insights I needed. I wanted something that was:

🔍 **Comprehensive** - Deep analysis beyond basic stats (stars, forks)  
📊 **Visual** - Beautiful charts and visualizations for easy understanding  
⚡ **Fast** - Smart caching to minimize API calls and improve response times  
🎨 **Beautiful** - Modern, polished UI that's actually pleasant to use  
📚 **Educational** - Learn about full-stack development, API integration, and data visualization  
🛠️ **Customizable** - Full control over analysis algorithms and UI components  
🔒 **Secure** - Proper token handling and rate limit management  

This project demonstrates my approach to building production-ready full-stack applications with a focus on user experience and performance optimization.

## Project Structure
```
Github-Data-Analyzer-Web/
  backend/
    app.py                    # Flask application entrypoint with API routes
    services/
      analyzer.py             # Core repository analysis logic and health scoring
      github_api.py           # GitHub API client with caching and error handling
      models.py               # Data models (RepoOverview, Contributor, CommitStats, HealthScore)
      cache.py                # Pickle-based caching system for API responses
      config.py               # Environment configuration and GitHub token management
    cache/                    # Cache directory for stored API responses (.pkl files)
    routes/                   # API route modules (extensible)
    requirements.txt          # Python dependencies
    Procfile                  # Heroku deployment configuration
    venv/                     # Python virtual environment (optional)
  
  frontend/
    src/
      App.jsx                 # Main React application component
      main.jsx                # React entrypoint
      pages/
        Results.jsx           # Results page with all visualizations
      components/
        Hero.jsx              # Hero section with search form
        Overview.jsx          # Repository overview card
        HealthScore.jsx        # Health score visualization with progress bars
        CommitChart.jsx       # Commit statistics chart
        ContributorChart.jsx  # Contributor distribution chart
        LanguageChart.jsx     # Language distribution pie chart
        RecentSearches.jsx    # Recent searches component
        LoadingSkeleton.jsx   # Loading state skeleton
      services/
        api.js                # API client for backend communication
      utils/
        storage.jsx           # Local storage utilities
        theme.js              # Material-UI theme configuration
    package.json              # Node.js dependencies
    vite.config.js            # Vite configuration
    dist/                     # Production build output
  
  README.md
```

## Security Model (Production-Ready)
- **GitHub Token Management**: Secure environment variable handling for API authentication
- **CORS Configuration**: Configurable allowed origins for cross-origin requests
- **Rate Limit Handling**: Automatic detection and user-friendly error messages for API limits
- **Error Handling**: Comprehensive error handling without exposing sensitive information
- **Input Validation**: Server-side validation of owner/repo parameters
- **Cache Security**: Local file-based caching with MD5 hashing for cache keys

## Getting Started

### 1) Requirements
- **Python 3.9+** (Backend)
- **Node.js 18+** and **npm** (Frontend)
- **GitHub Personal Access Token** (Optional, but recommended for higher rate limits)

### 2) Backend Setup

#### Create and activate a virtual environment (recommended)
```bash
# From project root
cd backend
python -m venv venv

# macOS/Linux
source venv/bin/activate

# Windows PowerShell
./venv/Scripts/Activate.ps1
# or Command Prompt
venv\Scripts\activate.bat
```

#### Install Python dependencies
```bash
pip install -r requirements.txt
```

#### Configure environment variables
Create a `.env` file in the `backend/` directory:
```env
GITHUB_TOKEN_CODE=your_github_personal_access_token_here
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
PORT=5000
FLASK_ENV=development
```

**Getting a GitHub Token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `public_repo` scope
3. Copy token to `.env` file

#### Run the backend server
```bash
# Development mode
python app.py

# Production mode (with gunicorn)
gunicorn app:app
```

The backend will run on `http://localhost:5000` by default.

### 3) Frontend Setup

#### Install Node.js dependencies
```bash
cd frontend
npm install
```

#### Run the development server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

#### Build for production
```bash
npm run build
```

The production build will be in the `frontend/dist/` directory.

## Usage

### Web Interface
1. Open `http://localhost:5173` in your browser
2. Enter a GitHub repository owner (e.g., `facebook`) and repository name (e.g., `react`)
3. Click "Analyze" to get comprehensive insights
4. View detailed visualizations including:
   - Repository overview (stars, forks, description, dates)
   - Health score breakdown (activity, contributors, documentation)
   - Commit statistics and activity patterns
   - Contributor distribution charts
   - Language distribution pie chart

### API Endpoints

#### Health Check
```bash
GET /api/health
```
Returns: `{"status": "ok"}`

#### Analyze Repository
```bash
POST /api/analyze
Content-Type: application/json

{
  "owner": "facebook",
  "repo": "react"
}
```

Returns comprehensive repository analysis including:
- `overview`: Repository metadata
- `commit_stats`: Commit statistics and patterns
- `contributors`: Top contributors with percentages
- `languages`: Language distribution percentages
- `health`: Multi-factor health score

### URL Sharing
You can share repository analysis links:
```
http://localhost:5173/?owner=facebook&repo=react
```

## Features

### Repository Health Scoring
The health score is calculated using three weighted factors:

1. **Activity Score (40%)**: Based on days since last update
   - ≤7 days: 100 points
   - 8-13 days: 80 points
   - 14-29 days: 60 points
   - ≥30 days: 40 points

2. **Contributor Score (30%)**: Based on number of active contributors
   - ≥50 contributors: 100 points
   - 20-49 contributors: 80 points
   - 10-19 contributors: 60 points
   - 5-9 contributors: 40 points
   - <5 contributors: 20 points

3. **Documentation Score (30%)**: Based on repository documentation
   - Description: 40 points
   - License: 30 points
   - Wiki enabled: 30 points
   - Maximum: 100 points

**Overall Rating:**
- 80-100: EXCELLENT
- 60-79: GOOD
- 40-59: FAIR
- 0-39: POOR

### Caching System
- **Local File Cache**: Pickle-based caching in `backend/cache/` directory
- **MD5 Hashing**: Cache keys generated from URL and parameters
- **Automatic Cache**: API responses cached automatically to reduce GitHub API calls
- **Cache Management**: Cache files persist across server restarts

### Recent Searches
- **Local Storage**: Recently analyzed repositories stored in browser localStorage
- **Quick Access**: Click on recent searches to quickly re-analyze repositories
- **Persistent**: Searches persist across browser sessions

## Configuration Files

- **`.env`** (backend): Environment variables for GitHub token, CORS origins, and port
- **`backend/cache/`**: Directory containing cached API responses (.pkl files)
- **`frontend/src/utils/storage.jsx`**: Local storage utilities for recent searches
- **`frontend/src/utils/theme.js`**: Material-UI theme configuration

## Deployment

### Heroku Deployment
The project includes a `Procfile` for Heroku deployment:

```procfile
web: gunicorn app:app
```

**Deployment Steps:**
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set GITHUB_TOKEN_CODE=your_token
   heroku config:set ALLOWED_ORIGINS=https://your-frontend-url.com
   ```
5. Deploy backend: `git push heroku main`
6. Deploy frontend to Vercel/Netlify or similar

### Environment Variables for Production
- `GITHUB_TOKEN_CODE`: Your GitHub personal access token
- `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend origins
- `PORT`: Server port (default: 5000)
- `FLASK_ENV`: Set to `production` for production mode

## Roadmap (Future Enhancements)

### Phase 2: Advanced Features 🔄
- Repository comparison (side-by-side analysis)
- Historical trend analysis (commit activity over time)
- Pull request statistics and merge patterns
- Issue tracking and resolution metrics
- Branch analysis and protection status
- Release history and version tracking

### Phase 3: Enhanced Analytics 🔄
- Contributor activity heatmaps
- Code review statistics
- Dependency analysis
- Security vulnerability scanning
- Performance metrics (CI/CD status)
- Community engagement metrics

### Phase 4: Polish & Testing 🔄
- Comprehensive unit tests and integration tests
- CI/CD pipeline setup
- Performance optimizations
- README visuals (demo GIFs/screenshots)
- Advanced error handling and retry logic
- Real-time updates with WebSocket support

## Lessons Learned & Challenges Faced

### 🔐 API Integration Challenges:
- **Rate Limiting**: Initially hit GitHub API rate limits frequently, learned to implement caching and rate limit detection
- **Token Management**: Discovered the importance of secure environment variable handling for production deployments
- **Error Handling**: Developed comprehensive error handling for various GitHub API error responses (404, 403, 429)

### 🎨 UI/UX Design Insights:
- **Material-UI Learning Curve**: Mastered MUI's theming system, component composition, and responsive design patterns
- **Animation Performance**: Learned to use React transitions (Fade, Slide) for smooth user experience without performance hits
- **Loading States**: Implemented skeleton loaders to improve perceived performance during API calls
- **Responsive Design**: Ensured the application works seamlessly across all device sizes

### 🏗️ Architecture Decisions:
- **Separation of Concerns**: Separated API client, analyzer logic, models, and UI into distinct modules
- **Caching Strategy**: Implemented file-based caching to reduce API calls while maintaining data freshness
- **State Management**: Used React hooks for state management, keeping the architecture simple and maintainable
- **Error Boundaries**: Implemented user-friendly error messages with helpful suggestions

### ⚡ Performance Considerations:
- **API Optimization**: Reduced GitHub API calls through intelligent caching
- **Bundle Size**: Optimized React bundle size with Vite's tree-shaking
- **Lazy Loading**: Considered code splitting for large components (future enhancement)
- **Memory Management**: Efficient handling of large repository data sets

### 🛠️ Development Process:
- **Full-Stack Integration**: Learned to coordinate backend API design with frontend component needs
- **CORS Configuration**: Understood the importance of proper CORS setup for development and production
- **Environment Management**: Implemented proper environment variable handling for different deployment stages
- **Version Control**: Maintained clean git history with proper commit messages

## Quick Start
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
# Create .env file with GITHUB_TOKEN_CODE
python app.py

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` and start analyzing repositories!

## Development Notes
- **Code Style**: Follow PEP 8 for Python, ESLint for JavaScript/React
- **API Design**: RESTful API with JSON responses, proper HTTP status codes
- **Error Handling**: User-friendly error messages with actionable suggestions
- **Caching**: MD5-based cache keys ensure unique identification of API requests
- **UI Framework**: Material-UI provides consistent design system and accessibility
- **Architecture**: Modular design with clear separation between services, models, and UI components

## Troubleshooting

### Installation Issues
- **Python version**: Ensure Python 3.9+ is installed (`python --version`)
- **Node.js version**: Ensure Node.js 18+ is installed (`node --version`)
- **Dependencies**: If installation fails, try clearing pip/npm cache and reinstalling

### API Issues
- **Rate Limit Errors**: Add a GitHub personal access token to `.env` file for higher rate limits (5000/hour vs 60/hour)
- **404 Errors**: Verify the repository owner and name are correct and the repository is public
- **403 Errors**: Check if your GitHub token has the correct permissions (`public_repo` scope)

### Caching Issues
- **Stale Data**: Delete cache files in `backend/cache/` directory to force fresh API calls
- **Cache Directory**: Ensure the `backend/cache/` directory exists and is writable

### Frontend Issues
- **Build Errors**: Clear `node_modules` and `package-lock.json`, then reinstall dependencies
- **CORS Errors**: Ensure `ALLOWED_ORIGINS` in backend `.env` includes your frontend URL
- **Port Conflicts**: Change ports in `vite.config.js` (frontend) or `.env` (backend) if ports are in use

### Performance Issues
- **Slow API Calls**: Enable caching (default) to reduce redundant GitHub API requests
- **Large Repositories**: Some repositories with thousands of commits may take longer to analyze
- **Memory Usage**: Clear cache periodically if analyzing many repositories

## License
MIT
