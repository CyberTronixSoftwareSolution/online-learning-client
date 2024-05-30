
import { Carousel } from "antd";
import Testimonial from "../../components/testimonial/Testimonial";

const UserHome = () => {
  return (
    <>
      <div className="">
        <Carousel
          arrows={true}
          autoplay
          autoplaySpeed={3000}
          dotPosition="bottom"
          effect="scrollx"
          style={{ height: "500px" }}
        >
          <div>
            <img
              src="https://res.cloudinary.com/dd3v8dwin/image/upload/v1714895238/cyberthrends/fohbyftvegblaiybvckq.png"
              alt="img"
              style={{ height: "500px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dd3v8dwin/image/upload/v1714896132/cyberthrends/White_and_Violet_Professional_Modern_Technology_Pitch_Deck_Presentation_y7h4po.jpg"
              alt="img"
              style={{ height: "500px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dd3v8dwin/image/upload/v1714896421/cyberthrends/White_and_Violet_Professional_Modern_Technology_Pitch_Deck_Presentation_2_wqy10u.jpg"
              alt="img"
              style={{ height: "500px", width: "100%", objectFit: "cover" }}
            />
          </div>
        </Carousel>

        <div>
          <section className="bg-white ">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
              <div className="font-light text-gray-500 sm:text-lg ">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                  Welcome to Coursera Learning
                </h2>
                <p className="mb-4">
                  Welcome to Coursera Learning, your ultimate destination for online learning. At Coursera Learning, we believe that education should be accessible, engaging, and tailored to fit your unique needs. Whether you're looking to advance your career, explore new hobbies, or gain in-depth knowledge in a specific field, our diverse range of courses and expert instructors are here to guide you every step of the way. With interactive lessons, real-time assessments, and a supportive learning community, achieving your educational goals has never been more attainable. Join us today and start your journey towards knowledge and success with Coursera Learning!
                </p>               
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <img
                  className="w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                  alt="office content 1"
                />
                <img
                  className="mt-4 w-full lg:mt-10 rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                  alt="office content 2"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="">
          <Testimonial />
        </div>

        <div>
          <section className="bg-white ">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
              <div className="grid grid-cols-2 gap-4 mt-8">
                {/* goole map */}
                <iframe
                  className="w-full rounded-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.195073412674!2d-73.98647968459492!3d40.74881717932744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f7f1b45c3f%3A0x2f3d4a0a1c1d0d1b!2sEmpire%20State%20Building!5e0!3m2!1sen!2sbd!4v1631380683081!5m2!1sen!2sbd"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    width: "600px",
                    height: "400px",
                  }}
                ></iframe>
              </div>
              <div className="font-light text-gray-500 sm:text-lg ">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                 Our Course Modules
                </h2>
                <p className="mb-4">
                Dive into the world of knowledge with our comprehensive Science and Maths courses at Coursera Learning. Whether you're a curious beginner or an advanced learner, our courses are designed to cater to all levels. Explore the mysteries of the universe through our engaging Science modules, from physics to biology, and uncover the principles that govern our natural world. Sharpen your problem-solving skills with our Maths courses, covering everything from basic arithmetic to advanced calculus. Our expert instructors and interactive content ensure that you gain a deep understanding of these fundamental subjects, preparing you for academic success and beyond. Embark on your educational journey with Coursera Learning and discover the limitless possibilities of Science and Maths!
                </p>            
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default UserHome;

