/**
 * Represents a matrix
 */
class Matrix{
    constructor(data){
        this.rows = data.length;
        this.cols = data[0].length;
        this.data = data;
    }

    /**
     * 
     * @param {Matrix} other 
     */
    mult(other){
        if (this.cols != other.rows) {
            throw "Bad matrix mult. Cannot do " +`(${this.rows}, ${this.cols}) x (${other.rows}, ${other.cols})`;
        }
            const newData = [];
            for (let r =0; r<this.rows; ++r){
                const s = [];
                for (let c=0; c<other.cols; ++c){
                    s.push(0);
                }
                newData.push(s);
            }

            for (let num=0; num<this.rows; ++num){
                for (let numCols=0; numCols<other.cols; ++numCols){
                    let number = 0;
                    for (let x=0; x<this.cols; x++){
                        number += this.data[num][x] * other.data[x][numCols];
                    }
                    newData[num][numCols] = number;
                }
            }
            return new Matrix(newData);
    }

    string(){
        let s = '';
        for (let r of this.data){
            for (let c of r){
                s += `${c} `;
            }
            s += '\n';
        }
        return s;
    }
}