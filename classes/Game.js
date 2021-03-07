import inquirer from 'inquirer'
import { Action } from "../classes/Action.js";
import { Event } from "../classes/Event.js"

export class Game {
    constructor() {                 // Create properties of the game
        this.level = 0              // Level variables start at 0
        this.score = 0              // Score variable of type Scoring.js
        this.dailyEvents = []       // Create an empty array

        this.createDailyEvents();

        console.log('\nStart of a new day, lets go!\n')

        this.startGame();           // Start game
    }

    startGame() {

        const startLevel = () => {
            inquirer.prompt({
                type: 'list',
                message: `${this.dailyEvents[this.level].name}: what would you like to do?`,
                name: 'response',
                choices: this.dailyEvents[this.level].actions.map((action, index) => `${index + 1}: ${action.name}`)
                })

            .then(({response}) => {
                const responseData = response.split(': ');
                this.score += this.dailyEvents[this.level].actions[responseData[0] -1].score;
                console.log(`${this.dailyEvents[this.level].actions[responseData[0] -1].message}\n`);

                this.level++

                if(this.level < this.dailyEvents.length) {
                    startLevel ();
                } else {
                    this.calculateScores();
                }

            })
        }
        startLevel();
    }

    calculateScores() {
        if(this.score > 3) {
            console.log('YOU DID SO WELL TODAY YOU GOT A PROMOTION!!\n')
        } else if(this.score > 0) {
            console.log('YOU HAD A GOOD DAY, WELL DONE!!\n')
        } else if(this.score < -3) {
            console.log('YOU\'VE BEEN SLACKING, YOU MIGHT NOT LAST LONG HERE!!\n')
        } else if(this.score <= 0) {
            console.log('BIT OF A BAD DAY TODAY, MAKE UP FOR IT TOMORROW!!\n')
        }
    }

    createDailyEvents() {
        var level1 = new Event('ALARM SOUNDS');
        level1.addAction(new Action('Already up ready', +1, 'Great, lets start the day!'));
        level1.addAction(new Action('Wake up', 0, 'Time to get ready'))
        level1.addAction(new Action('Snooze', -1, 'extra 15 min of sleep :D'))
        this.dailyEvents.push(level1)

        var level2 = new Event('BREAKFAST TIME');
        level2.addAction(new Action('Work through breakfast', 1, 'Very productive!'));
        level2.addAction(new Action('Breakfast and coffee', 0, 'Ready for the day'))
        level2.addAction(new Action('Still snoozing', -1, 'you better hurry! you\'re gonna be late!'))
        this.dailyEvents.push(level2)

        var level3 = new Event('ARRIVE AT WORK');
        level3.addAction(new Action('Lets work, no breaks!', 1, 'A whole lot of work done!'));
        level3.addAction(new Action('Got some work done, where\'s that coffee pot?', 0, 'Good stuff'))
        level3.addAction(new Action('Birthday treats! lets congratulate them!', -1, 'sooo good, but now you\'re behind :('))
        this.dailyEvents.push(level3)

        var level4 = new Event('LUNCHTIME');
        level4.addAction(new Action('Lunch is for wimps!', 1, 'Feeling a little hungry but who cares!'));
        level4.addAction(new Action('Food time!', 0, 'Good stuff'))
        level4.addAction(new Action('Went to Jenny\'s bday drinks', -1, 'Little late back to work :('))
        this.dailyEvents.push(level4)

        var level5 = new Event('AFTERNOON');
        level5.addAction(new Action('Head down, no stopping me!', 1, 'A whole lot of work done!'));
        level5.addAction(new Action('Got some work done, another coffee anyone?', 0, 'Good stuff'))
        level5.addAction(new Action('Just heard some juicy gossip, lets investigate', -1, 'Got no work done :('))
        this.dailyEvents.push(level5)

        var level6 = new Event('AFTER WORK');
        level6.addAction(new Action('Time for some overtime', 1, 'A whole lot of work done!'));
        level6.addAction(new Action('Home time!', 0, 'Off to home I go'))
        level6.addAction(new Action('Did someone day pub? im in', -1, 'You will regret it tomorrow!'))
        this.dailyEvents.push(level6)
    }
}