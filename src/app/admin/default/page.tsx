'use client';

import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Divider,
  SimpleGrid,
  Heading,
  CardHeader,
  CardBody,
  Card,
  Stack,
  useColorModeValue,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanels,
  TabPanel,
  IconButton,
  Tooltip,
  Skeleton,
  Spinner,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  ListItem,
  List,
  Input,
  FormControl,
  FormLabel,
  Icon,
  Collapse,
  useQuery,
  HStack
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from 'react-icons/md';
import CheckTable from 'views/admin/default/components/CheckTable';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
// Assets
import Usa from 'img/dashboards/usa.png';
import { CheckIcon, InfoIcon, SmallCloseIcon, StarIcon } from '@chakra-ui/icons';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { Select } from '@chakra-ui/react'
import axios from 'axios';
import { BACKEND_DOMAIN, token } from '../../../../urls';


interface StatusCountProps {
  count: number | string;
  isSuccess: number;
}

interface StatusPercentageProps {
  count: number | string;
}

const StatusCount: React.FC<StatusCountProps> = ({ count, isSuccess }) => {
  return (
    <Flex alignItems="center" flexWrap="wrap">
      <Text color={isSuccess ? "green.500" : "red.500"} fontSize={["sm", "md"]}>
        {count}
      </Text>
      <Box
        as={isSuccess ? CheckIcon : SmallCloseIcon}
        bg={isSuccess ? "green.100" : "red.100"}
        color={isSuccess ? "green.500" : "red.500"}
        borderRadius="full"
        ml={[1, 2]}
        boxSize={[3, 4]}
      />
    </Flex>
  );
};

const StatusPercentage: React.FC<StatusPercentageProps> = ({ count }) => {
    return (
      <Flex alignItems="center"  flexWrap="wrap">
        <Text color='blue.500' fontSize={["sm", "md"]}>{count}</Text>
        <Box
          as={StarIcon}
          bg={'blue.100'}
          color={'blue.400'}
          borderRadius="full" 
          ml={[1, 2]}
          boxSize={[3, 4]}
        />
      </Flex>
    );
};
// export const getOptions = (token: string) => {
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };
 
// export const getPluginStats = async () => {
 
//   const { data } = await axios.get(
//     'http://192.168.1.126:8010/get_plugin_stats/',
//     getOptions(process.env.NEXT_PUBLIC_JWT_AUTH_TOKEN),  
//   );
//   console.log(data);
//   return data;
// };
  
// const { data: dbMappingColumn } = useQuery({
//   queryKey: ['getPlugin'],
//   queryFn: getPluginStats,
// });


// console.log(dbMappingColumn);
// export default function Default() {
//   // Chakra Color Mode

