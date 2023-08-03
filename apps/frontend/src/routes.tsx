import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import StatusTweet from "./pages/StatusTweet";
import MainLayout from "./layouts/MainLayout";
import UserProfile from "./pages/UserProfile";



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
        index: true,
        element: <UserProfile />,
      },
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