import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  X,
  Github,
  LogIn,
  UserPlus,
  Plus,
  Settings,
} from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false); // 임시 로그인 상태

  const categories = [
    { id: "app-service", name: "앱/서비스", icon: "📱" },
    { id: "notion-template", name: "노션 템플릿", icon: "📝" },
    { id: "slide-proposal", name: "슬라이드/제안서", icon: "📊" },
    { id: "automation-tool", name: "자동화툴", icon: "⚙️" },
    { id: "design-resource", name: "디자인 리소스", icon: "🎨" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-2xl border-b border-white/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              TechFunding
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder="검색..."
                className="w-72 px-6 py-3 pl-12 border border-secondary-200/50 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 bg-white/90 backdrop-blur-md shadow-lg"
              />
              <Search className="absolute left-4 top-3 h-6 w-6 text-secondary-400" />
            </div>

            <div className="flex items-center space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="text-secondary-600 hover:text-primary-600 transition-all duration-300 font-semibold hover:scale-105 transform flex items-center space-x-1"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* 사용자 메뉴 */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <button className="relative p-2 text-secondary-600 hover:text-primary-600 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </button>

                <div className="relative">
                  <Link
                    to="/mypage"
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">U</span>
                    </div>
                    <span className="text-secondary-700 font-medium">
                      사용자
                    </span>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn-secondary text-xs">
                  <LogIn className="h-3 w-3 mr-1" />
                  로그인
                </Link>
                <Link to="/create-project" className="btn-primary text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  프로젝트 등록
                </Link>
                <Link to="/create-product" className="btn-secondary text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  제품 등록
                </Link>
              </div>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              className="lg:hidden p-2 rounded-2xl hover:bg-secondary-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/20 bg-white/90 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색..."
                  className="w-full px-4 py-3 pl-10 border border-secondary-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white/80 backdrop-blur-sm"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-secondary-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="block py-3 px-4 text-center text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-secondary-200/50">
                <div className="flex space-x-2">
                  <Link to="/login" className="flex-1 btn-secondary text-xs">
                    <LogIn className="h-3 w-3 mr-1" />
                    로그인
                  </Link>
                  <Link
                    to="/create-project"
                    className="flex-1 btn-primary text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    프로젝트 등록
                  </Link>
                </div>
                <div className="pt-2">
                  <Link
                    to="/create-product"
                    className="w-full btn-secondary text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    제품 등록
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
