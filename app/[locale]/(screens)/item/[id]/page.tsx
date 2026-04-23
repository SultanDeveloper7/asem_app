import CustomAppbar from "@/app/[locale]/shared/components/CustomAppbar";
import { cookies } from 'next/headers';
import ItemDetails from "./components/ItemDetails";
import CustomFooter from "@/app/[locale]/shared/components/CustomFooter";

export default async function ItemScreen({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const isLoggedIn = !!accessToken;
    const { id } = await params;
    return <>
        <CustomAppbar isLoggedIn={isLoggedIn} />
        <ItemDetails id={id}/>
        <CustomFooter />
    </>
}