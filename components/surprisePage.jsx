import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./SurprisePage.css";

function SurprisePage() {
  const navigate = useNavigate();
  const noButtonRef = useRef(null);
  const [noPosition, setNoPosition] = useState({
    top: "0px",
    left: "0px",
  });
  const [isNoVisible, setIsNoVisible] = useState(true);

  const moveNoButton = () => {
    const randomX = Math.random() * 260 + 25;
    const randomY = Math.random() * 120 + 20;
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;

    setNoPosition({
      top: `${randomY * directionY}px`,
      left: `${randomX * directionX}px`,
    });
    setIsNoVisible(true);
  };

  const handleAttemptToTouchNo = () => {
    setIsNoVisible(false);
    moveNoButton();
  };

  return (
    <div className="surprise-page">

      {/* Floating hearts */}
      <div className="hearts">
        <span>♡</span>
        <span>♥</span>
        <span>♡</span>
        <span>♥</span>
        <span>♡</span>
        <span>♥</span>
      </div>

      {/* Gift */}
      <motion.div
        className="gift"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.5,
        }}
      >
        🎁
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 1,
        }}
      >
        There is a surprise for Nilay...
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.8,
          duration: 1,
        }}
      >
        Are you ready for the surprise? 👀
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="buttons"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 2.8,
          duration: 0.7,
        }}
      >
        <button className="yes-btn" type="button" onClick={() => navigate("/cake")}>
          YES 💖
        </button>

        <button
          ref={noButtonRef}
          className="no-btn"
          onMouseEnter={handleAttemptToTouchNo}
          onMouseDown={handleAttemptToTouchNo}
          onClick={handleAttemptToTouchNo}
          style={{
            top: noPosition.top,
            left: noPosition.left,
            opacity: isNoVisible ? 1 : 0,
            pointerEvents: isNoVisible ? "auto" : "none",
            transform: isNoVisible ? "scale(1)" : "scale(0.8)",
          }}
        >
          NO 🙈
        </button>
      </motion.div>

    </div>
  );
}

export default SurprisePage;