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
                  We didn't reinvent the wheel
                </h2>
                <p className="mb-4">
                  We are strategists, designers and developers. Innovators and
                  problem solvers. Small enough to be simple and quick, but big
                  enough to deliver the scope you want at the pace you need.
                  Small enough to be simple and quick, but big enough to deliver
                  the scope you want at the pace you need.
                </p>
                <p>
                  We are strategists, designers and developers. Innovators and
                  problem solvers. Small enough to be simple and quick.
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
                  We didn't reinvent the wheel
                </h2>
                <p className="mb-4">
                  We are strategists, designers and developers. Innovators and
                  problem solvers. Small enough to be simple and quick, but big
                  enough to deliver the scope you want at the pace you need.
                  Small enough to be simple and quick, but big enough to deliver
                  the scope you want at the pace you need.
                </p>
                <p>
                  We are strategists, designers and developers. Innovators and
                  problem solvers. Small enough to be simple and quick.
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
