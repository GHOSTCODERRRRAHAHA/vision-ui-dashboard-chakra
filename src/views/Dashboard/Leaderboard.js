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
  AvatarGroup,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
  HStack,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip
} from '@chakra-ui/react';

// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import IconBox from 'components/Icons/IconBox';

// Icons
import { CheckIcon, InfoIcon, StarIcon, TimeIcon } from '@chakra-ui/icons';
import { FaMedal, FaAward, FaTrophy, FaStar, FaThumbsUp, FaChartLine } from 'react-icons/fa';
import { BsShieldCheck, BsBarChartFill, BsClockHistory, BsGraphUp } from 'react-icons/bs';
import React, { useState } from 'react';

export default function Leaderboard() {
  const [timeRange, setTimeRange] = useState('weekly');
  const textColor = useColorModeValue('gray.700', 'white');

  // Sample top fact-checkers data
  const topFactCheckers = [
    {
      id: 1,
      name: 'Elena Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'Lead Fact-Checker',
      accuracy: 98,
      scans: 1243,
      upvotes: 3892,
      badge: 'Platinum',
      streak: 142,
      topCategory: 'Health',
      change: '+2'
    },
    {
      id: 2,
      name: 'Kevin Wong',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'Expert Verifier',
      accuracy: 97,
      scans: 987,
      upvotes: 2458,
      badge: 'Gold',
      streak: 98,
      topCategory: 'Politics',
      change: '0'
    },
    {
      id: 3,
      name: 'Amara Johnson',
      avatar: 'https://i.pravatar.cc/150?img=11',
      role: 'Senior Contributor',
      accuracy: 95,
      scans: 762,
      upvotes: 1952,
      badge: 'Gold',
      streak: 65,
      topCategory: 'Science',
      change: '+5'
    },
    {
      id: 4,
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?img=7',
      role: 'Rising Star',
      accuracy: 94,
      scans: 541,
      upvotes: 1347,
      badge: 'Silver',
      streak: 47,
      topCategory: 'Technology',
      change: '+12'
    },
    {
      id: 5,
      name: 'Sophie Miller',
      avatar: 'https://i.pravatar.cc/150?img=9',
      role: 'Verified Checker',
      accuracy: 93,
      scans: 412,
      upvotes: 1089,
      badge: 'Silver',
      streak: 39,
      topCategory: 'Environment',
      change: '-1'
    },
    {
      id: 6,
      name: 'Marcus Taylor',
      avatar: 'https://i.pravatar.cc/150?img=12',
      role: 'Community Leader',
      accuracy: 91,
      scans: 387,
      upvotes: 956,
      badge: 'Silver',
      streak: 32,
      topCategory: 'Politics',
      change: '-3'
    },
    {
      id: 7,
      name: 'Leila Patel',
      avatar: 'https://i.pravatar.cc/150?img=23',
      role: 'Contributor',
      accuracy: 90,
      scans: 321,
      upvotes: 827,
      badge: 'Bronze',
      streak: 29,
      topCategory: 'Health',
      change: '+7'
    }
  ];

  // Get badge color
  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Platinum':
        return 'linear-gradient(to bottom right, cyan.300, blue.500)';
      case 'Gold':
        return 'linear-gradient(to bottom right, yellow.300, orange.500)';
      case 'Silver':
        return 'linear-gradient(to bottom right, gray.300, gray.500)';
      case 'Bronze':
        return 'linear-gradient(to bottom right, orange.300, brown.500)';
      default:
        return 'gray.400';
    }
  };

  return (
    <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing='24px' mb='20px'>
        <Card>
          <CardBody>
            <Flex align='center' direction='column' w='100%'>
              <Icon as={FaTrophy} color='yellow.400' w={14} h={14} mb={4} />
              <Text fontWeight='bold' fontSize='2xl'>
                Top Fact-Checkers
              </Text>
              <Text color='gray.400'>
                Leaderboard Updated Daily
              </Text>
            </Flex>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Flex flexDirection='row' align='center' justify='center' w='100%'>
              <Stat me='auto'>
                <StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
                  Total Fact-Checks
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color='#fff'>
                    87,439
                  </StatNumber>
                  <Badge colorScheme='green' ms={2} alignSelf='center'>
                    +12% this week
                  </Badge>
                </Flex>
              </Stat>
              <IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
                <Icon as={BsShieldCheck} h={'24px'} w={'24px'} color='#fff' />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Flex flexDirection='row' align='center' justify='center' w='100%'>
              <Stat me='auto'>
                <StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
                  Community Members
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color='#fff'>
                    5,248
                  </StatNumber>
                  <Badge colorScheme='green' ms={2} alignSelf='center'>
                    +5% this month
                  </Badge>
                </Flex>
              </Stat>
              <IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
                <Icon as={FaAward} h={'24px'} w={'24px'} color='#fff' />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Flex flexDirection='row' align='center' justify='center' w='100%'>
              <Stat me='auto'>
                <StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
                  Avg. Accuracy Rate
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color='#fff'>
                    92%
                  </StatNumber>
                  <Badge colorScheme='green' ms={2} alignSelf='center'>
                    +3% improvement
                  </Badge>
                </Flex>
              </Stat>
              <IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
                <Icon as={BsGraphUp} h={'24px'} w={'24px'} color='#fff' />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card mb='20px'>
        <CardHeader mb='12px'>
          <Flex justify='space-between' align='center' w='100%'>
            <Text color={textColor} fontSize='lg' fontWeight='bold'>
              Leaderboard Rankings
            </Text>
            <Select 
              variant='filled' 
              bg='navy.800' 
              borderColor='transparent'
              color='white'
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              w='140px'
              size='sm'
              borderRadius='15px'
            >
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
              <option value='allTime'>All Time</option>
            </Select>
          </Flex>
        </CardHeader>
        <CardBody>
          <Tabs variant='soft-rounded' colorScheme='brand'>
            <TabList mb={4}>
              <Tab>All Categories</Tab>
              <Tab>Health</Tab>
              <Tab>Politics</Tab>
              <Tab>Science</Tab>
              <Tab>Technology</Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel px={0}>
                <Box overflowX='auto'>
                  <Table variant='simple' color='white'>
                    <Thead>
                      <Tr my='.8rem' ps='0px'>
                        <Th color='gray.400' ps={0} textAlign='center'>Rank</Th>
                        <Th color='gray.400'>User</Th>
                        <Th color='gray.400'>Accuracy</Th>
                        <Th color='gray.400'>Scans</Th>
                        <Th color='gray.400'>Upvotes</Th>
                        <Th color='gray.400'>Streak</Th>
                        <Th color='gray.400'>Badge</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {topFactCheckers.map((checker, index) => (
                        <Tr key={checker.id}>
                          <Td textAlign='center'>
                            <Flex align='center' justifyContent='center'>
                              <Text fontWeight='bold' fontSize='md'>
                                {index + 1}
                              </Text>
                              {checker.change.startsWith('+') && (
                                <Text fontSize='xs' color='green.400' ml={1}>
                                  ↑{checker.change}
                                </Text>
                              )}
                              {checker.change.startsWith('-') && (
                                <Text fontSize='xs' color='red.400' ml={1}>
                                  ↓{checker.change.slice(1)}
                                </Text>
                              )}
                            </Flex>
                          </Td>
                          <Td>
                            <Flex align='center'>
                              <Avatar src={checker.avatar} name={checker.name} size='sm' mr='12px' />
                              <Flex direction='column'>
                                <Text fontWeight='bold' fontSize='sm'>{checker.name}</Text>
                                <Text fontSize='xs' color='gray.400'>{checker.role}</Text>
                              </Flex>
                            </Flex>
                          </Td>
                          <Td>
                            <Flex align='center'>
                              <Text fontWeight='bold' mr={1}>{checker.accuracy}%</Text>
                              <Tooltip label="Fact-checking accuracy rate" fontSize="sm">
                                <InfoIcon color="gray.400" boxSize={3} />
                              </Tooltip>
                            </Flex>
                          </Td>
                          <Td>
                            <Text fontWeight='bold'>{checker.scans.toLocaleString()}</Text>
                          </Td>
                          <Td>
                            <Text fontWeight='bold'>{checker.upvotes.toLocaleString()}</Text>
                          </Td>
                          <Td>
                            <Flex align='center'>
                              <Icon as={BsClockHistory} color='orange.400' mr={1} />
                              <Text fontWeight='bold'>{checker.streak} days</Text>
                            </Flex>
                          </Td>
                          <Td>
                            <Flex align='center'>
                              <Box
                                w='10px'
                                h='10px'
                                bg={getBadgeColor(checker.badge)}
                                borderRadius='full'
                                mr={2}
                              />
                              <Text fontWeight='bold'>{checker.badge}</Text>
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
              
              <TabPanel>
                <Flex justify='center' align='center' h='200px'>
                  <Text color='gray.400'>Health category rankings will appear here.</Text>
                </Flex>
              </TabPanel>
              
              <TabPanel>
                <Flex justify='center' align='center' h='200px'>
                  <Text color='gray.400'>Politics category rankings will appear here.</Text>
                </Flex>
              </TabPanel>
              
              <TabPanel>
                <Flex justify='center' align='center' h='200px'>
                  <Text color='gray.400'>Science category rankings will appear here.</Text>
                </Flex>
              </TabPanel>
              
              <TabPanel>
                <Flex justify='center' align='center' h='200px'>
                  <Text color='gray.400'>Technology category rankings will appear here.</Text>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing='20px' mb='20px'>
        <Card>
          <CardHeader>
            <Text fontSize='lg' fontWeight='bold'>
              Achievements Unlocked
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align='stretch'>
              <HStack spacing={4} bg='navy.800' p={3} borderRadius='lg'>
                <IconBox
                  bg={getBadgeColor('Gold')}
                  icon={<FaMedal color='white' size='24px' />}
                  h='48px'
                  w='48px'
                />
                <VStack align='start' spacing={0}>
                  <Text fontWeight='bold'>Master Fact-Checker</Text>
                  <Text color='gray.400' fontSize='sm'>Complete 1,000+ verified fact checks</Text>
                </VStack>
                <Badge colorScheme='green' ml='auto'>328 users</Badge>
              </HStack>
              
              <HStack spacing={4} bg='navy.800' p={3} borderRadius='lg'>
                <IconBox
                  bg={getBadgeColor('Silver')}
                  icon={<FaStar color='white' size='24px' />}
                  h='48px'
                  w='48px'
                />
                <VStack align='start' spacing={0}>
                  <Text fontWeight='bold'>Streak Master</Text>
                  <Text color='gray.400' fontSize='sm'>Maintain a 30+ day fact-checking streak</Text>
                </VStack>
                <Badge colorScheme='green' ml='auto'>521 users</Badge>
              </HStack>
              
              <HStack spacing={4} bg='navy.800' p={3} borderRadius='lg'>
                <IconBox
                  bg={getBadgeColor('Bronze')}
                  icon={<FaThumbsUp color='white' size='24px' />}
                  h='48px'
                  w='48px'
                />
                <VStack align='start' spacing={0}>
                  <Text fontWeight='bold'>Community Champion</Text>
                  <Text color='gray.400' fontSize='sm'>Receive 500+ upvotes on your contributions</Text>
                </VStack>
                <Badge colorScheme='green' ml='auto'>712 users</Badge>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <Text fontSize='lg' fontWeight='bold'>
              Your Ranking
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction='column' align='center'>
              <Box position='relative' mb={6}>
                <Text 
                  position='absolute' 
                  top='50%' 
                  left='50%' 
                  transform='translate(-50%, -50%)'
                  fontWeight='bold'
                  fontSize='xl'
                >
                  #42
                </Text>
                <Progress 
                  value={78} 
                  color='brand.400' 
                  size='150px' 
                  thickness='8px' 
                />
              </Box>
              
              <Text fontWeight='bold' fontSize='lg' mb={2}>
                You're in the top 10%!
              </Text>
              
              <Text color='gray.400' textAlign='center' mb={4}>
                Keep fact-checking to improve your rank and earn more achievements.
              </Text>
              
              <SimpleGrid columns={3} spacing={4} width='100%'>
                <VStack>
                  <Text fontSize='sm' color='gray.400'>Accuracy</Text>
                  <Text fontWeight='bold' fontSize='xl'>89%</Text>
                </VStack>
                
                <VStack>
                  <Text fontSize='sm' color='gray.400'>Scans</Text>
                  <Text fontWeight='bold' fontSize='xl'>248</Text>
                </VStack>
                
                <VStack>
                  <Text fontSize='sm' color='gray.400'>Streak</Text>
                  <Text fontWeight='bold' fontSize='xl'>12</Text>
                </VStack>
              </SimpleGrid>
              
              <Button colorScheme='brand' mt={6} width='100%'>
                View Your Profile
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Flex>
  );
} 