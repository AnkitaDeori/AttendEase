
function getStudentsFromStorage() {
  return JSON.parse(localStorage.getItem('students')) || [];
}


function saveStudentsToStorage(students) {
  localStorage.setItem('students', JSON.stringify(students));
}


document.getElementById('student-signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();


  if (!name || !email || !password) {
    alert('Please fill out all fields.');
    return;
  }


  let students = getStudentsFromStorage();
  students.push({ name, email, password });
  saveStudentsToStorage(students);

  alert('Student account created successfully!');
  window.location.href = 'student-login.html'; 
});


document.getElementById('student-login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();


  let students = getStudentsFromStorage();
  let student = students.find(student => student.email === email && student.password === password);

  if (student) {
    alert('Login successful');
    window.location.href = 'student-dashboard.html'; 
  } else {
    alert('Invalid credentials');
  }
});


function loadStudentAttendance() {
  const attendanceRecords = [
      { date: "2024-10-01", status: "Present" },
      { date: "2024-10-02", status: "Absent" },
      
  ];

  const attendanceList = document.getElementById('attendance-records');
  attendanceRecords.forEach(record => {
      const li = document.createElement('li');
      li.textContent = `${record.date}: ${record.status}`;
      attendanceList.appendChild(li);
  });
}


window.onload = loadStudentAttendance;


document.getElementById('leave-application-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const startDate = document.getElementById('leave-start-date').value;
  const returnDate = document.getElementById('leave-return-date').value;
  const reason = document.getElementById('leave-reason').value.trim();
  const errorMessageDiv = document.getElementById('error-message');
  
  
  errorMessageDiv.style.display = 'none';
  errorMessageDiv.textContent = '';


  if (!startDate || !returnDate || !reason) {
      errorMessageDiv.textContent = 'Please fill in all fields.';
      errorMessageDiv.style.display = 'block';
      return;
  }


  if (new Date(startDate) >= new Date(returnDate)) {
      errorMessageDiv.textContent = 'Return date must be after the start date.';
      errorMessageDiv.style.display = 'block';
      return;
  }


  alert('Leave application submitted successfully!');
  

  document.getElementById('leave-application-form').reset();
});
