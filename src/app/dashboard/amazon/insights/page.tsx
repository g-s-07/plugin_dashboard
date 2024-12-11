"use client"
import { useState } from "react";
import { 
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useToast,
  Box,
  Card,
  Skeleton, Stack, Tab, TabList, TabPanel, TabPanels, Tabs,
  Text, 
  Spacer,
  FormControl,
  Input,
  FormLabel,
  Button,
  useColorModeValue,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllAmazonProductDetails } from "utils/api/amazon";
import JsonTreeDisplay from "components/jsonTree/jsonTree";
import axios from "axios";
import { BACKEND_DOMAIN, token } from "../../../../../urls";


export default function AmazonInsights() {
    const [activeTab, setActiveTab] = useState(0);
    const [taskId, setTaskId] = useState<number | null>(null);
    const textColor = useColorModeValue('navy.700', 'white');
    const toast = useToast();
    const colors = [
      useColorModeValue('red.400', 'red.500'),
      useColorModeValue('gray.300', 'gray.600'),
      useColorModeValue('yellow.300', 'yellow.500'),
      useColorModeValue('green.300', 'green.500'),
      useColorModeValue('purple.300', 'purple.600'),
    ]


    const {
      data: amazonList,
      error,
      isLoading,
      isSuccess,
      refetch
    } = useQuery({
      queryKey: ['dataAmazon', taskId],
      queryFn: () => getAllAmazonProductDetails(taskId),
      enabled: false
    });

  
    if (isLoading) {
      return (
        <Stack 
        direction={{ base: "column", md: "row" }} 
        spacing={4} 
        align="center" 
        wrap="wrap"
        width="full"
      >
      <Flex 
        direction="row" 
        wrap="wrap" 
        gap={4} 
        justify="space-between" 
        width="full"
      >
      <Flex gap={4}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton 
            borderRadius="2xl" 
            key={index} 
            width={{ base: "full", sm: "250px" }} 
            height="40px"
          >
            <Flex align="center" gap={1}>
              <Box width="full" height="30px" borderRadius="full" />
            </Flex>
          </Skeleton>
        ))}
      </Flex>

        <Skeleton 
          height="40px" 
          width={{ base: "full", sm: "250px" }} 
          alignSelf="flex-end"
        >
          <Flex justifyContent={"end"}>
            <Box bg="gray.100" borderRadius="3xl" width="full" height="full" />
          </Flex>
        </Skeleton>
      </Flex>
        <Skeleton 
          borderRadius="30px" 
          height="150px" 
          width={{ base: "full", md: "full" }}
          mt={{ base: 4, md: 0 }}
        >
          <Card
            width="full"
            bg="#ffffff1a"
            height="200px"
          />
        </Skeleton>
      </Stack>
      

      );
    }
  
    if (error) {
      toast.closeAll();
      toast({
          title: "Error",
          description: error?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
      });
      return null
    }

    if(amazonList?.data.length > 0 && isSuccess){
      toast.closeAll();
      toast({
          title: "Success",
          description: "Insights Fetched Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
       });
       
    }

    const fetchInsightsData = async (task_id: number | null) => {
      try {
        if (!task_id) throw new Error("Task ID not found");
        refetch();
      } catch (error) {
        console.log(error);
      }
    };

    const handleRefresh = async(task_id: number | null) => {
      try {
        if (!task_id) throw new Error("Please Enter Task ID");
        toast({
          id: `Refreshing Data for task_id - ${task_id}`,
          title: "Loading",
          description: `Refreshing data for task_id - ${task_id}...`,
          status: "loading",
          duration: null, 
          isClosable: false,
        });
        const response = await axios.get(`${BACKEND_DOMAIN}/refresh-task/?task_id=${task_id}`, 
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: token,
            },
          }
        )

        
        if (response.status==200) {
          console.log("i am response");
          toast.close(`Refreshing Data for-${task_id}`);
          fetchInsightsData(task_id);
        } 
      }catch (error) {
        toast.closeAll();
        toast({
            title: "Error",
            description: `Error: ${error}`,
            status: "error",
            duration: 3000,
            isClosable: true,
        });        
      }
    }


    return (
      <>
      <Tabs variant='soft-rounded'>
        <TabList>
          <Tab>
            Amazon Product Lists {activeTab === 0 && <Text as="span" fontSize="sm"></Text>}
          </Tab>
          <Tab>
            Amazon Product Details {activeTab === 1 && <Text as="span" fontSize="sm"></Text>}
          </Tab>
          <Tab>
            Amazon Seller Details {activeTab === 2 && <Text as="span" fontSize="sm"></Text>}
          </Tab>
          <Spacer/>
          <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          flex="0.5"
        >
          <FormControl isRequired>
            <Box position="relative">
              <Input
                id="task-id"
                type="number"
                value={taskId ?? ""}
                placeholder=" "
                onChange={(e) => {
                  const value = e.target.value;
                  setTaskId(value === "" ? null : Number(value));
                }}
                color={textColor}
                _focus={{ borderColor: "blue.400" }}
                _hover={{ borderColor: "blue.300" }}
              />
              <FormLabel
                htmlFor="task-id"
                position="absolute"
                top={taskId ? "-6px" : "50%"}
                left={2}
                px={1}
                color={taskId ? textColor : "gray.500"}
                fontWeight={taskId ? "bold" : "normal"}
                fontSize={taskId ? "sm" : "md"}
                transform={taskId ? "translateX(calc(-130%)) translateY(80%)": "translateY(-50%)"}
                transition="all 0.2s ease-in-out"
                pointerEvents="none"
              >
                Task ID
              </FormLabel>
            </Box>
          </FormControl>
          <Button
            bg="#01B574"
            onClick={() => fetchInsightsData(taskId)}
          >Fetch</Button>
        </Stack>

                </TabList>

                <TabPanels>
                  <TabPanel>
                      <Card
                          width={'full'}
                          bg={'#ffffff1a'}
                          brightness={0.2}
                          mt={4}
                          borderRadius={'20px'}
                        >
                        <Stack>
                          <Accordion
                            width={'full'}
                            borderColor={'transparent'}
                            allowMultiple
                            defaultIndex={[0]}
                          >
                            <AccordionItem>
                              <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <AccordionIcon />
                                </Box>
                                <Flex justifyContent={'end'} align="center" gap={2}>
                                    <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Amz</Text>
                                    <Text fontSize={'md'} fontWeight={'bold'}>= Amazon,</Text>
                                    <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Ip</Text>
                                    <Text fontSize={'md'} fontWeight={'bold'}>= Input,</Text>
                                    
                                    <Tooltip
                                    hasArrow
                                    aria-label="A updated time tooltip"
                                    label={
                                      amazonList?.data[3].modified_date
                                      ? `Last Modified: ${new Date(
                                          new Date(
                                            `${amazonList?.data[3].modified_date}`
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
                                      <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Ext</Text>
                                    </Tooltip>
                                    <Text fontSize={'md'} fontWeight={'bold'}>= Extracted</Text>
                                  
                                </Flex>
                                </AccordionButton>
                                <AccordionPanel>
                                  {
                                    amazonList?.data.length == 0 && taskId!=null
                                    ? 
                                    <Box 
                                      display={'flex'} 
                                      flexDirection={'column'} 
                                      justifyContent={'center'} 
                                      alignItems={'center'} 
                                      gap={2}
                                    >
                                      <Text fontSize={'md'} fontWeight={'bold'}>Please Refresh Data!</Text>
                                      <Button 
                                        onClick={() => handleRefresh(taskId)}
                                        bg={'#01B574'}
                                      > Refresh
                                      </Button>
                                    </Box>
                                    :
                                    <JsonTreeDisplay json={amazonList?.data[0]} />    
                                  }
                                </AccordionPanel>
                              </AccordionItem>
                          </Accordion>
                        </Stack>
                      </Card>  
                    </TabPanel>
                      <TabPanel>
                        <Card
                          width={'full'}
                          bg={'#ffffff1a'}
                          brightness={0.2}
                          mt={4}
                          borderRadius={'20px'}
                        >
                        <Stack>
                          <Accordion
                            width={'full'}
                            borderColor={'transparent'}
                            allowMultiple
                            defaultIndex={[0]}
                          >
                            <AccordionItem>
                              <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <AccordionIcon />
                                </Box>
                                <Flex justifyContent={'end'} align="center" gap={2}>
                                    <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Amz</Text>
                                    <Text fontSize={'md'} fontWeight={'bold'}>= Amazon,</Text>
                                    <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Ip</Text>
                                    <Text fontSize={'md'} fontWeight={'bold'}>= Input,</Text>
                                    <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Ext</Text>
                                    <Text fontSize={'md'} fontWeight={'bold'}>= Extracted</Text>
                                  
                                </Flex>
                                </AccordionButton>
                                <AccordionPanel>
                                  <JsonTreeDisplay json={amazonList?.data[1]} />
                                </AccordionPanel>
                              </AccordionItem>
                          </Accordion>
                        </Stack>
                        </Card>  
                    </TabPanel>
                  <TabPanel>
                  <Card
                          width={'full'}
                          bg={'#ffffff1a'}
                          brightness={0.2}
                          mt={4}
                          borderRadius={'20px'}
                        >
                        <Stack>
                          <Accordion
                            width={'full'}
                            borderColor={'transparent'}
                            allowMultiple
                            defaultIndex={[0]}
                          >
                            <AccordionItem>
                              <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <AccordionIcon />
                                </Box>
                                <Flex justifyContent={'end'} align="center" gap={2}>
                                    <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Amz</Text>
                                    <Text fontSize={'md'} fontWeight={'bold'}>= Amazon,</Text>
                                    <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Ip</Text>
                                    <Text fontSize={'md'} fontWeight={'bold'}>= Input,</Text>
                                    <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Ext</Text>
                                    <Text fontSize={'md'} fontWeight={'bold'}>= Extracted</Text>
                                  
                                </Flex>
                                </AccordionButton>
                                <AccordionPanel
                                >
                                  <JsonTreeDisplay json={amazonList?.data[2]} />
                                </AccordionPanel>
                              </AccordionItem>
                          </Accordion>
                        </Stack>
                      </Card>  
                  </TabPanel>
                </TabPanels>
              </Tabs>
     
      </>
    );
}