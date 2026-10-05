import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, CreditCard, Sparkles, MapPin, Receipt, ArrowRight } from 'lucide-react';
import { CartItem, OrderDetails } from '../types/toy';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  giftNote?: string;
  promoDiscount: number;
  onClose: () => void;
  onOrderComplete: (orderDetails: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  giftNote,
  promoDiscount,
  onClose,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [fullName, setFullName] = useState('Elena Rostova');
  const [email, setEmail] = useState('elena.rostova@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-8971');
  const [address, setAddress] = useState('742 Evergreen Meadow Way');
  const [city, setCity] = useState('Portland');
  const [postalCode, setPostalCode] = useState('97201');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'apple_pay'>('card');
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 60 || shippingMethod === 'standard' ? 0 : 9.50;
  const total = Math.max(0, subtotal - promoDiscount + shippingCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order: OrderDetails = {
      orderId: `WK-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      items,
      subtotal,
      shipping: shippingCost,
      discount: promoDiscount,
      total,
      customer: {
        fullName,
        email,
        phone,
        address,
        city,
        postalCode,
      },
      giftNote,
      shippingMethod: shippingMethod === 'express' ? 'Artisan Express (2 Business Days)' : 'Complimentary Ground (3–5 Business Days)',
      estimatedDelivery: '3 business days'
    };

    setPlacedOrder(order);
    onOrderComplete(order);
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FDFBF7] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E0D5C5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE3D7] bg-[#F7F2E9]">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-[#2D2723]">
              {step === 'confirmed' ? 'Receipt & Tracking' : 'Artisan Toy Checkout'}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-[#4A3E33] hover:bg-white rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {step === 'shipping' && (
            <form onSubmit={() => setStep('payment')} className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-[#2D2723] mb-1">
                  1. Delivery Destination
                </h3>
                <p className="text-xs text-[#6F6253]">
                  All toys are carefully packed in recyclable molded pulp with acid-free tissue.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E33] mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D5CABB] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E33] mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D5CABB] rounded-lg"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A3E33] mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D5CABB] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E33] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D5CABB] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E33] mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#D5CABB] rounded-lg"
                  />
                </div>
              </div>

              {/* Shipping Speed Option */}
              <div>
                <label className="block text-xs font-semibold text-[#4A3E33] mb-2">Delivery Service</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShippingMethod('standard')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-[#2D2723] bg-[#F7F2E9]'
                        : 'border-[#E2D6C6] bg-white'
                    }`}
                  >
                    <div className="flex justify-between text-xs font-bold text-[#2D2723]">
                      <span>Complimentary Ground</span>
                      <span className="font-mono text-[#376428]">FREE</span>
                    </div>
                    <div className="text-[11px] text-[#786C5E] mt-0.5">3–5 Business Days · Carbon-Neutral</div>
                  </div>

                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-[#2D2723] bg-[#F7F2E9]'
                        : 'border-[#E2D6C6] bg-white'
                    }`}
                  >
                    <div className="flex justify-between text-xs font-bold text-[#2D2723]">
                      <span>Artisan Priority Express</span>
                      <span className="font-mono">$9.50</span>
                    </div>
                    <div className="text-[11px] text-[#786C5E] mt-0.5">1–2 Business Days with Tracking</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-[#EAE1D3]">
                <div className="text-xs text-[#6B5E51]">
                  Total due: <span className="font-mono font-bold text-[#2D2723]">${total.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2D2723] text-white text-xs font-semibold rounded-lg hover:bg-[#433A33] transition-colors flex items-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-[#2D2723] mb-1">
                  2. Payment & Verification
                </h3>
                <p className="text-xs text-[#6F6253]">
                  Select your preferred settlement method. All transactions are securely encrypted.
                </p>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'apple_pay', label: 'Apple Pay', icon: Sparkles },
                  { id: 'cod', label: 'Pay on Delivery', icon: Truck },
                ].map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === pm.id
                          ? 'border-[#2D2723] bg-[#F7F2E9] shadow-2xs font-semibold text-[#2D2723]'
                          : 'border-[#E2D6C6] bg-white text-[#5E5144]'
                      }`}
                    >
                      <Icon size={18} className="mx-auto mb-1 text-[#6F5133]" />
                      <div className="text-xs">{pm.label}</div>
                    </button>
                  );
                })}
              </div>

              {/* Method Detail Box */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-white rounded-xl border border-[#D5CABB] space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E33] mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full text-xs px-3 py-2 bg-[#FAF7F2] border border-[#D5CABB] rounded-lg font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3E33] mb-1">Expiry Date</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full text-xs px-3 py-2 bg-[#FAF7F2] border border-[#D5CABB] rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3E33] mb-1">CVC Code</label>
                      <input
                        type="text"
                        defaultValue="892"
                        className="w-full text-xs px-3 py-2 bg-[#FAF7F2] border border-[#D5CABB] rounded-lg font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-[#FAF5EB] rounded-xl border border-[#E5DACB] text-xs text-[#5E5042] space-y-1.5">
                  <div className="font-semibold text-[#2D2723]">Cash on Delivery (COD) Selected</div>
                  <div>
                    Pay exact cash or card to the courier upon inspection. Total payable at doorstep:{' '}
                    <strong className="font-mono text-[#2D2723]">${total.toFixed(2)}</strong>.
                  </div>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="p-4 bg-[#FAF5EB] rounded-xl border border-[#E5DACB] text-xs text-[#5E5042] text-center">
                  One-touch biometric verification ready. Your default shipping address will be confirmed.
                </div>
              )}

              {/* Order Summary Recap */}
              <div className="bg-[#FAF5EB] p-4 rounded-xl border border-[#E8DEC3] space-y-2 text-xs">
                <div className="flex justify-between text-[#685B4E]">
                  <span>Items ({items.length})</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#386629]">
                    <span>Discount</span>
                    <span className="font-mono">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#685B4E]">
                  <span>Delivery ({shippingMethod})</span>
                  <span className="font-mono">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#2D2723] pt-2 border-t border-[#DFD3C1]">
                  <span>Final Amount</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#6F6152] hover:text-[#2D2723]"
                >
                  ← Back to address
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2D2723] text-white text-xs font-semibold rounded-lg hover:bg-[#433A33] transition-colors"
                >
                  Confirm & Place Order · ${total.toFixed(2)}
                </button>
              </div>
            </form>
          )}

          {step === 'confirmed' && placedOrder && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-[#EAF2E4] text-[#3B6A2E] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#2D2723]">
                  Order Confirmed & Preparing in Atelier
                </h3>
                <div className="flex items-center justify-center gap-2 text-xs text-[#7B6E61] mt-1 font-mono">
                  <span>Order {placedOrder.orderId}</span>
                  <span aria-hidden="true">·</span>
                  <span>{placedOrder.date}</span>
                </div>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#FAF5EB] rounded-xl p-5 border border-[#E5DACB] text-left space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8DEC3] pb-3 text-xs font-semibold text-[#483B2E]">
                  <div className="flex items-center gap-2">
                    <Receipt size={15} />
                    <span>Order Receipt Summary</span>
                  </div>
                  <span className="font-mono text-xs">{placedOrder.items.length} items</span>
                </div>

                <div className="space-y-2.5 max-h-40 overflow-y-auto text-xs">
                  {placedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-[#2D2723]">
                          {item.quantity}× {item.product.name}
                        </div>
                        {item.engravingText && (
                          <div className="text-[11px] text-[#7A5B36] italic">
                            Engraved: "{item.engravingText}"
                          </div>
                        )}
                      </div>
                      <div className="font-mono tabular-nums text-[#4A3D30]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8DEC3] pt-3 text-xs space-y-1 text-[#615243]">
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{placedOrder.shippingMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivering to:</span>
                    <span className="text-right">{placedOrder.customer.fullName}, {placedOrder.customer.city}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#2D2723] pt-2">
                    <span>Total Paid:</span>
                    <span className="font-mono tabular-nums">${placedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Simulated Live Tracking Timeline */}
              <div className="p-4 bg-white rounded-xl border border-[#E5DACB] text-left space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2D2723]">
                  <Truck size={15} className="text-[#6D4F2F]" />
                  <span>Workshop Tracking Simulator</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 bg-[#EAF2E4] text-[#345F28] rounded font-semibold">
                    1. Order Received
                  </div>
                  <div className="p-2 bg-[#FAF5EB] text-[#7A6B5C] rounded">
                    2. Wood Polish & Box
                  </div>
                  <div className="p-2 bg-[#FAF5EB] text-[#7A6B5C] rounded">
                    3. Courier Dispatch
                  </div>
                </div>
                <div className="text-[11px] text-[#7D7063] text-center">
                  Confirmation receipt dispatched to <strong>{placedOrder.customer.email}</strong>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#2D2723] text-white text-xs font-semibold rounded-lg hover:bg-[#433A33]"
              >
                Back to Toy Shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
