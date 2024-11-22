import { Outlet } from "react-router"

import Header from "../components/ui/header/header"
import Container from "../components/ui/container/container"
import Footer from "../components/ui/footer/footer"

const MainLayout = () => {
  return (
    <div className="font-inter">
      <Container className="shadow-md">
        <Header />
      </Container>

      <Container className="h-[calc(100vh-64px-220px)]">
        <Outlet />
      </Container>

      <Container className="bg-lightgray">
        <Footer />
      </Container>
    </div>
  )
}

export default MainLayout
