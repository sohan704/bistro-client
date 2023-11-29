import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseCart from "../../Hooks/UseCart";


const FoodCard = ({ item }) => {
  const { image, name, price, recipe, _id } = item;
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [ , refetch] = UseCart();

  // const {user } = UseAuth();
  const handleAddCart = (food) => {
    if (user && user?.email) {
      console.log(food, 'user is ', user);
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price
      }

      axiosSecure.post('/carts', cartItem)
        .then(res => {
          console.log(res);
          if (res.data.insertedId) {
            
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} added to the cart!!`,
              showConfirmButton: false,
              timer: 1500
            });

            //refetch the cart
            refetch();
          }
        })
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Login first to buy",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!"
      }).then((result) => {
        if (result.isConfirmed) {
          //send the user to the login page
          navigate('/login', { state: { from: location } });
        }
      });
    }
  }

  return (
    <div>
      <div className="card card-compact w-9/12 mx-auto bg-base-100 shadow-xl">
        <figure><img src={image} alt="Shoes" /></figure>
        <p className="bg-slate-900 mr-4 mt-4 absolute p-2 rounded-lg right-0 bg-opacity-50 text-white">${price}</p>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">{name}</h2>
          <div className="text-center">
            <p>If a dog chews shoes whose shoes does he choose?</p>
          </div>
          <div className="card-actions justify-end">
            <button onClick={() => handleAddCart(item)} className="btn bg-slate-100 btn-outline border-0 border-b-2">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;