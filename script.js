var dot;
const repititions = 10;

setup = () => {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);

    const border = min(windowWidth * 0.1, windowHeight * 0.1);

    /*************************************************************************\
    * (0, 0)                                                                         *
    * topLeft                     topMid                             topRight *
    *                                                                         *
    * midLeft                     center                             midRight *
    *                                                                         *
    * lowLeft                     lowMid                             lowRight *
    *                                             (windowWidth, windowHeight) *
    \*************************************************************************/

    const topLeft = createVector(border, border);
    const topMid = createVector(windowWidth / 2, border);
    const topRight = createVector(windowWidth - border, border);

    const midLeft = createVector(border, windowHeight / 2);
    const center = createVector(windowWidth / 2, windowHeight / 2);
    const midRight = createVector(windowWidth - border, windowHeight / 2);

    const lowLeft = createVector(border, windowHeight - border);
    const lowMid = createVector(windowWidth / 2, windowHeight - border);
    const lowRight = createVector(windowWidth - border, windowHeight - border);

    var pairs = [
        [topLeft, lowRight],
        [lowLeft, topRight],
        [topMid, lowMid],
        [midLeft, midRight],
    ]
    var sequence = []
    // TODO: sequence is bugged
    pairs.forEach((pair) => {
        for (var i = 0; i < repititions; i++) {
            sequence.push(pair)
        };
    });
    sequence.push(center);

    var radius = min(windowWidth * 0.1, windowHeight * 0.1)
    dot = new Dot(radius, sequence);
    console.debug(sequence)
}

draw = () => {
    background(180);
    dot.draw();
    dot.move();
}

function Dot(radius, sequenceOfPatterns) {
    this.radius = radius;
    this.__sequence = Object.assign([], sequenceOfPatterns);
    this._sequence = sequenceOfPatterns.reduce((prev, item) => prev.concat(item), [])
    this.position = this._sequence.pop()
    this.destination = this._sequence.pop()
    this.speed = 10;  // hardcode for now

    this.draw = () => {
        stroke(200);
        strokeWeight(1);
        fill('purple');
        ellipse(this.position.x, this.position.y, this.radius);
    };

    this.destinationIsReached = () => {
        const accuracy = 10;
        if (
            abs(this.destination.x - this.position.x) < accuracy &&
            abs(this.destination.y - this.position.y) < accuracy
        ) return true;
        return false;
    };

    this.getAngle = () => {
        return PI / 2 - atan2(
            this.destination.x - this.position.x,
            this.destination.y - this.position.y,
        );
    }

    this.getNextPoint = () => {
        if (this._sequence.length === 0) {
            this._sequence = this.__sequence.reduce((prev, item) => prev.concat(item))
        }
        return this._sequence.pop();
    }

    this.move = () => {
        if (this.destinationIsReached()) {
            this.destination = this.getNextPoint();
        }
        const angle = this.getAngle();
        this.position = createVector(
            this.position.x + this.speed * cos(angle),
            this.position.y + this.speed * sin(angle),
        )
    }
}
