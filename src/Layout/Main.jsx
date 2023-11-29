import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {

  const location = useLocation();
  console.log(location.pathname);

  // const noHeaderFooter = location.pathname === '/login' ? false : true ;
  const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup');

  return (
    <div>
     {  noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
     { noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;