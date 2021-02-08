import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "redaxios";
import { Spinner, useToast } from "@chakra-ui/react";

import { useNoteStore } from "../store/index";
import CONSTANTS from "../helpers/constants";
import Layout from "../components/Layout/index";
import SEO from "./seo";

const Post = () => {
  const { note, setNote } = useNoteStore();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const id = router.query.id || window.location.pathname.split("/")[1];
    axios
      .get(`${CONSTANTS.NODE_URL}/${id}`)
      .then((res) => {
        setNote(res.data.note);
      })
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
          margin: "8px 0rem 0rem 1rem",
          overflowY: "auto",
          height: "calc(100vh - 77px - 1rem)",
          paddingBottom: "10px",
        }}>
        {note.length === 0 ? <Spinner mt="2" /> : note}
      </pre>
    </Layout>
  );
};

export default Post;
