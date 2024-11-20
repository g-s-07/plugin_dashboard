"use client"
import { useState } from "react";
import { 
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, Button, Skeleton, Stack, Tab, TabList, TabPanel, TabPanels, Tabs,
  Text 
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TaskContext } from "contexts/TaskId";
import { useContext } from "react";
import { AmazonData } from "types/amazon";
import { getAllAmazonProductDetails } from "utils/api/amazon";
import { AccordianCards } from "components/card/GeneralCard";


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

      console.log('i am amazon list',typeof(amazonList));
      console.log('i am amazonList',amazonList);
      console.log(typeof(amazonList?.data));
      console.log('i am amazon',amazonList?.data);

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
            <Stack maxW={'9xl'} mx={'auto'} alignItems={'center'}>
              <AccordianCards
                title="Amazon Product Lists"
                items={amazonList?.data[0]} 
                expanded
              />
              <AccordianCards 
                title="Amazon Product Lists"
                expanded
              />
            </Stack>
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