//   const brandColor = useColorModeValue('brand.500', 'white');
//   const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  
//   const dividerColor = useColorModeValue("blue.600", "blue.300");
//   const headingColor = useColorModeValue("blue", "springgreen");
//   const renderCard = () => (
//     <Card>
//         <CardHeader
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           position="relative"
//           width="100%"
//           p={{ base: 1, md: 2 }}
//           pb={{ base: "2px", md: "1px" }}
//           flexWrap="wrap"
//         >
//           <Heading
//             textAlign="start"
//             flex="1"
//             fontWeight="normal"
//             fontSize={{ base: "md", md: "lg" }}
//             color={headingColor}
//           >
//           List
//           </Heading>
//           <Text
//             fontSize={{ base: "sm", md: "md" }}
//             fontWeight="medium"
//             mt={{ base: 2, md: 1 }}
//             flexShrink={0}
//           >
//             {/* data.unique_domain.toLocaleString() : data.total_count.toLocaleString() */}
//           </Text>
//           <Tooltip  aria-label="Card information" bg={'whitesmoke'}>
//             <IconButton
//               variant="ghost"
//               colorScheme="gray"
//               aria-label="Information"
//               icon={<InfoIcon />}
//               size="xs"
//               ml={{ base: 0, md: 2 }}
//               mt={{ base: 2, md: 0 }}
//             />
//           </Tooltip>
//         </CardHeader>
//           <CardBody
//             display="flex"
//             flexDirection="column"
//             alignItems="start"
//             width="100%"
//             p={2}
//             fontSize="md"
//           >
//             {/* <Box mb={1} fontSize="xl">{data.total_count.toLocaleString()}</Box> */}
//             <Divider orientation="horizontal" mb={2} borderWidth="1px" borderColor={dividerColor}/>
//             <Flex width="100%" alignItems="center">
//               <Stack spacing={1} align="start" width="100%">
//                 <Flex width="100%" alignItems="center">
//                   <Box flex="1" fontWeight="medium">
//                     {/* {title === 'Company' ? `Domain Found`: `${alias} D. Found`}  */}
//                     Pending
//                   </Box>
//                   <StatusCount count={100} isSuccess={1} />
//                 </Flex>
//                 <Flex width="100%" alignItems="center">
//                   <Box flex="1" fontWeight="medium">
//                     {/* {title === 'Company' ? `Domain Not Found`: `${alias} D. Not Found`}  */}
//                     Processing
//                   </Box>
//                   <StatusCount count={200} isSuccess={0} />
//                 </Flex>
//                 <Flex width="100%" alignItems="center">
//                   <Box flex="1" fontWeight="medium">
//                     Total
//                   </Box>
//                   <StatusPercentage
//                     count={
//                     50
//                     }
//                   />
//                 </Flex>
//               </Stack>
//             </Flex>

//             {/*  <Flex width="100%" alignItems="center">
//               <Box flex="1">
//                 <Stack spacing={1} align="start">
//                   <Box fontWeight="medium">Domain Found</Box>
//                   // <Box fontWeight="normal">{data.unique_domain.toLocaleString()}</Box>
//                   <StatusCount count={data.unique_domain.toLocaleString()} isSuccess={true} />
//                 </Stack>
//               </Box>
//               <Divider orientation="vertical" height="40px" mx={2} borderWidth="1px" borderColor={dividerColor} />
//               <Box flex="1">
//                 <Stack spacing={1} align="start">
//                   <Box fontWeight="medium">Not Found</Box>
//                   // <Box fontWeight="normal">{data.not_found_domain.toLocaleString()}</Box>
//                   <StatusCount count={data.not_found_domain.toLocaleString()} isSuccess={false} />
//                 </Stack>
//               </Box>
//             </Flex> */}

//           </CardBody>
//         </Card>
//   );

//   return (
//     <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
//       <Stack spacing={4} direction="column" align="center" mb={8}>
//         <Input
//           placeholder="Enter Task ID"
//           type="number"
//           value={taskId ?? ''}
//           onChange={(e) => setTaskId(Number(e.target.value))}
//           width="200px"
//         />
//         <Button colorScheme="blue" onClick={handleFetchData}>Fetch Counts</Button>
//       </Stack>

//       <SimpleGrid
//         columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
//         gap="20px"
//         mb="20px"
//       >
//         {renderCard()}
//         {renderCard()}
//         {renderCard()}
//       </SimpleGrid>  
//     </Box>
//   );


