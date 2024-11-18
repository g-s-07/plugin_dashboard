// Chakra imports
import {
    Accordion,
    AccordionItem,
    useColorModeValue,
    Flex,
    SimpleGrid,
    Stack,
    Text,
    Tooltip,
    Box
  } from '@chakra-ui/react';
  // Custom components
  import Card from 'components/card/Card';
  import {showTable} from 'components/tables/SimpleTable';
import { FaInfoCircle } from 'react-icons/fa';

  
export default function GeneralCard(props:{
    info: any
    height?: string
    overflowY?: string
}){
    const {info, overflowY} = props;
    const textColor = useColorModeValue('navy.700', 'white');

    return (
      <Card
        width={'full'}
        bg={'#ffffff1a'}
        brightness={0.2}
        mt={4}
        borderRadius={'2px'}
        height={props.height}
        overflowY={overflowY==='scroll' ? 'scroll' : 'hidden'}
      >
        <Stack>
            <Accordion
                width={'full'}
                allowToggle
                borderColor={'transparent'}
            >
                <Flex 
                    justify={'space-between'}
                    align={'center'}
                    p={2}
                >
                    <Text fontSize={'md'} fontWeight={'bold'}>
                        List of all tables of Playwright Scripts along with their row count and column details
                    </Text>
                    <Text fontSize={'md'} fontWeight={'bold'}>
                        Total Count: {info?.length}
                    </Text>
                </Flex>
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
                    >
                       {info?.map((item: { table_name: string, row_count: number, columns_list: [any] }, index: number) => (
                            <Card p="20px" key={index}>
                                <Flex direction="column" justify="center" align="center" h="100%">
                                    <Flex flexDirection="column" justify="center" align="center" h="100%">
                                        <Flex
                                            justify="center"
                                            align="center"
                                            direction={{
                                                base: 'row',
                                                md: 'column',
                                                lg: 'row',
                                                xl: 'column',
                                                '2xl': 'row',
                                            }}
                                            mb="auto"
                                            w="100%"
                                        >
                                            <Flex direction="column" align="center" justify="center">
                                                <Text
                                                    color={textColor}
                                                    fontSize={{
                                                        base: 'sm',
                                                        md: 'md',
                                                        lg: 'lg',
                                                        xl: 'lg',
                                                        '2xl': 'md',
                                                        '3xl': 'lg',
                                                    }}
                                                    mb="5px"
                                                    fontWeight="bold"
                                                    textAlign="center"
                                                >
                                                    {item.table_name}
                                                </Text>
                                                <Tooltip 
                                                    hasArrow
                                                    aria-label='A tooltip'
                                                    label={showTable(item.columns_list)}
                                                    placement='right'
                                                    fontSize="xl"
                                                    pt={2}
                                                >
                                                    <Box position="absolute" top={1} right={1} p={1} fontSize={"xl"}>
                                                        <FaInfoCircle />
                                                    </Box>
                                                </Tooltip>
                                                <Text
                                                    color={textColor}
                                                    fontSize={{
                                                        base: 'xl',
                                                        md: 'xl',
                                                        lg: 'xl',
                                                        xl: 'xl',
                                                        '2xl': 'xl',
                                                        '3xl': 'xl',
                                                    }}
                                                    fontWeight="bold"
                                                    textAlign="center"
                                                >
                                                    {item.row_count}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Card>
                        ))}
                    </SimpleGrid>
                </AccordionItem>
            </Accordion>
        </Stack>
      </Card>
    );
}