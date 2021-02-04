import { Box, Flex, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <Flex direction="column">
      <Box
        bg="#101010"
        w="100%"
        p={4}
        color="white"
        fontFamily="Monda"
        d="flex"
        alignItems="center">
        <HamburgerIcon cursor="pointer" fontSize="3xl" ml="4" />
        <Link href="/">
          <Text ml="8" cursor="pointer" fontSize="3xl" userSelect="none">
            notesbin
          </Text>
        </Link>
      </Box>
      <Flex>
        {/* <Box w="100px" height="calc(100vh - 77px)" bg="#101010" /> */}
        <Box w="100%">{children}</Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
