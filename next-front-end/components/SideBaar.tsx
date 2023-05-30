import Link from "next/link";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ServerIcon,
  ClipboardCheckIcon,
  CogIcon,
  TableIcon,
  InboxIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};

export default function SideBaar({ collapsed, setCollapsed }: Props) {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  const router = useRouter();
  const navigation = [
    {
      name: "Backlog",
      href: "/backlog",
      current: router.pathname === "/backlog",
      icon: ServerIcon,
    },
    {
      name: "Active Sprint",
      href: "/sprint",
      current: router.pathname === "/sprint",
      icon: TableIcon,
    },
    {
      name: "Reports",
      href: "/reports",
      current: router.pathname === "/reports",
      icon: PresentationChartLineIcon,
    },
    {
      name: "Issues",
      href: "/issues",
      current: router.pathname === "/issues",
      icon: ClipboardCheckIcon,
    },
    {
      name: "Settings",
      href: "/settings",
      current: router.pathname === "/settings",
      icon: CogIcon,
    },
  ];
  return (
    <>
      {collapsed ? (
        <>
          <div className="fixed flex flex-col items-center w-16 h-full overflow-hidden text-gray-700 bg-gradient-to-b from-purple-200 to-blue-500 ">
            <Link className="flex items-center justify-center mt-3" href="#">
              <svg
                className="w-8 h-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
            </Link>
            <div className="flex flex-col items-center mt-3 border-t border-gray-300">
              {navigation.map((item) => (
                <Link
                  className={
                    item.current
                      ? "flex items-center justify-center w-12 h-12 mt-2 bg-blue-500 text-white rounded"
                      : "flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-blue-500 hover:text-white"
                  }
                  href={item.href}
                >
                  <item.icon
                    className="w-6 h-6 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  />
                </Link>
              ))}
            </div>

            <button
              className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-blue-500"
              // 👇 set the collapsed state on click
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon
                className="w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="fixed flex flex-col items-center w-40 h-full overflow-hidden text-gray-700 bg-gradient-to-b from-purple-200 to-blue-500 ">
            <Link className="flex items-center w-full px-3 mt-3" href="#">
              <svg
                className="w-8 h-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              <span className="ml-2 text-sm font-bold">WeLoveSport</span>
            </Link>
            <div className="w-full px-2">
              <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
                {navigation.map((item) => (
                  <Link
                    className={
                      item.current
                        ? "flex items-center w-full h-12 px-3 mt-2 bg-blue-500 text-white rounded"
                        : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-blue-500 hover:text-white"
                    }
                    href={item.href}
                  >
                    <item.icon
                      className="w-6 h-6 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    />
                    <span className="ml-2 text-sm font-medium">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <button
              className="flex items-center justify-center ml-28 w-12 h-12 mt-2 rounded hover:bg-blue-500"
              // 👇 set the collapsed state on click
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon
                className="w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              />
            </button>
          </div>
        </>
      )}
    </>
  );
}
