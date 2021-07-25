} else if (dir === 1) {
    if (this.isRight) {
        endX = x + len * cos(PI / 3);
        endY = y + len * sin(PI / 3);
    } else {
        endX = x - len * cos(PI / 3);
        endY = y + len * sin(PI / 3);
    }
} else if (dir === 2) {
    if (this.isRight) {
        endX = x + len * cos(PI / 3);
        endY = y - len * sin(PI / 3);
    } else {
        endX = x - len * cos(PI / 3);
        endY = y - len * sin(PI / 3);
    }
                // let x = this.x;
            // let y = this.y;
            // if (!left && (pick.x == x && pick.y == y || pick.endX == x && pick.endY == y || pick.centerX == x && pick.centerY == y)) {
            //     left = true;
            // }