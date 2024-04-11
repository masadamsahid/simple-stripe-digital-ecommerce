import db from "@/db/db";
import PageHeader from "../../../_components/PageHeader";
import ProductForm from "../../_components/ProductForm";

type Props = {
  params: { id: string };
}

const EditNewProductPage = async ({ params: { id } }: Props) => {
  
  const product = await db.product.findUnique({ where: { id } });
  
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}

export default EditNewProductPage;