import { Outlet } from "react-router-dom";
import Header from "../../../component/Header";
import Footer from "../../../component/Footer";
import { queryClient } from "../../../util/configHttp";
import { getDataHotel } from "../../../apis/auth/http";

function RootLayoutUser() {
  return <>
    <Header />
    <main style={{ marginTop: "100px" }}>
      <Outlet />
    </main>
    <Footer />
  </>;
}

export default RootLayoutUser;

export const loaderHotel = async () => {

  await queryClient.prefetchQuery({
      queryKey: ["hotel"],
      queryFn: () => getDataHotel({}),
  });

  const dataUser = queryClient.getQueryData(["hotel"])
  console.log(dataUser)
  return dataUser;
}

