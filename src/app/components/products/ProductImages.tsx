'use client';

import {
  CartProductType,
  SelectedImgType,
} from '@/app/product/[productId]/ProductDetails';
import Image from 'next/image';

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImages: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div
      className="grid 
      grid-cols-6 
      gap-2 h-full 
      max-h-[500px]
      min-h-[300px]
      sm:min-h-[400px]"
    >
      <div
        className="flex 
      flex-col 
      items-center 
      gap-4
      justify-center
      cursor-pointer
      border h-full
      max-h-[500px] min-h-[300px]
      sm:min-h-[400px]"
      >
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              className={`relative w-[80%] rounded border-teal-400 aspect-square
                ${
                  cartProduct.selectedImg.color === image.color
                    ? 'border-[1.5px]'
                    : 'border-none'
                }
                `}
              key={image.color}
              onClick={() => {
                handleColorSelect(image);
              }}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 relative aspect-square">
        <Image
        src={cartProduct.selectedImg.image}
        alt={cartProduct.name}
          fill
          className="
        w-full 
        h-ful 
        object-contain
        max-h-[500px] min-h-[300px]
        sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default ProductImages;
