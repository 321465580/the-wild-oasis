import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 身份认证的路由
  // 1.加载用户的权限
  const { user, isLoading, isAuthenticated } = useUser();

  // 3. 如果没有权限，重定向到登录页面
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("login");
  }, [isAuthenticated, isLoading, navigate]);

  // 2.当加载的时候，显示加载器
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4.如果是，正常渲染
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
