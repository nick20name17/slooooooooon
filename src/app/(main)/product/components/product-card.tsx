"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

import { YearBadge } from "../../components/year-badge";

import type { Product } from "@/api/products/products.type";
import productFallback from "@/assets/images/product-fallback.jpg";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductAddToCart } from "./product-add-to-cart";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <article className="relative flex w-full justify-between gap-4 rounded-[40px] bg-[#e6ddb9] p-10 max-lg:p-6 max-[980px]:flex-col">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                opts={{
                    loop: true,
                }}
                className="flex-[1.3] overflow-hidden rounded-[20px]">
                <CarouselContent className="relative h-[500px] bg-background">
                    <CarouselItem>
                        <Image
                            src={
                                product.thumbnail
                                    ? product.thumbnail
                                    : productFallback.src
                            }
                            alt={product.title}
                            height={500}
                            width={100}
                            className="h-full w-full rounded-[20px] object-cover"
                        />
                    </CarouselItem>
                    {product.images.map((image) => (
                        <CarouselItem key={image.id}>
                            <Image
                                src={
                                    image.image
                                        ? image.image
                                        : productFallback.src
                                }
                                alt={product.title}
                                height={500}
                                width={100}
                                className="h-full w-full rounded-[20px] object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious
                    tabIndex={-1}
                    className="absolute left-0 h-full w-20 -translate-y-1/2 rounded-none border-none bg-transparent hover:bg-transparent [&>*]:hidden"
                />
                <CarouselNext
                    tabIndex={-1}
                    className="absolute right-0 h-full w-20 -translate-y-1/2 rounded-none border-none bg-transparent hover:bg-transparent [&>*]:hidden"
                />
            </Carousel>

            <div className="flex flex-1 flex-col gap-y-6 rounded-[20px] border bg-[#d9cfaa] p-5 text-background">
                <YearBadge year={product.year} />
                <h1 className="text-[42px] font-bold leading-none">
                    {product.title}
                </h1>
                <p className="text-xl leading-none">{product.description}</p>
                <ProductAddToCart product={product} />
            </div>

            <Button className="absolute -top-4 right-10 flex rounded-full border-2 border-background bg-[#e6ddb9] text-2xl text-background shadow-[1px_2px_0px_0px_#212726] transition-all hover:bg-background hover:!text-[#e6ddb9] hover:shadow-none">
                <Link href="/">Закрити</Link>
            </Button>
        </article>
    );
};
