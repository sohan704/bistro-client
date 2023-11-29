import { useState } from 'react';
import Cover from '../../Shared/Cover/Cover';
import orderCover from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UseMenu from '../../Hooks/UseMenu';
import FoodCard from '../../Components/FoodCard/FoodCard';
import OrderTab from './OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
  
  const categories = ['Salad','Pizza', 'Soup', 'Dessert', 'Drinks'];
  const {category} = useParams();
  console.log(category);
  const initialIndex = categories.indexOf(category);
  console.log(initialIndex);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = UseMenu();
  const desserts = menu.filter(item => item.category === 'dessert');
  const pizzas = menu.filter(item => item.category === 'pizza');
  const soups = menu.filter(item => item.category === 'soup');
  const salads = menu.filter(item => item.category === 'salad');
  const offers = menu.filter(item => item.category === 'offered');
  const drinks = menu.filter(item => item.category === 'drinks');
  
  
  

  return (
    <div>
       <Helmet>
        <title>Bistro Boss | Order</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Cover img={orderCover} title="Order Food"></Cover>

      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
            <OrderTab items={salads}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={pizzas}></OrderTab>
         
        </TabPanel>
        <TabPanel>
        <OrderTab items={soups}></OrderTab>
         
        </TabPanel>
        <TabPanel>
        <OrderTab items={desserts}></OrderTab>
         
        </TabPanel>
        <TabPanel>
        <OrderTab items={drinks}></OrderTab>
         
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;