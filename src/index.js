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

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ChakraProvider, Spinner, Flex, Text, Box } from "@chakra-ui/react";
import theme from "theme/themeAdmin.js";
import { AuthProvider } from './utils/auth';

// Lazy load layouts
const AuthLayout = React.lazy(() => import("layouts/Auth.js"));
const AdminLayout = React.lazy(() => import("layouts/Admin.js"));
const RTLLayout = React.lazy(() => import("layouts/RTL.js"));

// Loading component for suspense fallback
const Loading = () => (
  <Flex 
    height="100vh" 
    width="100vw" 
    justifyContent="center" 
    alignItems="center" 
    flexDirection="column"
    bg="#0f1535"
  >
    <Spinner 
      size="xl" 
      thickness="4px"
      color="brand.500"
      speed="0.65s"
      mb={4}
    />
    <Text color="white" fontSize="xl">Loading ClarityX...</Text>
    <Box pt={8} maxW="400px" textAlign="center">
      <Text color="gray.400" fontSize="sm">
        Fighting misinformation with clarity and precision
      </Text>
    </Box>
  </Flex>
);

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ChakraProvider theme={theme} resetCss={false} position="relative">
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/admin`} component={AdminLayout} />
              <Route path={`/rtl`} component={RTLLayout} />
              <Redirect from={`/`} to='/admin/scan' />
            </Switch>
          </Suspense>
        </ChakraProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
