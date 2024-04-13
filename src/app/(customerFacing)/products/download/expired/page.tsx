import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

type Props = {}

export default function ExpiredDownloadPage(props: Props) {
  return (
    <>
      <h1 className='text-4xl mb-4'>Download Link Expired</h1>
      <Button asChild size='lg'>
        <Link href='/orders'>
          Get New Link
        </Link>
      </Button>
    </>
  );
}