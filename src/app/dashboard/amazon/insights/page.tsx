"use client"
import { useState } from "react";
import { 
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Skeleton, Stack, Tab, TabList, TabPanel, TabPanels, Tabs,
  Text 
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllAmazonProductDetails } from "utils/api/amazon";
import { AccordianCards } from "components/card/GeneralCard";
import { Chart } from "react-google-charts";
import JsonTreeDisplay from "components/jsonTree/jsonTree";


export default function AmazonInsights() {
    const [activeTab, setActiveTab] = useState(0);
    const {
        data: amazonList,
        error,
        isLoading,
      } = useQuery({
        queryKey: ['dataAmazon'],
        queryFn: () => getAllAmazonProductDetails(1002),
      });

    
      if (isLoading) {
        return (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        );
      }
    
      if (error) {
        return <h1>Error! {error.message}</h1>;
      }


      console.log(amazonList?.data[1]);


    const jsonData = 
      {'amazonchoice': {'found': 1614, 'notfound': 11139, 'total': 12753},
 'bestsellerrank': {'found': 10432, 'notfound': 2321, 'total': 12753},
 'brandlink': {'found': 12373, 'notfound': 380, 'total': 12753},
 'brandname': {'found': 12370, 'notfound': 383, 'total': 12753},
 'breadcrumbs': {'found': 12753, 'notfound': 0, 'total': 12753},
 'productcount': {'found': 12753, 'notfound': 33, 'total': 12786},
 'sellerlink': {'found': 6148, 'notfound': 6605, 'total': 12753},
 'shipsfrom': {'amazon': 4985, 'found': 5588, 'notfound': 2180, 'total': 7768},
 'sold by': {'amazon': {'bestseller': {'found': 4256,
                                       'notfound': 776,
                                       'total': 5032},
                        'brandlink': {'found': 4911,
                                      'notfound': 121,
                                      'total': 5032},
                        'sellerlink': {'found': 474,
                                       'notfound': 4558,
                                       'total': 5032}},
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
                        </AccordionButton>
                        <AccordionPanel>
                        <JsonTreeDisplay data={amazonList?.data[0]} />
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
                        </AccordionButton>
                        <AccordionPanel>
                          <JsonTreeDisplay data={amazonList?.data[1]} />
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
                        </AccordionButton>
                        <AccordionPanel
                        >
                          <JsonTreeDisplay data={amazonList?.data[2]} />
                        </AccordionPanel>
                      </AccordionItem>
                  </Accordion>
                </Stack>
              </Card>  
          </TabPanel>
        </TabPanels>
    </Tabs>
    );
}