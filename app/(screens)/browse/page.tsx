import CustomAppbar from '@/app/shared/components/CustomAppbar';
import { cookies } from 'next/headers';
import CategorySelect from './components/CategorySelect';
import CustomFooter from '@/app/shared/components/CustomFooter';

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