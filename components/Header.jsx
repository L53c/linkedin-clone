import { useEffect, useState } from "react";
import Image from "next/image";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import HeaderLink from "../components/HeaderLink";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  
  return (
    <header className={`sticky top-0 z-40 ${resolvedTheme === 'dark' ? "bg-[#1D2226]" : "bg-white"} flex items-center justify-around py-1.5 px-3 mb-5 focus-whithin:shadow-lg`}>
      {/* Left */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {mounted && (
          <Image
            src={`https://rb.gy/${resolvedTheme === 'dark' ? "bizvqj" : "dpmd9s"}`}
            width={45}
            height={45}
            alt=""
          />
        )}
        <div className={`flex items-center space-x-1 ${resolvedTheme === 'dark' ? "md:bg-gray-700" : "md:bg-gray-300 text-gray-500"} py-2.5 px-4 rounded w-full`}>
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className={`hidden md:inline-flex bg-transparent text-sm focus:outline-none ${resolvedTheme === 'dark' ? "placeholder-white/75" : "placeholder-black/70"} flex-grow`}
          />
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

        {/* Dark mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              resolvedTheme === "dark" ? "justify-end" : "justify-start"
            }`}
            onClick={()=> setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            <span className="absolute left-0">🌜</span>
            <motion.div
              className="w-5 h-5 bg-white rounded-full z-40"
              layout
              transition={spring}
            />
            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
