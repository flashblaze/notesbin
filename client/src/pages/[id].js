import { useEffect, useState } from "react";
import axios from "redaxios";
import { CircularProgress } from "@chakra-ui/react";

import Layout from "../components/Layout/index";

const Post = () => {
  const [enteredNote, setEnteredNote] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001${window.location.pathname}`)
      .then((res) => setEnteredNote(res.data.note));
  }, []);

  return (
    <Layout>
      <pre
        style={{
          color: "#FFFFFF",
          marginLeft: "2rem",
          overflowY: "auto",
          height: "100vh",
          paddingBottom: "100px",
        }}>
        {enteredNote.length === 0 ? <CircularProgress /> : enteredNote}
      </pre>
    </Layout>
  );
};

export default Post;
