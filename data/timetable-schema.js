// Timetable Data Structure Schema and Validation

/**
 * JSON Schema for Timetable Data Structure
 * This schema defines the structure and validation rules for timetable data
 */

export const TIMETABLE_SCHEMA = {
  type: "object",
  properties: {
    Monday: { $ref: "#/definitions/day" },
    Tuesday: { $ref: "#/definitions/day" },
    Wednesday: { $ref: "#/definitions/day" },
    Thursday: { $ref: "#/definitions/day" },
    Friday: { $ref: "#/definitions/day" },
    metadata: { $ref: "#/definitions/metadata" }
  },
  required: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  additionalProperties: false,
  definitions: {
    day: {
      type: "object",
      properties: {
        "9:00": { $ref: "#/definitions/timeSlot" },
        "10:00": { $ref: "#/definitions/timeSlot" },
        "11:00": { $ref: "#/definitions/timeSlot" },
        "12:00": { $ref: "#/definitions/timeSlot" },
        "13:00": { $ref: "#/definitions/timeSlot" },
        "14:00": { $ref: "#/definitions/timeSlot" },
        "15:00": { $ref: "#/definitions/timeSlot" },
        "16:00": { $ref: "#/definitions/timeSlot" }
      },
      additionalProperties: false
    },
    timeSlot: {
      type: "object",
      properties: {
        subject: {
          type: "string",
          maxLength: 100,
          description: "Name of the subject or activity"
        },
        teacher: {
          type: "string",
          maxLength: 100,
          description: "Name of the teacher or instructor"
        },
        room: {
          type: "string",
          maxLength: 50,
          description: "Room number or location"
        },
        section: {
          type: "string",
          maxLength: 10,
          description: "Class section identifier"
        },
        duration: {
          type: "integer",
          minimum: 1,
          maximum: 480,
          description: "Duration in minutes"
        },
        type: {
          type: "string",
          enum: ["lecture", "lab", "tutorial", "break", "study", "practical"],
          description: "Type of session"
        }
      },
      required: ["subject", "teacher"],
      additionalProperties: false
    },
    metadata: {
      type: "object",
      properties: {
        createdAt: {
          type: "string",
          format: "date-time",
          description: "ISO 8601 timestamp of creation"
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          description: "ISO 8601 timestamp of last update"
        },
        createdBy: {
          type: "string",
          description: "User ID of creator"
        },
        semester: {
          type: "string",
          description: "Academic semester"
        },
        academicYear: {
          type: "string",
          pattern: "^\\d{4}-\\d{4}$",
          description: "Academic year in YYYY-YYYY format"
        },
        classGrade: {
          type: "string",
          description: "Grade or class level"
        },
        section: {
          type: "string",
          description: "Class section"
        }
      },
      additionalProperties: false
    }
  }
};

/**
 * Constants for timetable configuration
 */
export const TIMETABLE_CONFIG = {
  DAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  TIME_SLOTS: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
  SESSION_TYPES: ['lecture', 'lab', 'tutorial', 'break', 'study', 'practical'],
  MAX_SUBJECT_LENGTH: 100,
  MAX_TEACHER_LENGTH: 100,
  MAX_ROOM_LENGTH: 50,
  MAX_SECTION_LENGTH: 10,
  MIN_DURATION: 1,
  MAX_DURATION: 480
};

/**
 * Validation Functions
 */

/**
 * Validates if a timetable object follows the correct structure
 * @param {Object} timetable - The timetable object to validate
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validateTimetableStructure = (timetable) => {
  const errors = [];
  
  if (!timetable || typeof timetable !== 'object') {
    return { isValid: false, errors: ['Timetable must be an object'] };
  }

  // Check if all required days are present
  for (const day of TIMETABLE_CONFIG.DAYS) {
    if (!timetable[day]) {
      errors.push(`Missing day: ${day}`);
    } else if (typeof timetable[day] !== 'object') {
      errors.push(`${day} must be an object`);
    } else {
      // Validate time slots for each day
      for (const timeSlot of TIMETABLE_CONFIG.TIME_SLOTS) {
        if (timetable[day][timeSlot]) {
          const slotErrors = validateTimeSlot(timetable[day][timeSlot], day, timeSlot);
          errors.push(...slotErrors);
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates a single time slot entry
 * @param {Object} slot - The time slot object
 * @param {string} day - The day name
 * @param {string} time - The time slot
 * @returns {string[]} - Array of error messages
 */
