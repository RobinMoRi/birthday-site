import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PackingListPage from "./pages/PackingListPage";
import SchedulePage from "./pages/SchedulePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CustomAppBar from "./components/CustomAppBar";
import { BackgroundImageProvider } from "./context/BackgroundImageProvider";
import moment from "moment-timezone";
import "./main.css";
import "moment/dist/locale/sv";

const packRevealDate = moment.tz("2024-02-14 15:00", "Europe/Stockholm");
const scheduleRevealDate = moment.tz("2024-02-16 22:00", "Europe/Stockholm");
const finalRevealDate = moment.tz("2024-02-16 15:00", "Europe/Stockholm");

declare module "@mui/material/styles" {
  interface Theme {
    overrides?: Object;
  }
  interface ThemeOptions {
    overrides?: Object;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App revealTime={finalRevealDate} />,
  },
  {
    path: "/dagens-ledtråd",
    element: <App revealTime={finalRevealDate} />,
  },
  {
    path: "/packlista",
    element: (
      <PackingListPage
        revealTime={packRevealDate}
        show={packRevealDate.isBefore(moment())}
      />
    ),
  },
  {
    path: "/aktiviteter",
    element: (
      <SchedulePage
        revealTime={scheduleRevealDate}
        show={scheduleRevealDate.isBefore(moment())}
      />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BackgroundImageProvider>
        <CustomAppBar />
        <RouterProvider router={router} />
      </BackgroundImageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
