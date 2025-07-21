import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  X,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
  Heart,
  ShoppingCart,
} from "lucide-react";

interface ProductForm {
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
}

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    title: "",
    shortDescription: "",
    category: "",
    price: 0,
    originalPrice: undefined,
    mainImage: "",
    images: [],
    detailedDescription: "",
    deliveryMethod: "file",
    tags: [],
  });

  const [newTag, setNewTag] = useState("");

  const categories = [
    { id: "app-service", name: "앱/서비스", icon: "📱" },
    { id: "notion-template", name: "노션 템플릿", icon: "📝" },
    { id: "slide-proposal", name: "슬라이드/제안서", icon: "📊" },
    { id: "automation-tool", name: "자동화툴", icon: "⚙️" },
    { id: "design-resource", name: "디자인 리소스", icon: "🎨" },
  ];

  const deliveryMethods = [
    { id: "file", name: "파일 전송", icon: "📁" },
    { id: "link", name: "링크 전송", icon: "🔗" },
    { id: "email", name: "메일 전송", icon: "📧" },
  ];

  const handleInputChange = (field: keyof ProductForm, value: any) => {
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

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange("tags", [...formData.tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 제출 로직 추가
    console.log("제품 등록:", formData);
    navigate("/products");
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
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
                제품 등록
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 제품명 */}
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    제품명 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="input-field"
                    placeholder="제품명을 입력하세요"
                    required
                  />
                </div>

                {/* 한 줄 소개 */}
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    한 줄 소개 *
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      handleInputChange("shortDescription", e.target.value)
                    }
                    className="input-field"
                    placeholder="제품을 한 줄로 설명해주세요"
                    required
                  />
                </div>

                {/* 카테고리 */}
                <div>
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

                {/* 가격 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      판매가 *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.price || ""}
                        onChange={(e) =>
                          handleInputChange("price", Number(e.target.value))
                        }
                        className="input-field pr-12"
                        placeholder="0"
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500">
                        원
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      원가 (선택)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.originalPrice || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "originalPrice",
                            Number(e.target.value) || undefined
                          )
                        }
                        className="input-field pr-12"
                        placeholder="할인가 표시용"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500">
                        원
                      </span>
                    </div>
                  </div>
                </div>

                {/* 대표 이미지 */}
                <div>
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

                {/* 전달 방식 */}
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    전달 방식 *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {deliveryMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() =>
                          handleInputChange("deliveryMethod", method.id as any)
                        }
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                          formData.deliveryMethod === method.id
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-secondary-200 hover:border-primary-300 bg-white"
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="text-2xl">{method.icon}</div>
                          <div className="text-sm font-medium">
                            {method.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 태그 */}
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    태그 (선택)
                  </label>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                        className="input-field flex-1"
                        placeholder="태그를 입력하고 Enter를 누르세요"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 transition-colors"
                      >
                        추가
                      </button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:text-red-500 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 상세 설명 */}
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    상세 설명 *
                  </label>
                  <textarea
                    value={formData.detailedDescription}
                    onChange={(e) =>
                      handleInputChange("detailedDescription", e.target.value)
                    }
                    className="input-field h-32 resize-none"
                    placeholder="제품에 대한 자세한 설명을 입력하세요"
                    required
                  />
                </div>

                {/* 제출 버튼 */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="btn-primary w-full py-4 flex items-center justify-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>제품 등록하기</span>
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
                  {/* 제품 카드 */}
                  <div className="card border-l-4 border-purple-500">
                    {/* 제품 이미지 */}
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
                        {formData.originalPrice &&
                          formData.originalPrice > formData.price && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                              {Math.round(
                                ((formData.originalPrice - formData.price) /
                                  formData.originalPrice) *
                                  100
                              )}
                              % 할인
                            </div>
                          )}
                      </div>
                    )}

                    {/* 제품 정보 */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-secondary-900 mb-2">
                          {formData.title}
                        </h3>
                        <p className="text-secondary-600 text-sm mb-4">
                          {formData.shortDescription}
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

                      {/* 태그 */}
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 전달 방식 */}
                      <div className="flex items-center space-x-2 text-sm text-secondary-600">
                        <span className="text-lg">
                          {
                            deliveryMethods.find(
                              (d) => d.id === formData.deliveryMethod
                            )?.icon
                          }
                        </span>
                        <span>
                          {
                            deliveryMethods.find(
                              (d) => d.id === formData.deliveryMethod
                            )?.name
                          }
                        </span>
                      </div>

                      {/* 가격 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary-600">
                            {formatPrice(formData.price)}원
                          </span>
                          {formData.originalPrice &&
                            formData.originalPrice > formData.price && (
                              <span className="text-sm text-secondary-500 line-through">
                                {formatPrice(formData.originalPrice)}원
                              </span>
                            )}
                        </div>
                        <button className="btn-primary w-full py-3 px-4 flex items-center justify-center space-x-2">
                          <ShoppingCart className="h-4 w-4" />
                          <span>구매하기</span>
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
                  <div className="text-6xl mb-4">📝</div>
                  <p>제품명을 입력하면 프리뷰가 표시됩니다</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
