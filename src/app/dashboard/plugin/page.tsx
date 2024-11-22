"use client";

import { Fragment, useEffect } from "react";
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
import { TablesDetails } from 'types/playwright';
import { getAllTableCounts } from "utils/api/playwright";
import { useQuery } from '@tanstack/react-query';
import GeneralCard from 'components/card/GeneralCard';
import { RxUpdate } from "react-icons/rx";



export default function Plugins() {
    const toast = useToast();

    const {
        data: playrightList,
        error,
        isLoading,
        isFetching,
        isSuccess
    }: {
        data: { data: TablesDetails };
        error: AxiosError;
        isLoading: boolean;
        isFetching: boolean;
        isSuccess: boolean;
    } = useQuery({
        queryKey: ['dataPlugins'],
        queryFn: () => getAllTableCounts('plugins'),
    });


    const data = playrightList?.data;
    const description = "List of all tables of Plugins along with their row count and column details"
    
    useEffect(() => {
        if (isSuccess) {
            toast.closeAll();
            toast({
                title: "Success",
                description: "Data fetched successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isSuccess, toast]);

    useEffect(() => {
        if (error) {
            toast.closeAll();
            toast({
                title: "Error",
                description: error?.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [error, toast]);



    if (isLoading || isFetching) {
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
                height="77vh"
                overflowY="scroll"
                icon={<RxUpdate/>}
                type="plugins"
            /> 
        </Stack>
    );
}
