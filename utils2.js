function isInGridBoundsCharacter(freePos)
{
	let cellSize = 48;
	let cellCount = 9;
	
	let startPos = {x:120, y:132};
    let diffPos = {x:freePos.x-startPos.x, y:freePos.y-startPos.y};

	let cellX = Math.floor(diffPos.x/cellSize);
	let cellY = Math.floor(diffPos.y/cellSize);

	console.log(!(cellX < 0 || cellX > 8 || cellY < 0 || cellY > 8));
	return !(cellX < 0 || cellX > 8 || cellY < 0 || cellY > 8);
}
function obtainCorrectedPositionCharacter(freePos)
{
	let cellSize = 49;
	let cellCount = 9;
	
	let startPos = {x:120, y:186};
	let diffPos = {x:freePos.x-startPos.x, y:freePos.y-startPos.y};
	
	
	let cellX = Math.floor(diffPos.x/cellSize);
	let cellY = Math.floor(diffPos.y/cellSize);
	
	console.log(cellX + " - " + cellY);
	console.log("Free pos : " + freePos.x + " - " + freePos.y);
	
	if (cellX < 0 || cellX > 8 || cellY < 0 || cellY > 8)
		return freePos;
	
	let cellPos = {x:startPos.x+cellX*cellSize+cellSize, y:startPos.y+cellY*cellSize+cellSize};
	
	let diff = {x:freePos.x-cellPos.x, y:freePos.y-cellPos.y};
	
	let rot = 0;

	
	if ( (diff.x > 0 && diff.y < diff.x && diff.y > -diff.x) || (diff.x < 0 && diff.y > diff.x && diff.y < Math.abs(diff.x)) )
		rot = Math.PI/2;
	else rot = 0;
	
	
	//rot = Math.PI/2;
	
	console.log(rot);
	
    return {x:cellPos.x, y:cellPos.y, rotation:rot};
}