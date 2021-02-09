import { useEffect, useRef } from "react";
import { Textarea } from "@chakra-ui/react";

import { useUuidStore, useNoteStore } from "../store/index";

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
      color="#FFFFFF"
      h="calc(100vh-77px)"
      resize="none"
      border="none"
      _focus={{ border: "none", boxShadow: "none" }}
      onChange={(e) => setNote(e.target.value)}
      value={note}
      ref={textArea}
      spellCheck={false}
      placeholder="Start typing..."
    />
  );
};

export default Home;
