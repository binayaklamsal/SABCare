import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../src/context/AuthContext";

import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <section className=" grid grid-cols-2 ">
      <section></section>
      <section className="tabs flex flex-col w-auto  gap-3 bg-slate-500  rounded-md shadow-md  px-2 py-3">
        <section className="tabsB flex flex-col gap-2 border px-6 rounded-md shadow-md  bg-slate-500">
          <button
            onClick={() => setTab("overview")}
            className={`${
              tab == "overview"
                ? "text-primaryColor border p-3  w-full bg-slate-500  addQ "
                : " text-headingColor border p-3 w-full "
            } rounded-md `}
          >
            Overview
          </button>

          <button
            onClick={() => setTab("appointments")}
            className={`${
              tab == "appointments"
                ? " text-primaryColor border p-3 w-full addQ  "
                : " text-headingColor border p-3 w-full"
            }  hover:bg-slate-400  rounded-md `}
          >
            Appointments
          </button>

          <button
            onClick={() => setTab("settings")}
            className={`${
              tab == "settings"
                ? " text-primaryColor border p-3 w-full addQ"
                : " text-headingColor border p-3 w-full"
            } w-full  rounded-md`}
          >
            Profile
          </button>

          <section className="pt-[100px] w-full">
            <button
              onClick={handleLogout}
              className=" addQ w-full border border-black bg-black z-20 mt-4 p-3 text-[16px] rounded-md  "
            >
              Logout
            </button>
            <button className=" addD w-full border border-black bg-black z-20 mt-4 p-3 text-[16px] rounded-md ">
              Delete account
            </button>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Tabs;
