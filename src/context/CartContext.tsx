"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceFormatted: string;
  size: string;
  customName?: string;
  customNumber?: string;
  patches?: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    item: Omit<CartItem, "id" | "quantity">,
    quantityToAdd?: number,
    silent?: boolean,
  ) => void;
  buySingleItem: (item: Omit<CartItem, "id" | "quantity">, quantity?: number) => void;
  checkoutSingleItem: (id: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
}

const FREE_SHIPPING_THRESHOLD = 5000;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("asfa_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("asfa_cart", JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (
    itemData: Omit<CartItem, "id" | "quantity">,
    quantityToAdd = 1,
    silent = false,
  ) => {
    const id = `${itemData.slug}-${itemData.size}-${itemData.customName || ""}-${itemData.customNumber || ""}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + quantityToAdd } : i));
      }
      return [...prev, { ...itemData, id, quantity: quantityToAdd }];
    });

    if (!silent) {
      toast.success("Added to Cart", {
        description: `${itemData.name} (${itemData.size}) added to your equipment bag.`,
      });
      setIsOpen(true);
    }
  };

  // Direct Buy only this single product (sets cart to only this product)
  const buySingleItem = (itemData: Omit<CartItem, "id" | "quantity">, quantity = 1) => {
    const id = `${itemData.slug}-${itemData.size}-${itemData.customName || ""}-${itemData.customNumber || ""}`;
    const singleItem: CartItem = {
      ...itemData,
      id,
      quantity,
    };
    setItems([singleItem]);
    setIsOpen(false);
  };

  // Isolate a specific item in cart for single checkout
  const checkoutSingleItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id === id));
    setIsOpen(false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        buySingleItem,
        checkoutSingleItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
