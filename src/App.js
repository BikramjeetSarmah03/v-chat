import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Chats from "./pages/Chats";

function App() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/chat" component={Chats} />
    </>
  );
}

export default App;
