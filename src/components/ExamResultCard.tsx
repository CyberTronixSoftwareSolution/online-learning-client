import { Progress } from "antd";

interface ExamResultCardProps {
  result: any;
}

const ExamResultCard = (prop: ExamResultCardProps) => {
  return (
    <div className="flex justify-between items-center p-3 w-full bg-white rounded-lg border border-gray-200 shadow">
      <div className="flex flex-col gap-1">
        <span className="font-bold">{prop.result?.level}</span>
        <span className="text-sm text-gray-500">
          {prop.result?.date?.split("T")[0]}
        </span>
      </div>
      <div className="flex justify-center items-center">
        <Progress
          type="circle"
          percent={prop.result?.score ? prop.result?.score : 0}
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
