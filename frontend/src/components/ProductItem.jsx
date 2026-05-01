import { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router"; 
import { CartContext } from "../stores/stores";

export default function ProductItem() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  
  const cartItem = product
    ? cart.find(element => element.id === product.id)
    : null;

  const quantity = cartItem?.quantity || 0;

  useEffect(() => {
    async function fetchProductAndReviews() {
      try {
        const productRes = await fetch(`http://localhost:3000/api/products/${id}`);
        const productJson = await productRes.json();
        const productData = productJson.data;
        setProduct(productData);
        setActiveImage(productData.image_url);

        const reviewsRes = await fetch(`http://localhost:3000/api/products/${id}/reviews`);
        const reviewsJson = await reviewsRes.json();
        setReviews(reviewsJson.data);
      } catch (err) {
        console.error("Ошибка загрузки товара или отзывов:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProductAndReviews();
  }, [id]);

  const updateCartQuantity = (newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      const existingItem = cart.find(element => element.id === product.id);

      if (existingItem) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        ));
      } else {
        setCart([
          ...cart,
          {
            ...product,
            quantity: newQuantity
          }
        ]);
      }
    }
  }

  const handleAdd = () => {
    if (!product) return;
    const currentQuantity = cart.find(item => item.id === product.id)?.quantity || 0;
    updateCartQuantity(currentQuantity + 1);
  };

  const handleRemove = () => {
    if (!product) return;
    const currentQuantity = cart.find(item => item.id === product.id)?.quantity || 0;
    if (currentQuantity > 0) {
      updateCartQuantity(currentQuantity - 1);
    }
  };

  if (loading) return (
    <div className="min-h-[50vh] xs:min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 xs:h-10 sm:h-12 w-8 xs:w-10 sm:w-12 border-t-2 border-b-2 border-white mb-4 xs:mb-5 sm:mb-6"></div>
        <p className="text-white text-lg xs:text-xl sm:text-2xl tracking-wider px-2">ЗАГРУЗКА ТОВАРА...</p>
      </div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-[50vh] xs:min-h-[60vh] flex flex-col items-center justify-center px-2">
      <div className="text-center">
        <div className="text-white text-4xl xs:text-5xl sm:text-6xl mb-4 xs:mb-5 sm:mb-6">404</div>
        <p className="text-white text-xl xs:text-2xl mb-3 xs:mb-4">ТОВАР НЕ НАЙДЕН</p>
        <p className="text-gray-400 mb-6 xs:mb-8 text-sm xs:text-base px-2">ПОПРОБУЙТЕ ВЫБРАТЬ ДРУГОЙ ТОВАР</p>
        <NavLink 
          to="/products"
          className="inline-flex items-center gap-2 xs:gap-3 bg-white text-black px-4 xs:px-6 sm:px-8 py-2 xs:py-3 
                   font-bold tracking-wider border border-white xs:border-2 
                   hover:bg-gray-100 transition-all duration-300 text-sm xs:text-base"
        >
          К КАТАЛОГУ
        </NavLink>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 py-6 xs:py-8 sm:py-12">
      {/* Хлебные крошки */}
      <div className="text-gray-400 text-xs xs:text-sm mb-6 xs:mb-8 tracking-wider text-wrap">
        <NavLink to="/" className="hover:text-white transition-colors">ГЛАВНАЯ</NavLink>
        <span className="mx-1 xs:mx-2">/</span>
        <NavLink to="/products" className="hover:text-white transition-colors">ТОВАРЫ</NavLink>
        <span className="mx-1 xs:mx-2">/</span>
        <span className="text-gray-300">{product.category.toUpperCase()}</span>
        <span className="mx-1 xs:mx-2">/</span>
        <span className="text-white font-bold truncate text-wrap">{product.name}</span>
      </div>

      {/* Основная информация о товаре */}
      <div className="bg-black border border-gray-800 xs:border-2 mb-8 xs:mb-10 sm:mb-12">
        <div className="flex flex-col lg:flex-row">
          {/* Изображение товара */}
          <div className="lg:w-1/2 p-3 xs:p-4 sm:p-6 md:p-8 bg-gray-900 lg:border-r border-gray-800">
            <div className="border border-gray-700 xs:border-2 p-1 xs:p-2 mb-4 xs:mb-6">
              <div className="relative bg-black">
                <img
                  src={`http://localhost:3000${activeImage || product.image_url}`}
                  alt={product.name}
                  className="w-full h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="lg:w-1/2 p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <div className="mb-6 xs:mb-8">
              {/* Категория */}
              <div className="mb-3 xs:mb-4">
                <span className="inline-block bg-gray-800 text-gray-300 py-1 px-2 xs:px-3 text-xs xs:text-sm
                               tracking-wider border border-gray-700">
                  {product.category.toUpperCase()}
                </span>
              </div>
              
              {/* Название */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-4 xs:mb-6 leading-tight">
                {product.name}
              </h1>
              
              {/* Описание */}
              <div className="mb-6 xs:mb-8 p-3 xs:p-4 sm:p-6 bg-gray-900 border border-gray-800">
                <p className="text-gray-300 leading-relaxed text-sm xs:text-base">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Цена и рейтинг */}
            <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-6 xs:mb-8 p-4 xs:p-5 sm:p-6 bg-gray-900 border border-gray-800">
              <div className="mb-4 xs:mb-0">
                <span className="text-gray-400 text-xs xs:text-sm tracking-wider block mb-1 xs:mb-2">ЦЕНА</span>
                <span className="text-3xl xs:text-4xl font-bold text-white">{product.price} ₽</span>
              </div>
              <div className="text-left xs:text-right">
                <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                  <span className="text-xl xs:text-2xl text-amber-500">★★★★★</span>
                  <span className="text-gray-400 text-sm xs:text-base">(4.8)</span>
                </div>
                <span className="text-gray-400 text-xs xs:text-sm">РЕЙТИНГ</span>
              </div>
            </div>

            {/* Управление корзиной */}
            <div className="mb-6 xs:mb-8">
              {quantity === 0 ? (
                <button
                  onClick={handleAdd}
                  className="w-full bg-white text-black py-3 xs:py-4 font-bold text-base xs:text-lg sm:text-xl 
                           tracking-wider transition-all duration-300 hover:bg-gray-100 
                           border border-white xs:border-2 flex items-center justify-center gap-2 xs:gap-3 group"
                >
                  ДОБАВИТЬ В КОРЗИНУ
                  <span className="group-hover:translate-x-1 xs:group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
              ) : (
                <div className="bg-gray-900 border border-gray-800 p-3 xs:p-4">
                  <div className="flex items-center justify-between bg-black p-2 xs:p-3 border border-gray-700">
                    <button
                      onClick={handleRemove}
                      className="w-10 h-10 xs:w-12 xs:h-12 bg-gray-800 text-white flex items-center justify-center 
                               hover:bg-gray-700 transition-all duration-200 text-xl xs:text-2xl font-bold
                               border border-gray-700"
                    >
                      −
                    </button>
                    <div className="text-center">
                      <div className="text-white font-bold text-xl xs:text-2xl">{quantity} ШТ.</div>
                      <div className="text-gray-400 text-xs xs:text-sm tracking-wider">В КОРЗИНЕ</div>
                    </div>
                    <button
                      onClick={handleAdd}
                      className="w-10 h-10 xs:w-12 xs:h-12 bg-gray-800 text-white flex items-center justify-center 
                               hover:bg-gray-700 transition-all duration-200 text-xl xs:text-2xl font-bold
                               border border-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Характеристики */}
            <div className="mt-6 xs:mt-8 pt-6 xs:pt-8 border-t border-gray-800">
              <h3 className="text-lg xs:text-xl font-bold text-white mb-3 xs:mb-4 tracking-wider">ХАРАКТЕРИСТИКИ</h3>
              <div className="space-y-2 xs:space-y-3">
                <div className="flex justify-between items-center py-1 xs:py-2 border-b border-gray-800">
                  <span className="text-gray-400 text-xs xs:text-sm">КАТЕГОРИЯ</span>
                  <span className="text-white text-sm xs:text-base">{product.category}</span>
                </div>
                <div className="flex justify-between items-center py-1 xs:py-2 border-b border-gray-800">
                  <span className="text-gray-400 text-xs xs:text-sm">СТАТУС</span>
                  <span className="text-white text-sm xs:text-base">В НАЛИЧИИ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Отзывы */}
      <div className="bg-black border border-gray-800 xs:border-2 p-4 xs:p-5 sm:p-6 md:p-8">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-6 xs:mb-8">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-1 xs:mb-2 tracking-wider">
              ОТЗЫВЫ ПОКУПАТЕЛЕЙ
            </h2>
            <p className="text-gray-400 text-sm xs:text-base">РЕАЛЬНЫЕ ОЦЕНКИ ПОЛЬЗОВАТЕЛЕЙ</p>
          </div>
          <div className="text-left xs:text-right">
            <span className="text-white text-3xl xs:text-4xl font-bold">{reviews.length}</span>
            <div className="text-gray-400 text-xs xs:text-sm">ОТЗЫВОВ</div>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-8 xs:py-10 sm:py-12 border border-dashed border-gray-800 xs:border-2">
            <p className="text-gray-400 text-base xs:text-lg mb-3 xs:mb-4">ПОКА НЕТ ОТЗЫВОВ</p>
            <p className="text-gray-500 text-sm xs:text-base">БУДЬТЕ ПЕРВЫМ!</p>
          </div>
        ) : (
          <div className="space-y-4 xs:space-y-6">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="border border-gray-800 xs:border-2 p-3 xs:p-4 sm:p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-3 xs:mb-4">
                  <div className="flex-1">
                    {/* Заголовок отзыва */}
                    <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mb-2 xs:mb-3">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gray-800 border border-gray-700 rounded-full 
                                   flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm xs:text-base sm:text-lg">
                          U{rev.user_id.toString().slice(-2)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-bold text-sm xs:text-base truncate">ПОЛЬЗОВАТЕЛЬ {rev.user_id}</div>
                        <div className="text-gray-400 text-xs xs:text-sm">
                          {new Date(rev.created_at).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }).toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    {/* Рейтинг */}
                    <div className="flex items-center gap-1 xs:gap-2 mb-3 xs:mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-lg xs:text-xl ${i < rev.stars ? 'text-white' : 'text-gray-700'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-white font-bold text-sm xs:text-base">{rev.stars}.0</span>
                    </div>
                  </div>
                </div>
                
                {/* Текст отзыва */}
                <div className="bg-gray-900 border border-gray-800 p-3 xs:p-4">
                  <p className="text-gray-300 leading-relaxed text-sm xs:text-base">
                    "{rev.review}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Кнопка назад к каталогу */}
      <div className="mt-8 xs:mt-10 sm:mt-12 text-center">
        <NavLink 
          to="/products"
          className="inline-flex items-center gap-2 xs:gap-3 bg-gray-800 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 font-bold tracking-wider 
                   border border-gray-700 xs:border-2 hover:bg-gray-700 hover:border-white transition-all duration-300 text-sm xs:text-base"
        >
          ← ВЕРНУТЬСЯ К КАТАЛОГУ
        </NavLink>
      </div>
    </div>
  );
}