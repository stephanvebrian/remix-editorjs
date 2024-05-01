import { cssBundleHref } from "@remix-run/css-bundle";
import { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ThemeProvider } from "next-themes";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

import { cn } from "./lib/utils";
import stylesheet from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const Footer = () => {
  return (
    <footer className="w-full mx-auto mt-16 mb-8">
      {/* <hr className="mb-3 border-t-2 border-gray-200" /> */}
      <div className="flex justify-center mt-8 mb-5 space-x-6">
        <Link
          // target="_blank"
          to="https://www.linkedin.com/in/stephanvebrian/"
          className="text-gray-400 transition-all delay-75 hover:text-white hover:scale-110"
        >
          <span className="sr-only">Linkedin</span>
          <BsLinkedin size="24" />
        </Link>
        <Link
          // target="_blank"
          to="https://www.instagram.com/stephanvebrian/"
          className="text-gray-400 transition-all delay-75 hover:text-white hover:scale-110"
        >
          <span className="sr-only">Instagram</span>
          <FaInstagram size="24" />
        </Link>
        <Link
          // target="_blank"
          to="https://twitter.com/greatestephan"
          className="text-gray-400 transition-all delay-75 hover:text-white hover:scale-110"
        >
          <span className="sr-only">Twitter</span>
          <FaTwitter size="24" />
        </Link>
      </div>
      <p className="text-center dark:text-white">©{new Date().getFullYear()}</p>
    </footer>
  );
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className={cn(
          "bg-[#FFFEFC] text-slate-800 dark:bg-[#1F2028]"
          // 'scroll-smooth',
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" themes={["dark"]}>
          <div className="mx-auto">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
