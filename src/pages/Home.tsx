import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Clock, Users, Coins, DollarSign } from "lucide-react";
import { Project, Category } from "../types";

const Home: React.FC = () => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories: {
    id: Category;
    name: string;
    icon: string;
    count: number;
  }[] = [
    { id: "app-service", name: "앱/서비스", icon: "📱", count: 24 },
    { id: "notion-template", name: "노션 템플릿", icon: "📝", count: 18 },
    { id: "slide-proposal", name: "슬라이드/제안서", icon: "📊", count: 12 },
    { id: "automation-tool", name: "자동화툴", icon: "⚙️", count: 15 },
    { id: "design-resource", name: "디자인 리소스", icon: "🎨", count: 31 },
  ];

  const projects: Project[] = [
    {
      id: "1",
      title: "AI 기반 개인 비서 앱",
      description: "일상 생활을 더욱 편리하게 만들어주는 AI 개인 비서",
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
    {
      id: "2",
      title: "프로젝트 관리 노션 템플릿",
      description: "팀 프로젝트 관리를 위한 완벽한 노션 템플릿",
      category: "notion-template",
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
      currentFunding: 850000,
      fundingPeriod: {
        start: new Date("2024-01-15"),
        end: new Date("2024-02-15"),
      },
      rewards: [],
      status: "active",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      title: "자동화 워크플로우 도구",
      description: "반복 작업을 자동화하는 강력한 워크플로우 도구",
      category: "automation-tool",
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
      currentFunding: 2100000,
      fundingPeriod: {
        start: new Date("2024-01-10"),
        end: new Date("2024-04-10"),
      },
      rewards: [],
      status: "active",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-25"),
    },
  ];

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getDaysLeft = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const handleSupport = (project: Project) => {
    setSelectedProject(project);
    setShowSupportModal(true);
  };

  const handleConfirmSupport = () => {
    setShowSupportModal(false);
    // 여기에 실제 결제 로직을 구현
    console.log("Supporting project:", selectedProject?.title);
    // 결제 완료 후 성공 모달 표시
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleCancelSupport = () => {
    setShowSupportModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* 인기 프로젝트 섹션 */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-black text-secondary-900 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              인기 프로젝트
            </h2>
            <Link
              to="/projects"
              className="text-primary-600 hover:text-primary-700 font-bold transition-all duration-300 hover:scale-105 transform"
            >
              모든 프로젝트 보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="card group"
              >
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
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-secondary-600 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-secondary-500 mb-8">
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-primary-200 px-4 py-2 rounded-2xl">
                      <Users className="h-4 w-4 text-primary-600" />
                      <span className="text-primary-700 font-bold">
                        {project.creator.followers}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-primary-200 px-4 py-2 rounded-2xl">
                      <Clock className="h-4 w-4 text-primary-600" />
                      <span className="text-primary-700 font-bold">
                        {getDaysLeft(project.fundingPeriod.end)}일 남음
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">
                        {project.currentFunding.toLocaleString()}원
                      </div>
                      <div className="text-sm text-secondary-500">
                        총 후원액
                      </div>
                    </div>
                  </div>

                  {/* 후원하기 버튼 */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleSupport(project)}
                      className="btn-primary w-full text-xs py-2 px-4 flex items-center justify-center space-x-2"
                    >
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>500원 후원하기</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center mb-16 text-secondary-900 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
            카테고리별 탐색
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group text-center p-10 rounded-3xl border border-white/30 hover:border-primary-200/50 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 bg-white/95 backdrop-blur-xl hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 hover:-translate-y-3 hover:scale-105"
              >
                <div className="text-6xl mb-8 transform group-hover:scale-125 transition-transform duration-500">
                  {category.icon}
                </div>
                <h3 className="font-black text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors text-xl">
                  {category.name}
                </h3>
                <p className="text-sm text-secondary-500 group-hover:text-primary-500 transition-colors font-medium">
                  {category.count}개 프로젝트
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 귀여운 서비스 등록 유도 섹션 */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="text-4xl">✨</span>
              <h2 className="text-4xl font-black text-secondary-900 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                나만의 특별한 프로젝트를 시작해보세요!
              </h2>
              <span className="text-4xl">✨</span>
            </div>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              멋진 아이디어가 있다면 지금 바로 시작해보세요!
              <br />
              후원받기도 하고, 완성된 서비스도 팔아보세요 💫
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 귀여운 후원받기 카드 */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-pink-200 hover:border-pink-300 p-8 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
              <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                💰
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-4xl">🎁</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                  후원받기
                </h3>
                <p className="text-secondary-600 mb-6 leading-relaxed">
                  멋진 아이디어가 있나요?
                  <br />
                  후원자들이 당신의 꿈을 응원해줄 거예요!
                  <br />
                  <span className="font-bold text-pink-600">
                    평균 3,200만원 받고 있어요 🎉
                  </span>
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center space-x-3 text-sm text-secondary-600">
                    <span className="text-pink-500">1️⃣</span>
                    <span>프로젝트 등록하고 펀딩 시작</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-sm text-secondary-600">
                    <span className="text-pink-500">2️⃣</span>
                    <span>후원자들과 소통하며 진행</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-sm text-secondary-600">
                    <span className="text-pink-500">3️⃣</span>
                    <span>목표 달성하면 후원금 받기</span>
                  </div>
                </div>
                <Link
                  to="/projects"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                >
                  <span>프로젝트 둘러보기</span>
                  <span className="text-lg">🚀</span>
                </Link>
              </div>
            </div>

            {/* 귀여운 판매하기 카드 */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-300 p-8 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
              <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                💎
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-4xl">🛍️</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                  판매하기
                </h3>
                <p className="text-secondary-600 mb-6 leading-relaxed">
                  완성된 서비스나 제품이 있나요?
                  <br />
                  전 세계 사람들에게 팔아보세요!
                  <br />
                  <span className="font-bold text-purple-600">
                    평균 15,000명이 이용하고 있어요 🎊
                  </span>
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center space-x-3 text-sm text-secondary-600">
                    <span className="text-purple-500">1️⃣</span>
                    <span>제품 등록하고 상세 정보 작성</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-sm text-secondary-600">
                    <span className="text-purple-500">2️⃣</span>
                    <span>구매자 문의와 주문 관리</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-sm text-secondary-600">
                    <span className="text-purple-500">3️⃣</span>
                    <span>판매 수익 실시간 정산</span>
                  </div>
                </div>
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                >
                  <span>서비스 둘러보기</span>
                  <span className="text-lg">💫</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 후원 확인 모달 */}
      {showSupportModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              {/* 경고 아이콘 */}
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚠️</span>
              </div>

              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                후원 확인
              </h3>

              <div className="text-secondary-600 mb-6 space-y-3">
                <p className="font-semibold text-red-600">
                  "후원은 환불되지 않아요"
                </p>
                <p className="text-sm leading-relaxed">
                  후원금 500원은 창작자의 도전을 응원하는 의미로 사용되며, 즉시
                  결제 처리됩니다. 리워드는 응원의 증표로 제공되며, 교환/환불은
                  불가합니다.
                </p>
              </div>

              {/* 프로젝트 정보 */}
              <div className="bg-primary-50 rounded-2xl p-4 mb-6">
                <h4 className="font-semibold text-primary-700 mb-2">
                  후원할 프로젝트
                </h4>
                <div className="text-sm text-primary-600">
                  {selectedProject.title}
                </div>
              </div>

              {/* 버튼 그룹 */}
              <div className="flex space-x-4">
                <button
                  onClick={handleCancelSupport}
                  className="flex-1 px-6 py-3 border border-secondary-300 text-secondary-700 rounded-2xl hover:bg-secondary-50 transition-colors"
                >
                  더 고민해볼게요
                </button>
                <button
                  onClick={handleConfirmSupport}
                  className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 transition-colors font-semibold"
                >
                  네!(결제창 넘김)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 후원 완료 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              {/* 성공 아이콘 */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎉</span>
              </div>

              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                후원 완료!
              </h3>

              <div className="text-secondary-600 mb-6">
                <p className="mb-3">
                  <span className="font-bold text-primary-600">500원</span>{" "}
                  후원이 완료되었습니다.
                </p>
                <p className="text-sm">
                  창작자의 도전을 응원해주셔서 감사합니다! 리워드는 이메일로
                  발송됩니다.
                </p>
              </div>

              {/* 프로젝트 정보 */}
              {selectedProject && (
                <div className="bg-secondary-50 rounded-2xl p-4 mb-6">
                  <h4 className="font-semibold text-secondary-900 mb-2">
                    후원한 프로젝트
                  </h4>
                  <div className="text-sm text-secondary-600">
                    {selectedProject.title}
                  </div>
                </div>
              )}

              {/* 버튼 */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 transition-colors font-semibold"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
