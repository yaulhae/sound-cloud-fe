import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Navigation } from "swiper";

const tmp2 = () => {
  return (
    <div>
      <div className="type1">
        <Swiper
          className="mySwiper"
          // install Swiper modules
          slidesPerView={1}
          modules={[Navigation, Pagination, Mousewheel]}
          mousewheel={true}
          navigation={true}
          loop={true}
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide>내용</SwiperSlide>
          <SwiperSlide>내용</SwiperSlide>
          <SwiperSlide>내용</SwiperSlide>
          <SwiperSlide>내용</SwiperSlide>
        </Swiper>
      </div>
      <div className="type2">
        <Swiper
          className="mySwiper"
          // install Swiper modules
          slidesPerView={1}
          modules={[Navigation, Pagination, Mousewheel]}
          mousewheel={true}
          navigation={true}
          loop={true}
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide>내용</SwiperSlide>
          <SwiperSlide>내용</SwiperSlide>
          <SwiperSlide>내용</SwiperSlide>
          <SwiperSlide>내용</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default tmp2;