export const validateTimeSlot = (slot, day, time) => {
  const errors = [];
  
  if (!slot || typeof slot !== 'object') {
    errors.push(`Invalid slot object for ${day} at ${time}`);
    return errors;
  }

  // Check required fields
  if (!slot.hasOwnProperty('subject')) {
    errors.push(`Missing subject for ${day} at ${time}`);
  } else if (typeof slot.subject !== 'string') {
    errors.push(`Subject must be a string for ${day} at ${time}`);
  } else if (slot.subject.length > TIMETABLE_CONFIG.MAX_SUBJECT_LENGTH) {
    errors.push(`Subject too long for ${day} at ${time} (max ${TIMETABLE_CONFIG.MAX_SUBJECT_LENGTH} characters)`);
  }

  if (!slot.hasOwnProperty('teacher')) {
    errors.push(`Missing teacher for ${day} at ${time}`);
  } else if (typeof slot.teacher !== 'string') {
    errors.push(`Teacher must be a string for ${day} at ${time}`);
  } else if (slot.teacher.length > TIMETABLE_CONFIG.MAX_TEACHER_LENGTH) {
    errors.push(`Teacher name too long for ${day} at ${time} (max ${TIMETABLE_CONFIG.MAX_TEACHER_LENGTH} characters)`);
  }

  // Check optional fields
  if (slot.room && typeof slot.room !== 'string') {
    errors.push(`Room must be a string for ${day} at ${time}`);
  } else if (slot.room && slot.room.length > TIMETABLE_CONFIG.MAX_ROOM_LENGTH) {
    errors.push(`Room name too long for ${day} at ${time} (max ${TIMETABLE_CONFIG.MAX_ROOM_LENGTH} characters)`);
  }

  if (slot.section && typeof slot.section !== 'string') {
    errors.push(`Section must be a string for ${day} at ${time}`);
  } else if (slot.section && slot.section.length > TIMETABLE_CONFIG.MAX_SECTION_LENGTH) {
    errors.push(`Section name too long for ${day} at ${time} (max ${TIMETABLE_CONFIG.MAX_SECTION_LENGTH} characters)`);
  }

  if (slot.duration !== undefined) {
    if (typeof slot.duration !== 'number' || !Number.isInteger(slot.duration)) {
      errors.push(`Duration must be an integer for ${day} at ${time}`);
    } else if (slot.duration < TIMETABLE_CONFIG.MIN_DURATION || slot.duration > TIMETABLE_CONFIG.MAX_DURATION) {
      errors.push(`Duration must be between ${TIMETABLE_CONFIG.MIN_DURATION} and ${TIMETABLE_CONFIG.MAX_DURATION} minutes for ${day} at ${time}`);
    }
  }

  if (slot.type && !TIMETABLE_CONFIG.SESSION_TYPES.includes(slot.type)) {
    errors.push(`Invalid session type for ${day} at ${time}. Must be one of: ${TIMETABLE_CONFIG.SESSION_TYPES.join(', ')}`);
  }

  return errors;
};

/**
 * Creates an empty timetable structure
 * @returns {Object} - Empty timetable object
 */
export const createEmptyTimetable = () => {
  const timetable = {};
  
  for (const day of TIMETABLE_CONFIG.DAYS) {
    timetable[day] = {};
    for (const timeSlot of TIMETABLE_CONFIG.TIME_SLOTS) {
      timetable[day][timeSlot] = {
        subject: '',
        teacher: ''
      };
    }
  }
  
  return timetable;
};

/**
 * Sanitizes timetable data by removing invalid entries
 * @param {Object} timetable - The timetable to sanitize
 * @returns {Object} - Sanitized timetable
 */
