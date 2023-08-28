import { BsPencilSquare } from "react-icons/bs";
import { getSession } from "next-auth/react";
const profile = () => {
  return (
    <>
      <div>
        <div className="text-3xl font-bold flex justify-center mt-5">
          Profile
        </div>
      </div>
      {/* image div */}
      <div className="m-20 p-4 ml-10 flex justify-center items-center flex-col">
        <div className="mt-4 font-semibold">
          <span className=" inline-flex items-center cursor-pointer">
            <BsPencilSquare />
          </span>
        </div>
        {/* Change Password Input */}
        <h2 className="font-bold text-xl mt-10">Password</h2>
        <div>
          <div className="my-4">
            <input
              type="password"
              name="password"
              onFormSubmit
              className="w-80 p-2 border-gray-500 border-2"
              placeholder="Enter the Old password"
            />
          </div>
          <div className="my-4">
            <input
              type="password"
              name="changePassword"
              className="w-80 p-2 border-gray-500 border-2"
              placeholder="Enter the Confirm password"
            />
          </div>
          <div className="my-4">
            <input
              type="password"
              name="repeatPassword"
              className="w-80 p-2 border-gray-500 border-2"
              placeholder="Enter the Repeat password"
            />
          </div>
        </div>
        <button className="bg-indigo-200  text-black hover:bg-indigo-600 font-bold rounded p-2">
          Change Password
        </button>
      </div>
    </>
  );
};

export default profile;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/Forms/login",
        parmanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
