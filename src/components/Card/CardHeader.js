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

import { Box, useStyleConfig } from "@chakra-ui/react";
function CardHeader(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardHeader", { variant });
  return (
    <Box __css={{
      ...styles,
      display: "flex",
      flexDirection: "column",
      p: { base: "20px", md: "24px" },
      pt: { base: "18px", md: "22px" },
      pb: { base: "16px", md: "18px" },
      mb: "10px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      "& h1, & h2, & h3, & h4, & h5, & h6": {
        fontSize: { base: "1.25rem", md: "1.5rem" },
        lineHeight: "1.2",
        fontWeight: "600",
        color: "white",
        letterSpacing: "0.5px",
        marginBottom: "4px"
      },
      "& p": {
        color: "rgba(255, 255, 255, 0.75)",
        fontSize: "0.875rem",
        marginBottom: "0"
      }
    }} {...rest}>
      {children}
    </Box>
  );
}

export default CardHeader;
