import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NextSurprisePage.css";

const balloonWords = ["you", "are", "so", "special"];

function NextSurprisePage() {
  const navigate = useNavigate();
  const [poppedCount, setPoppedCount] = useState(0);

  return (
    <main className="next-surprise-page">
      <motion.div
        className="next-surprise-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <p className="next-surprise-eyebrow">One more surprise</p>
        <h1>Blast the balloons one by one, darling</h1>

        <div className="balloon-stage" aria-label="Birthday message balloons">
          {balloonWords.map((word, index) => {
            const hasPopped = index < poppedCount;
            const isNext = index === poppedCount;

            return (
              <div className={`balloon-slot balloon-slot-${index + 1}`} key={word}>
                <AnimatePresence mode="wait" initial={false}>
                  {hasPopped ? (
                    <motion.div
                      className="balloon-reveal"
                      key="word"
                      initial={{ opacity: 0, scale: 0.45, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    >
                      {word}
                    </motion.div>
                  ) : (
                    <motion.button
                      className={`balloon ${isNext ? "balloon-ready" : ""}`}
                      key="balloon"
                      type="button"
                      aria-label={`Pop balloon ${index + 1} to reveal ${word}`}
                      disabled={!isNext}
                      onClick={() => setPoppedCount(index + 1)}
                      whileHover={isNext ? { y: -8, rotate: 3, scale: 1.04 } : undefined}
                      whileTap={isNext ? { scale: 0.9 } : undefined}
                    >
                      <span className="balloon-number" aria-hidden="true">{index + 1}</span>
                    </motion.button>
                  )}
                </AnimatePresence>
                {!hasPopped && <span className="balloon-string" aria-hidden="true" />}
              </div>
            );
          })}
        </div>

        {poppedCount === balloonWords.length && (
          <motion.p
            className="balloon-finale"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            You are so special! <span aria-hidden="true">🎂</span>
          </motion.p>
        )}

        {poppedCount === balloonWords.length && (
          <button
            className="replay-balloons-button"
            type="button"
            onClick={() => setPoppedCount(0)}
          >
            Pop them again
          </button>
        )}

        <button
          className="back-to-cake-button"
          type="button"
          onClick={() => navigate("/letter")}
        >
          Next Surprise 
        </button>
      </motion.div>
    </main>
  );
}

export default NextSurprisePage;