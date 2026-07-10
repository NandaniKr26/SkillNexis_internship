// DOM Elements
const addStudentBtn = document.getElementById('add-student-btn');
const modal = document.getElementById('student-modal');
const closeModal = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const studentForm = document.getElementById('student-form');
const tableBody = document.getElementById('table-body');
const noDataMsg = document.getElementById('no-data-msg');

// Inputs
const studentIdInput = document.getElementById('student-id');
const rollNoInput = document.getElementById('rollNo');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');
const gradeInput = document.getElementById('grade');

// Stats Elements
const totalStudentsEl = document.getElementById('total-students');
const topPerformersEl = document.getElementById('top-performers');

// Search & Filter Elements
const searchInput = document.getElementById('search-input');
const courseFilter = document.getElementById('course-filter');

// App State
let students = JSON.parse(localStorage.getItem('students')) || [];
let editMode = false;

// ==========================================
// Initialization
// ==========================================
const init = () => {
    renderTable(students);
    updateStats();
};

// ==========================================
// CRUD Operations
// ==========================================

// Save Student (Create / Update)
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentData = {
        id: editMode ? studentIdInput.value : Date.now().toString(),
        rollNo: rollNoInput.value.trim(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value,
        grade: Number(gradeInput.value)
    };

    if (editMode) {
        // Update existing student
        students = students.map(s => s.id === studentData.id ? studentData : s);
    } else {
        // Create new student
        // Check if Roll No already exists
        const exists = students.find(s => s.rollNo.toLowerCase() === studentData.rollNo.toLowerCase());
        if(exists) {
            alert('Roll Number already exists!');
            return;
        }
        students.push(studentData);
    }

    saveData();
    closeModalHandler();
    renderTable(students);
    updateStats();

    // Reset filters
    searchInput.value = '';
    courseFilter.value = 'all';
});

// Delete Student
const deleteStudent = (id) => {
    if (confirm('Are you sure you want to delete this student record?')) {
        students = students.filter(s => s.id !== id);
        saveData();

        // Re-apply current filters
        applyFilters();
        updateStats();
    }
};

// Edit Student (Populate Modal)
const editStudent = (id) => {
    const student = students.find(s => s.id === id);
    if (!student) return;

    // Populate form
    studentIdInput.value = student.id;
    rollNoInput.value = student.rollNo;
    nameInput.value = student.name;
    emailInput.value = student.email;
    courseInput.value = student.course;
    gradeInput.value = student.grade;

    // Change Modal state
    document.getElementById('modal-title').textContent = 'Edit Student';
    editMode = true;
    modal.classList.remove('hidden');
};

// ==========================================
// UI Updates
// ==========================================

// Render Table
const renderTable = (dataToRender) => {
    tableBody.innerHTML = '';

    if (dataToRender.length === 0) {
        noDataMsg.classList.remove('hidden');
    } else {
        noDataMsg.classList.add('hidden');

        dataToRender.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${student.rollNo}</strong></td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>
                    <span class="badge ${getGradeClass(student.grade)}">${student.grade}%</span>
                </td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent('${student.id}')" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteStudent('${student.id}')" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
};

// Determine Badge Color
const getGradeClass = (grade) => {
    if (grade >= 90) return 'excellent';
    if (grade >= 75) return 'good';
    if (grade >= 50) return 'average';
    return 'poor';
};

// Update Stats
const updateStats = () => {
    totalStudentsEl.textContent = students.length;
    const topPerformers = students.filter(s => s.grade >= 90).length;
    topPerformersEl.textContent = topPerformers;
};

// Save to LocalStorage
const saveData = () => {
    localStorage.setItem('students', JSON.stringify(students));
};

// ==========================================
// Search & Filter
// ==========================================

const applyFilters = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const courseValue = courseFilter.value;

    const filtered = students.filter(student => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm) ||
            student.rollNo.toLowerCase().includes(searchTerm);

        const matchesCourse = courseValue === 'all' || student.course === courseValue;

        return matchesSearch && matchesCourse;
    });

    renderTable(filtered);
};

searchInput.addEventListener('input', applyFilters);
courseFilter.addEventListener('change', applyFilters);

// ==========================================
// Modal Handlers
// ==========================================

const openModalHandler = () => {
    studentForm.reset();
    editMode = false;
    document.getElementById('modal-title').textContent = 'Add New Student';
    studentIdInput.value = '';
    modal.classList.remove('hidden');
};

const closeModalHandler = () => {
    modal.classList.add('hidden');
};

addStudentBtn.addEventListener('click', openModalHandler);
closeModal.addEventListener('click', closeModalHandler);
cancelBtn.addEventListener('click', closeModalHandler);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

// Run Init
init();