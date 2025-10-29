import ButtonCartFloating from '../../components/ButtonCartFloating';
import ButtonDashboardFloating from '../../components/ButtonDashboardFloating';
import AboutSection from './sections/AboutSection';
import ContactUs from './sections/ContactUs';
import Header from './sections/Header';
import MenuDemoSection from './sections/MenuDemoSection';
import SnacksSection from './sections/SnacksSection';

export default function Home() {
  return (
    <div className="w-full">
      <ButtonCartFloating />
      <ButtonDashboardFloating />
      <Header />
      <AboutSection />
      <MenuDemoSection />
      <SnacksSection />
      <ContactUs />
    </div>
  );
}
