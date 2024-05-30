import React from "react";

const ExamSection = () => {
  return (
    <div className="p-3">
      <div className="flex flex-col min-h-[65vh] bg-white p-4 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full">
        <div className="w-full md:w-1/4  flex flex-col gap-5 justify-center align-middle">
          <div className="mx-4 mb-4 -mt-6 text-white shadow h-28 flex align-middle items-center  rounded-xl bg-gradient-to-r from-yellow-50 to-lime-200 bg-clip-border shadow-gray-900/20 hover:shadow-lg cursor-pointer">
            <h3 className="block font-sans text-3xl antialiased font-bold leading-snug tracking-normal text-black ml-3">
              Beginner
            </h3>
          </div>

          <div className="mx-4 mb-4 -mt-6 text-white shadow flex align-middle items-center h-28 rounded-xl bg-gradient-to-r from-green-200 to-red-200 bg-clip-border shadow-gray-900/20 hover:shadow-lg cursor-pointer">
            <div className="block font-sans text-3xl antialiased font-bold leading-snug tracking-normal text-black ml-3">
              Intermediate
            </div>
          </div>

          <div className="mx-4 mb-4 -mt-6 text-white shadow h-28 flex align-middle items-center  rounded-xl bg-gradient-to-r from-rose-200 to-rose-600 bg-clip-border shadow-gray-900/20 hover:shadow-lg cursor-pointer">
            <h3 className="block font-sans text-3xl antialiased font-bold leading-snug tracking-normal text-black ml-3">
              Advanced
            </h3>
          </div>
        </div>
        <div className="w-full md:w-3/4 p-5 bg-blue-50 rounded-xl overflow-scroll"></div>
      </div>
    </div>
  );
};

export default ExamSection;
