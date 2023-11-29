import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import f from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
  return (
    <div className="my-20 bg-fixed featured-item">
      <SectionTitle  heading={'Featured Items'} subHeading={'---Check it out---'}></SectionTitle>
      <div className="md:flex justify-center bg-slate-500 bg-opacity-60 items-center py-28 px-28">
        <div>
          <img src={f} alt="" />
        </div>
        <div className="md:ml-10 text-white">
          <p>Aug 20, 2029</p>
          <p className="uppercase">Where can I get some?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eum molestias praesentium numquam. Aspernatur vitae nisi vero iste quo molestias illo aperiam esse tempora, ducimus illum numquam ratione dolor vel.</p>
          <button className="btn btn-outline border-0 border-b-2">Read More</button>
        </div>
      </div>

    </div>
  );
};

export default Featured;