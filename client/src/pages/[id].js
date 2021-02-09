import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "redaxios";
import { SkeletonText, useToast } from "@chakra-ui/react";

import { useNoteStore } from "../store/index";
import CONSTANTS from "../helpers/constants";
import Layout from "../components/Layout";
import SEO from "./seo";

const Post = () => {
  const { note, setNote } = useNoteStore();
  const [error, setError] = useState(false);
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
        setError(true);
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
        {note.length !== 0 ? (
          note
        ) : error ? (
          <span />
        ) : (
          <SkeletonText
            mt="4"
            noOfLines={4}
            spacing="4"
            color="#FFFFFF"
            width={[200, 200, 500, 500]}
          />
        )}
      </pre>
    </Layout>
  );
};

export default Post;
