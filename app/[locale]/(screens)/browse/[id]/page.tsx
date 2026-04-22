import CustomAppbar from "@/app/[locale]/shared/components/CustomAppbar";
import { cookies } from 'next/headers';
import ItemSelect from "./components/ItemSelect";

export default async function ItemBrowseScreen({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const isLoggedIn = !!accessToken;
    const { id } = await params;
    return <>
        <CustomAppbar isLoggedIn={isLoggedIn} />
        <ItemSelect id={id} />
    </>
}