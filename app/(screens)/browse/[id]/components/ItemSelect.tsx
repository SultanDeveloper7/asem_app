"use client"
import { HttpApis } from "@/app/shared/apis";
import { HttpFetch } from "@/app/shared/functions/httpFetch";
import { ProductsType } from "@/app/shared/types/dbTablesTypes/productsType";
import { useEffect, useState } from "react";
type ItemSelectPros = {
    id: string
}
export default function ItemSelect(props: ItemSelectPros) {
    const { id } = props;
    const httpFetch = new HttpFetch();
    const [products, setProducts] = useState<ProductsType[]>([]);
    useEffect(() => {
        getProducts();
    }, []);
    async function getProducts() {
        const response = await httpFetch.getRequest<ProductsType[]>(`${HttpApis.productsApi}${id}`);
        setProducts(response.data?.data!)
    }
    return <div className="flex gap-8 flex-col items-center my-18">
        {
            products && products.map((e) => {
                return <div key={e.product_id}>{e.product_name}</div>
            })
        }
    </div>
}