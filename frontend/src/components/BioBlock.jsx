import { useState, useEffect } from 'react';

export default function BioBlock({ children }) {
  const [typedHeading, setTypedHeading] = useState("");
  const [typedParagraph, setTypedParagraph] = useState("");
  const [isParagraphTyping, setIsParagraphTyping] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    const headingText = "A bit about me";
    let headingIndex = 0;
    const headingInterval = setInterval(() => {
      setTypedHeading(headingText.slice(0, headingIndex + 1));
      headingIndex++;
      if (headingIndex >= headingText.length) {
        clearInterval(headingInterval);
        setIsParagraphTyping(true);
      }
    }, 75);

    return () => clearInterval(headingInterval);
  }, []);

  useEffect(() => {
    if (!isParagraphTyping) return;

    const paragraphText = "Welcome to my digital workspace. I am a Full-Stack Developer who loves turning complex problems into intuitive web solutions. My expertise lies in the MERN Stack and Python, but my true passion is building applications that actively engage users and leverage data. Whether I am architecting a student social networking platform like Vartalaap, designing RESTful APIs, or experimenting with RAG pipelines and Machine Learning, I am always focused on writing clean code and building scalable products.";

    let paragraphIndex = 0;
    const paragraphInterval = setInterval(() => {
      setTypedParagraph(paragraphText.slice(0, paragraphIndex + 1));
      paragraphIndex++;
      if (paragraphIndex >= paragraphText.length) {
        clearInterval(paragraphInterval);
        setIsAnimationFinished(true);
      }
    }, 25);

    return () => clearInterval(paragraphInterval);
  }, [isParagraphTyping]);

  return (
    <div className="intro-block">
      <div className="intro-content">
        <h1 className="intro-heading">
          {typedHeading}
          {!isParagraphTyping && <span className="typing-cursor">|</span>}
        </h1>
        {isParagraphTyping && (
          <p className="intro-paragraph">
            "{typedParagraph}"
            {typedParagraph.length < 522 && <span className="typing-cursor">|</span>}
          </p>
        )}
        {isAnimationFinished && children}
      </div>
    </div>
  );
}
