import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  Send,
  MessageSquare,
  HelpCircle,
  AlertCircle,
  FileText,
  User,
  Clock,
  ThumbsUp,
  ThumbsDown,
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
  images: string[];
  answers: Answer[];
}

interface Answer {
  id: string;
  content: string;
  author: string;
  isCreator: boolean;
  createdAt: Date;
  likes: number;
  dislikes: number;
}

const QnADetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 임시 Q&A 데이터
  const qna: QnA = {
    id: "1",
    projectId: "1",
    projectTitle: "AI 그림 그리기 앱",
    projectImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    questionType: "technical",
    title: "리워드 배송 문의",
    content:
      "안녕하세요! AI 그림 그리기 앱 프로젝트에 후원했습니다. 리워드 배송이 언제 될까요? 그리고 배송 추적은 어떻게 확인할 수 있나요?",
    author: "김후원",
    createdAt: new Date("2024-02-15"),
    isPrivate: false,
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    ],
    answers: [
      {
        id: "1",
        content:
          "안녕하세요! 리워드 배송에 대해 답변드리겠습니다. 현재 프로젝트가 성공적으로 완료되어 리워드 제작이 진행 중입니다. 예상 배송일은 3월 15일이며, 배송 시작 시 이메일로 추적 번호를 발송해드리겠습니다. 추가 문의사항이 있으시면 언제든 연락주세요!",
        author: "김창작",
        isCreator: true,
        createdAt: new Date("2024-02-16"),
        likes: 5,
        dislikes: 0,
      },
    ],
  };

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

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    // 여기에 실제 답변 등록 로직을 구현
    console.log("Answer submitted:", {
      qnaId: id,
      content: newAnswer,
    });

    // 임시 딜레이
    setTimeout(() => {
      setIsSubmitting(false);
      setNewAnswer("");
      // 답변 목록 새로고침
    }, 2000);
  };

  const typeInfo = getTypeInfo(qna.questionType);
  const TypeIcon = typeInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
                Q&A 상세
              </h1>
              <p className="text-secondary-600">질문과 답변을 확인해보세요</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* 프로젝트 정보 */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <img
                src={qna.projectImage}
                alt={qna.projectTitle}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-secondary-900">
                  {qna.projectTitle}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
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
              </div>
            </div>
          </div>

          {/* 질문 내용 */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-secondary-900">
                    {qna.author}
                  </div>
                  <div className="text-sm text-secondary-500">
                    {qna.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-secondary-900 mb-4">
              {qna.title}
            </h3>

            <div className="text-secondary-700 leading-relaxed mb-6">
              {qna.content}
            </div>

            {/* 첨부 이미지 */}
            {qna.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {qna.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`첨부 이미지 ${index + 1}`}
                    className="w-full h-24 object-cover rounded-xl"
                  />
                ))}
              </div>
            )}
          </div>

          {/* 답변 목록 */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-6">
              답변 ({qna.answers.length})
            </h3>

            {qna.answers.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
                <p className="text-secondary-600">아직 답변이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {qna.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="border border-secondary-200 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            answer.isCreator
                              ? "bg-primary-600"
                              : "bg-secondary-600"
                          }`}
                        >
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-secondary-900 flex items-center space-x-2">
                            <span>{answer.author}</span>
                            {answer.isCreator && (
                              <span className="px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-medium">
                                창작자
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-secondary-500">
                            {answer.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-secondary-700 leading-relaxed mb-4">
                      {answer.content}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-secondary-600 hover:text-green-600 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">{answer.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-secondary-600 hover:text-red-600 transition-colors">
                          <ThumbsDown className="h-4 w-4" />
                          <span className="text-sm">{answer.dislikes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 답변 작성 */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              답변 작성
            </h3>
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
        </div>
      </div>
    </div>
  );
};

export default QnADetail;
