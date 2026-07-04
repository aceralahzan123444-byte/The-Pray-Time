import { useState } from "react";
import React from "react";
import "../index.css";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../Context/DarkmodContext";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import HomeIcon from "@mui/icons-material/Home";
export default function SideMenu({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const { Darkmod } = useTheme();
  const toggleDrawer = (openState) => () => {
    setIsOpen(openState);
  };

  const menuItems = [
    { text: "القرآن الكريم", icon: <MenuBookIcon />, path: "/Quran" },
    { text: "الأذكار", icon: <AutoStoriesIcon />, path: "/Athkar" },
    { text: "المسبحة الإلكترونية", icon: <TouchAppIcon />, path: "/Tasbeeh" },
    { text: "الصفحة الرئيسية ", icon: <HomeIcon />, path: "/" },
  ];

  return (
    <>
      <IconButton
        className={className}
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer
        classes={{
          paper: Darkmod ? "dark-mod-sideMenu-paper" : "main-sideMenu-paper",
        }}
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        disableEnforceFocus
        disableAutoFocus
      >
        <div style={{ display: "flex", justifyContent: "end" }}>
          <CloseIcon
            className={Darkmod ? "dark-close-icon" : "main-close-icon"}
            onClick={toggleDrawer(false)}
          />
        </div>
        <List
          sx={{ width: { xs: "240px", sm: "350px", md: "400px" }, pt: 3 }}
          role="presentation"
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem key={index} disablePadding
              sx={{ marginBottom: '150px !important' }}>
                <ListItemButton
                  className="Icon-Button"
                  component={Link}
                  to={item.path}
                  onClick={() => {
                    console.log(`الانتقال إلى قسم: ${item.path}`);
                    setIsOpen(false);
                  }}
                >
                  <ListItemIcon
                    className={Darkmod ? "dark-menu-icon" : "main-menu-icon"}
                    sx={{ minWidth: 40 }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    className={Darkmod ? "dark-menu-text" : "main-menu-text"}
                    sx={{
                      textAlign: "right",
                      fontFamily: "Cairo",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
}
