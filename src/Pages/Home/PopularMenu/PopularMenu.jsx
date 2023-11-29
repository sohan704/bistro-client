import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../../Shared/MenuItem/MenuItem";
import UseMenu from "../../../Hooks/UseMenu";

const PopularMenu = () => {

  const [menu] = UseMenu();
  const popular = menu.filter(item => item.category === 'popular');

  // const [menu, setMenu] = useState([]);

  // useEffect(() => {
  //   fetch('menu.json')
  //     .then(res => res.json())
  //     .then(data => {

  //       const popularItems = data.filter(item => item.category === 'popular');
  //       setMenu(popularItems)

  //     })


  // }, [])


  return (
    <div className="my-12">
      <SectionTitle subHeading={`---Check it out---`}
        heading={`FROM OUR MENU`}>

      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {
         popular && popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
        }
      </div>
      <div className="flex justify-center my-10">
        <button className="btn btn-outline border-0 border-b-2">View Full Menu</button>
      </div>
    </div>
  );
};

export default PopularMenu;