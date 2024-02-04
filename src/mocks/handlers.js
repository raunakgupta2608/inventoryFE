import { rest } from "msw";

export const handlers = [
  // rest.get(ACdocumentDropdownOptionsEP, (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ value: ACdocumentDropdownOptions }));
  // }),
  rest.post("http://localhost/auth/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        email: "dummy@gmail.com",
        firstName: "Sam",
        lastName: "James",
        role: "manager",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJjZTAwOTg5NGI4ZmNiNWE2MWY0ZTgiLCJpYXQiOjE3MDcwMzY4ODIsImV4cCI6MTcwNzA0MDQ4Mn0.neqxVWLP6LHoJIA8xYHE8kU-eyu-_uroZLOkwN_roP0",
        _id: "65bce009894b8fcb5a61f4e8",
      })
    );
  }),
  rest.post("http://localhost/auth/signup", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        email: "dummy@gmail.com",
        firstName: "dummy",
        lastName: "dummy",
        role: "assistant",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJmYWFjMmRhNzI1MDEyYzBkNGU0YjYiLCJpYXQiOjE3MDcwNTk5MDYsImV4cCI6MTcwNzA2MzUwNn0.I_V569fzL5Egje3-ZgzEq7egyJ94AANcM5DCI_txvTM",
        _id: "65bfaac2da725012c0d4e4b6",
      })
    );
  }),
];
