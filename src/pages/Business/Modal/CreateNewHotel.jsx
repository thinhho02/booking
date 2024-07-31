import { Box, Button, Divider, Flex, FormControl, Text, FormErrorMessage, FormLabel, Grid, GridItem, HStack, Heading, Image, Input, InputGroup, InputRightElement, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Select, SimpleGrid, Textarea, Tag, TagLabel, TagCloseButton, useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { Form } from "react-router-dom"
import axios from "axios"
import { FaUpload } from "react-icons/fa6"
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./styles.css"
import Rating from "../../../component/Rating"
import { createNewHotel } from "../../../apis/auth/http"
import { queryClient } from "../../../util/configHttp"


function CreateNewHotel({ onClose }) {

    const toast = useToast()

    const { mutate, isPending } = useMutation({
        mutationFn: createNewHotel,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["business"])
            onClose()
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
    const [tags, setTags] = useState([])
    const [image, setImage] = useState()
    const [multipleImages, setmultipleImages] = useState();
    const [addressApi, setAddressApi] = useState({
        provinces: [],
        districts: [],
        wards: []
    })
    const [rating, setRating] = useState()
    const nameHotel = useRef()
    const addressRef = useRef({})
    const messageRef = useRef()
    const [valueSingleImage, setValueSingleImage] = useState()
    const [valueMultipleImage, setValueMultipleImage] = useState()


    const handleDeleteTags = (i) => {
        const newTags = tags.filter((tag, index) => index !== i);
        setTags(newTags);
    }
    const handleAddition = (tag) => {
        setTags((prevTags) => {
            return [...prevTags, tag];
        });
    };



    const handleMultipleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setValueMultipleImage(files)
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setmultipleImages(imageUrls);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setValueSingleImage(file)
        const imageUrl = URL.createObjectURL(file)
        setImage(imageUrl)
    }



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
        const formData = new FormData()
        formData.append("name", nameHotel.current.value)
        formData.append("country", "Việt Nam")
        formData.append("city", addressRef.current.province)
        const address = `${addressRef.current.street}, ${addressRef.current.ward}, ${addressRef.current.district},`
        formData.append("address", address)
        formData.append("description", messageRef.current.value)
        formData.append("ranking", rating)
        const amenities = [...tags.map(tag => tag.text)]
        formData.append("amenities", JSON.stringify(amenities))
        formData.append("file", valueSingleImage)
        if(valueMultipleImage){
            valueMultipleImage.forEach(file => formData.append("files", file))
        }
        
        mutate(formData)
    }


    return (
        <Form onSubmit={handleSubmit}>
            <ModalHeader textAlign="center">
                <Heading size="md">Thêm mới khách sạn</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <Divider borderColor="blackAlpha.400" _dark={{ borderColor: "gray.300" }} />
            <ModalBody>

                <Grid templateColumns="repeat(4,1fr)" templateRows="repeat(4,1fr)" mt={10} gap={6}>
                    <GridItem colSpan={4}>
                        <HStack gap={10}>
                            <FormControl isRequired>
                                <FormLabel>Tên khách sạn</FormLabel>
                                <Input type='text' placeholder='Tên khách sạn của bạn' ref={nameHotel} />
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
                        <Flex>
                            <FormControl w="35%" isRequired>
                                <FormLabel>Ảnh đại diện khách sạn</FormLabel>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
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
                            </FormControl>
                            <Flex gap={2} mt={4}>
                                {image && <Image
                                    src={image}
                                    boxSize="60px"
                                    objectFit="cover"
                                    rounded="lg"
                                />}
                            </Flex>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel>Mô tả khách sạn</FormLabel>
                            <Textarea placeholder='Mô tả chi tiết về khách sạn' ref={messageRef} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Flex>
                            <FormControl w="35%" isRequired>
                                <FormLabel>Ảnh khác của khách sạn</FormLabel>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleMultipleImageChange}
                                    id="multipleFileUpload"
                                    display="none"
                                    name="files"
                                    multiple

                                />
                                <label htmlFor="multipleFileUpload">
                                    <Button
                                        as="span"
                                        leftIcon={<FaUpload />}
                                        variant="defaultBtn"
                                        cursor="pointer"
                                    >
                                        Chọn hình ảnh
                                    </Button>
                                </label>

                            </FormControl>
                            <Flex gap={2} mt={4}>
                                {multipleImages && multipleImages.map((imageSrc, index) => (
                                    <Image
                                        key={index}
                                        src={imageSrc}
                                        alt={`Selected ${index}`}
                                        boxSize="60px"
                                        objectFit="cover"
                                        rounded="lg"
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <FormLabel>Tiện nghi</FormLabel>
                            <DndProvider backend={HTML5Backend}>
                                <ReactTags classNames={{
                                    tags: 'react-tags',
                                    selected: 'react-tags__selected',
                                    tag: 'react-tags__selected-tag',
                                    remove: 'react-tags__selected-tag-remove',
                                    tagInput: 'react-tags__input',
                                    tagInputField: 'react-tags__input input',
                                }} tags={tags} handleAddition={handleAddition} handleDelete={handleDeleteTags} separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]} inputFieldPosition="top" placeholder="Nhập dữ liệu" allowUnique />
                            </DndProvider>
                        </FormControl>

                    </GridItem>
                </Grid>
                {/* <Box mt={10}>
                    <Box>
                    </Box>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                    />

                </Box> */}
            </ModalBody>
            <ModalFooter>
                <Button variant='outline' mr={3} type="button" isDisabled={isPending} onClick={onClose}>
                    Hủy
                </Button>
                <Button type="submit" variant='defaultBtn' isLoading={isPending}>Xác nhận</Button>
            </ModalFooter>
        </Form>
    )
}

export default CreateNewHotel