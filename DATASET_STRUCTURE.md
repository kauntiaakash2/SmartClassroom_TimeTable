# Smart Classroom TimeTable - Dataset Structure

This document provides the complete data structure specification required to generate timetables in the Smart Classroom TimeTable project.

## 🎯 Quick Reference

**Required Structure:**
```javascript
{
  [day]: {
    [timeSlot]: {
      subject: string,    // Required
      teacher: string     // Required
    }
  }
}
```

**Days:** Monday, Tuesday, Wednesday, Thursday, Friday  
**Time Slots:** 9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00  
**Storage:** Firebase Firestore collection `timetables`

## 📁 Related Files

- **📄 [Detailed Documentation](./data/README.md)** - Comprehensive guide
- **📊 [Sample Data](./data/samples/)** - Ready-to-use examples
- **🔧 [Validation Schema](./data/timetable-schema.js)** - Data validation utilities
- **🔥 [Firebase Import](./data/firebase-import.js)** - Import utilities

## Overview

The timetable system uses a nested JSON structure to represent weekly schedules, with support for multiple subjects, teachers, and time slots across weekdays.

## Core Data Structure

### Timetable Object Structure

```javascript
{
  [day]: {
    [timeSlot]: {
      subject: string,
      teacher: string,
      room?: string,           // Optional: Room number/name
      section?: string,        // Optional: Class section
      duration?: number,       // Optional: Duration in minutes
      type?: string           // Optional: Lecture/Lab/Tutorial
    }
  }
}
```

### Time Slots Configuration

The system currently supports 8 time slots per day:
- **9:00** - 9:00 AM to 10:00 AM
- **10:00** - 10:00 AM to 11:00 AM  
- **11:00** - 11:00 AM to 12:00 PM
- **12:00** - 12:00 PM to 1:00 PM
- **13:00** - 1:00 PM to 2:00 PM
- **14:00** - 2:00 PM to 3:00 PM
- **15:00** - 3:00 PM to 4:00 PM
- **16:00** - 4:00 PM to 5:00 PM

### Days Configuration

The system supports a 5-day academic week:
- **Monday**
- **Tuesday** 
- **Wednesday**
- **Thursday**
- **Friday**

## Sample Timetable Data

### Basic Timetable Example

```json
{
  "Monday": {
    "9:00": {
      "subject": "Mathematics",
      "teacher": "Dr. Smith"
    },
    "10:00": {
      "subject": "Physics",
      "teacher": "Prof. Johnson"
    },
    "11:00": {
      "subject": "Chemistry",
      "teacher": "Dr. Brown"
    },
    "12:00": {
      "subject": "Break",
      "teacher": ""
    },
    "13:00": {
      "subject": "English",
      "teacher": "Ms. Davis"
    },
    "14:00": {
      "subject": "Computer Science",
      "teacher": "Dr. Wilson"
    },
    "15:00": {
      "subject": "Biology",
      "teacher": "Prof. Miller"
    },
    "16:00": {
      "subject": "Study Hall",
      "teacher": ""
    }
  },
  "Tuesday": {
    "9:00": {
      "subject": "Physics",
      "teacher": "Prof. Johnson"
    },
    "10:00": {
      "subject": "Mathematics",
      "teacher": "Dr. Smith"
    },
    "11:00": {
      "subject": "English",
      "teacher": "Ms. Davis"
    },
    "12:00": {
      "subject": "Break",
      "teacher": ""
    },
    "13:00": {
      "subject": "Computer Science",
      "teacher": "Dr. Wilson"
    },
    "14:00": {
      "subject": "Chemistry",
      "teacher": "Dr. Brown"
    },
    "15:00": {
      "subject": "Physical Education",
      "teacher": "Coach Anderson"
    },
    "16:00": {
      "subject": "",
      "teacher": ""
    }
  },
  "Wednesday": {
    "9:00": {
      "subject": "Chemistry",
      "teacher": "Dr. Brown"
    },
    "10:00": {
      "subject": "Biology",
      "teacher": "Prof. Miller"
    },
    "11:00": {
      "subject": "Mathematics",
      "teacher": "Dr. Smith"
    },
    "12:00": {
      "subject": "Break",
      "teacher": ""
    },
    "13:00": {
      "subject": "Physics",
      "teacher": "Prof. Johnson"
    },
    "14:00": {
      "subject": "English",
      "teacher": "Ms. Davis"
    },
    "15:00": {
      "subject": "Computer Science Lab",
      "teacher": "Dr. Wilson"
    },
    "16:00": {
      "subject": "",
      "teacher": ""
    }
  },
  "Thursday": {
    "9:00": {
      "subject": "English",
      "teacher": "Ms. Davis"
    },
    "10:00": {
      "subject": "Chemistry",
      "teacher": "Dr. Brown"
    },
    "11:00": {
      "subject": "Physics",
      "teacher": "Prof. Johnson"
    },
    "12:00": {
      "subject": "Break",
      "teacher": ""
    },
    "13:00": {
      "subject": "Biology",
      "teacher": "Prof. Miller"
    },
    "14:00": {
      "subject": "Mathematics",
      "teacher": "Dr. Smith"
    },
    "15:00": {
      "subject": "History",
      "teacher": "Mr. Thompson"
    },
    "16:00": {
      "subject": "",
      "teacher": ""
    }
  },
  "Friday": {
    "9:00": {
      "subject": "Biology",
      "teacher": "Prof. Miller"
    },
    "10:00": {
      "subject": "English",
      "teacher": "Ms. Davis"
    },
    "11:00": {
      "subject": "Computer Science",
      "teacher": "Dr. Wilson"
    },
    "12:00": {
      "subject": "Break",
      "teacher": ""
    },
    "13:00": {
      "subject": "Mathematics",
      "teacher": "Dr. Smith"
    },
    "14:00": {
      "subject": "Physics Lab",
      "teacher": "Prof. Johnson"
    },
    "15:00": {
      "subject": "Art",
      "teacher": "Ms. Garcia"
    },
    "16:00": {
      "subject": "",
      "teacher": ""
    }
  }
}
```

