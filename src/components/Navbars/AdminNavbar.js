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

// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import AdminNavbarLinks from "./AdminNavbarLinks";

export default function AdminNavbar(props) {
  const { variant, children, fixed, secondary, brandText, onOpen, ...rest } = props;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { colorMode } = useColorMode();
  
  // Here's the updated color modes for light/dark
  const bgDark = useColorModeValue(
    "linear-gradient(112.83deg, rgba(5, 5, 5, 0.82) 0%, rgba(15, 15, 15, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(5, 5, 5, 0.9) 0%, rgba(15, 15, 15, 0.9) 110.84%)"
  );
  const bgLight = useColorModeValue(
    "linear-gradient(112.83deg, rgba(240, 240, 240, 0.82) 0%, rgba(240, 240, 240, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(240, 240, 240, 0.9) 0%, rgba(240, 240, 240, 0.9) 110.84%)"
  );

  const borderLight = useColorModeValue(
    "1px solid rgba(200, 200, 200, 0.31)",
    "1px solid rgba(200, 200, 200, 0.31)"
  );
  const borderDark = useColorModeValue(
    "1px solid rgba(35, 35, 35, 0.31)",
    "1px solid rgba(35, 35, 35, 0.31)"
  );

  // Chakra color mode
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(10, 10, 10, 0.75) 0%, rgba(15, 15, 15, 0.75) 110.84%)",
    "linear-gradient(112.83deg, rgba(10, 10, 10, 0.75) 0%, rgba(15, 15, 15, 0.75) 110.84%)"
  );
  let navbarBorder = useColorModeValue(
    "1px solid rgba(55, 55, 55, 0.15)",
    "1px solid rgba(55, 55, 55, 0.15)"
  );
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.15)",
    "0px 7px 23px rgba(0, 0, 0, 0.15)"
  );
  let navbarFilter = useColorModeValue(
    "blur(15px)",
    "blur(15px)"
  );
  let navbarBackdrop = useColorModeValue(
    "blur(15px)",
    "blur(15px)"
  );

  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = "white";
  let navbarPosition = "absolute";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  if (props.secondary) {
    navbarBackdrop = "none";
    navbarPosition = "absolute";
    mainText = "white";
    secondaryMargin = "22px";
    paddingX = "30px";
  }
  if (props.fixed) {
    navbarPosition = "fixed";
    secondaryMargin = "0px";
  }
  if (scrolled === true) {
    navbarShadow = useColorModeValue(
      "0px 7px 23px rgba(0, 0, 0, 0.05)",
      "none"
    );
    navbarBg = useColorModeValue(
      "linear-gradient(112.83deg, rgba(30, 30, 30, 0.82) 0%, rgba(25, 25, 25, 0.8) 110.84%)",
      "linear-gradient(112.83deg, rgba(15, 15, 15, 0.95) 0%, rgba(10, 10, 10, 0.95) 110.84%)"
    );
    navbarBorder = useColorModeValue(
      "rgba(55, 55, 55, 0.3)",
      "rgba(55, 55, 55, 0.3)"
    );
    navbarFilter = useColorModeValue(
      "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))",
      "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
    );
  }
  if (props.secondary) {
    // paddingX = "30px";
  }

  return (
    <Flex
      position={fixed ? "fixed" : navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth={navbarBorder}
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={scrolled ? "12px" : "15px"}
      pb="8px"
      left={document.documentElement.dir === "rtl" ? "30px" : ""}
      right={document.documentElement.dir === "rtl" ? "" : "30px"}
      px={{
        sm: "15px",
        md: "10px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top="18px"
      w={{ sm: "calc(100% - 30px)", xl: "calc(100% - 75px)" }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Breadcrumb>
            <BreadcrumbItem color="#AAA" fontSize="sm" mb="5px">
              <BreadcrumbLink href="#" color="#AAA">
                Pages
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color="white" fontSize="sm">
              <BreadcrumbLink href="#" color="white">
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* Here the path is displayed */}
          <Link
            color="white"
            href="#"
            bg="transparent"
            borderColor="transparent"
            fontWeight="bold"
            fontSize="32px"
            _hover={{ color: "white" }}
            _active={{
              bg: "transparent",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
