// Teacher Sign-Up Form Submission
document.getElementById('teacher-signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  // Store the signup information in localStorage
  let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
  teachers.push({ name, email, password });
  localStorage.setItem('teachers', JSON.stringify(teachers));

  alert('Teacher account created successfully!');
  window.location.href = 'teacher-login.html'; // Ensure this file exists
});

// Teacher Login Form Submission
document.getElementById('teacher-login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Retrieve teacher data from localStorage
  let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
  let teacher = teachers.find(teacher => teacher.email === email && teacher.password === password);

  if (teacher) {
    alert('Login successful');
    window.location.href = 'teacher-dashboard.html'; // Ensure this file exists
  } else {
    alert('Invalid credentials');
  }
});

// Mark Attendance Form Submission
document.getElementById('attendance-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const year = document.getElementById('year').value;
  const courseId = document.getElementById('course-id').value;

  const attendance = {
    student1: document.querySelector('input[name="student1"]:checked').value,
    student2: document.querySelector('input[name="student2"]:checked').value,
    date: new Date().toISOString().split('T')[0], // Get current date
    year,
    courseId,
  };

  let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
  attendanceRecords.push(attendance);
  localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));

  alert('Attendance marked successfully!');
});

// Load Attendance Records for Teachers
function loadTeacherAttendance() {
  const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
  const attendanceList = document.getElementById('attendance-records');

  attendanceList.innerHTML = ''; // Clear existing list
  attendanceRecords.forEach(record => {
      const li = document.createElement('li');
      li.textContent = `Year: ${record.year}, Course ID: ${record.courseId}, Student 1: ${record.student1}, Student 2: ${record.student2}, Date: ${record.date}`;
      attendanceList.appendChild(li);
  });
}

// Call the function to load records when the page is loaded
window.onload = loadTeacherAttendance;
