GitHub Search App

A simple application for searching GitHub repositories. Built with a modern React + TypeScript stack and modular architecture.

Project Architecture

src/api/ — GitHub API queries via Redux Toolkit Query
src/store/ — Redux store configuration
src/components/ — UI components (search, table, details dialog)
src/utils.ts — utility functions (date/number formatting, etc.)

Technologies

React + TypeScript — core stack
Redux Toolkit Query — data fetching and caching
Material UI (MUI) — UI components
Vite — build tool and dev server
Jest + React Testing Library — testing

Installation & Run
# Clone the repository
git clone https://github.com/your-username/github-search-app.git
cd github-search-app

# Install dependencies
npm install

# Run the dev server
npm run dev

Testing

Tests are written with Jest and React Testing Library, located in src/components/__tests__/.

Approach

Mock API requests (no external calls)

Verify states: loading, error, initial, empty, and data

Test interactions: search, pagination, open/close details dialog

Run tests
npm run test