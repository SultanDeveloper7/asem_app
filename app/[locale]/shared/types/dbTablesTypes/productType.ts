import { CategoryType } from "./categoryType"

export type ProductType = CategoryType & {
    product_id: number,
    product_name: string,
    product_desc: string,
    product_price: number,
    currency_id: number,
    sub_category_id: number,
    product_image: string,
    product_created: Date,
    currency_code: string,
    sub_category_name: string,
    sub_category_name_ar: string,
    sub_category_name_code: string,
}