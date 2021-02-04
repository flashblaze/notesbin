import { Box, Icon } from "@chakra-ui/react";
import { FiSave, FiLink, FiEdit } from "react-icons/fi";

const Sidebar = () => {
  return (
    <Box
      w="100px"
      height="calc(100vh - 77px)"
      bg="#101010"
      d="flex"
      alignItems="center"
      flexDir="column">
      <Icon as={FiSave} fontSize="3xl" mt="2" color="#9F9F9F" />
      <Icon as={FiLink} fontSize="3xl" mt="12" color="#9F9F9F" />
      <Icon as={FiEdit} fontSize="3xl" mt="12" color="#9F9F9F" />
    </Box>
  );
};

export default Sidebar;
