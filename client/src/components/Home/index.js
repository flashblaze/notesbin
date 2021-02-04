import { useState, useEffect, useRef } from "react";
import { Textarea } from "@chakra-ui/react";

import { useUuidStore, useNoteStore } from "../../store/index";
import styles from "./index.module.css";

const Home = () => {
  const [value, setValue] = useState("");
  const textArea = useRef();
  const { setNote } = useNoteStore();
  const { setUuid } = useUuidStore();

  useEffect(() => {
    setNote("");
    setUuid("");
    textArea.current.focus();
  }, []);

  const handleNoteChange = (note) => {
    setValue(note);
    setNote(note);
  };

  return (
    <>
      <Textarea
        onChange={(e) => handleNoteChange(e.target.value)}
        className={styles.textArea}
        value={value}
        ref={textArea}
        spellCheck={false}
        placeholder="Start typing..."
      />
    </>
  );
};

export default Home;
