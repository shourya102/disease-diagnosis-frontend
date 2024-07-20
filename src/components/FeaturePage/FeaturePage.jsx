import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {BsChatLeftText} from 'react-icons/bs';
import {BiImage} from 'react-icons/bi';

const FeaturePage = ({handleTextBotClick, handleImageBotClick}) => {
    const [isHoveringText, setIsHoveringText] = useState(false);
    const [isHoveringImage, setIsHoveringImage] = useState(false);

    const textGradient = isHoveringText
        ? "linear-gradient(45deg, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb, #ff9a9e)"
        : "linear-gradient(45deg, #ff9a9e, #fad0c4)";

    const imageGradient = isHoveringImage
        ? "linear-gradient(45deg, #13547a, #80d0c7, #ff758c, #ff7eb3, #13547a)"
        : "linear-gradient(45deg, #13547a, #80d0c7)";

    return (
        <motion.div
            animate={{
                boxShadow: [
                    '0 0 0 3px rgba(245, 158, 11, 0.7) inset',
                    '0 0 0 3px rgba(239, 68, 68, 0.7) inset',
                    '0 0 0 3px rgba(16, 185, 129, 0.7) inset',
                    '0 0 0 3px rgba(59, 130, 246, 0.7) inset',
                    '0 0 0 3px rgba(245, 158, 11, 0.7) inset',
                ],
            }}
            transition={{
                duration: 4,
                ease: "linear",
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
            }}
            className="relative rounded-full p-1"
        >
            <motion.div
                animate={{rotate: 360}}
                transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'conic-gradient(from 0deg, rgba(245, 158, 11, 0.3), rgba(239, 68, 68, 0.3), rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.3), rgba(245, 158, 11, 0.3))',
                }}
            />
            <div className="relative magicpattern rounded-full w-[48rem] h-[28rem] flex overflow-hidden">
                <motion.div
                    onClick={handleTextBotClick}
                    onHoverStart={() => setIsHoveringText(true)}
                    onHoverEnd={() => setIsHoveringText(false)}
                    animate={{
                        background: textGradient,
                        backgroundSize: isHoveringText ? "400% 400%" : "100% 100%",
                        backgroundPosition: isHoveringText ? ["0% 0%", "100% 100%"] : "0% 0%"
                    }}
                    transition={{duration: 3, repeat: Infinity, repeatType: "reverse"}}
                    className="flex flex-col justify-center items-center p-6 w-1/2 h-full cursor-pointer"
                >
                    <BsChatLeftText className="text-5xl text-gray-800 mb-4"/>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Text Analysis</h2>
                    <p className="text-lg text-center text-gray-700">
                        I'm designed to process and analyze written medical information, including symptoms.
                    </p>
                </motion.div>

                <motion.div
                    onClick={handleImageBotClick}
                    onHoverStart={() => setIsHoveringImage(true)}
                    onHoverEnd={() => setIsHoveringImage(false)}
                    animate={{
                        background: imageGradient,
                        backgroundSize: isHoveringImage ? "400% 400%" : "100% 100%",
                        backgroundPosition: isHoveringImage ? ["0% 0%", "100% 100%"] : "0% 0%"
                    }}
                    transition={{duration: 3, repeat: Infinity, repeatType: "reverse"}}
                    className="flex flex-col justify-center items-center p-6 w-1/2 h-full cursor-pointer"
                >
                    <BiImage className="text-5xl text-gray-800 mb-4"/>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Image Analysis</h2>
                    <p className="text-lg text-center text-gray-700">
                        I'm designed to analyze medical images of the heart, lungs and brain to help identify
                        potential diseases and abnormalities.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FeaturePage;