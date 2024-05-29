import { Avatar, Button, Input, Table, Tooltip } from "antd";
import { SearchOutlined, UserOutlined, RiseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AnyObject } from "antd/es/_util/type";
import UserProgress from "../../components/UserProgress";

const AdminUserPage = () => {
  const [users, setUsers] = useState([
    {
      name: "John Doe",
      email: "jhone@gmail.com",
      dob: "1990-01-01",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
  ]);
  const [tempUsers] = useState([]);
  const [open, setOpen] = useState(false);

  // const { loading, axiosInstance } = useLoading();

  // useEffect(() => {
  //   loadAllUsers();
  // }, []);

  // const loadAllUsers = async () => {
  //   try {
  //     const response = await axiosInstance.get("/user/getAll");
  //     setUsers(response.data);
  //     setTempUsers(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSearch = (e: string) => {
    if (e === "") {
      setUsers(tempUsers);
    } else {
      const filteredUsers = tempUsers.filter((user: AnyObject) =>
        user.name.toLowerCase().includes(e.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };

  const columns = [
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <>
          {image ? (
            <Avatar
              src={image}
              shape="square"
              size="large"
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <Avatar
              shape="square"
              size="large"
              icon={<UserOutlined />}
              style={{ width: 40, height: 40 }}
            />
          )}
        </>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        return createdAt.split("T")[0];
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: AnyObject) => (
        <div className="flex gap-2">
          <Tooltip title="User Progress" placement="right">
            <Button
              type="primary"
              icon={<RiseOutlined />}
              onClick={() => {
                console.log(record);
                setOpen(true);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <>
      {/* {loading && <CustomLoading />} */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Users List</h1>
            <Input
              size="middle"
              placeholder="Search Users"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              onChange={(e) => {
                onSearch(e.target.value);
              }}
            />
          </div>

          <span>
            <Table
              pagination={{
                pageSize: 5,
              }}
              columns={columns}
              dataSource={users}
            />
          </span>
        </div>
      </div>

      <UserProgress open={open} setOpen={setOpen} />
    </>
  );
};

export default AdminUserPage;
