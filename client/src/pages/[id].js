import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Center>
      <span>{id}</span>
    </Center>
  );
};

export default Post;
