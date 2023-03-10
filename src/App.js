import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import { ChatState } from "./context/ChatProvider";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;

function App() {
  const { user } = ChatState();
  return user ? (
    <Route exact path="/chat" component={Chats} />
  ) : (
    <Route exact path="/" component={Home} />
  );
}

export default App;
