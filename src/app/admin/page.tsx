import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import db from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatters';

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {

  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({ _sum: { pricePaidInCents: true } }),
  ]);

  return {
    userCount,
    avgValPerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getProductsData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  
  await wait(2000);
  
  return { activeCount, inactiveCount };
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

type Props = {}

const AdminDashboardPage = async (props: Props) => {
  const [salesData, userData, productsData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductsData(),
  ]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashboardCard
        c_title='Sales'
        c_subtitle={formatNumber(salesData.numberOfSales)}
        c_body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        c_title='Customer'
        c_subtitle={`${formatCurrency(userData.avgValPerUser)} Average Value`}
        c_body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        c_title='Active Products'
        c_subtitle={`${formatNumber(productsData.inactiveCount)} Inactive`}
        c_body={formatNumber(productsData.activeCount)}
      />
    </div>
  );
}

type DasboardCardProps = {
  c_title: string;
  c_subtitle: string;
  c_body: string;
} & React.ComponentProps<typeof Card>;

const DashboardCard = ({ c_title, c_subtitle, c_body, ...props }: DasboardCardProps) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{c_title}</CardTitle>
        <CardDescription>{c_subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{c_body}</p>
      </CardContent>
    </Card>
  );
}

export default AdminDashboardPage;