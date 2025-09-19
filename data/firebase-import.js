// Firebase Data Import Examples
// This file demonstrates how to import timetable data into Firebase Firestore

import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase-config.js';

/**
 * Example: Import a basic timetable for a specific role/class
 */
export const importBasicTimetable = async (timetableData, documentId = 'admin') => {
  try {
    const timetableRef = doc(db, 'timetables', documentId);
    await setDoc(timetableRef, timetableData);
    console.log(`Timetable imported successfully for ${documentId}`);
    return { success: true, documentId };
  } catch (error) {
    console.error('Error importing timetable:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Example: Import multiple timetables for different classes/sections
 */
export const importMultipleTimetables = async (timetables) => {
  const results = [];
  
  for (const [documentId, timetableData] of Object.entries(timetables)) {
    try {
      const timetableRef = doc(db, 'timetables', documentId);
      await setDoc(timetableRef, {
        ...timetableData,
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          importedAt: new Date().toISOString()
        }
      });
      results.push({ documentId, success: true });
    } catch (error) {
      results.push({ documentId, success: false, error: error.message });
    }
  }
  
  return results;
};

/**
 * Example: Import teacher data
 */
export const importTeachers = async (teachers) => {
  const results = [];
  
  for (const teacher of teachers) {
    try {
      const teacherRef = await addDoc(collection(db, 'teachers'), {
        ...teacher,
        createdAt: new Date().toISOString()
      });
      results.push({ id: teacherRef.id, success: true, teacher: teacher.name });
    } catch (error) {
      results.push({ success: false, error: error.message, teacher: teacher.name });
    }
  }
  
  return results;
};

/**
 * Example: Import subjects data
 */
export const importSubjects = async (subjects) => {
  const results = [];
  
  for (const subject of subjects) {
    try {
      const subjectRef = await addDoc(collection(db, 'subjects'), {
        ...subject,
        createdAt: new Date().toISOString()
      });
      results.push({ id: subjectRef.id, success: true, subject: subject.name });
    } catch (error) {
      results.push({ success: false, error: error.message, subject: subject.name });
    }
  }
  
  return results;
};

/**
 * Sample data for importing
 */

// Sample teachers data
export const SAMPLE_TEACHERS = [
  {
    name: "Dr. Smith",
    email: "smith@school.edu",
    department: "Mathematics",
    employeeId: "MATH001",
    subjects: ["Mathematics", "Calculus", "Statistics", "Linear Algebra"],
    phone: "+1234567890"
  },
  {
    name: "Prof. Johnson",
    email: "johnson@school.edu",
    department: "Physics",
    employeeId: "PHYS001",
    subjects: ["Physics", "Modern Physics", "Quantum Physics", "Experimental Physics"],
    phone: "+1234567891"
  },
  {
    name: "Dr. Brown",
    email: "brown@school.edu",
    department: "Chemistry",
    employeeId: "CHEM001",
    subjects: ["Chemistry", "Organic Chemistry", "Physical Chemistry"],
    phone: "+1234567892"
  },
  {
    name: "Ms. Davis",
    email: "davis@school.edu",
    department: "English",
    employeeId: "ENG001",
    subjects: ["English", "Literature", "Creative Writing", "Technical Writing"],
    phone: "+1234567893"
  },
  {
    name: "Dr. Wilson",
    email: "wilson@school.edu",
    department: "Computer Science",
    employeeId: "CS001",
    subjects: ["Computer Science", "Programming", "Data Structures", "Database Systems"],
    phone: "+1234567894"
  }
];

// Sample subjects data
export const SAMPLE_SUBJECTS = [
  {
    name: "Mathematics",
    code: "MATH101",
    department: "Mathematics",
    credits: 3,
    prerequisites: [],
    description: "Fundamental mathematical concepts and problem-solving techniques"
  },
  {
    name: "Physics",
    code: "PHYS101",
    department: "Physics",
    credits: 4,
    prerequisites: ["Mathematics"],
    description: "Introduction to classical mechanics and thermodynamics"
  },
  {
    name: "Chemistry",
    code: "CHEM101",
    department: "Chemistry",
    credits: 4,
    prerequisites: ["Mathematics"],
    description: "Basic principles of chemical reactions and molecular structure"
  },
  {
    name: "English",
    code: "ENG101",
    department: "English",
    credits: 3,
    prerequisites: [],
    description: "Comprehensive English language and literature studies"
  },
  {
    name: "Computer Science",
    code: "CS101",
    department: "Computer Science",
    credits: 3,
    prerequisites: ["Mathematics"],
    description: "Introduction to programming and computational thinking"
  }
];

// Sample timetables for different classes
export const SAMPLE_TIMETABLES = {
  "grade-10-a": {
    "Monday": {
      "9:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "10:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "11:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "English", "teacher": "Ms. Davis" },
      "14:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "15:00": { "subject": "Study Hall", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    },
    "Tuesday": {
      "9:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "10:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "11:00": { "subject": "English", "teacher": "Ms. Davis" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "14:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "15:00": { "subject": "", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    },
    "Wednesday": {
      "9:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "10:00": { "subject": "English", "teacher": "Ms. Davis" },
      "11:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "14:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "15:00": { "subject": "", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    },
    "Thursday": {
      "9:00": { "subject": "English", "teacher": "Ms. Davis" },
      "10:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "11:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "14:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "15:00": { "subject": "", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    },
    "Friday": {
      "9:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "10:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "11:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "English", "teacher": "Ms. Davis" },
      "14:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "15:00": { "subject": "", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    }
  },
  
  "grade-10-b": {
    "Monday": {
      "9:00": { "subject": "English", "teacher": "Ms. Davis" },
      "10:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "11:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "14:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "15:00": { "subject": "", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    },
    "Tuesday": {
      "9:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "10:00": { "subject": "English", "teacher": "Ms. Davis" },
      "11:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "14:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "15:00": { "subject": "", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    },
    "Wednesday": {
      "9:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "10:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "11:00": { "subject": "English", "teacher": "Ms. Davis" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "14:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "15:00": { "subject": "", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    },
    "Thursday": {
      "9:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "10:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "11:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "English", "teacher": "Ms. Davis" },
      "14:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "15:00": { "subject": "", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    },
    "Friday": {
      "9:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "10:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "11:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "12:00": { "subject": "Break", "teacher": "" },
      "13:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "14:00": { "subject": "English", "teacher": "Ms. Davis" },
      "15:00": { "subject": "", "teacher": "" },
      "16:00": { "subject": "", "teacher": "" }
    }
  }
};

/**
 * Complete data import function
 * This function imports all sample data into Firebase
 */
export const importAllSampleData = async () => {
  console.log('Starting sample data import...');
  
  try {
    // Import teachers
    console.log('Importing teachers...');
    const teacherResults = await importTeachers(SAMPLE_TEACHERS);
    console.log('Teacher import results:', teacherResults);
    
    // Import subjects
    console.log('Importing subjects...');
    const subjectResults = await importSubjects(SAMPLE_SUBJECTS);
    console.log('Subject import results:', subjectResults);
    
    // Import timetables
    console.log('Importing timetables...');
    const timetableResults = await importMultipleTimetables(SAMPLE_TIMETABLES);
    console.log('Timetable import results:', timetableResults);
    
    console.log('Sample data import completed successfully!');
    return {
      success: true,
      results: {
        teachers: teacherResults,
        subjects: subjectResults,
        timetables: timetableResults
      }
    };
    
  } catch (error) {
    console.error('Error during sample data import:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Usage Examples:
 * 
 * // Import a single timetable
 * import basicTimetable from './samples/basic-timetable.json';
 * await importBasicTimetable(basicTimetable, 'admin');
 * 
 * // Import all sample data
 * await importAllSampleData();
 * 
 * // Import teachers only
 * await importTeachers(SAMPLE_TEACHERS);
 * 
 * // Import subjects only
 * await importSubjects(SAMPLE_SUBJECTS);
 */