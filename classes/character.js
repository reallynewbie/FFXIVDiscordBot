module.exports = class Character {
  constructor(accountID) {
    this._accountID = accountID;
    this.level = 1;
    this.job = new Array();
    this.xp = 0;
    this.hp = 1;
    this.skillList = new Array();
    this.joinDate = new Date();
  }
  //ES6 Getters
  get accountID() {
    return this._accountID;
  }

  //Setters
  set accountID(newID) {
    this._accountID = newID;
    //Need validation
  }

  setLevel(newLevel) {
    if (isNaN(newLevel) == true) {
      this.level = newLevel;
    } else {
      throw "NewLevel: " + newLevel + " is not a number";
    }
  }
  increaseLevel() {
    this.level += 1;
  }
  decreaseLevel() {
    this.level -= 1;
  }
  //newJob should be text maybe?
  addJob(newJob) {
    this.job.push(newJob);
  }
  removeJob(jobName) {
    //To Do
  }

  increaseXP(newXP) {
    if (isNaN(newXP) == true) {
      this.xp += newXP;
    } else {
      throw "increaseXP:  Not a number";
    }
  }
  increaseHP(amount) {
    if (isNaN(amount) == true) {
      this.hp += amount;
    } else {
      throw "increaseHP:  Not a number";
    }
  }
  decreaseHP(amount) {
    if (isNaN(amount) == true) {
      this.hp -= amount;
    } else {
      throw "decreaseHP:  Not a number";
    }
  }
  addSkill(skillObj) {
    this.skillList.push(skillObj);
  }
  removeSkill(skillName) {
    //Fill in later
  }

}
