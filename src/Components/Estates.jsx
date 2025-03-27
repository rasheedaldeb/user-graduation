import React from "react";
import Filters from "./Filters";
import EstatesCards from "./EstatesCards/EstatesCards";
import TypeButtons from "./TypeButtons";

const Estates = () => {
  return (
    <section className="flex flex-col gap-5 p-10 pt-16">
      <div className="flex justify-between py-7">
        {/* filters section */}
        <Filters />
        {/* categories and cards section */}
        <div className="flex w-[70%] flex-col gap-5">
          {/* <TypeButtons /> */}
          <EstatesCards />
        </div>
      </div>
    </section>
  );
};

export default Estates;
