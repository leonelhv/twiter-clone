import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import StatusTweet from "./pages/StatusTweet";
import MainLayout from "./layouts/MainLayout";



const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/:username/status/:idTweet",
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