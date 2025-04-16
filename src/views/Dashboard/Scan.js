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
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  HStack,
  Badge,
  Spinner,
  Progress,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from '@chakra-ui/react';

// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import IconBox from 'components/Icons/IconBox';

// Icons
import { SearchIcon, WarningTwoIcon, CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';
import { AiOutlineLink, AiOutlineFileText, AiOutlineUpload } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';

// Import API service
import api from 'services/api';

// Import ScanForm component
import ScanForm from 'components/Forms/ScanForm';

export default function Scan() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const textColor = useColorModeValue('gray.700', 'white');
  const toast = useToast();

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleScanSubmit = async (data) => {
    // Reset states
    setIsScanning(true);
    setScanResult(null);
    setError(null);
    
    try {
      let result;
      
      // Call the appropriate API endpoint based on the type of content
      switch (data.type) {
        case 'text':
          result = await api.factCheck.scanText(data.content);
          break;
        case 'link':
          result = await api.factCheck.scanLink(data.content);
          break;
        case 'upload':
          // Create FormData for file upload
          const formData = new FormData();
          formData.append('file', data.file);
          result = await api.factCheck.scanImage(formData);
          break;
        default:
          throw new Error('Unsupported scan type');
      }
      
      // Check if there was an API error
      if (result.status && result.status !== 200) {
        throw new Error(result.message || 'An error occurred while processing your request');
      }
      
      // Update the scan result
      setScanResult(result);
      
      // Show success toast
      toast({
        title: 'Scan Complete',
        description: `Analysis of your ${data.type} has been completed`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    } catch (err) {
      console.error('Scan error:', err);
      setError(err.message || 'An unexpected error occurred');
      
      // Show error toast
      toast({
        title: 'Scan Failed',
        description: err.message || 'An unexpected error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }} maxWidth="100%" width="100%">
      {/* Error Alert */}
      {error && (
        <Alert status="error" variant="solid" mb={6} borderRadius="md">
          <AlertIcon />
          <AlertTitle mr={2}>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton 
            position="absolute" 
            right="8px" 
            top="8px" 
            onClick={() => setError(null)} 
          />
        </Alert>
      )}
      
      <Card mb='24px' maxW={{ base: "100%", xl: "100%" }} mx="auto" w="100%">
        <CardHeader mb='12px'>
          <Flex direction='column'>
            <Text color={textColor} fontSize='lg' fontWeight='bold'>
              Fact Check Scanner
            </Text>
            <Text color='gray.400' fontSize='sm'>
              Verify claims, links, or documents
            </Text>
          </Flex>
        </CardHeader>
        <CardBody width="100%" p={{ base: 2, md: 6 }}>
          <ScanForm onSubmit={handleScanSubmit} isScanning={isScanning} />
        </CardBody>
      </Card>

      {isScanning && (
        <Card maxW={{ base: "100%", xl: "100%" }} mx="auto" w="100%" mb="24px">
          <CardBody>
            <Flex direction='column' align='center' justify='center' p={4}>
              <Text fontSize='lg' fontWeight='bold' mb={4}>
                Analyzing Content
              </Text>
              <Spinner size='xl' color='brand.500' thickness='4px' mb={4} />
              <Progress size='sm' colorScheme='brand' isIndeterminate w="100%" maxW="600px" />
              <Text fontSize='sm' color='gray.400' mt={4}>
                ClarityX is scanning sources and verifying information...
              </Text>
            </Flex>
          </CardBody>
        </Card>
      )}

      {scanResult && (
        <Card maxW={{ base: "100%", xl: "100%" }} mx="auto" w="100%">
          <CardHeader>
            <Text fontSize='lg' fontWeight='bold'>
              Verification Results
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction='column' align='center' justify='center' p={4}>
              <Box mb={4}>
                {scanResult.status === 'true' && (
                  <HStack>
                    <IconBox as='box' h='60px' w='60px' bg='green.400'>
                      <CheckCircleIcon h='30px' w='30px' color='white' />
                    </IconBox>
                    <Badge colorScheme='green' p={2} fontSize='md'>TRUE</Badge>
                  </HStack>
                )}
                {scanResult.status === 'false' && (
                  <HStack>
                    <IconBox as='box' h='60px' w='60px' bg='red.400'>
                      <WarningTwoIcon h='30px' w='30px' color='white' />
                    </IconBox>
                    <Badge colorScheme='red' p={2} fontSize='md'>FALSE</Badge>
                  </HStack>
                )}
                {scanResult.status === 'misleading' && (
                  <HStack>
                    <IconBox as='box' h='60px' w='60px' bg='yellow.400'>
                      <InfoIcon h='30px' w='30px' color='white' />
                    </IconBox>
                    <Badge colorScheme='yellow' p={2} fontSize='md'>MISLEADING</Badge>
                  </HStack>
                )}
              </Box>
              
              <Text fontSize='md' mt={2} mb={4} fontWeight='bold'>
                {scanResult.message}
              </Text>
              
              <Box mb={4} w="100%" maxW="600px" bg="whiteAlpha.100" p={4} borderRadius="md">
                <Text fontSize='sm' fontWeight='bold' mb={2}>
                  Confidence Score: {scanResult.confidence}%
                </Text>
                <Progress 
                  value={scanResult.confidence} 
                  colorScheme={scanResult.status === 'true' ? 'green' : scanResult.status === 'false' ? 'red' : 'yellow'} 
                  size='md' 
                  borderRadius="md"
                />
              </Box>
              
              <VStack align="start" w="100%" maxW="600px" spacing={2} mb={4}>
                <Text fontSize='sm' fontWeight='bold'>Sources:</Text>
                {scanResult.sources && scanResult.sources.map((source, index) => (
                  <HStack key={index} w="100%" bg="whiteAlpha.50" p={2} borderRadius="md">
                    <Icon as={InfoIcon} color='gray.400' />
                    <Text fontSize='sm'>{source.name}</Text>
                    <Spacer />
                    <Button 
                      size="xs" 
                      variant="ghost" 
                      colorScheme="brand"
                      onClick={() => window.open(source.url, '_blank')}
                      isDisabled={!source.url || source.url === '#'}
                    >
                      View
                    </Button>
                  </HStack>
                ))}
              </VStack>
              
              <HStack spacing={4} mt={2}>
                <Button 
                  colorScheme='brand'
                  onClick={() => {
                    toast({
                      title: 'Coming Soon',
                      description: 'Detailed analysis will be available in a future update',
                      status: 'info',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  View Detailed Analysis
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: 'Saved to History',
                      description: 'This fact-check has been saved to your history',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  Add to History
                </Button>
              </HStack>
            </Flex>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
} 