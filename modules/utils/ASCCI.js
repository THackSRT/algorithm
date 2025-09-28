

export default class ASCCI {

    constructor () {
        this.letters = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L' ,'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V' ,'W', 'X', 'Y', 'Z',
        ];

        this.numbers = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        ];

        this.symbols = [
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
            '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\',
            ';', ':', '\'', '"', ',', '.', '<', '>', '/', '?',
        ];

        this.all = this.letters.concat(this.numbers, this.symbols);

    }

    static getNotation (row, length = 1) {
        if (length <= 26)
            return this.letters[row];
        else
            return this.letters[row % 26] + this.numbers[Math.floor(row / 26)];
    }

    static getNotations (length = 1) {
        let notations = [];
        for (let i = 0; i < length; i++) {
            notations.push(this.getNotation(i, length));
        }
        return notations;
    }

    static toVector (row, length = 1) {
        let vector = [];
        for (let i = 0; i < length; i++) {
            vector.push(i === row ? 1 : 0);
        }
        return vector;
    }

}