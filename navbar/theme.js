  
const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  
//   const theme = localStorage.getItem('theme')
//     || (tmp = Object.keys(themeMap)[0],
//         localStorage.setItem('theme', tmp));

    const theme = localStorage.getItem('theme');
    if(theme) {
        console.log('true')
    }else {
        console.log('false')
        localStorage.setItem('theme', Object.keys(themeMap)[0])
    }

  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  console.log(bodyClass)
  
  function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];

    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);

  }
  
  document.getElementById('themeButton').onclick = toggleTheme;