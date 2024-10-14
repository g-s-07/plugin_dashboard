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
  HStack,
  Spacer,
  Tfoot,
  StatGroup,
  StatLabel,
  Stat,
  StatNumber
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
// import { IoAdd, IoRemove } from 'react-icons/io5';
import { IoMdDownload } from "react-icons/io";
import Select from 'react-select';
import axios from 'axios';
import { BACKEND_DOMAIN, token } from '../../../../urls';
import { saveAs } from 'file-saver';
import { convertToCSV } from 'utils/converttocsv';

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

interface CountDataType {
  product?: {
    product_total_count?: number;
    product_success_count?: number;
    product_processed_count?: number;
    product_pending_count?: number;
    product_missed_count?: number;
  };
  list?: {
    list_total_count?: number;
    list_success_count?: number
    list_processed_count?: number
    list_pending_count?: number
    list_missed_count?: number
  };
  seller?: {
    seller_total_count?: number;
    seller_success_count?: number
    seller_processed_count?: number
    seller_pending_count?: number
    seller_missed_count?: number
  };
}


const Default: React.FC = () => {
  const [statsloading, setStatsLoading] = useState(false);
  const [tableloading, setTableLoading] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [countData, setCountData] = useState<CountDataType>({ product: {
    product_total_count: 0,
    product_success_count: 0,
    product_processed_count:0,
    product_pending_count:0, 
    product_missed_count: 0,
  },
  list: {
    list_total_count: 0,
    list_success_count: 0,
    list_processed_count: 0,
    list_pending_count: 0, 
    list_missed_count: 0
  },
  seller: {
    seller_total_count: 0,
    seller_success_count: 0,
    seller_processed_count: 0,
    seller_pending_count: 0,
    seller_missed_count: 0,
  }});
  const [dropdownDataCategory, setDropdownDataCategory] = useState([]);
  const [dropdownDataSubCategory, setDropdownDataSubCategory] = useState([]);
  const [dropdownDataDatapoints, setDropdownDataDatapoints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [dropdownDataCity, setDropdownDataCity] = useState([]);
  const [dropdownDataCountry, setDropdownDataCountry] = useState([]);
  const [dropdownDataState, setDropdownDataState] = useState([]);
  const [selectedCity,setSelectedCity] = useState([])
  const [selectedState,setSelectedState] = useState([])
  const [selectedCountry,setSelectedCountry] = useState([])
  const [amazonProductData, setAmazonsProductData] = useState([]);
  const [amazonListData, setAmazonsListData] = useState([]);
  const [amazonSellerData, setAmazonsSellerData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);


  const seller_data = amazonSellerData


  const toast = useToast();

  const convertToOptions = (items: string[] | undefined) =>
    items?.map(item => ({ value: item, label: item })) || [];


  useEffect(() => {
    if (taskId !== null) {
      fetchApiData(taskId);
    }
  }, [selectedCategory, selectedSubCategory, activeTab, selectedCity, selectedState, selectedCountry]);

  
  const fetchApiData = async (task_id: number | null) => {
    if (!task_id) throw new Error("Task ID not found");
    setTableLoading(true);
    try {
      
      let tableName= ''
        
      const formData = new FormData();
      formData.append('task_id', task_id.toString());
      
        if (activeTab==1){
          tableName = 'PRODUCT_LIST_DATA'
        }
        else if (activeTab==2){
          tableName = 'SELLER_DATA'
        }
        else{
          tableName = 'PRODUCT_DETAIL_DATA'
        }
        formData.append('table_name', tableName);
  
      if (selectedCategory) {
        formData.append('mapped_category', selectedCategory.join(','));
      }
  
      if (selectedSubCategory) {
        formData.append('sub_category', selectedSubCategory.join(','));
      }

      if(selectedCity){
        formData.append('city',selectedCity.join(','))
      }

      if(selectedState){
        formData.append('state',selectedState.join(','))
      }

      if(selectedCountry){
        formData.append('country',selectedCountry.join(','))
      }
  
      console.log(tableName);
      const response = await axios.post(`${BACKEND_DOMAIN}/plugin_insights/`,
        formData, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  
            'Authorization': token,
          },
        }
      );

      activeTab==0 ? setAmazonsProductData(response.data.data) : activeTab==1 ? setAmazonsListData(response.data.data) : setAmazonsSellerData(response.data.data); 
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
    }finally {
      setTableLoading(false);
    }
  };


  const fetchStatsData = async (task_id: number) => {
    if (!task_id) return;
    setStatsLoading(true); 
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
      }
    }
    catch(error:any){
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }finally {
      setStatsLoading(false);
    }
  }

  const downloadData = (task_id: number) => {
    console.log("gaurav");
    if (!task_id) throw new Error("Please Mention the Task ID");
    try{
      console.log(seller_data);
      console.log("gaurav111222");
      const csvData = convertToCSV(seller_data)
      console.log("gaurav111");
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `seller_details${task_id}.csv`);
    }
    catch(error:any){
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const fetchdropDownData = async(task_id: number) =>{
    if (!task_id) return;
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
    catch(error:any){
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(()=>{
    fetchdropDownData(taskId)
},[activeTab])


const get_skeleton = (type:string) => {
  if(type=='stats'){
    return (
      <>
        <Skeleton height="25px" color={"gray.900"} mb={2}/>
      </>
    )
  }
  else{
    return (
      <>
        <Skeleton startColor='white.100' endColor='gray.100' height='30px' mb={2} rounded={"md"}/>
        <Skeleton startColor='white.100' endColor='gray.300' height='30px' mb={2} rounded={"md"}/>
        <Skeleton startColor='white.100' endColor='gray.500' height='30px' mb={2} rounded={"md"}/>
        <Skeleton startColor='white.100' endColor='gray.700' height='30px' mb={2} rounded={"md"}/>
        <Skeleton startColor='white.100' endColor='gray.900' height='30px' mb={2} rounded={"md"}/>
        <Skeleton startColor='white.100' endColor='gray.900' height='30px' mb={2} rounded={"md"}/>
        <Skeleton startColor='white.100' endColor='gray.900' height='30px' mb={2} rounded={"md"}/>
      </>
    )
  }
}


  const dividerColor = useColorModeValue("pink.600", "pink.300");
  const hasTaskId = taskId !== null && taskId.toString() !== '';

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };
  
const renderTable = (
    data: any[], 
    config: { 
      columns: string[], 
      headers: string[] 
    }, 
    category?: string[], 
    subCategory?: string[], 
    country?: string[], 
    state?: string[], 
    city?: string[], 
    activeTab?: number)=> 
    
      
      (
    <Box
      maxHeight="500px"
      maxWidth="full"
      overflowY="auto"
      overflowX="auto"
      border="2px solid"
      borderColor="gray.300"
      rounded="lg"
      position="relative" 
    >
      <Table variant="striped" colorScheme="gray" minWidth="1000px">
        <Thead position="sticky" top="0" bg="gray.100" zIndex="1">
          <Tr className="flex justify-between align-items-center flex-wrap">
            {config.headers.map((header, index) => (
              <Th key={index} width="200px" flexWrap="wrap" position="relative">
                <HStack justifyContent={"center"} align="center">
                  <span>{header}</span>
                  {header === "Category" && activeTab !== 2 && (
                    <Select
                      options={convertToOptions(category)}
                      isMulti // Enable multi-select
                      value={selectedCategory.map(cat => ({ value: cat, label: cat }))}
                      onChange={(selectedOptions) =>
                        setSelectedCategory(selectedOptions.map((option) => option.value))
                      }
                      placeholder="Select Categories"
                      className="w-[100px]"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 50 }),
                      }}
                      menuPortalTarget={document.body}
                    />
                  )}
                  {header === "Sub-Category" && activeTab !== 2 && (
                    <Select
                      options={convertToOptions(subCategory)}
                      isMulti
                      value={selectedSubCategory.map(cat => ({ value: cat, label: cat }))}
                      onChange={(selectedOptions) =>
                        setSelectedSubCategory(selectedOptions.map((option) => option.value))
                      }
                      placeholder="Select Sub-Categories"
                      className="w-[100px]"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 50 }), 
                      }}
                      menuPortalTarget={document.body} 
                    />
                  )}
                  {header === "City" && (
                    <Select
                      options={convertToOptions(city)}
                      isMulti
                      value={selectedCity.map(cat => ({ value: cat, label: cat }))}
                      onChange={(selectedOptions) =>
                        setSelectedCity(selectedOptions.map((option) => option.value))
                      }
                      placeholder="Select City"
                      className="w-[100px]"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 50 }),
                      }}
                      menuPortalTarget={document.body}
                    />
                  )}
                  {header === "State" && (
                    <Select
                      options={convertToOptions(state)}
                      isMulti
                      value={selectedState.map(cat => ({ value: cat, label: cat }))}
                      onChange={(selectedOptions) =>
                        setSelectedState(selectedOptions.map((option) => option.value))
                      }
                      placeholder="Select State"
                      className="w-[100px]"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 50 }), 
                      }}
                      menuPortalTarget={document.body}
                    />
                  )}
                  {header === "Country" && (
                    <Select
                      options={convertToOptions(country)}
                      isMulti
                      value={selectedCountry.map(cat => ({ value: cat, label: cat }))}
                      onChange={(selectedOptions) =>
                        setSelectedCountry(selectedOptions.map((option) => option.value))
                      }
                      placeholder="Select Country"
                      className="w-[100px]"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 50 }),
                      }}
                      menuPortalTarget={document.body}
                    />
                  )}
                </HStack>
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody flexWrap="wrap">
          {data?.map((row, index) => (
            <Tr key={index} border="2px solid" borderColor="gray.200">
              {config.columns.map((column, index) => (
                <Td key={index} width="200px" textAlign="center">
                  {row[column]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
);



  return (
    <Box py={4} overflow="visible" position="relative" className='flex flex-wrap'>
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
              <Button colorScheme="blue" onClick={() => [fetchStatsData(taskId), fetchApiData(taskId), fetchdropDownData(taskId)]} >
                Fetch Counts
              </Button>
            </Stack>

            {/* Cards for counts */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px" flex="1" >
              {/* Render Product Card */}
              <Card height="200px">
                <CardHeader p="4">
                  <Heading
                    textAlign="start"
                    fontWeight="bold"
                    fontSize={{ base: "sm", md: "lg" }}
                    color={"black"}>Amazon Product Details
                  </Heading>
                  <Box mt="3" textAlign={"center"}>
                    <StatGroup>
                      <Stat>
                        <StatLabel>Total</StatLabel>
                        <StatNumber
                          fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.product?.product_total_count}</StatNumber>
                      </Stat>
                      <Divider borderColor="gray.400" borderWidth="1px" height="45px" orientation="vertical" mx={2} />
                      <Stat>
                        <StatLabel>Ready</StatLabel>
                        <StatNumber
                          fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.product?.product_success_count}</StatNumber>
                      </Stat>
                    </StatGroup>
                  </Box>
                </CardHeader>
                <Divider color={dividerColor} borderWidth="1px" width="90%" mx="auto" />
                <CardBody p="3" textAlign={"center"}>
                  <StatGroup>
                    <Stat>
                      <StatLabel>Processed</StatLabel>
                      <StatNumber
                        fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.product?.product_processed_count}</StatNumber>
                    </Stat>
                    <Divider borderColor="gray.400" borderWidth="1px" height="45px" orientation="vertical" mx={2} />
                    <Stat>
                      <StatLabel>Pending</StatLabel>
                      <StatNumber
                        fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.product?.product_pending_count}</StatNumber>
                    </Stat>
                    <Divider borderColor="gray.400" borderWidth="1px" height="45px" orientation="vertical" mx={2} />
                    <Stat>
                      <StatLabel>Missed</StatLabel>
                      <StatNumber
                        fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.product?.product_missed_count}</StatNumber>
                    </Stat>
                  </StatGroup>
                </CardBody>
              </Card>

              <Card height="200px">
                <CardHeader p="4">
                  <Heading
                    textAlign="start"
                    fontWeight="bold"
                    fontSize={{ base: "md", md: "lg" }}
                    color={"black"}>Amazon Product List
                  </Heading>
                  <Box mt="3" textAlign={"center"}>
                    <StatGroup>
                      <Stat>
                        <StatLabel>Total</StatLabel>
                        <StatNumber
                          fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.list?.list_total_count}</StatNumber>
                      </Stat>
                      <Divider borderColor="gray.400" borderWidth="1px" height="45px" orientation="vertical" mx={2} />
                      <Stat>
                        <StatLabel>Ready</StatLabel>
                        <StatNumber
                          fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.list?.list_success_count}</StatNumber>
                      </Stat>
                    </StatGroup>
                  </Box>
                </CardHeader>
                <Divider color={dividerColor} borderWidth="1px" width="90%" mx="auto" />
                <CardBody p="3" textAlign={"center"}>
                  <StatGroup>
                    <Stat>
                      <StatLabel>Processed</StatLabel>
                      <StatNumber
                        fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.list?.list_processed_count}</StatNumber>
                    </Stat>
                    <Divider borderColor="gray.400" borderWidth="1px" height="45px" orientation="vertical" mx={2} />
                    <Stat>
                      <StatLabel>Pending</StatLabel>
                      <StatNumber
                        fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.list?.list_pending_count}</StatNumber>
                    </Stat>
                    <Divider borderColor="gray.400" borderWidth="1px" height="45px" orientation="vertical" mx={2} />
                    <Stat>
                      <StatLabel>Missed</StatLabel>
                      <StatNumber
                        fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.list?.list_missed_count}</StatNumber>
                    </Stat>
                  </StatGroup>
                </CardBody>
              </Card>

              {/* Render Seller Card */}
              <Card height="200px">
                <CardHeader p="4">
                  <Heading
                    textAlign="start"
                    fontWeight="bold"
                    fontSize={{ base: "md", md: "lg" }}
                    color={"black"}>Amazon Seller Details
                  </Heading>
                  <Box mt="3" textAlign={"center"}>
                    <StatGroup >
                      <Stat>
                        <StatLabel>Total</StatLabel>
                        <StatNumber
                          fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.seller?.seller_total_count}</StatNumber>
                      </Stat>
                      <Divider borderColor="gray.400" borderWidth="1px" height="45px" orientation="vertical" mx={2} />
                      <Stat>
                        <StatLabel>Ready</StatLabel>
                        <StatNumber
                          fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.seller?.seller_success_count}</StatNumber>
                      </Stat>
                    </StatGroup>
                  </Box>
                </CardHeader>
                <Divider color={dividerColor} borderWidth="1px" width="90%" mx="auto" />
                <CardBody p="3" textAlign={"center"}>
                  <StatGroup>
                    <Stat>
                      <StatLabel>Processed</StatLabel>
                      <StatNumber
                        fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.seller?.seller_processed_count}</StatNumber>
                    </Stat>
                    <Divider borderColor="gray.400" borderWidth="1px" height="45px" orientation="vertical" mx={2} />
                    <Stat>
                      <StatLabel>Pending</StatLabel>
                      <StatNumber
                        fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.seller?.seller_pending_count}</StatNumber>
                    </Stat>
                    <Divider borderColor="gray.400" borderWidth="1px" height="45px" orientation="vertical" mx={2} />
                    <Stat>
                      <StatLabel>Missed</StatLabel>
                      <StatNumber
                        fontSize={{ base: "md", md: "lg" }}>{statsloading ? get_skeleton('stats') : countData.seller?.seller_missed_count}</StatNumber>
                    </Stat>
                  </StatGroup>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Flex>
        </Box>
      </Flex>
      <Flex mt={2} direction="row" align="flex-start" flexWrap="wrap" width=''>
          {taskId ? (<Box 
            flex="1"
            flexWrap="wrap"          
            >
            <Tabs position='relative' variant='unstyled' flexWrap="wrap" onChange={handleTabChange} isLazy>
            <TabList flexWrap="wrap">
              {/* <Box> */}
                <Tab _selected={{ fontWeight: 'bold' }}>
                  Amazon Product Details {activeTab === 0 && <Text as="span" fontSize="sm"></Text>}
                </Tab>
                <Tab _selected={{ fontWeight: 'bold' }}>
                  Amazon Product Lists {activeTab === 1 && <Text as="span" fontSize="sm"></Text>}
                </Tab>
                <Tab _selected={{ fontWeight: 'bold' }}>
                  Amazon Seller Details {activeTab === 2 && <Text as="span" fontSize="sm"></Text>}
                </Tab>
                <Spacer />
              {/* </Box> */}
              {
                activeTab==2 &&
                <Box 
                  display={'flex'} 
                  bg={'green.500'}
                  rounded={'full'}
                  width={'60px'}
                  fontWeight={'bold'} 
                  alignItems={'center'}
                  >
                  
                  <Icon
                      h="30px"
                      w="30px"
                      // px={2}
                      // justifyItems={"center"}
                      mx={"auto"}
                      justifyContent={"center"}
                      as={IoMdDownload}
                      cursor={'pointer'}
                      color={'white'}
                      onClick={()=> downloadData(taskId)}
                      >
                    </Icon>
              </Box>
            }
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
            {tableloading ? get_skeleton('table') : 
              (<TabPanels>
                <TabPanel>
                  {renderTable(amazonProductData, {
                      columns: ["mapped_category", "sub_category", "total_counts"],
                      headers: ["Category", "Sub-Category", "Count"]},
                      dropdownDataCategory,
                      dropdownDataSubCategory,
                      null,
                      null,
                      null,
                      activeTab
                  )}
                </TabPanel>
                <TabPanel>
                  {renderTable(amazonListData, {
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
                  {renderTable(amazonSellerData, {
                    columns: ["city", "state", "country", "total_counts"],
                    headers: ["City", "State", "Country", "Count"]},
                    null,
                    null,
                    dropdownDataCountry,
                    dropdownDataState,
                    dropdownDataCity,
                    activeTab
                  )
                  }
                </TabPanel>
              </TabPanels>)}
            </Tabs>
          </Box>): null}
      </Flex>
    </Box>
  );
};


export default Default;
/*isLoading ? (
  <Spinner />
  ) : */  
// )}