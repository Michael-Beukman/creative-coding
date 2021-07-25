function Level(levelNum) {
  let floors;
  floors = [];
  let numfloors;
  switch (levelNum) {
    case 0:
      numFloors = 1;
      floors = getFloors(numFloors);
      break;

    case 1:
      numFloors = 5;
      floors = getFloors(numFloors);
      break;

    case 2:

      break;

    case 3:
      break;

    case 4:
      break;

    case 5:
      break;

    case 6:
      break;

    case 7:
      break;

    default:
      break;

  }
  if (!floors.length) {
    numFloors = 4 + levelNum;
    numObstacles += (levelNum - 2) % 10;
    floors = getFloors(numFloors, null, 5 + (levelNum / 10));
  }
  return floors
}

function getFloors(numFloors, startY = null, speed = null) {
  let floors = [];
  let scale = jumpHeight * 35
  let numBranches = 3;
  if (!startY) {
    startY = (height * 0.5);
  }
  if (1) {
    for (let i = 0; i < numFloors; i++) {
      for (let j = -Math.floor(numBranches / 2); j <= Math.floor(numBranches / 2); j += 1) {

        let environ = new Environment(jumpHeight * 10 + (width + jumpHeight * 20) * (i), startY + j * (abs(i - Math.floor(numFloors / 2))) * scale);
        if (speed) {
          environ.speed = speed;
        }
        if (i != 0) {
          environ.addObs(numObstacles);
        } else {
          environ.pos.y = startY + environ.h / 2;
        }

        if (i == Math.floor(numFloors / 2)) {
          if (j < 0) {
            environ.pos.y += scale * -1;
          } else if (j == 0) {

          } else {
            environ.pos.y += scale * 1;
          }
          environ.obstacles = [];
          environ.addObs(numObstacles);
        }

        if (environ.pos.y + environ.h < height && environ.pos.y > 0) {
          floors.push(environ);
        }
        if (i == 0) {
          break;
        }
      }
      if (numFloors==1){
        floors[0].obstacles=[];
      }
      if (i == numFloors - 1) {
        //ceiling & goal;

        let ceiling = new Environment(0, height / 38);
        ceiling.w = width * 1.5;
        ceiling.speed = 0;
        ceiling.h = jumpHeight * 5;
        floors.push(ceiling);

        let goal = new Environment(scale + (width + jumpHeight * 20) * (i + 1), startY);
        goal.col = [255, 255, 0];
        goal.w = jumpHeight * 4;
        goal.isGoal = true;
        goal.h = goal.w;
        goal.pos.y += goal.w * 2;
        floors.push(goal);
      }
    }

  }
  return floors;
}
