// "use client"
// import { 
//     Box, 
//     Card, 
//     CardBody, 
//     CardHeader, 
//     Divider, 
//     Flex, 
//     Heading, 
//     SimpleGrid, 
//     Skeleton, 
//     Stack, 
//     Stat, 
//     StatGroup, 
//     StatLabel, 
//     StatNumber, 
//     Tooltip,  
//     Text
// } from "@chakra-ui/react";
// import { AxiosError } from "axios";
// import {PlaywrightTables} from 'types/playwright'
// import { getAllPlaywrightTableCounts } from "utils/api/playwright";
// import { useQuery } from '@tanstack/react-query';





// export default function Playwright() {
//     const {
//         data: playrightList,
//         error,
//         isLoading,
//       }: {
//         data: {data: PlaywrightTables};
//         error: AxiosError;
//         isLoading: boolean;
//       } = useQuery({
//         queryKey: ['dataPlaywright'],
//         queryFn: () => getAllPlaywrightTableCounts(),
//       });
//       const data = playrightList?.data;
    
//       if (isLoading) {
//         return (
//           <Stack>
//             <Skeleton height="20px" />
//             <Skeleton height="20px" />
//             <Skeleton height="20px" />
//           </Stack>
//         );
//       }
    
//       if (error) {
//         return <h1>Error! {error.message}</h1>;
//       }

//     return (
//       <Box py={4} overflow="visible" position="relative" className="flex flex-wrap">
//         <Flex mb={4} direction="column" position="relative">
//             <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
//                 <Flex alignItems="center" gap={6} flexWrap="wrap" justify="space-between">
//                     <SimpleGrid columns={{ base: 1, lg: 4, '2xl': 6, md: 3, '3sm': 2, '2sm': 1}} gap="20px" flex="1">
//                         {data.map((item: { table_name: string, row_count: number }, index: number) => (
//                             <Card key={index} height="100px">
//                                 <CardHeader p="4">
//                                     <Heading
//                                       textAlign="start"
//                                       fontWeight="bold"
//                                       fontSize={{ base: "md", md: "lg" }}
//                                       color="black">
//                                       {item.table_name}
//                                     </Heading>
//                                 </CardHeader>
//                                 <CardBody p="3" textAlign="center">
//                                     {item.row_count}
//                                 </CardBody>
//                             </Card>
//                         ))}
//                     </SimpleGrid>
//                 </Flex>
//             </Box>
//         </Flex>
//     </Box>
//     );
// }

"use client";
import { 
    Box, 
    Card, 
    CardBody, 
    CardHeader, 
    Flex, 
    Heading, 
    SimpleGrid, 
    Skeleton, 
    Stack, 
    Text 
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { PlaywrightTables } from 'types/playwright';
import { getAllPlaywrightTableCounts } from "utils/api/playwright";
import { useQuery } from '@tanstack/react-query';

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

    return (
      <Box py={4} overflow="visible" position="relative" className="flex flex-wrap">
        <Flex mb={4} direction="column" position="relative">
            <Box>
                <Flex alignItems="center" gap={6} flexWrap="wrap" justify="space-between">
                    <SimpleGrid 
                        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}  
                        spacing={{ base: "8px", md: "10px" }}
                        flex="1"
                    >
                        {data?.map((item: { table_name: string, row_count: number }, index: number) => (
                            <Card 
                                key={index} 
                                height={{ base: "100px", md: "80px" }} 
                                width={{ base: "100%", md: "280px" }}
                                alignItems={"center"}
                                borderRadius={"10px"}
                                boxShadow="7px 14px 20px rgba(0, 0, 0, 0.1)"
                            >
                                <CardHeader p="2">
                                    <Heading
                                        textAlign="center"
                                        fontWeight="bold"
                                        fontSize={{ base: "xl", md: "md" }} 
                                        color="black"
                                    >
                                        {item.table_name}
                                    </Heading>
                                </CardHeader>
                                <CardBody p="2" textAlign="center" w="fit-content" h="fit-content" display="inline-block">
                                    <Text 
                                        px={"16px"}
                                        bg={"#F4F8FE"} borderRadius={"10px"} boxShadow="inset 2px 5px 10px rgba(0, 0, 0, 0.1)"
                                        fontSize="lg" 
                                        fontWeight="bold" 

                                    >
                                    {item.row_count}</Text>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Flex>
            </Box>
        </Flex>
      </Box>

    );
}
