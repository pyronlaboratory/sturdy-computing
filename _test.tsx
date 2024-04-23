import React from 'react';

/**
 * @description generates a list of math results based on input functions: `add`,
 * `sin`, `multiply`, `divide`, `modulus`, `power`, and `squareRoot`. The results are
 * displayed in an HTML ul element with each result labeled by its index.
 * 
 * @returns { number } a list of math results, each consisting of a math operation
 * and its resulting value.
 */
const MathComponent: React.FC = () => {
    /**
     * @description takes two numerical arguments and returns their sum.
     * 
     * @param { number } a - first number to be added to `b`.
     * 
     * @param { number } b - 2nd number to be added to the `a` parameter to produce the
     * total result.
     * 
     * @returns { number } the sum of the two input numbers.
     */
    function add(a: number, b: number): number {
        return a + b;
    }

    /**
     * @description computes the sine of a given number `a`.
     * 
     * @param { number } a - angle to be calculated as sine.
     * 
     * @returns { number } the sine of the input value, represented as a number.
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
             * @description takes an array of results and renders them as a list of numbered items.
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
