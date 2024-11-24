import { Outlet } from "react-router"

import Header from "../components/ui/header/header"
import Container from "../components/ui/container/container"
import Footer from "../components/ui/footer/footer"
import FiltersProvider from "../providers/filters-provider"

const MainLayout = () => {
  return (
    <div className="font-inter">
      <FiltersProvider>
        <Container className="shadow-md">
          <Header />
        </Container>

        <Container className="relative min-h-[calc(100vh-64px-220px)] px-8 py-8">
          <Outlet />
        </Container>

        <Container className="bg-lightgray">
          <Footer />
        </Container>
      </FiltersProvider>
    </div>
  )
}

export default MainLayout
