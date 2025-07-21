import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  TrendingUp,
} from "lucide-react";
import { Project, Category } from "../types";

const Projects: React.FC = () => {
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

  const projects: Project[] = [
    {
      id: "1",
      title: "AI 기반 개인 비서 앱",
      description:
        "일상 생활을 더욱 편리하게 만들어주는 AI 개인 비서입니다. 스케줄 관리, 알림, 음성 인식 등 다양한 기능을 제공합니다.",
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
      description:
        "팀 프로젝트 관리를 위한 완벽한 노션 템플릿입니다. 태스크 관리, 일정 추적, 팀 협업을 위한 모든 기능이 포함되어 있습니다.",
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
      description:
        "반복 작업을 자동화하는 강력한 워크플로우 도구입니다. 복잡한 업무 프로세스를 간단하게 자동화할 수 있습니다.",
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
    {
      id: "4",
      title: "UI/UX 디자인 시스템",
      description:
        "일관된 디자인을 위한 완벽한 UI/UX 디자인 시스템입니다. 컴포넌트, 아이콘, 색상 팔레트가 모두 포함되어 있습니다.",
      category: "design-resource",
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
      currentFunding: 1800000,
      fundingPeriod: {
        start: new Date("2024-01-05"),
        end: new Date("2024-03-05"),
      },
      rewards: [],
      status: "active",
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-18"),
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.creator.followers - a.creator.followers;
      case "funding":
        return b.currentFunding - a.currentFunding;
      case "deadline":
        return (
          new Date(a.fundingPeriod.end).getTime() -
          new Date(b.fundingPeriod.end).getTime()
        );
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* 헤더 섹션 */}
      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            혁신적인 프로젝트 후원하기 🎁
          </h1>
          <p className="text-xl text-secondary-200 max-w-3xl mx-auto">
            멋진 아이디어를 가진 창작자들을 응원해보세요!
            <br />
            당신의 후원이 다음 혁신을 만들어갑니다.
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
                placeholder="프로젝트 검색..."
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
                <option value="funding">펀딩액순</option>
                <option value="deadline">마감임박순</option>
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

      {/* 프로젝트 목록 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProjects.map((project) => (
              <div key={project.id} className="group">
                <Link to={`/project/${project.id}`} className="block">
                  <div className="card group-hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-3 hover:scale-105">
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
                      <div className="absolute bottom-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
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

          {/* 결과 없음 */}
          {sortedProjects.length === 0 && (
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

export default Projects;
