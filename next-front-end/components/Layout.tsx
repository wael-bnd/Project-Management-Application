import React from "react";
import TopBar from "./TopBar";
import TopBaar from "./TopBaar";
import SideBar from "./SideBar";
import SideBaar from "./SideBaar";
import Head from "next/head";

function Layout({ children, pageTitle, privateRoyte }) {
  const [collapsed, setSidebarCollapsed] = React.useState(false);
  return (
    <div className="min-w-full min-h-screen    bg-blue-100">
      <TopBaar />
      {privateRoyte && (
        <SideBaar
          collapsed={collapsed}
          setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
        />
      )}

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
