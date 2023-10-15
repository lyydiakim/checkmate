"use client";

import Image from "next/image";
import logo from "@/public/images/logo2.png";

import React from "react";
import { motion, useScroll } from "framer-motion";

//change this to add brackets if you want to change the # of links
const linkList = [{}];

const navStyles = {
  display: "flex",
  position: "fixed",
  alignItems: "center",
  justifyContent: "space-between",
  height: "6rem",
  padding: "0 2rem",
  width: "100vw",
  left: "0",
};

const navLinksWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space between",
  width: "50%",
};

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);

  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }

  React.useEffect(() => {
    const unsubscribe = scrollY.onChange(() => update());

    return () => {
      unsubscribe();
    };
  }, []);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 },
  };

  return (
    <motion.nav
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      style={navStyles}
    >
      <a
        title="checkmates-logo"
        className="opacity-90  hover:opacity-100 transition"
        href=""
      >
        <Image className="w-[13rem]" src={logo} alt="logo" />
      </a>
      <div>
        {linkList.map((item, i) => (
          <a
            key={i}
            className="hover:text-white text-gray-300 text-2xl"
            href=""
          >
            About Us
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
