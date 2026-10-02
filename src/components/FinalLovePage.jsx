import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./FinalLovePage.css";

const loveLetters = Array.from("I LOVE U");

function FinalLovePage() {
  const navigate = useNavigate();

  return (
    <main className="final-love-page">
      <motion.div
        className="final-love-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.p
          className="final-love-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          One last thing, darling
        </motion.p>

        <h1 aria-label="I love you">
          {loveLetters.map((letter, index) => (
            <motion.span
              className="love-letter"
              key={`${letter}-${index}`}
              aria-hidden="true"
              initial={{ opacity: 0, y: 42, rotateX: -70 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.45 + index * 0.12, type: "spring", stiffness: 150, damping: 12 }}
            >
              {letter === " " ? "\u00a0" : letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="final-love-emojis"
          aria-label="Heart and kiss"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.35, type: "spring", stiffness: 180, damping: 10 }}
        >
          <span className="final-heart" aria-hidden="true">❤️</span>
          <span className="final-kiss" aria-hidden="true">😘</span>
        </motion.div>

        <motion.button
          className="replay-start-button"
          type="button"
          onClick={() => navigate("/")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Replay from the beginning
        </motion.button>
      </motion.div>
    </main>
  );
}

export default FinalLovePage;