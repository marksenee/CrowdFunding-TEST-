import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  HelpCircle,
  AlertCircle,
  FileText,
  User,
  Clock,
  CheckCircle,
  Send,
  Eye,
  EyeOff,
} from "lucide-react";

interface QnA {
  id: string;
  projectId: string;
  projectTitle: string;
  projectImage: string;
  questionType: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  isPrivate: boolean;
  status: "pending" | "answered";
  answers: Answer[];
}

interface Answer {
  id: string;
  content: string;
  author: string;
  isCreator: boolean;
  createdAt: Date;
}

const CreatorQnA: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "pending" | "answered"
  >("all");
  const [selectedQnA, setSelectedQnA] = useState<QnA | null>(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 임시 Q&A 데이터
  const qnaList: QnA[] = [
    {
      id: "1",
      projectId: "1",
      projectTitle: "AI 그림 그리기 앱",
      projectImage:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
      questionType: "delivery",
      title: "리워드 배송 문의",
      content:
        "안녕하세요! AI 그림 그리기 앱 프로젝트에 후원했습니다. 리워드 배송이 언제 될까요? 그리고 배송 추적은 어떻게 확인할 수 있나요?",
      author: "김후원",
      createdAt: new Date("2024-02-15"),
      isPrivate: false,
      status: "pending",
      answers: [],
    },
    {
      id: "2",
      projectId: "1",
      projectTitle: "AI 그림 그리기 앱",
      projectImage:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
      questionType: "technical",
      title: "앱 기능 문의",
      content:
        "앱에서 그림을 그릴 때 어떤 기능들이 포함되어 있나요? 그리고 안드로이드에서도 사용할 수 있나요?",
      author: "이사용자",
      createdAt: new Date("2024-02-14"),
      isPrivate: false,
      status: "answered",
      answers: [
        {
          id: "1",
          content:
            "안녕하세요! 앱에는 다양한 그림 그리기 도구와 필터가 포함되어 있습니다. 안드로이드 버전도 개발 중이며, 3월 말에 출시 예정입니다.",
          author: "김창작",
          isCreator: true,
          createdAt: new Date("2024-02-15"),
        },
      ],
    },
    {
      id: "3",
      projectId: "1",
      projectTitle: "AI 그림 그리기 앱",
      projectImage:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
      questionType: "refund",
      title: "환불 문의",
      content: "개인적인 사정으로 후원을 취소하고 싶습니다. 환불이 가능한가요?",
      author: "박고객",
      createdAt: new Date("2024-02-13"),
      isPrivate: true,
      status: "pending",
      answers: [],
    },
  ];

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "general":
        return { name: "일반 문의", icon: MessageSquare, color: "blue" };
      case "technical":
        return { name: "기술 문의", icon: HelpCircle, color: "purple" };
      case "delivery":
        return { name: "배송 문의", icon: AlertCircle, color: "orange" };
      case "refund":
        return { name: "환불 문의", icon: FileText, color: "red" };
      default:
        return { name: "기타", icon: MessageSquare, color: "gray" };
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "purple":
        return "bg-purple-100 text-purple-600";
      case "orange":
        return "bg-orange-100 text-orange-600";
      case "red":
        return "bg-red-100 text-red-600";
      case "gray":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "answered":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "answered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredQnA = qnaList.filter((qna) => {
    if (selectedFilter === "all") return true;
    return qna.status === selectedFilter;
  });

  const handleSubmitAnswer = async () => {
    if (!selectedQnA || !newAnswer.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    // 여기에 실제 답변 등록 로직을 구현
    console.log("Answer submitted:", {
      qnaId: selectedQnA.id,
      content: newAnswer,
    });

    // 임시 딜레이
    setTimeout(() => {
      setIsSubmitting(false);
      setNewAnswer("");
      setSelectedQnA(null);
      // Q&A 목록 새로고침
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/mypage"
              className="p-2 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowLeft className="h-5 w-5 text-secondary-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">
                Q&A 관리
              </h1>
              <p className="text-secondary-600">
                프로젝트에 대한 문의를 관리하고 답변해보세요
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Q&A 목록 */}
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                문의 목록
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedFilter === "all"
                      ? "bg-primary-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedFilter("pending")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedFilter === "pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  답변 대기
                </button>
                <button
                  onClick={() => setSelectedFilter("answered")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedFilter === "answered"
                      ? "bg-green-500 text-white"
                      : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
                  }`}
                >
                  답변 완료
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredQnA.map((qna) => {
                const typeInfo = getTypeInfo(qna.questionType);
                const TypeIcon = typeInfo.icon;

                return (
                  <div
                    key={qna.id}
                    onClick={() => setSelectedQnA(qna)}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedQnA?.id === qna.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-secondary-200 hover:border-primary-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="h-4 w-4" />
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            typeInfo.color
                          )}`}
                        >
                          {typeInfo.name}
                        </span>
                        {qna.isPrivate && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                            비공개
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(qna.status)}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            qna.status
                          )}`}
                        >
                          {qna.status === "pending" ? "답변 대기" : "답변 완료"}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-secondary-900 mb-2">
                      {qna.title}
                    </h3>
                    <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
                      {qna.content}
                    </p>

                    <div className="flex items-center justify-between text-xs text-secondary-500">
                      <span>{qna.author}</span>
                      <span>{qna.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q&A 상세 및 답변 */}
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            {selectedQnA ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-secondary-900">
                    Q&A 상세
                  </h2>
                  <div className="flex items-center space-x-2">
                    {selectedQnA.isPrivate && (
                      <EyeOff className="h-4 w-4 text-secondary-500" />
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedQnA.status
                      )}`}
                    >
                      {selectedQnA.status === "pending"
                        ? "답변 대기"
                        : "답변 완료"}
                    </span>
                  </div>
                </div>

                {/* 프로젝트 정보 */}
                <div className="flex items-center space-x-4 mb-6 p-4 bg-secondary-50 rounded-2xl">
                  <img
                    src={selectedQnA.projectImage}
                    alt={selectedQnA.projectTitle}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-secondary-900">
                      {selectedQnA.projectTitle}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {(() => {
                        const typeInfo = getTypeInfo(selectedQnA.questionType);
                        const TypeIcon = typeInfo.icon;
                        return (
                          <>
                            <TypeIcon className="h-3 w-3" />
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                typeInfo.color
                              )}`}
                            >
                              {typeInfo.name}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* 질문 내용 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-secondary-900 mb-3">
                    {selectedQnA.title}
                  </h4>
                  <div className="text-secondary-700 leading-relaxed mb-4">
                    {selectedQnA.content}
                  </div>
                  <div className="flex items-center justify-between text-sm text-secondary-500">
                    <span>{selectedQnA.author}</span>
                    <span>{selectedQnA.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>

                {/* 기존 답변 */}
                {selectedQnA.answers.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary-900 mb-3">
                      기존 답변
                    </h4>
                    {selectedQnA.answers.map((answer) => (
                      <div
                        key={answer.id}
                        className="bg-primary-50 rounded-2xl p-4 mb-3"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4 text-primary-600" />
                          <span className="font-medium text-primary-700">
                            {answer.author}
                          </span>
                          <span className="px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs">
                            창작자
                          </span>
                        </div>
                        <p className="text-secondary-700 text-sm">
                          {answer.content}
                        </p>
                        <div className="text-xs text-secondary-500 mt-2">
                          {answer.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 답변 작성 */}
                {selectedQnA.status === "pending" && (
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-3">
                      답변 작성
                    </h4>
                    <textarea
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      placeholder="답변을 작성해주세요..."
                      className="w-full h-32 p-4 border border-secondary-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-500">
                        {newAnswer.length}/2000자
                      </span>
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={isSubmitting || !newAnswer.trim()}
                        className="px-6 py-3 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>등록 중...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>답변 등록</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
                <p className="text-secondary-600">
                  Q&A를 선택하여 상세 내용을 확인하세요
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorQnA;
