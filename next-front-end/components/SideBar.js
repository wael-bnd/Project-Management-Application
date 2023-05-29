import React from "react";
import {
  UserGroupIcon,
  ServerIcon,
  ClipboardCheckIcon,
  ChartSquareBarIcon,
  CogIcon,
  TableIcon,
  InboxIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/outline";

function SideBar(props) {
  return (
    <div className="fixed inset-y-0 left-0 bg-white w-40">
      <h1
        className="flex items-center justify-center text-2xl
            h-16 bg-purple-600 text-white font-bold"
      >
        Agile
      </h1>

      <ul className="flex flex-col text-lg h-full">
        <li
          className="flex justify-center items-center flex-col
                py-7 text-gray-500"
        >
          <InboxIcon className="w-7 h-7" />
          WeLoveSport
        </li>
        <li
          className="flex justify-center items-center flex-col
                py-7 text-gray-500"
        >
          <ServerIcon className="w-7 h-7" />
          Backlog
        </li>
        <li
          className="flex justify-center items-center flex-col
                py-7 border-l-4 border-purple-500 text-purple-500
                font-bold"
        >
          <TableIcon className="w-7 h-7 text-purple-500" />
          Active Sprint
        </li>
        <li
          className="flex justify-center items-center flex-col
                py-7 text-gray-500"
        >
          <PresentationChartLineIcon className="w-7 h-7" />
          Reports
        </li>
        <li
          className="flex justify-center items-center flex-col
                py-7 text-gray-500"
        >
          <ClipboardCheckIcon className="w-7 h-7" />
          Issues
        </li>

        <li
          className="flex justify-center items-center flex-col
                py-7 text-gray-500 mt-auto mb-16"
        >
          <CogIcon className="w-7 h-7" />
          Settings
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
