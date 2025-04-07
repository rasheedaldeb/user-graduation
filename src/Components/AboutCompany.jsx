import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Autoplay } from "swiper/modules";
const AboutCompany = () => {
  return (
    <section className="flex items-center justify-between p-10">
      <p className="text-secondary w-[45%] text-[20px] leading-9" dir="rtl">
        مرحبًا بك في عقارات بلس, وجهتك المثالية للعثور على منزلك الجديد. نحن
        نقدم لك مجموعة واسعة من العقارات السكنية والتجارية التي تلبي احتياجاتك
        وأحلامك. بفضل تصميم موقعنا السهل الاستخدام، يمكنك العثور على العقار
        المثالي بسرعة وسهولة. موقعنا يوفر لك العديد من الميزات التي تجعل عملية
        البحث عن العقارات تجربة مريحة وممتعة. يمكنك استخدام نظام التصفية المتقدم
        للبحث عن العقار المثالي وفقًا لمعاييرك الخاصة، سواء كنت تبحث عن منزل
        الأحلام، شقة عصرية، أو مكتب تجاري. مع الصور عالية الجودة المتاحة لكل
        عقار، يمكنك تفحص التفاصيل والمميزات بكل سهولة ووضوح. نحن هنا لمساعدتك في
        اكتشاف العقار المثالي وجعل أحلامك حقيقة. اكتشف العقارات الآن مع عقارات
        بلس، وتمتع بتجربة فريدة ومميزة في البحث عن العقارات.
      </p>
      {/* slider library */}
      <Swiper
        speed={600}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="w-[45%] rounded-lg"
      >
        <SwiperSlide className="w-full">
          <img src="/images/about-1.jpg" alt="about" />
        </SwiperSlide>{" "}
        <SwiperSlide className="w-full">
          <img src="/images/about-2.jpg" alt="about" />
        </SwiperSlide>{" "}
        <SwiperSlide className="w-full">
          <img src="/images/about-3.jpg" alt="about" />
        </SwiperSlide>{" "}
        <SwiperSlide className="w-full">
          <img src="/images/about-4.jpg" alt="about" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default AboutCompany;
