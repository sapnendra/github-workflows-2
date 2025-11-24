# !/bin/bash

# Run backend first
(cd backend && npm run dev) &

# Start the frontend
cd frontend && npm run dev
