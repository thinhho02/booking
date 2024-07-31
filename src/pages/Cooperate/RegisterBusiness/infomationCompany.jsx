import { Box, Button, Flex, FormControl, FormLabel, Grid, Heading, Input, Select, Text, VStack, useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { registerBusiness } from "../../../apis/auth/http"
import { FaUpload } from "react-icons/fa6"
import ReactInputMask from "react-input-mask"

function InfomationCompany({ nameCompany, setActiveInfo, activeStep, setActiveStep }) {
    
    

    const [addressApi, setAddressApi] = useState({
        provinces: [],
        districts: [],
        wards: []
    })
    const addressRef = useRef({})
    const [fileName, setFileName] = useState();

    const toast = useToast()

    const { mutate, isPending } = useMutation({
        mutationFn: registerBusiness,
        onSuccess: (data) => { 
            setActiveInfo("type")
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

    useEffect(() => {
        const province = async () => {
            const getProvinces = await axios.get("https://vapi.vnappmob.com/api/province")
            setAddressApi(prevAddress => ({ ...prevAddress, provinces: getProvinces.data.results }))
        }
        province()
    }, [])
    const handleChangeSelectProvinces = async (event) => {
        const provincesId = event.target.value.split(",")
        const getDistrict = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provincesId[0]}`)
        setAddressApi(prevAddress => ({ ...prevAddress, districts: getDistrict.data.results, wards: [] }))
    }
    const handleChangeSelectDistrict = async (event) => {
        const districtsId = event.target.value.split(",")
        const getDistrict = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtsId[0]}`)
        setAddressApi(prevAddress => ({ ...prevAddress, wards: getDistrict.data.results }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const address = `${addressRef.current.street}, ${addressRef.current.ward}, ${addressRef.current.district}, ${addressRef.current.province}`
        // console.log()
        const data = new FormData(e.target)
        data.append("address",address)
        mutate(data)
    }
    return (
        <form my={5} onSubmit={handleSubmit}>
            <Heading size="lg">Thông tin công ty</Heading>
            <FormControl mt={5}>
                <FormLabel>Tên Công Ty</FormLabel>
                <Input type='text' placeholder='Tên công ty của bạn' defaultValue={nameCompany} readOnly />
            </FormControl>
            <FormControl gap={0} mt={10} isRequired>
                <FormLabel>Địa chỉ công ty</FormLabel>
                <Grid templateColumns="repeat(4,1fr)" gap={4}>
                    <Select id='provinces' placeholder='Tỉnh' onChange={handleChangeSelectProvinces} ref={(el) => addressRef.current.province = el?.value.split(",")[1]}>
                        {addressApi.provinces.map((province, index) => (
                            <option key={index} value={[province.province_id, province.province_name]}>{province.province_name}</option>
                        ))}
                    </Select>
                    <Select id='districts' _placeholder={{ color: "gray.200" }} placeholder='Quận, Huyện' onChange={handleChangeSelectDistrict} ref={(el) => addressRef.current.district = el?.value.split(",")[1]}>
                        {addressApi.districts.map((district, index) => (
                            <option key={index} value={[district.district_id, district.district_name]}>{district.district_name}</option>
                        ))}
                    </Select>
                    <Select id='wards' _placeholder={{ color: "gray.200" }} placeholder='Phường' ref={(el) => addressRef.current.ward = el?.value.split(",")[1]}>
                        {addressApi.wards.map((ward, index) => (
                            <option key={index} value={[ward.ward_id, ward.ward_name]}>{ward.ward_name}</option>
                        ))}
                    </Select>
                    <Input type='text' placeholder='Địa chỉ' autoComplete='off' ref={(el) => addressRef.current.street = el?.value} />
                </Grid>
            </FormControl>
            <Grid templateColumns="repeat(2,1fr)" my={10} gap={10}>

                <FormControl isRequired>
                    <FormLabel>Giấy phép kinh doanh</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e)=>{setFileName(e.target.files[0].name);}}
                        id="fileUpload"
                        display="none"
                        name="file"
                    />
                    <label htmlFor="fileUpload">
                        <Button
                            as="span"
                            leftIcon={<FaUpload />}
                            variant="defaultBtn"
                            cursor="pointer"
                        >
                            Chọn hình ảnh
                        </Button>
                    </label>
                    <Text mt={2}>{fileName || "Chưa có tệp nào được chọn"}</Text>
                </FormControl>


                <FormControl isRequired>
                    <FormLabel>Mã số thuế</FormLabel>
                    <ReactInputMask mask="9999999999999" maskChar="">
                        {(inputProps) => <Input type='text' {...inputProps} name="taxCode" placeholder='Mã số thuế của công ty' />}
                    </ReactInputMask>
                </FormControl>
            </Grid>

            <Flex justifyContent="end" mt={10} gap={5}>
                <Button type='submit' isLoading={isPending} variant="defaultBtn">Tiếp tục</Button>
            </Flex>
        </form>
    )
}

export default InfomationCompany