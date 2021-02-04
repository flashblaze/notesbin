import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Textarea } from "@chakra-ui/react";
import axios from "redaxios";
import { useRouter } from "next/router";

import styles from "./index.module.css";

const Home = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const textArea = useRef();

  useEffect(() => {
    // console.debug(textArea);
    textArea.current.focus();
  }, []);

  const submitNote = (uuid) => {
    axios
      .post(`http://localhost:5001/note/${uuid}`, {
        note: value,
      })
      .then(() => router.push(`/${uuid}`));
  };

  return (
    <>
      <Textarea
        onChange={(e) => setValue(e.target.value)}
        className={styles.textArea}
        value={value}
        ref={textArea}
        spellCheck={false}
        placeholder="Start typing..."
      />
      <Button onClick={() => submitNote(uuidv4())}>save</Button>
    </>
  );
};

export default Home;
