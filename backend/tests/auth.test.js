const request = require("supertest");
const app = require("../server"); // CommonJS export

describe("Auth routes", () => {
  it("GET / should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  it("POST /login should reject invalid credentials", async () => {
    const res = await request(app)
      .post("/login") // matches your server
      .send({ email: "wrong@example.com", password: "123456" });
    expect(res.statusCode).toBe(400);
  });

  it("POST /signup should reject missing fields", async () => {
    const res = await request(app)
      .post("/signup")
      .send({ email: "test@example.com" }); // missing username & password
    expect(res.statusCode).toBe(400);
  });
});
