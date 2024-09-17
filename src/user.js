// User class to manage user information
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // Get user information
  getUser() {
    const user = {
      id: this.id,
      name: this.name,
      email: this.email,
    };
    return user;
  }
}

export default User;