import { Modal, Progress } from "antd";
import ExamResultCard from "./ExamResultCard";
import { useState } from "react";
import DataNotFound from "./DataNotFound";

interface UserProgressProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: any;
}

const UserProgress = (prop: UserProgressProps) => {
  const [position, setPosition] = useState<number>(1);
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
            percent={
              position == 1
                ? prop.selectedUser?.mathsLevel?.mark
                  ? prop.selectedUser?.mathsLevel?.mark
                  : 0
                : prop.selectedUser?.scienceLevel?.mark
                ? prop.selectedUser?.scienceLevel?.mark
                : 0
            }
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
            <span className="text-xl font-bold text-black">
              {position == 1
                ? prop.selectedUser?.mathsLevel?.level
                  ? prop.selectedUser?.mathsLevel?.level
                  : "Beginner"
                : prop.selectedUser?.scienceLevel?.level
                ? prop.selectedUser?.scienceLevel?.level
                : "Beginner"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-500">
              Total Points
            </span>
            <span className="text-xl font-bold text-right text-black">
              {position == 1
                ? prop.selectedUser?.mathsLevel?.points
                  ? prop.selectedUser?.mathsLevel?.points
                  : 0
                : prop.selectedUser?.scienceLevel?.points
                ? prop.selectedUser?.scienceLevel?.points
                : 0}
            </span>
          </div>
        </div>
      </div>

      <div className="px-2 py-2">
        <div
          className="overflow-hidden overflow-y-scroll p-1 rounded-xl border-2 gray-200"
          style={{
            height: "240px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* <DataNotFound name={"Result Data"} /> */}
          {position == 1 ? (
            <>
              {prop.selectedUser?.mathsexam?.length === 0 && (
                <DataNotFound name={"Maths Exam Result"} />
              )}
            </>
          ) : (
            <>
              {prop.selectedUser?.scienceexam?.length === 0 && (
                <DataNotFound name={"Science Exam Result"} />
              )}
            </>
          )}

          <div className="grid grid-cols-1 gap-4 mt-1 md:grid-cols-1 lg:grid-cols-2">
            {position == 1 ? (
              <>
                {prop.selectedUser?.mathsexam.map(
                  (exam: any, index: number) => (
                    <ExamResultCard key={index} />
                  )
                )}
              </>
            ) : (
              <>
                {prop.selectedUser?.scienceexam.map(
                  (exam: any, index: number) => (
                    <ExamResultCard key={index} />
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserProgress;
