"use client"
import { HttpApis } from "@/app/[locale]/shared/apis";
import { HttpFetch } from "@/app/[locale]/shared/functions/httpFetch";
import { TagsAndProductsType } from "@/app/[locale]/shared/types/dbTablesTypes/tagsAndProductsType";
import { useEffect, useState } from "react";
type ItemSelectPros = {
    id: string
}
export default function ItemSelect(props: ItemSelectPros) {
    const { id } = props;
    const httpFetch = new HttpFetch();
    const [tagsAndProducts, setTagsAndProducts] = useState<TagsAndProductsType[]>([]);
    useEffect(() => {
        getProducts();
    }, []);
    async function getProducts() {
        const response = await httpFetch.getRequest<TagsAndProductsType[]>(`${HttpApis.productsApi}${id}`);
        setTagsAndProducts(response.data?.data!)
    }
    return <div className="flex gap-8 flex-col my-18 px-4">
        {   
            tagsAndProducts && tagsAndProducts.map((tag) => {
                return <div className="flex flex-col">
                    <h3 className="font-3lg font-bold">{tag.tag.tag_label}</h3>
                    {tag.products.map((product) => {
                        return <>{product.product_name}</>
                    })}
                </div>
            })
        }
    </div>
}