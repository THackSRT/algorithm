


export class ActivateFunction {

    constructor(afunc, dfunc) {
        this.afunc = afunc;
        this.dfunc = dfunc;
    }
}

export const sigmoid = new ActivateFunction(
    (x) => 1 / (1 + Math.exp(-x)),
    (x) => x * (1 - x)
);

export const tanh = new ActivateFunction(
    (x) => Math.tanh(x),
    (x) => 1 - x * x
);

export const relu = new ActivateFunction(
    (x) => Math.max(0, x),
    (x) => x > 0 ? 1 : 0
);

export const leakyRelu = new ActivateFunction(
    (x) => x > 0 ? x : 0.01 * x,
    (x) => x > 0 ? 1 : 0.01
);

export const identity = new ActivateFunction(
    (x) => x,
    (x) => 1
);

export const binaryStep = new ActivateFunction(
    (x) => x < 0 ? 0 : 1,
    (x) => 0
);

export const softsign = new ActivateFunction(
    (x) => x / (1 + Math.abs(x)),
    (x) => 1 / ((1 + Math.abs(x)) * (1 + Math.abs(x)))
);

export const softplus = new ActivateFunction(
    (x) => Math.log(1 + Math.exp(x)),
    (x) => 1 / (1 + Math.exp(-x))
);

export const elu = new ActivateFunction(
    (x) => x < 0 ? 0.01 * (Math.exp(x) - 1) : x,
    (x) => x < 0 ? 0.01 * Math.exp(x) : 1
);

export const bentIdentity = new ActivateFunction(
    (x) => (Math.sqrt(x * x + 1) - 1) / 2 + x,
    (x) => x / (2 * Math.sqrt(x * x + 1)) + 1
);

export const softExponential = new ActivateFunction(
    (x, alpha) => alpha < 0 ? -Math.log(1 - alpha * (x + alpha)) / alpha : x + alpha,
    (x, alpha) => alpha < 0 ? 1 / (1 - alpha * (alpha + x)) : 1
);

export const sin = new ActivateFunction(
    (x) => Math.sin(x),
    (x) => Math.cos(x)
);

export const sinc = new ActivateFunction(
    (x) => x === 0 ? 1 : Math.sin(x) / x,
    (x) => x === 0 ? 0 : (Math.cos(x) - Math.sin(x) / x) / x
);

export const gaussian = new ActivateFunction(
    (x) => Math.exp(-x * x),
    (x) => -2 * x * Math.exp(-x * x)
);

export const bipolarSigmoid = new ActivateFunction(
    (x) => 2 / (1 + Math.exp(-x)) - 1,
    (x) => 1 / 2 * (1 + x) * (1 - x)
);

export const bipolar = new ActivateFunction(
    (x) => x < 0 ? -1 : 1,
    (x) => 0
);

export const hardTanh = new ActivateFunction(
    (x) => x < -1 ? -1 : x > 1 ? 1 : x,
    (x) => x < -1 || x > 1 ? 0 : 1
);

export const absolute = new ActivateFunction(
    (x) => Math.abs(x),
    (x) => x < 0 ? -1 : 1
);

export const inverse = new ActivateFunction(
    (x) => 1 / x,
    (x) => -1 / (x * x)
);

export const selu = new ActivateFunction(
    (x) => x < 0 ? 1.0507 * 1.67326 * (Math.exp(x) - 1) : 1.0507 * x,
    (x) => x < 0 ? 1.0507 * 1.67326 * Math.exp(x) : 1.0507
);

export const softShrink = new ActivateFunction(
    (x, lambda) => x < -lambda ? x + lambda : x > lambda ? x - lambda : 0,
    (x, lambda) => x < -lambda || x > lambda ? 1 : 0
);

export const softMin = new ActivateFunction(
    (x, lambda) => -lambda * Math.log(Math.exp(-x / lambda) + 1),
    (x, lambda) => 1 / (Math.exp(x / lambda) + 1)
);

export const softMax = new ActivateFunction(
    (x, lambda) => Math.log(Math.exp(x / lambda) + 1),
    (x, lambda) => 1 / (Math.exp(-x / lambda) + 1)
);

export const logLog = new ActivateFunction(
    (x) => Math.log(-Math.log(1 - x)),
    (x) => 1 / (1 - x)
);

export const exponential = new ActivateFunction(
    (x) => Math.exp(x),
    (x) => Math.exp(x)
);

export const softExponentiation = new ActivateFunction(
    (x, lambda) => x < 0 ? -Math.log(1 - lambda * (x + lambda)) / lambda : Math.log(1 + lambda * x) / lambda,
    (x, lambda) => x < 0 ? 1 / (1 - lambda * (x + lambda)) : 1 / (1 + lambda * x)
);

export const softCosine = new ActivateFunction(
    (x, lambda) => Math.cos(lambda * x),
    (x, lambda) => -lambda * Math.sin(lambda * x)
);

export const sincNet = new ActivateFunction(
    (x) => Math.sin(x) / x,
    (x) => (Math.cos(x) - Math.sin(x) / x) / x
);