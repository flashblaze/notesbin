import { useEffect, useState } from "react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { CircularProgress } from "@chakra-ui/react";
const Post = () => {
  const [enteredNote, setEnteredNote] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001${window.location.pathname}`)
      .then((res) => setEnteredNote(res.data.note));
  }, []);

  return (
    <Center>
      <span>{enteredNote.length === 0 ? <CircularProgress /> : enteredNote}</span>
    </Center>
  );
};

export default Post;
