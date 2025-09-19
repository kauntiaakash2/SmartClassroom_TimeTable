# Data Structure Guide for Smart Classroom TimeTable

This directory contains comprehensive documentation and examples for the data structures used in the Smart Classroom TimeTable project.

## 📁 Directory Structure

```
data/
├── README.md                    # This file - comprehensive guide
├── timetable-schema.js         # Data validation and schema definitions
├── firebase-import.js          # Firebase data import utilities
└── samples/                    # Sample data files
    ├── basic-timetable.json    # Basic timetable example
    ├── extended-timetable.json # Extended timetable with additional fields
    └── empty-timetable.json    # Empty template for new timetables
```

## 🎯 Overview

The Smart Classroom TimeTable system uses a structured JSON format to represent weekly class schedules. This guide provides everything you need to understand and work with the timetable data structure.

## 📊 Core Data Structure

### Basic Structure

```javascript
{
  [day]: {
    [timeSlot]: {
      subject: string,    // Required: Subject/course name
      teacher: string     // Required: Teacher name (can be empty for breaks)
    }
  }
}
```

### Extended Structure (Optional Fields)

```javascript
{
  [day]: {
    [timeSlot]: {
      subject: string,      // Required
      teacher: string,      // Required
      room: string,         // Optional: Room/location
      section: string,      // Optional: Class section
      duration: number,     // Optional: Duration in minutes
      type: string         // Optional: session type
    }
  }
}
```

## 🕐 Time Configuration

- **Days**: Monday, Tuesday, Wednesday, Thursday, Friday
- **Time Slots**: 9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00
- **Format**: 24-hour format (e.g., "13:00" for 1:00 PM)

## 📝 Sample Data Files

### 1. `basic-timetable.json`
A complete week's schedule with basic subject and teacher information.

**Use cases:**
- Initial timetable setup
- Simple class schedules
- Testing and development

### 2. `extended-timetable.json`
Advanced timetable with additional fields like room numbers, session types, and durations.

**Use cases:**
- Complex institutional schedules
- Resource management
- Detailed scheduling requirements

### 3. `empty-timetable.json`
Template with empty slots for all time periods.

**Use cases:**
- Creating new timetables from scratch
- Resetting existing schedules
- Form initialization

## 🔧 Schema Validation

The `timetable-schema.js` file provides:

### Validation Functions
- `validateTimetableStructure(timetable)` - Validates complete timetable
- `validateTimeSlot(slot, day, time)` - Validates individual time slots
- `sanitizeTimetable(timetable)` - Cleans and normalizes data

### Utility Functions
- `createEmptyTimetable()` - Generates empty timetable structure
- `getUniqueSubjects(timetable)` - Extracts all subjects
- `getUniqueTeachers(timetable)` - Extracts all teachers
- `findTeacherConflicts(timetable, teacherName)` - Detects scheduling conflicts

### Example Usage

```javascript
import { validateTimetableStructure, sanitizeTimetable } from './timetable-schema.js';

// Validate a timetable
const validation = validateTimetableStructure(myTimetable);
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
}

// Clean and normalize data
const cleanTimetable = sanitizeTimetable(dirtyTimetable);
```

## 🔥 Firebase Integration

The `firebase-import.js` file provides utilities for importing data into Firebase Firestore.

### Available Functions

```javascript
// Import single timetable
await importBasicTimetable(timetableData, 'admin');

// Import multiple timetables
await importMultipleTimetables({
  'grade-10-a': timetableA,
  'grade-10-b': timetableB
});

// Import supporting data
await importTeachers(teachersArray);
await importSubjects(subjectsArray);

// Import all sample data
await importAllSampleData();
```

### Firebase Collections

#### `timetables` Collection
```javascript
// Document ID: role-based or class-based identifier
{
  "Monday": { /* time slots */ },
  "Tuesday": { /* time slots */ },
  // ... other days
  "metadata": {
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:22:00Z",
    "createdBy": "admin_user_id",
    "semester": "Spring 2024",
    "academicYear": "2023-2024"
  }
}
```

#### `teachers` Collection
```javascript
{
  "name": "Dr. Smith",
  "email": "smith@school.edu",
  "department": "Mathematics",
  "employeeId": "MATH001",
  "subjects": ["Mathematics", "Calculus"],
  "phone": "+1234567890"
}
```

#### `subjects` Collection
```javascript
{
  "name": "Mathematics",
  "code": "MATH101",
  "department": "Mathematics",
  "credits": 3,
  "prerequisites": [],
  "description": "Fundamental mathematical concepts"
}
```

## 🚀 Quick Start

### 1. Load Sample Data

```javascript
// Import a basic timetable
import basicTimetable from './samples/basic-timetable.json';
await importBasicTimetable(basicTimetable, 'sample-class');
```

### 2. Create Custom Timetable

```javascript
import { createEmptyTimetable } from './timetable-schema.js';

// Start with empty template
const newTimetable = createEmptyTimetable();

// Add classes
newTimetable.Monday['9:00'] = {
  subject: 'Mathematics',
  teacher: 'Dr. Smith'
};

// Validate before saving
const validation = validateTimetableStructure(newTimetable);
if (validation.isValid) {
  await importBasicTimetable(newTimetable, 'my-class');
}
```

### 3. Load in React Component

```javascript
// In your React component
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const [timetable, setTimetable] = useState(null);

useEffect(() => {
  const loadTimetable = async () => {
    const timetableDoc = await getDoc(doc(db, 'timetables', 'admin'));
    if (timetableDoc.exists()) {
      setTimetable(timetableDoc.data());
    }
  };
  loadTimetable();
}, []);
```

## ✅ Best Practices

### Data Entry
1. **Consistent Naming**: Use standardized names for subjects and teachers
2. **Validation**: Always validate data before storing
3. **Sanitization**: Clean user input to prevent errors

### Storage
1. **Backup**: Regular backups of timetable data
2. **Versioning**: Keep track of timetable versions
3. **Security**: Implement proper Firebase security rules

### Performance
1. **Caching**: Cache frequently accessed timetables
2. **Lazy Loading**: Load timetables on demand
3. **Compression**: Minimize data transfer

## 🔍 Troubleshooting

### Common Issues

**Empty Timetable Display**
- Check Firebase security rules
- Verify document ID matches user role
- Ensure data structure follows schema

**Validation Errors**
- Use `validateTimetableStructure()` to identify issues
- Check for missing required fields
- Verify day and time slot names

**Import Failures**
- Confirm Firebase configuration
- Check authentication status
- Validate JSON format

### Debug Utilities

```javascript
// Check timetable structure
console.log('Validation:', validateTimetableStructure(timetable));

// Inspect data
console.log('Subjects:', getUniqueSubjects(timetable));
console.log('Teachers:', getUniqueTeachers(timetable));

// Find conflicts
console.log('Conflicts:', findTeacherConflicts(timetable, 'Dr. Smith'));
```

## 📚 Additional Resources

- [Firebase Firestore Documentation](https://firebase.google.com/docs/firestore)
- [JSON Schema Specification](https://json-schema.org/)
- [React State Management](https://react.dev/learn/managing-state)

## 🤝 Contributing

When adding new data structures or validation rules:

1. Update the schema in `timetable-schema.js`
2. Add corresponding sample data
3. Update validation functions
4. Test with existing components
5. Update this documentation

## 📄 License

This data structure documentation is part of the Smart Classroom TimeTable project and follows the same license terms.