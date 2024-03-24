/* eslint-disable react/prop-types */
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import DefaultPhoto from "../../assets/images/DefaultPhoto.png";

const DoctorCard = ({ doctor }) => {
  const { name, avgRating, totalRating, photo, specialization, experiences } =
    doctor;

  return (
    <section className=" flex flex-col justify-between   border px-3 rounded-md shadow-md w-[400px]">
      <span className="flex flex-col gap-3">
        <img
          src={photo || DefaultPhoto}
          alt=""
          className="w-[370px] h-[300px] object-cover"
        />

        <section className="flex items-center justify-center w-[120px] p-2  bg-[#CCF0F3] text-[#01B5C5] rounded-md">
          {specialization}
        </section>
      </span>
      <section className="flex flex-row items-center justify-between">
        <p className="font-medium text-[20px]">{name}</p>
        <span className="flex flex-row items-center">
          <span>
            <img src={starIcon} alt="StarIcon" />
          </span>
          <span>{avgRating}</span>
          <span>({totalRating})</span>
        </span>
      </section>
      <section className="flex flex-row items-center gap-[100px]">
        <span className="text-[20px]">
          At {experiences && experiences[0]?.hospital}
        </span>
        <Link
          to={`/doctors/${doctor._id}`}
          className="rounded-full border border-solid border-[#181A1E] p-2 hover:bg-blue-500 hover:border-blue-500  "
        >
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link>
      </section>
    </section>
  );
};

export default DoctorCard;
