import { Segmented } from "antd";
import { useState } from "react";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import ExamSection from "../../components/exam/ExamSection";

const ModulePage = () => {
  const [position, setPosition] = useState<number>(1);
  return (
    <>
      <section className="py-4">
        <div className="mx-auto max-w-8xl px-4 sm:px-3 lg:px-3">
          <div className="flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-between max-sm:gap-8">
            <h2 className="text-3xl text-center font-bold text-gray-900 lg:text-left">
              Module Page
            </h2>
            <div>
              <Segmented
                options={[
                  {
                    label: "Science Module",
                    value: 1,
                    icon: <BarsOutlined />,
                  },
                  {
                    label: "Maths Module",
                    value: 2,
                    icon: <AppstoreOutlined />,
                  },
                ]}
                value={position}
                onChange={setPosition}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Questionaries */}
      <ExamSection />
    </>
  );
};

export default ModulePage;
