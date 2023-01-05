import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (user) => {
    const { email, password } = user;
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));

      //   console.log({ resp });
    } catch (error) {
      dispatch(onLogout("Incorrect credentials!"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }

    console.log({ email, password });
  };

  const startRegister = async (user) => {
    const { email, password, name } = user;
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        email,
        password,
        name,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || ""));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }

    console.log({ email, password });
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };
  return {
    //* Properties
    status,
    user,
    errorMessage,
    //* Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
