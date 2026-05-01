import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function ProductsList({ visible }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const json = await res.json();
        setProducts(json.data);
      } catch (err) {
        console.error("Ошибка загрузки товаров:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const visibleCount = visible === "all" ? products.length : visible;

  if (loading) return (
    <div className="flex justify-center py-10 xs:py-12 sm:py-16">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 border-t-2 border-b-2 border-white mb-3 xs:mb-4"></div>
        <p className="text-gray-400 text-sm xs:text-base sm:text-lg">ЗАГРУЗКА...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8 max-w-7xl mx-auto px-2 xs:px-3 sm:px-4">
        {products.slice(0, visibleCount).map((p) => (
          <NavLink
            key={p.id}
            to={`/products/${p.id}`}
            className="group relative bg-black border border-gray-800 xs:border-2
                     overflow-hidden flex flex-col
                     transition-all duration-300 hover:border-white
                     hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] xs:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                     hover:translate-y-[-2px] xs:hover:translate-y-[-4px] w-full"
          >
            {/* Акцентная полоса сверху */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-white via-gray-400 to-white 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Изображение товара */}
            <div className="relative bg-gray-900">
              <div className="relative overflow-hidden">
                <img
                  src={`http://localhost:3000${p.image_url}`}
                  alt={p.name}
                  className="w-full h-60 xs:h-72 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Эффект свечения */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </div>
            </div>

            {/* Информация о товаре */}
            <div className="p-4 xs:p-5 sm:p-6 flex-1 flex flex-col">
              {/* Категория */}
              <div className="mb-3 xs:mb-4">
                <span className="inline-block bg-gray-800 text-gray-300 py-1 px-2 xs:px-3 text-xs   
                               tracking-wider border border-gray-700">
                  {p.category.toUpperCase()}
                </span>
              </div>

              {/* Название */}
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-3 xs:mb-4 flex-1 line-clamp-2">
                {p.name}
              </h3>

              {/* Описание */}
              <p className="text-gray-400 text-xs xs:text-sm mb-4 xs:mb-6 line-clamp-2">
                {p.description}
              </p>

              {/* Цена и кнопка */}
              <div className="mt-auto pt-3 xs:pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 text-xs xs:text-sm block mb-0.5 xs:mb-1">ЦЕНА</span>
                    <span className="text-xl xs:text-2xl font-bold text-white">
                      {p.price} ₽
                    </span>
                  </div>
                  <div className="text-white text-xs xs:text-sm flex items-center gap-1 xs:gap-2 group-hover:text-gray-300 transition-colors">
                    ПОДРОБНЕЕ
                    <span className="transform group-hover:translate-x-0.5 xs:group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Эффекты углов - скрыть на очень маленьких экранах */}
            <div className="hidden xs:block absolute top-0 left-0 w-3 xs:w-4 h-3 xs:h-4 border-t border-l border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="hidden xs:block absolute top-0 right-0 w-3 xs:w-4 h-3 xs:h-4 border-t border-r border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="hidden xs:block absolute bottom-0 left-0 w-3 xs:w-4 h-3 xs:h-4 border-b border-l border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="hidden xs:block absolute bottom-0 right-0 w-3 xs:w-4 h-3 xs:h-4 border-b border-r border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}