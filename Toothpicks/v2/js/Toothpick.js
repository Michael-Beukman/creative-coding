let len = 200;
let r2 = Math.sqrt(2) / 2;
function Toothpick(x, y, endX, endY, dir = 0) {
    /*
        0 - flat
        1 - up
        2 - down
    */
    this.isRight = endX - x > 0;
    this.dir = dir;
    this.isChecked = false;
    this.x = x;
    this.y = y;
    this.endX = endX;
    this.endY = endY;



    this.show = () => {
        if (this.isChecked) stroke(255);
        else stroke(0, 0, 255)
        line(this.x, this.y, this.endX, this.endY);
    }

    this.getDir = (isA) => {
        if (!isA) {
            if (dir === 0) return 1;
            if (dir === 1) return 0;
            if (dir === 2) return 0;
        } else {
            if (dir === 0) return 2;
            if (dir === 1) return 1;
            if (dir === 2) return 2;
        }
    }

    this.getXY = (dir) => {
        let endX;
        let endY;
        let x = this.endX;
        let y = this.endY;
        let angle = PI / 3;
        if (this.dir == 0) {
            let signX = -1;
            if (this.isRight) signX = 1;
            let signY = 1;
            if (dir === 1) {
                signY = -1;
            }
            endX = x + signX * len * cos(PI / 3);
            endY = y + signY * len * sin(PI / 3);
        } else {
            let signX = 1;
            if (this.isRight) signX = -1;
            let signY = 1;
            if (dir === 1) {
                signY = -1;
            }
            if (dir === 0) {
                signX *= -1;
                angle = 0;
            }
            endX = x + signX * len * cos(angle);
            endY = y + signY * len * sin(angle);
        }
        return { endX: endX, endY: endY };
    }

    const equals = (a, b) => {

        return abs(a - b) < 10e-5;
    }

    this.createBoth = (picks) => {
        let newPicks = [];
        let right = false;
        for (let pick of picks) {
            if (right) break;
            if (pick == this) continue;
            let x = this.endX;
            let y = this.endY;

            if (!right && (equals(x, pick.x) && equals(pick.y, y) || equals(pick.endX, x) && equals(pick.endY, y))) {
                right = true;
            }
        }
        if (!right) {
            let dir = this.getDir(false);
            var { endX, endY } = this.getXY(dir);
            newPicks.push(new Toothpick(this.endX, this.endY, endX, endY, dir));
            dir = this.getDir(true);
            var { endX, endY } = this.getXY(dir);
            newPicks.push(new Toothpick(this.endX, this.endY, endX, endY, dir));
        }
        return newPicks;
    }

    this.isOut = () => {

        return this.x > width / 2 || this.endX > width / 2 || this.y > height / 2 || this.endY > height / 2 || this.x < -width / 2 || this.y < -height / 2 || this.endX < - width / 2 || this.endY < -height / 2;
    }
}