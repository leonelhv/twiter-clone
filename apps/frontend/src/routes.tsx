import {
    Navigate,
    createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import StatusTweet from "./pages/StatusTweet";
import MainLayout from "./layouts/MainLayout";



const router = createBrowserRouter([

    {
        path: '/home',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ]
    },
    {
        path: '/:username',
        element: <MainLayout />,
        children: [
            {
                path: "status/:idTweet",
                element: <StatusTweet />,
            },
        ]
    },
    {
        path: "*",
        element: <Navigate to="/home" replace />,
    }
])


export default router;