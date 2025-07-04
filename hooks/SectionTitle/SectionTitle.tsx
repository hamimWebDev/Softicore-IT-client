import React from "react";

interface SectionTitleProps {
  title: string;
  subHeading: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subHeading }) => {
  return (
    <div className="lg:py-10 mb-11 lg:mt-1 ">
      <div className="text-center">
        <h3 className="text-4xl text-primary-500">&lt; {title} /&gt;</h3>
        <h1 className="text-3xl mt-3 lg:text-5xl text-gray-900 dark:text-white font-bold lg:mt-5">
          {subHeading}
        </h1>
      </div>
    </div>
  );
};

export default SectionTitle;
