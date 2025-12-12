// components/LoginModal.tsx
import React, { useState } from "react";
import { X, Lock, User } from "lucide-react";
import HsoftBlack from "../../assets/Hsoft-black.png";
import HsoftWhite from "../../assets/Hsoft-white.png";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<void>;
  title?: string;
  message?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  title = "Login",
  message = "Usuário e senha",
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Preencha todos os campos");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onLogin(username, password);
      setUsername("");
      setPassword("");
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      {/* Modal Container - Dimensões fixas 521x186 */}
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl
                    w-[521px]
                    max-[521px]:w-[95vw] max-[521px]:h-auto max-[521px]:max-h-[90vh] max-[521px]:overflow-auto"
      >
        {/* Header - Altura 36px com borda laranja */}
        <div className="flex items-center justify-between px-4 h-[36px] border-b border-[color:var(--orange-primary)]">
          <h3 className="text-[color:var(--orange-primary)] font-bold text-[20px]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-[color:var(--orange-primary)] hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo do modal */}
        <form onSubmit={handleSubmit} className="px-4 py-3 mt-[-58px]">
          {/* Campos em coluna com padding lateral de 8px */}
          <div
            className="flex flex-col gap-6 lg:gap-[-48px] px-2 lg:ml-[95px] lg:mt-[-15px]
                max-sm:gap-4 max-sm:px-0 max-sm:ml-0 max-sm:mt-2 md:ml-[100px]"
          >
            {/* Imagem à esquerda do campo */}
            {/* Imagem à esquerda do campo com suporte Dark/Light */}
            <div className="pt-6">
              {/* Contêiner para as duas imagens. Manterá as classes de posicionamento originais. */}
              <div className="flex justify-left w-[102px] h-[35px] relative left-[-113px] top-[96px] max-md:hidden">
                {/* Imagem para o tema CLARO: visível por padrão (block) e oculta no modo dark (dark:hidden) */}
                <img
                  src={HsoftBlack}
                  alt="Hsoft Logo"
                  className="block dark:hidden w-full h-full object-contain"
                />
                {/* Imagem para o tema ESCURO: oculta por padrão (hidden) e visível no modo dark (dark:block) */}
                <img
                  src={HsoftWhite}
                  alt="Hsoft Logo"
                  className="hidden dark:block w-full h-full object-contain"
                />
              </div>
            </div>
            {/* Campo Usuário - 387x28 */}
            <div>
              <label className="block text-sm font-medium text-[color:var(--orange-primary)] mb-1">
                Usuário
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="user@mail.com"
                  className="w-full lg:w-[387px] h-[28px] pl-10 pr-3 border border-gray-300 dark:border-slate-600
           rounded-md bg-white dark:bg-slate-700
           text-gray-900 dark:text-gray-100
           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
           text-sm"
                  autoFocus
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Campo Senha - 387x28 */}
            <div>
              <label className="block text-[12px] text-sm font-medium text-[color:var(--orange-primary)] mb-1 lg:mt-[-23px] max-sm:mt-[-10px]">
                Senha
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full lg:w-[387px] h-[28px] pl-10 pr-3 border border-gray-300 dark:border-slate-600
           rounded-md bg-white dark:bg-slate-700
           text-gray-900 dark:text-gray-100
           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
           text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mt-2 px-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
              {error}
            </div>
          )}

          {/* Botões de ação - Alinhados à direita com margin-top */}
          <div className="flex justify-end items-center gap-2 mt-[10px] px-2 mr-[-7px]">
            {" "}
            <button
              type="button"
              onClick={onClose}
              className="w-[71px] h-[28px] text-sm font-medium
             text-[color:var(--orange-primary)] border border-[color:var(--orange-primary)]
             hover:bg-[color:var(--orange-primary)] hover:text-white
             rounded-md transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              Fechar
            </button>
            <button
              type="submit"
              className="w-[71px] h-[28px] text-sm font-medium bg-[color:var(--orange-primary)] text-white
             hover:bg-orange-700 rounded-md transition-colors
             disabled:opacity-50 disabled:cursor-not-allowed
             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-3 w-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Autenticando...
                </span>
              ) : (
                "OK"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
