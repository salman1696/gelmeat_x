import React from "react";
import { useSelector } from "react-redux";
import AuthStack from "./stacks/authStack";
import MainStack from "./stacks/mainStack";

const Routes = () => {
  const { user } = useSelector((state: any) => state.root.user);

  return <>{<MainStack />}</>;
  return <>{user != null ? <MainStack /> : <AuthStack />}</>;
};

export default Routes;
