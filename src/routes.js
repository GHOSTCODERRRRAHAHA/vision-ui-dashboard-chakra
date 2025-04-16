/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import WebsiteLogin from "views/Auth/WebsiteLogin.js";
import AuthCallback from "views/Auth/AuthCallback.js";

// New pages for fact-checking application
import Scan from "views/Dashboard/Scan.js";
import Community from "views/Dashboard/Community.js";
import Leaderboard from "views/Dashboard/Leaderboard.js";
import History from "views/Dashboard/History.js";
import Settings from "views/Dashboard/Settings.js";

// Import modern icons
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
  ScanIcon,
  CommunityIcon,
  LeaderboardIcon,
  HistoryIcon,
  SettingsIcon
} from "components/Icons/ModernIcons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/scan",
    name: "Scan",
    rtlName: "فحص",
    icon: <ScanIcon color='inherit' />,
    component: Scan,
    layout: "/admin",
  },
  {
    path: "/community",
    name: "Community",
    rtlName: "مجتمع",
    icon: <CommunityIcon color='inherit' />,
    component: Community,
    layout: "/admin",
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    rtlName: "لوحة المتصدرين",
    icon: <LeaderboardIcon color='inherit' />,
    component: Leaderboard,
    layout: "/admin",
  },
  {
    path: "/history",
    name: "History",
    rtlName: "تاريخ",
    icon: <HistoryIcon color='inherit' />,
    component: History,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "إعدادات",
    icon: <SettingsIcon color='inherit' />,
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    rtlName: "تسجيل الدخول",
    icon: <DocumentIcon color='inherit' />,
    component: WebsiteLogin,
    layout: "/auth",
  },
  {
    path: "/callback",
    component: AuthCallback,
    layout: "/auth"
  },
];
export default dashRoutes;
