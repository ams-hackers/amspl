type Atom = { type: "atom"; name: string | number };
type Variable = { type: "variable"; name: string };
type Functor = { type: "functor"; name: string; args: Term[] };
type Term = Atom | Variable | Functor;

type NO = null;
export const NO: NO = null;

export const TRUE: Atom = { type: "atom", name: "true" };

export const atom = (name): Atom => ({ type: "atom", name });
export const variable = (name): Variable => ({ type: "variable", name });
export const functor = (name, args): Functor => ({
  type: "functor",
  name,
  args,
});

type Environment = Record<string, Term>;

type EnvEntry = [string, Term];
function composeEnvironment_(env1: EnvEntry[], env2: EnvEntry[]): EnvEntry[] {
  if (env1.length == 0) return env2;
  /*
       1                2

       X = f(Y)           X = f(2)       --->      Y = 2


       X = f(Y)           X = f(2)

  */

  env1[0]; // X
}

function composeEnvironment(
  env1: Environment | NO,
  env2: Environment | NO
): Environment | NO {
  if (env1 == NO || env2 == NO) {
    return NO;
  }

  return Object.fromEntries(
    composeEnvironment_(Object.entries(env1), Object.entries(env2))
  );

  if (
    Object.entries(env1).some(
      ([name, val]) => env2[name] && unify(val, env2[name]) === NO
    )
  ) {
    return NO;
  }

  if (
    Object.entries(env2).some(
      ([name, val]) => env1[name] && unify(val, env1[name]) === NO
    )
  ) {
    return NO;
  }

  // @TODO actually compose them
  return { ...env1, ...env2 };
}

function unifyArray(xs: Term[], ys: Term[]): Environment | NO {
  if (xs.length !== ys.length) {
    return NO;
  }

  let env: Environment | NO = {};
  for (let i = 0; i < xs.length; i++) {
    const env2 = unify(xs[i], ys[i]);
    env = composeEnvironment(env, env2);
  }

  return env;
}

export function unify(x: Term, y: Term): Environment | NO {
  if (x.type == "atom" && y.type == "atom") {
    return x.name == y.name ? {} : NO;
  } else if (x.type == "variable" && y.type == "variable") {
    return x.name == y.name ? {} : { [x.name]: y, [y.name]: x };
  } else if (y.type == "variable") {
    return unify(y, x);
  } else if (x.type == "variable") {
    // @TODO add occur check
    return { [x.name]: y };
  } else if (x.type == "functor" && y.type == "functor" && x.name == y.name) {
    return unifyArray(x.args, y.args);
  }

  return NO;
}

type Clause = { head: Term; body: Term };
type Program = Clause[];
type Goal = Term;

function solve(
  program: Program,
  goal: Goal,
  env: Environment,
  next: Function
): void {}

export function* query(
  program: Program,
  goal: Goal
): Generator<Environment | "No."> {
  return "No.";
}
