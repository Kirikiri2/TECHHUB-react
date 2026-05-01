import { NavLink, Outlet, useNavigate } from "react-router";
import { useState } from "react";
import { CartContext, AuthContext } from "../stores/stores";

export default function MainLayout() {
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <CartContext.Provider value={[cart, setCart]}>
        <div className="main-layout min-h-screen flex flex-col bg-black font-sans">

{/* ================= HEADER ================= */}
<header className="relative p-3 sm:p-4 md:p-6 bg-black border-b border-gray-800 flex items-center z-40">
  
  {/* ЛЕВАЯ ЧАСТЬ - бургер меню и лого на мобильных */}
  <div className="flex items-center gap-3 md:gap-4 flex-1 md:flex-none">
    {/* Бургер меню - скрыт на десктопе */}
    <button
      className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 md:hidden"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Меню"
    >
      <div className="space-y-1.5">
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </div>
    </button>

    {/* Лого на мобильных - слева рядом с бургером */}
    <div className="md:hidden">
      <NavLink to="/" className="text-white text-lg sm:text-xl font-bold flex items-center">
        T<span className="text-gray-400">H</span>
      </NavLink>
    </div>

    {/* Лого на десктопе */}
    <div className="hidden md:flex">
      <NavLink to="/" className="text-white text-2xl font-bold tracking-tighter flex items-center font-(family-name:--font-title)">
        TECH<span className="text-gray-400">HUB</span>
      </NavLink>
    </div>
  </div>

  {/* ЦЕНТР - навигация (только десктоп) */}
<nav className="hidden md:flex absolute left-1/3 lg:left-1/2 top-1/2 
                -translate-x-1/2 -translate-y-1/2
                items-center gap-4 lg:gap-6">
  {["/", "/products"].map((path, i) => (
    <NavLink
      key={path}
      to={path}
      className={({ isActive }) => `
        text-sm lg:text-base text-white font-medium tracking-wider px-4 lg:px-5 py-2
        transition-all duration-300 hover:bg-gray-900 border border-transparent
        ${isActive ? 'bg-gray-900 border-gray-700 font-bold' : ''}
      `}
    >
      {["ГЛАВНАЯ", "ДЕВАЙСЫ"][i]}
    </NavLink>
  ))}

  {user?.role === "admin" && (
    <NavLink
      to="/sales"
      className={({ isActive }) => `
        text-sm lg:text-base text-white font-medium px-4 lg:px-5 py-2
        transition-all duration-300 hover:bg-gray-900 border border-transparent
        ${isActive ? 'bg-gray-900 border-gray-700 font-bold' : ''}
      `}
    >
      СТАТИСТИКА
    </NavLink>
  )}
</nav>

  {/* ПРАВАЯ ЧАСТЬ - действия пользователя */}
  <div className="absolute right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 sm:gap-3 md:gap-3">
    {/* Корзина - видна на всех экранах */}
    <NavLink 
      to="/cart" 
      className="relative p-1 sm:p-2 rounded-lg hover:bg-gray-900 transition-all duration-300 border border-transparent hover:border-gray-700"
    >
      <div className="relative">
          <img src="./ShoppingBag.png" alt="" className="w-6 sm:h-6 md:w-8 md:h-8"/>
        {totalQuantity > 0 && (
          <span className="absolute -top-1.5 -right-1.5 text-[10px] sm:text-xs min-w-4 h-4 sm:min-w-5 sm:h-5 flex
            items-center justify-center bg-white text-black rounded-full
            font-bold px-0.5 sm:px-1 border border-gray-800">
            {totalQuantity > 99 ? '99+' : totalQuantity}
          </span>
        )}
      </div>
    </NavLink>

    {/* Пользователь или кнопки входа/регистрации */}
    {user ? (
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Аватар и имя - скрываем имя на маленьких экранах */}
        <div className="hidden sm:flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
            <span className="text-xs sm:text-sm font-bold text-white">{user.name.charAt(0)}</span>
          </div>
          <span className="text-gray-300 font-medium text-sm hidden lg:block truncate max-w-[100px]">
            {user.name}
          </span>
        </div>
        
        {/* Только аватар на маленьких экранах */}
        <div className="sm:hidden">
          <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
            <span className="text-xs font-bold text-white">{user.name.charAt(0)}</span>
          </div>
        </div>

        {/* Кнопка выхода */}
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-900 text-white border border-gray-700 
                   hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 
                   font-medium text-xs sm:text-sm whitespace-nowrap"
        >
          <span className="hidden sm:inline">ВЫХОД</span>
          <span className="sm:hidden">ВЫЙТИ</span>
        </button>
      </div>
    ) : (
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <NavLink 
          to="/login" 
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-900 text-white border border-gray-700 
                   hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 
                   font-medium text-xs sm:text-sm whitespace-nowrap"
        >
          <span className="hidden sm:inline">ВХОД</span>
          <span className="sm:hidden">ВОЙТИ</span>
        </NavLink>
        <NavLink 
          to="/register" 
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white text-black hover:bg-gray-100 
                   font-medium border-2 border-white transition-all duration-300 
                   text-xs sm:text-sm whitespace-nowrap"
        >
          <span className="hidden sm:inline">РЕГИСТРАЦИЯ</span>
          <span className="sm:hidden">РЕГИСТР.</span>
        </NavLink>
      </div>
    )}
  </div>
