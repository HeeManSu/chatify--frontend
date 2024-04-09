import PropTypes from 'prop-types';
import { VStack, Spinner } from '@chakra-ui/react';

const Loader = ({ color }) => {
    return (
        <VStack h="100vh" justifyContent={'center'}>
            <div>
                <Spinner
                    thickness="2px"
                    speed="1s"
                    emptyColor="transparent"
                    color={color}
                    size={"xl"}
                />
            </div>
        </VStack>
    );
};

Loader.defaultProps = {
    color: "blue.500"
};

Loader.propTypes = {
    color: PropTypes.string // Assuming color will be a string
};

export default Loader;
