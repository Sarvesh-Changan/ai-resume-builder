import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/sign-in/SignInPage.jsx";
import Home from "./home/Home.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./dashboard/resume/[resumeId]/edit/EditResume.jsx";
import ViewResume from "./my-resume/[resumeId]/view/ViewResume.jsx";
import ErrorBoundary from './components/ErrorBoundary';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <ErrorBoundary><App /></ErrorBoundary>,
    errorElement: <ErrorBoundary><div>Something went wrong</div></ErrorBoundary>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element: <EditResume/>
      },
      {
        path: '/my-resume/:resumeId/view',
        element: <ViewResume/>,
        errorElement: <ErrorBoundary><div>Error loading resume</div></ErrorBoundary>
      }
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
