import { Avatar, Rate } from "antd";
import React from "react";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    rating: number;
    review: string;
    image: string;
    date: string;
  };
}

const TestimonialCard = (prop: TestimonialCardProps) => {
  return (
    <div className="lg:flex grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8">
      <div className="swiper-wrapper">
        <div className="swiper-slide group bg-white border border-solid h-auto border-gray-300 rounded-2xl p-6 transition-all duration-500 w-full hover:border-indigo-600 slide-active:border-indigo-600">
          <div className="flex items-center mb-9 gap-2 text-amber-500 transition-all duration-500  group-hover:text-indigo-600 swiper-slide-active:text-indigo-600">
            <Rate
              disabled
              defaultValue={prop.testimonial.rating}
              value={prop.testimonial.rating}
            />
          </div>
          <p className="text-sm text-gray-500 leading-8 h-24 transition-all duration-500 mb-9 group-hover:text-gray-800">
            {prop.testimonial.review}
          </p>
          <div className="flex items-center gap-5">
            {/* <img src={prop.testimonial.image} alt="avatar" /> */}
            <Avatar size={50} src={prop.testimonial.image} />
            <div className="grid">
              <h5 className="text-gray-900 font-medium transition-all duration-500  group-hover:text-indigo-600 swiper-slide-active:text-indigo-600">
                {prop.testimonial.name}
              </h5>
              <span className="text-sm leading-6 text-gray-500">
                {prop.testimonial.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
