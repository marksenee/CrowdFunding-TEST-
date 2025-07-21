import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  Share2,
  ArrowLeft,
  Download,
  Link as LinkIcon,
  Mail,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  price: number;
  originalPrice?: number;
  mainImage: string;
  images: string[];
  detailedDescription: string;
  deliveryMethod: "file" | "link" | "email";
  tags: string[];
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
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // 샘플 제품 데이터
  const product: Product = {
    id: "1",
    title: "완성된 프로젝트 관리 앱",
    shortDescription: "팀 프로젝트 관리를 위한 완벽한 앱입니다.",
    category: "app-service",
    price: 29000,
    originalPrice: 49000,
    mainImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076d223f692?w=400&h=300&fit=crop",
    ],
    detailedDescription: `이 프로젝트 관리 앱은 팀 협업을 위한 완벽한 솔루션입니다.

주요 기능:
• 실시간 프로젝트 추적
• 팀원 간 커뮤니케이션
• 파일 공유 및 버전 관리
• 일정 관리 및 알림
• 성과 분석 및 리포팅

사용 기술:
• React Native
• Node.js 백엔드
• MongoDB 데이터베이스
• AWS 클라우드 인프라

이 앱을 통해 팀의 생산성을 크게 향상시킬 수 있습니다.`,
    deliveryMethod: "file",
    tags: ["앱", "프로젝트관리", "협업", "모바일"],
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
    status: "active",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  };

  const categories = [
    { id: "app-service", name: "앱/서비스", icon: "📱" },
    { id: "notion-template", name: "노션 템플릿", icon: "📝" },
    { id: "slide-proposal", name: "슬라이드/제안서", icon: "📊" },
    { id: "automation-tool", name: "자동화툴", icon: "⚙️" },
    { id: "design-resource", name: "디자인 리소스", icon: "🎨" },
  ];

  const deliveryMethods = [
    {
      id: "file",
      name: "파일 전송",
      icon: "📁",
      description: "다운로드 링크 제공",
    },
    {
      id: "link",
      name: "링크 전송",
      icon: "🔗",
      description: "접근 링크 제공",
    },
    {
      id: "email",
      name: "메일 전송",
      icon: "📧",
      description: "이메일로 전송",
    },
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const getDeliveryMethodInfo = () => {
    return deliveryMethods.find(
      (method) => method.id === product.deliveryMethod
    );
  };

  const handlePurchase = () => {
    // 구매 로직 구현
    console.log("구매하기:", product.id);
    navigate("/purchase-complete");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>뒤로 가기</span>
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked
                  ? "text-red-500"
                  : "text-secondary-600 hover:text-red-500"
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 이미지 섹션 */}
          <div className="space-y-6">
            {/* 메인 이미지 */}
            <div className="relative group">
              <img
                src={product.images[selectedImage] || product.mainImage}
                alt={product.title}
                className="w-full h-96 object-cover rounded-3xl shadow-2xl cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                onClick={() => setShowImageModal(true)}
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <div className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % 할인
                    </div>
                  )}
                <button
                  onClick={() => setShowImageModal(true)}
                  className="bg-white/90 backdrop-blur-sm text-secondary-600 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Expand className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 썸네일 이미지들 */}
            {product.images.length > 0 && (
              <div className="grid grid-cols-5 gap-3">
                <button
                  onClick={() => setSelectedImage(0)}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 group ${
                    selectedImage === 0
                      ? "border-primary-500"
                      : "border-secondary-200"
                  }`}
                >
                  <img
                    src={product.mainImage}
                    alt="메인 이미지"
                    className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index + 1)}
                    className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 group ${
                      selectedImage === index + 1
                        ? "border-primary-500"
                        : "border-secondary-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`추가 이미지 ${index + 1}`}
                      className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 제품 정보 섹션 */}
          <div className="space-y-8">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {categories.find((c) => c.id === product.category)?.icon}
                </span>
                <span className="text-secondary-600">
                  {categories.find((c) => c.id === product.category)?.name}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-secondary-900">
                {product.title}
              </h1>

              <p className="text-lg text-secondary-600">
                {product.shortDescription}
              </p>

              {/* 평점 및 리뷰 */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-secondary-600">
                    {product.rating} ({product.reviewCount}개 리뷰)
                  </span>
                </div>
                <span className="text-secondary-500">•</span>
                <span className="text-secondary-600">
                  {product.salesCount.toLocaleString()}개 판매
                </span>
              </div>
            </div>

            {/* 가격 정보 */}
            <div className="bg-gradient-to-r from-primary-50 to-purple-50 p-6 rounded-3xl border border-primary-100">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(product.price)}원
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="text-lg text-secondary-500 line-through">
                        {formatPrice(product.originalPrice)}원
                      </span>
                    )}
                </div>

                <button
                  onClick={handlePurchase}
                  className="btn-primary w-full py-4 flex items-center justify-center space-x-2 text-lg font-semibold"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>구매하기</span>
                </button>
              </div>
            </div>

            {/* 전달 방식 */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                전달 방식
              </h3>
              <div className="flex items-center space-x-3 p-4 bg-secondary-50 rounded-2xl">
                <span className="text-2xl">
                  {getDeliveryMethodInfo()?.icon}
                </span>
                <div>
                  <div className="font-medium text-secondary-900">
                    {getDeliveryMethodInfo()?.name}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {getDeliveryMethodInfo()?.description}
                  </div>
                </div>
              </div>
            </div>

            {/* 태그 */}
            {product.tags.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  태그
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 창작자 정보 */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                창작자
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {product.creator.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-secondary-900">
                    {product.creator.name}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {product.creator.followers} 팔로워 •{" "}
                    {product.creator.following} 팔로잉
                  </div>
                </div>
                <button className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-2xl hover:bg-secondary-200 transition-colors">
                  팔로우
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="mt-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              상세 설명
            </h2>
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-secondary-700 leading-relaxed">
                {product.detailedDescription}
              </div>
            </div>
          </div>
        </div>

        {/* 관련 제품 추천 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">
            관련 제품
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 여기에 관련 제품 카드들을 추가할 수 있습니다 */}
            <div className="card border-l-4 border-purple-500">
              <div className="relative mb-4">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop"
                  alt="관련 제품"
                  className="w-full h-32 object-cover rounded-2xl"
                />
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">
                다른 프로젝트 관리 도구
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-600">
                  19,000원
                </span>
                <button className="btn-primary py-2 px-4 text-sm">
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 모달 */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            {/* 모달 헤더 */}
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
              <button
                onClick={() => setShowImageModal(false)}
                className="bg-white/90 backdrop-blur-sm text-secondary-600 p-2 rounded-full hover:bg-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 메인 이미지 */}
            <div className="relative">
              <img
                src={product.images[selectedImage] || product.mainImage}
                alt={product.title}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />

              {/* 네비게이션 버튼 */}
              {product.images.length > 0 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(Math.max(0, selectedImage - 1))
                    }
                    disabled={selectedImage === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-secondary-600 p-3 rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        Math.min(product.images.length, selectedImage + 1)
                      )
                    }
                    disabled={selectedImage === product.images.length}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-secondary-600 p-3 rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* 썸네일 네비게이션 */}
            {product.images.length > 0 && (
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedImage(0)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === 0
                        ? "border-primary-500"
                        : "border-white/30"
                    }`}
                  >
                    <img
                      src={product.mainImage}
                      alt="메인 이미지"
                      className="w-full h-full object-cover"
                    />
                  </button>
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index + 1)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index + 1
                          ? "border-primary-500"
                          : "border-white/30"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`추가 이미지 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
