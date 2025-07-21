import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  X,
  Plus,
  Save,
  Send,
  DollarSign,
  Github,
  Globe,
  Smartphone,
  Eye,
  EyeOff,
  ArrowLeft,
  Heart,
  TrendingUp,
  Calendar,
  Users,
} from "lucide-react";
import { Category } from "../types";

interface ProjectForm {
  title: string;
  description: string;
  category: string;
  mainImage: string;
  images: string[];
  githubLink: string;
  deployLink: string;
  appStoreLink: string;
  detailedDescription: string;
  roadmap: { milestone: string; date: string; description: string }[];
  rewards: {
    name: string;
    description: string;
    deliveryMethod: string;
    deliveryDate: string;
  }[];
  fundingPeriod: { start: string; end: string };
}

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<ProjectForm>({
    title: "",
    description: "",
    category: "",
    mainImage: "",
    images: [],
    githubLink: "",
    deployLink: "",
    appStoreLink: "",
    detailedDescription: "",
    roadmap: [{ milestone: "", date: "", description: "" }],
    rewards: [
      { name: "", description: "", deliveryMethod: "", deliveryDate: "" },
    ],
    fundingPeriod: { start: "", end: "" },
  });

  const categories = [
    { id: "app-service", name: "앱/서비스", icon: "📱" },
    { id: "notion-template", name: "노션 템플릿", icon: "📝" },
    { id: "slide-proposal", name: "슬라이드/제안서", icon: "📊" },
    { id: "automation-tool", name: "자동화툴", icon: "⚙️" },
    { id: "design-resource", name: "디자인 리소스", icon: "🎨" },
  ];

  const handleInputChange = (field: keyof ProjectForm, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    isMain: boolean = false
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (isMain) {
          handleInputChange("mainImage", imageUrl);
        } else {
          handleInputChange("images", [...formData.images, imageUrl]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number, isMain: boolean = false) => {
    if (isMain) {
      handleInputChange("mainImage", "");
    } else {
      const newImages = formData.images.filter((_, i) => i !== index);
      handleInputChange("images", newImages);
    }
  };

  const addRoadmapItem = () => {
    handleInputChange("roadmap", [
      ...formData.roadmap,
      { milestone: "", date: "", description: "" },
    ]);
  };

  const removeRoadmapItem = (index: number) => {
    const newRoadmap = formData.roadmap.filter((_, i) => i !== index);
    handleInputChange("roadmap", newRoadmap);
  };

  const updateRoadmapItem = (index: number, field: string, value: string) => {
    const newRoadmap = formData.roadmap.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    handleInputChange("roadmap", newRoadmap);
  };

  const addReward = () => {
    handleInputChange("rewards", [
      ...formData.rewards,
      { name: "", description: "", deliveryMethod: "", deliveryDate: "" },
    ]);
  };

  const removeReward = (index: number) => {
    const newRewards = formData.rewards.filter((_, i) => i !== index);
    handleInputChange("rewards", newRewards);
  };

  const updateReward = (index: number, field: string, value: string) => {
    const newRewards = formData.rewards.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    handleInputChange("rewards", newRewards);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("프로젝트 등록:", formData);
    navigate("/projects");
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const getDaysLeft = (endDate: string) => {
    if (!endDate) return 0;
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
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
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-2xl shadow-lg border border-secondary-200/50 hover:shadow-xl transition-all duration-300"
          >
            {showPreview ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
            <span>{showPreview ? "편집 모드" : "프리뷰 모드"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 입력 폼 */}
          <div className={`${showPreview ? "hidden lg:block" : ""}`}>
            <div className="card">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                프로젝트 등록
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 기본 정보 */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    기본 정보
                  </h3>

                  {/* 프로젝트 제목 */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      프로젝트 제목 *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="input-field"
                      placeholder="프로젝트 제목을 입력하세요"
                      required
                    />
                  </div>

                  {/* 카테고리 */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      카테고리 *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() =>
                            handleInputChange("category", category.id)
                          }
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                            formData.category === category.id
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-secondary-200 hover:border-primary-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{category.icon}</span>
                            <span className="font-medium">{category.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 한 줄 소개 */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      한 줄 소개 *
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className="input-field"
                      placeholder="프로젝트를 한 줄로 설명해주세요"
                      required
                    />
                  </div>

                  {/* 펀딩 기간 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-secondary-700 mb-2">
                        시작일 *
                      </label>
                      <input
                        type="date"
                        value={formData.fundingPeriod.start}
                        onChange={(e) =>
                          handleInputChange("fundingPeriod", {
                            ...formData.fundingPeriod,
                            start: e.target.value,
                          })
                        }
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary-700 mb-2">
                        종료일 *
                      </label>
                      <input
                        type="date"
                        value={formData.fundingPeriod.end}
                        onChange={(e) =>
                          handleInputChange("fundingPeriod", {
                            ...formData.fundingPeriod,
                            end: e.target.value,
                          })
                        }
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 이미지 업로드 */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    이미지
                  </h3>

                  {/* 대표 이미지 */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      대표 이미지 *
                    </label>
                    {formData.mainImage ? (
                      <div className="relative">
                        <img
                          src={formData.mainImage}
                          alt="대표 이미지"
                          className="w-full h-48 object-cover rounded-2xl"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(0, true)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="block w-full h-48 border-2 border-dashed border-secondary-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-secondary-400 mx-auto mb-2" />
                          <span className="text-secondary-600">
                            이미지를 업로드하세요
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="hidden"
                          required
                        />
                      </label>
                    )}
                  </div>

                  {/* 추가 이미지 */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      추가 이미지 (선택)
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`추가 이미지 ${index + 1}`}
                            className="w-full h-24 object-cover rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {formData.images.length < 6 && (
                        <label className="block w-full h-24 border-2 border-dashed border-secondary-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
                          <Upload className="h-5 w-5 text-secondary-400" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* 링크 정보 */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    링크 정보
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-secondary-700 mb-2">
                        GitHub 링크
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          value={formData.githubLink}
                          onChange={(e) =>
                            handleInputChange("githubLink", e.target.value)
                          }
                          className="input-field pl-10"
                          placeholder="https://github.com/..."
                        />
                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary-700 mb-2">
                        배포 링크
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          value={formData.deployLink}
                          onChange={(e) =>
                            handleInputChange("deployLink", e.target.value)
                          }
                          className="input-field pl-10"
                          placeholder="https://..."
                        />
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary-700 mb-2">
                        앱스토어 링크
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          value={formData.appStoreLink}
                          onChange={(e) =>
                            handleInputChange("appStoreLink", e.target.value)
                          }
                          className="input-field pl-10"
                          placeholder="https://..."
                        />
                        <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 상세 설명 */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    상세 설명
                  </h3>
                  <textarea
                    value={formData.detailedDescription}
                    onChange={(e) =>
                      handleInputChange("detailedDescription", e.target.value)
                    }
                    className="input-field h-32 resize-none"
                    placeholder="프로젝트에 대한 자세한 설명을 입력하세요"
                    required
                  />
                </div>

                {/* 로드맵 */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    로드맵
                  </h3>
                  <div className="space-y-4">
                    {formData.roadmap.map((item, index) => (
                      <div key={index} className="card p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-secondary-900">
                            마일스톤 {index + 1}
                          </h4>
                          {formData.roadmap.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRoadmapItem(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={item.milestone}
                            onChange={(e) =>
                              updateRoadmapItem(
                                index,
                                "milestone",
                                e.target.value
                              )
                            }
                            className="input-field"
                            placeholder="마일스톤 제목"
                          />
                          <input
                            type="date"
                            value={item.date}
                            onChange={(e) =>
                              updateRoadmapItem(index, "date", e.target.value)
                            }
                            className="input-field"
                          />
                        </div>
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updateRoadmapItem(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="input-field mt-3 h-20 resize-none"
                          placeholder="마일스톤 설명"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addRoadmapItem}
                      className="btn-secondary w-full py-3 flex items-center justify-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>마일스톤 추가</span>
                    </button>
                  </div>
                </div>

                {/* 리워드 */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    리워드
                  </h3>
                  <div className="space-y-4">
                    {formData.rewards.map((reward, index) => (
                      <div key={index} className="card p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-secondary-900">
                            리워드 {index + 1}
                          </h4>
                          {formData.rewards.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeReward(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={reward.name}
                            onChange={(e) =>
                              updateReward(index, "name", e.target.value)
                            }
                            className="input-field"
                            placeholder="리워드 이름"
                          />
                          <input
                            type="text"
                            value={reward.deliveryMethod}
                            onChange={(e) =>
                              updateReward(
                                index,
                                "deliveryMethod",
                                e.target.value
                              )
                            }
                            className="input-field"
                            placeholder="전달 방식"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          <textarea
                            value={reward.description}
                            onChange={(e) =>
                              updateReward(index, "description", e.target.value)
                            }
                            className="input-field h-20 resize-none"
                            placeholder="리워드 설명"
                          />
                          <input
                            type="date"
                            value={reward.deliveryDate}
                            onChange={(e) =>
                              updateReward(
                                index,
                                "deliveryDate",
                                e.target.value
                              )
                            }
                            className="input-field"
                            placeholder="전달 예정일"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addReward}
                      className="btn-secondary w-full py-3 flex items-center justify-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>리워드 추가</span>
                    </button>
                  </div>
                </div>

                {/* 제출 버튼 */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="btn-primary w-full py-4 flex items-center justify-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>프로젝트 등록하기</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 실시간 프리뷰 */}
          <div
            className={`${showPreview ? "lg:col-span-2" : "hidden lg:block"}`}
          >
            <div className="card">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">
                실시간 프리뷰
              </h3>

              {formData.title ? (
                <div className="space-y-6">
                  {/* 프로젝트 카드 */}
                  <div className="card border-l-4 border-primary-500">
                    {/* 프로젝트 이미지 */}
                    {formData.mainImage && (
                      <div className="relative mb-6">
                        <img
                          src={formData.mainImage}
                          alt={formData.title}
                          className="w-full h-48 object-cover rounded-2xl"
                        />
                        <div className="absolute top-4 right-4">
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                            <Heart className="h-5 w-5 text-secondary-400" />
                          </button>
                        </div>
                        {formData.fundingPeriod.end && (
                          <div className="absolute bottom-4 left-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                            {getDaysLeft(formData.fundingPeriod.end)}일 남음
                          </div>
                        )}
                      </div>
                    )}

                    {/* 프로젝트 정보 */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-secondary-900 mb-2">
                          {formData.title}
                        </h3>
                        <p className="text-secondary-600 text-sm mb-4">
                          {formData.description}
                        </p>
                      </div>

                      {/* 카테고리 */}
                      {formData.category && (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            {
                              categories.find((c) => c.id === formData.category)
                                ?.icon
                            }
                          </span>
                          <span className="text-sm text-secondary-600">
                            {
                              categories.find((c) => c.id === formData.category)
                                ?.name
                            }
                          </span>
                        </div>
                      )}

                      {/* 후원하기 버튼 */}
                      <div className="pt-4 border-t border-gray-100">
                        <button className="btn-primary w-full py-3 px-4 flex items-center justify-center space-x-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>500원 후원하기</span>
                        </button>
                      </div>

                      {/* 상세 설명 */}
                      {formData.detailedDescription && (
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="font-semibold text-secondary-900 mb-2">
                            상세 설명
                          </h4>
                          <p className="text-secondary-600 text-sm whitespace-pre-wrap">
                            {formData.detailedDescription}
                          </p>
                        </div>
                      )}

                      {/* 로드맵 */}
                      {formData.roadmap.some((item) => item.milestone) && (
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="font-semibold text-secondary-900 mb-3">
                            로드맵
                          </h4>
                          <div className="space-y-3">
                            {formData.roadmap
                              .filter((item) => item.milestone)
                              .map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-3"
                                >
                                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                                  <div className="flex-1">
                                    <div className="font-medium text-secondary-900">
                                      {item.milestone}
                                    </div>
                                    {item.date && (
                                      <div className="text-sm text-secondary-500">
                                        {item.date}
                                      </div>
                                    )}
                                    {item.description && (
                                      <div className="text-sm text-secondary-600 mt-1">
                                        {item.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* 리워드 */}
                      {formData.rewards.some((reward) => reward.name) && (
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="font-semibold text-secondary-900 mb-3">
                            리워드
                          </h4>
                          <div className="space-y-3">
                            {formData.rewards
                              .filter((reward) => reward.name)
                              .map((reward, index) => (
                                <div key={index} className="card p-3">
                                  <div className="font-medium text-secondary-900">
                                    {reward.name}
                                  </div>
                                  {reward.description && (
                                    <div className="text-sm text-secondary-600 mt-1">
                                      {reward.description}
                                    </div>
                                  )}
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-secondary-500">
                                    {reward.deliveryMethod && (
                                      <span>전달: {reward.deliveryMethod}</span>
                                    )}
                                    {reward.deliveryDate && (
                                      <span>예정일: {reward.deliveryDate}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* 추가 이미지 */}
                      {formData.images.length > 0 && (
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="font-semibold text-secondary-900 mb-3">
                            추가 이미지
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {formData.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`추가 이미지 ${index + 1}`}
                                className="w-full h-24 object-cover rounded-xl"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-secondary-500">
                  <div className="text-6xl mb-4">🚀</div>
                  <p>프로젝트 제목을 입력하면 프리뷰가 표시됩니다</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
