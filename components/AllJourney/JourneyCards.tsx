import { motion, AnimatePresence } from "framer-motion";
import JourneyCard from "./JourneyCard";
import { useEffect, useState } from "react";
import { useGetAllJourneysQuery } from "@/redux/features/Journey/journeyApi";


const tabOptions = [
  { label: "Experience", value: "experience" },
  { label: "Education", value: "education" },
];

const JourneyCards = () => {
  const { data: journeys, isLoading, isError } = useGetAllJourneysQuery(undefined);
  const [journeyList, setJourneyList] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState("experience");

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
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        {/* Tabs List */}
        <div className="flex gap-4 mb-8">
          {tabOptions.map((tab) => (
            <button
              key={tab.value}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${selectedTab === tab.value ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"}`}
              onClick={() => setSelectedTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Tabs Content */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {journeyList
                .filter((item) => item.type === selectedTab)
                .map((card, index) => (
                  <JourneyCard key={index} {...card} />
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default JourneyCards;
