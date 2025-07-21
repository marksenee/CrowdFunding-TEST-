export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  role: "creator" | "supporter";
  followers: number;
  following: number;
  likes: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  mainImage: string;
  images: string[];
  creator: User;
  currentFunding: number;
  fundingPeriod: {
    start: Date;
    end: Date;
  };
  rewards: Reward[];
  status:
    | "draft"
    | "pending"
    | "approved"
    | "rejected"
    | "active"
    | "completed";
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  mainImage: string;
  images: string[];
  creator: User;
  deliveryMethod: "file" | "link" | "email";
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export type Category =
  | "app-service"
  | "notion-template"
  | "slide-proposal"
  | "automation-tool"
  | "design-resource";

export interface Reward {
  id: string;
  name: string;
  description: string;
  amount: number;
  deliveryMethod: string;
  deliveryDate: Date;
  maxQuantity?: number;
  currentQuantity: number;
}

export interface Funding {
  id: string;
  projectId: string;
  supporterId: string;
  amount: number;
  rewardId?: string;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}

export interface Purchase {
  id: string;
  productId: string;
  buyerId: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: Date;
}
