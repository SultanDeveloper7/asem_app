"use client"
import { HttpApis } from "@/app/[locale]/shared/apis";
import { HttpFetch } from "@/app/[locale]/shared/functions/httpFetch";
import { ProductsType } from "@/app/[locale]/shared/types/dbTablesTypes/productsType";
import { TagsAndProductsType } from "@/app/[locale]/shared/types/dbTablesTypes/tagsAndProductsType";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
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
    }, [id]);
    async function getProducts() {
        const response = await httpFetch.getRequest<TagsAndProductsType[]>(`${HttpApis.productsApi}${id}`);
        setTagsAndProducts(response.data?.data!)
    }
    return <div className="flex gap-8 flex-col my-18">
        {
            tagsAndProducts && tagsAndProducts.map((tag) => {
                return <div key={tag.tag.tag_id} className="flex flex-col">
                    <h3 className="text-2xl font-bold px-4">{tag.tag.tag_label}</h3>
                    <div className="flex gap-4 py-8 px-4 overflow-x-auto whitespace-nowrap">
                        {tag.products.map((product) => {
                            return <ProductItem product={product} key={product.product_id} />
                        })}
                    </div>
                </div>
            })
        }
    </div>
}

function ProductItem(props: { product: ProductsType }) {
    const { product } = props;
    return <Link href={`/item/${product.product_id}`} className="flex flex-col h-[300px] w-[20%] flex-shrink-0 shadow-lg rounded-lg duration-300 hover:scale-105">
        <div className="h-[80%] relative overflow-hidden rounded-lg">
            <Image className="object-cover" alt={product.product_name} src={`/images/products/${product.category_name_code}/${product.sub_category_name_code}/${product.product_image}`} fill />
        </div>
        <div className="px-2">
            <h6>{product.product_name}</h6>
            <h6>{product.product_price} {product.currency_code}</h6>
        </div>
    </Link>;
}