// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    const token = this.getToken;
    return token;
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    // Returns to root url
    window.location.assign("/");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // Clear saved books from local storage (if user signs in with a different id)
    // When token expires this happens as well
    localStorage.removeItem("saved_books");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }

  clearStorage() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // Clear saved books from local storage (if user signs in with a different id)
    // When token expires this happens as well
    localStorage.removeItem("saved_books");
  }
}

export default new AuthService();
