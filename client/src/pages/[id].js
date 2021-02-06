import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "redaxios";
import { Spinner, useToast } from "@chakra-ui/react";

import CONSTANTS from "../helpers/constants";
import Layout from "../components/Layout/index";
import SEO from "./seo";

const Post = () => {
  const [enteredNote, setEnteredNote] = useState("");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const id = router.query.id || window.location.pathname.split("/")[1];

    axios
      .get(`${CONSTANTS.NODE_URL}/${id}`)
      .then((res) => setEnteredNote(res.data.note))
      .catch(() => {
        toast({
          title: "An unexpected error occurred while fetching the note",
          status: "error",
          duration: 3500,
          isClosable: true,
        });
      });
  }, []);

  return (
    <Layout>
      <SEO slug="id" description="id" />
      <pre
        style={{
          color: "#FFFFFF",
          marginLeft: "2rem",
          overflowY: "auto",
          height: "100vh",
          paddingBottom: "100px",
        }}>
        {enteredNote.length === 0 ? <Spinner mt="2" /> : enteredNote}
      </pre>
    </Layout>
  );
};

export default Post;
