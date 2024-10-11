// Helper function to get students from localStorage
function getStudentsFromStorage() {
  return JSON.parse(localStorage.getItem('students')) || [];
}

// Helper function to store students in localStorage
function saveStudentsToStorage(students) {
  localStorage.setItem('students', JSON.stringify(students));
}

// Student Sign-Up Form Submission
document.getElementById('student-signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  // Basic validation
  if (!name || !email || !password) {
    alert('Please fill out all fields.');
    return;
  }

  // Store the signup information in localStorage
  let students = getStudentsFromStorage();
  students.push({ name, email, password });
  saveStudentsToStorage(students);

  alert('Student account created successfully!');
  window.location.href = 'student-login.html'; // Redirect to login after sign-up
});

// Student Login Form Submission
document.getElementById('student-login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Retrieve student data from localStorage
  let students = getStudentsFromStorage();
  let student = students.find(student => student.email === email && student.password === password);

  if (student) {
    alert('Login successful');
    window.location.href = 'student-dashboard.html'; // Ensure this file exists
  } else {
    alert('Invalid credentials');
  }
});

// Example function to load attendance records for students
function loadStudentAttendance() {
  const attendanceRecords = [
      { date: "2024-10-01", status: "Present" },
      { date: "2024-10-02", status: "Absent" },
      // Add more records as needed
  ];

  const attendanceList = document.getElementById('attendance-records');
  attendanceRecords.forEach(record => {
      const li = document.createElement('li');
      li.textContent = `${record.date}: ${record.status}`;
      attendanceList.appendChild(li);
  });
}

// Call the function to load records when the page is loaded
window.onload = loadStudentAttendance;

// Leave Application Form Submission
document.getElementById('leave-application-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const startDate = document.getElementById('leave-start-date').value;
  const returnDate = document.getElementById('leave-return-date').value;
  const reason = document.getElementById('leave-reason').value.trim();
  const errorMessageDiv = document.getElementById('error-message');
  
  // Reset the error message
  errorMessageDiv.style.display = 'none';
  errorMessageDiv.textContent = '';

  // Basic validation
  if (!startDate || !returnDate || !reason) {
      errorMessageDiv.textContent = 'Please fill in all fields.';
      errorMessageDiv.style.display = 'block';
      return;
  }

  // Date validation
  if (new Date(startDate) >= new Date(returnDate)) {
      errorMessageDiv.textContent = 'Return date must be after the start date.';
      errorMessageDiv.style.display = 'block';
      return;
  }

  // If all validations pass
  alert('Leave application submitted successfully!');
  
  // Optionally, reset the form
  document.getElementById('leave-application-form').reset();
});
