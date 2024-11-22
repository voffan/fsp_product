import { Route, Routes } from "react-router"

import AuthScreen from "../components/screens/auth-screen"
import MainLayout from "../layouts/main-layout"
import MainScreen from "../components/screens/main-screen"
import ProfileScreen from "../components/screens/profile-screen"

const Router = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthScreen />} />
      <Route path="/" element={<MainLayout />}>
        <Route index path="/" element={<MainScreen />} />
        <Route index path="/profile" element={<ProfileScreen />} />
      </Route>
    </Routes>
  )
}

export default Router
