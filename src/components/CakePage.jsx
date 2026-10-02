import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CakePage.css";

const floatingHearts = ["💖", "💗", "💞", "💝", "💘", "💖", "💗", "💞"];
const sparkles = Array.from({ length: 18 }, (_, index) => index);

function CakePage() {
  const navigate = useNavigate();
  const dragStartY = useRef(null);
  const [dragDistance, setDragDistance] = useState(0);
  const [isCut, setIsCut] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const resetCake = () => {
    setDragDistance(0);
    setIsCut(false);
    setIsDragging(false);
    dragStartY.current = null;
  };

  const handlePointerDown = (event) => {
    dragStartY.current = event.clientY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging || dragStartY.current === null) return;

    const distance = Math.max(0, event.clientY - dragStartY.current);
    setDragDistance(distance);

    if (distance >= 100) {
      setIsCut(true);
    }
  };

  const handlePointerUp = () => {
    if (dragDistance >= 100) {
      setIsCut(true);
    } else {
      setIsCut(false);
      setDragDistance(0);
    }

    setIsDragging(false);
    dragStartY.current = null;
  };

  const cutLineOpacity = Math.min(dragDistance / 100, 1);
  const splitAmount = isCut ? 58 : 0;

  return (
    <div className="cake-page">
      <div className="cake-glow cake-glow-one" />
      <div className="cake-glow cake-glow-two" />

      <div className="floating-hearts" aria-hidden="true">
        {floatingHearts.map((heart, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.5}s` }}>{heart}</span>
        ))}
      </div>

      <div className="sparkle-layer" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span key={sparkle} className="sparkle" style={{ left: `${(sparkle * 11) % 100}%`, top: `${(sparkle * 17) % 70}%` }} />
        ))}
      </div>

      <motion.div
        className="cake-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {!isCut ? (
          <motion.h2
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your first surprise 🎂
          </motion.h2>
        ) : (
          <motion.div
            className="birthday-message"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>✨ Happy Birthday to you, sweetheart! ✨</h2>
            <p>Here is your cake 🎂</p>
          </motion.div>
        )}

        {!isCut && (
          <motion.p
            className="cake-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Drag downward on the cake to cut it
          </motion.p>
        )}

        <div className="cake-scene">
          <motion.div
            className={`cake-wrapper ${isDragging ? "dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            animate={{
              scale: isCut ? 1.04 : 1,
              y: isCut ? 8 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="cake-half cake-half-left"
              animate={{
                x: isCut ? -splitAmount : 0,
                y: isCut ? 14 : 0,
                rotate: isCut ? -7 : 0,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
              <div className="cake-art cake-art-left">
                <div className="cake-layer top" />
                <div className="cake-layer middle" />
                <div className="cake-layer base" />
                <div className="cake-icing icing-left" />
                <div className="cake-icing icing-right" />
                <div className="candle candle-1">
                  <span className="wick" />
                  <span className="flame" />
                </div>
                <div className="candle candle-2">
                  <span className="wick" />
                  <span className="flame" />
                </div>
                <div className="sprinkles left-sprinkles"> </div>
              </div>
            </motion.div>

            <motion.div
              className="cake-half cake-half-right"
              animate={{
                x: isCut ? splitAmount : 0,
                y: isCut ? 14 : 0,
                rotate: isCut ? 7 : 0,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
              <div className="cake-art cake-art-right">
                <div className="cake-layer top" />
                <div className="cake-layer middle" />
                <div className="cake-layer base" />
                <div className="cake-icing icing-left" />
                <div className="cake-icing icing-right" />
                <div className="candle candle-3">
                  <span className="wick" />
                  <span className="flame" />
                </div>
                <div className="candle candle-4">
                  <span className="wick" />
                  <span className="flame" />
                </div>
                <div className="sprinkles right-sprinkles"> </div>
              </div>
            </motion.div>

            <div className="cake-cut-line" style={{ opacity: cutLineOpacity }} />
          </motion.div>
        </div>

        {!isCut ? (
          <div className="drag-instruction">
            <span>Drag down on the cake to cut it</span>
          </div>
        ) : (
          <motion.button
            className="reset-button"
            onClick={resetCake}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Cut it again 🎂
          </motion.button>
        )}

        {isCut && (
          <motion.button
            className="next-surprise-button"
            onClick={() => navigate("/next-surprise")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Next surprise <span aria-hidden="true">→</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

export default CakePage;
