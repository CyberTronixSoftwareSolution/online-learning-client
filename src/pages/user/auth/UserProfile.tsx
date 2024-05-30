import {
  Avatar,
  Button,
  Modal,
  Popconfirm,
  Progress,
  Input,
  Upload,
} from "antd";
import {
  LogoutOutlined,
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
// import DataNotFound from "../../../components/DataNotFound";
import ExamResultCard from "../../../components/ExamResultCard";
import { useEffect, useState } from "react";
import { useLoading } from "../../../shared/context/LoadingContext";
import { useAuth } from "../../../shared/context/AuthContext";
import { LocalStorageService } from "../../../shared/localStorage.service";

const UserProfile = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any>([]);

  const { axiosInstance } = useLoading();
  const { authUser, setUser } = useAuth();

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get(`/user/get/${authUser?._id}`);
      if (response.data) {
        setLoggedInUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (authUser?._id) {
      getUserProfile();
    }
  }, [authUser]);

  const onUpdateUser = async () => {};

  const handleChange = (info: any) => {
    setFileList(info.fileList);
  };

  const handleRemove = (file: any) => {
    setFileList((prevList: any) =>
      prevList.filter((item: any) => item.uid !== file.uid)
    );
  };

  const clearUserDetails = () => {
    setUserData({});
    setErrors({});
    setOpen(false);
    setFileList([]);
  };

  const showEditProfile = () => {
    setUserData(loggedInUser);
    setOpen(true);
  };

  const logout = () => {
    LocalStorageService.removeUser();
  };

  //  validate user
  const validate = (data: any) => {
    const errors: any = {};

    if (!data.name) {
      errors.name = "Name is required";
    }

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!isEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.phone) {
      errors.phone = "Phone is required";
    }

    if (!data.age) {
      errors.age = "Age is required";
    }

    setErrors(errors);
    return errors;
  };

  const isEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      {" "}
      <div className="px-3 py-1">
        <div className="flex relative flex-col mt-6 w-full text-gray-700 bg-clip-border bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center px-6 py-2">
            <div className="flex gap-3 items-center">
              {loggedInUser?.image != "" ? (
                <Avatar
                  size={64}
                  src={<img src={loggedInUser?.image} alt="avatar" />}
                />
              ) : (
                <Avatar size={64} icon={<UserOutlined />} />
              )}

              <div className="flex flex-col">
                <div className="text-xl font-bold tracking-tight leading-none text-black md:text-3xl lg:text-2xl">
                  {loggedInUser?.name}
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-sm font-semibold text-gray-500">
                    <PhoneOutlined /> {loggedInUser?.phone}
                  </span>

                  <span className="text-sm font-semibold text-gray-500">
                    <MailOutlined /> {loggedInUser?.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Button
                type="primary"
                icon={<EditOutlined />}
                ghost
                onClick={showEditProfile}
              >
                Edit Profile
              </Button>
              <Popconfirm
                title="Logout Confirmation"
                description="Are you sure to logout?"
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
                placement="bottomLeft"
              >
                <Button type="primary" danger icon={<LogoutOutlined />} ghost>
                  LogOut
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4 mb-6 md:grid-cols-3">
          <div
            className="flex relative flex-col col-span-2 text-gray-700 bg-clip-border bg-white rounded-xl shadow-md"
            style={{ height: "350px" }}
          >
            <div className="flex justify-between items-center p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold tracking-normal leading-snug text-blue-gray-900">
                Previous Exam Results
              </h5>
            </div>
            <div className="px-6 py-2">
              <div
                className="overflow-hidden overflow-y-scroll"
                style={{ height: "240px" }}
              >
                {/* <DataNotFound name={"Result Data"} /> */}

                <div className="grid grid-cols-1 gap-4 mt-1 md:grid-cols-1 lg:grid-cols-3">
                  <ExamResultCard />
                  <ExamResultCard />
                  <ExamResultCard />
                  <ExamResultCard />
                  <ExamResultCard />
                  <ExamResultCard />
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex relative flex-col text-gray-700 bg-clip-border bg-white rounded-xl shadow-md"
            style={{ height: "350px" }}
          >
            <div className="flex justify-between items-center p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold tracking-normal leading-snug text-blue-gray-900">
                Performance
              </h5>
            </div>
            <div className="px-6 py-2">
              <div className="flex justify-center align-middle">
                <Progress
                  type="dashboard"
                  steps={10}
                  percent={75}
                  trailColor="rgba(0, 0, 0, 0.06)"
                  strokeWidth={20}
                  size={180}
                />
              </div>

              <div className="flex justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-500">
                    Current Stage
                  </span>
                  <span className="text-2xl font-bold text-black">
                    Intermediate
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-500">
                    Total Points
                  </span>
                  <span className="text-2xl font-bold text-right text-black">
                    200
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Profile Modal */}
      <Modal
        title="EDIT USER DETAILS"
        open={open}
        onOk={onUpdateUser}
        onCancel={() => {
          setOpen(false);
          clearUserDetails();
        }}
        centered
        width={600}
        maskClosable={false}
      >
        {/* name email phone number image */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 font-base required">
              Full Name
            </label>
            <Input
              placeholder="Full Name"
              id="name"
              status={errors.name && "error"}
              value={userData?.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 font-base required">
                Email
              </label>
              <Input
                placeholder="Email"
                id="email"
                status={errors.email && "error"}
                value={userData?.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                readOnly
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 font-base required">
                Phone Number
              </label>
              <Input
                placeholder="Phone Number"
                id="phone"
                status={errors.phone && "error"}
                value={userData?.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 font-base">Age</label>
              <Input
                placeholder="Age"
                id="age"
                value={userData?.age}
                onChange={(e) =>
                  setUserData({ ...userData, age: e.target.value })
                }
                type="number"
                onInput={(e: any) => {
                  if (e.target.value.length > 2) {
                    e.target.value = e.target.value.slice(0, 2);
                  }
                }}
                status={errors.age && "error"}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 font-base">
                Profile Image
              </label>

              <Upload
                listType="text"
                className="upload-list-inline"
                showUploadList={{ showRemoveIcon: true }}
                accept=".jpg, .jpeg, .png"
                maxCount={1}
                beforeUpload={(file: any) => {
                  console.log("file", file);
                  return false; // Prevent automatic upload
                }}
                onChange={handleChange}
                onRemove={handleRemove}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserProfile;
