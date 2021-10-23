import { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { FiCopy, FiEdit, FiInfo, FiLink, FiSave, FiBookmark } from "react-icons/fi";
import axios from "redaxios";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import About from "./About";
import SavedNotes from "./SavedNotes";
import CONSTANTS from "../helpers/constants";
import { useNoteStore, useUuidStore } from "../store/index";

const Sidebar = () => {
  const router = useRouter();
  const { setUuid } = useUuidStore();
  const { note, setNote, doesSavedNoteExists, setIsEditing, setIsSaving, setDoesSavedNoteExists } =
    useNoteStore();
  const toast = useToast();
  const [showAbout, setShowAbout] = useState(false);
  const [showSavedNotes, setShowSavedNotes] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const notes = localStorage.getItem("notesbin_notes");
      if (notes) {
        setDoesSavedNoteExists(true);
      } else {
        setDoesSavedNoteExists(false);
      }
    }
  }, [doesSavedNoteExists]);

  const noteExists = () => {
    // if path exists, then that means a note has been created
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
        setIsSaving(true);
        axios
          .post(`${CONSTANTS.NODE_URL}/note/${uuid}`, {
            note,
          })
          .then(() => {
            const notes = localStorage.getItem("notesbin_notes");
            if (!notes) {
              localStorage.setItem(
                "notesbin_notes",
                JSON.stringify([
                  { id: 1, note_url: window.location + uuid, date_created: dayjs().format() },
                ])
              );
            } else {
              let newNotes = JSON.parse(notes);
              newNotes.push({
                id: newNotes[newNotes.length - 1].id + 1,
                note_url: window.location + uuid,
                date_created: dayjs().format(),
              });
              localStorage.setItem("notesbin_notes", JSON.stringify(newNotes));
            }
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
    variant: "",
    isActive: false,
    cursor: !noteExists() ? "" : "pointer",
    isDisabled: !noteExists(),
  };

  return (
    <Box
      p={4}
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
          p={0}
          variant=""
          color="#9F9F9F"
          isDisabled={noteExists()}
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
      <Tooltip label="Saved notes" aria-label="Save icon button">
        <IconButton
          aria-label="Saved note"
          icon={<FiBookmark />}
          onClick={() => setShowSavedNotes(true)}
          fontSize="3xl"
          mt="12"
          color="#9F9F9F"
          variant=""
          isDisabled={!doesSavedNoteExists}
          cursor="pointer"
        />
      </Tooltip>
      <Tooltip label="About" aria-label="About icon button">
        <IconButton
          aria-label="About icon button"
          icon={<FiInfo />}
          fontSize="3xl"
          mt="12"
          color="#9F9F9F"
          variant=""
          isActive={false}
          cursor="pointer"
          onClick={() => setShowAbout(true)}
        />
      </Tooltip>
      {showAbout && <About onClose={() => setShowAbout(false)} />}
      {showSavedNotes && <SavedNotes onClose={() => setShowSavedNotes(false)} />}
    </Box>
  );
};

export default Sidebar;
