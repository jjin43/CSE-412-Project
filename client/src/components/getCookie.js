function setCookie(curr_userID) {
  document.cookie = `userID=${curr_userID}`;
}

function getCookie() {
  const cookies = document.cookie.split("; ");
  const userIDCookie = cookies.find((cookie) => cookie.startsWith("userID="));
  const storedUserID = userIDCookie ? userIDCookie.split("=")[1] : null;
  return storedUserID;
}

module.exports = { setCookie, getCookie };
