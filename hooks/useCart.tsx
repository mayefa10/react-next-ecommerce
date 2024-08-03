import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import { toast } from 'react-hot-toast';

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);
interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const [paymentIntent, setPaymentIntent] = useState<string  | null>(null);

  //console.log('qty', cartTotalQty);
  //console.log('amount', cartTotalAmount);

  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems');
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent:any = localStorage.getItem('eShopPaymentIntent')
    const paymentIntent:string | null = JSON.parse(eShopPaymentIntent);
    
    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  //add the product to state function
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updateCart;

      if (prev) {
        updateCart = [...prev, product];
      } else {
        updateCart = [product];
      }
      toast.success('Product added successfully');
      localStorage.setItem('eShopCartItems', JSON.stringify(updateCart));
      return updateCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filterProduct = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filterProduct);
        toast.success('Product remove successfully');
        localStorage.setItem('eShopCartItems', JSON.stringify(filterProduct));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      if (product.quantity === 1) {
        return toast.error('OOPS! Minimum reached');
      }

      if (cartProducts) {
        updateCart = [...cartProducts];

        if (cartProducts) {
          const existingIndex = cartProducts.findIndex(
            (item) => item.id === product.id
          );
          if (existingIndex > -1) {
            updateCart[existingIndex].quantity = --updateCart[existingIndex]
              .quantity;
          }
          setCartProducts(updateCart);
          localStorage.setItem('eShopCartProducts', JSON.stringify(updateCart));
        }
      }
    },
    [cartProducts]
  );
  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      if (product.quantity === 99) {
        return toast.error('OOPS! Maximum reached');
      }

      if (cartProducts) {
        updateCart = [...cartProducts];

        if (cartProducts) {
          const existingIndex = cartProducts.findIndex(
            (item) => item.id === product.id
          );
          if (existingIndex > -1) {
            updateCart[existingIndex].quantity = ++updateCart[existingIndex]
              .quantity;
          }
          setCartProducts(updateCart);
          localStorage.setItem('eShopCartProducts', JSON.stringify(updateCart));
        }
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem('eShopCartProducts', JSON.stringify(null));
  }, [cartProducts]);
  
  const handleSetPaymentIntent = useCallback((val:string | null)=>{
    setPaymentIntent(val)
    localStorage.setItem('eShopPaymentIntent', JSON.stringify(val))
  }, [paymentIntent]);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used  within a CartContextProvider');
  }

  return context;
};
