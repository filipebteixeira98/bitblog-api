import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
  };
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      maxLength: [20, 'Username must be at most 20 characters'],
      unique: [true, 'Username must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxLength: [50, 'Email must be at most 50 characters'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['admin', 'user'],
        message: 'Role must be either admin or user. {VALUE} is not valid',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxLength: [20, 'First name must be at most 20 characters'],
    },
    lastName: {
      type: String,
      maxLength: [20, 'Last name must be at most 20 characters'],
    },
    socialLinks: {
      website: {
        type: String,
        maxLength: [100, 'Website URL must be at most 100 characters'],
      },
      facebook: {
        type: String,
        maxLength: [100, 'Facebook URL must be at most 100 characters'],
      },
      instagram: {
        type: String,
        maxLength: [100, 'Instagram URL must be at most 100 characters'],
      },
      linkedin: {
        type: String,
        maxLength: [100, 'LinkedIn URL must be at most 100 characters'],
      },
      x: {
        type: String,
        maxLength: [100, 'X URL must be at most 100 characters'],
      },
      youtube: {
        type: String,
        maxLength: [100, 'YouTube URL must be at most 100 characters'],
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = model<IUser>('User', userSchema);
