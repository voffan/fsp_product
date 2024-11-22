import { Outlet } from "react-router"

import Header from "../components/ui/header/header"
import Container from "../components/ui/container/container"
import Footer from "../components/ui/footer/footer"

const MainLayout = () => {
  return (
    <div className="font-inter">
      <Container>
        <Header />
      </Container>

      <Container className="h-[calc()]">
        <Outlet />
      </Container>

      <Container>
        <Footer />
      </Container>
    </div>
  )
}

export default MainLayout
