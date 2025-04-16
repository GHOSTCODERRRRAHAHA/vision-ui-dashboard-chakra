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
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  Textarea,
  IconButton,
  Tooltip,
  Badge
} from '@chakra-ui/react';

// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import IconBox from 'components/Icons/IconBox';

// Icons
import { 
  SearchIcon, 
  ChevronDownIcon, 
  AddIcon, 
  TriangleUpIcon, 
  ChatIcon, 
  BellIcon
} from '@chakra-ui/icons';
import { 
  FaRegCommentDots, 
  FaRegBookmark, 
  FaBookmark, 
  FaShare, 
  FaRegThumbsUp,
  FaThumbsUp,
  FaFilter 
} from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import React, { useState } from 'react';

export default function Community() {
  const [activeTab, setActiveTab] = useState(0);
  const textColor = useColorModeValue('gray.700', 'white');
  
  // Sample community posts data
  const posts = [
    {
      id: 1,
      author: 'Alex Johnson',
      role: 'Verified Fact-Checker',
      avatar: 'https://i.pravatar.cc/150?img=1',
      time: '2 hours ago',
      title: 'Debunked: Viral claim about renewable energy efficiency',
      content: 'I analyzed the viral post claiming renewable energy is less efficient than fossil fuels. My fact-check found multiple misleading claims and outdated statistics.',
      category: 'Environment',
      upvotes: 47,
      comments: 13,
      isUpvoted: true,
      isBookmarked: false,
      tags: ['trending', 'environment', 'energy']
    },
    {
      id: 2,
      author: 'Sarah Miller',
      role: 'Senior Contributor',
      avatar: 'https://i.pravatar.cc/150?img=5',
      time: '5 hours ago',
      title: 'Help needed: Is this COVID treatment claim legitimate?',
      content: 'I keep seeing this article shared about a new COVID treatment that supposedly eliminates symptoms within 24 hours. Can anyone help fact-check this?',
      category: 'Health',
      upvotes: 12,
      comments: 22,
      isUpvoted: false,
      isBookmarked: true,
      tags: ['health', 'covid19', 'research']
    },
    {
      id: 3,
      author: 'Michael Zhang',
      role: 'Expert Verifier',
      avatar: 'https://i.pravatar.cc/150?img=3',
      time: '1 day ago',
      title: 'Analysis: Election misinformation trends in swing states',
      content: 'My team analyzed over 5,000 social media posts about the upcoming election. Here are the top misinformation narratives we\'re seeing and how to counter them.',
      category: 'Politics',
      upvotes: 89,
      comments: 34,
      isUpvoted: false,
      isBookmarked: false,
      tags: ['politics', 'elections', 'research']
    }
  ];

  return (
    <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb={4}>
        <Card gridColumn={{ md: "1 / 3" }}>
          <CardHeader p='12px 5px' mb='12px'>
            <Flex justify='space-between' align='center' w='100%'>
              <Text fontSize='lg' fontWeight='bold'>
                Start a Discussion
              </Text>
              <Button leftIcon={<AddIcon />} colorScheme='brand' size='sm'>
                New Post
              </Button>
            </Flex>
          </CardHeader>
          <CardBody px={4}>
            <Textarea 
              placeholder="Share a fact-check, ask a question, or start a discussion..." 
              minH="100px"
              borderRadius="15px"
              borderColor="gray.600"
              _focus={{ borderColor: 'brand.400' }}
              mb={3}
            />
            <Flex justify="space-between" align="center">
              <HStack spacing={2}>
                <Button variant="outline" size="sm" leftIcon={<Icon as={FaFilter} />}>
                  Topic
                </Button>
                <Button variant="outline" size="sm">
                  Add Tags
                </Button>
              </HStack>
              <Button colorScheme="brand" size="sm">
                Post
              </Button>
            </Flex>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody p={4}>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" mb={2}>Community Stats</Text>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.400">Active Members</Text>
                <Text fontWeight="bold">2,541</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.400">Posts Today</Text>
                <Text fontWeight="bold">87</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.400">Fact-Checks Shared</Text>
                <Text fontWeight="bold">1,298</Text>
              </HStack>
              <Divider />
              <Button variant="outline" width="full" leftIcon={<BellIcon />}>
                Join Community
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      <Card mb="20px">
        <CardBody p='12px'>
          <Tabs variant="soft-rounded" colorScheme="brand" index={activeTab} onChange={(index) => setActiveTab(index)}>
            <Flex justify="space-between" align="center" width="100%" mb={4}>
              <TabList>
                <Tab>Recent</Tab>
                <Tab>Popular</Tab>
                <Tab>Trending</Tab>
                <Tab>My Network</Tab>
              </TabList>
              <HStack>
                <InputGroup size="sm" width="200px">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                  <Input placeholder="Search discussions" borderRadius="15px" />
                </InputGroup>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" size="sm">
                    Filter
                  </MenuButton>
                  <MenuList>
                    <MenuItem>All Categories</MenuItem>
                    <MenuItem>Health</MenuItem>
                    <MenuItem>Politics</MenuItem>
                    <MenuItem>Science</MenuItem>
                    <MenuItem>Technology</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Flex>
            
            <TabPanels>
              <TabPanel px={0}>
                <VStack spacing={4} align="stretch">
                  {posts.map((post) => (
                    <Card key={post.id} bg="navy.800">
                      <CardBody p={4}>
                        <HStack spacing={4} align="flex-start">
                          <VStack align="center" minW="40px">
                            <IconButton
                              aria-label="Upvote"
                              icon={post.isUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
                              variant="ghost"
                              color={post.isUpvoted ? "brand.400" : "gray.400"}
                              size="sm"
                            />
                            <Text fontWeight="bold">{post.upvotes}</Text>
                            <IconButton
                              aria-label="Bookmark"
                              icon={post.isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                              variant="ghost"
                              color={post.isBookmarked ? "yellow.400" : "gray.400"}
                              size="sm"
                            />
                          </VStack>
                          
                          <VStack align="stretch" spacing={3} width="100%">
                            <HStack justify="space-between" width="100%">
                              <HStack>
                                <Avatar size="sm" src={post.avatar} name={post.author} />
                                <VStack spacing={0} align="flex-start">
                                  <Text fontWeight="bold" fontSize="sm">{post.author}</Text>
                                  <Text fontSize="xs" color="gray.400">{post.role}</Text>
                                </VStack>
                              </HStack>
                              <HStack>
                                <Tag size="sm" variant="subtle" colorScheme={
                                  post.category === 'Health' ? 'red' : 
                                  post.category === 'Politics' ? 'blue' : 
                                  post.category === 'Environment' ? 'green' : 'purple'
                                }>
                                  {post.category}
                                </Tag>
                                <Text fontSize="xs" color="gray.400">{post.time}</Text>
                                <Menu>
                                  <MenuButton as={IconButton} icon={<BsThreeDots />} variant="ghost" size="sm" />
                                  <MenuList>
                                    <MenuItem>Report Post</MenuItem>
                                    <MenuItem>Save</MenuItem>
                                    <MenuItem>Share</MenuItem>
                                    <MenuItem>Follow Thread</MenuItem>
                                  </MenuList>
                                </Menu>
                              </HStack>
                            </HStack>
                            
                            <VStack align="flex-start" spacing={2}>
                              <Text fontWeight="bold" fontSize="md">{post.title}</Text>
                              <Text>{post.content}</Text>
                              <HStack spacing={2} mt={2}>
                                {post.tags.map((tag, idx) => (
                                  <Tag size="sm" key={idx} borderRadius="full" variant="subtle" colorScheme="gray">
                                    <TagLabel>#{tag}</TagLabel>
                                  </Tag>
                                ))}
                              </HStack>
                            </VStack>
                            
                            <HStack spacing={4} pt={2}>
                              <Button variant="ghost" size="sm" leftIcon={<ChatIcon />} color="gray.400">
                                {post.comments} Comments
                              </Button>
                              <Button variant="ghost" size="sm" leftIcon={<Icon as={FaShare} />} color="gray.400">
                                Share
                              </Button>
                            </HStack>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </TabPanel>
              
              <TabPanel>
                <Flex justify="center" align="center" height="200px">
                  <Text color="gray.400">Popular discussions will appear here.</Text>
                </Flex>
              </TabPanel>
              
              <TabPanel>
                <Flex justify="center" align="center" height="200px">
                  <Text color="gray.400">Trending discussions will appear here.</Text>
                </Flex>
              </TabPanel>
              
              <TabPanel>
                <Flex justify="center" align="center" height="200px">
                  <Text color="gray.400">Connect with friends to see their posts here.</Text>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Flex>
  );
} 