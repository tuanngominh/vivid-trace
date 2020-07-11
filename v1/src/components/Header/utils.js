export const getActiveStyle = (appBarStyle) => {
  return {
    color: appBarStyle.color,
    backgroundColor: appBarStyle.textColor,
  }
}

export const getNormalStyle = (appBarStyle) => {
  return {
    color: appBarStyle.textColor
  }
}

export const getMenuStyle = (appBarStyle, currentPathname, menuPathname) => {
  if (menuPathname === currentPathname) {
    return getActiveStyle(appBarStyle)
  }
  return getNormalStyle(appBarStyle)
}