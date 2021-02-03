import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

const Home = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const submitNote = (uuid) => {
    axios
      .post(`http://localhost:5001/note/${uuid}`, {
        note: value,
      })
      .then(() => router.push(`/${uuid}`));
  };

  return (
    <div>
      <Textarea onChange={(e) => setValue(e.target.value)} value={value} />
      <Button onClick={() => submitNote(uuidv4())}>save</Button>
    </div>
  );
};

export default Home;
