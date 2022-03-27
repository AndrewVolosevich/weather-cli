export const getArgs = (args) => {
    const res = {}

    const [executor, file, ...rest] = args;
    rest.forEach((arg, index, array) => {
        if (arg.charAt(0) === '-') {
            if (array.length - 1 === index) {
                res[arg.substring(1)] = true;
            } else if (array[index + 1].charAt(0) !== '-') {
                res[arg.substring(1)] = array[index + 1];
            } else {
                arg.charAt(0) === '-'
            }
        }
    });
    return res;
}