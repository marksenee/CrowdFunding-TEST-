import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Image as ImageIcon,
  X,
  Send,
  Heart,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  image: string;
  category: string;
  endDate: Date;
}

const WriteReview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 임시 프로젝트 데이터
  const supportedProjects: Project[] = [
    {
      id: "1",
      title: "AI 그림 그리기 앱",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
      category: "앱/서비스",
      endDate: new Date("2024-03-15"),
    },
    {
      id: "2",
      title: "친환경 텀블러",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      category: "제품",
      endDate: new Date("2024-04-20"),
    },
    {
      id: "3",
      title: "독서 앱",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
      category: "앱/서비스",
      endDate: new Date("2024-02-28"),
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.slice(0, 5 - images.length); // 최대 5개
    setImages([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedProject || rating === 0 || !content.trim()) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    // 여기에 실제 후기 등록 로직을 구현
    console.log("Review submitted:", {
      projectId: selectedProject,
      rating,
      content,
      images: images.length,
    });

    // 임시 딜레이
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/mypage");
    }, 2000);
  };

  const selectedProjectData = supportedProjects.find(
    (p) => p.id === selectedProject
  );

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
                후기 작성하기
              </h1>
              <p className="text-secondary-600">
                프로젝트에 대한 솔직한 후기를 남겨주세요
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* 프로젝트 선택 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">
              후기할 프로젝트 선택
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
                    {project.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-500">
                      완료일: {project.endDate.toLocaleDateString()}
                    </span>
                    {selectedProject === project.id && (
                      <Heart className="h-4 w-4 text-primary-500 fill-current" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedProject && (
            <>
              {/* 별점 평가 */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  별점 평가
                </h2>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-xl transition-all hover:scale-110 ${
                        star <= rating
                          ? "text-yellow-500 bg-yellow-50"
                          : "text-secondary-300 hover:text-yellow-400"
                      }`}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-secondary-600 mt-2">
                  {rating > 0 && (
                    <>
                      {rating === 1 && "매우 나쁨"}
                      {rating === 2 && "나쁨"}
                      {rating === 3 && "보통"}
                      {rating === 4 && "좋음"}
                      {rating === 5 && "매우 좋음"}
                    </>
                  )}
                </p>
              </div>

              {/* 후기 내용 */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  후기 내용
                </h2>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="프로젝트에 대한 솔직한 후기를 작성해주세요. 좋았던 점, 아쉬웠던 점, 개선사항 등을 자유롭게 작성해주세요."
                  className="w-full h-40 p-4 border border-secondary-200 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-secondary-500">
                    {content.length}/1000자
                  </span>
                  <span className="text-sm text-secondary-500">
                    최소 10자 이상 작성해주세요
                  </span>
                </div>
              </div>

              {/* 이미지 업로드 */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  이미지 첨부 (선택사항)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                  {images.length < 5 && (
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
                  최대 5개까지 첨부 가능합니다. (JPG, PNG, GIF)
                </p>
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
                  disabled={isSubmitting || rating === 0 || content.length < 10}
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
                      <span>후기 등록</span>
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

export default WriteReview;
