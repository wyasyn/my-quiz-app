import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TableSection from "./components/tableSection.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Start from "./components/start.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Start />,
    },
    {
        path: "quiz",
        element: <App />,
    },
    {
        path: "table",
        element: <TableSection />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
    </ThemeProvider>
);
