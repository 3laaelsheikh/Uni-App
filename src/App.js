import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import Groups from "./Components/Groups/Groups";
import Contact from "./Components/Contact/Contact";
import { AuthProvider } from "./Components/Context/authentication";
import Profile from "./Components/Profile/Profile";
import Allgroup from "./Components/Allgroup/Allgroup";
import Mygroup from "./Components/Mygroup/Mygroup";
import Creategroup from "./Components/Creategroup/Creategroup";
import Adminpage from "./Components/Adminpage/Adminpage";
import { Toaster } from "react-hot-toast";
import Videos from "./Components/Videos/Videos";
import Files from "./Components/Files/Files";
import Upload from "./Components/Uploaded/Uploaded";
import Uploaddetails from "./Components/Uploaddetails/Uploaddetails";
import Videodetails from "./Components/Videodetails/Videodetails";
import { AdminContextProvider } from "./Components/Context/Admin";
import { MyGroupsContextProvider } from "./Components/Context/Mygroups";
import Filterdgroup from "./Components/Filterdgroup/Filterdgroup";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";


function App() {
  const myrouter = createHashRouter([
    {
      path: "/",element: <Layout />,children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "groups", element:<ProtectedRoute><Groups /></ProtectedRoute>  },
        { path: "contact", element:<ProtectedRoute><Contact /></ProtectedRoute>  },
        { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute>  },
        { path: "allgroup", element:<ProtectedRoute><Allgroup /></ProtectedRoute>  },
        { path: "filterdgroup", element:<ProtectedRoute><Filterdgroup /></ProtectedRoute>  },
        { path: "mygroup",element:<ProtectedRoute><Mygroup /></ProtectedRoute> },    
        { path: "videos", element:<ProtectedRoute><Videos /></ProtectedRoute>  },
        { path: "videodetails/:elm", element:<ProtectedRoute><Videodetails /></ProtectedRoute>  },
        { path: "files", element:<ProtectedRoute><Files /></ProtectedRoute>  },
        { path: "upload", element:<ProtectedRoute><Upload /></ProtectedRoute>  },
        { path: "uploaddetails", element:<ProtectedRoute><Uploaddetails /></ProtectedRoute>  },

        { path: "adminpage", element:<ProtectedRoute><Adminpage /></ProtectedRoute>  },
        { path: "creategroup", element:<ProtectedRoute><Creategroup /></ProtectedRoute>  },

        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <>


    <MyGroupsContextProvider>

      <AdminContextProvider>
        <AuthProvider>
          <RouterProvider router={myrouter} />
          <Toaster />
        </AuthProvider>
      </AdminContextProvider>
    </MyGroupsContextProvider>
    

      
      
      
    </>
  );
}

export default App;
