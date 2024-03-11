import { useState } from "react";
import Loader from "../../src/components/Loader/Loading";
import Error from "../../src/components/Error/Error";
import useGetProfile from "../../src/hooks/useFetchData";
import { BASE_URL } from "../../src/config";
import Tabs from "./Tabs";
import starIcon from "../../src/assets/images/Star.png";
import DoctorAbout from "../../src/pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );

  const [tab, setTab] = useState("overview");

  return (
    <section>
      <section className=" pt-0 ">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        <section className=" grid grid-cols-2 gap-7 ">
          <Tabs className="" tab={tab} setTab={setTab} />
          <section className="flex flex-col gap-2 ">
            {data.isApproved === "pending" && (
              <section className="flex flex-row gap-1 p-4 mb-4 h-9 text-yellow-800 bg-yellow-500 rounded-lg">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5"
                  fill="red"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <div className="ml-3 text-sm font-medium">
                  To get approval please complete your profile. We &apos;ll
                  review manually and approve within 3 days.
                </div>
              </section>
            )}

            <section className="pt-2">
              {tab == "overview" && (
                <section className="">
                  <div className="flex flex-col items-center gap-4 pt-2 mb-10">
                    <figure className="max-w-[200px] max-h-[200px]">
                      <img src={data?.photo} alt="" className="w-full" />
                    </figure>
                    <div className="flex flex-col gap-1">
                      <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold ">
                        {data.specialization}
                      </span>
                      <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                        {data.name}
                      </h3>

                      <section className="flex flex-row items-center gap-1">
                        <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                          <img src={starIcon} alt="" />
                          {data.averageRating}
                        </span>

                        <span className=" text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                          ({data.totalRating})
                        </span>
                      </section>

                      {/* <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                        {data?.bio}
                      </p> */}
                    </div>
                  </div>
                  <DoctorAbout
                    name={data.name}
                    about={data.about}
                    qualifications={data.qualifications}
                    experiences={data.experiences}
                  />
                </section>
              )}

              {tab == "appointments" && (
                <Appointments appointments={data.appointments} />
              )}
              {tab == "settings" && <Profile doctorData={data} />}
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Dashboard;
