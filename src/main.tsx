import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./layouts/ErrorPage.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import { FontProvider } from "./contexts/FontProvider.tsx";
import FallbackLoading from "./components/loader/FallbackLoading.tsx";

const DictionaryPage = React.lazy(() => import("./pages/Dictionary"));

const routes = createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
        <Route index element={<DictionaryPage />} />
    </Route>,
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FontProvider>
            <Suspense fallback={<FallbackLoading />}>
                <RouterProvider router={router} />
            </Suspense>
        </FontProvider>
    </React.StrictMode>,
);
