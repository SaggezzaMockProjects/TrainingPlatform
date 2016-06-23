//NOT SURE HOW TO IMPLEMENT. VERY IMPORTANT TO FIGURE OUT IF GOES TO PRODUCTION
//AND USING FIREBASE...  https://www.firebase.com/docs/security/guide/securing-data.html

{
  "rules": {
    "users": {
      "$uid": {
        // grants write access to the owner of this user account whose uid must exactly match the key ($uid)
        ".write": "auth !== null && auth.uid === $uid",

        // grants read access to any user who is logged in with an email and password
        ".read": "auth !== null && auth.provider === 'password'"
      }
    }
  }
}
