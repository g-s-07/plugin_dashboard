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
  Spacer
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


const Default: React.FC = () => {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [countData, setCountData] = useState({
    product: { product_total_count: 0, product_pending_count: 0, product_processed_count: 0 },
    list: { list_total_count: 0, list_pending_count: 0, list_processed_count: 0 },
    seller: { seller_total_count: 0, seller_pending_count: 0, seller_processed_count: 0 },
  });
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
    }
  }

  const downloadData = (task_id: number) => {
    if (!task_id) throw new Error("Please Mention the Task ID");
    try{
      const formData = new FormData();
      formData.append('task_id', task_id.toString());

      axios.get(`${BACKEND_DOMAIN}/download_data/?task_id=${task_id}&city=${selectedCity}&state=${selectedState}&country=${selectedCountry}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Authorization': token,
          },
        }
      ).then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
      })
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


  const brandColor = useColorModeValue('brand.500', 'white');
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
    activeTab?: number)=> (
    <Box 
      maxHeight="500px" 
      maxWidth="full" 
      overflowY="auto" 
      overflowX="auto" 
      border="2px solid" 
      borderColor="gray.300" 
      rounded="lg"
      flexWrap="wrap"
    >
    <Table 
      variant="striped" 
      colorScheme="gray" 
      minWidth="1000px" 
    >
    <Thead position="sticky" top="0" bg="gray.100" zIndex="1" flexWrap="wrap">
      <Tr className='flex justify-between align-items-center flex-wrap'>
        {config.headers.map((header, index) => (
          <Th key={index} width="200px" flexWrap="wrap">
            <HStack justifyContent={"center"}  align="center">
              <span>{header}</span>
              {header === "Category" && activeTab!=2 &&
                <Select
                  options={convertToOptions(category)}
                  isMulti // Enable multi-select
                  value={selectedCategory.map(cat => ({ value: cat, label: cat }))}
                  onChange={(selectedOptions) => 
                    setSelectedCategory(selectedOptions.map((option) => option.value))
                  }
                  placeholder="Select Categories"
                  className="w-[100px]"
                />
              }
              {header === "Sub-Category" && activeTab!=2 &&
               <Select
                  options={convertToOptions(subCategory)}
                  isMulti
                  value={selectedSubCategory.map(cat => ({ value: cat, label: cat }))}
                  onChange={(selectedOptions) => 
                    setSelectedSubCategory(selectedOptions.map((option) => option.value))
                  }
                  placeholder="Select Sub-Categories"
                  className="w-[100px]"
                />
              }
              {header === "City" &&
                 <Select
                 options={convertToOptions(city)}
                 isMulti
                 value={selectedCity.map(cat => ({ value: cat, label: cat }))}
                 onChange={(selectedOptions) => 
                   setSelectedCity(selectedOptions.map((option) => option.value))
                 }
                 placeholder="Select City"
                 className="w-[100px]"
               />
              }
                {header === "State" &&
                 <Select
                 options={convertToOptions(state)}
                 isMulti
                 value={selectedState.map(cat => ({ value: cat, label: cat }))}
                 onChange={(selectedOptions) => 
                   setSelectedState(selectedOptions.map((option) => option.value))
                 }
                 placeholder="Select State"
                 className="w-[100px]"
               />
              }
              {header === "Country" &&
                 <Select
                 options={convertToOptions(country)}
                 isMulti
                 value={selectedCountry.map(cat => ({ value: cat, label: cat }))}
                 onChange={(selectedOptions) => 
                   setSelectedCountry(selectedOptions.map((option) => option.value))
                 }
                 placeholder="Select Country"
                 className="w-[100px]"
               />
              }
            </HStack>
          </Th>
        ))}
      </Tr>
    </Thead>

    <Tbody flexWrap="wrap">
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
              <Button colorScheme="blue" onClick={() => [fetchStatsData(taskId), fetchApiData(taskId), fetchdropDownData(taskId)] } >
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
                <Divider color={dividerColor} borderWidth="1px" width="90%" mx="auto" />
                <CardBody p="3">
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Pending: {countData.product.product_pending_count} - </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Processed: {countData.product.product_processed_count} - </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Total: {countData.product.product_total_count} - </Text>
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
                <Divider color={dividerColor} borderWidth="1px" width="90%" mx="auto" />
                <CardBody p="3">
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Pending: {countData.list.list_pending_count} - </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Processed: {countData.list.list_processed_count} - </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Total: {countData.list.list_total_count} - </Text>
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
                <Divider color={dividerColor} borderWidth="1px" width="90%" mx="auto" />
                <CardBody p="3">
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Pending: {countData.seller.seller_pending_count} - </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Processed: {countData.seller.seller_processed_count} - </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="medium"
                    mt={{ base: 2, md: 1 }}
                    flexShrink={0}>Total: {countData.seller.seller_total_count} - </Text>
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
                <Tab _selected={{ fontWeight: 'bold', alignItems: 'center' }}>
                <Button
                  colorScheme='green'
                  size={"md"}
                  onClick={() => downloadData(taskId)}
                  >
                  <Icon
                        h="24px"
                        w="30px"
                        as={IoMdDownload}
                        >
                    </Icon>
                    {/* {isTechDownloading ? <Spinner size="sm" /> : 'Download'} */}
                  </Button>
              </Tab>
            }
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
              <TabPanels>
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
                    )
                  }
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
              </TabPanels>
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