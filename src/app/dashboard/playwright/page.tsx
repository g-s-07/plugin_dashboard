"use client";

import { Fragment, useState } from "react";
import { 
    Accordion,
    AccordionItem,
    Card,
    SimpleGrid, 
    Skeleton, 
    Stack,
    useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { PlaywrightTables } from 'types/playwright';
import { getAllPlaywrightTableCounts } from "utils/api/playwright";
import { useQuery } from '@tanstack/react-query';
import GeneralCard from 'components/card/GeneralCard';
import { RxUpdate } from "react-icons/rx";



export default function Playwright() {
    const toast = useToast();
    const [toastShown, setToastShown] = useState({
        success: false,
        error: false,
    })

    const {
        data: playrightList,
        error,
        isLoading,
    }: {
        data: { data: PlaywrightTables };
        error: AxiosError;
        isLoading: boolean;
    } = useQuery({
        queryKey: ['dataPlaywright'],
        queryFn: () => getAllPlaywrightTableCounts(),
    });


    const data = playrightList?.data;
    if(!toastShown.success && data){
        toast({
            title: "Success",
            description: "Data fetched successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
        setToastShown((prev) => ({ ...prev, success: true }));
    }

    if (!toastShown.error && error) {
        toast({
            title: "Error",
            description: error?.message,
            status: "error",
            duration: 3000,
            isClosable: true,
        })
        setToastShown((prev) => ({ ...prev, error: true }));
    }


    const description = "List of all tables of Playwright Scripts along with their row count and column details"

    if (isLoading) {
        return (
            <Stack maxW={'9xl'} mx={'auto'} alignItems={'center'}>
                <Card
                    width={'full'}
                    bg={'#ffffff1a'}
                    brightness={0.2}
                    mt={4}
                    borderRadius={'20px'}
                    height="80vh"
                    overflowY="scroll"
                >
                    <Stack>
                        <Accordion
                            width={'full'}
                            allowToggle
                            borderColor={'transparent'}
                        >
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
                                    p={4}
                                >
                                    {Array(8)
                                    .fill(0)
                                    .map((_, index) => (
                                        <Fragment key={index}>
                                            <Skeleton height='90px' mb={2} rounded={"lg"} />
                                            <Skeleton height='90px' mb={2} rounded={"lg"} />
                                            <Skeleton height='90px' mb={2} rounded={"lg"} />
                                            <Skeleton height='90px' mb={2} rounded={"lg"} />
                                        </Fragment>
                                    ))}
                                </SimpleGrid>
                            </AccordionItem>
                        </Accordion>
                    </Stack>
                </Card>
            </Stack>
        );
    }

    if(error){
        return null
    }
    

    return (
  
        <Stack maxW={'9xl'} mx={'auto'} alignItems={'center'}>
            <GeneralCard
                info={data}
                description={description}
                height="80vh"
                overflowY="scroll"
                icon={<RxUpdate/>}
            /> 
        </Stack>
    );
}
