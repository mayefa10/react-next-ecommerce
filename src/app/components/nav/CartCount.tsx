'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '../../../../hooks/useCart';
import { CiShoppingCart } from 'react-icons/ci';

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push('/cart')}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span
        className="absolute top-[-10px]
        right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center
        justify-center text-sm"
      >
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
