function Student(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.courses = [];
}

Student.prototype.name = function name() {
  return `${this.firstName} ${this.lastName}`;
};

Student.prototype.hasConflict = function name(newCourse) {

  for (let i = 0; i < this.courses.length; i++) {
    let course = this.courses[i];
    if (course.conflictsWith(newCourse)) {
      return true;
    }
  }
  return false;
};

Student.prototype.enroll = function enroll(course) {
  if(this.hasConflict(course)) {
    throw `Scheduling conflict (${course.name})`;
  }
  if (!this.courses.includes(course)) {
    this.courses.push(course);
  }
  course.students.push(this);
};

Student.prototype.courseLoad = function courseLoad() {
  let totalLoad = {};
  for (let i = 0; i < this.courses.length; i++) {
    let course = this.courses[i];
    if (totalLoad[course.department] === undefined) {
      totalLoad[course.department] = 0;
    }
    totalLoad[course.department] += course.numCredits;
  }
  return totalLoad;
};

function Course(name, department, numCredits, days, blockNum) {
  this.name = name;
  this.department = department;
  this.numCredits = numCredits;
  this.days = days;
  this.blockNum = blockNum;
  this.students = [];
}

Course.prototype.addStudent = function addStudent(student) {
  student.enroll(this);
};

Course.prototype.conflictsWith = function conflictsWith(otherCourse) {
  let dayConflicts = this.days.filter((day) => {
    return otherCourse.days.includes(day);
  });
  return this.blockNum === otherCourse.blockNum &&
         dayConflicts.length !== 0;
};
