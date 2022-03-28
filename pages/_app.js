import Header from "../components/Header/Header";
import ContextProvider, { UserContext } from "../lib/context";
import "../styles/globals.css";
import { useUserData } from "../lib/hooks";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <ContextProvider>
      <UserContext.Provider value={userData}>
        <Header>
          <Component {...pageProps} />
        </Header>
        <Toaster />
      </UserContext.Provider>
    </ContextProvider>
  );
}

export default MyApp;
