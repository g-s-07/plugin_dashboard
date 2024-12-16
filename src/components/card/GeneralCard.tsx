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
  useToast,
  Button,
} from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { MdDownload } from "react-icons/md";
import axios from 'axios';
// Custom components
import Card from 'components/card/Card';
import { showTable } from 'components/tables/SimpleTable';
import { FaInfoCircle } from 'react-icons/fa';
import { FaHourglassStart } from "react-icons/fa";
import { useState } from 'react';
import { BACKEND_DOMAIN, token } from '../../../urls';
import {getDifference, getCurrentDateTime} from 'utils/dateDifference';
import { queryClient } from '../../app/AppWrappers';



export default function GeneralCard(props: {
  info: any;
  title?:string;
  description?: string[];
  icon?: JSX.Element;
  type: string;
  expanded?: boolean;
  color?: string
}) {
  const { info, type , title} = props;
  const colors = [
    useColorModeValue('red.400', 'red.500'),
    useColorModeValue('gray.300', 'gray.600'),
    useColorModeValue('yellow.300', 'yellow.500'),
    useColorModeValue('green.300', 'green.500'),
    useColorModeValue('purple.300', 'purple.600'),
  ]
  const description=[
    "Under 24 hour data",
    "Greater than 24 hour  and less than 72 hour",
    "Greater than 3 days and less than 7 days",
    "Greater than 7 days"
]
  const toast = useToast();
  const [localInfo, setLocalInfo] = useState(props.info);
  
  const handleRefresh = async (table_name: string, index: number) => {
    try {
      toast({
        id: `refresh-${table_name}-${index}`,
        title: "Loading",
        description: `Refreshing data for ${table_name}...`,
        status: "loading",
        duration: null, 
        isClosable: false,
      });
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
        const updatedRowCount = response.data.data?.table_row_count;
        const updatedModifiedDate = response.data.data?.table_present_time;
        const updatedInfo = localInfo.map((item:any)=>{
          if(item.table_name === table_name){
            return {
              ...item,
              row_count: updatedRowCount,
              last_present_time: updatedModifiedDate
            };
          }
          return item
        })

        setLocalInfo(updatedInfo);
        toast.close(`refresh-${table_name}-${index}`);
        
        // await queryClient.refetchQueries({queryKey: ['dataPlugins']});
        

        queryClient.invalidateQueries({queryKey: ['dataPlugins']});


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


  const handledownload = async (table_name: string, index: number) => {
    try {
      toast({
        id: `download-${table_name}-${index}`,
        title: "Loading",
        description: `Downloading data for ${table_name}...`,
        status: "loading",
        duration: null, 
        isClosable: false,
      });
      const response = await axios.get(
        `${BACKEND_DOMAIN}/download-data/?table_name=${table_name}`,
        {
          headers: {
            Authorization: token,
          },
          responseType: 'blob',
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${table_name}.csv`);
        toast.close(`download-${table_name}-${index}`);
        toast.closeAll();
        toast({
          title: "Success",
          description: `${table_name} downloaded successfully`,
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


  const currentDate = getCurrentDateTime();

  const under24h:any = [];
  const under24h_72h:any = [];
  const under72h_7d:any = [];
  const greater7d:any = [];
  
  localInfo?.forEach((item:any) => {
    const difference = getDifference(currentDate, item.last_present_time || item.modified_date);
  
    if (difference <= 1440) {
      under24h.push(item);
    } else if (difference > 1440 && difference <= 4320) {
      under24h_72h.push(item);
    } else if (difference > 4320 && difference <= 10080) {
      under72h_7d.push(item);
    }
    else{
      greater7d.push(item)
    }
  });
  
  const calculateCounts = () => {
    const counts = [0, 0, 0, 0]; 
    localInfo?.forEach((item: { last_present_time: any, modified_date: any }) => {
      const diff = getDifference(getCurrentDateTime(), item.last_present_time || item.modified_date);
  
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
    <>
      <Stack
        width={'full'}
      >
        <Flex justifyContent={'end'} align="center" gap={2}>
              <Box bg={colors[3]} width="15px" height="15px" borderRadius="full" />
              <Text fontSize={'md'} fontWeight={'bold'}>&lt;= 24 hours</Text>
              <Box bg={colors[2]} width="15px" height="15px" borderRadius="full" />
              <Text fontSize={'md'} fontWeight={'bold'}>&gt;24 hours and &lt;= 72 hours</Text>
              <Box bg={colors[0]} width="15px" height="15px" borderRadius="full" />
              <Text fontSize={'md'} fontWeight={'bold'}>&gt;72 hours and &lt;=7 days</Text>
              <Box bg={colors[4]} width="15px" height="15px" borderRadius="full" />
              <Text fontSize={'md'} fontWeight={'bold'}>&gt;7 days</Text>
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
            {title}
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
       </Stack>
     <AccordianCards
      description={description[0]}
      items={under24h}
      colors={colors}
      dataCount = {counts[0]}
      dataColor = {colors[3]}
      // fontSize={fontSize}
      cardRefresh={handleRefresh}
      downloadData={handledownload}
      expanded
    />
     <AccordianCards
      description={description[1]}
      items={under24h_72h}
      colors={colors}
      dataCount = {counts[1]}
      dataColor = {colors[2]}
      // fontSize={fontSize}
      cardRefresh={handleRefresh}
      downloadData={handledownload}
      expanded
    />
    <AccordianCards
      description={description[2]}
      items={under72h_7d}
      colors={colors}
      dataColor = {colors[0]}
      dataCount = {counts[2]}
      // fontSize={fontSize}
      cardRefresh={handleRefresh}
      downloadData={handledownload}
      expanded
    />
     <AccordianCards
      description={description[3]}
      items={greater7d}
      colors={colors}
      dataColor = {colors[4]}
      dataCount = {counts[3]}
      // fontSize={fontSize}
      cardRefresh={handleRefresh}
      downloadData={handledownload}
      expanded
    />
        </>


  );
}



export function AccordianCards(props: {
  title?: string;
  items?: any;
  fontSize?: number;
  expanded?: boolean;
  description?: string;
  colors?: string[];
  icon?: JSX.Element;
  type?: string;
  cardRefresh?:(table_name: string, index: number) => Promise<void>;
  downloadData?:(table_name: string, index: number) => Promise<void>;
  dataCount?:number,
  dataColor?: any
}) {
  const { title, items, fontSize, expanded, description, colors, dataCount, dataColor, cardRefresh , downloadData} = props;
  const textColor = useColorModeValue('navy.700', 'white');

  return (
    <Card
      width={'full'}
      bg={'#ffffff1a'}
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
              <Flex flex="1" justifyContent="space-between" alignItems="center" textAlign="left">
                <Box>
                  <Text fontSize={fontSize} fontWeight="bold">
                    {description}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="25" fontWeight="extrabold" color={dataColor}>
                    {dataCount}
                  </Text>
                </Box>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
            {items && items.length > 0 ? (
              <SimpleGrid
                key={title}
                mt={4}
                columns={{
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 4,
                }}
                gap={4}
              >
                {items.map(
                  (
                    item: {
                      table_name: string;
                      row_count: number;
                      columns_list: any[];
                      last_present_time: any;
                      source_name: string;
                      total_records_count: number,
                      created_at: any,
                      modified_date: any
                    },
                    index: number
                  ) => (
                    <Card p="20px" key={index}>
                      <Flex direction="column" justify="center" align="center" h="100%">
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
                              base: "row",
                              md: "column",
                              lg: "row",
                              xl: "column",
                              "2xl": "row",
                            }}
                            mb="auto"
                            w="100%"
                          >
                            <Flex direction="column" align="center" justify="center">
                              <Flex direction="row" align="center" justify="center" gap={2}>
                                <Text
                                  color={textColor}
                                  fontSize={{
                                    base: "sm",
                                    md: "md",
                                    lg: "lg",
                                    xl: "lg",
                                    "2xl": "md",
                                    "3xl": "lg",
                                  }}
                                  mb="5px"
                                  fontWeight="bold"
                                  textAlign="center"
                                  onClick={() => cardRefresh(item.table_name, index)}
                                  cursor="pointer"
                                  transition="all 0.3s ease-in-out"
                                  _hover={{
                                    textShadow: "0 0 15px rgba(0, 255, 255, 0.7)",
                                    fontSize: "lg",
                                  }}
                                >
                                  <Tooltip
                                    hasArrow
                                    aria-label="last modified"
                                    label={
                                      item.last_present_time || item.modified_date
                                        ? `Last Modified: ${new Date(
                                            new Date(
                                              `${item.last_present_time || item.modified_date}`
                                            ).toLocaleString("en-US", {
                                              timeZone: "Asia/Kolkata",
                                            })
                                          ).toString()}`
                                        : "null"
                                    }
                                    placement="right"
                                    fontSize="xl"
                                    pt={2}
                                  >
                                    {item.table_name || item.source_name}
                                  </Tooltip>
                                </Text>
                                <Box position="relative" pb={2}>
                                  <Tooltip
                                    hasArrow
                                    aria-label="Download"
                                    label="Download Sample Data"
                                    placement="right"
                                    fontSize="xl"
                                  >
                                    <Button
                                      key={index}
                                      size="sm"
                                      onClick={() => downloadData(item.table_name, index)}
                                      >
                                      <MdDownload />
                                    </Button>
                                  </Tooltip>
                                </Box>
                              </Flex>
                              <Tooltip
                                hasArrow
                                aria-label="A tooltip"
                                label={showTable(item.columns_list)}
                                placement="right"
                                fontSize="xl"
                                pt={2}
                              >
                                <Box
                                  position="absolute"
                                  top={1}
                                  right={1}
                                  p={1}
                                  fontSize={"xl"}
                                >
                                  <FaInfoCircle />
                                </Box>
                              </Tooltip>

                              <Flex direction="row" align="center" justify="center" gap={2}>
                                <Box
                                  color={textColor}
                                  fontSize={{
                                    base: "2xl",
                                    md: "2xl",
                                    lg: "2xl",
                                    xl: "2xl",
                                    "2xl": "2xl",
                                    "3xl": "2xl",
                                  }}
                                  fontWeight="bold"
                                  textAlign="center"
                                >
                                  {getDifference(getCurrentDateTime(), item.last_present_time || item.modified_date) <= 60 ? (
                                    <Flex
                                      direction={"row"}
                                      align="center"
                                      justify="center"
                                      gap={1}
                                    >
                                      <FaHourglassStart color={"#FF80AB"} />
                                      <Text color={colors[3]}>{item.row_count || item.total_records_count || 0}</Text>
                                    </Flex>
                                  ) : getDifference(getCurrentDateTime(), item.last_present_time || item.modified_date ) > 60 &&
                                    getDifference(getCurrentDateTime(), item.last_present_time || item.modified_date) <= 1440 ? (
                                    <Text color={colors[3]}>{item.row_count || item.total_records_count || 0}</Text>
                                  ) : getDifference(getCurrentDateTime(), item.last_present_time || item.modified_date) > 1440 &&
                                    getDifference(getCurrentDateTime(), item.last_present_time || item.modified_date) <= 4320 ? (
                                    <Text color={colors[2]}>{item.row_count || item.total_records_count || 0}</Text>
                                  ) : getDifference(getCurrentDateTime(), item.last_present_time || item.modified_date) > 4320 &&
                                    getDifference(getCurrentDateTime(), item.last_present_time || item.modified_date) <= 10080 ? (
                                    <Text color={colors[0]}>{item.row_count || item.total_records_count || 0}</Text>
                                  ) : (
                                    <Text color={colors[4]}>{item.row_count || item.total_records_count || 0}</Text>
                                  )}
                                </Box>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Card>
                  )
                )}
              </SimpleGrid>
            ) : (
              <Box>
                <Text fontSize={"2xl"} fontWeight="bold" textAlign={"center"}>
                  No Data Found
                </Text>
              </Box>
            )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Card>
  );
}
