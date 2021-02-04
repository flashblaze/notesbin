import { Box, Icon, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { FiSave, FiLink, FiEdit } from "react-icons/fi";
import axios from "redaxios";
import { useRouter } from "next/router";
import { useNoteStore, useUuidStore } from "../store/index";

const Sidebar = () => {
  const router = useRouter();
  const { setUuid } = useUuidStore();
  const { note, setNote, setIsEditing } = useNoteStore();
  const toast = useToast();

  const checkHash = () => {
    return router.pathname.split("/")[1].length === 0;
  };

  const handleSave = () => {
    const uuid = uuidv4();
    if (note.trim().length === 0) {
      toast({
        title: "Please enter a note",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } else {
      if (checkHash) {
        axios
          .post(`http://localhost:5001/note/${uuid}`, {
            note,
          })
          .then(() => {
            setUuid(uuid);
            router.push(`/${uuid}`);
          });
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast({
          title: "Note link copied",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Error while copying note link",
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      });
  };

  const handleEditNote = () => {
    setIsEditing(true);
    setNote(note);
    router.push("/");
  };

  return (
    <Box
      w="100px"
      height="calc(100vh - 77px)"
      bg="#101010"
      d="flex"
      alignItems="center"
      flexDir="column">
      <Icon
        as={FiSave}
        fontSize="3xl"
        mt="2"
        color="#9F9F9F"
        onClick={() => handleSave()}
        cursor="pointer"
      />
      <Icon
        as={FiLink}
        fontSize="3xl"
        mt="12"
        color="#9F9F9F"
        cursor="pointer"
        onClick={handleCopyLink}
        disabled={checkHash()}
        _disabled={{ opacity: 0.5 }}
      />
      <Icon
        as={FiEdit}
        fontSize="3xl"
        mt="12"
        color="#9F9F9F"
        cursor="pointer"
        onClick={handleEditNote}
        disabled={checkHash()}
        _disabled={{ opacity: 0.5 }}
      />
    </Box>
  );
};

export default Sidebar;
