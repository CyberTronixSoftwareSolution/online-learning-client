import { useEffect, useState } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import { useAuth } from "../../shared/context/AuthContext";
import { CustomToastService } from "../../shared/message.service";
import { Button, Tooltip } from "antd";

interface ExamSectionProps {
  position: number;
}
const ExamSection = (prop: ExamSectionProps) => {
  const [moduleDetails, setModuleDetails] = useState<any>(null);
  const [answers, setAnswers] = useState<any>([]);
  const { axiosInstance } = useLoading();
  const { authUser } = useAuth();

  const getModuleDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/questions/getModuleDetail/${
          prop?.position == 1 ? "science" : "maths"
        }/${authUser?._id}`
      );

      if (response.data) {
        setModuleDetails(response.data);
        setAnswers([]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getModuleDetails();
    }
  }, [prop.position]);

  const handleModuleClick = (module: string) => {
    if (moduleDetails?.level?.toLowerCase() === module) {
      return;
    } else if (moduleDetails?.level?.toLowerCase() !== module) {
      CustomToastService.warning(
        `Your current module is ${moduleDetails?.level}! Please complete it first!`
      );
    }
  };

  const handleQuestionSubmit = async () => {
    if (answers.length != 10) {
      CustomToastService.warning("Please answer all questions!");
      return;
    }

    let score = 0;
    answers.forEach((ans: any) => {
      const question = moduleDetails?.questions?.find(
        (question: any) => question.question === ans.question
      );

      if (question?.answer === ans.answer) {
        score++;
      }
    });

    const request: any = {
      level: moduleDetails?.level,
      type: prop.position == 1 ? "science" : "maths",
      module: prop.position == 1 ? "Science" : "Maths",
      score: score * 10,
      date: new Date(),
    };

    try {
      const response: any = await axiosInstance.put(
        `/user/addExam/${authUser?._id}`,
        request
      );

      if (response.data) {
        CustomToastService.success(response.data.message);
        window.location.reload();
      }
    } catch (error: any) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const handleQuestionChange = (question: string, answer: string) => {
    const isAlreadyAnswered = answers.find(
      (ans: any) => ans.question === question
    );

    if (isAlreadyAnswered) {
      const index = answers.findIndex((ans: any) => ans.question === question);
      answers[index].answer = answer;
    } else {
      setAnswers([...answers, { question: question, answer: answer }]);
    }
  };

  const handleCancel = () => {};

  return (
    <div className="p-3">
      <div className="flex flex-col min-h-[65vh] bg-white p-4 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full">
        <div className="w-full md:w-1/4  flex flex-col gap-5 justify-center align-middle">
          <div
            className="mx-4 mb-4 -mt-6 text-white shadow h-28 flex justify-between align-middle items-center  rounded-xl bg-gradient-to-r from-yellow-50 to-lime-200 bg-clip-border shadow-gray-900/20 hover:shadow-lg cursor-pointer"
            onClick={() => handleModuleClick("beginner")}
          >
            <h3 className="block font-sans text-3xl antialiased font-bold leading-snug tracking-normal text-black ml-3">
              Beginner
            </h3>

            {moduleDetails?.level?.toLowerCase() === "beginner" && (
              <Tooltip title="Active Module" placement="right">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              </Tooltip>
            )}
          </div>

          <div
            className="mx-4 mb-4 -mt-6 text-white shadow justify-between flex align-middle items-center h-28 rounded-xl bg-gradient-to-r from-green-200 to-red-200 bg-clip-border shadow-gray-900/20 hover:shadow-lg cursor-pointer"
            onClick={() => handleModuleClick("intermediate")}
          >
            <div className="block font-sans text-3xl antialiased font-bold leading-snug tracking-normal text-black ml-3">
              Intermediate
            </div>

            {moduleDetails?.level?.toLowerCase() === "intermediate" && (
              <Tooltip title="Active Module" placement="right">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              </Tooltip>
            )}
          </div>

          <div
            className="mx-4 mb-4 -mt-6 text-white shadow h-28 justify-between flex align-middle items-center  rounded-xl bg-gradient-to-r from-rose-200 to-rose-600 bg-clip-border shadow-gray-900/20 hover:shadow-lg cursor-pointer"
            onClick={() => handleModuleClick("advanced")}
          >
            <h3 className="block font-sans text-3xl antialiased font-bold leading-snug tracking-normal text-black ml-3">
              Advanced
            </h3>

            {moduleDetails?.level?.toLowerCase() === "advanced" && (
              <Tooltip title="Active Module" placement="right">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              </Tooltip>
            )}
          </div>
        </div>
        <div
          className="w-full md:w-3/4 p-5 bg-blue-50 rounded-xl"
          style={{
            height: "fit-content",
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "60vh",
          }}
        >
          {moduleDetails?.questions?.map((question: any, index: number) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {`${index + 1}.`} {question.question}
              </h3>
              <div className="flex flex-col gap-2">
                {question.options.map((option: any, optionIndex: number) => (
                  <div
                    key={`${index}-${optionIndex}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      id={`question-${index}-${option}`}
                      onChange={() =>
                        handleQuestionChange(question.question, option)
                      }
                    />
                    <label htmlFor={`question-${index}-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-2">
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleQuestionSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSection;

// return (
//   <div
//     key={index}
//     className="bg-white p-3 rounded-lg shadow mb-4"
//   >
//     <h3 className="text-lg font-bold text-gray-900">
//       {question.question}
//     </h3>
//     <div className="flex flex-col gap-2">
//       {question.options.map((option: any, index: number) => (
//         <div key={index} className="flex items-center gap-2">
//           <input
//             type="radio"
//             name={`question-${index}`}
//             id={`question-${index}-${option}`}
//           />
//           <label htmlFor={`question-${index}-${option}`}>
//             {option}
//           </label>
//         </div>
//       ))}
//     </div>
//   </div>
