/**
 * @description takes an `outerParam` and calls a nested function `middleFunction`
 * with a string parameter, then calls another nested function `innerFunction` with
 * a boolean parameter. The inner function calls a deepest nested function `deepestFunction`
 * with an array of numbers as its parameter, logs some messages, and returns.
 * 
 * @param { number } outerParam - 1st and only formal parameter passed into the outer
 * function, which is where it is logged in the beginning of the outer function execution.
 */
function outerFunction(outerParam: number): void {
    console.log("Outer function started with parameter:", outerParam);

    /**
     * @description takes a string parameter, logs it to the console, and calls an inner
     * function twice with different boolean parameters. The inner function calls a deepest
     * function with an array of numbers and logs its start and end to the console.
     * 
     * @param { string } middleParam - value passed to the `innerFunction` function.
     */
    function middleFunction(middleParam: string): void {
        console.log("Middle function started with parameter:", middleParam);

        /**
         * @description logs "Inner function started with parameter" and calls `deepestFunction`
         * with a parameter array of numbers.
         * 
         * @param { boolean } innerParam - value of boolean inside the `innerFunction`.
         */
        function innerFunction(innerParam: boolean): void {
            console.log("Inner function started with parameter:", innerParam);
            /**
             * @description logs "Deepest function started with parameter" followed by the array
             * of numbers passed into it, and then ends with "Deepest function ended".
             * 
             * @param { number[] } deepestParam - 0-dimensional array of numbers that is passed
             * to the `deepestFunction` function.
             */
            function deepestFunction(deepestParam: number[]): void {
                console.log("Deepest function started with parameter:", deepestParam);
                console.log("Deepest function ended");
            }
            deepestFunction([1, 2, 3]);
        }
        innerFunction(true);
        innerFunction(false);
        console.log("Middle function ended");
    }
    middleFunction("Middle parameter value");
    console.log("Outer function ended");
}

outerFunction(5);
