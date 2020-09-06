export enum MessageCodes {
  Login_Success = 202,
  Registration_Success = 202,
  FileUpload_Success = 203,
  Delete = 204,
  Update = 204,
  Create = 205,
  UnexpectedError = 500,
  EmailAlreadyExists = 501,
  Validation_Failed = 503,
  UnAuthorized = 504,
}

export enum Message {
  Login_Success = "Successfully Login",
  Registration_Success = "You are registered successfully",
  UnexpectedError = "Something went wrong! Please try after some time",
  EmailAlreadyExists = "Email already exists!",
  Validation_Failed = "Please filled all mandatory fields",
  UnAuthorized = "Incorrect Email and Password",
  FileUpload_Success = "File uploaded successfully",
  Delete = "Deleted successfully",
  Update = "Updated successfully",
  Create = "Created successfully",
}
