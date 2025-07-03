import React from "react";

import JourneyCards from "./JourneyCards";

const Journey = () => {
  return (
    <section id="journey">
      <div className="container mx-auto">
        <div className="lg:py-10 mb-11 lg:mt-1 ">
          <div className="text-center">
            <h3 className="text-4xl text-[#00C0FF] ">&lt; Journey /&gt;</h3>
            <h1 className="text-3xl mt-3 lg:text-5xl text-white font-bold lg:mt-5">
              My Professional Journey
            </h1>
          </div>
        </div>

        <JourneyCards />
      </div>
    </section>
  );
};

export default Journey;
