import { formateDate } from "../../utils/formateDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <section>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 ">
          About of{" "}
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text__para ">{about}</p>
      </section>
      <section className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {qualifications?.map((item, index) => (
            <li
              key={index}
              className="flex felx-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] "
            >
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                13 Nov 2018 - 13 Nov 2018
                {formateDate(item.startingDate)} -{" "}
                {formateDate(item.endingDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor ">
                {item.degree}
              </p>

              <p className="text-[14px] leading-5 font-medium text-textColor ">
                {item.university}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-2">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences?.map((item, index) => (
            <li key={index} className="p-4 rounded bg-[#fff9ea]">
              <span className="text-yellowColor text-[15px] leadig-6 font-semibold ">
                {formateDate(item.startingDate)} -{" "}
                {formateDate(item.endingDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor ">
                {item.position}
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor ">
                {item.hospital}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default DoctorAbout;
