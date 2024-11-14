"use client"
import { Box, Button, Skeleton, Stack } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TaskContext } from "contexts/TaskId";
import { useContext } from "react";
import { AmazonProductData } from "types/amazon";
import { getAllAmazonProductDetails } from "utils/api/amazon";


export default function AmazonInsights() {
    const {taskid} = useContext(TaskContext);
    console.log(taskid.task_id);
    const {
        mutate: fetchProductDetails,
        data: amazonProductList,
        error,
        isPending,
        isSuccess,
      } = useMutation({
        mutationFn: () => getAllAmazonProductDetails(taskid.task_id),
      });

    // Trigger the mutation
    const handleFetch = () => {
      fetchProductDetails();
    };

    
      if (isPending) {
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
        <Box>
             <Button colorScheme="blue" onClick={() => handleFetch()} >
                Fetch Counts
              </Button>{isSuccess && amazonProductList?.data && (
                <div>
                    <h2>Product Details:</h2>
                    <pre>{JSON.stringify(amazonProductList.data, null, 2)}</pre>
                </div>
            )}
        </Box>
    );
}