//   // return (
//   //   <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
//   //     <SimpleGrid
//   //       columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
//   //       gap="20px"
//   //       mb="20px"
//   //     >
//   //       <MiniStatistics
//   //         startContent={
//   //           <IconBox
//   //             w="56px"
//   //             h="56px"
//   //             bg={boxBg}
//   //             icon={
//   //               <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
//   //             }
//   //           />
//   //         }
//   //         name="Earnings"
//   //         value="$350.4"
//   //       />
//   //       <MiniStatistics
//   //         startContent={
//   //           <IconBox
//   //             w="56px"
//   //             h="56px"
//   //             bg={boxBg}
//   //             icon={
//   //               <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
//   //             }
//   //           />
//   //         }
//   //         name="Spend this month"
//   //         value="$642.39"
//   //       />
//   //       <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
//   //       <MiniStatistics
//   //         endContent={
//   //           <Flex me="-16px" mt="10px">
//   //             <FormLabel htmlFor="balance">
//   //               <Box boxSize={'12'}>
//   //                 <Image alt="" src={Usa.src} w={'100%'} h={'100%'} />
//   //               </Box>
//   //             </FormLabel>
//   //             <Select
//   //               id="balance"
//   //               variant="mini"
//   //               mt="5px"
//   //               me="0px"
//   //               defaultValue="usd"
//   //             >
//   //               <option value="usd">USD</option>
//   //               <option value="eur">EUR</option>
//   //               <option value="gba">GBA</option>
//   //             </Select>
//   //           </Flex>
//   //         }
//   //         name="Your balance"
//   //         value="$1,000"
//   //       />
//   //       <MiniStatistics
//   //         startContent={
//   //           <IconBox
//   //             w="56px"
//   //             h="56px"
//   //             bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
//   //             icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
//   //           />
//   //         }
//   //         name="New Tasks"
//   //         value="154"
//   //       />
//   //       <MiniStatistics
//   //         startContent={
//   //           <IconBox
//   //             w="56px"
//   //             h="56px"
//   //             bg={boxBg}
//   //             icon={
//   //               <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
//   //             }
//   //           />
//   //         }
//   //         name="Total Projects"
//   //         value="2935"
//   //       />
//   //     </SimpleGrid>

//   //     <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
//   //       <TotalSpent />
//   //       <WeeklyRevenue />
//   //     </SimpleGrid>
//   //     <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
//   //       <CheckTable tableData={tableDataCheck} />
//   //       <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
//   //         <DailyTraffic />
//   //         <PieCard />
//   //       </SimpleGrid>
//   //     </SimpleGrid>
//   //     <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
//   //       <ComplexTable tableData={tableDataComplex} />
//   //       <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
//   //         <Tasks />
//   //         {/* <MiniCalendar h="100%" minW="100%" selectRange={false} /> */}
//   //       </SimpleGrid>
//   //     </SimpleGrid>
//   //   </Box>
//   // );
// }


