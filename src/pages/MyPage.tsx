import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Edit3,
  Heart,
  FileText,
  DollarSign,
  Settings,
  MessageSquare,
  Calendar,
  ShoppingBag,
  Bell,
  Star,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react";

type UserType = "creator" | "supporter";

interface Project {
  id: string;
  title: string;
  status: string;
  fundingAmount: number;
  supporters: number;
  endDate: Date;
  image: string;
}

interface Purchase {
  id: string;
  title: string;
  price: number;
  image: string;
  purchaseDate: Date;
}

const MyPage: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("creator");
  const [activeTab, setActiveTab] = useState("profile");

  // 임시 데이터
  const profile = {
    name: "김창작",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    likes: 128,
    followers: 256,
  };

  const creatorProjects: Project[] = [
    {
      id: "1",
      title: "AI 그림 그리기 앱",
      status: "검토 중",
      fundingAmount: 2500000,
      supporters: 45,
      endDate: new Date("2024-03-15"),
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    },
    {
      id: "2",
      title: "친환경 텀블러",
      status: "승인 완료",
      fundingAmount: 1800000,
      supporters: 32,
      endDate: new Date("2024-04-20"),
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    },
  ];

  const supportedProjects: Project[] = [
    {
      id: "3",
      title: "스마트 워치",
      status: "진행중",
      fundingAmount: 5000000,
      supporters: 89,
      endDate: new Date("2024-05-10"),
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
    },
    {
      id: "4",
      title: "독서 앱",
      status: "완료",
      fundingAmount: 1200000,
      supporters: 156,
      endDate: new Date("2024-02-28"),
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    },
  ];

  const purchases: Purchase[] = [
    {
      id: "1",
      title: "UI/UX 디자인 가이드",
      price: 29000,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
      purchaseDate: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "마케팅 전략 서비스",
      price: 150000,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      purchaseDate: new Date("2024-02-20"),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "등록 완료":
      case "승인 완료":
      case "완료":
        return "text-green-600 bg-green-100";
      case "검토 중":
      case "승인 대기":
      case "진행중":
        return "text-yellow-600 bg-yellow-100";
      case "검토 완료":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "등록 완료":
      case "승인 완료":
      case "완료":
        return <CheckCircle className="h-4 w-4" />;
      case "검토 중":
      case "승인 대기":
      case "진행중":
        return <Clock className="h-4 w-4" />;
      case "검토 완료":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            마이페이지
          </h1>
          <p className="text-secondary-600">
            내 활동과 프로젝트를 관리해보세요
          </p>
        </div>

        {/* 사용자 타입 선택 */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex bg-secondary-100 rounded-2xl p-1">
            <button
              onClick={() => setUserType("creator")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                userType === "creator"
                  ? "bg-white text-primary-600 shadow-md"
                  : "text-secondary-600 hover:text-secondary-900"
              }`}
            >
              <User className="h-4 w-4 inline mr-2" />
              창작자
            </button>
            <button
              onClick={() => setUserType("supporter")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                userType === "supporter"
                  ? "bg-white text-primary-600 shadow-md"
                  : "text-secondary-600 hover:text-secondary-900"
              }`}
            >
              <Heart className="h-4 w-4 inline mr-2" />
              후원자
            </button>
          </div>
        </div>

        {/* 프로필 섹션 */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={profile.image}
                  alt="프로필"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute -bottom-1 -right-1 bg-primary-500 text-white p-1 rounded-full hover:bg-primary-600 transition-colors">
                  <Edit3 className="h-3 w-3" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">
                  {profile.name}
                </h2>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-secondary-600">
                      {profile.likes}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-secondary-600">
                      {profile.followers}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-secondary">
              <Edit3 className="h-4 w-4 mr-2" />
              프로필 편집
            </button>
          </div>
        </div>

        {/* 네비게이션 탭 */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex space-x-2 overflow-x-auto">
            {userType === "creator" ? (
              <>
                <button
                  onClick={() => setActiveTab("review")}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === "review"
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  심사 현황
                </button>
                <button
                  onClick={() => setActiveTab("settlement")}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === "settlement"
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  <DollarSign className="h-4 w-4 inline mr-2" />
                  정산
                </button>
                <button
                  onClick={() => setActiveTab("management")}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === "management"
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  <Settings className="h-4 w-4 inline mr-2" />
                  프로젝트 관리
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab("support")}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === "support"
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  <Heart className="h-4 w-4 inline mr-2" />
                  후원 내역
                </button>
                <button
                  onClick={() => setActiveTab("purchase")}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === "purchase"
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4 inline mr-2" />
                  구매 내역
                </button>
                <button
                  onClick={() => setActiveTab("qa")}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === "qa"
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  Q&A
                </button>
                <button
                  onClick={() => setActiveTab("review")}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === "review"
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  <Star className="h-4 w-4 inline mr-2" />
                  후기
                </button>
                <button
                  onClick={() => setActiveTab("notification")}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === "notification"
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  <Bell className="h-4 w-4 inline mr-2" />
                  알림
                </button>
              </>
            )}
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {userType === "creator" ? (
            // 창작자 콘텐츠
            <>
              {activeTab === "review" && (
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                    심사 현황
                  </h3>
                  <div className="space-y-4">
                    {creatorProjects.map((project) => (
                      <div
                        key={project.id}
                        className="border border-secondary-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-secondary-900">
                                {project.title}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                {getStatusIcon(project.status)}
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    project.status
                                  )}`}
                                >
                                  {project.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">
                              {project.fundingAmount.toLocaleString()}원
                            </div>
                            <div className="text-sm text-secondary-600">
                              {project.supporters}명 후원
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-secondary-600">
                          {project.status === "검토 중" &&
                            "현재 프로젝트 검토가 진행 중입니다. 3-5일 소요됩니다."}
                          {project.status === "승인 완료" &&
                            "프로젝트가 승인되었습니다. 펀딩을 시작할 수 있습니다."}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "settlement" && (
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                    정산
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                      <h4 className="font-semibold text-green-800 mb-4">
                        정산 요청
                      </h4>
                      <button className="btn-primary w-full">
                        <DollarSign className="h-4 w-4 mr-2" />
                        정산 신청하기
                      </button>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                      <h4 className="font-semibold text-blue-800 mb-4">
                        정산 상태
                      </h4>
                      <div className="text-sm text-blue-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>승인 대기 중</span>
                        </div>
                        <div className="text-xs">예상 처리일: 2024.03.15</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold text-secondary-900 mb-4">
                      정산 내역
                    </h4>
                    <div className="space-y-4">
                      <div className="border border-secondary-200 rounded-2xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-secondary-900">
                              AI 그림 그리기 앱
                            </div>
                            <div className="text-sm text-secondary-600">
                              2024.02.15 정산 완료
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary-600">
                              1,250,000원
                            </div>
                            <div className="text-sm text-green-600">완료</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "management" && (
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                    프로젝트 관리
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                      <h4 className="font-semibold text-purple-800 mb-4">
                        실시간 후원 현황
                      </h4>
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        2,500,000원
                      </div>
                      <div className="text-sm text-purple-700">
                        총 45명 후원
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
                      <h4 className="font-semibold text-orange-800 mb-4">
                        공지사항
                      </h4>
                      <button className="btn-secondary w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        공지 작성
                      </button>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6">
                      <h4 className="font-semibold text-pink-800 mb-4">Q&A</h4>
                      <div className="text-sm text-pink-700 mb-4">
                        <div className="mb-2">답변 대기: 3건</div>
                        <div>답변 완료: 12건</div>
                      </div>
                      <Link
                        to="/creator-qna"
                        className="w-full px-4 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors font-semibold flex items-center justify-center"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Q&A 관리
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold text-secondary-900 mb-4">
                      펀딩 일정
                    </h4>
                    <div className="bg-secondary-50 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-secondary-900">
                            AI 그림 그리기 앱
                          </div>
                          <div className="text-sm text-secondary-600">
                            2024.02.01 ~ 2024.03.15
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600">
                            23일 남음
                          </div>
                          <div className="text-sm text-secondary-600">
                            진행률 65%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            // 후원자 콘텐츠
            <>
              {activeTab === "support" && (
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                    후원 내역
                  </h3>
                  <div className="space-y-4">
                    {supportedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="border border-secondary-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-secondary-900">
                                {project.title}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                {getStatusIcon(project.status)}
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    project.status
                                  )}`}
                                >
                                  {project.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">
                              500원
                            </div>
                            <div className="text-sm text-secondary-600">
                              후원 완료
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "purchase" && (
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                    구매 내역
                  </h3>
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="border border-secondary-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={purchase.image}
                              alt={purchase.title}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-secondary-900">
                                {purchase.title}
                              </h4>
                              <div className="text-sm text-secondary-600">
                                {purchase.purchaseDate.toLocaleDateString()}{" "}
                                구매
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">
                              {purchase.price.toLocaleString()}원
                            </div>
                            <div className="text-sm text-green-600">
                              구매 완료
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "qa" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-secondary-900">
                      Q&A
                    </h3>
                    <Link to="/write-qna" className="btn-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Q&A 등록
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-secondary-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-secondary-900">
                          리워드 배송 문의
                        </h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                          답변 완료
                        </span>
                      </div>
                      <p className="text-secondary-600 text-sm mb-4">
                        리워드 배송이 언제 될까요?
                      </p>
                      <div className="bg-secondary-50 rounded-xl p-4">
                        <p className="text-sm text-secondary-700">
                          안녕하세요! 리워드는 프로젝트 완료 후 2주 내에
                          배송됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "review" && (
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                    후기
                  </h3>
                  <div className="text-center py-12">
                    <Star className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
                    <p className="text-secondary-600">
                      아직 작성한 후기가 없습니다.
                    </p>
                    <Link
                      to="/write-review"
                      className="btn-primary mt-4 inline-flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      후기 작성하기
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "notification" && (
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                    알림
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-secondary-200 rounded-2xl p-6">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-primary-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-secondary-900">
                            프로젝트 업데이트
                          </h4>
                          <p className="text-sm text-secondary-600">
                            AI 그림 그리기 앱의 새로운 기능이 추가되었습니다.
                          </p>
                          <span className="text-xs text-secondary-500">
                            2시간 전
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="border border-secondary-200 rounded-2xl p-6">
                      <div className="flex items-center space-x-3">
                        <Heart className="h-5 w-5 text-red-500" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-secondary-900">
                            후원 완료
                          </h4>
                          <p className="text-sm text-secondary-600">
                            스마트 워치 프로젝트 후원이 완료되었습니다.
                          </p>
                          <span className="text-xs text-secondary-500">
                            1일 전
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
