import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import { ChatState } from "./context/ChatProvider";

function App() {
  const { user } = ChatState();
  return (
    <>
      {!user ? (
        <Route exact path="/" component={Home} />
      ) : (
        <Route exact path="/chat" component={Chats} />
      )}
    </>
  );
}

export default App;
