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
	AvatarBadge,
	AvatarGroup,
	Badge,
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	DarkMode,
	Divider,
	Flex,
	Grid,
	HStack,
	Icon,
	Image,
	Link,
	Progress,
	SimpleGrid,
	Spinner,
	Stat,
	StatLabel,
	StatNumber,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tag,
	Text,
	useColorModeValue,
	VStack,
	Wrap,
	WrapItem
} from '@chakra-ui/react';
import avatar11 from 'assets/img/avatars/avatar11.png';
// Images
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';
import avatar4 from 'assets/img/avatars/avatar4.png';
import avatar6 from 'assets/img/avatars/avatar6.png';
import bgProfile from 'assets/img/bgProfile.png';
import ProjectImage1 from 'assets/img/ProjectImage1.png';
import ProjectImage2 from 'assets/img/ProjectImage2.png';
import ProjectImage3 from 'assets/img/ProjectImage3.png';
// Custom components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
import { CarIcon, FulgerIcon, FulgerWhiteIcon } from 'components/Icons/Icons';
import { Separator } from 'components/Separator/Separator';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaAward, FaChartLine, FaFacebook, FaInstagram, FaLinkedin, FaPencilAlt, FaPenFancy, FaTwitter, FaUsers, FaShieldAlt, FaThumbsUp } from 'react-icons/fa';
import { MdSchool, MdVerified, MdWork } from 'react-icons/md';
// Icons
import { IoDocumentsSharp } from 'react-icons/io5';
import { EditIcon, EmailIcon, StarIcon, CheckIcon, WarningIcon, InfoIcon } from '@chakra-ui/icons';
// Data
import {
	lineChartDataProfile1,
	lineChartDataProfile2,
	lineChartOptionsProfile1,
	lineChartOptionsProfile2
} from 'variables/charts';
// Auth Context
import { useAuth } from 'utils/auth';

