import React from "react";
import {
  ServerIcon,
  ClipboardCheckIcon,
  CogIcon,
  TableIcon,
  InboxIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

function SideBar(...props) {
  const router = useRouter();

  // Check the active tab based on the current route
  const isActive = (path) => router.pathname === path;
  return (
    <div className="fixed inset-y-18 left-0 bg-white w-40">
      <ul className="flex flex-col text-lg h-full">
        <Link href={"/"}>
          <li
            className={
              isActive("/")
                ? "flex justify-center items-center flex-col py-7 border-l-4 border-purple-500 text-purple-500 font-bold"
                : "flex justify-center items-center flex-col py-7 text-gray-500"
            }
            style={{ cursor: "pointer" }}
          >
            <InboxIcon
              className={isActive("/") ? "w-7 h-7 text-purple-500" : "w-7 h-7"}
            />
            Project name
          </li>
        </Link>
        <Link href={"/backlog"}>
          <li
            className={
              isActive("/backlog")
                ? "flex justify-center items-center flex-col py-7 border-l-4 border-purple-500 text-purple-500 font-bold"
                : "flex justify-center items-center flex-col py-7 text-gray-500"
            }
            style={{ cursor: "pointer" }}
          >
            <ServerIcon
              className={
                isActive("/backlog") ? "w-7 h-7 text-purple-500" : "w-7 h-7"
              }
            />
            Backlog
          </li>
        </Link>
        <Link href={"/sprint"}>
          <li
            className={
              isActive("/sprint")
                ? "flex justify-center items-center flex-col py-7 border-l-4 border-purple-500 text-purple-500 font-bold"
                : "flex justify-center items-center flex-col py-7 text-gray-500"
            }
            style={{ cursor: "pointer" }}
          >
            <TableIcon
              className={
                isActive("/sprint") ? "w-7 h-7 text-purple-500" : "w-7 h-7"
              }
            />
            Active Sprint
          </li>
        </Link>
        <Link href={"/reports"}>
          <li
            className={
              isActive("/reports")
                ? "flex justify-center items-center flex-col py-7 border-l-4 border-purple-500 text-purple-500 font-bold"
                : "flex justify-center items-center flex-col py-7 text-gray-500"
            }
          >
            <PresentationChartLineIcon
              className={
                isActive("/reports") ? "w-7 h-7 text-purple-500" : "w-7 h-7"
              }
            />
            Reports
          </li>
        </Link>
        <Link href={"/issues"}>
          <li
            className={
              isActive("/issues")
                ? "flex justify-center items-center flex-col py-7 border-l-4 border-purple-500 text-purple-500 font-bold"
                : "flex justify-center items-center flex-col py-7 text-gray-500"
            }
          >
            <ClipboardCheckIcon
              className={
                isActive("/issues") ? "w-7 h-7 text-purple-500" : "w-7 h-7"
              }
            />
            Issues
          </li>
        </Link>
        <Link href={"/settings"}>
          <li
            className={
              isActive("/settings")
                ? "flex justify-center items-center flex-col py-7 border-l-4 border-purple-500 text-purple-500 font-bold"
                : "flex justify-center items-center flex-col py-7 text-gray-500"
            }
          >
            <CogIcon
              className={
                isActive("/settings") ? "w-7 h-7 text-purple-500" : "w-7 h-7"
              }
            />
            Settings
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;