export const sanitizeTimetable = (timetable) => {
  const sanitized = {};
  
  for (const day of TIMETABLE_CONFIG.DAYS) {
    if (timetable[day] && typeof timetable[day] === 'object') {
      sanitized[day] = {};
      for (const timeSlot of TIMETABLE_CONFIG.TIME_SLOTS) {
        if (timetable[day][timeSlot]) {
          const slot = timetable[day][timeSlot];
          sanitized[day][timeSlot] = {
            subject: typeof slot.subject === 'string' ? slot.subject.trim() : '',
            teacher: typeof slot.teacher === 'string' ? slot.teacher.trim() : ''
          };
          
          // Add optional fields if valid
          if (slot.room && typeof slot.room === 'string') {
            sanitized[day][timeSlot].room = slot.room.trim();
          }
          if (slot.section && typeof slot.section === 'string') {
            sanitized[day][timeSlot].section = slot.section.trim();
          }
          if (slot.duration && typeof slot.duration === 'number' && Number.isInteger(slot.duration)) {
            sanitized[day][timeSlot].duration = slot.duration;
          }
          if (slot.type && TIMETABLE_CONFIG.SESSION_TYPES.includes(slot.type)) {
            sanitized[day][timeSlot].type = slot.type;
          }
        } else {
          sanitized[day][timeSlot] = {
            subject: '',
            teacher: ''
          };
        }
      }
    } else {
      sanitized[day] = createEmptyTimetable()[day];
    }
  }
  
  return sanitized;
};

/**
 * Utility functions for timetable operations
 */

/**
 * Gets all unique subjects from a timetable
 * @param {Object} timetable - The timetable object
 * @returns {string[]} - Array of unique subjects
 */
export const getUniqueSubjects = (timetable) => {
  const subjects = new Set();
  
  for (const day of TIMETABLE_CONFIG.DAYS) {
    if (timetable[day]) {
      for (const timeSlot of TIMETABLE_CONFIG.TIME_SLOTS) {
        if (timetable[day][timeSlot] && timetable[day][timeSlot].subject) {
          subjects.add(timetable[day][timeSlot].subject);
        }
      }
    }
  }
  
  return Array.from(subjects).filter(subject => subject.trim() !== '');
};

/**
 * Gets all unique teachers from a timetable
 * @param {Object} timetable - The timetable object
 * @returns {string[]} - Array of unique teachers
 */
export const getUniqueTeachers = (timetable) => {
  const teachers = new Set();
  
  for (const day of TIMETABLE_CONFIG.DAYS) {
    if (timetable[day]) {
      for (const timeSlot of TIMETABLE_CONFIG.TIME_SLOTS) {
        if (timetable[day][timeSlot] && timetable[day][timeSlot].teacher) {
          teachers.add(timetable[day][timeSlot].teacher);
        }
      }
    }
  }
  
  return Array.from(teachers).filter(teacher => teacher.trim() !== '');
};

/**
 * Finds schedule conflicts for a teacher
 * @param {Object} timetable - The timetable object
 * @param {string} teacherName - Name of the teacher
 * @returns {Object[]} - Array of conflicting slots
 */
export const findTeacherConflicts = (timetable, teacherName) => {
  const conflicts = [];
  const teacherSlots = {};
  
  for (const day of TIMETABLE_CONFIG.DAYS) {
    if (timetable[day]) {
      for (const timeSlot of TIMETABLE_CONFIG.TIME_SLOTS) {
        if (timetable[day][timeSlot] && 
            timetable[day][timeSlot].teacher === teacherName &&
            timetable[day][timeSlot].subject.trim() !== '') {
          const key = `${day}-${timeSlot}`;
          if (teacherSlots[key]) {
            conflicts.push({
              day,
              timeSlot,
              subjects: [teacherSlots[key].subject, timetable[day][timeSlot].subject]
            });
          } else {
            teacherSlots[key] = timetable[day][timeSlot];
          }
        }
      }
    }
  }
  
  return conflicts;
};