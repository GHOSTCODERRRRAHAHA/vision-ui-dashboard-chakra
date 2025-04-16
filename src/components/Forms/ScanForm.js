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
import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  InputGroup,
  InputLeftElement,
  Spinner,
  Image,
  HStack,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';

// Icons
import { AiOutlineLink, AiOutlineFileText, AiOutlineUpload, AiOutlineClose } from 'react-icons/ai';
import { SearchIcon } from '@chakra-ui/icons';

const ScanForm = ({ onSubmit, isScanning }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [fileData, setFileData] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  
  const fileInputRef = useRef(null);
  const textColor = useColorModeValue('gray.700', 'white');
  const toast = useToast();

  const handleTabsChange = (index) => {
    // Clear previous data when switching tabs
    setTabIndex(index);
    setInputValue('');
    setFileData(null);
    setFilePreview(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // Clear error when user types
    if (errors.input) {
      setErrors({...errors, input: null});
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      setErrors({
        ...errors,
        file: 'Invalid file type. Please upload an image (JPG, PNG, GIF) or PDF.'
      });
      return;
    }
    
    if (file.size > maxSize) {
      setErrors({
        ...errors,
        file: 'File is too large. Maximum size is 5MB.'
      });
      return;
    }
    
    // Store file data
    setFileData(file);
    
    // Create preview for image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs, just show the file name
      setFilePreview(null);
    }
    
    // Clear error
    if (errors.file) {
      setErrors({...errors, file: null});
    }
  };

  const clearFile = () => {
    setFileData(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    switch (tabIndex) {
      case 0: // Text tab
        if (!inputValue.trim() || inputValue.length < 10) {
          newErrors.input = 'Please enter a claim with at least 10 characters';
        }
        break;
      case 1: // Link tab
        try {
          // Basic URL validation
          new URL(inputValue);
        } catch (e) {
          newErrors.input = 'Please enter a valid URL';
        }
        break;
      case 2: // Upload tab
        if (!fileData) {
          newErrors.file = 'Please select a file to upload';
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    // Prepare data based on the active tab
    const data = {
      type: tabIndex === 0 ? 'text' : tabIndex === 1 ? 'link' : 'upload',
      content: inputValue,
      file: fileData
    };
    
    // Submit the form data
    onSubmit(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%" maxW="1200px" mx="auto">
      <Tabs variant="soft-rounded" colorScheme="brand" onChange={handleTabsChange} index={tabIndex} width="100%">
        <TabList mb="20px" justifyContent="center">
          <Tab borderRadius="15px" mr="5px" isDisabled={isScanning}>
            <Icon as={AiOutlineFileText} mr="5px" />
            Text
          </Tab>
          <Tab borderRadius="15px" mx="5px" isDisabled={isScanning}>
            <Icon as={AiOutlineLink} mr="5px" />
            Link
          </Tab>
          <Tab borderRadius="15px" ml="5px" isDisabled={isScanning}>
            <Icon as={AiOutlineUpload} mr="5px" />
            Upload
          </Tab>
        </TabList>

        <TabPanels width="100%">
          <TabPanel width="100%" px={0}>
            <VStack spacing={4} align="stretch" width="100%">
              <FormControl width="100%" isInvalid={errors.input}>
                <FormLabel color={textColor}>Paste a claim to verify</FormLabel>
                <Textarea 
                  placeholder="Enter the claim or statement you want to fact-check"
                  value={inputValue}
                  onChange={handleInputChange}
                  size="lg"
                  rows={12}
                  resize="vertical"
                  borderRadius="15px"
                  borderColor={errors.input ? "red.500" : "gray.600"}
                  _focus={{ borderColor: errors.input ? "red.500" : "brand.400" }}
                  w="100%"
                  minH="300px"
                  h="300px"
                  fontSize="md"
                  p={4}
                  isDisabled={isScanning}
                />
                {errors.input && (
                  <FormErrorMessage>{errors.input}</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
          </TabPanel>

          <TabPanel width="100%" px={0}>
            <VStack spacing={4} align="stretch" width="100%">
              <FormControl width="100%" isInvalid={errors.input}>
                <FormLabel color={textColor}>Enter a URL</FormLabel>
                <InputGroup size="lg" width="100%">
                  <InputLeftElement pointerEvents="none" h="100%">
                    <Icon as={AiOutlineLink} color="gray.400" />
                  </InputLeftElement>
                  <Input 
                    placeholder="https://example.com/article"
                    value={inputValue}
                    onChange={handleInputChange}
                    type="url"
                    borderRadius="15px"
                    borderColor={errors.input ? "red.500" : "gray.600"}
                    _focus={{ borderColor: errors.input ? "red.500" : "brand.400" }}
                    size="lg"
                    h="60px"
                    fontSize="md"
                    pl="45px"
                    width="100%"
                    isDisabled={isScanning}
                  />
                </InputGroup>
                {errors.input && (
                  <FormErrorMessage>{errors.input}</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
          </TabPanel>

          <TabPanel width="100%" px={0}>
            <VStack spacing={4} align="stretch" width="100%">
              <FormControl width="100%" isInvalid={errors.file}>
                <FormLabel color={textColor}>Upload a document or image</FormLabel>
                {fileData ? (
                  <Box 
                    border="2px solid" 
                    borderColor="gray.600" 
                    borderRadius="15px" 
                    p={6} 
                    textAlign="center"
                    minH="300px"
                    h="300px"
                    width="100%"
                    position="relative"
                  >
                    <Button 
                      position="absolute" 
                      top="10px" 
                      right="10px" 
                      size="sm" 
                      colorScheme="red"
                      borderRadius="full"
                      onClick={clearFile}
                      isDisabled={isScanning}
                    >
                      <Icon as={AiOutlineClose} />
                    </Button>
                    
                    {filePreview ? (
                      <Image 
                        src={filePreview} 
                        alt="File preview" 
                        maxH="250px" 
                        mx="auto"
                        objectFit="contain"
                        borderRadius="md"
                      />
                    ) : (
                      <VStack spacing={2} justify="center" h="100%">
                        <Icon as={AiOutlineFileText} w={14} h={14} color="gray.400" />
                        <Text fontSize="md" fontWeight="bold">{fileData.name}</Text>
                        <Text fontSize="sm" color="gray.400">
                          {(fileData.size / 1024 / 1024).toFixed(2)} MB - {fileData.type}
                        </Text>
                      </VStack>
                    )}
                  </Box>
                ) : (
                  <Box 
                    border="2px dashed" 
                    borderColor={errors.file ? "red.500" : "gray.600"}
                    borderRadius="15px" 
                    p={10} 
                    textAlign="center"
                    _hover={{ borderColor: errors.file ? "red.500" : "brand.400", cursor: 'pointer' }}
                    onClick={() => !isScanning && fileInputRef.current.click()}
                    minH="300px"
                    h="300px"
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon as={AiOutlineUpload} w={14} h={14} color="gray.400" mb={3} />
                    <Text fontSize="lg">Click or drag to upload a file</Text>
                    <Text fontSize="sm" color="gray.400" mt={2}>
                      Supported formats: PDF, JPG, PNG, GIF (Max 5MB)
                    </Text>
                    <Input 
                      ref={fileInputRef}
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png,.gif"
                      display="none"
                      onChange={handleFileChange}
                      isDisabled={isScanning}
                    />
                  </Box>
                )}
                {errors.file && (
                  <FormErrorMessage>{errors.file}</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex justify="center" mt={6}>
        <Button 
          type="submit"
          colorScheme="brand"
          size="lg"
          leftIcon={isScanning ? null : <SearchIcon />}
          isLoading={isScanning}
          loadingText="Verifying..."
          isDisabled={
            isScanning || 
            (tabIndex === 0 && !inputValue.trim()) ||
            (tabIndex === 1 && !inputValue.trim()) ||
            (tabIndex === 2 && !fileData)
          }
          px={10}
        >
          Verify
        </Button>
      </Flex>
    </Box>
  );
};

export default ScanForm; 