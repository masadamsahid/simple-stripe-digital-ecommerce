import { cn } from "@/lib/utils";

type Props = {} & React.HTMLProps<HTMLHeadingElement>;

const PageHeader = ({ className, ...props}: Props) => {
  return (
    <h1 {...props} className={(cn("text-4xl mb-4"))} />
  );
}

export default PageHeader;