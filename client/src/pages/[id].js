import Highlight from "react-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect } from "react";
import axios from "redaxios";
import { SkeletonText, useToast } from "@chakra-ui/react";

import { useNoteStore } from "../store/index";
import CONSTANTS from "../helpers/constants";
import Layout from "../components/Layout";
import SEO from "./seo";

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await axios.get(`${CONSTANTS.NODE_URL}/${query.id}`);
    return {
      props: {
        note: res.data.note,
      },
    };
  } catch (err) {
    return {
      props: {
        err: true,
      },
    };
  }
};

const Post = ({ note, err }) => {
  const { setNote } = useNoteStore();
  const toast = useToast();

  useEffect(() => {
    if (note) {
      setNote(note);
    } else if (err) {
      toast({
        title: "An unexpected error occurred while fetching the note",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }
  }, []);

  return (
    <Layout>
      <SEO slug="id" description="id" />
      <div
        style={{
          color: "#FFFFFF",
          marginLeft: "0.5rem",
          overflowY: "auto",
          height: "calc(100vh - 77px - 1rem)",
          paddingBottom: "10px",
          width: "100%",
        }}>
        {!err && note && note.length !== 0 ? (
          <Highlight className="autodetect">{note}</Highlight>
        ) : err ? (
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
      </div>
    </Layout>
  );
};

export default Post;
