import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';
import validator from 'validator';

// User name schema with validation for capitalization and length
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required and cannot be empty"],
    trim: true,
    maxlength: [20, 'First name cannot be more than 20 characters'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not a valid format. Only letters are allowed.',
    },
  },
  middleName: {
    type: String,
    trim: true,
    validate: {
      validator: (value: string) => !value || validator.isAlpha(value),
      message: '{VALUE} is not a valid format. Only letters are allowed.',
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required and cannot be empty"],
    trim: true,
    maxlength: [20, 'Last name cannot be more than 20 characters'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not a valid format. Only letters are allowed.',
    },
  },
});

// Guardian schema with validation for contact numbers and other details
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not a valid name. Only letters are allowed.',
    },
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, 'any', { strictMode: false }),
      message: '{VALUE} is not a valid phone number',
    },
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not a valid name. Only letters are allowed.',
    },
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, 'any', { strictMode: false }),
      message: '{VALUE} is not a valid phone number',
    },
  },
});

// Local Guardian schema with validation for contact numbers and other details
const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not a valid name. Only letters are allowed.',
    },
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, 'any', { strictMode: false }),
      message: '{VALUE} is not a valid phone number',
    },
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

// Student schema with comprehensive validations
const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isAlphanumeric(value),
      message: '{VALUE} is not a valid student ID. Only alphanumeric characters are allowed.',
    },
  },
  name: {
    type: userNameSchema,
    required: [true, "Student name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender. Valid values are: male, female, or other',
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of birth is required"],
    validate: {
      validator: (value: string) => validator.isDate(value),
      message: '{VALUE} is not a valid date format. Please use YYYY-MM-DD format.',
    },
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    trim: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email address',
    },
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, 'any', { strictMode: false }),
      message: '{VALUE} is not a valid contact number',
    },
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value, 'any', { strictMode: false }),
      message: '{VALUE} is not a valid emergency contact number',
    },
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    message: '{VALUE} is not a valid blood group. Valid values are: A+, A-, B+, B-, AB+, AB-, O+, O-',
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian details are required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian details are required"],
  },
  profileImg: {
    type: String,
    validate: {
      validator: (value: string) => value ? validator.isURL(value) : true, // Only validate if a URL is provided
      message: '{VALUE} is not a valid URL',
    },
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    message: '{VALUE} is not a valid status. Valid values are: active, blocked',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
