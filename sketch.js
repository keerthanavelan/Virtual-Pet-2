var database ,dog,dog1,dog2,position,feed,add,foodobject,Feedtime,Lastfeed;

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();

  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED DOG")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 

function draw(){
 background(64, 224, 208);
 foodobject.display()
 drawSprites();
drawSprites();
}

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position);
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(object){
  if(object>0){
    object=object-1;
  }
  else{
    object=0;
  }
  database.ref('/').set({
    'Food': object
  })
}

function AddFood(){
position++;
  database.ref('/').update({
    Food:position
  })
}

function FeedDog(){
dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodobject.getFoodStock(),
    FeedTime:hour ()
  })
}
