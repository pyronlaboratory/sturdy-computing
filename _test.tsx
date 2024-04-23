import React from 'react';

/**
 * @description generates a list of math results by calling various functions and
 * combining their outputs.
 * 
 * @returns { number } a list of math results, each consisting of a result and its explanation.
 */
const MathComponent: React.FC = () => {
    /**
     * @description takes two numerical arguments and returns their sum.
     * 
     * @param { number } a - 1st numerical value to be added to the `b` input parameter.
     * 
     * @param { number } b - 2nd number to be added to the first number provided in the
     * `a` input parameter, and its value is used in the calculation of the function's output.
     * 
     * @returns { number } the sum of its two input arguments.
     */
    function add(a: number, b: number): number {
        return a + b;
    }

    /**
     * @description takes a `number` input, `a`, and returns its sine value using the
     * `Math.sin()` method.
     * 
     * @param { number } a - angular velocity of a circular motion for which the sine is
     * calculated in the function.
     * 
     * @returns { number } the sine of the input number.
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
             * @description lists results based on the `results` array. Each result is represented
             * as a list item with a unique key and a descriptive label.
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
