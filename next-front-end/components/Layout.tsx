import React from "react";
import TopBar from "./TopBar";
import TopBaar from "./TopBaar";
import SideBar from "./SideBar";
import SideBaar from "./SideBaar";
import Head from "next/head";
import { useSidebarContext } from "../contexts/SidebarContext";

function Layout({ children, pageTitle, privateRoute }) {
  const { collapsed } = useSidebarContext();
  return (
    <div className=" min-h-screen bg-cover bg-my_bg_image">
      <TopBaar />
      {privateRoute && <SideBaar />}

      <main className={collapsed ? "pl-20" : "pl-40"}>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        {children}
      </main>
    </div>
  );
}

export default Layout;
