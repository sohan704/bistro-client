import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseMenu from "../../../Hooks/UseMenu";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, loading, refetch] = UseMenu();
  const axiosSecure = UseAxiosSecure();

  const handleDelete = (item) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${item.name} has been deleted!`,
            icon: "success"
          });
        }


      }
    });

  }


  return (
    <div>
      <SectionTitle heading="Manage Items" subHeading="---Hurry Up---"></SectionTitle>

      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {
                menu?.map((item, index) =>
                  <tr key={item._id} className="">
                    <td>
                      {index + 1}
                    </td>
                    <td>

                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>


                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{item.name}</div>

                      </div>
                    </td>
                    <td>
                      ${item.price}
                      <br />

                    </td>

                    <td>
                      <Link to={`/dashboard/updateItem/${item._id}`}>
                        <button className="btn btn-neutral btn-lg">
                          <FaEdit className="text-red-400"></FaEdit>

                        </button>
                      </Link>
                    </td>
                    <button onClick={() => handleDelete(item)} className="btn btn-neutral btn-lg">
                      <FaRegTrashAlt className="text-red-400" />
                    </button>
                  </tr>
                )
              }


            </tbody>


          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;