// Chakra imports
import {
  Accordion,
  AccordionItem,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  Box,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
// Custom components
import Card from 'components/card/Card';
import { FaClock } from "react-icons/fa";
import { showTable } from 'components/tables/SimpleTable';
import { FaInfoCircle } from 'react-icons/fa';
import { FaHourglassStart } from "react-icons/fa";
import { useState } from 'react';
import { BACKEND_DOMAIN, token } from '../../../urls';
import {getDifference, getCurrentDateTime} from 'utils/dateDifference';


export default function GeneralCard(props: {
  info: any;
  height?: string;
  overflowY?: string;
  description?: string;
  icon?: JSX.Element;
  type: string;
}) {
  const { info, overflowY, description, icon, type } = props;
  console.log(info);
  const textColor = useColorModeValue('navy.700', 'white');
  const colors = [
    useColorModeValue('red.400', 'red.500'),
    useColorModeValue('gray.300', 'gray.600'),
    useColorModeValue('yellow.300', 'yellow.500'),
    useColorModeValue('green.300', 'green.500'),
    useColorModeValue('purple.300', 'purple.600'),
  ]
  const toast = useToast();
  const [localInfo, setLocalInfo] = useState(props.info);
  
  const handleRefresh = async (table_name: string, index: number) => {
    try {
      const response = await axios.get(
        `${BACKEND_DOMAIN}/tables/row-count/?source=${type}&table_name=${table_name}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data?.table_row_count)
        const updatedInfo = [...localInfo];
        updatedInfo[index] = {
          ...updatedInfo[index],
          row_count: response.data.data?.table_row_count,
        };

        setLocalInfo(updatedInfo);
        toast.closeAll();
        toast({
          title: "Success",
          description: `${table_name} updated successfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: 'Error',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  
  const calculateCounts = () => {
    const counts = [0, 0, 0, 0]; 
    localInfo.forEach((item: { last_present_time: any }) => {
      const diff = getDifference(getCurrentDateTime(), item.last_present_time);
  
      if (diff <= 1440) {
        counts[0] += 1;
      } else if (diff > 1440 && diff <= 4320) {
        counts[1] += 1;
      } else if (diff > 4320 && diff <= 10080) {
        counts[2] += 1;
      } else {
        counts[3] += 1;
      }
    });
    return counts;
  };
  
  const counts = calculateCounts();
  

  return (
    <Card
      width={'full'}
      bg={'#ffffff1a'}
      brightness={0.2}
      mt={4}
      borderRadius={'20px'}
      height={props.height}
      overflowY={overflowY === 'scroll' ? 'scroll' : 'hidden'}
    >
      <Stack>
        <Accordion
          width={'full'}
          allowToggle
          borderColor={'transparent'}
          >
            <Flex justifyContent={'end'}>
              <Text fontSize={'md'} fontWeight={'bold'}>
                <Flex align="center" gap={2}>
                  <Box bg={colors[3]} width="15px" height="15px" borderRadius="full" /> &lt;= 24 hours
                  <Box bg={colors[2]} width="15px" height="15px" borderRadius="full" /> &gt;24 hours and  &lt;= 72 hours
                  <Box bg={colors[0]} width="15px" height="15px" borderRadius="full" /> &gt;72 hours and &lt;7 days
                  <Box bg={colors[4]} width="15px" height="15px" borderRadius="full" /> &gt;7 days
                </Flex>
              </Text>
            </Flex>
          <Flex
            justify={'space-between'}
            align={'center'}
            p={4}
            border={'1px solid'}
            borderColor={'white.400'}
            borderRadius={'10px'}
            mt={3}
          >
            <Text fontSize={'md'} fontWeight={'bold'}>
              {description}
            </Text>
            <Flex 
              direction={'row'}
              gap={2}
              align={"center"}
            >
                <Text fontSize={"25"} fontWeight={"extrabold"} color={colors[3]}>{counts[0]}</Text> <Box fontWeight={"extrabold"} fontSize={"25"}>+</Box> 
                <Text fontSize={"25"} fontWeight={"extrabold"} color={colors[2]}>{counts[1]}</Text> <Box fontWeight={"extrabold"} fontSize={"25"}>+</Box> 
                <Text fontSize={"25"} fontWeight={"extrabold"} color={colors[0]}>{counts[2]}</Text> <Box fontWeight={"extrabold"} fontSize={"25"}>+</Box> 
                <Text fontSize={"25"} fontWeight={"extrabold"} color={colors[4]}>{counts[3]}</Text> <Box fontWeight={"extrabold"} fontSize={"25"}>=</Box> 
                <Text fontSize={"25"} fontWeight={"extrabold"}>{info?.length}</Text> 
            </Flex>
          </Flex>
          <AccordionItem>
            <SimpleGrid
              mt={4}
              columns={{
                sm: 1,
                md: 2,
                lg: 3,
                xl: 4,
              }}
              gap={4}
            >
              {localInfo?.map((item: { table_name: string, row_count: number, columns_list: [any], last_present_time: any }, index: number) => (
                <Card
                  p="20px"
                  key={index}
                >
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    h="100%"
                  >
                    <Flex
                      flexDirection="column"
                      justify="center"
                      align="center"
                      h="100%"
                    >
                      <Flex
                        justify="center"
                        align="center"
                        direction={{
                          base: 'row',
                          md: 'column',
                          lg: 'row',
                          xl: 'column',
                          '2xl': 'row',
                        }}
                        mb="auto"
                        w="100%"
                      >
                        <Flex direction="column" align="center" justify="center">
                          <Flex direction="row" align="center" justify="center" gap={2}>
                            <Text
                              color={textColor}
                              fontSize={{
                                base: 'sm',
                                md: 'md',
                                lg: 'lg',
                                xl: 'lg',
                                '2xl': 'md',
                                '3xl': 'lg',
                              }}
                              mb="5px"
                              fontWeight="bold"
                              textAlign="center"
                            >
                              {item.table_name}
                            </Text>
                            <Box position="relative" pb={2}>
                              <Tooltip
                                hasArrow
                                aria-label="last modified"
                                label={item.last_present_time ? `Last Modified: ${new Date(new Date(`${item.last_present_time}`).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).toString()}` : "null"}
                                placement="right"
                                fontSize="xl"
                                pt={2}
                              >
                                <Box as="span">
                                  <Button
                                    key={index}
                                    size={'sm'}
                                    onClick={() => handleRefresh(item.table_name, index)}
                                  >
                                    {icon}
                                  </Button>
                                </Box>
                              </Tooltip>
                            </Box>
                          </Flex>

                          <Tooltip
                            hasArrow
                            aria-label='A tooltip'
                            label={showTable(item.columns_list)}
                            placement='right'
                            fontSize="xl"
                            pt={2}
                          >
                            <Box position="absolute" top={1} right={1} p={1} fontSize={"xl"}>
                              <FaInfoCircle />
                            </Box>
                          </Tooltip>
                          <Flex direction="row" align="center" justify="center" gap={2}>
                            <Text
                              color={textColor}
                              fontSize={{
                                base: '2xl',
                                md: '2xl',
                                lg: '2xl',
                                xl: '2xl',
                                '2xl': '2xl',
                                '3xl': '2xl',
                              }}
                              fontWeight="bold"
                              textAlign="center"
                            >
                              {
                                getDifference(getCurrentDateTime(), item.last_present_time) <= 60 ? (
                                  <Flex
                                    direction={"row"}
                                    align="center"
                                    justify="center"
                                    gap={1}
                                  >
                                    <FaHourglassStart color={"#FF80AB"}/> <Text color={colors[3]}>{item.row_count}</Text>
                                  </Flex>
                                ) : getDifference(getCurrentDateTime(), item.last_present_time) > 60 && getDifference(getCurrentDateTime(), item.last_present_time) <= 1440 ? (
                                  <Text color={colors[3]}>{item.row_count}</Text>
                                ) : getDifference(getCurrentDateTime(), item.last_present_time) > 1440 && getDifference(getCurrentDateTime(), item.last_present_time) <= 4320 ? (
                                  <Text color={colors[2]}>{item.row_count}</Text>
                                ) : getDifference(getCurrentDateTime(), item.last_present_time) > 4320 && getDifference(getCurrentDateTime(), item.last_present_time) <= 10080 ? (
                                  <Text color={colors[0]}>{item.row_count}</Text>
                                ) : (
                                  <Text color={colors[4]}>{item.row_count}</Text>
                                )
                              }
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </SimpleGrid>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Card>
  );
}



export function AccordianCards(props: {
  title?: string;
  items?: any;
  fontSize?: number;
  expanded?: boolean;
  description?: string;
  color?: string;
}) {
  const { title, items, fontSize, expanded, description, color } = props;
  console.log('items', items);
  return (
    <Card
      width={'full'}
      bg={color || '#ffffff1a'}
      brightness={0.2}
      mt={4}
      borderRadius={'20px'}
    >
      <Stack>
        <Accordion
          key={title}
          width={'full'}
          borderColor={'transparent'}
          allowMultiple
          defaultIndex={expanded ? [0] : []}
        >
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Text fontSize={fontSize}>{title}</Text>
                {description && <Text fontSize={'sm'}>{description}</Text>}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {items && (
                <TableContainer>
                  <Table variant='simple'>
                    <TableCaption>Details 1st Item</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Key</Th>
                        <Th>Value</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.entries(items).map(([key, value], index) => (
                        <Tr key={index}>
                          <Td>{key}</Td>
                          <Td>{value.toString()}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
              <SimpleGrid
                key={title}
                mt={4}
                columns={{
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 3,
                }}
                gap={4}
              >

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Card>
  );
}