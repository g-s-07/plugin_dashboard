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
    Box,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr
  } from '@chakra-ui/react';
  // Custom components
  import Card from 'components/card/Card';
  import {showTable} from 'components/tables/SimpleTable';
import { FaInfoCircle } from 'react-icons/fa';

  
export default function GeneralCard(props:{
    info: any
    height?: string
    overflowY?: string
    description?: string
    icon?: JSX.Element
}){
    const {info, overflowY, description, icon} = props;
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
                        {description}
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
                       {info?.map((item: { table_name: string, row_count: number, columns_list: [any], last_present_time: any }, index: number) => (
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
                                              <Flex direction="row" align="center" justify="center" gap={2}>
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
                                                  <Box position="relative" pb={2}>
                                                      <Tooltip 
                                                          hasArrow
                                                          aria-label="last modified"
                                                          label={item.last_present_time ? item.last_present_time : "null"}
                                                          placement="right"
                                                          fontSize="xl"
                                                          pt={2}
                                                      >
                                                          <Box as="span">{icon}</Box>
                                                      </Tooltip>
                                                  </Box>
                                              </Flex>

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


export function AccordianCards(props: {
    title?: string;
    items?: any;
    fontSize?: number;
    expanded?: boolean;
    description?: string;
    color?: string;
  }) {
    const { title, items, fontSize, expanded, description, color } = props;
    console.log('items',items);
    return (
      <Card
        width={'full'}
        bg={color || '#ffffff1a'}
        brightness={0.2}
        mt={4}
        borderRadius={'20px'}
      >
        <Stack>
          <Accordion
            key={title}
            width={'full'}
            borderColor={'transparent'}
            allowMultiple
            defaultIndex={expanded ? [0] : []}
          >
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize={fontSize}>{title}</Text>
                  {description && <Text fontSize={'sm'}>{description}</Text>}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                {items && (
                        <TableContainer>
                        <Table variant='simple'>
                          <TableCaption>Details 1st Item</TableCaption>
                          <Thead>
                            <Tr>
                              <Th>Key</Th>
                              <Th>Value</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                              {Object.entries(items).map(([key, value], index) => (  
                                <Tr key={index}>
                                  <Td>{key}</Td>
                                  <Td>{value.toString()}</Td>
                                </Tr>
                              ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    )}
                <SimpleGrid
                  key={title }
                  mt={4}
                  columns={{
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 3,
                  }}
                  gap={4}
                >
                 
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Card>
    );
}