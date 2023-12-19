"use server";

import { CreateCart, GetCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function IncrementProductQuantity(productid: string) {
  const cart = (await GetCart()) ?? (await CreateCart());
  const articleincart = cart.items.find((item) => item.productId === productid);
  if (articleincart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: articleincart.id },
            data: { quantity: { increment: 1 } },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId: productid,
            quantity: 1,
          },
        },
      },
    });
  }

  revalidatePath("/products/[id]");
}
