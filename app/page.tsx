import { cookies } from 'next/headers';
import CustomAppbar from "./shared/components/CustomAppbar";
import WelcomeBody from "./shared/components/homescreen/WelcomeBody";
import SectionOne from './shared/components/homescreen/SectionOne';
import SectionTwo from './shared/components/homescreen/SectionTwo';
import { Divider } from '@mui/material';
import SectionThree from './shared/components/homescreen/SectionThree';
import CustomFooter from './shared/components/CustomFooter';

export default async function HomeScreen() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const isLoggedIn = !!accessToken;

  return <div className="flex flex-col h-screen my-16">
    <CustomAppbar isLoggedIn={isLoggedIn} />
    <WelcomeBody />
    <Divider variant='middle' />
    <SectionOne />
    <SectionTwo />
    <SectionThree />
    {/* <Divider variant='middle' /> */}
    <CustomFooter />
  </div>;
}
