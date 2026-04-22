import { ProductsType } from "./productsType"
import { TagsType } from "./tagsType"

export type TagsAndProductsType = {
    tag: TagsType,
    products: ProductsType[],
}