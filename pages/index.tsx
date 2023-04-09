import React from "react";
import { useTheme } from "../src/Context/useTheme.context";
import Button from "../src/Components/Button/button.component";
import { themes } from "../src/Constants/theme.constant";
import { useEffectOnce } from "react-use";
import useNavigation from "../src/Hooks/useNavigation.hook";
import { AUTH_ROUTE } from "../src/Constants/route.constant";

const Home = () => {
  const { theme, toggleTheme, onChangeTheme } = useTheme();
  const { navigation } = useNavigation();

  useEffectOnce(() => {
    navigation({
      pathname: AUTH_ROUTE,
    });
  });
  const ThemeBox = ({ theme }: any) => {
    return (
      <div
        className="p-6 border rounded-lg cursor-pointer "
        onClick={() => onChangeTheme(theme)}
        data-theme={theme}
      >
        <span className="capitalize">{theme}</span>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen">
      <Button onClick={toggleTheme}>
        <div className="capitalize">
          {" "}
          Switch To {theme === "dark" ? "Light" : "Dark"}{" "}
        </div>
      </Button>
      <div className="flex items-center gap-4">
        {themes.map((theme: string) => {
          return <ThemeBox key={theme} theme={theme} />;
        })}
      </div>
    </div>
  );
};

export default Home;
