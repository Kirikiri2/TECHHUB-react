import { useContext, useState } from "react";
import { CartContext } from "../stores/stores";
import { useNavigate, NavLink } from "react-router";

export default function CartPage() {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("ЗАКАЗ ОФОРМЛЕН! СИСТЕМА TECHHUB ПРИНЯЛА ВАШ ЗАКАЗ!");
      setCart([]);
    }, 1500);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    if (window.confirm("УДАЛИТЬ ТОВАР ИЗ КОРЗИНЫ?")) {
      setCart(cart.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Хлебные крошки */}
        <div className="text-gray-400   text-sm mb-8 tracking-wider">
          <NavLink to="/" className="hover:text-white transition-colors">ГЛАВНАЯ</NavLink>
          <span className="mx-2">/</span>
          <NavLink to="/products" className="hover:text-white transition-colors">ТОВАРЫ</NavLink>
          <span className="mx-2">/</span>
          <span className="text-white font-bold">КОРЗИНА</span>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white  mb-4 tracking-tighter">
            КОРЗИНА <span className="font-(family-name:--font-title) text-3xl md:text-4xl">TECH<span className="text-gray-400">HUB</span></span>
          </h1>
          <p className="text-gray-400   text-sm sm:text-base">
            {cart.length > 0 ? `ВАШЕ ОБОРУДОВАНИЕ (${totalItems} ЕД.)` : "ВАША КОРЗИНА ОЖИДАЕТ ОБОРУДОВАНИЯ"}
          </p>
        </div>

        {cart.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Товары в корзине */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black border-2 border-gray-800 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white   tracking-wider">
                    ВАШИ ТОВАРЫ <span className="text-gray-400"></span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {cart.map(item => (
                    <div 
                      key={item.id}
                      className="group bg-gray-900 border-2 border-gray-800 p-4 hover:border-gray-700 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Изображение товара */}
                        <div className="w-full sm:w-24 h-24 bg-black border border-gray-800 flex-shrink-0">
                          <img
                            src={`http://localhost:3000${item.image_url}`}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Информация о товаре */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-white   mb-1">{item.name}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400   text-xs border border-gray-700 px-2 py-0.5">
                                  {item.category.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-500 hover:text-white transition-colors   text-xl font-bold w-8 h-8 flex items-center justify-center hover:bg-gray-800"
                            >
                              ×
                            </button>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            {/* Управление количеством */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center border-2 border-gray-800">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-10 h-10 bg-gray-800 text-white   font-bold hover:bg-gray-700 transition-colors flex items-center justify-center"
                                >
                                  −
                                </button>
                                <span className="w-12 h-10 bg-black text-white   font-bold flex items-center justify-center border-x border-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-10 h-10 bg-gray-800 text-white   font-bold hover:bg-gray-700 transition-colors flex items-center justify-center"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-gray-400   text-xs">
                                ШТ.
                              </div>
                            </div>
                            
                            {/* Цена */}
                            <div className="text-right">
                              <div className="text-white font-bold text-xl  ">
                                {(item.price * item.quantity).toLocaleString()} ₽
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Кнопка продолжить покупки */}
              <button
                onClick={handleContinueShopping}
                className="w-full bg-gray-900 text-white   font-bold tracking-wider py-4 
                         border-2 border-gray-800 hover:bg-gray-800 hover:border-white 
                         transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>←</span>
                ПРОДОЛЖИТЬ ПОКУПКИ
              </button>
            </div>

            {/* Итоговая информация */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-black border-2 border-gray-800 p-6">
                  <h2 className="text-xl font-bold text-white   mb-6 pb-4 border-b-2 border-gray-800 tracking-wider">
                    ИТОГ ЗАКАЗА
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400   text-sm">ТОВАРЫ ({totalItems} ЕД.)</span>
                      <span className="text-white   font-bold">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400   text-sm">ДОСТАВКА</span>
                      <span className="text-white   font-bold text-green-400">БЕСПЛАТНО</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t-2 border-gray-800">
                      <div>
                        <div className="text-white   font-bold text-lg">ИТОГО</div>
                        <div className="text-gray-400   text-xs">С УЧЁТОМ НДС</div>
                      </div>
                      <div className="text-white   font-bold text-2xl">
                        {totalPrice.toLocaleString()} ₽
                      </div>
                    </div>
                  </div>

                  {/* Статус доступности */}
                  <div className="mb-6 p-4 bg-gray-900 border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
                      <span className="text-white   text-sm">ВСЕ ТОВАРЫ В НАЛИЧИИ</span>
                    </div>
                    <div className="text-gray-400   text-xs">
                      ДОСТАВКА: 1-3 РАБОЧИХ ДНЯ
                    </div>
                  </div>

                  {/* Кнопка оформления */}
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className={`w-full py-4   font-bold tracking-wider border-2 transition-all duration-300
                              ${isProcessing 
                                ? 'bg-gray-800 border-gray-700 cursor-not-allowed text-gray-400' 
                                : 'bg-white text-black border-white hover:bg-gray-100 hover:scale-[1.02]'} 
                              flex items-center justify-center gap-3`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
                        ОБРАБОТКА...
                      </>
                    ) : (
                      <>
                        ОФОРМИТЬ ЗАКАЗ
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>
        ) : (
          // Пустая корзина
          <div className="text-center py-16 sm:py-24 border-2 border-gray-800 bg-black">
            <div className="max-w-md mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white   mb-4">
                КОРЗИНА ПУСТА
              </h2>
              <p className="text-gray-400   text-sm sm:text-base mb-8">
                ВАША КОРЗИНА ОЖИДАЕТ ВЫСОКОПРОИЗВОДИТЕЛЬНОГО ОБОРУДОВАНИЯ
              </p>
              <div className="space-y-4">
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-white text-black   font-bold tracking-wider py-4 
                           border-2 border-white hover:bg-gray-100 transition-all duration-300"
                >
                  ПЕРЕЙТИ К ПОКУПКАМ
                </button>
                <NavLink 
                  to="/products"
                  className="inline-block w-full bg-gray-900 text-white   font-bold tracking-wider py-3 
                           border-2 border-gray-800 hover:bg-gray-800 hover:border-white transition-all duration-300"
                >
                  ПОСМОТРЕТЬ ТОПОВЫЕ ТОВАРЫ
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}