"use client"

import { HttpApis } from "@/app/[locale]/shared/apis";
import { HttpFetch } from "@/app/[locale]/shared/functions/httpFetch";
import { ProductType } from "@/app/[locale]/shared/types/dbTablesTypes/productType";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ItemDetailsProps = {
    id: string
}

export default function ItemDetails(props: ItemDetailsProps) {
    const { id } = props;
    const httpFetch = new HttpFetch();
    const [product, setProduct] = useState<ProductType>();
    const [breadcrumbs, setBreadcrumbs] = useState<React.ReactNode[]>();
    useEffect(() => {
        getProduct();
    }, [id]);

    async function getProduct() {
        const response = await httpFetch.getRequest<ProductType>(`${HttpApis.productApi}${id}`);
        const data = response.data?.data as ProductType;
        setProduct(response.data?.data!)
        const bread = [
            <Link key="1" href="/browse">
                Home
            </Link>,
            <Link key="2" color="inherit" href="/">
                {data?.category_name}
            </Link>,
            <Link
                key="3"
                color="inherit"
                href="/material-ui/getting-started/installation/"
            >
                {data?.sub_category_name}
            </Link>,
            <Typography key="4" sx={{ color: 'text.primary' }}>
                {data?.product_name}
            </Typography>]

        setBreadcrumbs(bread)
    }

    return <div className="flex flex-col my-18 h-screen w-full p-8">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
        </Breadcrumbs>
        <div className="flex h-full gap-4">
            <div className="h-[60%] w-[300px] relative overflow-hidden">
                {product && <Image className="object-cover" alt={product.product_name} src={`/images/products/${product.category_name_code}/${product.sub_category_name_code}/${product.product_image}`} fill />}
            </div>
            <div>
                <h3 className="font-bold text-2xl">{product?.product_name}</h3>
                <h4 className="text-md">{product?.product_desc}</h4>
                <h3 className="font-bold text-2xl mt-8">{product?.product_price} {product?.currency_code}</h3>
            </div>


        </div>
    </div>
}