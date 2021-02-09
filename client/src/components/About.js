import { useRef } from "react";
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
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FiGithub, FiGlobe, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

const About = ({ onClose }) => {
  const finalRef = useRef();

  const iconStyles = {
    fontSize: "3xl",
    color: "#9F9F9F",
    mt: "12",
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
      <ModalContent bg="#1D1D1D" color="#FFFFFF" mx={[4, 4, 0, 0]}>
        <ModalHeader>Thank You</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="0">
          <Text>
            Thank you for checking out notesbin. You can find the source code on{" "}
            <Text as="b">
              <Link
                href="https://github.com/FlashBlaze/notesbin"
                isExternal
                d="inline-flex"
                alignItems="center">
                GitHub <ExternalLinkIcon mx="2px" aria-label="External link icon" />
              </Link>
            </Text>
            .
          </Text>
          <Text as="br" />
          <Text>
            If you have any suggestions, queries, or just want to chat, you can find me here:
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="space-evenly" pt="0">
          <Link href="https://flashblaze.xyz" isExternal>
            <Icon aria-label="Website icon button" as={FiGlobe} {...iconStyles} />
          </Link>
          <Link href="https://github.com/FlashBlaze" isExternal>
            <Icon aria-label="GitHub icon button" as={FiGithub} {...iconStyles} />
          </Link>
          <Link href="https://www.youtube.com/c/NeerajLagwankar/about" isExternal>
            <Icon aria-label="YouTube icon button" as={FiYoutube} {...iconStyles} />
          </Link>
          <Link href="https://instagram.com/neeraj_artx" isExternal>
            <Icon aria-label="Instagram icon button" as={FiInstagram} {...iconStyles} />
          </Link>
          <Link href="https://twitter.com/neeraj_artx" isExternal>
            <Icon aria-label="Twitter icon button" as={FiTwitter} {...iconStyles} />
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default About;
