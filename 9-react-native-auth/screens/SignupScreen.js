import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  //_ 비동기 함수
  // Loading spinner 표시
  async function SignupHandler({ email, password }) {
    setIsAuthenticating(true);

    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token); // token 저장
    } catch (err) {
      Alert.error(
        "Authentication failed!",
        "Could not create user. Please check your credentials!",
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  // isLogin property가 없기 때문에, false 값
  return <AuthContent onAuthenticate={SignupHandler} />;
}

export default SignupScreen;
