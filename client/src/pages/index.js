import { Center } from "@chakra-ui/react";

import Home from "../components/Home";

const Index = () => {
  const passUuid = (uuid) => {
    console.log(uuid);
    // fetch("http://localhost:5001")
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
  };

  return (
    <Center>
      <Home passUuid={passUuid} />
    </Center>
  );
};

export default Index;
