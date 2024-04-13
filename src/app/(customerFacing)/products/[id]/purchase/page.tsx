import db from '@/db/db';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';
import CheckoutForm from './_components/CheckoutForm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type Props = {
  params: { id: string };
}

export default async function PurchasPage({ params: { id }, ...props}: Props) {
  const product = await db.product.findUnique({where: {id}});
  if(!product) return notFound();
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id }
  });
  
  if(paymentIntent.client_secret == null){
    throw new Error('Stripe failed to make payment intent');
  }
  
  
  return (
    <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} /> 
  );
}