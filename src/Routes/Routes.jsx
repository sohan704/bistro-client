import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Secret from "../Shared/Secret/Secret";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/menu',
        element: <Menu></Menu>
      },
      {
        path:'/order/:category',
        element: <Order></Order>
      },
      {
        path:'/login',
        element: <Login></Login>
      },
      {
        path:'/signup',
        element: <SignUp></SignUp>
      },
      {
        path:'/secret',
        element: <PrivateRoutes><Secret></Secret></PrivateRoutes>
      },
    ]
  },
  {
    //normal user routes
    path: "/dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children:[
      {
        
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      
      //admin only routes 
      {
         path:'addItems',
         element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
         path:'adminHome',
         element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
         path:'manageItems',
         element: <AdminRoute> <ManageItems></ManageItems> </AdminRoute>
      },
      {
         path:'payment',
         element: <Payment></Payment>,
         
      },
      {
         path:'paymentHistory',
         element: <PaymentHistory></PaymentHistory>,
         
      },
      {
         path:'updateItem/:id',
         element: <AdminRoute> <UpdateItem></UpdateItem> </AdminRoute>,
         loader: ({params}) => fetch(`https://restaurant-server-gamma.vercel.app/menu/${params.id}`)
      },
      {
        path:'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      }
    ]
    
  },
]);

export default router;