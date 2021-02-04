import { Box, Icon, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { FiSave, FiLink, FiEdit } from "react-icons/fi";
import axios from "redaxios";
import { useRouter } from "next/router";
import { useNoteStore, useUuidStore } from "../store/index";

const Sidebar = () => {
  const router = useRouter();
  const { setUuid } = useUuidStore();
  const { note } = useNoteStore();
  const toast = useToast();

  const handleSave = () => {
    const uuid = uuidv4();
    if (window.location.pathname.split("/")[1].length === 0) {
      axios
        .post(`http://localhost:5001/note/${uuid}`, {
          note,
        })
        .then(() => {
          setUuid(uuid);
          router.push(`/${uuid}`);
        });
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
      />
      <Icon as={FiEdit} fontSize="3xl" mt="12" color="#9F9F9F" cursor="pointer" />
    </Box>
  );
};

export default Sidebar;
