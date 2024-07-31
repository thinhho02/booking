import {
  Box,
  Container,
  VStack,
  useSteps,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'


import StepperComponent from '../../../component/Stepper'
import CardComponent from '../../../component/Card';
import { queryClient } from '../../../util/configHttp';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { handleToken } from '../../../apis/auth/http';
import { useQuery } from '@tanstack/react-query';
import InfomationBusiness from './infomationBusiness';
import InfomationCompany from './infomationCompany';
import BusinessType from './businessType';
import Success from './Success';


const steps = [
  { description: 'Thông tin doanh nghiệp' },
  { description: 'Thông tin công ty' },
  { description: 'Loại hình kinh doanh' },
]

function RegisterBusiness() {
  const loader = useLoaderData()
  const navigate = useNavigate()
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const { data: user } = useQuery({
    queryKey: ["user"],
    refetchOnWindowFocus: false,
    initialData: loader,
    enabled: !!localStorage.getItem("accessToken"),
  })

  useEffect(() => {
    console.log(user)
    if (user?.message) {
      navigate("/")
    }
  }, [user])

  const [nameCompany, setNameCompany] = useState()
  const [activeInfo, setActiveInfo] = useState("business")





  return (
    <Container maxW="1200px">

      <VStack align="center" spacing={2}>

        <StepperComponent steps={steps} activeStep={activeStep} />
        <Box w="full" maxW="full" my={4} >
          <CardComponent
            rounded="xl" border='1px' borderColor='gray.200'
            boxShadow="none"
            p={8}
          >
            {activeInfo === "business" && <InfomationBusiness setActiveInfo={setActiveInfo} user={user} setActiveStep={setActiveStep} nameCompany={setNameCompany} activeStep={activeStep} />}
            {activeInfo === "company" && <InfomationCompany setActiveInfo={setActiveInfo} nameCompany={nameCompany} activeStep={activeStep} setActiveStep={setActiveStep} />}
            {activeInfo === "type" && <BusinessType setActiveInfo={setActiveInfo} nameCompany={nameCompany} activeStep={activeStep} setActiveStep={setActiveStep} />}
            {activeInfo === "success" && <Success user={user} />}
          </CardComponent>
        </Box>
      </VStack>
    </Container>
  )
}

export default RegisterBusiness


export const loaderRegisterBusiness = async () => {
  if (!localStorage.getItem("accessToken")) {
    return redirect("/")
  }

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: handleToken
  });

  const dataUser = queryClient.getQueryData(["user"])
  return dataUser;
}