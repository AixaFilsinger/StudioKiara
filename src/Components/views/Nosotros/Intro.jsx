import "./intro.scss";
import women from "../../../assets/women-aboutUs.png";
import { motion } from "framer-motion";

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
    transition: {
      duration: 1,
    }
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    }
  }
};

const slideVariants = {
  initial: {
    x: "100%",
  },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 15,
      ease: "linear"
    }
  }
};

const childVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    }
  }
};

const Intro = () => {
  return (
    <div className="intro">
      <div className="wrapper">
        <motion.div className="textContainer" variants={textVariants} initial="initial" animate="animate">
          <motion.h1 variants={childVariants}>SOBRE NOSOTROS</motion.h1>
          <motion.h3 variants={childVariants}>
          Tu confianza y belleza son nuestro mayor orgullo. Conoce al equipo y el compromiso que nos inspiran cada día al elegirnos
          </motion.h3>
        </motion.div>
      </div>
      <motion.div className="slidinTextContainer" variants={slideVariants} initial="initial" animate="animate">
        Kiara Studio
      </motion.div>
      <div className="imageIntro">
        <img src={women} alt="imagen-uñas" />
      </div>
    </div>
  );
};

export default Intro;
