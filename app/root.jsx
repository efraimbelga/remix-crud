import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Navbar />
        <div className="container mt-5">
          <Outlet />
        </div>
        <div id="modal"></div>

        <Scripts />
      </body>
    </html>
  );
}
