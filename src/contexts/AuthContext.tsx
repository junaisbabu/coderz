import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAction, AuthState, CreateContext } from "../../types/auth";

const initialState: AuthState = {
  isAuthenticated: false,
  username: localStorage.getItem("username") || "",
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ERROR = "ERROR";

const authReducer = (state: AuthState, action: AuthAction) => {
  const {
    type,
    payload: { username, password },
  } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        username,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: "",
        error: { username: "", password: "" },
      };
    case ERROR:
      return {
        ...state,
        error: { username, password },
      };

    default:
      return state;
  }
};

const AuthContext = createContext<CreateContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated || localStorage.getItem("username")?.length) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const validatePassword = (password: string): boolean => {
    // ! Regex for Password Validation:
    // * Minimum 8 characters
    // * At least one uppercase letter
    // * At least one lowercase letter
    // * At least one special character
    // * At least one number
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const setRedirect = (path: string) => {
    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  const login = (username: string, password: string) => {
    if (username.length <= 0) {
      dispatch({
        type: ERROR,
        payload: { username: "Please enter valid username" },
      });
    } else if (password.length <= 8 || !validatePassword(password)) {
      dispatch({
        type: ERROR,
        payload: { password: "Please enter valid password" },
      });
    } else {
      setRedirect("/");
      localStorage.setItem("username", username);
      dispatch({ type: LOGIN, payload: { username } });
      return;
    }
  };

  const logout = () => {
    setRedirect("/login");
    localStorage.removeItem("username");
    dispatch({ type: LOGOUT, payload: { username: "" } });
  };

  const testCredential = () => {
    let username = "Junais Babu";
    let password = "Abc@$1239";
    login(username, password);
  };

  return (
    <AuthContext.Provider
      value={{ authState: state, login, logout, testCredential }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
