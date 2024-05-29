import { Modal, Progress } from "antd";
import ExamResultCard from "./ExamResultCard";

interface UserProgressProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserProgress = (prop: UserProgressProps) => {
  return (
    <Modal
      title={"USER PROGRESS"}
      open={prop.open}
      centered
      width={600}
      maskClosable={false}
      onCancel={() => prop.setOpen(false)}
      footer={null}
    >
      <div className="px-6 py-2">
        <div className="flex justify-center align-middle">
          <Progress
            type="dashboard"
            steps={10}
            percent={75}
            trailColor="rgba(0, 0, 0, 0.06)"
            strokeWidth={20}
            size={150}
          />
        </div>

        <div className="flex justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-500">
              Current Stage
            </span>
            <span className="text-xl font-bold text-black">Intermediate</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-500">
              Total Points
            </span>
            <span className="text-xl font-bold text-black text-right">200</span>
          </div>
        </div>
      </div>

      <div className="px-2 py-2">
        <div
          className="overflow-hidden overflow-y-scroll p-1"
          style={{ height: "240px" }}
        >
          {/* <DataNotFound name={"Result Data"} /> */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 mt-1">
            <ExamResultCard />
            <ExamResultCard />
            <ExamResultCard />
            <ExamResultCard />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserProgress;
