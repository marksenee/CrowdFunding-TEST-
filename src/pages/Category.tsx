import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  Clock,
  Users,
  Star,
  ShoppingCart,
  TrendingUp,
  Search,
} from "lucide-react";
import { Project, Category } from "../types";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  mainImage: string;
  images: string[];
  creator: {
    id: string;
    name: string;
    email: string;
    role: string;
    followers: number;
    following: number;
    likes: number;
  };
  rating: number;
  reviewCount: number;
  salesCount: number;
  deliveryMethod: "digital" | "physical" | "both";
  tags: string[];
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeTab, setActiveTab] = useState<"funding" | "purchase">("funding");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryInfo = {
    "app-service": {
      name: "앱/서비스",
      icon: "📱",
      hasFunding: true,
      hasPurchase: true,
    },
    "notion-template": {
      name: "노션 템플릿",
      icon: "📝",
      hasFunding: false,
      hasPurchase: true,
    },
    "slide-proposal": {
      name: "슬라이드/제안서",
      icon: "📊",
      hasFunding: false,
      hasPurchase: true,
    },
    "automation-tool": {
      name: "자동화툴",
      icon: "⚙️",
      hasFunding: true,
      hasPurchase: true,
    },
    "design-resource": {
      name: "디자인 리소스",
      icon: "🎨",
      hasFunding: false,
      hasPurchase: true,
    },
  };

  const currentCategory = categoryInfo[categoryId as keyof typeof categoryInfo];

  // 샘플 프로젝트 데이터 (후원용)
  const projects: Project[] = [
    {
      id: "1",
      title: "AI 기반 개인 비서 앱",
      description: "일상 생활을 더욱 편리하게 만들어주는 AI 개인 비서입니다.",
      category: "app-service",
      mainImage:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      ],
      creator: {
        id: "1",
        name: "김개발",
        email: "dev@example.com",
        role: "creator",
        followers: 120,
        following: 45,
        likes: 89,
      },
      currentFunding: 3200000,
      fundingPeriod: {
        start: new Date("2024-01-01"),
        end: new Date("2024-03-31"),
      },
      rewards: [],
      status: "active",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-15"),
    },
  ];

  // 샘플 제품 데이터 (구매용)
  const products: Product[] = [
    {
      id: "1",
      title: "완성된 프로젝트 관리 앱",
      description: "팀 프로젝트 관리를 위한 완벽한 앱입니다.",
      category: "app-service",
      price: 29000,
      originalPrice: 49000,
      mainImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      ],
      creator: {
        id: "2",
        name: "이디자인",
        email: "design@example.com",
        role: "creator",
        followers: 89,
        following: 23,
        likes: 156,
      },
      rating: 4.8,
      reviewCount: 156,
      salesCount: 2340,
      deliveryMethod: "digital",
      tags: ["앱", "프로젝트관리", "협업"],
      status: "active",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-20"),
    },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      project.category === categoryId &&
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(
    (product) =>
      product.category === categoryId &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getDaysLeft = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">
            카테고리를 찾을 수 없습니다
          </h1>
          <Link to="/" className="btn-primary">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* 헤더 섹션 */}
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="text-4xl">{currentCategory.icon}</span>
            <h1 className="text-4xl md:text-5xl font-black">
              {currentCategory.name}
            </h1>
          </div>
          <p className="text-xl text-secondary-200 max-w-3xl mx-auto">
            {currentCategory.hasFunding && currentCategory.hasPurchase
              ? "후원 가능한 프로젝트와 구매 가능한 서비스를 모두 만나보세요!"
              : "완성된 서비스를 바로 구매하고 이용해보세요!"}
          </p>
        </div>
      </section>

      {/* 검색 섹션 */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <input
              type="text"
              placeholder={`${currentCategory.name} 검색...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-secondary-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 bg-white/90 backdrop-blur-md shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 탭 섹션 */}
      {currentCategory.hasFunding && currentCategory.hasPurchase && (
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab("funding")}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === "funding"
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-white text-secondary-600 hover:bg-primary-50 border border-secondary-200/50"
                }`}
              >
                후원 가능한 프로젝트 🚀
              </button>
              <button
                onClick={() => setActiveTab("purchase")}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === "purchase"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-white text-secondary-600 hover:bg-purple-50 border border-secondary-200/50"
                }`}
              >
                구매 가능한 서비스 🛍️
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 콘텐츠 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "funding" && currentCategory.hasFunding && (
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
                후원 가능한 프로젝트 🚀
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group">
                    <Link to={`/project/${project.id}`} className="block">
                      <div className="card group-hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-l-4 border-primary-500">
                        {/* 프로젝트 이미지 */}
                        <div className="relative mb-6">
                          <img
                            src={project.mainImage}
                            alt={project.title}
                            className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                              <Heart className="h-5 w-5 text-secondary-400 hover:text-red-500" />
                            </button>
                          </div>
                          <div className="absolute bottom-4 left-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                            {getDaysLeft(project.fundingPeriod.end)}일 남음
                          </div>
                        </div>

                        {/* 프로젝트 정보 */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                              {project.title}
                            </h3>
                            <p className="text-secondary-600 text-sm line-clamp-2 mb-4">
                              {project.description}
                            </p>
                          </div>

                          {/* 창작자 정보 */}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {project.creator.name.charAt(0)}
                                </span>
                              </div>
                              <span className="text-secondary-700 font-medium">
                                {project.creator.name}
                              </span>
                            </div>
                            <div className="text-secondary-600">
                              {project.creator.followers} 팔로워
                            </div>
                          </div>

                          {/* 총 후원액 */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary-600">
                              {formatPrice(project.currentFunding)}원
                            </div>
                            <div className="text-sm text-secondary-500">
                              총 후원액
                            </div>
                          </div>

                          {/* 후원하기 버튼 */}
                          <div className="pt-4 border-t border-gray-100">
                            <button className="btn-primary w-full py-3 px-4 flex items-center justify-center space-x-2">
                              <TrendingUp className="h-4 w-4" />
                              <span>500원 후원하기</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "purchase" && currentCategory.hasPurchase && (
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
                구매 가능한 서비스 🛍️
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="card group-hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-l-4 border-purple-500">
                        {/* 제품 이미지 */}
                        <div className="relative mb-6">
                          <img
                            src={product.mainImage}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                              <Heart className="h-5 w-5 text-secondary-400 hover:text-red-500" />
                            </button>
                          </div>
                          {product.originalPrice && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                              {Math.round(
                                ((product.originalPrice - product.price) /
                                  product.originalPrice) *
                                  100
                              )}
                              % 할인
                            </div>
                          )}
                        </div>

                        {/* 제품 정보 */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                              {product.title}
                            </h3>
                            <p className="text-secondary-600 text-sm line-clamp-2 mb-4">
                              {product.description}
                            </p>
                          </div>

                          {/* 평점 및 리뷰 */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(product.rating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-secondary-600">
                                  {product.rating} ({product.reviewCount})
                                </span>
                              </div>
                            </div>
                            <div className="text-secondary-600 text-sm">
                              {product.salesCount.toLocaleString()}개 판매
                            </div>
                          </div>

                          {/* 가격 */}
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-primary-600">
                                {formatPrice(product.price)}원
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-secondary-500 line-through">
                                  {formatPrice(product.originalPrice)}원
                                </span>
                              )}
                            </div>
                            <button className="btn-primary w-full py-3 px-4 flex items-center justify-center space-x-2">
                              <ShoppingCart className="h-4 w-4" />
                              <span>구매하기</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 결과 없음 */}
          {((activeTab === "funding" && filteredProjects.length === 0) ||
            (activeTab === "purchase" && filteredProducts.length === 0)) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                검색 결과가 없어요
              </h3>
              <p className="text-secondary-600">다른 검색어를 시도해보세요!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
