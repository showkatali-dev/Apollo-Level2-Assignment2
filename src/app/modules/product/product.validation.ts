import { z } from 'zod';

const variantSchema = z.object({
  type: z.string({
    invalid_type_error: 'The variant type must be a string',
  }),
  value: z.string({
    invalid_type_error: 'The variant value must be a string',
  }),
});

export const productValidationSchema = z.object({
  name: z.string({
    required_error: 'The product name is required',
    invalid_type_error: 'The product name must be a string',
  }),
  description: z.string({
    required_error: 'The product name is required',
    invalid_type_error: 'The product description must be a string',
  }),
  price: z.number({
    required_error: 'The product price is required',
    invalid_type_error: 'The product price must be a number',
  }),
  category: z.string({
    required_error: 'The product category is required',
    invalid_type_error: 'The product category must be a string',
  }),
  tags: z.array(
    z.string({
      invalid_type_error: 'The product tags must be an array of strings',
    }),
    {
      required_error: 'The product tags are required',
      invalid_type_error: 'The product tags must be an array of strings',
    },
  ),
  variants: z.array(variantSchema, {
    required_error: 'The product variants are required',
  }),
  inventory: z.object(
    {
      quantity: z.number({
        required_error: 'The product quantity is required',
        invalid_type_error: 'The product quantity must be a number',
      }),
      inStock: z.boolean({
        required_error: 'The product inStock is required',
        invalid_type_error: 'The product inStock must be a boolean',
      }),
    },
    {
      required_error: 'The product inventory is required',
    },
  ),
});
