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
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react';

// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import IconBox from 'components/Icons/IconBox';

// Icons
import { 
  CheckIcon, 
  DeleteIcon,
  InfoIcon, 
  SearchIcon, 
  TimeIcon, 
  WarningIcon, 
  WarningTwoIcon, 
  ExternalLinkIcon,
  RepeatIcon,
  ChevronDownIcon
} from '@chakra-ui/icons';
import { 
  FaCalendarAlt, 
  FaFilter, 
  FaLink, 
  FaRegSave, 
  FaRegEdit, 
  FaShareAlt, 
  FaRegTrashAlt 
} from 'react-icons/fa';
import React, { useState, useRef } from 'react';

export default function History() {
  const [filter, setFilter] = useState('all');
  const [selectedScan, setSelectedScan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);
  const textColor = useColorModeValue('gray.700', 'white');
  const cancelRef = useRef();
  
  const { 
    isOpen: isModalOpen, 
    onOpen: onModalOpen, 
    onClose: onModalClose 
  } = useDisclosure();
  
  const { 
    isOpen: isAlertOpen, 
    onOpen: onAlertOpen, 
    onClose: onAlertClose 
  } = useDisclosure();

  // Sample scan history data
  const scanHistory = [
    {
      id: 1,
      date: '2023-10-15',
      time: '14:32',
      claim: 'Renewable energy now costs less than fossil fuels in most countries.',
      url: 'https://example.com/article/renewable-energy',
      result: 'true',
      category: 'Environment',
      accuracy: 96,
      shared: true
    },
    {
      id: 2,
      date: '2023-10-14',
      time: '09:17',
      claim: 'New study shows vitamin D supplements prevent COVID-19 infection.',
      url: 'https://example.com/article/vitamin-d-covid',
      result: 'false',
      category: 'Health',
      accuracy: 98,
      shared: false
    },
    {
      id: 3,
      date: '2023-10-12',
      time: '16:45',
      claim: 'Government planning to ban all gas vehicles by 2025.',
      url: 'https://example.com/article/gas-vehicles-ban',
      result: 'misleading',
      category: 'Politics',
      accuracy: 92,
      shared: false
    },
    {
      id: 4,
      date: '2023-10-10',
      time: '11:23',
      claim: 'Major technology company secretly collecting user biometric data.',
      url: 'https://example.com/article/tech-privacy-concerns',
      result: 'true',
      category: 'Technology',
      accuracy: 94,
      shared: true
    },
    {
      id: 5,
      date: '2023-10-08',
      time: '08:05',
      claim: '5G networks cause health problems according to new research.',
      url: 'https://example.com/article/5g-health-research',
      result: 'false',
      category: 'Health',
      accuracy: 97,
      shared: true
    },
    {
      id: 6,
      date: '2023-10-05',
      time: '15:57',
      claim: 'Antarctica ice sheet growing despite global warming claims.',
      url: 'https://example.com/article/antarctica-ice-sheet',
      result: 'misleading',
      category: 'Environment',
      accuracy: 95,
      shared: false
    }
  ];

  // Filter and search logic
  const filteredScans = scanHistory.filter(scan => {
    const matchesFilter = filter === 'all' || scan.result === filter;
    const matchesSearch = scan.claim.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        scan.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // View scan details
  const handleViewScan = (scan) => {
    setSelectedScan(scan);
    onModalOpen();
  };

  // Delete scan confirmation
  const handleDeleteClick = (scan) => {
    setItemToDelete(scan);
    onAlertOpen();
  };

  // Delete scan action
  const handleDeleteConfirm = () => {
    console.log('Deleting scan:', itemToDelete);
    // In a real app, you would call an API to delete the item
    onAlertClose();
  };

  return (
    <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
      <Card mb='24px'>
        <CardHeader p='12px 5px' mb='12px'>
          <Flex justify='space-between' align='center' w='100%'>
            <Text fontSize='lg' fontWeight='bold'>
              Your Fact-Check History
            </Text>
            <HStack spacing={2}>
              <InputGroup size='sm' width='200px'>
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon color='gray.400' />
                </InputLeftElement>
                <Input 
                  placeholder='Search scans...' 
                  borderRadius='15px'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Menu>
                <MenuButton 
                  as={Button} 
                  variant='outline' 
                  size='sm' 
                  leftIcon={<Icon as={FaFilter} />}
                  rightIcon={<ChevronDownIcon />}
                >
                  {filter === 'all' ? 'All Results' : 
                   filter === 'true' ? 'True' : 
                   filter === 'false' ? 'False' : 'Misleading'}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setFilter('all')}>All Results</MenuItem>
                  <MenuItem onClick={() => setFilter('true')}>True</MenuItem>
                  <MenuItem onClick={() => setFilter('false')}>False</MenuItem>
                  <MenuItem onClick={() => setFilter('misleading')}>Misleading</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </CardHeader>
        <CardBody px={2}>
          <VStack spacing={3} align='stretch'>
            {filteredScans.length > 0 ? (
              filteredScans.map((scan) => (
                <Card key={scan.id} bg='navy.800' boxShadow='md'>
                  <CardBody p={4}>
                    <Flex direction={{ base: 'column', md: 'row' }} justify='space-between'>
                      <HStack spacing={4} mb={{ base: 3, md: 0 }}>
                        <IconBox 
                          bg={scan.result === 'true' ? 'green.400' : 
                              scan.result === 'false' ? 'red.400' : 'yellow.400'} 
                          icon={scan.result === 'true' ? <CheckIcon color='white' /> : 
                                scan.result === 'false' ? <WarningTwoIcon color='white' /> : 
                                <InfoIcon color='white' />} 
                          h='45px' 
                          w='45px'
                        />
                        <VStack align='start' spacing={1}>
                          <Text fontWeight='bold' noOfLines={2}>
                            {scan.claim}
                          </Text>
                          <HStack>
                            <Tag size='sm' variant='subtle' colorScheme={
                              scan.category === 'Health' ? 'red' : 
                              scan.category === 'Politics' ? 'blue' : 
                              scan.category === 'Environment' ? 'green' : 
                              'purple'
                            }>
                              {scan.category}
                            </Tag>
                            <HStack spacing={1} color='gray.400'>
                              <TimeIcon boxSize={3} />
                              <Text fontSize='xs'>{scan.date} at {scan.time}</Text>
                            </HStack>
                            {scan.shared && (
                              <Badge colorScheme='blue' variant='outline'>Shared</Badge>
                            )}
                          </HStack>
                        </VStack>
                      </HStack>
                      
                      <HStack spacing={2} mt={{ base: 2, md: 0 }}>
                        <Popover placement='top' trigger='hover'>
                          <PopoverTrigger>
                            <IconButton
                              aria-label='Scan accuracy'
                              icon={<Icon as={FaRegSave} />}
                              size='sm'
                              variant='ghost'
                              colorScheme='brand'
                            />
                          </PopoverTrigger>
                          <PopoverContent bg='navy.700' borderColor='gray.600' w='200px'>
                            <PopoverArrow bg='navy.700' />
                            <PopoverBody>
                              <Text fontWeight='bold' mb={1}>Scan Accuracy</Text>
                              <Text>{scan.accuracy}% confidence in this result</Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                        
                        <IconButton
                          aria-label='View scan details'
                          icon={<ExternalLinkIcon />}
                          size='sm'
                          variant='ghost'
                          colorScheme='brand'
                          onClick={() => handleViewScan(scan)}
                        />
                        
                        <IconButton
                          aria-label='Share scan'
                          icon={<Icon as={FaShareAlt} />}
                          size='sm'
                          variant='ghost'
                          colorScheme='brand'
                        />
                        
                        <IconButton
                          aria-label='Delete scan'
                          icon={<Icon as={FaRegTrashAlt} />}
                          size='sm'
                          variant='ghost'
                          colorScheme='red'
                          onClick={() => handleDeleteClick(scan)}
                        />
                      </HStack>
                    </Flex>
                  </CardBody>
                </Card>
              ))
            ) : (
              <Flex justify='center' align='center' direction='column' h='200px'>
                <Icon as={TimeIcon} w={10} h={10} color='gray.400' mb={4} />
                <Text color='gray.400'>No scan history found matching your criteria</Text>
                <Button variant='outline' mt={4} leftIcon={<RepeatIcon />} onClick={() => {
                  setFilter('all');
                  setSearchTerm('');
                }}>
                  Reset Filters
                </Button>
              </Flex>
            )}
          </VStack>
        </CardBody>
      </Card>
      
      {/* Stats Card */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing='20px' mb='20px'>
        <Card>
          <CardBody>
            <Flex align='center' direction='column' w='100%'>
              <Icon as={TimeIcon} color='brand.400' w={10} h={10} mb={3} />
              <Text fontWeight='bold' fontSize='2xl'>
                {scanHistory.length}
              </Text>
              <Text color='gray.400'>
                Total Scans
              </Text>
            </Flex>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Flex align='center' direction='column' w='100%'>
              <Icon as={CheckIcon} color='green.400' w={10} h={10} mb={3} />
              <Text fontWeight='bold' fontSize='2xl'>
                {scanHistory.filter(s => s.result === 'true').length}
              </Text>
              <Text color='gray.400'>
                True Claims
              </Text>
            </Flex>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Flex align='center' direction='column' w='100%'>
              <Icon as={WarningIcon} color='red.400' w={10} h={10} mb={3} />
              <Text fontWeight='bold' fontSize='2xl'>
                {scanHistory.filter(s => s.result === 'false').length}
              </Text>
              <Text color='gray.400'>
                False Claims
              </Text>
            </Flex>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Flex align='center' direction='column' w='100%'>
              <Icon as={InfoIcon} color='yellow.400' w={10} h={10} mb={3} />
              <Text fontWeight='bold' fontSize='2xl'>
                {scanHistory.filter(s => s.result === 'misleading').length}
              </Text>
              <Text color='gray.400'>
                Misleading Claims
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Scan Details Modal */}
      <Modal isOpen={isModalOpen} onClose={onModalClose} size='lg'>
        <ModalOverlay />
        <ModalContent bg='navy.800'>
          <ModalHeader>Scan Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedScan && (
              <VStack spacing={4} align='stretch'>
                <Box bg={
                  selectedScan.result === 'true' ? 'green.900' : 
                  selectedScan.result === 'false' ? 'red.900' : 
                  'yellow.900'
                } p={4} borderRadius='md'>
                  <HStack>
                    <IconBox 
                      bg={selectedScan.result === 'true' ? 'green.400' : 
                          selectedScan.result === 'false' ? 'red.400' : 
                          'yellow.400'} 
                      icon={selectedScan.result === 'true' ? <CheckIcon color='white' /> : 
                            selectedScan.result === 'false' ? <WarningTwoIcon color='white' /> : 
                            <InfoIcon color='white' />} 
                      h='50px' 
                      w='50px'
                    />
                    <VStack align='start' spacing={0}>
                      <Text fontSize='xl' fontWeight='bold' textTransform='capitalize'>
                        {selectedScan.result}
                      </Text>
                      <Text>
                        Verification confidence: {selectedScan.accuracy}%
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
                
                <VStack align='start' spacing={1}>
                  <Text color='gray.400' fontSize='sm'>Claim</Text>
                  <Text fontWeight='bold'>{selectedScan.claim}</Text>
                </VStack>
                
                <HStack>
                  <VStack align='start' spacing={1} flex={1}>
                    <Text color='gray.400' fontSize='sm'>Category</Text>
                    <Tag size='md' variant='subtle' colorScheme={
                      selectedScan.category === 'Health' ? 'red' : 
                      selectedScan.category === 'Politics' ? 'blue' : 
                      selectedScan.category === 'Environment' ? 'green' : 
                      'purple'
                    }>
                      {selectedScan.category}
                    </Tag>
                  </VStack>
                  
                  <VStack align='start' spacing={1} flex={1}>
                    <Text color='gray.400' fontSize='sm'>Date & Time</Text>
                    <Text>{selectedScan.date} at {selectedScan.time}</Text>
                  </VStack>
                </HStack>
                
                <VStack align='start' spacing={1}>
                  <Text color='gray.400' fontSize='sm'>Source URL</Text>
                  <HStack>
                    <Icon as={FaLink} color='gray.400' />
                    <Text wordBreak='break-all'>{selectedScan.url}</Text>
                  </HStack>
                </VStack>
                
                <Divider my={2} />
                
                <Box>
                  <Text color='gray.400' fontSize='sm' mb={2}>Analysis Summary</Text>
                  <Text>
                    {selectedScan.result === 'true' 
                      ? "Our analysis confirms this claim is factually accurate based on reliable sources and data. The information presented aligns with expert consensus and verified evidence."
                      : selectedScan.result === 'false'
                        ? "Our verification process found this claim to be false. It contradicts reliable evidence, misrepresents data, or makes assertions not supported by credible sources."
                        : "This claim contains elements of truth but is presented in a way that could be misleading. It may omit critical context, use selective data, or combine factual information with misleading conclusions."
                    }
                  </Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button 
                leftIcon={<Icon as={FaShareAlt} />} 
                variant='ghost'
              >
                Share
              </Button>
              <Button 
                leftIcon={<Icon as={FaRegEdit} />} 
                variant='ghost'
              >
                Re-scan
              </Button>
              <Button 
                leftIcon={<Icon as={FaRegTrashAlt} />} 
                colorScheme='red' 
                variant='ghost'
                onClick={() => {
                  onModalClose();
                  handleDeleteClick(selectedScan);
                }}
              >
                Delete
              </Button>
              <Button colorScheme='brand' onClick={onModalClose}>
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg='navy.800'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Scan History
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this scan? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
} 