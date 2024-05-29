import { Progress } from "antd";

const ExamResultCard = () => {
  return (
    <div className="flex justify-between bg-white border border-gray-200 rounded-lg shadow w-full p-3 items-center">
      <div className="flex flex-col gap-1">
        <span className="font-bold">Exam Name</span>
        <span className="text-gray-500 text-sm">Exam Date </span>
      </div>
      <div className="flex justify-center items-center">
        <Progress
          type="circle"
          percent={75}
          size={50}
          strokeWidth={10}
          format={(percent) => `${percent}%`}
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
        />
      </div>
    </div>
  );
};

export default ExamResultCard;
