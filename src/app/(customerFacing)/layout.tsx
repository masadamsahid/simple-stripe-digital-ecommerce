import Nav, { NavLink } from "@/components/Nav";

export const dynamic = 'force-dynamic';

type Props = Readonly<{
  children: React.ReactNode;
}>

const Layout = ({ children, ...props }: Props) => {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="container my-6">
        {children}
      </div>
    </>
  );
}

export default Layout;