</header>

          {/* MOBILE MENU */}
          {menuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setMenuOpen(false)}
              />
              
              {/* Menu */}
              <nav className="absolute top-0 left-0 w-80 h-full bg-black border-r border-gray-800 shadow-2xl p-6 animate-slideIn">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-white text-2xl ">✕</span>
                  </button>
                </div>

                {/* Logo */}
                <div className="mb-8">
                  <div className="text-white text-2xl font-bold font-(family-name:--font-title) ">TECH<span className="text-gray-400">HUB</span></div>
                </div>

                {/* User info */}
                {user && (
                  <div className="mb-8 p-4 rounded-lg bg-gray-900 border border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                        <span className="text-lg font-bold">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation links */}
                <div className="space-y-2 mb-8">
                  {["/", "/products"].map((path, i) => (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3 text-white px-4 py-3 rounded-lg
                        transition-all duration-300 hover:bg-gray-900 border border-transparent hover:border-gray-700
                        ${isActive ? 'bg-gray-900 border-gray-700' : ''}
                      `}
                    >
                      <span className="text-xl">
                        {i === 0 ? (
                          <img src="./Home.png" alt="Home" className="w-6 h-6" />
                        ) : (
                          <img src="./GameController.png" alt="Game" className="w-6 h-6" />
                        )}
                      </span>
                      <span className="text-lg font-medium ">
                        {["ГЛАВНАЯ", "ДЕВАЙСЫ"][i]}
                      </span>
                    </NavLink>
                  ))}

                  {user?.role === "admin" && (
                    <NavLink
                      to="/sales"
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3 text-white px-4 py-3 rounded-lg
                        transition-all duration-300 hover:bg-gray-900
                        ${isActive ? 'bg-gray-900 border-gray-700' : ''}
                      `}
                    >
                      <span className="text-xl">📊</span>
                      <span className="text-lg font-medium ">СТАТИСТИКА</span>
                    </NavLink>
                  )}
                </div>

                {/* Cart link */}
                <NavLink
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 mb-6"
                >
                  <div className="flex items-center gap-3">
                    <img src="./ShoppingBag.png" alt="" className="w-6 sm:h-6 md:w-8 md:h-8"/>
                    <span className="text-lg font-medium text-white ">КОРЗИНА</span>
                  </div>
                  {totalQuantity > 0 && (
                    <span className="bg-white text-black px-2.5 py-0.5 rounded-full text-sm font-bold">
                      {totalQuantity}
                    </span>
                  )}
                </NavLink>

                {/* Auth section */}
                <div className="mt-auto pt-6 border-t border-gray-800">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
                    >
                      ВЫЙТИ ИЗ АККАУНТА
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <NavLink
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block text-center bg-gray-900 text-white py-3 rounded-lg font-medium border border-gray-700 hover:bg-gray-800 transition-colors"
                      >
                        ВХОД
                      </NavLink>
                      <NavLink
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                        className="block text-center bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors border-2 border-white"
                      >
                        РЕГИСТРАЦИЯ
                      </NavLink>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}

          {/* MAIN CONTENT */}
          <main className="flex-1 font-(family-name:--font-main)">
            <Outlet />
          </main>

          {/* ================= FOOTER ================= */}
          <footer className="bg-black border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-12">
              {/* Main footer content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                
                {/* Brand info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 flex items-center justify-center border border-gray-700">
                      <span className="text-white text-xl font-bold font-(family-name:--font-title)">T</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-(family-name:--font-title)">TECH<span className="text-gray-400 font-(family-name:--font-title)">HUB</span></h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Премиальные игровые устройства и профессиональные девайсы. 
                    Лучшее оборудование для геймеров и креаторов.
                  </p>
                </div>

                {/* Quick links */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-700 ">
                    КАТЕГОРИИ
                  </h4>
                  <ul className="space-y-3">
                    {[
                      { to: "/products?category=headphones", label: "Наушники" },
                      { to: "/products?category=mice", label: "Мыши" },
                      { to: "/products?category=keyboards", label: "Клавиатуры" },
                      { to: "/products?category=mats", label: "Коврики" },
                      { to: "/products", label: "Все девайсы" }
                    ].map((link) => (
                      <li key={link.to}>
                        <NavLink
                          to={link.to}
                          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group "
                        >
                          <span className="text-white"></span>
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-700 ">
                    БРЕНДЫ
                  </h4>
                  <ul className="space-y-3">
                    {["Razer", "Logitech", "SteelSeries", "HyperX", "Corsair", "ASUS ROG"].map((brand) => (
                      <li key={brand} className="text-gray-400 hover:text-white transition-colors ">
                        {brand}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact info */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-700 ">
                    КОНТАКТЫ
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-gray-400">
                      <img src="./Address.png" alt="Home" className="w-6 h-6" />
                      <span>Москва, ул. Гаджетная, д. 15</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-400">
                      <img src="./Phone.png" alt="Home" className="w-6 h-6" />
                      <a href="tel:+78001234567" className="hover:text-white transition-colors">
                        8 (800) 123-45-67
                      </a>
                    </li>
                    <li className="flex items-center gap-3 text-gray-400">
                      <img src="./Email.png" alt="Home" className="w-6 h-6" />
                      <a href="mailto:info@techhub.ru" className="hover:text-white transition-colors">
                        info@techhub.ru
                      </a>
                    </li>
                    <li className="flex items-center gap-3 text-gray-400">
                      <img src="./Clock.png" alt="Home" className="w-6 h-6" />
                      <span>10:00 - 22:00 ежедневно</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom bar */}
              <div className="pt-8 border-t border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-gray-500 text-sm 
                  ">
                    &copy; 2025 TECHHUB. Все права защищены.
                  </div>
                  <div className="flex flex-wrap gap-6 text-sm">
                    <a href="#" className="text-gray-500 hover:text-white transition-colors 
                    ">
                      ПОЛИТИКА
                    </a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors 
                    ">
                      ГАРАНТИЯ
                    </a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors 
                    ">
                      ДОСТАВКА
                    </a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors 
                    ">
                      FAQ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}