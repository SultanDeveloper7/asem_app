import CustomAppbar from '@/app/[locale]/shared/components/CustomAppbar';
import { cookies } from 'next/headers';
import CategorySelect from './components/CategorySelect';
import CustomFooter from '@/app/[locale]/shared/components/CustomFooter';

export default async function BrowseScreen() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const isLoggedIn = !!accessToken;
    return <>
        <CustomAppbar isLoggedIn={isLoggedIn} />
        <CategorySelect />
        <CustomFooter />
    </>
}