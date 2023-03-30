import {MainLayout} from "./Layouts/MainLayout/MainLayout";
import {createBrowserRouter} from "react-router-dom";
import MapPage from "./pages/MapPage/MapPage";
import {MarkerInfoPage} from "./pages/MarkerInfoPage/MarkerInfoPage";
import {api} from "./api/api";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <MapPage />,
            },
            {
                path: '/markers/:id',
                element: <MarkerInfoPage />,
                loader: api.loadIndicatorsByMarkerId
            }
        ]
    }
]);