import { SidebarProvider } from "../contexts/SidebarContext";
import "./style.css";

function MyApp({ Component, pageProps }) {
  return (
    <SidebarProvider>
      <Component {...pageProps} />;
    </SidebarProvider>
  );
}

export default MyApp;
