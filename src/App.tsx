import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ChatRoom from "./pages/ChatRoom";
import Home from "./pages/Home";
import { UserDataProvider } from "./context/userContext";
import useMessages from "./hooks/useMessages";

function App() {
  const messagesState = useMessages();

  return (
    <UserDataProvider>
      <div className="bg-black w-screen h-screen">
        <Router>
          <Layout messagesState={messagesState}>
            <Routes>
              <Route index element={<Home />} />
              <Route
                path="chatroom"
                element={<ChatRoom messagesState={messagesState} />}
              />
              <Route
                path="*"
                element={<h1> Not the page you are looking for..</h1>}
              />
            </Routes>
          </Layout>
        </Router>
      </div>
    </UserDataProvider>
  );
}

export default App;
