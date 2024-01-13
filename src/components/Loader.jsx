import { Spinner, VStack } from "@chakra-ui/react";
const Loader = () => {
    return (
        <VStack h="100vh" justifyContent={'center'}>
            <div>
                <Spinner
                    thickness="2px"
                    speed="1s"
                    emptyColor="transparent"
                    color="blue.500"
                    size={"xl"}
                />
            </div>
        </VStack>
    )
}

export default Loader;