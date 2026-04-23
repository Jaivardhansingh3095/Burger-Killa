import { useSelector } from "react-redux";
import ButtonCartFloating from "../../components/ButtonCartFloating";
import ButtonDashboardFloating from "../../components/ButtonDashboardFloating";
import AboutSection from "./sections/AboutSection";
import ContactUs from "./sections/ContactUs";
import Header from "./sections/Header";
import MenuDemoSection from "./sections/MenuDemoSection";
import SnacksSection from "./sections/SnacksSection";
import { selectUser } from "../../features/authentication/userSlice";
import BottomTraverselMenu from "../../features/menu/BottomTraverselMenu";

export default function Home() {
  const user = useSelector(selectUser);

  return (
    <div className="w-full">
      {/* <ButtonCartFloating /> */}
      {user.status === "idle" && user.user?.role === "admin" && (
        <ButtonDashboardFloating />
      )}
      <Header />
      <AboutSection />
      <MenuDemoSection />
      <SnacksSection />
      <ContactUs />
      <BottomTraverselMenu />
    </div>
  );
}
