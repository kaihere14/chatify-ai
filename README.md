
# Chatify AI Frontend  
![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-7.1.2-%23646CFF?logo=vite) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-38B2AC?logo=tailwind-css) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

**Chatify AI** – a sleek, React‑based web client that connects to the *Chatify* backend API and provides a real‑time AI‑powered chat experience.  
[Demo](#) • [Documentation](#) • [Issues](https://github.com/kaihere14/chatify-ai/issues)

---

## 📖 Overview  

**Chatify AI** is a sleek, React-based single-page application that provides a modern interface for interacting with AI services. It connects to the Chatify backend API to deliver a real-time, secure, and animated chat experience.

*   **Authentication**: Implements JWT access/refresh token logic with secure `localStorage` persistence.
*   **Account Management**: Includes a dedicated **Forgot Password** recovery flow alongside standard login/registration.
*   **Core Interface**: Renders the main **Forground** chat component once a user is authenticated.
*   **Modern Styling**: Leverages **TailwindCSS 4** for layout, **Framer Motion** for animations, and **React-Markdown** for rich AI response rendering.

Target audience: Developers looking for a production-ready frontend for AI chat services or a clean UI to pair with the Chatify backend.

Current version: `0.0.0` (development).  

---
## ✨ Features  

| Feature | Description | Status |
|---------|-------------|--------|
| **JWT Authentication** | Automatic token refresh and secure storage in `localStorage`. | ✅ Stable |
| **Password Recovery** | Integrated `ForgotPassword` component for account recovery. | ✅ Stable |
| **Responsive UI** | Mobile-first design powered by TailwindCSS 4. | ✅ Stable |
| **Animated Transitions** | Smooth entry/exit animations using Framer Motion. | ✅ Stable |
| **Markdown Support** | `react-markdown` renders rich message content and code blocks. | ✅ Stable |
| **Toast Notifications** | Non-intrusive feedback via `react-toastify`. | ✅ Stable |
| **Error Handling** | Graceful fallback on token expiry with auto-logout logic. | ✅ Stable |
| **Modular Architecture** | Decoupled `Auth`, `ForgotPassword`, and `Forground` components. | ✅ Stable |
| **Dark Mode Ready** | Default dark background optimized for chat readability. | ✅ Stable |

---
## 🛠️ Tech Stack  

| Category | Library / Tool | Reason |
|----------|----------------|--------|
| **Framework** | React 19.1.1 | Modern UI library with hooks. |
| **Bundler** | Vite 7.1.2 | Lightning-fast HMR and build performance. |
| **Styling** | TailwindCSS 4.1.13 + `@tailwindcss/typography` | Utility-first CSS, ready for dark mode. |
| **Animations** | Framer Motion 12.23.12 | Declarative animation API for fluid UI. |
| **HTTP Client** | Axios 1.7.2 | Promise-based API calls for backend sync. |
| **Icons** | react-icons 5.2.1 | Comprehensive SVG icon set. |
| **Markdown** | react-markdown 10.1.0 | Renders markdown in chat messages. |
| **Notifications** | react-toastify 11.0.5 | Toast UI for success/error feedback. |
| **Linting** | ESLint 9.33.0 | Code quality and standards enforcement. |

---
## 🏗️ Architecture  


chatify-ai/
├── Components/           # UI Components
│   ├── Auth.jsx          # Login / Register UI
│   ├── ForgotPassword.jsx # Password recovery flow
│   └── Forground.jsx     # Main chat UI (post‑login)
├── src/                  # Application Logic
│   ├── assets/           # Static assets
│   ├── App.jsx           # Root component – auth flow & routing
│   ├── main.jsx          # React entry point
│   ├── index.css         # Tailwind base + custom styles
│   └── App.css           # Component‑specific CSS
├── index.html            # Vite HTML template
├── vite.config.js        # Vite + Tailwind integration
└── package.json          # Scripts, dependencies, metadata


* **`App.jsx`** – Handles authentication checks on mount, stores the logged‑in user in state, and conditionally renders either `Auth` or `Forground`.
* **`Components/Auth.jsx`** – Presents login / registration forms, calls the backend, and notifies the parent (`App`) on success.  
* **`Components/Forground.jsx`** – The main chat interface (consumes the `user` prop).  
* **`main.jsx`** – Boots the React tree inside the `#root` element.  

All API calls go to the hosted backend: `https://chatify-backend-eight.vercel.app`. The base URL can be overridden via an environment variable.

---
## Getting Started  

### Prerequisites  

| Tool | Minimum version |
|------|-----------------|
| **Node.js** | 18.x |
| **npm** (or **pnpm** / **yarn**) | 9.x |
| **Git** | any |

> **Note**: The project uses the **ESM** module format (`"type": "module"` in `package.json`). Ensure your Node version supports it.

### Installation  

```bash
# Clone the repository
git clone https://github.com/kaihere14/chatify-ai.git
cd chatify-ai

# Install dependencies
npm install   # or: pnpm install / yarn install

# Run the development server
npm run dev   # Vite starts at http://localhost:5173
```

You should see a loading screen followed by the login form.  

### Configuration  

The frontend reads the backend URL from the environment variable `VITE_BACKEND_URL`. Create a `.env` file at the project root:

```dotenv
# .env
VITE_BACKEND_URL=https://chatify-backend-eight.vercel.app
```

If the variable is omitted, the default URL (`https://chatify-backend-eight.vercel.app`) is used.

#### Environment variables used

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Base URL for all backend API calls (`/me`, `/refresh`, …) | `https://chatify-backend-eight.vercel.app` |
| `VITE_APP_TITLE` (optional) | Title displayed in the browser tab | `Chatify AI` |

> **Tip**: Prefixing with `VITE_` makes the variable available in the client bundle (Vite convention).

---

## 🚀 Usage  

### Authentication flow (code excerpt)

jsx
// src/App.jsx
const checkAuth = async () => {
  try {
    const atoken = localStorage.getItem("accessToken");
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/me`, {
      headers: { Authorization: `Bearer ${atoken}` },
    });
    setUser(res.data.user);
  } catch (err) {
    // If access token expired (406), try refresh token
    if (err.response?.status === 406) {
      const rtoken = localStorage.getItem("refreshToken");
      const refreshRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/refresh`, {
        headers: { Authorization: `Bearer ${rtoken}` },
      });
      localStorage.setItem("accessToken", refreshRes.data.data.accessToken);
      checkAuth(); // retry with new token
    } else {
      setUser(null);
    }
  } finally {
    setLoading(false);
  }
};


