// src/components/Dashboard.js
import React from 'react';
import { Box, SimpleGrid, Text, HStack, VStack, Icon, Stat, StatLabel, StatNumber, Flex, Card, useColorModeValue } from '@chakra-ui/react';
// import { WalletIcon, UsersIcon } from '@chakra-ui/icons';
import { MdSettings } from 'react-icons/md'
const stats = [
  {
    title: "TODAY'S MONEY",
    value: "$53,897",
    percentage: "+3.48%",
    since: "Since last month",
    iconBg: "blue.500",
    iconColor: "white",
    percentageColor: "green.400",
  },
  {
    title: "TODAY'S USERS",
    value: "$3,200",
    percentage: "+5.2%",
    since: "Since last month",
    iconBg: "blue.500",
    iconColor: "white",
    percentageColor: "green.400",
  },
  {
    title: "NEW CLIENTS",
    value: "+2,503",
    percentage: "-2.82%",
    since: "Since last month",
    iconBg: "blue.500",
    iconColor: "white",
    percentageColor: "red.400",
  },
  {
    title: "TOTAL SALES",
    value: "$173,000",
    percentage: "+8.12%",
    since: "Since last month",
    iconBg: "blue.500",
    iconColor: "white",
    percentageColor: "green.400",
  },
];

const Dashboard = () => {
  const bgColor = useColorModeValue("gray.50","navy.800")
  return (
    <Box>
      <SimpleGrid columns={[1, null, 4]} spacing="24px">
        {stats.map((stat, index) => (
          <Card minH='125px' p="24px" borderRadius="20px" bgColor={bgColor}>
            <Flex direction='column'>
              <Flex
                flexDirection='row'
                align='center'
                justify='center'
                w='100%'
                mb='25px'>
                <Stat me='auto'>
                  <StatLabel
                    fontSize='xs'
                    color='gray.400'
                    fontWeight='bold'
                    textTransform='uppercase'>
                    Today's Money
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize='lg' fontWeight='bold'>
                      $53,897
                    </StatNumber>
                  </Flex>
                </Stat>
                <Icon as={MdSettings} />
              </Flex>
              <Text color='gray.400' fontSize='sm'>
                <Text as='span' color='green.400' fontWeight='bold'>
                  +3.48%{" "}
                </Text>
                Since last month
              </Text>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
