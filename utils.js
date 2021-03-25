
function diff(a, b)
{
    return Math.abs(a-b);
}

function pullWallOccupiedSpace(givenWall)
{
    return {x:( (givenWall.rotation == 0) ? 11 : 107), 
        y:((givenWall.rotation == 0) ? 107 : 11)};
}

function pullWallOccupiedPositionBounds(givenWall)
{
    let size = pullWallOccupiedSpace(givenWall);
    return {minX:givenWall.x-(size.x/2.0), minY:givenWall.y-(size.y/2.0),
        maxX:givenWall.x+(size.x/2.0), maxY:givenWall.y+(size.y/2.0),
        hsizeX:(size.x/2.0), hsizeY:(size.y/2.0)};
}

function checkIfBoundsOverlap(obj1, obj2)
{
    let bound1 = pullWallOccupiedPositionBounds(obj1);
    let bound2 = pullWallOccupiedPositionBounds(obj2);

    return ((diff(obj1.x, obj2.x) <= bound1.hsizeX+bound2.hsizeX && 
        diff(obj1.y, obj2.y) <= bound1.hsizeY+bound2.hsizeY));
}

function verifSiMurEnCollision(givenWall)
{

    for (i = 0; i < walls.length; ++i)
    {
        if (walls[i] == givenWall)
            continue;

        if (checkIfBoundsOverlap(givenWall, walls[i]))
            return true;
    }
    return false;
}

function isInGridBounds(freePos)
{
	let cellSize = 60;
	let cellCount = 8;
	
	let startPos = {x:174-cellSize/2.0, y:186-cellSize/2.0};
	let diffPos = {x:freePos.x-startPos.x, y:freePos.y-startPos.y};
	
	let cellX = Math.floor(diffPos.x/cellSize);
	let cellY = Math.floor(diffPos.y/cellSize);

	return !(cellX < 0 || cellX > 7 || cellY < 0 || cellY > 7);
}

function obtainCorrectedPosition(freePos)
{
	let cellSize = 60;
	let cellCount = 8;
	
	let startPos = {x:174-cellSize/2.0, y:186-cellSize/2.0};
	let diffPos = {x:freePos.x-startPos.x, y:freePos.y-startPos.y};
	
	
	let cellX = Math.floor(diffPos.x/cellSize);
	let cellY = Math.floor(diffPos.y/cellSize);
	
	
	if (cellX < 0 || cellX > 7 || cellY < 0 || cellY > 7)
		return freePos;
	
	let cellPos = {x:startPos.x+cellX*cellSize+cellSize/2.0, y:startPos.y+cellY*cellSize+cellSize/2.0};
	
	let diff = {x:freePos.x-cellPos.x, y:freePos.y-cellPos.y};
	
	let rot = 0;

	
	if ( (diff.x > 0 && diff.y < diff.x && diff.y > -diff.x) || (diff.x < 0 && diff.y > diff.x && diff.y < Math.abs(diff.x)) )
		rot = Math.PI/2;
	else rot = 0;
	
	
	//rot = Math.PI/2;

	
	return {x:cellPos.x, y:cellPos.y, rotation:rot};
}

function verifSiPointDansHitboxMur(point)
{
	for (let z = 0; z < walls.length; ++z)
	{
		let mur = walls[z];
		let bnds = pullWallOccupiedPositionBounds(mur);


		if (diff(point.x, mur.x) <= bnds.hsizeX && 
			diff(point.y, mur.y) <= bnds.hsizeY)
			return true;
	}
	
	return false;

}


function verificationRaycastMurs(posA, posB, nbTests)
{
	let diffVec = {x:posB.x-posA.x, y:posB.y-posA.y};
	let decoupage = {x:diffVec.x/nbTests, y:diffVec.y/nbTests};
	
	
	for (let b = 0; b < nbTests+1; ++b)
	{
		let pointVerif = {x:(posA.x + decoupage.x*b), y:(posA.y + decoupage.y*b)};

		if (verifSiPointDansHitboxMur(pointVerif) == true)
			return true;
	}

	return false;
}
