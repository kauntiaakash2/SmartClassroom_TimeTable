// Data Structure Demonstration Script
// This script shows how the timetable data structure works in practice

import { validateTimetableStructure, createEmptyTimetable, sanitizeTimetable } from './data/timetable-schema.js';

/**
 * Demonstration of the timetable data structure
 */
export const demonstrateTimetableStructure = () => {
  console.log('=== Smart Classroom TimeTable - Data Structure Demonstration ===\n');

  // 1. Basic timetable structure
  console.log('1. BASIC TIMETABLE STRUCTURE:');
  const basicTimetable = {
    "Monday": {
      "9:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "10:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "11:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "12:00": { "subject": "Break", "teacher": "" }
    },
    "Tuesday": {
      "9:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "10:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "11:00": { "subject": "English", "teacher": "Ms. Davis" },
      "12:00": { "subject": "Break", "teacher": "" }
    },
    "Wednesday": {
      "9:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "10:00": { "subject": "English", "teacher": "Ms. Davis" },
      "11:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "12:00": { "subject": "Break", "teacher": "" }
    },
    "Thursday": {
      "9:00": { "subject": "English", "teacher": "Ms. Davis" },
      "10:00": { "subject": "Chemistry", "teacher": "Dr. Brown" },
      "11:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "12:00": { "subject": "Break", "teacher": "" }
    },
    "Friday": {
      "9:00": { "subject": "Computer Science", "teacher": "Dr. Wilson" },
      "10:00": { "subject": "Mathematics", "teacher": "Dr. Smith" },
      "11:00": { "subject": "Physics", "teacher": "Prof. Johnson" },
      "12:00": { "subject": "Break", "teacher": "" }
    }
  };

  console.log(JSON.stringify(basicTimetable, null, 2));
  console.log('\n');

  // 2. Extended timetable structure
  console.log('2. EXTENDED TIMETABLE STRUCTURE (with additional fields):');
  const extendedEntry = {
    "subject": "Advanced Mathematics",
    "teacher": "Dr. Smith",
    "room": "Room 101",
    "section": "A",
    "duration": 60,
    "type": "lecture"
  };
  console.log(JSON.stringify(extendedEntry, null, 2));
  console.log('\n');

  // 3. Empty timetable template
  console.log('3. EMPTY TIMETABLE TEMPLATE:');
  const emptyTimetable = createEmptyTimetable();
  console.log('First day structure:');
  console.log(JSON.stringify(emptyTimetable.Monday, null, 2));
  console.log('\n');

  // 4. Validation demonstration
  console.log('4. VALIDATION DEMONSTRATION:');
  const validation = validateTimetableStructure(basicTimetable);
  console.log('Is valid:', validation.isValid);
  console.log('Errors:', validation.errors);
  console.log('\n');

  // 5. Firebase storage format
  console.log('5. FIREBASE STORAGE FORMAT:');
  const firebaseDoc = {
    ...basicTimetable,
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin_user_id",
      semester: "Spring 2024",
      academicYear: "2023-2024",
      classGrade: "Grade 10",
      section: "A"
    }
  };
  console.log('Document structure for Firebase:');
  console.log(JSON.stringify({ metadata: firebaseDoc.metadata }, null, 2));
  console.log('\n');

  // 6. Usage examples
  console.log('6. USAGE EXAMPLES:');
  
  console.log('a) Adding a new class:');
  const newClass = { subject: "Biology", teacher: "Prof. Miller" };
  console.log(`basicTimetable.Monday["13:00"] = ${JSON.stringify(newClass)}`);
  
  console.log('\nb) Finding teacher schedule:');
  console.log('Filter by teacher: "Dr. Smith"');
  
  console.log('\nc) Empty slot detection:');
  console.log('Check for empty subjects or teachers');
  
  console.log('\n=== END DEMONSTRATION ===');
};

/**
 * Example React component integration
 */
export const reactComponentExample = `
// Example React Component Usage

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import TimetableView from './TimetableView';

const TimetableContainer = () => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimetable = async () => {
      try {
        const timetableDoc = await getDoc(doc(db, 'timetables', 'admin'));
        if (timetableDoc.exists()) {
          setTimetable(timetableDoc.data());
        }
      } catch (error) {
        console.error('Failed to load timetable:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();
  }, []);

  if (loading) return <div>Loading timetable...</div>;
  
  return <TimetableView timetable={timetable} />;
};

export default TimetableContainer;
`;

/**
 * Example Firebase import script
 */
export const firebaseImportExample = `
// Example Firebase Import Script

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import basicTimetable from './samples/basic-timetable.json';

const importTimetable = async () => {
  try {
    const timetableRef = doc(db, 'timetables', 'grade-10-a');
    await setDoc(timetableRef, {
      ...basicTimetable,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        semester: 'Spring 2024',
        academicYear: '2023-2024'
      }
    });
    console.log('Timetable imported successfully!');
  } catch (error) {
    console.error('Import failed:', error);
  }
};

// Usage
importTimetable();
`;

// Run demonstration if this file is executed directly
if (typeof window === 'undefined') {
  demonstrateTimetableStructure();
}