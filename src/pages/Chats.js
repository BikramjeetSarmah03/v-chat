import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";

import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

const Chats = () => {
  const { user } = ChatState();
  const history = useHistory();
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    if (!user || user === null || user === undefined || user === {})
      history.push("/");
  }, [history]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chats;
