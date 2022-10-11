export class ScoreService {


    // Load Score data from session storage
    static loadScore() {
        let score = JSON.parse(sessionStorage.getItem("score"));
        if (score === null) {
            return [];
        }
        return score;
    }

    // Save Score data from sesssion storage
    static saveScore(array) {
        sessionStorage.setItem("score",JSON.stringify(array));
    }


    // Save the score of the current game
    static saveCurrentScore(newScore) {
        let score = this.loadScore()
        score[0] = newScore;
        this.saveScore(score);
    }


    // Initialise the score
    static initScore() {

        let score = this.loadScore();
        let newArray = [[0, 0]];

        // If data are found
        if (score.length !== 0) {
            // If the first array is not [0,0]
            if (score[0][1] !== 0 && score[0][1] !== 0) {
                // Add a [0, 0] to the score array
                this.saveScore(newArray.concat(score));
                }
            } else {
                // add a new [[0 ,0]] array to init the score data
                this.saveScore(newArray);
            }

        // get the score and reduce the array size to 6
        score = this.loadScore();
        if (score.length > 5) this.saveScore(score.slice(0,6))
    }

    // Delete the score data (not used)
    static deleteScore() {
        sessionStorage.removeItem("score");
    }
}