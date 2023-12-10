import { Cart, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function GetCart(): Promise<ShoppingCart | null> {
  const localcartid = cookies().get("localcartid")?.value;
  const cart = localcartid
    ? await prisma.cart.findUnique({
        where: { id: localcartid },
        include: { items: { include: { product: true } } },
      })
    : null;
  if (!cart) {
    return null;
  }
  return {
    ...cart,
    size: cart.items.reduce((value, item) => value + item.quantity, 0),
    subtotal: cart.items.reduce(
      (val, item) => val + item.quantity * item.product.price,
      0
    ),
  };
}

export async function CreateCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });
  cookies().set("localcartid", newCart.id);
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
