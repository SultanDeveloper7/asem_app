import { SubCategoryType } from "@/app/shared/types/dbTablesTypes/subCategoryType"
import Image from "next/image";

interface SubCategorySelectProps {
    subCategories?: SubCategoryType[] | undefined
}

export default function SubCategorySelect(props: SubCategorySelectProps) {
    const { subCategories } = props;

    return <div className="w-full flex gap-4 py-2 px-8 min-h-screen">
        {subCategories !== undefined ? subCategories.map((e) => {
            return <SubCategoryItem subCategory={e} key={e.sub_category_id} />
        }) : null}
    </div>

    function SubCategoryItem(props: { subCategory: SubCategoryType }) {
        const { subCategory } = props;
        return <div className="py-2 px-4 w-[25%] h-[300px] shadow-lg rounded-lg relative overflow-hidden ease-in-out duration-300 hover:scale-105">
            <Image className="object-cover" alt={subCategory.sub_category_name} src={`/images/sub-categories/${subCategory.sub_category_image}`} fill />
            <div className="absolute z-10 bottom-0 left-0 h-12 w-full flex items-center justify-center bg-gradient-to-t from-[#28396C] to-transparent sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw' priority={false}">
                <h3 className="font-bold text-white text-shadow-lg">{subCategory.sub_category_name}</h3>
            </div>
        </div>
    }
}
