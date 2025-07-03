import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

const Blog: React.FC<any> = ({ blog }) => {
  const { id, img, title, description, url } = blog;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [img]);
  return (
    <div className="p-2 sm:p-3 md:p-4">
      <Tilt
        className="parallax-effect"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
      >
        <div className="inner-element">
          <div className=" border border-blue-500/20 p-4 sm:p-6 rounded-xl h-[400px] sm:h-[450px] flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="relative h-48 w-full overflow-hidden ">
              {!imageError ? (
                <Image
                  src={img}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <span className="text-gray-400 dark:text-gray-500">
                    Image not available
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-5 ">
              <div className="space-y-2">
                <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
                <p className="line-clamp-4 text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </div>

              <div className="pt-4">
                {url ? (
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Read more
                    <svg
                      className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                ) : (
                  <button
                    className="inline-flex items-center text-sm font-medium text-gray-400 bg-gray-200 dark:bg-gray-700 rounded px-3 py-1 opacity-60 cursor-not-allowed"
                    disabled
                    title="No link available"
                  >
                    Read more
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Blog;

// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import Tilt from "react-parallax-tilt";

// const Blog: React.FC<any> = ({ blog }) => {
//   const { id, img, title, description, url } = blog;
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     setImageError(false);
//   }, [img]);
//   return (
//     <div className="p-2 sm:p-3 md:p-4">
//       <Tilt
//         className="parallax-effect"
//         perspective={500}
//         glareEnable={true}
//         glareMaxOpacity={0.45}
//         scale={1.02}
//       >
//         <div className="relative h-48 w-full overflow-hidden ">
//           {!imageError ? (
//             <Image
//               src={img}
//               alt={title}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
//               onError={() => setImageError(true)}
//             />
//           ) : (
//             <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
//               <span className="text-gray-400 dark:text-gray-500">
//                 Image not available
//               </span>
//             </div>
//           )}
//         </div>
//         <div className="flex flex-1 flex-col justify-between p-5 ">
//           <div className="space-y-2">
//             <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
//               {title}
//             </h3>
//             <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
//               {description}
//             </p>
//           </div>

//           <div className="pt-4">
//             <Link
//               href={url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
//             >
//               Read more
//               <svg
//                 className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//             </Link>
//           </div>
//         </div>{" "}
//       </Tilt>
//     </div>
//   );
// };

// export default Blog;
