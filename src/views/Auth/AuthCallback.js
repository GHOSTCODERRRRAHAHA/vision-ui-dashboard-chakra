import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Flex,
  Spinner,
  Text,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import { authService } from 'utils/auth';

function AuthCallback() {
  const history = useHistory();
  const location = useLocation();
  const toast = useToast();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from the URL
        const params = new URLSearchParams(location.hash || location.search);
        const code = params.get('code');
        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error) {
          console.error('Auth callback error:', error, errorDescription);
          setError(errorDescription || error);
          toast({
            title: 'Authentication Error',
            description: errorDescription || 'Failed to sign in. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => history.push('/auth/website-login'), 3000);
          return;
        }

        if (!code) {
          console.error('No code found in callback URL');
          setError('Invalid callback URL');
          toast({
            title: 'Authentication Error',
            description: 'No authentication code found. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => history.push('/auth/website-login'), 3000);
          return;
        }

        // Exchange the code for a session
        const { error: exchangeError } = await authService.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error('Failed to exchange code for session:', exchangeError);
          setError(exchangeError.message || 'Failed to complete authentication');
          toast({
            title: 'Authentication Error',
            description: exchangeError.message || 'Failed to complete sign in. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => history.push('/auth/website-login'), 3000);
          return;
        }

        // Auth state listener in AuthContext will handle session update
        // Redirect to profile page
        toast({
          title: 'Sign In Successful',
          description: 'Welcome to ClarityX!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // Redirect to profile after short delay to allow state to update
        setTimeout(() => history.push('/admin/profile'), 1000);
      } catch (err) {
        console.error('Error in auth callback:', err);
        setError(err.message || 'An unexpected error occurred');
        toast({
          title: 'Authentication Error',
          description: err.message || 'An unexpected error occurred',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => history.push('/auth/website-login'), 3000);
      }
    };

    handleCallback();
  }, [history, location, toast]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)"
    >
      <VStack spacing={8}>
        <Heading color="white">Completing Sign In</Heading>
        {error ? (
          <Text color="red.300" fontSize="lg">{error}</Text>
        ) : (
          <>
            <Spinner size="xl" color="teal.300" thickness="4px" />
            <Text color="white" fontSize="lg">
              Please wait while we verify your credentials...
            </Text>
          </>
        )}
      </VStack>
    </Flex>
  );
}

export default AuthCallback; 