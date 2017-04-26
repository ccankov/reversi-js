function Student(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.courses = [];
}

Student.prototype.name = function name() {
  return `${this.firstName} ${this.lastName}`;
};

Student.prototype.enroll = function enroll(course) {
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

function Course(name, department, numCredits) {
  this.name = name;
  this.department = department;
  this.numCredits = numCredits;
  this.students = [];
}

Course.prototype.addStudent = function addStudent(student) {
  student.enroll(this);
};
