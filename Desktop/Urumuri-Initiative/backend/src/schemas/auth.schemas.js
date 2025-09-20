import { z } from 'zod';
import { emailSchema, passwordSchema, nameSchema } from './common.js';

export const signupSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    // confirmPassword: ConfirmpasswordSchema,
    role: z.enum(['user', 'admin', 'nutritionist', 'coach', 'restaurantOwner']).default('user'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: emailSchema,
  }),
});

export const resetPasswordSchema = z.object({
  params: z.object({
    token: z.string().min(1, 'Token is required'),
    id: z.string(),
  }),
  body: z.object({
    password: passwordSchema,
    // confirmPassword: ConfirmpasswordSchema
  }),
});

export const verifyEmailSchema = z.object({
  params: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
});
