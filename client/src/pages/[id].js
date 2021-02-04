import { useEffect, useState } from "react";
import axios from "redaxios";
import { CircularProgress } from "@chakra-ui/react";

import Layout from "../components/Layout";

const Post = () => {
  const [enteredNote, setEnteredNote] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001${window.location.pathname}`)
      .then((res) => setEnteredNote(res.data.note));
  }, []);

  return (
    <Layout>
      <pre>{enteredNote.length === 0 ? <CircularProgress /> : enteredNote}</pre>
    </Layout>
  );
};

export default Post;
