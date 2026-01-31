export class APIResponse {
  constructor(data, statusCode, message = "") {
    this.data = data;
    this.statusCode = statusCode;
    this.status = statusCode < 400 ? "success" : "error";
    this.message = message;
  }

  send(res) {
    res.status(this.statusCode).json({ data: this.data, status: this.status, message: this.message });
  }
}