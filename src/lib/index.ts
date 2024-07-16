
// place files you want to import through the `$lib` alias in this folder.
export function generateRandomNumber(): number {
    return Math.random();
}

export function checkFields(fields:any): boolean {
    for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            console.log(fields[key])
            if(fields[key].length == 0 ) {
                return false;
            }
        }
    }

    return true
}