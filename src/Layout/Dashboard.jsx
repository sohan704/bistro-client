import { FaBook, FaCalendar, FaHome, FaHotel, FaList, FaPeopleArrows, FaPhone, FaSearch, FaShoppingCart, FaStar, FaUser, FaUsers, FaUtensilSpoon, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseCart from "../Hooks/UseCart";
import UseAdmin from "../Hooks/UseAdmin";

const Dashboard = () => {

  const [cart] = UseCart();

  //get isAdmin value from the database

  const [isAdmin] = UseAdmin();

  return (
    <>
      <div className="flex">
        <div className="w-64 min-h-screen bg-orange-400">
          <ul className="menu">
            {
              isAdmin ?
                <>
                  <li>
                    <NavLink to="/dashboard/adminHome"> <FaHome></FaHome> Admin Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/addItems"> 
                    <FaUtensils></FaUtensils> Add Items</NavLink>
                  </li>
                  <li>

                    <NavLink to="/dashboard/manageItems"> 
                     <FaList></FaList>
                     Manage Items</NavLink>
                  </li>
                  <li>

                    <NavLink to="/dashboard/bookings"> <FaBook></FaBook> Manage Bookings</NavLink>
                  </li>
                  <li>

                    <NavLink to="/dashboard/users"> 
                     <FaUsers></FaUsers>
                     All Users</NavLink>
                  </li>


                </> :
                <>
                  <li>

                    <NavLink to="/dashboard/userHome"> <FaHome></FaHome> User Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/cart"> <FaShoppingCart></FaShoppingCart> My Cart ({cart.length})</NavLink>
                  </li>
                  <li>

                    <NavLink to="/dashboard/history"> <FaCalendar></FaCalendar> Not Real History</NavLink>
                  </li>
                  <li>

                    <NavLink to="/dashboard/review"> <FaStar></FaStar> Add A Review</NavLink>
                  </li>
                  <li>

                    <NavLink to="/dashboard/paymentHistory"> <FaList></FaList> Payment Real History</NavLink>
                  </li>
                </>
            }
            {/* shared nav links */}
            <div className="divider"></div>

            <li>

              <NavLink to="/"> <FaHome></FaHome>Home</NavLink>
            </li>
            <li>

              <NavLink to="/order/Salad"> <FaSearch></FaSearch>Menu</NavLink>
            </li>
            <li>

              <NavLink to="/order/contact"> <FaPhone></FaPhone> Contact</NavLink>
            </li>
          </ul>

        </div>
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>

    </>
  );
};

export default Dashboard;