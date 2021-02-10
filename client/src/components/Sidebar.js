import { useState } from "react";
import { Box, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { FiCopy, FiEdit, FiInfo, FiLink, FiSave } from "react-icons/fi";
import axios from "redaxios";
import { useRouter } from "next/router";

import About from "./About";
import CONSTANTS from "../helpers/constants";
import { useNoteStore, useUuidStore } from "../store/index";

const Sidebar = () => {
  const router = useRouter();
  const { setUuid } = useUuidStore();
  const { note, setNote, setIsEditing } = useNoteStore();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);

  const noteExists = () => {
    // if path exists, then that means a note created
    return router.pathname.split("/")[1].length !== 0;
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
      if (!noteExists()) {
        axios
          .post(`${CONSTANTS.NODE_URL}/note/${uuid}`, {
            note,
          })
          .then(() => {
            setUuid(uuid);
            router.push(`/${uuid}`);
          })
          .catch(() =>
            toast({
              title: "An unexpected error occurred while adding the note",
              status: "error",
              duration: 3500,
              isClosable: true,
            })
          );
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

  const handleCopyNote = () => {
    navigator.clipboard
      .writeText(note)
      .then(() => {
        toast({
          title: "Note copied",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Error while copying note",
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

  const iconSettings = {
    fontSize: "3xl",
    mt: "12",
    color: "#9F9F9F",
    variant: "unstyled",
    isActive: false,
    cursor: !noteExists() ? "" : "pointer",
    isDisabled: !noteExists(),
  };

  return (
    <Box
      w="100%"
      maxW="80px"
      height="calc(100vh - 77px)"
      bg="#101010"
      d="flex"
      alignItems="center"
      flexDir="column">
      <Tooltip label="Save" aria-label="Save Button">
        <IconButton
          aria-label="Save Button"
          icon={<FiSave />}
          fontSize="3xl"
          mt="2"
          color="#9F9F9F"
          isDisabled={noteExists()}
          variant="unstyled"
          isActive={false}
          onClick={() => {
            if (!noteExists()) {
              handleSave();
            }
          }}
          cursor={!noteExists() ? "pointer" : ""}
        />
      </Tooltip>
      <Tooltip label="Copy Link" aria-label="Copy Link icon button">
        <IconButton
          aria-label="Copy Link icon button"
          icon={<FiLink />}
          onClick={handleCopyLink}
          {...iconSettings}
        />
      </Tooltip>
      <Tooltip label="Copy Note" aria-label="Copy Note icon button">
        <IconButton
          aria-label="Copy Note icon button"
          icon={<FiCopy />}
          onClick={handleCopyNote}
          {...iconSettings}
        />
      </Tooltip>

      <Tooltip label="Duplicate & Edit" aria-label="Duplicate & Edit icon button">
        <IconButton
          aria-label="Duplicate & Edit icon button"
          icon={<FiEdit />}
          onClick={handleEditNote}
          {...iconSettings}
        />
      </Tooltip>
      <Tooltip label="About" aria-label="About icon button">
        <IconButton
          aria-label="About icon button"
          icon={<FiInfo />}
          fontSize="3xl"
          mt="12"
          color="#9F9F9F"
          variant="unstyled"
          isActive={false}
          cursor="pointer"
          onClick={() => setShowModal(true)}
        />
      </Tooltip>
      {showModal && <About onClose={() => setShowModal(false)} />}
    </Box>
  );
};

export default Sidebar;
