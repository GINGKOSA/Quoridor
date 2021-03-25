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

var game = new Phaser.Game(config);

    function preload ()
    {
        

//xxxxxxxxxxxxxxxxxxxxxxxxx//Chargement des images//xxxxxxxxxxxxxxxxxxxxxxxxxx//
            
                    this.load.image("board","images/board.png");
                    this.load.image("blueCharacter","images/blueCharacter.png");
                    this.load.image("greenCharacter","images/greenCharacter.png");
                    this.load.image("bluewall","images/wall.png")
                    this.load.image("greenwall","images/wall.png")
                
    }

    function create ()
    {

    }
    function update ()
    {
        
    }
