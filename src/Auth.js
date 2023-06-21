import { Navigate } from "react-router-dom";

export default function Auth(Component) {
  const AuthRoute = () => {
    const isAuth = !!localStorage.getItem("token");
    if (isAuth) {
      return <Component />;
    } else {
      return <Navigate to="/" />;
    }
  };
  return AuthRoute;
}
