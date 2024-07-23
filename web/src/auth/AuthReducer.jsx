export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  redirect_uri: window.location.origin.concat("/login"),
  proxy_url: process.env.REACT_APP_AUTHORIZER_URL,
}

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      )
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      }
    }
    case "LOGOUT": {
      localStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    }
    default:
      return state
  }
}