## Extended Data Structure (Future Enhancement)

For more advanced features, the data structure can be extended:

```javascript
{
  [day]: {
    [timeSlot]: {
      subject: string,
      teacher: string,
      room: string,           // Room number/name
      section: string,        // Class section (A, B, C)
      duration: number,       // Duration in minutes
      type: string,          // "lecture" | "lab" | "tutorial" | "break"
      capacity: number,       // Maximum students
      resources: string[],    // Required resources ["projector", "lab equipment"]
      prerequisites: string[], // Required prerequisites
      color: string,         // UI color code for display
      notes: string          // Additional notes
    }
  }
}
```

## Firebase Storage Structure

### Collection: `timetables`

```javascript
// Document ID: Based on user role (admin, teacher, student) or class identifier
{
  // Document contains the complete timetable object as shown above
  "Monday": { /* ... */ },
  "Tuesday": { /* ... */ },
  "Wednesday": { /* ... */ },
  "Thursday": { /* ... */ },
  "Friday": { /* ... */ },
  
  // Metadata (optional)
  "metadata": {
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:22:00Z",
    "createdBy": "admin_user_id",
    "semester": "Spring 2024",
    "academicYear": "2023-2024",
    "classGrade": "Grade 10",
    "section": "A"
  }
}
```

### Collection: `users`

```javascript
// Document ID: User UID from Firebase Auth
{
  "email": "user@example.com",
  "role": "admin" | "teacher" | "student",
  "createdAt": "2024-01-15T10:30:00Z",
  "profile": {
    "name": "John Doe",
    "department": "Computer Science",
    "employeeId": "EMP001" // For teachers/admin
  }
}
```

## Data Validation Rules

### Required Fields
- `subject`: Non-empty string
- `teacher`: String (can be empty for breaks/free periods)

### Optional Fields
- `room`: String
- `section`: String
- `duration`: Positive integer
- `type`: Predefined enum values

### Constraints
- Each time slot can only have one entry per day
- Teacher names should be consistent across all entries
- Subject names should follow naming conventions

## Usage Examples

### Creating a New Timetable Entry

```javascript
const newEntry = {
  subject: "Advanced Mathematics",
  teacher: "Dr. Smith",
  room: "Room 101",
  section: "A",
  type: "lecture"
};

// Add to specific day and time
timetable["Monday"]["9:00"] = newEntry;
```

### Querying Teacher Schedule

```javascript
// Find all classes for a specific teacher
const teacherSchedule = {};
Object.keys(timetable).forEach(day => {
  Object.keys(timetable[day]).forEach(time => {
    if (timetable[day][time].teacher === "Dr. Smith") {
      if (!teacherSchedule[day]) teacherSchedule[day] = {};
      teacherSchedule[day][time] = timetable[day][time];
    }
  });
});
```

### Empty Slot Detection

```javascript
// Find empty time slots
const emptySlots = [];
Object.keys(timetable).forEach(day => {
  Object.keys(timetable[day]).forEach(time => {
    if (!timetable[day][time].subject || timetable[day][time].subject === "") {
      emptySlots.push({ day, time });
    }
  });
});
```

## Integration Notes

1. **Firebase Security Rules**: Ensure proper read/write permissions based on user roles
2. **Real-time Updates**: Use Firebase listeners for live timetable updates
3. **Offline Support**: Consider caching strategies for offline access
4. **Data Migration**: Plan for schema changes and data migration strategies
5. **Backup**: Regular backups of timetable data

## Best Practices

1. **Naming Conventions**: Use consistent naming for subjects and teachers
2. **Data Normalization**: Consider separating teacher and subject data into separate collections
3. **Validation**: Implement client and server-side validation
4. **Error Handling**: Graceful handling of missing or invalid data
5. **Performance**: Optimize queries for large datasets

This data structure provides a flexible foundation for the Smart Classroom TimeTable system while allowing for future enhancements and scalability.