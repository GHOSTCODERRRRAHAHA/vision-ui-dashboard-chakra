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

import React from "react";
import { Flex } from "@chakra-ui/react";

export default function IconBox(props) {
  const { children, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"12px"}
      transition="all 0.3s ease"
      bgGradient="linear(to-br, rgba(49, 56, 96, 0.8), rgba(21, 25, 40, 0.8))"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
        bgGradient: "linear(to-br, rgba(61, 68, 110, 0.8), rgba(28, 31, 46, 0.8))"
      }}
      {...rest}>
      {children}
    </Flex>
  );
}
