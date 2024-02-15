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
import "./main.css";
import "moment/dist/locale/sv";
import { dates } from "./dates";
import { TimeProvider } from "./context/TimeProvider";

const { packRevealDate, scheduleRevealDate, finalRevealDate } =
  dates.milestones;

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
    element: <PackingListPage revealTime={packRevealDate} />,
  },
  {
    path: "/aktiviteter",
    element: <SchedulePage revealTime={scheduleRevealDate} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <TimeProvider>
        <CssBaseline />
        <BackgroundImageProvider>
          <CustomAppBar />
          <RouterProvider router={router} />
        </BackgroundImageProvider>
      </TimeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
