import DoctorCard from "./../../components/Doctors/DoctorCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);
    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  // Implementing Quick Sort algorithm
  const quickSort = (array) => {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
      if (array[i].name < pivot.name) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  // Implementing Binary Search Algorithm with All Occurrences
  const binarySearchAll = (array, target) => {
    let left = 0;
    let right = array.length - 1;
    const results = [];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (
        array[mid] &&
        array[mid].name &&
        array[mid].name.toLowerCase().includes(target.toLowerCase())
      ) {
        // Doctor found, add to results
        results.push(array[mid]);

        // Move left and right pointers to find other matching doctors
        let i = mid - 1;
        while (
          i >= left &&
          array[i] &&
          array[i].name &&
          array[i].name.toLowerCase().includes(target.toLowerCase())
        ) {
          results.push(array[i]);
          i--;
        }
        i = mid + 1;
        while (
          i <= right &&
          array[i] &&
          array[i].name &&
          array[i].name.toLowerCase().includes(target.toLowerCase())
        ) {
          results.push(array[i]);
          i++;
        }

        return results;
      }
    }
  };


  const sortedDoctors = quickSort(doctors);


  const searchResults = binarySearchAll(sortedDoctors, debounceQuery);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center ">
          <h2 className="heading ">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-2 pl-2 pt-[10px] bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search doctor by name or specification"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md "
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <section>
          <div className="container">
            {loading && <Loader />}
            {error && <Error />}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3b lg:grid-cols-4 gap-5 ">
                {searchResults.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default Doctors;
