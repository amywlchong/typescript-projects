class UserInputError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UserInputError";
  }
}

export default UserInputError;
