import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Clock,
  Users,
  Star,
  ShoppingCart,
  Filter,
  Search,
} from "lucide-react";

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

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "전체", icon: "🌟" },
    { id: "app-service", name: "앱/서비스", icon: "📱" },
    { id: "notion-template", name: "노션 템플릿", icon: "📝" },
    { id: "slide-proposal", name: "슬라이드/제안서", icon: "📊" },
    { id: "automation-tool", name: "자동화툴", icon: "⚙️" },
    { id: "design-resource", name: "디자인 리소스", icon: "🎨" },
  ];

  const products: Product[] = [
    {
      id: "1",
      title: "AI 기반 개인 비서 앱",
      description:
        "일상 생활을 더욱 편리하게 만들어주는 AI 개인 비서 앱입니다. 스케줄 관리, 알림, 음성 인식 등 다양한 기능을 제공합니다.",
      category: "app-service",
      price: 29000,
      originalPrice: 49000,
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
      rating: 4.8,
      reviewCount: 156,
      salesCount: 2340,
      deliveryMethod: "digital",
      tags: ["AI", "앱", "자동화", "생산성"],
      status: "active",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "프로젝트 관리 노션 템플릿",
      description:
        "팀 프로젝트 관리를 위한 완벽한 노션 템플릿입니다. 태스크 관리, 일정 추적, 팀 협업을 위한 모든 기능이 포함되어 있습니다.",
      category: "notion-template",
      price: 15000,
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
      rating: 4.9,
      reviewCount: 89,
      salesCount: 1200,
      deliveryMethod: "digital",
      tags: ["노션", "템플릿", "프로젝트관리", "협업"],
      status: "active",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      title: "자동화 워크플로우 도구",
      description:
        "반복 작업을 자동화하는 강력한 워크플로우 도구입니다. 복잡한 업무 프로세스를 간단하게 자동화할 수 있습니다.",
      category: "automation-tool",
      price: 45000,
      originalPrice: 69000,
      mainImage:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      ],
      creator: {
        id: "3",
        name: "박자동화",
        email: "auto@example.com",
        role: "creator",
        followers: 234,
        following: 67,
        likes: 445,
      },
      rating: 4.7,
      reviewCount: 234,
      salesCount: 890,
      deliveryMethod: "digital",
      tags: ["자동화", "워크플로우", "생산성", "업무효율"],
      status: "active",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-25"),
    },
    {
      id: "4",
      title: "UI/UX 디자인 시스템",
      description:
        "일관된 디자인을 위한 완벽한 UI/UX 디자인 시스템입니다. 컴포넌트, 아이콘, 색상 팔레트가 모두 포함되어 있습니다.",
      category: "design-resource",
      price: 35000,
      mainImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      ],
      creator: {
        id: "4",
        name: "최디자인",
        email: "ui@example.com",
        role: "creator",
        followers: 567,
        following: 123,
        likes: 789,
      },
      rating: 4.9,
      reviewCount: 445,
      salesCount: 3200,
      deliveryMethod: "digital",
      tags: ["디자인", "UI/UX", "컴포넌트", "시스템"],
      status: "active",
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-18"),
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.salesCount - a.salesCount;
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const getDiscountPercentage = (
    originalPrice: number,
    currentPrice: number
  ) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* 헤더 섹션 */}
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            기술 서비스 마켓플레이스 🛍️
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl mx-auto">
            혁신적인 기술 서비스들을 직접 구매하고 이용해보세요!
            <br />
            창작자들이 만든 완성된 서비스들을 지금 바로 만나보세요.
          </p>
        </div>
      </section>

      {/* 필터 및 검색 섹션 */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* 검색 */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="서비스 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-secondary-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 bg-white/90 backdrop-blur-md shadow-lg"
              />
            </div>

            {/* 정렬 */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-secondary-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 bg-white/90 backdrop-blur-md shadow-lg"
              >
                <option value="popular">인기순</option>
                <option value="rating">평점순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
                <option value="newest">최신순</option>
              </select>
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-white/80 text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200/50"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 제품 목록 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <div key={product.id} className="group">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="card group-hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-3 hover:scale-105">
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
                          {getDiscountPercentage(
                            product.originalPrice,
                            product.price
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

                      {/* 태그 */}
                      <div className="flex flex-wrap gap-2">
                        {product.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
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

          {/* 결과 없음 */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                검색 결과가 없어요
              </h3>
              <p className="text-secondary-600">
                다른 검색어나 카테고리를 시도해보세요!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
