import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { FaQuoteLeft } from "react-icons/fa";
import '@smastrom/react-rating/style.css'

import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

const Testimonials = () => {

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch('https://restaurant-server-gamma.vercel.app/review')
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [])

  return (
    <div className="my-20">
      <SectionTitle subHeading={'----What our clients say----'} heading={'TESTIMONIALS'}></SectionTitle>

      <div className="my-14">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

          {
            reviews.map(review => <SwiperSlide key={review._id}>
              <div>
                <div className="flex justify-center">
                  <Rating
                    style={{ maxWidth: 200 }}
                    value={review.rating}
                    readOnly
                  />
                </div>
                <div className="mt-10 mb-5 flex justify-center text-5xl">
                  <FaQuoteLeft></FaQuoteLeft>
                </div>
                <div className="text-center">
                  <p>{review.details}</p>
                  <h3 className="text-2xl text-orange-500">{review.name}</h3>
                </div>
              </div>
            </SwiperSlide>)
          }
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;