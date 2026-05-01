import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

// Более контрастные цвета для мобильных устройств
const COLORS = [
  "#FFFFFF", "#D4D4D4", "#A3A3A3",
  "#737373", "#404040", "#F5F5F5",
  "#B8B8B8", "#525252", "#1A1A1A"
];

export default function SalesChart() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("bar");
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Определение размера экрана
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallScreen(width < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    async function loadSales() {
      try {
        const resSales = await axios.get("http://localhost:3000/api/sales");
        const resProducts = await axios.get("http://localhost:3000/api/products");

        const productsMap = {};
        resProducts.data.data.forEach((p) => {
          productsMap[p.id] = p.name;
        });

        const grouped = {};
        resSales.data.data.forEach((sale) => {
          if (!grouped[sale.product_id]) grouped[sale.product_id] = 0;
          grouped[sale.product_id] += sale.total_price;
        });

        const chartData = Object.keys(grouped)
          .map((productId) => {
            const fullName = productsMap[productId] || `PRODUCT #${productId}`;
            return {
              name: fullName,
              value: grouped[productId],
              // Сохраняем полное имя для таблицы
              displayName: fullName
            };
          })
          .sort((a, b) => b.value - a.value);

        setSales(chartData);
      } catch (err) {
        console.error("Ошибка загрузки диаграммы:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSales();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] border-2 border-gray-800 bg-black p-4">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-white mb-3 sm:mb-4"></div>
        <p className="text-gray-400   text-sm sm:text-lg tracking-wider">ЗАГРУЗКА...</p>
      </div>
    </div>
  );

  if (sales.length === 0) return (
    <div className="flex flex-col items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] border-2 border-gray-800 bg-black p-4">
      <div className="text-3xl sm:text-5xl mb-4 sm:mb-6  ">📊</div>
      <p className="text-white   text-base sm:text-xl mb-2 text-center px-2">НЕТ ДАННЫХ О ПРОДАЖАХ</p>
      <p className="text-gray-400   text-xs sm:text-base text-center px-2">ОЖИДАЙТЕ ПОСТУПЛЕНИЯ ИНФОРМАЦИИ</p>
    </div>
  );

  const totalValue = sales.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full bg-black border-2 border-gray-800 p-3 sm:p-6 md:p-8">
      {/* Заголовок */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white   mb-1 sm:mb-2 tracking-wider text-center sm:text-left">
              {isMobile ? "СТАТИСТИКА" : "СТАТИСТИКА ПРОДАЖ"}
            </h2>
            <p className="text-gray-400   text-xs sm:text-sm md:text-base text-center sm:text-left">
              {isMobile ? "АНАЛИЗ ДОХОДОВ" : "АНАЛИЗ ДОХОДОВ ПО ТОВАРАМ"}
            </p>
          </div>
          
          {/* Переключатель типа диаграммы */}
          <div className="flex border-2 border-gray-700 justify-center sm:justify-start">
            <button
              onClick={() => setChartType("pie")}
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2   text-xs sm:text-sm transition-all ${chartType === "pie" ? 'bg-white text-black' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
            >
              {isMobile ? "КРУГ" : "КРУГ"}
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2   text-xs sm:text-sm transition-all ${chartType === "bar" ? 'bg-white text-black' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
            >
              {isMobile ? "СТОЛБ" : "СТОЛБ"}
            </button>
          </div>
        </div>
      </div>

      {/* Диаграмма */}
      <div className="h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] mb-4 sm:mb-6 md:mb-8">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={sales}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 40 : 60}
                outerRadius={isMobile ? 80 : 100}
                paddingAngle={1}
                label={isMobile ? false : ({ percent }) => `${(percent * 100).toFixed(0)}%`}
                stroke="#000"
                strokeWidth={1}
              >
                {sales.map((entry, index) => (
                  <Cell 
                    key={index} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()} ₽`, 'ДОХОД']}
                contentStyle={{
                  backgroundColor: 'black',
                  border: '2px solid #333',
                  borderRadius: '0',
                  color: 'white',
                  fontFamily: 'monospace',
                  fontSize: isMobile ? '12px' : '14px',
                  padding: isMobile ? '8px' : '12px'
                }}
                labelStyle={{ 
                  fontWeight: 'bold',
                  fontSize: isMobile ? '12px' : '14px'
                }}
              />
              
              {!isMobile && (
                <Legend 
                  layout={isSmallScreen ? "vertical" : "vertical"}
                  verticalAlign={isSmallScreen ? "bottom" : "middle"}
                  align={isSmallScreen ? "center" : "right"}
                  wrapperStyle={{ 
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: isSmallScreen ? '10px' : '12px',
                    padding: isSmallScreen ? '10px 0 0 0' : '0 10px'
                  }}
                  formatter={(value) => {
                    const displayName = value.length > 20 ? value.substring(0, 20) + "..." : value;
                    return displayName.toUpperCase();
                  }}
                />
              )}
            </PieChart>
          ) : (
            <BarChart 
              data={sales} 
              margin={{ 
                top: 20, 
                right: isMobile ? 10 : 30, 
                left: isMobile ? 10 : 20, 
                bottom: isMobile ? 60 : 80 
              }}
            >
              <CartesianGrid stroke="#333" strokeDasharray="3 3" />
              
              <XAxis 
                dataKey="name" 
                stroke="#666"
                tick={{ 
                  fill: '#999', 
                  fontFamily: 'monospace',
                  fontSize: isMobile ? 9 : isSmallScreen ? 10 : 11
                }}
                angle={isMobile ? -90 : -45}
                textAnchor="end"
                height={isMobile ? 50 : isSmallScreen ? 60 : 80}
                interval={0}
                tickFormatter={(value) => {
                  if (value.length > (isMobile ? 6 : isSmallScreen ? 10 : 12)) {
                    return value.substring(0, isMobile ? 6 : isSmallScreen ? 10 : 12) + "...";
                  }
                  return value;
                }}
              />
              
              <YAxis 
                stroke="#666"
                tick={{ 
                  fill: '#999', 
                  fontFamily: 'monospace',
                  fontSize: isMobile ? 9 : 11
                }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value/1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value/1000).toFixed(0)}K`;
                  return value;
                }}
                width={isMobile ? 40 : 60}
              />
              
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()} ₽`, 'ДОХОД']}
                contentStyle={{
                  backgroundColor: 'black',
                  border: '2px solid #333',
                  borderRadius: '0',
                  color: 'white',
                  fontFamily: 'monospace',
                  fontSize: isMobile ? '12px' : '14px',
                  padding: isMobile ? '8px' : '12px'
                }}
                labelStyle={{ 
                  color: '#FFFFFF', 
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  fontSize: isMobile ? '12px' : '14px'
                }}
              />
              
              <Bar 
                dataKey="value" 
                fill="#FFFFFF"
                stroke="#000"
                strokeWidth={1}
                radius={[0, 0, 0, 0]}
              >
                {sales.map((entry, index) => (
                  <Cell 
                    key={index} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
              
              {!isMobile && (
                <Legend 
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ 
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: isSmallScreen ? '10px' : '11px',
                    padding: '10px 0 0 0'
                  }}
                  formatter={(value, entry, index) => (
                    <span style={{ 
                      color: '#FFFFFF',
                      display: 'inline-flex',
                      alignItems: 'center',
                      margin: '0 4px'
                    }}>
                      <span 
                        style={{ 
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          backgroundColor: COLORS[index % COLORS.length],
                          marginRight: '4px',
                          border: '1px solid #000'
                        }}
                      />
                      {value.length > (isSmallScreen ? 8 : 12) 
                        ? value.substring(0, isSmallScreen ? 8 : 12) + "..."
                        : value
                      }
                    </span>
                  )}
                />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Сводка */}
      <div className="mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t-2 border-gray-800">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-900 border border-gray-800">
            <div className="text-gray-400   text-xs sm:text-sm mb-1 sm:mb-2 tracking-wider">
              {isMobile ? "ТОВАРЫ" : "ВСЕГО ТОВАРОВ"}
            </div>
            <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold  ">{sales.length}</div>
          </div>
          
          <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-900 border border-gray-800">
            <div className="text-gray-400   text-xs sm:text-sm mb-1 sm:mb-2 tracking-wider">
              {isMobile ? "ДОХОД" : "ОБЩИЙ ДОХОД"}
            </div>
            <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold  ">
              {totalValue >= 1000000 
                ? `${(totalValue/1000000).toFixed(1)}M`
                : totalValue >= 1000
                ? `${(totalValue/1000).toFixed(0)}K`
                : totalValue.toLocaleString()
              } ₽
            </div>
          </div>
          
          <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-900 border border-gray-800">
            <div className="text-gray-400   text-xs sm:text-sm mb-1 sm:mb-2 tracking-wider">
              {isMobile ? "СРЕДНИЙ" : "СРЕДНИЙ ЧЕК"}
            </div>
            <div className="text-white text-xl sm:text-2xl md:text-3xl font-bold  ">
              {Math.round(totalValue / sales.length).toLocaleString()} ₽
            </div>
          </div>
          
          <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-900 border border-gray-800">
            <div className="text-gray-400   text-xs sm:text-sm mb-1 sm:mb-2 tracking-wider">
              {isMobile ? "ТОП" : "ТОП ПРОДАЖ"}
            </div>
            <div className="text-white text-base sm:text-lg md:text-xl font-bold   break-words px-1">
              {sales[0]?.name}
            </div>
          </div>
        </div>
      </div>

      {/* Таблица данных с переносом текста */}
      <div className="mt-4 sm:mt-6 md:mt-8">
        <h3 className="text-lg sm:text-xl font-bold text-white   mb-3 sm:mb-4 tracking-wider text-center sm:text-left">
          {isMobile ? "ДАННЫЕ" : "ДЕТАЛЬНЫЕ ДАННЫЕ"}
        </h3>
        
        {/* Обёртка для горизонтального скролла на маленьких экранах */}
        <div className="relative">
          <div className="overflow-x-auto border-2 border-gray-800">
            {/* Минимальная ширина таблицы для скролла на маленьких экранах */}
            <div className="min-w-[600px] sm:min-w-full">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-white   text-xs sm:text-sm border-r border-gray-800 whitespace-nowrap">
                      #
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-white   text-xs sm:text-sm border-r border-gray-800 min-w-[150px] sm:min-w-[200px]">
                      ТОВАР
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-white   text-xs sm:text-sm border-r border-gray-800 whitespace-nowrap">
                      ДОХОД
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-white   text-xs sm:text-sm min-w-[120px]">
                      ДОЛЯ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((item, index) => {
                    const percentage = ((item.value / totalValue) * 100).toFixed(1);
                    
                    return (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                        {/* Номер */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400   border-r border-gray-800 align-top">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 flex-shrink-0 border border-gray-700"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-bold">{index + 1}</span>
                          </div>
                        </td>
                        
                        {/* Название товара - переносится по строкам */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-white   border-r border-gray-800 align-top">
                          <div className="break-words hyphens-auto max-w-[200px] sm:max-w-none">
                            {item.displayName}
                          </div>
                        </td>
                        
                        {/* Доход */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-white   border-r border-gray-800 align-top whitespace-nowrap">
                          <span className="font-bold">
                            {item.value >= 1000000 
                              ? `${(item.value/1000000).toFixed(1)}M`
                              : item.value >= 1000
                              ? `${(item.value/1000).toFixed(0)}K`
                              : item.value.toLocaleString()
                            } ₽
                          </span>
                        </td>
                        
                        {/* Доля */}
                        <td className="py-2 sm:py-3 px-2 sm:px-4 align-top">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            {/* Прогресс бар */}
                            <div className="flex-1 h-2 bg-gray-800">
                              <div 
                                className="h-full transition-all duration-300"
                                style={{ 
                                  width: `${percentage}%`,
                                  backgroundColor: COLORS[index % COLORS.length]
                                }}
                              ></div>
                            </div>
                            
                            {/* Процент */}
                            <div className="flex items-center justify-between sm:justify-start gap-3">
                              <span className="text-white   text-sm font-bold min-w-[45px]">
                                {percentage}%
                              </span>
                              
                              {/* Абсолютное значение для мобильных */}
                              {isMobile && (
                                <span className="text-gray-400   text-xs">
                                  {item.value.toLocaleString()} ₽
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Индикатор скролла для мобильных */}
          {isMobile && (
            <div className="mt-2 text-center">
              <div className="text-gray-500   text-xs flex items-center justify-center gap-2">
                <span className="animate-pulse">←</span>
                ПРОКРУТИТЕ ВПРАВО, ЧТОБЫ УВИДЕТЬ ВСЕ ДАННЫЕ
                <span className="animate-pulse">→</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Легенда цветов под таблицей */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="text-gray-400   text-sm mb-3 tracking-wider">
            ЛЕГЕНДА ЦВЕТОВ:
          </div>
          <div className="flex flex-wrap gap-3">
            {sales.slice(0, isMobile ? 4 : 8).map((item, index) => {
              const color = COLORS[index % COLORS.length];
              return (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 border border-gray-700 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-gray-300   text-xs break-words max-w-[100px]">
                    {index + 1}. {item.displayName}
                  </span>
                </div>
              );
            })}
            {sales.length > (isMobile ? 4 : 8) && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500   text-xs">
                  И ЕЩЁ {sales.length - (isMobile ? 4 : 8)} ТОВАРОВ
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}