import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  useToast,
  VStack,
  Icon,
  Text
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "utils/auth";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { ClarityXLogo } from "components/Icons/ModernIcons";

function WebsiteLogin() {
  const history = useHistory();
  const toast = useToast();
  const { signInWithGoogleAuth, user, isLoading } = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);
  
  const titleColor = "white";

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      history.push("/admin/profile");
    }
  }, [user, history]);

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoginLoading(true);
    try {
      const { error } = await signInWithGoogleAuth();
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message || "Failed to sign in with Google",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      // No success toast needed as the page will redirect
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Google sign-in error:", error);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
      minHeight="100vh"
      align="center"
      justify="center"
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage="url('/bg-signin.png')"
        bgSize="cover"
      />
      
      <Heading color="white" fontSize="4xl" mb={10} textAlign="center">
        ClarityX
      </Heading>
      
      <Card
        w="360px"
        background="transparent"
        borderRadius="15px"
        p="30px"
        mx={{ base: "10px" }}
        bg="linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        border="1px solid rgba(255, 255, 255, 0.1)"
      >
        <CardBody>
          <VStack spacing={5} align="stretch">
            <Heading color={titleColor} fontSize="24px" mb="10px" textAlign="center">
              Login
            </Heading>

            <Button
              variant="outline"
              leftIcon={<Icon as={FaGoogle} />}
              fontSize="md"
              fontWeight="bold"
              h="50px"
              onClick={handleGoogleSignIn}
              _hover={{ bg: "whiteAlpha.100" }}
              color="white"
              isLoading={loginLoading}
              loadingText="Signing In"
              borderColor="rgba(255, 255, 255, 0.2)"
              borderWidth="1px"
            >
              SIGN IN WITH GOOGLE
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default WebsiteLogin; 