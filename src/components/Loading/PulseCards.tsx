import { Box, HStack, Skeleton, Stack } from "@chakra-ui/react";

type PulseCardsProps = {
  bigCard?: boolean;
};

const PulseCards: React.FC<PulseCardsProps>  = ({
  bigCard = false
}) => {
  return (
    <Stack spacing={3} mt="3">
      {Array.from(Array(3).keys()).map((id) => {
        return (
          <Box
            key={id}
            cursor="pointer"
            borderWidth="1px"
            bg="#fbfdff"
            position="relative"
            rounded="md"
            borderRadius="5px"
          >
            {bigCard && id === 0 ? <Skeleton height="15rem" borderRadius="5px 5px 0 0" width="100%" /> : ''}
            <Stack justifyContent="space-between" mt={2} p={5}>
              <Box width="100%">
                <Box pl="2.5em">
                  <Stack spacing={2} mt={1} alignItems="center">
                    <Skeleton height="14px" width="80%" />
                  </Stack>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    mt={4}
                  >
                    <HStack spacing={2} width="50%">
                      <Skeleton
                        height="12px"
                        width="40%"
                        rounded="full"
                        my={1}
                      />
                      <Skeleton
                        height="12px"
                        width="40%"
                        rounded="full"
                        my={1}
                      />
                    </HStack>
                    <Skeleton height="12px" width="20%" rounded="full" my={1} />
                  </HStack>
                </Box>
              </Box>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
};

export default PulseCards;
