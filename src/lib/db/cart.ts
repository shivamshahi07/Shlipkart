import { Cart, CartItem, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function GetCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOptions);
  let cart: CartWithProducts | null = null;
  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
    });
  } else {
    const localcartid = cookies().get("localcartid")?.value;
    cart = localcartid
      ? await prisma.cart.findUnique({
          where: { id: localcartid },
          include: { items: { include: { product: true } } },
        })
      : null;
  }

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
  const session = await getServerSession(authOptions);
  let newCart: Cart;
  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session.user.id },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
    cookies().set("localcartid", newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
export async function MergeaCartwUser(userId: string) {
  const localcartid = cookies().get("localcartid")?.value;
  const localcart = localcartid
    ? await prisma.cart.findUnique({
        where: { id: localcartid },
        include: { items: true },
      })
    : null;

  if (!localcart) return;
  const usercart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });
  await prisma.$transaction(async (tx) => {
    if (usercart) {
      const mergedcartitems = mergeCartItems(localcart.items, usercart.items);
      await tx.cartItem.deleteMany({
        where: { cartId: usercart.id },
      });
      await tx.cartItem.createMany({
        data: mergedcartitems.map((item) => ({
          cartId: usercart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localcart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }
    await tx.cart.delete({
      where: { id: localcartid },
    });
    cookies().set("localcartid", "");
  });
}
function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}
