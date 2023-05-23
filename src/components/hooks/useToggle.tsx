import { useGlobalContext } from "../Context";

export function useToggle() {

    const { theme, setTheme } = useGlobalContext();
    
     const handleThemeChange = ():void => {
      const isCurrentDark = theme === 'dark';
      setTheme(isCurrentDark ? 'light' : 'dark');
      localStorage.setItem('default-theme', isCurrentDark ? 'light' : 'dark');
    };

    return handleThemeChange 
}