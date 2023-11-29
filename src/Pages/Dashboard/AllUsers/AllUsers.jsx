import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaRegTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  })
  

  // , {
  //   headers: { 
  //     authorization : `Bearer ${localStorage.getItem('access-token')}`
  //    }
  // } users er pore aita likhe diba

   const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res => {
      console.log(res.data);
      if(res.data.modifiedCount > 0){
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an admin Now`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });

   }
   



  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/users/${user._id}`).then(res => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `Deleted ${res.data.deletedCount} item`,
              icon: "success"
            });
          }
        })


      }
    });
  }

  return (
    <div>
      <div className="flex justify-evenly my-5">
        <div className="text-3xl">
          ALL USERS
        </div>
        <div className="text-3xl">
          TOTAL USERS : {users.length}
        </div>
      </div>



      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              users.map((user, idx) => <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                {  user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-neutral btn-lg">
                    <FaUsers className="text-red-400" />
                  </button> }
                </td>
                <td>
                  <button onClick={() => handleDelete(user)} className="btn btn-neutral btn-lg">
                    <FaRegTrashAlt className="text-red-400" />
                  </button>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;