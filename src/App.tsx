import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import CategoryPage from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import CreateProject from "./pages/CreateProject";
import CreateProduct from "./pages/CreateProduct";
import MyPage from "./pages/MyPage";
import WriteReview from "./pages/WriteReview";
import WriteQnA from "./pages/WriteQnA";
import QnADetail from "./pages/QnADetail";
import CreatorQnA from "./pages/CreatorQnA";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="projects" element={<Projects />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="write-review" element={<WriteReview />} />
          <Route path="write-qna" element={<WriteQnA />} />
          <Route path="qna/:id" element={<QnADetail />} />
          <Route path="creator-qna" element={<CreatorQnA />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
