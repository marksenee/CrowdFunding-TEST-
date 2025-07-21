import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  Share2,
  Clock,
  Users,
  Calendar,
  DollarSign,
  Github,
  Globe,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import { Project } from "../types";

const ProjectDetail: React.FC = () => {
  const { id: _id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 임시 프로젝트 데이터
  const project: Project = {
    id: "1",
    title: "AI 기반 개인 비서 앱",
    description:
      "일상 생활을 더욱 편리하게 만들어주는 AI 개인 비서입니다. 음성 인식, 자연어 처리, 머신러닝 기술을 활용하여 사용자의 일정 관리, 정보 검색, 알림 서비스 등을 제공합니다.",
    category: "app-service",
    mainImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
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
    rewards: [
      {
        id: "1",
        name: "얼리버드 리워드",
        description: "앱 출시 후 1개월 이내에 다운로드 가능한 베타 버전",
        amount: 500,
        deliveryMethod: "앱스토어 링크",
        deliveryDate: new Date("2024-04-01"),
        maxQuantity: 100,
        currentQuantity: 45,
      },
      {
        id: "2",
        name: "프리미엄 리워드",
        description: "베타 버전 + 추가 기능 3개월 무료 이용권",
        amount: 500,
        deliveryMethod: "앱스토어 링크 + 이메일",
        deliveryDate: new Date("2024-04-01"),
        maxQuantity: 50,
        currentQuantity: 23,
      },
    ],
    status: "active",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getDaysLeft = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const handleSupport = () => {
    setShowSupportModal(true);
  };

  const handleConfirmSupport = () => {
    setShowSupportModal(false);
    // 여기에 실제 결제 로직을 구현
    console.log("Supporting with reward:", selectedReward);
    // 결제 완료 후 성공 모달 표시
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleCancelSupport = () => {
    setShowSupportModal(false);
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로가기 버튼 */}
        <Link
          to="/"
          className="inline-flex items-center text-secondary-600 hover:text-secondary-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          뒤로가기
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 프로젝트 이미지 */}
            <div className="bg-white rounded-lg shadow-sm border border-secondary-200 overflow-hidden">
              <img
                src={project.mainImage}
                alt={project.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* 프로젝트 정보 */}
            <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-secondary-900 mb-2">
                    {project.title}
                  </h1>
                  <p className="text-secondary-600 text-lg">
                    {project.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-colors ${
                      isLiked
                        ? "text-red-500 bg-red-50"
                        : "text-secondary-400 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`}
                    />
                  </button>
                  <button className="p-2 rounded-full text-secondary-400 hover:text-secondary-600 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* 창작자 정보 */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-secondary-50 rounded-lg">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {project.creator.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">
                    {project.creator.name}
                  </h3>
                  <p className="text-sm text-secondary-600">
                    팔로워 {project.creator.followers}명
                  </p>
                </div>
              </div>

              {/* 총 후원액 */}
              <div className="mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {project.currentFunding.toLocaleString()}원
                  </div>
                  <div className="text-secondary-600">총 후원액</div>
                </div>
              </div>

              {/* 프로젝트 상세 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-secondary-600">
                  <Clock className="h-5 w-5" />
                  <span>{getDaysLeft(project.fundingPeriod.end)}일 남음</span>
                </div>
                <div className="flex items-center space-x-2 text-secondary-600">
                  <Users className="h-5 w-5" />
                  <span>후원자 156명</span>
                </div>
                <div className="flex items-center space-x-2 text-secondary-600">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {project.fundingPeriod.start.toLocaleDateString()} -{" "}
                    {project.fundingPeriod.end.toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* 링크들 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-secondary-900 mb-3">
                  관련 링크
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button className="flex items-center space-x-2 p-3 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors">
                    <Github className="h-5 w-5 text-secondary-600" />
                    <span className="text-sm">GitHub</span>
                  </button>
                  <button className="flex items-center space-x-2 p-3 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors">
                    <Globe className="h-5 w-5 text-secondary-600" />
                    <span className="text-sm">데모 사이트</span>
                  </button>
                  <button className="flex items-center space-x-2 p-3 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors">
                    <Smartphone className="h-5 w-5 text-secondary-600" />
                    <span className="text-sm">앱스토어</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 로드맵 */}
            <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                로드맵
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      MVP 개발 완료
                    </h3>
                    <p className="text-secondary-600 text-sm mb-2">
                      2024년 2월 15일
                    </p>
                    <p className="text-secondary-600">
                      기본 기능이 구현된 MVP 버전을 완성합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      베타 테스트
                    </h3>
                    <p className="text-secondary-600 text-sm mb-2">
                      2024년 3월 1일
                    </p>
                    <p className="text-secondary-600">
                      선택된 사용자들을 대상으로 베타 테스트를 진행합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      정식 출시
                    </h3>
                    <p className="text-secondary-600 text-sm mb-2">
                      2024년 4월 1일
                    </p>
                    <p className="text-secondary-600">
                      앱스토어를 통해 정식 버전을 출시합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            {/* 후원 카드 */}
            <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                후원하기
              </h3>

              {/* 총 후원액 */}
              <div className="mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {project.currentFunding.toLocaleString()}원
                  </div>
                  <div className="text-secondary-600">총 후원액</div>
                </div>
              </div>

              {/* 리워드 선택 */}
              <div className="mb-6">
                <h4 className="font-semibold text-secondary-900 mb-3">
                  리워드 선택
                </h4>
                <div className="space-y-3">
                  {project.rewards.map((reward) => (
                    <label
                      key={reward.id}
                      className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedReward === reward.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-secondary-200 hover:border-secondary-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reward"
                        value={reward.id}
                        checked={selectedReward === reward.id}
                        onChange={(e) => setSelectedReward(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-secondary-900">
                          {reward.name}
                        </h5>
                        <span className="text-primary-600 font-semibold">
                          {reward.amount.toLocaleString()}원
                        </span>
                      </div>
                      <p className="text-sm text-secondary-600 mb-2">
                        {reward.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-secondary-500">
                        <span>제공 방식: {reward.deliveryMethod}</span>
                        <span>
                          {reward.currentQuantity}/{reward.maxQuantity} 남음
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 후원 버튼 */}
              <button onClick={handleSupport} className="w-full btn-primary">
                <DollarSign className="h-4 w-4 mr-2" />
                500원 후원하기
              </button>

              {/* 남은 시간 */}
              <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-2 text-secondary-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    {getDaysLeft(project.fundingPeriod.end)}일 남음
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 후원 확인 모달 */}
      {showSupportModal && (
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

              {/* 선택된 리워드 표시 */}
              {selectedReward && (
                <div className="bg-primary-50 rounded-2xl p-4 mb-6">
                  <h4 className="font-semibold text-primary-700 mb-2">
                    선택된 리워드
                  </h4>
                  <div className="text-sm text-primary-600">
                    {project.rewards.find((r) => r.id === selectedReward)?.name}
                  </div>
                </div>
              )}

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
              <div className="bg-secondary-50 rounded-2xl p-4 mb-6">
                <h4 className="font-semibold text-secondary-900 mb-2">
                  후원한 프로젝트
                </h4>
                <div className="text-sm text-secondary-600">
                  {project.title}
                </div>
              </div>

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

export default ProjectDetail;
