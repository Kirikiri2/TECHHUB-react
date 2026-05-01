import { useEffect, useState, useRef } from "react";
import MapBlock from "./MapBlock";

export default function ShopsList() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const [activeShop, setActiveShop] = useState(null);
  const [viewMode, setViewMode] = useState("map"); // "map" или "list"

  useEffect(() => {
    async function fetchShops() {
      try {
        const res = await fetch("http://localhost:3000/api/shops");
        const json = await res.json();
        setShops(json.data);
      } catch (err) {
        console.error("Ошибка загрузки магазинов:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchShops();
  }, []);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-4"></div>
        <p className="text-gray-400   text-lg tracking-wider">ЗАГРУЗКА МАГАЗИНОВ...</p>
      </div>
    </div>
  );

  const allMarkers = shops.map(shop => ({
    position: [shop.latitude, shop.longitude],
    title: shop.address
  }));

  const focusOnShop = (shop) => {
    setActiveShop(shop.id);
    if (mapRef.current) {
      mapRef.current.flyTo([shop.latitude, shop.longitude], 15, { duration: 1.5 });
    }
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Заголовок */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white   mb-4 tracking-tighter">МАГАЗИНЫ TECHHUB</h2>
        <p className="text-gray-400   max-w-2xl mx-auto">
          ПРОФЕССИОНАЛЬНОЕ ОБОРУДОВАНИЕ ДЛЯ ГЕЙМЕРОВ И КРЕАТОРОВ
        </p>
      </div>

      {/* Переключатель вида */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex border-2 border-gray-700">
          <button
            onClick={() => setViewMode("map")}
            className={`px-6 py-3   text-sm transition-all ${viewMode === "map" ? 'bg-white text-black' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
          >
            НА КАРТЕ
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-6 py-3   text-sm transition-all ${viewMode === "list" ? 'bg-white text-black' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
          >
            СПИСКОМ
          </button>
        </div>
      </div>

      {/* Карта */}
      {viewMode === "map" && (
              <MapBlock markers={allMarkers} mapRef={mapRef} style={{ filter: 'grayscale(1) contrast(1.2)' }} />

      )}

      {/* Карточки магазинов */}
      <div className={`${viewMode === "map" ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6' : 'space-y-3 xs:space-y-4 sm:space-y-6'}`}>
        {shops.map(shop => (
          <div
            key={shop.id}
            className={`group relative bg-black border ${activeShop === shop.id ? 'border-white' : 'border-gray-800'} 
                     transition-all duration-300 hover:border-white cursor-pointer
                     ${viewMode === "list" ? 'flex flex-col xs:flex-row xs:items-center p-3 xs:p-4 sm:p-6' : 'p-3 xs:p-4 sm:p-6'}`}
            onClick={() => {
              focusOnShop(shop);
              if (viewMode === "list") {
                setViewMode("map");
              }
            }}
          >
            {/* Номер магазина */}
            <div className={`${viewMode === "list" ? 'mb-3 xs:mb-0 xs:mr-4 sm:mr-6' : 'mb-3 xs:mb-4'}`}>
              <div className="w-10 xs:w-12 h-10 xs:h-12 bg-gray-900 border border-gray-700 xs:border-2 flex items-center justify-center">
                <span className="text-white font-bold text-base xs:text-lg">#{shop.id}</span>
              </div>
            </div>

            {/* Информация о магазине */}
            <div className={`flex-1 ${viewMode === "list" ? 'xs:flex xs:items-center xs:justify-between' : ''}`}>
              <div className={`${viewMode === "list" ? 'xs:flex-1 mb-3 xs:mb-0' : 'mb-3 xs:mb-4'}`}>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-1 xs:mb-2 line-clamp-2">
                  {shop.address.toUpperCase()}
                </h3>
                <div className="text-gray-400 text-xs xs:text-sm">АДРЕС МАГАЗИНА</div>
              </div>

              <div className={`${viewMode === "list" ? 'xs:text-right mb-3 xs:mb-0' : 'mb-3 xs:mb-4'}`}>
                <div className="text-white font-bold text-base xs:text-lg">{shop.phone}</div>
                <div className="text-gray-400 text-xs xs:text-sm">ТЕЛЕФОН</div>
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className={`${viewMode === "list" ? 'xs:ml-4 sm:ml-6 xs:text-right mb-3 xs:mb-0' : 'mb-3 xs:mb-4'}`}>
              <div className="text-gray-300 text-xs xs:text-sm">10:00 - 22:00</div>
              <div className="text-gray-400 text-xs">ЕЖЕДНЕВНО</div>
            </div>

            {/* Кнопка навигации */}
            <div className={`${viewMode === "list" ? 'xs:ml-4 sm:ml-6' : ''}`}>
              <button className="w-full xs:w-auto bg-gray-900 text-white text-xs xs:text-sm py-2 xs:py-2 sm:py-2 px-3 xs:px-4 border border-gray-700 
                               hover:bg-gray-800 hover:border-white transition-all duration-300 
                               flex items-center justify-center xs:justify-start gap-1 xs:gap-2 group-hover:gap-2 xs:group-hover:gap-3">
                КАРТА
                <span className="transform group-hover:translate-x-0.5 xs:group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Эффект выбранного магазина */}
            {activeShop === shop.id && (
              <div className="absolute inset-0 border border-white pointer-events-none">
                <div className="absolute -top-1.5 xs:-top-2 -left-1.5 xs:-left-2 w-3 xs:w-4 h-3 xs:h-4 border-t border-l border-white"></div>
                <div className="absolute -top-1.5 xs:-top-2 -right-1.5 xs:-right-2 w-3 xs:w-4 h-3 xs:h-4 border-t border-r border-white"></div>
                <div className="absolute -bottom-1.5 xs:-bottom-2 -left-1.5 xs:-left-2 w-3 xs:w-4 h-3 xs:h-4 border-b border-l border-white"></div>
                <div className="absolute -bottom-1.5 xs:-bottom-2 -right-1.5 xs:-right-2 w-3 xs:w-4 h-3 xs:h-4 border-b border-r border-white"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Статистика магазинов */}
      <div className="mt-8 xs:mt-10 sm:mt-12 pt-6 xs:pt-8 border-t border-gray-800 xs:border-t-2">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="text-center p-4 xs:p-6 bg-black border border-gray-800 xs:border-2">
            <div className="text-gray-400 text-xs xs:text-sm mb-1 xs:mb-2 tracking-wider">ВСЕГО МАГАЗИНОВ</div>
            <div className="text-white text-2xl xs:text-3xl sm:text-4xl font-bold">{shops.length}</div>
          </div>
          
          <div className="text-center p-4 xs:p-6 bg-black border border-gray-800 xs:border-2">
            <div className="text-gray-400 text-xs xs:text-sm mb-1 xs:mb-2 tracking-wider">ГОРОДА</div>
            <div className="text-white text-2xl xs:text-3xl sm:text-4xl font-bold">
              {shops.length}
            </div>
          </div>
          
          <div className="text-center p-4 xs:p-6 bg-black border border-gray-800 xs:border-2">
            <div className="text-gray-400 text-xs xs:text-sm mb-1 xs:mb-2 tracking-wider">ЧАСЫ РАБОТЫ</div>
            <div className="text-white text-2xl xs:text-3xl sm:text-4xl font-bold">12</div>
            <div className="text-gray-400 pt-1 xs:pt-2 sm:pt-3 text-xs">ЧАСОВ В ДЕНЬ</div>
          </div>
          
          <div className="text-center p-4 xs:p-6 bg-black border border-gray-800 xs:border-2">
            <div className="text-gray-400 text-xs xs:text-sm mb-1 xs:mb-2 tracking-wider">ГОД ОСНОВАНИЯ</div>
            <div className="text-white text-2xl xs:text-3xl sm:text-4xl font-bold">2023</div>
          </div>
        </div>
      </div>

    </div>
  );
}