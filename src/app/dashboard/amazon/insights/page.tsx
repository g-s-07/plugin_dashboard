"use client"
import { useState, useEffect } from "react";
import { 
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllAmazonProductDetails } from "utils/api/amazon";
import { AccordianCards } from "components/card/GeneralCard";
import { Chart } from "react-google-charts";
import JsonTreeDisplay from "components/jsonTree/jsonTree";


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

    if(isSuccess){
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
        console.log(task_id);
        if (!task_id) throw new Error("Task ID not found");
        refetch();
      } catch (error) {
        console.log(error);
      }
    };


    const jsonData = {
      'productcount': {'total': 12786, 'found[Next Step]': "12753 => NextProcess", 'notfound[Drop]': 33, },
//         'amazonchoice': {'found': 1614, 'notfound': 11139, 'total': 12753},
//  'bestsellerrank': {'found': 10432, 'notfound': 2321, 'total': 12753},
//  'brandlink': {'found': 12373, 'notfound': 380, 'total': 12753},
//  'brandname': {'found': 12370, 'notfound': 383, 'total': 12753},
//  'breadcrumbs': {'found': 12753, 'notfound': 0, 'total': 12753},
//  'sellerlink': {'found': 6148, 'notfound': 6605, 'total': 12753},
//  'shipsfrom': {'amazon': 4985, 'found': 5588, 'notfound': 2180, 'total': 7768},
'sold by': {Total:12753,'amazon':{ 'total': 5032,"amazon_Bif":{'bestseller': {'found': 4256,
                                     'notfound': 776,
                                     'total': 5032},
                      'brandlink': {'found': 4911,
                                    'notfound': 121,
                                    'total': 5032},
                      'sellerlink': {'found': 474,
                        'sample1':{'found': 474,
                        "Found_Bifucation":{"Total":400,"Key1":{"Key1_Bifucation1":300,"Key1_Bifucation2":100,"Key1_Bifucation3":100,"Key1_Bifucation4":100,"Key1_Bifucation5":100,"Key1_Bifucation6":100},"Key2":74},
                       "notfound": 4558,
                        "notfound_Bifucation":{"Key1":4000,"Key2":558},
                 },
                                     'notfound': 4558,
                                     },
                                     
                                    }},
           'found': {'bestseller': {'found': 4977,
                                    'notfound': 697,
                                    'total': 5674},
                     'brandlink': {'found': 5593,
                                   'notfound': 81,
                                   'total': 5674},
                     'sellerlink': {'found': 5674,
                                    'notfound': 0,
                                    'total': 5674}},
           'notfound': {'bestseller': {'found': 1199,
                                       'notfound': 848,
                                       'total': 2047},
                        'brandlink': {'found': 1869,
                                      'notfound': 178,
                                      'total': 2047},
                        'sellerlink': {'found': 0,
                                       'notfound': 2047,
                                       'total': 2047}}},
'storefrontname': {'found': 12753, 'notfound': 0, 'total': 12753},
'total': {'count': 12786}}


    

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
                            <Text color={colors[0]} fontSize={'md'} fontWeight={'bold'}>Ext</Text>
                            <Text fontSize={'md'} fontWeight={'bold'}>= Extracted</Text>
                           
                        </Flex>
                        </AccordionButton>
                        <AccordionPanel>
                        <JsonTreeDisplay json={amazonList?.data[0]} />
                        {/* <JsonTreeDisplay json={jsonData} /> */}
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