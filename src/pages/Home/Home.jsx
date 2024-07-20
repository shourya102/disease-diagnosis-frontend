import "./Home.css";
import FeaturePage from "../../components/FeaturePage/FeaturePage.jsx";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import TextAi from "../../components/TextAi/TextAi.jsx";
import ImageAi from "../../components/ImageAi/ImageAi.jsx";

const Home = () => {
    const [isFeaturePageVisible, setIsFeaturePageVisible] = useState(true);
    const [isTextAiVisible, setIsTextAiVisible] = useState(false);
    const [isImageAiVisible, setIsImageAiVisible] = useState(false);

    const handleShowFeaturePage = () => {
        setIsFeaturePageVisible(true);
        setIsImageAiVisible(false);
        setIsTextAiVisible(false);
    }

    const handleTextBotClick = () => {
        setIsFeaturePageVisible(false);
        setIsImageAiVisible(false);
        setIsTextAiVisible(true);
    }
    const handleImageBotClick = () => {
        setIsFeaturePageVisible(false);
        setIsTextAiVisible(false);
        setIsImageAiVisible(true);
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen overflow-clip bg">
            <AnimatePresence mode="wait">
                {isFeaturePageVisible &&
                    <motion.div
                        key="featurePage"
                        initial={{opacity: 0, scale: 0}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.5}}
                        transition={{duration: 0.7}}
                    >
                        <FeaturePage handleTextBotClick={handleTextBotClick} handleImageBotClick={handleImageBotClick}/>
                    </motion.div>}
                {isTextAiVisible &&
                    <motion.div
                        key="textAi"
                        initial={{opacity: 0, scale: 0}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0}}
                        transition={{duration: 0.7}}
                    >
                        <TextAi handleShowFeaturePage={handleShowFeaturePage}/>
                    </motion.div>}
                {isImageAiVisible &&
                    <motion.div
                        key="imageAi"
                        initial={{opacity: 0, scale: 0}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0}}
                        transition={{duration: 0.7}}
                    >
                        <ImageAi handleShowFeaturePage={handleShowFeaturePage}/>
                    </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default Home;