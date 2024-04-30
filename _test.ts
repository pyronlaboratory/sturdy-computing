/**
 * @description Calls a nested `innerFunction` function, passing it a boolean parameter.
 * The `innerFunction` function logs messages and then calls another nested
 * `deepestFunction` function with an array of numbers as its parameter.
 * 
 * @param { number } outerParam - 1st-level parameter passed to the outer function,
 * which is used for logging purposes only.
 */
function outerFunction(outerParam: number): void {
    console.log("Outer function started with parameter:", outerParam);

    /**
     * @description Calls an inner function, which then calls a deepest function. The
     * deepest function logs its parameter and ends, while the inner function logs a
     * boolean parameter and returns.
     * 
     * @param { string } middleParam - 2nd piece of data passed to the middle function.
     */
    function middleFunction(middleParam: string): void {
        console.log("Middle function started with parameter:", middleParam);

        /**
         * @description Takes a boolean parameter and logs a message when it starts and ends.
         * It then calls the `deepestFunction` function with an array of numbers as its
         * parameter, which logs messages when it starts and ends.
         * 
         * @param { boolean } innerParam - boolean value that will be passed to the nested
         * function 'deepestFunction'.
         */
        function innerFunction(innerParam: boolean): void {
            console.log("Inner function started with parameter:", innerParam);
            /**
             * @description Logs a message when it starts and another when it ends, with the
             * parameter `deepestParam`.
             * 
             * @param { number[] } deepestParam - 3-dimensional array of values that will be used
             * to log information at the deepest level of the function's execution.
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
