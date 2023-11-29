import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

import img1 from '../../../../src/assets/home/slide1.jpg'
import img2 from '../../../../src/assets/home/slide2.jpg'
import img3 from '../../../../src/assets/home/slide3.jpg'
import img4 from '../../../../src/assets/home/slide4.jpg'
import img5 from '../../../../src/assets/home/slide5.jpg'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
  return (
    <section>
      <SectionTitle subHeading={`---From 11:00am to 10:00pm---`}
          heading={`ORDER ONLINE`}>
          
      </SectionTitle>


      <Swiper
        slidesPerView={4}
        spaceBetween={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper my-11"
      >
        <SwiperSlide><img src={img1} alt="" /> <h3 className='text-4xl uppercase drop-shadow-xl text-center -mt-12 text-white'>SALAD</h3></SwiperSlide>
        <SwiperSlide><img src={img2} alt="" /> <h3 className='text-4xl uppercase drop-shadow-xl text-center -mt-12 text-white'>PIZZA</h3></SwiperSlide>
        <SwiperSlide><img src={img3} alt="" /> <h3 className='text-4xl uppercase drop-shadow-xl text-center -mt-12 text-white'>SOUP</h3></SwiperSlide>
        <SwiperSlide><img src={img4} alt="" /> <h3 className='text-4xl uppercase drop-shadow-xl text-center -mt-12 text-white'>DESERT</h3></SwiperSlide>
        <SwiperSlide><img src={img5} alt="" /> <h3 className='text-4xl uppercase drop-shadow-xl text-center -mt-12 text-white'>SALAD</h3></SwiperSlide>
      
      </Swiper>
    </section>
  );
};

export default Category;