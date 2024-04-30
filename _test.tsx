import React from 'react';

/**
 * @description Generates a list of mathematical results based on input values, using
 * various mathematical operations such as addition, subtraction, multiplication,
 * division, modulus, power, square root, absolute value, rounding, flooring, ceiling,
 * logging, and sine calculation.
 * 
 * @returns { number } an HTML list of 13 math results, each represented as a list
 * item with a unique key and descriptive label.
 */
const MathComponent: React.FC = () => {
    /**
     * @description Takes two parameters, `a` and `b`, of type `number`, and returns their
     * sum.
     * 
     * @param { number } a - 1st number that is being added to the second number `b`.
     * 
     * @param { number } b - 2nd number to be added to the `a` parameter to produce the
     * total sum.
     * 
     * @returns { number } the sum of the two input numbers.
     */
    function add(a: number, b: number): number {
        return a + b;
    }

    /**
     * @description Takes a single argument `a`, which is a number, and returns its sine
     * value using the mathematical formula `Math.sin(a)`.
     * 
     * @param { number } a - angle to be evaluated for its sine value in the function.
     * 
     * @returns { number } the sine of the input `a`, which is a number.
     */
    function sin(a: number): number {
        return Math.sin(a);
    }

    const results = [
        add(5, 3),
        subtract(5, 3),
        multiply(5, 3),
        divide(5, 3),
        modulus(5, 3),
        power(5, 3),
        squareRoot(25),
        absolute(-5),
        round(5.4),
        floor(5.8),
        ceiling(5.2),
        log(10),
        sin(Math.PI / 2)
    ];

    return (
        <div>
            <h1>Math Results</h1>
            {/**
             * @description Generates a list of results from an array of values, displaying each
             * result on a new line with a unique index number appended to the text.
             */}
            <ul>
                {results.map((result, index) => (
                    <li key={index}>Result {index + 1}: {result}</li>
                ))}
            </ul>
        </div>
    );
}

export default MathComponent;
