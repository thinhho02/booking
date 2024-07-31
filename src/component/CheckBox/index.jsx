import { Box, useCheckbox, useColorModeValue, useRadio } from "@chakra-ui/react"

function CheckBoxComponent({children, nameInput, valueInput, disabled, ...props}) {
    const border = useColorModeValue("cyan.800","cyan.500")
    const { state, getInputProps, getLabelProps, htmlProps } = useRadio(props)
    return (
        <label {...htmlProps} >
            <Box maxW='sm' borderWidth='2px' pos="relative" borderRadius='lg' overflow='hidden' role="group" cursor={!disabled && "pointer"}  border={state.isChecked && "2px"} borderColor={state.isChecked && border}>
                {disabled && <Box pos="absolute" zIndex="4" w="full" h="full" bgColor="blackAlpha.500"></Box>}
                <input {...getInputProps()} id={nameInput} name={nameInput} disabled={disabled}  hidden />
                {children}
            </Box>
        </label>
    )
}

export default CheckBoxComponent