
document.getElementById('teacher-signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
  teachers.push({ name, email, password });
  localStorage.setItem('teachers', JSON.stringify(teachers));

  alert('Teacher account created successfully!');
  window.location.href = 'teacher-login.html';
});


document.getElementById('teacher-login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
  let teacher = teachers.find(teacher => teacher.email === email && teacher.password === password);

  if (teacher) {
    alert('Login successful');
    window.location.href = 'teacher-dashboard.html'; 
  } else {
    alert('Invalid credentials');
  }
});


document.getElementById('attendance-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const year = document.getElementById('year').value;
  const courseId = document.getElementById('course-id').value;

  const attendance = {
    student1: document.querySelector('input[name="student1"]:checked').value,
    student2: document.querySelector('input[name="student2"]:checked').value,
    student3: document.querySelector('input[name="student3"]:checked').value,
    student4: document.querySelector('input[name="student4"]:checked').value,
    student5: document.querySelector('input[name="student5"]:checked').value,
    date: new Date().toISOString().split('T')[0], 
    year,
    courseId,
  };

  let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
  attendanceRecords.push(attendance);
  localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));

  alert('Attendance marked successfully!');
});


function loadTeacherAttendance() {
  const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
  const attendanceList = document.getElementById('attendance-records');

  attendanceList.innerHTML = ''; 
  attendanceRecords.forEach(record => {
      const li = document.createElement('li');
      li.textContent = `Year: ${record.year}, Course ID: ${record.courseId}, Student 1: ${record.student1}, Student 2: ${record.student2}, Date: ${record.date}`;
      attendanceList.appendChild(li);
  });
}


window.onload = loadTeacherAttendance;
