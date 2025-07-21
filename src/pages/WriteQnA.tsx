import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  X,
  Send,
  MessageSquare,
  HelpCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  image: string;
  category: string;
  creator: string;
}

type QuestionType = "general" | "technical" | "delivery" | "refund" | "other";

const WriteQnA: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [questionType, setQuestionType] = useState<QuestionType>("general");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 임시 프로젝트 데이터
  const supportedProjects: Project[] = [
    {
      id: "1",
      title: "AI 그림 그리기 앱",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
      category: "앱/서비스",
      creator: "김창작",
    },
    {
      id: "2",
      title: "친환경 텀블러",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      category: "제품",
      creator: "이디자인",
    },
    {
      id: "3",
      title: "독서 앱",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      category: "앱/서비스",
      creator: "박개발",
    },
  ];

  const questionTypes = [
    { id: "general", name: "일반 문의", icon: MessageSquare, color: "blue" },
    { id: "technical", name: "기술 문의", icon: HelpCircle, color: "purple" },
    { id: "delivery", name: "배송 문의", icon: AlertCircle, color: "orange" },
    { id: "refund", name: "환불 문의", icon: FileText, color: "red" },
    { id: "other", name: "기타", icon: MessageSquare, color: "gray" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.slice(0, 3 - images.length); // 최대 3개
    setImages([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedProject || !title.trim() || !content.trim()) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    // 여기에 실제 Q&A 등록 로직을 구현
    console.log("Q&A submitted:", {
      projectId: selectedProject,
      questionType,
      title,
      content,
      isPrivate,
      images: images.length,
    });

    // 임시 딜레이
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/mypage");
    }, 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "blue":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "purple":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "orange":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "red":
        return "bg-red-100 text-red-600 border-red-200";
      case "gray":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-blue-100 text-blue-600 border-blue-200";
    }
  };

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
                Q&A 등록
              </h1>
              <p className="text-secondary-600">
                프로젝트에 대한 질문을 등록해주세요
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* 프로젝트 선택 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">
              질문할 프로젝트 선택
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {supportedProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all hover:shadow-lg ${
                    selectedProject === project.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-secondary-200 hover:border-primary-300"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover rounded-xl mb-3"
                  />
                  <h3 className="font-semibold text-secondary-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-secondary-600 mb-2">
                    {project.category} • {project.creator}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {selectedProject && (
            <>
              {/* 질문 유형 선택 */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  질문 유형 선택
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {questionTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setQuestionType(type.id as QuestionType)}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          questionType === type.id
                            ? getTypeColor(type.color)
                            : "border-secondary-200 hover:border-primary-300"
                        }`}
                      >
                        <IconComponent className="h-6 w-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">{type.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 제목 입력 */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  제목
                </h2>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="질문의 제목을 입력해주세요"
                  className="w-full p-4 border border-secondary-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500"
                />
              </div>

              {/* 내용 입력 */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  질문 내용
                </h2>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="질문 내용을 자세히 작성해주세요. 구체적으로 작성할수록 정확한 답변을 받을 수 있습니다."
                  className="w-full h-40 p-4 border border-secondary-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-secondary-500">
                    {content.length}/2000자
                  </span>
                  <span className="text-sm text-secondary-500">
                    최소 10자 이상 작성해주세요
                  </span>
                </div>
              </div>

              {/* 이미지 첨부 */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  이미지 첨부 (선택사항)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`첨부 이미지 ${index + 1}`}
                        className="w-full h-24 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {images.length < 3 && (
                    <label className="border-2 border-dashed border-secondary-300 rounded-xl h-24 flex items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors">
                      <div className="text-center">
                        <ImageIcon className="h-6 w-6 text-secondary-400 mx-auto mb-1" />
                        <span className="text-xs text-secondary-500">
                          이미지 추가
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-secondary-500 mt-2">
                  최대 3개까지 첨부 가능합니다. (JPG, PNG, GIF)
                </p>
              </div>

              {/* 비공개 설정 */}
              <div className="mb-8">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-secondary-700">
                    비공개로 등록 (창작자와 나만 볼 수 있음)
                  </span>
                </label>
              </div>

              {/* 제출 버튼 */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => navigate("/mypage")}
                  className="px-8 py-3 border border-secondary-300 text-secondary-700 rounded-2xl hover:bg-secondary-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting || !title.trim() || content.length < 10
                  }
                  className="px-8 py-3 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>등록 중...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Q&A 등록</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteQnA;
