import {Loader2} from 'lucide-react'

type Props = {}

const AdminLoading = (props: Props) => {
  return (
    <div className='flex justify-center'>
      <Loader2 className='size-24 animate-spin'/>
    </div>
  );
}

export default AdminLoading;