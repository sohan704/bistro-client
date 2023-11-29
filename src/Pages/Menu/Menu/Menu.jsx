import { Helmet } from 'react-helmet-async';
import Cover from '../../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import PopularMenu from '../../../Pages/Home/PopularMenu/PopularMenu'
import UseMenu from '../../../Hooks/UseMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'

const Menu = () => {
 const [menu] = UseMenu();
 const desserts = menu.filter(item => item.category === 'dessert'); 
 const pizzas = menu.filter(item => item.category === 'pizza'); 
 const soups = menu.filter(item => item.category === 'soup'); 
 const salads = menu.filter(item => item.category === 'salad'); 
 const offers = menu.filter(item => item.category === 'offered'); 
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Cover title='Our Menu' img={menuImg}></Cover>
      <SectionTitle subHeading="---Don't Miss---" heading="Today's Offer"></SectionTitle>
      <MenuCategory items={offers}></MenuCategory>
    
      <MenuCategory title="Dessert" items={desserts} coverImg={dessertImg}></MenuCategory>

      <MenuCategory title="Pizza" items={pizzas} coverImg={pizzaImg}></MenuCategory>
      <MenuCategory title="Salad" items={salads} coverImg={saladImg}></MenuCategory>
      <MenuCategory title="Soup" items={soups} coverImg={soupImg}></MenuCategory>
    </div>
  );
};

export default Menu;