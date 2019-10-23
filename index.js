'use strict';

/*
Order = 5
     * o o o o *
    o * o * o * o
   o o * o o * o o
  o * o * o * o * o
 o o o o o o o o o o
* * * * o X o * * * *
 o o o o o o o o o o
  o * o * o * o * o
   o o * o o * o o
    o * o o o * o
     * o o o o *

H(5) = 30
H(10) = 138
H(1000) = 1177848

H(5) / 6 = 5
H(10) / 6 = 23
H(1000) / 6 = 196308



Segment
     * o o o o
      * o * o
       * o o
        * o
         o
          X

*/

class Builder {
    constructor(order) {
        this.order = order;
        this.hexagon = this.setCentre(this.buildHexagon(order));
        this.segment = this.buildSegment(order);
    }

    buildHexagon() {
        const start = this.order + 1;
        const end = (start * 2) - 1;
        let lines = [];

        for (let i = start; i <= end; i += 1) {
            lines.push('o '.repeat(i));
        }

        for (let i = end - 1; i >= start; i -= 1) {
            lines.push('o '.repeat(i));
        }

        const maxLen = end * 2;

        const normalisedLines = lines.map((line) => {
            const lineLen = line.length;
            const diff = maxLen - lineLen;
            const prefixLen = Math.floor(diff / 2);
            const suffixLen = diff - prefixLen;

            return (' '.repeat(prefixLen) + line + ' '.repeat(suffixLen)).slice(0, -1);
        });

        return normalisedLines;
    }

    setCentre(hexagon) {
        const hex = hexagon == null ? this.hexagon : hexagon;

        let middleLine = hex[this.order].split(' ');
        middleLine[this.order] = 'X';

        hex[this.order] = middleLine.join(' ');

        return hex;
    }

    buildSegment() {
        let lines = [];

        for (let i = this.order; i > 0; i -= 1) {
            const prefix = this.order - i;

            lines.push(' '.repeat(prefix) + 'o '.repeat(i));
        }

        lines.push(' '.repeat(this.order) + 'X');

        return lines;
    }
}

const builder = new Builder(10);
console.log(builder.segment);