export default function Profile() {
	const textColor = useColorModeValue('gray.700', 'white');
	const { user, profile, isLoading, signOut } = useAuth();
	
	// Sample user data - will be filled with real user data when authenticated
	const defaultUserData = {
		name: 'ClarityX User',
		role: 'Fact-Checker',
		bio: 'Join the fight against misinformation with ClarityX.',
		avatar: 'https://via.placeholder.com/150',
		email: 'user@example.com',
		joinDate: 'Recent',
		location: 'Global',
		expertise: ['General'],
		badges: [
			{ name: 'New Member', color: 'blue' }
		],
		socialLinks: {
			twitter: '#',
			facebook: '#',
			linkedin: '#'
		},
		stats: {
			accuracy: 0,
			scansCompleted: 0,
			upvotesReceived: 0,
			streak: 0
		},
		achievements: [],
		education: [],
		experience: [],
		verificationMetrics: {
			byCategory: [
				{ category: 'Politics', count: 0, accuracy: 0 },
				{ category: 'Health', count: 0, accuracy: 0 },
				{ category: 'Science', count: 0, accuracy: 0 },
				{ category: 'Technology', count: 0, accuracy: 0 }
			],
			byResult: [
				{ name: 'True', count: 0, percentage: 0 },
				{ name: 'False', count: 0, percentage: 0 },
				{ name: 'Misleading', count: 0, percentage: 0 }
			]
		},
		membership: {
			type: 'Free',
			since: 'Just joined',
			features: ['Basic fact-checking', 'Limited scans per day']
		}
	};
	
	// Merge real user data with default data, ensuring all properties exist
	const userData = profile && user ? {
		...defaultUserData,
		name: user.name || defaultUserData.name,
		email: user.email || defaultUserData.email,
		avatar: user.avatar || defaultUserData.avatar,
		// Add membership info from the authenticated user
		membership: {
			type: user.membership?.type || 'Free',
			since: user.membership?.since || (new Date()).toLocaleDateString(),
			features: user.membership?.features || defaultUserData.membership.features
		},
		// Ensure verification metrics always exist
		verificationMetrics: {
			byCategory: user.verificationMetrics?.byCategory || defaultUserData.verificationMetrics.byCategory,
			byResult: user.verificationMetrics?.byResult || defaultUserData.verificationMetrics.byResult
		}
	} : defaultUserData;

	// Handle logout
	const handleLogout = async () => {
		try {
			await signOut();
			// Redirect to login page
			window.location.href = '/auth/login';
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	if (isLoading) {
		return (
			<Flex justify="center" align="center" h="70vh">
				<VStack spacing={4}>
					<Spinner size="xl" color="brand.200" thickness="4px" />
					<Text>Loading your profile...</Text>
				</VStack>
			</Flex>
		);
	}

	return (
		<Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
			{/* Profile Header */}
			<Card mb='24px'>
				<CardBody>
					<Flex direction={{ base: 'column', md: 'row' }} align='center'>
						<Box position='relative' me={{ base: 0, md: 6 }} mb={{ base: 4, md: 0 }}>
							<Avatar 
								size='2xl' 
								src={userData.avatar}
								name={userData.name}
								borderRadius='12px'
								boxShadow='lg'
							>
								{profile && 
									<AvatarBadge
										borderRadius='8px'
										border='2px solid'
										borderColor='navy.700'
										bg='green.400'
										boxSize='28px'
									>
										<Icon h='14px' w='14px' color='white' as={CheckIcon} />
									</AvatarBadge>
								}
							</Avatar>
						</Box>
						
						<VStack align={{ base: 'center', md: 'start' }} spacing={1} flex={1}>
							<Text fontSize='2xl' fontWeight='bold'>{userData.name}</Text>
							{profile && (
								<HStack>
									<Icon as={MdVerified} color='green.400' boxSize={5} />
									<Text color='gray.400'>Verified ClarityX User</Text>
								</HStack>
							)}
							<Text fontSize='sm' color='gray.400' maxW='600px' align={{ base: 'center', md: 'left' }}>
								{userData.bio}
							</Text>
							<HStack mt={2}>
								<Icon as={EmailIcon} color='gray.400' />
								<Text color='gray.400'>{userData.email}</Text>
							</HStack>
							{profile && (
								<Wrap mt={2} spacing={2}>
									{userData.badges.map((badge, i) => (
										<WrapItem key={i}>
											<Badge colorScheme={badge.color} px={2} py={1} borderRadius='full'>
												{badge.name}
											</Badge>
										</WrapItem>
									))}
								</Wrap>
							)}
						</VStack>
						
						{profile && (
							<HStack spacing={4} mt={{ base: 4, md: 0 }}>
								<IconBox
									as='a'
									href={userData.socialLinks.twitter}
									target='_blank'
									h='40px'
									w='40px'
									bg='rgba(255, 255, 255, 0.1)'
									icon={<FaTwitter color='#1DA1F2' size='16px' />}
								/>
								<IconBox
									as='a'
									href={userData.socialLinks.facebook}
									target='_blank'
									h='40px'
									w='40px'
									bg='rgba(255, 255, 255, 0.1)'
									icon={<FaFacebook color='#4267B2' size='16px' />}
								/>
								<IconBox
									as='a'
									href={userData.socialLinks.linkedin}
									target='_blank'
									h='40px'
									w='40px'
									bg='rgba(255, 255, 255, 0.1)'
									icon={<FaLinkedin color='#0e76a8' size='16px' />}
								/>
							</HStack>
						)}
						{profile && (
							<Button 
								onClick={handleLogout}
								colorScheme="red"
								variant="outline"
								size="sm"
								ml={4}
							>
								Logout
							</Button>
						)}
					</Flex>
				</CardBody>
			</Card>
			
			{/* Membership Card */}
			<Card mb='24px'>
				<CardHeader mb='12px'>
					<Flex justify='space-between' align='center'>
						<Text fontSize='lg' fontWeight='bold'>
							Membership Details
						</Text>
						<Badge 
							colorScheme={userData.membership.type === 'Premium' ? 'blue' : 'gray'} 
							px={3} 
							py={1} 
							borderRadius='full'
						>
							{userData.membership.type} Account
						</Badge>
					</Flex>
				</CardHeader>
				<CardBody>
					<VStack align='stretch' spacing={4}>
						<Flex justify='space-between'>
							<Text color='gray.400'>Member Since</Text>
							<Text>{userData.membership.since}</Text>
						</Flex>
						<Divider />
						<Text fontWeight='bold'>Features</Text>
						{userData.membership.features.map((feature, index) => (
							<HStack key={index} spacing={3}>
								<Icon as={CheckIcon} color='green.400' />
								<Text>{feature}</Text>
							</HStack>
						))}
						{!profile && (
							<Button 
								colorScheme='teal' 
								onClick={() => window.location.href = '/auth/login'}
								mt={2}
							>
								Sign In to Access Your Membership
							</Button>
						)}
					</VStack>
				</CardBody>
			</Card>
			
			{/* Stats Cards (only show if authenticated) */}
			{profile && (
				<SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing='20px' mb='20px'>
					<Card>
						<CardBody p={4}>
							<Flex direction='column' align='center'>
								<Box position='relative' mb={2}>
									<CircularProgress 
										value={userData.stats.accuracy} 
										color='green.400' 
										size='100px' 
										thickness='8px'
									/>
									<Text 
										position='absolute' 
										top='50%' 
										left='50%' 
										transform='translate(-50%, -50%)'
										fontSize='lg'
										fontWeight='bold'
									>
										{userData.stats.accuracy}%
									</Text>
								</Box>
								<Text fontWeight='bold'>Verification Accuracy</Text>
							</Flex>
						</CardBody>
					</Card>
					
					<Card>
						<CardBody p={4}>
							<Flex align='center' justify='space-between'>
								<Flex direction='column'>
									<Text color='gray.400' fontSize='sm'>Scans Completed</Text>
									<Text fontSize='2xl' fontWeight='bold'>{userData.stats.scansCompleted}</Text>
								</Flex>
								<Icon as={FaShieldAlt} boxSize={8} color='blue.400' />
							</Flex>
						</CardBody>
					</Card>
					
					<Card>
						<CardBody p={4}>
							<Flex align='center' justify='space-between'>
								<Flex direction='column'>
									<Text color='gray.400' fontSize='sm'>Upvotes Received</Text>
									<Text fontSize='2xl' fontWeight='bold'>{userData.stats.upvotesReceived}</Text>
								</Flex>
								<Icon as={FaThumbsUp} boxSize={8} color='green.400' />
							</Flex>
						</CardBody>
					</Card>
					
					<Card>
						<CardBody p={4}>
							<Flex align='center' justify='space-between'>
								<Flex direction='column'>
									<Text color='gray.400' fontSize='sm'>Daily Streak</Text>
									<Text fontSize='2xl' fontWeight='bold'>{userData.stats.streak} days</Text>
								</Flex>
								<Icon as={FaAward} boxSize={8} color='orange.400' />
							</Flex>
						</CardBody>
					</Card>
				</SimpleGrid>
			)}
			
			{/* Not authenticated message */}
			{!profile && (
				<Card mb='20px'>
					<CardBody>
						<VStack spacing={4} align='center' py={8}>
							<Icon as={FaUsers} boxSize={12} color='brand.200' />
							<Text fontSize='xl' fontWeight='bold'>Join the ClarityX Community</Text>
							<Text textAlign='center' maxW='600px'>
								Sign in to access your full profile, track your fact-checking progress, and unlock premium features.
							</Text>
							<Button 
								colorScheme='teal' 
								size='lg'
								onClick={() => window.location.href = '/auth/login'}
								mt={2}
							>
								Sign In Now
							</Button>
						</VStack>
					</CardBody>
				</Card>
			)}
			
			<Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap='20px' mb='20px'>
				{/* Profile Info */}
				<Card>
					<CardHeader mb='12px'>
						<Text fontSize='lg' fontWeight='bold'>
							Profile Information
						</Text>
					</CardHeader>
					<CardBody>
						<VStack spacing={4} align='stretch'>
							<HStack>
								<Text color='gray.400' minW='120px'>Full Name:</Text>
								<Text fontWeight='500'>{userData.name}</Text>
							</HStack>
							<HStack>
								<Text color='gray.400' minW='120px'>Email:</Text>
								<Text fontWeight='500'>{userData.email}</Text>
							</HStack>
							<HStack>
								<Text color='gray.400' minW='120px'>Location:</Text>
								<Text fontWeight='500'>{userData.location}</Text>
							</HStack>
							<HStack>
								<Text color='gray.400' minW='120px'>Joined:</Text>
								<Text fontWeight='500'>{userData.joinDate}</Text>
							</HStack>
							<HStack align='flex-start'>
								<Text color='gray.400' minW='120px'>Expertise:</Text>
								<Wrap>
									{userData.expertise.map((area, i) => (
										<WrapItem key={i}>
											<Tag size='md' variant='subtle' colorScheme={
												area === 'Health' ? 'red' : 
												area === 'Science' ? 'green' : 
												'purple'
											}>
												{area}
											</Tag>
										</WrapItem>
									))}
								</Wrap>
							</HStack>
							
							<Divider />
							
							<VStack align='stretch' spacing={4}>
								<Text fontWeight='bold'>Education</Text>
								{userData.education.map((edu, i) => (
									<HStack key={i}>
										<Icon as={MdSchool} color='brand.300' boxSize={5} />
										<VStack align='start' spacing={0}>
											<Text fontWeight='500'>{edu.degree}</Text>
											<Text fontSize='sm' color='gray.400'>{edu.institution}, {edu.year}</Text>
										</VStack>
									</HStack>
								))}
							</VStack>
							
							<Divider />
							
							<VStack align='stretch' spacing={4}>
								<Text fontWeight='bold'>Experience</Text>
								{userData.experience.map((exp, i) => (
									<HStack key={i}>
										<Icon as={MdWork} color='brand.300' boxSize={5} />
										<VStack align='start' spacing={0}>
											<Text fontWeight='500'>{exp.role}</Text>
											<Text fontSize='sm' color='gray.400'>{exp.company}, {exp.period}</Text>
										</VStack>
									</HStack>
								))}
							</VStack>
							
							<Button colorScheme='brand' leftIcon={<EditIcon />}>
								Edit Profile
							</Button>
						</VStack>
					</CardBody>
				</Card>
				
				{/* Verification Statistics */}
				<Card>
					<CardHeader mb='12px'>
						<Tabs variant='soft-rounded' colorScheme='brand'>
							<TabList mb='16px'>
								<Tab>Verification Stats</Tab>
								<Tab>Achievements</Tab>
							</TabList>
							
							<TabPanels>
								<TabPanel px={0}>
									<VStack spacing={6} align='stretch'>
										<Text fontWeight='bold'>Verification by Category</Text>
										{userData.verificationMetrics.byCategory.map((item, index) => (
											<Box key={index}>
												<Flex justify='space-between' mb={1}>
													<HStack>
														<Text fontSize='sm'>{item.category}</Text>
														<Badge colorScheme={
															item.category === 'Health' ? 'red' :
															item.category === 'Politics' ? 'blue' :
															item.category === 'Science' ? 'green' : 'purple'
														}>
															{item.count}
														</Badge>
													</HStack>
													<Text fontSize='sm' fontWeight='bold'>{item.accuracy}% accuracy</Text>
												</Flex>
												<Progress 
													value={item.accuracy} 
													colorScheme={
														item.category === 'Health' ? 'red' :
														item.category === 'Politics' ? 'blue' :
														item.category === 'Science' ? 'green' : 'purple'
													} 
													borderRadius='full' 
													size='sm'
												/>
											</Box>
										))}
										
										<Divider my={2} />
										
										<Text fontWeight='bold'>Results Distribution</Text>
										<HStack spacing={4} justifyContent='space-between'>
											<VStack bg='green.900' borderRadius='md' p={4} flex={1} align='center'>
												<Icon as={CheckIcon} color='green.400' boxSize={6} />
												<Text fontWeight='bold'>{userData.verificationMetrics.byResult[0].count}</Text>
												<Text>True Claims</Text>
												<Badge colorScheme='green'>
													{userData.verificationMetrics.byResult[0].percentage}%
												</Badge>
											</VStack>
											
											<VStack bg='red.900' borderRadius='md' p={4} flex={1} align='center'>
												<Icon as={WarningIcon} color='red.400' boxSize={6} />
												<Text fontWeight='bold'>{userData.verificationMetrics.byResult[1].count}</Text>
												<Text>False Claims</Text>
												<Badge colorScheme='red'>
													{userData.verificationMetrics.byResult[1].percentage}%
												</Badge>
											</VStack>
											
											<VStack bg='yellow.900' borderRadius='md' p={4} flex={1} align='center'>
												<Icon as={InfoIcon} color='yellow.400' boxSize={6} />
												<Text fontWeight='bold'>{userData.verificationMetrics.byResult[2].count}</Text>
												<Text>Misleading</Text>
												<Badge colorScheme='yellow'>
													{userData.verificationMetrics.byResult[2].percentage}%
												</Badge>
											</VStack>
										</HStack>
									</VStack>
								</TabPanel>
								
								<TabPanel px={0}>
									<VStack spacing={4} align='stretch'>
										{userData.achievements.map((achievement, index) => (
											<Card key={index} bg='navy.800'>
												<CardBody>
													<HStack spacing={4}>
														<IconBox
															bg='brand.800'
															icon={<Icon as={achievement.icon} color='brand.300' h='24px' w='24px' />}
															h='60px'
															w='60px'
														/>
														<VStack align='start' spacing={0}>
															<Text fontWeight='bold'>{achievement.name}</Text>
															<Text fontSize='sm' color='gray.400'>{achievement.description}</Text>
															<Badge colorScheme='brand' mt={1}>Earned {achievement.date}</Badge>
														</VStack>
													</HStack>
												</CardBody>
											</Card>
										))}
									</VStack>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</CardHeader>
				</Card>
			</Grid>
		</Flex>
	);
}
