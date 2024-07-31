import { Box, Button, Divider, Flex, FormControl, Text, FormErrorMessage, FormLabel, Grid, GridItem, HStack, Heading, Image, Input, InputGroup, InputRightElement, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Select, SimpleGrid, Textarea, Tag, TagLabel, TagCloseButton, useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { Form } from "react-router-dom"
import { FaUpload } from "react-icons/fa6"
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./styles.css"
import { createNewRoom } from "../../../apis/auth/http"
import { queryClient } from "../../util/configHttp"



function CreateNewRoom({ onClose, hotelId }) {

    const toast = useToast()
    const { mutate, isPending } = useMutation({
        mutationFn: createNewRoom,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["room"])
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


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const amenities = [...amenitiesTags.map(amenitie => amenitie.text)]
        formData.append("amenities", JSON.stringify(amenities))

        const services = [...servicesTags.map(service => service.text)]
        formData.append("services", JSON.stringify(services))



        if (valueMultipleImage) {
            valueMultipleImage.forEach(file => formData.append("files", file))
        }

        mutate({ formData, hotelId })
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Heading size="md">Đặt phòng</Heading>

            <Divider borderColor="blackAlpha.400" _dark={{ borderColor: "gray.300" }} />
            <Grid templateColumns="repeat(4,1fr)" templateRows="repeat(4,1fr)" mt={10} gap={6}>
                <GridItem colSpan={4}>
                    <HStack gap={10}>
                        <FormControl isRequired>
                            <FormLabel>Tên phòng</FormLabel>
                            <Input type='text' placeholder='Tên phòng của bạn' name="title" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Số phòng</FormLabel>
                            <Input type='text' placeholder='Số phòng khách sạn' name="roomNumber" />
                        </FormControl>
                    </HStack>
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
                        <FormLabel>Mô tả khách sạn</FormLabel>
                        <Textarea placeholder='Mô tả chi tiết về khách sạn' name="description" />
                    </FormControl>
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
                            }} tags={amenitiesTags} handleAddition={handleAddition} handleDelete={handleDeleteTags} separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]} inputFieldPosition="top" placeholder="Tiện nghi" allowUnique />
                        </DndProvider>
                    </FormControl>

                </GridItem>
                <GridItem colSpan={2}>
                    <FormControl isRequired>
                        <FormLabel>Dịch vụ</FormLabel>
                        <DndProvider backend={HTML5Backend}>
                            <ReactTags classNames={{
                                tags: 'react-tags',
                                selected: 'react-tags__selected',
                                tag: 'react-tags__selected-tag',
                                remove: 'react-tags__selected-tag-remove',
                                tagInput: 'react-tags__input',
                                tagInputField: 'react-tags__input input',
                            }} tags={servicesTags} handleAddition={handleServicesAddition} handleDelete={handleServicesDeleteTags} separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]} inputFieldPosition="top" placeholder="Tiện nghi" allowUnique />
                        </DndProvider>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <HStack>
                        <FormControl isRequired>
                            <Select placeholder="Loại phòng" name="type">
                                {typeRoom.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <Select placeholder="Loại giường" name="bedType">
                                {bedType.map(bed => (
                                    <option key={bed} value={bed}>{bed}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </HStack>
                </GridItem>
                <GridItem colSpan={2}>
                    <HStack>
                        <FormControl isRequired>
                            <Input placeholder="Số người tối đa" type="number" name="maxOccupancy" />
                        </FormControl>
                        <FormControl isRequired>
                            <Input placeholder="Giá mỗi đêm" type="number" name="pricePerNight" />
                        </FormControl>
                    </HStack>
                </GridItem>
            </Grid>

            <Button variant='outline' mr={3} type="button" isDisabled={isPending} onClick={onClose}>
                Hủy
            </Button>
            <Button type="submit" variant='defaultBtn' isLoading={isPending} >Xác nhận</Button>
        </Form>
    )
}

export default CreateNewRoom