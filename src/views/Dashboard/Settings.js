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
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Radio,
  RadioGroup
} from '@chakra-ui/react';

// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import IconBox from 'components/Icons/IconBox';

// Icons
import { 
  DeleteIcon, 
  LockIcon, 
  MoonIcon, 
  SunIcon,
  WarningIcon
} from '@chakra-ui/icons';
import { 
  FaBell, 
  FaEnvelope, 
  FaFacebook, 
  FaGlobe, 
  FaGoogle, 
  FaLink, 
  FaLock, 
  FaMoon, 
  FaShieldAlt, 
  FaSun, 
  FaSyncAlt, 
  FaTwitter, 
  FaUserCog 
} from 'react-icons/fa';
import React, { useRef, useState } from 'react';

export default function Settings() {
  const textColor = useColorModeValue('gray.700', 'white');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('english');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState('limited');
  const cancelRef = useRef();
  
  const { 
    isOpen: isDeleteAccountOpen, 
    onOpen: onDeleteAccountOpen, 
    onClose: onDeleteAccountClose 
  } = useDisclosure();

  return (
    <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {/* Appearance Settings */}
        <Card>
          <CardHeader mb='12px'>
            <Flex justify='space-between' align='center'>
              <Text fontSize='lg' fontWeight='bold'>
                Appearance Settings
              </Text>
              <Icon as={FaUserCog} boxSize={6} color='brand.400' />
            </Flex>
          </CardHeader>
          
          <CardBody>
            <VStack spacing={6} align='stretch'>
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack>
                  <Icon as={theme === 'dark' ? FaMoon : FaSun} boxSize={5} color={theme === 'dark' ? 'purple.400' : 'yellow.400'} />
                  <Text fontWeight='medium'>Theme Mode</Text>
                </HStack>
                <HStack spacing={4}>
                  <Button 
                    size='sm' 
                    leftIcon={<MoonIcon />} 
                    variant={theme === 'dark' ? 'solid' : 'outline'} 
                    colorScheme='brand'
                    onClick={() => setTheme('dark')}
                  >
                    Dark
                  </Button>
                  <Button 
                    size='sm' 
                    leftIcon={<SunIcon />} 
                    variant={theme === 'light' ? 'solid' : 'outline'} 
                    colorScheme='brand'
                    onClick={() => setTheme('light')}
                  >
                    Light
                  </Button>
                </HStack>
              </HStack>
              
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack>
                  <Icon as={FaGlobe} boxSize={5} color='blue.400' />
                  <Text fontWeight='medium'>Language</Text>
                </HStack>
                <Select 
                  size='sm' 
                  width='150px' 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  borderRadius='lg'
                  bg='navy.700'
                >
                  <option value='english'>English</option>
                  <option value='spanish'>Spanish</option>
                  <option value='french'>French</option>
                  <option value='german'>German</option>
                  <option value='chinese'>Chinese</option>
                </Select>
              </HStack>
              
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack>
                  <Icon as={FaSyncAlt} boxSize={5} color='green.400' />
                  <VStack align='start' spacing={0}>
                    <Text fontWeight='medium'>Auto-Refresh Content</Text>
                    <Text color='gray.400' fontSize='sm'>Automatically update fact-check results</Text>
                  </VStack>
                </HStack>
                <Switch defaultChecked colorScheme='brand' size='md' />
              </HStack>
              
              <Button colorScheme='brand' leftIcon={<Icon as={FaSun} />} alignSelf='flex-start'>
                Save Appearance Settings
              </Button>
            </VStack>
          </CardBody>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <CardHeader mb='12px'>
            <Flex justify='space-between' align='center'>
              <Text fontSize='lg' fontWeight='bold'>
                Notification Settings
              </Text>
              <Icon as={FaBell} boxSize={6} color='brand.400' />
            </Flex>
          </CardHeader>
          
          <CardBody>
            <VStack spacing={6} align='stretch'>
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack>
                  <Icon as={FaEnvelope} boxSize={5} color='red.400' />
                  <VStack align='start' spacing={0}>
                    <Text fontWeight='medium'>Email Notifications</Text>
                    <Text color='gray.400' fontSize='sm'>Receive updates via email</Text>
                  </VStack>
                </HStack>
                <Switch 
                  colorScheme='brand' 
                  size='md' 
                  isChecked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
              </HStack>
              
              {emailNotifications && (
                <VStack align='stretch' bg='navy.900' p={4} borderRadius='lg' ml={10}>
                  <HStack justifyContent='space-between'>
                    <Text fontSize='sm'>New verification results</Text>
                    <Switch defaultChecked colorScheme='brand' size='sm' />
                  </HStack>
                  <HStack justifyContent='space-between'>
                    <Text fontSize='sm'>Community engagement</Text>
                    <Switch defaultChecked colorScheme='brand' size='sm' />
                  </HStack>
                  <HStack justifyContent='space-between'>
                    <Text fontSize='sm'>Weekly fact-checking digest</Text>
                    <Switch colorScheme='brand' size='sm' />
                  </HStack>
                </VStack>
              )}
              
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack>
                  <Icon as={FaBell} boxSize={5} color='yellow.400' />
                  <VStack align='start' spacing={0}>
                    <Text fontWeight='medium'>Push Notifications</Text>
                    <Text color='gray.400' fontSize='sm'>Receive in-app notifications</Text>
                  </VStack>
                </HStack>
                <Switch 
                  colorScheme='brand' 
                  size='md' 
                  isChecked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                />
              </HStack>
              
              {pushNotifications && (
                <VStack align='stretch' bg='navy.900' p={4} borderRadius='lg' ml={10}>
                  <HStack justifyContent='space-between'>
                    <Text fontSize='sm'>Trending misinformation alerts</Text>
                    <Switch defaultChecked colorScheme='brand' size='sm' />
                  </HStack>
                  <HStack justifyContent='space-between'>
                    <Text fontSize='sm'>Updates to previous verifications</Text>
                    <Switch defaultChecked colorScheme='brand' size='sm' />
                  </HStack>
                  <HStack justifyContent='space-between'>
                    <Text fontSize='sm'>Leaderboard changes</Text>
                    <Switch colorScheme='brand' size='sm' />
                  </HStack>
                </VStack>
              )}
              
              <Button colorScheme='brand' leftIcon={<Icon as={FaBell} />} alignSelf='flex-start'>
                Save Notification Settings
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {/* Privacy Settings */}
        <Card>
          <CardHeader mb='12px'>
            <Flex justify='space-between' align='center'>
              <Text fontSize='lg' fontWeight='bold'>
                Privacy & Security
              </Text>
              <Icon as={FaShieldAlt} boxSize={6} color='brand.400' />
            </Flex>
          </CardHeader>
          
          <CardBody>
            <VStack spacing={6} align='stretch'>
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack>
                  <Icon as={FaLock} boxSize={5} color='blue.400' />
                  <Text fontWeight='medium'>Two-Factor Authentication</Text>
                </HStack>
                <Switch defaultChecked colorScheme='brand' size='md' />
              </HStack>
              
              <Box>
                <HStack mb={3}>
                  <Icon as={FaGlobe} boxSize={5} color='green.400' />
                  <Text fontWeight='medium'>Data Sharing Preferences</Text>
                </HStack>
                <RadioGroup 
                  onChange={setDataSharing} 
                  value={dataSharing} 
                  colorScheme='brand'
                  bg='navy.800'
                  p={4}
                  borderRadius='lg'
                >
                  <VStack align='stretch' spacing={3}>
                    <Radio value='none'>
                      <Text fontWeight='medium'>No sharing</Text>
                      <Text color='gray.400' fontSize='sm'>Your data remains completely private</Text>
                    </Radio>
                    <Radio value='limited'>
                      <Text fontWeight='medium'>Limited sharing</Text>
                      <Text color='gray.400' fontSize='sm'>Share anonymized verification patterns to improve accuracy</Text>
                    </Radio>
                    <Radio value='full'>
                      <Text fontWeight='medium'>Full community sharing</Text>
                      <Text color='gray.400' fontSize='sm'>Contribute all verification data to the community (anonymized)</Text>
                    </Radio>
                  </VStack>
                </RadioGroup>
              </Box>
              
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack>
                  <Icon as={LockIcon} boxSize={5} color='red.400' />
                  <VStack align='start' spacing={0}>
                    <Text fontWeight='medium'>Private Profile Mode</Text>
                    <Text color='gray.400' fontSize='sm'>Hide your activity from other users</Text>
                  </VStack>
                </HStack>
                <Switch colorScheme='brand' size='md' />
              </HStack>
              
              <Button 
                variant='outline' 
                colorScheme='red' 
                leftIcon={<DeleteIcon />} 
                alignSelf='flex-start'
                onClick={onDeleteAccountOpen}
              >
                Delete Account
              </Button>
            </VStack>
          </CardBody>
        </Card>
        
        {/* Connected Accounts */}
        <Card>
          <CardHeader mb='12px'>
            <Flex justify='space-between' align='center'>
              <Text fontSize='lg' fontWeight='bold'>
                Connected Accounts
              </Text>
              <Icon as={FaLink} boxSize={6} color='brand.400' />
            </Flex>
          </CardHeader>
          
          <CardBody>
            <VStack spacing={6} align='stretch'>
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack spacing={3}>
                  <IconBox
                    h='40px'
                    w='40px'
                    bg='blue.900'
                    icon={<FaGoogle color='#DB4437' size='20px' />}
                  />
                  <VStack align='start' spacing={0}>
                    <Text fontWeight='medium'>Google</Text>
                    <Text color='gray.400' fontSize='sm'>factcheck@gmail.com</Text>
                  </VStack>
                </HStack>
                <Badge colorScheme='green'>Connected</Badge>
              </HStack>
              
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack spacing={3}>
                  <IconBox
                    h='40px'
                    w='40px'
                    bg='blue.900'
                    icon={<FaFacebook color='#1877F2' size='20px' />}
                  />
                  <VStack align='start' spacing={0}>
                    <Text fontWeight='medium'>Facebook</Text>
                    <Text color='gray.400' fontSize='sm'>Share verifications to your timeline</Text>
                  </VStack>
                </HStack>
                <Button size='sm' colorScheme='brand'>Connect</Button>
              </HStack>
              
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <HStack spacing={3}>
                  <IconBox
                    h='40px'
                    w='40px'
                    bg='blue.900'
                    icon={<FaTwitter color='#1DA1F2' size='20px' />}
                  />
                  <VStack align='start' spacing={0}>
                    <Text fontWeight='medium'>Twitter</Text>
                    <Text color='gray.400' fontSize='sm'>@factchecker</Text>
                  </VStack>
                </HStack>
                <Badge colorScheme='green'>Connected</Badge>
              </HStack>
              
              <Divider />
              
              <Text fontWeight='medium'>API Access</Text>
              <HStack justifyContent='space-between' bg='navy.800' p={4} borderRadius='lg'>
                <VStack align='start' spacing={0}>
                  <Text fontWeight='medium'>Developer API Key</Text>
                  <Text color='gray.400' fontSize='sm'>For integration with other services</Text>
                </VStack>
                <Button size='sm' colorScheme='brand'>Generate Key</Button>
              </HStack>
              
              <Button colorScheme='brand' leftIcon={<Icon as={FaLink} />} alignSelf='flex-start'>
                Save Connection Settings
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Delete Account Confirmation */}
      <AlertDialog
        isOpen={isDeleteAccountOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteAccountClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg='navy.800'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack align='stretch' spacing={4}>
                <HStack>
                  <Icon as={WarningIcon} color='red.500' boxSize={6} />
                  <Text>This action cannot be undone. Are you sure you want to delete your account?</Text>
                </HStack>
                
                <Box bg='red.900' p={4} borderRadius='md'>
                  <Text>All your data will be permanently removed, including:</Text>
                  <UnorderedList mt={2} pl={4}>
                    <ListItem>Your verification history</ListItem>
                    <ListItem>Achievements and badges</ListItem>
                    <ListItem>Community contributions</ListItem>
                    <ListItem>Account settings</ListItem>
                  </UnorderedList>
                </Box>
                
                <FormControl>
                  <FormLabel>Type "DELETE" to confirm</FormLabel>
                  <Input placeholder="DELETE" />
                </FormControl>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteAccountClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDeleteAccountClose} ml={3}>
                Delete Account
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

// Simple components for the AlertDialog
const UnorderedList = (props) => (
  <Box as="ul" textAlign="left" {...props} />
);

const ListItem = (props) => (
  <Box as="li" ml={4} {...props} />
); 