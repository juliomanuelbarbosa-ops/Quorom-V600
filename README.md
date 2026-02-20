# The Quorum OS v600.0

**Neural Command & Control Interface**

The Quorum OS is an advanced, AI-powered command and control interface designed for deep intelligence gathering, neural operations, and real-time system management. This iteration, v600.0, focuses on expanding core capabilities, enhancing neural intelligence, and establishing robust full-stack architecture for scalable and secure operations.

## Key Features & Enhancements

1.  **Global Command Palette (Ctrl+K)**: Unified interface for quick navigation, Neural Operator commands, and Neural Library search.
2.  **Neural Dashboard Intelligence**: Upgraded "Neural Briefing Room" with daily intelligence summaries from `IntelFeed` and `ChainSight` whale alerts, and active missions from `DeveloperRoadmapExplorer`.
3.  **Real-Time Operator Presence**: "Presence Substrate" with a sidebar widget for "Live Operators" and a global chat "Shoutbox" persisting in `Supabase Substrate`.
4.  **Bio-Neural Integration (Real Data)**: Real OAuth integrations for `BioMonitor` with Fitbit, Strava, Apple Health, granting XP for physical activity in the `Mission Log`.
5.  **Tactical "War-Driving" in Signal Nexus**: Enhanced `SignalNexus` map with persistence (saving discovered hotspots to `NeuralLibrary`) and heatmaps for signal density visualization.
6.  **Geo Vigilance Hub**: New hub for real-time information on earthquakes, storms, hurricanes, live camera feeds, explosions, high-casualty events, and conflicts.

## Architecture Improvements

This version introduces significant architectural upgrades to ensure scalability, security, and maintainability:

*   **Full-Stack Express Backend**: A dedicated `server.ts` Express application handles API requests, including a server-side AI proxy for secure Gemini API calls.
*   **Client-Side Lazy Loading**: `App.tsx` now uses React's `lazy` and `Suspense` for dynamic module loading, drastically reducing initial bundle size and improving performance.
*   **Strict TypeScript**: `tsconfig.json` is configured for strict type checking, enhancing code quality and reducing bugs.
*   **ESLint & Prettier**: Integrated for consistent code style and quality across the project.
*   **Dockerization**: The entire application (frontend + backend) is containerized for consistent development and deployment environments.

## Getting Started

### Prerequisites

*   Node.js (v20 or higher)
*   npm
*   Docker & Docker Compose (for containerized setup)

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd the-quorum-v600.0
    ```

2.  **Environment Variables:**
    Create a `.env` file in the root directory based on `.env.example`:
    ```env
    # .env.example
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    PORT=3000
    # Add other environment variables as needed for OAuth, etc.
    ```
    **Important**: Obtain your `GEMINI_API_KEY` from Google AI Studio.

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```
This will compile the React frontend and TypeScript backend into the `dist/` directory.

### Running in Production

```bash
npm start
```
This command runs the compiled Express server, which then serves the static React build.

### Docker

To build and run the application using Docker Compose:

1.  **Build the Docker images:**
    ```bash
    docker-compose build
    ```

2.  **Start the containers:**
    ```bash
    docker-compose up
    ```
    The application will be available at `http://localhost:3000`.

## Code Quality

*   **Linting:** `npm run lint`
*   **Formatting:** `npm run format`

## Deployment

The application is designed for deployment on platforms like Vercel (for the client) and a Node.js server (for the backend API). Dockerization ensures a consistent environment across deployment targets.

## Contributing

Contributions are welcome! Please ensure your code adheres to the ESLint and Prettier configurations.

---

**QUORUM OS v600.0 - NEURAL LINK ESTABLISHED.**
