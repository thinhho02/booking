import { Box, Spinner, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper } from "@chakra-ui/react"



function StepperComponent({steps, activeStep}) {
    return (
        <Stepper w="80%" maxW="80%" index={activeStep}>
            {steps.map((step, index) => (
                <Step key={index} >
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon key={activeStep} />}
                            incomplete={<StepNumber key={activeStep} />}
                            active={<StepNumber/>}
                            
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}

export default StepperComponent