import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { FaCartPlus } from "react-icons/fa";
import UseCart from "../../Hooks/UseCart";
import UseAdmin from "../../Hooks/UseAdmin";

const Navbar = () => {


  const { user, logOut } = useContext(AuthContext);
  const [cart] = UseCart();
  const [isAdmin] = UseAdmin();

  console.log(cart,'-----------------------------')
  const handleLogOut = () => {
    logOut().then(res => {
      console.log(res)
      alert('Logged Out')
    }).catch(error => console.log(error));
  }

  const links = <>

    <li><a><Link to='/'>HOME</Link></a></li>
    <li><a>CONTACT US</a></li>
    <li><a>DASHBOARD</a></li>
    <li><a><Link to='/menu'>OUR MENU</Link></a></li>
    <li><a><Link to='/order/Salad'>ORDER FOOD</Link></a></li>
    {  user && isAdmin && <li><a><Link to='/dashboard/adminHome'>Dashboard</Link></a></li>}
    {  user && !isAdmin && <li><a><Link to='/dashboard/userHome'>Dashboard</Link></a></li>}
    <li><a><Link to='/dashboard/cart'>
      <button className="btn">
      <FaCartPlus className="mr-4 text-2xl"/>
        <div className="badge badge-secondary">+{cart?.length}</div>
      </button>
    </Link></a></li>
    {/* <li><a><Link to='/login'>LOGIN</Link></a></li> */}

    {user ? <>
      {/* <span>{user?.displayName}</span>  */}
      <li onClick={handleLogOut}><a><Link>LOGOUT</Link></a></li></> : <> <li><a><Link to='/login'>LOGIN</Link></a></li></>}

  </>

  console.log(user);
  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">



              {links}
            </ul>
          </div>
          <div>
            <div className="text-center font-bold">
              <a className="normal-case tracking-widest text-xl">BISTRO BOSS</a>
            </div>
            <div className="text-center font-semibold"><p className="tracking-widest">RESTAURANT</p></div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">

            {links}


          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Login</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;