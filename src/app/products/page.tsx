import { PRODUCT_CATEGORIES } from "@/config";
import { NextPage } from "next";
import { MaxWidthWrapper } from "../_components/max-witdh-wrapper";
import { ProductReel } from "../_components/product-reel";

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage: NextPage<ProductsPageProps> = ({ searchParams }) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category,
  )?.label;

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Browse high quality assets"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
