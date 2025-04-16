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

// Chakra imports
import {
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import routes from "routes.js";

export default function AuthNavbar(props) {
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const { secondary, ...rest } = props;
  
  // Chakra color mode
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(42px)";
  let navbarPosition = "fixed";
  
  return (
    <Flex
      position={navbarPosition}
      top='16px'
      left='50%'
      transform='translate(-50%, 0px)'
      background="rgba(15, 20, 25, 0.6)"
      border='1px solid'
      borderColor="rgba(255, 255, 255, 0.1)"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius='20px'
      px='20px'
      py='16px'
      mx='auto'
      width='1044px'
      maxW='90%'
      alignItems='center'>
      <Flex w='100%' justifyContent={{ sm: "center", lg: "center" }}>
        <Box
          ms={{ base: "auto", lg: "0px" }}
          display={{ base: "flex", lg: "none" }}>
          <SidebarResponsive
            iconColor='white'
            logoText={""}
            secondary={props.secondary}
            routes={routes}
            {...rest}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
