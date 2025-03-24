import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from 'react-redux';
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from "./pages/Signup";
import Home from "./components/Home/home";
import AuthLayout from "./components/AuthLayout/AuthLayout.jsx"
import Login from "./pages/Login.jsx"
import Common from "./modules/common/Common.jsx"
import {HrModule} from './modules/HRModule/HrModule.jsx';
import CustomerCare from './modules/CustomerCare/CustomerCare.jsx';
import Modules from "./modules/modules.jsx"
import EmailDetails from './modules/common/EmailDetails.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        ),
      },
      {
        path:"/signup",
        element:<AuthLayout authentication={false}>
        <Signup />
        </AuthLayout>
        
      },
      {
        path:"/common",
        element:(
          <AuthLayout authentication>
          {" "}
        <Common />
        </AuthLayout>
        )
        
      },
      {
        path:"/hrmodule",
        element:(
          <AuthLayout authentication>
          {" "}
        <HrModule />
        </AuthLayout>
        )
        
      },
      {
        path:"/customercare",
        element:(
          <AuthLayout authentication>
          {" "}
        <CustomerCare />
        </AuthLayout>
        )
        
      },
      {
        path:"/modules",
        element:(
          <AuthLayout authentication>
          {" "}
        <Modules />
        </AuthLayout>
        )
        
      },
      {
        path:"/email/:id",
        element:(
          <AuthLayout authentication>
          {" "}
        <EmailDetails />
        </AuthLayout>
        )
        
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
        <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);
