import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Heading, Image, Input, Select, Text, Textarea, VStack, useCheckbox, useRadioGroup, useToast } from '@chakra-ui/react';
import CheckBoxComponent from '../../../component/CheckBox';
import { FaMinus, FaPlus, FaUpload } from 'react-icons/fa6';
import ReactInputMask from 'react-input-mask';
import axios from 'axios';
import Rating from '../../../component/Rating';
import { useMutation } from '@tanstack/react-query';
import { registerBusiness } from '../../../apis/auth/http';



function BusinessType({ nameCompany, setActiveInfo, activeStep, setActiveStep }) {
    const { value, getRadioProps, getRootProps } = useRadioGroup()
    const [fileName, setFileName] = useState();
    console.log(nameCompany?.current?.value)
    const toast = useToast()
    const [addressApi, setAddressApi] = useState({
        provinces: [],
        districts: [],
        wards: []
    })
    const [rating, setRating] = useState()
    const [activeHotel, setActiveHotel] = useState(false)
    const addressRef = useRef({})
    const messageRef = useRef()
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


    const { mutate, isPending } = useMutation({
        mutationFn: registerBusiness,
        onSuccess: (data) => {
            setActiveInfo("success")
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        if (data.get("businessType") == null) {
            return toast({
                title: 'Sai thông tin',
                description: "Hãy chọn 1 loại hình thức kinh doanh của công ty",
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
        if (rating) {
            const hotel = {
                name: addressRef?.current?.nameHotel,
                country: "Việt Nam",
                city: addressRef.current.province,
                address: `${addressRef.current.street}, ${addressRef.current.ward}, ${addressRef.current.district}`,
                description : messageRef.current.value,
                ranking: rating
            }
            console.log(hotel)
            const dataHotel = JSON.stringify(hotel)
            data.append("hotel",dataHotel)
        }
        mutate(data)

    }
    return (
        <form onSubmit={handleSubmit}>
            <FormControl mt={5}>
                <FormLabel>Tên Công Ty</FormLabel>
                <Input type='text' placeholder='Tên công ty của bạn' defaultValue={nameCompany} readOnly />
            </FormControl>
            <Box mt={10}>
                <FormLabel fontSize="lg">Loại hình kinh doanh</FormLabel>
                <Grid templateColumns="repeat(4,1fr)" mt={3} mb={8} gap={10} {...getRootProps()}>
                    <CheckBoxComponent nameInput="businessType" valueInput="hotel"  {...getRadioProps({ value: "hotel" })}>
                        <Box overflow="hidden" rounded="lg">
                            <Image src="https://ik.imagekit.io/r9vwbtuo5/1669408945187-b2bef22a888e0eef95e09501314030c6.jpeg_tr=q-75?updatedAt=1716573889964" h={125} w="full" alt={""} rounded="lg" transition="all 0.1s ease-in-out" _groupHover={{ transform: "scale(1.1)" }} />
                        </Box>

                        <Flex align="center" gap={2} my={3} px={3}>
                            <Image src='https://ik.imagekit.io/r9vwbtuo5/1669409080444-55898f465d21ad5b26f9bcfeeccc9368.png_tr=q-75?updatedAt=1716575119865' h={7} />
                            <Box>
                                <Text size="lg" fontWeight="bold">Khách sạn</Text>
                            </Box>
                        </Flex>
                    </CheckBoxComponent>
                    <CheckBoxComponent nameInput="businessType" {...getRadioProps({ value: "restaurant" })} disabled>
                        <Box overflow="hidden" rounded="lg">
                            <Image src="https://ik.imagekit.io/r9vwbtuo5/restaurant.jpg?updatedAt=1716579400276" h={125} w="full" alt={""} rounded="lg" transition="all 0.1s ease-in-out" />
                        </Box>

                        <Flex align="center" gap={2} my={3} px={3}>
                            <Image src='https://ik.imagekit.io/r9vwbtuo5/948149.png?updatedAt=1716583479789' h={7} />
                            <Box>
                                <Text size="lg" fontWeight="bold">Nhà hàng</Text>
                            </Box>
                        </Flex>
                    </CheckBoxComponent>
                    <CheckBoxComponent nameInput="businessType" {...getRadioProps({ value: "experience" })} disabled>
                        <Box overflow="hidden" rounded="lg">
                            <Image src="https://ik.imagekit.io/r9vwbtuo5/1669475953629-969792847b44e7bfe19dc1d3b1d6bad8.jpeg_tr=q-75?updatedAt=1716578853021" h={125} w="full" alt={""} rounded="lg" transition="all 0.1s ease-in-out" />
                        </Box>

                        <Flex align="center" gap={2} my={3} px={3}>
                            <Image src='https://ik.imagekit.io/r9vwbtuo5/1669409080444-55898f465d21ad5b26f9bcfeeccc9368.png_tr=q-75?updatedAt=1716575119865' h={7} />
                            <Box>
                                <Text size="lg" fontWeight="bold">Trải nghiệm</Text>
                            </Box>
                        </Flex>
                    </CheckBoxComponent>
                </Grid>
            </Box>

            <Box>
                {value && <Button variant="defaultBtn" leftIcon={!activeHotel ? <FaPlus /> : <FaMinus />} onClick={() => { setActiveHotel(prve => !prve) }}>{!activeHotel ? value == "hotel" && "Thêm khách sạn (Tùy chọn)" : "Hủy"}</Button>}
                {activeHotel && <Grid templateColumns="repeat(4,1fr)" templateRows="repeat(3,1fr)" mt={10} gap={10}>
                    <GridItem colSpan={4}>
                        <HStack gap={10}>
                            <FormControl isRequired>
                                <FormLabel>Tên khách sạn</FormLabel>
                                <Input type='text' placeholder='Tên khách sạn của bạn' ref={(el) => addressRef.current.nameHotel = el?.value} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Xếp hạng sao của khách sạn</FormLabel>
                                <Rating onChange={setRating} />
                            </FormControl>
                        </HStack>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl gap={0} isRequired>
                            <FormLabel>Địa chỉ khách sạn</FormLabel>
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
                    </GridItem>

                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel>Ảnh đại diện của khách sạn</FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => { setFileName(e.target.files[0]); }}
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
                            <Text mt={2}>{fileName?.name || "Chưa có tệp nào được chọn"}</Text>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel>Mô tả khách sạn</FormLabel>
                            <Textarea placeholder='Mô tả chi tiết về khách sạn' ref={messageRef} />
                        </FormControl>
                    </GridItem>
                </Grid>}
            </Box>
            <Flex justifyContent="end" mt={10} gap={5}>
                <Button type='submit' variant="defaultBtn" isLoading={isPending}>Hoàn thành</Button>
            </Flex>
        </form>
    );
}

export default BusinessType