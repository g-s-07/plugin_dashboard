"use client";
import { 
    Accordion,
    AccordionItem,
    Box,
    Card,
    Flex,
    SimpleGrid, 
    Skeleton, 
    SkeletonCircle, 
    Stack, 
    Text
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { PlaywrightTables } from 'types/playwright';
import { getAllPlaywrightTableCounts } from "utils/api/playwright";
import { useQuery } from '@tanstack/react-query';
import GeneralCard from 'components/card/GeneralCard';


export default function Playwright() {
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
                                sm: 4,
                                md: 4,
                                lg: 4,
                                xl: 4,
                            }}
                            gap={4}
                        >
                            {Array(8)
                            .fill(0)
                            .map((_, index) => (
                                <>
                                    <Skeleton height='90px' mb={2} rounded={"lg"} />
                                    <Skeleton height='90px' mb={2} rounded={"lg"} />
                                    <Skeleton height='90px' mb={2} rounded={"lg"} />
                                    <Skeleton height='90px' mb={2} rounded={"lg"} />
                                </>
                            ))}
                        </SimpleGrid>
                        </AccordionItem>
                        </Accordion>
                    </Stack>
                </Card>
            </Stack>
        );
    }

    if (error) {
        return <h1>Error! {error.message}</h1>;
    }

    return (
  
        <Stack maxW={'9xl'} mx={'auto'} alignItems={'center'}>
            <GeneralCard
                info={data}
                height="80vh"
                overflowY="scroll"
            /> 
        </Stack>
    );
}
