# CS Visualizer

An educational web application for visualizing computer science concepts, data structures, and algorithms.

## Project Structure

```
CS_Visualizer/
├── backend/           # Flask API server
│   ├── app.py        # Main Flask application
│   └── requirements.txt
└── frontend/         # React frontend
    ├── src/
    ├── public/
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Create and activate a Python virtual environment:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will run on http://localhost:5000

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:3000

## Development

- Backend API endpoints are prefixed with `/api`
- Frontend is built with React + TypeScript + TailwindCSS
- Dark mode support is included by default
- The example includes a linked list visualization

## Current Features

- Linked List visualization demo
- Dark/Light mode toggle
- Responsive design
- REST API endpoint example

## Next Steps

1. Add more data structure visualizations
2. Implement animations for operations
3. Add machine learning concept visualizations
4. Enhance UI/UX with more interactive elements