import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeWriter = () => {
  return (
    <div className="flex flex-col pb-8">
      <h1 style={{color: "#989898"}} className="text-4xl font-light mb-4">And I’m a</h1>

      <span style={{color: "coral"}} className=" font-bold text-5xl">
        <Typewriter
          words={[
            "Web Developer",
            "Coder",
            "Freelancer",
            "Youtuber",
            "Programmer",
          ]}
          loop={5}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </span>
    </div>
  );
};

export default TypeWriter;
