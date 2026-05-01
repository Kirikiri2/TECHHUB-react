import { NavLink } from "react-router";
import ShopsList from "../components/ShopList";
import CategoriesList from "../components/CategoriesList";

const TechHubPattern = () => {
  return (
<svg className="absolute inset-0 -z-10 w-full h-full opacity-10 font-(family-name:--font-title)">
  <defs>
    <pattern
      id="techhub-pattern"
      width="1200"
      height="900"
      patternUnits="userSpaceOnUse"
    >
      <text
        x="0"
        y="300"
        dominantBaseline="middle"
        fill="white"
        fontFamily="Press Start 2P, system-ui;"
        fontSize="188"
        fontWeight="bold"
        letterSpacing="8"
      >
        TECHHUBTECHHUBTECHHUBTECHHUBTECHHUBTECHHUB
      </text>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#techhub-pattern)" />
</svg>
  );
};

export default function HomePage() {
    return (
        <div className="w-full font-sans bg-black ">
{/* Hero секция */}
<div className="relative w-full min-h-[500px] flex items-center justify-center z-10 px-4 lg:px-12">
  <TechHubPattern />

  <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
    
    {/* Текст */}
    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
      <div className="max-w-2xl">
        <p className="font-bold text-white font-(family-name:--font-title) text-5xl sm:text-6xl md:text-7xl lg:text-7xl mb-4 tracking-tighter drop-shadow-2xl lg:ml-[-9px]">TECH<span className="text-gray-400">HUB</span>
        </p>

        <p className="text-gray-300 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-widest drop-shadow-lg mb-6 uppercase ">
          gaming & pro devices
        </p>

        <p className="text-white/90 text-base sm:text-lg md:text-xl mt-6 font-light leading-relaxed">
          Профессиональные устройства для геймеров и креаторов
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center lg:justify-start">
          <NavLink
            to="/products"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-3 font-semibold text-base md:text-lg border-2 border-white hover:bg-gray-100 hover:border-gray-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 group uppercase tracking-wider"
          >
            Смотреть каталог
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </NavLink>
        </div>
      </div>
    </div>

    {/* Картинка */}
    <div className="hidden lg:flex w-full lg:w-1/2 justify-center">
      <div className="relative w-full max-w-[500px] lg:max-w-[700px]">
        <img
          src="./NoFon.png"
          alt="TechHub Premium Gaming Devices"
          className="w-full h-auto object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl opacity-20" />
      </div>
    </div>

  </div>
</div>


            <CategoriesList visible={'all'} />

            {/* Преимущества с изображениями */}
            <div className="relative w-full bg-gradient-to-b from-black to-gray-900 py-20 px-4 border-t border-gray-800 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            ПОЧЕМУ <span className="font-(family-name:--font-title) md:text-4xl text-3xl">TECHHUB?</span>
                        </h3>
                    </div>

                    <div className="space-y-20">
                        {/* Преимущество 1 */}
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                            <div className="lg:w-1/2 relative">
                                <div className="relative overflow-hidden border border-gray-700 bg-black">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                                    <img 
                                        src="./photobrend.png" 
                                        alt="Игровые периферийные устройства" 
                                        className="w-full h-[400px] lg:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
                                        <div className="text-white text-sm tracking-wider">GAMING PERIPHERALS</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="lg:w-1/2 text-center lg:text-left">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="w-2 h-10 bg-white"></div>
                                    <h4 className="text-2xl sm:text-3xl font-bold text-white">ВЕДУЩИЕ БРЕНДЫ</h4>
                                </div>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    Только проверенные производители: Razer, Logitech, SteelSeries, 
                                    HyperX, Corsair и другие лидеры рынка. Оригинальная продукция с гарантией.
                                </p>
                                <ul className="space-y-3 text-gray-300 mb-8">
                                    {["Игровые мыши", "Механические клавиатуры", "Профессиональные наушники", "Качественные коврики"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="text-white"></span>
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <NavLink 
                                    to="/products"
                                    className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-semibold group text-xl tracking-wider"
                                >
                                    К БРЕНДАМ
                                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </NavLink>
                            </div>
                        </div>

                        {/* Преимущество 2 */}
                        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-20">
                            <div className="lg:w-1/2 relative">
                                <div className="relative overflow-hidden border border-gray-700 bg-black">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                                    <img 
                                        src="./photo2.jpg" 
                                        alt="Высокая производительность устройств" 
                                        className="w-full h-[400px] lg:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
                                        <div className="text-white text-sm tracking-wider">PRO PERFORMANCE</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="lg:w-1/2 text-center lg:text-left">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="w-2 h-10 bg-white"></div>
                                    <h4 className="text-2xl sm:text-3xl font-bold text-white">PRO-ПРОИЗВОДИТЕЛЬНОСТЬ</h4>
                                </div>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    Устройства, протестированные киберспортсменами и профессионалами. 
                                    Максимальная отзывчивость, точность и надежность в любых условиях.
                                </p>
                                <ul className="space-y-3 text-gray-300 mb-8">
                                    {["Высокий DPI и опрос", "Низкая задержка", "Кастомные профили", "Долговечные переключатели"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="text-white"></span>
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <NavLink 
                                    to="/products"
                                    className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-semibold group text-xl tracking-wider"
                                >
                                    К ИГРОВЫМ ДЕВАЙСАМ
                                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </NavLink>
                            </div>
                        </div>

                        {/* Преимущество 3 */}
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                            <div className="lg:w-1/2 relative">
                                <div className="relative overflow-hidden border border-gray-700 bg-black">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                                    <img 
                                        src="./photo3.jpg" 
                                        alt="Тестирование и консультации" 
                                        className="w-full h-[400px] lg:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
                                        <div className="text-white text-sm tracking-wider">EXPERT SUPPORT</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="lg:w-1/2 text-center lg:text-left">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="w-2 h-10 bg-white"></div>
                                    <h4 className="text-2xl sm:3xl font-bold text-white">ЭКСПЕРТНАЯ ПОДДЕРЖКА</h4>
                                </div>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    Наши специалисты помогут подобрать идеальную конфигурацию устройств 
                                    под ваши задачи: от киберспорта до профессиональной работы.
                                </p>
                                <ul className="space-y-3 text-gray-300 mb-8">
                                    {["Тест-драйв устройств", "Подбор под хват мыши", "Настройка RGB", "Гарантийная поддержка"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="text-white"></span>
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <NavLink 
                                    to="/"
                                    className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-semibold group text-xl tracking-wider"
                                >
                                    ЗАПИСАТЬСЯ НА ТЕСТ
                                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-b from-gray-900 to-black ">
                <ShopsList />
            </div>

        </div>
    );
}