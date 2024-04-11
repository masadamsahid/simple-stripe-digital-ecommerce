import PageHeader from "../../_components/PageHeader";
import ProductForm from "../_components/ProductForm";

type Props = {}

const AddNewProductPage = (props: Props) => {
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm/>
    </>
  );
}

export default AddNewProductPage;