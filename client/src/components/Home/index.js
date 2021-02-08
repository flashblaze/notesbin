import { useEffect, useRef } from "react";
import { Textarea } from "@chakra-ui/react";

import { useUuidStore, useNoteStore } from "../../store/index";
import styles from "./index.module.css";

const Home = () => {
  const textArea = useRef();
  const { setNote, note } = useNoteStore();
  const { setUuid } = useUuidStore();

  useEffect(() => {
    setUuid("");
    textArea.current.focus();
  }, []);

  return (
    <Textarea
      onChange={(e) => setNote(e.target.value)}
      className={styles.textArea}
      value={note}
      ref={textArea}
      spellCheck={false}
      placeholder="Start typing..."
    />
  );
};

export default Home;
