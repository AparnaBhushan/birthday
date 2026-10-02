import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LetterPage.css";

const birthdayLetter = `Dear Avi,

Sbse phle toh Happy wala birthday! 🎉🥳

Ik ki tmko samne se wish krna chahiyea lkin ab kya kre aise circumstances ho gye h ki hmara milna bhi nhi ho paa rha h. Toh I thought ki tmko apne way se gift diya jae , I wish ki tmahra aane wala time bhot acha ho aur tmko jo chahiyea woh tmko mil jae. Waise toh tum ho lkin still phir bhu hum toh yhi chahege. Meko tmhare saath bhot acha lgta h hope ki tmko bhi aisa hei lgta hoga but jo bhi ho , tum ho toh bde pyaare se. Apne ap ko kisi ke liye badalna maat, bss end mei yhi kehna chahenge ki tum mere liye bhot special ho aur mp hmesha hei rhoge.

End mei again 'Happy wala birthday' 🎂🎁

From,
🐧
`;

function LetterPage() {
  const navigate = useNavigate();
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const isComplete = visibleCharacters >= birthdayLetter.length;

  useEffect(() => {
    const typingTimer = window.setInterval(() => {
      setVisibleCharacters((count) => {
        if (count >= birthdayLetter.length) {
          window.clearInterval(typingTimer);
          return count;
        }

        return count + 1;
      });
    }, 28);

    return () => window.clearInterval(typingTimer);
  }, []);

  return (
    <main className="letter-page">
      <motion.div
        className="letter-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="letter-eyebrow">A message just for you</p>
        <h1>A little birthday letter</h1>

        <article className="birthday-letter">
          <p className="typed-letter" aria-live="polite">
            {birthdayLetter.slice(0, visibleCharacters)}
            {!isComplete && <span className="typing-cursor" aria-hidden="true" />}
          </p>
        </article>

        {isComplete && (
          <motion.button
            className="letter-next-button"
            type="button"
            onClick={() => navigate("/final-love")}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Next page <span aria-hidden="true">→</span>
          </motion.button>
        )}
      </motion.div>
    </main>
  );
}

export default LetterPage;