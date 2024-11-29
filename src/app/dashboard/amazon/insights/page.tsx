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

      

      const options = {
        wordtree: {
          format: "implicit",
          // word: "cats",
        },
      };

      const p: any =[amazonList?.data[1]]  

      // console.log(typeof p);

      // const data = [
      //   ["Phrases"],
      //   ["cats are better than dogs"],
      //   ["cats eat kibble"],
      // ];

      const data: any = [["Phrases"]];
      p?.forEach((item: any) => {
        if (item?.error_count !== undefined) {
          data.push([`TotalCount ErrorCount  ${item.error_count}`]);
          // data.push([`TotalCount ErrorCount  ${item.error_count}`]);
          data.push([`TotalCount ProductCount ${item.total_count}`]);
          data.push([`TotalCount ProductCount ${item.total_count}`]);
          data.push([`TotalCount ProductCount BestSeller ${item.total_count}`]);
          data.push([`TotalCount ProductCount BestSeller RankFound${item.best_seller_rank_found}`]);
          data.push([`TotalCount ProductCount BestSeller SellerLink ${item.seller_link_found}`]);
          data.push([`TotalCount ProductCount BestSeller SellerLink ${item.seller_link_found}`]);
        }
      });

      console.log(data);

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
                        <Box height="500px"  overflow="hidden">
                          <Chart
                            height="100%"
                            width="100%"
                            chartType="WordTree"
                            data={data}
                            options={options}
                          />
                      </Box>
                      </AccordionPanel>
                      </AccordionItem>
                  </Accordion>
                </Stack>
              </Card>  
          </TabPanel>
          <TabPanel>
            <AccordianCards
              title="Amazon Product Details" 
              items={amazonList?.data[1]}
              expanded
            />
            <AccordianCards
              title="Amazon Product Details" 
              expanded/>
          </TabPanel>
          <TabPanel>
            <AccordianCards
              title="Amazon Seller Details" 
              items={amazonList?.data[2]}
              expanded
            />
            <AccordianCards
              title="Amazon Seller Details"
              expanded
            />
          </TabPanel>
        </TabPanels>
    </Tabs>
    );
}