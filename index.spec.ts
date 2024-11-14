import { unify, atom, variable, functor, NO } from ".";

test("unify", () => {
  expect(unify(atom("x"), atom("x"))).toEqual({});
  expect(unify(atom("x"), atom("y"))).toBeNull();
  expect(unify(variable("x"), variable("x"))).toEqual({});
  expect(unify(variable("x"), variable("y"))).toEqual({
    x: variable("y"),
    y: variable("x"),
  });

  expect(
    unify(
      functor("f", [atom("x"), atom("y")]),
      functor("f", [atom("x"), atom("y")])
    )
  ).toEqual({});

  expect(
    unify(
      functor("f", [atom("x"), atom("y")]),
      functor("g", [atom("x"), atom("y")])
    )
  ).toEqual(NO);

  expect(
    unify(
      functor("f", [variable("X"), atom(2)]),
      functor("f", [atom(1), atom(2)])
    )
  ).toEqual({ X: atom(1) });

  expect(
    unify(
      functor("f", [variable("X"), variable("X")]),
      functor("f", [atom(1), atom(2)])
    )
  ).toEqual(NO);

  expect(
    unify(
      functor("f", [variable("X"), variable("X")]),
      functor("f", [functor("g", [variable("Y")]), functor("g", [atom(2)])])
    )
  ).toEqual(NO);
});
