import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Textarea } from "@chakra-ui/react";
import axios from "axios";

const Home = ({ passUuid }) => {
  const [value, setValue] = useState("");

  const submitNote = (uuid) => {
    passUuid(uuid);
    // axios.get("http://localhost:5001").then((res) => console.log(res.data));
    axios
      .post(`http://localhost:5001/note/${uuid}`, {
        note: value,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <Textarea onChange={(e) => setValue(e.target.value)} value={value} />
      <Button onClick={() => submitNote(uuidv4())}>save</Button>
    </div>
  );
};

export default Home;
