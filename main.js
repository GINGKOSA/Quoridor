var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 792,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);




function preload ()
{        
//xxxxxxxxxxxxxxxxxxxxxxxxx//Chargement des images et des données la grille//xxxxxxxxxxxxxxxxxxxxxxxxxx//
            
	this.load.image("board","images/board.png");
	this.load.image("blueCharacter","images/blueCharacter.png");
	this.load.image("greenCharacter","images/greenCharacter.png");
	this.load.image("bluewall","images/wall.png");
    this.load.image("greenwall","images/wall.png");



}



function create ()
    {

//xxxxxxxxxxxxxxxxxxxxxxx//définition des variables//xxxxxxxxxxxxxxxxxxxxxxx//
        // tour vert = false //
        var y = 114;
        var a = false;
        var tour = false;
        var greenPositionX = 384;
        var greenPositionY = 156;
        var bluePositionX = 384;
        var bluePositionY = 636;
        var wallOriginPositionX;
        var wallOriginPositionY;
        var wallfirstpostionX = 120;
        var wallsecondpostionX = 133;
        var wallfirstpostionY = 24;
        var wallsecondpostionY = 133;
        var verif = [];
        var wallX1 = [];
        var wallX2 = [];
        var wallY1 = [];
        var wallY2 = [];

        for (i=1;i<129;i++)
            {
                verif[i] = "non";

            }
        for (i=0;i<8;i++)
            {
                    wallX1[i] = wallfirstpostionX + 48;
                    wallX2[i] = wallsecondpostionX + 48;
                    wallfirstpostionX = wallfirstpostionX+48;
                    wallsecondpostionX = wallsecondpostionX+48;
                    console.log(wallX1[i],wallX2[i])

            }
        for (i=0;i<8;i++)
            {
                    wallY1[i] = wallfirstpostionY + 108;
                    wallY2[i] = wallsecondpostionY + 108;
                    wallfirstpostionY = wallfirstpostionY+108;
                    wallsecondpostionY = wallsecondpostionY+108;
                    console.log(wallY1[i],wallY2[i])

            }
        
//xxxxxxxxxxxxxxxxxxxxxxxxxx//Creation du terrain//xxxxxxxxxxxxxxxxxxxxxxxxx//

        this.add.image(384, 396, 'board');



//xxxxxxxxxxxxxxxxxxxxxxxxxx//Ajout personnages//xxxxxxxxxxxxxxxxxxxxxxxxxxx//

        var blue = this.add.image(384,636,"blueCharacter").setInteractive();
        var green = this.add.image(384,156,"greenCharacter").setInteractive();

        this.input.setDraggable(green);
        this.input.setDraggable(blue);

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxx//Ajout des murs//xxxxxxxxxxxxxxxxxxxxxxxxxxx//

        for (i=0;i<10;i++)
            {
                var wallgreen = this.add.image(y,54,"greenwall").setInteractive();
                var wallblue = this.add.image(y,738,"bluewall").setInteractive();
    
                walls.push(wallgreen);
                walls.push(wallblue);

                this.input.setDraggable(wallgreen);
                this.input.setDraggable(wallblue);
                y = y+60;   
            }

//xxxxxxxxxxxxxxxxxx//Création du Drag and Drop globale et Déplacement//xxxxxxxxxxxxxxxxxxx//
        

        

        this.input.on('gameobjectover', function(pointer,gameObject)
            {



            });
        
        this.input.on('gameobjectout', function(pointer,gameObject)
            {



            });
        

            this.input.on('dragstart',function(pointer,gameObject)
            {
                currentDraggedObject = gameObject;
                gameObject.setDataEnabled();
                this.children.bringToTop(gameObject);
                wallOriginPositionX = gameObject.x;
                wallOriginPositionY = gameObject.y;
                console.log(gameObject.texture.key)
            },this);
        


        this.input.on('drag',function(pointer,gameObject,dragX,dragY)
            { 
			
				if (gameObject.texture.key == "greenwall" || gameObject.texture.key == "bluewall")
				{
					let isInGrid = isInGridBounds({x:pointer.position.x, y:pointer.position.y});
					let cPos = obtainCorrectedPosition({x:pointer.position.x, y:pointer.position.y, rotation:gameObject.rotation});
					
					gameObject.x = isInGrid ? cPos.x : pointer.position.x;
					gameObject.y = isInGrid ? cPos.y : pointer.position.y;
					gameObject.rotation = cPos.rotation;
				}else{
					gameObject.x = pointer.position.x;
					gameObject.y = pointer.position.y;
				}

            });
        this.input.on('dragend',function(pointer,gameObject)
            {
                console.log(currentDraggedObject);
                console.log(walls[0]);
                //Enlever la coloration de tout objet selectionné
                if (currentDraggedObject != null && 
                    (currentDraggedObject.texture.key == "greenwall" || 
                    currentDraggedObject.texture.key == "bluewall"))
                    {
                        currentDraggedObject.tint = 0xFFFFFF;
                        currentDraggedObject.isTinted = false;
                    }
                currentDraggedObject = null;

				//Empêcher le pion de passer si un mur l'en empêche
				if (gameObject.texture.key == "greenCharacter" || gameObject.texture.key == "blueCharacter")
				{
					let verifRaycast = 
					verificationRaycastMurs(
					{x: gameObject.texture.key == "blueCharacter" ? bluePositionX : greenPositionX, 
					y: gameObject.texture.key == "blueCharacter" ? bluePositionY : greenPositionY}, {x:gameObject.x, y:gameObject.y}, 12);
					console.log(verifRaycast);
					
					if (verifRaycast)
					{
						gameObject.x = gameObject.texture.key == "blueCharacter" ? bluePositionX : greenPositionX;
                        gameObject.y = gameObject.texture.key == "blueCharacter" ? bluePositionY : greenPositionY;
						return;
					}
					
				}




                if (gameObject.texture.key == "greenCharacter" && !tour)
                    {
                        
                        //Déplacement du joueur vert vers la droite
                        if ( gameObject.x > greenPositionX+36 && gameObject.x < greenPositionX+84 && gameObject.y > greenPositionY-10 && gameObject.y < greenPositionY+10 && gameObject.x < 648)
                            {
                                if (greenPositionX+60 == bluePositionX && greenPositionY == bluePositionY)
                                    {
                                        if (gameObject.x+60 > 648)
                                            {

                                                gameObject.x = greenPositionX;
                                                gameObject.y = greenPositionY;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }
                                        else
                                            {
  
                                                gameObject.x = greenPositionX+120;
                                                gameObject.y = greenPositionY;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }

                                    }
                                else
                                    {

                                        gameObject.x = greenPositionX+60;
                                        gameObject.y = greenPositionY;
                                        greenPositionX = gameObject.x;
                                        greenPositionY = gameObject.y;
                                        
                                    }



                            }
                        //Déplacement du joueur vert vers la gauche
                        else if ( gameObject.x > greenPositionX-84 && gameObject.x < greenPositionX-36 && gameObject.y > greenPositionY-10 && gameObject.y < greenPositionY+10 && gameObject.x > 120)
                            {
                                if (greenPositionX-60 == bluePositionX && greenPositionY == bluePositionY)
                                    {
                                        if (gameObject.x-60 < 120)
                                            {

                                                gameObject.x = greenPositionX;
                                                gameObject.y = greenPositionY;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }
                                        else
                                            {
  
                                                gameObject.x = greenPositionX-120;
                                                gameObject.y = greenPositionY;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }

                                    }
                                else
                                    {

                                        gameObject.x = greenPositionX-60;
                                        gameObject.y = greenPositionY;
                                        greenPositionX = gameObject.x;
                                        greenPositionY = gameObject.y;
                                    }



                            }
                        //Déplacement du joueur Vert vers le haut
                        else if ( gameObject.y > greenPositionY-84 && gameObject.y < greenPositionY-36 && gameObject.y > 136 )
                            {
                                if (greenPositionX == bluePositionX && greenPositionY-60 == bluePositionY)
                                    {
                                        if (gameObject.y-60 < 136)
                                            {

                                                gameObject.x = greenPositionX;
                                                gameObject.y = greenPositionY;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }
                                        else
                                            {
  
                                                gameObject.x = greenPositionX;
                                                gameObject.y = greenPositionY-120;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }

                                    }
                                else
                                    {
                                        gameObject.x = greenPositionX;
                                        gameObject.y = greenPositionY-60;
                                        greenPositionX = gameObject.x;
                                        greenPositionY = gameObject.y;
                                    }
                            }
                        //Déplacement du joueur Vert vers le bas
                        else if ( gameObject.y > greenPositionY+36 && gameObject.y < greenPositionY+84 && gameObject.y < 636  )
                            {
                                if (greenPositionX == bluePositionX && greenPositionY+60 == bluePositionY)
                                    {
                                        if (gameObject.y+60 < 136)
                                            {

                                                gameObject.x = greenPositionX;
                                                gameObject.y = greenPositionY;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }
                                        else
                                            {
  
                                                gameObject.x = greenPositionX;
                                                gameObject.y = greenPositionY+120;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }

                                    }
                                else
                                    {
                                        if (gameObject.y+60 > 636)
                                            {
                                                alert("Vous avez gagner !");
                                                gameObject.x = greenPositionX;
                                                gameObject.y = greenPositionY+60;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }
                                        else
                                            {
                                                gameObject.x = greenPositionX;
                                                gameObject.y = greenPositionY+60;
                                                greenPositionX = gameObject.x;
                                                greenPositionY = gameObject.y;
                                            }
    
                                    }
                            }
                        else
                            {
                                gameObject.x = greenPositionX;
                                gameObject.y = greenPositionY;
                                greenPositionX = gameObject.x;
                                greenPositionY = gameObject.y;
                            }
                        console.log(gameObject.texture.key,greenPositionX,greenPositionY)
                        tour = true;
                    }
                else if (gameObject.texture.key == "blueCharacter" && tour)
                    {
                        //Déplacement du joueur Bleu vers la droite
                        if ( gameObject.x > bluePositionX+36 && gameObject.x < bluePositionX+84 && gameObject.y > bluePositionY-10 && gameObject.y < bluePositionY+10 && gameObject.x < 648)
                            {
                                if (greenPositionX == bluePositionX+60 && greenPositionY == bluePositionY)
                                    {
                                        if (gameObject.x+60 > 648)
                                            {

                                                gameObject.x = bluePositionX;
                                                gameObject.y = bluePositionY;
                                                bluePositionX = gameObject.x;
                                                bluePositionY = gameObject.y;
                                            }
                                        else
                                            {

                                                gameObject.x = bluePositionX+120;
                                                gameObject.y = bluePositionY;
                                                bluePositionX = gameObject.x;
                                                bluePositionY = gameObject.y;
                                            }

                                    }
                                else
                                    {

                                        gameObject.x = bluePositionX+60;
                                        gameObject.y = bluePositionY;
                                        bluePositionX = gameObject.x;
                                        bluePositionY = gameObject.y;
                                    }



                        }
                    //Déplacement du joueur Bleu vers la gauche
                    else if ( gameObject.x > bluePositionX-84 && gameObject.x < bluePositionX-36 && gameObject.y > bluePositionY-10 && gameObject.y < bluePositionY+10 && gameObject.x > 120)
                        {
                            if (greenPositionX == bluePositionX-60 && greenPositionY == bluePositionY)
                                {
                                    if (gameObject.x-60 < 120)
                                        {

                                            gameObject.x = bluePositionX;
                                            gameObject.y = bluePositionY;
                                            bluePositionX = gameObject.x;
                                            bluePositionY = gameObject.y;
                                        }
                                    else
                                        {

                                            gameObject.x = bluePositionX-120;
                                            gameObject.y = bluePositionY;
                                            bluePositionX = gameObject.x;
                                            bluePositionY = gameObject.y;
                                        }

                                }
                            else
                                {

                                    gameObject.x = bluePositionX-60;
                                    gameObject.y = bluePositionY;
                                    bluePositionX = gameObject.x;
                                    bluePositionY = gameObject.y;
                                }
                        }
                        //Déplacement du joueur Bleu vers le haut
                        else if ( gameObject.y > bluePositionY-84 && gameObject.y < bluePositionY-36 && gameObject.y > 136 )
                            {
                                if (greenPositionX == bluePositionX && greenPositionY == bluePositionY-60)
                                    {
                                        if (gameObject.y-60 < 136)
                                            {

                                                gameObject.x = bluePositionX;
                                                gameObject.y = bluePositionY;
                                                bluePositionX = gameObject.x;
                                                bluePositionY = gameObject.y;
                                            }
                                        else
                                            {
  
                                                gameObject.x = bluePositionX;
                                                gameObject.y = bluePositionY-120;
                                                bluePositionX = gameObject.x;
                                                bluePositionY = gameObject.y;
                                            }

                                    }
                                else
                                    {
                                        if (gameObject.y-60 < 155)
                                            {   
                                                alert("Vous avez gagner !");
                                                gameObject.x = bluePositionX;
                                                gameObject.y = bluePositionY-60;
                                                bluePositionX = gameObject.x;
                                                bluePositionY = gameObject.y;
                                            }
                                        gameObject.x = bluePositionX;
                                        gameObject.y = bluePositionY-60;
                                        bluePositionX = gameObject.x;
                                        bluePositionY = gameObject.y;
                                    }
                            }
                        //Déplacement du joueur bleu vers le bas
                        else if ( gameObject.y > bluePositionY+36 && gameObject.y < bluePositionY+84 && gameObject.y < 636  )
                            {
                                if (greenPositionX == bluePositionX && greenPositionY == bluePositionY+60)
                                    {
                                        if (gameObject.y+60 < 136)
                                            {

                                                gameObject.x = bluePositionX;
                                                gameObject.y = bluePositionY;
                                                bluePositionX = gameObject.x;
                                                bluePositionY = gameObject.y;
                                            }
                                        else
                                            {
  
                                                gameObject.x = bluePositionX;
                                                gameObject.y = bluePositionY+120;
                                                bluePositionX = gameObject.x;
                                                bluePositionY = gameObject.y;
                                            }

                                    }
                                else
                                    {

                                        gameObject.x = bluePositionX;
                                        gameObject.y = bluePositionY+60;
                                        bluePositionX = gameObject.x;
                                        bluePositionY = gameObject.y;
                                    }
                            }
                    else
                        {
                            gameObject.x = bluePositionX;
                            gameObject.y = bluePositionY;
                            bluePositionX = gameObject.x;
                            bluePositionY = gameObject.y;
                        }
                    console.log(gameObject.texture.key,bluePositionX,bluePositionY)
                    tour = false;
                }
                else if (gameObject.texture.key == "greenwall" || gameObject.texture.key == "bluewall")
                    {
                        if (gameObject.texture.key == "greenwall" && !tour)
                            {
                                let verifCol = verifSiMurEnCollision(gameObject);
                                let gPos = {x:gameObject.x, y:gameObject.y};
                                
                                if (isInGridBounds(gPos) && !verifCol)
                                {
                                    gameObject.input.draggable = false;
                                }else
                                {
                                    gameObject.x = wallOriginPositionX;
                                    gameObject.y = wallOriginPositionY;
                                    gameObject.rotation = 0;
                                }  
                                tour = true
                            }
                        else if (gameObject.texture.key == "bluewall" && tour)
                            {
                                let verifCol = verifSiMurEnCollision(gameObject);
                                let gPos = {x:gameObject.x, y:gameObject.y};
                                
                                if (isInGridBounds(gPos) && !verifCol)
                                {
                                    gameObject.input.draggable = false;
                                }else
                                {
                                    gameObject.x = wallOriginPositionX;
                                    gameObject.y = wallOriginPositionY;
                                    gameObject.rotation = 0;
                                } 
                                tour = false;
                            }
                        else
                            {
                                alert("Non");
                                gameObject.x = wallOriginPositionX;
                                gameObject.y = wallOriginPositionY;
                                gameObject.rotation = 0;
                            }

                    }
                else
                    {
                        alert("Ce n'est pas à ton Tour !")
                        if (gameObject.texture.key == "blueCharacter")
                        {
                            gameObject.x = bluePositionX
                            gameObject.y = bluePositionY
                            
                        }  
                            
                    
                        else if (gameObject.texture.key == "greenCharacter")
                        {
                            gameObject.x = greenPositionX
                            gameObject.y = greenPositionY
                        }

                    }             
        });
    }




function update ()
{
    if (currentDraggedObject != null && 
        (currentDraggedObject.texture.key == "greenwall" || 
        currentDraggedObject.texture.key == "bluewall"))
    {
        let verifCol = verifSiMurEnCollision(currentDraggedObject);
        
        if (!verifCol && isInGridBounds({x:currentDraggedObject.x, y:currentDraggedObject.y}))
        {
            currentDraggedObject.isTinted = true;
            currentDraggedObject.tint = 0x008000;
        }else {
            currentDraggedObject.isTinted = true;
            currentDraggedObject.tint = 0xFF0000;
        }

    }
}    


// for (i=0;i>=19;i++)
// {
//     if(diff(walls[i].x positionDuPionEnX) == 30 ||

//     )

// }
