import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import StatusTweet from "./pages/StatusTweet";



const router = createBrowserRouter([
  {
    path: '/',
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