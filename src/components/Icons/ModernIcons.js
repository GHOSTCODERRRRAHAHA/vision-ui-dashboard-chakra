// Modern icon implementation using react-icons
import React from "react";
import { 
  FaHome, 
  FaUser, 
  FaRocket, 
  FaRegFileAlt, 
  FaCreditCard, 
  FaChartLine,
  FaQuestionCircle, 
  FaSearch, 
  FaGlobe, 
  FaComments, 
  FaTrophy, 
  FaHistory, 
  FaCog
} from "react-icons/fa";
import { 
  BiScan, 
  BiMessageSquareDetail, 
  BiTrendingUp, 
  BiMapAlt
} from "react-icons/bi";
import { 
  HiOutlineDocumentReport, 
  HiOutlineGlobe, 
  HiOutlineChatAlt2, 
  HiOutlineCog
} from "react-icons/hi";
import { 
  IoMdSettings, 
  IoMdPodium, 
  IoMdCalendar, 
  IoMdTime 
} from "react-icons/io";
import { createIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";

// Modern Icon Components with standard sizing and coloring
export const HomeIcon = (props) => (
  <Icon as={FaHome} w="20px" h="20px" {...props} />
);

export const PersonIcon = (props) => (
  <Icon as={FaUser} w="20px" h="20px" {...props} />
);

export const RocketIcon = (props) => (
  <Icon as={FaRocket} w="20px" h="20px" {...props} />
);

export const DocumentIcon = (props) => (
  <Icon as={FaRegFileAlt} w="20px" h="20px" {...props} />
);

export const CreditIcon = (props) => (
  <Icon as={FaCreditCard} w="20px" h="20px" {...props} />
);

export const StatsIcon = (props) => (
  <Icon as={FaChartLine} w="20px" h="20px" {...props} />
);

export const SupportIcon = (props) => (
  <Icon as={FaQuestionCircle} w="20px" h="20px" {...props} />
);

// New icons for the routes
export const ScanIcon = (props) => (
  <Icon as={BiScan} w="20px" h="20px" {...props} />
);

export const CommunityIcon = (props) => (
  <Icon as={HiOutlineChatAlt2} w="20px" h="20px" {...props} />
);

export const LeaderboardIcon = (props) => (
  <Icon as={IoMdPodium} w="20px" h="20px" {...props} />
);

export const HistoryIcon = (props) => (
  <Icon as={IoMdTime} w="20px" h="20px" {...props} />
);

export const SettingsIcon = (props) => (
  <Icon as={HiOutlineCog} w="20px" h="20px" {...props} />
);

// ClarityX Logo
export const ClarityXLogo = createIcon({
  displayName: "ClarityXLogo",
  viewBox: "0 0 200 50",
  path: (
    <g fill="white">
      <path d="M20 16H25C26.8 16 28 17.2 28 19V19C28 20.8 26.8 22 25 22H20V16ZM20 24H25C28.3 24 31 21.8 31 19V19C31 16.2 28.3 14 25 14H17V33H20V24Z" />
      <path d="M33 33H36V26.5L38.5 24L43.5 33H47L40.5 21.5L46.5 14H43L36 22.5V14H33V33Z" />
      <path d="M58 33L64 14H61L56.5 29L52 14H49L54.8 33H58Z" />
      <path d="M65 33H68V14H65V33Z" />
      <path d="M74 33H77V22.5L85 33H88V14H85V24.5L77 14H74V33Z" />
      <path d="M91 33H94V26H96L101 33H105L99 25C101.2 24.2 103 22.3 103 19.5C103 16.5 100.5 14 97.5 14H91V33ZM94 24V16H97.5C99.4 16 100 17.3 100 19.5C100 21.7 99.4 23 97.5 23H94V24Z" />
      <path d="M106.5 24L110 27.5L113.5 24L110 20.5L106.5 24ZM116 14H113L110 17L107 14H104L108.5 18.5L104 23L107 26L110 23L113 26L116 23L111.5 18.5L116 14Z" />
      <path d="M150 13L10 20C10 20 10 37 20 42C30 47 40 39 50 20L150 13Z" fill="#0A84FF" fillOpacity="0.3" />
    </g>
  ),
}); 