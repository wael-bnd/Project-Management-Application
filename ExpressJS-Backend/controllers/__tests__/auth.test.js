const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
require("dotenv").config();
const {
  signup,
  signin,
  signout,
  requireSignin,
  handleUnauthorizedError,
} = require("../auth");
const User = require("../../models/User");

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mockedToken"),
}));
jest.mock("../../models/User");

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signup", () => {
    it("should create a new user and return a success message", async () => {
      const req = {
        body: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          jobTitle: "Developer",
          password: "Abcd1234$",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockResolvedValueOnce();

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "You have successfully signed up!",
      });
    });

    it("should return an error if user with the email already exists", async () => {
      const req = {
        body: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          jobTitle: "Developer",
          password: "Abcd1234$",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockResolvedValueOnce({ email: "john@example.com" });

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        error: "User with this email already exists!",
      });
    });

    it("should return an error if role is specified in the request body", async () => {
      const req = {
        body: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          jobTitle: "Developer",
          password: "Abcd1234$",
          role: "admin",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "You cannot specify your role",
      });
    });

    it("should return an error if an exception occurs during signup", async () => {
      const req = {
        body: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          jobTitle: "Developer",
          password: "Abcd1234$",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockRejectedValueOnce(new Error("Database error"));

      await signup(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "An error occurred during signup. Please try again later.",
      });
    });
  });

  describe("signin", () => {
    it("should sign in the user and return a token and user data", async () => {
      const req = {
        body: {
          email: "john@example.com",
          password: "Abcd1234$",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      };
      // Mock the User.findOne method to find the user and authenticate
      User.findOne.mockResolvedValueOnce({
        _id: "mockedUserId", // Add a valid _id property
        email: "john@example.com",
        firstName: "John",
        lastName: "Doe",
        jobTitle: "Developer",
        authenticate: jest.fn(() => true),
      });

      await signin(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(jwt.sign).toHaveBeenCalledWith(
        { _id: "mockedUserId" }, // Pass the correct _id value
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );
      expect(res.cookie).toHaveBeenCalledWith("accessToken", "mockedToken", {
        httpOnly: true,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: "mockedToken",
        userData: {
          firstName: expect.any(String),
          lastName: expect.any(String),
          jobTitle: expect.any(String),
        },
      });
    });

    it("should return an error if user with the email does not exist", async () => {
      const req = {
        body: {
          email: "john@example.com",
          password: "Abcd1234$",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockResolvedValueOnce(null);

      await signin(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "User with that email does not exist. Please sign up.",
      });
    });

    it("should return an error if email and password do not match", async () => {
      const req = {
        body: {
          email: "john@example.com",
          password: "Abcd1234$",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockResolvedValueOnce({
        email: "john@example.com",
        authenticate: jest.fn(() => false),
      });

      await signin(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Email and password do not match.",
      });
    });

    it("should return an error if an exception occurs during sign in", async () => {
      const req = {
        body: {
          email: "john@example.com",
          password: "Abcd1234$",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockRejectedValueOnce(new Error("Database error"));

      await signin(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "An error occurred while signing in.",
      });
    });
  });

  describe("signout", () => {
    it("should clear the access token cookie and return a success message", () => {
      const req = {};
      const res = {
        clearCookie: jest.fn(),
        json: jest.fn(),
      };

      signout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith("accessToken");
      expect(res.json).toHaveBeenCalledWith({
        message: "You have successfully signed out!",
      });
    });
  });
});
