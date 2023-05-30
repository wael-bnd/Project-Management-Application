import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Head from "next/head";

function Layout({ children, pageTitle }) {
  return (
    <div className="min-w-full min-h-screen   overflow-hidden bg-blue-100">
      <TopBar />
      <SideBar />
      <main className="pl-40 ">
        <Head>
          <title>{pageTitle}</title>
        </Head>
        {children}
      </main>
    </div>
  );
}

export default Layout;
