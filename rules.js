class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

let book = 0;

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data

        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if(locationData.Name == "Dining room book" || locationData.Name == "Kitchen book" || locationData.Name == "Master bedroom book"){
                    if(book > 0){
                        if(choice.Text == "Take book with you" || choice.Text == "Take the book with you"){
                            continue;
                        } else{
                            this.engine.addChoice(choice.Text, choice); 
                        }
                    } else{
                        this.engine.addChoice(choice.Text, choice); 
                    }
                } else if(locationData.Name == "Door to secret chamber"){
                    if(book == 2){
                        if(choice.Text == "Try to open the door"){
                            continue;
                        } else{
                            this.engine.addChoice(choice.Text, choice); 
                        } 
                    } else{
                        if(choice.Text == "Place book in carved out rectangle"){
                            continue;
                        } else{
                            this.engine.addChoice(choice.Text, choice); 
                        }
                    }
                } else{
                    this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                    // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
            if(choice.Text == "Take book with you"){
                book = 1;
            }
            if(choice.Text == "Take the book with you"){
                book = 2;
            }
            if(choice.Text == "Put book down"){
                book = 0;
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');