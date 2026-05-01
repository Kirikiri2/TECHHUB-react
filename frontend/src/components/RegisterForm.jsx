import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../stores/stores";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      setError("ПАРОЛИ НЕ СОВПАДАЮТ");
      setLoading(false);
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:3000/api/register", { 
        name, 
        email, 
        password 
      });
      
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "ОШИБКА РЕГИСТРАЦИИ. ПОПРОБУЙТЕ ЕЩЁ РАЗ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="w-full max-w-md">
        <div className="bg-black border-2 border-gray-800 p-6 sm:p-8">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white   mb-3 tracking-tighter">
              TECH<span className="text-gray-400">HUB</span>
            </h2>
            <p className="text-gray-400   text-sm sm:text-base">СОЗДАНИЕ АККАУНТА</p>
          </div>

          {/* Форма */}
          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="bg-gray-900 border-2 border-gray-700 text-white px-4 py-3   text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Поле имени */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400   text-sm tracking-wider">ИМЯ</span>
                <div className="h-px flex-1 bg-gray-800"></div>
              </div>
              <input
                type="text"
                placeholder="ВАШЕ ИМЯ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-gray-900 border-2 border-gray-700 
                         text-white px-4 py-3   text-sm
                         focus:outline-none focus:border-white
                         placeholder:text-gray-600 transition-all duration-200
                         uppercase"
              />
            </div>

            {/* Поле email */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400   text-sm tracking-wider">EMAIL</span>
                <div className="h-px flex-1 bg-gray-800"></div>
              </div>
              <input
                type="email"
                placeholder="EMAIL@EXAMPLE.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-900 border-2 border-gray-700 
                         text-white px-4 py-3   text-sm
                         focus:outline-none focus:border-white
                         placeholder:text-gray-600 transition-all duration-200
                         uppercase"
              />
            </div>

            {/* Поле пароля */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400   text-sm tracking-wider">ПАРОЛЬ</span>
                <div className="h-px flex-1 bg-gray-800"></div>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-gray-900 border-2 border-gray-700 
                         text-white px-4 py-3   text-sm
                         focus:outline-none focus:border-white
                         placeholder:text-gray-600 tracking-widest
                         transition-all duration-200"
              />
            </div>

            {/* Подтверждение пароля */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400   text-sm tracking-wider">ПОВТОРИТЕ ПАРОЛЬ</span>
                <div className="h-px flex-1 bg-gray-800"></div>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-gray-900 border-2 border-gray-700 
                         text-white px-4 py-3   text-sm
                         focus:outline-none focus:border-white
                         placeholder:text-gray-600 tracking-widest
                         transition-all duration-200"
              />
            </div>

            {/* Требования к паролю */}
            <div className="bg-gray-900 border border-gray-800 p-4">
              <p className="text-gray-400   text-xs mb-2 tracking-wider">ТРЕБОВАНИЯ К ПАРОЛЮ:</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <span className={`text-xs ${password.length >= 6 ? 'text-green-400' : 'text-gray-600'}`}>✓</span>
                  <span className={`text-xs   ${password.length >= 6 ? 'text-green-400' : 'text-gray-500'}`}>
                    НЕ МЕНЕЕ 6 СИМВОЛОВ
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className={`text-xs ${password === confirmPassword && password !== '' ? 'text-green-400' : 'text-gray-600'}`}>✓</span>
                  <span className={`text-xs   ${password === confirmPassword && password !== '' ? 'text-green-400' : 'text-gray-500'}`}>
                    ПАРОЛИ СОВПАДАЮТ
                  </span>
                </li>
              </ul>
            </div>

            {/* Кнопка регистрации */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4   font-bold text-sm tracking-wider 
                        transition-all duration-300 border-2 ${loading 
                          ? 'bg-gray-800 border-gray-700 cursor-not-allowed text-gray-400' 
                          : 'bg-white text-black border-white hover:bg-gray-100 hover:scale-[1.02]'}
                        flex items-center justify-center gap-3`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
                  РЕГИСТРАЦИЯ...
                </>
              ) : (
                <>
                  СОЗДАТЬ АККАУНТ
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>

          {/* Разделитель */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-500   text-xs">УЖЕ ЕСТЬ АККАУНТ?</span>
            </div>
          </div>

          {/* Ссылка на вход */}
          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center w-full py-3 bg-gray-900 text-white 
                         font-bold text-sm tracking-wider border-2 border-gray-700 
                       hover:bg-gray-800 hover:border-white transition-all duration-300"
            >
              ВОЙТИ В АККАУНТ
            </Link>
          </div>

          {/* Условия использования */}
          <div className="mt-8 pt-6 border-t-2 border-gray-800">
            <p className="text-gray-600   text-xs text-center leading-relaxed">
              РЕГИСТРИРУЯСЬ, ВЫ СОГЛАШАЕТЕСЬ С НАШИМИ УСЛОВИЯМИ ИСПОЛЬЗОВАНИЯ И ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}