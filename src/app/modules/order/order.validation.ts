import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z
    .string({
      required_error: 'The email is required',
      invalid_type_error: 'The email must be a string',
    })
    .email({
      message: 'The email must be a valid email',
    }),
  productId: z.string({
    required_error: 'The product id is required',
    invalid_type_error: 'The product id must be a string',
  }),
  price: z.number({
    required_error: 'The price is required',
    invalid_type_error: 'The price must be a number',
  }),
  quantity: z
    .number({
      required_error: 'The quantity is required',
      invalid_type_error: 'The quantity must be a number',
    })
    .int({
      message: 'The quantity must be an integer',
    })
    .gte(1, {
      message: 'The minimum quantity is 1',
    }),
});
