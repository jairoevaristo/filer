import { Navigate, createBrowserRouter } from "react-router-dom";

import { Auth } from "@/pages/auth"
import { Files } from "@/pages/files";
import { Shares } from "@/pages/shares";
import { ViewFile } from "@/pages/view-file";
import { SharesWithMe } from "@/pages/share-with-me";
import { PrivateRouter } from "@/components/private-router";

import { ROUTES } from "../constants/routes"

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.home} replace />,
  },
    {
      path: ROUTES.login,
      element: <Auth />,
    },
    {
      path: ROUTES.home,
      element: (
        <PrivateRouter>
          <Files />
        </PrivateRouter>
      ),
    },
    {
      path: ROUTES.myShares,
      element: (
        <PrivateRouter>
          <Shares />
        </PrivateRouter>
      ),
    },
    {
      path: ROUTES.sharedWithMe,
      element: (
        <PrivateRouter>
          <SharesWithMe />
        </PrivateRouter>
      ),
    },
    {
      path: ROUTES.shareViewFile,
      element: (
        <ViewFile />
      ),
    }
  ]);