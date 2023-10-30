import { Admin } from "@src/types";
import { z } from "zod";

export const adminResolver = (admin: Admin | undefined) => {
  const schema = z.object({
    first_name: z
      .string({ required_error: "First name is required" })
      .min(1, "First name is required"),
    last_name: z
      .string({ required_error: "Last name is required" })
      .min(1, "Last name is required"),
    middle_name: z.union([z.string(), z.undefined()]),
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Please enter a valid phone number")
      .max(13, "Please enter a valid phone number"),
    alternate_phone_number: z.union([z.string(), z.undefined()]),
    email: z.string().email("Please enter a valid email"),
    address: z.union([z.string(), z.undefined()]),
    nationality: z.union([z.string(), z.undefined()]),
    profile_image: z.any(),
    card_type: z.union([z.string(), z.undefined()]),
    card_number: z.union([z.string(), z.undefined()]),
    active: z.boolean().default(true),
    role: z.string({ required_error: "role is required" }),
  });

  if (!admin) {
    return schema
      .extend({
        password: z.string().min(6, "Passwords must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Please confirm your password"),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
      })
      .superRefine((val, ctx) => {
        if (val.card_type && !val.card_number) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please kindly provide a card number",
            path: ["card_number"],
          });
        }

        if (val.card_type === "" && val.card_number !== "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You can't add card number without a card type",
            path: ["card_number"],
          });
        }
      });
  }

  return schema.superRefine((val, ctx) => {
    if (val.card_type && !val.card_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please kindly provide a card number",
        path: ["card_number"],
      });
    }

    if (val.card_type === "" && val.card_number !== "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You can't add card number without a card type",
        path: ["card_number"],
      });
    }
  });
};
