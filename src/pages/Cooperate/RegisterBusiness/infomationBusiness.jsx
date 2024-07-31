import { Button, Flex, FormControl, FormLabel, Grid, Heading, Input, Select, VStack, useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query";
import ReactInputMask from 'react-input-mask';
import { registerBusiness } from "../../../apis/auth/http";

function InfomationBusiness({ user, setActiveStep, activeStep, nameCompany, setActiveInfo }) {
    const toast = useToast()

    const { mutate, isPending } = useMutation({
        mutationFn: registerBusiness,
        onSuccess: (data) => { 
            setActiveInfo("company")
            setActiveStep(activeStep + 1)
        },
        onError: (data) => {
            toast({
                title: 'Sai thông tin',
                description: data.message,
                position: "top-right",
                status: 'error',
                duration: 4000,
                isClosable: true,
                variant: "left-accent",
                containerStyle: {
                    backgroundColor: "rgb(211, 88, 88)",
                    borderRadius: "var(--chakra-radii-md)",
                    maxW: "300px"
                }
            })
        }
    })

    const handleChangeFax = (e) => {
        console.log(e.target.value.split(" ").join(""))
    }

    const handleStepper = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        mutate(data)
    }


    return (
        <form my={5} onSubmit={handleStepper}>
            <Heading size="lg">Thông tin doanh nghiệp</Heading>
            <FormControl mt={5} isRequired>
                <FormLabel>Tên Công Ty</FormLabel>
                <Input type='text' name="nameCompany" placeholder='Tên công ty của bạn' onChange={(e)=>{nameCompany(e.target.value)}} />
            </FormControl>


            <Grid templateColumns="repeat(2,1fr)" my={10} gap={10}>
                <VStack gap={10}>
                    <FormControl isRequired>
                        <FormLabel>Chúng tôi gọi bạn</FormLabel>
                        <Input type='text' defaultValue={user?.name} name="name" placeholder='Tên của bạn' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Số điện thoại</FormLabel>
                        <Input type='text' defaultValue={user?.numberPhone} name="numberPhone" placeholder='Số điện thoại của bạn' />
                    </FormControl>
                </VStack>
                <VStack gap={10}>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type='text' defaultValue={user?.email} name="email" placeholder='Email của bạn' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Số Fax</FormLabel>
                        <ReactInputMask mask="84 999 999 999" maskChar="" onChange={handleChangeFax}>
                            {(inputProps) => <Input type='text' {...inputProps} name="idNumber" placeholder='Số Fax của công ty' />}
                        </ReactInputMask>
                    </FormControl>
                </VStack>
            </Grid>
            <Flex justifyContent="end" gap={5}>
                <Button type='submit' isLoading={isPending} variant="defaultBtn">Tiếp tục</Button>
            </Flex>
        </form>
    )
}

export default InfomationBusiness