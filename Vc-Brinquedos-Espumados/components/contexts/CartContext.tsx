import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number; // ✅ novo campo
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(p => p.id === item.id);
      if (existingItem) {
        return prevItems.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems
        .map(p =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter(p => p.quantity > 0) // ✅ remove se quantidade 0
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, incrementQuantity, decrementQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart precisa estar dentro do CartProvider');
  }
  return context;
}