### Basic UI flow  

1.  **Loading** – A centered loading indicator is shown while `checkAuth` validates tokens on mount.
2.  **Unauthenticated** – The `Auth` component handles login/registration. Successful login triggers `handleLoginSuccess`, which re-runs the authentication check.
3.  **Authenticated** – The `Forground` component is rendered, receiving the `user` object and providing the main chat interface.

### Toast notifications  

jsx
import { toast } from "react-toastify";

toast.success("Logged in successfully!");
toast.error("Invalid credentials");


All notifications are rendered via the `<ToastContainer />` located at the top level of `App.jsx`.

---
## Development  

```bash
# Lint the codebase
npm run lint

# Run tests (none defined yet – add Jest / Vitest as needed)
# npm test
```

### Code style  

* **ESLint** – Enforced by `eslint.config.js`.  
* **Prettier** – Not configured yet; recommended to add for consistent formatting.  

### Debugging tips  

* Open the browser devtools → **Network** tab to inspect API calls and token headers.  
* Use `console.log` statements (as in `checkAuth`) to verify token retrieval.  
* The `ToastContainer` will surface most runtime errors as toast messages (if you wrap calls with `try/catch` and `toast.error`).  

---

## Deployment  

### Production build  

```bash
npm run build   # Generates ./dist
npm run preview # Serves the built app locally (Vite preview)
```

The `dist` folder can be deployed to any static‑host provider (Vercel, Netlify, Cloudflare Pages, etc.).  

### Docker (optional)

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build & run:

```bash
docker build -t chatify-ai .
docker run -p 8080:80 chatify-ai
```

Visit `http://localhost:8080` to see the production bundle.

---

## API Documentation  

The frontend only consumes the following backend endpoints (all prefixed with `VITE_BACKEND_URL`):

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| `GET` | `/me` | Returns the current user object. | **Bearer accessToken** |
| `GET` | `/refresh` | Exchanges a refresh token for a new access token. | **Bearer refreshToken** |
| `POST` | `/login` | Authenticates a user (used inside `Auth.jsx`). | No |
| `POST` | `/register` | Creates a new user account. | No |
| `POST` | `/forgot-password` | Triggers password‑reset email. | No |
| `POST` | `/chat` | Sends a message to the AI and receives a response (used inside `Forground.jsx`). | **Bearer accessToken** |

> **Authentication** – All protected routes require the `Authorization: Bearer <token>` header. Tokens are stored in `localStorage` (`accessToken` & `refreshToken`).  

Error handling follows standard HTTP status codes; the UI treats `406` as “access token expired” and automatically attempts a refresh.

---

## Contributing  

1. **Fork** the repository.  
2. **Create a feature branch**: `git checkout -b feat/awesome-feature`.  
3. **Install dependencies** (`npm install`).  
4. **Make your changes** – ensure the app still builds (`npm run dev`).  
5. **Run the linter** (`npm run lint`).  
6. **Commit** with a clear message.  
7. **Open a Pull Request** against `main`.  

### Development workflow  

* **Feature branches** → PR → Code review → Merge.  
* Follow the existing file naming conventions (`PascalCase` for components).  
* Add unit/integration tests for new logic (Jest/Vitest recommended).  

### Code review guidelines  

* No console logs in production code (except for debugging in dev).  
* All new UI elements should be styled with Tailwind utilities.  
* Keep component responsibilities single‑purpose.  

---

## Troubleshooting  

| Issue | Solution |
|-------|----------|
| **App stays on “Loading…”** | Verify that `VITE_BACKEND_URL` is reachable and returns a valid JSON from `/me`. Check browser console for CORS or network errors. |
| **Login fails with 401** | Ensure the backend URL is correct and that the request payload matches the backend spec (`email` & `password`). |
| **Tokens not stored** | Confirm that the browser allows `localStorage`. Private/incognito mode may block it. |
| **Styles look broken** | Run `npm run build` to regenerate Tailwind CSS; check that `tailwind.config.cjs` includes the `src/**/*.jsx` paths. |
| **Toast notifications not appearing** | Make sure `<ToastContainer />` is rendered (it lives in `App.jsx`). |

For more help, open an issue or join the discussion in the repository’s **Discussions** tab.

---

## 🗺️ Roadmap  

- [ ] Add unit tests with Vitest for core components.  
- [ ] Implement dark‑mode toggle (Tailwind `dark:` utilities).  
- [ ] Introduce WebSocket support for real‑time streaming responses.  
- [ ] Provide a Docker Compose setup that also runs the backend locally.  
- [ ] Publish the package to npm as a reusable UI library.  

---
## License & Credits  

**License:** MIT © 2024 Kaihere14. See `LICENSE` for details.  

### Contributors  

- **Kaihere14** – Project author & maintainer.  

### Acknowledgments  

- **Vite** – Fast dev server & bundler.  
- **TailwindCSS** – Utility‑first CSS framework.  
- **OpenAI** – Inspiration for the AI chat concept.  

---