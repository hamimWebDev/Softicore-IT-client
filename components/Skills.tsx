import React, { useEffect, useState } from "react";

import Marquee from "react-fast-marquee";

import { motion } from "framer-motion";
import SectionTitle from "@/hooks/SectionTitle/SectionTitle";

import { useGetAllJourneysQuery } from "@/redux/features/Journey/journeyApi";

const Skills = () => {

  const { data: journeys, isLoading, isError } = useGetAllJourneysQuery(undefined);
  const [journeyList, setJourneyList] = useState<any[]>([]);


  useEffect(() => {
    if (Array.isArray(journeys)) {
      setJourneyList(journeys);
    } else {
      setJourneyList([]);
    }
  }, [journeys]);

  if (isLoading) {
    return <div className="text-center py-8">Loading journeys...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Failed to load journeys.</div>;
  }

  return (
    <div className=" flex items-center pb-20 ">
      <div className="container mx-auto px-4">
        <div className="lg:py-10 mb-11 lg:mt-1 ">
          <div className="text-center">
            <h3 className="text-4xl text-[#00C0FF] ">&lt; Skills /&gt;</h3>
            <h1 className="text-3xl mt-3 lg:text-5xl text-white font-bold lg:mt-5">
              My Technical Skills
            </h1>
          </div>
        </div>

        <div className="lg:mt-[40px] mt-[40px]">
          <Marquee speed={50} gradient={false} pauseOnHover={true}>
            <div className="flex gap-4 px-4">
              {journeyList
                .filter((item) => item.type === "skill")
                .map((skl, index) => {
                 
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 transition-all duration-300 hover:border-blue-500/30 w-60 h-40 flex flex-col items-center justify-center">
                        {/* Skill Icon */}
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-white/10 p-2 flex items-center justify-center">
                            <img
                              src={skl.icon}
                              alt={skl.name}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                        </div>

                        {/* Skill Name */}
                        <div className="text-center">
                          <h3 className="text-sm font-medium text-white">
                            {skl.name}
                          </h3>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      </div>
                    </motion.div>
                  );
                })}

            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Skills;
