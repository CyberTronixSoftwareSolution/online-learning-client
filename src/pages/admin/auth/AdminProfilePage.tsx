import { Avatar, Button, Input, Modal, Popconfirm, Upload } from "antd";
import {
  LogoutOutlined,
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../shared/context/AuthContext";
import { useLoading } from "../../../shared/context/LoadingContext";
import { useEffect, useState } from "react";
import { LocalStorageService } from "../../../shared/localStorage.service";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../../shared/cloudinaryUpload.service";

const AdminProfilePage = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const [userData, setUserData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any>([]);

  const { axiosInstance } = useLoading();
  const { authUser, setUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      getLoggedInUser();
    }
  }, [authUser]);

  const getLoggedInUser = async () => {
    try {
      const response = await axiosInstance.get(`/admin/get/${authUser?._id}`);
      if (response.data) {
        setLoggedInUser(response.data);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const onUpdateUser = async () => {
    const validationErrors = validate(userData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    let request: any = {
      name: userData.name,
      phone: userData.phone,
    };
    try {
      if (fileList.length > 0) {
        const imageUrl = await uploadImageToCloudinary(
          fileList[0].originFileObj,
          "profile_images",
          axiosInstance
        );

        request = { ...request, image: imageUrl };
      }

      const response = await axiosInstance.put(
        `/admin/update/${loggedInUser._id}`,
        request
      );

      if (response.data) {
        const userDetails = { ...response.data, role: "Admin" };
        setUser(userDetails);
        clearUserDetails();
        getLoggedInUser();
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

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
    navigate("/admin");
    setUser({} as any);
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

    setErrors(errors);
    return errors;
  };

  const isEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
        <div className="px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {loggedInUser?.image != "" ? (
              <Avatar
                size={64}
                src={<img src={loggedInUser?.image} alt="avatar" />}
              />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}

            <div className="flex flex-col">
              <div className="text-xl font-bold leading-none tracking-tight text-black md:text-3xl lg:text-2xl dark:text-black">
                {loggedInUser?.name}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-500">
                  <PhoneOutlined /> {loggedInUser?.phone}
                </span>

                <span className="text-sm font-semibold text-gray-500">
                  <MailOutlined /> {loggedInUser?.email}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
              onConfirm={logout}
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
            <label className="text-sm font-base text-gray-500 required">
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
              <label className="text-sm font-base text-gray-500 required">
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
              <label className="text-sm font-base text-gray-500 required">
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
              <label className="text-sm font-base text-gray-500">
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

export default AdminProfilePage;
