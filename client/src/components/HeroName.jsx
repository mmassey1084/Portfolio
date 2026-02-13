import { useEffect, useState } from "react";

export default function HeroText() {
  const nameText = "Michael Massey";
  const subText = "Software Engineer";
  const typingSpeed = 100;
  const restartDelay = 20000;

  const [nameDisplay, setNameDisplay] = useState("");
  const [subDisplay, setSubDisplay] = useState("");
  const [phase, setPhase] = useState("name"); 
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const currentText = phase === "name" ? nameText : subText;

    if (index < currentText.length) {
      const timeOut = setTimeout(() => {
        if (phase === "name") {
          setNameDisplay((phrase) => phrase + currentText[index]);
        } else {
          setSubDisplay((phrase) => phrase + currentText[index]);
        }
        setIndex((i) => i + 1);
      }, typingSpeed);

      return () => clearTimeout(timeOut);
    } else if (phase === "name") {
      setPhase("sub");
      setIndex(0);
    }
  }, [index, phase]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNameDisplay("");
      setSubDisplay("");
      setPhase("name");
      setIndex(0);
    }, restartDelay);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>{nameDisplay}</h1>
      <p>{subDisplay}</p>
    </>
  );
}