const Default: React.FC = () => {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [countData, setCountData] = useState({
    product: { product_total_count: 0, product_pending_count: 0, product_processed_count: 0 },
    list: { list_total_count: 0, list_pending_count: 0, list_processed_count: 0 },
    seller: { seller_total_count: 0, seller_pending_count: 0, seller_processed_count: 0 },
  });
  const [tableName, setTableName] = useState<string>('');
  const [dropdownDataCategory, setDropdownDataCategory] = useState([]);
  const [dropdownDataSubCategory, setDropdownDataSubCategory] = useState([]);
  const [dropdownDataDatapoints, setDropdownDataDatapoints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [dropdownDataCity, setDropdownDataCity] = useState([]);
  const [dropdownDataCountry, setDropdownDataCountry] = useState([]);
  const [dropdownDataState, setDropdownDataState] = useState([]);
  const [selectedCity,setSelectedCity] = useState('')
  const [selectedState,setSelectedState] = useState('')
  const [selectedCountry,setSelectedCountry] = useState('')
  const [amazonData, setAmazonsData] = useState([]);
  const [activeTab, setActiveTab] = useState(0); 
  // const []
  // const [category, setCategory] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    product: [],
    list: [],
    seller: [],
  });
  const [filteredData, setFilteredData] = useState({ products: [], lists: [], sellers: [] });
  const toast = useToast(); // Initialize the toast hook


  useEffect(() => {
    if (!taskId) return;
    fetchApiData(taskId);
  }, [taskId, selectedCategory, selectedSubCategory, activeTab, tableName, selectedCity, selectedState, selectedCountry]);

  const fetchApiData = async (task_id: number | null) => {
    if (!task_id) throw new Error("Task ID is not found");
    try {
        
      const formData = new FormData();
      formData.append('task_id', task_id.toString());
      
        if (activeTab==1){
          setTableName('PRODUCT_LIST_DATA')
        }
        else if (activeTab==2){
          setTableName('SELLER_DATA')
        }
        else{
          setTableName('PRODUCT_DETAIL_DATA')
        }
        formData.append('table_name', tableName);
  
      if (selectedCategory) {
        formData.append('mapped_category', selectedCategory);
      }
  
      // Only append sub_category if it's selected
      if (selectedSubCategory && selectedSubCategory.trim() !== "") {
        console.log(selectedSubCategory);
        formData.append('sub_category', selectedSubCategory);
      }

      if(selectedCity){
        formData.append('city',selectedCity)
      }

      if(selectedState){
        formData.append('state',selectedState)
      }

      if(selectedCountry){
        formData.append('country',selectedCountry)
      }
  
      console.log('i am here',formData);
      const response = await axios.post(
        `${BACKEND_DOMAIN}/plugin_insights/`,
        formData, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  
            'Authorization': token,
          },
        }
      );

      console.log('API Response:', response.data.data);
      setAmazonsData(response.data.data);  
    } catch (error: unknown) {

      //  ADD TOAST HERE
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error status:', error.response.status);
          console.error('Error details:', error.response.data);
          
          if (error.response.data && error.response.data.detail) {
            console.error('Error detail:', error.response.data.detail);
          }
        } else {
          console.error('API Error:', error.message);
        }
      } else if (error instanceof Error) {
        console.error('General Error:', error.message);
      } else {
        console.error('Unknown error occurred');
      }
    }
  };


  const fetchStatsData = async (task_id: number) => {
    if (!task_id) return;
    try {
      const formData = new FormData();
      formData.append('task_id', task_id.toString());
      const response = await axios.post(
        `${BACKEND_DOMAIN}/get_plugin_stats/`,
        formData, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  
            'Authorization': token,
          },
        }
      );

      console.log('API Response:', response);
      const alldata = response.data;
      if (alldata && alldata.count) {
        setCountData(alldata.count);
        toast({
          title: "Data Found",
          description: "Counts have been successfully retrieved.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "No Data Found",
          description: "No counts were found for the provided Task ID.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      // setStatsData(response.data.data);
      }
    }
    catch(e){
      console.log("fenil",e);
    }
  }

  useEffect(()=>{
    const fetchdropDownData = async(task_id: number) =>{
      if(!taskId) return
      try{
        const filter_table_data= activeTab==1 ? 'PRODUCT_LIST_DATA' : activeTab==2 ? 'SELLER_DATA' : 'PRODUCT_DETAIL_DATA' 
        const response = await axios.get(`${BACKEND_DOMAIN}/get-data/?task_id=${task_id}&table_name=${filter_table_data}`, {
          headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token,  
        }
      })

      const data  = response.data.data;

      if(data) {
        if(data.category)setDropdownDataCategory(data.category);
        if(data.sub_category)setDropdownDataSubCategory(data.sub_category);
        if(data.datapoint)setDropdownDataDatapoints(data.datapoint);
        if(data.city)setDropdownDataCity(data.city);
        if(data.state)setDropdownDataState(data.state);
        if(data.country)setDropdownDataCountry(data.country);
      }
    }
    catch(e){
      console.log("fenil",e);
    }
  }
  fetchdropDownData(taskId)
},[taskId,activeTab])
  

  // Handle button click
  const handleFetchData = () => {
    // fetchApiData(taskId);
    fetchStatsData(taskId);
  };

  const brandColor = useColorModeValue('brand.500', 'white');
  const dividerColor = useColorModeValue("blue.600", "blue.300");
  const hasTaskId = taskId !== null && taskId.toString() !== '';

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };
  
