import { Space } from "antd";
import React from "react";
import { navigationOption } from "../lib/constants";
import { NavLink } from "react-router-dom";
import styles from "./styles/navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <Space size="large">
      <img src="/logo.png" alt="logo" className={styles.logo} />
      {navigationOption.map((option) => (
        <NavLink
          to={option.path}
          key={option.path}
          className={styles.link}
          activeClassName={styles.activeLink}
          exact
        >
          {option.title}
        </NavLink>
      ))}
    </Space>
  );
};

export default Navbar;
