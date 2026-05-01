import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../stores/stores";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://localhost:3000/api/login", { 
        email, 
        password 
      });
      
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "НЕВЕРНЫЙ EMAIL ИЛИ ПАРОЛЬ");
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white  mb-3 tracking-tighter">
              TECH<span className="text-gray-400">HUB</span>
            </h2>
            <p className="text-gray-400  text-sm sm:text-base">ВХОД В АККАУНТ</p>
          </div>

          {/* Форма */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-gray-900 border-2 border-gray-700 text-white px-4 py-3  text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Поле email */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400  text-sm tracking-wider">EMAIL</span>
                <div className="h-px flex-1 bg-gray-800"></div>
              </div>
              <input
                type="email"
                placeholder="EMAIL@EXAMPLE.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-900 border-2 border-gray-700 
                         text-white px-4 py-3 text-sm
                         focus:outline-none focus:border-white
                         placeholder:text-gray-600 transition-all duration-200
                         uppercase"
              />
            </div>

            {/* Поле пароля */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400  text-sm tracking-wider">ПАРОЛЬ</span>
                <div className="h-px flex-1 bg-gray-800"></div>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-900 border-2 border-gray-700 
                         text-white px-4 py-3  text-sm
                         focus:outline-none focus:border-white
                         placeholder:text-gray-600 tracking-widest
                         transition-all duration-200"
              />
            </div>

            {/* Забыли пароль */}
            <div className="text-right">
              <Link 
                to="/login" 
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ЗАБЫЛИ ПАРОЛЬ?
              </Link>
            </div>

            {/* Кнопка входа */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4  font-bold text-sm tracking-wider 
                        transition-all duration-300 border-2 ${loading 
                          ? 'bg-gray-800 border-gray-700 cursor-not-allowed text-gray-400' 
                          : 'bg-white text-black border-white hover:bg-gray-100 hover:scale-[1.02]'}
                        flex items-center justify-center gap-3`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
                  ВХОД...
                </>
              ) : (
                <>
                  ВОЙТИ В АККАУНТ
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
              <span className="px-4 bg-black text-gray-500  text-xs">ИЛИ</span>
            </div>
          </div>

          {/* Ссылка на регистрацию */}
          <div className="text-center">
            <p className="text-gray-500  text-sm mb-4">
              ЕЩЁ НЕТ АККАУНТА?
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center w-full py-3 bg-gray-900 text-white 
                        font-bold text-sm tracking-wider border-2 border-gray-700 
                       hover:bg-gray-800 hover:border-white transition-all duration-300"
            >
              СОЗДАТЬ АККАУНТ
            </Link>
          </div>

          {/* Информация */}
          <div className="mt-8 pt-6 border-t-2 border-gray-800">
            <p className="text-gray-600  text-xs text-center">
              © 2025 TECHHUB. ВСЕ ПРАВА ЗАЩИЩЕНЫ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}