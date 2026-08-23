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
  addItem: (item: Omit<CartItem, "id" | "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
}

const FREE_SHIPPING_THRESHOLD = 5000;

// Initial starter items matching the user's reference screenshot
const INITIAL_ITEMS: CartItem[] = [
  {
    id: "argentina-polo-l",
    slug: "asfa-argentina-messi-tribute-champions-polo",
    name: "ASFA Argentina 3-Star World Champions Tribute Polo",
    price: 1650,
    priceFormatted: "৳1,650",
    size: "L",
    image: "/assets/products/asfa-argentina-polo.png",
    quantity: 1,
  },
  {
    id: "falcon-jr-m",
    slug: "asfa-falcon-jr-miami-splash-kit",
    name: "ASFA FALCON JR Miami Splash Custom Full Kit",
    price: 1750,
    priceFormatted: "৳1,750",
    size: "M",
    image: "/assets/products/asfa-falcon-jr-full-set.png",
    quantity: 1,
  },
];

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
        setItems(INITIAL_ITEMS);
      }
    } catch {
      setItems(INITIAL_ITEMS);
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

  const addItem = (itemData: Omit<CartItem, "id" | "quantity">) => {
    const id = `${itemData.slug}-${itemData.size}-${itemData.customName || ""}-${itemData.customNumber || ""}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...itemData, id, quantity: 1 }];
    });
    toast.success("Added to Cart", {
      description: `${itemData.name} (${itemData.size}) added to your equipment bag.`,
    });
    setIsOpen(true);
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
