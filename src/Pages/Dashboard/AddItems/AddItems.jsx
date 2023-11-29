import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();


  const onSubmit = async (data) => {
    console.log(data);
    //upload image to imagebb and then get the url before sending it to database
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    console.log(res.data);
    if (res.data.success) {
      //now send the image url to the server
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      }
      const menuRes = await axiosSecure.post('/menu', menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        //show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu`,
          showConfirmButton: false,
          timer: 1500
        });
      }

    }
  }
  return (
    <div>
      <SectionTitle heading="ADD AN ITEM" subHeading="---What's new---"></SectionTitle>
      <div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>


          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>

            </label>
            <input {...register("name", { required: true })}

              type="text"
              placeholder="Enter Recipe Name"
              className="input input-bordered w-full" />

          </div>


          <div className="flex justify-between gap-5">
            {/*category*/}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>

              </label>
              <select defaultValue="default" {...register("category", { required: true })}
                className="select select-bordered w-full">
                <option disabled value="default">Select a category</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>

              </select>

            </div>


            {/* Price */}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>

              </label>
              <input {...register("price", { required: true })}
                type="number"
                placeholder="Enter Price"
                className="input input-bordered w-full" />

            </div>

          </div>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Details*</span>

              </label>
              <textarea {...register("recipe")} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

            </div>
          </div>

          <div>
            <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
          </div>


          <input className="btn btn-neutral" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddItems;