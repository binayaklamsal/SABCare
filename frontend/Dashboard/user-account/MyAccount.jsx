import { useContext, useState } from "react";
import { authContext } from "./../../src/context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "./../../src/hooks/useFetchData";
import { BASE_URL } from "../../src/config";
import Loading from "../../src/components/Loader/Loading";
import Error from "../../src/components/Error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  console.log(userData, "userdata");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10 ">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-x-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full  h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="flex flex-col text-center mt-4">
                <section>
                  <h3 className="text-[18px] leading-[30px] text-headingColor font-bold ">
                    {userData.name}
                  </h3>
                  <p className="text-textColor text-[15px] leading-6 font-medium">
                    {userData.email}
                  </p>
                  <p className="text-textColor text-[15px] leading-6 font-medium">
                    Blood Type:
                    <span className="ml-2 text-headingColor text-[22px] leading-8 ">
                      {userData.bloodType}
                    </span>{" "}
                  </p>
                </section>
                <div className="flex flex-col gap-3 py-[1]">
                  <button
                    onClick={handleLogout}
                    className="addQ border p-2 rounded-md bg-blue-500 "
                  >
                    Logout
                  </button>
                  <button className="addD border p-2 rounded-md bg-blue-500  ">
                    Delete account
                  </button>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab == "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7
          border border-solid border-primaryColor `}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab == "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7
          border border-solid border-primaryColor `}
                >
                  Profile Settings
                </button>
              </div>

              {tab == "bookings" && <MyBookings />}
              {tab == "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
