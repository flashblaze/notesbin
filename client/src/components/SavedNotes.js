import { useEffect, useState, useRef } from "react";
import {
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";

import { useNoteStore } from "../store/index";

const SavedNotes = ({ onClose }) => {
  const [savedNotes, setSavedNotes] = useState([]);
  const { setDoesSavedNoteExists } = useNoteStore();
  const finalRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const notes = localStorage.getItem("notesbin_notes");
      setSavedNotes(JSON.parse(notes));
    }
  }, []);

  const deleteNote = (id) => {
    let savedNotesCopy = savedNotes.filter((savedNote) => savedNote.id !== id);
    setSavedNotes(savedNotesCopy);
    if (savedNotesCopy.length === 0) {
      localStorage.removeItem("notesbin_notes");
      setDoesSavedNoteExists(false);
      onClose();
    } else {
      localStorage.setItem("notesbin_notes", JSON.stringify(savedNotesCopy));
      setDoesSavedNoteExists(true);
    }
  };

  const iconStyles = {
    fontSize: "2xl",
    color: "#9F9F9F",
    cursor: "pointer",
    _hover: { color: "#F1F1F1" },
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={true}
      motionPreset="slideInBottom"
      finalFocusRef={finalRef}>
      <ModalOverlay />
      <ModalContent
        bg="#1D1D1D"
        color="#FFFFFF"
        mx={[4, 4, 0, 0]}
        maxHeight="700px"
        overflowY="auto">
        <ModalHeader>Recently Saved Notes</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="0">
          <Table variant="simple">
            <TableCaption color="#7D8FAE" textAlign="inherit">
              Saved notes are stored in <Text as="code">localStorage</Text> and can be accessed
              here. You can delete individual notes by clicking on the delete icon.
            </TableCaption>
            <Thead>
              <Tr>
                <Th color="#7D8FAE">Note Link</Th>
                <Th color="#7D8FAE">Date Saved</Th>
                <Th color="#7D8FAE">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {savedNotes.map((savedNote) => (
                <Tr key={savedNote.id}>
                  <Td>
                    <Link href={savedNote.note_url} isExternal d="inline-flex" alignItems="center">
                      Link <ExternalLinkIcon mx="2px" aria-label="External link icon" />
                    </Link>
                  </Td>
                  <Td>{dayjs(savedNote.date_created).format("MMMM D, YYYY h:mm A")}</Td>
                  <Td>
                    <Icon
                      aria-label="Delete icon"
                      as={FiTrash}
                      {...iconStyles}
                      onClick={() => deleteNote(savedNote.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter justifyContent="space-evenly" pt="0"></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SavedNotes;
