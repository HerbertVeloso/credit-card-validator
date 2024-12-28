import { z } from "zod";

export const CreditCardSchema = z.object({
  number: z.string()
    .min(1, { message: "Card number is required" })
    .regex(/^[0-9\s-]*$/, "Invalid credit card number format.")
    .refine((val) => {
      const v = val.replace(/[\s-]/g, '');
      return v.length >= 13 && v.length <= 19;
    }, {
      message: "Card number must be between 13 and 19 digits long",
    }),
});

export type ICreditCard = z.infer<typeof CreditCardSchema>;