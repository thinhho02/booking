import { Button, VisuallyHidden, useColorModeValue } from "@chakra-ui/react";

function SocialButton ({
    children,
    label,
    href,
    
}){
    return (
        <Button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={10}
            h={10}
            py={2}
            px={3}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </Button>
    );
};

export default SocialButton