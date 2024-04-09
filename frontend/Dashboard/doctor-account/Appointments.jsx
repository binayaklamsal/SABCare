import React from "react";
import { formateDate } from "../../src/utils/formateDate";

const Appointments = ({ appointments }) => {
  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase ">
        <tr className="bg-[#FFF9EC]">
          <th scope="col" className="px-6 py-3 ">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Booked
          </th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id}>
            <td
              scope="row"
              className="flex items-center gap-3 text-gray-900 whitespace-nowrap"
            >
              <img
                src={item.user.photo}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <span className="flex flex-col">
                <span className="text-base font-semibold">
                  {item.user.name}
                </span>
                <span className="text-normal text-gray-500">
                  {item.user.email}
                </span>
              </span>
            </td>
            <td className="px-6 py-4">{item.user.gender}</td>
            <td className="px-6 py-4">
              {item.isPaid && (
                <span className="flex items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                  Paid
                </span>
              )}

              {!item.isPaid && (
                <section className="flex items-center">
                  <section className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></section>
                  UnPaid
                </section>
              )}
            </td>
            <td className="px-6 py-4">{item.ticketPrice}</td>
            <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
