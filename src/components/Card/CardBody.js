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
function CardBody(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardBody", { variant });
  return (
    <Box __css={{
      ...styles,
      p: { base: "20px", md: "24px" },
      lineHeight: "1.5",
      "& p": { 
        marginBottom: "16px",
        fontSize: "1rem",
        lineHeight: "1.6",
        color: "rgba(255, 255, 255, 0.9)"
      },
      "& h1, & h2, & h3, & h4, & h5, & h6": {
        marginTop: "20px",
        marginBottom: "16px",
        fontWeight: "600",
        letterSpacing: "0.5px",
        color: "white"
      },
      "& img": {
        borderRadius: "16px",
        boxShadow: "0 10px 30px 0 rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        _hover: {
          transform: "scale(1.02)",
        }
      },
      "& a:not(.chakra-button)": {
        color: "#AAAAAA",
        textDecoration: "none",
        transition: "all 0.2s ease",
        _hover: {
          color: "#DDDDDD",
          textDecoration: "underline",
        }
      },
      "& table": {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0",
        "& thead tr": {
          borderBottom: "1px solid rgba(100, 100, 100, 0.3)"
        },
        "& th": {
          textAlign: "left",
          padding: "12px 16px",
          fontWeight: "600",
          color: "white",
          whiteSpace: "nowrap"
        },
        "& td": {
          padding: "12px 16px",
          color: "rgba(255, 255, 255, 0.8)",
          borderTop: "1px solid rgba(50, 50, 50, 0.2)"
        },
        "& tr:hover td": {
          backgroundColor: "rgba(50, 50, 50, 0.1)"
        }
      },
      "& > *:first-of-type": {
        marginTop: "0"
      },
      "& > *:last-child": {
        marginBottom: "0"
      }
    }} {...rest}>
      {children}
    </Box>
  );
}

export default CardBody;
