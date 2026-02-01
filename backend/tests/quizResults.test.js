const request = require("supertest");
const app = require("../server");

describe("Quiz Results Routes", () => {
  it("should reject unauthorized save", async () => {
    const res = await request(app)
      .post("/api/quiz-results/save")
      .send({ score: 50 });
    expect(res.statusCode).toBe(401);
  });

  it("should reject unauthorized get", async () => {
    const res = await request(app).get("/api/quiz-results");
    expect(res.statusCode).toBe(401);
  });
});
