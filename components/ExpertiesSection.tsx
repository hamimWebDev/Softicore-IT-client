import AnimatedSection from "@/components/AnimatedSection";
import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
    offscreen: { opacity: 0, y: 40 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", bounce: 0.2, duration: 0.8 }
    }
};

const ExpertiesSection = () => (
    <section className="relative  overflow-hidden bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <section className="py-10 lg:py-24 relative z-10">
            <div className="container-custom">
                <AnimatedSection className="text-center mb-16">
                    <div className="lg:py-10 mb-11 lg:mt-1 ">
                        <div className="text-center">
                            <h3 className="text-4xl text-primary-500 ">&lt; Expertise /&gt;</h3>
                            <h1 className="text-3xl mt-3 lg:text-5xl text-gray-900 dark:text-white font-bold lg:mt-5">
                                My Technical Expertise
                            </h1>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Skill categories */}
                    {/* Frontend */}
                    <motion.div
                        className="col-span-1"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                    >
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-primary-100 dark:border-primary-900 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full group">
                            <h3 className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400 tracking-wide group-hover:underline">
                                Frontend
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base font-medium">
                                <li>React.js & Next.js</li>
                                <li>TypeScript</li>
                                <li>Redux & Context API</li>
                                <li>Tailwind CSS</li>
                                <li>Framer Motion</li>
                            </ul>
                        </div>
                    </motion.div>
                    {/* Backend */}
                    <motion.div
                        className="col-span-1"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                    >
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-secondary-100 dark:border-secondary-900 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full group">
                            <h3 className="text-xl font-bold mb-4 text-secondary-600 dark:text-secondary-400 tracking-wide group-hover:underline">
                                Backend
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base font-medium">
                                <li>Node.js & Express</li>
                                <li>MongoDB & Mongoose</li>
                                <li>RESTful APIs</li>
                                <li>GraphQL</li>
                                <li>Authentication</li>
                            </ul>
                        </div>
                    </motion.div>
                    {/* Tools */}
                    <motion.div
                        className="col-span-1"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                    >
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-accent-100 dark:border-accent-900 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full group">
                            <h3 className="text-xl font-bold mb-4 text-accent-600 dark:text-accent-400 tracking-wide group-hover:underline">
                                Tools
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base font-medium">
                                <li>Git & GitHub</li>
                                <li>Docker</li>
                                <li>AWS & Vercel</li>
                                <li>Jest & Testing Library</li>
                                <li>CI/CD</li>
                            </ul>
                        </div>
                    </motion.div>
                    {/* Other Skills */}
                    <motion.div
                        className="col-span-1"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                    >
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-green-100 dark:border-green-900 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full group">
                            <h3 className="text-xl font-bold mb-4 text-success-500 tracking-wide group-hover:underline">
                                Other Skills
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base font-medium">
                                <li>UI/UX Design</li>
                                <li>Responsive Design</li>
                                <li>Performance Optimization</li>
                                <li>SEO Best Practices</li>
                                <li>Agile Development</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    </section>
);

export default ExpertiesSection;