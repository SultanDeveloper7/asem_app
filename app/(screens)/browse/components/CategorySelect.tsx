"use client"

import { HttpApis } from "@/app/shared/apis";
import { HttpFetch } from "@/app/shared/functions/httpFetch";
import { CategoryType } from "@/app/shared/types/dbTablesTypes/categoryType";
import { Divider } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react"
import SubCategorySelect from "./SubCategorySelect";
import { SubCategoryType } from "@/app/shared/types/dbTablesTypes/subCategoryType";

export default function CategorySelect() {
    const httpFetch = new HttpFetch();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();
    const [category, setCategory] = useState<CategoryType[]>();
    const [subCategory, setSubCategory] = useState<SubCategoryType[]>();
    useEffect(() => {
        getCategories();
    }, []);

    async function getSubCategories(id: number) {
        setSelectedCategoryId(category![id - 1].category_id);
        const response = await httpFetch.getRequest<SubCategoryType[]>(`${HttpApis.categoriesApi}${id}`);
        setSubCategory(response.data?.data!)
    }

    async function getCategories() {
        const response = await httpFetch.getRequest<CategoryType[]>(HttpApis.categoriesApi);
        setCategory(response.data?.data!)
    }

    return <div className="flex gap-8 flex-col items-center my-18">
        <div className="flex w-fit px-4 py-2 gap-4 rounded-sm bg-[#e8dadd]">
            {
                category !== undefined ? category?.map((e) => {
                    return <CategoryItem key={e.category_id} category={e} />
                }) : null
            }
        </div>
        <Divider variant="middle" flexItem />
        <h3 className="text-4xl font-bold m-0">{selectedCategoryId && category![selectedCategoryId - 1].category_name}</h3>
        <SubCategorySelect subCategories={subCategory} />
    </div>


    function CategoryItem(props: { category: CategoryType }) {
        const { category } = props;

        const isSelected = selectedCategoryId === category.category_id;

        return (
            <div
                onClick={() => getSubCategories(category.category_id)}
                className={`
                cursor-pointer py-2 px-4 rounded-sm flex flex-col justify-center items-center
                hover:bg-[#d9ccce]
                ${isSelected ? "bg-[#d9ccce]" : ""}
            `}
            >
                <Image
                    alt={category.category_name}
                    src={`/icons/categories/${category.category_image}`}
                    width={40}
                    height={40}
                />
                <h3>{category.category_name}</h3>
            </div>
        );
    }
}
