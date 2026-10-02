import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const resetNoButtonPosition = () => {
      setNoPosition({ top: "0px", left: "0px" });
    };

    window.addEventListener("resize", resetNoButtonPosition);
    return () => window.removeEventListener("resize", resetNoButtonPosition);
  }, []);

  const moveNoButton = () => {
    const button = noButtonRef.current;
    if (!button) return;

    const bounds = button.getBoundingClientRect();
    const currentLeft = Number.parseFloat(noPosition.left) || 0;
    const currentTop = Number.parseFloat(noPosition.top) || 0;
    const margin = 12;
    const availableX = Math.max(0, window.innerWidth - bounds.width - margin * 2);
    const availableY = Math.max(0, window.innerHeight - bounds.height - margin * 2);
    const targetX = margin + Math.random() * availableX;
    const targetY = margin + Math.random() * availableY;
    const originalX = bounds.left - currentLeft;
    const originalY = bounds.top - currentTop;

    setNoPosition({
      top: `${targetY - originalY}px`,
      left: `${targetX - originalX}px`,
    });
    setIsNoVisible(true);
  };

  const handleAttemptToTouchNo = () => {
    setIsNoVisible(false);
    moveNoButton();
  };

  return (
    <div className="surprise-page">
      <div className="hearts">
        <span>♡</span>
        <span>♥</span>
        <span>♡</span>
        <span>♥</span>
        <span>♡</span>
        <span>♥</span>
      </div>

      <motion.div
        className="gift"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
      >
        🎁
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        There is a surprise for moon...
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        Are you ready for the surprise? 👀
      </motion.p>

      <motion.div
        className="buttons"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, duration: 0.7 }}
      >
        <button className="yes-btn" type="button" onClick={() => navigate("/cake")}>
          YES 🖤
        </button>

        <button
          ref={noButtonRef}
          className="no-btn"
          type="button"
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
