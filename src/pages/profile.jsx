import { BsPencilSquare } from "react-icons/bs";
import { getSession } from "next-auth/react";
import { useState } from "react";
const profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [RepeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async () => {
    // Verify that new password and repeat password match
    if (ConfirmPassword !== RepeatPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    // Perform a request to your API to change the password
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, ConfirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password changed successfully.");
      } else {
        setMessage(data.message || "Password change failed.");
      }
    } catch (error) {
      setMessage("An error occurred while changing the password.");
    }
  };
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
        <form onSubmit={handleSubmit}>
          <div>
            <div className="my-4">
              <input
                type="password"
                name="password"
                onFormSubmit
                className="w-80 p-2 rounded-md border-gray-500 border-2"
                placeholder="Enter the Old password"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </div>
            <div className="my-4">
              <input
                type="password"
                name="changePassword"
                className="w-80 p-2 rounded-md border-gray-500 border-2"
                placeholder="Enter the Confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div className="my-4">
              <input
                type="password"
                name="repeatPassword"
                className="w-80 p-2 rounded-md border-gray-500 border-2"
                placeholder="Enter the Repeat password"
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button className="shadow-md py-2 px-6 rounded-md bg-black text-white cursor-pointer font-semibold hover:opacity-70">
            Change Password
          </button>
        </form>
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
        destination: "/auth/signin",
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
