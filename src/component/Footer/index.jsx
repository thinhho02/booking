import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Input,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoMail } from "react-icons/io5";


import SocialButton from './SocialButton';
import Logo from './Logo';

function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            color={useColorModeValue('gray.900', 'gray.200')}>
            <Container as={Stack} maxW={'1200px'} py={10}>
                <SimpleGrid
                    templateColumns={{ sm: '1fr 1fr', md: '2fr 2fr 2fr 2fr' }}
                    spacing={8}>
                    <Stack spacing={6}>
                        <Box>
                            <Logo color={useColorModeValue('gray.700', 'white')} />
                        </Box>
                        <Text fontSize={'sm'}>
                            © 2022 Chakra Templates. All rights reserved
                        </Text>
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label={'Twitter'} href={'#'}>
                                <IoLogoTwitter />
                            </SocialButton>
                            <SocialButton label={'FaceBook'} href={'#'}>
                                <IoLogoFacebook />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'}>
                                <IoLogoInstagram />
                            </SocialButton>
                        </Stack>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Company</Text>
                        <Link href={'#'}>About us</Link>
                        <Link href={'#'}>Blog</Link>
                        <Link href={'#'}>Contact us</Link>
                        <Link href={'#'}>Pricing</Link>
                        <Link href={'#'}>Testimonials</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Support</Text>
                        <Link href={'#'}>Help Center</Link>
                        <Link href={'#'}>Terms of Service</Link>
                        <Link href={'#'}>Legal</Link>
                        <Link href={'#'}>Privacy Policy</Link>
                        <Link href={'#'}>Satus</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Stay up to date</Text>
                        <Stack direction={'row'}>
                            <Input
                                placeholder={'Your email address'}
                                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                                border={0}
                                _focus={{
                                    bg: 'whiteAlpha.300',
                                }}
                            />
                            <IconButton
                                bg={useColorModeValue('green.400', 'green.800')}
                                color={useColorModeValue('white', 'gray.800')}
                                _hover={{
                                    bg: 'green.600',
                                }}
                                aria-label="Subscribe"
                                icon={<IoMail />}
                            />
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
}
export default Footer