// const renderTable = (data: any[], config: { columns: string[], headers: string[] }, category?: string[], subCategory?: string[], city?: string[], state?: string[], country?: string[], activeTab?: number) => (
const renderTable = (data: any[], config: { columns: string[], headers: string[] }, category?: string[], subCategory?: string[], country?: string[], state?: string[], city?: string[], activeTab?: number) => (
  <Box 
    maxHeight="500px" 
    maxWidth="1200px" 
    overflowY="auto" 
    overflowX="auto" 
    border="2px solid" 
    borderColor="gray.300" 
    rounded="lg"
  >
    <Table 
      variant="striped" 
      colorScheme="gray" 
      minWidth="1000px" 
    >
    <Thead position="sticky" top="0" bg="gray.100" zIndex="1">
      <Tr className='flex justify-between align-items-center'>
        {config.headers.map((header, index) => (
          <Th key={index} width="200px">
            <HStack justifyContent={"center"}  align="center">
              <span>{header}</span>
              {header === "Category" && activeTab!=2 &&
                <Select placeholder='Select Category' width="100px" onChange={(e)=>setSelectedCategory(e.target.value)}>
                {
                  category?.map((category,index) => (
                    <option key={index} value={category}>{category}</option>
                  )) 
                }
                </Select>
              }
              {header === "Sub-Category" && activeTab!=2 &&
                <Select placeholder='Select Sub-Category' width="100px" onChange={(e)=>setSelectedSubCategory(e.target.value)}>
                {
                  subCategory?.map((subCategory,index) => (
                    <option key={index} value={subCategory}>{subCategory}</option>
                  )) 
                }
                </Select>
              }
              {header === "City" &&
                <Select placeholder='Select City' width="100px" onChange={(e)=>setSelectedCity(e.target.value)}>
                {
                  city?.map((city,index) => (
                    <option key={index} value={city}>{city}</option>
                  )) 
                }
                </Select>
              }
                {header === "State" &&
                <Select placeholder='Select State' width="100px" onChange={(e)=>setSelectedState(e.target.value)}>
                {
                  state?.map((state,index) => (
                    <option key={index} value={state}>{state}</option>
                  )) 
                }
                </Select>
              }
              {header === "Country" &&
                <Select placeholder='Select Country' width="100px" onChange={(e)=>setSelectedCountry(e.target.value)}>
                {
                  country?.map((country,index) => (
                    <option key={index} value={country}>{country}</option>
                  )) 
                }
                </Select>
              }
            </HStack>
          </Th>
        ))}
      </Tr>
    </Thead>

    <Tbody>
      {data?.map((row, index) => {
        return(
        <Tr key={index} border="2px solid" borderColor="gray.200">
          {config.columns.map((column,index) => (
            <Td key={index} width="200px" textAlign="center">
              {row[column]}
            </Td>
          ))}
        </Tr>
      )})}
    
    </Tbody>

    </Table>
  </Box>
);

  return (
    <Box py={4} overflow="visible" position="relative">
      <Flex mb={4} direction="column" position="relative">
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
          <Flex alignItems="center" gap={6} flexWrap="wrap" justify="space-between">
            <Stack direction="column" spacing={2} alignItems="center">
              <FormControl isRequired>
                <Box position="relative">
                  <Input
                    id="task-id"
                    type="number"
                    
                    value={taskId ?? ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTaskId(value === '' ? null : Number(value));
                    }}
                    placeholder=" "
                    _placeholder={{ color: 'transparent' }} 
                    _focus={{ borderColor: 'blue.400' }} 
                    _hover={{ borderColor: 'blue.300' }} 
                  />
                  <FormLabel 
                    position="absolute"
                    top={hasTaskId ? '-6px' : '50%'}
                    left="10px"
                    px={2}
                    color={hasTaskId ? 'black.500' : 'gray.500'}
                    fontWeight={hasTaskId ? 'bold' : 'normal'}
                    fontSize={hasTaskId ? 'sm' : 'md'}
                    transform={hasTaskId ? 'translateY(-100%) translateX(-15%)' : 'translateY(-50%)'}
                    transition="all 0.2s ease-in-out"
                  >
                    Task ID
                  </FormLabel>
                </Box>
              </FormControl>
              <Button colorScheme="blue" onClick={handleFetchData} >
                Fetch Counts
              </Button>
            </Stack>

            {/* Cards for counts */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px" flex="1" >
              {/* Render Product Card */}
              <Card height="175px">
                <CardHeader p="4">
                  <Heading
                    textAlign="start"
                    fontWeight="bold"
                    fontSize={{ base: "md", md: "lg" }}
                    color={"black"}>Amazon Product Details</Heading>
                </CardHeader>
                <Divider borderColor="gray.300" borderWidth="1px" width="90%" mx="auto" />
                <CardBody p="3">
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Pending: {countData.product.product_pending_count}</Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Processed: {countData.product.product_processed_count}</Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Total: {countData.product.product_total_count}</Text>
                </CardBody>
              </Card>

              <Card height="175px">
                <CardHeader p="4">
                  <Heading
                    textAlign="start"
                    fontWeight="bold"
                    fontSize={{ base: "md", md: "lg" }}
                    color={"black"}>Amazon Product List</Heading>
                </CardHeader>
                <Divider borderColor="gray.300" borderWidth="1px" width="90%" mx="auto" />
                <CardBody p="3">
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Pending: {countData.list.list_pending_count}</Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Processed: {countData.list.list_processed_count}</Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Total: {countData.list.list_total_count}</Text>
                </CardBody>
              </Card>

              {/* Render Seller Card */}
              <Card height="175px">
                <CardHeader p="4">
                  <Heading
                    textAlign="start"
                    fontWeight="bold"
                    fontSize={{ base: "md", md: "lg" }}
                    color={"black"}>Amazon Seller Details</Heading>
                </CardHeader>
                <Divider borderColor="gray.300" borderWidth="1px" width="90%" mx="auto" />
                <CardBody p="3">
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Pending: {countData.seller.seller_pending_count}</Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Processed: {countData.seller.seller_processed_count}</Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Total: {countData.seller.seller_total_count}</Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Flex>
        </Box>
      </Flex>
      <Flex mt={2} direction="row" align="flex-start">
        { /*isLoading ? (
          <Spinner />
        ) : */ ( 
          <Box 
            flex="1"
          >
            <Tabs position='relative' variant='unstyled' onChange={handleTabChange} isLazy>
            <TabList>
              <Tab _selected={{ fontWeight: 'bold' }}>
                Amazon Product Details {activeTab === 0 && <Text as="span" fontSize="sm"></Text>}
              </Tab>
              <Tab _selected={{ fontWeight: 'bold' }}>
                Amazon Product Lists {activeTab === 1 && <Text as="span" fontSize="sm"></Text>}
              </Tab>
              <Tab _selected={{ fontWeight: 'bold' }}>
                Amazon Seller Details {activeTab === 2 && <Text as="span" fontSize="sm"></Text>}
              </Tab>
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
              <TabPanels>
                <TabPanel>
                  {renderTable(amazonData, {
                      columns: ["mapped_category", "sub_category", "total_counts"],
                      headers: ["Category", "Sub-Category", "Count"]},
                      dropdownDataCategory,
                      dropdownDataSubCategory,
                      null,
                      null,
                      null,
                      activeTab
                    )
                  }
                </TabPanel>
                <TabPanel>
                  {renderTable(amazonData, {
                      columns: ["mapped_category", "sub_category", "total_counts"],
                      headers: ["Category", "Sub-Category", "Count"]},
                      dropdownDataCategory,
                      dropdownDataSubCategory,
                      null,
                      null,
                      null,
                      activeTab
                    )
                  }
                </TabPanel>
                <TabPanel>
                  {renderTable(amazonData, {
                      columns: ["country", "city", "state", "total_counts"],
                      headers: ["Country", "State", "City", "Count"]},
                      null,
                      null,
                      dropdownDataCountry,
                      dropdownDataState,
                      dropdownDataCity,
                      activeTab
                    )
                  }
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          )}
      </Flex>
    </Box>
  );
};

export default Default;