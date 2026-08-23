"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Banknote,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Truck,
  History,
  ShoppingBag,
  Package,
  Calendar,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { useCart, type CartItem } from "@/context/CartContext";

export interface StoredOrder {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: "card" | "cod";
  status: "Confirmed" | "Processing" | "Dispatched";
}

const STORAGE_KEY = "asfa_orders_history";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, addItem, openCart } = useCart();

  const [activeTab, setActiveTab] = useState<"checkout" | "history">("checkout");
  const [storedOrders, setStoredOrders] = useState<StoredOrder[]>([]);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<StoredOrder | null>(null);

  // Load order history and autofill form from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: StoredOrder[] = JSON.parse(saved);
        setStoredOrders(parsed);

        // Autofill form with most recent customer details
        if (parsed.length > 0 && parsed[0].customer) {
          const lastCustomer = parsed[0].customer;
          setForm((prev) => ({
            ...prev,
            firstName: prev.firstName || lastCustomer.firstName || "",
            lastName: prev.lastName || lastCustomer.lastName || "",
            email: prev.email || lastCustomer.email || "",
            phone: prev.phone || lastCustomer.phone || "",
            address: prev.address || lastCustomer.address || "",
            city: prev.city || lastCustomer.city || "",
            postalCode: prev.postalCode || lastCustomer.postalCode || "",
          }));
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
  }, []);

  const handleContinuePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.phone || !form.address || !form.city) {
      toast.error("Please fill in all required customer and shipping fields.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = `ASFA-${Math.floor(100000 + Math.random() * 900000)}`;

      const currentItems: CartItem[] =
        items.length > 0
          ? items
          : [
              {
                id: "sample-falcon-jr",
                slug: "asfa-falcon-jr-miami-splash-kit",
                name: "ASFA Falcon JR Miami Splash Custom Full Kit",
                price: 1750,
                priceFormatted: "৳1,750",
                size: "M",
                image: "/assets/asfa-falcon-fullkit.png",
                quantity: 1,
              },
            ];

      const currentTotal =
        items.length > 0
          ? subtotal
          : currentItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

      const newOrder: StoredOrder = {
        id: generatedId,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        items: currentItems,
        subtotal: currentTotal,
        customer: { ...form },
        paymentMethod,
        status: "Confirmed",
      };

      // Save to localStorage
      try {
        const updatedOrders = [newOrder, ...storedOrders];
        setStoredOrders(updatedOrders);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
      } catch (err) {
        console.error("Failed to save order to localStorage:", err);
      }

      setLastPlacedOrder(newOrder);
      clearCart();

      const message =
        paymentMethod === "cod"
          ? `Cash on Delivery Order #${generatedId} placed! Stored in browser history.`
          : `Card payment authorized! Order #${generatedId} confirmed and saved to browser history.`;

      toast.success(
        paymentMethod === "cod" ? "Cash On Delivery Order Confirmed!" : "Payment Successful!",
        {
          description: message,
        },
      );
    }, 1200);
  };

  const handleReorder = (order: StoredOrder) => {
    order.items.forEach((it) => {
      addItem(it);
    });
    toast.success(`Items from ${order.id} re-added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => openCart(),
      },
    });
    setActiveTab("checkout");
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your local order history?")) {
      localStorage.removeItem(STORAGE_KEY);
      setStoredOrders([]);
      toast.info("Browser order history cleared.");
    }
  };

  // Order Confirmation Success View
  if (lastPlacedOrder) {
    return (
      <div className="bg-white min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full border border-neutral-300 bg-white p-8 sm:p-10 shadow-lg text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-[#047857] mb-5">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 block mb-1">
            {lastPlacedOrder.paymentMethod === "cod"
              ? "ORDER RECEIVED • CASH ON DELIVERY"
              : "PAYMENT AUTHORIZED"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight">
            Order Confirmed
          </h1>
          <p className="mt-2 text-xs font-mono text-neutral-500">
            Order Reference: <strong className="text-neutral-900">{lastPlacedOrder.id}</strong>
          </p>

          <div className="mt-6 border-t border-b border-neutral-200 py-4 text-left font-mono text-xs space-y-2">
            <div className="flex justify-between text-neutral-600">
              <span>Customer:</span>
              <strong className="text-neutral-900">
                {lastPlacedOrder.customer.firstName} {lastPlacedOrder.customer.lastName}
              </strong>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Phone:</span>
              <strong className="text-neutral-900">{lastPlacedOrder.customer.phone}</strong>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Delivery Address:</span>
              <strong className="text-neutral-900 truncate max-w-[180px]">
                {lastPlacedOrder.customer.address}, {lastPlacedOrder.customer.city}
              </strong>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Payment Option:</span>
              <strong className="text-[#047857] font-bold">
                {lastPlacedOrder.paymentMethod === "cod"
                  ? "Cash On Delivery (৳ Pay to Rider)"
                  : "Pay With Card / Online"}
              </strong>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Saved in Browser:</span>
              <strong className="text-emerald-700 font-bold">✓ Local Storage Saved</strong>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-neutral-500 font-mono leading-relaxed">
            {lastPlacedOrder.paymentMethod === "cod"
              ? "Our courier representative will deliver your kit to your doorstep. Please hand over the exact cash amount upon delivery."
              : "Your payment has been cleared. Dhanmondi fulfillment desk will prepare and dispatch your jerseys within 24–48 hours."}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setLastPlacedOrder(null);
                setActiveTab("history");
              }}
              className="w-full inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider py-3 px-6 shadow-xs transition-colors cursor-pointer"
            >
              View Order in History
            </button>
            <Link
              href="/products"
              className="text-xs font-mono text-neutral-600 hover:text-black font-bold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fallback display items if cart is empty
  const displayItems =
    items.length > 0
      ? items
      : [
          {
            id: "sample-falcon-jr",
            slug: "asfa-falcon-jr-miami-splash-kit",
            name: "ASFA Falcon JR Miami Splash Custom Full Kit",
            price: 1750,
            priceFormatted: "৳1,750",
            size: "M",
            image: "/assets/asfa-falcon-fullkit.png",
            quantity: 1,
          },
          {
            id: "sample-argentina-polo",
            slug: "asfa-argentina-messi-tribute-champions-polo",
            name: "ASFA Argentina 3-Star Polo",
            price: 1650,
            priceFormatted: "৳1,650",
            size: "L",
            image: "/assets/asfa-argentina-messi-tribute-angle.png",
            quantity: 1,
          },
        ];

  const currentSubtotal =
    items.length > 0
      ? subtotal
      : displayItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-white text-neutral-900 min-h-screen py-10 sm:py-16 selection:bg-neutral-900 selection:text-white">
      <div className="container-page max-w-5xl">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-neutral-900">
              {activeTab === "checkout" ? "Checkout" : "Order History"}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 font-normal">
              {activeTab === "checkout"
                ? "Complete your order securely below. Choose between Card Payment or Cash on Delivery."
                : "All confirmed orders stored securely in your browser's Local Storage."}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 border border-neutral-300 bg-[#F9FAF9] rounded-none">
            <button
              type="button"
              onClick={() => setActiveTab("checkout")}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "checkout"
                  ? "bg-black text-white shadow-2xs"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              Checkout
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === "history"
                  ? "bg-black text-white shadow-2xs"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              <History className="h-3.5 w-3.5" />
              History {mounted && storedOrders.length > 0 ? `(${storedOrders.length})` : ""}
            </button>
          </div>
        </div>

        {/* ─── TAB 1: ORDER HISTORY ────────────────────────────── */}
        {activeTab === "history" && (
          <div className="space-y-6">
            {storedOrders.length === 0 ? (
              <div className="border border-neutral-300 bg-[#F9FAF9] p-12 text-center max-w-lg mx-auto">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-400 mb-4 shadow-xs">
                  <Package className="h-7 w-7 text-neutral-600" />
                </div>
                <h2 className="text-base font-bold text-neutral-900 uppercase font-mono">
                  No Past Orders Found
                </h2>
                <p className="mt-2 text-xs font-mono text-neutral-500 max-w-xs mx-auto">
                  When you complete a checkout on this browser, your order receipt and tracking
                  history will be stored right here.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab("checkout")}
                    className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#065f46] px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xs transition-colors cursor-pointer"
                  >
                    Go To Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-neutral-500 font-semibold">
                    Showing {storedOrders.length} saved{" "}
                    {storedOrders.length === 1 ? "order" : "orders"} on this device
                  </span>
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="text-neutral-400 hover:text-red-600 font-bold transition-colors cursor-pointer"
                  >
                    Clear History
                  </button>
                </div>

                <div className="grid gap-6">
                  {storedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-neutral-300 bg-white p-6 shadow-2xs space-y-4"
                    >
                      {/* Top Bar: Order ID, Date & Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-black text-neutral-900">
                              {order.id}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                                order.paymentMethod === "cod"
                                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                                  : "bg-emerald-50 text-[#047857] border border-emerald-200"
                              }`}
                            >
                              {order.paymentMethod === "cod" ? "Cash on Delivery" : "Paid (Card)"}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {order.date}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                            Order Total
                          </span>
                          <span className="font-display text-lg font-black text-neutral-900">
                            ৳{order.subtotal.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Customer & Address Details */}
                      <div className="grid gap-4 sm:grid-cols-2 text-xs font-mono bg-[#F9FAF9] border border-neutral-200 p-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                            Recipient
                          </span>
                          <p className="font-bold text-neutral-900">
                            {order.customer.firstName} {order.customer.lastName}
                          </p>
                          <p className="text-neutral-600">{order.customer.phone}</p>
                          <p className="text-neutral-500">{order.customer.email}</p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                            Shipping Destination
                          </span>
                          <p className="text-neutral-800 leading-snug">{order.customer.address}</p>
                          <p className="font-bold text-neutral-900">
                            {order.customer.city}{" "}
                            {order.customer.postalCode ? `(${order.customer.postalCode})` : ""}
                          </p>
                        </div>
                      </div>

                      {/* Items in this order */}
                      <div className="divide-y divide-neutral-100">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3.5 py-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-neutral-200 bg-[#F7F8F7] p-1 flex items-center justify-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0 font-mono text-xs">
                              <h4 className="font-bold text-neutral-900 truncate">{item.name}</h4>
                              <p className="text-[11px] text-neutral-500">
                                Size: {item.size} {item.quantity > 1 ? `× ${item.quantity}` : ""}
                              </p>
                            </div>
                            <span className="font-mono text-xs font-bold text-neutral-900">
                              ৳{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="border-t border-neutral-200 pt-4 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Processing at Dhanmondi Dispatch Desk
                        </span>

                        <button
                          type="button"
                          onClick={() => handleReorder(order)}
                          className="inline-flex items-center gap-1.5 border border-neutral-300 bg-white hover:bg-neutral-100 px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-800 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Re-Order Items
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: CHECKOUT FORM ────────────────────────────── */}
        {activeTab === "checkout" && (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] items-start">
            {/* ─── Left Column: Form & Payment Methods ─── */}
            <form onSubmit={handleContinuePayment} className="space-y-8">
              {/* Payment Options Selection (Card vs COD) */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-800 mb-3">
                  Select Payment Method
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Option 1: Pay With Card / Online */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col text-left p-4 border transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-black bg-neutral-900 text-white shadow-xs"
                        : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Pay with Card
                      </span>
                      <span
                        className={`h-3.5 w-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === "card" ? "border-white bg-white" : "border-neutral-400"
                        }`}
                      >
                        {paymentMethod === "card" && (
                          <span className="h-2 w-2 rounded-full bg-neutral-900" />
                        )}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] font-mono leading-relaxed ${
                        paymentMethod === "card" ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      Credit / Debit Card, Visa, Mastercard, bKash & Nagad.
                    </p>
                  </button>

                  {/* Option 2: Cash on Delivery (COD) */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex flex-col text-left p-4 border transition-all cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-[#047857] bg-[#047857] text-white shadow-xs"
                        : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Cash on Delivery
                      </span>
                      <span
                        className={`h-3.5 w-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === "cod" ? "border-white bg-white" : "border-neutral-400"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <span className="h-2 w-2 rounded-full bg-[#047857]" />
                        )}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] font-mono leading-relaxed ${
                        paymentMethod === "cod" ? "text-emerald-100" : "text-neutral-500"
                      }`}
                    >
                      Pay with cash when courier delivers parcel to your door.
                    </p>
                  </button>
                </div>

                {/* Notice under selected payment method */}
                <div className="mt-3 p-3 border border-neutral-200 bg-[#F9FAF9] flex items-center gap-2.5 text-[11px] font-mono text-neutral-700">
                  {paymentMethod === "cod" ? (
                    <>
                      <Truck className="h-4 w-4 text-[#047857] shrink-0" />
                      <span>
                        <strong>Cash on Delivery:</strong> No advance payment needed. Hand over
                        exact cash upon delivery across all 64 districts.
                      </span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4 text-[#047857] shrink-0" />
                      <span>
                        <strong>Card / Online:</strong> 256-Bit SSL Encrypted authorization for
                        Visa, Mastercard, AMEX & Mobile Wallets.
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300" />
                </div>
                <span className="relative bg-white px-4 text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  CUSTOMER & SHIPPING INFO
                </span>
              </div>

              {/* Customer Information */}
              <div>
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight mb-4">
                  Customer Information
                </h2>

                <div className="space-y-4 font-mono text-xs">
                  {/* First Name & Last Name */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-[11px] font-mono text-neutral-700 mb-1"
                      >
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-[11px] font-mono text-neutral-700 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Address & Phone Number */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] font-mono text-neutral-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[11px] font-mono text-neutral-700 mb-1"
                      >
                        Phone Number (for Courier Delivery) *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div>
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight mb-4">
                  Shipping Details
                </h2>

                <div className="space-y-4 font-mono text-xs">
                  {/* Address Line 1 */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-[11px] font-mono text-neutral-700 mb-1"
                    >
                      Address Line 1 *
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      placeholder="Street Address, House/Flat No, Area"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* City & Postal Code */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-[11px] font-mono text-neutral-700 mb-1"
                      >
                        City / District *
                      </label>
                      <input
                        id="city"
                        type="text"
                        required
                        placeholder="Dhaka / Chattogram / Sylhet..."
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-[11px] font-mono text-neutral-700 mb-1"
                      >
                        Postal Code
                      </label>
                      <input
                        id="postalCode"
                        type="text"
                        placeholder="Postal Code (e.g. 1209)"
                        value={form.postalCode}
                        onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                        className="w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full inline-flex items-center justify-center bg-[#22C55E] hover:bg-[#16a34a] text-black font-mono text-xs font-black uppercase tracking-wider py-4 px-6 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isProcessing
                    ? "PROCESSING ORDER..."
                    : paymentMethod === "cod"
                      ? "CONFIRM CASH ON DELIVERY ORDER"
                      : "CONTINUE TO PAYMENT"}
                </button>
              </div>
            </form>

            {/* ─── Right Column: Order Summary ─── */}
            <div className="border border-neutral-300 bg-white p-6 shadow-2xs">
              <h2 className="text-base font-bold text-neutral-900 tracking-tight mb-4">
                Order Summary
              </h2>

              {/* Cart Items List */}
              <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 py-2">
                {displayItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3.5 py-4">
                    {/* Thumbnail with Border */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-neutral-200 bg-[#F7F8F7] p-1 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Item Specs */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-neutral-900 truncate leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                        Size: {item.size} {item.quantity > 1 ? `× ${item.quantity}` : ""}
                      </p>
                      <p className="text-xs font-mono font-bold text-neutral-900 mt-1">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="mt-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900">
                    ৳{currentSubtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-[11px] text-neutral-500">Calculated at next step</span>
                </div>

                <div className="flex items-center justify-between text-neutral-600">
                  <span>Payment Mode</span>
                  <span className="font-bold text-[#047857] uppercase text-[11px]">
                    {paymentMethod === "cod" ? "Cash On Delivery" : "Card / Online"}
                  </span>
                </div>

                <div className="border-t border-neutral-200 pt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-neutral-900">Total</span>
                  <span className="font-display text-xl font-black text-neutral-900">
                    ৳{currentSubtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Secure Checkout Badge */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                <Lock className="h-3 w-3" />
                <span>SECURE CHECKOUT</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
